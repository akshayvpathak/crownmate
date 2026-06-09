import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Order Confirmation",
  path: "/order-confirmation",
  noIndex: true,
});

export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
