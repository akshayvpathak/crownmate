export async function refreshSession(): Promise<boolean> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}

export async function fetchWithSessionRefresh(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const cfg: RequestInit = {
    ...init,
    credentials: init?.credentials ?? "include",
  };
  const first = await fetch(input, cfg);
  if (first.status !== 401) return first;
  const rotated = await refreshSession();
  if (!rotated) return first;
  return fetch(input, cfg);
}
