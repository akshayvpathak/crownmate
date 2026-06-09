import { NextResponse } from "next/server";
import { issueSessionCookies } from "@backend/lib/auth/issue-session";
import { verifyPassword } from "@backend/lib/auth/password";
import { getClientIp, rateLimit } from "@backend/lib/rate-limit";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { UserModel } from "@backend/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Auth requires MONGODB_URI" }, { status: 503 });
  }

  const ip = getClientIp(request);
  if (!rateLimit(`login:${ip}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const user = await UserModel.findOne({ email });
  if (!user || !user.emailVerified) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  await issueSessionCookies(res, user, {
    userAgent: request.headers.get("user-agent") || undefined,
    ip: getClientIp(request),
  });
  return res;
}
