<!-- @file feat-daily-study-calendar.md -->
<!-- @description Daily study calendar behavior, persistence compatibility, and observed verification. -->

# feat: add daily study calendar

- **Date:** 2026-10-04
- **Scope:** study planning, learning/review/grammar evidence, analytics, and data management.

## Added

- Saved IANA time zone, study weekdays, and daily learning/review/grammar targets.
- Week/month calendar, day details, dashboard plan card, and calendar navigation without increasing the four primary mobile links.
- Read-only seven-day previews with stable-ID, partial-save handling.
- Task creation, version-checked editing/cancellation, and remainder transfer/merge. Transferring quota does not move committed evidence or change SM-2 due dates.
- Learning, direct review, and grammar completion links to study tasks. Progress counts committed, distinct evidence rather than manual checkboxes; late completion does not rewrite an overdue day as completed on time.
- Task-aware launch/resume flows and unavailable grammar revision handling.

## Task form UI

- Create/edit task forms use shadcn Dialog, Select, Input, Label, Alert, Button, and Calendar/Popover components. Existing API payloads, validation, version-conflict handling, and other dialog consumers remain unchanged.
- Date selection preserves civil dates across browser and study time zones. Opening the calendar focuses the selected day; keyboard selection and nested Escape restore focus without closing the task form prematurely.
- The nested date picker uses Radix's [modal Popover](https://www.radix-ui.com/primitives/docs/components/popover#root) so the outer Dialog's scroll lock does not block calendar wheel input. Available-height limits keep the calendar inside short viewports.

## Compatibility and data safety

- Calendar state lives in SQLite alongside existing learner data, shared by web and desktop.
- Startup recognizes supported legacy calendar constraints, rebuilds transactionally, preserves IDs/history/evidence links, and checks foreign keys before commit. Unsupported schemas or invalid existing rows fail without silently deleting or repairing data.
- Grammar databases with `study_task_id` but no `completed_lesson` receive the missing column with default zero; historical completion is not inferred.
- Backup JSON v4 includes calendar preferences/tasks and evidence links. Restore still accepts v1–v3 and warns that those backups replace current calendar data without calendar records.
- Reset progress deletes tasks and learning/review/grammar evidence but keeps study preferences. Reset all also removes preferences.
- Daily analytics and calendar grouping use the saved time zone. Changing zone does not alter civil scheduled dates or evidence/review timestamps.
- Upgrade backend, frontend, and desktop together; keep a pre-upgrade backup. Do not downgrade an updated database without restoring a compatible backup.

## Documentation

Module 09, the module index, architecture overview/schema, and related learning/review/grammar/data-management documentation were synchronized locally. `docs/` remains ignored under the repository's existing hybrid changelog convention; this tracked record captures the task's behavior and upgrade notes.

## Observed verification

- `pnpm --filter @lexora/backend test` — 503 tests passed after the persisted-schema startup fix.
- `pnpm --filter @lexora/desktop test` — 60 tests passed.
- `pnpm test` — before the final schema fix, backend 500, frontend 203, and desktop 60 tests passed. Frontend file parallelism was disabled to isolate shared i18n state.
- `pnpm build` — backend, frontend, and desktop passed after the schema fix.
- `pnpm --filter @lexora/backend test tests/routes/study.routes.test.ts tests/repositories/study.repository.test.ts tests/repositories/study-calendar.repository.test.ts tests/db/study-tables.test.ts tests/e2e/study-calendar-flow.test.ts` — 35 tests passed after the Module 09 update.
- Documentation check — 37 local links and two Markdown anchors resolved; five JSON examples validated, and 18 real Fastify inject requests passed against an in-memory database.
- Browser smoke — direct same-origin calendar route, 320/375/768/1440 viewports, mobile More navigation, task dialog semantics, Escape/focus restoration, light/dark and EN/VI surfaces observed. Two optional requests were aborted when closing a dialog; no uncaught application error observed.
- Persisted startup smoke used a database copy, never the source database: startup/reopen returned HTTP 200, preserved all 19 business tables, and passed foreign-key checks.
- Isolated staged-tree verification — `pnpm build` passed for backend, frontend, and desktop; the backend suite passed all 503 tests on that checkout.
- Staged-tree API smoke — 10 real TCP requests passed against an in-memory database, exercising preferences, calendar, stable-ID creation replay, version conflicts, reschedule, and cancellation.
- Isolated staged-tree frontend/desktop checks — `pnpm --filter @lexora/frontend test && pnpm --filter @lexora/desktop test` passed 199 frontend tests and 60 desktop tests. The lower frontend count excludes unrelated working-tree tests and incidental assertions removed from the calendar navigation test file.
- Task form UI checks — `pnpm --filter @lexora/frontend build` passed TypeScript and production compilation; `pnpm --filter @lexora/frontend test` passed 196 tests across 25 files.
- Task form browser smoke — real Vite/Fastify backed only by in-memory SQLite exercised learning/context, review, and grammar creation; editing, cancellation, retained input after a version conflict, and invalid target/missing-context rejection. Verified 320/375/768/1440px layouts, EN/VI, light/dark, civil dates in America/Los_Angeles and Asia/Tokyo, keyboard focus/selection, nested Escape, and native wheel scrolling in a 768×375 viewport. Optional context/course fetches were cancelled when closing forms; no uncaught application error observed.
- Verification limit — the real Electron IPC harness was skipped because `chrome-sandbox` is not root-owned with mode 4755; no claim of real Electron IPC verification.
