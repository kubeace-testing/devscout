import { pluralize } from "@/lib/plural";

export type Priority = "low" | "medium" | "high";

export const PRIORITIES: readonly Priority[] = ["low", "medium", "high"];

export const MAX_TODO_TEXT = 200;

export function clampText(text: string): string {
  return text.trim().slice(0, MAX_TODO_TEXT);
}

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
    text: clampText(text),
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

export function isDueToday(todo: Todo, today: Date = new Date()): boolean {
  return !todo.completed && todo.dueDate === toLocalISODate(today);
}

export function isDueSoon(todo: Todo, today: Date = new Date(), days = 2): boolean {
  if (!todo.dueDate || todo.completed || isOverdue(todo, today)) return false;
  const limit = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);
  return todo.dueDate <= toLocalISODate(limit);
}

export function daysUntilDue(todo: Todo, today: Date = new Date()): number | null {
  if (!todo.dueDate) return null;
  const [y, m, d] = todo.dueDate.split("-").map(Number);
  const due = new Date(y, m - 1, d);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((due.getTime() - start.getTime()) / 86_400_000);
}

export function dueLabel(todo: Todo, today: Date = new Date()): string {
  const days = daysUntilDue(todo, today);
  if (days === null) return "";
  if (todo.completed) return `Due ${todo.dueDate}`;
  const plural = (n: number) => pluralize(n, "day");
  if (days < 0) return `Overdue by ${plural(-days)}`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days <= 7) return `Due in ${plural(days)}`;
  return `Due ${todo.dueDate}`;
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.completed);
}

export function updateTodoText(todos: Todo[], id: string, text: string): Todo[] {
  const trimmed = clampText(text);
  if (!trimmed) return todos;
  return todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t));
}

export type Filter = "all" | "active" | "completed" | "overdue" | "today";

export const FILTERS: readonly Filter[] = ["all", "active", "completed", "overdue", "today"];

export function filterTodos(todos: Todo[], filter: Filter, today: Date = new Date()): Todo[] {
  if (filter === "today") return todos.filter((t) => isDueToday(t, today));
  if (filter === "overdue") return todos.filter((t) => isOverdue(t, today));
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

export function searchTodos(todos: Todo[], query: string): Todo[] {
  const q = query.trim().toLowerCase();
  if (!q) return todos;
  return todos.filter(
    (t) => t.text.toLowerCase().includes(q) || (t.notes?.toLowerCase().includes(q) ?? false),
  );
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
  // due: earliest first (ties by priority), todos without a date last
  return copy.sort((a, b) => {
    if (a.dueDate === b.dueDate) return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
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
  dueToday: number;
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
    dueToday: todos.filter((t) => isDueToday(t, today)).length,
    dueSoon: todos.filter((t) => isDueSoon(t, today)).length,
    percentDone: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function emptyMessage(total: number, filter: Filter, query: string): string {
  if (total === 0) return "No todos yet. Add one above.";
  if (query.trim()) return `No todos match "${query.trim()}".`;
  if (filter === "active") return "Nothing left to do. 🎉";
  if (filter === "completed") return "No completed todos yet.";
  if (filter === "overdue") return "Nothing is overdue. 👍";
  if (filter === "today") return "Nothing due today.";
  return "No todos to show.";
}

export function setAllCompleted(todos: Todo[], completed: boolean): Todo[] {
  return todos.map((t) => (t.completed === completed ? t : { ...t, completed }));
}

export function itemsLeftLabel(active: number): string {
  if (active === 0) return "All done";
  return `${pluralize(active, "item")} left`;
}

export function clearCompletedLabel(completed: number): string {
  return `Clear completed (${completed})`;
}

export function progressMessage(stats: Stats): string {
  if (stats.total === 0) return "";
  if (stats.percentDone === 100) return "All done. Nice work!";
  if (stats.percentDone >= 50) return "More than halfway there.";
  return "";
}

/** Keep active high-priority todos first, preserving relative order. */
export function pinHighPriority(todos: Todo[]): Todo[] {
  const pinned = todos.filter((t) => !t.completed && t.priority === "high");
  const rest = todos.filter((t) => t.completed || t.priority !== "high");
  return [...pinned, ...rest];
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

/** Keep active todos first and completed todos last, preserving relative order. */
export function completedLast(todos: Todo[]): Todo[] {
  return [...todos.filter((t) => !t.completed), ...todos.filter((t) => t.completed)];
}

/** Insert an active copy of a todo right after the original. Unknown id leaves the list unchanged. */
export function duplicateTodo(todos: Todo[], id: string): Todo[] {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return todos;
  const copy: Todo = { ...todos[index], id: crypto.randomUUID(), completed: false };
  return [...todos.slice(0, index + 1), copy, ...todos.slice(index + 1)];
}

/** Move the due date of every active overdue todo to today. */
export function rescheduleOverdue(todos: Todo[], today: Date = new Date()): Todo[] {
  const iso = toLocalISODate(today);
  return todos.map((t) => (isOverdue(t, today) ? { ...t, dueDate: iso } : t));
}

/** The active todo that has been overdue the longest, or null when nothing is overdue. */
export function oldestOverdue(todos: Todo[], today: Date = new Date()): Todo | null {
  const overdue = todos.filter((t) => isOverdue(t, today));
  if (overdue.length === 0) return null;
  return overdue.reduce((oldest, t) => ((t.dueDate as string) < (oldest.dueDate as string) ? t : oldest));
}
