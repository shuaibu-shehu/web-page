import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/session";

/**
 * Protects everything under /admin except the login page and static assets.
 * Runs on the edge — jose (not bcrypt) is safe here.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    let valid = false;

    if (token && process.env.AUTH_SECRET) {
      try {
        await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
        valid = true;
      } catch {
        valid = false;
      }
    }

    if (!valid) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
