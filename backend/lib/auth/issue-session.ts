import type mongoose from "mongoose";
import { NextResponse } from "next/server";
import { setAuthCookies } from "@backend/lib/auth/cookies";
import { signAccessToken } from "@backend/lib/auth/jwt";
import {
  createRefreshTokenRecord,
  generateRefreshTokenValue,
} from "@backend/lib/auth/refresh-token";

type UserLean = {
  _id: mongoose.Types.ObjectId;
  email: string;
  role: string;
};

export async function issueSessionCookies(
  res: NextResponse,
  user: UserLean,
  meta?: { userAgent?: string; ip?: string | null },
): Promise<void> {
  const role = user.role === "admin" ? "admin" : "user";
  const access = await signAccessToken({
    sub: user._id.toString(),
    email: user.email,
    role,
  });
  const refreshRaw = generateRefreshTokenValue();
  await createRefreshTokenRecord(user._id, refreshRaw, meta);
  setAuthCookies(res, access, refreshRaw);
}
