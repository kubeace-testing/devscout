import { describe, expect, it } from "vitest";
import { isTodo } from "@/lib/storage";
import { createTodo } from "@/lib/todos";

describe("todo notes", () => {
  it("stores trimmed notes and omits empty ones", () => {
    expect(createTodo("a", "low", null, "  remember  ").notes).toBe("remember");
    expect("notes" in createTodo("a", "low", null, "   ")).toBe(false);
    expect("notes" in createTodo("a")).toBe(false);
  });

  it("validates the notes field", () => {
    const t = createTodo("a");
    expect(isTodo({ ...t, notes: "ok" })).toBe(true);
    expect(isTodo({ ...t, notes: 5 })).toBe(false);
  });
});
