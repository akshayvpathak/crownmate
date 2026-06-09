import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pincode"),
  paymentMethod: z.enum(["cod", "upi", "card"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const trackOrderSchema = z.object({
  orderId: z.string().min(3, "Order ID is required"),
  email: z.string().email("Please enter a valid email"),
});

export type TrackOrderFormData = z.infer<typeof trackOrderSchema>;

export const warrantySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  productName: z.string().min(2, "Product name is required"),
  orderId: z.string().min(3, "Order ID is required"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
});

export type WarrantyFormData = z.infer<typeof warrantySchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
