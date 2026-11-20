"use client";

import { useCallback, useRef, useState } from "react";
import { useHotkey } from "@/hooks/useHotkey";
import { usePersistedTodos } from "@/hooks/usePersistedTodos";
import SearchBox from "@/components/SearchBox";
import PriorityBreakdown from "@/components/PriorityBreakdown";
import ItemsLeft from "@/components/ItemsLeft";
import ImportExport from "@/components/ImportExport";
import BulkActions from "@/components/BulkActions";
import ProgressSummary from "@/components/ProgressSummary";
import SortSelect from "@/components/SortSelect";
import FilterBar from "@/components/FilterBar";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import { selectVisibleTodos } from "@/lib/select";
import { mergeTodos } from "@/lib/transfer";
import {
  clearCompleted,
  countByPriority,
  createTodo,
  deleteTodo,
  emptyMessage,
  getStats,
  setAllCompleted,
  toggleTodo,
  updateTodoText,
  type Filter,
  type Priority,
  type SortKey,
  type Todo,
} from "@/lib/todos";

export default function TodoApp() {
  const [todos, setTodos] = usePersistedTodos();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("added");
  const searchRef = useRef<HTMLInputElement>(null);
  const focusSearch = useCallback(() => searchRef.current?.focus(), []);
  useHotkey("/", focusSearch);

  function addTodo(text: string, priority: Priority, dueDate: string | null) {
    setTodos((prev) => [...prev, createTodo(text, priority, dueDate)]);
  }

  function toggle(id: string) {
    setTodos((prev) => toggleTodo(prev, id));
  }

  function edit(id: string, text: string) {
    setTodos((prev) => updateTodoText(prev, id, text));
  }

  function remove(id: string) {
    setTodos((prev) => deleteTodo(prev, id));
  }

  function markAll(completed: boolean) {
    setTodos((prev) => setAllCompleted(prev, completed));
  }

  function importTodos(imported: Todo[]) {
    setTodos((prev) => mergeTodos(prev, imported));
  }

  function clearDone() {
    setTodos((prev) => clearCompleted(prev));
  }

  const stats = getStats(todos);
  const doneCount = stats.completed;
  const visible = selectVisibleTodos(todos, { filter, query, sort });

  return (
    <div className="mt-8 space-y-4">
      <AddTodoForm onAdd={addTodo} />
      <ProgressSummary stats={stats} />
      <PriorityBreakdown counts={countByPriority(todos)} />
      <SearchBox value={query} onChange={setQuery} inputRef={searchRef} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FilterBar value={filter} onChange={setFilter} />
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <TodoList todos={visible} emptyMessage={emptyMessage(todos.length, filter, query)} onToggle={toggle} onEdit={edit} onDelete={remove} />
      <ItemsLeft total={stats.total} active={stats.active} />
      <BulkActions total={stats.total} completed={stats.completed} onMarkAll={markAll} />
      {doneCount > 0 && (
        <button
          type="button"
          onClick={clearDone}
          className="text-sm text-red-600 hover:underline"
        >
          Clear completed ({doneCount})
        </button>
      )}
      <ImportExport todos={todos} onImport={importTodos} />
    </div>
  );
}
