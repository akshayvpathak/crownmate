import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding">
      <div className="container-frizty max-w-3xl prose prose-sm md:prose-base">
        <h1>Privacy Policy</h1>
        <p>
          FRIZTY PERSONAL CARE LLP has created this Privacy Policy to help you
          understand how we collect, use and protect your information when you visit the
          Site and use the Products and services.
        </p>
        <h2>What personal information does CrownMate collect?</h2>
        <p>
          We may hold information relating to you that you have provided to us while
          registering with us or while placing an order. This information may include
          your name, address, telephone numbers, and information on how you use our
          products.
        </p>
        <h2>How does CrownMate use your Personal Information?</h2>
        <p>The information may be used for:</p>
        <ul>
          <li>Processing your orders and making deliveries</li>
          <li>Verifying products purchased for warranty claims</li>
          <li>Dealing with requests, enquiries or complaints</li>
          <li>Carrying out market and product analysis</li>
          <li>Contacting you about products and services</li>
        </ul>
        <h2>Protecting your personal information</h2>
        <p>
          CrownMate Retail takes reasonable steps to ensure that personal information is
          stored in a secure environment protected from unauthorised access. Contact us
          at support@crownmate.in for any concerns.
        </p>
        <h2>Children&apos;s privacy</h2>
        <p>
          The Site is not permissible for use by individuals under the age of 13.
          Parents/guardians must control and supervise any web-based activity conducted
          by children under 13.
        </p>
      </div>
    </div>
  );
}
