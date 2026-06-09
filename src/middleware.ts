import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { INTERNAL_ADMIN_PREFIX } from "@/lib/admin-path";

export function middleware(request: NextRequest) {
  const secretBase = process.env.ADMIN_BASE_PATH?.trim().replace(/\/$/, "");
  if (!secretBase) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (
    pathname === INTERNAL_ADMIN_PREFIX ||
    pathname.startsWith(`${INTERNAL_ADMIN_PREFIX}/`)
  ) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  if (pathname === secretBase || pathname.startsWith(`${secretBase}/`)) {
    const suffix = pathname.slice(secretBase.length) || "/login";
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `${INTERNAL_ADMIN_PREFIX}${suffix}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf)$).*)",
  ],
};
