import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { generatePageMetadata } from "@/lib/seo";
import { SHIPPING_CONFIG, SITE_CONFIG } from "@/constants/assets";
import { getDeliveryRangeText } from "@/lib/shipping";

export const metadata = generatePageMetadata({
  title: "Terms & Conditions",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The terms that apply when you browse crownmate.in or purchase Crownmate products."
    >
      <p>
        By using the Crownmate website and purchasing our products, you agree to these
        terms. If you have questions, contact{" "}
        <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</Link>.
      </p>

      <h2>Products &amp; Pricing</h2>
      <p>
        Prices are in Indian Rupees (INR) and include applicable taxes. We may update
        prices without prior notice.
      </p>

      <h2>Shipping</h2>
      <p>
        Free shipping on all orders. Orders ship within 24 hours on business days.
        Delivery typically takes {getDeliveryRangeText()}. See our{" "}
        <Link href="/shipping-policy">Shipping Policy</Link> for details.
      </p>

      <h2>Warranty</h2>
      <p>
        All devices include a 1-year warranty against manufacturing defects. Register at
        our <Link href="/warranty-registration">Warranty Registration</Link> page.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Crownmate is not liable for indirect or consequential damages from use of our
        products or website. Devices are for personal home use as described in each
        product&apos;s manual.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by Indian law. Disputes fall under courts in Ahmedabad,
        Gujarat.
      </p>

      <h2>Related policies</h2>
      <p>
        See also our <Link href="/privacy-policy">Privacy Policy</Link>,{" "}
        <Link href="/refund-policy">Cancellation &amp; Refunds</Link>, and{" "}
        <Link href="/shipping-policy">Shipping Policy</Link>.
      </p>
    </LegalPage>
  );
}
