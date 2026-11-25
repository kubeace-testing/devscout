import { describe, expect, it } from "vitest";
import { createTodo, pinHighPriority } from "@/lib/todos";

describe("pinHighPriority", () => {
  it("moves active high-priority todos to the front, keeping order", () => {
    const a = createTodo("a", "low");
    const b = createTodo("b", "high");
    const c = createTodo("c", "medium");
    const d = createTodo("d", "high");
    expect(pinHighPriority([a, b, c, d]).map((t) => t.text)).toEqual(["b", "d", "a", "c"]);
  });

  it("does not pin completed high-priority todos", () => {
    const done = { ...createTodo("done", "high"), completed: true };
    const low = createTodo("low", "low");
    expect(pinHighPriority([low, done]).map((t) => t.text)).toEqual(["low", "done"]);
  });

  it("does not mutate the input", () => {
    const list = [createTodo("a", "low"), createTodo("b", "high")];
    pinHighPriority(list);
    expect(list.map((t) => t.text)).toEqual(["a", "b"]);
  });
});
