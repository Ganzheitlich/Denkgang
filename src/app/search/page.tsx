import Link from "next/link";
import Image from "next/image";
import { requireSession } from "@/lib/auth-helpers";
import { searchAllContent } from "@/lib/queries";
import { CASE_DIFFICULTY_LABELS } from "@/lib/caseDifficulty";
import { KNOWLEDGE_CATEGORY_LABELS } from "@/lib/knowledgeCategories";
import { ANATOMY_KIND_LABELS } from "@/lib/anatomyKind";

export default async function SearchPage(props: PageProps<"/search">) {
  await requireSession();
  const sp = await props.searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";

  const results = q ? await searchAllContent(q) : null;
  const totalHits = results ? results.casesTotal + results.knowledgeTotal + results.anatomyTotal : 0;

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Suche</span>
      </div>
      <div className="case-title">Suche</div>
      <div className="disclaimer" style={{ marginBottom: 18 }}>
        Durchsucht Fälle, Wissensbibliothek und Anatomie-Items gleichzeitig — nur freigegebene
        Inhalte.
      </div>

      <form action="/search" method="get" style={{ marginBottom: 18 }}>
        <input
          type="text"
          name="q"
          placeholder="z. B. Kreuzbandriss, Quadriceps, Patella …"
          defaultValue={q}
          style={{ marginBottom: 10 }}
        />
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button type="submit" className="btn-secondary">
            Suchen
          </button>
        </div>
      </form>

      {!q && (
        <div className="empty-state">
          <Image
            src="/denkgang-mark.png"
            alt=""
            width={873}
            height={873}
            className="logo-img empty-state-mark"
            style={{ width: 36, height: 36 }}
          />
          <p style={{ margin: 0 }}>
            Suchbegriff eingeben, um Fälle, Wissen und Anatomie gleichzeitig zu durchsuchen.
          </p>
        </div>
      )}

      {results && totalHits === 0 && (
        <div className="empty-state">
          <Image
            src="/denkgang-mark.png"
            alt=""
            width={873}
            height={873}
            className="logo-img empty-state-mark"
            style={{ width: 36, height: 36 }}
          />
          <p style={{ margin: 0 }}>Keine Treffer für „{q}&quot;.</p>
        </div>
      )}

      {results && results.cases.length > 0 && (
        <>
          <h3 style={{ marginBottom: 10 }}>Fälle</h3>
          <div className="card" style={{ padding: "4px 18px", marginBottom: results.casesTotal > results.cases.length ? 4 : 18 }}>
            {results.cases.map((c) => (
              <Link key={c.id} href={`/case/${c.slug}`} className="queue-item">
                <div>
                  <div className="qi-title">{c.title}</div>
                  <div className="qi-meta">
                    {c.species} · {c.topic} · {CASE_DIFFICULTY_LABELS[c.difficulty]}
                  </div>
                </div>
                <span className="tag">→</span>
              </Link>
            ))}
          </div>
          {results.casesTotal > results.cases.length && (
            <p className="empty-note" style={{ marginBottom: 18 }}>
              <Link href={`/cases?q=${encodeURIComponent(q)}`} style={{ color: "var(--petrol)" }}>
                Alle {results.casesTotal} Treffer in der Fallübersicht ansehen
              </Link>
            </p>
          )}
        </>
      )}

      {results && results.knowledge.length > 0 && (
        <>
          <h3 style={{ marginBottom: 10 }}>Wissensbibliothek</h3>
          <div
            className="card"
            style={{ padding: "4px 18px", marginBottom: results.knowledgeTotal > results.knowledge.length ? 4 : 18 }}
          >
            {results.knowledge.map((k) => (
              <Link key={k.id} href={`/library/${k.slug}`} className="queue-item">
                <div>
                  <div className="qi-title">{k.title}</div>
                  <div className="qi-meta">{KNOWLEDGE_CATEGORY_LABELS[k.category]}</div>
                </div>
                <span className="tag">→</span>
              </Link>
            ))}
          </div>
          {results.knowledgeTotal > results.knowledge.length && (
            <p className="empty-note" style={{ marginBottom: 18 }}>
              <Link href={`/library?q=${encodeURIComponent(q)}`} style={{ color: "var(--petrol)" }}>
                Alle {results.knowledgeTotal} Treffer in der Wissensbibliothek ansehen
              </Link>
            </p>
          )}
        </>
      )}

      {results && results.anatomy.length > 0 && (
        <>
          <h3 style={{ marginBottom: 10 }}>Anatomie</h3>
          <div className="card" style={{ padding: "4px 18px", marginBottom: 18 }}>
            {results.anatomy.map((a) => (
              <Link key={a.id} href={`/anatomy/${a.slug}`} className="queue-item">
                <div className="qi-title">{a.name}</div>
                <span className="tag">{ANATOMY_KIND_LABELS[a.kind]}</span>
              </Link>
            ))}
          </div>
          {results.anatomyTotal > results.anatomy.length && (
            <p className="empty-note">{results.anatomyTotal} Treffer insgesamt.</p>
          )}
        </>
      )}
    </div>
  );
}
