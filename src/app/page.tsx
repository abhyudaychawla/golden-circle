import Image from "next/image";
import fs from "fs";
import path from "path";
import { getActiveSession } from "@/lib/marketSession";
import { LivePrice } from "@/components/LivePrice";

const DISCORD_LINK = "https://discord.gg/NcwvUeHN";
const INSTAGRAM_LINK =
  "https://www.instagram.com/thegoldencircleig?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const WHOP_LINK = "https://whop.com/joined/thegoldencircle/";

const features = [
  {
    title: "Session Structure",
    text: "Know exactly when to trade and where volatility is most likely to appear.",
  },
  {
    title: "Risk Checklist",
    text: "A fixed pre-trade process designed to reduce emotional decisions.",
  },
  {
    title: "Recaps + Journaling",
    text: "Review trades, tighten execution, and improve with consistency.",
  },
];

const stats = [
  { label: "Win Rate", value: "72%" },
  { label: "Risk / Reward", value: "1:3.2" },
  { label: "Trades / Week", value: "5–8" },
  { label: "Avg. Monthly Growth", value: "+18.4%" },
];

const testimonials = [
  {
    name: "Alex M.",
    quote: "The structure changed how I trade gold. I stopped forcing setups.",
  },
  {
    name: "Jordan K.",
    quote: "The risk rules alone saved my account from overtrading.",
  },
  {
    name: "Marcus T.",
    quote: "It feels like a framework, not random callouts.",
  },
];

type MarketData = {
  bias: string;
  checklist: string;
  riskState: string;
  notes: string;
  featuredPost: string;
};

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

function readMarketData(): MarketData {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src/data/market.json"), "utf-8")
    );
  } catch {
    return { bias: "Bullish", checklist: "–", riskState: "Controlled", notes: "", featuredPost: "" };
  }
}

function readAlerts(): Alert[] {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src/data/alerts.json"), "utf-8")
    );
  } catch {
    return [];
  }
}

export default function Home() {
  const market = readMarketData();
  const alerts = readAlerts();
  const session = getActiveSession();
  const isBullish = market.bias === "Bullish";
  const isBearish = market.bias === "Bearish";
  const activeAlert = alerts.find((a) => a.status === "active") ?? null;
  const recentAlerts = alerts.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,184,65,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
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
              <div className="text-sm font-semibold tracking-[0.02em] text-white">Golden Circle</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">El Dorado</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#strategy" className="transition hover:text-white">Strategy</a>
            <a href="#alerts" className="transition hover:text-white">Alerts</a>
            <a href="#framework" className="transition hover:text-white">Framework</a>
            <a href="#community" className="transition hover:text-white">Community</a>
            <a href="#join" className="transition hover:text-white">Join</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Instagram
            </a>
            <a
              href={WHOP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#f5b841] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#ffd166]"
            >
              Join The Golden Circle
            </a>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8">

        {/* ── HERO ── */}
        <section id="strategy" className="py-16 md:py-24">

          {/* Live alert banner */}
          {activeAlert && (
            <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#f5b841]/25 bg-[#f5b841]/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-[#f5b841] shadow-[0_0_8px_rgba(245,184,65,0.8)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5b841]">Live Alert</span>
                <span className="text-sm font-semibold text-white">
                  {activeAlert.pair}{" "}
                  <span className={activeAlert.direction === "Long" ? "text-emerald-400" : "text-red-400"}>
                    {activeAlert.direction}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-5 text-sm">
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1.5">Entry</span>
                  <span className="text-zinc-200">{activeAlert.entry}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1.5">SL</span>
                  <span className="text-red-400">{activeAlert.sl}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider mr-1.5">TP</span>
                  <span className="text-emerald-400">{activeAlert.tp}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b841]/20 bg-[#f5b841]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f5b841]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5b841]" />
                The Strategy Behind
              </div>

              <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white md:text-7xl">
                The <span className="text-[#f5b841]">Golden Circle</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
                A battle-tested framework for trading gold with structure, discipline, and accountability. Built to help traders remove guesswork and execute with consistency.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHOP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#f5b841] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(245,184,65,0.18)] transition hover:bg-[#ffd166]"
                >
                  Join via Whop
                </a>
                <a
                  href={DISCORD_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  Join Discord
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{stat.label}</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-zinc-600">
                Educational content only. Trading involves risk. Not financial advice.
              </p>
            </div>

            {/* Right — terminal */}
            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(245,184,65,0.16),transparent_65%)] blur-2xl" />

              <div className="relative rounded-[28px] border border-[#f5b841]/20 bg-[#111113] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_80px_rgba(0,0,0,0.55)]">
                <div className="rounded-[20px] border border-white/8 bg-[#0d0d0f] p-5">

                  {/* Terminal header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">El Dorado Terminal</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">XAUUSD</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-sm font-semibold text-[#f5b841]"><LivePrice /></span>
                      </div>
                    </div>
                    <div className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      isBullish ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : isBearish ? "border-red-500/20 bg-red-500/10 text-red-400"
                      : "border-white/10 bg-white/[0.04] text-zinc-400"
                    }`}>
                      Bias: {market.bias}
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/8 bg-[#09090b] p-4">
                    <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                      <span>Market Structure</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Live
                      </span>
                    </div>

                    <div className="relative h-44 rounded-xl border border-white/5 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]">
                      <svg viewBox="0 0 600 180" className="absolute inset-0 h-full w-full" fill="none">
                        <defs>
                          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f5b841" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#f5b841" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M20 130 L70 115 L120 128 L180 85 L230 95 L280 60 L335 72 L390 45 L455 58 L515 28 L580 38"
                          stroke="#f5b841"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 130 L70 115 L120 128 L180 85 L230 95 L280 60 L335 72 L390 45 L455 58 L515 28 L580 38 L580 180 L20 180 Z"
                          fill="url(#chartFill)"
                        />
                        <rect x="360" y="28" width="110" height="75" rx="8" fill="rgba(245,184,65,0.06)" stroke="rgba(245,184,65,0.28)" strokeDasharray="4 3" />
                        <text x="368" y="46" fontSize="8" fill="rgba(245,184,65,0.6)" fontFamily="monospace">Premium Zone</text>
                      </svg>
                    </div>

                    {/* 3 stat pills */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-600">Session</div>
                        <div className="mt-1 text-xs font-medium text-white leading-tight">{session}</div>
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-600">Checklist</div>
                        <div className="mt-1 text-xs font-medium text-white leading-tight">{market.checklist}</div>
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-600">Risk</div>
                        <div className={`mt-1 text-xs font-medium leading-tight ${
                          market.riskState === "Controlled" ? "text-emerald-300"
                          : market.riskState === "Elevated" ? "text-[#f5b841]"
                          : "text-red-400"
                        }`}>{market.riskState}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 hidden w-40 rounded-2xl border border-white/10 bg-[#111113]/95 p-4 shadow-2xl backdrop-blur md:block">
                <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">R:R Minimum</div>
                <div className="mt-1.5 text-2xl font-semibold text-white">1:3.2</div>
                <div className="mt-0.5 text-xs text-zinc-500">Framework target</div>
              </div>

              <div className="absolute -right-4 top-8 hidden w-44 rounded-2xl border border-[#f5b841]/20 bg-[#121214]/95 p-4 shadow-2xl backdrop-blur md:block">
                <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Win Rate</div>
                <div className="mt-1.5 text-2xl font-semibold text-[#f5b841]">72%</div>
                <div className="mt-0.5 text-xs text-zinc-500">Rules-based execution</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIVE ALERTS ── */}
        {recentAlerts.length > 0 && (
          <section id="alerts" className="py-16 md:py-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5b841]/20 bg-[#f5b841]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f5b841]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f5b841]" />
                  Trade Alerts
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Latest <span className="text-[#f5b841]">Callouts</span>
                </h2>
              </div>
              <a
                href={WHOP_LINK}
                target="_blank"
                rel="noreferrer"
                className="hidden text-xs text-zinc-500 transition hover:text-white md:block"
              >
                Join for full access →
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-[22px] border p-5 ${
                    alert.status === "active"
                      ? "border-[#f5b841]/20 bg-[#f5b841]/5"
                      : "border-white/8 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        alert.direction === "Long"
                          ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                          : "border border-red-500/25 bg-red-500/10 text-red-400"
                      }`}>
                        {alert.direction === "Long" ? "▲" : "▼"}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white">{alert.pair}</span>
                        <span className={`ml-1.5 text-sm font-semibold ${alert.direction === "Long" ? "text-emerald-400" : "text-red-400"}`}>
                          {alert.direction}
                        </span>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      alert.status === "active"
                        ? "border border-[#f5b841]/25 bg-[#f5b841]/10 text-[#f5b841]"
                        : "border border-white/8 text-zinc-600"
                    }`}>
                      {alert.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/6 bg-black/20 p-3">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-zinc-600">Entry</div>
                      <div className="mt-1 text-sm font-semibold text-zinc-200">{alert.entry}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-zinc-600">SL</div>
                      <div className="mt-1 text-sm font-semibold text-red-400">{alert.sl}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-zinc-600">TP</div>
                      <div className="mt-1 text-sm font-semibold text-emerald-400">{alert.tp}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-zinc-600">
                    {new Date(alert.time).toLocaleString("en-US", {
                      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── FRAMEWORK ── */}
        <section id="framework" className="py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5b841]/20 bg-[#f5b841]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f5b841]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b841]" />
              Framework
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              A serious process for{" "}
              <span className="text-[#f5b841]">serious traders</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
              Everything inside the Golden Circle is designed around repeatability, not hype. The goal is to create structure before execution.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((item) => (
              <div
                key={item.title}
                className="group rounded-[24px] border border-white/8 bg-white/[0.03] p-6 transition hover:border-[#f5b841]/25 hover:bg-white/[0.04]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f5b841]/25 bg-[#f5b841]/10 text-[#f5b841]">●</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMMUNITY ── */}
        <section id="community" className="py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5b841]/20 bg-[#f5b841]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f5b841]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5b841]" />
                Community
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Trade with a community{" "}
                <span className="text-[#f5b841]">of disciplined traders</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
                Inside the Golden Circle you get accountability, insights, and real feedback from traders focused on gold.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-500">
                {["XAUUSD", "GC", "Structure", "Risk Rules", "Recaps"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">{tag}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="text-sm font-semibold text-white">{item.name}</div>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">"{item.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM ── */}
        {market.featuredPost ? (
          <section className="py-16 md:py-20">
            <div className="flex flex-col gap-8 rounded-[28px] border border-white/8 bg-white/[0.02] p-8 md:flex-row md:items-center md:p-10">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5b841]/20 bg-[#f5b841]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f5b841]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f5b841]" />
                  Latest Post
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Follow <span className="text-[#f5b841]">@thegoldencircleig</span>
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                  Daily market insights, trade recaps, and community highlights on Instagram.
                </p>
                <a
                  href={market.featuredPost}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  View on Instagram →
                </a>
              </div>

              <a
                href={market.featuredPost}
                target="_blank"
                rel="noreferrer"
                className="flex w-full max-w-[240px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#111113] transition hover:border-[#f5b841]/30"
              >
                <div className="flex items-center gap-2.5 border-b border-white/5 px-4 py-3">
                  <Image src="/TGC_New.jpeg" alt="TGC" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
                  <span className="text-xs font-medium text-zinc-300">thegoldencircleig</span>
                </div>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="text-2xl">📸</div>
                  <div className="mt-2 text-sm font-medium text-zinc-300">View Post</div>
                  <div className="mt-0.5 text-xs text-zinc-600">Tap to open Instagram</div>
                </div>
              </a>
            </div>
          </section>
        ) : null}

        {/* ── CTA ── */}
        <section id="join" className="py-16 md:py-24">
          <div className="rounded-[32px] border border-[#f5b841]/15 bg-[linear-gradient(180deg,rgba(245,184,65,0.06),rgba(255,255,255,0.02))] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#f5b841]">Ready To Join</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Build a more structured approach to trading gold.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                  Join the Golden Circle for structure, risk rules, trade reviews, and a community focused on execution instead of impulse.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href={WHOP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#f5b841] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ffd166]"
                >
                  Join via Whop
                </a>
                <a
                  href={DISCORD_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Join Discord
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Follow Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
