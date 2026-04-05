"use client";

import { usePathname } from "next/navigation";

const serif = "var(--font-cormorant-garamond), Georgia, serif";
const sans = "var(--font-inter), sans-serif";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0a0a0a]">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 flex-shrink-0">
              <circle cx="20" cy="20" r="18" stroke="#C9A96E" strokeWidth="0.75" fill="none" />
              <circle cx="20" cy="20" r="12" stroke="#C9A96E" strokeWidth="0.75" fill="none" opacity="0.5" />
              <text
                x="20" y="24"
                textAnchor="middle"
                fill="#C9A96E"
                fontSize="8.5"
                fontFamily="var(--font-inter), sans-serif"
                fontWeight="500"
                letterSpacing="0.5"
              >
                TGC
              </text>
            </svg>
            <div>
              <p className="text-white text-sm tracking-[0.18em] uppercase" style={{ fontFamily: sans }}>
                The Golden Circle
              </p>
              <p className="text-[#C9A96E]/50 text-[9px] tracking-[0.28em] uppercase mt-0.5" style={{ fontFamily: sans }}>
                Elite Trading Education
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-8">
            {["Overview", "Modules", "Statistics"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-[#555] text-[10px] tracking-[0.24em] uppercase hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: sans }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#access"
            className="border border-[#C9A96E]/40 text-[#C9A96E] text-[10px] tracking-[0.22em] uppercase px-7 py-3 hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-300 flex-shrink-0"
            style={{ fontFamily: sans }}
          >
            Get Access →
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#333] text-xs" style={{ fontFamily: sans }}>
            &copy; {currentYear} The Golden Circle. All rights reserved.
          </p>
          <p className="text-[#333] text-xs text-center" style={{ fontFamily: sans }}>
            Educational content only. Trading involves significant risk of loss. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
