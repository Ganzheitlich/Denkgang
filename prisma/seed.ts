/**
 * CLI-Einstiegspunkt fuer `npx prisma db seed` (lokale Entwicklung / manueller
 * Lauf gegen eine erreichbare DATABASE_URL). Die eigentlichen Daten und die
 * Upsert-Logik liegen in src/lib/seedContent.ts, damit sie auch vom
 * geschuetzten Admin-Endpunkt (/api/admin/seed) wiederverwendet werden koennen.
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getConnectionString } from "@netlify/database";
import { seedContent } from "../src/lib/seedContent";

function resolveConnectionString(): string {
  try {
    return getConnectionString();
  } catch {
    return process.env.DATABASE_URL!;
  }
}

const adapter = new PrismaPg({ connectionString: resolveConnectionString() });
const prisma = new PrismaClient({ adapter });

seedContent(prisma)
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
