export type HaagVastRegion = {
  slug: string;
  name: string;
  municipality: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  intro: string;
  localText: string;
  propertyText: string;
  areas: string[];
  nearbySlugs: string[];
};

export const regions: HaagVastRegion[] = [
  {
    slug: "den-haag",
    name: "Den Haag",
    municipality: "Den Haag",
    seoTitle: "Woning verkopen in Den Haag | HaagVast",
    seoDescription:
      "Uw woning verkopen in Den Haag? HaagVast bekijkt woningen rechtstreeks van eigenaren, ook wanneer onderhoud of modernisering nodig is.",
    eyebrow: "WONING VERKOPEN IN DEN HAAG",
    intro:
      "Wilt u uw woning in Den Haag verkopen zonder eerst een volledig verkooptraject op te starten? HaagVast bekijkt woningen rechtstreeks van eigenaren en bespreekt vrijblijvend welke mogelijkheden bij uw woning en situatie passen.",
    localText:
      "Den Haag kent een zeer gevarieerd woningaanbod. Van appartementen en portiekwoningen tot bovenwoningen, herenhuizen en eengezinswoningen. Daardoor kan ook de verkoopsituatie per buurt sterk verschillen.",
    propertyText:
      "Ook woningen die gedateerd zijn, onderhoud nodig hebben, leegstaan of eerst gemoderniseerd zouden moeten worden voor de reguliere woningmarkt kunnen bij HaagVast worden aangemeld.",
    areas: [
      "Centrum",
      "Bezuidenhout",
      "Benoordenhout",
      "Scheveningen",
      "Segbroek",
      "Loosduinen",
      "Escamp",
      "Laak",
      "Haagse Hout",
      "Ypenburg",
    ],
    nearbySlugs: [
      "voorburg",
      "rijswijk",
      "wassenaar",
      "westland",
    ],
  },

  {
    slug: "delft",
    name: "Delft",
    municipality: "Delft",
    seoTitle: "Woning verkopen in Delft | HaagVast",
    seoDescription:
      "Woning verkopen in Delft? HaagVast bekijkt appartementen, eengezinswoningen en andere woningen rechtstreeks van eigenaren.",
    eyebrow: "WONING VERKOPEN IN DELFT",
    intro:
      "Overweegt u uw woning in Delft te verkopen? HaagVast beoordeelt woningen rechtstreeks van eigenaren. U kunt eerst vrijblijvend uw situatie voorleggen zonder dat u de woning vooraf volledig verkoopklaar hoeft te maken.",
    localText:
      "Delft heeft een gevarieerd woningaanbod met historische woningen rond de binnenstad, appartementencomplexen en verschillende woonwijken met eengezinswoningen.",
    propertyText:
      "Een gedateerde keuken, verouderde badkamer, achterstallig onderhoud of een woning die leegkomt hoeft geen reden te zijn om eerst uitgebreid te verbouwen.",
    areas: [
      "Binnenstad",
      "Hof van Delft",
      "Vrijenban",
      "Voorhof",
      "Buitenhof",
      "Tanthof",
      "Wippolder",
      "Delftse Hout",
    ],
    nearbySlugs: [
      "rijswijk",
      "pijnacker-nootdorp",
      "midden-delfland",
      "westland",
    ],
  },

  {
    slug: "voorburg",
    name: "Voorburg",
    municipality: "Leidschendam-Voorburg",
    seoTitle: "Woning verkopen in Voorburg | HaagVast",
    seoDescription:
      "Uw woning verkopen in Voorburg? HaagVast bekijkt appartementen, maisonnettes en eengezinswoningen rechtstreeks van eigenaren.",
    eyebrow: "WONING VERKOPEN IN VOORBURG",
    intro:
      "Wilt u een woning in Voorburg verkopen? HaagVast is actief in Voorburg en bekijkt verschillende soorten woningen rechtstreeks van eigenaren, ook wanneer modernisering of onderhoud gewenst is.",
    localText:
      "Voorburg heeft een brede mix van appartementen, maisonnettes, karakteristieke woningen en eengezinswoningen. De ligging direct tegen Den Haag maakt Voorburg een belangrijk onderdeel van het werkgebied van HaagVast.",
    propertyText:
      "U hoeft niet eerst te schilderen, een keuken te vervangen of de woning volledig verkoopklaar te maken voordat u de mogelijkheden met HaagVast bespreekt.",
    areas: [
      "Oud Voorburg",
      "Voorburg-Noord",
      "Voorburg-West",
      "Bovenveen",
      "Essesteijn",
      "Damsigt",
      "Park Leeuwenbergh",
    ],
    nearbySlugs: [
      "den-haag",
      "leidschendam",
      "rijswijk",
      "voorschoten",
    ],
  },

  {
    slug: "leidschendam",
    name: "Leidschendam",
    municipality: "Leidschendam-Voorburg",
    seoTitle: "Woning verkopen in Leidschendam | HaagVast",
    seoDescription:
      "Woning verkopen in Leidschendam? HaagVast bekijkt uw woning en verkoopsituatie vrijblijvend.",
    eyebrow: "WONING VERKOPEN IN LEIDSCHENDAM",
    intro:
      "Een woning verkopen in Leidschendam kan om verschillende redenen spelen. HaagVast bekijkt uw situatie persoonlijk en duidelijk, zonder dat u direct aan een verkooptraject vastzit.",
    localText:
      "Van appartementen tot ruime eengezinswoningen: Leidschendam kent verschillende woningtypen, bouwperioden en woonomgevingen.",
    propertyText:
      "Ook woningen die gedateerd zijn, verhuurd zijn geweest, uit een nalatenschap komen, leegstaan of onderhoud nodig hebben kunnen worden aangemeld.",
    areas: [
      "Leidschendam-Centrum",
      "Prinsenhof",
      "De Heuvel",
      "Raadhuiskwartier",
      "De Zijde",
      "Park Veursehout",
      "Stompwijk",
    ],
    nearbySlugs: [
      "voorburg",
      "voorschoten",
      "wassenaar",
      "zoetermeer",
    ],
  },

  {
    slug: "rijswijk",
    name: "Rijswijk",
    municipality: "Rijswijk",
    seoTitle: "Woning verkopen in Rijswijk | HaagVast",
    seoDescription:
      "Uw huis of appartement verkopen in Rijswijk? HaagVast bespreekt vrijblijvend uw woning en verkoopsituatie.",
    eyebrow: "WONING VERKOPEN IN RIJSWIJK",
    intro:
      "Wilt u uw woning in Rijswijk verkopen en eerst weten welke mogelijkheden er zijn? Bij HaagVast begint het traject met een vrijblijvende beoordeling van uw woning en situatie.",
    localText:
      "Rijswijk combineert karakteristieke oudere woonwijken, appartementencomplexen en moderne nieuwbouwgebieden. Hierdoor komen uiteenlopende soorten woningen voor beoordeling in aanmerking.",
    propertyText:
      "De woning hoeft niet in perfecte staat te zijn. Ook wanneer verbouwing, modernisering of achterstallig onderhoud een rol speelt kunt u de woning aanmelden.",
    areas: [
      "Oud-Rijswijk",
      "Leeuwendaal",
      "Steenvoorde",
      "Te Werve",
      "Huis te Lande",
      "RijswijkBuiten",
      "Cromvliet",
    ],
    nearbySlugs: [
      "den-haag",
      "voorburg",
      "delft",
      "westland",
    ],
  },

  {
    slug: "wassenaar",
    name: "Wassenaar",
    municipality: "Wassenaar",
    seoTitle: "Woning verkopen in Wassenaar | HaagVast",
    seoDescription:
      "Woning verkopen in Wassenaar? HaagVast beoordeelt uiteenlopende woningen en verkoopsituaties vrijblijvend.",
    eyebrow: "WONING VERKOPEN IN WASSENAAR",
    intro:
      "Overweegt u een woning in Wassenaar te verkopen? HaagVast beoordeelt zowel de woning als de omstandigheden rondom de verkoop en bespreekt helder welke mogelijkheden er zijn.",
    localText:
      "Het woningaanbod in Wassenaar varieert sterk in omvang, bouwjaar en staat van onderhoud. Daarom wordt iedere woning en verkoopsituatie afzonderlijk bekeken.",
    propertyText:
      "Ook bij renovatiebehoefte, leegstand, nalatenschap of een andere bijzondere verkoopsituatie kan een rechtstreekse beoordeling interessant zijn.",
    areas: [
      "Wassenaar-Centrum",
      "De Kieviet",
      "Kerkehout",
      "Rijksdorp",
      "Nieuw-Wassenaar",
      "Oostdorp",
    ],
    nearbySlugs: [
      "den-haag",
      "voorschoten",
      "leidschendam",
      "voorburg",
    ],
  },

  {
    slug: "zoetermeer",
    name: "Zoetermeer",
    municipality: "Zoetermeer",
    seoTitle: "Woning verkopen in Zoetermeer | HaagVast",
    seoDescription:
      "Woning verkopen in Zoetermeer? Meld uw woning vrijblijvend aan en ontdek welke mogelijkheden HaagVast ziet.",
    eyebrow: "WONING VERKOPEN IN ZOETERMEER",
    intro:
      "Wilt u uw woning in Zoetermeer verkopen? HaagVast bekijkt appartementen en eengezinswoningen rechtstreeks van eigenaren en geeft duidelijkheid over mogelijke vervolgstappen.",
    localText:
      "Zoetermeer heeft woonwijken uit verschillende bouwperioden. Daardoor varieert het aanbod van compacte appartementen tot ruime gezinswoningen.",
    propertyText:
      "Een woning hoeft niet volledig gerenoveerd of verkoopklaar te zijn. HaagVast beoordeelt de woning juist in de huidige staat.",
    areas: [
      "Dorp",
      "Meerzicht",
      "Buytenwegh",
      "De Leyens",
      "Seghwaert",
      "Rokkeveen",
      "Oosterheem",
      "Palenstein",
    ],
    nearbySlugs: [
      "pijnacker-nootdorp",
      "leidschendam",
      "den-haag",
      "delft",
    ],
  },

  {
    slug: "pijnacker-nootdorp",
    name: "Pijnacker-Nootdorp",
    municipality: "Pijnacker-Nootdorp",
    seoTitle: "Woning verkopen in Pijnacker-Nootdorp | HaagVast",
    seoDescription:
      "Woning verkopen in Pijnacker, Nootdorp of Delfgauw? HaagVast bekijkt woningen in de gemeente Pijnacker-Nootdorp.",
    eyebrow: "WONING VERKOPEN IN PIJNACKER-NOOTDORP",
    intro:
      "Wilt u een woning in Pijnacker, Nootdorp of Delfgauw verkopen? HaagVast bespreekt vrijblijvend de woning, de staat ervan en uw persoonlijke verkoopsituatie.",
    localText:
      "Pijnacker-Nootdorp ligt centraal tussen Den Haag, Delft, Rotterdam en Zoetermeer en bestaat uit zowel bestaande woonwijken als relatief jonge woningbouwgebieden.",
    propertyText:
      "Van appartementen tot eengezinswoningen: ook woningen waar onderhoud of modernisering nodig is kunnen rechtstreeks worden aangemeld.",
    areas: [
      "Pijnacker",
      "Pijnacker-Centrum",
      "Keijzershof",
      "Tolhek",
      "Nootdorp",
      "Delfgauw",
    ],
    nearbySlugs: [
      "delft",
      "zoetermeer",
      "den-haag",
      "midden-delfland",
    ],
  },

  {
    slug: "midden-delfland",
    name: "Midden-Delfland",
    municipality: "Midden-Delfland",
    seoTitle: "Woning verkopen in Midden-Delfland | HaagVast",
    seoDescription:
      "Woning verkopen in Midden-Delfland? HaagVast bekijkt woningen in Den Hoorn, Schipluiden en Maasland.",
    eyebrow: "WONING VERKOPEN IN MIDDEN-DELFLAND",
    intro:
      "Wilt u een woning in Midden-Delfland verkopen? HaagVast bekijkt ook woningen in de kleinere plaatsen binnen Haaglanden en bespreekt vrijblijvend uw mogelijkheden.",
    localText:
      "Midden-Delfland heeft een ander karakter dan de grotere omliggende steden. Woningen in Den Hoorn, Schipluiden en Maasland worden daarom op hun eigen locatie en situatie beoordeeld.",
    propertyText:
      "Zowel reguliere gezinswoningen als woningen met renovatiebehoefte, leegstand of een bijzondere verkoopsituatie kunnen vrijblijvend worden voorgelegd.",
    areas: [
      "Den Hoorn",
      "Schipluiden",
      "Maasland",
    ],
    nearbySlugs: [
      "delft",
      "westland",
      "rijswijk",
      "pijnacker-nootdorp",
    ],
  },

  {
    slug: "westland",
    name: "Westland",
    municipality: "Westland",
    seoTitle: "Woning verkopen in Westland | HaagVast",
    seoDescription:
      "Uw woning verkopen in Westland? HaagVast bekijkt woningen in onder andere Naaldwijk, Wateringen, Monster en 's-Gravenzande.",
    eyebrow: "WONING VERKOPEN IN WESTLAND",
    intro:
      "HaagVast is actief in het Westland. Eigenaren kunnen hun woning vrijblijvend aanmelden om te bespreken welke verkoopmogelijkheden bij de woning en hun persoonlijke situatie passen.",
    localText:
      "Westland bestaat uit verschillende kernen met ieder een eigen woningmarkt. Daarom kijken we niet alleen naar het type woning, maar ook naar de ligging en lokale situatie.",
    propertyText:
      "Een woning met achterstallig onderhoud, een gedateerde inrichting, leegstand of een andere bijzondere situatie kan gewoon worden aangemeld.",
    areas: [
      "Naaldwijk",
      "Wateringen",
      "Monster",
      "'s-Gravenzande",
      "De Lier",
      "Poeldijk",
      "Honselersdijk",
      "Kwintsheul",
      "Maasdijk",
      "Ter Heijde",
      "Heenweg",
    ],
    nearbySlugs: [
      "den-haag",
      "rijswijk",
      "delft",
      "midden-delfland",
    ],
  },

  {
    slug: "voorschoten",
    name: "Voorschoten",
    municipality: "Voorschoten",
    seoTitle: "Woning verkopen in Voorschoten | HaagVast",
    seoDescription:
      "Woning verkopen in Voorschoten? HaagVast bekijkt woningen in Voorschoten als onderdeel van het directe werkgebied rondom Haaglanden.",
    eyebrow: "WONING VERKOPEN IN VOORSCHOTEN",
    intro:
      "Ook in Voorschoten kunt u uw woning bij HaagVast aanmelden. Voorschoten grenst direct aan het kerngebied van HaagVast en sluit aan op onze activiteiten in Voorburg, Leidschendam en Wassenaar.",
    localText:
      "Voorschoten heeft appartementen, karakteristieke woningen en ruime eengezinswoningen. Iedere woning en verkoopsituatie wordt afzonderlijk bekeken.",
    propertyText:
      "Ook wanneer de woning gemoderniseerd moet worden, leegstaat of vanwege persoonlijke omstandigheden op een andere manier verkocht moet worden, kunt u eerst vrijblijvend contact opnemen.",
    areas: [
      "Voorschoten-Centrum",
      "Noord-Hofland",
      "Vlietwijk",
      "Boschgeest",
      "Krimwijk",
      "Adegeest",
    ],
    nearbySlugs: [
      "wassenaar",
      "leidschendam",
      "voorburg",
      "den-haag",
    ],
  },
];

export const regionsBySlug = Object.fromEntries(
  regions.map((region) => [region.slug, region]),
) as Record<string, HaagVastRegion>;

export function getRegionBySlug(
  slug: string,
): HaagVastRegion | undefined {
  return regionsBySlug[slug];
}

export function getNearbyRegions(
  region: HaagVastRegion,
): HaagVastRegion[] {
  return region.nearbySlugs
    .map((slug) => regionsBySlug[slug])
    .filter(
      (nearbyRegion): nearbyRegion is HaagVastRegion =>
        Boolean(nearbyRegion),
    );
}
