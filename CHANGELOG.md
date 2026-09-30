<!-- @file CHANGELOG.md -->
<!-- @description User-facing Lexora release history and upgrade notes. -->

# Changelog

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
