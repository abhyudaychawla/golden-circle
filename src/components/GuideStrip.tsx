"use client";

import { useState } from "react";

const sans = "var(--font-inter), sans-serif";

export default function GuideStrip() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "guide-strip" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 py-2">
        <span className="text-[#C9A96E] text-sm">✦</span>
        <p className="text-[#8A95A5] text-sm" style={{ fontFamily: sans }}>
          Guide on its way — check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 w-full bg-transparent border border-[#2A2A2A] text-white text-sm
                   px-5 py-3 placeholder-[#444] focus:outline-none focus:border-[#C9A96E]/50
                   transition-colors duration-300"
        style={{ fontFamily: sans }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex-shrink-0 border border-[#C9A96E]/60 text-[#C9A96E] text-[11px] font-medium
                   tracking-[0.22em] uppercase px-7 py-3
                   hover:bg-[#C9A96E] hover:text-[#0a0a0a] hover:border-[#C9A96E]
                   transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
        style={{ fontFamily: sans }}
      >
        {status === "loading" ? "Sending..." : "Get Free Guide →"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs sm:hidden" style={{ fontFamily: sans }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
