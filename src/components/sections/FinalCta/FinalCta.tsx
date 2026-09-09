import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

import "./FinalCta.scss";

type FinalCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;

  primaryLabel?: string;
  primaryHref?: string;

  secondaryLabel?: string;
  secondaryHref?: string;

  showPhone?: boolean;
};

export default function FinalCta({
  eyebrow = "Vrijblijvend kennismaken",
  title = "Benieuwd wat de mogelijkheden zijn voor uw woning?",
  description = "Meld uw woning vrijblijvend aan. We bekijken de woning en bespreken vervolgens rustig welke mogelijkheden er zijn.",
  primaryLabel = "Mijn woning aanmelden",
  primaryHref = "/contact",
  secondaryLabel = "Bekijk onze werkwijze",
  secondaryHref = "/werkwijze",
  showPhone = true,
}: FinalCtaProps) {
  const hasPhone = showPhone && Boolean(siteConfig.contact.phone);

  return (
    <section className="final-cta">
      <div className="container">
        <div
          className={[
            "final-cta__inner",
            hasPhone ? "final-cta__inner--with-contact" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="final-cta__content">
            {eyebrow && (
              <span className="eyebrow final-cta__eyebrow">{eyebrow}</span>
            )}

            <h2 className="heading-2 final-cta__title">{title}</h2>

            <p className="final-cta__description">{description}</p>

            <div className="final-cta__actions">
              <Link
                href={primaryHref}
                className="button button--light final-cta__primary"
              >
                <span>{primaryLabel}</span>

                <ArrowRight size={18} strokeWidth={1.9} aria-hidden="true" />
              </Link>

              {secondaryLabel && secondaryHref && (
                <Link href={secondaryHref} className="final-cta__secondary">
                  <span>{secondaryLabel}</span>

                  <ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" />
                </Link>
              )}
            </div>

            <p className="final-cta__microcopy">
              Vrijblijvend en zonder verplichtingen.
            </p>
          </div>

          {hasPhone && (
            <aside className="final-cta__contact">
              <span className="final-cta__contact-kicker">
                Liever direct contact?
              </span>

              <div className="final-cta__contact-icon">
                <Phone size={20} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div className="final-cta__contact-content">
                <span className="final-cta__contact-label">Bel HaagVast</span>

                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="final-cta__contact-value"
                >
                  {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                </a>

                <p className="final-cta__contact-text">
                  Voor vragen over uw woning of een vrijblijvende aanmelding.
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
