import RegionStructuredData from "@/components/seo/RegionStructuredData";
import { getRegionBySlug } from "@/data/haagvast-regions";

type RegionLayoutProps = Readonly<{
  children: React.ReactNode;

  params: Promise<{
    slug: string;
  }>;
}>;

export default async function RegionLayout({
  children,
  params,
}: RegionLayoutProps) {
  const { slug } = await params;

  const region =
    getRegionBySlug(slug);

  return (
    <>
      {region ? (
        <RegionStructuredData
          region={region}
        />
      ) : null}

      {children}
    </>
  );
}
