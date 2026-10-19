"use client";

import { setContentStatus } from "@/app/review/actions";
import type { ContentStatus } from "@/generated/prisma/enums";

type ContentKind = "case" | "anatomy" | "media" | "knowledge";

export function ContentStatusActions({
  kind,
  id,
  status,
  primaryClassName = "btn-primary",
  secondaryClassName = "btn-secondary",
}: {
  kind: ContentKind;
  id: string;
  status: ContentStatus;
  primaryClassName?: string;
  secondaryClassName?: string;
}) {
  if (status === "DRAFT") {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <form action={setContentStatus.bind(null, kind, id, "REVIEW")}>
          <button type="submit" className={primaryClassName}>
            Zur Review einreichen
          </button>
        </form>
        <form action={setContentStatus.bind(null, kind, id, "ARCHIVED")}>
          <button type="submit" className={secondaryClassName}>
            Archivieren
          </button>
        </form>
      </div>
    );
  }

  if (status === "REVIEW") {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <form action={setContentStatus.bind(null, kind, id, "APPROVED")}>
          <button type="submit" className={primaryClassName}>
            Freigeben
          </button>
        </form>
        <form action={setContentStatus.bind(null, kind, id, "DRAFT")}>
          <button type="submit" className={secondaryClassName}>
            Zurück auf Entwurf
          </button>
        </form>
      </div>
    );
  }

  if (status === "APPROVED") {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <form action={setContentStatus.bind(null, kind, id, "DRAFT")}>
          <button type="submit" className={secondaryClassName}>
            Zurück auf Entwurf
          </button>
        </form>
        <form action={setContentStatus.bind(null, kind, id, "ARCHIVED")}>
          <button type="submit" className={secondaryClassName}>
            Archivieren
          </button>
        </form>
      </div>
    );
  }

  return (
    <form action={setContentStatus.bind(null, kind, id, "DRAFT")}>
      <button type="submit" className={secondaryClassName}>
        Wiederherstellen (auf Entwurf)
      </button>
    </form>
  );
}
