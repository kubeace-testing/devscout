type Props = {
  total: number;
  completed: number;
  onMarkAll: (completed: boolean) => void;
};

export default function BulkActions({ total, completed, onMarkAll }: Props) {
  if (total === 0) return null;
  const allDone = completed === total;

  return (
    <button
      type="button"
      onClick={() => onMarkAll(!allDone)}
      className="text-sm text-blue-600 hover:underline"
    >
      {allDone ? "Mark all as not done" : "Mark all as done"}
    </button>
  );
}
