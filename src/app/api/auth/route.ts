import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, verifyAuth, COOKIE_NAME } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function GET() {
  const isAuth = await verifyAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const rl = rateLimit(`auth:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const password = body?.password;

    if (typeof password !== "string" || !checkPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = await createToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("auth POST", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
