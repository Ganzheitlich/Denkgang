export function pct<T>(items: T[], isCorrect: (item: T) => boolean): number | null {
  if (items.length === 0) return null;
  const correct = items.filter(isCorrect).length;
  return Math.round((correct / items.length) * 100);
}
