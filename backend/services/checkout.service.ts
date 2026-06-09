import {
  enrichLineItemsWithCatalogSnapshot,
  validateCartItems,
} from "@backend/lib/catalog";
import { validateCouponCode } from "@backend/lib/coupons";
import { loadProducts } from "@backend/lib/product-store";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { generateOrderNumber } from "@backend/lib/order-number";
import { calculateOrderPricing } from "@backend/lib/pricing";
import {
  createRazorpayOrder,
  getRazorpayPublicKeyId,
  isRazorpayConfigured,
} from "@backend/lib/razorpay";
import type mongoose from "mongoose";
import { createInitialStatusHistory } from "@backend/lib/order-history";
import { OrderModel, type PaymentMethod } from "@backend/models/Order";
import { toCheckoutOrder } from "@backend/services/order.mapper";
import type { CheckoutFormData } from "@/schemas/contact-schema";
import type { CartItem, CheckoutOrder } from "@/types";

export type CheckoutResult =
  | { ok: true; order: CheckoutOrder; razorpayKeyId?: string }
  | { ok: false; error: string; status: number };

export async function processCheckout(input: {
  form: CheckoutFormData;
  items: CartItem[];
  couponCode?: string | null;
  userId?: mongoose.Types.ObjectId | null;
}): Promise<CheckoutResult> {
  const cartResult = await validateCartItems(input.items);
  if (!cartResult.ok) {
    return { ok: false, error: cartResult.error, status: 400 };
  }

  let couponDiscountPercent = 0;
  let appliedCouponCode: string | null = null;

  if (input.couponCode?.trim()) {
    const couponResult = await validateCouponCode(input.couponCode);
    if (!couponResult.valid) {
      return { ok: false, error: "Invalid coupon code", status: 400 };
    }
    couponDiscountPercent = couponResult.discountPercent;
    appliedCouponCode = couponResult.code;
  }

  const pricing = calculateOrderPricing(
    cartResult.subtotalRupees,
    couponDiscountPercent,
  );
  const products = await loadProducts();
  const snapshotItems = enrichLineItemsWithCatalogSnapshot(cartResult.items, products);
  const orderNumber = generateOrderNumber();
  const paymentMethod = input.form.paymentMethod as PaymentMethod;
  const isCod = paymentMethod === "cod";

  let razorpayOrderId: string | undefined;
  let razorpayKeyId: string | undefined;

  if (!isCod && isRazorpayConfigured()) {
    try {
      const rzOrder = await createRazorpayOrder(pricing.totalPaise, orderNumber, {
        orderNumber,
        email: input.form.email,
      });
      razorpayOrderId = rzOrder.id;
      razorpayKeyId = getRazorpayPublicKeyId();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Payment provider error";
      return { ok: false, error: message, status: 502 };
    }
  } else if (!isCod) {
    razorpayOrderId = `order_${orderNumber}`;
  }

  const customerName = {
    firstName: input.form.firstName.trim(),
    lastName: input.form.lastName.trim(),
  };

  if (!isMongoConfigured()) {
    return {
      ok: false,
      error: "Store checkout requires MONGODB_URI to be configured",
      status: 503,
    };
  }

  try {
    await connectMongo();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    return { ok: false, error: message, status: 503 };
  }

  const initialStatus = isCod ? "processing" : "pending_payment";
  const doc = await OrderModel.create({
    orderNumber,
    userId: input.userId ?? undefined,
    razorpayOrderId,
    status: initialStatus,
    statusHistory: createInitialStatusHistory(
      initialStatus,
      isCod ? "Cash on delivery order placed" : "Awaiting online payment",
    ),
    paymentMethod,
    subtotalPaise: pricing.subtotalPaise,
    discountPaise: pricing.discountPaise,
    shippingPaise: pricing.shippingPaise,
    amountPaise: pricing.totalPaise,
    currency: "INR",
    couponCode: appliedCouponCode ?? undefined,
    discountPercent: pricing.effectiveDiscountPercent,
    catalogSnapshotAt: new Date(),
    customerFirstName: customerName.firstName,
    customerLastName: customerName.lastName,
    customerEmail: input.form.email.trim(),
    customerPhone: input.form.phone.trim(),
    shippingLine1: input.form.address.trim(),
    shippingCity: input.form.city.trim(),
    shippingState: input.form.state.trim(),
    shippingPincode: input.form.pincode.trim(),
    items: snapshotItems.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      slug: item.slug,
      name: item.title,
      variantTitle: item.variantTitle,
      quantity: item.quantity,
      unitPricePaise: item.unitPricePaise,
      image: item.image,
      descriptionSnapshot: item.descriptionSnapshot,
      categorySnapshot: item.categorySnapshot,
    })),
  });

  const order = toCheckoutOrder(doc.toObject() as never);
  return { ok: true, order, razorpayKeyId };
}
