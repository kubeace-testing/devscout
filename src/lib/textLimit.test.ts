import { describe, expect, it } from "vitest";
import { MAX_TODO_TEXT, clampText, createTodo, updateTodoText } from "@/lib/todos";

describe("todo text limit", () => {
  const long = "x".repeat(MAX_TODO_TEXT + 50);

  it("trims then clamps to the maximum length", () => {
    expect(clampText(`  ${long}  `)).toHaveLength(MAX_TODO_TEXT);
    expect(clampText("  short ")).toBe("short");
  });

  it("applies when creating a todo", () => {
    expect(createTodo(long).text).toHaveLength(MAX_TODO_TEXT);
  });

  it("applies when editing a todo", () => {
    const t = createTodo("a");
    expect(updateTodoText([t], t.id, long)[0].text).toHaveLength(MAX_TODO_TEXT);
  });

  it("still ignores blank edits", () => {
    const t = createTodo("a");
    expect(updateTodoText([t], t.id, "   ")).toEqual([t]);
  });
});
