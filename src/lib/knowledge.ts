import { prisma } from "@/lib/prisma";

export type KnowledgeSuggestion = { slug: string; title: string } | null;

async function findKnowledgeByTags(tags: string[]): Promise<KnowledgeSuggestion> {
  if (tags.length === 0) return null;
  const tagged = await prisma.knowledgeEntry.findFirst({
    where: { status: "APPROVED", errorTags: { hasSome: tags } },
    orderBy: { updatedAt: "desc" },
  });
  return tagged ? { slug: tagged.slug, title: tagged.title } : null;
}

/**
 * Sucht zuerst einen direkt mit dem Fall verknüpften Wissenseintrag, sonst
 * einen Eintrag, dessen errorTags zu den aufgetretenen Fehlerkategorien passen.
 *
 * Ein Fall kann mehrere verlinkte Einträge haben (z. B. ein fallspezifisches
 * Anatomie-Thema plus ein fallübergreifender Vergleichsartikel). Sortiert nach
 * createdAt aufsteigend, damit der zuerst angelegte, meist spezifischere
 * Eintrag Vorrang vor später ergänzten, generelleren Artikeln hat.
 */
export async function findKnowledgeForCase(
  caseId: string,
  errorCategories: string[],
): Promise<KnowledgeSuggestion> {
  const direct = await prisma.knowledgeCaseLink.findFirst({
    where: { caseId, knowledge: { status: "APPROVED" } },
    include: { knowledge: true },
    orderBy: { knowledge: { createdAt: "asc" } },
  });
  if (direct) return { slug: direct.knowledge.slug, title: direct.knowledge.title };
  return findKnowledgeByTags(errorCategories);
}

export async function findKnowledgeForAnatomy(anatomyId: string): Promise<KnowledgeSuggestion> {
  const direct = await prisma.knowledgeAnatomyLink.findFirst({
    where: { anatomyId, knowledge: { status: "APPROVED" } },
    include: { knowledge: true },
  });
  return direct ? { slug: direct.knowledge.slug, title: direct.knowledge.title } : null;
}
