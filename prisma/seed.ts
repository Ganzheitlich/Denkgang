/**
 * CLI-Einstiegspunkt fuer `npx prisma db seed` (lokale Entwicklung / manueller
 * Lauf gegen eine erreichbare DATABASE_URL). Die eigentlichen Daten und die
 * Upsert-Logik liegen in src/lib/seedContent.ts, damit sie auch vom
 * geschuetzten Admin-Endpunkt (/api/admin/seed) wiederverwendet werden koennen.
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedContent } from "../src/lib/seedContent";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

seedContent(prisma)
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
