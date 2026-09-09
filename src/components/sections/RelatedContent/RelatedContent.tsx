import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  House,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import "./RelatedContent.scss";

export type RelatedContentType =
  | "article"
  | "region"
  | "service";

export type RelatedContentItem = {
  title: string;
  description?: string;
  href: string;

  type?: RelatedContentType;

  /**
   * Legacy alias.
   * Bestaande data in regions.tsx en services.tsx
   * gebruikt nog `icon`.
   */
  icon?: RelatedContentType;

  label?: string;
};

type RelatedContentProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: RelatedContentItem[];
};

const iconMap: Record<
  RelatedContentType,
  LucideIcon
> = {
  article: BookOpen,
  region: MapPin,
  service: House,
};

const labelMap: Record<
  RelatedContentType,
  string
> = {
  article: "Kennisbank",
  region: "Regio",
  service: "Woning verkopen",
};

export default function RelatedContent({
  eyebrow,
  title,
  description,
  items,
}: RelatedContentProps) {
  return (
    <section className="related-content section">
      <div className="container">
        <div className="related-content__header">
          {eyebrow && (
            <span className="eyebrow related-content__eyebrow">
              {eyebrow}
            </span>
          )}

          <div className="related-content__heading-row">
            <h2 className="heading-2 related-content__title">
              {title}
            </h2>

            {description && (
              <p className="related-content__description">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="related-content__grid">
          {items.map((item, index) => {
            const type =
              item.type ??
              item.icon ??
              "article";

            const Icon = iconMap[type];

            return (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className="related-content__card"
              >
                <div className="related-content__card-top">
                  <span
                    className="related-content__icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="related-content__label">
                    {item.label ??
                      labelMap[type]}
                  </span>
                </div>

                <div className="related-content__card-content">
                  <h3 className="related-content__card-title">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="related-content__card-description">
                      {item.description}
                    </p>
                  )}
                </div>

                <span className="related-content__link">
                  Lees verder

                  <ArrowRight
                    size={16}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
