import { NextResponse } from "next/server";
import { OTP_TTL_MS } from "@backend/lib/auth/constants";
import { generateSixDigitOtp } from "@backend/lib/auth/otp-code";
import { hashOtpCode } from "@backend/lib/auth/otp-hash";
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
  if (!rateLimit(`resend:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (!rateLimit(`resend:email:${email}`, 3, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many resends for this email" },
      { status: 429 },
    );
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({
      ok: true,
      message: "If an account exists, a code was sent.",
    });
  }
  if (user.emailVerified) {
    return NextResponse.json({ error: "Email already verified" }, { status: 400 });
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

  return NextResponse.json({ ok: true, message: "Verification code sent" });
}
