import ConsultationForm from "@/components/ConsultationForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { siteConfig } from "@/lib/content";
import { faqs as faqData } from "@/lib/faqs";
import Link from "next/link";

export const metadata = {
  title: "Let's Connect | Golden Circle Coaching",
  description:
    "Book a free 15-minute discovery call or send a message. No pressure, no obligation.",
};

export default function ContactPage() {
  const quickFaqs = faqData.slice(0, 4);

  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#C9A96E] text-xs font-medium tracking-[4px] uppercase mb-4">
              Contact
            </p>
            <h1
              className="text-[#1B2A4A] text-5xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              Let&apos;s Connect
            </h1>
            <div className="h-px w-16 bg-[#C9A96E] mt-6" />
            <p className="text-[#3D4B63] text-lg font-light leading-relaxed mt-6 max-w-xl">
              Whether you&apos;re ready to begin or still just exploring — reach out. There&apos;s no pressure, and no wrong reason to get in touch.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Two-column: form + contact info */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Consultation form */}
            <div className="space-y-6">
              <div>
                <h2
                  className="text-[#1B2A4A] text-3xl font-light mb-2"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  Request a Consultation
                </h2>
                <p className="text-[#8A95A5] text-sm font-light">
                  Fill in the form and I&apos;ll be in touch within 24–48 hours.
                </p>
              </div>
              <ConsultationForm />
            </div>

            {/* Right: Contact info */}
            <div className="space-y-10">
              <div>
                <h2
                  className="text-[#1B2A4A] text-3xl font-light mb-2"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  Or Reach Out Directly
                </h2>
                <p className="text-[#8A95A5] text-sm font-light">
                  I read every message personally and respond with care.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5EDD8] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C9A96E] text-sm">✉</span>
                  </div>
                  <div>
                    <p className="text-[#8A95A5] text-xs font-medium tracking-widest uppercase mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-[#1B2A4A] text-base font-light hover:text-[#C9A96E] transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5EDD8] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C9A96E] text-sm">☎</span>
                  </div>
                  <div>
                    <p className="text-[#8A95A5] text-xs font-medium tracking-widest uppercase mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="text-[#1B2A4A] text-base font-light hover:text-[#C9A96E] transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5EDD8] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="#C9A96E" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#8A95A5] text-xs font-medium tracking-widest uppercase mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1B2A4A] text-base font-light hover:text-[#C9A96E] transition-colors"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Reassurance */}
              <div className="bg-[#F5EDD8] rounded-2xl p-6 space-y-3">
                <h3
                  className="text-[#1B2A4A] text-lg font-light"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  Your privacy matters.
                </h3>
                <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
                  Everything you share — in a form, a session, or a message — is held in complete confidence. I adhere to the ICF Code of Ethics and take discretion seriously.
                </p>
                <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
                  You&apos;re safe to be honest here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Calendly embed */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2
              className="text-[#1B2A4A] text-4xl font-light"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              Book a Time Directly
            </h2>
            <div className="h-px w-12 bg-[#C9A96E] mx-auto" />
            <p className="text-[#8A95A5] text-sm font-light">
              Prefer to skip the form? Pick a slot and we&apos;ll meet directly.
            </p>
          </div>
          <CalendlyEmbed url={siteConfig.calendlyUrl} />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Quick FAQ */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2
            className="text-[#1B2A4A] text-3xl font-light"
            style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
          >
            Quick Answers
          </h2>
          <div className="space-y-6">
            {quickFaqs.map((faq, i) => (
              <div key={i} className="border-b border-[#E8D5B0] pb-6">
                <h3
                  className="text-[#1B2A4A] text-lg font-light mb-2"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  {faq.question}
                </h3>
                <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/coaching"
            className="inline-flex items-center gap-2 text-[#C9A96E] text-sm font-medium hover:text-[#1B2A4A] transition-colors"
          >
            Read all FAQs →
          </Link>
        </div>
      </section>
    </>
  );
}
