import type { CaseDifficulty } from "@/generated/prisma/enums";

export const CASE_DIFFICULTY_LABELS: Record<CaseDifficulty, string> = {
  EINSTEIGER: "Einsteiger",
  FORTGESCHRITTEN: "Fortgeschritten",
  EXPERTE: "Experte",
};

export const CASE_DIFFICULTIES = Object.keys(CASE_DIFFICULTY_LABELS) as CaseDifficulty[];

export function isCaseDifficulty(value: string): value is CaseDifficulty {
  return (CASE_DIFFICULTIES as string[]).includes(value);
}
