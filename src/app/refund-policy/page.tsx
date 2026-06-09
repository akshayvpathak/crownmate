import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Refund Policy",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="section-padding">
      <div className="container-frizty max-w-3xl prose prose-sm md:prose-base">
        <h1>Refund Policy</h1>
        <p>
          CrownMate offers a 90-Day Money-Back Guarantee on all products. If you
          don&apos;t get the results you expected, enjoy our money back guarantee.
        </p>
        <h2>Return Eligibility</h2>
        <ul>
          <li>Products must be returned within 90 days of delivery</li>
          <li>Items must be in original packaging with all accessories</li>
          <li>Damaged or defective products must be reported within 48 hours</li>
        </ul>
        <h2>How to Request a Refund</h2>
        <p>
          Contact our customer support at support@crownmate.in or call +91 97120 78733
          with your order details. Our team will guide you through the return process.
        </p>
        <h2>Refund Processing</h2>
        <p>
          Refunds are processed within 7-10 business days after we receive and inspect
          the returned product. The refund will be credited to your original payment
          method.
        </p>
      </div>
    </div>
  );
}
