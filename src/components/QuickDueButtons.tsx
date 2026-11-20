import { addDaysISO } from "@/lib/todos";

type Props = {
  onPick: (isoDate: string) => void;
};

const OPTIONS = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "Next week", days: 7 },
] as const;

export default function QuickDueButtons({ onPick }: Props) {
  return (
    <div className="flex gap-2 text-xs" role="group" aria-label="Quick due dates">
      {OPTIONS.map((o) => (
        <button
          key={o.label}
          type="button"
          onClick={() => onPick(addDaysISO(o.days))}
          className="rounded-full border border-gray-300 px-2 py-0.5 hover:bg-gray-100"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
