"use client";

import { useState } from "react";

export default function LeadForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "El Dorado landing page" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="text-[#C9A96E] text-xs tracking-[0.24em] uppercase mb-2"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Access Sent
        </div>
        <p className="text-white text-base" style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}>
          Check your inbox — the guide is on its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row border border-[#C9A96E]/40">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-transparent px-6 py-4 text-white text-sm placeholder-[#555] outline-none border-b sm:border-b-0 sm:border-r border-[#C9A96E]/40"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#C9A96E] text-[#0a0a0a] text-[11px] font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-white transition-colors duration-300 disabled:opacity-60 whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {status === "loading" ? "Sending…" : "Get Access →"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-center text-xs text-red-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
