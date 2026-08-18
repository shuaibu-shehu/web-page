import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client.
 *
 * DATABASE_URL is required — public pages read the DB at build time (SSG) and
 * the admin reads it per request. Without the env var this throws a clear
 * error instead of a cryptic connection failure.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
