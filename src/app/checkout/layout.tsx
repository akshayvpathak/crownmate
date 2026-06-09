import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Checkout",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
