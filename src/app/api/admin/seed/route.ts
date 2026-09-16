import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedContent } from "@/lib/seedContent";

/**
 * Geschuetzter Wartungs-Endpunkt: spielt den Prototyp-Content (DRAFT) idempotent
 * ein. Existiert, weil die Produktions-Connection-String nur zur Laufzeit der
 * Netlify Function bekannt ist, nicht in der Entwicklungsumgebung — daher kann
 * das CLI-Seed-Skript nicht direkt gegen die Produktions-DB laufen.
 *
 * Nimmt das Secret entweder als Header (x-seed-secret) oder als Query-Parameter
 * (?secret=...) entgegen, damit es sich auch per einfachem Link im Browser
 * auslösen laesst (GET), nicht nur per curl/POST.
 */
function isAuthorized(request: Request): boolean {
  const expected = process.env.SEED_SECRET;
  if (!expected) return false;

  const url = new URL(request.url);
  const provided = request.headers.get("x-seed-secret") ?? url.searchParams.get("secret") ?? "";

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  return expectedBuf.length === providedBuf.length && timingSafeEqual(expectedBuf, providedBuf);
}

async function runSeed(request: Request) {
  if (!process.env.SEED_SECRET) {
    return NextResponse.json({ error: "SEED_SECRET nicht konfiguriert." }, { status: 503 });
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedContent(prisma);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed fehlgeschlagen." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  return runSeed(request);
}

export async function GET(request: Request) {
  return runSeed(request);
}
