import { describe, expect, it } from "vitest";
import { createTodo, removeTodo, restoreTodo } from "@/lib/todos";

const a = createTodo("a");
const b = createTodo("b");
const c = createTodo("c");

describe("removeTodo", () => {
  it("returns the remaining list and what was removed", () => {
    const { todos, deleted } = removeTodo([a, b, c], b.id);
    expect(todos).toEqual([a, c]);
    expect(deleted).toEqual({ todo: b, index: 1 });
  });

  it("leaves the list alone when the id is unknown", () => {
    const list = [a, b];
    const { todos, deleted } = removeTodo(list, "missing");
    expect(todos).toBe(list);
    expect(deleted).toBeNull();
  });
});

describe("restoreTodo", () => {
  it("puts the todo back at its old position", () => {
    const { todos, deleted } = removeTodo([a, b, c], b.id);
    expect(restoreTodo(todos, deleted!)).toEqual([a, b, c]);
  });

  it("clamps the position when the list shrank", () => {
    expect(restoreTodo([a], { todo: c, index: 5 })).toEqual([a, c]);
  });

  it("does not duplicate an existing todo", () => {
    expect(restoreTodo([a, b], { todo: b, index: 0 })).toEqual([a, b]);
  });
});
