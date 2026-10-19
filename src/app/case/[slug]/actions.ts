"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { computeNextReviewDate, type Difficulty } from "@/lib/spacing";
import { findKnowledgeForCase } from "@/lib/knowledge";
import { scoreAttempt } from "@/lib/caseScoring";
import { redirect } from "next/navigation";

async function requireUserId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht angemeldet.");
  return session.user.id;
}

async function loadFullCase(caseId: string) {
  const c = await prisma.case.findUnique({
    where: { id: caseId },
    include: {
      hypothesisOptions: { orderBy: { sortOrder: "asc" } },
      weakeningOptions: { orderBy: { sortOrder: "asc" } },
      retrievalOptions: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (!c) throw new Error("Fall nicht gefunden.");
  return c;
}

/**
 * Baut den (einmalig gemischten) Differenzierungs-Pool fuer die gewaehlte
 * Alternativ-Hypothese auf. Gibt bewusst KEINE Korrektheits-Info an den Client,
 * damit die Antwort nicht ueber die Netzwerk-Payload erraten werden kann.
 */
export async function buildDifferentiationPool(caseId: string, hypothesisSelected: number[]) {
  const c = await loadFullCase(caseId);
  if (hypothesisSelected.length < 2) return { altLabel: "", pool: [] as string[] };

  let altIndex = hypothesisSelected[1];
  if (c.hypothesisOptions[altIndex]?.isCorrect) altIndex = hypothesisSelected[0];
  const altOption = c.hypothesisOptions[altIndex];

  const pool = [altOption.arguesAgainst ?? "", ...altOption.differentiationDistractors];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return { altLabel: altOption.label, pool };
}

export async function checkDifferentiationChoice(
  caseId: string,
  hypothesisSelected: number[],
  chosenText: string,
) {
  const c = await loadFullCase(caseId);
  let altIndex = hypothesisSelected[1];
  if (c.hypothesisOptions[altIndex]?.isCorrect) altIndex = hypothesisSelected[0];
  const altOption = c.hypothesisOptions[altIndex];
  const correct = chosenText === altOption.arguesAgainst;
  return { correct, correctText: altOption.arguesAgainst ?? "" };
}

export async function checkRetrievalChoice(caseId: string, index: number) {
  const c = await loadFullCase(caseId);
  const chosen = c.retrievalOptions[index];
  const correctIndex = c.retrievalOptions.findIndex((o) => o.isCorrect);
  return { correct: chosen.isCorrect, correctIndex };
}

export async function resolveCase(
  caseId: string,
  hypothesisSelected: number[],
  confidence: number,
  weakeningChoiceIndex: number,
) {
  const c = await loadFullCase(caseId);
  const correctIndex = c.hypothesisOptions.findIndex((o) => o.isCorrect);
  const primaryOption = c.hypothesisOptions[hypothesisSelected[0]];
  const primaryCorrect = hypothesisSelected[0] === correctIndex;
  const includedButNotPrimary = !primaryCorrect && hypothesisSelected.includes(correctIndex);
  const missed = !hypothesisSelected.includes(correctIndex);
  const weakeningCorrectLabel = c.weakeningOptions.find((o) => o.isCorrect)?.label ?? "";
  const weakeningCorrect = c.weakeningOptions[weakeningChoiceIndex]?.isCorrect ?? false;

  // Bei richtiger Antwort kein Fehlerkategorie-Fallback nötig — findKnowledgeForCase
  // liefert dann ausschliesslich die direkt mit dem Fall verknuepften Eintraege
  // (zum Vertiefen), ohne ueber Fehlerkategorien nach Ersatztreffern zu suchen.
  const errorCategories: string[] = primaryCorrect
    ? []
    : includedButNotPrimary
      ? ["falsche Priorisierung"]
      : [primaryOption?.errorCategory, "Differentialdiagnostik unvollständig"].filter(
          (v): v is string => Boolean(v),
        );
  const relatedKnowledge = await findKnowledgeForCase(caseId, errorCategories);

  return {
    primaryCorrect,
    includedButNotPrimary,
    missed,
    expertNote: c.expertNote,
    sourceStatus: c.sourceStatus,
    weakeningCorrectLabel,
    weakeningCorrect,
    relatedKnowledge,
  };
}

type SubmitInput = {
  caseId: string;
  examOrder: string[];
  examPrematureImaging: boolean;
  hypothesisSelected: number[];
  confidence: number;
  differentiationChoiceText: string | null;
  weakeningChoiceIndex: number;
  retrievalChoiceIndex: number;
  explanation: string;
  explanationFeedback: string | null;
  difficulty: Difficulty;
  examOrderStreakFinal: number;
};

export async function submitCaseAttempt(input: SubmitInput) {
  const userId = await requireUserId();
  const c = await loadFullCase(input.caseId);

  const weakOpt = c.weakeningOptions[input.weakeningChoiceIndex];
  const retrOpt = c.retrievalOptions[input.retrievalChoiceIndex];

  const {
    primaryCorrect,
    differentiationCorrect,
    errorCategories,
  } = scoreAttempt(c, input);

  const attemptNumber =
    (await prisma.caseAttempt.count({ where: { userId, caseId: input.caseId } })) + 1;

  await prisma.$transaction([
    prisma.caseAttempt.create({
      data: {
        userId,
        caseId: input.caseId,
        attemptNumber,
        examOrder: input.examOrder,
        examPrematureImaging: input.examPrematureImaging,
        hypothesisSelected: input.hypothesisSelected,
        confidence: input.confidence,
        differentiationChoice:
          input.differentiationChoiceText !== null
            ? { text: input.differentiationChoiceText, correct: differentiationCorrect }
            : undefined,
        weakeningChoiceId: weakOpt.id,
        retrievalChoiceId: retrOpt.id,
        explanation: input.explanation || null,
        explanationFeedback: input.explanationFeedback,
        difficultyRating: input.difficulty,
        hypothesisCorrect: primaryCorrect,
        weakeningCorrect: weakOpt.isCorrect,
        retrievalCorrect: retrOpt.isCorrect,
        errorCategories,
      },
    }),
    prisma.caseSchedule.upsert({
      where: { userId_caseId: { userId, caseId: input.caseId } },
      update: { dueAt: computeNextReviewDate(primaryCorrect, input.confidence, input.difficulty) },
      create: {
        userId,
        caseId: input.caseId,
        dueAt: computeNextReviewDate(primaryCorrect, input.confidence, input.difficulty),
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { examOrderStreak: input.examOrderStreakFinal },
    }),
  ]);

  redirect("/dashboard");
}
