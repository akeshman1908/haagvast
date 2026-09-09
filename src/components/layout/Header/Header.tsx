"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { regions } from "@/data/haagvast-regions";

import "./Header.scss";

type HeaderNavigationChild = {
  label: string;
  href: string;
  description?: string;
};

type HeaderNavigationEntry = {
  label: string;
  href?: string;
  children?: HeaderNavigationChild[];
  items?: HeaderNavigationChild[];
};

type MegaLink = {
  label: string;
  href: string;
  description?: string;
};

type MegaGroup = {
  title: string;
  links: MegaLink[];
};

type GenericMegaMenu = {
  eyebrow: string;
  title: string;
  description: string;
  groups: MegaGroup[];
  footerText: string;
  footerLabel: string;
  footerHref: string;
};

type RegionGroup = {
  title: string;
  slugs: string[];
};

const navigation =
  mainNavigation as unknown as HeaderNavigationEntry[];

const regionGroups: RegionGroup[] = [
  {
    title: "Den Haag & dichtbij",
    slugs: [
      "den-haag",
      "voorburg",
      "leidschendam",
      "rijswijk",
    ],
  },
  {
    title: "Delft & het Westland",
    slugs: [
      "delft",
      "westland",
      "midden-delfland",
    ],
  },
  {
    title: "Overig werkgebied",
    slugs: [
      "zoetermeer",
      "pijnacker-nootdorp",
      "wassenaar",
      "voorschoten",
    ],
  },
];

const genericMegaMenus: Record<
  string,
  GenericMegaMenu
> = {
  "woning verkopen": {
    eyebrow: "Woning verkopen",
    title: "Welke verkoopsituatie past bij u?",
    description:
      "Bekijk de verschillende mogelijkheden wanneer u overweegt uw woning te verkopen. Van een snelle verkoop tot een kluswoning of nalatenschap.",
    groups: [
      {
        title: "Verkoopmogelijkheden",
        links: [
          {
            label: "Huis snel verkopen",
            href: "/huis-snel-verkopen",
            description:
              "Wanneer snelheid en duidelijkheid belangrijk zijn.",
          },
          {
            label: "Huis verkopen zonder makelaar",
            href: "/huis-verkopen-zonder-makelaar",
            description:
              "Bekijk hoe rechtstreeks verkopen kan werken.",
          },
          {
            label: "Kluswoning verkopen",
            href: "/kluswoning-verkopen",
            description:
              "Verkopen zonder eerst volledig te renoveren.",
          },
        ],
      },
      {
        title: "Bijzondere situaties",
        links: [
          {
            label: "Geërfde woning verkopen",
            href: "/geerfde-woning-verkopen",
            description:
              "Praktische informatie bij een woning uit een nalatenschap.",
          },
          {
            label: "Woning met slecht energielabel",
            href:
              "/kennisbank/woning-verkopen-met-slecht-energielabel",
            description:
              "Wat een laag energielabel betekent bij verkoop.",
          },
          {
            label: "Kluswoning: verkopen of verbouwen?",
            href:
              "/kennisbank/kluswoning-verkopen-of-verbouwen",
            description:
              "Vergelijk renoveren met direct verkopen.",
          },
        ],
      },
      {
        title: "Eerst oriënteren",
        links: [
          {
            label: "Bekijk onze werkwijze",
            href: "/werkwijze",
            description:
              "Van eerste aanmelding naar duidelijke vervolgstappen.",
          },
          {
            label: "Kennisbank",
            href: "/kennisbank",
            description:
              "Praktische informatie rondom woningverkoop.",
          },
          {
            label: "Woning vrijblijvend aanmelden",
            href: siteConfig.cta.primary.href,
            description:
              "Begin met het adres en bespreek daarna uw situatie.",
          },
        ],
      },
    ],
    footerText:
      "Weet u nog niet welke verkooproute bij uw situatie past?",
    footerLabel: "Bekijk hoe HaagVast werkt",
    footerHref: "/werkwijze",
  },

  werkwijze: {
    eyebrow: "Onze werkwijze",
    title: "Van eerste contact naar een duidelijke keuze.",
    description:
      "We houden het proces overzichtelijk. U meldt de woning aan, we bespreken uw situatie en bekijken daarna samen de mogelijke vervolgstappen.",
    groups: [
      {
        title: "Stap 01 & 02",
        links: [
          {
            label: "Woning aanmelden",
            href: siteConfig.cta.primary.href,
            description:
              "Begin met uw adres en enkele basisgegevens.",
          },
          {
            label: "Situatie bespreken",
            href: "/werkwijze",
            description:
              "We bespreken uw woning, planning en wensen.",
          },
        ],
      },
      {
        title: "Stap 03 & 04",
        links: [
          {
            label: "Woning beoordelen",
            href: "/werkwijze",
            description:
              "We kijken naar ligging, woningtype en onderhoudsstaat.",
          },
          {
            label: "Mogelijkheden bespreken",
            href: "/werkwijze",
            description:
              "Daarna weet u welke vervolgstappen mogelijk zijn.",
          },
        ],
      },
      {
        title: "Handig om te weten",
        links: [
          {
            label: "Huis snel verkopen",
            href: "/huis-snel-verkopen",
            description:
              "Lees meer wanneer snelheid belangrijk is.",
          },
          {
            label: "Verkopen zonder makelaar",
            href: "/huis-verkopen-zonder-makelaar",
            description:
              "Lees hoe een rechtstreekse verkooproute werkt.",
          },
          {
            label: "Kennisbank",
            href: "/kennisbank",
            description:
              "Verdiep u eerst in woningverkoop en uw opties.",
          },
        ],
      },
    ],
    footerText:
      "De eerste woningaanmelding is vrijblijvend.",
    footerLabel: "Volledige werkwijze bekijken",
    footerHref: "/werkwijze",
  },

  "veelgestelde vragen": {
    eyebrow: "Veelgestelde vragen",
    title: "Snel antwoord op de belangrijkste vragen.",
    description:
      "Bekijk direct informatie over het verkoopproces, de staat van uw woning en verschillende verkoopmogelijkheden.",
    groups: [
      {
        title: "Over verkopen",
        links: [
          {
            label: "Kan ik verkopen zonder makelaar?",
            href:
              "/kennisbank/huis-verkopen-zonder-makelaar",
            description:
              "Een verkoopmakelaar is niet altijd noodzakelijk.",
          },
          {
            label: "Moet ik eerst verbouwen?",
            href:
              "/kennisbank/kluswoning-verkopen-of-verbouwen",
            description:
              "Bekijk of renoveren financieel logisch kan zijn.",
          },
          {
            label: "Wat bij een slecht energielabel?",
            href:
              "/kennisbank/woning-verkopen-met-slecht-energielabel",
            description:
              "Een laag label hoeft verkoop niet uit te sluiten.",
          },
        ],
      },
      {
        title: "Over het proces",
        links: [
          {
            label: "Hoe werkt een woningaanmelding?",
            href: "/werkwijze",
            description:
              "Bekijk stap voor stap hoe HaagVast werkt.",
          },
          {
            label: "Hoe snel kan ik verkopen?",
            href: "/huis-snel-verkopen",
            description:
              "De mogelijke snelheid verschilt per woning en situatie.",
          },
          {
            label: "Zit ik direct ergens aan vast?",
            href: siteConfig.cta.primary.href,
            description:
              "Een eerste woningaanmelding is vrijblijvend.",
          },
        ],
      },
      {
        title: "Woning & regio",
        links: [
          {
            label: "Welke woningen bekijken jullie?",
            href: "/kluswoning-verkopen",
            description:
              "Ook gedateerde woningen en kluswoningen kunnen interessant zijn.",
          },
          {
            label: "Waar is HaagVast actief?",
            href: "/regio/den-haag",
            description:
              "Actief in heel Haaglanden en directe omgeving.",
          },
          {
            label: "Meer informatie",
            href: "/kennisbank",
            description:
              "Bekijk uitgebreide artikelen in onze kennisbank.",
          },
        ],
      },
    ],
    footerText:
      "Staat uw vraag er niet tussen? U kunt uw situatie vrijblijvend voorleggen.",
    footerLabel: "Bekijk alle informatie",
    footerHref: "/kennisbank",
  },
};

function normalizeLabel(label: string) {
  return label
    .toLowerCase()
    .replace(/[’']/g, "")
    .trim();
}

function isRegionsItem(
  item: HeaderNavigationEntry,
) {
  const label = normalizeLabel(item.label);

  return (
    label === "regio" ||
    label === "regios"
  );
}

function getGenericMegaMenu(
  item: HeaderNavigationEntry,
) {
  return genericMegaMenus[
    normalizeLabel(item.label)
  ];
}

function getChildren(
  item: HeaderNavigationEntry,
): HeaderNavigationChild[] {
  return item.children ?? item.items ?? [];
}

function hasMegaMenu(
  item: HeaderNavigationEntry,
) {
  return Boolean(
    isRegionsItem(item) ||
      getGenericMegaMenu(item),
  );
}

export default function Header() {
  const pathname = usePathname();

  const headerRef =
    useRef<HTMLElement | null>(null);

  const desktopCloseTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const [
    openDesktopMenu,
    setOpenDesktopMenu,
  ] = useState<string | null>(null);

  const [
    regionSearch,
    setRegionSearch,
  ] = useState("");

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const [
    openMobileSubmenu,
    setOpenMobileSubmenu,
  ] = useState<string | null>(null);

  const activeNavigationItem =
    openDesktopMenu
      ? navigation.find(
          (item) =>
            item.label === openDesktopMenu,
        )
      : undefined;

  const activeGenericMenu =
    activeNavigationItem &&
    !isRegionsItem(activeNavigationItem)
      ? getGenericMegaMenu(
          activeNavigationItem,
        )
      : undefined;

  const activeIsRegions = Boolean(
    activeNavigationItem &&
      isRegionsItem(activeNavigationItem),
  );

  const normalizedSearch =
    regionSearch.trim().toLowerCase();

  const filteredRegionGroups = useMemo(
    () =>
      regionGroups
        .map((group) => ({
          ...group,

          regions: group.slugs
            .map((slug) =>
              regions.find(
                (region) =>
                  region.slug === slug,
              ),
            )
            .filter(
              (
                region,
              ): region is (typeof regions)[number] =>
                Boolean(region),
            )
            .filter((region) => {
              if (!normalizedSearch) {
                return true;
              }

              const searchable = [
                region.name,
                region.municipality,
                region.slug.replaceAll(
                  "-",
                  " ",
                ),
                ...region.areas,
              ]
                .join(" ")
                .toLowerCase();

              return searchable.includes(
                normalizedSearch,
              );
            }),
        }))
        .filter(
          (group) =>
            group.regions.length > 0,
        ),
    [normalizedSearch],
  );

  const totalFilteredRegions =
    filteredRegionGroups.reduce(
      (total, group) =>
        total + group.regions.length,
      0,
    );

  function isActive(href?: string) {
    if (!href) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`,
      )
    );
  }

  function isNavigationItemActive(
    item: HeaderNavigationEntry,
  ) {
    if (isRegionsItem(item)) {
      return pathname.startsWith(
        "/regio",
      );
    }

    return isActive(item.href);
  }

  function clearDesktopCloseTimer() {
    if (!desktopCloseTimer.current) {
      return;
    }

    clearTimeout(
      desktopCloseTimer.current,
    );

    desktopCloseTimer.current = null;
  }

  function openMegaMenu(
    item: HeaderNavigationEntry,
  ) {
    if (!hasMegaMenu(item)) {
      return;
    }

    clearDesktopCloseTimer();

    if (!isRegionsItem(item)) {
      setRegionSearch("");
    }

    setOpenDesktopMenu(item.label);
  }

  function closeMegaMenuImmediately() {
    clearDesktopCloseTimer();

    setOpenDesktopMenu(null);
    setRegionSearch("");
  }

  function scheduleMegaMenuClose() {
    clearDesktopCloseTimer();

    desktopCloseTimer.current =
      setTimeout(() => {
        setOpenDesktopMenu(null);
        setRegionSearch("");
      }, 240);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(
      (current) => !current,
    );
  }

  function toggleMobileSubmenu(
    label: string,
  ) {
    setOpenMobileSubmenu(
      (current) =>
        current === label
          ? null
          : label,
    );
  }

  function getMobileMegaLinks(
    item: HeaderNavigationEntry,
  ): MegaLink[] {
    if (isRegionsItem(item)) {
      return regions.map((region) => ({
        label: region.name,
        href: `/regio/${region.slug}`,
      }));
    }

    const genericMenu =
      getGenericMegaMenu(item);

    if (genericMenu) {
      return genericMenu.groups.flatMap(
        (group) => group.links,
      );
    }

    return getChildren(item);
  }

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";

      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
    closeMegaMenuImmediately();
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        closeMegaMenuImmediately();
        closeMobileMenu();
      }
    }

    function handlePointerDown(
      event: PointerEvent,
    ) {
      if (!openDesktopMenu) {
        return;
      }

      const target =
        event.target as Node | null;

      if (
        target &&
        headerRef.current &&
        !headerRef.current.contains(
          target,
        )
      ) {
        closeMegaMenuImmediately();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      clearDesktopCloseTimer();
    };
  }, [openDesktopMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className="header"
      >
        <div className="container header__container">
          <Link
            href="/"
            className="header__logo"
            aria-label="HaagVast - Homepage"
            onClick={closeMobileMenu}
          >
            <span className="header__logo-main">
              Haag
            </span>

            <span className="header__logo-accent">
              Vast
            </span>
          </Link>

          <nav
            className="header__desktop-nav"
            aria-label="Hoofdnavigatie"
          >
            <ul className="header__nav-list">
              {navigation.map((item) => {
                const itemHasMegaMenu =
                  hasMegaMenu(item);

                if (itemHasMegaMenu) {
                  const isOpen =
                    openDesktopMenu ===
                    item.label;

                  return (
                    <li
                      key={item.label}
                      className="header__nav-item"
                      onMouseEnter={() =>
                        openMegaMenu(item)
                      }
                      onMouseLeave={
                        scheduleMegaMenuClose
                      }
                    >
                      <button
                        type="button"
                        className={[
                          "header__nav-link",
                          "header__nav-trigger",
                          isOpen ||
                          isNavigationItemActive(
                            item,
                          )
                            ? "header__nav-link--active"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls="header-mega-menu"
                        onFocus={() =>
                          openMegaMenu(item)
                        }
                        onClick={() => {
                          clearDesktopCloseTimer();

                          setOpenDesktopMenu(
                            (current) =>
                              current ===
                              item.label
                                ? null
                                : item.label,
                          );
                        }}
                      >
                        <span>
                          {item.label}
                        </span>

                        <ChevronDown
                          size={15}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.label}
                    className="header__nav-item"
                  >
                    <Link
                      href={
                        item.href ?? "/"
                      }
                      className={[
                        "header__nav-link",
                        isNavigationItemActive(
                          item,
                        )
                          ? "header__nav-link--active"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </Link>
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
                <Phone
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>
                  {siteConfig.contact
                    .phoneDisplay ||
                    siteConfig.contact.phone}
                </span>
              </a>
            )}

            <Link
              href={
                siteConfig.cta.primary.href
              }
              className="button button--primary header__cta"
            >
              <span>
                {
                  siteConfig.cta.primary
                    .label
                }
              </span>

              <ArrowRight
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              className="header__mobile-toggle"
              onClick={toggleMobileMenu}
              aria-expanded={
                mobileMenuOpen
              }
              aria-controls="mobile-navigation"
              aria-label={
                mobileMenuOpen
                  ? "Menu sluiten"
                  : "Menu openen"
              }
            >
              {mobileMenuOpen ? (
                <X
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        <div
          id="header-mega-menu"
          className={[
            "header__mega-menu",
            activeNavigationItem
              ? "header__mega-menu--open"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={
            clearDesktopCloseTimer
          }
          onMouseLeave={
            scheduleMegaMenuClose
          }
          aria-hidden={
            !activeNavigationItem
          }
        >
          {activeNavigationItem && (
            <div className="header__mega-menu-inner">
              {activeIsRegions ? (
                <>
                  <div className="header__mega-top">
                    <div className="header__mega-heading">
                      <span className="header__mega-eyebrow">
                        Ons werkgebied
                      </span>

                      <h2>
                        Een vertrouwd adres,
                        dichtbij.
                      </h2>

                      <p className="header__mega-description">
                        HaagVast is actief in heel
                        Haaglanden en directe
                        omgeving.
                      </p>
                    </div>

                    <Link
                      href="/regio"
                      className="header__mega-overview"
                      onClick={
                        closeMegaMenuImmediately
                      }
                    >
                      Alle regio&apos;s

                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <div className="header__mega-search">
                    <Search
                      size={18}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />

                    <input
                      type="search"
                      value={
                        regionSearch
                      }
                      onChange={(event) =>
                        setRegionSearch(
                          event.target.value,
                        )
                      }
                      placeholder="Zoek regio of woonplaats..."
                      aria-label="Zoek regio of woonplaats"
                    />

                    {regionSearch && (
                      <button
                        type="button"
                        className="header__mega-search-clear"
                        onClick={() =>
                          setRegionSearch(
                            "",
                          )
                        }
                        aria-label="Zoekopdracht wissen"
                      >
                        <X
                          size={15}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {totalFilteredRegions >
                  0 ? (
                    <div className="header__mega-groups">
                      {filteredRegionGroups.map(
                        (group) => (
                          <div
                            key={
                              group.title
                            }
                            className="header__mega-group"
                          >
                            <h3>
                              {
                                group.title
                              }
                            </h3>

                            <ul>
                              {group.regions.map(
                                (
                                  region,
                                ) => (
                                  <li
                                    key={
                                      region.slug
                                    }
                                  >
                                    <Link
                                      href={`/regio/${region.slug}`}
                                      className={[
                                        "header__mega-region-link",
                                        isActive(
                                          `/regio/${region.slug}`,
                                        )
                                          ? "header__mega-region-link--active"
                                          : "",
                                      ]
                                        .filter(
                                          Boolean,
                                        )
                                        .join(
                                          " ",
                                        )}
                                      onClick={
                                        closeMegaMenuImmediately
                                      }
                                    >
                                      <span>
                                        {
                                          region.name
                                        }
                                      </span>

                                      <ArrowUpRight
                                        size={
                                          16
                                        }
                                        strokeWidth={
                                          1.6
                                        }
                                        aria-hidden="true"
                                      />
                                    </Link>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="header__mega-empty">
                      <strong>
                        Geen regio gevonden
                      </strong>

                      <p>
                        Staat uw woonplaats
                        er niet tussen? Uw
                        woning kan alsnog
                        vrijblijvend worden
                        aangemeld.
                      </p>

                      <Link
                        href={
                          siteConfig.cta
                            .primary.href
                        }
                        onClick={
                          closeMegaMenuImmediately
                        }
                      >
                        Woning aanmelden

                        <ArrowRight
                          size={16}
                          strokeWidth={
                            1.8
                          }
                        />
                      </Link>
                    </div>
                  )}

                  <div className="header__mega-footer">
                    <div className="header__mega-footer-text">
                      <MapPin
                        size={16}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />

                      <span>
                        Heel Haaglanden,
                        inclusief Voorschoten
                        en omliggende
                        woonplaatsen.
                      </span>
                    </div>

                    <Link
                      href="/werkwijze"
                      className="header__mega-footer-link"
                      onClick={
                        closeMegaMenuImmediately
                      }
                    >
                      Zo werkt verkopen aan
                      HaagVast

                      <ArrowRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              ) : activeGenericMenu ? (
                <>
                  <div className="header__mega-top">
                    <div className="header__mega-heading">
                      <span className="header__mega-eyebrow">
                        {
                          activeGenericMenu.eyebrow
                        }
                      </span>

                      <h2>
                        {
                          activeGenericMenu.title
                        }
                      </h2>

                      <p className="header__mega-description">
                        {
                          activeGenericMenu.description
                        }
                      </p>
                    </div>

                    {activeNavigationItem.href && (
                      <Link
                        href={
                          activeNavigationItem.href
                        }
                        className="header__mega-overview"
                        onClick={
                          closeMegaMenuImmediately
                        }
                      >
                        Overzicht

                        <ArrowRight
                          size={18}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </div>

                  <div className="header__mega-groups header__mega-groups--generic">
                    {activeGenericMenu.groups.map(
                      (group) => (
                        <div
                          key={
                            group.title
                          }
                          className="header__mega-group"
                        >
                          <h3>
                            {group.title}
                          </h3>

                          <ul>
                            {group.links.map(
                              (link) => (
                                <li
                                  key={`${link.label}-${link.href}`}
                                >
                                  <Link
                                    href={
                                      link.href
                                    }
                                    className="header__mega-content-link"
                                    onClick={
                                      closeMegaMenuImmediately
                                    }
                                  >
                                    <div>
                                      <span className="header__mega-content-title">
                                        {
                                          link.label
                                        }
                                      </span>

                                      {link.description && (
                                        <span className="header__mega-content-description">
                                          {
                                            link.description
                                          }
                                        </span>
                                      )}
                                    </div>

                                    <ArrowUpRight
                                      size={16}
                                      strokeWidth={
                                        1.6
                                      }
                                      aria-hidden="true"
                                    />
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="header__mega-footer">
                    <div className="header__mega-footer-text">
                      <span>
                        {
                          activeGenericMenu.footerText
                        }
                      </span>
                    </div>

                    <Link
                      href={
                        activeGenericMenu.footerHref
                      }
                      className="header__mega-footer-link"
                      onClick={
                        closeMegaMenuImmediately
                      }
                    >
                      {
                        activeGenericMenu.footerLabel
                      }

                      <ArrowRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={[
          "mobile-navigation",
          mobileMenuOpen
            ? "mobile-navigation--open"
            : "",
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
          tabIndex={
            mobileMenuOpen ? 0 : -1
          }
        />

        <aside className="mobile-navigation__panel">
          <div className="mobile-navigation__header">
            <Link
              href="/"
              className="mobile-navigation__logo"
              onClick={closeMobileMenu}
            >
              <span>Haag</span>

              <span className="mobile-navigation__logo-accent">
                Vast
              </span>
            </Link>

            <button
              type="button"
              className="mobile-navigation__close"
              onClick={closeMobileMenu}
              aria-label="Menu sluiten"
            >
              <X
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>

          <nav
            className="mobile-navigation__nav"
            aria-label="Mobiele navigatie"
          >
            <ul className="mobile-navigation__list">
              {navigation.map((item) => {
                const mobileLinks =
                  getMobileMegaLinks(
                    item,
                  );

                if (
                  mobileLinks.length ===
                  0
                ) {
                  return (
                    <li
                      key={item.label}
                      className="mobile-navigation__item"
                    >
                      <Link
                        href={
                          item.href ?? "/"
                        }
                        className={[
                          "mobile-navigation__link",
                          isNavigationItemActive(
                            item,
                          )
                            ? "mobile-navigation__link--active"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={
                          closeMobileMenu
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const submenuOpen =
                  openMobileSubmenu ===
                  item.label;

                return (
                  <li
                    key={item.label}
                    className="mobile-navigation__item"
                  >
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
                      onClick={() =>
                        toggleMobileSubmenu(
                          item.label,
                        )
                      }
                      aria-expanded={
                        submenuOpen
                      }
                    >
                      <span>
                        {item.label}
                      </span>

                      <ChevronDown
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className={[
                        "mobile-navigation__submenu",
                        submenuOpen
                          ? "mobile-navigation__submenu--open"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <ul className="mobile-navigation__submenu-list">
                        {item.href && (
                          <li>
                            <Link
                              href={
                                item.href
                              }
                              className="mobile-navigation__submenu-link mobile-navigation__submenu-link--overview"
                              onClick={
                                closeMobileMenu
                              }
                            >
                              Overzicht{" "}
                              {item.label}
                            </Link>
                          </li>
                        )}

                        {mobileLinks.map(
                          (
                            child,
                            index,
                          ) => (
                            <li
                              key={`${child.label}-${child.href}-${index}`}
                            >
                              <Link
                                href={
                                  child.href
                                }
                                className={[
                                  "mobile-navigation__submenu-link",
                                  isActive(
                                    child.href,
                                  )
                                    ? "mobile-navigation__submenu-link--active"
                                    : "",
                                ]
                                  .filter(
                                    Boolean,
                                  )
                                  .join(
                                    " ",
                                  )}
                                onClick={
                                  closeMobileMenu
                                }
                              >
                                {
                                  child.label
                                }
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-navigation__footer">
            <Link
              href={
                siteConfig.cta.primary.href
              }
              className="button button--primary mobile-navigation__cta"
              onClick={closeMobileMenu}
            >
              {
                siteConfig.cta.primary
                  .label
              }

              <ArrowRight
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mobile-navigation__phone"
              >
                <Phone
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>
                  {siteConfig.contact
                    .phoneDisplay ||
                    siteConfig.contact.phone}
                </span>
              </a>
            )}

            <p className="mobile-navigation__microcopy">
              Vrijblijvend uw woning
              aanmelden in regio Haaglanden.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
