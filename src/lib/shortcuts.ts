export type Shortcut = { key: string; description: string };

export const SHORTCUTS: readonly Shortcut[] = [
  { key: "n", description: "Focus the new todo field" },
  { key: "/", description: "Focus search" },
];

export function shortcutLabel(s: Shortcut): string {
  return `${s.key}: ${s.description}`;
}
