import { describe, expect, it } from "vitest";
import { createTodo, rescheduleOverdue } from "@/lib/todos";

const today = new Date(2026, 10, 26);

describe("rescheduleOverdue", () => {
  it("moves overdue active todos to today", () => {
    const late = createTodo("late", "medium", "2026-11-20");
    expect(rescheduleOverdue([late], today)[0].dueDate).toBe("2026-11-26");
  });

  it("leaves future, undated and completed todos alone", () => {
    const future = createTodo("future", "medium", "2026-12-01");
    const undated = createTodo("undated");
    const doneLate = { ...createTodo("done", "medium", "2026-11-01"), completed: true };
    expect(rescheduleOverdue([future, undated, doneLate], today)).toEqual([future, undated, doneLate]);
  });

  it("does not mutate the input", () => {
    const late = createTodo("late", "medium", "2026-11-20");
    rescheduleOverdue([late], today);
    expect(late.dueDate).toBe("2026-11-20");
  });
});
