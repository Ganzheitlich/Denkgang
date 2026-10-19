/**
 * Themencluster eines Falls fuer die Interleaving-Sortierung: der Teil des
 * `topic`-Felds vor dem "·" (z. B. "Neurologie" aus "Neurologie ·
 * Plexus brachialis (Trauma)"). Faelle ohne "·" im Topic bilden ihren
 * eigenen Cluster.
 */
export function clusterKeyFor(topic: string): string {
  const idx = topic.indexOf("·");
  return (idx === -1 ? topic : topic.slice(0, idx)).trim();
}

/**
 * Durchmischt eine bereits nach Prioritaet (Faelligkeit) sortierte Liste so,
 * dass zwei Faelle desselben Themenclusters moeglichst nicht direkt
 * hintereinander erscheinen (Interleaving, MASTER-PROMPT §13). Greedy: an
 * jeder Position wird aus den noch verbliebenen Clustern der mit der
 * hoechsten Prioritaet gewaehlt, der nicht dem zuletzt gewaehlten Cluster
 * entspricht; ist nur noch ein Cluster uebrig, wird dieser zwangslaeufig
 * erneut gewaehlt. Innerhalb eines Clusters bleibt die Prioritaetsreihenfolge
 * erhalten.
 */
export function interleaveByCluster<T extends { case: { topic: string } }>(items: T[]): T[] {
  const buckets = new Map<string, T[]>();
  for (const item of items) {
    const key = clusterKeyFor(item.case.topic);
    const bucket = buckets.get(key);
    if (bucket) bucket.push(item);
    else buckets.set(key, [item]);
  }

  const result: T[] = [];
  let lastKey: string | null = null;
  while (result.length < items.length) {
    // Unter den Clustern ungleich dem zuletzt gewaehlten wird der mit den
    // meisten verbleibenden Eintraegen gewaehlt (nicht einfach der erste
    // gefundene) — sonst wuerde ein zuerst erschoepfter Cluster am Ende
    // allein uebrig bleiben und dort zwangslaeufig mehrfach hintereinander
    // auftauchen, obwohl eine gleichmaessigere Durchmischung moeglich waere.
    let bestKey: string | null = null;
    let bestSize = -1;
    let sameAsLastKey: string | null = null;
    let sameAsLastSize = -1;
    for (const [key, bucket] of buckets) {
      if (bucket.length === 0) continue;
      if (key === lastKey) {
        if (bucket.length > sameAsLastSize) {
          sameAsLastSize = bucket.length;
          sameAsLastKey = key;
        }
        continue;
      }
      if (bucket.length > bestSize) {
        bestSize = bucket.length;
        bestKey = key;
      }
    }
    const pickedKey: string | null = bestKey ?? sameAsLastKey;
    if (pickedKey === null) break;
    result.push(buckets.get(pickedKey)!.shift()!);
    lastKey = pickedKey;
  }
  return result;
}
