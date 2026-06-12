import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { generatePageMetadata } from "@/lib/seo";
import { SHIPPING_CONFIG, SITE_CONFIG, WHATSAPP_URL } from "@/constants/assets";
import { getDeliveryRangeText } from "@/lib/shipping";

export const metadata = generatePageMetadata({
  title: "Shipping Policy",
  description: "CrownMate shipping rates and delivery timelines across India.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      description="Shipping rates, delivery timelines, and tracking for CrownMate orders across India."
    >
      <p>
        CrownMate ships across India. Orders are packed and handed to our courier
        partner within 24 hours on business days.
      </p>

      <h2>Shipping rates</h2>
      <ul>
        <li>
          Orders above ₹{SHIPPING_CONFIG.freeThreshold}: <strong>free shipping</strong>
        </li>
        <li>
          Orders below ₹{SHIPPING_CONFIG.freeThreshold}: flat ₹
          {SHIPPING_CONFIG.flatRate} shipping fee
        </li>
      </ul>

      <h2>Delivery time</h2>
      <p>
        Most deliveries arrive in <strong>{getDeliveryRangeText()}</strong> depending on
        your pin code. Remote areas may take a day or two longer.
      </p>

      <h2>Tracking</h2>
      <p>
        Once dispatched, you&apos;ll get an SMS and email with a tracking link. You can
        also use our <Link href="/track-order">Track Your Order</Link> page with your
        order ID.
      </p>

      <h2>Questions?</h2>
      <p>
        Email <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</Link> or{" "}
        <Link href={WHATSAPP_URL}>WhatsApp us</Link> at {SITE_CONFIG.phone}. Support
        hours: {SITE_CONFIG.supportHours}.
      </p>

      <h2>Related policies</h2>
      <p>
        See also our <Link href="/refund-policy">Cancellation &amp; Refunds</Link> and{" "}
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
