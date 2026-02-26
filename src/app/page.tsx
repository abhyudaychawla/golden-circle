import Image from "next/image";

const DISCORD_LINK = "https://discord.gg/NcwvUeHN";
const INSTAGRAM_LINK = "https://www.instagram.com/thegoldencircleig?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background: glows + grid + noise */}
      <div className="pointer-events-none absolute inset-0">
        {/* Glow blobs */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/12 blur-3xl" />
        <div className="absolute top-40 right-[-140px] h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.25) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-8">
        <nav className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <Image
      src="/TGC_New.jpeg"
      alt="Golden Circle Logo"
      width={40}
      height={40}
      className="h-10 w-10 rounded-full object-contain"
    />
    <div className="leading-tight">
      <div className="font-semibold tracking-tight text-slate-100">
        Golden Circle
      </div>
      <div className="text-xs text-slate-400">
        El Dorado
      </div>
    </div>
  </div>

  <div className="hidden items-center gap-3 md:flex">
  <a
    href={INSTAGRAM_LINK}
    target="_blank"
    rel="noreferrer"
    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
  >
    Instagram
  </a>

  <a
    href={DISCORD_LINK}
    target="_blank"
    rel="noreferrer"
    className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-yellow-300"
  >
    Join Discord
  </a>
</div>
</nav>

        {/* Hero */}
        <section className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Rules-based • Risk-managed • Community
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-6xl">
              The Golden Circle.
            <span className="block text-yellow-300">
              Powered by El Dorado.
            </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              The Golden Circle is a clean, repeatable system for gold (XAUUSD / GC):
              setups, risk rules, and accountability — so you trade like a pro, not on impulse.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={DISCORD_LINK}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(250,204,21,0.25)] hover:bg-yellow-300"
              >
                Join the Golden Circle
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>

              <a
                href={INSTAGRAM_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur hover:bg-white/10"
              >
                Follow on Instagram
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Session structure</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Risk checklist</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Recaps + journaling</span>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Educational content only. Trading involves risk. Not financial advice.
            </p>
          </div>

          {/* Right: logo + terminal card */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">El Dorado Terminal</div>
                <div className="text-xs text-slate-400">XAUUSD</div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs text-slate-400">Bias</div>
                  <div className="mt-2 text-2xl font-semibold text-yellow-300">BULLISH</div>
                  <div className="mt-1 text-xs text-slate-400">Confidence: 72/100</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs text-slate-400">Risk Mode</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-100">DISCIPLINED</div>
                  <div className="mt-1 text-xs text-slate-400">Rules + max loss limits</div>
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Checklist</span>
                    <span>Updated: 2m ago</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span>Trend + level aligned</span>
                      <span className="text-emerald-300">Ready</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span>Entry trigger confirmed</span>
                      <span className="text-yellow-300">Watch</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span>Invalidation + size defined</span>
                      <span className="text-slate-200">Set</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile buttons */}
            <div className="flex gap-3 md:hidden">
              <a
                href={DISCORD_LINK}
                className="flex-1 rounded-2xl bg-yellow-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-yellow-300"
              >
                Join Discord
              </a>
              <a
                href={INSTAGRAM_LINK}
                className="flex-1 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-center text-sm font-semibold hover:bg-white/10"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}