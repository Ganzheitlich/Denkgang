import type { KnowledgeCategory } from "@/generated/prisma/enums";

export const KNOWLEDGE_CATEGORY_LABELS: Record<KnowledgeCategory, string> = {
  ANATOMIE: "Anatomie",
  BIOMECHANIK: "Biomechanik",
  PATHOLOGIE: "Pathologie",
  UNTERSUCHUNG: "Untersuchung",
  THERAPIE: "Therapie",
  GRUNDLAGEN: "Grundlagen",
};

export const KNOWLEDGE_CATEGORIES = Object.keys(KNOWLEDGE_CATEGORY_LABELS) as KnowledgeCategory[];

export function isKnowledgeCategory(value: string): value is KnowledgeCategory {
  return (KNOWLEDGE_CATEGORIES as string[]).includes(value);
}
