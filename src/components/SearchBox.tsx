import type { Ref } from "react";

type Props = {
  value: string;
  onChange: (next: string) => void;
  inputRef?: Ref<HTMLInputElement>;
};

export default function SearchBox({ value, onChange, inputRef }: Props) {
  return (
    <input
      ref={inputRef}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search todos and notes… (press / to focus)"
      aria-label="Search todos"
      className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-blue-500"
    />
  );
}
