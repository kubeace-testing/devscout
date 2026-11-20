import { describe, expect, it } from "vitest";
import { STORAGE_KEY, loadTodos, saveTodos } from "@/lib/storage";
import { createTodo } from "@/lib/todos";

function fakeStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
  };
}

describe("storage", () => {
  it("round-trips todos", () => {
    const s = fakeStorage();
    const todos = [createTodo("a", "high", "2026-01-01")];
    saveTodos(s, todos);
    expect(loadTodos(s)).toEqual(todos);
  });

  it("returns [] for missing or corrupt data", () => {
    expect(loadTodos(fakeStorage())).toEqual([]);
    expect(loadTodos(fakeStorage({ [STORAGE_KEY]: "{not json" }))).toEqual([]);
    expect(loadTodos(fakeStorage({ [STORAGE_KEY]: '{"a":1}' }))).toEqual([]);
  });

  it("drops invalid entries", () => {
    const good = createTodo("ok");
    const s = fakeStorage({ [STORAGE_KEY]: JSON.stringify([good, { id: 1 }]) });
    expect(loadTodos(s)).toEqual([good]);
  });

  it("does not throw when setItem fails", () => {
    const s = {
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(() => saveTodos(s, [])).not.toThrow();
  });
});

describe("isTodo hardening", () => {
  it("rejects empty ids and blank text", async () => {
    const { isTodo } = await import("@/lib/storage");
    const ok = createTodo("ok");
    expect(isTodo(ok)).toBe(true);
    expect(isTodo({ ...ok, text: "   " })).toBe(false);
    expect(isTodo({ ...ok, text: "" })).toBe(false);
    expect(isTodo({ ...ok, id: "" })).toBe(false);
  });
});

describe("loadTodos duplicates", () => {
  it("ignores duplicate ids in stored data", () => {
    const a = createTodo("a");
    const s = fakeStorage({ [STORAGE_KEY]: JSON.stringify([a, { ...a, text: "dup" }]) });
    expect(loadTodos(s)).toEqual([a]);
  });
});
