import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { setContentStatus } from "@/app/review/actions";

function OptionRow({
  label,
  isCorrect,
  errorCategory,
  extra,
}: {
  label: string;
  isCorrect: boolean;
  errorCategory?: string | null;
  extra?: React.ReactNode;
}) {
  return (
    <div style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ color: isCorrect ? "var(--success)" : "var(--ink)", fontWeight: isCorrect ? 600 : 400 }}>
        {isCorrect ? "✓ " : "— "}
        {label}
      </div>
      {errorCategory && (
        <div style={{ marginTop: 4 }}>
          <span className="error-tag">{errorCategory}</span>
        </div>
      )}
      {extra}
    </div>
  );
}

export default async function CaseReviewPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireReviewerSession();
  const { id } = await params;

  const c = await prisma.case.findUnique({
    where: { id },
    include: {
      hypothesisOptions: { orderBy: { sortOrder: "asc" } },
      weakeningOptions: { orderBy: { sortOrder: "asc" } },
      retrievalOptions: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (!c) notFound();

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/review" className="back-link">
          ← Zur Review-Übersicht
        </Link>
        <span className={`tag ${c.status === "APPROVED" ? "" : "due"}`}>{c.status}</span>
      </div>
      <div className="case-title">{c.title}</div>
      <div className="case-meta">
        {c.topic} · {c.species}
      </div>
      <div className="disclaimer">Lernziel: {c.learningObjective}</div>

      {c.einstiegsbildUrl && (
        <div className="case-image-wrap">
          <Image src={c.einstiegsbildUrl} alt="" fill sizes="(max-width: 640px) 100vw, 640px" className="case-image" />
        </div>
      )}

      <div className="step-block">
        <div className="step-label">Anamnese</div>
        <div className="card">{c.anamnese}</div>
      </div>

      <div className="step-block">
        <div className="step-label">Beobachtung</div>
        <div className="card">
          {c.beobachtung}
          {c.befundbildUrl && (
            <div className="case-image-wrap" style={{ marginTop: 10 }}>
              <Image src={c.befundbildUrl} alt="" fill sizes="(max-width: 640px) 100vw, 640px" className="case-image" />
            </div>
          )}
          <div style={{ marginTop: 8, fontSize: 13, color: "var(--ink-soft)" }}>
            Diagramm-Label: {c.diagramLabel}
          </div>
        </div>
      </div>

      <div className="step-block">
        <div className="step-label">Palpationsbefund</div>
        <div className="card">{c.palpation}</div>
      </div>

      <div className="step-block">
        <div className="step-label">Hypothesenfrage</div>
        <div className="card">
          <div style={{ marginBottom: 6 }}>{c.hypothesisQ}</div>
          {c.hypothesisOptions.map((o) => (
            <OptionRow
              key={o.id}
              label={o.label}
              isCorrect={o.isCorrect}
              errorCategory={o.errorCategory}
              extra={
                o.arguesAgainst ? (
                  <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-soft)" }}>
                    Spricht dagegen: {o.arguesAgainst}
                    {o.differentiationDistractors.length > 0 && (
                      <> · Distraktoren: {o.differentiationDistractors.join(" / ")}</>
                    )}
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      </div>

      <div className="step-block">
        <div className="step-label">Fachliche Einschätzung (Expertennotiz)</div>
        <div className="card">
          {c.expertNote}
          <div className="source-note">{c.sourceStatus}</div>
        </div>
      </div>

      <div className="step-block">
        <div className="step-label">Differentialfrage (Weakening)</div>
        <div className="card">
          <div style={{ marginBottom: 6 }}>{c.weakeningQ}</div>
          {c.weakeningOptions.map((o) => (
            <OptionRow key={o.id} label={o.label} isCorrect={o.isCorrect} errorCategory={o.errorCategory} />
          ))}
        </div>
      </div>

      <div className="step-block">
        <div className="step-label">Vertiefungsfrage (Retrieval)</div>
        <div className="card">
          <div style={{ marginBottom: 6 }}>{c.retrievalQ}</div>
          {c.retrievalOptions.map((o) => (
            <OptionRow key={o.id} label={o.label} isCorrect={o.isCorrect} errorCategory={o.errorCategory} />
          ))}
        </div>
      </div>

      <form
        action={setContentStatus.bind(null, "case", c.id, c.status === "APPROVED" ? "DRAFT" : "APPROVED")}
      >
        <div className="btn-row">
          <button type="submit" className="btn-primary">
            {c.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
          </button>
        </div>
      </form>
    </div>
  );
}
