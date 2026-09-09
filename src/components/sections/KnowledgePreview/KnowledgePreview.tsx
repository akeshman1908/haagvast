import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import "./KnowledgePreview.scss";

export type KnowledgePreviewItem = {
  title: string;
  description: string;
  href: string;
};

type KnowledgePreviewProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: KnowledgePreviewItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function KnowledgePreview({
  eyebrow,
  title,
  description,
  items,
  ctaLabel = "Bekijk de kennisbank",
  ctaHref = "/kennisbank",
}: KnowledgePreviewProps) {
  return (
    <section className="knowledge-preview section">
      <div className="container">
        <div className="knowledge-preview__header">
          <div className="knowledge-preview__heading">
            {eyebrow && (
              <span className="eyebrow knowledge-preview__eyebrow">
                {eyebrow}
              </span>
            )}

            <h2 className="heading-2 knowledge-preview__title">
              {title}
            </h2>
          </div>

          {description && (
            <p className="knowledge-preview__description">
              {description}
            </p>
          )}
        </div>

        <div className="knowledge-preview__list">
          {items.map((item, index) => {
            const number = String(index + 1).padStart(
              2,
              "0",
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                className="knowledge-preview__item"
              >
                <span
                  className="knowledge-preview__number"
                  aria-hidden="true"
                >
                  {number}
                </span>

                <span
                  className="knowledge-preview__icon"
                  aria-hidden="true"
                >
                  <BookOpen
                    size={19}
                    strokeWidth={1.7}
                  />
                </span>

                <span className="knowledge-preview__content">
                  <span className="knowledge-preview__item-title">
                    {item.title}
                  </span>

                  <span className="knowledge-preview__item-description">
                    {item.description}
                  </span>
                </span>

                <span
                  className="knowledge-preview__arrow"
                  aria-hidden="true"
                >
                  <ArrowRight
                    size={19}
                    strokeWidth={1.8}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="knowledge-preview__footer">
          <p className="knowledge-preview__footer-text">
            Meer lezen over woningverkoop,
            renovatie en bijzondere
            verkoopsituaties?
          </p>

          <Link
            href={ctaHref}
            className="button button--secondary knowledge-preview__cta"
          >
            <span>{ctaLabel}</span>

            <ArrowRight
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
