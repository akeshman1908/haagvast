import type { Metadata } from "next";

import QuickLeadForm from "@/components/forms/QuickLeadForm/QuickLeadForm";
import Benefits from "@/components/sections/Benefits/Benefits";
import ContentSection from "@/components/sections/ContentSection/ContentSection";
import Faq from "@/components/sections/Faq/Faq";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Hero from "@/components/sections/Hero/Hero";
import Process from "@/components/sections/Process/Process";
import PropertyTypes from "@/components/sections/PropertyTypes/PropertyTypes";
import RegionLinks from "@/components/sections/RegionLinks/RegionLinks";
import RelatedContent from "@/components/sections/RelatedContent/RelatedContent";
import TrustBar from "@/components/sections/TrustBar/TrustBar";

import { siteConfig } from "@/config/site";
import { regions } from "@/data/haagvast-regions";

const canonicalUrl =
  `${siteConfig.url}/huis-snel-verkopen`;

export const metadata: Metadata = {
  title: "Huis snel verkopen in Haaglanden | HaagVast",

  description:
    "Wilt u uw huis snel verkopen in Den Haag of Haaglanden? HaagVast bekijkt uw woning rechtstreeks en bespreekt vrijblijvend welke verkooproute en planning mogelijk zijn.",

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: canonicalUrl,
    title: "Huis snel verkopen in Haaglanden | HaagVast",
    description:
      "Uw woning snel verkopen zonder onnodig lang verkooptraject? Bespreek vrijblijvend uw woning, situatie en gewenste planning met HaagVast.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Huis snel verkopen in Haaglanden | HaagVast",
    description:
      "Bekijk vrijblijvend welke mogelijkheden er zijn wanneer snelheid en duidelijkheid belangrijk zijn bij de verkoop van uw woning.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HuisSnelVerkopenPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "HaagVast",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Huis snel verkopen",
        item: canonicalUrl,
      },
    ],
  };

  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Huis snel verkopen in Haaglanden",
    description:
      "Informatie over het sneller verkopen van een woning in Haaglanden via een rechtstreekse verkooproute.",
    url: canonicalUrl,

    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },

    about: {
      "@type": "Thing",
      name: "Woning verkopen",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbStructuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageStructuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <Hero
        eyebrow="Huis snel verkopen"
        title="Uw woning verkopen zonder onnodig lang verkooptraject"
        description="Wilt u snel duidelijkheid over de verkoop van uw woning? HaagVast bekijkt woningen rechtstreeks van eigenaren in Haaglanden. U hoeft niet automatisch eerst te verbouwen, uitgebreid verkoopklaar te maken of een lang traject met meerdere bezichtigingen te starten."
        benefits={[
          {
            label: "Vrijblijvend aanmelden",
          },
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Snel duidelijkheid",
          },
          {
            label: "Planning bespreken",
          },
        ]}
        primaryCta={{
          label: "Mijn woning aanmelden",
          href: siteConfig.cta.primary.href,
        }}
        secondaryCta={{
          label: "Bekijk hoe het werkt",
          href: "#werkwijze",
        }}
      >
        <QuickLeadForm
          title="Wilt u uw woning snel verkopen?"
          description="Begin met uw postcode en huisnummer. Daarna bespreken we kort de woning, uw situatie en de gewenste planning."
          source="huis-snel-verkopen"
        />
      </Hero>

      <TrustBar
        items={[
          {
            label: "Actief in heel Haaglanden",
            icon: "house",
          },
          {
            label: "Rechtstreeks contact",
            icon: "handshake",
          },
          {
            label: "Vrijblijvende beoordeling",
            icon: "check",
          },
          {
            label: "Planning bespreekbaar",
            icon: "clock",
          },
        ]}
      />

      <ContentSection
        eyebrow="Wat betekent snel verkopen?"
        title="Snelheid begint vooral met een kortere route naar de verkoop"
        description="Een woning snel verkopen betekent niet dat juridische stappen kunnen worden overgeslagen. Wel kan het traject vóór de uiteindelijke verkoop in sommige situaties eenvoudiger worden ingericht."
        content={
          <>
            <p>
              Bij een traditionele verkoop wordt een woning vaak eerst
              verkoopklaar gemaakt. Daarna volgen bijvoorbeeld fotografie,
              publicatie, bezichtigingen en onderhandelingen met verschillende
              geïnteresseerden.
            </p>

            <p>
              Wanneer u rechtstreeks met een potentiële koper in gesprek gaat,
              zijn niet al deze stappen automatisch nodig. Daardoor kunt u
              eerder duidelijkheid krijgen over de woning, voorwaarden en
              gewenste overdrachtsplanning.
            </p>

            <p>
              Hoe snel een verkoop uiteindelijk kan worden afgerond verschilt
              per situatie. Dat hangt onder andere af van de woning, beschikbare
              documenten, afspraken tussen koper en verkoper en de planning van
              de notaris.
            </p>
          </>
        }
        cta={{
          label: "Bekijk onze werkwijze",
          href: "/werkwijze",
        }}
      />

      <Benefits
        eyebrow="Wanneer snelheid telt"
        title="Situaties waarin een kort verkooptraject prettig kan zijn"
        description="Niet iedere verkoper heeft dezelfde prioriteiten. Soms is maximale marktbelangstelling het belangrijkst, terwijl in andere situaties juist duidelijkheid, planning of gemak zwaarder weegt."
        items={[
          {
            icon: "key",
            title: "Andere woning gekocht",
            description:
              "Wanneer u al een andere woning heeft gekocht, kan sneller duidelijkheid over de oude woning rust geven in uw planning.",
          },
          {
            icon: "house",
            title: "Woning staat leeg",
            description:
              "Bij een leegstaande woning kunnen vaste lasten en praktisch beheer blijven doorlopen zolang de verkoop nog niet is afgerond.",
          },
          {
            icon: "hammer",
            title: "Veel renovatie nodig",
            description:
              "U kunt eerst bekijken wat verkoop in de huidige staat betekent voordat u zelf tijd en geld in een grote verbouwing steekt.",
          },
          {
            icon: "message",
            title: "Persoonlijke situatie",
            description:
              "Bij bijvoorbeeld een verhuizing, scheiding of andere verandering kan behoefte bestaan aan een overzichtelijk verkoopproces.",
          },
          {
            icon: "check",
            title: "Nalatenschap",
            description:
              "Een woning uit een nalatenschap kan extra werkzaamheden en keuzes met zich meebrengen. Een duidelijke verkooproute kan dan prettig zijn.",
          },
          {
            icon: "check",
            title: "Minder verkoopgedoe",
            description:
              "Niet iedere eigenaar wil styling, fotografie, veel bezichtigingen en een uitgebreid verkoopproces organiseren.",
          },
        ]}
      />

      <section id="werkwijze">
        <Process
          eyebrow="Zo werkt het"
          title="Van woning aanmelden naar duidelijke vervolgstappen"
          description="De eerste stappen houden we bewust kort. Eerst bekijken we of uw woning en gewenste planning bij HaagVast aansluiten."
          steps={[
            {
              icon: "house",
              title: "Woning aanmelden",
              description:
                "Vul het adres en uw contactgegevens in. U hoeft nog geen uitgebreid verkoopdossier samen te stellen.",
            },
            {
              icon: "message",
              title: "Planning bespreken",
              description:
                "We bespreken waarom u wilt verkopen, wat voor u belangrijk is en wanneer u de woning idealiter wilt overdragen.",
            },
            {
              icon: "check",
              title: "Woning beoordelen",
              description:
                "We kijken naar de ligging, het woningtype, de onderhoudsstaat en de mogelijkheden van de woning.",
            },
            {
              icon: "check",
              title: "Mogelijkheden bespreken",
              description:
                "Als de woning aansluit, bespreken we de mogelijke voorwaarden en vervolgstappen. U bepaalt zelf of u verder wilt.",
            },
          ]}
        />
      </section>

      <ContentSection
        eyebrow="Een belangrijke afweging"
        title="Snel verkopen of eerst de volledige markt op?"
        description="Een rechtstreekse verkooproute en traditionele verkoop via de vrije markt hebben ieder hun eigen voordelen. Welke route beter is, hangt af van wat voor u het zwaarst weegt."
        content={
          <>
            <p>
              Wie maximale marktwerking zoekt, kan ervoor kiezen de woning breed
              te presenteren en meerdere potentiële kopers de mogelijkheid te
              geven om te bieden. Een goede verkoopmakelaar kan bij zo'n traject
              veel waarde toevoegen.
            </p>

            <p>
              Wanneer u vooral behoefte heeft aan minder voorbereiding,
              rechtstreeks contact en duidelijkheid over een mogelijke planning,
              kan het interessant zijn om eerst een directe verkooproute te
              onderzoeken.
            </p>

            <p>
              Daarom hoeft u bij HaagVast niet vooraf te beslissen dat u uw
              woning daadwerkelijk rechtstreeks gaat verkopen. Een eerste
              aanmelding is juist bedoeld om de mogelijkheden te bespreken.
            </p>
          </>
        }
        cta={{
          label: "Lees over verkopen zonder makelaar",
          href: "/huis-verkopen-zonder-makelaar",
        }}
        reversed
        muted
      />

      <PropertyTypes
        eyebrow="Welke woningen?"
        title="Ook wanneer uw woning niet volledig verkoopklaar is"
        description="Snelheid kan juist belangrijk zijn wanneer u geen maanden wilt besteden aan renovatie of voorbereiding. HaagVast bekijkt verschillende woningtypen in de huidige staat."
        items={[
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Appartementen, maisonnettes en woningen binnen een VvE.",
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
              "Woningen waar keuken, badkamer of volledige afwerking nog gemoderniseerd moet worden.",
          },
          {
            icon: "wrench",
            title: "Achterstallig onderhoud",
            description:
              "Ook wanneer technisch of cosmetisch onderhoud onderdeel is van de situatie.",
          },
          {
            icon: "building",
            title: "Gedateerde woningen",
            description:
              "Bijvoorbeeld een oudere indeling, installaties, beglazing of minder gunstig energielabel.",
          },
          {
            icon: "key",
            title: "Leegstaande woningen",
            description:
              "Ook woningen die al leegstaan of op korte termijn beschikbaar komen kunnen worden besproken.",
          },
        ]}
      />

      <ContentSection
        eyebrow="Geen vaste verkooptijd"
        title="Hoe snel kan een woning daadwerkelijk worden verkocht?"
        description="Daar geven we bewust geen algemene garantie voor. Een betrouwbare planning hangt af van de concrete woning en de afspraken die worden gemaakt."
        content={
          <>
            <p>
              Eerst moeten koper en verkoper overeenstemming bereiken over
              onder andere de prijs, voorwaarden en gewenste datum van
              eigendomsoverdracht.
            </p>

            <p>
              Vervolgens moeten de afspraken correct worden vastgelegd en loopt
              de officiële eigendomsoverdracht via de notaris. Ook eventuele
              voorwaarden en benodigde documenten kunnen invloed hebben op de
              planning.
            </p>

            <p>
              HaagVast richt zich daarom liever op snel duidelijkheid geven over
              de mogelijkheden dan op een onrealistische standaardbelofte voor
              iedere woning.
            </p>
          </>
        }
      />

      <RegionLinks
        eyebrow="Huis snel verkopen in Haaglanden"
        title="Actief in heel Haaglanden en directe omgeving"
        description="Bekijk de lokale informatie voor uw woonplaats. HaagVast is actief in Den Haag, Delft, Voorburg, Leidschendam, Rijswijk, Wassenaar, Zoetermeer, Pijnacker-Nootdorp, Midden-Delfland, Westland en Voorschoten."
        items={regions.map((region) => ({
          name: `Woning verkopen in ${region.name}`,
          href: `/regio/${region.slug}`,
          description: region.seoDescription,
        }))}
      />

      <Faq
        eyebrow="Veelgestelde vragen"
        title="Veelgestelde vragen over snel een huis verkopen"
        description="De belangrijkste vragen wanneer u snelheid en duidelijkheid belangrijk vindt."
        items={[
          {
            question:
              "Hoe snel kan ik mijn huis via HaagVast verkopen?",
            answer: (
              <p>
                Dat verschilt per woning en situatie. Onder andere de
                beoordeling van de woning, gemaakte afspraken, beschikbare
                documenten en de gewenste overdrachtsdatum spelen een rol.
                HaagVast belooft daarom geen vaste verkooptijd voordat de
                situatie is bekeken.
              </p>
            ),
          },
          {
            question:
              "Moet mijn woning eerst verkoopklaar worden gemaakt?",
            answer: (
              <p>
                Nee. U kunt uw woning ook aanmelden wanneer deze gedateerd is,
                onderhoud nodig heeft of volledig gerenoveerd zou moeten worden.
                We kijken juist naar de woning in de huidige staat.
              </p>
            ),
          },
          {
            question:
              "Moet ik eerst een makelaar inschakelen?",
            answer: (
              <p>
                Nee. U kunt uw woning eerst rechtstreeks bij HaagVast aanmelden
                om de mogelijkheden te bespreken. Wilt u de woning daarna toch
                via de vrije markt verkopen, dan kunt u uiteraard alsnog een
                verkoopmakelaar inschakelen.
              </p>
            ),
          },
          {
            question:
              "Kan ik zelf aangeven wanneer ik de woning wil overdragen?",
            answer: (
              <p>
                Ja. Uw gewenste planning wordt vanaf het eerste gesprek
                besproken. Een definitieve overdrachtsdatum moet uiteindelijk
                door koper en verkoper worden afgesproken en correct worden
                vastgelegd.
              </p>
            ),
          },
          {
            question:
              "Zit ik na het aanmelden van mijn woning ergens aan vast?",
            answer: (
              <p>
                Nee. De eerste woningaanmelding bij HaagVast is vrijblijvend.
                Deze stap is bedoeld om te bekijken of uw woning en situatie
                aansluiten en welke vervolgstappen mogelijk zijn.
              </p>
            ),
          },
          {
            question:
              "Is rechtstreeks verkopen altijd beter dan via de vrije markt?",
            answer: (
              <p>
                Nee. Dat hangt af van uw doel. Wie maximale marktwerking zoekt
                kan baat hebben bij brede verkoop via de vrije markt. Wie
                eenvoud, minder voorbereiding en directe duidelijkheid
                belangrijk vindt, kan eerst een rechtstreekse verkooproute
                onderzoeken.
              </p>
            ),
          },
        ]}
      />

      <RelatedContent
        eyebrow="Verder bekijken"
        title="Meer over uw verkoopmogelijkheden"
        description="Bekijk informatie die aansluit op een snelle of rechtstreekse woningverkoop."
        items={[
          {
            type: "service",
            title: "Huis verkopen zonder makelaar",
            description:
              "Bekijk hoe een rechtstreekse verkooproute zonder verkoopmakelaar kan werken.",
            href: "/huis-verkopen-zonder-makelaar",
          },
          {
            type: "service",
            title: "Kluswoning verkopen",
            description:
              "Uw woning verkopen zonder eerst een volledige renovatie uit te voeren.",
            href: "/kluswoning-verkopen",
          },
          {
            type: "article",
            title: "Kluswoning verkopen of eerst verbouwen?",
            description:
              "Vergelijk de mogelijke voordelen, kosten en risico's van eerst verbouwen of direct verkopen.",
            href: "/kennisbank/kluswoning-verkopen-of-verbouwen",
          },
        ]}
      />

      <FinalCta
        eyebrow="Vrijblijvend starten"
        title="Wilt u snel weten wat er met uw woning mogelijk is?"
        description="Meld uw woning vrijblijvend aan. We bespreken de woning, uw situatie en gewenste planning voordat u ergens over hoeft te beslissen."
        primaryLabel="Mijn woning aanmelden"
        primaryHref={siteConfig.cta.primary.href}
        secondaryLabel="Bekijk onze werkwijze"
        secondaryHref="/werkwijze"
      />
    </>
  );
}

