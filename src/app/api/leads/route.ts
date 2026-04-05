import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Deduplicate silently
    const existing = await prisma.lead.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true });
    }

    await prisma.lead.create({
      data: {
        id: crypto.randomUUID(),
        email,
        source: source || "website",
        status: "new",
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
