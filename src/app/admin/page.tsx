import { redirect } from "next/navigation";
import { getAdminBasePath } from "@/lib/admin-path";

export default function AdminIndexPage() {
  redirect(`${getAdminBasePath()}/login`);
}
