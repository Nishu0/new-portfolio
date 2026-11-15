"use client";

import { useCallback, useEffect, useState } from "react";
import { BookCover } from "@/components/writing/book-cover";
import { BookReader } from "@/components/writing/book-reader";
import { formatDate, type Article } from "@/lib/writing";

type Open = { slug: string; fromRect?: DOMRect };

function slugFromPath(pathname: string) {
  return pathname.match(/^\/writing\/([^/]+)\/?$/)?.[1] ?? null;
}

/**
 * The shelf of covers, grouped by year. Picking a book lifts its cover off the
 * shelf into the reader; the URL follows along so every book is linkable.
 */
export function Shelf({
  articles,
  initialSlug,
}: {
  articles: Article[];
  initialSlug?: string;
}) {
  const [open, setOpen] = useState<Open | null>(
    initialSlug ? { slug: initialSlug } : null,
  );

  // Back and forward buttons open and close books.
  useEffect(() => {
    const onPop = () => {
      const slug = slugFromPath(window.location.pathname);
      setOpen(slug ? { slug } : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const pick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    // Leave modified clicks alone so a book can still open in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const cover = e.currentTarget.querySelector(".bookCover");
    setOpen({ slug, fromRect: cover?.getBoundingClientRect() });
    window.history.pushState(null, "", `/writing/${slug}`);
  };

  const closed = useCallback(() => {
    setOpen(null);
    if (slugFromPath(window.location.pathname)) {
      window.history.pushState(null, "", "/writing");
    }
  }, []);

  const years = [...new Set(articles.map((a) => a.date.slice(0, 4)))];
  const reading = open && articles.find((a) => a.slug === open.slug);

  return (
    <>
      {years.map((year) => (
        <section className="shelfYear" key={year} aria-labelledby={`year-${year}`}>
          <h2 className="shelfYearLabel" id={`year-${year}`}>
            {year}
          </h2>
          <ul className="shelf">
            {articles
              .filter((a) => a.date.startsWith(year))
              .map((article, i) => (
                <li key={article.slug} style={{ animationDelay: `${i * 70}ms` }}>
                  <a
                    className={`bookCard ${
                      open?.slug === article.slug ? "bookCardPicked" : ""
                    }`}
                    href={`/writing/${article.slug}`}
                    data-book={article.slug}
                    aria-label={`Read ${article.title}`}
                    onClick={(e) => pick(e, article.slug)}
                  >
                    <span className="bookCardBook">
                      <BookCover article={article} />
                    </span>
                    <span className="bookCardTitle">{article.title}</span>
                    <span className="bookCardMeta">
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                      <span>{article.minutes} min read</span>
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}

      {reading && (
        <BookReader
          key={reading.slug}
          article={reading}
          fromRect={open.fromRect}
          onClose={closed}
        />
      )}
    </>
  );
}
