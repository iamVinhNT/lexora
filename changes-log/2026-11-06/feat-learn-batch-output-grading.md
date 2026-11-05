# Batch AI grading of Learn sentences

## Scope

Learn session, Output step ("Đặt câu"). Review, grammar practice and the AI assistant are unchanged.

## What changed

- `POST /api/learning/session/:id/step` with `step: "OUTPUT"` now only validates (trimmed, non-empty, `EMPTY_OUTPUT`) and saves the sentence on the session item (`completedStep = OUTPUT`, `outputSentence`). It no longer calls the AI and returns `feedback: null`. The cursor goes straight to ASSESS.
- New `POST /api/learning/session/:id/grade-outputs` grades every saved, ungraded sentence in one AI call (`OutputGrader.gradeBatch`, falling back to one `grade` call per sentence for graders without it), outside any SQLite transaction. It writes one `learning_attempts` row per sentence (`source = AI`, request id `<itemId>:output-grade:<n>`) in a single transaction and returns the session. It is idempotent: sentences already graded are skipped. A provider failure, or a response that does not return exactly one grade per sentence, gives `503 SERVICE_UNAVAILABLE` and writes nothing.
- `POST .../complete` rejects a session that still has ungraded sentences with `400 OUTPUT_NOT_GRADED`.
- `deriveLearningCursor` decides that Output is finished from `completedStep` instead of counting attempts. The pure rule for "saved but not graded" is `needsOutputGrade` in `domain/learning/pending-output.ts`.
- Frontend: after the last Assess the ready card shows "Grade sentences and complete" (grade, then complete). The session no longer auto-completes. The summary lists each sentence with score, explanation and suggestion.
- The second attempt after a failing sentence is gone, since feedback now arrives after the learner has moved on.

## Impact

- No schema change and no migration.
- A session started before this change keeps working: an item whose first attempt was already graded `INVALID` still shows Output attempt 2; its new sentence is saved and graded as attempt 2.
- The production score and SM-2 effect are computed at completion from the graded attempt, as before.

## Verification

See the final report of the change for the commands run.
