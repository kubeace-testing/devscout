"use client";

import { useState, type Ref } from "react";
import QuickDueButtons from "@/components/QuickDueButtons";
import { PRIORITIES, type Priority } from "@/lib/todos";

type Props = {
  onAdd: (text: string, priority: Priority, dueDate: string | null) => void;
  inputRef?: Ref<HTMLInputElement>;
};

export default function AddTodoForm({ onAdd, inputRef }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, dueDate || null);
    setText("");
    setDueDate("");
  }

  return (
    <div className="space-y-2">
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done? (press n)"
        aria-label="New todo"
        className="flex-1 rounded-md border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-blue-500"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        aria-label="Priority"
        className="rounded-md border border-gray-300 bg-transparent px-2 py-2"
      >
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
        className="rounded-md border border-gray-300 bg-transparent px-2 py-2"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Add
      </button>
    </form>
    <QuickDueButtons onPick={setDueDate} />
    </div>
  );
}
