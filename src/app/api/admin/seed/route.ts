import { timingSafeEqual } from "crypto";
import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedContent } from "@/lib/seedContent";

/**
 * Geschuetzter Wartungs-Endpunkt: spielt den Prototyp-Content (DRAFT) idempotent
 * ein. Existiert, weil die Produktions-Datenbank von der Entwicklungsumgebung
 * (Sandbox) aus nicht erreichbar ist — daher kann das CLI-Seed-Skript nicht
 * direkt gegen die Produktions-DB laufen.
 *
 * Nimmt das Secret entweder als Header (x-seed-secret) oder als Query-Parameter
 * (?secret=...) entgegen, damit es sich auch per einfachem Link im Browser
 * auslösen laesst (GET), nicht nur per curl/POST.
 *
 * Der eigentliche Seed-Lauf passiert inzwischen (100+ Wissenseinträge) via
 * after() im Hintergrund, nachdem die Antwort schon rausgegangen ist — sonst
 * reisst die Verbindung ab (ERR_CONNECTION_ABORTED), bevor der Request fertig
 * ist. Das Ergebnis landet dafür nur noch in den Vercel-Function-Logs, nicht
 * mehr in der HTTP-Antwort.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

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

  after(async () => {
    try {
      const result = await seedContent(prisma);
      console.log("Seed abgeschlossen:", result);
    } catch (error) {
      console.error("Seed fehlgeschlagen:", error);
    }
  });

  return NextResponse.json({ ok: true, started: true, message: "Seed läuft im Hintergrund — Ergebnis steht in den Vercel-Function-Logs." });
}

export async function POST(request: Request) {
  return runSeed(request);
}

export async function GET(request: Request) {
  return runSeed(request);
}
