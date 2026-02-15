import Link from "next/link";
import { XIcon, GitHubIcon } from "@/components/icons";

export function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 64,
      }}
    >
      <span style={{ fontSize: 14, letterSpacing: "0.02em" }}>nisarg</span>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link
          href="https://x.com/itsnishu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#999", transition: "color 0.2s" }}
        >
          <XIcon size={14} />
        </Link>
        <Link
          href="https://github.com/Nishu0"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#999", transition: "color 0.2s" }}
        >
          <GitHubIcon size={14} />
        </Link>
      </div>
    </nav>
  );
}
