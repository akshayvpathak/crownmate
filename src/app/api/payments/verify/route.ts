import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@backend/lib/auth/get-auth-user";
import { verifyPayment } from "@backend/services/payment.service";

export const runtime = "nodejs";

const verifySchema = z.object({
  orderId: z.string().min(3),
  razorpayOrderId: z.string().min(3),
  razorpayPaymentId: z.string().min(3),
  razorpaySignature: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid payment payload" },
        { status: 400 },
      );
    }

    const authUser = await getAuthUser(request);
    const result = await verifyPayment({
      orderNumber: parsed.data.orderId,
      razorpayOrderId: parsed.data.razorpayOrderId,
      razorpayPaymentId: parsed.data.razorpayPaymentId,
      razorpaySignature: parsed.data.razorpaySignature,
      authUser,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      success: true,
      alreadyConfirmed: result.alreadyConfirmed,
      order: result.order,
    });
  } catch {
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
