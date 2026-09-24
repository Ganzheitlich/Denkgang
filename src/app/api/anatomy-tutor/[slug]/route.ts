import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAnatomyForTutor } from "@/lib/queries";
import { buildAnatomyTutorSystemPrompt } from "@/lib/anatomyTutorPrompt";

/**
 * Serverseitiger Anthropic-Proxy fuer den Anatomie-Tutor (mehrstufiger Dialog):
 * der Key bleibt hier, die Muskel-Fakten kommen ausschliesslich aus der DB
 * (getAnatomyForTutor, nur APPROVED) und werden dem Modell als alleinige
 * Wissensgrundlage vorgegeben.
 */

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 40;
const MAX_MESSAGE_LENGTH = 2000;

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (v.role === "user" || v.role === "assistant") && typeof v.content === "string";
}

export async function POST(request: Request, { params }: RouteContext<"/api/anatomy-tutor/[slug]">) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const body: unknown = await request.json().catch(() => null);
  const rawMessages: unknown[] = Array.isArray((body as { messages?: unknown })?.messages)
    ? ((body as { messages: unknown[] }).messages)
    : [];

  const messages: ChatMessage[] = rawMessages
    .filter(isChatMessage)
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0) {
    messages.push({ role: "user", content: "Ich bin bereit, lass uns mit diesem Muskel starten." });
  }
  if (messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Ungültiger Nachrichtenverlauf." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Anatomie-Tutor derzeit nicht konfiguriert." }, { status: 503 });
  }

  const muscle = await getAnatomyForTutor(slug);
  if (!muscle) {
    return NextResponse.json({ error: "Anatomie-Item nicht gefunden." }, { status: 404 });
  }

  const systemPrompt = buildAnatomyTutorSystemPrompt(muscle);

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
        max_tokens: 500,
        system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
        messages,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Tutor-Antwort fehlgeschlagen." }, { status: 502 });
    }

    const data = await response.json();
    const text = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: text || null });
  } catch {
    return NextResponse.json({ error: "Tutor-Antwort fehlgeschlagen." }, { status: 502 });
  }
}
