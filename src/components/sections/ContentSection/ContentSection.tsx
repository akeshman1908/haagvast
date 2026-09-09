import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import "./ContentSection.scss";

export type ContentSectionCta = {
  label: string;
  href: string;
};

type ContentSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  content?: ReactNode;
  aside?: ReactNode;
  cta?: ContentSectionCta;
  reversed?: boolean;
  muted?: boolean;
};

export default function ContentSection({
  eyebrow,
  title,
  description,
  content,
  aside,
  cta,
  reversed = false,
  muted = false,
}: ContentSectionProps) {
  const sectionClasses = [
    "content-section",
    "section",
    reversed ? "content-section--reversed" : "",
    muted ? "content-section--muted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClasses}>
      <div className="container">
        <div className="content-section__layout">
          <header className="content-section__heading">
            {eyebrow && (
              <span className="eyebrow content-section__eyebrow">
                {eyebrow}
              </span>
            )}

            <h2 className="heading-2 content-section__title">{title}</h2>
          </header>

          <div className="content-section__main">
            {description && (
              <p className="content-section__description">{description}</p>
            )}

            {content && (
              <div className="content-section__content">{content}</div>
            )}

            {aside && <aside className="content-section__aside">{aside}</aside>}

            {cta && (
              <div className="content-section__actions">
                <Link
                  href={cta.href}
                  className="button button--primary content-section__cta"
                >
                  <span>{cta.label}</span>

                  <ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
