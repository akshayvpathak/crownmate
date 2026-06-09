import { NextResponse } from "next/server";
import { requireAuth } from "@backend/lib/auth/get-auth-user";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { OrderModel } from "@backend/models/Order";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) return user;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Orders require MONGODB_URI" }, { status: 503 });
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const orders = await OrderModel.find({ userId: user._mongoId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    orders: orders.map((o) => ({
      id: o._id.toString(),
      orderNumber: o.orderNumber,
      status: o.status,
      amountPaise: o.amountPaise,
      currency: o.currency,
      paymentMethod: o.paymentMethod,
      couponCode: o.couponCode ?? null,
      createdAt: o.createdAt,
      items: o.items,
      customerName: `${o.customerFirstName} ${o.customerLastName}`.trim(),
      shippingCity: o.shippingCity,
      shippingState: o.shippingState,
      shippingPincode: o.shippingPincode,
    })),
  });
}
