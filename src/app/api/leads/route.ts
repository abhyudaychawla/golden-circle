import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Deduplicate silently — same email just returns ok
    const existing = await prisma.lead.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    await prisma.lead.create({
      data: {
        fullName: "",
        email,
        source: source ?? "El Dorado landing page",
        status: "new",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
