import { createHmac } from "crypto";
import Razorpay from "razorpay";
import { getOptionalEnv, getRequiredEnv } from "@backend/lib/env";

export function getRazorpayClient(): Razorpay {
  const key_id = getRequiredEnv("RAZORPAY_KEY_ID");
  const key_secret = getRequiredEnv("RAZORPAY_KEY_SECRET");
  return new Razorpay({ key_id, key_secret });
}

export function getRazorpayPublicKeyId(): string | undefined {
  return (
    getOptionalEnv("NEXT_PUBLIC_RAZORPAY_KEY_ID") ?? getOptionalEnv("RAZORPAY_KEY_ID")
  );
}

export function isRazorpayConfigured(): boolean {
  return Boolean(
    getOptionalEnv("RAZORPAY_KEY_ID") && getOptionalEnv("RAZORPAY_KEY_SECRET"),
  );
}

export async function createRazorpayOrder(
  amountPaise: number,
  receipt: string,
  notes?: Record<string, string>,
): Promise<{ id: string; amount: number; currency: string }> {
  const rz = getRazorpayClient();
  const order = await rz.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: receipt.slice(0, 40),
    notes,
  });
  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
  };
}

export function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
): boolean {
  const secret = getOptionalEnv("RAZORPAY_KEY_SECRET");
  if (!secret) return false;

  const expected = createHmac("sha256", secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return expected === razorpaySignature;
}
