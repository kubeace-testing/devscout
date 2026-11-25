import { describe, expect, it } from "vitest";
import { BASE_TITLE, titleWithOverdue } from "@/lib/pageTitle";

describe("titleWithOverdue", () => {
  it("is the base title when nothing is overdue", () => {
    expect(titleWithOverdue(0)).toBe(BASE_TITLE);
  });

  it("prefixes the overdue count", () => {
    expect(titleWithOverdue(2)).toBe("(2) DevScout");
  });

  it("accepts a custom base", () => {
    expect(titleWithOverdue(1, "Todos")).toBe("(1) Todos");
  });
});
