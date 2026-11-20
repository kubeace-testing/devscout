import { describe, expect, it } from "vitest";
import { clearCompletedLabel } from "@/lib/todos";

describe("clearCompletedLabel", () => {
  it("includes the count", () => {
    expect(clearCompletedLabel(3)).toBe("Clear completed (3)");
    expect(clearCompletedLabel(1)).toBe("Clear completed (1)");
  });
});
