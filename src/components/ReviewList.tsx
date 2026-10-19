"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { bulkSetContentStatus } from "@/app/review/actions";
import { ContentStatusActions } from "@/components/ContentStatusActions";
import { statusTagClass } from "@/lib/contentStatus";
import type { ContentStatus } from "@/generated/prisma/enums";

export type ReviewItem = {
  id: string;
  title: string;
  href?: string;
  meta?: string;
  detail?: string;
  status: ContentStatus;
  thumbUrl?: string | null;
};

type ContentKind = "case" | "anatomy" | "media" | "knowledge";

export function ReviewList({ kind, items }: { kind: ContentKind; items: ReviewItem[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === items.length ? new Set() : new Set(items.map((i) => i.id))));
  }

  function bulkApply(status: ContentStatus) {
    const ids = [...selected];
    if (ids.length === 0) return;
    startTransition(async () => {
      await bulkSetContentStatus(kind, ids, status);
      setSelected(new Set());
    });
  }

  const allSelected = items.length > 0 && selected.size === items.length;

  return (
    <>
      {items.length > 0 && (
        <label className="review-select-all">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} />
          Alle {items.length} auf dieser Seite auswählen
        </label>
      )}
      <div className="card step-block" style={{ padding: "4px 18px" }}>
        {items.map((item) => (
          <div className="review-row" key={item.id}>
            <input
              type="checkbox"
              checked={selected.has(item.id)}
              onChange={() => toggle(item.id)}
              className="review-row-check"
            />
            {item.thumbUrl ? (
              <div className="review-thumb-wrap">
                <Image src={item.thumbUrl} alt="" fill sizes="56px" className="review-thumb" />
              </div>
            ) : (
              <div className="review-thumb-wrap review-thumb-empty" />
            )}
            <div className="review-row-body">
              <div className="review-row-top">
                <div>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="qi-title"
                      style={{ color: "var(--petrol)", textDecoration: "underline" }}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div className="qi-title">{item.title}</div>
                  )}
                  {item.meta && <div className="qi-meta">{item.meta}</div>}
                  {item.detail && <div className="qi-meta">{item.detail}</div>}
                </div>
                <span className={`tag ${statusTagClass(item.status)}`}>{item.status}</span>
              </div>
              <ContentStatusActions
                kind={kind}
                id={item.id}
                status={item.status}
                primaryClassName="btn-secondary review-row-btn"
                secondaryClassName="btn-secondary review-row-btn"
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="empty-note" style={{ padding: "20px 0" }}>
            Keine Einträge für diese Filterauswahl.
          </div>
        )}
      </div>

      {selected.size > 0 && (
        <div className="review-bulk-bar">
          <span className="review-bulk-count">{selected.size} ausgewählt</span>
          <div className="review-bulk-actions">
            <button className="btn-secondary" disabled={pending} onClick={() => bulkApply("REVIEW")}>
              Zur Review einreichen
            </button>
            <button className="btn-secondary" disabled={pending} onClick={() => bulkApply("APPROVED")}>
              Freigeben
            </button>
            <button className="btn-secondary" disabled={pending} onClick={() => bulkApply("DRAFT")}>
              Zurück auf Entwurf
            </button>
            <button className="btn-secondary" disabled={pending} onClick={() => bulkApply("ARCHIVED")}>
              Archivieren
            </button>
          </div>
        </div>
      )}
    </>
  );
}
