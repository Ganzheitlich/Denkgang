import Link from "next/link";

type KnowledgeSuggestion = { slug: string; title: string };

/**
 * Zeigt bei einer Fehlantwort den Einstieg in die Wissensbibliothek. Bei genau
 * einem passenden Eintrag verlinkt der Button direkt dorthin. Bei mehreren
 * passenden Einträgen entscheidet die Nutzerin selbst, welchen sie vertiefen
 * möchte, statt dass die App unbemerkt einen davon bevorzugt. Gibt es keinen
 * passenden Eintrag, führt der Button generisch in die Bibliothek zum Stöbern.
 */
export function KnowledgeCta({ suggestions }: { suggestions: KnowledgeSuggestion[] }) {
  if (suggestions.length === 0) {
    return (
      <Link href="/library" className="knowledge-cta">
        <span>Nicht sicher, warum? Stöbere in der Wissensbibliothek</span>
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  if (suggestions.length === 1) {
    const s = suggestions[0];
    return (
      <Link href={`/library/${s.slug}`} className="knowledge-cta">
        <span>
          Nicht sicher, warum? Direkt vertiefen: <strong>{s.title}</strong>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <div className="knowledge-cta-group">
      <div className="knowledge-cta-group-label">Nicht sicher, warum? Direkt vertiefen:</div>
      {suggestions.map((s) => (
        <Link key={s.slug} href={`/library/${s.slug}`} className="knowledge-cta knowledge-cta-option">
          <span>{s.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}
