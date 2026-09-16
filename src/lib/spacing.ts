/**
 * Datumsbasiertes Spacing, ersetzt die Text-Simulation ("faellig in 7 Tagen") des
 * Prototyps durch echte Zeitstempel. Die Kombinationslogik aus Korrektheit,
 * Konfidenz und Schwierigkeit ist unveraendert aus dem Prototyp uebernommen.
 */
export type Difficulty = "leicht" | "mittel" | "schwer";

export function computeNextReviewDate(
  primaryCorrect: boolean,
  confidence: number,
  difficulty: Difficulty,
  from: Date = new Date(),
): Date {
  const days = computeNextReviewDays(primaryCorrect, confidence, difficulty);
  const due = new Date(from);
  due.setDate(due.getDate() + days);
  return due;
}

function computeNextReviewDays(
  primaryCorrect: boolean,
  confidence: number,
  difficulty: Difficulty,
): number {
  if (!primaryCorrect) return 1;
  if (difficulty === "schwer" || confidence < 50) return 4;
  if (difficulty === "mittel") return 7;
  if (difficulty === "leicht" && confidence >= 70) return 14;
  return 7;
}

export function formatDueLabel(dueAt: Date, now: Date = new Date()): string {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.ceil((dueAt.getTime() - now.getTime()) / msPerDay);
  if (diffDays <= 0) return "fällig";
  if (diffDays === 1) return "fällig morgen";
  return `fällig in ${diffDays} Tagen`;
}
