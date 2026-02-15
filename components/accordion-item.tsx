"use client";

import { useState } from "react";

export function AccordionItem({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid #222" }}>
      <button
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a")) return;
          setOpen(!open);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 0",
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              flexShrink: 0,
            }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          {header}
        </div>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 800 : 0,
          transition: "max-height 0.3s ease",
        }}
      >
        <div style={{ padding: "4px 0 16px 20px" }}>{children}</div>
      </div>
    </div>
  );
}
