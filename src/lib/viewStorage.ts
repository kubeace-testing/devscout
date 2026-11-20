import { FILTERS, SORT_KEYS, type Filter, type SortKey } from "@/lib/todos";

export const VIEW_STORAGE_KEY = "devscout-view";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export type ViewPrefs = { filter: Filter; sort: SortKey };

export const DEFAULT_VIEW: ViewPrefs = { filter: "all", sort: "added" };

export function loadView(storage: StorageLike): ViewPrefs {
  try {
    const raw = storage.getItem(VIEW_STORAGE_KEY);
    if (!raw) return DEFAULT_VIEW;
    const v = JSON.parse(raw) as Partial<Record<keyof ViewPrefs, unknown>>;
    return {
      filter: FILTERS.includes(v.filter as Filter) ? (v.filter as Filter) : DEFAULT_VIEW.filter,
      sort: SORT_KEYS.includes(v.sort as SortKey) ? (v.sort as SortKey) : DEFAULT_VIEW.sort,
    };
  } catch {
    return DEFAULT_VIEW;
  }
}

export function saveView(storage: StorageLike, view: ViewPrefs): void {
  try {
    storage.setItem(VIEW_STORAGE_KEY, JSON.stringify(view));
  } catch {
    // Best-effort persistence.
  }
}
