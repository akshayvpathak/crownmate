import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Track Your Order",
  description:
    "Track your Crownmate order in real time. Enter your order ID to see shipping status and estimated delivery across India.",
  path: "/track-order",
});

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="section-padding text-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
