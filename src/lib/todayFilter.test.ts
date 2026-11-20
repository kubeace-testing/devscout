import { describe, expect, it } from "vitest";
import { FILTERS, createTodo, emptyMessage, filterTodos, isDueToday } from "@/lib/todos";

describe("today filter", () => {
  const today = new Date(2026, 5, 15, 12, 0);
  const due = createTodo("due", "low", "2026-06-15");
  const late = createTodo("late", "low", "2026-06-14");
  const later = createTodo("later", "low", "2026-06-16");
  const none = createTodo("none");
  const doneToday = { ...createTodo("done", "low", "2026-06-15"), completed: true };

  it("is offered as a filter", () => {
    expect(FILTERS).toContain("today");
  });

  it("matches only active todos due today", () => {
    expect(isDueToday(due, today)).toBe(true);
    expect(isDueToday(late, today)).toBe(false);
    expect(isDueToday(later, today)).toBe(false);
    expect(isDueToday(none, today)).toBe(false);
    expect(isDueToday(doneToday, today)).toBe(false);
  });

  it("filters the list", () => {
    expect(filterTodos([due, late, later, none, doneToday], "today", today)).toEqual([due]);
  });

  it("has an empty message", () => {
    expect(emptyMessage(3, "today", "")).toBe("Nothing due today.");
  });
});
