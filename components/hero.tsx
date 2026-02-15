import { CatSprite } from "@/components/cat-sprite";

export function Hero() {
  return (
    <section style={{ marginBottom: 64 }}>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 600,
          marginBottom: 8,
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "flex-end",
          gap: 0,
        }}
      >
        i&apos;m nisarg!
        <CatSprite />
      </h1>
      <p style={{ color: "#666", fontSize: 16 }}>
        (aka nishu) · engineer
      </p>
      <p
        style={{
          color: "#555",
          fontSize: 14,
          marginTop: 16,
          lineHeight: 1.6,
        }}
      >
        web3 dev (rust) who ships anything and everything. loves cats, traveling,
        and building things that i love.
      </p>
    </section>
  );
}
