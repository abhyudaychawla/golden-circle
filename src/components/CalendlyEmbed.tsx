"use client";

import { useEffect, useRef } from "react";

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

export default function CalendlyEmbed({ url, height = 700 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full rounded-2xl overflow-hidden">
      <div
        className="calendly-inline-widget w-full"
        data-url={url}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
    </div>
  );
}
