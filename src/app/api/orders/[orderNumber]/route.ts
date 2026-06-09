import { NextResponse } from "next/server";
import { getAuthUser } from "@backend/lib/auth/get-auth-user";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { paiseToRupees } from "@backend/lib/pricing";
import { OrderModel, type OrderStatus } from "@backend/models/Order";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ orderNumber: string }> },
) {
  const { orderNumber } = await context.params;
  const id = decodeURIComponent(orderNumber || "").trim();
  if (!id) {
    return NextResponse.json({ error: "Missing order number" }, { status: 400 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Order lookup unavailable" }, { status: 503 });
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const auth = await getAuthUser(request);
  const order = await OrderModel.findOne({ orderNumber: id }).lean();
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner = auth && order.userId && order.userId.toString() === auth.id;
  const isPublic =
    order.status === "paid" ||
    order.status === "processing" ||
    order.status === "shipped" ||
    order.status === "delivered";

  if (isOwner) {
    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status as OrderStatus,
      amountPaise: order.amountPaise,
      total: paiseToRupees(order.amountPaise),
      currency: order.currency,
      paymentMethod: order.paymentMethod,
      couponCode: order.couponCode ?? null,
      createdAt: order.createdAt,
      items: order.items,
      customerFirstName: order.customerFirstName,
      customerLastName: order.customerLastName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      shippingLine1: order.shippingLine1,
      shippingCity: order.shippingCity,
      shippingState: order.shippingState,
      shippingPincode: order.shippingPincode,
      razorpayPaymentId: order.razorpayPaymentId,
    });
  }

  if (!isPublic) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    status: order.status,
    amountPaise: order.amountPaise,
    total: paiseToRupees(order.amountPaise),
    currency: order.currency,
    createdAt: order.createdAt,
    items: order.items.map(
      (item: {
        name: string;
        variantTitle: string;
        quantity: number;
        unitPricePaise: number;
        image?: string;
      }) => ({
        name: item.name,
        variantTitle: item.variantTitle,
        quantity: item.quantity,
        unitPricePaise: item.unitPricePaise,
        image: item.image,
      }),
    ),
  });
}
