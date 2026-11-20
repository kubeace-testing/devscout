import { FILTERS, type Filter } from "@/lib/todos";

type Props = {
  value: Filter;
  onChange: (next: Filter) => void;
};

export default function FilterBar({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Filter todos" className="flex gap-2 text-sm">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          aria-pressed={value === f}
          onClick={() => onChange(f)}
          className={`rounded-full px-3 py-1 capitalize ${
            value === f ? "bg-blue-600 text-white" : "border border-gray-300"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
