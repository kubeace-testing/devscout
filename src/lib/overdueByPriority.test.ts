import { describe, expect, it } from "vitest";
import { createTodo, overdueByPriority } from "@/lib/todos";

const today = new Date(2026, 10, 26);

describe("overdueByPriority", () => {
  it("counts active overdue todos per priority", () => {
    const list = [
      createTodo("a", "high", "2026-11-01"),
      createTodo("b", "high", "2026-11-10"),
      createTodo("c", "low", "2026-11-20"),
      createTodo("d", "medium", "2026-12-20"),
    ];
    expect(overdueByPriority(list, today)).toEqual({ low: 1, medium: 0, high: 2 });
  });

  it("ignores completed todos", () => {
    const done = { ...createTodo("done", "high", "2026-11-01"), completed: true };
    expect(overdueByPriority([done], today)).toEqual({ low: 0, medium: 0, high: 0 });
  });
});
