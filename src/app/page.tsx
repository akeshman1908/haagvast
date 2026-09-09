import type { Metadata } from "next";

import QuickLeadForm from "@/components/forms/QuickLeadForm/QuickLeadForm";
import Benefits from "@/components/sections/Benefits/Benefits";
import ContentSection from "@/components/sections/ContentSection/ContentSection";
import Faq from "@/components/sections/Faq/Faq";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import KnowledgePreview from "@/components/sections/KnowledgePreview/KnowledgePreview";
import Hero from "@/components/sections/Hero/Hero";
import Process from "@/components/sections/Process/Process";
import PropertyTypes from "@/components/sections/PropertyTypes/PropertyTypes";
import RegionLinks from "@/components/sections/RegionLinks/RegionLinks";
import RelatedContent from "@/components/sections/RelatedContent/RelatedContent";
import TrustBar from "@/components/sections/TrustBar/TrustBar";
import { siteConfig } from "@/config/site";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "Woning verkopen in Haaglanden",

  description:
    "Uw huis verkopen in Den Haag of Haaglanden? HaagVast bekijkt woningen rechtstreeks en bespreekt vrijblijvend de mogelijkheden voor verkoop.",

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "HaagVast | Woning verkopen in Haaglanden",
    description:
      "Uw woning verkopen in regio Haaglanden? HaagVast kijkt ook naar kluswoningen, gedateerde woningen en woningen die verduurzaming nodig hebben.",
  },

  twitter: {
    card: "summary_large_image",
    title: "HaagVast | Woning verkopen in Haaglanden",
    description:
      "Uw woning verkopen in regio Haaglanden? Bekijk vrijblijvend de mogelijkheden met HaagVast.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Woninginkoop in regio Haaglanden"
        title="Uw woning verkopen zonder onnodig gedoe"
        description="HaagVast bekijkt woningen in heel Haaglanden: Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland en Westland. Ook Voorschoten en direct aangrenzende plaatsen vallen binnen het werkgebied. Ook wanneer de woning verouderd is, renovatie nodig heeft of eerst verduurzaamd moet worden."
        benefits={[
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Ook kluswoningen",
          },
          {
            label: "Vrijblijvende beoordeling",
          },
          {
            label: "Flexibele overdracht",
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
          description="Start met uw postcode en huisnummer. Daarna vragen we alleen de gegevens die nodig zijn om contact met u op te nemen."
          source="homepage"
        />
      </Hero>

      <TrustBar
        items={[
          {
            label: "Actief in regio Haaglanden",
            icon: "house",
          },
          {
            label: "Rechtstreeks contact",
            icon: "handshake",
          },
          {
            label: "Vrijblijvend aanmelden",
            icon: "check",
          },
          {
            label: "Snel duidelijkheid",
            icon: "clock",
          },
        ]}
      />

      <Benefits
        eyebrow="Waarom HaagVast"
        title="Een praktische route voor woningen waar nog werk aan zit"
        description="Niet iedere woning hoeft eerst volledig verkoopklaar gemaakt te worden. HaagVast kijkt naar de huidige staat ÃƒÂ©n naar de mogelijkheden van de woning."
        items={[
          {
            icon: "hammer",
            title: "Renovatie is geen probleem",
            description:
              "Een oude keuken, badkamer, vloer of afwerking hoeft niet eerst vervangen te worden voordat u de woning aanmeldt.",
          },
          {
            icon: "wrench",
            title: "Ook technisch gedateerd",
            description:
              "Oude verwarming, beglazing, elektra of een minder gunstig energielabel kunnen worden meegenomen in de beoordeling.",
          },
          {
            icon: "message",
            title: "Direct contact",
            description:
              "U bespreekt uw woning rechtstreeks met HaagVast zonder onnodige tussenlagen.",
          },
          {
            icon: "key",
            title: "Planning afstemmen",
            description:
              "De gewenste verkoop- en overdrachtsplanning wordt samen besproken.",
          },
          {
            icon: "wallet",
            title: "Eerst rekenen",
            description:
              "Voordat u zelf grote renovatiekosten maakt, kunt u eerst laten bekijken wat verkoop in de huidige staat betekent.",
          },
          {
            icon: "check",
            title: "Vrijblijvend starten",
            description:
              "Een eerste woningaanmelding is bedoeld om te bekijken of verdere gesprekken zinvol zijn.",
          },
        ]}
      />

      <Process
        eyebrow="Zo werkt het"
        title="Van woning aanmelden naar duidelijkheid"
        description="De eerste stappen houden we bewust eenvoudig, zodat u snel weet of HaagVast iets voor uw woning kan betekenen."
        steps={[
          {
            icon: "house",
            title: "Woning aanmelden",
            description:
              "Vul het adres en uw contactgegevens in via het korte formulier.",
          },
          {
            icon: "message",
            title: "Situatie bespreken",
            description:
              "We nemen contact op en bespreken de woning, de staat en uw gewenste planning.",
          },
          {
            icon: "clipboard",
            title: "Woning beoordelen",
            description:
              "We kijken naar ligging, woningtype, onderhoudsstaat en eventuele werkzaamheden.",
          },
          {
            icon: "check",
            title: "Mogelijkheden bespreken",
            description:
              "Als de woning aansluit, bespreken we duidelijk welke vervolgstappen mogelijk zijn.",
          },
        ]}
      />

      <ContentSection
        eyebrow="Verkopen zoals de woning nu is"
        title="Niet eerst duizenden euro's uitgeven om verkoopklaar te worden"
        description="Bij een gedateerde woning lijkt het soms logisch om eerst keuken, badkamer, vloer en afwerking aan te pakken. Dat is niet altijd de beste eerste stap."
        content={
          <>
            <p>
              Renovatie kan waarde toevoegen, maar kost ook tijd, geld en brengt
              risico op onverwachte werkzaamheden met zich mee.
            </p>

            <p>
              HaagVast kijkt daarom naar de woning in de huidige staat. Zo kunt
              u eerst vergelijken of zelf renoveren of rechtstreeks verkopen
              beter aansluit bij uw situatie.
            </p>
          </>
        }
        cta={{
          label: "Lees over kluswoningen",
          href: "/kluswoning-verkopen",
        }}
      />

      <PropertyTypes
        eyebrow="Welke woningen?"
        title="Verschillende woningtypen kunnen interessant zijn"
        description="De huidige afwerking hoeft niet perfect te zijn. Vooral woningen met moderniseringsmogelijkheden kunnen interessant zijn."
        items={[
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Ook appartementen binnen een VvE, oudere complexen en maisonnettes.",
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
              "Woningen waar keuken, badkamer, toilet of volledige afwerking gemoderniseerd moet worden.",
          },
          {
            icon: "wrench",
            title: "Woningen met onderhoud",
            description:
              "Ook wanneer technisch of cosmetisch achterstallig onderhoud aanwezig is.",
          },
          {
            icon: "building",
            title: "Gedateerde woningen",
            description:
              "Bijvoorbeeld woningen met een oude indeling, installaties of een minder gunstig energielabel.",
          },
          {
            icon: "key",
            title: "Bijzondere situaties",
            description:
              "Ook snelheid, nalatenschap of verhuur kunnen een rol spelen bij de verkoop.",
          },
        ]}
      />

      <RegionLinks
        eyebrow="Regio Haaglanden"
        title="Actief in heel Haaglanden en directe omgeving"
        description="HaagVast is actief in Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland en Westland. Ook Voorschoten en direct aangrenzende plaatsen behoren tot het werkgebied."
        items={regions.map((region) => ({
          name: region.data.name,
          href: `/regio/${region.slug}`,
          description: region.seo.description,
        }))}
      />

      <ContentSection
        eyebrow="Rechtstreeks verkopen"
        title="Een makelaar is niet de enige verkooproute"
        description="Voor verkoop op de vrije markt kan een goede makelaar veel waarde toevoegen. Maar wanneer eenvoud, snelheid of de staat van de woning belangrijker zijn, kan rechtstreeks contact met een koper een alternatief zijn."
        content={
          <>
            <p>
              U hoeft dan niet automatisch eerst een volledig verkooptraject met
              styling, fotografie en meerdere bezichtigingen te starten.
            </p>

            <p>
              De juridische overdracht blijft uiteraard correct via de notaris
              verlopen. Het verschil zit vooral in de route naar de verkoop.
            </p>
          </>
        }
        cta={{
          label: "Verkopen zonder makelaar",
          href: "/huis-verkopen-zonder-makelaar",
        }}
        reversed
        muted
      />

      <RelatedContent
        eyebrow="Veel gezocht"
        title="Meer over woning verkopen"
        description="Bekijk de situaties waarvoor eigenaren HaagVast kunnen benaderen."
        items={[
          {
            type: "service",
            title: "Huis snel verkopen",
            description:
              "Voor situaties waarin u vooral snel wilt weten waar u aan toe bent.",
            href: "/huis-snel-verkopen",
          },
          {
            type: "service",
            title: "Kluswoning verkopen",
            description:
              "Een woning verkopen zonder eerst keuken, badkamer of afwerking te vernieuwen.",
            href: "/kluswoning-verkopen",
          },
          {
            type: "service",
            title: "GeÃƒÂ«rfde woning verkopen",
            description:
              "Praktische informatie voor woningen die onderdeel zijn van een nalatenschap.",
            href: "/geerfde-woning-verkopen",
          },
        ]}
      />

      <KnowledgePreview
        eyebrow="Kennisbank"
        title="Eerst goed begrijpen, daarna pas beslissen"
        description="In onze kennisbank leggen we onderwerpen rondom woningverkoop, renovatie, energielabels en bijzondere verkoopsituaties zo praktisch mogelijk uit."
        items={[
          {
            title: "Woning met slecht energielabel verkopen",
            description:
              "Wat betekent een laag label voor verkoop en wanneer is eerst verduurzamen interessant?",
            href: "/kennisbank/woning-verkopen-met-slecht-energielabel",
          },
          {
            title: "Kluswoning verkopen of eerst verbouwen?",
            description:
              "Vergelijk renovatiekosten, mogelijke meerwaarde en verkoop in de huidige staat.",
            href: "/kennisbank/kluswoning-verkopen-of-verbouwen",
          },
          {
            title: "Huis verkopen zonder makelaar",
            description:
              "Wat moet u zelf regelen en wanneer kan rechtstreeks verkopen interessant zijn?",
            href: "/kennisbank/huis-verkopen-zonder-makelaar",
          },
        ]}
      />
      <Faq
        eyebrow="Veelgestelde vragen"
        title="Veelgestelde vragen over HaagVast"
        description="De belangrijkste vragen voordat u een woning vrijblijvend aanmeldt."
        items={[
          {
            question: "Moet mijn woning eerst volledig opgeknapt zijn?",
            answer: (
              <p>
                Nee. HaagVast richt zich juist ook op woningen waar renovatie,
                modernisering of verduurzaming nodig is.
              </p>
            ),
          },
          {
            question: "In welke regio is HaagVast actief?",
            answer: (
              <p>
                HaagVast is actief in heel Haaglanden: Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland en Westland. Ook Voorschoten en andere direct aangrenzende plaatsen kunnen worden aangemeld.
              </p>
            ),
          },
          {
            question: "Zit ik na een woningaanmelding direct ergens aan vast?",
            answer: (
              <p>
                Nee. Een eerste aanmelding is vrijblijvend en bedoeld om te
                bekijken of uw woning en situatie aansluiten bij HaagVast.
              </p>
            ),
          },
          {
            question: "Kan ik ook verkopen zonder makelaar?",
            answer: (
              <p>
                Een verkoopmakelaar is niet wettelijk verplicht. Bij
                rechtstreekse verkoop blijven juridische afspraken en de
                notariÃƒÂ«le overdracht uiteraard wel noodzakelijk.
              </p>
            ),
          },
          {
            question:
              "Bekijkt HaagVast ook woningen met een slecht energielabel?",
            answer: (
              <p>
                Ja. Een laag energielabel sluit een woning niet automatisch uit.
                Ook verduurzamingsmogelijkheden worden meegenomen in de
                beoordeling.
              </p>
            ),
          },
        ]}
      />

      <FinalCta
        eyebrow="Uw woning"
        title="Wilt u eerst weten wat er mogelijk is?"
        description="Meld uw woning vrijblijvend aan. U hoeft niet eerst te verbouwen, een makelaar in te schakelen of de woning volledig verkoopklaar te maken."
        primaryLabel="Mijn woning aanmelden"
        primaryHref="/contact"
        secondaryLabel="Bekijk onze werkwijze"
        secondaryHref="/werkwijze"
      />
    </>
  );
}




