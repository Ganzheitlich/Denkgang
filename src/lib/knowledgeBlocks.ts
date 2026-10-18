export type KnowledgeBlock =
  | { type: "text"; heading?: string; text: string }
  | { type: "list"; heading?: string; items: string[] }
  | { type: "table"; heading?: string; columns: string[]; rows: string[][] };

/**
 * Prueft, ob ein einzelner Block (Ueberschrift sowie Fließtext/Listenpunkte/
 * Tabelleninhalt je nach Typ) den gesuchten Begriff enthaelt. `needleLower`
 * muss bereits kleingeschrieben sein.
 */
export function knowledgeBlockContainsText(block: KnowledgeBlock, needleLower: string): boolean {
  if (block.heading?.toLowerCase().includes(needleLower)) return true;
  if (block.type === "text") return block.text.toLowerCase().includes(needleLower);
  if (block.type === "list") return block.items.some((item) => item.toLowerCase().includes(needleLower));
  return (
    block.columns.some((col) => col.toLowerCase().includes(needleLower)) ||
    block.rows.some((row) => row.some((cell) => cell.toLowerCase().includes(needleLower)))
  );
}

/** Prueft alle Bloecke eines Wissenseintrags auf einen Suchbegriff (Volltext statt nur Titel). */
export function knowledgeSectionsContainText(sections: KnowledgeBlock[], needleLower: string): boolean {
  return sections.some((block) => knowledgeBlockContainsText(block, needleLower));
}
