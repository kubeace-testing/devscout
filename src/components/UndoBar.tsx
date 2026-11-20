type Props = {
  text: string;
  onUndo: () => void;
  onDismiss: () => void;
};

export default function UndoBar({ text, onUndo, onDismiss }: Props) {
  return (
    <div
      role="status"
      className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm"
    >
      <span className="truncate">Deleted “{text}”</span>
      <span className="flex gap-3">
        <button type="button" onClick={onUndo} className="font-medium text-blue-600 hover:underline">
          Undo
        </button>
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="opacity-60">
          ✕
        </button>
      </span>
    </div>
  );
}
