import { describe, expect, it } from "vitest";
import { completedCount } from "@/lib/select";
import type { Todo } from "@/lib/todos";

const mk = (id: string, completed: boolean): Todo =>
  ({ id, text: id, completed, priority: "medium", dueDate: null, createdAt: 0 }) as unknown as Todo;

describe("completedCount", () => {
  it("counts matching todos", () => {
    expect(completedCount([mk("1", false), mk("2", true), mk("3", true)])).toBe(2);
  });
  it("is zero for an empty list", () => {
    expect(completedCount([])).toBe(0);
  });
});
