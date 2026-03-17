import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const users = [
    {
      username: process.env.ADMIN_1_USERNAME,
      password: process.env.ADMIN_1_PASSWORD,
    },
    {
      username: process.env.ADMIN_2_USERNAME,
      password: process.env.ADMIN_2_PASSWORD,
    },
  ];

  const valid = users.some(
    (u) => u.username === username && u.password === password
  );

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", process.env.ADMIN_SESSION_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
