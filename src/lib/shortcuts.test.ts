import { describe, expect, it } from "vitest";
import { SHORTCUTS, shortcutLabel } from "@/lib/shortcuts";

describe("shortcuts", () => {
  it("lists the n and / shortcuts", () => {
    expect(SHORTCUTS.map((s) => s.key)).toEqual(["n", "/"]);
  });

  it("formats a label", () => {
    expect(shortcutLabel({ key: "n", description: "Focus the new todo field" })).toBe(
      "n: Focus the new todo field",
    );
  });
});
