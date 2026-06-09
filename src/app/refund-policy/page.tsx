import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/assets";

export const metadata = generatePageMetadata({
  title: "Refund Policy",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl prose prose-sm md:prose-base">
        <h1>Cancellation &amp; Refunds</h1>
        <p>
          We want you to be happy with your purchase. Here&apos;s how returns and
          refunds work.
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
          Email {SITE_CONFIG.email} or WhatsApp {SITE_CONFIG.phone} with your order
          number. Support hours: {SITE_CONFIG.supportHours}.
        </p>
        <h2>Refund timing</h2>
        <p>
          Approved refunds are processed within 7–10 business days after we receive and
          inspect the product. COD orders are refunded via UPI or bank transfer.
        </p>
        <p>
          For shipping timelines, see our{" "}
          <Link href="/shipping-policy">Shipping Policy</Link>.
        </p>
      </div>
    </div>
  );
}
