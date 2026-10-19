import type { ContentStatus } from "@/generated/prisma/enums";

/** DRAFT/REVIEW sind "zu erledigen" (ochre), APPROVED/ARCHIVED neutral. */
export function statusTagClass(status: ContentStatus): string {
  return status === "DRAFT" || status === "REVIEW" ? "due" : "";
}
