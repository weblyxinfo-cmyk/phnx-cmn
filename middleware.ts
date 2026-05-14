import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);
const COOKIE_NAME = "phx-admin-token";

async function isAdminAuthed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret || secret.length < 16) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    // Login page itself: let through; client component renders form.
    // Subpaths: require auth, redirect to /admin on miss.
    if (pathname === "/admin" || pathname === "/admin/") {
      return NextResponse.next();
    }
    if (!(await isAdminAuthed(req))) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
