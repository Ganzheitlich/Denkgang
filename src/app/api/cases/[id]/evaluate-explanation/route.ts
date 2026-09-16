import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Serverseitiger Ersatz fuer den Client-Fetch im Prototyp: der Anthropic-Key
 * bleibt hier und wird nie an den Browser ausgeliefert.
 */
export async function POST(request: Request, { params }: RouteContext<"/api/cases/[id]/evaluate-explanation">) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const explanation = typeof body?.explanation === "string" ? body.explanation.trim() : "";
  if (!explanation) {
    return NextResponse.json({ error: "Keine Begründung übermittelt." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Auswertung derzeit nicht konfiguriert." }, { status: 503 });
  }

  const caseData = await prisma.case.findUnique({
    where: { id },
    select: { title: true, expertNote: true },
  });
  if (!caseData) {
    return NextResponse.json({ error: "Fall nicht gefunden." }, { status: 404 });
  }

  const prompt = `Du hilfst einer Tierphysiotherapie-Studentin, ihre klinische Begründung zu reflektieren. Antworte auf Deutsch, kurz (max. 4-5 Sätze insgesamt), in genau dieser Struktur mit diesen drei Zeilen:
Was du richtig erkannt hast: ...
Was dir gefehlt hat: ...
Entscheidend war: ...

Fall-Kontext: ${caseData.title}. Fachliche Musterlösung: ${caseData.expertNote}

Begründung der Studentin: "${explanation}"

Sei konstruktiv und konkret, keine allgemeinen Floskeln, keine Wiederholung der Musterlösung als Ganzes.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Auswertung fehlgeschlagen." }, { status: 502 });
    }

    const data = await response.json();
    const text = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ feedback: text || null });
  } catch {
    return NextResponse.json({ error: "Auswertung fehlgeschlagen." }, { status: 502 });
  }
}
