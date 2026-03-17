"use client";

import { useEffect, useState } from "react";

export function LivePrice() {
  const [price, setPrice] = useState<string | null>(null);
  const [dir, setDir] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    async function poll() {
      const res = await fetch("/api/price");
      if (!res.ok) return;
      const data = await res.json();
      if (data.price) {
        setPrice((prev) => {
          if (prev && data.price !== prev) {
            setDir(parseFloat(data.price) > parseFloat(prev) ? "up" : "down");
          }
          return data.price;
        });
      }
    }

    poll();
    const id = setInterval(poll, 120_000); // 2 min — stays within Twelve Data free tier (800 req/day)
    return () => clearInterval(id);
  }, []);

  if (!price) return <span className="text-zinc-500">—</span>;

  return (
    <span
      className={
        dir === "up"
          ? "text-emerald-300"
          : dir === "down"
          ? "text-red-400"
          : "text-white"
      }
    >
      ${price}
    </span>
  );
}
