import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { setContentStatus } from "@/app/review/actions";

export default async function AnatomyReviewPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireReviewerSession();
  const { id } = await params;

  const a = await prisma.anatomyItem.findUnique({
    where: { id },
    include: { transferOptions: { orderBy: { sortOrder: "asc" } } },
  });
  if (!a) notFound();

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/review" className="back-link">
          ← Zur Review-Übersicht
        </Link>
        <span className={`tag ${a.status === "APPROVED" ? "" : "due"}`}>{a.status}</span>
      </div>
      <div className="case-title">{a.name}</div>

      {a.bildUrl && (
        <div className="case-image-wrap">
          <Image src={a.bildUrl} alt={a.name} fill sizes="(max-width: 640px) 100vw, 640px" className="case-image" />
        </div>
      )}

      <div className="step-block">
        <div className="step-label">Ursprung → Ansatz → Funktion</div>
        <div className="card">
          <div>
            <strong>Ursprung:</strong> {a.origin}
          </div>
          <div style={{ marginTop: 6 }}>
            <strong>Ansatz:</strong> {a.insertion}
          </div>
          <div style={{ marginTop: 6 }}>
            <strong>Funktion:</strong> {a.funktion}
          </div>
          <div style={{ marginTop: 6 }}>
            <strong>Innervation:</strong> {a.innervation}
          </div>
        </div>
      </div>

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
