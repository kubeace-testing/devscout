import { describe, expect, it } from "vitest";
import { createTodo, sortTodos } from "@/lib/todos";

describe("sortTodos due ties", () => {
  it("orders todos sharing a due date by priority, high first", () => {
    const low = createTodo("low", "low", "2026-06-20");
    const high = createTodo("high", "high", "2026-06-20");
    const mid = createTodo("mid", "medium", "2026-06-20");
    expect(sortTodos([low, high, mid], "due").map((t) => t.text)).toEqual(["high", "mid", "low"]);
  });

  it("still sorts by date before priority", () => {
    const early = createTodo("early", "low", "2026-06-10");
    const late = createTodo("late", "high", "2026-06-20");
    expect(sortTodos([late, early], "due").map((t) => t.text)).toEqual(["early", "late"]);
  });

  it("keeps undated todos last", () => {
    const none = createTodo("none", "high");
    const dated = createTodo("dated", "low", "2026-06-10");
    expect(sortTodos([none, dated], "due").map((t) => t.text)).toEqual(["dated", "none"]);
  });
});
