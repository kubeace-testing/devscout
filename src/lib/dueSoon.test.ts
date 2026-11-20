import { describe, expect, it } from "vitest";
import { createTodo, isDueSoon } from "@/lib/todos";

const today = new Date(2026, 5, 15, 9, 0);

describe("isDueSoon", () => {
  it("is true for today and the next two days", () => {
    expect(isDueSoon(createTodo("a", "low", "2026-06-15"), today)).toBe(true);
    expect(isDueSoon(createTodo("a", "low", "2026-06-17"), today)).toBe(true);
  });
  it("is false beyond the window", () => {
    expect(isDueSoon(createTodo("a", "low", "2026-06-18"), today)).toBe(false);
  });
  it("is false when overdue, completed, or undated", () => {
    expect(isDueSoon(createTodo("a", "low", "2026-06-14"), today)).toBe(false);
    expect(isDueSoon({ ...createTodo("a", "low", "2026-06-15"), completed: true }, today)).toBe(false);
    expect(isDueSoon(createTodo("a"), today)).toBe(false);
  });
  it("respects a custom window", () => {
    expect(isDueSoon(createTodo("a", "low", "2026-06-20"), today, 5)).toBe(true);
  });
  it("handles month boundaries", () => {
    const eom = new Date(2026, 5, 30, 9, 0);
    expect(isDueSoon(createTodo("a", "low", "2026-07-02"), eom)).toBe(true);
  });
});
