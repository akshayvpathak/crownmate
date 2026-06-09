import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  IndianRupee,
  Mail,
  MessageSquare,
  Package,
  Shield,
  Truck,
  Users,
  XCircle,
} from "lucide-react";

export type DashboardStats = {
  total: number;
  pendingPayment: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenuePaise: number;
  inquiries: number;
  newsletter: number;
  warranty: number;
  users: number;
  admins: number;
};

type StatCard = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
};

export function AdminDashboardStats({
  stats,
  basePath,
}: {
  stats: DashboardStats;
  basePath: string;
}) {
  const cards: StatCard[] = [
    {
      label: "Total orders",
      value: stats.total.toString(),
      icon: Package,
      href: `${basePath}/orders`,
    },
    {
      label: "Awaiting payment",
      value: stats.pendingPayment.toString(),
      icon: Clock,
      href: `${basePath}/orders?status=pending_payment`,
    },
    {
      label: "Processing",
      value: stats.processing.toString(),
      icon: Package,
      href: `${basePath}/orders?status=processing`,
    },
    {
      label: "Shipped",
      value: stats.shipped.toString(),
      icon: Truck,
      href: `${basePath}/orders?status=shipped`,
    },
    {
      label: "Delivered",
      value: stats.delivered.toString(),
      icon: CheckCircle,
      href: `${basePath}/orders?status=delivered`,
    },
    {
      label: "Cancelled / failed",
      value: stats.cancelled.toString(),
      icon: XCircle,
      href: `${basePath}/orders?status=cancelled`,
    },
    {
      label: "Confirmed revenue",
      value: formatPrice(stats.revenuePaise / 100),
      icon: IndianRupee,
      href: `${basePath}/orders?status=delivered`,
    },
    {
      label: "Contact inquiries",
      value: stats.inquiries.toString(),
      icon: MessageSquare,
      href: `${basePath}/inquiries`,
    },
    {
      label: "Newsletter subs",
      value: stats.newsletter.toString(),
      icon: Mail,
      href: `${basePath}/newsletter`,
    },
    {
      label: "Warranty claims",
      value: stats.warranty.toString(),
      icon: Shield,
      href: `${basePath}/warranty`,
    },
    {
      label: "Registered users",
      value: stats.users.toString(),
      icon: Users,
      href: `${basePath}/users`,
    },
    {
      label: "Admin accounts",
      value: stats.admins.toString(),
      icon: Users,
      href: `${basePath}/users?role=admin`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cards.map((card) => {
        const content = (
          <Card
            className={
              card.href
                ? "transition-colors hover:border-primary/40 hover:bg-muted/30"
                : undefined
            }
          >
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
        );

        return card.href ? (
          <Link key={card.label} href={card.href} className="block">
            {content}
          </Link>
        ) : (
          <div key={card.label}>{content}</div>
        );
      })}
    </div>
  );
}
