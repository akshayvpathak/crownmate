/** Internal Next.js route prefix (not exposed when ADMIN_BASE_PATH is set). */
export const INTERNAL_ADMIN_PREFIX = "/admin";

/** Public URL prefix for the admin panel. Set ADMIN_BASE_PATH in production. */
export function getAdminBasePath(): string {
  const configured = process.env.ADMIN_BASE_PATH?.trim().replace(/\/$/, "");
  return configured || INTERNAL_ADMIN_PREFIX;
}

export function isAdminPathHidden(): boolean {
  return Boolean(process.env.ADMIN_BASE_PATH?.trim());
}

/** Match browser pathname against internal or secret admin URLs (client-safe). */
export function matchesAdminUrlPath(pathname: string): boolean {
  if (
    pathname === INTERNAL_ADMIN_PREFIX ||
    pathname.startsWith(`${INTERNAL_ADMIN_PREFIX}/`)
  ) {
    return true;
  }

  const publicBase = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH?.trim().replace(/\/$/, "");
  if (publicBase) {
    return pathname === publicBase || pathname.startsWith(`${publicBase}/`);
  }

  return false;
}
