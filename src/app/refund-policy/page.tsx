import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/assets";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";

export const metadata = generatePageMetadata({
  title: "Refund Policy",
  description:
    "Crownmate's cancellation and refund policy — easy returns, no chasing required. Defective unit? WhatsApp us and we'll sort it.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Cancellation & Refunds"
      description="How returns, replacements, and refunds work for Crownmate orders."
    >
      <p>
        We want you to be happy with your purchase. Here&apos;s how returns and refunds
        work.
      </p>

      <h2>Damaged or defective on arrival</h2>
      <p>
        Report it within <strong>48 hours</strong> of delivery with photos and your
        order ID. We&apos;ll arrange a replacement or full refund — no need to ship it
        back in most cases.
      </p>

      <h2>Change of mind</h2>
      <ul>
        <li>Unused items in original packaging may be returned within 7 days</li>
        <li>Opened or used devices are not eligible unless defective</li>
        <li>
          Return shipping is at the customer&apos;s cost unless we sent the wrong item
        </li>
      </ul>

      <h2>How to start a return</h2>
      <p>
        Email <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</Link> or{" "}
        <WhatsAppLink className="underline">WhatsApp us</WhatsAppLink> at{" "}
        {SITE_CONFIG.phone} with your order number. Support hours:{" "}
        {SITE_CONFIG.supportHours}.
      </p>

      <h2>Refund timing</h2>
      <p>
        Approved refunds are processed within 7–10 business days after we receive and
        inspect the product. Refunds are processed via UPI or bank transfer.
      </p>

      <h2>Related policies</h2>
      <p>
        For shipping timelines, see our{" "}
        <Link href="/shipping-policy">Shipping Policy</Link>. For general purchase
        terms, see our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
