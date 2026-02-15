export function Timeline({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", marginTop: 16, paddingLeft: 20 }}>
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 8,
          bottom: 8,
          width: 1,
          backgroundColor: "#333",
        }}
      />
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            paddingBottom: i === items.length - 1 ? 0 : 20,
          }}
        >
          {/* Dot */}
          <div
            style={{
              position: "absolute",
              left: -19,
              top: 6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#555",
              border: "2px solid #333",
            }}
          />
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
