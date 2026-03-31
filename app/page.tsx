import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        style={{
          padding: "5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: headline + CTAs */}
        <div style={{ maxWidth: "540px" }}>
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              lineHeight: 1.05,
              margin: "0 0 1.5rem 0",
            }}
          >
            CERTIFICATE
            <span
              style={{
                display: "block",
                backgroundColor: "#FFDD00",
                padding: "0 0.25rem",
              }}
            >
              FRAUD STOPS
            </span>
            HERE.
          </h1>

          <p
            style={{
              fontWeight: 700,
              fontSize: "1.125rem",
              lineHeight: 1.6,
              margin: "0 0 2.5rem 0",
              maxWidth: "420px",
            }}
          >
            Issue tamper-proof certificates on the blockchain. Verify any
            credential instantly with 100% mathematical certainty.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/issue"
              className="btn-primary"
              style={{ textDecoration: "none", fontSize: "0.875rem" }}
            >
              Issue Certificate
            </Link>
            <Link
              href="/verify"
              className="btn-secondary"
              style={{ textDecoration: "none", fontSize: "0.875rem" }}
            >
              Verify Certificate
            </Link>
          </div>
        </div>

        {/* Right: decorative node graphic */}
        <div
          className="card"
          style={{
            width: "340px",
            height: "280px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 0,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 340 240"
            style={{ display: "block", backgroundColor: "#111" }}
          >
            {/* Edges */}
            {[
              [170, 60, 80, 130], [170, 60, 260, 130], [170, 60, 170, 180],
              [80, 130, 170, 180], [260, 130, 170, 180], [80, 130, 40, 200],
              [260, 130, 300, 200], [170, 180, 100, 220], [170, 180, 240, 220],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
            ))}
            {/* Nodes */}
            {[
              [170, 60], [80, 130], [260, 130], [170, 180],
              [40, 200], [300, 200], [100, 220], [240, 220],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="5" fill="#FFDD00" />
            ))}
          </svg>
          <div
            style={{
              backgroundColor: "#FFDD00",
              padding: "0.5rem 1rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Verification Node #882-X
          </div>
        </div>
      </section>

      <hr className="section-divider" style={{ margin: "0 2rem" }} />

      {/* ── FEATURES ── */}
      <section style={{ padding: "5rem 2rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "0.5rem",
          }}
        >
          BUILT FOR{" "}
          <span
            style={{ borderBottom: "4px solid #FFDD00" }}
          >
            RELIABILITY
          </span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
          }}
        >
          {[
            {
              icon: "🛡",
              title: "TAMPER-PROOF",
              body: "Immutable cryptographic records that cannot be altered or forged by anyone.",
            },
            {
              icon: "✔",
              title: "INSTANT VERIFICATION",
              body: "Verify credentials in milliseconds with a simple hash check.",
            },
            {
              icon: "⛓",
              title: "BLOCKCHAIN-BACKED",
              body: "Powered by decentralised ledger technology for global accessibility and uptime.",
            },
          ].map((feature) => (
            <div key={feature.title} className="card">
              <div
                style={{
                  backgroundColor: "#FFDD00",
                  border: "3px solid #000",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" style={{ margin: "0 2rem" }} />

      {/* ── HOW IT WORKS ── */}
      <section
        style={{
          padding: "5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "4rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: stamp graphic */}
        <div
          style={{
            border: "4px solid #000",
            width: "280px",
            height: "280px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              border: "4px solid #000",
              backgroundColor: "#FFDD00",
              padding: "1.5rem 2rem",
              transform: "rotate(-3deg)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "2rem",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              VERIFIED
              <br />
              TRUTH
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: "0.5rem",
              }}
            >
              ID: 9920-CC-01
            </div>
          </div>
        </div>

        {/* Right: steps */}
        <div style={{ flex: 1, minWidth: "260px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            TOTAL TRUST
            <br />
            DECENTRALIZED
          </h2>

          {[
            "Certificate details are hashed using SHA-256 cryptography.",
            "The hash is written to the blockchain, signed by the issuer's wallet.",
            "Anyone can verify the certificate — no middleman, no delay.",
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFDD00",
                  border: "3px solid #000",
                  width: "32px",
                  height: "32px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                }}
              >
                {i + 1}
              </div>
              <p style={{ fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 