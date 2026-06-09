import type { AuthUser } from "@backend/lib/auth/get-auth-user";
import { verifyRazorpaySignature } from "@backend/lib/razorpay";
import {
  findOrderByRazorpayOrderId,
  markOrderPaid,
} from "@backend/services/order.service";
import { toCheckoutOrder } from "@backend/services/order.mapper";
import type { CheckoutOrder } from "@/types";

export type VerifyPaymentResult =
  | { ok: true; order: CheckoutOrder; alreadyConfirmed?: boolean }
  | { ok: false; error: string; status: number };

export async function verifyPayment(input: {
  orderNumber: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  authUser?: AuthUser | null;
}): Promise<VerifyPaymentResult> {
  if (
    !verifyRazorpaySignature(
      input.razorpayOrderId,
      input.razorpayPaymentId,
      input.razorpaySignature,
    )
  ) {
    return { ok: false, error: "Payment verification failed", status: 400 };
  }

  const existing = await findOrderByRazorpayOrderId(input.razorpayOrderId);
  if (existing) {
    if (existing.orderNumber !== input.orderNumber) {
      return { ok: false, error: "Order mismatch", status: 400 };
    }

    if (existing.userId && input.authUser) {
      if (existing.userId.toString() !== input.authUser._mongoId.toString()) {
        return { ok: false, error: "Forbidden", status: 403 };
      }
    }

    if (existing.status === "paid") {
      return {
        ok: true,
        order: toCheckoutOrder(existing as never),
        alreadyConfirmed: true,
      };
    }
  }

  const order = await markOrderPaid(input.orderNumber, input.razorpayPaymentId);
  if (!order) {
    return { ok: false, error: "Order not found", status: 404 };
  }

  return { ok: true, order };
}
