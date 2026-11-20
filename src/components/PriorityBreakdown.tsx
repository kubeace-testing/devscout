import PriorityBadge from "@/components/PriorityBadge";
import { PRIORITIES, type Priority } from "@/lib/todos";

type Props = {
  counts: Record<Priority, number>;
};

export default function PriorityBreakdown({ counts }: Props) {
  const total = PRIORITIES.reduce((sum, p) => sum + counts[p], 0);
  if (total === 0) return null;

  return (
    <ul aria-label="Open todos by priority" className="flex gap-3 text-sm">
      {[...PRIORITIES].reverse().map((p) => (
        <li key={p} className="flex items-center gap-1">
          <PriorityBadge priority={p} />
          <span>{counts[p]}</span>
        </li>
      ))}
    </ul>
  );
}
