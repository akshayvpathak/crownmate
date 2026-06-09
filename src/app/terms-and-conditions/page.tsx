import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Terms & Conditions",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-frizty max-w-3xl prose prose-sm md:prose-base">
        <h1>Terms &amp; Conditions</h1>
        <p>
          By accessing and using the Frizty website, you agree to be bound by these
          Terms and Conditions.
        </p>
        <h2>Products &amp; Pricing</h2>
        <p>
          All prices are listed in Indian Rupees (INR) and include applicable taxes.
          Frizty reserves the right to change prices without prior notice.
        </p>
        <h2>Shipping Policy</h2>
        <p>
          We provide free shipping across India. Orders are processed within 24 hours
          and delivered within 3-4 working days depending on your location.
        </p>
        <h2>Warranty</h2>
        <p>
          All Frizty products come with a 1-year warranty against manufacturing defects.
          Register your product at our Warranty Registration page.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          Frizty Personal Care LLP shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our products or website.
        </p>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be subject
          to the jurisdiction of courts in Surat, Gujarat.
        </p>
      </div>
    </div>
  );
}
