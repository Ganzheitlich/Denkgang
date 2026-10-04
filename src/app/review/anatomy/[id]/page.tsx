import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { setContentStatus } from "@/app/review/actions";
import { ANATOMY_KIND_LABELS, fieldLabelsFor } from "@/lib/anatomyKind";

export default async function AnatomyReviewPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireReviewerSession();
  const { id } = await params;

  const a = await prisma.anatomyItem.findUnique({
    where: { id },
    include: { transferOptions: { orderBy: { sortOrder: "asc" } } },
  });
  if (!a) notFound();

  const labels = fieldLabelsFor(a.kind);
  const fields: { label: string; value: string | null }[] = [
    { label: labels.origin, value: a.origin },
    { label: labels.insertion, value: a.insertion },
    { label: labels.funktion, value: a.funktion },
    { label: labels.innervation, value: a.innervation },
  ].filter((f) => f.value);

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/review" className="back-link">
          ← Zur Review-Übersicht
        </Link>
        <span className={`tag ${a.status === "APPROVED" ? "" : "due"}`}>{a.status}</span>
      </div>
      <div className="case-title">{a.name}</div>
      <div style={{ marginTop: -8, marginBottom: 8, color: "var(--ink-soft)", fontSize: 13.5 }}>
        {ANATOMY_KIND_LABELS[a.kind]}
      </div>

      {a.bildUrl && (
        <div className="case-image-wrap">
          <Image src={a.bildUrl} alt={a.name} fill sizes="(max-width: 640px) 100vw, 640px" className="case-image" />
        </div>
      )}

      {fields.length > 0 && (
        <div className="step-block">
          <div className="step-label">{labels.stepLabel}</div>
          <div className="card">
            {fields.map((f, i) => (
              <div key={f.label} style={i > 0 ? { marginTop: 6 } : undefined}>
                <strong>{f.label}:</strong> {f.value}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="step-block">
        <div className="step-label">Klinische Bedeutung & Palpation</div>
        <div className="card">
          <div>{a.clinicalRelevance}</div>
          <div style={{ marginTop: 8, color: "var(--ink-soft)", fontSize: 13.5 }}>{a.palpationHint}</div>
        </div>
      </div>

      <div className="step-block">
        <div className="step-label">Transferfrage</div>
        <div className="card">
          <div style={{ marginBottom: 6 }}>{a.transferQ}</div>
          {a.transferOptions.map((o) => (
            <div key={o.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ color: o.isCorrect ? "var(--success)" : "var(--ink)", fontWeight: o.isCorrect ? 600 : 400 }}>
                {o.isCorrect ? "✓ " : "— "}
                {o.label}
              </div>
            </div>
          ))}
          <div className="source-note">{a.sourceStatus}</div>
        </div>
      </div>

      <form action={setContentStatus.bind(null, "anatomy", a.id, a.status === "APPROVED" ? "DRAFT" : "APPROVED")}>
        <div className="btn-row">
          <button type="submit" className="btn-primary">
            {a.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
          </button>
        </div>
      </form>
    </div>
  );
}
