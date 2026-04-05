interface SituationGridProps {
  items: string[];
}

export default function SituationGrid({ items }: SituationGridProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-[#E8D5B0] text-[#3D4B63] text-sm font-light px-5 py-2.5 rounded-full hover:bg-[#F5EDD8] hover:border-[#C9A96E] hover:text-[#1B2A4A] transition-all duration-200"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
