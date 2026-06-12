import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    usageLimit: { type: Number, min: 1, default: null },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export const CouponModel =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
