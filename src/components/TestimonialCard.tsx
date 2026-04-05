import { Testimonial } from "@/lib/testimonials";

interface TestimonialCardProps extends Testimonial {}

const categoryColors: Record<string, string> = {
  clarity: "bg-[#F5EDD8] text-[#C9A96E]",
  relationships: "bg-[#EEF2F7] text-[#1B2A4A]",
  transition: "bg-[#F0F4F0] text-[#4A6B4A]",
  confidence: "bg-[#F5F0EE] text-[#8B5E52]",
};

export default function TestimonialCard({
  name,
  role,
  category,
  quote,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(27,42,74,0.06)] hover:shadow-[0_8px_40px_rgba(27,42,74,0.12)] transition-all duration-300 flex flex-col">
      {/* Opening quote */}
      <div
        className="text-[#C9A96E] text-7xl font-light leading-none mb-4 -mt-2"
        style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        className="text-[#3D4B63] text-base leading-relaxed font-light flex-1 mb-6"
        style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
      >
        {quote}
      </p>

      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[#1B2A4A] font-medium text-base"
            style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
          >
            {name}
          </p>
          <p className="text-[#8A95A5] text-xs font-light mt-0.5">{role}</p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${categoryColors[category] || "bg-[#F5EDD8] text-[#C9A96E]"}`}
        >
          {category}
        </span>
      </div>
    </div>
  );
}
