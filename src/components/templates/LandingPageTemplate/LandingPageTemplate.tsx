import type { ComponentProps } from "react";

import QuickLeadForm from "@/components/forms/QuickLeadForm/QuickLeadForm";
import Benefits from "@/components/sections/Benefits/Benefits";
import ContentSection from "@/components/sections/ContentSection/ContentSection";
import Faq from "@/components/sections/Faq/Faq";
import FinalCta from "@/components/sections/FinalCta/FinalCta";
import Hero from "@/components/sections/Hero/Hero";
import Process from "@/components/sections/Process/Process";
import PropertyTypes from "@/components/sections/PropertyTypes/PropertyTypes";
import RelatedContent from "@/components/sections/RelatedContent/RelatedContent";
import TrustBar from "@/components/sections/TrustBar/TrustBar";

type HeroProps = ComponentProps<typeof Hero>;

type LandingHero = Omit<HeroProps, "children"> & {
  leadFormTitle?: string;
  leadFormDescription?: string;
  leadSource?: string;
};

export type LandingContentSection = ComponentProps<typeof ContentSection>;

export type LandingPageData = {
  hero: LandingHero;

  showLeadForm?: boolean;

  trustItems?: ComponentProps<typeof TrustBar>["items"];

  benefits?: ComponentProps<typeof Benefits>;

  process?: ComponentProps<typeof Process>;

  contentSections?: LandingContentSection[];

  propertyTypes?: ComponentProps<typeof PropertyTypes>;

  faq?: ComponentProps<typeof Faq>;

  relatedContent?: ComponentProps<typeof RelatedContent>;

  finalCta?: ComponentProps<typeof FinalCta>;
};

type LandingPageTemplateProps = {
  data: LandingPageData;
};

export default function LandingPageTemplate({
  data,
}: LandingPageTemplateProps) {
  const { leadFormTitle, leadFormDescription, leadSource, ...heroProps } =
    data.hero;

  return (
    <>
      <Hero {...heroProps}>
        {data.showLeadForm !== false && (
          <QuickLeadForm
            title={leadFormTitle ?? "Laat uw woning vrijblijvend bekijken"}
            description={
              leadFormDescription ??
              "Vul uw postcode en huisnummer in. Daarna nemen we contact met u op om de woning kort te bespreken."
            }
            source={leadSource ?? "landing-page"}
          />
        )}
      </Hero>

      {data.trustItems && <TrustBar items={data.trustItems} />}

      {data.benefits && <Benefits {...data.benefits} />}

      {data.process && <Process {...data.process} />}

      {data.contentSections?.map((section, index) => (
        <ContentSection key={`${section.title}-${index}`} {...section} />
      ))}

      {data.propertyTypes && <PropertyTypes {...data.propertyTypes} />}

      {data.faq && <Faq {...data.faq} />}

      {data.relatedContent && <RelatedContent {...data.relatedContent} />}

      <FinalCta {...data.finalCta} />
    </>
  );
}
