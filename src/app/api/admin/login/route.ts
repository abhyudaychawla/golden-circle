import { NextResponse } from "next/server";

// Supports up to two admin accounts defined in env:
//   ADMIN_1_USERNAME / ADMIN_1_PASSWORD
//   ADMIN_2_USERNAME / ADMIN_2_PASSWORD
// Session validated via ADMIN_SESSION_TOKEN cookie.

function credentialsMatch(username: string, password: string): boolean {
  const pairs = [
    [process.env.ADMIN_1_USERNAME, process.env.ADMIN_1_PASSWORD],
    [process.env.ADMIN_2_USERNAME, process.env.ADMIN_2_PASSWORD],
  ];

  return pairs.some(
    ([u, p]) => u && p && username === u && password === p
  );
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Credentials required" }, { status: 400 });
    }

    if (!credentialsMatch(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = process.env.ADMIN_SESSION_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
