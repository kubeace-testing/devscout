import { describe, expect, it } from "vitest";
import {
  clearCompleted,
  createTodo,
  isOverdue,
  toggleTodo,
  updateTodoText,
} from "@/lib/todos";

describe("createTodo", () => {
  it("trims text and applies defaults", () => {
    const t = createTodo("  buy milk ");
    expect(t).toMatchObject({
      text: "buy milk",
      completed: false,
      priority: "medium",
      dueDate: null,
    });
    expect(t.id).toBeTruthy();
  });
});

describe("toggleTodo / clearCompleted", () => {
  it("toggles only the target and does not mutate", () => {
    const a = createTodo("a");
    const b = createTodo("b");
    const input = [a, b];
    const out = toggleTodo(input, a.id);
    expect(out[0].completed).toBe(true);
    expect(out[1].completed).toBe(false);
    expect(a.completed).toBe(false);
  });

  it("removes completed todos", () => {
    const a = { ...createTodo("a"), completed: true };
    const b = createTodo("b");
    expect(clearCompleted([a, b])).toEqual([b]);
  });
});

describe("updateTodoText", () => {
  it("updates trimmed text", () => {
    const a = createTodo("a");
    expect(updateTodoText([a], a.id, "  new ")[0].text).toBe("new");
  });

  it("ignores empty text", () => {
    const a = createTodo("a");
    expect(updateTodoText([a], a.id, "   ")).toEqual([a]);
  });
});

describe("isOverdue", () => {
  const today = new Date(2026, 5, 15, 12, 0);
  it("is true for a past due date", () => {
    expect(isOverdue(createTodo("a", "low", "2026-06-14"), today)).toBe(true);
  });
  it("is false for today, future, none, or completed", () => {
    expect(isOverdue(createTodo("a", "low", "2026-06-15"), today)).toBe(false);
    expect(isOverdue(createTodo("a", "low", "2026-06-16"), today)).toBe(false);
    expect(isOverdue(createTodo("a"), today)).toBe(false);
    const done = { ...createTodo("a", "low", "2026-01-01"), completed: true };
    expect(isOverdue(done, today)).toBe(false);
  });
});

describe("deleteTodo", () => {
  it("removes only the target todo", async () => {
    const { deleteTodo } = await import("@/lib/todos");
    const a = createTodo("a");
    const b = createTodo("b");
    expect(deleteTodo([a, b], a.id)).toEqual([b]);
    expect(deleteTodo([a, b], "missing")).toEqual([a, b]);
  });
});

import { setAllCompleted } from "@/lib/todos";

describe("setAllCompleted", () => {
  it("marks every todo done or not done without mutating", () => {
    const a = createTodo("a");
    const b = { ...createTodo("b"), completed: true };
    const input = [a, b];
    expect(setAllCompleted(input, true).every((t) => t.completed)).toBe(true);
    expect(setAllCompleted(input, false).every((t) => !t.completed)).toBe(true);
    expect(a.completed).toBe(false);
  });
  it("keeps untouched todos by reference", () => {
    const b = { ...createTodo("b"), completed: true };
    expect(setAllCompleted([b], true)[0]).toBe(b);
  });
});
