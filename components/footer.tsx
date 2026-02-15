import { LocalTime } from "@/components/local-time";

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        paddingTop: 32,
        borderTop: "1px solid #222",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
      }}
    >
      <div>
        <p style={{ color: "#666" }}>
          designed & developed by{" "}
          <span style={{ color: "#ccc" }}>nisarg</span>
        </p>
        <p style={{ color: "#555", marginTop: 4 }}>
          © 2026 all rights reserved.
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ color: "#666" }}>
          visitors <span style={{ color: "#ccc" }}>#1</span>
        </p>
        <p style={{ color: "#555", marginTop: 4 }}>
          bangalore, india <LocalTime />
        </p>
      </div>
    </footer>
  );
}
