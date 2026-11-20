import { describe, expect, it } from "vitest";
import { addDaysISO } from "@/lib/todos";

describe("addDaysISO", () => {
  const from = new Date(2026, 5, 15, 22, 30);
  it("returns today for 0 and tomorrow for 1", () => {
    expect(addDaysISO(0, from)).toBe("2026-06-15");
    expect(addDaysISO(1, from)).toBe("2026-06-16");
  });
  it("crosses month and year boundaries", () => {
    expect(addDaysISO(16, from)).toBe("2026-07-01");
    expect(addDaysISO(1, new Date(2026, 11, 31))).toBe("2027-01-01");
  });
});
