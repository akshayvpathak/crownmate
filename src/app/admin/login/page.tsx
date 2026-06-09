import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminBasePath } from "@/lib/admin-path";

export default function AdminLoginPage() {
  return <AdminLoginForm adminBasePath={getAdminBasePath()} />;
}
