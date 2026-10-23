import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth-helpers";
import { getCaseForFlow } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { clusterKeyFor } from "@/lib/interleave";
import { CaseFlow } from "@/components/CaseFlow";

export default async function CasePage({ params }: PageProps<"/case/[slug]">) {
  const { slug } = await params;
  const [session, caseData] = await Promise.all([requireSession(), getCaseForFlow(slug)]);
  if (!caseData) notFound();

  const mastery = await prisma.userTopicMastery.findUnique({
    where: { userId_cluster: { userId: session.user.id, cluster: clusterKeyFor(caseData.topic) } },
    select: { examOrderStreak: true },
  });

  return (
    <div className="app">
      <CaseFlow
        initialExamOrderStreak={mastery?.examOrderStreak ?? 0}
        caseData={{
          id: caseData.id,
          difficulty: caseData.difficulty,
          topic: caseData.topic,
          species: caseData.species,
          title: caseData.title,
          learningObjective: caseData.learningObjective,
          anamnese: caseData.anamnese,
          einstiegsbildUrl: caseData.einstiegsbildUrl,
          beobachtung: caseData.beobachtung,
          diagramLabel: caseData.diagramLabel,
          befundbildUrl: caseData.befundbildUrl,
          palpation: caseData.palpation,
          hypothesisQ: caseData.hypothesisQ,
          hypothesisOptions: caseData.hypothesisOptions.map((o) => ({ label: o.label })),
          weakeningQ: caseData.weakeningQ,
          weakeningOptions: caseData.weakeningOptions.map((o) => ({ label: o.label })),
          retrievalQ: caseData.retrievalQ,
          retrievalOptions: caseData.retrievalOptions.map((o) => ({ label: o.label })),
        }}
      />
    </div>
  );
}
