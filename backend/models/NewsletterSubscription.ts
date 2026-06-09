import mongoose, { Schema } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const NewsletterSubscriptionModel =
  mongoose.models.NewsletterSubscription ||
  mongoose.model("NewsletterSubscription", newsletterSchema);
