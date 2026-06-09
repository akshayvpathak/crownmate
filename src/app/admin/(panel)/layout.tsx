import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminBasePath } from "@/lib/admin-path";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell adminBasePath={getAdminBasePath()}>{children}</AdminShell>;
}
