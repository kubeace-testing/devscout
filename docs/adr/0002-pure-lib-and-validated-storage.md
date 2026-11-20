# 0002: Keep logic in pure `src/lib` functions and validate all stored data

**Status:** accepted

## Context
State lives in the browser (`localStorage`) and can also arrive through JSON import.
Both can be stale, hand-edited or corrupt.

## Decision
- Every behaviour that is not rendering lives in `src/lib` as a pure, immutable
  function and is unit tested (coverage is measured on `src/lib` only).
- Anything read from `localStorage` or an imported file passes through `isTodo`:
  non-empty id and text, valid priority, string-or-null due date, optional string notes.
  Invalid entries are skipped and duplicate ids keep the first.
- Persistence is best-effort: storage errors are swallowed, and hooks hydrate in an
  effect to avoid server/client mismatches.

## Consequences
- Components stay thin and are easy to read; most bugs are caught by fast unit tests.
- Adding a field to `Todo` means updating `isTodo` and its tests in the same change.
