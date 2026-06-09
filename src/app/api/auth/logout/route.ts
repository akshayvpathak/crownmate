import { NextResponse } from "next/server";
import {
  clearAuthCookies,
  readRefreshTokenFromRequest,
} from "@backend/lib/auth/cookies";
import { revokeRefreshTokenByRaw } from "@backend/lib/auth/refresh-token";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const raw = readRefreshTokenFromRequest(request);
  if (raw && isMongoConfigured()) {
    try {
      await connectMongo();
      await revokeRefreshTokenByRaw(raw);
    } catch {
      // still clear cookies
    }
  }
  const res = NextResponse.json({ ok: true });
  clearAuthCookies(res);
  return res;
}
