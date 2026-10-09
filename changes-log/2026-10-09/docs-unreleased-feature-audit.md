<!-- @file docs-unreleased-feature-audit.md -->
<!-- @description Reconciles unreleased AI planning, backup v7 compatibility, and assistant chat API migration with committed implementations. -->

# docs: reconcile unreleased features and upgrade notes

- **Date:** 2026-10-09
- **Scope:** release documentation for AI study planning, learner backups and assistant chat.
- **Implementation commits:** `90f08f7` (weekly planner), `c1886a5` (menu-aware SSE chat), `36925c7` (adaptive review) and `68cf7f9` (persistent AI history/backup v7).
- **Status:** implemented features documented under Unreleased; this record does not announce a new release or change application behavior.

## AI weekly study planner

The feature introduced in `90f08f7` was missing a dedicated Added entry in [CHANGELOG.md](../../CHANGELOG.md). References to shared AI configuration did not describe the planning capability.

- Generate suggestions for the current day through the following six days, using the saved study time zone and study-day preferences.
- Consider existing tasks, recent calendar activity, available learning content, canonical weak-word counts and the next grammar lesson.
- Suggest learning, review and grammar tasks within server-validated dates, selectors, quantities and available slots.
- Review, edit, select or remove suggestions before saving. Generating a preview does not create calendar tasks.
- Save selected tasks through the existing calendar API. Successful tasks leave the draft; failed tasks retain their IDs and remain available for explicit retry without resaving successful rows.
- Generating suggestions calls the configured AI provider. Planner, assistant and output grading use the same backend AI settings; this is not the offline calendar preview.

Sources: [planner service](../../apps/backend/src/services/ai-study-planner.service.ts), [planner domain validation](../../apps/backend/src/domain/study/ai-study-plan.ts), [editable preview dialog](../../apps/frontend/src/components/calendar/AiStudyPlanPreviewDialog.tsx) and [calendar entry point](../../apps/frontend/src/pages/CalendarPage.tsx).

## Backup v7 compatibility

The current exporter writes version 7. Consolidate the older Unreleased Backup v6 description with the v7 entry without changing the version thresholds for older evidence.

- Full learner backups preserve adaptive review attempts/receipts, grammar output/review snapshots, raw AI conversations and request outcomes.
- AI settings credentials and derived conversation-summary caches are not included. Transcripts remain plaintext in SQLite and exported backups.
- Restore replaces the current dataset; it is not a merge. Preview warns before confirmation when the selected backup lacks newer evidence.

| Restored backup | Missing data replaced without restoration |
|---|---|
| v1–v6 | Current AI conversations and turns |
| v1–v5 | Current adaptive review attempts and receipts |
| v1–v4 | Current grammar practice/output/review snapshots |

The thresholds overlap: restoring v4, for example, lacks all three groups. This table describes these evidence groups, not every legacy calendar or learning-data difference.

Progress reset retains raw AI transcripts as historical evidence but invalidates progress-dependent memory. Full reset removes AI history. Upgrade backend, frontend and desktop together after creating a backup; rollback requires a compatible pre-upgrade backup on a separate database. Older binaries cannot restore v7 backups.

Sources: [backup and restore service](../../apps/backend/src/services/import-export.service.ts), [backup schemas](../../apps/backend/src/schemas/data.schema.ts) and [AI history lifecycle repository](../../apps/backend/src/repositories/ai-history-backup.repository.ts).

## Assistant chat API migration

Changes introduced by `c1886a5` and `68cf7f9` require migrating callers rather than continuing to parse a single JSON reply or send an in-memory transcript.

1. Read current AI configuration metadata through `GET /api/ai/settings`.
2. Select an existing conversation through `GET /api/ai/conversations`, then load it with `GET /api/ai/conversations/:id`; or create one through `POST /api/ai/conversations` using the current configuration revision and requested scope, locale and sharing options.
3. Send `POST /api/ai/chat` with the selected conversation ID, a new UUID request ID, its expected conversation revision and the current configuration revision.
4. Parse the successful response as `text/event-stream`: `meta`, zero or more `delta` events, then `done` or `error`. Responses rejected before streaming retain the normal JSON error envelope. Do not treat a truncated stream or partial delta text as a completed reply.
5. Use returned conversation metadata/revisions for subsequent requests. A replay of the same send reuses its request ID; a new user turn gets a new ID. Stale conversation or configuration revisions require refreshing state before another send.

The example below illustrates the request shape, not an existing conversation. Replace IDs and revisions with actual metadata before calling the API.

```json
{
  "conversationId": "d7074916-a9f4-4ffd-8adc-70e99663c7a7",
  "requestId": "a9e22f3c-86cf-417a-a2f7-aa76034f8df5",
  "expectedConversationRevision": 0,
  "configRevision": "<current-settings-revision>",
  "message": "Help me practise English in this screen.",
  "locale": "en",
  "context": { "kind": "screen", "screen": "overview" },
  "includeContent": true,
  "includeProgress": false
}
```

Context accepts only `{kind:"general"}` or `{kind:"screen",screen}` with a supported screen value. Remove client-supplied `history` and old resource-ID context descriptors: the server constructs memory from the selected stored conversation. Send `allowProviderChange: true` only after explicit confirmation to share that conversation with a different provider/model; it does not bypass locale, scope or sharing-option guards.

Sources: [AI routes](../../apps/backend/src/routes/ai.routes.ts), [conversation/request schemas](../../apps/backend/src/schemas/ai-conversation.schema.ts) and [frontend SSE client](../../apps/frontend/src/api/ai.api.ts).

## Documentation and verification scope

- Update the release summary, preserve the v1–v6/v1–v5/v1–v4 restore warnings, and add explicit assistant migration notes.
- Follow the existing `changes-log/YYYY-MM-DD/tag-slug.md` convention; no second `change-log/` directory or new release section.
- Cross-check the descriptions against the current source and the 12 commits after `v0.3.0`.
- Verification for this documentation update checks local links/anchors, the JSON request example against the current request schema, and whitespace diff. It does not rerun the application suite or call a live AI provider.
