import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LandingPageTemplate from "@/components/templates/LandingPageTemplate/LandingPageTemplate";
import { siteConfig } from "@/config/site";
import {
  getServicePageBySlug,
  servicePages,
} from "@/data/services";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages
    .filter((page) => page.slug !== "huis-snel-verkopen")
    .map((page) => ({
      slug: page.slug,
    }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) {
    return {};
  }

  const canonicalUrl = `${siteConfig.url}/${page.slug}`;

  return {
    title: page.seo.title,
    description: page.seo.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: canonicalUrl,
      title: `${page.seo.title} | ${siteConfig.name}`,
      description: page.seo.description,
    },

    twitter: {
      card: "summary_large_image",
      title: `${page.seo.title} | ${siteConfig.name}`,
      description: page.seo.description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <LandingPageTemplate
      data={page.data}
    />
  );
}
