import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FinalCta from "@/components/sections/FinalCta/FinalCta";
import { siteConfig } from "@/config/site";

import {
  getKnowledgeArticleBySlug,
  getRelatedKnowledgeArticles,
  knowledgeArticles,
  knowledgeCategoryLabels,
} from "@/data/knowledge-base";

import styles from "./Article.module.scss";

type KnowledgeArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return knowledgeArticles.map(
    (article) => ({
      slug: article.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: KnowledgeArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article =
    getKnowledgeArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const canonicalUrl =
    `${siteConfig.url}/kennisbank/${article.slug}`;

  return {
    title: `${article.title} | HaagVast`,

    description:
      article.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: canonicalUrl,
      title: article.title,
      description:
        article.description,
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description:
        article.description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: KnowledgeArticlePageProps) {
  const { slug } = await params;

  const article =
    getKnowledgeArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles =
    getRelatedKnowledgeArticles(
      article.slug,
    );

  const canonicalUrl =
    `${siteConfig.url}/kennisbank/${article.slug}`;

  const breadcrumbs = {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [
      {
        "@type":
          "ListItem",
        position: 1,
        name: "HaagVast",
        item: siteConfig.url,
      },
      {
        "@type":
          "ListItem",
        position: 2,
        name: "Kennisbank",
        item:
          `${siteConfig.url}/kennisbank`,
      },
      {
        "@type":
          "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  const articleStructuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "Article",

    headline:
      article.title,

    description:
      article.description,

    mainEntityOfPage:
      canonicalUrl,

    publisher: {
      "@type":
        "Organization",

      name:
        siteConfig.name,

      url:
        siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbs,
            ).replace(
              /</g,
              "\\u003c",
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              articleStructuredData,
            ).replace(
              /</g,
              "\\u003c",
            ),
        }}
      />

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <Link
              href="/kennisbank"
              className={styles.backLink}
            >
              <span aria-hidden="true">
                ←
              </span>

              Terug naar kennisbank
            </Link>

            <div className={styles.heroContent}>
              <span className={styles.category}>
                {
                  knowledgeCategoryLabels[
                    article.category
                  ]
                }
              </span>

              <h1>
                {article.title}
              </h1>

              <p className={styles.intro}>
                {article.intro}
              </p>

              <div className={styles.meta}>
                <span>
                  {article.readingTime} lezen
                </span>

                <span aria-hidden="true">
                  ·
                </span>

                <span>
                  HaagVast kennisbank
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.layout}>
            <aside className={styles.aside}>
              <div className={styles.summary}>
                <span className={styles.summaryLabel}>
                  Kort samengevat
                </span>

                <ul>
                  {article.keyPoints.map(
                    (point) => (
                      <li key={point}>
                        <span
                          className={
                            styles.check
                          }
                          aria-hidden="true"
                        >
                          ✓
                        </span>

                        <p>
                          {point}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </aside>

            <div className={styles.content}>
              {article.sections.map(
                (
                  section,
                  index,
                ) => (
                  <section
                    key={
                      section.title
                    }
                    className={
                      styles.section
                    }
                  >
                    <span
                      className={
                        styles.sectionNumber
                      }
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <h2>
                      {
                        section.title
                      }
                    </h2>

                    {section.paragraphs.map(
                      (paragraph) => (
                        <p
                          key={
                            paragraph
                          }
                        >
                          {
                            paragraph
                          }
                        </p>
                      ),
                    )}

                    {section.bullets &&
                      section.bullets
                        .length >
                        0 && (
                        <ul
                          className={
                            styles.bullets
                          }
                        >
                          {section.bullets.map(
                            (
                              bullet,
                            ) => (
                              <li
                                key={
                                  bullet
                                }
                              >
                                {
                                  bullet
                                }
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                  </section>
                ),
              )}

              {article.relatedService && (
                <section
                  className={
                    styles.inlineCta
                  }
                >
                  <div>
                    <span
                      className={
                        styles.inlineEyebrow
                      }
                    >
                      Uw eigen woning
                    </span>

                    <h2>
                      Wilt u weten wat
                      er in uw situatie
                      mogelijk is?
                    </h2>

                    <p>
                      U kunt uw woning
                      vrijblijvend
                      aanmelden. Daarna
                      bekijken we de
                      woning en bespreken
                      we de mogelijke
                      vervolgstappen.
                    </p>
                  </div>

                  <Link
                    href={
                      article
                        .relatedService
                        .href
                    }
                    className={
                      styles.inlineButton
                    }
                  >
                    {
                      article
                        .relatedService
                        .label
                    }

                    <span
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section
          className={
            styles.related
          }
        >
          <div
            className={
              styles.container
            }
          >
            <div
              className={
                styles.relatedHeader
              }
            >
              <span
                className={
                  styles.relatedEyebrow
                }
              >
                Verder lezen
              </span>

              <h2>
                Meer uit de kennisbank
              </h2>
            </div>

            <div
              className={
                styles.relatedGrid
              }
            >
              {relatedArticles.map(
                (
                  relatedArticle,
                ) => (
                  <Link
                    key={
                      relatedArticle.slug
                    }
                    href={`/kennisbank/${relatedArticle.slug}`}
                    className={
                      styles.relatedCard
                    }
                  >
                    <span
                      className={
                        styles.relatedCategory
                      }
                    >
                      {
                        knowledgeCategoryLabels[
                          relatedArticle
                            .category
                        ]
                      }
                    </span>

                    <h3>
                      {
                        relatedArticle
                          .shortTitle
                      }
                    </h3>

                    <p>
                      {
                        relatedArticle
                          .description
                      }
                    </p>

                    <span
                      className={
                        styles.relatedLink
                      }
                    >
                      Lees artikel
                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      <FinalCta
        eyebrow="Uw woning"
        title="Wilt u weten wat er voor uw woning mogelijk is?"
        description="Meld uw woning vrijblijvend aan. We bekijken de woning en uw situatie en bespreken daarna welke mogelijkheden er zijn."
        primaryLabel="Mijn woning aanmelden"
        primaryHref={
          siteConfig.cta.primary.href
        }
        secondaryLabel="Bekijk onze werkwijze"
        secondaryHref="/werkwijze"
      />
    </>
  );
}
