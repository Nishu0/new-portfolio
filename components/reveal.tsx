"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    // Reveal once the top edge has entered the viewport. Comparing against the
    // rect (rather than relying on IntersectionObserver alone) also covers
    // elements the user has already scrolled past. A fast scroll can jump an
    // element from below the fold to above it without ever crossing a
    // threshold, which would otherwise leave it invisible forever.
    const check = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        setVisible(true);
        cleanup();
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const cleanup = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    check();

    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      className={visible ? "reveal revealVisible" : "reveal"}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
