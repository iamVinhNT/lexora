<!-- @file CHANGELOG.md -->
<!-- @description User-facing Lexora release history and upgrade notes. -->

# Changelog

## [Unreleased]

### Fixed
- Desktop release smoke checks use separate AppImage/Debian profiles and in-memory databases, and report startup logs on failure. Manual package verification builds the requested immutable version tag.

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
