import {
  filterTodos,
  searchTodos,
  sortTodos,
  type Filter,
  type SortKey,
  type Todo,
} from "@/lib/todos";

export type View = {
  filter: Filter;
  query: string;
  sort: SortKey;
};

/** Apply filter, then search, then sort, without mutating the input. */
export function selectVisibleTodos(todos: Todo[], view: View): Todo[] {
  return sortTodos(searchTodos(filterTodos(todos, view.filter), view.query), view.sort);
}

/** True when filter, sort and search are all at their defaults. */
export function isDefaultView(view: View): boolean {
  return view.filter === "all" && view.sort === "added" && view.query.trim() === "";
}

/** How many todos the current view shows. */
export function visibleCount(todos: Todo[], view: View): number {
  return selectVisibleTodos(todos, view).length;
}
