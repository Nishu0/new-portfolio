export function Photos() {
  return (
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
  );
}
