import { timingSafeEqual } from "crypto";
import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedContent } from "@/lib/seedContent";
import { isRateLimited } from "@/lib/rateLimit";

/**
 * Geschuetzter Wartungs-Endpunkt: spielt den Prototyp-Content (DRAFT) idempotent
 * ein. Existiert, weil die Produktions-Datenbank von der Entwicklungsumgebung
 * (Sandbox) aus nicht erreichbar ist — daher kann das CLI-Seed-Skript nicht
 * direkt gegen die Produktions-DB laufen.
 *
 * GET prueft das Secret, loest den Seed aber NICHT direkt aus — es liefert nur
 * eine Bestaetigungsseite mit einem echten Formular-Button. Grund: Ein per GET
 * abrufbarer Link mit Secret in der URL wird von Chat-/Mail-Clients (Slack-
 * /Teams-Linkvorschau, Outlook Safe Links, Browser-Prefetch) automatisch
 * abgerufen, sobald der Link irgendwo landet — ohne diese Zwischenseite würde
 * allein das Teilen/Speichern des Links den Seed-Lauf ungewollt auslösen.
 * Diese Bots fuehren kein JavaScript aus und senden kein Formular ab, ein
 * echter Klick auf den Button schon — die Seite selbst enthaelt deshalb
 * bewusst kein Auto-Submit. POST fuehrt den Seed sofort aus: fuer den Button
 * oben sowie fuer curl-/Skript-Aufrufe.
 *
 * Nimmt das Secret per Header (x-seed-secret) oder Query-Parameter
 * (?secret=...) entgegen. Zusaetzlich pro IP ratenbegrenzt, um Secret-Raten
 * per Brute-Force zu erschweren; fehlgeschlagene Versuche werden (ohne das
 * Secret selbst) geloggt.
 *
 * Der eigentliche Seed-Lauf passiert (100+ Wissenseinträge) via after() im
 * Hintergrund, nachdem die Antwort schon rausgegangen ist — sonst reisst die
 * Verbindung ab (ERR_CONNECTION_ABORTED), bevor der Request fertig ist. Das
 * Ergebnis landet dafür nur noch in den Vercel-Function-Logs, nicht mehr in
 * der HTTP-Antwort.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isAuthorized(request: Request): boolean {
  const expected = process.env.SEED_SECRET;
  if (!expected) return false;

  const url = new URL(request.url);
  const provided = request.headers.get("x-seed-secret") ?? url.searchParams.get("secret") ?? "";

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  return expectedBuf.length === providedBuf.length && timingSafeEqual(expectedBuf, providedBuf);
}

/** Validiert SEED_SECRET-Konfiguration, Rate-Limit und Secret; null = ok. */
function guard(request: Request): NextResponse | null {
  if (!process.env.SEED_SECRET) {
    return NextResponse.json({ error: "SEED_SECRET nicht konfiguriert." }, { status: 503 });
  }
  if (isRateLimited(`seed:${clientIp(request)}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte später erneut versuchen." }, { status: 429 });
  }
  if (!isAuthorized(request)) {
    console.warn(`Seed-Endpoint: nicht autorisierter Versuch von ${clientIp(request)}`);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function confirmPageHtml(secret: string): string {
  const action = `/api/admin/seed?secret=${encodeURIComponent(secret)}`;
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex" />
  <title>Denkgang – Seed bestätigen</title>
</head>
<body style="font-family: system-ui, sans-serif; max-width: 480px; margin: 60px auto; padding: 0 20px; color: #1a1a1a;">
  <h1 style="font-size: 20px;">Content-Seed starten?</h1>
  <p>Spielt den aktuellen Prototyp-Content (DRAFT) idempotent in die Datenbank ein. Bereits geprüfte/freigegebene Inhalte werden dabei nicht zurückgesetzt.</p>
  <form method="POST" action="${action}">
    <button type="submit" style="padding: 10px 18px; font-size: 15px;">Seed jetzt starten</button>
  </form>
</body>
</html>`;
}

export async function POST(request: Request) {
  const rejection = guard(request);
  if (rejection) return rejection;

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

export async function GET(request: Request) {
  const rejection = guard(request);
  if (rejection) return rejection;

  const url = new URL(request.url);
  const secret = url.searchParams.get("secret") ?? request.headers.get("x-seed-secret") ?? "";
  return new NextResponse(confirmPageHtml(secret), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
