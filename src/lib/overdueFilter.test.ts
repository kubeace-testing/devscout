import { describe, expect, it } from "vitest";
import { FILTERS, createTodo, filterTodos } from "@/lib/todos";

describe("overdue filter", () => {
  const today = new Date(2026, 5, 15, 12, 0);
  const late = createTodo("late", "low", "2026-06-01");
  const soon = createTodo("soon", "low", "2026-06-20");
  const none = createTodo("none");
  const doneLate = { ...createTodo("done", "low", "2026-05-01"), completed: true };

  it("is offered as a filter", () => {
    expect(FILTERS).toContain("overdue");
  });

  it("returns only active todos past their due date", () => {
    const out = filterTodos([late, soon, none, doneLate], "overdue", today);
    expect(out).toEqual([late]);
  });

  it("leaves the other filters unchanged", () => {
    const all = [late, soon, none, doneLate];
    expect(filterTodos(all, "all", today)).toEqual(all);
    expect(filterTodos(all, "completed", today)).toEqual([doneLate]);
  });
});
