# Contributing

## Setup

```bash
nvm use        # Node 22, see .nvmrc
npm install
npm run dev
```

## Before opening a PR

```bash
npm run lint
npm run typecheck
npm test
```

## Workflow

1. Branch from `main`: `feat/<n>-<slug>`, `fix/<n>-<slug>` or `docs/<n>-<slug>`.
2. Make small, focused commits using conventional prefixes
   (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `ci`).
3. Add or update tests for any change in `src/lib`.
4. Open a PR using the template and merge once checks pass.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the code is organised.
