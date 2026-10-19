import { describe, it, expect } from "vitest";
import { computeNextReviewDate, formatDueLabel } from "./spacing";

describe("computeNextReviewDate", () => {
  const from = new Date("2026-01-01T00:00:00Z");

  it("schedules a wrong answer for the next day regardless of difficulty/confidence", () => {
    const due = computeNextReviewDate(false, 90, "leicht", from);
    expect(due.getTime() - from.getTime()).toBe(24 * 60 * 60 * 1000);
  });

  it("schedules a hard case 4 days out even with high confidence", () => {
    const due = computeNextReviewDate(true, 90, "schwer", from);
    expect(due.getTime() - from.getTime()).toBe(4 * 24 * 60 * 60 * 1000);
  });

  it("schedules a correct-but-low-confidence answer 4 days out", () => {
    const due = computeNextReviewDate(true, 40, "leicht", from);
    expect(due.getTime() - from.getTime()).toBe(4 * 24 * 60 * 60 * 1000);
  });

  it("schedules a medium-difficulty case 7 days out", () => {
    const due = computeNextReviewDate(true, 80, "mittel", from);
    expect(due.getTime() - from.getTime()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it("schedules an easy, high-confidence correct answer 14 days out", () => {
    const due = computeNextReviewDate(true, 70, "leicht", from);
    expect(due.getTime() - from.getTime()).toBe(14 * 24 * 60 * 60 * 1000);
  });

  it("falls back to 7 days for easy but middling confidence (50-69)", () => {
    const due = computeNextReviewDate(true, 55, "leicht", from);
    expect(due.getTime() - from.getTime()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it("treats confidence 50 as not low (boundary)", () => {
    const due = computeNextReviewDate(true, 50, "mittel", from);
    expect(due.getTime() - from.getTime()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it("treats confidence 70 as high enough for the 14-day leicht bonus (boundary)", () => {
    const due = computeNextReviewDate(true, 70, "leicht", from);
    expect(due.getTime() - from.getTime()).toBe(14 * 24 * 60 * 60 * 1000);
  });
});

describe("formatDueLabel", () => {
  const now = new Date("2026-01-01T00:00:00Z");

  it("labels a past or current due date as fällig", () => {
    expect(formatDueLabel(new Date("2025-12-31T00:00:00Z"), now)).toBe("fällig");
    expect(formatDueLabel(now, now)).toBe("fällig");
  });

  it("labels tomorrow as fällig morgen", () => {
    expect(formatDueLabel(new Date("2026-01-02T00:00:00Z"), now)).toBe("fällig morgen");
  });

  it("labels further-out dates with the day count", () => {
    expect(formatDueLabel(new Date("2026-01-08T00:00:00Z"), now)).toBe("fällig in 7 Tagen");
  });
});
