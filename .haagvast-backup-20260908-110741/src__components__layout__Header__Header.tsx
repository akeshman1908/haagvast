"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import "./Header.scss";

type HeaderNavigationChild = {
  label: string;
  href: string;
  description?: string;
};

type HeaderNavigationEntry = {
  label: string;
  href?: string;

  /*
   * Ondersteunt beide datastructuren.
   * Sommige navigatie-configs gebruiken `children`,
   * andere gebruiken `items`.
   */
  children?: HeaderNavigationChild[];
  items?: HeaderNavigationChild[];
};

const navigation = mainNavigation as unknown as HeaderNavigationEntry[];

function getChildren(item: HeaderNavigationEntry): HeaderNavigationChild[] {
  return item.children ?? item.items ?? [];
}

export default function Header() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }, [pathname]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen((current) => !current);
  }

  function toggleMobileSubmenu(label: string) {
    setOpenMobileSubmenu((current) => (current === label ? null : label));
  }

  function isActive(href?: string) {
    if (!href) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <Link
            href="/"
            className="header__logo"
            aria-label="HaagVast - Homepage"
            onClick={closeMobileMenu}
          >
            <span className="header__logo-main">Haag</span>

            <span className="header__logo-accent">Vast</span>
          </Link>

          <nav className="header__desktop-nav" aria-label="Hoofdnavigatie">
            <ul className="header__nav-list">
              {navigation.map((item) => {
                const children = getChildren(item);

                const hasChildren = children.length > 0;

                const childIsActive = children.some((child) =>
                  isActive(child.href),
                );

                if (!hasChildren) {
                  return (
                    <li key={item.label} className="header__nav-item">
                      <Link
                        href={item.href ?? "/"}
                        className={[
                          "header__nav-link",
                          isActive(item.href) ? "header__nav-link--active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.label}
                    className="header__nav-item header__nav-item--dropdown"
                  >
                    <button
                      type="button"
                      className={[
                        "header__nav-link",
                        "header__nav-trigger",
                        childIsActive ? "header__nav-link--active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>

                      <ChevronDown
                        size={15}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>

                    <div className="header__dropdown">
                      <div className="header__dropdown-inner">
                        <ul className="header__dropdown-list">
                          {children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={[
                                  "header__dropdown-link",
                                  isActive(child.href)
                                    ? "header__dropdown-link--active"
                                    : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                <span className="header__dropdown-label">
                                  {child.label}
                                </span>

                                {child.description && (
                                  <span className="header__dropdown-description">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header__actions">
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="header__phone"
              >
                <Phone size={17} strokeWidth={2} aria-hidden="true" />

                <span>
                  {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                </span>
              </a>
            )}

            <Link
              href={siteConfig.cta.primary.href}
              className="button button--primary header__cta"
            >
              {siteConfig.cta.primary.label}
            </Link>

            <button
              type="button"
              className="header__mobile-toggle"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu size={22} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={[
          "mobile-navigation",
          mobileMenuOpen ? "mobile-navigation--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-navigation__backdrop"
          onClick={closeMobileMenu}
          aria-label="Menu sluiten"
          tabIndex={mobileMenuOpen ? 0 : -1}
        />

        <aside className="mobile-navigation__panel">
          <div className="mobile-navigation__header">
            <Link
              href="/"
              className="mobile-navigation__logo"
              onClick={closeMobileMenu}
            >
              <span>Haag</span>

              <span className="mobile-navigation__logo-accent">Vast</span>
            </Link>

            <button
              type="button"
              className="mobile-navigation__close"
              onClick={closeMobileMenu}
              aria-label="Menu sluiten"
            >
              <X size={22} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav
            className="mobile-navigation__nav"
            aria-label="Mobiele navigatie"
          >
            <ul className="mobile-navigation__list">
              {navigation.map((item) => {
                const children = getChildren(item);

                const hasChildren = children.length > 0;

                const submenuOpen = openMobileSubmenu === item.label;

                if (!hasChildren) {
                  return (
                    <li key={item.label} className="mobile-navigation__item">
                      <Link
                        href={item.href ?? "/"}
                        className={[
                          "mobile-navigation__link",
                          isActive(item.href)
                            ? "mobile-navigation__link--active"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.label} className="mobile-navigation__item">
                    <button
                      type="button"
                      className={[
                        "mobile-navigation__link",
                        "mobile-navigation__submenu-trigger",
                        submenuOpen
                          ? "mobile-navigation__submenu-trigger--open"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => toggleMobileSubmenu(item.label)}
                      aria-expanded={submenuOpen}
                    >
                      <span>{item.label}</span>

                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className={[
                        "mobile-navigation__submenu",
                        submenuOpen ? "mobile-navigation__submenu--open" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <ul className="mobile-navigation__submenu-list">
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={[
                                "mobile-navigation__submenu-link",
                                isActive(child.href)
                                  ? "mobile-navigation__submenu-link--active"
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={closeMobileMenu}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-navigation__footer">
            <Link
              href={siteConfig.cta.primary.href}
              className="button button--primary mobile-navigation__cta"
              onClick={closeMobileMenu}
            >
              {siteConfig.cta.primary.label}
            </Link>

            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mobile-navigation__phone"
              >
                <Phone size={18} strokeWidth={2} aria-hidden="true" />

                <span>
                  {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                </span>
              </a>
            )}

            <p className="mobile-navigation__microcopy">
              Vrijblijvend uw woning aanmelden in regio Haaglanden.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
