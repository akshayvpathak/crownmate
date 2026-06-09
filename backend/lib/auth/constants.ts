export const COOKIE_ACCESS = "cm_access";
export const COOKIE_REFRESH = "cm_refresh";
export const REFRESH_COOKIE_PATH = "/api/auth";

export const ACCESS_TTL_SEC = parseInt(
  process.env.ACCESS_TOKEN_TTL_SEC || process.env.ACCESS_TOKEN_TTL || "900",
  10,
);
export const REFRESH_TTL_SEC = parseInt(
  process.env.REFRESH_TOKEN_TTL_SEC ||
    process.env.REFRESH_TOKEN_TTL ||
    String(60 * 60 * 24 * 14),
  10,
);

export const OTP_TTL_MS = 15 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
