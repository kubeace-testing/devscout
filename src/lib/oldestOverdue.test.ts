import { describe, expect, it } from "vitest";
import { createTodo, oldestOverdue } from "@/lib/todos";

const today = new Date(2026, 10, 26);

describe("oldestOverdue", () => {
  it("returns the todo with the earliest overdue date", () => {
    const a = createTodo("a", "medium", "2026-11-20");
    const b = createTodo("b", "medium", "2026-11-10");
    const c = createTodo("c", "medium", "2026-11-25");
    expect(oldestOverdue([a, b, c], today)?.text).toBe("b");
  });

  it("ignores completed, future and undated todos", () => {
    const done = { ...createTodo("done", "medium", "2026-01-01"), completed: true };
    const future = createTodo("future", "medium", "2026-12-30");
    const undated = createTodo("undated");
    expect(oldestOverdue([done, future, undated], today)).toBeNull();
  });

  it("returns null for an empty list", () => {
    expect(oldestOverdue([], today)).toBeNull();
  });
});
