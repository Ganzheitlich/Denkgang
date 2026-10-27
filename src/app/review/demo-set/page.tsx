import Link from "next/link";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { CASE_SLUGS, KNOWLEDGE_SLUGS } from "./demoSet";
import { setDemoSetStatus } from "./actions";

export default async function DemoSetPage() {
  await requireReviewerSession();

  const [cases, knowledge] = await Promise.all([
    prisma.case.findMany({
      where: { slug: { in: CASE_SLUGS } },
      select: { slug: true, title: true, status: true },
      orderBy: { title: "asc" },
    }),
    prisma.knowledgeEntry.findMany({
      where: { slug: { in: KNOWLEDGE_SLUGS } },
      select: { slug: true, title: true, status: true },
      orderBy: { title: "asc" },
    }),
  ]);

  const allApproved = [...cases, ...knowledge].every((item) => item.status === "APPROVED");

  async function activate() {
    "use server";
    await setDemoSetStatus("APPROVED");
  }

  async function deactivate() {
    "use server";
    await setDemoSetStatus("DRAFT");
  }

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/review" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Demo-Set</span>
      </div>
      <div className="case-title">Demo-Set für Vorführungen</div>
      <div className="disclaimer" style={{ marginBottom: 18 }}>
        Eine feste, kuratierte Auswahl ({cases.length} Fälle, {knowledge.length} Wissenseinträge) —
        Hund und Katze, Orthopädie und Neurologie, alle Schwierigkeitsgrade, mit funktionierenden
        Querverlinkungen. Kein echter fachlicher Freigabeprozess, nur ein Sichtbarkeits-Schalter
        für Vorführungen. Jederzeit mit einem Klick wieder auf Entwurf zurücksetzbar.
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <p style={{ marginTop: 0 }}>
          Status: <strong>{allApproved ? "Demo-Set ist aktiv (freigegeben)" : "Demo-Set ist inaktiv (Entwurf)"}</strong>
        </p>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <form action={activate}>
            <button type="submit" className="btn-primary">
              Demo-Set freigeben
            </button>
          </form>
          <form action={deactivate}>
            <button type="submit" className="btn-secondary">
              Demo-Set zurücksetzen
            </button>
          </form>
        </div>
      </div>

      <h3 style={{ marginBottom: 10 }}>Fälle ({cases.length})</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {cases.map((c) => (
          <div className="queue-item" key={c.slug}>
            <div className="qi-title">{c.title}</div>
            <span className={`tag ${c.status === "APPROVED" ? "due" : ""}`}>{c.status}</span>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: 10, marginTop: 18 }}>Wissenseinträge ({knowledge.length})</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {knowledge.map((k) => (
          <div className="queue-item" key={k.slug}>
            <div className="qi-title">{k.title}</div>
            <span className={`tag ${k.status === "APPROVED" ? "due" : ""}`}>{k.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
