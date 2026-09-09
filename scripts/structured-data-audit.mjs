const BASE_URL = (
  process.env.AUDIT_BASE_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

const regions = [
  {
    slug: "den-haag",
    name: "Den Haag",
  },
  {
    slug: "delft",
    name: "Delft",
  },
  {
    slug: "voorburg",
    name: "Voorburg",
  },
  {
    slug: "leidschendam",
    name: "Leidschendam",
  },
  {
    slug: "rijswijk",
    name: "Rijswijk",
  },
  {
    slug: "wassenaar",
    name: "Wassenaar",
  },
  {
    slug: "zoetermeer",
    name: "Zoetermeer",
  },
  {
    slug: "pijnacker-nootdorp",
    name: "Pijnacker-Nootdorp",
  },
  {
    slug: "midden-delfland",
    name: "Midden-Delfland",
  },
  {
    slug: "westland",
    name: "Westland",
  },
  {
    slug: "voorschoten",
    name: "Voorschoten",
  },
];

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
    const raw =
      match[1].trim();

    try {
      documents.push(
        JSON.parse(raw),
      );
    }
    catch (error) {
      documents.push({
        __parseError:
          error instanceof Error
            ? error.message
            : String(error),

        __raw:
          raw,
      });
    }
  }

  return documents;
}

function flattenNodes(documents) {
  const nodes = [];

  for (const document of documents) {
    if (
      document &&
      typeof document === "object" &&
      "__parseError" in document
    ) {
      continue;
    }

    if (Array.isArray(document)) {
      nodes.push(
        ...document,
      );

      continue;
    }

    if (
      document &&
      Array.isArray(
        document["@graph"],
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

function hasType(node, type) {
  const value =
    node?.["@type"];

  if (Array.isArray(value)) {
    return value.includes(
      type,
    );
  }

  return value === type;
}

async function fetchHtml(pathname) {
  const response =
    await fetch(
      `${BASE_URL}${pathname}`,
      {
        headers: {
          accept:
            "text/html",
        },
      },
    );

  return {
    status:
      response.status,

    html:
      await response.text(),
  };
}

const errors = [];

console.log(
  "\n=== HAAGVAST STRUCTURED DATA AUDIT ===",
);


/*
 * Homepage:
 * Organization + WebSite
 */
const homepage =
  await fetchHtml("/");

if (homepage.status !== 200) {
  errors.push(
    `/ geeft HTTP ${homepage.status}`,
  );
}
else {
  const docs =
    extractJsonLd(
      homepage.html,
    );

  const malformed =
    docs.filter(
      (doc) =>
        doc.__parseError,
    );

  const nodes =
    flattenNodes(docs);

  const organization =
    nodes.find(
      (node) =>
        hasType(
          node,
          "Organization",
        ),
    );

  const website =
    nodes.find(
      (node) =>
        hasType(
          node,
          "WebSite",
        ),
    );

  if (malformed.length) {
    errors.push(
      `Homepage heeft ${malformed.length} ongeldige JSON-LD blok(ken)`,
    );
  }

  if (!organization) {
    errors.push(
      "Homepage mist Organization schema",
    );
  }

  if (!website) {
    errors.push(
      "Homepage mist WebSite schema",
    );
  }

  if (
    organization &&
    (
      !Array.isArray(
        organization.areaServed,
      ) ||
      organization.areaServed.length <
        regions.length
    )
  ) {
    errors.push(
      "Organization heeft niet alle regio's in areaServed",
    );
  }

  console.log(
    `Homepage: Organization=${Boolean(organization)} WebSite=${Boolean(website)}`,
  );
}


/*
 * Alle regiopagina's.
 */
for (const region of regions) {
  const pathname =
    `/regio/${region.slug}`;

  const result =
    await fetchHtml(
      pathname,
    );

  if (
    result.status !== 200
  ) {
    errors.push(
      `${pathname} geeft HTTP ${result.status}`,
    );

    continue;
  }

  const docs =
    extractJsonLd(
      result.html,
    );

  const malformed =
    docs.filter(
      (doc) =>
        doc.__parseError,
    );

  const nodes =
    flattenNodes(docs);

  const service =
    nodes.find(
      (node) =>
        hasType(
          node,
          "Service",
        ) &&
        node.name ===
          `Woning verkopen in ${region.name}`,
    );

  const place =
    nodes.find(
      (node) =>
        hasType(
          node,
          "Place",
        ) &&
        node.name ===
          region.name,
    );

  const breadcrumb =
    nodes.find(
      (node) =>
        hasType(
          node,
          "BreadcrumbList",
        ),
    );

  if (malformed.length) {
    errors.push(
      `${pathname}: ongeldige JSON-LD`,
    );
  }

  if (!service) {
    errors.push(
      `${pathname}: Service schema ontbreekt`,
    );
  }

  if (!place) {
    errors.push(
      `${pathname}: Place schema ontbreekt`,
    );
  }

  if (!breadcrumb) {
    errors.push(
      `${pathname}: BreadcrumbList ontbreekt`,
    );
  }

  if (
    service &&
    service.provider?.["@id"] !==
      "https://haagvast.nl/#organization"
  ) {
    errors.push(
      `${pathname}: Service provider verwijst niet naar HaagVast Organization`,
    );
  }

  if (
    service &&
    place &&
    service.areaServed?.["@id"] !==
      place["@id"]
  ) {
    errors.push(
      `${pathname}: Service areaServed verwijst niet naar lokale Place`,
    );
  }

  console.log(
    `${pathname}: Service=${Boolean(service)} Place=${Boolean(place)} Breadcrumb=${Boolean(breadcrumb)}`,
  );
}


console.log(
  "\n=== RESULTAAT ===",
);

console.log(
  `Gecontroleerde regio's: ${regions.length}`,
);

console.log(
  `Schema-fouten: ${errors.length}`,
);

for (const error of errors) {
  console.log(
    `  [FOUT] ${error}`,
  );
}

if (errors.length > 0) {
  process.exitCode = 1;
}
else {
  console.log(
    "\nStructured data ziet er technisch goed uit.",
  );
}
