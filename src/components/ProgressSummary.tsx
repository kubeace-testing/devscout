import type { Stats } from "@/lib/todos";

export default function ProgressSummary({ stats }: { stats: Stats }) {
  if (stats.total === 0) return null;

  return (
    <section aria-label="Progress" className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>
          {stats.completed} of {stats.total} done
        </span>
        {stats.dueSoon > 0 && (
          <span className="font-medium text-amber-600">{stats.dueSoon} due soon</span>
        )}
        {stats.overdue > 0 && (
          <span className="font-medium text-red-600">{stats.overdue} overdue</span>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={stats.percentDone}
        className="h-2 overflow-hidden rounded-full bg-gray-200"
      >
        <div className="h-full bg-green-500" style={{ width: `${stats.percentDone}%` }} />
      </div>
    </section>
  );
}
