import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { setContentStatus } from "./actions";

export default async function ReviewPage() {
  const session = await auth();
  if (session?.user.role !== "REVIEWER" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [cases, anatomyItems, mediaAssets] = await Promise.all([
    prisma.case.findMany({ orderBy: [{ status: "asc" }, { title: "asc" }] }),
    prisma.anatomyItem.findMany({ orderBy: [{ status: "asc" }, { name: "asc" }] }),
    prisma.mediaAsset.findMany({ orderBy: [{ status: "asc" }, { title: "asc" }] }),
  ]);

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Review</span>
      </div>
      <div className="wordmark">Inhalte prüfen</div>
      <p className="empty-note" style={{ paddingTop: 0 }}>
        Minimale Review-Oberfläche: Status umschalten zwischen Entwurf und freigegeben. Nur
        freigegebene Inhalte sind für reguläre Nutzer:innen sichtbar.
      </p>

      <h3 style={{ marginBottom: 10 }}>Fälle</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {cases.map((c) => (
          <div key={c.id} className="queue-item" style={{ cursor: "default" }}>
            <div>
              <div className="qi-title">{c.title}</div>
              <div className="qi-meta">{c.topic}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`tag ${c.status === "APPROVED" ? "" : "due"}`}>{c.status}</span>
              <form
                action={setContentStatus.bind(
                  null,
                  "case",
                  c.id,
                  c.status === "APPROVED" ? "DRAFT" : "APPROVED",
                )}
              >
                <button type="submit" className="btn-secondary" style={{ padding: "6px 12px" }}>
                  {c.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: 10 }}>Anatomie-Items</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {anatomyItems.map((a) => (
          <div key={a.id} className="queue-item" style={{ cursor: "default" }}>
            <div className="qi-title">{a.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`tag ${a.status === "APPROVED" ? "" : "due"}`}>{a.status}</span>
              <form
                action={setContentStatus.bind(
                  null,
                  "anatomy",
                  a.id,
                  a.status === "APPROVED" ? "DRAFT" : "APPROVED",
                )}
              >
                <button type="submit" className="btn-secondary" style={{ padding: "6px 12px" }}>
                  {a.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: 10 }}>Mediathek</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {mediaAssets.map((m) => (
          <div key={m.id} className="queue-item" style={{ cursor: "default" }}>
            <div className="qi-title">{m.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`tag ${m.status === "APPROVED" ? "" : "due"}`}>{m.status}</span>
              <form
                action={setContentStatus.bind(
                  null,
                  "media",
                  m.id,
                  m.status === "APPROVED" ? "DRAFT" : "APPROVED",
                )}
              >
                <button type="submit" className="btn-secondary" style={{ padding: "6px 12px" }}>
                  {m.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
