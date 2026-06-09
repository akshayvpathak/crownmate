import { NextResponse } from "next/server";
import {
  ACCESS_TTL_SEC,
  COOKIE_ACCESS,
  COOKIE_REFRESH,
  REFRESH_COOKIE_PATH,
  REFRESH_TTL_SEC,
} from "@backend/lib/auth/constants";

function secureCookie(): boolean {
  return process.env.NODE_ENV === "production";
}

export function setAuthCookies(
  res: NextResponse,
  accessToken: string,
  refreshToken: string,
): void {
  const base = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: secureCookie(),
  };
  res.cookies.set(COOKIE_ACCESS, accessToken, {
    ...base,
    path: "/",
    maxAge: ACCESS_TTL_SEC,
  });
  res.cookies.set(COOKIE_REFRESH, refreshToken, {
    ...base,
    path: REFRESH_COOKIE_PATH,
    maxAge: REFRESH_TTL_SEC,
  });
}

export function clearAuthCookies(res: NextResponse): void {
  const base = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: secureCookie(),
    maxAge: 0,
  };
  res.cookies.set(COOKIE_ACCESS, "", { ...base, path: "/" });
  res.cookies.set(COOKIE_REFRESH, "", { ...base, path: REFRESH_COOKIE_PATH });
}

export function readAccessTokenFromRequest(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim() || null;

  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_ACCESS}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(COOKIE_ACCESS.length + 1)) || null;
}

export function readRefreshTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_REFRESH}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(COOKIE_REFRESH.length + 1)) || null;
}
