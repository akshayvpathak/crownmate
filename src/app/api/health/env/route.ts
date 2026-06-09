import { NextResponse } from "next/server";
import { hasEnv } from "@backend/lib/env";
import { isMongoConfigured } from "@backend/lib/mongodb";
import { isRazorpayConfigured } from "@backend/lib/razorpay";

export const runtime = "nodejs";

export async function GET() {
  const flags = {
    MONGODB_URI: isMongoConfigured(),
    JWT_ACCESS_SECRET: hasEnv("JWT_ACCESS_SECRET"),
    OTP_HMAC_SECRET: hasEnv("OTP_HMAC_SECRET") || hasEnv("JWT_ACCESS_SECRET"),
    RAZORPAY_KEY_ID: hasEnv("RAZORPAY_KEY_ID"),
    RAZORPAY_KEY_SECRET: hasEnv("RAZORPAY_KEY_SECRET"),
    NEXT_PUBLIC_RAZORPAY_KEY_ID: hasEnv("NEXT_PUBLIC_RAZORPAY_KEY_ID"),
  };

  const resendConfigured = hasEnv("RESEND_API_KEY");
  const smtpConfigured =
    hasEnv("SMTP_HOST") && hasEnv("SMTP_USER") && hasEnv("SMTP_PASS");
  const emailConfigured = resendConfigured || smtpConfigured;

  const missingRequired = Object.entries(flags)
    .filter(([, present]) => !present)
    .map(([name]) => name);

  const ok = isRazorpayConfigured() && flags.MONGODB_URI;

  return NextResponse.json(
    {
      ok,
      storage: flags.MONGODB_URI ? "mongodb" : "unavailable",
      required: flags,
      email: {
        configured: emailConfigured,
        provider: resendConfigured ? "resend" : smtpConfigured ? "smtp" : "none",
      },
      missing: {
        required: missingRequired,
        email: emailConfigured
          ? []
          : ["RESEND_API_KEY or SMTP_HOST+SMTP_USER+SMTP_PASS"],
      },
      note: "Reports env presence only, never secret values.",
    },
    { status: ok ? 200 : 503 },
  );
}
