import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import type { HaagVastRegion } from "@/data/haagvast-regions";

type RegionStructuredDataProps = {
  region: HaagVastRegion;
};

export default function RegionStructuredData({
  region,
}: RegionStructuredDataProps) {
  const canonicalUrl =
    `${siteConfig.url}/regio/${region.slug}`;

  const organizationId =
    `${siteConfig.url}/#organization`;

  const placeId =
    `${canonicalUrl}#place`;

  const serviceId =
    `${canonicalUrl}#service`;

  const place = {
    "@type": "Place",

    "@id":
      placeId,

    name:
      region.name,

    ...(region.municipality !==
    region.name
      ? {
          containedInPlace: {
            "@type":
              "AdministrativeArea",

            name:
              region.municipality,
          },
        }
      : {}),

    containsPlace:
      region.areas.map(
        (area) => ({
          "@type": "Place",

          name:
            `${area}, ${region.name}`,
        }),
      ),
  };

  const service = {
    "@type": "Service",

    "@id":
      serviceId,

    name:
      `Woning verkopen in ${region.name}`,

    serviceType:
      "Rechtstreekse woningverkoop",

    description:
      region.seoDescription,

    url:
      canonicalUrl,

    provider: {
      "@id":
        organizationId,
    },

    areaServed: {
      "@id":
        placeId,
    },
  };

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      place,
      service,
    ],
  };

  return (
    <JsonLd
      data={structuredData}
    />
  );
}
