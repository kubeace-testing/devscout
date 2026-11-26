import { describe, expect, it } from "vitest";
import { visibleCount } from "@/lib/select";
import type { Todo } from "@/lib/todos";

const mk = (id: string, text: string, completed = false): Todo =>
  ({ id, text, completed, priority: "medium", dueDate: null, createdAt: 0 }) as unknown as Todo;

const todos = [mk("1", "buy milk"), mk("2", "write report", true), mk("3", "buy bread")];

describe("visibleCount", () => {
  it("counts everything in the default view", () => {
    expect(visibleCount(todos, { filter: "all", sort: "added", query: "" })).toBe(3);
  });
  it("respects the filter", () => {
    expect(visibleCount(todos, { filter: "active", sort: "added", query: "" })).toBe(2);
  });
  it("respects the search query", () => {
    expect(visibleCount(todos, { filter: "all", sort: "added", query: "buy" })).toBe(2);
  });
  it("is zero for an empty list", () => {
    expect(visibleCount([], { filter: "all", sort: "added", query: "" })).toBe(0);
  });
});
