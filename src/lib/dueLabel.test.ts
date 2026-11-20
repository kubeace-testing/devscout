import { describe, expect, it } from "vitest";
import { createTodo, daysUntilDue, dueLabel } from "@/lib/todos";

describe("dueLabel", () => {
  const today = new Date(2026, 5, 15, 23, 30);
  const due = (iso: string | null) => createTodo("t", "low", iso);

  it("returns null days / empty label without a due date", () => {
    expect(daysUntilDue(due(null), today)).toBeNull();
    expect(dueLabel(due(null), today)).toBe("");
  });

  it("counts calendar days regardless of the time of day", () => {
    expect(daysUntilDue(due("2026-06-15"), today)).toBe(0);
    expect(daysUntilDue(due("2026-06-18"), today)).toBe(3);
    expect(daysUntilDue(due("2026-06-10"), today)).toBe(-5);
  });

  it("labels overdue, today, tomorrow and upcoming", () => {
    expect(dueLabel(due("2026-06-14"), today)).toBe("Overdue by 1 day");
    expect(dueLabel(due("2026-06-10"), today)).toBe("Overdue by 5 days");
    expect(dueLabel(due("2026-06-15"), today)).toBe("Due today");
    expect(dueLabel(due("2026-06-16"), today)).toBe("Due tomorrow");
    expect(dueLabel(due("2026-06-20"), today)).toBe("Due in 5 days");
  });

  it("falls back to the date when far away or already done", () => {
    expect(dueLabel(due("2026-07-30"), today)).toBe("Due 2026-07-30");
    const done = { ...due("2026-06-01"), completed: true };
    expect(dueLabel(done, today)).toBe("Due 2026-06-01");
  });
});
