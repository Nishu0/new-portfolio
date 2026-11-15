"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArticleBody } from "@/components/writing/article-body";
import { BookCover } from "@/components/writing/book-cover";
import { profile } from "@/lib/data";
import { formatLongDate, getContents, type Article } from "@/lib/writing";

/** What one side of a sheet of paper shows. */
type Face = { kind: "cover" } | { kind: "page"; index: number } | null;

/** arriving: flying in from the shelf. closed: cover shut. open: readable. */
type Phase = "arriving" | "closed" | "open" | "leaving";

/** A page turn in progress. Opening and closing the cover are turns too. */
type Turn = "open" | "close" | "next" | "prev";

type Leaf = {
  side: "left" | "right";
  front: Face;
  back?: Face;
  /** Name of the CSS animation class, or "" for a leaf at rest. */
  anim: string;
};

const page = (index: number): Face => ({ kind: "page", index });
const COVER: Face = { kind: "cover" };

/** Pages turns like a book; scroll is the same essay as one long sheet. */
type Mode = "pages" | "scroll";

const MODE_KEY = "reader-mode";
const FONT_KEY = "reader-font-step";
const FONT_MIN = -1;
const FONT_MAX = 3;

function stored(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function store(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Private windows can refuse storage; the setting just won't persist.
  }
}

const FLIGHT_MS = 460;
const FLIGHT_EASE = "cubic-bezier(0.45, 0, 0.2, 1)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function FaceView({
  face,
  article,
  total,
  side,
  flowRef,
}: {
  face: Face;
  article: Article;
  total: number;
  side: "left" | "right";
  flowRef?: React.Ref<HTMLDivElement>;
}) {
  if (!face) return null;
  if (face.kind === "cover") return <BookCover article={article} />;

  // Past the last page there is still paper, just nothing printed on it.
  const blank = total > 0 && face.index >= total;
  return (
    <div className={`bookPage bookPage-${side}`}>
      {!blank && (
        <>
          <div className="bookClip">
            <div
              className="bookFlow"
              ref={flowRef}
              style={{
                transform: `translateX(calc(var(--page-w) * ${-face.index}))`,
              }}
            >
              <ArticleBody article={article} />
            </div>
          </div>
          <span className="bookFolio">
            {String(face.index + 1).padStart(2, "0")}
          </span>
        </>
      )}
    </div>
  );
}

export function BookReader({
  article,
  fromRect,
  onClose,
}: {
  article: Article;
  /** Where the cover sat on the shelf. Omitted when landing on the URL directly. */
  fromRect?: DOMRect;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>(fromRect ? "arriving" : "open");
  const [turn, setTurn] = useState<Turn | null>(null);
  // First page of the spread a turn lands on. Usually the neighbouring
  // spread, but the table of contents can flip straight to any section.
  const [target, setTarget] = useState(0);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  // Pages visible at once: a two-page spread, or one page on narrow screens.
  const [span, setSpan] = useState<1 | 2>(2);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("pages");
  // Text size in steps of 10%, from 90% to 130%.
  const [fontStep, setFontStep] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shareNote, setShareNote] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const leaveAfterTurn = useRef(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const contents = getContents(article);

  // Reading preferences last for the browser session.
  useEffect(() => {
    if (stored(MODE_KEY) === "scroll") {
      setMode("scroll");
      setPhase("open");
    }
    const step = Number(stored(FONT_KEY));
    if (step) setFontStep(Math.max(FONT_MIN, Math.min(FONT_MAX, step)));
  }, []);

  /* ---- layout ---------------------------------------------------------- */

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const sync = () => {
      const next = query.matches ? 1 : 2;
      setSpan(next);
      if (next === 2) setCurrent((c) => c - (c % 2));
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Count pages: the flow is one column per page, so its scroll width divided
  // by the page width is the page count.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const flow = flowRef.current;
      const clip = flow?.parentElement;
      if (!flow || !clip) return;
      const pageWidth = parseFloat(getComputedStyle(clip).width);
      if (!pageWidth) return;
      const count = Math.max(
        1,
        Math.ceil((flow.scrollWidth - pageWidth * 0.5) / pageWidth),
      );
      setTotal(count);
      setCurrent((c) => {
        const last = span === 2 ? count - 1 - ((count - 1) % 2) : count - 1;
        return Math.min(c, last);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    document.fonts?.ready.then(schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [span, article, fontStep, mode]);

  /* ---- arriving and leaving --------------------------------------------- */

  // Transform that puts the centred, closed book exactly over a shelf cover.
  const flightTo = useCallback((rect: DOMRect) => {
    const stage = stageRef.current;
    const cover = stage?.querySelector<HTMLElement>(".bookLeaf");
    if (!stage || !cover) return null;
    const stageBox = stage.getBoundingClientRect();
    const box = cover.getBoundingClientRect();
    stage.style.transformOrigin = `${box.left - stageBox.left}px ${box.top - stageBox.top}px`;
    return `translate(${rect.left - box.left}px, ${rect.top - box.top}px) scale(${rect.width / box.width})`;
  }, []);

  useLayoutEffect(() => {
    setVisible(true);
    if (phase !== "arriving") return;
    const from = fromRect && !prefersReducedMotion() ? flightTo(fromRect) : null;
    if (!from) {
      setPhase("closed");
      return;
    }
    const flight = stageRef.current!.animate(
      [{ transform: from }, { transform: "none" }],
      { duration: FLIGHT_MS, easing: FLIGHT_EASE },
    );
    flight.onfinish = () => setPhase((p) => (p === "arriving" ? "closed" : p));
    return () => flight.cancel();
    // Runs once, for the entrance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leave = useCallback(() => {
    setPhase("leaving");
    setVisible(false);
    setSettingsOpen(false);
    rootRef.current?.scrollTo({ top: 0 });
    const card = document.querySelector<HTMLElement>(
      `[data-book="${article.slug}"]`,
    );
    const to =
      card && !prefersReducedMotion()
        ? flightTo(card.getBoundingClientRect())
        : null;
    if (!to) {
      window.setTimeout(onClose, prefersReducedMotion() ? 0 : 200);
      return;
    }
    const flight = stageRef.current!.animate(
      [{ transform: "none" }, { transform: to }],
      { duration: FLIGHT_MS, easing: FLIGHT_EASE, fill: "forwards" },
    );
    flight.onfinish = onClose;
  }, [article.slug, flightTo, onClose]);

  /* ---- turning ----------------------------------------------------------- */

  const commit = useCallback(
    (done: Turn, landing: number) => {
      setTurn(null);
      if (done === "open") setPhase("open");
      if (done !== "close") setCurrent(Math.max(0, landing));
      if (done === "close") {
        setCurrent(0);
        if (leaveAfterTurn.current) {
          leaveAfterTurn.current = false;
          setPhase("closed");
          // Let the closed book render before it flies back to the shelf.
          requestAnimationFrame(() => requestAnimationFrame(leave));
        } else {
          setPhase("closed");
        }
      }
    },
    [leave],
  );

  const start = useCallback(
    (next: Turn, landing = 0) => {
      if (prefersReducedMotion()) {
        commit(next, landing);
        return;
      }
      setTarget(landing);
      setTurn(next);
    },
    [commit],
  );

  const go = useCallback(
    (direction: 1 | -1) => {
      if (turn) return;
      if (phase === "closed") {
        if (direction === 1) start("open");
        return;
      }
      if (phase !== "open") return;
      if (direction === 1) {
        if (total && current + span < total) start("next", current + span);
      } else if (current === 0) {
        start("close");
      } else {
        start("prev", current - span);
      }
    },
    [turn, phase, total, current, span, start],
  );

  const close = useCallback(() => {
    if (turn || phase === "arriving" || phase === "leaving") return;
    if (mode === "scroll") {
      leave();
    } else if (phase === "open") {
      leaveAfterTurn.current = true;
      start("close");
    } else {
      leave();
    }
  }, [turn, phase, mode, start, leave]);

  /* ---- settings, contents, sharing --------------------------------------- */

  const chooseMode = (next: Mode) => {
    if (next === mode || turn) return;
    store(MODE_KEY, next);
    setMode(next);
    // Coming back from the long sheet, the book is already open.
    setPhase("open");
    rootRef.current?.scrollTo({ top: 0 });
  };

  const resize = (delta: number) => {
    const next = Math.max(FONT_MIN, Math.min(FONT_MAX, fontStep + delta));
    store(FONT_KEY, String(next));
    setFontStep(next);
  };

  // Jump to a section: scroll to it on the long sheet, or turn to its page.
  const jumpTo = (block: number) => {
    const root = rootRef.current;
    if (!root) return;
    if (mode === "scroll") {
      root
        .querySelector(`.readingSheet [data-block="${block}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const flow = flowRef.current;
    const heading = flow?.querySelector(`[data-block="${block}"]`);
    if (!flow || !heading || turn) return;
    // Each page is one column, so the heading's distance from the start of
    // the flow, in page widths, is the page it sits on.
    const box = flow.getBoundingClientRect();
    const index = Math.floor(
      (heading.getBoundingClientRect().left - box.left + 1) / box.width,
    );
    const landing = span === 2 ? index - (index % 2) : index;
    root.scrollTo({ top: 0, behavior: "smooth" });
    // Flip there in one turn, once the book has scrolled back into view.
    const flip = () => {
      if (phase !== "open") start("open", landing);
      else if (landing > current) start("next", landing);
      else if (landing < current) start("prev", landing);
    };
    window.setTimeout(flip, root.scrollTop > 0 && !prefersReducedMotion() ? 520 : 0);
  };

  const share = async () => {
    const url = `${window.location.origin}/writing/${article.slug}`;
    setShareNote("");
    try {
      if (navigator.share) await navigator.share({ title: article.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setShareNote("Link copied.");
      }
    } catch (error) {
      // Dismissing the share sheet is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareNote(`Copy this link: ${url}`);
    }
  };

  // Clicking anywhere else puts the settings panel away.
  useEffect(() => {
    if (!settingsOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!settingsRef.current?.contains(e.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [settingsOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        if (settingsOpen) setSettingsOpen(false);
        else close();
      }
      // On the long sheet the keys keep their normal scrolling jobs.
      else if (mode === "scroll") return;
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (
        (e.key === "Enter" || e.key === " ") &&
        !(e.target as HTMLElement).closest("a, button")
      ) {
        go(1);
      } else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go, mode, settingsOpen]);

  // The page behind should not scroll while a book is open.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    rootRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const onSheetClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    if (phase === "closed") {
      go(1);
      return;
    }
    const box = sheetRef.current!.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    go(x < (span === 2 ? 0.5 : 0.3) ? -1 : 1);
  };

  /* ---- what is on the table right now ------------------------------------ */

  const shut = phase !== "open";
  let left: Face = null;
  let right: Face = null;
  let leaf: Leaf | null = null;

  if (span === 2) {
    if (shut) {
      // The first spread waits under the cover; the cover's reverse is its
      // left-hand page.
      const first = turn === "open" ? target : 0;
      right = page(first + 1);
      leaf = {
        side: "right",
        front: COVER,
        back: page(first),
        anim: turn === "open" ? "leafForward" : "",
      };
    } else if (turn === "next") {
      left = page(current);
      right = page(target + 1);
      leaf = {
        side: "right",
        front: page(current + 1),
        back: page(target),
        anim: "leafForward",
      };
    } else if (turn === "prev") {
      left = page(target);
      right = page(current + 1);
      leaf = {
        side: "left",
        front: page(current),
        back: page(target + 1),
        anim: "leafBackward",
      };
    } else if (turn === "close") {
      right = page(current + 1);
      leaf = {
        side: "left",
        front: page(current),
        back: COVER,
        anim: "leafBackward",
      };
    } else {
      left = page(current);
      right = page(current + 1);
    }
  } else if (shut) {
    right = page(turn === "open" ? target : 0);
    leaf = { side: "right", front: COVER, anim: turn === "open" ? "leafAway" : "" };
  } else if (turn === "next") {
    right = page(target);
    leaf = { side: "right", front: page(current), anim: "leafAway" };
  } else if (turn === "prev") {
    right = page(current);
    leaf = { side: "right", front: page(target), anim: "leafReturn" };
  } else if (turn === "close") {
    right = page(current);
    leaf = { side: "right", front: COVER, anim: "leafReturn" };
  } else {
    right = page(current);
  }

  // The sheet sits half a page left while shut so the cover is centred, and
  // slides back as the cover swings open.
  const centredOnCover = (shut && turn !== "open") || turn === "close";

  const label = !total
    ? "…"
    : span === 2 && current + 1 < total
      ? `${current + 1}–${current + 2} / ${total}`
      : `${current + 1} / ${total}`;

  return (
    <div
      ref={rootRef}
      className={`reader ${span === 1 ? "readerSingle" : ""} ${
        visible ? "readerVisible" : ""
      } ${scrolled ? "readerScrolled" : ""}`}
      style={{ "--font-scale": 1 + fontStep * 0.1 } as React.CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      tabIndex={-1}
      onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 24)}
    >
      <div className="readerBackdrop" />

      <div className="readerSettings" ref={settingsRef}>
        <button
          className="readerIcon"
          onClick={() => setSettingsOpen((open) => !open)}
          aria-label="Reading settings"
          aria-expanded={settingsOpen}
          aria-controls="reader-settings"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="7.5" r="1.25" fill="currentColor" stroke="none" />
            <path d="M8 11h8M12 11v1.2c0 1.6-.8 2.7-2.5 4.3M12 12.2c0 1.6.8 2.7 2.5 4.3" />
          </svg>
        </button>
        {settingsOpen && (
          <div className="readerPanel" id="reader-settings">
            <fieldset>
              <legend>Reading mode</legend>
              <div className="readerModes">
                <button aria-pressed={mode === "pages"} onClick={() => chooseMode("pages")}>
                  Pages
                </button>
                <button aria-pressed={mode === "scroll"} onClick={() => chooseMode("scroll")}>
                  Scroll
                </button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Text size</legend>
              <div className="readerFont">
                <button
                  onClick={() => resize(-1)}
                  disabled={fontStep <= FONT_MIN}
                  aria-label="Decrease text size"
                >
                  −
                </button>
                <output aria-live="polite" aria-label="Text size">
                  {100 + fontStep * 10}%
                </output>
                <button
                  onClick={() => resize(1)}
                  disabled={fontStep >= FONT_MAX}
                  aria-label="Increase text size"
                >
                  +
                </button>
              </div>
            </fieldset>
          </div>
        )}
      </div>

      <button className="readerIcon readerClose" onClick={close} aria-label="Close book">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {mode === "scroll" ? (
        <article className="readingSheet" key="scroll">
          <div className="bookFlow readingFlow">
            <ArticleBody article={article} />
          </div>
          <p className="readingEnd">
            {profile.name} · {article.date.slice(0, 4)}
          </p>
        </article>
      ) : (
        <>
          <div
            className="readerScreen"
            key="pages"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="bookStage" ref={stageRef}>
              <div
                ref={sheetRef}
                className={`bookSheet ${centredOnCover ? "bookSheetShut" : ""}`}
                onClick={onSheetClick}
              >
                <div className="bookUnderlay" />
                {left && (
                  <div className="bookSlot bookSlotLeft">
                    <FaceView face={left} article={article} total={total} side="left" />
                  </div>
                )}
                {right && (
                  <div className="bookSlot bookSlotRight">
                    <FaceView
                      face={right}
                      article={article}
                      total={total}
                      side="right"
                      flowRef={flowRef}
                    />
                  </div>
                )}
                {leaf && (
                  <div
                    // A new key per turn restarts the animation from a clean slate.
                    key={`${leaf.side}-${turn ?? "rest"}-${current}`}
                    className={`bookLeaf bookLeaf-${leaf.side} ${leaf.anim}`}
                    onAnimationEnd={(e) => {
                      if (e.target === e.currentTarget && turn) commit(turn, target);
                    }}
                  >
                    <div className="bookLeafFace">
                      <FaceView
                        face={leaf.front}
                        article={article}
                        total={total}
                        side={leaf.side}
                      />
                      <span className="bookLeafShade" />
                    </div>
                    {leaf.back && (
                      <div className="bookLeafFace bookLeafBack">
                        <FaceView
                          face={leaf.back}
                          article={article}
                          total={total}
                          side={leaf.side === "right" ? "left" : "right"}
                        />
                        <span className="bookLeafShade" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="readerBar">
            {phase === "open" ? (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label={current === 0 ? "Close cover" : "Previous page"}
                >
                  ← Previous
                </button>
                <span className="readerLabel" aria-live="polite">
                  {label}
                </span>
                <button
                  onClick={() => go(1)}
                  disabled={!total || current + span >= total}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </>
            ) : (
              <button
                className="readerDown"
                aria-label="Article details"
                onClick={() =>
                  rootRef.current
                    ?.querySelector(".readerDetails")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </div>

          <section className="readerDetails" aria-label="About this article">
            <h2 className="readerDetailsTitle">{article.title}</h2>
            <div className="readerDetailsSide">
              <dl>
                <div>
                  <dt>Published</dt>
                  <dd>
                    <time dateTime={article.date}>{formatLongDate(article.date)}</time>
                  </dd>
                </div>
                <div>
                  <dt>Topic</dt>
                  <dd>Personal writing</dd>
                </div>
                <div>
                  <dt>Author</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Reading time</dt>
                  <dd>About {article.minutes} min</dd>
                </div>
              </dl>
              <div className="readerDetailsActions">
                <button className="btn" onClick={share}>
                  Share article ↗
                </button>
                <a className="btn btnGhost" href={article.url} target="_blank" rel="noreferrer">
                  Read on X ↗
                </a>
              </div>
              <p className="readerShareNote" role="status">
                {shareNote}
              </p>
            </div>
            {contents.length > 0 && (
              <nav className="readerContents" aria-label="Table of contents">
                <h3>Table of Contents</h3>
                <ol>
                  {contents.map((entry, i) => (
                    <li key={entry.block}>
                      <button onClick={() => jumpTo(entry.block)}>
                        <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                        <span>{entry.label}</span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </section>
        </>
      )}
    </div>
  );
}
