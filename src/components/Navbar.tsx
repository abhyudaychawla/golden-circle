"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Modules", href: "#modules" },
  { label: "Statistics", href: "#statistics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#C9A96E]/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* TGC circle */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
              <circle cx="20" cy="20" r="18" stroke="#C9A96E" strokeWidth="0.75" fill="none" />
              <circle cx="20" cy="20" r="12" stroke="#C9A96E" strokeWidth="0.75" fill="none" opacity="0.5" />
              <text
                x="20"
                y="24"
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
          </div>
          <div className="flex flex-col">
            <span
              className="text-white text-[13px] font-medium tracking-[0.22em] uppercase leading-none"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              The Golden Circle
            </span>
            <span
              className="text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase mt-0.5 leading-none opacity-70"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Elite Trading Education
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A0A0A0] text-[11px] font-medium tracking-[0.22em] uppercase hover:text-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#access"
            className="border border-[#C9A96E] text-[#C9A96E] text-[11px] font-medium tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-300"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Get Access →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-px bg-[#C9A96E] transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-px bg-[#C9A96E] transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-px bg-[#C9A96E] transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-64" : "max-h-0"}`}>
        <div className="bg-[#0a0a0a]/98 border-t border-[#C9A96E]/15 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A0A0A0] text-[11px] tracking-[0.24em] uppercase hover:text-white transition-colors py-1"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#access"
            className="mt-2 border border-[#C9A96E] text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase px-6 py-3 text-center hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-300"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            onClick={() => setIsMobileOpen(false)}
          >
            Get Access →
          </a>
        </div>
      </div>
    </nav>
  );
}
