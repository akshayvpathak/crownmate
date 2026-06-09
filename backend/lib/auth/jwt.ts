import { SignJWT, jwtVerify } from "jose";
import { ACCESS_TTL_SEC } from "@backend/lib/auth/constants";
import { getRequiredEnv } from "@backend/lib/env";

function getAccessSecret(): Uint8Array {
  return new TextEncoder().encode(getRequiredEnv("JWT_ACCESS_SECRET"));
}

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: "user" | "admin";
  typ: "access";
};

export async function signAccessToken(
  payload: Omit<AccessTokenPayload, "typ">,
): Promise<string> {
  const secret = getAccessSecret();
  return new SignJWT({ typ: "access", email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TTL_SEC}s`)
    .sign(secret);
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    const sub = typeof payload.sub === "string" ? payload.sub : "";
    const email = typeof payload.email === "string" ? payload.email : "";
    const role = payload.role === "admin" ? "admin" : "user";
    if (payload.typ !== "access" || !sub || !email) return null;
    return { sub, email, role, typ: "access" };
  } catch {
    return null;
  }
}
