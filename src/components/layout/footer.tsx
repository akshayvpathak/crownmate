import Link from "next/link";
import { SITE_CONFIG } from "@/constants/assets";
import {
  footerBrandLinks,
  footerLegalLinks,
  footerShopLinks,
  footerSupportLinks,
} from "@/constants/navigation";
import { NewsletterForm } from "@/components/forms/newsletter-form";
export function Footer() {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="container-site section-padding">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <h3 className="mb-3 text-base font-semibold">Stay Connected</h3>
            <p className="mb-4 text-sm text-white/60">
              Sign up for our newsletter to receive updates on Products and events from{" "}
              {SITE_CONFIG.name}.
            </p>
            <NewsletterForm />
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold">We&apos;re Social Media</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <a
                  href={SITE_CONFIG.social.facebook}
                  className="hover:text-white hover:underline"
                >
                  Facebook
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  className="hover:text-white hover:underline"
                >
                  Instagram
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  className="hover:text-white hover:underline"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <FooterColumn title="Shop" links={footerShopLinks} />
          <FooterColumn title="Brand" links={footerBrandLinks} />
          <div>
            <FooterColumn title="Support" links={footerSupportLinks} />
            <div className="mt-6">
              <FooterColumn title="Legal" links={footerLegalLinks} />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>© 2026 {SITE_CONFIG.name} India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
