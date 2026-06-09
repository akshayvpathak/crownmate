import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/assets";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl prose prose-sm md:prose-base">
        <h1>Privacy Policy</h1>
        <p>
          CrownMate ({SITE_CONFIG.email}) collects only the information needed to
          process your orders, handle warranty claims, and reply to support requests.
        </p>
        <h2>What we collect</h2>
        <p>
          Name, email, phone, shipping address, and order history when you buy from us
          or contact support. We also collect basic site usage data through standard
          analytics.
        </p>
        <h2>How we use it</h2>
        <ul>
          <li>Processing orders and arranging delivery</li>
          <li>Warranty and return requests</li>
          <li>Responding to questions and complaints</li>
          <li>Occasional product updates if you subscribe to our newsletter</li>
        </ul>
        <h2>How we protect it</h2>
        <p>
          Payment details are handled by Razorpay — we don&apos;t store card numbers.
          Other data is kept on secure servers with access limited to our support and
          operations team.
        </p>
        <h2>Your rights</h2>
        <p>
          Email {SITE_CONFIG.email} to request a copy of your data or ask us to delete
          it. We&apos;ll respond within 7 business days.
        </p>
      </div>
    </div>
  );
}
