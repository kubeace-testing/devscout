import { itemsLeftLabel } from "@/lib/todos";

type Props = {
  total: number;
  active: number;
};

/** Announces changes to screen readers via a polite live region. */
export default function ItemsLeft({ total, active }: Props) {
  return (
    <p aria-live="polite" className="text-sm opacity-70">
      {total === 0 ? "" : itemsLeftLabel(active)}
    </p>
  );
}
