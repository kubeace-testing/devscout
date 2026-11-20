import { describe, expect, it } from "vitest";
import { createTodo, searchTodos } from "@/lib/todos";

describe("searchTodos with notes", () => {
  const a = createTodo("Buy milk", "low", null, "from the corner shop");
  const b = createTodo("Write report", "low", null, "include Q3 numbers");
  const c = createTodo("Call mom");

  it("matches text", () => {
    expect(searchTodos([a, b, c], "milk")).toEqual([a]);
  });

  it("matches notes, case-insensitively", () => {
    expect(searchTodos([a, b, c], "Q3")).toEqual([b]);
    expect(searchTodos([a, b, c], "CORNER")).toEqual([a]);
  });

  it("handles todos without notes", () => {
    expect(searchTodos([c], "shop")).toEqual([]);
  });
});
