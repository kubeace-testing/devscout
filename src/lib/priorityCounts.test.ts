import { describe, expect, it } from "vitest";
import { countByPriority, createTodo } from "@/lib/todos";

describe("countByPriority", () => {
  it("counts only active todos per priority", () => {
    const todos = [
      createTodo("a", "high"),
      createTodo("b", "high"),
      createTodo("c", "low"),
      { ...createTodo("d", "medium"), completed: true },
    ];
    expect(countByPriority(todos)).toEqual({ low: 1, medium: 0, high: 2 });
  });

  it("returns zeros for an empty list", () => {
    expect(countByPriority([])).toEqual({ low: 0, medium: 0, high: 0 });
  });
});
