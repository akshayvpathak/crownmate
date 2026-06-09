import { NextResponse } from "next/server";
import { OTP_MAX_ATTEMPTS } from "@backend/lib/auth/constants";
import { verifyOtpCode } from "@backend/lib/auth/otp-hash";
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
  if (!rateLimit(`verify:${ip}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!email || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Invalid email or code" }, { status: 400 });
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const otpDoc = await EmailOtpModel.findOne({ email, purpose: "signup" }).sort({
    createdAt: -1,
  });
  if (!otpDoc || otpDoc.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
  }
  if (otpDoc.attempts >= OTP_MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 400 });
  }
  if (!verifyOtpCode(email, code, otpDoc.codeHash)) {
    otpDoc.attempts += 1;
    await otpDoc.save();
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await UserModel.updateOne({ email }, { $set: { emailVerified: true } });
  await EmailOtpModel.deleteMany({ email, purpose: "signup" });

  return NextResponse.json({ ok: true, message: "Email verified. You can log in." });
}
