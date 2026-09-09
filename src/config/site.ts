export const siteConfig = {
  name: "HaagVast",
  legalName: "HaagVast",
  domain: "haagvast.nl",
  url: "https://haagvast.nl",

  description:
    "HaagVast koopt woningen rechtstreeks van eigenaren in regio Haaglanden. Ook kluswoningen, verouderde woningen en woningen die renovatie nodig hebben.",

  locale: "nl_NL",
  language: "nl",

  contact: {
    email: "",
    phone: "",
    phoneDisplay: "",
    whatsapp: "",
  },

  address: {
    street: "",
    postalCode: "",
    city: "",
    country: "Nederland",
    countryCode: "NL",
  },

  region: {
    name: "Haaglanden",
    primaryCities: [
      "Den Haag",
      "Delft",
      "Voorburg",
      "Leidschendam",
      "Rijswijk",
      "Wassenaar",
      "Zoetermeer",
      "Pijnacker-Nootdorp",
      "Midden-Delfland",
      "Westland",
      "Voorschoten",
    ],
  },

  navigation: {
    primary: [
      {
        label: "Woning verkopen",
        href: "/woning-verkopen",
      },
      {
        label: "Regio",
        href: "/regio",
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
        label: "Werkwijze",
        href: "/werkwijze",
      },
      {
        label: "Over HaagVast",
        href: "/over-haagvast",
      },
    ],

    selling: [
      {
        label: "Huis snel verkopen",
        href: "/huis-snel-verkopen",
      },
      {
        label: "Huis verkopen zonder makelaar",
        href: "/huis-verkopen-zonder-makelaar",
      },
      {
        label: "Kluswoning verkopen",
        href: "/kluswoning-verkopen",
      },
      {
        label: "Verhuurde woning verkopen",
        href: "/verhuurde-woning-verkopen",
      },
      {
        label: "Geërfde woning verkopen",
        href: "/geerfde-woning-verkopen",
      },
    ],

    regions: [
      {
        label: "Den Haag",
        href: "/regio/den-haag",
      },
      {
        label: "Voorburg",
        href: "/regio/voorburg",
      },
      {
        label: "Leidschendam",
        href: "/regio/leidschendam",
      },
      {
        label: "Rijswijk",
        href: "/regio/rijswijk",
      },
      {
        label: "Wassenaar",
        href: "/regio/wassenaar",
      },
    ],

    footer: [
      {
        label: "Contact",
        href: "/contact",
      },
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

  cta: {
    primary: {
      label: "Woning aanmelden",
      href: "/contact",
    },

    secondary: {
      label: "Bekijk onze werkwijze",
      href: "/werkwijze",
    },

    quickLead: {
      title: "Ontdek de mogelijkheden voor uw woning",
      description:
        "Vul uw postcode en huisnummer in. We nemen daarna vrijblijvend contact met u op.",
      buttonLabel: "Bekijk de mogelijkheden",
    },
  },

  sellingPoints: [
    "Rechtstreeks contact",
    "Vrijblijvende beoordeling",
    "Flexibele overdracht",
    "Ook woningen die renovatie nodig hebben",
  ],

  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;


