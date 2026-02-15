"use client";

import { useState, useEffect } from "react";

export function CatSprite() {
  const [active, setActive] = useState(false);
  const [frame, setFrame] = useState(0);

  // Animate sleeping sprite when idle
  useEffect(() => {
    if (active) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % 2), 500);
    return () => clearInterval(id);
  }, [active]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (active) return;

    // Pass current position to oneko.js
    const rect = e.currentTarget.getBoundingClientRect();
    (window as unknown as Record<string, unknown>).__onekoStartX = rect.left + 16;
    (window as unknown as Record<string, unknown>).__onekoStartY = rect.top + 16;

    setActive(true);

    const script = document.createElement("script");
    script.src = "/oneko/oneko.js";
    script.dataset.cat = "/oneko/billu.gif";
    document.body.appendChild(script);
  };

  if (active) return null;

  // Sleeping sprites: [-2, 0] and [-2, -1] → (-64px, 0) and (-64px, -32px)
  const sleepingFrames = [
    { x: -64, y: 0 },
    { x: -64, y: -32 },
  ];
  const sprite = sleepingFrames[frame];

  return (
    <span
      onClick={handleClick}
      title="click me!"
      style={{
        display: "inline-block",
        width: 32,
        height: 32,
        backgroundImage: "url(/oneko/billu.gif)",
        backgroundPosition: `${sprite.x}px ${sprite.y}px`,
        imageRendering: "pixelated",
        cursor: "pointer",
        verticalAlign: "bottom",
        marginLeft: 4,
      }}
    />
  );
}
