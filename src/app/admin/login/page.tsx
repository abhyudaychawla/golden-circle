"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1521] flex items-center justify-center px-6">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.06),transparent_50%)]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
            <circle cx="24" cy="24" r="22" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="24" cy="24" r="14" stroke="#C9A96E" strokeWidth="1" fill="none" />
            <circle cx="24" cy="24" r="3" fill="#C9A96E" />
          </svg>
          <div className="text-center">
            <p
              className="text-[#C9A96E] text-xl font-light"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              Golden Circle
            </p>
            <p className="text-[#8A95A5] text-xs tracking-widest uppercase mt-1">Admin Access</p>
          </div>
        </div>

        <div className="bg-[#1B2A4A]/40 border border-[#C9A96E]/20 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <h1
            className="text-white text-2xl font-light mb-1"
            style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
          >
            Sign In
          </h1>
          <p className="text-[#8A95A5] text-sm mb-6">Restricted to authorised admins only.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#8A95A5] text-xs uppercase tracking-widest mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="username"
                className="w-full bg-[#1B2A4A] border border-[#C9A96E]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-[#8A95A5]/50 focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8A95A5] text-xs uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-[#1B2A4A] border border-[#C9A96E]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-[#8A95A5]/50 focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] text-[#1B2A4A] font-medium py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[#8A95A5] text-sm hover:text-[#C9A96E] transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
