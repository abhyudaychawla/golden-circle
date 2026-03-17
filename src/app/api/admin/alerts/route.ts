import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/alerts.json");

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
  const alerts = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const newAlert = {
    id: Date.now().toString(),
    pair: body.pair ?? "XAUUSD",
    direction: body.direction ?? "Long",
    entry: body.entry,
    sl: body.sl,
    tp: body.tp,
    time: new Date().toISOString(),
    status: "active",
  };

  alerts.unshift(newAlert);
  fs.writeFileSync(dataPath, JSON.stringify(alerts, null, 2));
  return NextResponse.json(newAlert);
}

export async function PATCH(request: Request) {
  if (!(await isAuthorised())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id, status } = await request.json();
  const alerts = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const alert = alerts.find((a: { id: string }) => a.id === id);
  if (alert) alert.status = status;
  fs.writeFileSync(dataPath, JSON.stringify(alerts, null, 2));
  return NextResponse.json({ success: true });
}
