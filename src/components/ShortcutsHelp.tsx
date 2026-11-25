import { SHORTCUTS } from "@/lib/shortcuts";

export default function ShortcutsHelp() {
  return (
    <details className="text-sm text-gray-600">
      <summary className="cursor-pointer">Keyboard shortcuts</summary>
      <ul className="mt-1 space-y-1">
        {SHORTCUTS.map((s) => (
          <li key={s.key}>
            <kbd className="rounded border border-gray-300 px-1">{s.key}</kbd> {s.description}
          </li>
        ))}
      </ul>
    </details>
  );
}
