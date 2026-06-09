import { connectMongo } from "@backend/lib/mongodb";
import { ContactInquiryModel } from "@backend/models/ContactInquiry";
import { NewsletterSubscriptionModel } from "@backend/models/NewsletterSubscription";
import { WarrantyRegistrationModel } from "@backend/models/WarrantyRegistration";

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  await connectMongo();
  await ContactInquiryModel.create(data);
}

export async function saveNewsletterSubscription(email: string): Promise<void> {
  await connectMongo();
  await NewsletterSubscriptionModel.updateOne(
    { email: email.toLowerCase().trim() },
    { $setOnInsert: { email: email.toLowerCase().trim() } },
    { upsert: true },
  );
}

export async function saveWarrantyRegistration(data: {
  name: string;
  email: string;
  phone: string;
  productName: string;
  orderId: string;
  purchaseDate: string;
}): Promise<void> {
  await connectMongo();
  await WarrantyRegistrationModel.create(data);
}
