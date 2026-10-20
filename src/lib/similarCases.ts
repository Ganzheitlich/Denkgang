import { prisma } from "@/lib/prisma";

export type SimilarCase = { slug: string; title: string };

const MAX_SIMILAR = 3;

/**
 * Liefert Fälle, die mit diesem Fall mindestens einen Wissenseintrag teilen
 * (über KnowledgeCaseLink), sortiert nach Anzahl geteilter Einträge —
 * praktisch meist dieselbe Diagnose-Kategorie mit anderer Anamnese (z. B.
 * `arco`/`birk` für Kreuzbandriss). Gibt es keine, ersatzweise Fälle, deren
 * Hypothesenoptionen dieselbe Fehlerkategorie verwenden wie der gerade
 * gemachte Fehler.
 */
export async function findSimilarCases(caseId: string, errorCategories: string[]): Promise<SimilarCase[]> {
  const ownLinks = await prisma.knowledgeCaseLink.findMany({
    where: { caseId, knowledge: { status: "APPROVED" } },
    select: { knowledgeId: true },
  });

  if (ownLinks.length > 0) {
    const sharedLinks = await prisma.knowledgeCaseLink.findMany({
      where: {
        knowledgeId: { in: ownLinks.map((l) => l.knowledgeId) },
        caseId: { not: caseId },
        case: { status: "APPROVED" },
      },
      select: { caseId: true, case: { select: { slug: true, title: true } } },
    });
    if (sharedLinks.length > 0) {
      const byCase = new Map<string, { slug: string; title: string; count: number }>();
      for (const link of sharedLinks) {
        const existing = byCase.get(link.caseId);
        if (existing) existing.count += 1;
        else byCase.set(link.caseId, { slug: link.case.slug, title: link.case.title, count: 1 });
      }
      return [...byCase.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, MAX_SIMILAR)
        .map(({ slug, title }) => ({ slug, title }));
    }
  }

  if (errorCategories.length === 0) return [];
  return prisma.case.findMany({
    where: {
      id: { not: caseId },
      status: "APPROVED",
      hypothesisOptions: { some: { errorCategory: { in: errorCategories } } },
    },
    select: { slug: true, title: true },
    take: MAX_SIMILAR,
  });
}
