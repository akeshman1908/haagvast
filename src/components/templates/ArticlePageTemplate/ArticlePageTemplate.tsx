import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";

import Faq, { FaqItem } from "@/components/sections/Faq/Faq";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import RelatedContent, {
  RelatedContentItem,
} from "@/components/sections/RelatedContent/RelatedContent";
import { siteConfig } from "@/config/site";

import "./ArticlePageTemplate.scss";

export type ArticleTableOfContentsItem = {
  id: string;
  label: string;
};

export type ArticlePageData = {
  title: string;
  description: string;

  category?: {
    label: string;
    href?: string;
  };

  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
  author?: string;

  tableOfContents?: ArticleTableOfContentsItem[];

  content: React.ReactNode;

  relatedService?: {
    eyebrow?: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };

  faq?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: FaqItem[];
  };

  relatedContent?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: RelatedContentItem[];
  };

  finalCta?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

type ArticlePageTemplateProps = {
  data: ArticlePageData;
};

export default function ArticlePageTemplate({
  data,
}: ArticlePageTemplateProps) {
  return (
    <>
      <article className="article-page">
        <header className="article-page__hero">
          <div className="container article-page__hero-container">
            <nav
              className="article-page__breadcrumbs"
              aria-label="Broodkruimelnavigatie"
            >
              <Link href="/">Home</Link>

              <span aria-hidden="true">/</span>

              <Link href="/kennisbank">Kennisbank</Link>

              {data.category && (
                <>
                  <span aria-hidden="true">/</span>

                  {data.category.href ? (
                    <Link href={data.category.href}>{data.category.label}</Link>
                  ) : (
                    <span>{data.category.label}</span>
                  )}
                </>
              )}
            </nav>

            <div className="article-page__hero-content">
              {data.category && (
                <span className="eyebrow">{data.category.label}</span>
              )}

              <h1 className="heading-1 article-page__title">{data.title}</h1>

              <p className="article-page__intro">{data.description}</p>

              <div className="article-page__meta">
                {data.updatedAt || data.publishedAt ? (
                  <div className="article-page__meta-item">
                    <CalendarDays
                      size={17}
                      strokeWidth={2}
                      aria-hidden="true"
                    />

                    <span>
                      {data.updatedAt
                        ? `Bijgewerkt ${data.updatedAt}`
                        : `Gepubliceerd ${data.publishedAt}`}
                    </span>
                  </div>
                ) : null}

                {data.readingTime && (
                  <div className="article-page__meta-item">
                    <Clock3 size={17} strokeWidth={2} aria-hidden="true" />

                    <span>{data.readingTime}</span>
                  </div>
                )}

                <div className="article-page__meta-item">
                  <UserRound size={17} strokeWidth={2} aria-hidden="true" />

                  <span>{data.author ?? siteConfig.name}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container article-page__layout">
          {data.tableOfContents && data.tableOfContents.length > 0 && (
            <aside className="article-page__sidebar">
              <nav className="article-page__toc" aria-label="Inhoudsopgave">
                <span className="article-page__toc-title">Op deze pagina</span>

                <ol className="article-page__toc-list">
                  {data.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="article-page__toc-link"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className="article-page__main">
            <div className="prose article-page__content">{data.content}</div>

            {data.relatedService && (
              <aside className="article-page__service-cta">
                {data.relatedService.eyebrow && (
                  <span className="article-page__service-eyebrow">
                    {data.relatedService.eyebrow}
                  </span>
                )}

                <h2 className="article-page__service-title">
                  {data.relatedService.title}
                </h2>

                <p className="article-page__service-description">
                  {data.relatedService.description}
                </p>

                <Link
                  href={data.relatedService.href}
                  className="button button--primary article-page__service-button"
                >
                  <span>{data.relatedService.label}</span>

                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </Link>
              </aside>
            )}
          </div>
        </div>
      </article>

      {data.faq && (
        <Faq
          eyebrow={data.faq.eyebrow ?? "Veelgestelde vragen"}
          title={data.faq.title ?? "Veelgestelde vragen over dit onderwerp"}
          description={data.faq.description}
          items={data.faq.items}
        />
      )}

      {data.relatedContent && (
        <RelatedContent
          eyebrow={data.relatedContent.eyebrow ?? "Verder lezen"}
          title={
            data.relatedContent.title ?? "Meer informatie over woning verkopen"
          }
          description={data.relatedContent.description}
          items={data.relatedContent.items}
        />
      )}

      <FinalCta
        eyebrow={data.finalCta?.eyebrow}
        title={data.finalCta?.title}
        description={data.finalCta?.description}
        primaryLabel={data.finalCta?.primaryLabel}
        primaryHref={data.finalCta?.primaryHref}
        secondaryLabel={data.finalCta?.secondaryLabel}
        secondaryHref={data.finalCta?.secondaryHref}
      />
    </>
  );
}
