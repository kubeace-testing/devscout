import { describe, expect, it } from "vitest";
import { itemsLeftLabel } from "@/lib/todos";

describe("itemsLeftLabel", () => {
  it("handles zero, one and many", () => {
    expect(itemsLeftLabel(0)).toBe("All done");
    expect(itemsLeftLabel(1)).toBe("1 item left");
    expect(itemsLeftLabel(5)).toBe("5 items left");
  });
});
