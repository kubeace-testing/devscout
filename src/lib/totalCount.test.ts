import { describe, expect, it } from "vitest";
import { totalCount } from "@/lib/select";
import type { Todo } from "@/lib/todos";

const mk = (id: string, completed: boolean): Todo =>
  ({ id, text: id, completed, priority: "medium", dueDate: null, createdAt: 0 }) as unknown as Todo;

describe("totalCount", () => {
  it("counts every todo", () => {
    expect(totalCount([mk("1", false), mk("2", true)])).toBe(2);
  });
  it("is zero for an empty list", () => {
    expect(totalCount([])).toBe(0);
  });
});
