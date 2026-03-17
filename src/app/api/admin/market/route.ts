import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/market.json");

async function isAuthorised(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return !!session && session === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  if (!(await isAuthorised())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json();
  const allowed = ["bias", "checklist", "riskState", "notes", "featuredPost"];
  const current = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  for (const key of allowed) {
    if (key in body) current[key] = body[key];
  }
  current.updatedAt = new Date().toISOString();

  fs.writeFileSync(dataPath, JSON.stringify(current, null, 2));
  return NextResponse.json(current);
}
