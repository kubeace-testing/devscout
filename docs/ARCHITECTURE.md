# Architecture

The app is a single client-side Next.js page. All state lives in the browser.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| Domain logic | `src/lib/todos.ts` | Types and pure functions: create, toggle, edit, delete, filter, search, sort, stats, due dates |
| View selection | `src/lib/select.ts` | Compose filter → search → sort into one call |
| Persistence | `src/lib/storage.ts` | Validated load/save against any `Storage`-like object |
| Import/export | `src/lib/transfer.ts` | JSON serialise, parse and merge |
| Hooks | `src/hooks` | `usePersistedTodos`, `useHotkey` |
| UI | `src/components` | Presentational components wired together in `TodoApp` |

## Principles

- **Pure, immutable helpers.** Every function in `src/lib` returns new data and is unit tested.
- **Validate at the boundary.** Anything read from `localStorage` or an imported file passes through `isTodo`.
- **Local dates.** Due dates are `YYYY-MM-DD` strings compared against the *local* calendar date (`toLocalISODate`), never UTC.
