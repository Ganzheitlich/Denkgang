/**
 * Einfacher In-Memory-Sliding-Window-Rate-Limiter pro Prozess. Reicht als
 * erste Verteidigungslinie gegen versehentliche/missbräuchliche Serien-
 * anfragen auf kostenpflichtige LLM-Routen — überlebt keinen Prozess-
 * Neustart und zählt bei mehreren Serverinstanzen nicht instanzübergreifend.
 * Für eine verteilte Produktionsumgebung mit mehreren Instanzen müsste das
 * durch einen gemeinsamen Store (z. B. Redis) ersetzt werden.
 */
const requestLog = new Map<string, number[]>();

export function isRateLimited(key: string, windowMs: number, maxRequests: number): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > maxRequests;
}
