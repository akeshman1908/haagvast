import type { Metadata } from "next";

import ContentSection from "@/components/sections/ContentSection/ContentSection";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Hero from "@/components/sections/Hero/Hero";
import PropertyTypes from "@/components/sections/PropertyTypes/PropertyTypes";
import RelatedContent from "@/components/sections/RelatedContent/RelatedContent";
import TrustBar from "@/components/sections/TrustBar/TrustBar";

import { siteConfig } from "@/config/site";

const canonicalUrl = `${siteConfig.url}/projecten`;

export const metadata: Metadata = {
  title: "Projecten en woningtypen | HaagVast",
  description:
    "Bekijk welke soorten woningen en vastgoedsituaties HaagVast in Haaglanden beoordeelt, van appartementen en gezinswoningen tot kluswoningen en renovatieobjecten.",
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProjectenPage() {
  return (
    <>
      <Hero
        eyebrow="Projecten"
        title="Woningen met potentie in heel Haaglanden"
        description="HaagVast kijkt naar verschillende soorten woningen en situaties. Van reguliere appartementen en gezinswoningen tot objecten waar onderhoud, modernisering of renovatie nodig is."
        benefits={[
          {
            label: "Haaglanden",
          },
          {
            label: "Verschillende woningtypen",
          },
          {
            label: "Ook renovatieobjecten",
          },
          {
            label: "Rechtstreekse beoordeling",
          },
        ]}
        primaryCta={{
          label: "Mijn woning aanmelden",
          href: "/woning-aanmelden",
        }}
        secondaryCta={{
          label: "Bekijk onze regio's",
          href: "/regio",
        }}
      />

      <TrustBar
        items={[
          {
            label: "Appartementen",
            icon: "house",
          },
          {
            label: "Eengezinswoningen",
            icon: "house",
          },
          {
            label: "Kluswoningen",
            icon: "check",
          },
          {
            label: "Renovatieobjecten",
            icon: "check",
          },
        ]}
      />

      <ContentSection
        eyebrow="Onze focus"
        title="Niet alleen woningen die al volledig verkoopklaar zijn"
        description="Bij HaagVast kijken we juist naar de mogelijkheden van een woning in de huidige staat."
        content={
          <>
            <p>
              Sommige woningen zijn direct instapklaar. Andere woningen hebben
              een oudere keuken, badkamer, installaties of afwerking en vragen
              eerst om modernisering.
            </p>

            <p>
              Dat betekent niet automatisch dat u die werkzaamheden als
              eigenaar eerst zelf hoeft uit te voeren voordat u de woning kunt
              bespreken.
            </p>

            <p>
              HaagVast kijkt naar het totale plaatje: locatie, woningtype,
              huidige staat en de mogelijkheden van het object.
            </p>
          </>
        }
        cta={{
          label: "Bekijk hoe HaagVast werkt",
          href: "/werkwijze",
        }}
      />

      <PropertyTypes
        eyebrow="Woningtypen"
        title="Dit soort woningen kunt u aanmelden"
        description="De uiteindelijke beoordeling is altijd afhankelijk van de specifieke woning en locatie."
        items={[
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Appartementen, bovenwoningen en maisonnettes binnen Haaglanden.",
          },
          {
            icon: "home",
            title: "Eengezinswoningen",
            description:
              "Rijtjeswoningen, hoekwoningen en andere grondgebonden woningen.",
          },
          {
            icon: "hammer",
            title: "Kluswoningen",
            description:
              "Woningen waarbij keuken, badkamer of afwerking gemoderniseerd moet worden.",
          },
          {
            icon: "wrench",
            title: "Onderhoudsobjecten",
            description:
              "Objecten waarbij technisch of cosmetisch onderhoud nodig is.",
          },
          {
            icon: "building",
            title: "Gedateerde woningen",
            description:
              "Woningen met bijvoorbeeld oudere installaties, beglazing of indeling.",
          },
          {
            icon: "key",
            title: "Leegstaande woningen",
            description:
              "Woningen die al leegstaan of op korte termijn beschikbaar komen.",
          },
        ]}
      />

      <RelatedContent
        eyebrow="Verkoopmogelijkheden"
        title="Meer over het verkopen van uw woning"
        description="Bekijk welke verkooproute het beste aansluit op uw situatie."
        items={[
          {
            type: "service",
            title: "Woning verkopen",
            description:
              "Bekijk de algemene mogelijkheden voor rechtstreekse woningverkoop via HaagVast.",
            href: "/woning-verkopen",
          },
          {
            type: "service",
            title: "Kluswoning verkopen",
            description:
              "Lees meer over verkopen zonder eerst een volledige renovatie uit te voeren.",
            href: "/kluswoning-verkopen",
          },
          {
            type: "article",
            title: "Kluswoning verkopen of verbouwen",
            description:
              "Bekijk de afweging tussen eerst investeren in renovatie of direct verkopen.",
            href: "/kennisbank/kluswoning-verkopen-of-verbouwen",
          },
        ]}
      />

      <FinalCta
        eyebrow="Uw woning bespreken"
        title="Heeft u een woning die bij HaagVast kan passen?"
        description="Meld de woning vrijblijvend aan. We bekijken de situatie en bespreken daarna persoonlijk de mogelijkheden."
        primaryLabel="Mijn woning aanmelden"
        primaryHref="/woning-aanmelden"
        secondaryLabel="Bekijk onze regio's"
        secondaryHref="/regio"
      />
    </>
  );
}
