"use client";

import { useState } from "react";

type Props = {
  value: string;
  onSave: (next: string) => void;
  className?: string;
};

export default function EditableText({ value, onSave, className }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    if (draft.trim() && draft.trim() !== value) onSave(draft);
    else setDraft(value);
  }

  if (!editing) {
    return (
      <span
        className={className}
        onDoubleClick={() => {
          setDraft(value);
          setEditing(true);
        }}
        title="Double-click to edit"
      >
        {value}
      </span>
    );
  }

  return (
    <input
      autoFocus
      value={draft}
      aria-label="Edit todo"
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
      }}
      className="flex-1 rounded border border-blue-500 bg-transparent px-1 outline-none"
    />
  );
}
