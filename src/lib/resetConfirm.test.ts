import { describe, expect, it, vi } from "vitest";
import { RESET_CONFIRM_MESSAGE, confirmReset } from "@/lib/resetConfirm";

describe("confirmReset", () => {
  it("asks with the standard message", () => {
    const ask = vi.fn(() => true);
    expect(confirmReset(ask)).toBe(true);
    expect(ask).toHaveBeenCalledWith(RESET_CONFIRM_MESSAGE);
  });

  it("returns false when the user cancels", () => {
    expect(confirmReset(() => false)).toBe(false);
  });
});
