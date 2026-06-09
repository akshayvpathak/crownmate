"use client";

/** Client-safe admin URL prefix (matches server getAdminBasePath). */
export function useAdminBasePath(): string {
  const configured = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH?.trim().replace(/\/$/, "");
  return configured || "/admin";
}
