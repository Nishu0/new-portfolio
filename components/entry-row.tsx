"use client";

import Image from "next/image";
import { useState } from "react";
import type { Entry } from "@/lib/data";

function Chevron({ open, variant }: { open: boolean; variant: "desktop" | "mobile" }) {
  return (
    <svg
      className={`chevron chevron${variant === "desktop" ? "Desktop" : "Mobile"} ${
        open ? "chevronOpen" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function EntryRow({ entry }: { entry: Entry }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = entry.bullets;
  const hasDetail = rest.length > 0 || !!entry.tags || !!entry.links;

  return (
    <div
      className="row"
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={(e) => {
        // Let link clicks inside the expanded detail through.
        if ((e.target as HTMLElement).closest("a")) return;
        setOpen((o) => !o);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
    >
      <div className="rowLeft">
        <div className="rowLogo">
          {!entry.logo ? (
            (entry.monogram ?? entry.org.charAt(0)).toUpperCase()
          ) : entry.logo.endsWith(".svg") ? (
            // next/image won't optimise SVG unless dangerouslyAllowSVG is on;
            // these are our own files in /public, so serve them straight.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.logo} alt="" />
          ) : (
            <Image src={entry.logo} alt="" fill sizes="52px" />
          )}
        </div>
        <div className="rowLeftText">
          <div className="roleRow">
            <span className="role">{entry.role}</span>
            {entry.badge && <span className="tagBadge">{entry.badge}</span>}
            {hasDetail && <Chevron open={open} variant="mobile" />}
          </div>
          <div className="rowMeta">
            {entry.org} • {entry.period}
          </div>
        </div>
      </div>

      <div className="rowRight">
        <div className="rowRightInner">
          <div className="firstBulletRow">
            <p className="bullet">{first}</p>
            {hasDetail && <Chevron open={open} variant="desktop" />}
          </div>

          <div className={`detail ${open ? "detailOpen" : ""}`}>
            <div className="detailInner">
              {rest.map((bullet, i) => (
                <p className="bullet" key={i}>
                  {bullet}
                </p>
              ))}

              {entry.tags && (
                <div className="rowTags">
                  {entry.tags.map((tag) => (
                    <span className="rowTag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {entry.links && (
                <div className="rowLinks">
                  {entry.links.map((link) => (
                    <a
                      className="rowLink"
                      key={link.href}
                      href={link.href}
                      // Links into the site stay in this tab.
                      {...(link.href.startsWith("/")
                        ? {}
                        : { target: "_blank", rel: "noreferrer" })}
                    >
                      {link.label} {link.href.startsWith("/") ? "→" : "↗"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
