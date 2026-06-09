import mongoose, { Schema } from "mongoose";
import { ORDER_STATUSES, type OrderStatus } from "@/constants/order-status";

export { ORDER_STATUSES, type OrderStatus };

export const PAYMENT_METHODS = ["cod", "upi", "card"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const statusHistorySchema = new Schema(
  {
    status: { type: String, required: true },
    at: { type: Date, required: true, default: Date.now },
    note: { type: String },
  },
  { _id: false },
);

const orderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    variantId: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    variantTitle: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPricePaise: { type: Number, required: true, min: 0 },
    image: { type: String },
    descriptionSnapshot: { type: String },
    categorySnapshot: { type: String },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true, required: false },
    razorpayOrderId: { type: String, index: true, sparse: true },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "pending_payment",
      index: true,
    },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
    subtotalPaise: { type: Number, required: true },
    discountPaise: { type: Number, required: true, default: 0 },
    shippingPaise: { type: Number, required: true, default: 0 },
    amountPaise: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    couponCode: { type: String },
    discountPercent: { type: Number, default: 0 },
    catalogSnapshotAt: { type: Date },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerEmail: { type: String, required: true, index: true },
    customerPhone: { type: String, required: true },
    shippingLine1: { type: String, required: true },
    shippingLine2: { type: String },
    shippingCity: { type: String, required: true },
    shippingState: { type: String, required: true },
    shippingPincode: { type: String, required: true },
    razorpayPaymentId: { type: String },
    paidAt: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    statusHistory: { type: [statusHistorySchema], default: [] },
    items: { type: [orderItemSchema], required: true },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
