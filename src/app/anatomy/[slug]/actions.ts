"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { findKnowledgeForAnatomy, type KnowledgeSuggestion } from "@/lib/knowledge";

async function loadFullAnatomy(anatomyId: string) {
  const a = await prisma.anatomyItem.findUnique({
    where: { id: anatomyId },
    include: { transferOptions: { orderBy: { sortOrder: "asc" } } },
  });
  if (!a) throw new Error("Anatomie-Item nicht gefunden.");
  return a;
}

export async function checkTransferChoice(anatomyId: string, index: number) {
  const a = await loadFullAnatomy(anatomyId);
  const correctIndex = a.transferOptions.findIndex((o) => o.isCorrect);
  const correct = a.transferOptions[index].isCorrect;

  let relatedKnowledge: KnowledgeSuggestion[] | null = null;
  if (!correct) {
    relatedKnowledge = await findKnowledgeForAnatomy(anatomyId);
  }

  return {
    correct,
    correctIndex,
    sourceStatus: a.sourceStatus,
    relatedKnowledge,
  };
}

export async function submitAnatomyAttempt(anatomyId: string, index: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht angemeldet.");
  const a = await loadFullAnatomy(anatomyId);

  await prisma.anatomyAttempt.create({
    data: {
      userId: session.user.id,
      anatomyId,
      isCorrect: a.transferOptions[index].isCorrect,
    },
  });

  redirect("/dashboard");
}
