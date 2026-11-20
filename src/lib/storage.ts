import { PRIORITIES, type Todo } from "@/lib/todos";

export const STORAGE_KEY = "devglimpse-todos";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    v.id.length > 0 &&
    typeof v.text === "string" &&
    v.text.trim().length > 0 &&
    typeof v.completed === "boolean" &&
    typeof v.priority === "string" &&
    (PRIORITIES as readonly string[]).includes(v.priority) &&
    (v.dueDate === null || typeof v.dueDate === "string")
  );
}

export function loadTodos(storage: StorageLike): Todo[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((t): t is Todo => {
      if (!isTodo(t) || seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
  } catch {
    return [];
  }
}

export function saveTodos(storage: StorageLike, todos: Todo[]): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Storage may be full or unavailable (private mode); persistence is best-effort.
  }
}
