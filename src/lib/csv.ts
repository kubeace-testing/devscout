import type { Todo } from "@/lib/todos";

function escapeCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function toCsv(todos: Todo[]): string {
  const header = ["text", "completed", "priority", "dueDate"];
  const rows = todos.map((t) =>
    [escapeCell(t.text), String(t.completed), t.priority, t.dueDate ?? ""].join(","),
  );
  return [header.join(","), ...rows].join("\n");
}
