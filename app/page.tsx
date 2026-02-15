import Link from "next/link";
import { AccordionItem } from "@/components/accordion-item";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const experience = [
  {
    company: "Qiro Finance",
    role: "FOUNDING MOVE DEVELOPER",
    period: "FEB 2024 - DEC 2025",
    description:
      "built core smart contracts and backend infrastructure for an onchain credit protocol. designed lending pools, credit scoring mechanisms, and real world asset tokenization pipelines.",
    tags: ["rust", "move", "fastify", "nextjs", "go"],
  },
];

const posts = [
  {
    title: "moltbookworld",
    tag: "PROJECT",
    year: "2026",
    description:
      "a platform for discovering and sharing books with a community of readers.",
    tags: ["typescript", "nextjs", "fastify"],
    xLink: "https://x.com/itsnishu/status/2018031205703377303",
    link: "https://www.moltbookworld.xyz/",
  },
  {
    title: "xarticles",
    tag: "PROJECT",
    year: "2026",
    description:
      "turn your x threads into clean, readable long form articles instantly.",
    tags: ["typescript", "nextjs", "fastify"],
    xLink: "https://x.com/itsnishu/status/2016858382008012931",
    link: "https://www.xarticles.one/",
  },
  {
    title: "findfounder",
    tag: "PROJECT",
    year: "2026",
    description:
      "match with co founders based on complementary skills and shared vision.",
    tags: ["typescript", "nextjs", "fastify"],
    xLink: "https://x.com/itsnishu/status/2013890499011338545",
    link: "https://findfounder.one/",
  },
  {
    title: "amidst all the chaos, finding dust to build upon",
    tag: "ARTICLE",
    year: "2025",
    description:
      "reflections on navigating uncertainty and finding something worth building when everything feels noisy.",
    xLink: "https://x.com/itsnishu/status/2003466290904576312",
  },
  {
    title: "ideas are cheap: do market study, validate demand, ship find pmf",
    tag: "ARTICLE",
    year: "2025",
    description:
      "why execution beats ideation, a breakdown of how to validate before you build.",
    xLink: "https://x.com/itsnishu/status/1991129810350039361",
  },
  {
    title: "your v̶i̶b̶e̶ shit coding sucks bcs you are missing some context",
    tag: "ARTICLE",
    year: "2025",
    description:
      "context is everything. why most ai generated code falls apart and how to fix it.",
    xLink: "https://x.com/itsnishu/status/1978062626014814230",
  },
];

function Tags({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
      {items.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: 11,
            color: "#999",
            padding: "3px 10px",
            border: "1px solid #333",
            borderRadius: 4,
            letterSpacing: "0.02em",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div
      style={{
        maxWidth: 620,
        margin: "0 auto",
        padding: "40px 20px 80px",
      }}
    >
      {/* Navbar */}
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

      {/* Hero */}
      <section style={{ marginBottom: 64 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          i&apos;m nisarg!
        </h1>
        <p style={{ color: "#666", fontSize: 16 }}>
          (call nishu) · engineer
        </p>
        <p style={{ color: "#555", fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>
          web3 dev (rust) who ships anything and everything. loves cats, traveling,
          and building things that i love.
        </p>
      </section>

      {/* Photos */}
      <section style={{ marginBottom: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <img
              key={i}
              src={`/images/image${i}.jpg`}
              alt=""
              style={{
                width: "100%",
                aspectRatio: "1",
                objectFit: "cover",
                borderRadius: 4,
                backgroundColor: "#111",
                display: "block",
              }}
            />
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 14, color: "#fff", marginBottom: 24 }}>
          Work experience ({experience.length})
        </h2>
        {experience.map((exp, i) => (
          <AccordionItem
            key={i}
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <span style={{ fontSize: 14, color: "#ccc" }}>
                  {exp.company}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#555",
                    letterSpacing: "0.1em",
                  }}
                >
                  {exp.role} / {exp.period}
                </span>
              </div>
            }
          >
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
              {exp.description}
            </p>
            <Tags items={exp.tags} />
          </AccordionItem>
        ))}
      </section>

      {/* Posts */}
      <section>
        <h2 style={{ fontSize: 14, color: "#fff", marginBottom: 24 }}>
          Projects & Articles ({posts.length})
        </h2>
        {posts.map((post, i) => (
          <AccordionItem
            key={i}
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <span style={{ fontSize: 14, color: "#ccc" }}>
                  {post.title}
                </span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#555",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {post.tag} / {post.year}
                  </span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {post.xLink && (
                      <Link
                        href={post.xLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#555" }}
                      >
                        <XIcon size={12} />
                      </Link>
                    )}
                    {post.link && (
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#555" }}
                      >
                        <LinkIcon size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            }
          >
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
              {post.description}
            </p>
            {post.tags && <Tags items={post.tags} />}
          </AccordionItem>
        ))}
      </section>
    </div>
  );
}
