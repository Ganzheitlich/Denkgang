import { prisma } from "@/lib/prisma";

export type KnowledgeSuggestion = { slug: string; title: string };

const MAX_SUGGESTIONS = 4;

async function findKnowledgeByTags(tags: string[]): Promise<KnowledgeSuggestion[]> {
  if (tags.length === 0) return [];
  const tagged = await prisma.knowledgeEntry.findMany({
    where: { status: "APPROVED", errorTags: { hasSome: tags } },
    orderBy: { updatedAt: "desc" },
    take: MAX_SUGGESTIONS,
  });
  return tagged.map((k) => ({ slug: k.slug, title: k.title }));
}

/**
 * Liefert alle direkt mit dem Fall verknüpften Wissenseinträge; gibt es keine,
 * ersatzweise Einträge, deren errorTags zu den aufgetretenen Fehlerkategorien
 * passen. Liefert bewusst eine Liste statt eines einzelnen Treffers: Bei
 * mehreren passenden Einträgen soll der Nutzer selbst auswählen, welchen er
 * vertiefen möchte, statt dass die App unbemerkt einen davon bevorzugt. Gibt
 * es keinen Treffer, verlinkt die aufrufende Stelle stattdessen generisch auf
 * die Wissensbibliothek.
 */
export async function findKnowledgeForCase(
  caseId: string,
  errorCategories: string[],
): Promise<KnowledgeSuggestion[]> {
  const direct = await prisma.knowledgeCaseLink.findMany({
    where: { caseId, knowledge: { status: "APPROVED" } },
    include: { knowledge: true },
    orderBy: { knowledge: { createdAt: "asc" } },
    take: MAX_SUGGESTIONS,
  });
  if (direct.length > 0) {
    return direct.map((d) => ({ slug: d.knowledge.slug, title: d.knowledge.title }));
  }
  return findKnowledgeByTags(errorCategories);
}

export async function findKnowledgeForAnatomy(anatomyId: string): Promise<KnowledgeSuggestion[]> {
  const direct = await prisma.knowledgeAnatomyLink.findMany({
    where: { anatomyId, knowledge: { status: "APPROVED" } },
    include: { knowledge: true },
    orderBy: { knowledge: { createdAt: "asc" } },
    take: MAX_SUGGESTIONS,
  });
  return direct.map((d) => ({ slug: d.knowledge.slug, title: d.knowledge.title }));
}
