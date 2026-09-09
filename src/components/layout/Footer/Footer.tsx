import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import "./Footer.scss";

type FooterLink = {
  label: string;
  href: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFooterLink(value: unknown): value is FooterLink {
  if (!isObject(value)) {
    return false;
  }

  return typeof value.label === "string" && typeof value.href === "string";
}

function formatGroupTitle(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .trim()
    .replace(/^./, (character) => character.toUpperCase());
}

function normalizeFooterNavigation(navigation: unknown): FooterGroup[] {
  if (Array.isArray(navigation)) {
    const directLinks = navigation.filter(isFooterLink);

    if (directLinks.length === navigation.length) {
      return [
        {
          title: "Navigatie",
          links: directLinks,
        },
      ];
    }

    return navigation.flatMap((value): FooterGroup[] => {
      if (!isObject(value)) {
        return [];
      }

      const title =
        typeof value.title === "string"
          ? value.title
          : typeof value.label === "string"
            ? value.label
            : "Navigatie";

      const possibleLinks = Array.isArray(value.links)
        ? value.links
        : Array.isArray(value.items)
          ? value.items
          : Array.isArray(value.children)
            ? value.children
            : [];

      const links = possibleLinks.filter(isFooterLink);

      if (links.length === 0) {
        return [];
      }

      return [
        {
          title,
          links,
        },
      ];
    });
  }

  if (isObject(navigation)) {
    return Object.entries(navigation).flatMap(([key, value]): FooterGroup[] => {
      if (Array.isArray(value)) {
        const links = value.filter(isFooterLink);

        if (links.length > 0) {
          return [
            {
              title: formatGroupTitle(key),
              links,
            },
          ];
        }

        return normalizeFooterNavigation(value);
      }

      if (isObject(value)) {
        const title =
          typeof value.title === "string"
            ? value.title
            : typeof value.label === "string"
              ? value.label
              : formatGroupTitle(key);

        const possibleLinks = Array.isArray(value.links)
          ? value.links
          : Array.isArray(value.items)
            ? value.items
            : Array.isArray(value.children)
              ? value.children
              : [];

        const links = possibleLinks.filter(isFooterLink);

        if (links.length > 0) {
          return [
            {
              title,
              links,
            },
          ];
        }
      }

      return [];
    });
  }

  return [];
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationGroups = normalizeFooterNavigation(footerNavigation);

  const hasPhone = Boolean(siteConfig.contact.phone);

  const hasEmail = Boolean(siteConfig.contact.email);

  const hasContact = hasPhone || hasEmail;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link
              href="/"
              className="footer__logo"
              aria-label="HaagVast homepage"
            >
              <span className="footer__logo-main">Haag</span>

              <span className="footer__logo-accent">Vast</span>
            </Link>

            <p className="footer__description">
              HaagVast richt zich op rechtstreekse woninginkoop in regio
              Haaglanden. Ook woningen die renovatie, modernisering of
              verduurzaming nodig hebben.
            </p>

            <Link
              href={siteConfig.cta.primary.href}
              className="footer__primary-link"
            >
              <span>{siteConfig.cta.primary.label}</span>

              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            {hasContact && (
              <div className="footer__contact">
                {hasPhone && (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="footer__contact-link"
                  >
                    <Phone size={16} strokeWidth={1.8} aria-hidden="true" />

                    <span>
                      {siteConfig.contact.phoneDisplay ||
                        siteConfig.contact.phone}
                    </span>
                  </a>
                )}

                {hasEmail && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="footer__contact-link"
                  >
                    <Mail size={16} strokeWidth={1.8} aria-hidden="true" />

                    <span>{siteConfig.contact.email}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {navigationGroups.length > 0 && (
            <nav className="footer__navigation" aria-label="Footer navigatie">
              {navigationGroups.map((group) => (
                <div key={group.title} className="footer__column">
                  <h2 className="footer__column-title">{group.title}</h2>

                  <ul className="footer__links">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="footer__link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="footer__region">
          <div className="footer__region-icon" aria-hidden="true">
            <MapPin size={18} strokeWidth={1.8} />
          </div>

          <div className="footer__region-content">
            <span className="footer__region-label">
              Actief in regio Haaglanden
            </span>

            <p className="footer__region-text">
              Den Haag · Voorburg · Leidschendam · Rijswijk · Wassenaar en
              directe omgeving
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">© {currentYear} HaagVast</div>

          <div className="footer__legal">
            <Link href="/privacy">Privacy</Link>

            <Link href="/cookies">Cookies</Link>

            <Link href="/contact">Contact</Link>
          </div>

          <p className="footer__bottom-text">
            Vrijblijvende woningbeoordeling in regio Haaglanden.
          </p>
        </div>
      </div>
    </footer>
  );
}
