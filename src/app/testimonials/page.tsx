"use client";

import { useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import { testimonials, TestimonialCategory } from "@/lib/testimonials";

const categories: { label: string; value: "all" | TestimonialCategory }[] = [
  { label: "All Stories", value: "all" },
  { label: "Clarity", value: "clarity" },
  { label: "Relationships", value: "relationships" },
  { label: "Transitions", value: "transition" },
  { label: "Confidence", value: "confidence" },
];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | TestimonialCategory>("all");

  const filtered =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#F5EDD8]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#C9A96E] text-xs font-medium tracking-[4px] uppercase mb-4">
              Testimonials
            </p>
            <h1
              className="text-[#1B2A4A] text-5xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              What Clients Say
            </h1>
            <div className="h-px w-16 bg-[#C9A96E] mt-6" />
            <p className="text-[#3D4B63] text-lg font-light leading-relaxed mt-6 max-w-xl">
              Real stories from real people. Every word is authentic — nothing is embellished.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      {/* Filter tabs + grid */}
      <section className="py-20 px-6 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#1B2A4A] text-white"
                    : "bg-white border border-[#E8D5B0] text-[#3D4B63] hover:border-[#C9A96E] hover:text-[#1B2A4A]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8A95A5] text-base font-light">
                No stories in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to Write Your Own Story?"
        subtext="The work begins with a single conversation. No commitment required."
        primaryCTA={{ label: "Book a Free Discovery Call", href: "/contact" }}
        secondaryCTA={{ label: "Explore Coaching Options", href: "/coaching" }}
      />
    </>
  );
}
