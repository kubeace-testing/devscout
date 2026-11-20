import { describe, expect, it } from "vitest";
import { mergeTodos, parseTodos, serializeTodos } from "@/lib/transfer";
import { createTodo } from "@/lib/todos";

describe("serialize / parse", () => {
  it("round-trips todos", () => {
    const todos = [createTodo("a", "high", "2026-01-01"), createTodo("b")];
    const res = parseTodos(serializeTodos(todos));
    expect(res).toEqual({ ok: true, todos, skipped: 0 });
  });

  it("accepts a bare array", () => {
    const todos = [createTodo("a")];
    expect(parseTodos(JSON.stringify(todos))).toMatchObject({ ok: true, todos });
  });

  it("counts skipped invalid entries", () => {
    const good = createTodo("a");
    const res = parseTodos(JSON.stringify({ todos: [good, { nope: 1 }] }));
    expect(res).toEqual({ ok: true, todos: [good], skipped: 1 });
  });

  it("reports errors for bad input", () => {
    expect(parseTodos("{oops")).toEqual({ ok: false, error: "File is not valid JSON." });
    expect(parseTodos('{"a":1}')).toMatchObject({ ok: false });
    expect(parseTodos("null")).toMatchObject({ ok: false });
  });
});

describe("mergeTodos", () => {
  it("adds new ids and keeps existing ones", () => {
    const a = createTodo("a");
    const b = createTodo("b");
    const a2 = { ...a, text: "changed" };
    expect(mergeTodos([a], [a2, b])).toEqual([a, b]);
  });
});

describe("parseTodos duplicates and blanks", () => {
  it("keeps the first of duplicate ids and skips blank todos", () => {
    const a = createTodo("a");
    const dup = { ...a, text: "dup" };
    const blank = { ...createTodo("x"), text: "  " };
    const res = parseTodos(JSON.stringify([a, dup, blank]));
    expect(res).toEqual({ ok: true, todos: [a], skipped: 2 });
  });
});
