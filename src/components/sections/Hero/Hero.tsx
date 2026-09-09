import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import "./Hero.scss";

export type HeroBenefit = {
  label: string;
};

type HeroCta = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  benefits?: HeroBenefit[];
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  children?: React.ReactNode;
};

export default function Hero({
  eyebrow,
  title,
  description,
  benefits = [],
  primaryCta,
  secondaryCta,
  children,
}: HeroProps) {
  const hasForm = Boolean(children);

  return (
    <section className="hero">
      <div className="container hero__container">
        <div className="hero__grid">
          <div className="hero__content">
            {eyebrow && (
              <span className="eyebrow hero__eyebrow">{eyebrow}</span>
            )}

            <h1 className="heading-1 hero__title">{title}</h1>

            <p className="hero__description">{description}</p>

            {benefits.length > 0 && (
              <ul className="hero__benefits">
                {benefits.map((benefit) => (
                  <li key={benefit.label} className="hero__benefit">
                    <span className="hero__benefit-icon" aria-hidden="true">
                      <CheckCircle2 size={16} strokeWidth={2.25} />
                    </span>

                    <span className="hero__benefit-label">{benefit.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="hero__actions">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="button button--primary hero__primary"
                  >
                    <span>{primaryCta.label}</span>

                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                  </Link>
                )}

                {secondaryCta && (
                  <Link href={secondaryCta.href} className="hero__secondary">
                    <span>{secondaryCta.label}</span>

                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}

            <p className="hero__microcopy">
              Vrijblijvend en zonder verplichtingen.
            </p>
          </div>

          {hasForm && (
            <div className="hero__aside">
              <div className="hero__form-wrap">{children}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
