import { generatePageMetadata } from "@/lib/seo";
import { SHIPPING_CONFIG, SITE_CONFIG } from "@/constants/assets";
import { getDeliveryRangeText } from "@/lib/shipping";

export const metadata = generatePageMetadata({
  title: "Shipping Policy",
  description: "CrownMate shipping rates and delivery timelines across India.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl prose prose-sm md:prose-base">
        <h1>Shipping Policy</h1>
        <p>
          CrownMate ships across India. Orders are packed and handed to our courier
          partner within 24 hours on business days.
        </p>
        <h2>Shipping rates</h2>
        <ul>
          <li>
            Orders above ₹{SHIPPING_CONFIG.freeThreshold}:{" "}
            <strong>free shipping</strong>
          </li>
          <li>
            Orders below ₹{SHIPPING_CONFIG.freeThreshold}: flat ₹
            {SHIPPING_CONFIG.flatRate} shipping fee
          </li>
        </ul>
        <h2>Delivery time</h2>
        <p>
          Most deliveries arrive in <strong>{getDeliveryRangeText()}</strong> depending
          on your pin code. Remote areas may take a day or two longer.
        </p>
        <h2>Tracking</h2>
        <p>
          Once dispatched, you&apos;ll get an SMS and email with a tracking link. You
          can also use our <a href="/track-order">Track Your Order</a> page with your
          order ID.
        </p>
        <h2>Questions?</h2>
        <p>
          Email {SITE_CONFIG.email} or WhatsApp {SITE_CONFIG.phone}. Support hours:{" "}
          {SITE_CONFIG.supportHours}.
        </p>
      </div>
    </div>
  );
}
