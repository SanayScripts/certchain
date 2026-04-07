"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

type Status = "idle" | "verifying" | "valid" | "invalid" | "error";

export default function VerifyPage() {
  const [form, setForm] = useState({
    name: "",
    course: "",
    organisation: "",
    date: "",
    issuerAddress: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [issuedAt, setIssuedAt] = useState<string | null>(null);
  const [certHash, setCertHash] = useState<string | null>(null);

  async function verifyCertificate() {
    if (!form.name || !form.course || !form.organisation || !form.date || !form.issuerAddress) {
      alert("Please fill in all fields.");
      return;
    }
    if (!ethers.isAddress(form.issuerAddress)) {
      alert("Invalid issuer wallet address.");
      return;
    }

    setStatus("verifying");

    try {
      const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const raw = JSON.stringify({
        name: form.name.trim().toLowerCase(),
        course: form.course.trim().toLowerCase(),
        organisation: form.organisation.trim().toLowerCase(),
        date: form.date,
      });
      const hash = ethers.keccak256(ethers.toUtf8Bytes(raw)) as `0x${string}`;
      setCertHash(hash);

      const timestamp: bigint = await contract.verify(form.issuerAddress, hash);

      if (timestamp === 0n) {
        setStatus("invalid");
      } else {
        const date = new Date(Number(timestamp) * 1000);
        setIssuedAt(
          date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        );
        setStatus("valid");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ padding: "3rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Page title */}
      <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "0.25rem" }}>
        VERIFY A CERTIFICATE
      </h1>
      <div style={{ borderTop: "4px solid #000", marginBottom: "1rem" }} />
      <p style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "3rem" }}>
        Confirm the authenticity of digital credentials using real-time blockchain verification.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Form card */}
        <div className="card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Name */}
            <div>
              <label className="input-label">Recipient Name</label>
              <input
                className="input-field"
                placeholder="FULL NAME"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Course */}
            <div>
              <label className="input-label">Course / Credential Title</label>
              <input
                className="input-field"
                placeholder="CREDENTIAL TITLE"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />
            </div>

            {/* Organisation + Date side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="input-label">Issuing Organisation</label>
                <input
                  className="input-field"
                  placeholder="ORGANISATION"
                  value={form.organisation}
                  onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Issue Date</label>
                <input
                  className="input-field"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>

            {/* Issuer wallet */}
            <div>
              <label className="input-label">
                Issuer Wallet Address{" "}
                <span
                  title="The public Ethereum address of the institution that issued the certificate"
                  style={{ cursor: "help", fontSize: "0.75rem" }}
                >
                  ⓘ
                </span>
              </label>
              <input
                className="input-field"
                placeholder="0x..."
                value={form.issuerAddress}
                onChange={(e) => setForm({ ...form, issuerAddress: e.target.value })}
              />
            </div>

            <button
              className="btn-primary"
              onClick={verifyCertificate}
              disabled={status === "verifying"}
              style={{ width: "100%", fontSize: "1rem", padding: "1rem" }}
            >
              {status === "verifying" ? "Checking Blockchain..." : "Verify Certificate"}
            </button>
          </div>

          {/* Valid */}
          {status === "valid" && (
            <div
              style={{
                marginTop: "1.5rem",
                border: "3px solid #000",
                padding: "1.5rem",
                backgroundColor: "#FFDD00",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                ✔ Certificate is Valid
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                Matched 1 record on-chain
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  border: "3px solid #000",
                  padding: "0.75rem",
                  backgroundColor: "#fff",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                <span>HASH</span>
                <span style={{ wordBreak: "break-all" }}>
                  {certHash ? `${certHash.slice(0, 10)}...${certHash.slice(-6)}` : ""}
                </span>
                <span>ISSUED ON</span>
                <span>{issuedAt}</span>
              </div>
            </div>
          )}

          {/* Invalid */}
          {status === "invalid" && (
            <div
              style={{
                marginTop: "1.5rem",
                border: "3px solid #000",
                borderLeft: "6px solid #000",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                ✕ Certificate Not Found
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.6 }}>
                No matching record found in the ledger. The details may be incorrect or
                this certificate was never issued on-chain.
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div
              style={{
                marginTop: "1.5rem",
                border: "3px solid #000",
                borderLeft: "6px solid #000",
                padding: "1rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              ✕ Network error. Check your connection and try again.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div
            style={{
              backgroundColor: "#FFDD00",
              border: "4px solid #000",
              boxShadow: "4px 4px 0px #000",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Verification Stamp
            </div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.6, margin: "0 0 1rem 0" }}>
              Every certificate on CertChain is cryptographically signed and immutable.
            </p>
            <div
              style={{
                border: "3px solid #000",
                backgroundColor: "#fff",
                padding: "0.5rem 1rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              TRUTH 01
            </div>
          </div>

          <div className="card">
            {[
              {
                icon: "◈",
                title: "SHA-256 Hashing",
                body: "Certificate data is hashed before hitting the chain.",
              },
              {
                icon: "◎",
                title: "Immutable Record",
                body: "Once written, no one can alter or delete the entry.",
              },
            ].map((item) => (
              <div key={item.title} style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.6875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.icon} {item.title}
                </div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}