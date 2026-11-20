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
