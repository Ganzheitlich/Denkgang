import { notFound } from "next/navigation";
import Link from "next/link";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { setContentStatus } from "@/app/review/actions";
import { KNOWLEDGE_CATEGORY_LABELS } from "@/lib/knowledgeCategories";
import { KnowledgeBlockView } from "@/components/KnowledgeBlocks";
import type { KnowledgeBlock } from "@/lib/knowledgeBlocks";

export default async function KnowledgeReviewPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireReviewerSession();
  const { id } = await params;

  const k = await prisma.knowledgeEntry.findUnique({
    where: { id },
    include: {
      caseLinks: { include: { case: true } },
      anatomyLinks: { include: { anatomy: true } },
    },
  });
  if (!k) notFound();

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/review" className="back-link">
          ← Zur Review-Übersicht
        </Link>
        <span className={`tag ${k.status === "APPROVED" ? "" : "due"}`}>{k.status}</span>
      </div>
      <div className="case-title">{k.title}</div>
      <div className="case-meta">
        {KNOWLEDGE_CATEGORY_LABELS[k.category]} · Fehlerkategorien: {k.errorTags.join(", ") || "—"}
      </div>
      <div className="disclaimer">{k.teaser}</div>

      <div className="step-block">
        <div className="card">
          {(k.sections as KnowledgeBlock[]).map((block, i) => (
            <KnowledgeBlockView key={i} block={block} index={i} />
          ))}
        </div>
        <div className="source-note">{k.sourceStatus}</div>
      </div>

      {(k.caseLinks.length > 0 || k.anatomyLinks.length > 0) && (
        <div className="step-block">
          <div className="step-label">Damit verknüpft</div>
          <div className="error-tag-row">
            {k.caseLinks.map((l) => (
              <span className="tag" key={l.caseId}>
                Fall: {l.case.title.split(" — ")[0]}
              </span>
            ))}
            {k.anatomyLinks.map((l) => (
              <span className="tag" key={l.anatomyId}>
                Anatomie: {l.anatomy.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <form action={setContentStatus.bind(null, "knowledge", k.id, k.status === "APPROVED" ? "DRAFT" : "APPROVED")}>
        <div className="btn-row">
          <button type="submit" className="btn-primary">
            {k.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
          </button>
        </div>
      </form>
    </div>
  );
}
