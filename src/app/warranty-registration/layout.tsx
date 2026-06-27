import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Warranty Registration",
  description:
    "Register your Crownmate device warranty in minutes. All devices include 1-year coverage against manufacturing defects.",
  path: "/warranty-registration",
});

export default function WarrantyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
