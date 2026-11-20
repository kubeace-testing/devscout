import { describe, expect, it } from "vitest";
import { selectVisibleTodos } from "@/lib/select";
import { createTodo } from "@/lib/todos";

const a = createTodo("Write report", "low");
const b = { ...createTodo("Buy milk", "high"), completed: true };
const c = createTodo("Book flights", "high");
const all = [a, b, c];

describe("selectVisibleTodos", () => {
  it("returns everything for the default view", () => {
    expect(selectVisibleTodos(all, { filter: "all", query: "", sort: "added" })).toEqual(all);
  });

  it("applies filter then search", () => {
    const out = selectVisibleTodos(all, { filter: "active", query: "bo", sort: "added" });
    expect(out.map((t) => t.text)).toEqual(["Book flights"]);
  });

  it("applies sort last", () => {
    const out = selectVisibleTodos(all, { filter: "all", query: "", sort: "priority" });
    expect(out.map((t) => t.priority)).toEqual(["high", "high", "low"]);
  });

  it("does not mutate the input array", () => {
    const copy = [...all];
    selectVisibleTodos(all, { filter: "all", query: "", sort: "alpha" });
    expect(all).toEqual(copy);
  });
});

import { isDefaultView } from "@/lib/select";

describe("isDefaultView", () => {
  it("is true only for all / added / empty query", () => {
    expect(isDefaultView({ filter: "all", sort: "added", query: "" })).toBe(true);
    expect(isDefaultView({ filter: "all", sort: "added", query: "   " })).toBe(true);
    expect(isDefaultView({ filter: "active", sort: "added", query: "" })).toBe(false);
    expect(isDefaultView({ filter: "all", sort: "alpha", query: "" })).toBe(false);
    expect(isDefaultView({ filter: "all", sort: "added", query: "milk" })).toBe(false);
  });
});
