import { describe, it, expect } from "vitest";
import { scoreAttempt, type ScoringCase, type AttemptScoringInput } from "./caseScoring";

// Nachgebaut aus dem Bruno-Fall-Muster: 3 Hypothesen (Index 1 korrekt), je
// 2 Weakening-/Retrieval-Optionen (Index 0 korrekt).
const baseCase: ScoringCase = {
  hypothesisOptions: [
    { isCorrect: false, errorCategory: "Anatomie verwechselt", arguesAgainst: "Spricht gegen A" },
    { isCorrect: true, errorCategory: null, arguesAgainst: null },
    { isCorrect: false, errorCategory: "Befund überbewertet", arguesAgainst: "Spricht gegen C" },
  ],
  weakeningOptions: [
    { isCorrect: true, errorCategory: null },
    { isCorrect: false, errorCategory: "Differentialdiagnosen vergessen" },
  ],
  retrievalOptions: [
    { isCorrect: true, errorCategory: null },
    { isCorrect: false, errorCategory: "Faktenwissen fehlt" },
  ],
};

function baseInput(overrides: Partial<AttemptScoringInput> = {}): AttemptScoringInput {
  return {
    hypothesisSelected: [1],
    confidence: 70,
    differentiationChoiceText: null,
    weakeningChoiceIndex: 0,
    retrievalChoiceIndex: 0,
    examPrematureImaging: false,
    examOrder: ["beobachtung", "palpation"],
    ...overrides,
  };
}

describe("scoreAttempt — Grundfälle", () => {
  it("markiert eine vollständig korrekte, selbstbewusste Antwort fehlerfrei", () => {
    const result = scoreAttempt(baseCase, baseInput());
    expect(result.primaryCorrect).toBe(true);
    expect(result.includedButNotPrimary).toBe(false);
    expect(result.weakeningCorrect).toBe(true);
    expect(result.retrievalCorrect).toBe(true);
    expect(result.errorCategories).toEqual([]);
  });

  it("erkennt eine falsch priorisierte Hypothese (richtige dabei, aber nicht primär)", () => {
    const result = scoreAttempt(
      baseCase,
      baseInput({
        hypothesisSelected: [0, 1],
        confidence: 60,
        // korrekt beantwortete Differenzierung, damit nur die
        // Priorisierung isoliert geprüft wird.
        differentiationChoiceText: "Spricht gegen A",
      }),
    );
    expect(result.primaryCorrect).toBe(false);
    expect(result.includedButNotPrimary).toBe(true);
    expect(result.errorCategories).toEqual(["falsche Priorisierung"]);
  });

  it("markiert eine komplett verfehlte Hypothese mit Fachkategorie + Differentialdiagnostik-Hinweis", () => {
    const result = scoreAttempt(baseCase, baseInput({ hypothesisSelected: [0], confidence: 60 }));
    expect(result.primaryCorrect).toBe(false);
    expect(result.includedButNotPrimary).toBe(false);
    expect(result.errorCategories).toEqual([
      "Anatomie verwechselt",
      "Differentialdiagnostik unvollständig",
    ]);
  });
});

describe("scoreAttempt — Konfidenz-Kalibrierung", () => {
  it("markiert Unterkonfidenz bei richtiger Antwort und niedriger Sicherheit (<50)", () => {
    const result = scoreAttempt(baseCase, baseInput({ confidence: 30 }));
    expect(result.primaryCorrect).toBe(true);
    expect(result.errorCategories).toEqual(["Unterkonfidenz"]);
  });

  it("markiert Überkonfidenz bei falscher Antwort und hoher Sicherheit (>=70)", () => {
    const result = scoreAttempt(baseCase, baseInput({ hypothesisSelected: [0], confidence: 85 }));
    expect(result.errorCategories).toEqual([
      "Anatomie verwechselt",
      "Differentialdiagnostik unvollständig",
      "Überkonfidenz",
    ]);
  });

  it("markiert weder Unter- noch Überkonfidenz im mittleren Bereich (50-69) bei richtiger Antwort", () => {
    const result = scoreAttempt(baseCase, baseInput({ confidence: 60 }));
    expect(result.errorCategories).toEqual([]);
  });
});

describe("scoreAttempt — Differenzierung", () => {
  it("bewertet eine korrekt gewählte Gegenevidenz als richtig, ohne Fehlerkategorie", () => {
    const result = scoreAttempt(
      baseCase,
      baseInput({ hypothesisSelected: [1, 0], differentiationChoiceText: "Spricht gegen A" }),
    );
    expect(result.differentiationCorrect).toBe(true);
    expect(result.errorCategories).toEqual([]);
  });

  it("markiert eine falsch gewählte Gegenevidenz als Differentialdiagnostik-Fehler", () => {
    const result = scoreAttempt(
      baseCase,
      baseInput({ hypothesisSelected: [1, 0], differentiationChoiceText: "irgendwas Falsches" }),
    );
    expect(result.differentiationCorrect).toBe(false);
    expect(result.errorCategories).toEqual(["Differentialdiagnostik unvollständig"]);
  });

  it("bezieht die Differenzierung auf die zweite (nicht-korrekte) Hypothese, wenn die erste bereits korrekt ist", () => {
    // hypothesisSelected[0] ist bereits die korrekte Hypothese (Index 1) —
    // die Alternative, gegen die differenziert wird, muss dann die an
    // zweiter Stelle gewählte sein (Index 0), nicht nochmal die korrekte.
    const result = scoreAttempt(
      baseCase,
      baseInput({ hypothesisSelected: [1, 0], differentiationChoiceText: "Spricht gegen A" }),
    );
    expect(result.differentiationCorrect).toBe(true);
  });

  it("überspringt die Differenzierung ganz, wenn nur eine Hypothese gewählt wurde", () => {
    const result = scoreAttempt(baseCase, baseInput({ hypothesisSelected: [1] }));
    expect(result.differentiationCorrect).toBeNull();
  });
});

describe("scoreAttempt — Weakening- und Retrieval-Fehler", () => {
  it("übernimmt die Fehlerkategorie der falschen Weakening-Antwort", () => {
    const result = scoreAttempt(baseCase, baseInput({ weakeningChoiceIndex: 1 }));
    expect(result.weakeningCorrect).toBe(false);
    expect(result.errorCategories).toEqual(["Differentialdiagnosen vergessen"]);
  });

  it("übernimmt die Fehlerkategorie der falschen Retrieval-Antwort", () => {
    const result = scoreAttempt(baseCase, baseInput({ retrievalChoiceIndex: 1 }));
    expect(result.retrievalCorrect).toBe(false);
    expect(result.errorCategories).toEqual(["Faktenwissen fehlt"]);
  });

  it("sammelt mehrere unabhängige Fehlerkategorien gleichzeitig", () => {
    const result = scoreAttempt(
      baseCase,
      baseInput({ weakeningChoiceIndex: 1, retrievalChoiceIndex: 1, confidence: 30 }),
    );
    expect(result.errorCategories).toEqual([
      "Differentialdiagnosen vergessen",
      "Faktenwissen fehlt",
      "Unterkonfidenz",
    ]);
  });
});

describe("scoreAttempt — Untersuchungsreihenfolge", () => {
  it("markiert vorschnelle Bildgebung als falsche Priorisierung", () => {
    const result = scoreAttempt(baseCase, baseInput({ examPrematureImaging: true }));
    expect(result.errorCategories).toEqual(["falsche Priorisierung"]);
  });

  it("markiert Palpation vor Beobachtung als falsche Priorisierung", () => {
    const result = scoreAttempt(baseCase, baseInput({ examOrder: ["palpation", "beobachtung"] }));
    expect(result.errorCategories).toEqual(["falsche Priorisierung"]);
  });

  it("zählt beide Untersuchungsfehler einzeln, wenn beide zutreffen", () => {
    const result = scoreAttempt(
      baseCase,
      baseInput({ examPrematureImaging: true, examOrder: ["palpation", "beobachtung"] }),
    );
    expect(result.errorCategories).toEqual(["falsche Priorisierung", "falsche Priorisierung"]);
  });
});
