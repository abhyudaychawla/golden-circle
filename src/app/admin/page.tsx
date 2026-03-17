"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const adminStats = [
  { label: "Total Members", value: "247", change: "+12 this month", up: true },
  { label: "Active Subscribers", value: "219", change: "+8 this month", up: true },
  { label: "MRR", value: "$4,380", change: "+6.2% vs last month", up: true },
  { label: "Churn Rate", value: "3.2%", change: "-0.4% vs last month", up: false },
];

const recentMembers = [
  { name: "Alex Martinez", email: "alex@email.com", joined: "Mar 14, 2026", plan: "Elite", status: "active" },
  { name: "Jordan Kim", email: "jordan@email.com", joined: "Mar 12, 2026", plan: "Elite", status: "active" },
  { name: "Marcus Thompson", email: "marcus@email.com", joined: "Mar 10, 2026", plan: "Basic", status: "active" },
  { name: "Sarah Chen", email: "sarah@email.com", joined: "Mar 8, 2026", plan: "Elite", status: "active" },
  { name: "Ryan Patel", email: "ryan@email.com", joined: "Mar 5, 2026", plan: "Basic", status: "churned" },
];

type Tab = "overview" | "members" | "alerts" | "market";

type Alert = {
  id: string;
  pair: string;
  direction: string;
  entry: string;
  sl: string;
  tp: string;
  time: string;
  status: string;
};

type MarketData = {
  bias: string;
  checklist: string;
  riskState: string;
  notes: string;
  featuredPost: string;
};

const BIAS_OPTIONS = ["Bullish", "Bearish", "Neutral"];
const RISK_OPTIONS = ["Controlled", "Elevated", "High"];
const PAIR_OPTIONS = ["XAUUSD", "GC"];
const emptyAlertForm = { pair: "XAUUSD", direction: "Long", entry: "", sl: "", tp: "" };

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");

  const [market, setMarket] = useState<MarketData>({
    bias: "Bullish",
    checklist: "2 / 3 conditions met",
    riskState: "Controlled",
    notes: "",
    featuredPost: "",
  });
  const [marketLoaded, setMarketLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function loadMarket() {
    if (marketLoaded) return;
    const res = await fetch("/api/admin/market");
    if (res.ok) {
      const data = await res.json();
      setMarket(data);
      setMarketLoaded(true);
    }
  }

  async function saveMarket() {
    setSaving(true);
    await fetch("/api/admin/market", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(market),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  // ── Alerts ──────────────────────────────────────────────
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsLoaded, setAlertsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alertForm, setAlertForm] = useState(emptyAlertForm);
  const [submitting, setSubmitting] = useState(false);

  async function loadAlerts() {
    if (alertsLoaded) return;
    const res = await fetch("/api/admin/alerts");
    if (res.ok) {
      setAlerts(await res.json());
      setAlertsLoaded(true);
    }
  }

  async function submitAlert(e: { preventDefault: () => void }) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/admin/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alertForm),
    });
    if (res.ok) {
      const created = await res.json();
      setAlerts((prev) => [created, ...prev]);
      setAlertForm(emptyAlertForm);
      setShowForm(false);
    }
    setSubmitting(false);
  }

  async function closeAlert(id: string) {
    await fetch("/api/admin/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "closed" }),
    });
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "closed" } : a)));
  }

  // ── Auth ─────────────────────────────────────────────────
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,184,65,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,11,0.3),rgba(10,10,11,0.92)_30%,rgba(10,10,11,1))]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/TGC_New.jpeg"
              alt="Golden Circle Logo"
              width={42}
              height={42}
              className="h-10 w-10 rounded-full border border-white/10 object-cover"
            />
            <div>
              <div className="text-sm font-semibold tracking-[0.02em] text-white">
                Golden Circle
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#f5b841]">
                Admin
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              ← Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-8">
        {/* Page title */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#f5b841]/20 bg-[#f5b841]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f5b841]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b841]" />
            Dashboard
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Manage members, trade alerts, and community performance.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[20px] border border-white/8 bg-white/[0.03] p-5"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {stat.label}
              </div>
              <div className="mt-3 text-2xl font-semibold text-white">
                {stat.value}
              </div>
              <div
                className={`mt-1.5 text-xs font-medium ${
                  stat.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-white/8 bg-white/[0.02] p-1">
          {(["overview", "members", "alerts", "market"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                tab === t
                  ? "bg-[#f5b841] text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue chart placeholder */}
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    Monthly Revenue
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white">$4,380</div>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  +6.2%
                </span>
              </div>
              <div className="relative h-40 overflow-hidden rounded-xl border border-white/5 bg-[#09090b]">
                <svg viewBox="0 0 400 160" className="h-full w-full" fill="none">
                  <path
                    d="M0 120 L50 110 L100 105 L150 95 L200 88 L250 78 L300 70 L350 55 L400 48"
                    stroke="#f5b841"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0 120 L50 110 L100 105 L150 95 L200 88 L250 78 L300 70 L350 55 L400 48 L400 160 L0 160 Z"
                    fill="url(#goldGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5b841" />
                      <stop offset="100%" stopColor="#f5b841" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-zinc-600">
                {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Member growth */}
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    Member Growth
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white">247 total</div>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  +12 this month
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Elite Plan", count: 171, pct: 69 },
                  { label: "Basic Plan", count: 76, pct: 31 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-zinc-300">{row.label}</span>
                      <span className="text-zinc-500">{row.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-[#f5b841]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "New (30d)", value: "12" },
                  { label: "Churned (30d)", value: "4" },
                  { label: "Retention", value: "96.8%" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-3 text-center">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                      {item.label}
                    </div>
                    <div className="mt-1.5 text-lg font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Members tab */}
        {tab === "members" && (
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="text-sm font-semibold text-white">Recent Members</div>
              <div className="text-xs text-zinc-500">247 total</div>
            </div>
            <div className="divide-y divide-white/5">
              {recentMembers.map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
                      {member.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {member.name}
                      </div>
                      <div className="text-xs text-zinc-500">{member.email}</div>
                    </div>
                  </div>

                  <div className="hidden items-center gap-6 md:flex">
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">Joined</div>
                      <div className="text-sm text-zinc-300">{member.joined}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">Plan</div>
                      <div className="text-sm text-zinc-300">{member.plan}</div>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        member.status === "active"
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border border-red-500/20 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts tab */}
        {tab === "alerts" && (
          <div
            className="space-y-4"
            ref={(el) => { if (el) loadAlerts(); }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Trade Alerts</div>
              <button
                onClick={() => setShowForm((v) => !v)}
                className="rounded-xl bg-[#f5b841] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffd166]"
              >
                {showForm ? "✕ Cancel" : "+ New Alert"}
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={submitAlert}
                className="rounded-[20px] border border-[#f5b841]/20 bg-[#f5b841]/5 p-5"
              >
                <div className="mb-4 text-sm font-semibold text-white">New Trade Alert</div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">Pair</label>
                    <select
                      value={alertForm.pair}
                      onChange={(e) => setAlertForm((f) => ({ ...f, pair: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0b] px-3 py-2 text-sm text-white outline-none focus:border-[#f5b841]/40"
                    >
                      {PAIR_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">Direction</label>
                    <select
                      value={alertForm.direction}
                      onChange={(e) => setAlertForm((f) => ({ ...f, direction: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0b] px-3 py-2 text-sm text-white outline-none focus:border-[#f5b841]/40"
                    >
                      <option value="Long">Long</option>
                      <option value="Short">Short</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">Entry</label>
                    <input required type="text" value={alertForm.entry} onChange={(e) => setAlertForm((f) => ({ ...f, entry: e.target.value }))} placeholder="2318" className="w-full rounded-xl border border-white/10 bg-[#0a0a0b] px-3 py-2 text-sm text-white outline-none focus:border-[#f5b841]/40" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">Stop Loss</label>
                    <input required type="text" value={alertForm.sl} onChange={(e) => setAlertForm((f) => ({ ...f, sl: e.target.value }))} placeholder="2298" className="w-full rounded-xl border border-white/10 bg-[#0a0a0b] px-3 py-2 text-sm text-white outline-none focus:border-[#f5b841]/40" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-zinc-500">Take Profit</label>
                    <input required type="text" value={alertForm.tp} onChange={(e) => setAlertForm((f) => ({ ...f, tp: e.target.value }))} placeholder="2360" className="w-full rounded-xl border border-white/10 bg-[#0a0a0b] px-3 py-2 text-sm text-white outline-none focus:border-[#f5b841]/40" />
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="mt-4 rounded-xl bg-[#f5b841] px-6 py-2 text-sm font-semibold text-black transition hover:bg-[#ffd166] disabled:opacity-50">
                  {submitting ? "Posting…" : "Post Alert"}
                </button>
              </form>
            )}

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03]">
              {alerts.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-zinc-500">
                  No alerts yet. Post your first alert above.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${alert.direction === "Long" ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300" : "border border-red-500/25 bg-red-500/10 text-red-400"}`}>
                          {alert.direction === "Long" ? "▲" : "▼"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {alert.pair}{" "}
                            <span className={alert.direction === "Long" ? "text-emerald-400" : "text-red-400"}>
                              {alert.direction}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500">
                            {new Date(alert.time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm md:gap-6">
                        <div className="text-center">
                          <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Entry</div>
                          <div className="text-zinc-300">{alert.entry}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">SL</div>
                          <div className="text-red-400">{alert.sl}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">TP</div>
                          <div className="text-emerald-400">{alert.tp}</div>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${alert.status === "active" ? "border border-[#f5b841]/25 bg-[#f5b841]/10 text-[#f5b841]" : "border border-white/10 bg-white/[0.03] text-zinc-500"}`}>
                          {alert.status}
                        </span>
                        {alert.status === "active" && (
                          <button onClick={() => closeAlert(alert.id)} className="text-xs text-zinc-600 transition hover:text-zinc-300">
                            Close
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Market tab */}
        {tab === "market" && (
          <div
            className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6"
            ref={(el) => { if (el) loadMarket(); }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Daily Update</div>
                <h2 className="mt-1 text-lg font-semibold text-white">Market Bias</h2>
              </div>
              {saved && (
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Saved
                </span>
              )}
            </div>

            <div className="space-y-5">
              {/* Bias */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Bias
                </label>
                <div className="flex gap-2">
                  {BIAS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setMarket((m) => ({ ...m, bias: opt }))}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        market.bias === opt
                          ? opt === "Bullish"
                            ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                            : opt === "Bearish"
                            ? "border-red-500/30 bg-red-500/15 text-red-400"
                            : "border-white/20 bg-white/[0.08] text-zinc-300"
                          : "border-white/8 bg-white/[0.02] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk State */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Risk State
                </label>
                <div className="flex gap-2">
                  {RISK_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setMarket((m) => ({ ...m, riskState: opt }))}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        market.riskState === opt
                          ? opt === "Controlled"
                            ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                            : opt === "Elevated"
                            ? "border-[#f5b841]/30 bg-[#f5b841]/10 text-[#f5b841]"
                            : "border-red-500/30 bg-red-500/15 text-red-400"
                          : "border-white/8 bg-white/[0.02] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Checklist Status
                </label>
                <input
                  type="text"
                  value={market.checklist}
                  onChange={(e) => setMarket((m) => ({ ...m, checklist: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#f5b841]/40 focus:ring-1 focus:ring-[#f5b841]/20"
                  placeholder="e.g. 2 / 3 conditions met"
                />
              </div>

              {/* Featured Instagram Post */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Featured Instagram Post URL
                </label>
                <input
                  type="url"
                  value={market.featuredPost}
                  onChange={(e) => setMarket((m) => ({ ...m, featuredPost: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#f5b841]/40 focus:ring-1 focus:ring-[#f5b841]/20"
                  placeholder="https://www.instagram.com/p/..."
                />
                <p className="mt-1.5 text-xs text-zinc-600">Paste any Instagram post URL — it will appear on the landing page.</p>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Notes (private — not shown publicly)
                </label>
                <textarea
                  value={market.notes}
                  onChange={(e) => setMarket((m) => ({ ...m, notes: e.target.value }))}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#f5b841]/40 focus:ring-1 focus:ring-[#f5b841]/20"
                  placeholder="Internal notes for today's session…"
                />
              </div>

              <button
                onClick={saveMarket}
                disabled={saving}
                className="rounded-xl bg-[#f5b841] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffd166] disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save & Publish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
