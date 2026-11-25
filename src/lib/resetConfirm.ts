export const RESET_CONFIRM_MESSAGE = "Reset filters, search and sort to their defaults?";

/** Ask before resetting the view. `confirmFn` defaults to window.confirm. */
export function confirmReset(
  confirmFn: (message: string) => boolean = (m) => window.confirm(m),
): boolean {
  return confirmFn(RESET_CONFIRM_MESSAGE);
}
