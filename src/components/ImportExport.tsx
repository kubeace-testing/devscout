"use client";

import { useRef, useState } from "react";
import { toCsv } from "@/lib/csv";
import { parseTodos, serializeTodos } from "@/lib/transfer";
import type { Todo } from "@/lib/todos";

type Props = {
  todos: Todo[];
  onImport: (todos: Todo[]) => void;
};

export default function ImportExport({ todos, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function save(content: string, type: string, filename: string) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const download = () => save(serializeTodos(todos), "application/json", "todos.json");
  const downloadCsv = () => save(toCsv(todos), "text/csv", "todos.csv");

  async function handleFile(file: File) {
    const result = parseTodos(await file.text());
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    onImport(result.todos);
    setMessage(
      `Imported ${result.todos.length} todo(s)` +
        (result.skipped ? `, skipped ${result.skipped} invalid.` : "."),
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <button type="button" onClick={download} className="text-blue-600 hover:underline">
        Export JSON
      </button>
      <button type="button" onClick={downloadCsv} className="text-blue-600 hover:underline">
        Export CSV
      </button>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="text-blue-600 hover:underline"
      >
        Import
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        hidden
        aria-label="Import todos file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
      {message && (
        <span role="status" className="opacity-70">
          {message}
        </span>
      )}
    </div>
  );
}
