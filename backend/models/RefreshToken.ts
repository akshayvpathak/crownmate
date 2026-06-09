import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date },
    replacedBy: { type: Schema.Types.ObjectId, ref: "RefreshToken" },
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: true },
);

export const RefreshTokenModel =
  mongoose.models.RefreshToken || mongoose.model("RefreshToken", refreshTokenSchema);
