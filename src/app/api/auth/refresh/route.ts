import { NextResponse } from "next/server";
import { setAuthCookies, readRefreshTokenFromRequest } from "@backend/lib/auth/cookies";
import { signAccessToken } from "@backend/lib/auth/jwt";
import {
  generateRefreshTokenValue,
  rotateRefreshToken,
} from "@backend/lib/auth/refresh-token";
import { getClientIp, rateLimit } from "@backend/lib/rate-limit";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { UserModel } from "@backend/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Auth requires MONGODB_URI" }, { status: 503 });
  }

  const ip = getClientIp(request);
  if (!rateLimit(`refresh:${ip}`, 60, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const oldRaw = readRefreshTokenFromRequest(request);
  if (!oldRaw) {
    return NextResponse.json({ error: "Missing refresh token" }, { status: 401 });
  }

  const newRaw = generateRefreshTokenValue();
  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const rotated = await rotateRefreshToken(oldRaw, newRaw, {
    userAgent: request.headers.get("user-agent") || undefined,
    ip: getClientIp(request),
  });
  if (!rotated) {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }

  const user = await UserModel.findById(rotated.userId);
  if (!user || !user.emailVerified) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const access = await signAccessToken({
    sub: user._id.toString(),
    email: user.email,
    role: user.role === "admin" ? "admin" : "user",
  });

  const res = NextResponse.json({ ok: true });
  setAuthCookies(res, access, newRaw);
  return res;
}
