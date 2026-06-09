import { createHmac } from "crypto";
import { getOptionalEnv } from "@backend/lib/env";

function getOtpSecret(): string {
  const secret =
    getOptionalEnv("OTP_HMAC_SECRET") ?? getOptionalEnv("JWT_ACCESS_SECRET");
  if (!secret) {
    throw new Error("Missing OTP_HMAC_SECRET or JWT_ACCESS_SECRET");
  }
  return secret;
}

export function hashOtpCode(email: string, code: string): string {
  const normalized = email.toLowerCase().trim();
  return createHmac("sha256", getOtpSecret())
    .update(`${normalized}:${code}`)
    .digest("hex");
}

export function verifyOtpCode(email: string, code: string, codeHash: string): boolean {
  return hashOtpCode(email, code) === codeHash;
}
