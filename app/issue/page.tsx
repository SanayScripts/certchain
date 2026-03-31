"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

type Status = "idle" | "connecting" | "issuing" | "success" | "error";

export default function IssuePage() {
  const [form, setForm] = useState({
    name: "",
    course: "",
    organisation: "",
    date: "",
  });
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [certHash, setCertHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it.");
      return;
    }
    setStatus("connecting");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setWalletAddress(await signer.getAddress());
      setStatus("idle");
    } catch {
      setStatus("idle");
    }
  }

  async function issueCertificate() {
    if (!walletAddress) {
      alert("Connect your wallet first.");
      return;
    }
    if (!form.name || !form.course || !form.organisation || !form.date) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("issuing");
    setErrorMsg(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Hash the certificate data deterministically
      const raw = JSON.stringify({
        name: form.name.trim().toLowerCase(),
        course: form.course.trim().toLowerCase(),
        organisation: form.organisation.trim().toLowerCase(),
        date: form.date,
      });
      const hash = ethers.keccak256(ethers.toUtf8Bytes(raw)) as `0x${string}`;
      setCertHash(hash);

      const tx = await contract.issue(hash);
      await tx.wait();

      setTxHash(tx.hash);
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transaction failed.";
      setErrorMsg(msg.includes("Already issued") ? "This certificate has already been issued." : "Transaction failed. Check MetaMask and try again.");
      setStatus("error");
    }
  }

  return (
    <div style={{ padding: "3rem 2rem", maxWidth: "720px", margin: "0 auto" }}>
      {/* Page title */}
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          marginBottom: "0.25rem",
        }}
      >
        ISSUE A CERTIFICATE
      </h1>
      <div style={{ borderTop: "4px solid #000", marginBottom: "3rem" }} />

      {/* Form card */}
      <div className="card" style={{ padding: "2rem" }}>
        {/* Wallet connect */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "2rem",
          }}
        >
          <button
            className="btn-secondary"
            onClick={connectWallet}
            style={{ fontSize: "0.75rem" }}
          >
            {walletAddress
              ? `✔ ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : status === "connecting"
              ? "Connecting..."
              : "⬡ Connect Wallet"}
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label className="input-label">Recipient Name</label>
            <input
              className="input-field"
              placeholder="ENTER FULL NAME"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="input-label">Course / Credential Title</label>
            <input
              className="input-field"
              placeholder="E.G. ADVANCED BLOCKCHAIN ARCHITECTURE"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="input-label">Issuing Organisation</label>
              <input
                className="input-field"
                placeholder="CERTCHAIN LABS"
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

          <button
            className="btn-primary"
            onClick={issueCertificate}
            disabled={status === "issuing"}
            style={{ width: "100%", fontSize: "1rem", padding: "1rem" }}
          >
            {status === "issuing" ? "Writing to Blockchain..." : "Issue Certificate"}
          </button>
        </div>

        {/* Success state */}
        {status === "success" && (
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div
              style={{
                border: "3px solid #000",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "#FFDD00",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>✔</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Certificate Issued Successfully
              </span>
            </div>
            <div
              style={{
                border: "3px solid #000",
                padding: "0.75rem 1rem",
                backgroundColor: "#111",
                color: "#FFDD00",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                wordBreak: "break-all",
              }}
            >
              <span style={{ color: "#fff" }}>CERT_HASH: </span>{certHash}
              <br />
              <span style={{ color: "#fff" }}>TX_HASH: </span>{txHash}
            </div>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div
            style={{
              marginTop: "1.5rem",
              border: "3px solid #000",
              borderLeft: "6px solid #000",
              padding: "0.75rem 1rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            ✕ {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}