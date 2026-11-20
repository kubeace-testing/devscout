import { describe, expect, it } from "vitest";
import { createTodo, filterTodos, searchTodos } from "@/lib/todos";

const todos = [
  createTodo("Write report"),
  { ...createTodo("Buy milk"), completed: true },
  createTodo("Book flights"),
];

describe("filterTodos", () => {
  it("returns all, active, or completed", () => {
    expect(filterTodos(todos, "all")).toHaveLength(3);
    expect(filterTodos(todos, "active").map((t) => t.text)).toEqual([
      "Write report",
      "Book flights",
    ]);
    expect(filterTodos(todos, "completed").map((t) => t.text)).toEqual(["Buy milk"]);
  });
});

describe("searchTodos", () => {
  it("matches case-insensitively", () => {
    expect(searchTodos(todos, "BO").map((t) => t.text)).toEqual(["Book flights"]);
  });
  it("returns everything for a blank query", () => {
    expect(searchTodos(todos, "   ")).toHaveLength(3);
  });
  it("returns nothing when no match", () => {
    expect(searchTodos(todos, "zzz")).toEqual([]);
  });
});

import { sortTodos } from "@/lib/todos";

describe("sortTodos", () => {
  const a = createTodo("banana", "low", "2026-03-01");
  const b = createTodo("apple", "high");
  const c = createTodo("cherry", "medium", "2026-01-01");
  const list = [a, b, c];

  it("keeps insertion order for 'added'", () => {
    expect(sortTodos(list, "added")).toEqual(list);
  });
  it("sorts high priority first", () => {
    expect(sortTodos(list, "priority").map((t) => t.text)).toEqual(["apple", "cherry", "banana"]);
  });
  it("sorts by due date with undated last", () => {
    expect(sortTodos(list, "due").map((t) => t.text)).toEqual(["cherry", "banana", "apple"]);
  });
  it("sorts alphabetically without mutating the input", () => {
    expect(sortTodos(list, "alpha").map((t) => t.text)).toEqual(["apple", "banana", "cherry"]);
    expect(list.map((t) => t.text)).toEqual(["banana", "apple", "cherry"]);
  });
});
