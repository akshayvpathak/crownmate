import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Warranty Registration",
  path: "/warranty-registration",
});

export default function WarrantyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
