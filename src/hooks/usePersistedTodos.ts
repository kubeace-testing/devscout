"use client";

import { useEffect, useState } from "react";
import { loadTodos, saveTodos } from "@/lib/storage";
import type { Todo } from "@/lib/todos";

export function usePersistedTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTodos(loadTodos(window.localStorage));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveTodos(window.localStorage, todos);
  }, [todos, hydrated]);

  return [todos, setTodos] as const;
}
