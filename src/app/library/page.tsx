import Link from "next/link";
import Image from "next/image";
import { requireSession } from "@/lib/auth-helpers";
import { getLibraryEntries } from "@/lib/queries";
import { KNOWLEDGE_CATEGORIES, KNOWLEDGE_CATEGORY_LABELS, isKnowledgeCategory } from "@/lib/knowledgeCategories";

export default async function LibraryPage(props: PageProps<"/library">) {
  await requireSession();
  const sp = await props.searchParams;
  const categoryParam = typeof sp.kategorie === "string" ? sp.kategorie : undefined;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const category = categoryParam && isKnowledgeCategory(categoryParam) ? categoryParam : undefined;

  const entries = await getLibraryEntries(category, q || undefined);

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Wissensbibliothek</span>
      </div>
      <div className="case-title">Wissensbibliothek</div>
      <div className="disclaimer" style={{ marginBottom: 18 }}>
        Fachwissen zum Nachlesen und Vertiefen — eigenständig aufbereitet, mit Quellenangabe. Nur
        freigegebene Einträge sind hier sichtbar.
      </div>

      <form action="/library" method="get" style={{ marginBottom: 14 }}>
        <input
          type="text"
          name="q"
          placeholder="Suche nach Titel …"
          defaultValue={q}
          style={{ marginBottom: 10 }}
        />
        {category && <input type="hidden" name="kategorie" value={category} />}
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button type="submit" className="btn-secondary">
            Suchen
          </button>
        </div>
      </form>

      <div className="error-tag-row" style={{ marginBottom: 18 }}>
        <Link href={q ? `/library?q=${encodeURIComponent(q)}` : "/library"} className={`tag${!category ? " due" : ""}`}>
          Alle
        </Link>
        {KNOWLEDGE_CATEGORIES.map((c) => {
          const href = `/library?kategorie=${c}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
          return (
            <Link key={c} href={href} className={`tag${category === c ? " due" : ""}`}>
              {KNOWLEDGE_CATEGORY_LABELS[c]}
            </Link>
          );
        })}
      </div>

      <div className="card" style={{ padding: "4px 18px" }}>
        {entries.length === 0 && (
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
              {q || category
                ? "Keine Einträge gefunden."
                : "Noch keine freigegebenen Wissenseinträge — sie erscheinen hier nach Freigabe durch eine Reviewerin."}
            </p>
          </div>
        )}
        {entries.map((e) => (
          <Link key={e.id} href={`/library/${e.slug}`} className="queue-item">
            <div>
              <div className="qi-title">{e.title}</div>
              <div className="qi-meta">{e.teaser}</div>
            </div>
            <span className="tag">{KNOWLEDGE_CATEGORY_LABELS[e.category]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
