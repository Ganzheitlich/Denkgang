import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getCaseForFlow } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { CaseFlow } from "@/components/CaseFlow";

export default async function CasePage({ params }: PageProps<"/case/[slug]">) {
  const { slug } = await params;
  const [session, caseData] = await Promise.all([auth(), getCaseForFlow(slug)]);
  if (!caseData) notFound();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: { examOrderStreak: true },
  });

  return (
    <div className="app">
      <CaseFlow
        initialExamOrderStreak={user?.examOrderStreak ?? 0}
        caseData={{
          id: caseData.id,
          topic: caseData.topic,
          species: caseData.species,
          title: caseData.title,
          learningObjective: caseData.learningObjective,
          anamnese: caseData.anamnese,
          beobachtung: caseData.beobachtung,
          diagramLabel: caseData.diagramLabel,
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
