export type KnowledgeBlock =
  | { type: "text"; heading?: string; text: string }
  | { type: "list"; heading?: string; items: string[] }
  | { type: "table"; heading?: string; columns: string[]; rows: string[][] };
