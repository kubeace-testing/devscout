import TodoItem from "@/components/TodoItem";
import type { Todo } from "@/lib/todos";

type Props = {
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, emptyMessage, ...handlers }: Props) {
  if (todos.length === 0) {
    return <p className="py-6 text-center text-sm opacity-60">{emptyMessage}</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...handlers} />
      ))}
    </ul>
  );
}
