import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth-helpers";
import { getAnatomyForTutor } from "@/lib/queries";
import { AnatomyTutorChat } from "@/components/AnatomyTutorChat";

export default async function AnatomyTutorPage({ params }: PageProps<"/anatomy-tutor/[slug]">) {
  await requireSession();
  const { slug } = await params;
  const muscle = await getAnatomyForTutor(slug);
  if (!muscle) notFound();

  return (
    <div className="app">
      <AnatomyTutorChat slug={muscle.slug} name={muscle.name} bildUrl={muscle.bildUrl} />
    </div>
  );
}
