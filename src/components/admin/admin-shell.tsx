"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Store,
  LogOut,
  MessageSquare,
  Mail,
  Shield,
  Users,
  Tag,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";

const NAV = [
  { segment: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { segment: "/orders", label: "Orders", icon: Package },
  { segment: "/inquiries", label: "Inquiries", icon: MessageSquare },
  { segment: "/warranty", label: "Warranty", icon: Shield },
  { segment: "/newsletter", label: "Newsletter", icon: Mail },
  { segment: "/users", label: "Users", icon: Users },
  { segment: "/products", label: "Products", icon: Boxes },
  { segment: "/coupons", label: "Coupons", icon: Tag },
];

type AdminUser = { name: string; email: string; role: string };

export function AdminShell({
  children,
  adminBasePath,
}: {
  children: React.ReactNode;
  adminBasePath: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetchWithSessionRefresh("/api/me");
      if (cancelled) return;
      if (!res.ok) {
        router.replace(`${adminBasePath}/login`);
        return;
      }
      const data = (await res.json()) as AdminUser;
      if (data.role !== "admin") {
        router.replace("/");
        return;
      }
      setUser(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [adminBasePath, pathname, router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push(`${adminBasePath}/login`);
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Crownmate Admin</p>
              <p className="text-xs text-muted-foreground">
                {user ? `${user.name} · ${user.email}` : "Loading…"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <Store className="mr-2 h-4 w-4" />
                Store
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-6 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-xl border border-border bg-background p-3">
          <nav className="space-y-1">
            {NAV.map(({ segment, label, icon: Icon }) => {
              const href = `${adminBasePath}${segment}`;
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={segment}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
