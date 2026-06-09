import { Suspense } from "react";
import { OrderConfirmationContent } from "@/components/checkout/order-confirmation-content";

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="section-padding text-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
