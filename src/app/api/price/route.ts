import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ price: null, error: "TWELVE_DATA_API_KEY not set" });
  }

  try {
    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=XAU/USD&apikey=${apiKey}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({ price: null, error: "Twelve Data error" });
    }

    const data = await res.json();
    // Twelve Data returns { price: "2318.12000" } or { code: 400, message: "..." } on error
    if (data.code) {
      return NextResponse.json({ price: null, error: data.message });
    }

    return NextResponse.json({
      price: data.price ? parseFloat(data.price).toFixed(2) : null,
    });
  } catch {
    return NextResponse.json({ price: null, error: "Fetch failed" });
  }
}
