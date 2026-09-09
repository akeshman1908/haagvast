import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { regions } from "@/data/haagvast-regions";

export default function OrganizationStructuredData() {
  const organizationId =
    `${siteConfig.url}/#organization`;

  const websiteId =
    `${siteConfig.url}/#website`;

  const sameAs: string[] = Object.values(
    siteConfig.social,
  ).filter(
    (url) =>
      url.trim().length > 0,
  );

  const hasAddress = Boolean(
    siteConfig.address.street ||
      siteConfig.address.postalCode ||
      siteConfig.address.city,
  );

  const hasContactPoint = Boolean(
    siteConfig.contact.phone ||
      siteConfig.contact.email,
  );

  const address = hasAddress
    ? {
        "@type": "PostalAddress",
        ...(siteConfig.address.street
          ? {
              streetAddress:
                siteConfig.address.street,
            }
          : {}),
        ...(siteConfig.address.postalCode
          ? {
              postalCode:
                siteConfig.address.postalCode,
            }
          : {}),
        ...(siteConfig.address.city
          ? {
              addressLocality:
                siteConfig.address.city,
            }
          : {}),
        addressCountry:
          siteConfig.address.countryCode,
      }
    : undefined;

  const contactPoint = hasContactPoint
    ? {
        "@type": "ContactPoint",
        contactType: "customer service",
        ...(siteConfig.contact.phone
          ? {
              telephone:
                siteConfig.contact.phone,
            }
          : {}),
        ...(siteConfig.contact.email
          ? {
              email:
                siteConfig.contact.email,
            }
          : {}),
        areaServed: "NL",
        availableLanguage: [
          "nl",
        ],
      }
    : undefined;

  const areaServed = regions.map(
    (region) => ({
      "@type": "Place",
      name: region.name,
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
    }),
  );

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type":
          "Organization",

        "@id":
          organizationId,

        name:
          siteConfig.name,

        legalName:
          siteConfig.legalName,

        url:
          siteConfig.url,

        description:
          siteConfig.description,

        areaServed,

        ...(address
          ? {
              address,
            }
          : {}),

        ...(contactPoint
          ? {
              contactPoint,
            }
          : {}),

        ...(sameAs.length > 0
          ? {
              sameAs,
            }
          : {}),
      },

      {
        "@type":
          "WebSite",

        "@id":
          websiteId,

        url:
          siteConfig.url,

        name:
          siteConfig.name,

        description:
          siteConfig.description,

        inLanguage:
          siteConfig.language,

        publisher: {
          "@id":
            organizationId,
        },
      },
    ],
  };

  return (
    <JsonLd
      data={structuredData}
    />
  );
}
