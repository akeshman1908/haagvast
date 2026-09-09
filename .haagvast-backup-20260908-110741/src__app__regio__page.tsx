import type { Metadata } from "next";
import Link from "next/link";
import styles from "./regio.module.scss";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://haagvast.nl";

const regions = [
  {
    slug: "den-haag",
    name: "Den Haag",
    text: "Verkoop uw woning rechtstreeks in Den Haag, zonder traditionele verkoopprocedure.",
  },
  {
    slug: "delft",
    name: "Delft",
    text: "Snel en vrijblijvend uw woning verkopen in Delft.",
  },
  {
    slug: "voorburg",
    name: "Voorburg",
    text: "Haagvast koopt woningen rechtstreeks in Voorburg en omgeving.",
  },
  {
    slug: "leidschendam",
    name: "Leidschendam",
    text: "Ontvang vrijblijvend een bod op uw woning in Leidschendam.",
  },
  {
    slug: "rijswijk",
    name: "Rijswijk",
    text: "Uw huis verkopen in Rijswijk zonder langdurig verkooptraject.",
  },
  {
    slug: "wassenaar",
    name: "Wassenaar",
    text: "Direct en discreet uw woning verkopen in Wassenaar.",
  },
  {
    slug: "zoetermeer",
    name: "Zoetermeer",
    text: "Haagvast helpt woningeigenaren in Zoetermeer met directe verkoop.",
  },
  {
    slug: "pijnacker-nootdorp",
    name: "Pijnacker-Nootdorp",
    text: "Uw woning rechtstreeks verkopen in Pijnacker-Nootdorp.",
  },
  {
    slug: "midden-delfland",
    name: "Midden-Delfland",
    text: "Een eenvoudige en duidelijke manier om uw woning in Midden-Delfland te verkopen.",
  },
  {
    slug: "westland",
    name: "Westland",
    text: "Verkoop uw woning rechtstreeks aan Haagvast in het Westland.",
  },
  {
    slug: "voorschoten",
    name: "Voorschoten",
    text: "Ook in Voorschoten kunt u uw woning rechtstreeks aan Haagvast aanbieden.",
  },
];

export const metadata: Metadata = {
  title: "Werkgebied Haaglanden | Huis verkopen | Haagvast",
  description:
    "Haagvast koopt woningen in Den Haag, Voorburg, Leidschendam, Rijswijk, Delft, Wassenaar, Zoetermeer, Westland, Pijnacker-Nootdorp, Midden-Delfland en Voorschoten.",
  alternates: {
    canonical: `${siteUrl}/regio`,
  },
  openGraph: {
    title: "Werkgebied Haaglanden | Haagvast",
    description:
      "Bekijk waar Haagvast woningen rechtstreeks aankoopt in Haaglanden en Voorschoten.",
    url: `${siteUrl}/regio`,
    siteName: "Haagvast",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RegioPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Werkgebied Haagvast",
    description:
      "Overzicht van plaatsen waar Haagvast woningen rechtstreeks aankoopt.",
    url: `${siteUrl}/regio`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: regions.map((region, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: region.name,
        url: `${siteUrl}/regio/${region.slug}`,
      })),
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Ons werkgebied</span>

          <h1>
            Uw huis verkopen in
            <span> Haaglanden</span>
          </h1>

          <p>
            Haagvast koopt woningen rechtstreeks in Den Haag en de omliggende
            gemeenten. Bekijk hieronder waar wij actief zijn en lees meer over
            het verkopen van uw woning in uw eigen plaats.
          </p>
        </div>
      </section>

      <section className={styles.regions}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h2>Waar koopt Haagvast woningen?</h2>

            <p>
              Wij richten ons op de regio Haaglanden en directe omgeving.
              Daarbij kijken we naar appartementen, eengezinswoningen,
              woningen die opgeknapt moeten worden en andere situaties waarin
              een directe verkoop interessant kan zijn.
            </p>
          </div>

          <div className={styles.grid}>
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/regio/${region.slug}`}
                className={styles.card}
              >
                <div>
                  <h3>{region.name}</h3>
                  <p>{region.text}</p>
                </div>

                <span className={styles.link}>
                  Bekijk {region.name}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <div>
              <span className={styles.ctaEyebrow}>
                Staat uw plaats er niet tussen?
              </span>

              <h2>Neem gerust contact met ons op</h2>

              <p>
                Ook buiten deze plaatsen kunnen we naar uw woning kijken.
                Vertel ons waar de woning staat en we bekijken vrijblijvend
                wat mogelijk is.
              </p>
            </div>

            <Link href="/#contact" className={styles.ctaButton}>
              Woning aanbieden
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
