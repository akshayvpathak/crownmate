import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/order-storage";
import type { CheckoutOrder } from "@/types";

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as CheckoutOrder;
    if (!order?.orderId || !order?.customer?.email) {
      return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }
    await saveOrder(order);
    return NextResponse.json({ success: true, orderId: order.orderId });
  } catch {
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
