import type { AnatomyKind } from "@/generated/prisma/enums";

export const ANATOMY_KIND_LABELS: Record<AnatomyKind, string> = {
  MUSKEL: "Muskel",
  KNOCHEN: "Knochen",
  GELENK: "Gelenk",
  BAND: "Band",
  NERV: "Nerv",
  SONSTIGE: "Struktur",
};

export const ANATOMY_KINDS = Object.keys(ANATOMY_KIND_LABELS) as AnatomyKind[];

export function isAnatomyKind(value: string): value is AnatomyKind {
  return (ANATOMY_KINDS as string[]).includes(value);
}

/**
 * Die vier "Muskel-Felder" (origin/insertion/funktion/innervation) tragen je
 * nach Kind eine andere fachliche Bedeutung — z. B. ist bei einem Nerv die
 * "origin"-Spalte sein segmentaler Ursprung, nicht sein Muskelursprung.
 * Diese Labels steuern nur die Beschriftung in der UI, nicht die Datenhaltung.
 */
export type AnatomyFieldLabels = {
  origin: string;
  insertion: string;
  funktion: string;
  innervation: string;
  stepLabel: string;
};

export const ANATOMY_FIELD_LABELS: Record<AnatomyKind, AnatomyFieldLabels> = {
  MUSKEL: {
    origin: "Ursprung",
    insertion: "Ansatz",
    funktion: "Funktion",
    innervation: "Innervation",
    stepLabel: "Ursprung → Ansatz → Funktion",
  },
  KNOCHEN: {
    origin: "Lage",
    insertion: "Tastbare Landmarken",
    funktion: "Besonderheiten",
    innervation: "Periost-/Gefäßversorgung",
    stepLabel: "Lage → Landmarken → Besonderheiten",
  },
  GELENK: {
    origin: "Beteiligte Knochen",
    insertion: "Kapsel-Band-Apparat",
    funktion: "Bewegungsachsen",
    innervation: "Innervation der Gelenkkapsel",
    stepLabel: "Aufbau → Kapsel-Band-Apparat → Bewegung",
  },
  BAND: {
    origin: "Ursprung",
    insertion: "Ansatz",
    funktion: "Funktion (Stabilisierung)",
    innervation: "Sensible Versorgung",
    stepLabel: "Ursprung → Ansatz → Funktion",
  },
  NERV: {
    origin: "Ursprungssegmente",
    insertion: "Verlauf",
    funktion: "Motorische Versorgung",
    innervation: "Sensible Versorgung",
    stepLabel: "Ursprung → Verlauf → Versorgungsgebiet",
  },
  SONSTIGE: {
    origin: "Lage/Aufbau",
    insertion: "Angrenzende Strukturen",
    funktion: "Funktion",
    innervation: "Innervation",
    stepLabel: "Aufbau → Funktion",
  },
};

export function fieldLabelsFor(kind: AnatomyKind): AnatomyFieldLabels {
  return ANATOMY_FIELD_LABELS[kind] ?? ANATOMY_FIELD_LABELS.MUSKEL;
}
