import { createHash, randomBytes } from "crypto";
import type mongoose from "mongoose";
import { REFRESH_TTL_SEC } from "@backend/lib/auth/constants";
import { RefreshTokenModel } from "@backend/models/RefreshToken";

export function generateRefreshTokenValue(): string {
  return randomBytes(32).toString("hex");
}

export function hashRefreshToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export async function createRefreshTokenRecord(
  userId: mongoose.Types.ObjectId,
  rawToken: string,
  meta?: { userAgent?: string; ip?: string | null },
): Promise<void> {
  await RefreshTokenModel.create({
    userId,
    tokenHash: hashRefreshToken(rawToken),
    expiresAt: new Date(Date.now() + REFRESH_TTL_SEC * 1000),
    userAgent: meta?.userAgent,
    ip: meta?.ip,
  });
}

export async function rotateRefreshToken(
  oldRawToken: string,
  newRawToken: string,
  meta?: { userAgent?: string; ip?: string | null },
): Promise<{ userId: mongoose.Types.ObjectId } | null> {
  const oldDoc = await RefreshTokenModel.findOne({
    tokenHash: hashRefreshToken(oldRawToken),
    revokedAt: { $exists: false },
  });
  if (!oldDoc || oldDoc.expiresAt < new Date()) return null;

  const newDoc = await RefreshTokenModel.create({
    userId: oldDoc.userId,
    tokenHash: hashRefreshToken(newRawToken),
    expiresAt: new Date(Date.now() + REFRESH_TTL_SEC * 1000),
    userAgent: meta?.userAgent,
    ip: meta?.ip,
  });

  oldDoc.revokedAt = new Date();
  oldDoc.replacedBy = newDoc._id;
  await oldDoc.save();

  return { userId: oldDoc.userId as mongoose.Types.ObjectId };
}

export async function revokeRefreshTokenByRaw(rawToken: string): Promise<void> {
  await RefreshTokenModel.updateOne(
    { tokenHash: hashRefreshToken(rawToken), revokedAt: { $exists: false } },
    { $set: { revokedAt: new Date() } },
  );
}
