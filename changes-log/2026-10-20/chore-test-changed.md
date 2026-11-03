# test:changed for the narrow check

The fast check only type-checks and the full check takes about 3.5 minutes. `pnpm test:changed` runs only the tests related to uncommitted source changes.

## Files changed

- `scripts/test-changed.mjs` (new): lists uncommitted and untracked source files per workspace and runs `vitest related` on them. Optional workspace names limit the run (`pnpm test:changed backend`). Only source files are passed, so a changed `package.json` or config does not trigger the whole suite (`vitest --changed` does: its default force-rerun triggers include `package.json`).
- `package.json`: `test:changed` script.
- `AGENTS.md`: documents the narrow check, removes the hard-coded test counts that would go stale, and states that no linter or formatter is configured.

## Impact

- Runtime, API, database and UI: none.
- Time depends on the change: a leaf backend file took 3 seconds; the four uncommitted frontend files in the working tree pulled in 30 test files and took about 3.5 minutes. For that reason the Stop hook keeps running only `typecheck`.

## Verification

- A temporary leaf module with a test was added and removed: the passing run exited 0, and with a failing expectation the run exited 1.
- With no changed source files the script prints that and exits 0.
