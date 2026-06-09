"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { Input } from "@/components/ui/input";
import { AdminTableSkeleton } from "@/components/admin/admin-table-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminBasePath } from "@/hooks/use-admin-base-path";
import { useAdminList } from "@/hooks/use-admin-list";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "user" | "admin";
  emailVerified: boolean;
  orderCount: number;
  createdAt: string;
};

const PAGE_SIZE = 15;

function AdminUsersPageContent() {
  const adminBasePath = useAdminBasePath();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") ?? "all";

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(
    initialRole === "admin" || initialRole === "user" ? initialRole : "all",
  );
  const [appliedRole, setAppliedRole] = useState(
    initialRole === "admin" || initialRole === "user" ? initialRole : "",
  );
  const [savingId, setSavingId] = useState<string | null>(null);

  const { items, total, loading, error, reload } = useAdminList<AdminUser>({
    endpoint: "/api/admin/users",
    listKey: "users",
    page,
    pageSize: PAGE_SIZE,
    search,
    extraParams: appliedRole ? { role: appliedRole } : undefined,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function applyFilters() {
    setSearch(searchInput.trim());
    setAppliedRole(roleFilter === "all" ? "" : roleFilter);
    setPage(1);
  }

  async function toggleRole(user: AdminUser) {
    const nextRole = user.role === "admin" ? "user" : "admin";
    setSavingId(user.id);
    const res = await fetchWithSessionRefresh(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: nextRole }),
    });
    setSavingId(null);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      toast.error(data.error || "Could not update role");
      return;
    }
    toast.success(
      nextRole === "admin" ? "User promoted to admin" : "Admin access removed",
    );
    void reload();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Users"
        description="Manage customer accounts and admin access."
        onRefresh={() => void reload()}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-3 md:grid-cols-[1fr_auto_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
          >
            <Input
              placeholder="Name or email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="admin">Admins only</SelectItem>
                <SelectItem value="user">Customers only</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Apply</Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <AdminTableSkeleton rows={5} cols={5} />
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  items.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.emailVerified ? "Verified" : "Not verified"}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={
                            user.role === "admin"
                              ? "rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"
                              : "rounded-full bg-muted px-2 py-1 text-xs font-medium"
                          }
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {user.orderCount > 0 ? (
                          <Link
                            href={`${adminBasePath}/orders?email=${encodeURIComponent(user.email)}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {user.orderCount}
                          </Link>
                        ) : (
                          "0"
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={savingId === user.id}
                          onClick={() => void toggleRole(user)}
                        >
                          {savingId === user.id
                            ? "Saving…"
                            : user.role === "admin"
                              ? "Remove admin"
                              : "Make admin"}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        label="users"
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-muted-foreground">Loading users…</p>}
    >
      <AdminUsersPageContent />
    </Suspense>
  );
}
