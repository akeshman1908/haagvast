import type { RegionPageData } from "@/components/templates/RegionPageTemplate/RegionPageTemplate";

export type Region = {
  slug: string;
  seo: {
    title: string;
    description: string;
  };
  data: RegionPageData;
};

export const regions: Region[] = [
  {
    slug: "den-haag",

    seo: {
      title: "Huis verkopen in Den Haag",
      description:
        "Uw huis verkopen in Den Haag? HaagVast bekijkt woningen rechtstreeks van eigenaren, waaronder kluswoningen en woningen die modernisering nodig hebben.",
    },

    data: {
      name: "Den Haag",

      hero: {
        eyebrow: "Woning verkopen in Den Haag",
        title: "Uw huis verkopen in Den Haag zonder onnodig gedoe",
        description:
          "HaagVast richt zich op woningen in Den Haag en omgeving. Ook wanneer de woning verouderd is, achterstallig onderhoud heeft of eerst gemoderniseerd moet worden.",
        benefits: [
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Ook kluswoningen",
          },
          {
            label: "Flexibele overdracht",
          },
          {
            label: "Vrijblijvende beoordeling",
          },
        ],
        leadFormTitle: "Woning in Den Haag aanmelden",
        leadFormDescription:
          "Vul uw postcode en huisnummer in. Daarna vragen we alleen de gegevens die nodig zijn om contact met u op te nemen.",
        leadSource: "regio-den-haag",
      },

      benefits: {
        eyebrow: "Direct en duidelijk",
        title: "Een andere manier om uw woning in Den Haag te verkopen",
        description:
          "Niet iedere eigenaar heeft behoefte aan een lang verkooptraject met styling, meerdere bezichtigingen en onzekerheid over de uiteindelijke koper.",
        items: [
          {
            icon: "message",
            title: "Rechtstreeks contact",
            description:
              "U heeft rechtstreeks contact met HaagVast over de woning en de mogelijke verkoop.",
          },
          {
            icon: "hammer",
            title: "Renovatie is geen bezwaar",
            description:
              "Een gedateerde keuken, badkamer, slechte afwerking of verduurzamingsopgave hoeft verkoop niet in de weg te staan.",
          },
          {
            icon: "key",
            title: "Overdracht bespreekbaar",
            description:
              "We kijken samen naar een overdrachtsmoment dat bij uw situatie en planning past.",
          },
          {
            icon: "check",
            title: "Vrijblijvend beoordelen",
            description:
              "U kunt eerst de mogelijkheden laten bekijken zonder dat u direct ergens aan vastzit.",
          },
        ],
      },

      neighborhoods: {
        eyebrow: "Lokaal actief",
        title: "Wijken en buurten in Den Haag",
        description:
          "HaagVast richt zich op woningen verspreid over Den Haag. Hieronder staan enkele gebieden waar we naar woningen kijken.",
        items: [
          "Bezuidenhout",
          "Mariahoeve",
          "Benoordenhout",
          "Laakkwartier",
          "Rivierenbuurt",
          "Leyenburg",
          "Vruchtenbuurt",
          "Valkenboskwartier",
          "Regentessekwartier",
          "Scheveningen",
          "Loosduinen",
          "Ypenburg",
        ],
      },

      process: {
        eyebrow: "Werkwijze",
        title: "Zo werkt een woning aanmelden in Den Haag",
        description:
          "We houden het proces bewust overzichtelijk. Eerst kijken we of de woning bij HaagVast past.",
        steps: [
          {
            icon: "house",
            title: "Woning aanmelden",
            description:
              "U geeft het adres en uw contactgegevens door via de website.",
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
              "We bekijken de beschikbare informatie en waar nodig de woning zelf.",
          },
          {
            icon: "check",
            title: "Mogelijkheden bespreken",
            description:
              "Als de woning interessant is, bespreken we duidelijk wat er mogelijk is en onder welke voorwaarden.",
          },
        ],
      },

      propertyTypes: {
        eyebrow: "Verschillende situaties",
        title: "Welke woningen bekijken we in Den Haag?",
        description:
          "De huidige staat van een woning hoeft niet perfect te zijn. Juist woningen waar nog werk aan zit kunnen interessant zijn.",
        items: [
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Van kleinere appartementen tot grotere maisonnettes en bovenwoningen.",
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
              "Woningen waar keuken, badkamer, afwerking of installaties gemoderniseerd moeten worden.",
          },
          {
            icon: "wrench",
            title: "Achterstallig onderhoud",
            description:
              "Ook wanneer eerst technisch of cosmetisch onderhoud nodig is.",
          },
          {
            icon: "building",
            title: "Gedateerde appartementen",
            description:
              "Bijvoorbeeld appartementen met een oude indeling, afwerking of installaties.",
          },
          {
            icon: "key",
            title: "Bijzondere verkoopsituaties",
            description:
              "We kunnen ook meedenken wanneer snelheid, nalatenschap of een andere situatie een rol speelt.",
          },
        ],
      },

      localContent: [
        {
          eyebrow: "Lokale woningmarkt",
          title: "Een woning verkopen in een diverse Haagse markt",
          description:
            "Den Haag bestaat uit veel verschillende woningtypen, bouwperiodes en buurten. Daardoor kan de aanpak per woning sterk verschillen.",
          content: (
            <>
              <p>
                Een appartement in <strong>Bezuidenhout</strong> vraagt
                bijvoorbeeld om een andere beoordeling dan een woning in
                Scheveningen, Loosduinen of Laakkwartier.
              </p>

              <p>
                HaagVast kijkt daarom niet alleen naar een gemiddelde
                vierkantemeterprijs, maar ook naar de ligging, het woningtype,
                de onderhoudsstaat, de VvE, verduurzamingsmogelijkheden en de
                werkzaamheden die eventueel nodig zijn.
              </p>
            </>
          ),
        },
        {
          eyebrow: "Woning met werk",
          title: "Eerst verbouwen of verkopen zoals de woning nu is?",
          description:
            "Een nieuwe keuken of badkamer kan waarde toevoegen, maar dat betekent niet automatisch dat u die investering eerst zelf moet doen.",
          content: (
            <>
              <p>
                Vooral bij een gedateerde woning kunnen renovatiekosten,
                planning en onverwachte werkzaamheden snel oplopen.
              </p>

              <p>
                Wanneer u vooral duidelijkheid wilt, kan het interessant zijn om
                eerst te laten bekijken wat de woning in de huidige staat kan
                betekenen voordat u zelf grote bedragen investeert.
              </p>
            </>
          ),
          reversed: true,
          muted: true,
        },
      ],

      faq: {
        eyebrow: "Veelgestelde vragen",
        title: "Veelgestelde vragen over een woning verkopen in Den Haag",
        items: [
          {
            question:
              "Koopt HaagVast ook woningen die volledig gerenoveerd moeten worden?",
            answer: (
              <p>
                Ja. Een woning hoeft niet instapklaar te zijn. Een verouderde
                keuken, badkamer, vloer, installaties of een minder gunstig
                energielabel kunnen juist onderdeel zijn van de beoordeling.
              </p>
            ),
          },
          {
            question:
              "Moet ik mijn woning eerst opknappen voordat ik deze aanmeld?",
            answer: (
              <p>
                Nee. Het uitgangspunt is dat we de woning kunnen bekijken zoals
                deze nu is. Daarna kunt u bepalen welke route het beste bij uw
                situatie past.
              </p>
            ),
          },
          {
            question: "Is een aanvraag bij HaagVast direct bindend?",
            answer: (
              <p>
                Nee. Het aanmelden van een woning en een eerste beoordeling zijn
                vrijblijvend. Pas wanneer beide partijen overeenstemming
                bereiken, worden afspraken formeel vastgelegd.
              </p>
            ),
          },
          {
            question: "In welke delen van Den Haag is HaagVast actief?",
            answer: (
              <p>
                HaagVast richt zich op heel Den Haag en kijkt onder andere naar
                woningen in Bezuidenhout, Mariahoeve, Laakkwartier,
                Regentessekwartier, Leyenburg, Scheveningen en andere Haagse
                buurten.
              </p>
            ),
          },
        ],
      },

      relatedContent: {
        eyebrow: "Meer informatie",
        title: "Meer over uw woning verkopen",
        items: [
          {
            icon: "service",
            title: "Kluswoning verkopen",
            description:
              "Lees meer over het verkopen van een woning waar renovatie of modernisering nodig is.",
            href: "/kluswoning-verkopen",
          },
          {
            icon: "service",
            title: "Huis verkopen zonder makelaar",
            description:
              "Bekijk hoe rechtstreekse verkoop verschilt van een traditioneel makelaarstraject.",
            href: "/huis-verkopen-zonder-makelaar",
          },
          {
            icon: "article",
            title: "Kennisbank",
            description:
              "Praktische informatie over woningverkoop, renovatie en verschillende verkoopsituaties.",
            href: "/kennisbank",
          },
        ],
      },
    },
  },

  {
    slug: "voorburg",

    seo: {
      title: "Huis verkopen in Voorburg",
      description:
        "Uw woning verkopen in Voorburg? HaagVast bekijkt appartementen, eengezinswoningen en kluswoningen rechtstreeks van eigenaren.",
    },

    data: {
      name: "Voorburg",

      hero: {
        eyebrow: "Woning verkopen in Voorburg",
        title: "Uw woning verkopen in Voorburg op een duidelijke manier",
        description:
          "HaagVast is lokaal gericht op Voorburg en omgeving en kijkt ook naar woningen die eerst gerenoveerd of gemoderniseerd moeten worden.",
        benefits: [
          {
            label: "Lokaal gericht op Haaglanden",
          },
          {
            label: "Ook verouderde woningen",
          },
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Vrijblijvende beoordeling",
          },
        ],
        leadFormTitle: "Woning in Voorburg aanmelden",
        leadFormDescription:
          "Geef uw postcode en huisnummer door om de mogelijkheden voor uw woning te laten bekijken.",
        leadSource: "regio-voorburg",
      },

      benefits: {
        eyebrow: "HaagVast in Voorburg",
        title: "Ook wanneer uw woning nog gemoderniseerd moet worden",
        description:
          "Voorburg kent zowel vooroorlogse woningen als appartementen en naoorlogse woonwijken. Niet iedere woning hoeft eerst volledig verkoopklaar gemaakt te worden.",
        items: [
          {
            icon: "house",
            title: "Lokale focus",
            description:
              "HaagVast richt zich specifiek op Haaglanden, waaronder Voorburg.",
          },
          {
            icon: "hammer",
            title: "Kluswoningen welkom",
            description:
              "Oude badkamers, keukens, vloeren of installaties hoeven geen probleem te zijn.",
          },
          {
            icon: "message",
            title: "Korte lijnen",
            description:
              "U bespreekt de woning rechtstreeks en weet wie uw aanspreekpunt is.",
          },
          {
            icon: "key",
            title: "Flexibele planning",
            description:
              "We bespreken welke planning en overdrachtsdatum bij uw situatie passen.",
          },
        ],
      },

      neighborhoods: {
        eyebrow: "Voorburg",
        title: "Actief in verschillende delen van Voorburg",
        description:
          "We kijken naar woningen verspreid over Voorburg en directe omgeving.",
        items: [
          "Voorburg-Noord",
          "Voorburg-Midden",
          "Bovenveen",
          "Essesteijn",
          "Voorburg-West",
          "Oud Voorburg",
        ],
      },

      process: {
        eyebrow: "In vier stappen",
        title: "Zo meldt u een woning in Voorburg aan",
        steps: [
          {
            icon: "house",
            title: "Adres doorgeven",
            description:
              "Vul de basisgegevens van de woning in via het formulier.",
          },
          {
            icon: "message",
            title: "Kort bespreken",
            description:
              "We bespreken uw situatie en de belangrijkste eigenschappen van de woning.",
          },
          {
            icon: "clipboard",
            title: "Beoordeling",
            description:
              "De woning wordt bekeken op ligging, staat en mogelijkheden.",
          },
          {
            icon: "check",
            title: "Duidelijkheid",
            description: "Daarna bespreken we of en hoe HaagVast verder kan.",
          },
        ],
      },

      propertyTypes: {
        eyebrow: "Woningtypen",
        title: "Woningen die we in Voorburg bekijken",
        items: [
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Ook appartementen binnen een actieve VvE of oudere complexen.",
          },
          {
            icon: "home",
            title: "Eengezinswoningen",
            description: "Van compacte rijwoningen tot ruimere gezinswoningen.",
          },
          {
            icon: "hammer",
            title: "Renovatiewoningen",
            description:
              "Woningen waar keuken, badkamer of volledige afwerking verouderd is.",
          },
          {
            icon: "wrench",
            title: "Woningen met onderhoud",
            description:
              "Ook woningen waarbij eerst werkzaamheden of verduurzaming nodig zijn.",
          },
        ],
      },

      localContent: [
        {
          eyebrow: "Lokale situatie",
          title: "Voorburg heeft veel verschillende soorten woningen",
          content: (
            <>
              <p>
                Binnen Voorburg liggen moderne appartementen, maisonnettes,
                oudere herenhuizen en eengezinswoningen relatief dicht bij
                elkaar.
              </p>

              <p>
                Daarom beoordelen we een woning niet alleen op het aantal
                vierkante meters. Ook de locatie, VvE, technische staat,
                indeling en renovatiemogelijkheden spelen mee.
              </p>
            </>
          ),
        },
      ],

      faq: {
        title: "Veelgestelde vragen over verkopen in Voorburg",
        items: [
          {
            question: "Kan ik een gedateerd appartement in Voorburg aanmelden?",
            answer: (
              <p>
                Ja. Ook een appartement met een oude keuken, badkamer,
                vloerafwerking of installaties kan worden aangemeld.
              </p>
            ),
          },
          {
            question: "Is een actieve VvE belangrijk bij een appartement?",
            answer: (
              <p>
                Een VvE is één van de onderdelen die bij een appartement wordt
                bekeken. Onder meer de bijdrage, reserves, plannen en
                beschikbare stukken kunnen relevant zijn.
              </p>
            ),
          },
          {
            question: "Moet ik eerst een makelaar inschakelen?",
            answer: (
              <p>
                Nee. U kunt HaagVast rechtstreeks benaderen om eerst te kijken
                welke mogelijkheden er voor uw woning zijn.
              </p>
            ),
          },
        ],
      },

      relatedContent: {
        title: "Meer relevante informatie",
        items: [
          {
            icon: "region",
            title: "Woning verkopen in Leidschendam",
            description:
              "Bekijk onze pagina voor woningen in het naastgelegen Leidschendam.",
            href: "/regio/leidschendam",
          },
          {
            icon: "service",
            title: "Kluswoning verkopen",
            description:
              "Meer informatie voor woningen waar nog werkzaamheden nodig zijn.",
            href: "/kluswoning-verkopen",
          },
          {
            icon: "service",
            title: "Huis snel verkopen",
            description:
              "Lees wat belangrijk is als u vooral snel duidelijkheid wilt.",
            href: "/huis-snel-verkopen",
          },
        ],
      },
    },
  },

  {
    slug: "leidschendam",

    seo: {
      title: "Huis verkopen in Leidschendam",
      description:
        "Uw woning verkopen in Leidschendam? HaagVast kijkt ook naar appartementen, maisonnettes en woningen die renovatie of verduurzaming nodig hebben.",
    },

    data: {
      name: "Leidschendam",

      hero: {
        eyebrow: "Woning verkopen in Leidschendam",
        title: "Een woning in Leidschendam verkopen zoals deze nu is",
        description:
          "Van een gedateerde bovenmaisonnette tot een eengezinswoning die gemoderniseerd moet worden: HaagVast bekijkt de mogelijkheden in de huidige staat.",
        benefits: [
          {
            label: "Ook renovatiewoningen",
          },
          {
            label: "Direct contact",
          },
          {
            label: "Geen perfecte afwerking nodig",
          },
          {
            label: "Vrijblijvend aanmelden",
          },
        ],
        leadFormTitle: "Woning in Leidschendam aanmelden",
        leadFormDescription:
          "Vul het adres in en ontdek of de woning aansluit bij wat HaagVast zoekt.",
        leadSource: "regio-leidschendam",
      },

      benefits: {
        eyebrow: "Praktische aanpak",
        title: "Verouderd betekent niet onverkoopbaar",
        items: [
          {
            icon: "hammer",
            title: "Renovatie mag nodig zijn",
            description:
              "Een oude keuken, badkamer, verwarming of afwerking kan worden meegenomen in de beoordeling.",
          },
          {
            icon: "apartment",
            title: "Ook appartementen",
            description:
              "We kijken onder andere naar appartementen en maisonnettes binnen VvE-complexen.",
          },
          {
            icon: "message",
            title: "Rechtstreeks bespreken",
            description:
              "Geen onnodige tussenlagen wanneer u eerst wilt weten wat mogelijk is.",
          },
          {
            icon: "check",
            title: "Geen verplichting",
            description:
              "Aanmelden is bedoeld om eerst de situatie te kunnen beoordelen.",
          },
        ],
      },

      neighborhoods: {
        eyebrow: "Regio",
        title: "Gebieden in Leidschendam",
        description:
          "HaagVast kijkt naar woningen verspreid over Leidschendam.",
        items: [
          "Leidschendam-Centrum",
          "De Heuvel",
          "Prinsenhof",
          "Amstelwijk",
          "De Zijde",
          "Raadhuiskwartier",
        ],
      },

      process: {
        eyebrow: "Zo werkt het",
        title: "Van aanmelding tot duidelijkheid",
        steps: [
          {
            icon: "house",
            title: "Aanmelden",
            description: "Geef het adres en enkele contactgegevens door.",
          },
          {
            icon: "message",
            title: "Bespreken",
            description: "We bespreken de staat van de woning en uw situatie.",
          },
          {
            icon: "clipboard",
            title: "Bekijken",
            description: "We beoordelen de woning en beschikbare informatie.",
          },
          {
            icon: "check",
            title: "Vervolg",
            description:
              "Als er een goede aansluiting is bespreken we de mogelijke vervolgstappen.",
          },
        ],
      },

      propertyTypes: {
        eyebrow: "Wat zoeken we?",
        title: "Verschillende woningen in Leidschendam",
        items: [
          {
            icon: "apartment",
            title: "Maisonnettes",
            description:
              "Ook oudere boven- en benedenmaisonnettes kunnen interessant zijn.",
          },
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Van compacte appartementen tot ruimere woningen binnen een VvE.",
          },
          {
            icon: "home",
            title: "Gezinswoningen",
            description: "Eengezinswoningen in verschillende onderhoudsstaten.",
          },
          {
            icon: "hammer",
            title: "Kluswoningen",
            description:
              "Woningen met duidelijke moderniserings- of verduurzamingsmogelijkheden.",
          },
        ],
      },

      localContent: [
        {
          eyebrow: "Moderniseren",
          title: "Een woning met een oud energielabel of oude installaties",
          content: (
            <>
              <p>
                In delen van Leidschendam staan woningen uit bouwperioden waarin
                isolatie en installaties anders werden uitgevoerd dan
                tegenwoordig gebruikelijk is.
              </p>

              <p>
                Oude beglazing, gaskachels, verouderde cv-installaties of
                beperkte isolatie hoeven daarom niet automatisch een probleem te
                zijn. De kosten en mogelijkheden worden meegenomen in het totale
                beeld.
              </p>
            </>
          ),
        },
      ],

      faq: {
        title: "Veelgestelde vragen over Leidschendam",
        items: [
          {
            question:
              "Koopt HaagVast ook een appartement met energielabel E of lager?",
            answer: (
              <p>
                Een minder gunstig energielabel sluit een woning niet
                automatisch uit. We kijken naar het geheel, waaronder de
                mogelijkheden om de woning te verbeteren.
              </p>
            ),
          },
          {
            question:
              "Kan ik een woning met gaskachels of oude verwarming aanmelden?",
            answer: (
              <p>
                Ja. Verouderde installaties kunnen onderdeel zijn van een
                renovatie en worden meegenomen in de beoordeling.
              </p>
            ),
          },
          {
            question: "Moet de keuken en badkamer netjes zijn?",
            answer: (
              <p>
                Nee. Ook sterk gedateerde keukens en badkamers zijn geen reden
                om een woning niet aan te melden.
              </p>
            ),
          },
        ],
      },

      relatedContent: {
        title: "Bekijk ook",
        items: [
          {
            icon: "region",
            title: "Woning verkopen in Voorburg",
            description: "Bekijk de mogelijkheden voor woningen in Voorburg.",
            href: "/regio/voorburg",
          },
          {
            icon: "service",
            title: "Kluswoning verkopen",
            description: "Specifiek voor woningen waar renovatie nodig is.",
            href: "/kluswoning-verkopen",
          },
          {
            icon: "article",
            title: "Woning met slecht energielabel",
            description:
              "Lees meer over de verkoop van een woning met verduurzamingswerk.",
            href: "/kennisbank/woning-verkopen-met-slecht-energielabel",
          },
        ],
      },
    },
  },

  {
    slug: "rijswijk",

    seo: {
      title: "Huis verkopen in Rijswijk",
      description:
        "Uw woning verkopen in Rijswijk? HaagVast bekijkt woningen rechtstreeks, ook wanneer renovatie, onderhoud of modernisering nodig is.",
    },

    data: {
      name: "Rijswijk",

      hero: {
        eyebrow: "Woning verkopen in Rijswijk",
        title: "Uw woning in Rijswijk rechtstreeks laten beoordelen",
        description:
          "HaagVast kijkt naar appartementen, gezinswoningen en woningen die eerst gemoderniseerd moeten worden.",
        benefits: [
          {
            label: "Vrijblijvend aanmelden",
          },
          {
            label: "Ook met achterstallig onderhoud",
          },
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Haaglanden als focusgebied",
          },
        ],
        leadFormTitle: "Woning in Rijswijk aanmelden",
        leadFormDescription:
          "Start met postcode en huisnummer. Daarna nemen we contact op om de woning kort te bespreken.",
        leadSource: "regio-rijswijk",
      },

      benefits: {
        title: "Duidelijkheid zonder eerst alles verkoopklaar te maken",
        items: [
          {
            icon: "hammer",
            title: "Ook met renovatiewerk",
            description:
              "U hoeft niet automatisch eerst keuken, badkamer of afwerking te vervangen.",
          },
          {
            icon: "message",
            title: "Direct communiceren",
            description:
              "De situatie wordt rechtstreeks besproken met HaagVast.",
          },
          {
            icon: "house",
            title: "Verschillende woningtypen",
            description:
              "Zowel appartementen als grondgebonden woningen kunnen worden bekeken.",
          },
          {
            icon: "check",
            title: "Vrijblijvend starten",
            description: "Een eerste aanvraag verplicht u niet tot verkoop.",
          },
        ],
      },

      neighborhoods: {
        title: "Woningen in Rijswijk",
        items: [
          "Oud Rijswijk",
          "Leeuwendaal",
          "Cromvliet",
          "Steenvoorde",
          "Havenkwartier",
          "RijswijkBuiten",
        ],
      },

      process: {
        title: "Een eenvoudig proces",
        steps: [
          {
            icon: "house",
            title: "Woning aanmelden",
            description: "Geef het adres en uw gegevens door.",
          },
          {
            icon: "message",
            title: "Kennismaken",
            description: "We bespreken uw woning en wensen.",
          },
          {
            icon: "clipboard",
            title: "Beoordeling",
            description: "Ligging, staat en mogelijkheden worden bekeken.",
          },
          {
            icon: "check",
            title: "Bespreken",
            description:
              "U krijgt duidelijkheid over mogelijke vervolgstappen.",
          },
        ],
      },

      propertyTypes: {
        title: "Welke woningen kunnen interessant zijn?",
        items: [
          {
            icon: "apartment",
            title: "Appartementen",
            description:
              "Ook appartementen binnen oudere complexen of met moderniseringswerk.",
          },
          {
            icon: "home",
            title: "Rijtjeswoningen",
            description: "Gezinswoningen in uiteenlopende onderhoudsstaten.",
          },
          {
            icon: "hammer",
            title: "Kluswoningen",
            description:
              "Woningen waarbij renovatie duidelijk onderdeel van de waarde is.",
          },
          {
            icon: "wrench",
            title: "Onderhoudswoningen",
            description:
              "Technisch of cosmetisch onderhoud hoeft geen uitsluiting te betekenen.",
          },
        ],
      },

      faq: {
        title: "Veelgestelde vragen over Rijswijk",
        items: [
          {
            question:
              "Kan ik mijn woning in Rijswijk aanmelden zonder eerst te verbouwen?",
            answer: (
              <p>
                Ja. De woning kan in de huidige staat worden aangemeld zodat
                eerst kan worden bekeken wat de mogelijkheden zijn.
              </p>
            ),
          },
          {
            question: "Bekijkt HaagVast ook appartementen?",
            answer: (
              <p>
                Ja. Zowel appartementen als grondgebonden woningen kunnen
                interessant zijn.
              </p>
            ),
          },
          {
            question: "Is een eerste beoordeling gratis en vrijblijvend?",
            answer: (
              <p>
                Een aanvraag via de website is vrijblijvend. Eventuele
                vervolgstappen worden daarna eerst met u besproken.
              </p>
            ),
          },
        ],
      },

      relatedContent: {
        title: "Meer informatie",
        items: [
          {
            icon: "region",
            title: "Woning verkopen in Den Haag",
            description:
              "Bekijk onze pagina voor de aangrenzende Haagse markt.",
            href: "/regio/den-haag",
          },
          {
            icon: "service",
            title: "Huis verkopen zonder makelaar",
            description:
              "Meer over rechtstreeks verkopen zonder klassiek verkooptraject.",
            href: "/huis-verkopen-zonder-makelaar",
          },
          {
            icon: "service",
            title: "Kluswoning verkopen",
            description: "Voor woningen met renovatie- of moderniseringswerk.",
            href: "/kluswoning-verkopen",
          },
        ],
      },
    },
  },

  {
    slug: "wassenaar",

    seo: {
      title: "Woning verkopen in Wassenaar",
      description:
        "Uw woning verkopen in Wassenaar? HaagVast bekijkt verschillende woningtypen en situaties in Wassenaar en regio Haaglanden.",
    },

    data: {
      name: "Wassenaar",

      hero: {
        eyebrow: "Woning verkopen in Wassenaar",
        title: "Uw woning in Wassenaar vrijblijvend laten bekijken",
        description:
          "HaagVast kijkt naar woningen in Wassenaar en de bredere regio Haaglanden, ook wanneer modernisering of onderhoud nodig is.",
        benefits: [
          {
            label: "Persoonlijk contact",
          },
          {
            label: "Vrijblijvend aanmelden",
          },
          {
            label: "Verschillende woningtypen",
          },
          {
            label: "Ook renovatiemogelijkheden",
          },
        ],
        leadFormTitle: "Woning in Wassenaar aanmelden",
        leadFormDescription:
          "Geef het adres door zodat we kunnen bekijken of uw woning aansluit bij HaagVast.",
        leadSource: "regio-wassenaar",
      },

      benefits: {
        title: "Iedere woning vraagt om een eigen beoordeling",
        items: [
          {
            icon: "house",
            title: "Woning specifiek bekijken",
            description:
              "Ligging, perceel, woningtype en staat worden als geheel beoordeeld.",
          },
          {
            icon: "hammer",
            title: "Modernisering mogelijk",
            description:
              "Ook wanneer een woning technisch of cosmetisch gedateerd is.",
          },
          {
            icon: "message",
            title: "Persoonlijk bespreken",
            description: "U kunt uw situatie rechtstreeks toelichten.",
          },
          {
            icon: "key",
            title: "Planning afstemmen",
            description:
              "We bespreken wat praktisch haalbaar is voor beide partijen.",
          },
        ],
      },

      neighborhoods: {
        title: "Gebieden in Wassenaar",
        items: [
          "Wassenaar-Centrum",
          "Nieuw-Wassenaar",
          "De Kieviet",
          "Kerkehout",
          "Rijksdorp",
        ],
      },

      process: {
        title: "Hoe werkt aanmelden?",
        steps: [
          {
            icon: "house",
            title: "Adres invullen",
            description: "Start met postcode en huisnummer.",
          },
          {
            icon: "message",
            title: "Contact",
            description: "We nemen contact op om de situatie te bespreken.",
          },
          {
            icon: "clipboard",
            title: "Beoordelen",
            description: "We bekijken de woning en relevante informatie.",
          },
          {
            icon: "check",
            title: "Vervolg bepalen",
            description: "Daarna weet u of verdere gesprekken zinvol zijn.",
          },
        ],
      },

      propertyTypes: {
        title: "Verschillende soorten woningen",
        items: [
          {
            icon: "home",
            title: "Eengezinswoningen",
            description:
              "Woningen in verschillende prijsklassen en onderhoudsstaten.",
          },
          {
            icon: "building",
            title: "Ruimere woningen",
            description:
              "Ook grotere woningen kunnen per situatie worden beoordeeld.",
          },
          {
            icon: "apartment",
            title: "Appartementen",
            description: "Appartementen en andere woningen binnen een VvE.",
          },
          {
            icon: "hammer",
            title: "Renovatiewoningen",
            description:
              "Woningen waar modernisering onderdeel is van het potentieel.",
          },
        ],
      },

      faq: {
        title: "Veelgestelde vragen over Wassenaar",
        items: [
          {
            question: "Welke woningen bekijkt HaagVast in Wassenaar?",
            answer: (
              <p>
                We kijken per situatie naar verschillende woningtypen. De
                ligging, huidige staat en mogelijkheden van de woning spelen
                daarbij een belangrijke rol.
              </p>
            ),
          },
          {
            question: "Kan een woning met veel renovatiewerk worden aangemeld?",
            answer: (
              <p>
                Ja. Renovatie- en moderniseringswerk hoeft geen reden te zijn om
                een woning niet aan te melden.
              </p>
            ),
          },
          {
            question: "Zit ik na het formulier ergens aan vast?",
            answer: (
              <p>
                Nee. Het formulier is bedoeld om eerst vrijblijvend te kunnen
                beoordelen of de woning interessant kan zijn.
              </p>
            ),
          },
        ],
      },

      relatedContent: {
        title: "Meer over HaagVast",
        items: [
          {
            icon: "region",
            title: "Woning verkopen in Den Haag",
            description: "Bekijk onze lokale pagina voor Den Haag.",
            href: "/regio/den-haag",
          },
          {
            icon: "service",
            title: "Kluswoning verkopen",
            description: "Lees meer over woningen waar renovatie nodig is.",
            href: "/kluswoning-verkopen",
          },
          {
            icon: "article",
            title: "Kennisbank",
            description:
              "Praktische uitleg over woningverkoop en verschillende situaties.",
            href: "/kennisbank",
          },
        ],
      },
    },
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((region) => region.slug === slug);
}
