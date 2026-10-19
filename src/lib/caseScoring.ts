type ScoringOption = { isCorrect: boolean; errorCategory: string | null; arguesAgainst?: string | null };

export type ScoringCase = {
  hypothesisOptions: ScoringOption[];
  weakeningOptions: ScoringOption[];
  retrievalOptions: ScoringOption[];
};

export type AttemptScoringInput = {
  hypothesisSelected: number[];
  confidence: number;
  differentiationChoiceText: string | null;
  weakeningChoiceIndex: number;
  retrievalChoiceIndex: number;
  examPrematureImaging: boolean;
  examOrder: string[];
};

export type AttemptScore = {
  primaryCorrect: boolean;
  includedButNotPrimary: boolean;
  differentiationCorrect: boolean | null;
  weakeningCorrect: boolean;
  retrievalCorrect: boolean;
  errorCategories: string[];
};

/**
 * Serverseitige Auswertung eines Fall-Versuchs: Korrektheit und
 * Fehlerkategorien (MASTER-PROMPT §14) aus den bereits aus der DB geladenen
 * Optionen. Bewusst als reine Funktion ausgelagert aus submitCaseAttempt,
 * damit die Scoring-Logik ohne DB-Zugriff testbar ist.
 */
export function scoreAttempt(c: ScoringCase, input: AttemptScoringInput): AttemptScore {
  const correctIndex = c.hypothesisOptions.findIndex((o) => o.isCorrect);
  const primaryOption = c.hypothesisOptions[input.hypothesisSelected[0]];
  const primaryCorrect = input.hypothesisSelected[0] === correctIndex;
  const includedButNotPrimary = !primaryCorrect && input.hypothesisSelected.includes(correctIndex);

  const weakOpt = c.weakeningOptions[input.weakeningChoiceIndex];
  const retrOpt = c.retrievalOptions[input.retrievalChoiceIndex];

  let differentiationCorrect: boolean | null = null;
  if (input.hypothesisSelected.length === 2) {
    let altIndex = input.hypothesisSelected[1];
    if (c.hypothesisOptions[altIndex]?.isCorrect) altIndex = input.hypothesisSelected[0];
    const altOption = c.hypothesisOptions[altIndex];
    differentiationCorrect = input.differentiationChoiceText === altOption.arguesAgainst;
  }

  const errorCategories: string[] = [];
  if (includedButNotPrimary) {
    errorCategories.push("falsche Priorisierung");
  } else if (!primaryCorrect) {
    if (primaryOption?.errorCategory) errorCategories.push(primaryOption.errorCategory);
    errorCategories.push("Differentialdiagnostik unvollständig");
  }
  if (differentiationCorrect !== null && !differentiationCorrect) {
    errorCategories.push("Differentialdiagnostik unvollständig");
  }
  if (!weakOpt.isCorrect && weakOpt.errorCategory) errorCategories.push(weakOpt.errorCategory);
  if (!retrOpt.isCorrect && retrOpt.errorCategory) errorCategories.push(retrOpt.errorCategory);
  if (primaryCorrect && input.confidence < 50) errorCategories.push("Unterkonfidenz");
  if (!primaryCorrect && input.confidence >= 70) errorCategories.push("Überkonfidenz");
  if (input.examPrematureImaging) errorCategories.push("falsche Priorisierung");
  if (input.examOrder[0] === "palpation") errorCategories.push("falsche Priorisierung");

  return {
    primaryCorrect,
    includedButNotPrimary,
    differentiationCorrect,
    weakeningCorrect: weakOpt.isCorrect,
    retrievalCorrect: retrOpt.isCorrect,
    errorCategories,
  };
}
