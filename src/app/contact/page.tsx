import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/assets";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "Contact Us",
  description: "Get in touch with CrownMate customer support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-frizty">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="mb-8 text-muted-foreground">
          Email, Call or Complete the form to learn how CrownMate can solve your
          messaging problem.
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />

          <div className="space-y-6">
            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">{SITE_CONFIG.address}</p>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Customer Support</p>
                <p className="text-sm text-muted-foreground">
                  Our support team is available around the clock.
                </p>
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm underline">
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Media Inquiries</p>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm underline">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
