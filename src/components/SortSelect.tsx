import { SORT_KEYS, type SortKey } from "@/lib/todos";

const LABELS: Record<SortKey, string> = {
  added: "Date added",
  priority: "Priority",
  due: "Due date",
  alpha: "A–Z",
};

type Props = {
  value: SortKey;
  onChange: (next: SortKey) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm">
      Sort by
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="rounded-md border border-gray-300 bg-transparent px-2 py-1"
      >
        {SORT_KEYS.map((k) => (
          <option key={k} value={k}>
            {LABELS[k]}
          </option>
        ))}
      </select>
    </label>
  );
}
