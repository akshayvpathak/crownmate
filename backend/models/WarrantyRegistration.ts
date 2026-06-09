import mongoose, { Schema } from "mongoose";

const warrantySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    productName: { type: String, required: true },
    orderId: { type: String, required: true },
    purchaseDate: { type: String, required: true },
  },
  { timestamps: true },
);

export const WarrantyRegistrationModel =
  mongoose.models.WarrantyRegistration ||
  mongoose.model("WarrantyRegistration", warrantySchema);
