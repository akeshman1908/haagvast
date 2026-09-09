import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RegionPageTemplate from "@/components/templates/RegionPageTemplate/RegionPageTemplate";
import {
  getRegionBySlug,
  regions,
} from "@/data/regions";
import { siteConfig } from "@/config/site";

type RegionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return {};
  }

  const canonicalUrl = `${siteConfig.url}/regio/${region.slug}`;

  return {
    title: region.seo.title,
    description: region.seo.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: canonicalUrl,
      title: `${region.seo.title} | ${siteConfig.name}`,
      description: region.seo.description,
    },

    twitter: {
      card: "summary_large_image",
      title: `${region.seo.title} | ${siteConfig.name}`,
      description: region.seo.description,
    },
  };
}

export default async function RegionPage({
  params,
}: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  return (
    <RegionPageTemplate
      data={region.data}
    />
  );
}