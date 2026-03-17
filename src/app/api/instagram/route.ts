import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  try {
    const oembedUrl = `https://www.instagram.com/api/oembed/?url=${encodeURIComponent(url)}&omitscript=true`;
    const res = await fetch(oembedUrl, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json({ error: "oEmbed failed" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({
      thumbnail: data.thumbnail_url ?? null,
      title: data.title ?? null,
      author: data.author_name ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}
