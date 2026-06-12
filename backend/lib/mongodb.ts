import mongoose from "mongoose";
import { getOptionalEnv } from "@backend/lib/env";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = globalThis as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalForMongoose._mongooseCache ?? {
  conn: null,
  promise: null,
};

if (process.env.NODE_ENV !== "production") {
  globalForMongoose._mongooseCache = cache;
}

export function isMongoConfigured(): boolean {
  return Boolean(getOptionalEnv("MONGODB_URI"));
}

export async function connectMongo(): Promise<typeof mongoose> {
  const uri = getOptionalEnv("MONGODB_URI");
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
  }

  cache.conn = await cache.promise;

  return cache.conn;
}
