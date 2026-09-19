import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { requireSession } from "@/lib/auth-helpers";
import { getKnowledgeEntry } from "@/lib/queries";
import { KNOWLEDGE_CATEGORY_LABELS } from "@/lib/knowledgeCategories";

export default async function KnowledgeEntryPage({ params }: PageProps<"/library/[slug]">) {
  await requireSession();
  const { slug } = await params;
  const entry = await getKnowledgeEntry(slug);
  if (!entry) notFound();

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/library" className="back-link">
          ← Zur Wissensbibliothek
        </Link>
        <span className="tag">{KNOWLEDGE_CATEGORY_LABELS[entry.category]}</span>
      </div>
      <div className="case-title">{entry.title}</div>
      <div className="case-meta">{entry.teaser}</div>

      {entry.bildUrl && (
        <div className="case-image-wrap">
          <Image
            src={entry.bildUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="case-image"
          />
        </div>
      )}

      <div className="step-block">
        <div className="card" style={{ whiteSpace: "pre-wrap" }}>
          {entry.body}
        </div>
        <div className="source-note">{entry.sourceStatus}</div>
      </div>

      {(entry.caseLinks.length > 0 || entry.anatomyLinks.length > 0) && (
        <div className="step-block">
          <div className="step-label">Damit verknüpft</div>
          <div className="error-tag-row">
            {entry.caseLinks.map((l) => (
              <Link key={l.caseId} href={`/case/${l.case.slug}`} className="tag">
                Fall: {l.case.title.split(" — ")[0]}
              </Link>
            ))}
            {entry.anatomyLinks.map((l) => (
              <Link key={l.anatomyId} href={`/anatomy/${l.anatomy.slug}`} className="tag">
                Anatomie: {l.anatomy.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
