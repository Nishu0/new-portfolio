import dust from "@/content/writing/finding-dust-to-build-upon.json";
import forgot from "@/content/writing/forgot-why-we-started-building.json";
import ideas from "@/content/writing/ideas-are-cheap.json";
import context from "@/content/writing/missing-some-context.json";

/** A run of inline text. `b` is bold, `i` italic, `href` turns it into a link. */
export type Seg = { t: string; b?: boolean; i?: boolean; href?: string };

export type Block =
  | { type: "p" | "h2" | "h3" | "quote"; segs: Seg[] }
  | { type: "ul" | "ol"; items: Seg[][] }
  | { type: "img"; src: string; width: number; height: number; caption?: string }
  | { type: "post"; href: string };

/** Paper and ink pairing for the book cover. */
export type CoverTone = "cream" | "ink" | "lilac" | "night";

export type Article = {
  slug: string;
  title: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  /** The original post on X. */
  url: string;
  cover: { src: string; width: number; height: number };
  excerpt: string;
  minutes: number;
  blocks: Block[];
  tone: CoverTone;
};

// The JSON in content/writing is generated from the X articles, so the block
// shapes are trusted rather than re-validated here.
const source: [unknown, CoverTone][] = [
  [forgot, "night"],
  [dust, "cream"],
  [ideas, "ink"],
  [context, "lilac"],
];

export const articles: Article[] = source
  .map(([data, tone]) => ({ ...(data as Omit<Article, "tone">), tone }))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Section headings for the table of contents. `block` is the heading's index
 * in `article.blocks`, which the reader uses to find it on the page.
 */
export function getContents(article: Article) {
  const headings = article.blocks.flatMap((block, index) =>
    block.type === "h2" || block.type === "h3"
      ? [{ block: index, level: block.type, label: block.segs.map((s) => s.t).join("") }]
      : [],
  );
  // Essays written with only one heading level still get a contents list.
  const top = headings.filter((h) => h.level === "h2");
  return top.length ? top : headings;
}

const longDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatLongDate(iso: string) {
  return longDateFormat.format(new Date(`${iso}T00:00:00Z`));
}
