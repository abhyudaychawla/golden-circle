import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { aboutBio, credentials, whatMakesDifferent, whatToExpect, siteConfig } from "@/lib/content";

export const metadata = {
  title: "About Alexandra Mercer | Golden Circle Coaching",
  description:
    "Learn about Alexandra Mercer's coaching philosophy, background, and approach to helping professionals find clarity and move forward with purpose.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#C9A96E] text-xs font-medium tracking-[4px] uppercase mb-4">
              About
            </p>
            <h1
              className="text-[#1B2A4A] text-5xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              About Alexandra Mercer
            </h1>
            <div className="h-px w-16 bg-[#C9A96E] mt-6" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Bio section */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-[40px] bg-[#E8D5B0] flex items-center justify-center shadow-[0_24px_80px_rgba(27,42,74,0.12)]">
                <div className="text-center space-y-2">
                  <div
                    className="text-5xl text-[#C9A96E]"
                    style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                  >
                    ✦
                  </div>
                  <p className="text-[#8A95A5] text-xs tracking-widest uppercase">Coach Portrait</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20" />
            </div>

            {/* Bio text */}
            <div className="space-y-6 pt-4">
              <blockquote
                className="text-[#1B2A4A] text-2xl font-light italic leading-relaxed border-l-2 border-[#C9A96E] pl-6"
                style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              >
                &ldquo;{aboutBio.intro}&rdquo;
              </blockquote>

              <div className="space-y-4">
                {aboutBio.full.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#3D4B63] text-base font-light leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Mission & Philosophy */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <SectionHeading
            title="Philosophy"
            subtitle="The belief that shapes every session."
            centered
          />
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <p
              className="text-[#1B2A4A] text-2xl md:text-3xl font-light italic leading-relaxed"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              &ldquo;{aboutBio.philosophy}&rdquo;
            </p>
          </div>
          <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
            Coaching works not because someone tells you what to do — but because you&apos;re finally in a space where you can hear yourself think. My role is to create that space, and to ask the questions that help you access what you already know.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Credentials */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <SectionHeading title="Training &amp; Background" centered />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#E8D5B0] hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{cred.icon}</div>
                <h3
                  className="text-[#1B2A4A] text-lg font-light mb-1"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  {cred.label}
                </h3>
                <p className="text-[#8A95A5] text-xs font-light">{cred.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* What makes this different */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto space-y-12">
          <SectionHeading
            title="What Makes This Different"
            subtitle="There are many coaches. Here's what distinguishes this work."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatMakesDifferent.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border-l-2 border-[#C9A96E]"
              >
                <h3
                  className="text-[#1B2A4A] text-xl font-light mb-3"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* What to expect */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-4xl mx-auto space-y-10">
          <SectionHeading
            title="What to Expect"
            subtitle="The practical shape of our work together."
          />
          <ol className="space-y-4">
            {whatToExpect.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-[#C9A96E] text-2xl font-light flex-shrink-0 leading-none mt-0.5"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[#3D4B63] text-base font-light leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to Begin?"
        subtext="Start with a free 15-minute discovery call. No commitment required."
        primaryCTA={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCTA={{ label: "View Coaching Options", href: "/coaching" }}
      />

      {/* WhatsApp float */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="Contact via WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
