import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

const BASE_URL = (
  process.env.AUDIT_BASE_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

const TIMEOUT_MS = Number(
  process.env.AUDIT_TIMEOUT_MS || 30000,
);

const MAX_PAGES = Number(
  process.env.AUDIT_MAX_PAGES || 300,
);

const appDir = path.join(
  projectRoot,
  "src",
  "app",
);

const srcDir = path.join(
  projectRoot,
  "src",
);

const reportsDir = path.join(
  projectRoot,
  "reports",
);

const reportMdPath = path.join(
  reportsDir,
  "site-audit.md",
);

const reportJsonPath = path.join(
  reportsDir,
  "site-audit.json",
);


function normalizePathname(value) {
  if (!value) {
    return "/";
  }

  let pathname = value;

  try {
    if (/^https?:\/\//i.test(value)) {
      pathname = new URL(value).pathname;
    }
  }
  catch {
    return value;
  }

  pathname =
    pathname
      .split("#")[0]
      .split("?")[0] ||
    "/";

  try {
    pathname =
      decodeURIComponent(pathname);
  }
  catch {
    // Ongeldige encoding laten staan.
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  if (pathname.length > 1) {
    pathname =
      pathname.replace(/\/+$/, "");
  }

  return pathname || "/";
}


function escapeRegExp(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}


function routePatternToRegex(route) {
  if (route === "/") {
    return /^\/$/;
  }

  const segments =
    route
      .split("/")
      .filter(Boolean);

  let pattern = "^";

  for (const segment of segments) {
    if (/^\[\.\.\..+\]$/.test(segment)) {
      pattern += "/.+";
      continue;
    }

    if (
      /^\[\[\.\.\..+\]\]$/.test(
        segment,
      )
    ) {
      pattern += "(?:/.+)?";
      continue;
    }

    if (/^\[.+\]$/.test(segment)) {
      pattern += "/[^/]+";
      continue;
    }

    pattern +=
      `/${escapeRegExp(segment)}`;
  }

  pattern += "$";

  return new RegExp(pattern);
}


function walkFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const output = [];

  const entries =
    fs.readdirSync(
      dir,
      {
        withFileTypes: true,
      },
    );

  for (const entry of entries) {
    const fullPath =
      path.join(
        dir,
        entry.name,
      );

    if (entry.isDirectory()) {
      if (
        [
          "node_modules",
          ".next",
          ".git",
        ].includes(entry.name)
      ) {
        continue;
      }

      output.push(
        ...walkFiles(fullPath),
      );

      continue;
    }

    output.push(fullPath);
  }

  return output;
}


function discoverRoutes() {
  const pageFiles =
    walkFiles(appDir)
      .filter(
        (file) =>
          /[\\/]page\.(?:js|jsx|ts|tsx)$/.test(
            file,
          ),
      );

  return pageFiles
    .map((file) => {
      const relativeDir =
        path.relative(
          appDir,
          path.dirname(file),
        );

      if (!relativeDir) {
        return "/";
      }

      const segments =
        relativeDir
          .split(path.sep)
          .filter(Boolean)
          .filter(
            (segment) =>
              !/^\(.+\)$/.test(
                segment,
              ),
          )
          .filter(
            (segment) =>
              !/^@/.test(segment),
          );

      return `/${segments.join("/")}`;
    })
    .sort();
}


function discoverSourceHrefs() {
  const files =
    walkFiles(srcDir)
      .filter(
        (file) =>
          /\.(?:js|jsx|ts|tsx)$/.test(
            file,
          ),
      );

  const hrefs = [];

  const patterns = [
    /\bhref\s*=\s*["']([^"']+)["']/g,
    /\bhref\s*:\s*["']([^"']+)["']/g,
  ];

  for (const file of files) {
    const source =
      fs.readFileSync(
        file,
        "utf8",
      );

    for (const pattern of patterns) {
      pattern.lastIndex = 0;

      let match;

      while (
        (
          match =
            pattern.exec(source)
        )
      ) {
        const href =
          match[1].trim();

        if (!href.startsWith("/")) {
          continue;
        }

        if (href.startsWith("//")) {
          continue;
        }

        hrefs.push({
          href,

          pathname:
            normalizePathname(
              href,
            ),

          file:
            path.relative(
              projectRoot,
              file,
            ),
        });
      }
    }
  }

  return hrefs;
}


function routeExists(
  pathname,
  routes,
) {
  const cleanPath =
    normalizePathname(pathname);

  return routes.some(
    (route) =>
      routePatternToRegex(
        route,
      ).test(cleanPath),
  );
}


function decodeHtml(value = "") {
  return value
    .replace(
      /&amp;/gi,
      "&",
    )
    .replace(
      /&quot;/gi,
      '"',
    )
    .replace(
      /&#39;|&apos;/gi,
      "'",
    )
    .replace(
      /&lt;/gi,
      "<",
    )
    .replace(
      /&gt;/gi,
      ">",
    )
    .replace(
      /&nbsp;/gi,
      " ",
    )
    .replace(
      /&#(\d+);/g,
      (_, code) =>
        String.fromCodePoint(
          Number(code),
        ),
    )
    .replace(
      /&#x([0-9a-f]+);/gi,
      (_, code) =>
        String.fromCodePoint(
          parseInt(
            code,
            16,
          ),
        ),
    );
}


function stripTags(value = "") {
  return decodeHtml(
    value.replace(
      /<[^>]*>/g,
      " ",
    ),
  )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}


function parseAttributes(tag = "") {
  const attrs = {};

  const regex =
    /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;

  let match;

  while (
    (
      match =
        regex.exec(tag)
    )
  ) {
    attrs[
      match[1].toLowerCase()
    ] =
      decodeHtml(
        match[2] ??
        match[3] ??
        match[4] ??
        "",
      );
  }

  return attrs;
}


function findOpeningTags(
  html,
  tagName,
) {
  const regex =
    new RegExp(
      `<${tagName}\\b[^>]*>`,
      "gi",
    );

  return html.match(regex) || [];
}


function getTitle(html) {
  const matches =
    [
      ...html.matchAll(
        /<title\b[^>]*>([\s\S]*?)<\/title>/gi,
      ),
    ];

  return {
    count:
      matches.length,

    value:
      matches.length
        ? stripTags(
            matches[0][1],
          )
        : "",
  };
}


function getMeta(
  html,
  key,
  value,
) {
  const tags =
    findOpeningTags(
      html,
      "meta",
    );

  for (const tag of tags) {
    const attrs =
      parseAttributes(tag);

    if (
      (
        attrs[key] ||
        ""
      ).toLowerCase() ===
      value.toLowerCase()
    ) {
      return (
        attrs.content ||
        ""
      ).trim();
    }
  }

  return "";
}


function getCanonical(html) {
  const tags =
    findOpeningTags(
      html,
      "link",
    );

  for (const tag of tags) {
    const attrs =
      parseAttributes(tag);

    const relTokens =
      (
        attrs.rel ||
        ""
      )
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

    if (
      relTokens.includes(
        "canonical",
      )
    ) {
      return (
        attrs.href ||
        ""
      ).trim();
    }
  }

  return "";
}


function getHeadings(
  html,
  level = 1,
) {
  const regex =
    new RegExp(
      `<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`,
      "gi",
    );

  return [
    ...html.matchAll(regex),
  ]
    .map(
      (match) =>
        stripTags(
          match[1],
        ),
    )
    .filter(Boolean);
}


function getIds(html) {
  const ids =
    new Set();

  const regex =
    /\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;

  let match;

  while (
    (
      match =
        regex.exec(html)
    )
  ) {
    ids.add(
      decodeHtml(
        match[1] ??
        match[2] ??
        "",
      ),
    );
  }

  return ids;
}


function extractHtmlLinks(
  html,
  currentUrl,
) {
  const links = [];

  const regex =
    /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi;

  let match;

  while (
    (
      match =
        regex.exec(html)
    )
  ) {
    const rawHref =
      decodeHtml(
        match[1] ??
        match[2] ??
        "",
      ).trim();

    if (!rawHref) {
      continue;
    }

    if (
      /^(?:mailto:|tel:|javascript:|data:)/i.test(
        rawHref,
      )
    ) {
      continue;
    }

    let url;

    try {
      url =
        new URL(
          rawHref,
          currentUrl,
        );
    }
    catch {
      continue;
    }

    const base =
      new URL(BASE_URL);

    if (
      url.origin !==
      base.origin
    ) {
      continue;
    }

    links.push({
      rawHref,

      pathname:
        normalizePathname(
          url.pathname,
        ),

      hash:
        url.hash
          ? decodeURIComponent(
              url.hash.slice(1),
            )
          : "",

      absoluteUrl:
        url.href,
    });
  }

  return links;
}


function canonicalPath(
  canonical,
) {
  if (!canonical) {
    return "";
  }

  try {
    return normalizePathname(
      new URL(
        canonical,
        BASE_URL,
      ).pathname,
    );
  }
  catch {
    return "";
  }
}


function analyzeSeo(
  html,
  pathname,
) {
  const title =
    getTitle(html);

  const description =
    getMeta(
      html,
      "name",
      "description",
    );

  const robots =
    getMeta(
      html,
      "name",
      "robots",
    );

  const canonical =
    getCanonical(html);

  const h1s =
    getHeadings(
      html,
      1,
    );

  const ogTitle =
    getMeta(
      html,
      "property",
      "og:title",
    );

  const ogDescription =
    getMeta(
      html,
      "property",
      "og:description",
    );

  const ogUrl =
    getMeta(
      html,
      "property",
      "og:url",
    );

  const errors = [];
  const warnings = [];

  if (
    title.count === 0 ||
    !title.value
  ) {
    errors.push(
      "Ontbrekende <title>",
    );
  }

  if (
    title.count > 1
  ) {
    errors.push(
      `Meerdere <title>-tags (${title.count})`,
    );
  }

  if (
    title.value &&
    title.value.length < 20
  ) {
    warnings.push(
      `Korte title (${title.value.length} tekens)`,
    );
  }

  if (
    title.value &&
    title.value.length > 65
  ) {
    warnings.push(
      `Lange title (${title.value.length} tekens)`,
    );
  }


  if (!description) {
    errors.push(
      "Ontbrekende meta description",
    );
  }

  if (
    description &&
    description.length < 70
  ) {
    warnings.push(
      `Korte meta description (${description.length} tekens)`,
    );
  }

  if (
    description &&
    description.length > 170
  ) {
    warnings.push(
      `Lange meta description (${description.length} tekens)`,
    );
  }


  if (
    h1s.length === 0
  ) {
    errors.push(
      "Ontbrekende H1",
    );
  }

  if (
    h1s.length > 1
  ) {
    warnings.push(
      `Meerdere H1's (${h1s.length})`,
    );
  }


  if (!canonical) {
    errors.push(
      "Ontbrekende canonical",
    );
  }
  else {
    const canonicalPathname =
      canonicalPath(
        canonical,
      );

    if (
      canonicalPathname &&
      canonicalPathname !==
        pathname
    ) {
      errors.push(
        `Canonical wijst naar ${canonicalPathname}`,
      );
    }
  }


  if (
    /\bnoindex\b/i.test(
      robots,
    )
  ) {
    warnings.push(
      "Pagina staat op noindex",
    );
  }


  if (!ogTitle) {
    warnings.push(
      "Ontbrekende og:title",
    );
  }

  if (!ogDescription) {
    warnings.push(
      "Ontbrekende og:description",
    );
  }

  if (!ogUrl) {
    warnings.push(
      "Ontbrekende og:url",
    );
  }


  return {
    title:
      title.value,

    titleCount:
      title.count,

    description,

    h1s,

    canonical,

    robots,

    ogTitle,

    ogDescription,

    ogUrl,

    errors,

    warnings,
  };
}


async function fetchPage(url) {
  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () =>
        controller.abort(),
      TIMEOUT_MS,
    );

  const startedAt =
    Date.now();

  try {
    const response =
      await fetch(
        url,
        {
          redirect:
            "follow",

          signal:
            controller.signal,

          headers: {
            "user-agent":
              "HaagVast-Site-Audit/2.0",

            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        },
      );

    const contentType =
      response.headers.get(
        "content-type",
      ) || "";

    const html =
      await response.text();

    return {
      ok:
        response.ok,

      status:
        response.status,

      finalUrl:
        response.url,

      redirected:
        response.redirected,

      html,

      contentType,

      ms:
        Date.now() -
        startedAt,

      error:
        "",
    };
  }
  catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return {
      ok:
        false,

      status:
        0,

      finalUrl:
        url,

      redirected:
        false,

      html:
        "",

      contentType:
        "",

      ms:
        Date.now() -
        startedAt,

      error:
        message,
    };
  }
  finally {
    clearTimeout(
      timeout,
    );
  }
}


function duplicateGroups(
  pages,
  field,
) {
  const map =
    new Map();

  for (const page of pages) {
    const value =
      (
        page.seo?.[field] ||
        ""
      ).trim();

    if (!value) {
      continue;
    }

    const key =
      value.toLowerCase();

    if (!map.has(key)) {
      map.set(
        key,
        {
          value,
          paths: [],
        },
      );
    }

    map.get(key)
      .paths
      .push(
        page.pathname,
      );
  }

  return [
    ...map.values(),
  ].filter(
    (group) =>
      group.paths.length > 1,
  );
}


function parseSitemapLocs(xml) {
  return [
    ...xml.matchAll(
      /<loc\b[^>]*>([\s\S]*?)<\/loc>/gi,
    ),
  ]
    .map(
      (match) =>
        stripTags(
          match[1],
        ),
    )
    .filter(Boolean);
}


function formatIssueList(items) {
  if (!items.length) {
    return "- Geen\n";
  }

  return (
    items
      .map(
        (item) =>
          `- ${item}`,
      )
      .join("\n") +
    "\n"
  );
}


function pageIsHtml(page) {
  return (
    page.status >= 200 &&
    page.status < 400 &&
    /text\/html|application\/xhtml\+xml/i.test(
      page.contentType,
    )
  );
}


async function main() {
  fs.mkdirSync(
    reportsDir,
    {
      recursive: true,
    },
  );


  // =====================================================
  // STATISCHE ROUTE-AUDIT
  // =====================================================

  const routes =
    discoverRoutes();

  const sourceHrefs =
    discoverSourceHrefs();

  const invalidSourceHrefs =
    sourceHrefs.filter(
      (item) =>
        !routeExists(
          item.pathname,
          routes,
        ),
    );


  console.log(
    "\n=== STATISCHE ROUTE-AUDIT ===",
  );

  console.log(
    `Routes gevonden: ${routes.length}`,
  );

  console.log(
    `Interne hrefs gevonden: ${sourceHrefs.length}`,
  );

  console.log(
    `Links zonder passende route: ${invalidSourceHrefs.length}`,
  );


  for (
    const item of
    invalidSourceHrefs.slice(
      0,
      50,
    )
  ) {
    console.log(
      `  [GEEN ROUTE] ${item.href} in ${item.file}`,
    );
  }


  // =====================================================
  // LIVE CRAWL
  // =====================================================

  console.log(
    `\nLive audit op ${BASE_URL}`,
  );

  console.log(
    `Timeout per pagina: ${Math.round(TIMEOUT_MS / 1000)} seconden`,
  );

  console.log(
    `Maximaal ${MAX_PAGES} pagina's`,
  );


  const queue = ["/"];

  const queued =
    new Set(queue);

  const visited =
    new Set();

  const pages = [];

  const anchorReferences = [];

  const inbound =
    new Map();


  while (
    queue.length &&
    pages.length <
      MAX_PAGES
  ) {
    const pathname =
      queue.shift();

    queued.delete(
      pathname,
    );

    if (
      visited.has(
        pathname,
      )
    ) {
      continue;
    }

    visited.add(
      pathname,
    );


    const pageNumber =
      pages.length + 1;

    const url =
      `${BASE_URL}${
        pathname === "/"
          ? "/"
          : pathname
      }`;


    console.log(
      `\n[Pagina ${pageNumber}] ${pathname} | Nog in wachtrij: ${queue.length}`,
    );

    console.log(
      `  Ophalen: ${url}`,
    );


    const result =
      await fetchPage(
        url,
      );

    const seconds =
      (
        result.ms /
        1000
      ).toFixed(1);

    const isHtml =
      /text\/html|application\/xhtml\+xml/i.test(
        result.contentType,
      );


    const page = {
      pathname,

      requestedUrl:
        url,

      finalUrl:
        result.finalUrl,

      status:
        result.status,

      redirected:
        result.redirected,

      contentType:
        result.contentType,

      ms:
        result.ms,

      error:
        result.error,

      ids: [],

      links: [],

      seo: null,
    };


    if (!result.ok) {
      console.log(
        `  HTTP ${result.status || 0}; FOUT in ${seconds} seconden`,
      );

      pages.push(
        page,
      );

      continue;
    }


    if (!isHtml) {
      console.log(
        `  HTTP ${result.status}; geen HTML (${result.contentType || "onbekend"})`,
      );

      pages.push(
        page,
      );

      continue;
    }


    const ids =
      getIds(
        result.html,
      );

    const links =
      extractHtmlLinks(
        result.html,
        result.finalUrl,
      );

    const seo =
      analyzeSeo(
        result.html,
        pathname,
      );


    page.ids =
      [...ids];

    page.links =
      links;

    page.seo =
      seo;

    pages.push(
      page,
    );


    console.log(
      `  HTTP ${result.status}; inhoud verwerken...`,
    );


    for (
      const link of
      links
    ) {
      if (
        !inbound.has(
          link.pathname,
        )
      ) {
        inbound.set(
          link.pathname,
          new Set(),
        );
      }


      inbound
        .get(
          link.pathname,
        )
        .add(
          pathname,
        );


      if (link.hash) {
        anchorReferences.push({
          source:
            pathname,

          targetPath:
            link.pathname,

          hash:
            link.hash,
        });
      }


      const looksLikePage =
        !/\.[a-z0-9]{2,8}$/i.test(
          link.pathname,
        );


      if (!looksLikePage) {
        continue;
      }


      if (
        link.pathname.startsWith(
          "/api/",
        )
      ) {
        continue;
      }


      if (
        !visited.has(
          link.pathname,
        ) &&
        !queued.has(
          link.pathname,
        ) &&
        visited.size +
          queue.length <
          MAX_PAGES
      ) {
        queue.push(
          link.pathname,
        );

        queued.add(
          link.pathname,
        );
      }
    }


    const issueCount =
      seo.errors.length +
      seo.warnings.length;


    console.log(
      `  OK in ${seconds} seconden${
        issueCount
          ? `; SEO-signalen: ${issueCount}`
          : ""
      }`,
    );
  }


  // =====================================================
  // LIVE RESULTATEN
  // =====================================================

  const pageMap =
    new Map(
      pages.map(
        (page) => [
          page.pathname,
          page,
        ],
      ),
    );


  const httpErrors =
    pages.filter(
      (page) =>
        page.status === 0 ||
        page.status >= 400,
    );


  const redirects =
    pages.filter(
      (page) =>
        page.redirected,
    );


  const missingAnchors = [];


  for (
    const ref of
    anchorReferences
  ) {
    const target =
      pageMap.get(
        ref.targetPath,
      );


    if (
      !target ||
      target.status >= 400 ||
      target.status === 0
    ) {
      continue;
    }


    if (
      !target.ids.includes(
        ref.hash,
      )
    ) {
      missingAnchors.push(
        ref,
      );
    }
  }


  const htmlPages =
    pages.filter(
      pageIsHtml,
    );


  const seoErrors =
    htmlPages.flatMap(
      (page) =>
        (
          page.seo?.errors ||
          []
        ).map(
          (message) => ({
            pathname:
              page.pathname,

            message,
          }),
        ),
    );


  const seoWarnings =
    htmlPages.flatMap(
      (page) =>
        (
          page.seo?.warnings ||
          []
        ).map(
          (message) => ({
            pathname:
              page.pathname,

            message,
          }),
        ),
    );


  const duplicateTitles =
    duplicateGroups(
      htmlPages,
      "title",
    );


  const duplicateDescriptions =
    duplicateGroups(
      htmlPages,
      "description",
    );


  const orphanPages =
    htmlPages
      .filter(
        (page) =>
          page.pathname !== "/",
      )
      .filter(
        (page) =>
          (
            inbound.get(
              page.pathname,
            )?.size ||
            0
          ) === 0,
      )
      .map(
        (page) =>
          page.pathname,
      );


  console.log(
    "\n=== LIVE CRAWL ===",
  );

  console.log(
    `Pagina's gecrawld: ${pages.length}`,
  );

  console.log(
    `HTTP- en netwerkfouten: ${httpErrors.length}`,
  );

  console.log(
    `Redirects: ${redirects.length}`,
  );

  console.log(
    `Ontbrekende anchors: ${missingAnchors.length}`,
  );


  for (
    const page of
    httpErrors
  ) {
    console.log(
      `  [${page.status || "NETWERK"}] ${page.pathname}: ${page.error || "HTTP-fout"}`,
    );
  }


  for (
    const ref of
    missingAnchors
  ) {
    console.log(
      `  [ANCHOR] ${ref.source} -> ${ref.targetPath}#${ref.hash}`,
    );
  }


  // =====================================================
  // TECHNISCHE SEO
  // =====================================================

  console.log(
    "\n=== TECHNISCHE SEO ===",
  );

  console.log(
    `SEO-fouten: ${seoErrors.length}`,
  );

  console.log(
    `SEO-waarschuwingen: ${seoWarnings.length}`,
  );

  console.log(
    `Dubbele titles: ${duplicateTitles.length}`,
  );

  console.log(
    `Dubbele descriptions: ${duplicateDescriptions.length}`,
  );

  console.log(
    `Pagina's zonder interne inkomende link: ${orphanPages.length}`,
  );


  for (
    const issue of
    seoErrors
  ) {
    console.log(
      `  [SEO FOUT] ${issue.pathname}: ${issue.message}`,
    );
  }


  for (
    const issue of
    seoWarnings
  ) {
    console.log(
      `  [SEO WAARSCHUWING] ${issue.pathname}: ${issue.message}`,
    );
  }


  for (
    const group of
    duplicateTitles
  ) {
    console.log(
      `  [DUBBELE TITLE] "${group.value}" -> ${group.paths.join(", ")}`,
    );
  }


  for (
    const group of
    duplicateDescriptions
  ) {
    console.log(
      `  [DUBBELE DESCRIPTION] "${group.value}" -> ${group.paths.join(", ")}`,
    );
  }


  for (
    const pathname of
    orphanPages
  ) {
    console.log(
      `  [ORPHAN] ${pathname}`,
    );
  }


  // =====================================================
  // SITEMAP
  // =====================================================

  console.log(
    "\n=== SITEMAP ===",
  );


  const sitemapResult =
    await fetchPage(
      `${BASE_URL}/sitemap.xml`,
    );


  const sitemap = {
    status:
      sitemapResult.status,

    error:
      sitemapResult.error,

    urls: [],

    brokenUrls: [],

    missingIndexablePages: [],
  };


  if (
    sitemapResult.ok
  ) {
    sitemap.urls =
      parseSitemapLocs(
        sitemapResult.html,
      );


    const sitemapPaths =
      new Set(
        sitemap.urls.map(
          (url) =>
            normalizePathname(
              url,
            ),
        ),
      );


    const indexablePages =
      htmlPages.filter(
        (page) =>
          !/\bnoindex\b/i.test(
            page.seo?.robots ||
            "",
          ),
      );


    sitemap.missingIndexablePages =
      indexablePages
        .map(
          (page) =>
            page.pathname,
        )
        .filter(
          (pathname) =>
            !sitemapPaths.has(
              pathname,
            ),
        );


    for (
      const loc of
      sitemap.urls.slice(
        0,
        MAX_PAGES,
      )
    ) {
      let pathname;


      try {
        pathname =
          normalizePathname(
            new URL(
              loc,
              BASE_URL,
            ).pathname,
          );
      }
      catch {
        sitemap.brokenUrls.push({
          url:
            loc,

          status:
            0,

          error:
            "Ongeldige sitemap-URL",
        });

        continue;
      }


      const localUrl =
        `${BASE_URL}${
          pathname === "/"
            ? "/"
            : pathname
        }`;


      const check =
        await fetchPage(
          localUrl,
        );


      if (!check.ok) {
        sitemap.brokenUrls.push({
          url:
            loc,

          pathname,

          status:
            check.status,

          error:
            check.error ||
            "HTTP-fout",
        });
      }
    }


    console.log(
      `Sitemap-URL's: ${sitemap.urls.length}`,
    );

    console.log(
      `Kapotte sitemap-URL's: ${sitemap.brokenUrls.length}`,
    );

    console.log(
      `Indexeerbare crawl-pagina's niet in sitemap: ${sitemap.missingIndexablePages.length}`,
    );
  }


  if (
    !sitemapResult.ok
  ) {
    console.log(
      `Sitemap kon niet worden geladen: HTTP ${sitemapResult.status || 0} ${sitemapResult.error || ""}`,
    );
  }


  for (
    const item of
    sitemap.brokenUrls
  ) {
    console.log(
      `  [SITEMAP FOUT] ${item.pathname || item.url}: ${item.status || "NETWERK"} ${item.error}`,
    );
  }


  for (
    const pathname of
    sitemap.missingIndexablePages
  ) {
    console.log(
      `  [NIET IN SITEMAP] ${pathname}`,
    );
  }


  // =====================================================
  // SAMENVATTING
  // =====================================================

  const summary = {
    routesFound:
      routes.length,

    sourceHrefsFound:
      sourceHrefs.length,

    sourceHrefsWithoutRoute:
      invalidSourceHrefs.length,

    crawledPages:
      pages.length,

    httpErrors:
      httpErrors.length,

    redirects:
      redirects.length,

    missingAnchors:
      missingAnchors.length,

    seoErrors:
      seoErrors.length,

    seoWarnings:
      seoWarnings.length,

    duplicateTitles:
      duplicateTitles.length,

    duplicateDescriptions:
      duplicateDescriptions.length,

    orphanPages:
      orphanPages.length,

    sitemapUrls:
      sitemap.urls.length,

    brokenSitemapUrls:
      sitemap.brokenUrls.length,

    pagesMissingFromSitemap:
      sitemap.missingIndexablePages.length,
  };


  // =====================================================
  // JSON RAPPORT
  // =====================================================

  const jsonReport = {
    generatedAt:
      new Date().toISOString(),

    baseUrl:
      BASE_URL,

    summary,

    routes,

    invalidSourceHrefs,

    pages,

    httpErrors,

    redirects,

    missingAnchors,

    seoErrors,

    seoWarnings,

    duplicateTitles,

    duplicateDescriptions,

    orphanPages,

    sitemap,
  };


  fs.writeFileSync(
    reportJsonPath,
    JSON.stringify(
      jsonReport,
      null,
      2,
    ),
    "utf8",
  );


  // =====================================================
  // MARKDOWN RAPPORT
  // =====================================================

  const md = [];


  md.push(
    "# HaagVast site-audit",
  );

  md.push("");

  md.push(
    `Gegenereerd: ${new Date().toLocaleString("nl-NL")}`,
  );

  md.push(
    `Basis-URL: ${BASE_URL}`,
  );

  md.push("");


  md.push(
    "## Samenvatting",
  );

  md.push("");

  md.push(
    `- Routes gevonden: ${summary.routesFound}`,
  );

  md.push(
    `- Interne hrefs in broncode: ${summary.sourceHrefsFound}`,
  );

  md.push(
    `- Hrefs zonder passende route: ${summary.sourceHrefsWithoutRoute}`,
  );

  md.push(
    `- Pagina's gecrawld: ${summary.crawledPages}`,
  );

  md.push(
    `- HTTP-/netwerkfouten: ${summary.httpErrors}`,
  );

  md.push(
    `- Redirects: ${summary.redirects}`,
  );

  md.push(
    `- Ontbrekende anchors: ${summary.missingAnchors}`,
  );

  md.push(
    `- SEO-fouten: ${summary.seoErrors}`,
  );

  md.push(
    `- SEO-waarschuwingen: ${summary.seoWarnings}`,
  );

  md.push(
    `- Dubbele titles: ${summary.duplicateTitles}`,
  );

  md.push(
    `- Dubbele descriptions: ${summary.duplicateDescriptions}`,
  );

  md.push(
    `- Orphan crawl-pagina's: ${summary.orphanPages}`,
  );

  md.push(
    `- Sitemap-URL's: ${summary.sitemapUrls}`,
  );

  md.push(
    `- Kapotte sitemap-URL's: ${summary.brokenSitemapUrls}`,
  );

  md.push(
    `- Indexeerbare pagina's niet in sitemap: ${summary.pagesMissingFromSitemap}`,
  );

  md.push("");


  md.push(
    "## HTTP- en netwerkfouten",
  );

  md.push("");

  md.push(
    formatIssueList(
      httpErrors.map(
        (page) =>
          `${page.status || "NETWERK"} ${page.pathname} - ${page.error || "HTTP-fout"}`,
      ),
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## Ontbrekende anchors",
  );

  md.push("");

  md.push(
    formatIssueList(
      missingAnchors.map(
        (ref) =>
          `${ref.source} -> ${ref.targetPath}#${ref.hash}`,
      ),
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## SEO-fouten",
  );

  md.push("");

  md.push(
    formatIssueList(
      seoErrors.map(
        (issue) =>
          `${issue.pathname} - ${issue.message}`,
      ),
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## SEO-waarschuwingen",
  );

  md.push("");

  md.push(
    formatIssueList(
      seoWarnings.map(
        (issue) =>
          `${issue.pathname} - ${issue.message}`,
      ),
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## Dubbele titles",
  );

  md.push("");

  md.push(
    formatIssueList(
      duplicateTitles.map(
        (group) =>
          `\`${group.value}\` -> ${group.paths.join(", ")}`,
      ),
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## Dubbele descriptions",
  );

  md.push("");

  md.push(
    formatIssueList(
      duplicateDescriptions.map(
        (group) =>
          `\`${group.value}\` -> ${group.paths.join(", ")}`,
      ),
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## Pagina's zonder interne inkomende link",
  );

  md.push("");

  md.push(
    formatIssueList(
      orphanPages,
    ).trimEnd(),
  );

  md.push("");


  md.push(
    "## Sitemap",
  );

  md.push("");

  md.push(
    `- HTTP-status: ${sitemap.status || 0}`,
  );

  md.push(
    `- URL's: ${sitemap.urls.length}`,
  );

  md.push(
    `- Kapotte URL's: ${sitemap.brokenUrls.length}`,
  );

  md.push(
    `- Indexeerbare crawl-pagina's niet in sitemap: ${sitemap.missingIndexablePages.length}`,
  );

  md.push("");


  if (
    sitemap.brokenUrls.length
  ) {
    md.push(
      "### Kapotte sitemap-URL's",
    );

    md.push("");

    md.push(
      formatIssueList(
        sitemap.brokenUrls.map(
          (item) =>
            `${item.pathname || item.url} - ${item.status || "NETWERK"} ${item.error}`,
        ),
      ).trimEnd(),
    );

    md.push("");
  }


  if (
    sitemap.missingIndexablePages.length
  ) {
    md.push(
      "### Niet in sitemap",
    );

    md.push("");

    md.push(
      formatIssueList(
        sitemap.missingIndexablePages,
      ).trimEnd(),
    );

    md.push("");
  }


  md.push(
    "## Pagina-overzicht",
  );

  md.push("");

  md.push(
    "| Pagina | HTTP | Title | Description | H1 | Canonical | SEO-fouten | Waarschuwingen |",
  );

  md.push(
    "| --- | ---: | --- | ---: | ---: | --- | ---: | ---: |",
  );


  for (
    const page of
    htmlPages
  ) {
    const seo =
      page.seo || {};

    const safeTitle =
      (
        seo.title ||
        "-"
      ).replace(
        /\|/g,
        "\\|",
      );

    const canonical =
      (
        seo.canonical ||
        "-"
      ).replace(
        /\|/g,
        "\\|",
      );


    md.push(
      `| ${page.pathname} | ${page.status} | ${safeTitle} | ${(seo.description || "").length} | ${(seo.h1s || []).length} | ${canonical} | ${(seo.errors || []).length} | ${(seo.warnings || []).length} |`,
    );
  }


  md.push("");


  fs.writeFileSync(
    reportMdPath,
    md.join("\n"),
    "utf8",
  );


  // =====================================================
  // EINDE
  // =====================================================

  console.log(
    `\nRapport: ${path.relative(projectRoot, reportMdPath)}`,
  );

  console.log(
    `JSON: ${path.relative(projectRoot, reportJsonPath)}`,
  );


  const hardProblemCount =
    invalidSourceHrefs.length +
    httpErrors.length +
    missingAnchors.length +
    seoErrors.length +
    duplicateTitles.length +
    duplicateDescriptions.length +
    sitemap.brokenUrls.length;


  if (
    hardProblemCount > 0
  ) {
    console.log(
      "\nEr zijn technische of SEO-problemen gevonden. Bekijk het rapport.",
    );

    process.exitCode = 1;

    return;
  }


  console.log(
    "\nGeen harde technische of SEO-fouten gevonden.",
  );


  if (
    seoWarnings.length ||
    orphanPages.length ||
    sitemap.missingIndexablePages.length
  ) {
    console.log(
      "Er zijn wel optimalisatiepunten/waarschuwingen. Bekijk het rapport.",
    );
  }
}


await main();
