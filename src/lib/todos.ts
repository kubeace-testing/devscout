export type Priority = "low" | "medium" | "high";

export const PRIORITIES: readonly Priority[] = ["low", "medium", "high"];

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null; // ISO date (YYYY-MM-DD)
  notes?: string;
};

export function createTodo(
  text: string,
  priority: Priority = "medium",
  dueDate: string | null = null,
  notes = "",
): Todo {
  const trimmedNotes = notes.trim();
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    priority,
    dueDate,
    ...(trimmedNotes ? { notes: trimmedNotes } : {}),
  };
}

export function toLocalISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isOverdue(todo: Todo, today: Date = new Date()): boolean {
  if (!todo.dueDate || todo.completed) return false;
  return todo.dueDate < toLocalISODate(today);
}

export function isDueSoon(todo: Todo, today: Date = new Date(), days = 2): boolean {
  if (!todo.dueDate || todo.completed || isOverdue(todo, today)) return false;
  const limit = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);
  return todo.dueDate <= toLocalISODate(limit);
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.completed);
}

export function updateTodoText(todos: Todo[], id: string, text: string): Todo[] {
  const trimmed = text.trim();
  if (!trimmed) return todos;
  return todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t));
}

export type Filter = "all" | "active" | "completed";

export const FILTERS: readonly Filter[] = ["all", "active", "completed"];

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

export function searchTodos(todos: Todo[], query: string): Todo[] {
  const q = query.trim().toLowerCase();
  if (!q) return todos;
  return todos.filter((t) => t.text.toLowerCase().includes(q));
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((t) => t.id !== id);
}

export type SortKey = "added" | "priority" | "due" | "alpha";

export const SORT_KEYS: readonly SortKey[] = ["added", "priority", "due", "alpha"];

const PRIORITY_RANK: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function sortTodos(todos: Todo[], key: SortKey): Todo[] {
  if (key === "added") return todos;
  const copy = [...todos];
  if (key === "priority") {
    return copy.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
  }
  if (key === "alpha") {
    return copy.sort((a, b) => a.text.localeCompare(b.text));
  }
  // due: earliest first, todos without a date last
  return copy.sort((a, b) => {
    if (a.dueDate === b.dueDate) return 0;
    if (a.dueDate === null) return 1;
    if (b.dueDate === null) return -1;
    return a.dueDate < b.dueDate ? -1 : 1;
  });
}

export type Stats = {
  total: number;
  completed: number;
  active: number;
  overdue: number;
  dueSoon: number;
  percentDone: number;
};

export function getStats(todos: Todo[], today: Date = new Date()): Stats {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  return {
    total,
    completed,
    active: total - completed,
    overdue: todos.filter((t) => isOverdue(t, today)).length,
    dueSoon: todos.filter((t) => isDueSoon(t, today)).length,
    percentDone: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function emptyMessage(total: number, filter: Filter, query: string): string {
  if (total === 0) return "No todos yet. Add one above.";
  if (query.trim()) return `No todos match "${query.trim()}".`;
  if (filter === "active") return "Nothing left to do. 🎉";
  if (filter === "completed") return "No completed todos yet.";
  return "No todos to show.";
}

export function setAllCompleted(todos: Todo[], completed: boolean): Todo[] {
  return todos.map((t) => (t.completed === completed ? t : { ...t, completed }));
}

export function itemsLeftLabel(active: number): string {
  if (active === 0) return "All done";
  return `${active} ${active === 1 ? "item" : "items"} left`;
}

export function countByPriority(todos: Todo[]): Record<Priority, number> {
  const counts: Record<Priority, number> = { low: 0, medium: 0, high: 0 };
  for (const t of todos) {
    if (!t.completed) counts[t.priority] += 1;
  }
  return counts;
}

export function addDaysISO(days: number, from: Date = new Date()): string {
  return toLocalISODate(new Date(from.getFullYear(), from.getMonth(), from.getDate() + days));
}

export type DeletedTodo = { todo: Todo; index: number };

export function removeTodo(todos: Todo[], id: string): { todos: Todo[]; deleted: DeletedTodo | null } {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return { todos, deleted: null };
  return { todos: todos.filter((t) => t.id !== id), deleted: { todo: todos[index], index } };
}

export function restoreTodo(todos: Todo[], deleted: DeletedTodo): Todo[] {
  if (todos.some((t) => t.id === deleted.todo.id)) return todos;
  const at = Math.min(deleted.index, todos.length);
  return [...todos.slice(0, at), deleted.todo, ...todos.slice(at)];
}
