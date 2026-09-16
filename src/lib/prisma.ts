import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getConnectionString } from "@netlify/database";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveConnectionString(): string {
  // Auf Netlify (sobald die DB-Extension provisioniert hat) liefert das die
  // Neon-Connection-String ueber NETLIFY_DB_URL; lokal existiert dieser
  // Kontext nicht, dann greift der Fallback auf die eigene .env.
  try {
    return getConnectionString();
  } catch {
    return process.env.DATABASE_URL!;
  }
}

const adapter = new PrismaPg({
  connectionString: resolveConnectionString(),
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
