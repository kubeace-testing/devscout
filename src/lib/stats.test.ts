import { describe, expect, it } from "vitest";
import { createTodo, getStats } from "@/lib/todos";

describe("getStats", () => {
  const today = new Date(2026, 5, 15, 12, 0);

  it("handles an empty list", () => {
    expect(getStats([], today)).toEqual({
      total: 0,
      completed: 0,
      active: 0,
      overdue: 0,
      dueToday: 0,
      dueSoon: 0,
      percentDone: 0,
    });
  });

  it("counts completed, active, overdue and percent", () => {
    const todos = [
      { ...createTodo("a"), completed: true },
      createTodo("b", "low", "2026-06-01"),
      createTodo("c"),
      createTodo("d"),
    ];
    expect(getStats(todos, today)).toEqual({
      total: 4,
      completed: 1,
      active: 3,
      overdue: 1,
      dueToday: 0,
      dueSoon: 0,
      percentDone: 25,
    });
  });
});

import { emptyMessage } from "@/lib/todos";

describe("emptyMessage", () => {
  it("explains each empty state", () => {
    expect(emptyMessage(0, "all", "")).toMatch(/Add one/);
    expect(emptyMessage(3, "all", " milk ")).toBe('No todos match "milk".');
    expect(emptyMessage(3, "active", "")).toMatch(/Nothing left/);
    expect(emptyMessage(3, "completed", "")).toMatch(/No completed/);
  });
});

describe("emptyMessage overdue", () => {
  it("has a message for the overdue filter", () => {
    expect(emptyMessage(3, "overdue", "")).toMatch(/Nothing is overdue/);
  });
});

describe("getStats dueToday", () => {
  const today = new Date(2026, 5, 15, 12, 0);

  it("counts only active todos due today", () => {
    const todos = [
      createTodo("a", "low", "2026-06-15"),
      { ...createTodo("b", "low", "2026-06-15"), completed: true },
      createTodo("c", "low", "2026-06-16"),
    ];
    expect(getStats(todos, today).dueToday).toBe(1);
  });
});
