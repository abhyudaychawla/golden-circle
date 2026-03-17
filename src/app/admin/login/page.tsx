"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
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
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,184,65,0.10),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative w-full max-w-sm px-6">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image
            src="/TGC_New.jpeg"
            alt="Golden Circle Logo"
            width={52}
            height={52}
            className="h-13 w-13 rounded-full border border-white/10 object-cover"
          />
          <div className="text-center">
            <div className="text-base font-semibold tracking-[0.02em] text-white">
              Golden Circle
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#f5b841]">
              Admin Access
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.4)]">
          <h1 className="mb-1 text-xl font-semibold text-white">Sign in</h1>
          <p className="mb-6 text-sm text-zinc-500">
            Restricted to authorised admins only.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-[#f5b841]/40 focus:ring-1 focus:ring-[#f5b841]/20"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-[#f5b841]/40 focus:ring-1 focus:ring-[#f5b841]/20"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#f5b841] py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffd166] disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
