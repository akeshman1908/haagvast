import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import "./RegionLinks.scss";

export type RegionLinkItem = {
  name: string;
  href: string;
  description?: string;
};

type RegionLinksProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: RegionLinkItem[];
};

export default function RegionLinks({
  eyebrow,
  title,
  description,
  items,
}: RegionLinksProps) {
  return (
    <section className="region-links section">
      <div className="container">
        <div className="region-links__header">
          <div className="region-links__heading">
            {eyebrow && (
              <span className="eyebrow region-links__eyebrow">{eyebrow}</span>
            )}

            <h2 className="heading-2 region-links__title">{title}</h2>
          </div>

          {description && (
            <p className="region-links__description">{description}</p>
          )}
        </div>

        <div className="region-links__list">
          {items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <Link
                key={item.href}
                href={item.href}
                className="region-links__item"
              >
                <span className="region-links__number" aria-hidden="true">
                  {number}
                </span>

                <span className="region-links__pin" aria-hidden="true">
                  <MapPin size={19} strokeWidth={1.8} />
                </span>

                <span className="region-links__content">
                  <span className="region-links__name">{item.name}</span>

                  {item.description && (
                    <span className="region-links__item-description">
                      {item.description}
                    </span>
                  )}
                </span>

                <span className="region-links__arrow" aria-hidden="true">
                  <ArrowUpRight size={20} strokeWidth={1.8} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="region-links__footer">
          <div className="region-links__footer-line" />

          <p className="region-links__footer-text">
            Staat uw woonplaats er niet tussen? Woningen in de directe omgeving
            van Haaglanden kunnen ook worden aangemeld.
          </p>
        </div>
      </div>
    </section>
  );
}
