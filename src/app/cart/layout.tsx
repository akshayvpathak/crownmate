import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Cart",
  path: "/cart",
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
