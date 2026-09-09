import type { Metadata } from "next";

import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Hero from "@/components/sections/Hero/Hero";
import RegionLinks from "@/components/sections/RegionLinks/RegionLinks";
import { siteConfig } from "@/config/site";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "Woning verkopen in regio Haaglanden",

  description:
    "HaagVast is actief in Den Haag, Voorburg, Leidschendam, Rijswijk en Wassenaar. Bekijk de mogelijkheden voor het verkopen van uw woning in regio Haaglanden.",

  alternates: {
    canonical: `${siteConfig.url}/regio`,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/regio`,
    title: "Woning verkopen in regio Haaglanden | HaagVast",
    description:
      "Bekijk waar HaagVast actief is in regio Haaglanden en ontdek de mogelijkheden voor uw woning.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Woning verkopen in regio Haaglanden | HaagVast",
    description:
      "Bekijk waar HaagVast actief is in regio Haaglanden en ontdek de mogelijkheden voor uw woning.",
  },
};

export default function RegioPage() {
  return (
    <>
      <Hero
        eyebrow="Regio Haaglanden"
        title="Woning verkopen in Haaglanden"
        description="HaagVast richt zich op woningen in Den Haag en omliggende plaatsen. Bekijk hieronder de lokale informatie voor uw woonplaats."
        benefits={[
          {
            label: "Lokale focus op Haaglanden",
          },
          {
            label: "Ook kluswoningen",
          },
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Vrijblijvend aanmelden",
          },
        ]}
        primaryCta={{
          label: "Mijn woning aanmelden",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Bekijk onze werkwijze",
          href: "/werkwijze",
        }}
      />

      <RegionLinks
        eyebrow="Werkgebied"
        title="Bekijk uw woonplaats"
        description="Iedere lokale pagina bevat eigen informatie over woningtypen, buurten, verkoopsituaties en de werkwijze van HaagVast."
        items={regions.map((region) => ({
          name: region.data.name,
          href: `/regio/${region.slug}`,
          description: region.seo.description,
        }))}
      />

      <section className="section section--soft">
        <div className="container container--md">
          <div className="stack stack--md">
            <span className="eyebrow">HaagVast</span>

            <h2 className="heading-2">
              Gericht op Den Haag en omliggende gemeenten
            </h2>

            <p className="text--large">
              Haaglanden bestaat uit verschillende woningmarkten. Een
              appartement in Den Haag vraagt om een andere beoordeling dan een
              maisonette in Leidschendam of een eengezinswoning in Voorburg.
              Daarom krijgt iedere regio een eigen lokale pagina in plaats van
              één generieke tekst waarin alleen de plaatsnaam wordt vervangen.
            </p>

            <p className="text">
              HaagVast kijkt onder andere naar de ligging, het woningtype, de
              onderhoudsstaat, eventuele VvE, verduurzamingsmogelijkheden en
              werkzaamheden die nodig zijn om een woning te moderniseren.
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="Uw woning"
        title="Staat uw plaats er tussen?"
        description="Meld uw woning vrijblijvend aan. Ook woningen net buiten de genoemde plaatsen kunnen interessant zijn wanneer ze binnen of rondom regio Haaglanden liggen."
        primaryLabel="Woning aanmelden"
        primaryHref="/contact"
        secondaryLabel="Bekijk de werkwijze"
        secondaryHref="/werkwijze"
      />
    </>
  );
}
