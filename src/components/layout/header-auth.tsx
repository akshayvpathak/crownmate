"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type MeUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  adminPath?: string | null;
};

export function HeaderAuth({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const [user, setUser] = useState<MeUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (cancelled) return;
        if (!res.ok) {
          setUser(null);
          return;
        }
        setUser((await res.json()) as MeUser);
      } catch {
        if (!cancelled) setUser(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (user === undefined) return null;

  if (!user) {
    if (mobile) {
      return (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <Link href="/login" className="block text-sm font-medium">
            Log in
          </Link>
          <Link href="/signup" className="block text-sm text-muted-foreground">
            Sign up
          </Link>
        </div>
      );
    }
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Button asChild variant="ghost" size="sm" className="text-xs xl:text-sm">
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild size="sm" className="text-xs xl:text-sm">
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">Signed in as {user.name}</p>
        <Link href="/account/orders" className="block text-sm font-medium">
          My orders
        </Link>
        {user.adminPath && (
          <Link href={user.adminPath} className="block text-sm font-medium">
            Admin panel
          </Link>
        )}
        <button
          type="button"
          onClick={logout}
          className="block text-sm text-muted-foreground"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Button asChild variant="ghost" size="sm" className="text-xs xl:text-sm">
        <Link href="/account/orders">Orders</Link>
      </Button>
      {user.adminPath && (
        <Button asChild variant="ghost" size="sm" className="text-xs xl:text-sm">
          <Link href={user.adminPath}>Admin</Link>
        </Button>
      )}
      <Button variant="ghost" size="sm" className="text-xs xl:text-sm" onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
