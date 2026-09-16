import Link from "next/link";
import { requireSession } from "@/lib/auth-helpers";
import { getDashboardData } from "@/lib/queries";
import { LogoutButton } from "@/components/LogoutButton";

const DISCLAIMER =
  "Lernfall / Simulation zu Übungszwecken — kein Ersatz für tierärztliche oder tierphysiotherapeutische Diagnostik am realen Tier.";

export default async function DashboardPage() {
  const session = await requireSession();
  const user = session.user;
  const { skills, insight, errorTags, anatomyItems, mediaAssets, queue } = await getDashboardData(
    user.id,
  );

  return (
    <div className="app">
      <div className="top-nav">
        <div>
          <div className="wordmark">Denkgang</div>
          <div className="tagline" style={{ marginBottom: 0 }}>
            Klinisches Denken trainieren, nicht nur Fakten pauken.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {(user.role === "REVIEWER" || user.role === "ADMIN") && (
            <Link href="/review" className="tag">
              Review
            </Link>
          )}
          <LogoutButton />
        </div>
      </div>
      <div className="disclaimer" style={{ marginTop: 18 }}>
        {DISCLAIMER}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 12 }}>Kompetenz-Übersicht</h3>
        {skills.map((s) => (
          <div className="skill-row" key={s.label}>
            <div className="skill-top">
              <span>{s.label}</span>
              <span>{s.val === null ? "—" : `${s.val}%`}</span>
            </div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: `${s.val ?? 0}%` }} />
            </div>
          </div>
        ))}
        <div className="insight-line">{insight}</div>
        {errorTags.length > 0 && (
          <div className="error-tag-row">
            {errorTags.map(([cat, n]) => (
              <span className="error-tag" key={cat}>
                {cat} · {n}×
              </span>
            ))}
          </div>
        )}
      </div>

      <h3 style={{ marginBottom: 10 }}>Anatomie-Wissen</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {anatomyItems.length === 0 && (
          <p className="empty-note">Noch keine freigegebenen Anatomie-Items.</p>
        )}
        {anatomyItems.map(({ item, state }) => (
          <Link key={item.id} href={`/anatomy/${item.slug}`} className="queue-item">
            <div>
              <div className="qi-title">{item.name}</div>
            </div>
            <span className={`tag ${state === "wiederholen" ? "due" : ""}`}>{state}</span>
          </Link>
        ))}
      </div>
      <p className="empty-note">
        Anatomie und Fälle sind im Hintergrund miteinander verknüpft, aber bewusst nicht sichtbar
        — sonst würde die Verknüpfung die Diagnose vorwegnehmen.
      </p>

      <h3 style={{ marginBottom: 10 }}>
        Mediathek <span className="tag" style={{ marginLeft: 6 }}>Konzept</span>
      </h3>
      <div className="card">
        {mediaAssets.length === 0 && (
          <p className="empty-note" style={{ padding: 0 }}>
            Noch keine freigegebenen Medien.
          </p>
        )}
        {mediaAssets.map((m) => (
          <div className="media-item" key={m.id}>
            <div className="media-title">
              <span>{m.title}</span>
              <span className="tag">{m.type}</span>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 4 }}>{m.note}</div>
            <div className="media-tags">
              {m.caseLinks.map((l) => (
                <span className="tag" key={l.caseId}>
                  {l.case.title.split(" — ")[0]}
                </span>
              ))}
            </div>
          </div>
        ))}
        <p className="empty-note" style={{ marginTop: 4 }}>
          Jedes Medium wird einmal angelegt und mehreren passenden Fällen zugeordnet — statt für
          jeden Fall separat dupliziert zu werden. Sobald echtes Praxismaterial vorliegt, ersetzt
          es diese Platzhalter 1:1.
        </p>
      </div>

      <h3 style={{ marginBottom: 10 }}>Deine Fall-Warteschlange</h3>
      <div className="card" style={{ padding: "4px 18px" }}>
        {queue.length === 0 && (
          <p className="empty-note">
            Noch keine freigegebenen Fälle. Inhalte sind erst nach Review sichtbar.
          </p>
        )}
        {queue.map(({ case: c, dueLabel }) => (
          <Link key={c.id} href={`/case/${c.slug}`} className="queue-item">
            <div>
              <div className="qi-title">{c.title}</div>
              <div className="qi-meta">{c.species}</div>
            </div>
            <span className={`tag ${dueLabel !== "neu" ? "due" : ""}`}>{dueLabel}</span>
          </Link>
        ))}
      </div>
      <p className="empty-note">
        Die Reihenfolge richtet sich nach dem Wiederholungstermin (Spacing). Fälle sind erst nach
        Freigabe durch eine Reviewerin sichtbar.
      </p>
    </div>
  );
}
