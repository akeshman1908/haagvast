import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import type {
  KnowledgeBaseArticleSeo,
} from "@/data/knowledge-base-seo";

type KnowledgeArticleStructuredDataProps = {
  article: KnowledgeBaseArticleSeo;
};

export default function KnowledgeArticleStructuredData({
  article,
}: KnowledgeArticleStructuredDataProps) {
  const articleUrl =
    `${siteConfig.url}/kennisbank/${article.slug}`;

  const organizationId =
    `${siteConfig.url}/#organization`;

  const articleId =
    `${articleUrl}#article`;

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "Article",

    "@id":
      articleId,

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        articleUrl,
    },

    url:
      articleUrl,

    headline:
      article.title,

    description:
      article.description,

    inLanguage:
      siteConfig.language,

    keywords:
      article.keywords.join(", "),

    author: {
      "@type":
        "Organization",

      "@id":
        organizationId,

      name:
        article.authorName,

      url:
        siteConfig.url,
    },

    publisher: {
      "@type":
        "Organization",

      "@id":
        organizationId,

      name:
        siteConfig.name,

      url:
        siteConfig.url,
    },

    ...(article.publishedAt
      ? {
          datePublished:
            article.publishedAt,
        }
      : {}),

    ...(article.modifiedAt
      ? {
          dateModified:
            article.modifiedAt,
        }
      : {}),

    about: {
      "@type":
        "Thing",

      name:
        "Woning verkopen",
    },

    isPartOf: {
      "@type":
        "WebSite",

      "@id":
        `${siteConfig.url}/#website`,

      name:
        siteConfig.name,

      url:
        siteConfig.url,
    },
  };

  return (
    <JsonLd
      data={structuredData}
    />
  );
}
