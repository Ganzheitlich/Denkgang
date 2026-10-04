"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { checkTransferChoice, submitAnatomyAttempt } from "@/app/anatomy/[slug]/actions";
import { KnowledgeCta } from "@/components/KnowledgeCta";
import { ANATOMY_KIND_LABELS, fieldLabelsFor } from "@/lib/anatomyKind";
import type { AnatomyKind } from "@/generated/prisma/enums";

type ClientAnatomy = {
  id: string;
  name: string;
  kind: AnatomyKind;
  bildUrl: string | null;
  origin: string | null;
  insertion: string | null;
  funktion: string | null;
  innervation: string | null;
  clinicalRelevance: string;
  palpationHint: string;
  transferQ: string;
  transferOptions: { label: string }[];
};

export function AnatomyFlow({ anatomyData: a }: { anatomyData: ClientAnatomy }) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState<{
    correct: boolean;
    correctIndex: number;
    sourceStatus: string;
    relatedKnowledge: { slug: string; title: string }[] | null;
  } | null>(null);
  const [finishing, setFinishing] = useState(false);

  async function chooseTransfer(i: number) {
    if (choice !== null) return;
    setChoice(i);
    const r = await checkTransferChoice(a.id, i);
    setResult(r);
  }

  async function finish() {
    if (choice === null) return;
    setFinishing(true);
    await submitAnatomyAttempt(a.id, choice);
  }

  const labels = fieldLabelsFor(a.kind);
  const fields: { label: string; value: string | null }[] = [
    { label: labels.origin, value: a.origin },
    { label: labels.insertion, value: a.insertion },
    { label: labels.funktion, value: a.funktion },
    { label: labels.innervation, value: a.innervation },
  ].filter((f) => f.value);

  return (
    <>
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">{ANATOMY_KIND_LABELS[a.kind]}</span>
      </div>
      <div className="case-title">{a.name}</div>

      {a.bildUrl && (
        <div className="case-image-wrap">
          <Image
            src={a.bildUrl}
            alt={a.name}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="case-image"
          />
        </div>
      )}

      {fields.length > 0 && (
        <div className="step-block">
          <div className="step-label">{labels.stepLabel}</div>
          <div className="card">
            {fields.map((f, i) => (
              <div key={f.label} style={i > 0 ? { marginTop: 6 } : undefined}>
                <strong>{f.label}:</strong> {f.value}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 0 && (
        <div className="btn-row">
          <button className="btn-primary" onClick={() => setStep(1)}>
            Weiter zur klinischen Bedeutung
          </button>
        </div>
      )}

      {step >= 1 && (
        <div className="step-block">
          <div className="step-label">Klinische Bedeutung & Palpation</div>
          <div className="card">
            <div>{a.clinicalRelevance}</div>
            <div style={{ marginTop: 8, color: "var(--ink-soft)", fontSize: 13.5 }}>{a.palpationHint}</div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="btn-row">
          <button className="btn-primary" onClick={() => setStep(2)}>
            Weiter zur Transferfrage
          </button>
        </div>
      )}

      {step >= 2 && (
        <div className="step-block">
          <div className="step-label">Transferfrage: von Anatomie zu Befund</div>
          <div className="card">
            <div style={{ marginBottom: 6 }}>{a.transferQ}</div>
            <div className="pill-group">
              {a.transferOptions.map((opt, i) => {
                let cls = "pill";
                if (result) {
                  if (i === choice) cls += result.correct ? " correct" : " incorrect";
                  else if (i === result.correctIndex) cls += " correct";
                }
                return (
                  <button key={i} className={cls} onClick={() => chooseTransfer(i)} disabled={choice !== null}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {result && (
        <>
          <div className="source-note" style={{ marginBottom: result.relatedKnowledge ? 10 : 16 }}>
            {result.sourceStatus}
          </div>
          {result.relatedKnowledge && (
            <div style={{ marginBottom: 16 }}>
              <KnowledgeCta suggestions={result.relatedKnowledge} />
            </div>
          )}
          <div className="btn-row">
            <button className="btn-primary" onClick={finish} disabled={finishing}>
              Zur Übersicht
            </button>
          </div>
        </>
      )}
    </>
  );
}
