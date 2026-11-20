# DevScout

A small Next.js (TypeScript + Tailwind) todo app. It also serves as a sandbox
repository for generating real pull-request activity.

## Features

- Todo text is limited to 200 characters
- Add todos with a priority (low / medium / high) and an optional due date
- Quick due-date shortcuts: Today / Tomorrow / Next week
- Overdue todos are highlighted
- Mark done, edit in place (double-click), clear completed
- Undo the last deleted todo
- See open todos broken down by priority
- Filter (all / active / completed / overdue) and search (press `/` to focus search, `n` for a new todo)
- Persisted in `localStorage`
- Export as JSON or CSV, import from JSON

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Vitest unit tests |
| `npm run test:watch` | Vitest in watch mode while developing |
| `npm run coverage` | Tests with a v8 coverage report for `src/lib` |
| `npm run build` | Production build |

## Layout

- `src/lib` — pure todo logic and storage helpers (unit tested)
- `src/components` — UI components
- `src/hooks` — `usePersistedTodos`

Requires Node 22 (see `.nvmrc`).

## More

- [Contributing](CONTRIBUTING.md)
- [Architecture](docs/ARCHITECTURE.md)
