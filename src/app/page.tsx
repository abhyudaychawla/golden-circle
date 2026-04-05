import AnimateIn from "@/components/AnimateIn";
import LeadForm from "@/components/LeadForm";

const serif = "var(--font-cormorant-garamond)";
const sans = "var(--font-inter)";

/* ─── DATA ───────────────────────────────────────────────────────── */

const stats = [
  { value: "2,185", label: "Sessions Analysed" },
  { value: "9.0",   label: "Years of NQ Data" },
  { value: "87.6%", label: "TP Rate – Aligned" },
  { value: "+5.2R", label: "Expectancy / Trade" },
  { value: "7.0",   label: "Course Modules" },
];

const whyCards = [
  {
    num: "01",
    title: "A Time-Defined Range",
    body: "No MR window. No overnight levels. No map for the day. Most traders enter sessions completely blind to the institutional delivery framework.",
  },
  {
    num: "02",
    title: "A Validated Filter Stack",
    body: "Cycle bias alone shifts TP rate by 48 percentage points. Without it, you're flipping coins with professional-sized positions.",
  },
  {
    num: "03",
    title: "9 Years of Research",
    body: "2,185 sessions. Every variable tested across bull, bear, crash, and recovery markets — no cherry-picking, no theory.",
  },
];

const modules = [
  { num: "01", category: "Foundation",       title: "The MR Range",         body: "The 1:30–6AM overnight window that generates every setup. Institutional delivery, range boundaries, quality filter." },
  { num: "02", category: "Primary Pattern",  title: "Sweep CSD",             body: "Change in State of Delivery via boundary sweep. The primary entry pattern. Two paths: body close (A) and wick confirmation (B)." },
  { num: "03", category: "Advanced Pattern", title: "EQ Rejection",          body: "Midpoint rejection — the highest R:R setup in the system. +5.28R expectancy vs +1.46R for standard sweeps." },
  { num: "04", category: "Edge Definition",  title: "The Filter Stack",      body: "Five sequenced filters: Cycle Bias → Range Size → FGV → Narrative → Time. Each eliminates a different class of losing trade." },
  { num: "05", category: "Execution",        title: "Entry & Exit",          body: "The 3-phase arm process. Stop loss at wick extreme. TP ladder: EQ → 1:30 open → opposite boundary." },
  { num: "06", category: "Proof",            title: "9-Year Statistics",     body: "2,185 NQ sessions. Every filter validated with real numbers — not theory. Year-by-year consistency across every market regime." },
  { num: "07", category: "Routine",          title: "Checklist & Mistakes",  body: "Pre-market routine, live entry checklist, and the 7 most common mistakes students make when learning this system." },
];

/* ─── HELPERS ────────────────────────────────────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-8 bg-[#C9A96E]/40" />
      <span
        className="text-[#C9A96E] text-[10px] tracking-[0.36em] uppercase"
        style={{ fontFamily: sans }}
      >
        {text}
      </span>
      <span className="h-px w-8 bg-[#C9A96E]/40" />
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/35 to-transparent" />
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section
        id="overview"
        className="relative min-h-screen flex flex-col items-center justify-center text-center
                   px-6 pt-32 pb-24 overflow-hidden bg-[#0a0a0a]"
      >
        {/* Radial ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[800px] h-[500px] rounded-full
                          bg-[#C9A96E]/[0.05] blur-[140px]" />
        </div>

        {/* Scattered star dots */}
        {(
          [[8,18],[90,12],[4,58],[95,50],[22,82],[80,75],[50,6],[30,92],[68,88],[14,42],[72,30],[42,70]] as [number,number][]
        ).map(([x, y], i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute w-px h-px rounded-full bg-[#C9A96E]"
            style={{ left: `${x}%`, top: `${y}%`, opacity: 0.2 + (i % 4) * 0.08 }}
          />
        ))}

        {/* Top gold hairline */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Overline — staggered hero animation */}
          <p
            className="animate-fade-in delay-100 text-[#C9A96E]/60 text-[10px] tracking-[0.42em] uppercase mb-10"
            style={{ fontFamily: sans }}
          >
            TCM Mean Reversion&nbsp;&nbsp;·&nbsp;&nbsp;Complete Student Guide
          </p>

          {/* Title block */}
          <div className="animate-fade-up delay-200">
            <h1
              className="text-white leading-[0.9]"
              style={{ fontFamily: serif, fontWeight: 600 }}
            >
              <span className="block text-[clamp(3.2rem,11vw,8.5rem)]">
                TGC El Dorado
              </span>
              <span
                className="block text-[clamp(2.6rem,8.5vw,6.5rem)] italic"
                style={{ fontWeight: 400, color: "#C9A96E" }}
              >
                Mean Reversion System
              </span>
            </h1>
          </div>

          {/* Decorative rule */}
          <div className="animate-fade-in delay-400 flex items-center justify-center gap-3 my-10">
            <span className="h-px w-14 bg-[#C9A96E]/35" />
            <span className="text-[#C9A96E]/50 text-sm">◆</span>
            <span className="h-px w-14 bg-[#C9A96E]/35" />
          </div>

          {/* Sub caption */}
          <p
            className="animate-fade-in delay-400 text-[#5A5A5A] text-[10px] tracking-[0.32em] uppercase mb-8"
            style={{ fontFamily: sans }}
          >
            From MR Range to Live Entry&nbsp;·&nbsp;All Concepts Explained&nbsp;·&nbsp;Backed by 9 Years of Data
          </p>

          {/* Asset pills */}
          <div className="animate-fade-up delay-500 flex flex-wrap justify-center gap-3 mb-14">
            {["NQ  Nasdaq Futures", "GC  Gold Futures", "ES  S&P 500 Futures"].map((pill) => (
              <span
                key={pill}
                className="border border-[#2A2A2A] text-[#666] text-[10px] tracking-[0.24em] uppercase
                           px-5 py-2.5 transition-colors duration-300 hover:border-[#C9A96E]/40 hover:text-[#C9A96E]"
                style={{ fontFamily: sans }}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#access"
              className="bg-[#C9A96E] text-[#0a0a0a] text-[11px] font-medium tracking-[0.24em] uppercase
                         px-10 py-4 hover:bg-white transition-colors duration-300"
              style={{ fontFamily: sans }}
            >
              Get Free Access →
            </a>
            <a
              href="#modules"
              className="border border-[#2E2E2E] text-[#888] text-[11px] tracking-[0.24em] uppercase
                         px-10 py-4 hover:border-[#C9A96E]/50 hover:text-white transition-all duration-300"
              style={{ fontFamily: sans }}
            >
              View Modules
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-in delay-800 mt-20 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: sans }}>
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-[#C9A96E] to-transparent" />
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══ STATS BAR ════════════════════════════════════════════════ */}
      <section id="statistics" className="bg-[#0d0d0d] py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-[#1C1C1C]">
            {stats.map((s, i) => (
              <AnimateIn key={s.label} delay={i * 80} className="px-6 py-4 text-center">
                <p
                  className="text-[#C9A96E] text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-none mb-2"
                  style={{ fontFamily: serif }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[#484848] text-[9px] tracking-[0.28em] uppercase"
                  style={{ fontFamily: sans }}
                >
                  {s.label}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══ WHY IT MATTERS ═══════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="mb-14">
              <SectionLabel text="Why It Matters." />
              <h2
                className="mt-8 text-white text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.06] max-w-2xl"
                style={{ fontFamily: serif, fontWeight: 600 }}
              >
                What everyone else{" "}
                <br className="hidden md:block" />
                is trading{" "}
                <em className="italic" style={{ color: "#C9A96E", fontWeight: 400 }}>
                  without.
                </em>
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1A1A1A]">
            {whyCards.map((card, i) => (
              <AnimateIn key={card.num} delay={i * 120} className="block">
                <div
                  className="group border-b md:border-b-0 md:border-r border-[#1A1A1A] last:border-r-0
                             p-10 relative overflow-hidden
                             transition-colors duration-300 hover:bg-[#0e0e0e]"
                >
                  {/* Hover gold top bar */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#C9A96E]/0
                                  group-hover:bg-[#C9A96E]/40 transition-colors duration-500" />
                  <p
                    className="text-[#C9A96E]/15 text-[5rem] font-light leading-none mb-8 select-none
                               group-hover:text-[#C9A96E]/25 transition-colors duration-300"
                    style={{ fontFamily: serif }}
                  >
                    {card.num}
                  </p>
                  <h3
                    className="text-white text-xl mb-4"
                    style={{ fontFamily: serif, fontWeight: 600 }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[#4E4E4E] text-sm leading-relaxed
                               group-hover:text-[#666] transition-colors duration-300"
                    style={{ fontFamily: sans, fontWeight: 300 }}
                  >
                    {card.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══ EVIDENCE ═════════════════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="mb-14">
              <SectionLabel text="The Evidence" />
              <h2
                className="mt-8 text-white text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.06]"
                style={{ fontFamily: serif, fontWeight: 600 }}
              >
                One filter.{" "}
                <br />
                <em className="italic" style={{ color: "#C9A96E", fontWeight: 400 }}>
                  48 percentage points.
                </em>
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            {/* VS badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                            w-10 h-10 items-center justify-center bg-[#0d0d0d] border border-[#282828]">
              <span className="text-[#444] text-[10px] tracking-widest" style={{ fontFamily: sans }}>
                VS
              </span>
            </div>

            {/* With TGC */}
            <AnimateIn direction="left">
              <div className="border-t-2 border-[#C9A96E] bg-[#0f0f0f] p-10 md:p-14 h-full">
                <p
                  className="text-[#C9A96E] text-[9px] tracking-[0.34em] uppercase mb-8"
                  style={{ fontFamily: sans }}
                >
                  With TGC System
                </p>
                <p
                  className="text-[#C9A96E] font-light leading-none mb-8
                             text-[clamp(4.5rem,12vw,7.5rem)]"
                  style={{ fontFamily: serif }}
                >
                  87.6%
                </p>
                <p
                  className="text-[#555] text-sm leading-relaxed"
                  style={{ fontFamily: sans, fontWeight: 300 }}
                >
                  TP rate when 8D and 1D cycle bias are aligned with your trade direction.
                  Confirmed in every year from 2017 to 2026 — bull, bear, crash, and recovery.
                </p>
              </div>
            </AnimateIn>

            {/* Without */}
            <AnimateIn delay={100}>
              <div className="border-t-2 border-[#7A2828] bg-[#0e0b0b] p-10 md:p-14 h-full">
                <p
                  className="text-[#7A2828] text-[9px] tracking-[0.34em] uppercase mb-8"
                  style={{ fontFamily: sans }}
                >
                  Without It
                </p>
                <p
                  className="text-[#7A3535] font-light leading-none mb-8
                             text-[clamp(4.5rem,12vw,7.5rem)]"
                  style={{ fontFamily: serif }}
                >
                  39.4%
                </p>
                <p
                  className="text-[#444] text-sm leading-relaxed"
                  style={{ fontFamily: sans, fontWeight: 300 }}
                >
                  TP rate when cycle and daily bias oppose your trade direction. Below coin-flip
                  probability. This is where most traders live — and wonder why nothing works.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══ MODULES ══════════════════════════════════════════════════ */}
      <section id="modules" className="bg-[#0a0a0a] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="mb-14">
              <SectionLabel text="Course Structure" />
              <h2
                className="mt-8 text-white text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.06]"
                style={{ fontFamily: serif, fontWeight: 600 }}
              >
                Seven modules.{" "}
                <br />
                <em className="italic" style={{ color: "#C9A96E", fontWeight: 400 }}>
                  One complete system.
                </em>
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#1A1A1A]">
            {modules.map((mod, i) => (
              <AnimateIn key={mod.num} delay={i * 60}>
                <div className="module-card border-b border-r border-[#1A1A1A] p-10 group
                               hover:bg-[#0e0e0e] transition-colors duration-300">
                  <div className="flex items-start gap-6">
                    <span
                      className="text-[#C9A96E]/18 text-5xl font-light leading-none flex-shrink-0
                                 select-none group-hover:text-[#C9A96E]/35 transition-colors duration-300"
                      style={{ fontFamily: serif }}
                    >
                      {mod.num}
                    </span>
                    <div>
                      <p
                        className="text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase mb-2"
                        style={{ fontFamily: sans }}
                      >
                        {mod.category}
                      </p>
                      <h3
                        className="text-white text-xl mb-3 group-hover:text-white transition-colors duration-300"
                        style={{ fontFamily: serif, fontWeight: 600 }}
                      >
                        {mod.title}
                      </h3>
                      <p
                        className="text-[#4A4A4A] text-sm leading-relaxed
                                   group-hover:text-[#666] transition-colors duration-300"
                        style={{ fontFamily: sans, fontWeight: 300 }}
                      >
                        {mod.body}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
            {/* Even out the grid for odd module count */}
            {modules.length % 2 !== 0 && (
              <div className="hidden md:block border-b border-r border-[#1A1A1A]" />
            )}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══ ACCESS / CTA ═════════════════════════════════════════════ */}
      <section id="access" className="relative bg-[#0a0a0a] py-36 px-6 overflow-hidden">
        {/* Bottom glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                          w-[700px] h-[350px] rounded-full
                          bg-[#C9A96E]/[0.06] blur-[110px]" />
        </div>

        <AnimateIn className="relative z-10 max-w-3xl mx-auto text-center">
          <SectionLabel text="Exclusively Yours" />

          <h2
            className="mt-10 mb-6 text-white text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.06]"
            style={{ fontFamily: serif, fontWeight: 600 }}
          >
            The complete TGC system.{" "}
            <br />
            <em className="italic" style={{ color: "#C9A96E", fontWeight: 400 }}>
              Get free access.
            </em>
          </h2>

          <p
            className="text-[#4E4E4E] text-base leading-relaxed mb-14 max-w-xl mx-auto"
            style={{ fontFamily: sans, fontWeight: 300 }}
          >
            Enter your email and we&apos;ll send you the full Mean Reversion Student Guide —
            no cost, no catch.
          </p>

          <LeadForm />

          <p
            className="mt-10 text-[#2E2E2E] text-[10px] tracking-[0.34em] uppercase"
            style={{ fontFamily: sans }}
          >
            ◆&nbsp;&nbsp;Confidential – For Educational Use&nbsp;&nbsp;◆
          </p>
        </AnimateIn>
      </section>
    </>
  );
}
