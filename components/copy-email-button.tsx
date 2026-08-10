"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context / denied permission), no-op.
    }
  };

  return (
    <button
      type="button"
      className="copyButton"
      aria-label={`Copy ${email}`}
      onClick={copy}
    >
      <span className="copyStack" aria-hidden="true">
        <span
          className="copyContent"
          style={{ opacity: copied ? 0 : 1, transform: copied ? "scale(0.6)" : "none" }}
        >
          <svg
            className="copyIcon"
            viewBox="0 0 512 512"
            style={{ color: "var(--color-highlight-pink)" }}
          >
            <path
              fill="currentColor"
              d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"
            />
          </svg>
          {email}
        </span>
        <span
          className="copyContent"
          style={{ opacity: copied ? 1 : 0, transform: copied ? "none" : "scale(0.6)" }}
        >
          <svg
            className="copyIcon"
            viewBox="0 0 448 512"
            style={{ color: "var(--color-highlight-green)" }}
          >
            <path
              fill="currentColor"
              d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
            />
          </svg>
          Copied!
        </span>
      </span>
    </button>
  );
}
