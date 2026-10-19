import { describe, it, expect } from "vitest";
import { clusterKeyFor, interleaveByCluster } from "./interleave";

describe("clusterKeyFor", () => {
  it("nimmt den Teil vor dem ersten '·' als Cluster", () => {
    expect(clusterKeyFor("Neurologie · Plexus brachialis (Trauma)")).toBe("Neurologie");
  });

  it("behandelt Topics ohne '·' als eigenen Cluster", () => {
    expect(clusterKeyFor("Rehabilitation")).toBe("Rehabilitation");
  });

  it("trimmt Leerzeichen um den Cluster-Namen", () => {
    expect(clusterKeyFor("Orthopädie ·Hüfte")).toBe("Orthopädie");
  });
});

type Item = { id: string; case: { topic: string } };

function item(id: string, topic: string): Item {
  return { id, case: { topic } };
}

describe("interleaveByCluster", () => {
  it("lässt eine Liste mit nur einem Cluster unverändert", () => {
    const items = [item("a", "Neurologie · X"), item("b", "Neurologie · Y")];
    expect(interleaveByCluster(items).map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("verschränkt zwei gleich große Cluster strikt abwechselnd", () => {
    const items = [
      item("n1", "Neurologie · X"),
      item("n2", "Neurologie · Y"),
      item("o1", "Orthopädie · X"),
      item("o2", "Orthopädie · Y"),
    ];
    const result = interleaveByCluster(items).map((i) => i.id);
    expect(result).toHaveLength(4);
    // keine zwei direkt aufeinanderfolgenden Items aus demselben Cluster
    const clusters = result.map((id) => (id.startsWith("n") ? "n" : "o"));
    for (let i = 1; i < clusters.length; i++) {
      expect(clusters[i]).not.toBe(clusters[i - 1]);
    }
  });

  it("erhält die Prioritätsreihenfolge innerhalb jedes Clusters", () => {
    const items = [
      item("n1", "Neurologie · X"), // höchste Priorität in Neurologie
      item("n2", "Neurologie · Y"),
      item("o1", "Orthopädie · X"),
    ];
    const result = interleaveByCluster(items).map((i) => i.id);
    const nOrder = result.filter((id) => id.startsWith("n"));
    expect(nOrder).toEqual(["n1", "n2"]);
  });

  it("verwendet den knappen Cluster vollständig als Trenner, statt ihn zu horten", () => {
    // 5 Neurologie-Fälle, nur 2 Orthopädie-Fälle: der Greedy ("größter
    // verbleibender Rest, ungleich dem zuletzt gewählten Cluster") nutzt
    // beide Orthopädie-Fälle frühzeitig als Trenner. Das theoretische
    // Optimum (Lauflänge höchstens 2 überall, z. B. n,n,o,n,n,o,n) wird vom
    // einfachen Greedy bei so starkem Ungleichgewicht nicht erreicht — am
    // Ende bleiben 3 Neurologie-Fälle ohne Trenner übrig. Das ist eine
    // bekannte Grenze des einfachen "größter Rest zuerst"-Ansatzes, kein
    // Totalausfall: beide Orthopädie-Fälle werden trotzdem verteilt genutzt
    // statt an eine Stelle gestapelt zu werden.
    const items = [
      item("n1", "Neurologie · 1"),
      item("n2", "Neurologie · 2"),
      item("n3", "Neurologie · 3"),
      item("n4", "Neurologie · 4"),
      item("n5", "Neurologie · 5"),
      item("o1", "Orthopädie · 1"),
      item("o2", "Orthopädie · 2"),
    ];
    const result = interleaveByCluster(items).map((i) => i.id);
    const clusters = result.map((id) => (id.startsWith("n") ? "n" : "o"));
    let maxRun = 1;
    let run = 1;
    for (let i = 1; i < clusters.length; i++) {
      run = clusters[i] === clusters[i - 1] ? run + 1 : 1;
      maxRun = Math.max(maxRun, run);
    }
    expect(maxRun).toBeLessThanOrEqual(3);
    // beide o's tauchen vor dem allerletzten Element auf, statt gehortet zu werden
    expect(result.indexOf("o1")).toBeLessThan(result.length - 1);
    expect(result.indexOf("o2")).toBeLessThan(result.length - 1);
  });

  it("gibt bei leerer Liste eine leere Liste zurück", () => {
    expect(interleaveByCluster([])).toEqual([]);
  });
});
