import Link from "next/link";

type KnowledgeSuggestion = { slug: string; title: string };

/**
 * Zeigt den Einstieg in die Wissensbibliothek — bei einer Fehlantwort als
 * Aufarbeitung ("Nicht sicher, warum?"), bei einer richtigen Antwort als
 * Angebot zum Vertiefen, ohne remediale Formulierung. Bei genau einem
 * passenden Eintrag verlinkt der Button direkt dorthin. Bei mehreren
 * passenden Einträgen entscheidet die Nutzerin selbst, welchen sie vertiefen
 * möchte, statt dass die App unbemerkt einen davon bevorzugt. Gibt es bei
 * einer Fehlantwort keinen passenden Eintrag, führt der Button generisch in
 * die Bibliothek zum Stöbern; bei einer richtigen Antwort ohne passenden
 * Eintrag wird nichts angezeigt, statt unpassend zum Stöbern aufzufordern.
 */
export function KnowledgeCta({
  suggestions,
  correct = false,
}: {
  suggestions: KnowledgeSuggestion[];
  correct?: boolean;
}) {
  if (suggestions.length === 0) {
    if (correct) return null;
    return (
      <Link href="/library" className="knowledge-cta">
        <span>Nicht sicher, warum? Stöbere in der Wissensbibliothek</span>
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  const label = correct ? "Zum Thema vertiefen:" : "Nicht sicher, warum? Direkt vertiefen:";

  if (suggestions.length === 1) {
    const s = suggestions[0];
    return (
      <Link href={`/library/${s.slug}`} className="knowledge-cta">
        <span>
          {label} <strong>{s.title}</strong>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <div className="knowledge-cta-group">
      <div className="knowledge-cta-group-label">{label}</div>
      {suggestions.map((s) => (
        <Link key={s.slug} href={`/library/${s.slug}`} className="knowledge-cta knowledge-cta-option">
          <span>{s.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}
