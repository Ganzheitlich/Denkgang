import Link from "next/link";
import Image from "next/image";
import { requireSession } from "@/lib/auth-helpers";
import { getBrowsableCases } from "@/lib/queries";
import { CASE_DIFFICULTY_LABELS, CASE_DIFFICULTIES } from "@/lib/caseDifficulty";
import { clusterKeyFor } from "@/lib/interleave";
import type { CaseDifficulty } from "@/generated/prisma/enums";

function isDifficulty(value: string): value is CaseDifficulty {
  return (CASE_DIFFICULTIES as string[]).includes(value);
}

export default async function CasesPage(props: PageProps<"/cases">) {
  await requireSession();
  const sp = await props.searchParams;
  const clusterParam = typeof sp.thema === "string" ? sp.thema : undefined;
  const difficultyParam = typeof sp.schwierigkeit === "string" ? sp.schwierigkeit : undefined;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const difficulty = difficultyParam && isDifficulty(difficultyParam) ? difficultyParam : undefined;

  const allCases = await getBrowsableCases(q || undefined);

  const clusters = [...new Set(allCases.map((c) => clusterKeyFor(c.topic)))].sort((a, b) =>
    a.localeCompare(b, "de"),
  );
  const cluster = clusterParam && clusters.includes(clusterParam) ? clusterParam : undefined;

  const cases = allCases.filter(
    (c) => (!cluster || clusterKeyFor(c.topic) === cluster) && (!difficulty || c.difficulty === difficulty),
  );

  function withParams(extra: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const merged = { thema: cluster, schwierigkeit: difficulty, q: q || undefined, ...extra };
    for (const [key, value] of Object.entries(merged)) {
      if (value) params.set(key, value);
    }
    const qs = params.toString();
    return qs ? `/cases?${qs}` : "/cases";
  }

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <span className="tag">Fälle</span>
      </div>
      <div className="case-title">Fallübersicht</div>
      <div className="disclaimer" style={{ marginBottom: 18 }}>
        Alle freigegebenen Fälle zum gezielten Durchstöbern — unabhängig von deiner persönlichen
        Warteschlange auf dem Dashboard. Nach Thema und Schwierigkeit filterbar.
      </div>

      <form action="/cases" method="get" style={{ marginBottom: 14 }}>
        <input type="text" name="q" placeholder="Suche nach Titel …" defaultValue={q} style={{ marginBottom: 10 }} />
        {cluster && <input type="hidden" name="thema" value={cluster} />}
        {difficulty && <input type="hidden" name="schwierigkeit" value={difficulty} />}
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button type="submit" className="btn-secondary">
            Suchen
          </button>
        </div>
      </form>

      <div className="error-tag-row" style={{ marginBottom: 10 }}>
        <Link href={withParams({ thema: undefined })} className={`tag${!cluster ? " due" : ""}`}>
          Alle Themen
        </Link>
        {clusters.map((c) => (
          <Link key={c} href={withParams({ thema: c })} className={`tag${cluster === c ? " due" : ""}`}>
            {c}
          </Link>
        ))}
      </div>

      <div className="error-tag-row" style={{ marginBottom: 18 }}>
        <Link href={withParams({ schwierigkeit: undefined })} className={`tag${!difficulty ? " due" : ""}`}>
          Alle Schwierigkeiten
        </Link>
        {CASE_DIFFICULTIES.map((d) => (
          <Link key={d} href={withParams({ schwierigkeit: d })} className={`tag${difficulty === d ? " due" : ""}`}>
            {CASE_DIFFICULTY_LABELS[d]}
          </Link>
        ))}
      </div>

      <div className="card" style={{ padding: "4px 18px" }}>
        {cases.length === 0 && (
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
              {q || cluster || difficulty
                ? "Keine Fälle für diese Filterauswahl."
                : "Noch keine freigegebenen Fälle — sie erscheinen hier nach Freigabe durch eine Reviewerin."}
            </p>
          </div>
        )}
        {cases.map((c) => (
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
      <p className="empty-note">
        {cases.length > 0
          ? `${cases.length} Fall${cases.length === 1 ? "" : "e"} passend zur aktuellen Auswahl.`
          : ""}
      </p>
    </div>
  );
}
