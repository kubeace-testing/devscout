import { describe, expect, it } from "vitest";
import { toCsv } from "@/lib/csv";
import { createTodo } from "@/lib/todos";

describe("toCsv", () => {
  it("writes a header and one row per todo", () => {
    const csv = toCsv([createTodo("a", "high", "2026-01-02"), createTodo("b")]);
    expect(csv.split("\n")).toEqual([
      "text,completed,priority,dueDate",
      "a,false,high,2026-01-02",
      "b,false,medium,",
    ]);
  });

  it("quotes commas, quotes and newlines", () => {
    const csv = toCsv([createTodo('say "hi", ok')]);
    expect(csv.split("\n")[1]).toBe('"say ""hi"", ok",false,medium,');
  });

  it("returns only the header for an empty list", () => {
    expect(toCsv([])).toBe("text,completed,priority,dueDate");
  });
});
