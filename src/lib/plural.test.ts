import { describe, expect, it } from "vitest";
import { pluralize } from "@/lib/plural";

describe("pluralize", () => {
  it("uses the singular for exactly one", () => {
    expect(pluralize(1, "item")).toBe("1 item");
  });

  it("uses the plural otherwise, including zero", () => {
    expect(pluralize(0, "item")).toBe("0 items");
    expect(pluralize(3, "item")).toBe("3 items");
  });

  it("accepts an irregular plural", () => {
    expect(pluralize(2, "person", "people")).toBe("2 people");
  });
});
