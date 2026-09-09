const BASE_URL = (
  process.env.AUDIT_BASE_URL ||
  "http://localhost:3000"
).replace(
  /\/$/,
  "",
);

const articles = [
  {
    slug:
      "woning-verkopen-met-slecht-energielabel",

    title:
      "Woning verkopen met slecht energielabel",
  },

  {
    slug:
      "kluswoning-verkopen-of-verbouwen",

    title:
      "Kluswoning verkopen of eerst verbouwen?",
  },

  {
    slug:
      "huis-verkopen-zonder-makelaar",

    title:
      "Huis verkopen zonder makelaar",
  },
];

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

function getCanonical(html) {
  const tags =
    html.match(
      /<link\b[^>]*>/gi,
    ) || [];

  for (const tag of tags) {
    const attrs =
      parseAttributes(tag);

    const rel =
      (
        attrs.rel ||
        ""
      )
        .toLowerCase()
        .split(/\s+/);

    if (
      rel.includes(
        "canonical",
      )
    ) {
      return (
        attrs.href ||
        ""
      );
    }
  }

  return "";
}

function getTitle(html) {
  const match =
    html.match(
      /<title\b[^>]*>([\s\S]*?)<\/title>/i,
    );

  return match
    ? stripTags(
        match[1],
      )
    : "";
}

function getH1s(html) {
  return [
    ...html.matchAll(
      /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi,
    ),
  ].map(
    (match) =>
      stripTags(
        match[1],
      ),
  );
}

function getInternalLinks(html) {
  const links = [];

  const regex =
    /<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi;

  let match;

  while (
    (
      match =
        regex.exec(html)
    )
  ) {
    const href =
      decodeHtml(
        match[1] ??
        match[2] ??
        "",
      );

    if (
      href.startsWith("/")
    ) {
      links.push(
        href.split("#")[0],
      );
    }
  }

  return links;
}

function extractJsonLd(html) {
  const documents = [];

  const regex =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match;

  while (
    (
      match =
        regex.exec(html)
    )
  ) {
    try {
      documents.push(
        JSON.parse(
          match[1].trim(),
        ),
      );
    }
    catch (error) {
      documents.push({
        __parseError:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }

  return documents;
}

function flattenJsonLd(documents) {
  const nodes = [];

  for (
    const document of
    documents
  ) {
    if (
      document?.__parseError
    ) {
      continue;
    }

    if (
      Array.isArray(document)
    ) {
      nodes.push(
        ...document,
      );

      continue;
    }

    if (
      Array.isArray(
        document?.["@graph"],
      )
    ) {
      nodes.push(
        ...document["@graph"],
      );

      continue;
    }

    if (document) {
      nodes.push(
        document,
      );
    }
  }

  return nodes;
}

function hasType(
  node,
  wantedType,
) {
  const type =
    node?.["@type"];

  if (
    Array.isArray(type)
  ) {
    return type.includes(
      wantedType,
    );
  }

  return type ===
    wantedType;
}

async function fetchText(url) {
  const response =
    await fetch(
      url,
      {
        headers: {
          accept:
            "text/html,application/xml",
        },
      },
    );

  return {
    status:
      response.status,

    text:
      await response.text(),
  };
}

const errors = [];
const warnings = [];

console.log(
  "\n=== HAAGVAST KENNISBANK SEO AUDIT ===",
);

const sitemapResult =
  await fetchText(
    `${BASE_URL}/sitemap.xml`,
  );

const sitemapPaths =
  new Set();

if (
  sitemapResult.status === 200
) {
  const locations = [
    ...sitemapResult.text.matchAll(
      /<loc>([\s\S]*?)<\/loc>/gi,
    ),
  ];

  for (
    const match of
    locations
  ) {
    try {
      sitemapPaths.add(
        new URL(
          match[1].trim(),
        ).pathname.replace(
          /\/$/,
          "",
        ) || "/",
      );
    }
    catch {
      // Andere sitemap-audit vangt dit op.
    }
  }
}
else {
  errors.push(
    `sitemap.xml geeft HTTP ${sitemapResult.status}`,
  );
}

for (
  const article of
  articles
) {
  const pathname =
    `/kennisbank/${article.slug}`;

  const result =
    await fetchText(
      `${BASE_URL}${pathname}`,
    );

  if (
    result.status !== 200
  ) {
    errors.push(
      `${pathname}: HTTP ${result.status}`,
    );

    continue;
  }

  const html =
    result.text;

  const title =
    getTitle(html);

  const h1s =
    getH1s(html);

  const canonical =
    getCanonical(html);

  const documents =
    extractJsonLd(html);

  const invalidJson =
    documents.filter(
      (document) =>
        document.__parseError,
    );

  const nodes =
    flattenJsonLd(
      documents,
    );

  const articleSchema =
    nodes.find(
      (node) =>
        hasType(
          node,
          "Article",
        ) ||
        hasType(
          node,
          "BlogPosting",
        ),
    );

  const breadcrumbSchema =
    nodes.find(
      (node) =>
        hasType(
          node,
          "BreadcrumbList",
        ),
    );

  const links =
    getInternalLinks(html);

  const serviceLinks =
    links.filter(
      (href) =>
        [
          "/woning-verkopen",
          "/huis-snel-verkopen",
          "/huis-verkopen-zonder-makelaar",
          "/kluswoning-verkopen",
          "/verhuurde-woning-verkopen",
          "/geerfde-woning-verkopen",
        ].includes(
          href,
        ),
    );

  const regionLinks =
    links.filter(
      (href) =>
        href.startsWith(
          "/regio/",
        ),
    );

  if (!title) {
    errors.push(
      `${pathname}: title ontbreekt`,
    );
  }

  if (
    h1s.length !== 1
  ) {
    errors.push(
      `${pathname}: verwacht 1 H1, gevonden ${h1s.length}`,
    );
  }

  if (!canonical) {
    errors.push(
      `${pathname}: canonical ontbreekt`,
    );
  }
  else {
    try {
      const canonicalPath =
        new URL(
          canonical,
          BASE_URL,
        ).pathname.replace(
          /\/$/,
          "",
        );

      if (
        canonicalPath !==
        pathname
      ) {
        errors.push(
          `${pathname}: canonical wijst naar ${canonicalPath}`,
        );
      }
    }
    catch {
      errors.push(
        `${pathname}: canonical is ongeldig`,
      );
    }
  }

  if (
    invalidJson.length > 0
  ) {
    errors.push(
      `${pathname}: ongeldige JSON-LD`,
    );
  }

  if (!articleSchema) {
    errors.push(
      `${pathname}: Article schema ontbreekt`,
    );
  }
  else {
    if (
      articleSchema.headline !==
      article.title
    ) {
      warnings.push(
        `${pathname}: schema-headline verschilt van centrale SEO-title`,
      );
    }

    if (
      !articleSchema.author
    ) {
      errors.push(
        `${pathname}: Article author ontbreekt`,
      );
    }

    if (
      !articleSchema.publisher
    ) {
      errors.push(
        `${pathname}: Article publisher ontbreekt`,
      );
    }

    if (
      !articleSchema.datePublished
    ) {
      warnings.push(
        `${pathname}: datePublished ontbreekt`,
      );
    }

    if (
      !articleSchema.dateModified
    ) {
      warnings.push(
        `${pathname}: dateModified ontbreekt`,
      );
    }
  }

  if (!breadcrumbSchema) {
    errors.push(
      `${pathname}: BreadcrumbList ontbreekt`,
    );
  }

  if (
    !sitemapPaths.has(
      pathname,
    )
  ) {
    errors.push(
      `${pathname}: ontbreekt in sitemap`,
    );
  }

  if (
    serviceLinks.length === 0
  ) {
    warnings.push(
      `${pathname}: geen contextuele link naar een verkooppagina gevonden`,
    );
  }

  if (
    regionLinks.length === 0
  ) {
    warnings.push(
      `${pathname}: geen contextuele regiolink gevonden`,
    );
  }

  console.log(
    `${pathname}`,
  );

  console.log(
    `  HTTP: ${result.status}`,
  );

  console.log(
    `  H1: ${h1s.length}`,
  );

  console.log(
    `  Article: ${Boolean(articleSchema)}`,
  );

  console.log(
    `  Breadcrumb: ${Boolean(breadcrumbSchema)}`,
  );

  console.log(
    `  Service-links: ${serviceLinks.length}`,
  );

  console.log(
    `  Regio-links: ${regionLinks.length}`,
  );

  console.log(
    `  Sitemap: ${sitemapPaths.has(pathname)}`,
  );
}

console.log(
  "\n=== RESULTAAT ===",
);

console.log(
  `Artikelen gecontroleerd: ${articles.length}`,
);

console.log(
  `Fouten: ${errors.length}`,
);

console.log(
  `Waarschuwingen: ${warnings.length}`,
);

for (
  const error of
  errors
) {
  console.log(
    `  [FOUT] ${error}`,
  );
}

for (
  const warning of
  warnings
) {
  console.log(
    `  [WAARSCHUWING] ${warning}`,
  );
}

if (
  errors.length > 0
) {
  process.exitCode = 1;
}
else {
  console.log(
    "\nKennisbank heeft geen harde SEO-fouten.",
  );
}
