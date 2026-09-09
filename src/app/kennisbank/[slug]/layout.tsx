import KnowledgeArticleStructuredData from "@/components/seo/KnowledgeArticleStructuredData";
import {
  getKnowledgeBaseArticleSeoBySlug,
} from "@/data/knowledge-base-seo";

type KnowledgeArticleLayoutProps = Readonly<{
  children: React.ReactNode;

  params: Promise<{
    slug: string;
  }>;
}>;

export default async function KnowledgeArticleLayout({
  children,
  params,
}: KnowledgeArticleLayoutProps) {
  const { slug } = await params;

  const article =
    getKnowledgeBaseArticleSeoBySlug(
      slug,
    );

  return (
    <>
      {article ? (
        <KnowledgeArticleStructuredData
          article={article}
        />
      ) : null}

      {children}
    </>
  );
}
