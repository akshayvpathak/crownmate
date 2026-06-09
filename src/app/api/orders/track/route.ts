import { NextResponse } from "next/server";
import { findOrderByNumberAndEmail } from "@backend/services/order.service";
import { getStatusDescription, getStatusLabel } from "@/lib/order-status";
import { trackOrderSchema } from "@/schemas/contact-schema";

export const runtime = "nodejs";

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

    const order = await findOrderByNumberAndEmail(
      parsed.data.orderId,
      parsed.data.email,
    );
    if (!order) {
      return NextResponse.json(
        { error: "No order found for that ID and email." },
        { status: 404 },
      );
    }

    const lifecycleStatus = order.orderStatus ?? "pending_payment";

    return NextResponse.json({
      order,
      orderId: order.orderId,
      status: order.status,
      orderStatus: lifecycleStatus,
      total: order.total,
      message:
        order.status === "confirmed"
          ? `${getStatusLabel(lifecycleStatus)}. ${getStatusDescription(lifecycleStatus)}`
          : getStatusDescription(lifecycleStatus),
    });
  } catch {
    return NextResponse.json({ error: "Failed to track order" }, { status: 500 });
  }
}
