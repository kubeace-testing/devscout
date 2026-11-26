import { describe, expect, it } from "vitest";
import { completedLast, createTodo } from "@/lib/todos";

describe("completedLast", () => {
  it("moves completed todos to the end, keeping order", () => {
    const a = { ...createTodo("a"), completed: true };
    const b = createTodo("b");
    const c = { ...createTodo("c"), completed: true };
    const d = createTodo("d");
    expect(completedLast([a, b, c, d]).map((t) => t.text)).toEqual(["b", "d", "a", "c"]);
  });

  it("returns an equal list when nothing is completed", () => {
    const list = [createTodo("a"), createTodo("b")];
    expect(completedLast(list)).toEqual(list);
  });

  it("does not mutate the input", () => {
    const list = [{ ...createTodo("a"), completed: true }, createTodo("b")];
    completedLast(list);
    expect(list.map((t) => t.text)).toEqual(["a", "b"]);
  });
});
