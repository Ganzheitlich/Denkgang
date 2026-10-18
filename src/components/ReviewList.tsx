"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { bulkSetContentStatus, setContentStatus } from "@/app/review/actions";

export type ReviewItem = {
  id: string;
  title: string;
  href?: string;
  meta?: string;
  detail?: string;
  status: "DRAFT" | "REVIEW" | "APPROVED";
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

  function bulkApply(status: "DRAFT" | "APPROVED") {
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
                <span className={`tag ${item.status === "APPROVED" ? "" : "due"}`}>{item.status}</span>
              </div>
              <form
                action={setContentStatus.bind(
                  null,
                  kind,
                  item.id,
                  item.status === "APPROVED" ? "DRAFT" : "APPROVED",
                )}
              >
                <button type="submit" className="btn-secondary review-row-btn">
                  {item.status === "APPROVED" ? "Zurück auf Entwurf" : "Freigeben"}
                </button>
              </form>
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
            <button className="btn-secondary" disabled={pending} onClick={() => bulkApply("APPROVED")}>
              Freigeben
            </button>
            <button className="btn-secondary" disabled={pending} onClick={() => bulkApply("DRAFT")}>
              Zurück auf Entwurf
            </button>
          </div>
        </div>
      )}
    </>
  );
}
