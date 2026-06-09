import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Track Your Order",
  path: "/track-order",
});

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
