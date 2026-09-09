import type { Metadata } from "next";

import QuickLeadForm from "@/components/forms/QuickLeadForm/QuickLeadForm";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Hero from "@/components/sections/Hero/Hero";
import RegionLinks from "@/components/sections/RegionLinks/RegionLinks";
import { regions } from "@/data/haagvast-regions";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://haagvast.nl";

export const metadata: Metadata = {
  title: "Werkgebied Haaglanden | HaagVast",

  description:
    "Bekijk waar HaagVast actief is in Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland, Westland en Voorschoten.",

  alternates: {
    canonical: `${siteUrl}/regio`,
  },

  openGraph: {
    title: "Werkgebied Haaglanden | HaagVast",
    description:
      "Bekijk alle plaatsen waar HaagVast woningen rechtstreeks van eigenaren bekijkt.",
    url: `${siteUrl}/regio`,
    siteName: "HaagVast",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RegioPage() {
  return (
    <>
      <Hero
        eyebrow="Regio Haaglanden"
        title="Actief in heel Haaglanden en directe omgeving"
        description="HaagVast bekijkt woningen in Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland en Westland. Ook Voorschoten behoort tot het directe werkgebied."
        benefits={[
          {
            label: "Heel Haaglanden",
          },
          {
            label: "Ook Voorschoten",
          },
          {
            label: "Verschillende woningtypen",
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
      >
        <QuickLeadForm
          title="Ontdek de mogelijkheden voor uw woning"
          description="Start met uw postcode en huisnummer. Daarna nemen we contact met u op om de woning en uw situatie te bespreken."
          source="regio-overzicht"
        />
      </Hero>

      <RegionLinks
        eyebrow="Ons werkgebied"
        title="Bekijk uw woonplaats"
        description="Iedere regio heeft een eigen pagina met informatie over de lokale woningmarkt, woningtypen, wijken en mogelijke verkoopsituaties."
        items={regions.map((region) => ({
          name: region.name,
          href: `/regio/${region.slug}`,
          description: region.seoDescription,
        }))}
      />

      <FinalCta
        eyebrow="Staat uw plaats er niet tussen?"
        title="Ook woningen direct buiten Haaglanden kunnen interessant zijn"
        description="Neem gerust contact op en vertel waar de woning staat. We bekijken vrijblijvend of HaagVast iets voor uw situatie kan betekenen."
        primaryLabel="Mijn woning aanmelden"
        primaryHref="/contact"
        secondaryLabel="Bekijk onze werkwijze"
        secondaryHref="/werkwijze"
      />
    </>
  );
}
