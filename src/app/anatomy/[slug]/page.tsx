import { notFound } from "next/navigation";
import { getAnatomyForFlow } from "@/lib/queries";
import { AnatomyFlow } from "@/components/AnatomyFlow";

export default async function AnatomyPage({ params }: PageProps<"/anatomy/[slug]">) {
  const { slug } = await params;
  const a = await getAnatomyForFlow(slug);
  if (!a) notFound();

  return (
    <div className="app">
      <AnatomyFlow
        anatomyData={{
          id: a.id,
          name: a.name,
          origin: a.origin,
          insertion: a.insertion,
          funktion: a.funktion,
          innervation: a.innervation,
          clinicalRelevance: a.clinicalRelevance,
          palpationHint: a.palpationHint,
          transferQ: a.transferQ,
          transferOptions: a.transferOptions.map((o) => ({ label: o.label })),
        }}
      />
    </div>
  );
}
