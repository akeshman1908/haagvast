export type KnowledgeCategory =
  | "woning-verkopen"
  | "renovatie"
  | "juridisch";

export type KnowledgeSource = {
  label: string;
  href: string;
};

export type KnowledgeSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type KnowledgeArticle = {
  slug: string;
  category: KnowledgeCategory;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  readingTime: string;
  featured?: boolean;
  keyPoints: string[];
  sections: KnowledgeSection[];
  sources?: KnowledgeSource[];
  relatedService?: {
    label: string;
    href: string;
  };
};

export const knowledgeCategoryLabels: Record<
  KnowledgeCategory,
  string
> = {
  "woning-verkopen": "Woning verkopen",
  renovatie: "Renovatie & woningstaat",
  juridisch: "Juridisch & praktisch",
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "woning-verkopen-met-slecht-energielabel",
    category: "woning-verkopen",
    title:
      "Woning verkopen met een slecht energielabel",
    shortTitle:
      "Verkopen met een slecht energielabel",
    description:
      "Wat betekent een laag energielabel voor de verkoop van uw woning en is eerst verduurzamen altijd verstandig?",
    intro:
      "Een laag energielabel betekent niet automatisch dat u eerst grote investeringen moet doen voordat u uw woning kunt verkopen. Wel is het verstandig om te begrijpen welke invloed de staat en energiezuinigheid van de woning kunnen hebben op de verkoop.",
    readingTime: "5 min",
    featured: true,

    keyPoints: [
      "Een laag energielabel maakt een woning niet automatisch onverkoopbaar.",
      "De woning kan ook in de huidige staat worden beoordeeld.",
      "Verduurzamen vóór verkoop is niet altijd financieel de beste keuze.",
      "Vergelijk investeringskosten altijd met de realistische mogelijke meerwaarde.",
    ],

    sections: [
      {
        title:
          "Kun je een woning met een slecht energielabel verkopen?",
        paragraphs: [
          "Ja. Een laag energielabel hoeft verkoop niet in de weg te staan. Kopers kijken naast energiezuinigheid ook naar de ligging, oppervlakte, indeling, onderhoudsstaat, woningtype en mogelijkheden van de woning.",
          "Een koper kan uiteraard rekening houden met toekomstige verduurzamingskosten. Dat betekent echter niet automatisch dat u als verkoper alle verbeteringen vooraf zelf moet uitvoeren.",
        ],
      },

      {
        title:
          "Moet u eerst verduurzamen?",
        paragraphs: [
          "Dat hangt sterk af van de woning, de werkzaamheden en uw persoonlijke situatie. Kleine maatregelen kunnen soms relatief eenvoudig zijn, terwijl grotere verduurzaming zoals isolatie, kozijnen of installaties een aanzienlijke investering vraagt.",
          "Kijk daarom niet alleen naar de mogelijke hogere verkoopprijs, maar ook naar de kosten, uitvoeringstijd en het risico dat u de volledige investering niet terugverdient.",
        ],
        bullets: [
          "Wat kosten de werkzaamheden volledig?",
          "Hoeveel tijd kost de uitvoering?",
          "Welke onverwachte kosten kunnen ontstaan?",
          "Wat is de woning nu waard?",
          "Hoeveel extra verkoopwaarde is realistisch?",
        ],
      },

      {
        title:
          "Verkopen in de huidige staat",
        paragraphs: [
          "Wanneer u geen grote investering meer wilt doen, kan verkoop in de huidige staat een alternatief zijn.",
          "Dat kan bijvoorbeeld interessant zijn wanneer de woning leegstaat, u al een andere woning heeft gekocht of wanneer u geen renovatie- of verduurzamingsproject wilt organiseren.",
          "HaagVast kijkt daarom ook naar woningen die nog gemoderniseerd of verduurzaamd moeten worden.",
        ],
      },

      {
        title:
          "Wat is meestal de belangrijkste afweging?",
        paragraphs: [
          "De belangrijkste vraag is niet alleen hoeveel de woning ná verduurzaming waard zou kunnen zijn, maar hoeveel u netto overhoudt nadat alle werkzaamheden, tijd en risico zijn meegerekend.",
          "Het kan daarom verstandig zijn om eerst te onderzoeken wat verkoop in de huidige staat betekent voordat u grote investeringen uitvoert.",
        ],
      },
    ],

    relatedService: {
      label: "Mijn woning vrijblijvend aanmelden",
      href: "/contact",
    },
  },

  {
    slug: "kluswoning-verkopen-of-verbouwen",
    category: "renovatie",
    title:
      "Kluswoning verkopen of eerst verbouwen?",
    shortTitle:
      "Kluswoning verkopen of verbouwen?",
    description:
      "Is het verstandiger om een kluswoning direct te verkopen of eerst te renoveren? Vergelijk kosten, tijd, mogelijke meerwaarde en risico.",
    intro:
      "Een verouderde woning eerst volledig verbouwen klinkt aantrekkelijk, maar iedere euro die u investeert levert niet automatisch dezelfde euro terug in verkoopwaarde.",
    readingTime: "6 min",

    keyPoints: [
      "Niet iedere verbouwing verdient zichzelf volledig terug.",
      "Renoveren kost naast geld ook tijd en organisatie.",
      "Onvoorziene werkzaamheden kunnen de uiteindelijke kosten verhogen.",
      "Een woning kan ook aantrekkelijk zijn voor een koper die zelf wil verbouwen.",
    ],

    sections: [
      {
        title:
          "Wanneer kan verbouwen interessant zijn?",
        paragraphs: [
          "Verbouwen kan interessant zijn wanneer relatief beperkte werkzaamheden een groot verschil maken in uitstraling, onderhoud of gebruiksgemak.",
          "Bij eenvoudige verbeteringen kan de verhouding tussen investering en mogelijke verkoopwaarde gunstig zijn. Bij een volledige renovatie wordt die afweging veel belangrijker.",
        ],
      },

      {
        title:
          "Kijk naar de netto-opbrengst",
        paragraphs: [
          "Vergelijk niet alleen de huidige woningwaarde met de mogelijke verkoopprijs na verbouwing.",
          "Van het verschil moeten alle kosten nog worden afgetrokken. Denk daarbij niet alleen aan materiaal en arbeid, maar ook aan extra vaste lasten en onverwachte werkzaamheden.",
        ],
        bullets: [
          "Materiaal",
          "Arbeidskosten",
          "Installatiewerk",
          "Onvoorziene gebreken",
          "Extra maanden vaste lasten",
          "Uw eigen tijd en organisatie",
        ],
      },

      {
        title:
          "Het risico van een grotere renovatie",
        paragraphs: [
          "Vooral bij oudere woningen kan tijdens een verbouwing meer werk zichtbaar worden dan vooraf verwacht.",
          "Een nieuwe badkamer of keuken kan bijvoorbeeld leiden tot extra leidingwerk, elektra of herstelwerkzaamheden. Daardoor kan een oorspronkelijk budget snel oplopen.",
        ],
      },

      {
        title:
          "Wanneer kan direct verkopen aantrekkelijker zijn?",
        paragraphs: [
          "Direct verkopen kan interessant zijn wanneer de woning veel werkzaamheden nodig heeft en u die werkzaamheden niet zelf wilt organiseren.",
          "Dat speelt bijvoorbeeld bij een leegstaande woning, een woning uit een nalatenschap, een verhuurde woning die vrijkomt of wanneer u al bent verhuisd.",
        ],
      },

      {
        title:
          "Een kluswoning hoeft niet verkoopklaar te zijn",
        paragraphs: [
          "Voor een rechtstreekse beoordeling hoeft een woning niet eerst volledig te worden gestyled of gerenoveerd.",
          "HaagVast kijkt daarom ook naar woningen met een oude keuken, verouderde badkamer, achterstallig onderhoud of een volledige moderniseringsbehoefte.",
        ],
      },
    ],

    relatedService: {
      label: "Bekijk kluswoning verkopen",
      href: "/kluswoning-verkopen",
    },
  },

  {
    slug: "huis-verkopen-zonder-makelaar",
    category: "juridisch",
    title:
      "Huis verkopen zonder makelaar: hoe werkt dat?",
    shortTitle:
      "Huis verkopen zonder makelaar",
    description:
      "Een woning verkopen zonder verkoopmakelaar kan. Lees welke onderdelen u zelf regelt en waar u rekening mee moet houden.",
    intro:
      "Een verkoopmakelaar inschakelen is niet verplicht. U kunt zelf een koper zoeken of rechtstreeks met een geïnteresseerde partij tot afspraken komen. Dat betekent wel dat u zelf meer verantwoordelijkheid draagt voor het verkoopproces.",
    readingTime: "6 min",

    keyPoints: [
      "Een verkoopmakelaar is niet verplicht.",
      "Afspraken over prijs en voorwaarden moeten zorgvuldig worden vastgelegd.",
      "Als verkoper moet u relevante informatie over de woning delen.",
      "De uiteindelijke juridische eigendomsoverdracht verloopt via de notaris.",
    ],

    sections: [
      {
        title:
          "Is een makelaar verplicht bij verkoop?",
        paragraphs: [
          "Nee. U kunt een woning zelf verkopen of rechtstreeks met een koper onderhandelen.",
          "Een verkoopmakelaar kan wel werkzaamheden uit handen nemen, zoals waardebepaling, presentatie, bezichtigingen, onderhandelingen en begeleiding van het verkoopproces.",
        ],
      },

      {
        title:
          "Wat regelt u zelf zonder makelaar?",
        paragraphs: [
          "Wanneer u zonder verkoopmakelaar verkoopt, neemt u zelf verschillende onderdelen van het traject voor uw rekening.",
        ],
        bullets: [
          "Een gewenste verkoopprijs bepalen",
          "Informatie over de woning verzamelen",
          "Contact met potentiële kopers",
          "Onderhandelen over prijs en voorwaarden",
          "Afspraken laten vastleggen",
          "Afstemming rondom de overdracht",
        ],
      },

      {
        title:
          "Maak duidelijke afspraken",
        paragraphs: [
          "De koopsom is slechts één onderdeel van een woningverkoop. Ook zaken zoals de overdrachtsdatum, eventuele voorwaarden en wat bij de woning achterblijft moeten duidelijk worden afgesproken.",
          "Bij twijfel over juridische afspraken is professioneel advies verstandig.",
        ],
      },

      {
        title:
          "De rol van de notaris",
        paragraphs: [
          "Ook wanneer geen verkoopmakelaar betrokken is, wordt de daadwerkelijke eigendomsoverdracht van een woning juridisch via de notaris geregeld.",
          "De notaris verzorgt onder andere de leveringsakte en de verdere formele overdracht van het eigendom.",
        ],
      },

      {
        title:
          "Rechtstreeks verkopen",
        paragraphs: [
          "Wanneer u rechtstreeks met een koper tot overeenstemming kunt komen, hoeft u niet automatisch eerst een volledig marketingtraject met styling, fotografie en meerdere bezichtigingsrondes te starten.",
          "HaagVast biedt daarom de mogelijkheid om uw woning eerst vrijblijvend rechtstreeks voor te leggen.",
        ],
      },
    ],

    relatedService: {
      label:
        "Bekijk huis verkopen zonder makelaar",
      href: "/huis-verkopen-zonder-makelaar",
    },
  },
];

export const knowledgeArticlesBySlug =
  Object.fromEntries(
    knowledgeArticles.map((article) => [
      article.slug,
      article,
    ]),
  ) as Record<string, KnowledgeArticle>;

export function getKnowledgeArticleBySlug(
  slug: string,
): KnowledgeArticle | undefined {
  return knowledgeArticlesBySlug[slug];
}

export function getRelatedKnowledgeArticles(
  currentSlug: string,
): KnowledgeArticle[] {
  return knowledgeArticles
    .filter(
      (article) =>
        article.slug !== currentSlug,
    )
    .slice(0, 2);
}
