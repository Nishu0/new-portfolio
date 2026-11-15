import Image from "next/image";
import { Fragment, memo } from "react";
import { formatDate, type Article, type Seg } from "@/lib/writing";

function Segs({ segs }: { segs: Seg[] }) {
  return segs.map((seg, i) => {
    let node: React.ReactNode = seg.t;
    if (seg.b) node = <strong>{node}</strong>;
    if (seg.i) node = <em>{node}</em>;
    if (seg.href) {
      node = (
        <a href={seg.href} target="_blank" rel="noreferrer">
          {node}
        </a>
      );
    }
    return <Fragment key={i}>{node}</Fragment>;
  });
}

/**
 * The full article as one continuous flow. The reader lays this out in CSS
 * columns, one column per page, and each visible page is a window onto it. The
 * title block breaks the column after itself so it always owns page one.
 */
export const ArticleBody = memo(function ArticleBody({
  article,
}: {
  article: Article;
}) {
  return (
    <>
      <div className="bookTitlePage">
        <p className="bookTitleKicker">Essay</p>
        <h1>{article.title}</h1>
        <p className="bookTitleMeta">
          <time dateTime={article.date}>{formatDate(article.date)}</time> ·{" "}
          {article.minutes} min read
        </p>
        <Image
          className="bookTitleArt"
          src={article.cover.src}
          alt=""
          width={article.cover.width}
          height={article.cover.height}
          sizes="(max-width: 860px) 90vw, 480px"
          loading="eager"
          // Reserves the right height before the file loads, whatever the
          // cover's proportions.
          style={{
            aspectRatio: `${article.cover.width} / ${article.cover.height}`,
          }}
        />
        <p className="bookTitleSource">
          First published on X.{" "}
          <a href={article.url} target="_blank" rel="noreferrer">
            Read the original ↗
          </a>
        </p>
      </div>

      {article.blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} data-block={i}>
                <Segs segs={block.segs} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} data-block={i}>
                <Segs segs={block.segs} />
              </h3>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Segs segs={block.segs} />
              </blockquote>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Segs segs={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "img":
            return (
              <figure key={i}>
                <Image
                  src={block.src}
                  alt={block.caption ?? ""}
                  width={block.width}
                  height={block.height}
                  sizes="(max-width: 860px) 90vw, 480px"
                  loading="eager"
                  // Sized from the known dimensions, never from the loaded
                  // file, so pagination is right before any image arrives.
                  style={{
                    aspectRatio: `${block.width} / ${block.height}`,
                    width: `min(100%, calc(var(--page-h) * 0.44 * ${(
                      block.width / block.height
                    ).toFixed(4)}))`,
                  }}
                />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case "post":
            return (
              <p key={i} className="bookPost">
                <a href={block.href} target="_blank" rel="noreferrer">
                  View the referenced post on X ↗
                </a>
              </p>
            );
          default:
            return (
              <p key={i}>
                <Segs segs={block.segs} />
              </p>
            );
        }
      })}
    </>
  );
});
