import { prisma } from "@/lib/prisma";
import { formatDueLabel } from "@/lib/spacing";
import type { KnowledgeCategory } from "@/generated/prisma/enums";

export type SkillScore = { label: string; val: number | null };

function pct<T>(items: T[], isCorrect: (item: T) => boolean): number | null {
  if (items.length === 0) return null;
  const correct = items.filter(isCorrect).length;
  return Math.round((correct / items.length) * 100);
}

export async function getDashboardData(userId: string) {
  const [caseAttempts, anatomyAttempts, cases, anatomyItems, mediaAssets, schedules, libraryPreview, libraryCount] =
    await Promise.all([
      prisma.caseAttempt.findMany({ where: { userId } }),
      prisma.anatomyAttempt.findMany({
        where: { userId },
        orderBy: { attemptedAt: "desc" },
      }),
      prisma.case.findMany({ where: { status: "APPROVED" }, orderBy: { title: "asc" } }),
      prisma.anatomyItem.findMany({ where: { status: "APPROVED" }, orderBy: { name: "asc" } }),
      prisma.mediaAsset.findMany({
        where: { status: "APPROVED" },
        include: { caseLinks: { include: { case: true } } },
      }),
      prisma.caseSchedule.findMany({ where: { userId } }),
      prisma.knowledgeEntry.findMany({
        where: { status: "APPROVED" },
        orderBy: { updatedAt: "desc" },
        take: 3,
      }),
      prisma.knowledgeEntry.count({ where: { status: "APPROVED" } }),
    ]);

  const anatomiePct = pct(
    [...caseAttempts.map((a) => a.retrievalCorrect), ...anatomyAttempts.map((a) => a.isCorrect)],
    (v) => v,
  );
  const reasoningPct = pct(caseAttempts, (a) => a.hypothesisCorrect);
  const ddxPct = pct(caseAttempts, (a) => a.weakeningCorrect);

  let calibPct: number | null = null;
  if (caseAttempts.length > 0) {
    const diffs = caseAttempts.map((a) => a.confidence - (a.hypothesisCorrect ? 100 : 0));
    const avg = diffs.reduce((sum, d) => sum + d, 0) / diffs.length;
    calibPct = Math.max(0, 100 - Math.round(Math.abs(avg)));
  }

  const skills: SkillScore[] = [
    { label: "Anatomie-Wissen", val: anatomiePct },
    { label: "Clinical Reasoning", val: reasoningPct },
    { label: "Differentialdiagnostik", val: ddxPct },
    { label: "Kalibrierung", val: calibPct },
  ];

  let insight = "Bearbeite deinen ersten Fall, um eine persönliche Auswertung zu sehen.";
  const known = skills.filter((s) => s.val !== null) as { label: string; val: number }[];
  if (known.length > 0) {
    const weakest = known.reduce((a, b) => (a.val <= b.val ? a : b));
    insight = `Dein größtes aktuelles Lernpotenzial liegt aktuell in: ${weakest.label} (${weakest.val}%).`;
  }

  const errorTally = new Map<string, number>();
  for (const a of caseAttempts) {
    for (const cat of a.errorCategories) {
      errorTally.set(cat, (errorTally.get(cat) ?? 0) + 1);
    }
  }
  const errorTags = [...errorTally.entries()].sort((a, b) => b[1] - a[1]);

  const latestAnatomyAttempt = new Map<string, boolean>();
  for (const a of anatomyAttempts) {
    if (!latestAnatomyAttempt.has(a.anatomyId)) {
      latestAnatomyAttempt.set(a.anatomyId, a.isCorrect);
    }
  }

  const scheduleByCase = new Map(schedules.map((s) => [s.caseId, s]));
  const now = new Date();
  const queue = cases
    .map((c) => {
      const schedule = scheduleByCase.get(c.id);
      return {
        case: c,
        dueAt: schedule?.dueAt ?? null,
        dueLabel: schedule ? formatDueLabel(schedule.dueAt, now) : "neu",
      };
    })
    .sort((a, b) => {
      if (!a.dueAt && !b.dueAt) return 0;
      if (!a.dueAt) return -1;
      if (!b.dueAt) return 1;
      return a.dueAt.getTime() - b.dueAt.getTime();
    });

  return {
    skills,
    insight,
    errorTags,
    anatomyItems: anatomyItems.map((a) => ({
      item: a,
      state: latestAnatomyAttempt.has(a.id)
        ? latestAnatomyAttempt.get(a.id)
          ? "gewusst"
          : "wiederholen"
        : "neu",
    })),
    mediaAssets,
    queue,
    libraryPreview,
    libraryCount,
  };
}

export async function getCaseForFlow(slug: string) {
  return prisma.case.findFirst({
    where: { slug, status: "APPROVED" },
    include: {
      hypothesisOptions: { orderBy: { sortOrder: "asc" } },
      weakeningOptions: { orderBy: { sortOrder: "asc" } },
      retrievalOptions: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getAnatomyForFlow(slug: string) {
  return prisma.anatomyItem.findFirst({
    where: { slug, status: "APPROVED" },
    include: {
      transferOptions: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getAnatomyForTutor(slug: string) {
  return prisma.anatomyItem.findFirst({
    where: { slug, status: "APPROVED" },
    select: {
      id: true,
      slug: true,
      name: true,
      bildUrl: true,
      origin: true,
      insertion: true,
      funktion: true,
      innervation: true,
      clinicalRelevance: true,
      palpationHint: true,
      sourceStatus: true,
    },
  });
}

export async function getLibraryEntries(category?: KnowledgeCategory, q?: string) {
  return prisma.knowledgeEntry.findMany({
    where: {
      status: "APPROVED",
      ...(category ? { category } : {}),
      ...(q ? { title: { contains: q, mode: "insensitive" as const } } : {}),
    },
    orderBy: [{ category: "asc" }, { title: "asc" }],
  });
}

export async function getKnowledgeEntry(slug: string) {
  return prisma.knowledgeEntry.findFirst({
    where: { slug, status: "APPROVED" },
    include: {
      caseLinks: { include: { case: true } },
      anatomyLinks: { include: { anatomy: true } },
    },
  });
}
