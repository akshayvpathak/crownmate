import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Package, Clock, Truck, CheckCircle, IndianRupee, XCircle } from "lucide-react";

type AdminStats = {
  total: number;
  pendingPayment: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenuePaise: number;
};

export function AdminStats({ stats }: { stats: AdminStats }) {
  const cards = [
    { label: "Total orders", value: stats.total.toString(), icon: Package },
    { label: "Awaiting payment", value: stats.pendingPayment.toString(), icon: Clock },
    { label: "Processing", value: stats.processing.toString(), icon: Package },
    { label: "Shipped", value: stats.shipped.toString(), icon: Truck },
    { label: "Delivered", value: stats.delivered.toString(), icon: CheckCircle },
    { label: "Cancelled / failed", value: stats.cancelled.toString(), icon: XCircle },
    {
      label: "Confirmed revenue",
      value: formatPrice(stats.revenuePaise / 100),
      icon: IndianRupee,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.label}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
