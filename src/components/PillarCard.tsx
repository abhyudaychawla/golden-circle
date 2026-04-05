interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export default function PillarCard({ title, description, icon, index }: PillarCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(27,42,74,0.06)] border-t-2 border-[#C9A96E] hover:shadow-[0_8px_40px_rgba(27,42,74,0.12)] transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <span
          className="text-2xl text-[#C9A96E] leading-none mt-1"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="text-[#E8D5B0] text-xs font-medium tracking-[3px] uppercase mt-2">
          0{index + 1}
        </span>
      </div>
      <h3
        className="text-[#1B2A4A] text-2xl font-light mb-3 group-hover:text-[#C9A96E] transition-colors duration-300"
        style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
      >
        {title}
      </h3>
      <p className="text-[#8A95A5] text-sm leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}
