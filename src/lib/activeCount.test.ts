import { describe, expect, it } from "vitest";
import { activeCount } from "@/lib/select";
import type { Todo } from "@/lib/todos";

const mk = (id: string, completed: boolean): Todo =>
  ({ id, text: id, completed, priority: "medium", dueDate: null, createdAt: 0 }) as unknown as Todo;

describe("activeCount", () => {
  it("counts only todos that are not completed", () => {
    expect(activeCount([mk("1", false), mk("2", true), mk("3", false)])).toBe(2);
  });
  it("is zero when all are done", () => {
    expect(activeCount([mk("1", true)])).toBe(0);
  });
  it("is zero for an empty list", () => {
    expect(activeCount([])).toBe(0);
  });
});
