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
type BenefitsProps = ComponentProps<typeof Benefits>;
type ContentSectionProps = ComponentProps<typeof ContentSection>;
type FaqProps = ComponentProps<typeof Faq>;
type FinalCtaProps = ComponentProps<typeof FinalCta>;
type ProcessProps = ComponentProps<typeof Process>;
type PropertyTypesProps = ComponentProps<typeof PropertyTypes>;
type RelatedContentProps = ComponentProps<typeof RelatedContent>;
type TrustBarProps = ComponentProps<typeof TrustBar>;

type RegionHero = Omit<HeroProps, "children"> & {
  leadFormTitle?: string;
  leadFormDescription?: string;
  leadSource?: string;
};

export type RegionPageData = {
  name: string;

  hero: RegionHero;

  trustItems?: TrustBarProps["items"];

  intro?: ContentSectionProps;

  benefits?: BenefitsProps;

  neighborhoods?: {
    eyebrow?: string;
    title: string;
    description?: string;
    items: string[];
  };

  process?: ProcessProps;

  propertyTypes?: PropertyTypesProps;

  localContent?: ContentSectionProps[];

  faq?: FaqProps;

  relatedContent?: RelatedContentProps;

  finalCta?: FinalCtaProps;
};

type RegionPageTemplateProps = {
  data: RegionPageData;
};

export default function RegionPageTemplate({ data }: RegionPageTemplateProps) {
  const { leadFormTitle, leadFormDescription, leadSource, ...heroProps } =
    data.hero;

  return (
    <>
      <Hero
        {...heroProps}
        eyebrow={heroProps.eyebrow ?? `Woning verkopen in ${data.name}`}
      >
        <QuickLeadForm
          title={leadFormTitle ?? `Uw woning in ${data.name} aanmelden`}
          description={
            leadFormDescription ??
            "Vul uw postcode en huisnummer in. Daarna nemen we contact met u op om de woning en uw situatie kort te bespreken."
          }
          source={
            leadSource ??
            `regio-${data.name.toLowerCase().replace(/\s+/g, "-")}`
          }
        />
      </Hero>

      <TrustBar items={data.trustItems} />

      {data.intro && <ContentSection {...data.intro} />}

      {data.benefits && <Benefits {...data.benefits} />}

      {data.neighborhoods && (
        <ContentSection
          eyebrow={data.neighborhoods.eyebrow}
          title={data.neighborhoods.title}
          description={data.neighborhoods.description}
          muted
          content={
            <ul>
              {data.neighborhoods.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          }
        />
      )}

      {data.process && <Process {...data.process} />}

      {data.propertyTypes && <PropertyTypes {...data.propertyTypes} />}

      {data.localContent?.map((section, index) => (
        <ContentSection key={`${section.title}-${index}`} {...section} />
      ))}

      {data.faq && <Faq {...data.faq} />}

      {data.relatedContent && <RelatedContent {...data.relatedContent} />}

      <FinalCta
        {...data.finalCta}
        eyebrow={data.finalCta?.eyebrow ?? "Vrijblijvend kennismaken"}
        title={data.finalCta?.title ?? `Uw woning verkopen in ${data.name}?`}
        description={
          data.finalCta?.description ??
          `Meld uw woning in ${data.name} vrijblijvend aan. HaagVast bekijkt de situatie en neemt contact met u op om de mogelijkheden te bespreken.`
        }
      />
    </>
  );
}
