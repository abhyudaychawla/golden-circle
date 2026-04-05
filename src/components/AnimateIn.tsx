"use client";

import { useEffect, useRef } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  /** "up" (default) | "left" */
  direction?: "up" | "left";
  /** Extra delay in ms on top of any CSS delay already applied */
  delay?: number;
  /** Intersection threshold — 0–1 (default 0.12) */
  threshold?: number;
}

export default function AnimateIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`${direction === "left" ? "reveal-left" : "reveal"} ${className}`}
    >
      {children}
    </div>
  );
}
