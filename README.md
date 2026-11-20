# DevScout

A small Next.js (TypeScript + Tailwind) todo app. It also serves as a sandbox
repository for generating real pull-request activity.

## Features

- Add todos with a priority (low / medium / high) and an optional due date
- Overdue todos are highlighted
- Mark done, edit in place (double-click), clear completed
- Filter (all / active / completed) and search (press `/` to focus)
- Persisted in `localStorage`
- Export as JSON or CSV, import from JSON

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Vitest unit tests |
| `npm run build` | Production build |

## Layout

- `src/lib` — pure todo logic and storage helpers (unit tested)
- `src/components` — UI components
- `src/hooks` — `usePersistedTodos`

Requires Node 22 (see `.nvmrc`).

## More

- [Contributing](CONTRIBUTING.md)
- [Architecture](docs/ARCHITECTURE.md)
