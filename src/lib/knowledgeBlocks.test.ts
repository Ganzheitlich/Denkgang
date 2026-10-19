import { describe, it, expect } from "vitest";
import { knowledgeBlockContainsText, knowledgeSectionsContainText, type KnowledgeBlock } from "./knowledgeBlocks";

describe("knowledgeBlockContainsText", () => {
  it("findet den Begriff in der Überschrift eines Blocks, unabhängig vom Typ", () => {
    const block: KnowledgeBlock = { type: "text", heading: "Quadrizeps-Atrophie", text: "egal" };
    expect(knowledgeBlockContainsText(block, "quadrizeps")).toBe(true);
  });

  it("findet den Begriff im Fließtext", () => {
    const block: KnowledgeBlock = { type: "text", text: "Die Atrophie betrifft den M. quadriceps femoris." };
    expect(knowledgeBlockContainsText(block, "quadriceps")).toBe(true);
  });

  it("findet den Begriff nicht, wenn er nirgends vorkommt", () => {
    const block: KnowledgeBlock = { type: "text", text: "Völlig unrelatierter Inhalt." };
    expect(knowledgeBlockContainsText(block, "quadriceps")).toBe(false);
  });

  it("durchsucht Listenpunkte", () => {
    const block: KnowledgeBlock = { type: "list", items: ["Erster Punkt", "Zweiter Punkt mit Quadrizeps"] };
    expect(knowledgeBlockContainsText(block, "quadrizeps")).toBe(true);
  });

  it("durchsucht Tabellenspalten und -zellen", () => {
    const block: KnowledgeBlock = {
      type: "table",
      columns: ["Struktur", "Funktion"],
      rows: [["M. quadriceps femoris", "Kniestreckung"]],
    };
    expect(knowledgeBlockContainsText(block, "kniestreckung")).toBe(true);
    expect(knowledgeBlockContainsText(block, "struktur")).toBe(true);
    expect(knowledgeBlockContainsText(block, "nicht vorhanden")).toBe(false);
  });

  it("ist case-insensitiv nur, wenn needleLower bereits kleingeschrieben ist (Konvention)", () => {
    const block: KnowledgeBlock = { type: "text", text: "Quadrizeps" };
    expect(knowledgeBlockContainsText(block, "quadrizeps")).toBe(true);
  });
});

describe("knowledgeSectionsContainText", () => {
  it("findet einen Treffer, der nur in einem von mehreren Blöcken steckt", () => {
    const sections: KnowledgeBlock[] = [
      { type: "text", text: "Erster Abschnitt, nichts Besonderes." },
      { type: "list", items: ["Punkt A", "Punkt mit Quadrizeps-Atrophie"] },
      { type: "text", text: "Dritter Abschnitt." },
    ];
    expect(knowledgeSectionsContainText(sections, "quadrizeps")).toBe(true);
  });

  it("gibt false zurück, wenn kein Block den Begriff enthält", () => {
    const sections: KnowledgeBlock[] = [
      { type: "text", text: "Nichts davon." },
      { type: "list", items: ["Auch nicht hier"] },
    ];
    expect(knowledgeSectionsContainText(sections, "quadrizeps")).toBe(false);
  });

  it("gibt false für eine leere Sections-Liste zurück", () => {
    expect(knowledgeSectionsContainText([], "irgendwas")).toBe(false);
  });
});
