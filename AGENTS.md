# Lexora

Personal English-learning app (vocabulary and grammar) built on spaced repetition (SM-2) and 3D knowledge scoring. One learner uses it, and the learner's data is real. pnpm monorepo:

- `apps/backend`: Fastify + SQLite (Drizzle, better-sqlite3) API
- `apps/frontend`: React + Vite SPA
- `apps/desktop`: Electron shell for Linux that runs the backend

## Commands

Run from the repo root (pnpm 9, Node 22+).

- Install: `pnpm install`
- Dev: `pnpm dev` (backend on :3001 plus Vite; Vite proxies `/api` to `127.0.0.1:3001` and listens on `0.0.0.0` on purpose for LAN access)
- Fast check: `pnpm typecheck` (all workspaces, about 10 s)
- Narrow check: `pnpm test:changed [backend|frontend|desktop]` (vitest on the tests related to uncommitted source changes; seconds for a leaf file, minutes for a widely imported component)
- Full check: `pnpm verify` (builds the backend first, because desktop imports `@lexora/backend` from `dist/`; then typecheck and every test suite; about 3.5 minutes)
- No linter or formatter is configured.
- CI: `.github/workflows/ci.yml` runs `pnpm verify` on pull requests and pushes to `main`. It has not been run on GitHub yet; trigger it once with `workflow_dispatch`.
- One workspace: `pnpm --filter @lexora/<backend|frontend|desktop> test [path]` or `typecheck`
- Build: `pnpm build`. Desktop: `pnpm desktop:local` (build and launch Electron), `pnpm desktop:dist` (Linux AppImage and deb)
- `desktop:smoke`, `desktop:packaged-smoke` and `desktop:acceptance` need a built desktop artifact.

## Data safety

- The default database is the learner's real one: `~/.lexora/data/lexora.db`, shared by the web backend and the desktop app (`apps/backend/src/db/shared-database.ts`, which also imports legacy databases once). `pnpm dev`, the backend `dev` script and desktop all use it. For experiments set `DATABASE_PATH=/tmp/<name>.db` or `:memory:`. Never delete, reset or migrate it by hand.
- Tests use in-memory SQLite (`getDb(':memory:')`) and Fastify `app.inject()`. Keep it that way: no real ports, no real database.
- The AI provider key is AES-256-GCM encrypted in SQLite; its key file is `~/.lexora/security/ai-settings.key`. Never log, print or commit either one.
- Backend env: `PORT` (default 3001), `DATABASE_PATH`, `CORS_ORIGINS`. `.env` is gitignored.

## Invariants

- REST envelope: `{ success: true, data }` or `{ success: false, error: { code, message, details? } }`. Services throw `AppError` subclasses (`NotFoundError` 404 `NOT_FOUND`, validation 400 `VALIDATION_ERROR`, and so on). `AppError` is already defined in both `services/vocabulary.service.ts` and `services/context.service.ts`; reuse it, do not add a third.
- Database: `TEXT` primary keys, ISO 8601 `TEXT` timestamps, `ON DELETE CASCADE` foreign keys, `PRAGMA foreign_keys = ON` on every connection (`db/client.ts` does this), WAL for file databases, an index on every foreign key and query filter.
- SM-2 lives in `apps/backend/src/domain/spaced-repetition/sm2.ts`. Due dates are the start of a UTC day, not a rolling 24 hours.
- Layering is routes -> services -> repositories -> db, and `domain/` is pure (no I/O). Routes parse, validate (Zod) and map errors. `session`, `grammar-practice` and `analytics` routes already import repositories directly; do not add more, and move that logic into a service when you touch them.
- Every UI string exists in both `apps/frontend/src/i18n/locales/en` and `.../vi`.
- Every new source file starts with a `@file` / `@description` header comment (427 of 443 source files have one).

## Gotchas

- All four `package.json` versions (root, backend, frontend, desktop) must equal the release tag; `.github/workflows/release-desktop.yml` fails otherwise.
- `apps/frontend` `build` runs `typecheck` first; the backend `build` is plain `tsc`.
- The desktop app and the web backend share one database, so a schema change affects both. Keep migrations idempotent and test them against a copy.
- Graph tooling: `graphify-out/` is gitignored and may be stale. Use it only for navigation and read the source before relying on it. Instructions: `.agents/skills/graphify/SKILL.md`.

## Where to look

- `docs/` and `.agents/` are gitignored (local-only), so they may be missing in a fresh clone or worktree. The code is the truth.
- Current architecture: `docs/architecture/01-system-overview.md`. Per-module behavior: `docs/modules/README.md` and its pages. Open only the page for the area you change. The code is the truth; fix a doc that disagrees.
- Design specs: `docs/specs/`. Implementation plans: `docs/plans/`.
- Rules for this repo: `.agents/rules/code-change-quality-gate.md` (every change), `.agents/rules/clean-code.md`, `.agents/rules/icon-first-ui.md` (frontend actions: icon-only for familiar actions, each with an accessible name, a `title` and a 44 x 44px target).

## Working rules

- Follow existing patterns and keep edits scoped. Do not revert changes you did not make.
- Explore and plan first for multi-file or unfamiliar work. If the diff fits in one sentence, just do it.
- Add a regression test for each bug fix. Run `pnpm typecheck` after every change and the narrowest relevant test before finishing; run `pnpm verify` before reporting a shared-service, persistence or API-contract change as done.
- Final response: list the checks you ran with results, and any failure or skipped step.
- Commits: Conventional Commits, `<type>(<scope>): <summary>`, imperative, under 72 characters. Scopes in use: `web`, `desktop`, `api`, `db`, `domain`, `docs`, `deps`. Stage explicit paths, never `git add .`.
- Change records: `CHANGELOG.md` is the user-facing release history (`[Unreleased]`); detail records go in `changes-log/<YYYY-MM-DD>/<tag>-<slug>.md` as described in `changes-log/README.md`.
