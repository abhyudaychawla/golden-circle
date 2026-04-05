import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { services } from "@/lib/services";
import { faqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/content";

export const metadata = {
  title: "Coaching Services | Golden Circle Coaching",
  description:
    "Explore coaching packages — from a 90-minute clarity intensive to a 6-month deep immersion engagement. Find the right fit for where you are.",
};

export default function CoachingPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#C9A96E] text-xs font-medium tracking-[4px] uppercase mb-4">
              Coaching
            </p>
            <h1
              className="text-[#1B2A4A] text-5xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              Coaching Services
            </h1>
            <div className="h-px w-16 bg-[#C9A96E] mt-6" />
            <p className="text-[#3D4B63] text-lg font-light leading-relaxed mt-6 max-w-xl">
              Every engagement is tailored. But here&apos;s the structure we typically work within.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Overview intro */}
      <section className="py-16 px-6 bg-[#FDFAF6]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-[#3D4B63] text-base font-light leading-relaxed">
            Coaching with me is a deeply personal process. The frameworks, timelines, and tools we use are always chosen to serve you — not the other way around. That said, I offer a few different ways to engage, depending on what you need and how ready you are to commit to the work.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Services grid */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <SectionHeading title="Ways to Work Together" centered />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`rounded-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(27,42,74,0.12)] ${
                  service.highlighted
                    ? "bg-[#1B2A4A] text-white border-2 border-[#C9A96E]"
                    : "bg-white border border-[#E8D5B0]"
                }`}
              >
                {service.highlighted && (
                  <span className="inline-block bg-[#C9A96E] text-[#1B2A4A] text-xs font-medium px-3 py-1 rounded-full tracking-wide">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3
                    className={`text-2xl font-light mb-2 ${service.highlighted ? "text-white" : "text-[#1B2A4A]"}`}
                    style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                  >
                    {service.title}
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        service.highlighted
                          ? "bg-white/10 text-[#C9A96E]"
                          : "bg-[#F5EDD8] text-[#C9A96E]"
                      }`}
                    >
                      {service.duration}
                    </span>
                    {service.sessions && (
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          service.highlighted
                            ? "bg-white/10 text-[#C9A96E]"
                            : "bg-[#F5EDD8] text-[#C9A96E]"
                        }`}
                      >
                        {service.sessions}
                      </span>
                    )}
                  </div>
                </div>

                <p
                  className={`text-sm font-light leading-relaxed ${
                    service.highlighted ? "text-[#8A95A5]" : "text-[#3D4B63]"
                  }`}
                >
                  {service.description}
                </p>

                <div>
                  <p
                    className={`text-xs font-medium tracking-widest uppercase mb-3 ${
                      service.highlighted ? "text-[#C9A96E]" : "text-[#8A95A5]"
                    }`}
                  >
                    Includes
                  </p>
                  <ul className="space-y-2">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C9A96E] mt-1 flex-shrink-0 text-xs">✦</span>
                        <span
                          className={`text-sm font-light ${
                            service.highlighted ? "text-white/80" : "text-[#3D4B63]"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`border-t pt-4 ${
                    service.highlighted ? "border-white/10" : "border-[#E8D5B0]"
                  }`}
                >
                  <p
                    className={`text-xs mb-4 ${
                      service.highlighted ? "text-[#8A95A5]" : "text-[#8A95A5]"
                    }`}
                  >
                    <span className="font-medium">Ideal for:</span> {service.ideal}
                  </p>
                  <Link
                    href="/contact"
                    className={`inline-block text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 ${
                      service.highlighted
                        ? "bg-[#C9A96E] text-[#1B2A4A] hover:bg-white"
                        : "bg-[#1B2A4A] text-white hover:bg-[#C9A96E] hover:text-[#1B2A4A]"
                    }`}
                  >
                    {service.id === "discovery" ? "Book Free Call" : "Enquire Now"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Who this is for / not for */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <SectionHeading title="Is Coaching Right for You?" centered />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 space-y-5">
              <h3
                className="text-[#1B2A4A] text-2xl font-light"
                style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              >
                Coaching works well if...
              </h3>
              <ul className="space-y-3">
                {[
                  "You're ready to be honest — with yourself and with me",
                  "You want to think, not just be told what to do",
                  "You're willing to sit with uncertainty on the way to clarity",
                  "You're open to your assumptions being gently challenged",
                  "You're looking for a long-term shift, not a quick fix",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#C9A96E] flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-[#3D4B63] text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1B2A4A] rounded-2xl p-8 space-y-5">
              <h3
                className="text-white text-2xl font-light"
                style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              >
                It may not be the right fit if...
              </h3>
              <ul className="space-y-3">
                {[
                  "You're in acute mental health crisis (therapy would serve you better)",
                  "You want someone to make decisions for you",
                  "You're not willing to commit time between sessions",
                  "You need advice from a specialist (career counselor, lawyer, therapist)",
                  "You're expecting change without any discomfort",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#C9A96E] flex-shrink-0 mt-0.5">○</span>
                    <span className="text-white/70 text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-3xl mx-auto space-y-10">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common things people want to know before starting."
          />
          <FAQAccordion faqs={faqs.slice(0, 7)} />
        </div>
      </section>

      {/* Calendly embed */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center">
            <SectionHeading
              title="Book a Free Discovery Call"
              subtitle="Pick a time that works for you. No preparation needed — just show up."
              centered
            />
          </div>
          <CalendlyEmbed url={siteConfig.calendlyUrl} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Questions Before You Commit?"
        subtext="Reach out directly — I'm happy to answer any questions that help you decide if this is right for you."
        primaryCTA={{ label: "Send a Message", href: "/contact" }}
      />
    </>
  );
}
