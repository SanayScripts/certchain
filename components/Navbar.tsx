"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        borderBottom: "3px solid #000",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.25rem",
          letterSpacing: "-0.02em",
          textDecoration: "none",
          color: "#000",
        }}
      >
        CERTCHAIN
      </Link>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          href="/issue"
          className={pathname === "/issue" ? "btn-primary" : "btn-secondary"}
          style={{ textDecoration: "none", fontSize: "0.75rem" }}
        >
          Issue Certificate
        </Link>
        <Link
          href="/verify"
          className={pathname === "/verify" ? "btn-primary" : "btn-secondary"}
          style={{ textDecoration: "none", fontSize: "0.75rem" }}
        >
          Verify Certificate
        </Link>
      </div>
    </nav>
  );
}