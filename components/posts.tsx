import Link from "next/link";
import { AccordionItem } from "@/components/accordion-item";
import { Tags } from "@/components/tags";
import { XIcon, LinkIcon } from "@/components/icons";
import { posts } from "@/lib/data";

export function Posts() {
  return (
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
  );
}
