import { siteConfig } from "@/config/site";

export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavigationGroup = {
  label: string;
  href?: string;
  items: NavigationItem[];
};

export const mainNavigation: NavigationGroup[] = [
  {
    label: "Woning verkopen",
    href: "/woning-verkopen",
    items: [
      {
        label: "Huis snel verkopen",
        href: "/huis-snel-verkopen",
        description:
          "Bekijk de mogelijkheden wanneer u snel duidelijkheid wilt over de verkoop van uw woning.",
      },
      {
        label: "Huis verkopen zonder makelaar",
        href: "/huis-verkopen-zonder-makelaar",
        description:
          "Lees hoe rechtstreekse verkoop zonder traditioneel makelaarstraject werkt.",
      },
      {
        label: "Kluswoning verkopen",
        href: "/kluswoning-verkopen",
        description:
          "Ook woningen die renovatie, verduurzaming of modernisering nodig hebben.",
      },
      {
        label: "Verhuurde woning verkopen",
        href: "/verhuurde-woning-verkopen",
        description:
          "Informatie over de mogelijkheden bij de verkoop van verhuurd vastgoed.",
      },
      {
        label: "Geërfde woning verkopen",
        href: "/geerfde-woning-verkopen",
        description:
          "Praktische informatie wanneer een woning onderdeel is van een nalatenschap.",
      },
    ],
  },
  {
    label: "Regio",
    href: "/regio",
    items: siteConfig.navigation.regions.map((item) => ({
      label: item.label,
      href: item.href,
      description: `Woning verkopen in ${item.label}.`,
    })),
  },
  {
    label: "Projecten",
    href: "/projecten",
    items: [],
  },
  {
    label: "Kennisbank",
    href: "/kennisbank",
    items: [],
  },
  {
    label: "Werkwijze",
    href: "/werkwijze",
    items: [],
  },
  {
    label: "Over HaagVast",
    href: "/over-haagvast",
    items: [],
  },
];

export const mobileNavigation: NavigationGroup[] = mainNavigation;

export const footerNavigation = {
  woningVerkopen: {
    title: "Woning verkopen",
    items: siteConfig.navigation.selling,
  },

  regio: {
    title: "Regio Haaglanden",
    items: siteConfig.navigation.regions,
  },

  haagVast: {
    title: "HaagVast",
    items: [
      {
        label: "Werkwijze",
        href: "/werkwijze",
      },
      {
        label: "Projecten",
        href: "/projecten",
      },
      {
        label: "Kennisbank",
        href: "/kennisbank",
      },
      {
        label: "Over HaagVast",
        href: "/over-haagvast",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },

  legal: {
    title: "Juridisch",
    items: [
      {
        label: "Privacy",
        href: "/privacy",
      },
      {
        label: "Cookiebeleid",
        href: "/cookies",
      },
    ],
  },
} as const;
