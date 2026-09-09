import type {
  MetadataRoute,
} from "next";

import {
  regions,
} from "@/data/haagvast-regions";

import {
  knowledgeBaseArticleSeo,
} from "@/data/knowledge-base-seo";

import {
  servicePages,
} from "@/data/services";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(
    /\/$/,
    "",
  ) ||
  "https://haagvast.nl";

type SitemapEntry = {
  path: string;
  priority: number;

  changeFrequency:
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";

  lastModified?: Date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [
    {
      path: "",
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: "/woning-verkopen",
      priority: 0.95,
      changeFrequency: "weekly",
    },

    {
      path: "/regio",
      priority: 0.9,
      changeFrequency: "weekly",
    },

    {
      path: "/kennisbank",
      priority: 0.85,
      changeFrequency: "weekly",
    },

    {
      path: "/werkwijze",
      priority: 0.75,
      changeFrequency: "monthly",
    },

    {
      path: "/projecten",
      priority: 0.7,
      changeFrequency: "monthly",
    },

    {
      path: "/over-haagvast",
      priority: 0.7,
      changeFrequency: "monthly",
    },

    {
      path: "/contact",
      priority: 0.7,
      changeFrequency: "monthly",
    },

    {
      path: "/woning-aanmelden",
      priority: 0.8,
      changeFrequency: "monthly",
    },

    {
      path: "/privacy",
      priority: 0.3,
      changeFrequency: "yearly",
    },

    {
      path: "/cookies",
      priority: 0.3,
      changeFrequency: "yearly",
    },

    ...servicePages.map(
      (service): SitemapEntry => ({
        path:
          `/${service.slug}`,

        priority:
          0.9,

        changeFrequency:
          "weekly",
      }),
    ),

    ...regions.map(
      (region): SitemapEntry => ({
        path:
          `/regio/${region.slug}`,

        priority:
          region.slug ===
          "den-haag"
            ? 0.9
            : 0.8,

        changeFrequency:
          "weekly",
      }),
    ),

    ...knowledgeBaseArticleSeo.map(
      (article): SitemapEntry => ({
        path:
          `/kennisbank/${article.slug}`,

        priority:
          0.75,

        changeFrequency:
          "monthly",

        lastModified:
          article.modifiedAt
            ? new Date(
                article.modifiedAt,
              )
            : article.publishedAt
              ? new Date(
                  article.publishedAt,
                )
              : undefined,
      }),
    ),
  ];

  /*
   * Voorkomt dubbele URL's als bijvoorbeeld
   * een expliciete route ook nog in een
   * centrale data-array voorkomt.
   */
  const uniqueEntries =
    new Map<
      string,
      SitemapEntry
    >();

  for (const entry of entries) {
    uniqueEntries.set(
      entry.path,
      entry,
    );
  }

  return [
    ...uniqueEntries.values(),
  ].map(
    (entry) => ({
      url:
        `${siteUrl}${entry.path}`,

      changeFrequency:
        entry.changeFrequency,

      priority:
        entry.priority,

      ...(entry.lastModified
        ? {
            lastModified:
              entry.lastModified,
          }
        : {}),
    }),
  );
}
