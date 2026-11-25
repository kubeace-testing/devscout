import { confirmReset } from "@/lib/resetConfirm";

type Props = {
  visible: boolean;
  onReset: () => void;
};

export default function ResetViewButton({ visible, onReset }: Props) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => {
        if (confirmReset()) onReset();
      }}
      className="text-sm text-blue-600 hover:underline"
    >
      Reset filters
    </button>
  );
}
