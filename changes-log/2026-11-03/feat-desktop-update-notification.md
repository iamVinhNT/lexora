# Desktop update notification

## Scope

Lexora Desktop (Electron, Linux) tells the learner when a newer stable release exists and can download its installer. The browser build is unchanged.

## What changed

- A bell icon with a dot appears in the sidebar header (between the logo and the collapse button, in all three sidebar widths) when GitHub Releases has a stable `vX.Y.Z` newer than the running app. It opens a popover with the version, release date, file name and size, and icon buttons to download, cancel, retry, show the file in its folder, or skip that version.
- The main process checks `https://api.github.com/repos/iamVinhNT/lexora/releases/latest` 10 seconds after the window opens and then at most once every 24 hours. Failures are logged and silent. Skipping a version is accepted only for the version currently offered.
- Download saves the AppImage (or the `.deb` for a deb install) to the system Downloads folder through a unique `<name>.<random>.part` file created exclusively (so a symlink or a cancelled earlier attempt cannot interfere, and stale partials of the same file are removed), verifies the size and SHA-256 `digest` that the GitHub API publishes, then renames it. The AppImage gets mode 755. The app never runs or installs the file.
- Download safety: HTTPS only, first URL must be the repo's release path, every redirect hop (max 5) must be on `github.com`, `objects.githubusercontent.com` or `release-assets.githubusercontent.com`, the file name must match an exact pattern for the release version, the body may not exceed the declared size, and a stalled stream aborts after 30 seconds.
- IPC: five invoke channels (`lexora:update:get-state`, `download`, `cancel-download`, `reveal-download`, `dismiss`) and one push channel (`lexora:update:state`). Every handler checks the sender origin through the shared `isTrustedSender` (extracted from `file-dialogs.ts`). No channel accepts a URL or a path.
- Preferences (`lastCheckedAt`, `dismissedVersion`) live in `update-state.json` under the Electron user-data folder. The SQLite database is untouched.
- New `updates` i18n namespace in English and Vietnamese.

## Development hooks

`LEXORA_UPDATE_DEV_ORIGIN` (a loopback `http` origin serving `/latest` and `/download/vX.Y.Z/<file>`) and `LEXORA_DOWNLOAD_DIR` apply only when the app is not packaged.

## Impact

- Requires the GitHub repository to be public; a private repository answers 404 and the bell never appears.
- Updates are not started in `--smoke-test` or `--acceptance-test` modes, so packaged checks stay offline.
- `tests/setup.ts` in the frontend now treats the `:popover-open` and `:modal` pseudo-classes as non-matching: jsdom's selector engine recurses until the stack overflows on them, which cost about 14 seconds each time a Radix popover opened in a test.

## Verification

See the final report of the change for the commands run.
