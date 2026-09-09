export type KnowledgeBaseArticleSeo = {
  slug: string;
  title: string;
  description: string;
  authorName: string;
  publishedAt: string | null;
  modifiedAt: string | null;
  keywords: string[];
};

export const knowledgeBaseArticleSeo: KnowledgeBaseArticleSeo[] = [
  {
    slug: "woning-verkopen-met-slecht-energielabel",

    title:
      "Woning verkopen met slecht energielabel",

    description:
      "Wat betekent een slecht energielabel voor de verkoop van uw woning? Bekijk wanneer verduurzamen zinvol is en wanneer verkopen in de huidige staat interessant kan zijn.",

    authorName:
      "HaagVast",

    publishedAt:
      null,

    modifiedAt:
      null,

    keywords: [
      "woning verkopen slecht energielabel",
      "huis verkopen energielabel",
      "woning verduurzamen voor verkoop",
      "woning verkopen Haaglanden",
    ],
  },

  {
    slug: "kluswoning-verkopen-of-verbouwen",

    title:
      "Kluswoning verkopen of eerst verbouwen?",

    description:
      "Een kluswoning eerst verbouwen of direct verkopen? Vergelijk investering, risico, verkoopprijs en gemak voordat u kiest welke route het beste past.",

    authorName:
      "HaagVast",

    publishedAt:
      null,

    modifiedAt:
      null,

    keywords: [
      "kluswoning verkopen",
      "kluswoning verbouwen",
      "huis verbouwen voor verkoop",
      "woning verkopen met achterstallig onderhoud",
    ],
  },

  {
    slug: "huis-verkopen-zonder-makelaar",

    title:
      "Huis verkopen zonder makelaar",

    description:
      "Uw huis verkopen zonder makelaar? Lees hoe rechtstreekse woningverkoop werkt, welke stappen nodig blijven en welke voor- en nadelen u kunt afwegen.",

    authorName:
      "HaagVast",

    publishedAt:
      null,

    modifiedAt:
      null,

    keywords: [
      "huis verkopen zonder makelaar",
      "woning verkopen zonder makelaar",
      "rechtstreeks huis verkopen",
      "woning verkopen Haaglanden",
    ],
  },
];

export function getKnowledgeBaseArticleSeoBySlug(
  slug: string,
): KnowledgeBaseArticleSeo | undefined {
  return knowledgeBaseArticleSeo.find(
    (article) =>
      article.slug === slug,
  );
}
