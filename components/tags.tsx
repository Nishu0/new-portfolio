export function Tags({ items }: { items: string[] }) {
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
