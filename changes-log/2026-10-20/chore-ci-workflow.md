# CI workflow for pull requests

Only the release workflow existed, so nothing ran the tests on a pull request. This adds a CI workflow that runs `pnpm verify`.

## Files changed

- `.github/workflows/ci.yml` (new): on pull requests, pushes to `main` and manual dispatch, installs with `pnpm install --frozen-lockfile` and runs `pnpm verify` (typecheck and all tests) on Node 22. Read-only token, actions pinned to commit SHAs, 25 minute timeout.
- `AGENTS.md`: one line about the workflow.

## Impact

- Runtime, API, database and UI: none.
- Pull requests now show a CI result.

## Verification

- The workflow parses as YAML, every action is pinned to a 40 character SHA, the token is read-only and no expression is interpolated into a `run` step.
- `pnpm verify` passes locally. The workflow itself has NOT been run on GitHub: the desktop tests and native modules (better-sqlite3, Electron) may behave differently on a clean runner, so trigger it once with `workflow_dispatch` and fix any difference.
