import type mongoose from "mongoose";
import { NextResponse } from "next/server";
import { readAccessTokenFromRequest } from "@backend/lib/auth/cookies";
import { verifyAccessToken } from "@backend/lib/auth/jwt";
import { connectMongo, isMongoConfigured } from "@backend/lib/mongodb";
import { UserModel } from "@backend/models/User";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  emailVerified: boolean;
  _mongoId: mongoose.Types.ObjectId;
};

export async function getAuthUser(request: Request): Promise<AuthUser | null> {
  if (!isMongoConfigured()) return null;

  const token = readAccessTokenFromRequest(request);
  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  await connectMongo();
  const user = await UserModel.findById(payload.sub).lean();
  if (!user || !user.emailVerified) return null;

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role === "admin" ? "admin" : "user",
    emailVerified: user.emailVerified,
    _mongoId: user._id,
  };
}

export async function requireAuth(request: Request): Promise<AuthUser | NextResponse> {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}
