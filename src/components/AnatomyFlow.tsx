"use client";

import { useState } from "react";
import Link from "next/link";
import { checkTransferChoice, submitAnatomyAttempt } from "@/app/anatomy/[slug]/actions";

type ClientAnatomy = {
  id: string;
  name: string;
  origin: string;
  insertion: string;
  funktion: string;
  innervation: string;
  clinicalRelevance: string;
  palpationHint: string;
  transferQ: string;
  transferOptions: { label: string }[];
};

export function AnatomyFlow({ anatomyData: a }: { anatomyData: ClientAnatomy }) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState<{ correct: boolean; correctIndex: number; sourceStatus: string } | null>(
    null,
  );
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

  return (
    <>
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Anatomie</span>
      </div>
      <div className="case-title">{a.name}</div>

      <div className="step-block">
        <div className="step-label">Ursprung → Ansatz → Funktion</div>
        <div className="card">
          <div>
            <strong>Ursprung:</strong> {a.origin}
          </div>
          <div style={{ marginTop: 6 }}>
            <strong>Ansatz:</strong> {a.insertion}
          </div>
          <div style={{ marginTop: 6 }}>
            <strong>Funktion:</strong> {a.funktion}
          </div>
          <div style={{ marginTop: 6 }}>
            <strong>Innervation:</strong> {a.innervation}
          </div>
        </div>
      </div>

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
          <div className="source-note" style={{ marginBottom: 16 }}>
            {result.sourceStatus}
          </div>
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
