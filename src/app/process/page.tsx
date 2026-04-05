import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { processSteps } from "@/lib/content";

export const metadata = {
  title: "How Coaching Works | Golden Circle Coaching",
  description:
    "Understand the coaching process — from your first discovery call to lasting integration. A clear, honest overview of what to expect.",
};

const outcomes = [
  {
    icon: "◎",
    title: "Clarity of Direction",
    description:
      "A clearer sense of what you actually want — not what you think you should want. The compass becomes reliable again.",
  },
  {
    icon: "✦",
    title: "Confidence in Decisions",
    description:
      "The ability to make choices — even hard ones — and stand behind them. Less second-guessing. More trust.",
  },
  {
    icon: "◈",
    title: "Better Relationships",
    description:
      "Understanding of the patterns that show up with others, and the tools to shift them — at work and at home.",
  },
  {
    icon: "⬡",
    title: "Sustainable Momentum",
    description:
      "Not just a moment of insight — but habits, structures, and ways of thinking that hold you in motion long after we stop meeting.",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#C9A96E] text-xs font-medium tracking-[4px] uppercase mb-4">
              Process
            </p>
            <h1
              className="text-[#1B2A4A] text-5xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              How Coaching Works
            </h1>
            <div className="h-px w-16 bg-[#C9A96E] mt-6" />
            <p className="text-[#3D4B63] text-lg font-light leading-relaxed mt-6 max-w-xl">
              A clear-eyed look at what the process actually involves — so you know what you&apos;re stepping into.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Step-by-step timeline */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-4xl mx-auto space-y-12">
          <SectionHeading
            title="The Journey"
            subtitle="Coaching is not linear — but here's how it tends to unfold."
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-[#E8D5B0] hidden md:block" />

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={step.number} className="flex gap-8 items-start">
                  {/* Step number bubble */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1B2A4A] border-4 border-[#FDFAF6] flex items-center justify-center relative z-10 shadow-sm">
                    <span
                      className="text-[#C9A96E] text-sm font-light"
                      style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pb-8 ${
                      index < processSteps.length - 1 ? "border-b border-[#E8D5B0]" : ""
                    }`}
                  >
                    <h3
                      className="text-[#1B2A4A] text-2xl font-light mb-3"
                      style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#3D4B63] text-base font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Outcomes */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <SectionHeading
              title="What You Can Expect to Gain"
              subtitle="Not promised outcomes — but what clients consistently report after the work."
              centered
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="bg-white rounded-2xl p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span
                  className="text-3xl text-[#C9A96E]"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  {outcome.icon}
                </span>
                <h3
                  className="text-[#1B2A4A] text-xl font-light"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  {outcome.title}
                </h3>
                <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Coaching is not therapy disclaimer */}
      <section className="py-16 px-6 bg-[#FDFAF6]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F5EDD8] border border-[#C9A96E]/30 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#C9A96E]" />
              <h3
                className="text-[#1B2A4A] text-xl font-light"
                style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              >
                A note on coaching vs. therapy
              </h3>
            </div>
            <p className="text-[#3D4B63] text-sm font-light leading-relaxed">
              Coaching is not therapy, and it&apos;s important to understand the distinction. Therapy focuses on diagnosing and treating mental health conditions, often working through past trauma. Coaching works in the present and future — helping you move toward goals, navigate decisions, and build a life aligned with your values.
            </p>
            <p className="text-[#3D4B63] text-sm font-light leading-relaxed">
              I am not a licensed therapist. If you&apos;re dealing with clinical depression, anxiety disorders, trauma, or other mental health conditions, I will always refer you to a qualified professional. Coaching and therapy can complement each other beautifully — but they are not the same thing.
            </p>
            <p className="text-[#8A95A5] text-xs font-light mt-2">
              If you&apos;re unsure which is right for you, feel free to reach out. I&apos;m happy to help you figure out the best next step.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to Start the Journey?"
        subtext="The first step is a free, no-pressure 15-minute conversation. Let's find out if this is the right fit."
        primaryCTA={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCTA={{ label: "Explore Coaching Options", href: "/coaching" }}
      />
    </>
  );
}
