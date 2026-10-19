import { describe, it, expect } from "vitest";
import { pct } from "./stats";

describe("pct", () => {
  it("gibt null für eine leere Liste zurück (statt 0% oder NaN)", () => {
    expect(pct([], () => true)).toBeNull();
  });

  it("rundet den Prozentsatz korrekter Items", () => {
    expect(pct([1, 1, 1, 0], (v) => v === 1)).toBe(75);
  });

  it("rundet kaufmännisch bei ungeraden Verhältnissen", () => {
    expect(pct([1, 0, 0], (v) => v === 1)).toBe(33);
    expect(pct([1, 1, 0], (v) => v === 1)).toBe(67);
  });

  it("gibt 100 zurück, wenn alle korrekt sind, und 0, wenn keine korrekt ist", () => {
    expect(pct([1, 1], (v) => v === 1)).toBe(100);
    expect(pct([0, 0], (v) => v === 1)).toBe(0);
  });
});
