import Link from "next/link";
import Image from "next/image";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { KNOWLEDGE_CATEGORY_LABELS } from "@/lib/knowledgeCategories";
import { setContentStatus } from "./actions";

function ReviewRow({
  title,
  meta,
  status,
  thumbUrl,
  action,
}: {
  title: string;
  meta?: string;
  status: "DRAFT" | "REVIEW" | "APPROVED";
  thumbUrl?: string | null;
  action: (formData: FormData) => void;
}) {
  return (
    <div className="review-row">
      {thumbUrl ? (
        <div className="review-thumb-wrap">
          <Image src={thumbUrl} alt="" fill sizes="56px" className="review-thumb" />
        </div>
      ) : (
        <div className="review-thumb-wrap review-thumb-empty" />
      )}
      <div className="review-row-body">
        <div className="review-row-top">
          <div>
            <div className="qi-title">{title}</div>
            {meta && <div className="qi-meta">{meta}</div>}
          </div>
          <span className={`tag ${status === "APPROVED" ? "" : "due"}`}>{status}</span>
        </div>
        <form action={action}>
          <button type="submit" className="btn-secondary review-row-btn">
            {status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function ReviewPage() {
  await requireReviewerSession();

  const [cases, anatomyItems, mediaAssets, knowledgeEntries] = await Promise.all([
    prisma.case.findMany({ orderBy: [{ status: "asc" }, { title: "asc" }] }),
    prisma.anatomyItem.findMany({ orderBy: [{ status: "asc" }, { name: "asc" }] }),
    prisma.mediaAsset.findMany({ orderBy: [{ status: "asc" }, { title: "asc" }] }),
    prisma.knowledgeEntry.findMany({ orderBy: [{ status: "asc" }, { title: "asc" }] }),
  ]);

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Review</span>
      </div>
      <div className="case-title">Inhalte prüfen</div>
      <div className="disclaimer" style={{ marginBottom: 18 }}>
        Minimale Review-Oberfläche: Status umschalten zwischen Entwurf und freigegeben. Nur
        freigegebene Inhalte sind für reguläre Nutzer:innen sichtbar.
      </div>

      <h3 style={{ marginBottom: 10 }}>Fälle</h3>
      <div className="card step-block" style={{ padding: "4px 18px" }}>
        {cases.map((c) => (
          <ReviewRow
            key={c.id}
            title={c.title}
            meta={c.topic}
            status={c.status}
            thumbUrl={c.einstiegsbildUrl}
            action={setContentStatus.bind(
              null,
              "case",
              c.id,
              c.status === "APPROVED" ? "DRAFT" : "APPROVED",
            )}
          />
        ))}
      </div>

      <h3 style={{ marginBottom: 10 }}>Anatomie-Items</h3>
      <div className="card step-block" style={{ padding: "4px 18px" }}>
        {anatomyItems.map((a) => (
          <ReviewRow
            key={a.id}
            title={a.name}
            status={a.status}
            thumbUrl={a.bildUrl}
            action={setContentStatus.bind(
              null,
              "anatomy",
              a.id,
              a.status === "APPROVED" ? "DRAFT" : "APPROVED",
            )}
          />
        ))}
      </div>

      <h3 style={{ marginBottom: 10 }}>Wissensbibliothek</h3>
      <div className="card step-block" style={{ padding: "4px 18px" }}>
        {knowledgeEntries.map((k) => (
          <ReviewRow
            key={k.id}
            title={k.title}
            meta={KNOWLEDGE_CATEGORY_LABELS[k.category]}
            status={k.status}
            thumbUrl={k.bildUrl}
            action={setContentStatus.bind(
              null,
              "knowledge",
              k.id,
              k.status === "APPROVED" ? "DRAFT" : "APPROVED",
            )}
          />
        ))}
      </div>

      <h3 style={{ marginBottom: 10 }}>Mediathek</h3>
      <div className="card step-block" style={{ padding: "4px 18px" }}>
        {mediaAssets.map((m) => (
          <ReviewRow
            key={m.id}
            title={m.title}
            meta={m.type}
            status={m.status}
            action={setContentStatus.bind(
              null,
              "media",
              m.id,
              m.status === "APPROVED" ? "DRAFT" : "APPROVED",
            )}
          />
        ))}
      </div>
    </div>
  );
}
