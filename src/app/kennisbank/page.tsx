import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  House,
  Scale,
  Wrench,
} from "lucide-react";

import FinalCta from "@/components/sections/FinalCta/FinalCta";
import RegionLinks from "@/components/sections/RegionLinks/RegionLinks";
import { siteConfig } from "@/config/site";
import { regions } from "@/data/haagvast-regions";
import {
  knowledgeArticles,
  knowledgeCategoryLabels,
  type KnowledgeCategory,
} from "@/data/knowledge-base";

import styles from "./Kennisbank.module.scss";

const canonicalUrl = `${siteConfig.url}/kennisbank`;

export const metadata: Metadata = {
  title: "Kennisbank woning verkopen | HaagVast",

  description:
    "Praktische informatie over woningverkoop, kluswoningen, energielabels, verkopen zonder makelaar en bijzondere verkoopsituaties.",

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: canonicalUrl,
    title: "Kennisbank woning verkopen | HaagVast",
    description:
      "Praktische uitleg over woningverkoop, renovatie en verschillende verkoopsituaties.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kennisbank woning verkopen | HaagVast",
    description:
      "Praktische informatie voor woningeigenaren die hun verkoopmogelijkheden onderzoeken.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const categories: {
  key: KnowledgeCategory;
  title: string;
  description: string;
  icon: typeof House;
}[] = [
  {
    key: "woning-verkopen",
    title: "Woning verkopen",
    description:
      "Over verkooproutes, waarde, energielabels en keuzes vóór de verkoop.",
    icon: House,
  },
  {
    key: "renovatie",
    title: "Renovatie & woningstaat",
    description:
      "Wanneer opknappen interessant is en wanneer verkopen in de huidige staat logischer kan zijn.",
    icon: Wrench,
  },
  {
    key: "juridisch",
    title: "Juridisch & praktisch",
    description:
      "Over makelaars, koopafspraken, informatieplicht en de overdracht bij de notaris.",
    icon: Scale,
  },
];

export default function KennisbankPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "HaagVast",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kennisbank",
        item: canonicalUrl,
      },
    ],
  };

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "HaagVast Kennisbank",
    description:
      "Praktische informatie over het verkopen van woningen.",
    url: canonicalUrl,
    hasPart: knowledgeArticles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `${canonicalUrl}/${article.slug}`,
    })),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbStructuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionStructuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              KENNISBANK
            </span>

            <h1>
              Alles over het
              <br />
              verkopen van uw woning
            </h1>

            <p className={styles.heroDescription}>
              Duidelijke en praktische informatie over
              woningverkoop, renovatie, energielabels en
              verschillende verkoopsituaties. Eerst begrijpen
              wat uw opties zijn, daarna pas beslissen.
            </p>

            <div className={styles.heroActions}>
              <a
                href="#artikelen"
                className={styles.primaryButton}
              >
                Bekijk de artikelen
                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>

              <Link
                href={siteConfig.cta.primary.href}
                className={styles.secondaryButton}
              >
                Woning aanmelden
              </Link>
            </div>
          </div>

          <div
            className={styles.heroVisual}
            aria-hidden="true"
          >
            <BookOpen
              size={64}
              strokeWidth={1.25}
            />

            <span>
              Praktische kennis
              <br />
              voor woningeigenaren
            </span>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.splitHeading}>
            <div>
              <span className={styles.eyebrowDark}>
                ONDERWERPEN
              </span>

              <h2>
                Begin bij uw
                <br />
                vraag of situatie
              </h2>
            </div>

            <p>
              Een woning verkopen begint vaak met vragen.
              Moet u eerst verbouwen? Heeft u een makelaar
              nodig? Wat betekent een slecht energielabel?
              In de kennisbank leggen we deze onderwerpen
              zo praktisch mogelijk uit.
            </p>
          </div>

          <div className={styles.categoryGrid}>
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <a
                  key={category.key}
                  href={`#${category.key}`}
                  className={styles.categoryCard}
                >
                  <span className={styles.categoryIcon}>
                    <Icon
                      size={23}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className={styles.categoryContent}>
                    <strong>{category.title}</strong>

                    <span>{category.description}</span>
                  </span>

                  <ArrowRight
                    className={styles.categoryArrow}
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="artikelen"
        className={styles.articlesSection}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrowDark}>
                KENNISBANK
              </span>

              <h2>Alle artikelen</h2>
            </div>

            <p>
              Artikelen over keuzes die spelen vóór en tijdens
              het verkopen van een woning.
            </p>
          </div>

          <div className={styles.articleGrid}>
            {knowledgeArticles.map((article, index) => (
              <article
                key={article.slug}
                id={article.category}
                className={[
                  styles.articleCard,
                  article.featured
                    ? styles.articleCardFeatured
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Link
                  href={`/kennisbank/${article.slug}`}
                  className={styles.articleLink}
                >
                  <div className={styles.articleTop}>
                    <span className={styles.articleNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.articleCategory}>
                      {
                        knowledgeCategoryLabels[
                          article.category
                        ]
                      }
                    </span>
                  </div>

                  <div className={styles.articleContent}>
                    <h3>{article.title}</h3>

                    <p>{article.description}</p>
                  </div>

                  <div className={styles.articleFooter}>
                    <span className={styles.readingTime}>
                      <Clock3
                        size={15}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />

                      {article.readingTime} lezen
                    </span>

                    <span className={styles.readMore}>
                      Lees artikel

                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.popularSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrowDark}>
                VEEL GEZOCHT
              </span>

              <h2>
                Direct naar uw
                <br />
                verkoopsituatie
              </h2>
            </div>

            <p>
              Heeft u al een concrete reden of situatie
              rondom de verkoop? Bekijk dan direct de
              bijbehorende informatie.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            <Link
              href="/huis-snel-verkopen"
              className={styles.serviceCard}
            >
              <span className={styles.serviceNumber}>
                01
              </span>

              <div>
                <h3>Huis snel verkopen</h3>

                <p>
                  Voor situaties waarin snelheid en
                  duidelijkheid belangrijk zijn.
                </p>
              </div>

              <ArrowUpRight
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/kluswoning-verkopen"
              className={styles.serviceCard}
            >
              <span className={styles.serviceNumber}>
                02
              </span>

              <div>
                <h3>Kluswoning verkopen</h3>

                <p>
                  Verkoopmogelijkheden zonder eerst de hele
                  woning te moderniseren.
                </p>
              </div>

              <ArrowUpRight
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/geerfde-woning-verkopen"
              className={styles.serviceCard}
            >
              <span className={styles.serviceNumber}>
                03
              </span>

              <div>
                <h3>Geërfde woning verkopen</h3>

                <p>
                  Praktische informatie wanneer een woning
                  onderdeel is van een nalatenschap.
                </p>
              </div>

              <ArrowUpRight
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <RegionLinks
        eyebrow="Regio Haaglanden"
        title="Informatie voor uw regio"
        description="HaagVast is lokaal actief in Haaglanden en directe omgeving. Bekijk de informatie voor uw woonplaats."
        items={regions.slice(0, 6).map((region) => ({
          name: `Woning verkopen in ${region.name}`,
          href: `/regio/${region.slug}`,
          description: region.seoDescription,
        }))}
      />

      <FinalCta
        eyebrow="Uw woning"
        title="Wilt u weten wat er voor uw woning mogelijk is?"
        description="U kunt uw woning vrijblijvend aanmelden. We bekijken de woning en uw situatie en bespreken daarna welke mogelijkheden er zijn."
        primaryLabel="Mijn woning aanmelden"
        primaryHref={siteConfig.cta.primary.href}
        secondaryLabel="Bekijk onze werkwijze"
        secondaryHref="/werkwijze"
      />
    </div>
  );
}
