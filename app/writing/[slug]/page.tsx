import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingPage } from "@/components/writing/writing-page";
import { articles, getArticle } from "@/lib/writing";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} | Nisarg Thakkar`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: article.cover.src,
          width: article.cover.width,
          height: article.cover.height,
        },
      ],
    },
    twitter: { card: "summary_large_image", images: [article.cover.src] },
  };
}

export default async function Page({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <WritingPage openSlug={article.slug} />;
}
