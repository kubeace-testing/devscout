# 0001: Compare due dates against the local calendar date

**Status:** accepted

## Context
Due dates are stored as `YYYY-MM-DD` strings. An early version compared them with
`new Date().toISOString().slice(0, 10)`, which is the **UTC** date. In timezones ahead
of UTC (for example IST) a todo due today looked overdue early in the morning, and
behind UTC it stayed on time after local midnight.

## Decision
All due-date logic goes through `toLocalISODate` and `addDaysISO` in `src/lib/todos.ts`,
which use the local year/month/day. Functions that depend on "today" take it as a
parameter (default `new Date()`) so tests can pin it.

## Consequences
- Overdue, due-soon and quick-date buttons agree with the user's calendar.
- Tests build dates with the local `new Date(y, m, d)` constructor, never from UTC strings.
