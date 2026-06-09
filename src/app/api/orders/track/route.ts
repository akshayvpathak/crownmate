import { NextResponse } from "next/server";
import { findOrder } from "@/lib/order-storage";
import { trackOrderSchema } from "@/schemas/contact-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = trackOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const order = await findOrder(parsed.data.orderId, parsed.data.email);
    if (!order) {
      return NextResponse.json(
        { error: "No order found for that ID and email." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      orderId: order.orderId,
      status: order.status,
      total: order.total,
      message:
        order.status === "confirmed"
          ? "Your order is confirmed and will ship within 24 hours."
          : "Payment pending — complete checkout via the link sent to your email.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to track order" }, { status: 500 });
  }
}
