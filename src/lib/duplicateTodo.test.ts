import { describe, expect, it } from "vitest";
import { createTodo, duplicateTodo } from "@/lib/todos";

describe("duplicateTodo", () => {
  it("inserts an active copy right after the original with a new id", () => {
    const a = createTodo("a", "high", "2026-12-01", "note");
    const b = createTodo("b");
    const result = duplicateTodo([a, b], a.id);
    expect(result.map((t) => t.text)).toEqual(["a", "a", "b"]);
    expect(result[1].id).not.toBe(a.id);
    expect(result[1]).toMatchObject({ priority: "high", dueDate: "2026-12-01", notes: "note", completed: false });
  });

  it("makes the copy active even when the original is completed", () => {
    const done = { ...createTodo("done"), completed: true };
    expect(duplicateTodo([done], done.id)[1].completed).toBe(false);
  });

  it("returns the same list for an unknown id", () => {
    const list = [createTodo("a")];
    expect(duplicateTodo(list, "missing")).toBe(list);
  });
});
