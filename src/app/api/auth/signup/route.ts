import { NextResponse } from "next/server";
import { OTP_TTL_MS } from "@backend/lib/auth/constants";
import { generateSixDigitOtp } from "@backend/lib/auth/otp-code";
import { hashOtpCode } from "@backend/lib/auth/otp-hash";
import { hashPassword, validatePasswordStrength } from "@backend/lib/auth/password";
import { sendOtpEmail } from "@backend/lib/email/send-otp-email";
import { getClientIp, rateLimit } from "@backend/lib/rate-limit";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { EmailOtpModel } from "@backend/models/EmailOtp";
import { UserModel } from "@backend/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Auth requires MONGODB_URI" }, { status: 503 });
  }

  const ip = getClientIp(request);
  if (!rateLimit(`signup:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; password?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const pwErr = validatePasswordStrength(password);
  if (pwErr) return NextResponse.json({ error: pwErr }, { status: 400 });
  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const existing = await UserModel.findOne({ email });
  if (existing?.emailVerified) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  let user = existing;
  if (!user) {
    user = await UserModel.create({
      email,
      passwordHash,
      name,
      emailVerified: false,
      role: "user",
    });
  } else {
    user.passwordHash = passwordHash;
    user.name = name;
    await user.save();
  }

  await EmailOtpModel.deleteMany({ email, purpose: "signup" });
  const code = generateSixDigitOtp();
  await EmailOtpModel.create({
    email,
    purpose: "signup",
    codeHash: hashOtpCode(email, code),
    expiresAt: new Date(Date.now() + OTP_TTL_MS),
    attempts: 0,
    userId: user._id,
  });

  try {
    await sendOtpEmail(email, code);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email send failed";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    message: "Verification code sent to your email",
  });
}
