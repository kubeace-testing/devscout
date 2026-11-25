export const BASE_TITLE = "DevScout";

/** Page title with the overdue count in front, e.g. "(2) DevScout". */
export function titleWithOverdue(overdue: number, base = BASE_TITLE): string {
  return overdue > 0 ? `(${overdue}) ${base}` : base;
}
