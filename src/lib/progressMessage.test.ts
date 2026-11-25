import { describe, expect, it } from "vitest";
import { createTodo, getStats, progressMessage } from "@/lib/todos";

describe("progressMessage", () => {
  it("is empty for an empty list", () => {
    expect(progressMessage(getStats([]))).toBe("");
  });

  it("celebrates when everything is done", () => {
    const todos = [{ ...createTodo("a"), completed: true }];
    expect(progressMessage(getStats(todos))).toBe("All done. Nice work!");
  });

  it("encourages past the halfway mark", () => {
    const todos = [
      { ...createTodo("a"), completed: true },
      { ...createTodo("b"), completed: true },
      createTodo("c"),
    ];
    expect(progressMessage(getStats(todos))).toBe("More than halfway there.");
  });

  it("says nothing below half", () => {
    const todos = [{ ...createTodo("a"), completed: true }, createTodo("b"), createTodo("c")];
    expect(progressMessage(getStats(todos))).toBe("");
  });
});
