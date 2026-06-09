import mongoose, { Schema } from "mongoose";

const emailOtpSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    purpose: { type: String, enum: ["signup"], required: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true },
    attempts: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

emailOtpSchema.index({ email: 1, purpose: 1 });

export const EmailOtpModel =
  mongoose.models.EmailOtp || mongoose.model("EmailOtp", emailOtpSchema);
