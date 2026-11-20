import { describe, expect, it } from "vitest";
import { createTodo, isOverdue, toLocalISODate } from "@/lib/todos";

describe("toLocalISODate", () => {
  it("uses the local calendar date, not UTC", () => {
    // 01:00 local on 15 June: in timezones ahead of UTC the UTC date is still the 14th.
    expect(toLocalISODate(new Date(2026, 5, 15, 1, 0))).toBe("2026-06-15");
    expect(toLocalISODate(new Date(2026, 5, 15, 23, 30))).toBe("2026-06-15");
  });
  it("zero-pads month and day", () => {
    expect(toLocalISODate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("isOverdue (local date)", () => {
  it("is not overdue on the due day, even just after midnight", () => {
    const todo = createTodo("a", "low", "2026-06-15");
    expect(isOverdue(todo, new Date(2026, 5, 15, 1, 0))).toBe(false);
  });
  it("is overdue the day after", () => {
    const todo = createTodo("a", "low", "2026-06-15");
    expect(isOverdue(todo, new Date(2026, 5, 16, 0, 5))).toBe(true);
  });
});
