import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/assets";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "How Crownmate collects, uses, and protects your personal data when you shop on crownmate.in. Your privacy matters to us.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Crownmate collects, uses, and protects your personal information when you shop with us."
    >
      <p>
        <strong>{SITE_CONFIG.name}</strong> collects only the information needed to
        process your orders, handle warranty claims, and reply to support requests.
        Contact us at{" "}
        <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</Link> with any
        privacy questions.
      </p>

      <h2>What we collect</h2>
      <p>
        Name, email, phone, shipping address, and order history when you buy from us or
        contact support. If you create an account, we also store your login credentials
        in encrypted form. We collect basic site usage data through standard analytics.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>Processing orders and arranging delivery</li>
        <li>Warranty and return requests</li>
        <li>Responding to questions and complaints</li>
        <li>Managing your account and order history</li>
        <li>Occasional product updates if you subscribe to our newsletter</li>
      </ul>

      <h2>How we protect it</h2>
      <p>
        Payment details are handled by Razorpay — we don&apos;t store card numbers.
        Other data is kept on secure servers with access limited to our support and
        operations team.
      </p>

      <h2>Sharing your data</h2>
      <p>
        We do not sell your personal information. We share data only with service
        providers needed to run the store, such as payment processors and courier
        partners, and only what they need to complete your order.
      </p>

      <h2>Cookies &amp; analytics</h2>
      <p>
        We use cookies and similar technologies to keep the site working, remember your
        preferences, and understand how visitors use our pages. You can control cookies
        through your browser settings.
      </p>

      <h2>Your rights</h2>
      <p>
        Email <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</Link> to
        request a copy of your data or ask us to delete it. We&apos;ll respond within 7
        business days.
      </p>

      <h2>Related policies</h2>
      <p>
        See also our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>{" "}
        and <Link href="/refund-policy">Cancellation &amp; Refunds</Link> policies.
      </p>
    </LegalPage>
  );
}
