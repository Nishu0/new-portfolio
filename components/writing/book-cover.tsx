import { profile } from "@/lib/data";
import type { Article } from "@/lib/writing";

/**
 * The front of a book: the title set on coloured paper, with the author and
 * reading time at the foot. Everything inside is sized in container units, so the same
 * markup works as a shelf thumbnail and as the full-size cover in the reader.
 */
export function BookCover({ article }: { article: Article }) {
  return (
    <span className={`bookCover bookTone-${article.tone}`}>
      <span className="bookCoverFace">
        <span className="bookCoverTitle">{article.title}</span>
        <span className="bookCoverFoot">
          <span>{profile.name}</span>
          <span>{article.minutes} min read</span>
        </span>
      </span>
    </span>
  );
}
