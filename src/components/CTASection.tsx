import Link from "next/link";

interface CTASectionProps {
  headline: string;
  subtext: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export default function CTASection({
  headline,
  subtext,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section className="bg-[#F5EDD8] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2
          className="text-[#1B2A4A] text-4xl md:text-5xl font-light leading-tight"
          style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
        >
          {headline}
        </h2>
        <div className="h-px w-12 bg-[#C9A96E] mx-auto" />
        <p className="text-[#3D4B63] text-base md:text-lg font-light leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={primaryCTA.href}
            className="bg-[#1B2A4A] text-white text-sm font-medium tracking-wide px-8 py-3.5 rounded-full hover:bg-[#C9A96E] hover:text-[#1B2A4A] transition-all duration-300"
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="border border-[#1B2A4A] text-[#1B2A4A] text-sm font-medium tracking-wide px-8 py-3.5 rounded-full hover:bg-[#1B2A4A] hover:text-white transition-all duration-300"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
