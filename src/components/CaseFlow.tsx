"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  buildDifferentiationPool,
  checkDifferentiationChoice,
  checkRetrievalChoice,
  resolveCase,
  submitCaseAttempt,
} from "@/app/case/[slug]/actions";
import type { Difficulty } from "@/lib/spacing";

const DISCLAIMER =
  "Lernfall / Simulation zu Übungszwecken — kein Ersatz für tierärztliche oder tierphysiotherapeutische Diagnostik am realen Tier.";

type ClientOption = { label: string };

type ClientCase = {
  id: string;
  topic: string;
  species: string;
  title: string;
  learningObjective: string;
  anamnese: string;
  einstiegsbildUrl: string | null;
  beobachtung: string;
  diagramLabel: string;
  befundbildUrl: string | null;
  palpation: string;
  hypothesisQ: string;
  hypothesisOptions: ClientOption[];
  weakeningQ: string;
  weakeningOptions: ClientOption[];
  retrievalQ: string;
  retrievalOptions: ClientOption[];
};

type ResolveData = {
  primaryCorrect: boolean;
  includedButNotPrimary: boolean;
  missed: boolean;
  expertNote: string;
  sourceStatus: string;
  weakeningCorrectLabel: string;
  weakeningCorrect: boolean;
};

export function CaseFlow({
  caseData: c,
  initialExamOrderStreak,
}: {
  caseData: ClientCase;
  initialExamOrderStreak: number;
}) {
  const [step, setStep] = useState(0);

  const [examOrderStreak, setExamOrderStreak] = useState(initialExamOrderStreak);
  const [examAutoSkipped, setExamAutoSkipped] = useState(initialExamOrderStreak >= 3);
  const [examChosen, setExamChosen] = useState<string[]>(
    initialExamOrderStreak >= 3 ? ["beobachtung", "palpation"] : [],
  );
  const [examPrematureImaging, setExamPrematureImaging] = useState(false);

  const [hypothesisSelected, setHypothesisSelected] = useState<number[]>([]);
  const [confidence, setConfidence] = useState(50);
  const [confidenceTouched, setConfidenceTouched] = useState(false);

  const [differentiationPool, setDifferentiationPool] = useState<string[]>([]);
  const [differentiationAltLabel, setDifferentiationAltLabel] = useState("");
  const [differentiationChoice, setDifferentiationChoice] = useState<number | null>(null);
  const [differentiationResult, setDifferentiationResult] = useState<{
    correct: boolean;
    correctText: string;
  } | null>(null);

  const [weakeningChoice, setWeakeningChoice] = useState<number | null>(null);

  const [explanation, setExplanation] = useState("");
  const [explanationFeedback, setExplanationFeedback] = useState<string | null>(null);
  const [explanationLoading, setExplanationLoading] = useState(false);

  const [resolveData, setResolveData] = useState<ResolveData | null>(null);

  const [retrievalChoice, setRetrievalChoice] = useState<number | null>(null);
  const [retrievalResult, setRetrievalResult] = useState<{
    correct: boolean;
    correctIndex: number;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);

  function chooseExamStep(key: string) {
    if (key === "bildgebung") {
      if (examChosen.length < 2) setExamPrematureImaging(true);
      return;
    }
    if (examChosen.includes(key)) return;
    const next = [...examChosen, key];
    setExamChosen(next);
    if (next.length === 2) {
      setExamOrderStreak(next[0] === "beobachtung" ? examOrderStreak + 1 : 0);
    }
  }

  function reactivateExamChoice() {
    setExamOrderStreak(0);
    setExamChosen([]);
    setExamAutoSkipped(false);
  }

  function toggleHypothesis(i: number) {
    setHypothesisSelected((prev) => {
      const idx = prev.indexOf(i);
      if (idx >= 0) return prev.filter((x) => x !== i);
      if (prev.length < 2) return [...prev, i];
      return prev;
    });
  }

  function updateConfidence(v: number) {
    setConfidence(v);
    if (!confidenceTouched) setConfidenceTouched(true);
  }

  async function goToDifferentiation() {
    if (hypothesisSelected.length < 2) {
      setDifferentiationPool([]);
      setDifferentiationAltLabel("");
      setStep(5);
      return;
    }
    const { altLabel, pool } = await buildDifferentiationPool(c.id, hypothesisSelected);
    setDifferentiationAltLabel(altLabel);
    setDifferentiationPool(pool);
    setStep(4);
  }

  async function chooseDifferentiation(i: number) {
    if (differentiationChoice !== null) return;
    setDifferentiationChoice(i);
    const result = await checkDifferentiationChoice(c.id, hypothesisSelected, differentiationPool[i]);
    setDifferentiationResult(result);
  }

  function chooseWeakening(i: number) {
    if (weakeningChoice !== null) return;
    setWeakeningChoice(i);
  }

  async function submitExplanation() {
    setStep(7);
    const hasText = explanation.trim().length > 0;
    setExplanationLoading(hasText);
    setExplanationFeedback(null);

    const resolvePromise = resolveCase(c.id, hypothesisSelected, confidence, weakeningChoice!).then(
      setResolveData,
    );

    if (hasText) {
      const feedbackPromise = fetch(`/api/cases/${c.id}/evaluate-explanation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ explanation }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => setExplanationFeedback(data?.feedback ?? null))
        .catch(() => setExplanationFeedback(null))
        .finally(() => setExplanationLoading(false));
      await Promise.all([resolvePromise, feedbackPromise]);
    } else {
      await resolvePromise;
    }
  }

  async function chooseRetrieval(i: number) {
    if (retrievalChoice !== null) return;
    setRetrievalChoice(i);
    const result = await checkRetrievalChoice(c.id, i);
    setRetrievalResult(result);
  }

  function calibrationLine(correct: boolean) {
    if (correct && confidence >= 70) return `Du warst dir ${confidence}% sicher und lagst richtig — gute Kalibrierung.`;
    if (correct && confidence < 50)
      return `Du warst dir nur ${confidence}% sicher, lagst aber richtig — du kannst dir hier mehr zutrauen.`;
    if (!correct && confidence >= 70)
      return `Du warst dir ${confidence}% sicher, lagst aber daneben — das lohnt sich besonders zu hinterfragen.`;
    return `Du warst dir ${confidence}% sicher. Ungefähr passend zur Unsicherheit des Falls.`;
  }

  async function finishCase(difficulty: Difficulty) {
    if (weakeningChoice === null || retrievalChoice === null) return;
    setSubmitting(true);
    await submitCaseAttempt({
      caseId: c.id,
      examOrder: examChosen,
      examPrematureImaging,
      hypothesisSelected,
      confidence,
      differentiationChoiceText: differentiationChoice !== null ? differentiationPool[differentiationChoice] : null,
      weakeningChoiceIndex: weakeningChoice,
      retrievalChoiceIndex: retrievalChoice,
      explanation,
      explanationFeedback,
      difficulty,
      examOrderStreakFinal: examOrderStreak,
    });
  }

  const remainingExamSteps = [
    { key: "beobachtung", label: "Beobachtung (Gangbild, Haltung)" },
    { key: "palpation", label: "Palpation" },
  ].filter((o) => !examChosen.includes(o.key));

  return (
    <>
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">{c.topic}</span>
      </div>
      <div className="case-title">{c.title}</div>
      <div className="case-meta">
        {c.species} · Lernziel: {c.learningObjective}
      </div>
      <div className="disclaimer">{DISCLAIMER}</div>

      {c.einstiegsbildUrl && (
        <div className="case-image-wrap">
          <Image
            src={c.einstiegsbildUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="case-image"
          />
        </div>
      )}

      <div className="step-block">
        <div className="step-label">Anamnese</div>
        <div className="card">{c.anamnese}</div>
      </div>

      {examChosen.map((key) =>
        key === "beobachtung" ? (
          <div className="step-block" key="beobachtung">
            <div className="step-label">Beobachtung</div>
            <div className="card">
              {c.beobachtung}
              {c.befundbildUrl ? (
                <>
                  <div className="case-image-wrap" style={{ marginTop: 10 }}>
                    <Image
                      src={c.befundbildUrl}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 640px"
                      className="case-image"
                    />
                  </div>
                  <div className="diagram" style={{ background: "none", border: "none", padding: "8px 0 0" }}>
                    <div className="cap">{c.diagramLabel}</div>
                  </div>
                </>
              ) : (
                <div className="diagram">
                  <svg width="46" height="46" viewBox="0 0 46 46">
                    <circle cx="23" cy="23" r="21" fill="none" stroke="var(--line)" strokeWidth={2} />
                    <circle cx="15" cy="23" r="5" fill="var(--rust)" />
                    <circle cx="31" cy="23" r="5" fill="var(--petrol)" opacity={0.35} />
                  </svg>
                  <div className="cap">{c.diagramLabel}</div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="step-block" key="palpation">
            <div className="step-label">Palpationsbefund</div>
            <div className="card">{c.palpation}</div>
          </div>
        ),
      )}

      {step === 0 && !examAutoSkipped && examChosen.length < 2 && (
        <div className="step-block">
          <div className="step-label">Was prüfst du als Nächstes?</div>
          <div className="card">
            <div className="pill-group">
              {remainingExamSteps.map((o) => (
                <button key={o.key} className="pill" onClick={() => chooseExamStep(o.key)}>
                  {o.label}
                </button>
              ))}
              <button className="pill" onClick={() => chooseExamStep("bildgebung")}>
                Bildgebende Diagnostik (Röntgen) anfordern
              </button>
            </div>
            {examPrematureImaging && (
              <div className="calib-note" style={{ marginTop: 10 }}>
                Bildgebung ist meist teuer, belastend und wenig zielführend, bevor die
                Basisuntersuchung (Beobachtung, Palpation) abgeschlossen ist — sie liefert oft erst
                dann wertvolle Zusatzinformation, wenn eine konkrete Verdachtsdiagnose steht. Mach
                zuerst mit der Basisuntersuchung weiter.
              </div>
            )}
          </div>
        </div>
      )}

      {step === 0 && !examAutoSkipped && examChosen.length === 2 && (
        <>
          <div className="step-block">
            <div className="step-label">Zur Reihenfolge deiner Untersuchung</div>
            <div className="calib-note" style={{ marginBottom: 0 }}>
              {examChosen[0] === "palpation"
                ? "Du hast zuerst palpiert, bevor du das Gangbild beobachtet hast. In der Praxis lohnt es sich meist, zuerst zu beobachten: Berührung kann das natürliche Bewegungs- und Schonverhalten verändern, bevor du es unverfälscht gesehen hast."
                : "Du hast zuerst beobachtet, dann palpiert — das ist die in der Praxis meist sinnvollere Reihenfolge, weil Berührung das natürliche Bewegungsbild verfälschen kann."}
            </div>
          </div>
          <div className="btn-row">
            <button className="btn-primary" onClick={() => setStep(3)}>
              Weiter zur Hypothese
            </button>
          </div>
        </>
      )}

      {step === 0 && examAutoSkipped && (
        <>
          <p className="empty-note">
            Reihenfolge automatisch nach bewährtem Vorgehen (erst beobachten, dann palpieren) — du
            hast das bereits mehrfach richtig angewendet.{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                reactivateExamChoice();
              }}
              style={{ color: "var(--petrol)" }}
            >
              Wieder aktiv üben
            </a>
          </p>
          <div className="btn-row">
            <button className="btn-primary" onClick={() => setStep(3)}>
              Weiter zur Hypothese
            </button>
          </div>
        </>
      )}

      {step >= 3 && (
        <div className="step-block">
          <div className="step-label">Deine Einschätzung</div>
          <div className="card">
            <div style={{ marginBottom: 6 }}>
              {c.hypothesisQ}{" "}
              <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>
                — tippe die wahrscheinlichste Ursache an. Eine zweite, mögliche Alternative kannst
                du optional ergänzen.
              </span>
            </div>
            <div className="pill-group">
              {c.hypothesisOptions.map((opt, i) => {
                const rank = hypothesisSelected.indexOf(i);
                const isSelected = rank >= 0;
                const locked = step > 3;
                const disabled = locked || (!isSelected && hypothesisSelected.length >= 2);
                const badge = rank === 0 ? "Wahrscheinlichste" : rank === 1 ? "Alternative" : "";
                return (
                  <button
                    key={i}
                    className={`pill pill-rank${isSelected ? " selected" : ""}`}
                    onClick={() => toggleHypothesis(i)}
                    disabled={disabled}
                  >
                    <span>{opt.label}</span>
                    {badge && <span className="tag">{badge}</span>}
                  </button>
                );
              })}
            </div>
            {hypothesisSelected.length === 1 && step === 3 && (
              <p className="empty-note" style={{ padding: "6px 0 0" }}>
                Optional: eine zweite mögliche Ursache mit einbeziehen — oder direkt weiter, wenn
                du dir sicher bist.
              </p>
            )}
            {hypothesisSelected.length >= 1 && (
              <div className="slider-wrap">
                <div className="step-label">
                  Wie sicher bist du dir bei „{c.hypothesisOptions[hypothesisSelected[0]].label}
                  &quot; als wahrscheinlichster Ursache?
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={confidence}
                  onChange={(e) => updateConfidence(parseInt(e.target.value))}
                  disabled={step > 3}
                />
                <div className="slider-value">
                  {confidenceTouched ? `${confidence}%` : "– Regler bewegen"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 3 && hypothesisSelected.length >= 1 && confidenceTouched && (
        <div className="btn-row">
          <button className="btn-primary" onClick={goToDifferentiation}>
            Weiter
          </button>
        </div>
      )}

      {step >= 4 && differentiationPool.length > 0 && (
        <div className="step-block">
          <div className="step-label">Differenzierung</div>
          <div className="card">
            <div style={{ marginBottom: 6 }}>
              Du hast „{differentiationAltLabel}&quot; mit in Betracht gezogen. Was spricht am
              ehesten GEGEN diese Ursache?
            </div>
            <div className="pill-group">
              {differentiationPool.map((text, i) => {
                let cls = "pill";
                if (differentiationResult) {
                  if (i === differentiationChoice) cls += differentiationResult.correct ? " correct" : " incorrect";
                  else if (text === differentiationResult.correctText) cls += " correct";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => chooseDifferentiation(i)}
                    disabled={differentiationChoice !== null}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
            {differentiationResult && (
              <div className="calib-note">
                {differentiationResult.correct
                  ? "Richtig — genau dieser Punkt spricht am deutlichsten dagegen."
                  : "Das klingt plausibel, ist aber keine belastbare Gegenevidenz — der entscheidende Punkt ist grün markiert."}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 4 && differentiationChoice !== null && (
        <div className="btn-row">
          <button className="btn-primary" onClick={() => setStep(5)}>
            Weiter zur Differentialfrage
          </button>
        </div>
      )}

      {step >= 5 && (
        <div className="step-block">
          <div className="step-label">Differentialdiagnostik — noch vor der Auflösung</div>
          <div className="card">
            <div style={{ marginBottom: 6 }}>
              Bezogen auf deine Priorisierung „{c.hypothesisOptions[hypothesisSelected[0]].label}
              &quot;: {c.weakeningQ}
            </div>
            <div className="pill-group">
              {c.weakeningOptions.map((opt, i) => (
                <button
                  key={i}
                  className={`pill${weakeningChoice === i ? " selected" : ""}`}
                  onClick={() => chooseWeakening(i)}
                  disabled={weakeningChoice !== null}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {weakeningChoice !== null && (
              <div className="calib-note">
                Notiert — die Auswertung dazu kommt gemeinsam mit der fachlichen Einschätzung
                gleich.
              </div>
            )}
          </div>
        </div>
      )}

      {step === 5 && weakeningChoice !== null && (
        <div className="btn-row">
          <button className="btn-primary" onClick={() => setStep(6)}>
            Weiter zur Begründung
          </button>
        </div>
      )}

      {step >= 6 && (
        <div className="step-block">
          <div className="step-label">Kurz begründen (ein bis zwei Sätze) — freiwillig, aber empfohlen</div>
          <div className="card">
            <textarea
              placeholder="Warum denkst du, dass es diese Ursache ist?"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              disabled={step > 6}
            />
            {step === 6 && (
              <div className="btn-row">
                <button className="btn-primary" onClick={submitExplanation}>
                  Einschätzung einreichen
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {step >= 7 && resolveData && (
        <>
          <div className="step-block">
            <div className="step-label">Fachliche Einschätzung</div>
            <div
              className={`feedback ${resolveData.primaryCorrect ? "correct" : "incorrect"}`}
            >
              {resolveData.primaryCorrect
                ? "Richtig priorisiert — das ist die wahrscheinlichste Ursache."
                : resolveData.includedButNotPrimary
                  ? "Die richtige Ursache war in deiner Auswahl, aber nicht als wahrscheinlichste priorisiert — das ist ein Priorisierungsfehler, kein Wissensfehler."
                  : "Die wahrscheinlichste Ursache wurde nicht erkannt — hier die Erklärung:"}
              <div style={{ marginTop: 8 }}>{resolveData.expertNote}</div>
              <div className="source-note">{resolveData.sourceStatus}</div>
            </div>
            <div className="calib-note">{calibrationLine(resolveData.primaryCorrect)}</div>
            <div className="calib-note" style={{ marginTop: 8 }}>
              Zur Differentialfrage:{" "}
              {resolveData.weakeningCorrect
                ? "richtig erkannt — "
                : "hier wäre stattdessen entscheidend gewesen: "}
              {resolveData.weakeningCorrectLabel}
            </div>
          </div>

          <div className="step-block">
            <div className="step-label">Deine Begründung im Vergleich</div>
            <div className="card">
              {!explanation.trim() && (
                <div className="empty-note" style={{ padding: 0 }}>
                  Du hast keine eigene Begründung notiert — das ist okay, aber gerade dieser
                  Schritt festigt das Wissen am meisten. Nächstes Mal gerne versuchen.
                </div>
              )}
              {explanation.trim() && explanationLoading && (
                <div className="empty-note" style={{ padding: 0 }}>
                  Vergleiche deine Begründung mit der fachlichen Einschätzung …
                </div>
              )}
              {explanation.trim() && !explanationLoading && explanationFeedback && (
                <div style={{ whiteSpace: "pre-wrap", fontSize: 14.5 }}>{explanationFeedback}</div>
              )}
              {explanation.trim() && !explanationLoading && !explanationFeedback && (
                <div className="empty-note" style={{ padding: 0 }}>
                  Automatischer Vergleich gerade nicht verfügbar. Deine Begründung: „{explanation}
                  &quot;
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {step === 7 && resolveData && (
        <div className="btn-row">
          <button className="btn-primary" onClick={() => setStep(8)}>
            Weiter zur Vertiefungsfrage
          </button>
        </div>
      )}

      {step >= 8 && (
        <div className="step-block">
          <div className="step-label">Vertiefungsfrage</div>
          <div className="card">
            <div style={{ marginBottom: 6 }}>{c.retrievalQ}</div>
            <div className="pill-group">
              {c.retrievalOptions.map((opt, i) => {
                let cls = "pill";
                if (retrievalResult) {
                  if (i === retrievalChoice) cls += retrievalResult.correct ? " correct" : " incorrect";
                  else if (i === retrievalResult.correctIndex) cls += " correct";
                }
                return (
                  <button key={i} className={cls} onClick={() => chooseRetrieval(i)} disabled={retrievalChoice !== null}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 8 && retrievalChoice !== null && (
        <div className="btn-row">
          <button className="btn-primary" onClick={() => setStep(9)}>
            Weiter
          </button>
        </div>
      )}

      {step >= 9 && (
        <div className="step-block">
          <div className="step-label">Wie schwer fiel dir dieser Fall?</div>
          <div className="difficulty-row">
            <button className="btn-secondary" disabled={submitting} onClick={() => finishCase("leicht")}>
              Leicht
            </button>
            <button className="btn-secondary" disabled={submitting} onClick={() => finishCase("mittel")}>
              Mittel
            </button>
            <button className="btn-secondary" disabled={submitting} onClick={() => finishCase("schwer")}>
              Schwer
            </button>
          </div>
          <p className="empty-note">
            Deine Angabe entscheidet, wann dieser Fall zur Wiederholung wieder auftaucht (Spacing).
          </p>
        </div>
      )}
    </>
  );
}
