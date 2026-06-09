import { paiseToRupees } from "@backend/lib/pricing";
import type { OrderStatus, PaymentMethod } from "@backend/models/Order";
import type {
  CheckoutOrder,
  OrderDetails,
  OrderStatusEvent,
  PaymentIntent,
} from "@/types";

type OrderDoc = {
  orderNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  subtotalPaise: number;
  discountPaise: number;
  shippingPaise: number;
  amountPaise: number;
  currency: string;
  couponCode?: string | null;
  discountPercent?: number;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  shippingLine1: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  statusHistory?: Array<{ status: OrderStatus; at: Date | string; note?: string }>;
  items: Array<{
    productId: string;
    variantId: string;
    slug: string;
    name: string;
    variantTitle: string;
    quantity: number;
    unitPricePaise: number;
    image?: string;
  }>;
};

function mapLegacyStatus(status: OrderStatus): CheckoutOrder["status"] {
  if (
    status === "paid" ||
    status === "processing" ||
    status === "shipped" ||
    status === "delivered"
  ) {
    return "confirmed";
  }
  if (status === "failed" || status === "cancelled") return "failed";
  return "pending";
}

function mapStatusHistory(
  history?: OrderDoc["statusHistory"],
): OrderStatusEvent[] | undefined {
  if (!history?.length) return undefined;
  return history.map((entry) => ({
    status: entry.status,
    at: new Date(entry.at).toISOString(),
    note: entry.note,
  }));
}

function mapPaymentIntent(doc: OrderDoc): PaymentIntent {
  const status = mapLegacyStatus(doc.status);
  return {
    orderId: doc.orderNumber,
    amount: paiseToRupees(doc.amountPaise),
    currency: doc.currency,
    provider: doc.paymentMethod === "cod" ? "cod" : "razorpay",
    status:
      status === "confirmed" ? "confirmed" : status === "failed" ? "failed" : "pending",
    razorpayOrderId: doc.razorpayOrderId ?? undefined,
  };
}

function getOrderMessage(doc: OrderDoc): string {
  const legacy = mapLegacyStatus(doc.status);
  if (legacy === "confirmed") {
    return doc.paymentMethod === "cod"
      ? "Order placed successfully!"
      : "Payment received. Your order is confirmed!";
  }
  if (legacy === "failed") {
    return doc.status === "cancelled"
      ? "This order was cancelled."
      : "Payment failed. Contact support if you need help.";
  }
  return doc.paymentMethod === "cod"
    ? "Order placed successfully!"
    : "Complete payment via Razorpay to confirm your order.";
}

export function toOrderDetails(doc: OrderDoc): OrderDetails {
  const status = mapLegacyStatus(doc.status);

  return {
    orderId: doc.orderNumber,
    status,
    orderStatus: doc.status,
    paymentMethod: doc.paymentMethod,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
    statusHistory: mapStatusHistory(doc.statusHistory),
    items: doc.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      slug: item.slug,
      title: item.name,
      variantTitle: item.variantTitle,
      price: paiseToRupees(item.unitPricePaise),
      quantity: item.quantity,
      image: item.image ?? "",
    })),
    customer: {
      email: doc.customerEmail,
      firstName: doc.customerFirstName,
      lastName: doc.customerLastName,
      phone: doc.customerPhone,
      address: doc.shippingLine1,
      city: doc.shippingCity,
      state: doc.shippingState,
      pincode: doc.shippingPincode,
    },
    subtotal: paiseToRupees(doc.subtotalPaise),
    discount: paiseToRupees(doc.discountPaise),
    shipping: paiseToRupees(doc.shippingPaise),
    discountPercent: doc.discountPercent,
    couponCode: doc.couponCode ?? null,
    total: paiseToRupees(doc.amountPaise),
    paymentIntent: mapPaymentIntent(doc),
    message: getOrderMessage(doc),
  };
}

export function toCheckoutOrder(doc: OrderDoc): CheckoutOrder {
  return toOrderDetails(doc);
}
