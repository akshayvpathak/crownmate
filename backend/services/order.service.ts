import { appendStatusHistory } from "@backend/lib/order-history";
import { connectMongo } from "@backend/lib/mongodb";
import { OrderModel, type OrderStatus } from "@backend/models/Order";
import { toCheckoutOrder, toOrderDetails } from "@backend/services/order.mapper";
import type { CheckoutOrder, OrderDetails } from "@/types";

export async function findOrderByNumberAndEmail(
  orderNumber: string,
  email: string,
): Promise<OrderDetails | null> {
  await connectMongo();
  const doc = await OrderModel.findOne({
    orderNumber,
    customerEmail: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
  }).lean();

  return doc ? toOrderDetails(doc as never) : null;
}

export async function findOrderByRazorpayOrderId(razorpayOrderId: string) {
  await connectMongo();
  return OrderModel.findOne({ razorpayOrderId }).lean();
}

export async function markOrderPaid(
  orderNumber: string,
  razorpayPaymentId: string,
): Promise<CheckoutOrder | null> {
  await connectMongo();
  const doc = await OrderModel.findOne({ orderNumber });
  if (!doc) return null;

  if (doc.status === "paid") {
    return toOrderDetails(doc.toObject() as never);
  }

  doc.status = "paid";
  doc.razorpayPaymentId = razorpayPaymentId;
  doc.paidAt = new Date();
  doc.statusHistory = appendStatusHistory(
    doc.statusHistory,
    "paid",
    "Payment verified",
  );
  await doc.save();
  return toOrderDetails(doc.toObject() as never);
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
): Promise<CheckoutOrder | null> {
  await connectMongo();
  const doc = await OrderModel.findOneAndUpdate(
    { orderNumber },
    { $set: { status } },
    { new: true },
  ).lean();

  return doc ? toCheckoutOrder(doc as never) : null;
}
