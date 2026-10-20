# Untrack docs files

`docs/` is gitignored, but three files in it had been force-added earlier. They are now removed from the git index only; the files stay on disk and the ignore rule keeps them out of future commits.

## Files changed

- Untracked `docs/plans/2026-09-17-learn-active-recall-redesign.html`, `docs/plans/2026-09-26-sync-web-desktop-database.html` and `docs/specs/2026-09-17-learn-active-recall-redesign.md`.

## Impact

- Runtime, API, database and UI: none.
- Fresh clones, CI and git worktrees no longer receive these three files; earlier change records that link to them now point at local-only files.
- Existing clones that pull this commit may have Git delete the working copies of these files; keep a copy first.

## Verification

- `git ls-files docs .agents` prints nothing after the change and `git check-ignore` confirms both are ignored.
- The three files still exist on disk in this clone.
- No tests were run; the change touches no executable code.
