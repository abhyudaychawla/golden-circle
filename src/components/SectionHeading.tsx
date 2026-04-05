interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accent?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  accent = true,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""}`}>
      <h2
        className="text-[#1B2A4A] text-4xl md:text-5xl font-light leading-tight"
        style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
      >
        {title}
      </h2>
      {accent && (
        <div
          className={`h-px w-12 bg-[#C9A96E] ${centered ? "mx-auto" : ""}`}
        />
      )}
      {subtitle && (
        <p className="text-[#8A95A5] text-base md:text-lg font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
