import { isTodo } from "@/lib/storage";
import type { Todo } from "@/lib/todos";

export function serializeTodos(todos: Todo[]): string {
  return JSON.stringify({ version: 1, todos }, null, 2);
}

export type ParseResult =
  | { ok: true; todos: Todo[]; skipped: number }
  | { ok: false; error: string };

export function parseTodos(json: string): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, error: "File is not valid JSON." };
  }
  const list =
    Array.isArray(data) ? data : (data as { todos?: unknown } | null)?.todos;
  if (!Array.isArray(list)) {
    return { ok: false, error: "No todo list found in the file." };
  }
  const todos = list.filter(isTodo);
  return { ok: true, todos, skipped: list.length - todos.length };
}

/** Merge imported todos into existing ones; existing ids win. */
export function mergeTodos(existing: Todo[], imported: Todo[]): Todo[] {
  const ids = new Set(existing.map((t) => t.id));
  return [...existing, ...imported.filter((t) => !ids.has(t.id))];
}
