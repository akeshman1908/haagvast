import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const APP_DIR = fs.existsSync(path.join(ROOT, "src", "app"))
  ? path.join(ROOT, "src", "app")
  : path.join(ROOT, "app");

const SRC_DIR = fs.existsSync(path.join(ROOT, "src"))
  ? path.join(ROOT, "src")
  : APP_DIR;

const REPORT_DIR = path.join(ROOT, "reports");
const BASE_URL = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const ORIGIN = new URL(BASE_URL).origin;

function positiveInteger(value, fallback) {
  const number = Number(value);

  return Number.isSafeInteger(number) && number > 0 ? number : fallback;
}

const MAX_PAGES = positiveInteger(process.env.AUDIT_MAX_PAGES, 300);
const TIMEOUT_MS = positiveInteger(process.env.AUDIT_TIMEOUT_MS, 30_000);

const STATIC_ONLY = process.argv.includes("--static-only");
const FAIL_ON_REDIRECT = process.argv.includes("--fail-on-redirect");

const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js"]);

const SOURCE_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);

const ASSET_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".map",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".pdf",
  ".xml",
  ".txt",
  ".json",
  ".zip",
  ".mp4",
  ".webm",
  ".mp3",
  ".wav",
]);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function isAsset(pathname) {
  return (
    /^\/(?:_next|api)(?:\/|$)/.test(pathname) ||
    ASSET_EXTENSIONS.has(path.extname(pathname).toLowerCase())
  );
}

function internalUrl(href, base = BASE_URL) {
  try {
    const url = new URL(href, base);

    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (url.origin !== ORIGIN || isAsset(url.pathname)) return null;

    return url;
  } catch {
    return null;
  }
}

function routeRegex(route) {
  if (route === "/") return /^\/$/;

  let pattern = "^";

  for (const segment of route.split("/").filter(Boolean)) {
    if (/^\[\[\.\.\..+\]\]$/.test(segment)) {
      pattern += "(?:/[^/]+(?:/[^/]+)*)?";
    } else if (/^\[\.\.\..+\]$/.test(segment)) {
      pattern += "/[^/]+(?:/[^/]+)*";
    } else if (/^\[.+\]$/.test(segment)) {
      pattern += "/[^/]+";
    } else {
      pattern += "/" + segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }

  return new RegExp(pattern + "/?$");
}

function discoverRoutes() {
  const routes = [];

  for (const file of walk(APP_DIR)) {
    if (!PAGE_FILES.has(path.basename(file))) continue;

    const segments = path
      .relative(APP_DIR, path.dirname(file))
      .split(path.sep)
      .filter(Boolean);

    // Private folders en intercepting routes zijn geen zelfstandige routes.
    if (
      segments.some(
        (segment) => segment.startsWith("_") || /^\(\.{1,3}\)/.test(segment),
      )
    )
      continue;

    const visibleSegments = segments.filter(
      (segment) =>
        !segment.startsWith("@") &&
        !(segment.startsWith("(") && segment.endsWith(")")),
    );

    const route = "/" + visibleSegments.join("/");

    routes.push({
      route,
      file: path.relative(ROOT, file),
      regex: routeRegex(route),
    });
  }

  return routes.sort((a, b) => a.route.localeCompare(b.route));
}

function extractStaticHrefs() {
  const items = [];

  for (const file of walk(SRC_DIR)) {
    if (!SOURCE_EXTENSIONS.has(path.extname(file))) continue;

    const source = fs.readFileSync(file, "utf8");
    const patterns = [
      /\bhref\s*=\s*["'](\/[^"']*)["']/g,
      /\bhref\s*:\s*["'](\/[^"']*)["']/g,
      /\bhref\s*=\s*\{\s*["'](\/[^"']*)["']\s*\}/g,
    ];

    for (const pattern of patterns) {
      for (const match of source.matchAll(pattern)) {
        const url = internalUrl(match[1]);
        if (!url) continue;

        items.push({
          href: match[1],
          pathname: normalizePath(url.pathname),
          file: path.relative(ROOT, file),
          line: source.slice(0, match.index).split("\n").length,
        });
      }
    }
  }

  return items;
}

function decodeAttribute(value) {
  return value.replace(
    /&(?:amp|quot|apos|lt|gt|#\d+|#x[0-9a-f]+);/gi,
    (entity) => {
      const key = entity.slice(1, -1).toLowerCase();
      const named = {
        amp: "&",
        quot: '"',
        apos: "'",
        lt: "<",
        gt: ">",
      };

      if (key in named) return named[key];

      const number = key.startsWith("#x")
        ? parseInt(key.slice(2), 16)
        : parseInt(key.slice(1), 10);

      return number > 0 && number <= 0x10ffff
        ? String.fromCodePoint(number)
        : entity;
    },
  );
}

function cleanHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
}

function extractLinks(html, pageUrl) {
  const links = [];
  const pattern = /<a\b[^>]*?\s+href\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

  for (const match of cleanHtml(html).matchAll(pattern)) {
    const href = decodeAttribute(match[1] ?? match[2]).trim();
    if (!href) continue;

    const url = internalUrl(href, pageUrl);
    if (url) links.push(url);
  }

  return links;
}

function extractIds(html) {
  const ids = new Set();
  const pattern = /<[a-z][^>]*?\s+id\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

  for (const match of cleanHtml(html).matchAll(pattern)) {
    ids.add(decodeAttribute(match[1] ?? match[2]));
  }

  return ids;
}

function decodeHash(hash) {
  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

async function fetchPage(url) {
  const startedAt = Date.now();
  const controller = new AbortController();

  console.log(`  Ophalen: ${url}`);

  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const progress = setInterval(() => {
    const seconds = Math.round((Date.now() - startedAt) / 1000);
    console.log(`  Nog bezig... ${seconds} seconden`);
  }, 5_000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "HaagVast-Site-Audit/2.0",
        accept: "text/html,application/xhtml+xml",
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const isHtml = /text\/html|application\/xhtml\+xml/i.test(contentType);

    console.log(`  HTTP ${response.status}; inhoud verwerken...`);

    const html = isHtml ? await response.text() : "";

    if (!isHtml && response.body) {
      await response.body.cancel();
    }

    const ms = Date.now() - startedAt;

    console.log(
      `  ${response.ok ? "OK" : "FOUT"} in ${(ms / 1000).toFixed(1)} seconden`,
    );

    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      redirected: response.redirected,
      html,
      ms,
      error: null,
    };
  } catch (error) {
    const message = controller.signal.aborted
      ? `Timeout na ${TIMEOUT_MS / 1000} seconden`
      : error instanceof Error
        ? error.message
        : String(error);

    console.error(`  FOUT: ${message}`);

    return {
      ok: false,
      status: 0,
      finalUrl: url,
      redirected: false,
      html: "",
      ms: Date.now() - startedAt,
      error: message,
    };
  } finally {
    clearTimeout(timeout);
    clearInterval(progress);
  }
}

async function runLiveAudit(routes) {
  const queue = ["/"];
  const queued = new Set(queue);
  const results = new Map();
  const inbound = new Map();
  const anchorChecks = new Map();

  while (queue.length && results.size < MAX_PAGES) {
    const pathname = queue.shift();

    console.log(
      `\n[Pagina ${results.size + 1}] ${pathname} | Nog in wachtrij: ${queue.length}`,
    );

    const result = await fetchPage(new URL(pathname, BASE_URL).href);
    results.set(pathname, result);

    if (!result.ok || !result.html) continue;
    if (new URL(result.finalUrl).origin !== ORIGIN) continue;

    for (const link of extractLinks(result.html, result.finalUrl)) {
      const target = normalizePath(link.pathname);

      if (!inbound.has(target)) inbound.set(target, new Set());
      inbound.get(target).add(pathname);

      if (link.hash) {
        // Browsertekstfragmenten zijn geen gewone HTML-id's.
        const rawHash = link.hash.slice(1).split(":~:text=")[0];

        if (rawHash) {
          const hash = decodeHash(rawHash);
          const check = { source: pathname, target, hash };
          anchorChecks.set(JSON.stringify(check), check);
        }
      }

      if (!queued.has(target)) {
        queued.add(target);
        queue.push(target);
      }
    }
  }

  const broken = [];
  const redirects = [];

  for (const [pathname, result] of results) {
    if (!result.ok) {
      broken.push({
        pathname,
        status: result.status,
        error: result.error,
        inboundFrom: [...(inbound.get(pathname) || [])],
      });
    }

    if (result.redirected) {
      redirects.push({
        pathname,
        finalUrl: result.finalUrl,
        finalStatus: result.status,
      });
    }
  }

  const idCache = new Map();
  const anchorIssues = [];

  for (const check of anchorChecks.values()) {
    const result = results.get(check.target);

    if (!result?.ok || !result.html) continue;
    if (new URL(result.finalUrl).origin !== ORIGIN) continue;

    if (!idCache.has(check.target)) {
      idCache.set(check.target, extractIds(result.html));
    }

    if (!idCache.get(check.target).has(check.hash)) {
      anchorIssues.push(check);
    }
  }

  const truncated = queue.length > 0;
  const homepage = results.get("/");
  const discoveryComplete =
    !truncated &&
    [...results.values()].every(
      (result) =>
        result.ok &&
        Boolean(result.html) &&
        new URL(result.finalUrl).origin === ORIGIN,
    );

  const orphanStaticRoutes = discoveryComplete
    ? routes
        .filter(
          ({ route }) =>
            route !== "/" && !route.includes("[") && !results.has(route),
        )
        .map(({ route, file }) => ({ route, file }))
    : [];

  return {
    pagesCrawled: results.size,
    broken,
    redirects,
    anchorIssues,
    orphanStaticRoutes,
    orphanCheckComplete: discoveryComplete,
    truncated,
    remainingPages: queue,
    homepageUnavailable: !homepage?.ok || !homepage?.html,
    pages: [...results].map(([pathname, result]) => ({
      pathname,
      status: result.status,
      finalUrl: result.finalUrl,
      ms: result.ms,
      error: result.error,
    })),
  };
}

function escapeMarkdown(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replace(/\r?\n/g, " ");
}

function table(headers, rows) {
  if (!rows.length) return ["Geen gevonden.", ""];

  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeMarkdown).join(" | ")} |`),
    "",
  ];
}

function renderReport(report) {
  const { routes, staticMissing, live } = report;

  const lines = [
    "# HaagVast site-audit",
    "",
    `Gegenereerd: ${report.generatedAt}`,
    `Website: ${report.baseUrl}`,
    "",
    `- Routes gevonden: ${routes.length}`,
    `- Interne hrefs gevonden: ${report.staticHrefCount}`,
    `- Statische links zonder passende route: ${staticMissing.length}`,
    "",
    "## Gedetecteerde routes",
    "",
    ...table(
      ["Route", "Bestand"],
      routes.map((r) => [r.route, r.file]),
    ),
    "## Statische links zonder passende route",
    "",
    ...table(
      ["Link", "Bestand", "Regel"],
      staticMissing.map((r) => [r.href, r.file, r.line]),
    ),
  ];

  if (!live) {
    lines.push(
      "Alleen de broncode is gecontroleerd. HTTP-statussen en anchors zijn niet getest.",
      "",
    );

    return lines.join("\n");
  }

  lines.push(
    "## Live controle",
    "",
    `- Pagina's gecontroleerd: ${live.pagesCrawled}`,
    `- HTTP- en netwerkfouten: ${live.broken.length}`,
    `- Redirects: ${live.redirects.length}`,
    `- Ontbrekende anchors: ${live.anchorIssues.length}`,
    `- Afgekapt door paginalimiet: ${live.truncated ? "ja" : "nee"}`,
    "",
    "De crawl controleert gevonden links in server-HTML, zonder queryvarianten.",
    "Clientinteracties en niet-gelinkte dynamische pagina's worden niet getest.",
    "",
    "## HTTP- en netwerkfouten",
    "",
    ...table(
      ["Pad", "Status", "Gelinkt vanaf", "Fout"],
      live.broken.map((r) => [
        r.pathname,
        r.status || "NET",
        r.inboundFrom.join(", ") || "-",
        r.error || "-",
      ]),
    ),
    "## Redirects",
    "",
    ...table(
      ["Van", "Naar", "Uiteindelijke HTTP-status"],
      live.redirects.map((r) => [r.pathname, r.finalUrl, r.finalStatus]),
    ),
    "## Ontbrekende anchors",
    "",
    ...table(
      ["Vanaf", "Doel", "Anchor"],
      live.anchorIssues.map((r) => [r.source, r.target, `#${r.hash}`]),
    ),
    "## Mogelijk verweesde statische pagina's",
    "",
  );

  if (live.orphanCheckComplete) {
    lines.push(
      ...table(
        ["Route", "Bestand"],
        live.orphanStaticRoutes.map((r) => [r.route, r.file]),
      ),
    );
  } else {
    lines.push(
      "Niet vastgesteld: de crawl was onvolledig of pagina-inhoud ontbrak.",
      "",
    );
  }

  lines.push(
    "## Gecontroleerde pagina's",
    "",
    ...table(
      ["Pad", "Status", "Tijd in ms"],
      live.pages.map((r) => [r.pathname, r.status || "NET", r.ms]),
    ),
  );

  return lines.join("\n");
}

async function main() {
  if (!fs.existsSync(APP_DIR)) {
    throw new Error(
      "Geen src/app of app gevonden. Start vanuit de HaagVast-projectmap.",
    );
  }

  const routes = discoverRoutes();
  const hrefs = extractStaticHrefs();

  const staticMissing = hrefs.filter(
    (item) => !routes.some((route) => route.regex.test(item.pathname)),
  );

  console.log("\n=== STATISCHE ROUTE-AUDIT ===");
  console.log(`Routes gevonden: ${routes.length}`);
  console.log(`Interne hrefs gevonden: ${hrefs.length}`);
  console.log(`Links zonder passende route: ${staticMissing.length}`);

  for (const item of staticMissing) {
    console.log(`  ${item.href} (${item.file}:${item.line})`);
  }

  let live = null;

  if (!STATIC_ONLY) {
    console.log(`\nLive audit op ${BASE_URL}`);
    console.log(`Timeout per pagina: ${TIMEOUT_MS / 1000} seconden`);
    console.log(`Maximaal ${MAX_PAGES} pagina's`);

    live = await runLiveAudit(routes);

    console.log("\n=== LIVE CRAWL ===");
    console.log(`Pagina's gecrawld: ${live.pagesCrawled}`);
    console.log(`HTTP- en netwerkfouten: ${live.broken.length}`);
    console.log(`Redirects: ${live.redirects.length}`);
    console.log(`Ontbrekende anchors: ${live.anchorIssues.length}`);

    for (const item of live.broken) {
      console.log(
        `  [${item.status || "NET"}] ${item.pathname}: ${item.error || "HTTP-fout"}`,
      );

      if (item.inboundFrom.length) {
        console.log(`    Gelinkt vanaf: ${item.inboundFrom.join(", ")}`);
      }
    }

    for (const item of live.anchorIssues) {
      console.log(`  Anchor: ${item.source} -> ${item.target}#${item.hash}`);
    }

    if (live.truncated) {
      console.log("De paginalimiet is bereikt; de controle is onvolledig.");
    }

    if (live.homepageUnavailable) {
      console.log(
        "De homepage kon niet als HTML worden gecontroleerd. Bekijk de fout hierboven.",
      );
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    routes: routes.map(({ route, file }) => ({ route, file })),
    staticHrefCount: hrefs.length,
    staticMissing,
    live,
  };

  fs.mkdirSync(REPORT_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(REPORT_DIR, "site-audit.md"),
    renderReport(report),
    "utf8",
  );

  fs.writeFileSync(
    path.join(REPORT_DIR, "site-audit.json"),
    JSON.stringify(report, null, 2) + "\n",
    "utf8",
  );

  console.log("\nRapport: reports/site-audit.md");
  console.log("JSON: reports/site-audit.json");

  if (STATIC_ONLY) {
    process.exitCode = staticMissing.length ? 1 : 0;

    console.log(
      staticMissing.length
        ? "\nEr zijn statische verwijzingen om te controleren."
        : "\nGeen statische links zonder passende route gevonden.",
    );

    return;
  }

  if (live.homepageUnavailable || live.truncated) {
    process.exitCode = 2;
    return;
  }

  const hasErrors =
    live.broken.length > 0 ||
    live.anchorIssues.length > 0 ||
    (FAIL_ON_REDIRECT && live.redirects.length > 0);

  process.exitCode = hasErrors ? 1 : 0;

  console.log(
    hasErrors
      ? "\nEr zijn problemen gevonden. Bekijk het rapport."
      : "\nGeen HTTP-fouten of ontbrekende anchors gevonden in de gecontroleerde pagina's.",
  );
}

try {
  await main();
} catch (error) {
  console.error(
    "\nAudit mislukt:",
    error instanceof Error ? error.message : String(error),
  );

  process.exitCode = 2;
}
