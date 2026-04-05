"use client";

import { useState } from "react";
import { FAQ } from "@/lib/faqs";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-[#E8D5B0] overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-[#FDFAF6] transition-colors duration-200"
            aria-expanded={openIndex === index}
          >
            <span
              className="text-[#1B2A4A] text-base font-light pr-4 leading-snug"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              {faq.question}
            </span>
            <span
              className={`text-[#C9A96E] flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8 11L14 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          <div
            style={{
              maxHeight: openIndex === index ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease-in-out",
            }}
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-[#E8D5B0] mb-4" />
              <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
