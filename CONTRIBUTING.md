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

While developing, `npm run test:watch` re-runs the affected tests on every save.

## Workflow

1. Branch from `main`: `feat/<n>-<slug>`, `fix/<n>-<slug>` or `docs/<n>-<slug>`.
2. Make small, focused commits using conventional prefixes
   (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `ci`).
3. Add or update tests for any change in `src/lib`.
4. Open a PR using the template and merge once checks pass.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the code is organised.

## Helpers

Use `pluralize(count, singular, plural?)` from `src/lib/plural.ts` for count labels instead of inline ternaries.

## Tickets

Put the Jira key (for example `SCRUM-12`) in the branch name, the PR title and the description so DevGlimpse links the PR to its ticket.
