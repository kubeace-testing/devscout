import { describe, expect, it } from "vitest";
import { isValidISODate } from "@/lib/dueDate";
import { createTodo } from "@/lib/todos";
import { parseTodos } from "@/lib/transfer";

describe("isValidISODate", () => {
  it("accepts real calendar dates", () => {
    expect(isValidISODate("2026-11-26")).toBe(true);
    expect(isValidISODate("2028-02-29")).toBe(true);
  });

  it("rejects impossible or malformed dates", () => {
    for (const bad of ["2026-13-45", "2027-02-29", "2026-1-5", "tomorrow", "", "2026-11-26T10:00"]) {
      expect(isValidISODate(bad)).toBe(false);
    }
  });
});

describe("parseTodos with invalid due dates", () => {
  it("drops an invalid due date but keeps the todo", () => {
    const bad = { ...createTodo("bad"), dueDate: "2026-13-45" };
    const res = parseTodos(JSON.stringify({ todos: [bad] }));
    expect(res).toMatchObject({ ok: true, skipped: 0 });
    if (res.ok) expect(res.todos[0].dueDate).toBeNull();
  });

  it("keeps a valid due date", () => {
    const good = createTodo("good", "medium", "2026-12-01");
    const res = parseTodos(JSON.stringify({ todos: [good] }));
    if (res.ok) expect(res.todos[0].dueDate).toBe("2026-12-01");
  });
});
