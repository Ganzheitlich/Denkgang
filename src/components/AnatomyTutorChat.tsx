"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STARTER: ChatMessage = {
  role: "user",
  content: "Ich bin bereit, lass uns mit diesem Muskel starten.",
};

export function AnatomyTutorChat({
  slug,
  name,
  bildUrl,
}: {
  slug: string;
  name: string;
  bildUrl: string | null;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function send(history: ChatMessage[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/anatomy-tutor/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.reply) {
        setError(data?.error || "Der Tutor konnte nicht antworten. Bitte später erneut versuchen.");
        return;
      }
      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Der Tutor konnte nicht antworten. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void send([STARTER]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function submit() {
    const text = input.trim();
    if (!text || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    void send(next);
  }

  const visibleMessages = messages.filter((m) => m !== STARTER);

  return (
    <>
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Anatomie-Tutor</span>
      </div>
      <div className="case-title">{name}</div>
      <div className="source-note" style={{ marginBottom: 12 }}>
        Sokratischer Dialog: Du leitest die Funktion selbst her. Nutze bei Bedarf dein eigenes
        Anatomie-Buch oder -Atlas.
      </div>

      {bildUrl && (
        <div className="case-image-wrap">
          <Image
            src={bildUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="case-image"
          />
        </div>
      )}

      <div className="tutor-chat card">
        <div className="tutor-messages">
          {visibleMessages.map((m, i) => (
            <div key={i} className={`tutor-msg ${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && <div className="tutor-msg assistant tutor-typing">Der Tutor denkt nach …</div>}
          <div ref={bottomRef} />
        </div>
      </div>

      {error && (
        <div className="source-note" style={{ color: "var(--rust)" }}>
          {error}
        </div>
      )}

      <div className="tutor-input-row">
        <textarea
          className="tutor-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Deine Antwort …"
          rows={2}
          disabled={loading}
        />
        <button className="btn-primary" onClick={submit} disabled={loading || !input.trim()}>
          Senden
        </button>
      </div>
    </>
  );
}
