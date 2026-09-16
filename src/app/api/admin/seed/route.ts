import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedContent } from "@/lib/seedContent";

/**
 * Geschuetzter Wartungs-Endpunkt: spielt den Prototyp-Content (DRAFT) idempotent
 * ein. Existiert, weil die Produktions-Connection-String nur zur Laufzeit der
 * Netlify Function bekannt ist, nicht in der Entwicklungsumgebung — daher kann
 * das CLI-Seed-Skript nicht direkt gegen die Produktions-DB laufen.
 */
export async function POST(request: Request) {
  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "SEED_SECRET nicht konfiguriert." }, { status: 503 });
  }

  const provided = request.headers.get("x-seed-secret") ?? "";
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  const valid =
    expectedBuf.length === providedBuf.length && timingSafeEqual(expectedBuf, providedBuf);

  if (!valid) {
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
