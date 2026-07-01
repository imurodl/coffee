import { describe, it, expect } from "vitest";
import { escapeRegExp, pageSkip } from "./query";

describe("escapeRegExp", () => {
  it("escapes all RegExp metacharacters", () => {
    expect(escapeRegExp(".*+?^${}()|[]\\")).toBe(
      "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
    );
  });

  it("leaves plain text untouched", () => {
    expect(escapeRegExp("Ethiopia Yirgacheffe")).toBe("Ethiopia Yirgacheffe");
  });

  it("produces a RegExp that matches the literal input", () => {
    const raw = "a.b(c)*";
    const re = new RegExp(escapeRegExp(raw));
    expect(re.test(raw)).toBe(true);
    expect(re.test("axbxcx")).toBe(false);
  });

  it("neutralizes a catastrophic-backtracking payload", () => {
    // Without escaping, `(a+)+$` against many "a"s can hang the engine.
    const payload = "(a+)+$";
    const re = new RegExp(escapeRegExp(payload));
    expect(re.test("aaaaaaaaaa")).toBe(false);
    expect(re.test(payload)).toBe(true);
  });
});

describe("pageSkip", () => {
  it("returns 0 for the first page", () => {
    expect(pageSkip(1, 10)).toBe(0);
  });

  it("computes skip for later pages", () => {
    expect(pageSkip(3, 10)).toBe(20);
  });

  it("clamps non-positive or missing pages to page 1", () => {
    expect(pageSkip(0, 10)).toBe(0);
    expect(pageSkip(-5, 10)).toBe(0);
    expect(pageSkip(NaN, 10)).toBe(0);
  });

  it("never returns a negative skip", () => {
    expect(pageSkip(-1, -1)).toBeGreaterThanOrEqual(0);
  });
});
