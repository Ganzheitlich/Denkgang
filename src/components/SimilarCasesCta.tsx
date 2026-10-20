import Link from "next/link";

type SimilarCase = { slug: string; title: string };

/**
 * Schlägt am Ende eines Falls verwandte Fälle zum Weiterüben vor — anders
 * als KnowledgeCta nicht fehlerabhängig formuliert, da es hier nicht um
 * Aufarbeitung geht, sondern ums bewusste Üben verwandter Anamnesen
 * derselben Diagnose-Kategorie (z. B. Kreuzbandriss akut vs. Teilriss).
 */
export function SimilarCasesCta({ cases }: { cases: SimilarCase[] }) {
  if (cases.length === 0) return null;

  if (cases.length === 1) {
    const c = cases[0];
    return (
      <Link href={`/case/${c.slug}`} className="knowledge-cta">
        <span>
          Ähnlicher Fall zum Weiterüben: <strong>{c.title}</strong>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <div className="knowledge-cta-group">
      <div className="knowledge-cta-group-label">Ähnliche Fälle zum Weiterüben:</div>
      {cases.map((c) => (
        <Link key={c.slug} href={`/case/${c.slug}`} className="knowledge-cta knowledge-cta-option">
          <span>{c.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}
