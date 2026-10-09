<!-- @file CHANGELOG.md -->
<!-- @description User-facing Lexora release history and upgrade notes. -->

# Changelog

## [Unreleased]

### Added
- Lexi, an original lazy-loaded procedural WebGL3D robot, opens a resizable, nonmodal chat window. Opening chat unmounts the robot and releases GPU resources; closing restores the robot.
- Context-aware, read-only multi-turn chat with persistent local SQLite conversation history, paginated archive, resume/delete controls, opt-in progress snapshots, and explicit consent before sharing an old conversation with another provider/model.
- Settings supports one OpenAI-compatible provider, multiple model names and one active model; API_KEY is AES-256-GCM encrypted in SQLite with a protected key file outside learner backups.
- Hybrid conversation memory combines a structured rolling summary, recent complete turns and relevant original excerpts with source IDs. Bounded compaction runs only when needed, at most once per send; invalid summaries fall back to honest limited-memory mode.
- `pnpm run desktop:local` builds and launches the local Electron app through the existing desktop development flow, without generating installers.
- Grammar v2: 160 internally AI-reviewed lessons, 960 bilingual examples, 1,920 controlled exercises, 640 transfer review items, and 320 original-writing prompts.
- Separate grammar spaced-review queue, immutable review/output history, self-assessment rubric, and first-attempt recognition/recall accuracy.
- Grammar catalog level/topic filters and responsive, keyboard-accessible practice for English/Vietnamese and light/dark interfaces.
- Adaptive active review checks recall before revealing answers, distinguishes exact/typo/forgotten evidence, and adds sentence practice for weak words with optional AI grading or honest self-check.
- Server-owned review attempts resume after reload, reject stale snapshots, and replay stable receipts without duplicate scheduling or study-task credit.

### Fixed
- Keep the desktop vocabulary layout within the browser or Electron viewport; only the word list and detail content scroll, with filters, pagination and actions remaining visible.
- Conversational AI accepts ordinary text replies from OpenAI-compatible providers without requiring JSON-schema response formatting; blank, reasoning-only and oversized replies remain rejected.
- Keep chat input and header visible on short mobile screens while conversation content scrolls independently.
- Remove the 3D robot's outer frame, background panel and hover fill while preserving its keyboard focus indicator.
- Desktop release smoke checks use separate AppImage/Debian profiles and in-memory databases, and report startup logs on failure. Manual package verification builds the requested immutable version tag.
- Isolate the real Electron IPC test profile and avoid a top-level readiness await that prevented Electron startup.
- Keep grammar context translations readable on the primary-subtle surface and stabilize cold lazy calendar navigation verification without replacing the real page.
- Prevent reveal-only or client-claimed correctness from inflating Recall; incorrect first recall stays Again and typos are capped at Hard.
- Keep review drafts and pending state through errors and rapid clicks; show real AI sentence feedback, applied ratings and evidence-based summaries.
- Keep review inputs, error alerts, rating controls and completion links usable on short mobile screens; compact Lexi avoids covering review actions, and small-screen summary counts remain readable.
- Empty due queues do not falsely complete calendar review targets; partial tasks retain their recorded count and offer a return to the calendar.

### Changed
- Learner backup v7 includes raw AI conversations and request outcomes, excluding summary caches and credentials. History is plaintext in SQLite/backups; progress reset retains transcripts as historical evidence, while full reset removes history.
- AI Assistant streams replies over SSE with cancellation, bounded output, validated completion, and recoverable mid-stream errors that retain drafts.
- Assistant context follows the current menu and saved collections rather than the selected word, lesson, or context. Content and progress have separate sharing controls; bounded samples disclose omitted data.
- Resize chat with pointer dragging, arrow keys, or preset sizes. Dragging uses animation-frame DOM updates and commits React state only on release. Remove the separate show/hide Lexi feature.
- Compact bilingual review workspace, stage-specific actions, keyboard boundaries and a smaller mobile Lexi launcher leave controls clear on short screens.
- Chat, study planning, and output grading share one backend AI configuration; the former grammar tutor endpoint and bottom-of-lesson form are removed.
- Saved AI settings apply immediately to assistant, planner and output grading. Configuration revisions reject stale requests; sharing saved conversation history with another provider/model requires explicit confirmation.
- Backup v6 preserves adaptive vocabulary review attempts/receipts alongside grammar output/review snapshots. Restoring v1–v5 warns before replacing adaptive evidence; v1–v4 also warn about missing grammar practice.
- Preserve 34 retired lesson IDs, historical attempts, completion dates, and calendar links. New lessons use revision-pinned v2 IDs; old lesson requests return `CURRICULUM_CHANGED` instead of silently regrading or migrating evidence.

### Upgrade notes
- Upgrade backend, frontend, and desktop together after creating a backup. Previous binaries cannot restore v7; rollback requires a compatible pre-upgrade backup on a separate database.
- Lesson completion means all controlled items were submitted, not mastery. Writing scores are self-assessed; course level labels and internal AI review are not CEFR certification.
- Review completion now requires `{requestId, attemptId, expectedVersion, rating}`; direct `wordId`/`correct` submissions are rejected. Self-check saves practice without claiming a graded Production score.
- AI configuration now uses `API_KEY`, `BASE_URL`, `AI_MODEL`, and `AI_TIMEOUT_MS` for every capability. Rename legacy `OPENAI_API_KEY`/`OPENAI_MODEL`/`OPENAI_TIMEOUT_MS` variables before restarting; no environment files are changed automatically.
- Settings overrides the complete environment AI bundle when saved. The separate `~/.lexora/security/ai-settings.key` (directory0700/file0600) is required to decrypt the database credential; it is not an OS keychain and cannot protect a fully compromised account. Loss requires explicitly replacing API_KEY. Learner backup/restore/reset excludes AI settings; delete credentials separately in Settings.

## [0.3.0] - 2026-10-04

### Added
- Daily study calendar with week/month views, study preferences, seven-day previews, and tasks linked to learning, review, and grammar evidence.
- Version-checked task edits, cancellations, and remainder transfers without changing SM-2 review due dates.

### Fixed
- Preserve study tasks, preferences, transfer history, and evidence links when upgrading legacy calendar/grammar schemas or merging shared web/desktop databases.
- Linux desktop packages now include the required LangChain core runtime dependency, fixing startup failure in the previous release build.

### Changed
- Refreshed glassmorphism surfaces and responsive layouts for mobile and tablet screens.
- Sidebar header now uses the same Lexora SVG logo as the favicon and desktop app icon, replacing the letter placeholder.
- Replaced study task create/edit form controls with shadcn UI, including a localized, keyboard-accessible date picker that remains scrollable on short screens.
- Reorganized architecture documentation into numbered `docs/architecture/01-*` files.
- Updated architecture docs to match current backend, frontend, database, desktop, grammar, backup, and brand implementations.
- Updated module documentation and added Grammar Course module documentation.
- Added detailed change records under [`changes-log/2026-10-03/`](./changes-log/2026-10-03/).
- Enabled LAN access to the web development server with same-origin API proxying; backend and desktop remain loopback-only.
- Backup JSON v4 includes study preferences, calendar tasks, and evidence links; older backups warn before replacing calendar data. Reset progress removes tasks but retains study preferences.
- Calendar and daily statistics use the saved IANA time zone. Added Module 09 documentation and a detailed [daily study calendar change record](./changes-log/2026-10-04/feat-daily-study-calendar.md).

### Security
- Updated brace-expansion security patches, including a scoped v5 override to 5.0.12, resolving both high-severity production denial-of-service advisories.
- Production dependency audit reports six moderate advisories and no high/critical advisories.
- Deferred React Router advisories [GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) and [GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg): navigation uses internally constructed paths, and the app uses BrowserRouter without SSR/hydration. Reassess by 2026-11-04 or before accepting external navigation destinations.
- Deferred fast-uri advisories [GHSA-hrr3-gc8f-f4qj](https://github.com/advisories/GHSA-hrr3-gc8f-f4qj) and [GHSA-jvvf-x445-j334](https://github.com/advisories/GHSA-jvvf-x445-j334): the dependency is used by schema tooling, not application host allowlists or mailto processing. Reassess by 2026-11-04 or before introducing URI-based trust decisions.
- Deferred Fastify advisory [GHSA-4mh8-r7rc-xpvc](https://github.com/advisories/GHSA-4mh8-r7rc-xpvc): HTTP/2 and response trailers are not enabled. Reassess by 2026-11-04 or before enabling either feature.

### Upgrade notes
- Upgrade backend, frontend, and desktop together. Schema updates run at startup; create a backup before upgrading.
- Backup JSON v4 preserves study preferences, tasks, transfer history, and evidence links. Restoring v1–v3 replaces calendar data without restoring calendar records; review the restore warning first.
- Roll back by reinstalling the previous release and restoring a compatible pre-upgrade backup. Do not downgrade an updated database in place.
- Linux downloads remain an x86_64 AppImage and an amd64 Debian package.

## [0.2.0] - 2026-09-30

### Added
- Grammar course with 34 lessons from foundation level 0 through C2-oriented study, deterministic exercises, saved progress, and an optional lesson-aware AI tutor.
- Detailed Vietnamese grammar guides covering formation, contextual use, cues, contrasts, common mistakes and pre-practice checks; accessible lesson contents and course/stage progress.
- Active-recall learning attempts, confidence ratings, recall retries, and optional AI-assisted output assessment.
- Focus-mode learning layout, step navigation, and pronunciation controls for vocabulary.
- Grammar progress and attempt history in backup/restore and shared web/desktop database migration.
- Persistent light/dark themes, English/Vietnamese interface selection, and responsive vocabulary view modes.

### Fixed
- Browser CORS preflight for PATCH and DELETE requests from allowed origins.
- Shared-database migration across older schemas and missing grammar tables.
- Statistics navigation remains available alongside the new grammar routes.
- Changing grammar lessons clears practice and tutor state, including late responses from a previous lesson.

### Upgrade notes
- Backend, frontend and desktop must be upgraded together. Schema updates run at startup; keep a backup before upgrading. Historical grammar attempts are preserved rather than regraded by the enriched guides.
- AI output assessment and the optional grammar tutor require `OPENAI_API_KEY`; `OPENAI_MODEL` and `OPENAI_TIMEOUT_MS` are optional. Core grammar lessons and deterministic exercises do not require AI calls.
- Grammar level labels guide study; completing this course is not CEFR certification or an independently reviewed claim of exhaustive coverage.
- Linux downloads are an x86_64 AppImage and an amd64 Debian package. Roll back by reinstalling the previous release and restoring a compatible pre-upgrade backup if needed; do not downgrade an updated database without a backup.
- Release dependency audit reports two moderate production advisories and no high/critical advisories. The local real-Electron IPC test harness is skipped when the setuid sandbox is not configured; the release workflow additionally launches the packaged AppImage and Debian application.
