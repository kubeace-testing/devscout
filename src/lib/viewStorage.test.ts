import { describe, expect, it } from "vitest";
import { DEFAULT_VIEW, VIEW_STORAGE_KEY, loadView, saveView } from "@/lib/viewStorage";

function fake(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
  };
}

describe("view storage", () => {
  it("round-trips a view", () => {
    const s = fake();
    saveView(s, { filter: "active", sort: "priority" });
    expect(loadView(s)).toEqual({ filter: "active", sort: "priority" });
  });

  it("falls back to defaults for missing or corrupt data", () => {
    expect(loadView(fake())).toEqual(DEFAULT_VIEW);
    expect(loadView(fake({ [VIEW_STORAGE_KEY]: "{nope" }))).toEqual(DEFAULT_VIEW);
  });

  it("replaces only the invalid fields", () => {
    const s = fake({ [VIEW_STORAGE_KEY]: JSON.stringify({ filter: "bogus", sort: "due" }) });
    expect(loadView(s)).toEqual({ filter: "all", sort: "due" });
  });

  it("does not throw when setItem fails", () => {
    const s = { getItem: () => null, setItem: () => { throw new Error("quota"); } };
    expect(() => saveView(s, DEFAULT_VIEW)).not.toThrow();
  });
});
