import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG, TEL_PHONE } from "@/constants/assets";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Contact Us",
  description: "Reach CrownMate support by email, phone, or WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-site">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="mb-8 text-muted-foreground">
          Questions about an order, which device to buy, or warranty? Drop us a message
          or reach out directly.
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
                  {SITE_CONFIG.supportHours}
                </p>
                <a href={TEL_PHONE} className="text-sm underline">
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm underline">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold">WhatsApp</p>
              <WhatsAppLink className="text-sm underline">
                Chat with us on WhatsApp ({SITE_CONFIG.phone})
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
