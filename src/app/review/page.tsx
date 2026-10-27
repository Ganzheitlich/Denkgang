import Link from "next/link";
import { requireReviewerSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { KNOWLEDGE_CATEGORIES, KNOWLEDGE_CATEGORY_LABELS, isKnowledgeCategory } from "@/lib/knowledgeCategories";
import { CASE_DIFFICULTY_LABELS } from "@/lib/caseDifficulty";
import { ReviewList, type ReviewItem } from "@/components/ReviewList";
import type { ContentStatus, KnowledgeCategory } from "@/generated/prisma/enums";

const PAGE_SIZE = 80;

const TYPES = [
  { key: "case", label: "Fälle" },
  { key: "anatomy", label: "Anatomie-Items" },
  { key: "knowledge", label: "Wissensbibliothek" },
  { key: "media", label: "Mediathek" },
] as const;
type ContentType = (typeof TYPES)[number]["key"];

function isContentType(value: string): value is ContentType {
  return TYPES.some((t) => t.key === value);
}

const STATUS_FILTERS: { key: ContentStatus | "ALL"; label: string }[] = [
  { key: "ALL", label: "Alle" },
  { key: "DRAFT", label: "Entwurf" },
  { key: "REVIEW", label: "Review" },
  { key: "APPROVED", label: "Freigegeben" },
  { key: "ARCHIVED", label: "Archiviert" },
];

function isStatusFilter(value: string): value is ContentStatus | "ALL" {
  return STATUS_FILTERS.some((s) => s.key === value);
}

async function loadCases(where: { status?: ContentStatus; q?: string }, page: number) {
  const prismaWhere = {
    ...(where.status ? { status: where.status } : {}),
    ...(where.q ? { title: { contains: where.q, mode: "insensitive" as const } } : {}),
  };
  const [total, statusCounts, rows] = await Promise.all([
    prisma.case.count({ where: prismaWhere }),
    prisma.case.groupBy({
      by: ["status"],
      where: where.q ? { title: { contains: where.q, mode: "insensitive" } } : {},
      _count: { _all: true },
    }),
    prisma.case.findMany({
      where: prismaWhere,
      orderBy: [{ status: "asc" }, { title: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const items: ReviewItem[] = rows.map((c) => ({
    id: c.id,
    title: c.title,
    href: `/review/case/${c.id}`,
    meta: `${c.topic} · ${CASE_DIFFICULTY_LABELS[c.difficulty]}`,
    status: c.status,
    thumbUrl: c.einstiegsbildUrl,
  }));
  return { total, statusCounts, items };
}

async function loadAnatomy(where: { status?: ContentStatus; q?: string }, page: number) {
  const prismaWhere = {
    ...(where.status ? { status: where.status } : {}),
    ...(where.q ? { name: { contains: where.q, mode: "insensitive" as const } } : {}),
  };
  const [total, statusCounts, rows] = await Promise.all([
    prisma.anatomyItem.count({ where: prismaWhere }),
    prisma.anatomyItem.groupBy({
      by: ["status"],
      where: where.q ? { name: { contains: where.q, mode: "insensitive" } } : {},
      _count: { _all: true },
    }),
    prisma.anatomyItem.findMany({
      where: prismaWhere,
      orderBy: [{ status: "asc" }, { name: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const items: ReviewItem[] = rows.map((a) => ({
    id: a.id,
    title: a.name,
    href: `/review/anatomy/${a.id}`,
    status: a.status,
    thumbUrl: a.bildUrl,
  }));
  return { total, statusCounts, items };
}

async function loadKnowledge(
  where: { status?: ContentStatus; q?: string; category?: KnowledgeCategory },
  page: number,
) {
  const prismaWhere = {
    ...(where.status ? { status: where.status } : {}),
    ...(where.category ? { category: where.category } : {}),
    ...(where.q ? { title: { contains: where.q, mode: "insensitive" as const } } : {}),
  };
  const [total, statusCounts, rows] = await Promise.all([
    prisma.knowledgeEntry.count({ where: prismaWhere }),
    prisma.knowledgeEntry.groupBy({
      by: ["status"],
      where: {
        ...(where.category ? { category: where.category } : {}),
        ...(where.q ? { title: { contains: where.q, mode: "insensitive" } } : {}),
      },
      _count: { _all: true },
    }),
    prisma.knowledgeEntry.findMany({
      where: prismaWhere,
      orderBy: [{ status: "asc" }, { title: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const items: ReviewItem[] = rows.map((k) => ({
    id: k.id,
    title: k.title,
    href: `/review/knowledge/${k.id}`,
    meta: KNOWLEDGE_CATEGORY_LABELS[k.category],
    status: k.status,
  }));
  return { total, statusCounts, items };
}

async function loadMedia(where: { status?: ContentStatus; q?: string }, page: number) {
  const prismaWhere = {
    ...(where.status ? { status: where.status } : {}),
    ...(where.q ? { title: { contains: where.q, mode: "insensitive" as const } } : {}),
  };
  const [total, statusCounts, rows] = await Promise.all([
    prisma.mediaAsset.count({ where: prismaWhere }),
    prisma.mediaAsset.groupBy({
      by: ["status"],
      where: where.q ? { title: { contains: where.q, mode: "insensitive" } } : {},
      _count: { _all: true },
    }),
    prisma.mediaAsset.findMany({
      where: prismaWhere,
      orderBy: [{ status: "asc" }, { title: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const items: ReviewItem[] = rows.map((m) => ({
    id: m.id,
    title: m.title,
    meta: m.type,
    detail: m.note,
    status: m.status,
  }));
  return { total, statusCounts, items };
}

export default async function ReviewPage(props: PageProps<"/review">) {
  await requireReviewerSession();
  const sp = await props.searchParams;

  const type: ContentType = typeof sp.type === "string" && isContentType(sp.type) ? sp.type : "case";
  const statusParam = typeof sp.status === "string" ? sp.status : "ALL";
  const status = isStatusFilter(statusParam) ? statusParam : "ALL";
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const categoryParam = typeof sp.kategorie === "string" ? sp.kategorie : undefined;
  const category = type === "knowledge" && categoryParam && isKnowledgeCategory(categoryParam) ? categoryParam : undefined;
  const page = Math.max(1, Number(sp.page) || 1);

  const where = { status: status === "ALL" ? undefined : status, q: q || undefined, category };

  const [totalCases, totalAnatomy, totalKnowledge, totalMedia, data] = await Promise.all([
    prisma.case.count(),
    prisma.anatomyItem.count(),
    prisma.knowledgeEntry.count(),
    prisma.mediaAsset.count(),
    type === "case"
      ? loadCases(where, page)
      : type === "anatomy"
        ? loadAnatomy(where, page)
        : type === "knowledge"
          ? loadKnowledge(where, page)
          : loadMedia(where, page),
  ]);

  const typeCounts: Record<ContentType, number> = {
    case: totalCases,
    anatomy: totalAnatomy,
    knowledge: totalKnowledge,
    media: totalMedia,
  };

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  const statusCountFor = (s: ContentStatus) => data.statusCounts.find((g) => g.status === s)?._count._all ?? 0;

  function statusHref(s: ContentStatus | "ALL") {
    const usp = new URLSearchParams();
    usp.set("type", type);
    if (s !== "ALL") usp.set("status", s);
    if (q) usp.set("q", q);
    if (category) usp.set("kategorie", category);
    return `/review?${usp.toString()}`;
  }

  function categoryHref(c?: KnowledgeCategory) {
    const usp = new URLSearchParams();
    usp.set("type", "knowledge");
    if (status !== "ALL") usp.set("status", status);
    if (q) usp.set("q", q);
    if (c) usp.set("kategorie", c);
    return `/review?${usp.toString()}`;
  }

  function pageHref(p: number) {
    const usp = new URLSearchParams();
    usp.set("type", type);
    if (status !== "ALL") usp.set("status", status);
    if (q) usp.set("q", q);
    if (category) usp.set("kategorie", category);
    if (p > 1) usp.set("page", String(p));
    return `/review?${usp.toString()}`;
  }

  const rangeStart = data.total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, data.total);

  return (
    <div className="app">
      <div className="top-nav">
        <Link href="/dashboard" className="back-link">
          ← Zur Übersicht
        </Link>
        <Link href="/review/demo-set" className="tag">
          Demo-Set
        </Link>
        <span className="tag">Review</span>
      </div>
      <div className="case-title">Inhalte prüfen</div>
      <div className="disclaimer" style={{ marginBottom: 18 }}>
        Status umschalten zwischen Entwurf und freigegeben — einzeln oder per Mehrfachauswahl. Nur
        freigegebene Inhalte sind für reguläre Nutzer:innen sichtbar.
      </div>

      <div className="error-tag-row" style={{ marginBottom: 10 }}>
        {TYPES.map((t) => (
          <Link key={t.key} href={`/review?type=${t.key}`} className={`tag${type === t.key ? " due" : ""}`}>
            {t.label} ({typeCounts[t.key]})
          </Link>
        ))}
      </div>

      <div className="error-tag-row" style={{ marginBottom: 10 }}>
        {STATUS_FILTERS.map((s) => (
          <Link key={s.key} href={statusHref(s.key)} className={`tag${status === s.key ? " due" : ""}`}>
            {s.label}
            {s.key !== "ALL" ? ` (${statusCountFor(s.key)})` : ""}
          </Link>
        ))}
      </div>

      {type === "knowledge" && (
        <div className="error-tag-row" style={{ marginBottom: 14 }}>
          <Link href={categoryHref(undefined)} className={`tag${!category ? " due" : ""}`}>
            Alle Kategorien
          </Link>
          {KNOWLEDGE_CATEGORIES.map((c) => (
            <Link key={c} href={categoryHref(c)} className={`tag${category === c ? " due" : ""}`}>
              {KNOWLEDGE_CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>
      )}

      <form action="/review" method="get" style={{ marginBottom: 16 }}>
        <input type="hidden" name="type" value={type} />
        {status !== "ALL" && <input type="hidden" name="status" value={status} />}
        {category && <input type="hidden" name="kategorie" value={category} />}
        <input type="text" name="q" placeholder="Suche nach Titel …" defaultValue={q} style={{ marginBottom: 10 }} />
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button type="submit" className="btn-secondary">
            Suchen
          </button>
        </div>
      </form>

      <p className="empty-note" style={{ padding: "0 0 4px" }}>
        {data.total === 0 ? "0 Einträge" : `${rangeStart}–${rangeEnd} von ${data.total} Einträgen`}
      </p>

      <ReviewList kind={type} items={data.items} />

      {totalPages > 1 && (
        <div className="pagination-row">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="btn-secondary">
              ← Vorherige
            </Link>
          ) : (
            <span />
          )}
          <span>
            Seite {page} von {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={pageHref(page + 1)} className="btn-secondary">
              Nächste →
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
