# Agent context setup and verify scripts

`AGENTS.md` described a project that no longer existed (frontend "not scaffolded", version 0.1.0, no desktop app) and ran to 381 lines. It is now a short, verified file, `CLAUDE.md` imports it for Claude Code, and the repo has one command for the checks.

## Files changed

- `AGENTS.md`: rewritten from 381 to 58 lines. Removed the directory tour, tech-stack and naming tables, stale module status, test-file listing, the "prescribed" frontend section and the copy of the quality gate (kept in `.agents/rules/`). Added the real-database warning, the shared web/desktop database, the release version rule, i18n parity and commands verified on 2026-10-20. The previous text is in git history and in `~/.agents/backups/lexora-AGENTS-before-rewrite-20261020.md`.
- `CLAUDE.md` (new): imports `@AGENTS.md` for Claude Code.
- `package.json`: `typecheck` (all workspaces) and `verify` (typecheck, then all tests).
- `apps/backend/package.json`: `typecheck` (`tsc --noEmit`).

## Impact

- Runtime, API, database and UI: none.
- Agents: Claude Code now loads `AGENTS.md` through `CLAUDE.md`. `docs/` and `.agents/` stay gitignored and local-only, and `AGENTS.md` says so.

## Verification

- `pnpm typecheck` passes in about 7 seconds (backend, frontend, desktop).
- Baseline before this change: `pnpm test` passed (backend 637, frontend 244, desktop 60 tests) in 213 seconds.
- Every repo path named in `AGENTS.md` exists. The desktop smoke and acceptance scripts were not run.
