import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { SHIPPING_CONFIG, SITE_CONFIG } from "@/constants/assets";
import { getDeliveryRangeText } from "@/lib/shipping";

export const metadata = generatePageMetadata({
  title: "Terms & Conditions",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl prose prose-sm md:prose-base">
        <h1>Terms &amp; Conditions</h1>
        <p>
          By using the CrownMate website and purchasing our products, you agree to these
          terms.
        </p>
        <h2>Products &amp; Pricing</h2>
        <p>
          Prices are in Indian Rupees (INR) and include applicable taxes. We may update
          prices without prior notice.
        </p>
        <h2>Shipping</h2>
        <p>
          Free shipping on orders above ₹{SHIPPING_CONFIG.freeThreshold}. Below that, a
          flat ₹{SHIPPING_CONFIG.flatRate} shipping fee applies. Orders ship within 24
          hours on business days. Delivery typically takes {getDeliveryRangeText()}. See
          our <Link href="/shipping-policy">Shipping Policy</Link> for details.
        </p>
        <h2>Warranty</h2>
        <p>
          All devices include a 1-year warranty against manufacturing defects. Register
          at our <Link href="/warranty-registration">Warranty Registration</Link> page.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          CrownMate is not liable for indirect or consequential damages from use of our
          products or website. Devices are for personal home use as described in each
          product&apos;s manual.
        </p>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by Indian law. Disputes fall under courts in Surat,
          Gujarat. Questions: {SITE_CONFIG.email}.
        </p>
      </div>
    </div>
  );
}
