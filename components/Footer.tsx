export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "3px solid #000",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        CERTCHAIN
      </span>

      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.6875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        A BT Miniproject by Sanay, Saad, Talha & Mohsin 
      </span>

      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.6875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        CERTCHAIN © 2026
      </span>
    </footer>
  );
}