import type { Metadata } from "next";

import QuickLeadForm from "@/components/forms/QuickLeadForm/QuickLeadForm";
import ContentSection from "@/components/sections/ContentSection/ContentSection";
import Hero from "@/components/sections/Hero/Hero";
import TrustBar from "@/components/sections/TrustBar/TrustBar";

import { siteConfig } from "@/config/site";

const canonicalUrl = `${siteConfig.url}/woning-aanmelden`;

export const metadata: Metadata = {
  title: "Woning aanmelden | HaagVast",
  description:
    "Meld uw woning vrijblijvend aan bij HaagVast. Vul uw adresgegevens in en bespreek rechtstreeks de mogelijkheden voor verkoop in Haaglanden.",
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WoningAanmeldenPage() {
  return (
    <>
      <Hero
        eyebrow="Woning aanmelden"
        title="Ontdek vrijblijvend wat er met uw woning mogelijk is"
        description="Begin met uw postcode en huisnummer. Daarna bekijken we de woning en bespreken we kort uw situatie, gewenste planning en mogelijke vervolgstappen."
        benefits={[
          {
            label: "Geheel vrijblijvend",
          },
          {
            label: "Geen verkoopverplichting",
          },
          {
            label: "Rechtstreeks contact",
          },
          {
            label: "Actief in Haaglanden",
          },
        ]}
        primaryCta={{
          label: "Meer over HaagVast",
          href: "/over-haagvast",
        }}
        secondaryCta={{
          label: "Bekijk onze werkwijze",
          href: "/werkwijze",
        }}
      >
        <QuickLeadForm
          title="Meld uw woning aan"
          description="Vul uw postcode en huisnummer in om te beginnen. Daarna nemen we contact met u op om de woning en uw situatie te bespreken."
          source="woning-aanmelden"
        />
      </Hero>

      <TrustBar
        items={[
          {
            label: "Vrijblijvend aanmelden",
            icon: "check",
          },
          {
            label: "Rechtstreeks contact",
            icon: "handshake",
          },
          {
            label: "Uw planning bespreken",
            icon: "clock",
          },
          {
            label: "Heel Haaglanden",
            icon: "house",
          },
        ]}
      />

      <ContentSection
        eyebrow="Wat gebeurt er daarna?"
        title="Uw woning aanmelden is alleen de eerste kennismaking"
        description="U zit na het invullen van het formulier nergens aan vast."
        content={
          <>
            <p>
              We gebruiken de woninggegevens om eerst globaal te bekijken om
              wat voor woning het gaat en waar deze ligt.
            </p>

            <p>
              Daarna bespreken we persoonlijk uw situatie, de staat van de
              woning en wat u belangrijk vindt bij een eventuele verkoop.
            </p>

            <p>
              Pas wanneer de woning aansluit en u zelf verder wilt, worden
              mogelijke vervolgstappen besproken.
            </p>
          </>
        }
        cta={{
          label: "Bekijk de volledige werkwijze",
          href: "/werkwijze",
        }}
      />
    </>
  );
}
