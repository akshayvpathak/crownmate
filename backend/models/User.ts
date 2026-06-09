import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    emailVerified: { type: Boolean, default: false, index: true },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
