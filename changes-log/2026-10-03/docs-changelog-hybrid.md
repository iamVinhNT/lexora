# docs: adopt hybrid changelog workflow

- **Date:** 2026-10-03
- **Scope:** repository change tracking

## Changed

- Root `CHANGELOG.md` now contains an `Unreleased` summary.
- Detailed records are stored under `changes-log/YYYY-MM-DD/`.
- Added naming convention: `[tag]-[slug].md`.

## Usage

Use root `CHANGELOG.md` for release summaries. Use dated detail files for implementation context and verification evidence.
