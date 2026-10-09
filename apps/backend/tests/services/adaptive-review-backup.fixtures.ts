/**
 * @file adaptive-review-backup.fixtures.ts
 * @description Shared fixtures and test helpers for backup v6 adaptive review tests.
 */
import { type AppDatabase } from '../../src/db/client.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';
import type { ReviewAttemptRow, ReviewAttemptRequestRow } from '../../src/schemas/review-attempt.schema.js';
import { calculateEffectiveRatings } from '../../src/domain/review/prompt.js';

export const now = '2026-10-09T10:00:00.000Z';
export const wordId = 'word-adaptive-01';
export const taskId = 'task-review-01';

export function seedTestWordAndTask(database: AppDatabase): void {
  database.sqlite.prepare(`
    INSERT INTO words (id, word, definition, translation, difficulty, phonetic, part_of_speech, created_at, updated_at)
    VALUES (?, 'serendipity', 'fortunate accident', 'sự tình cờ may mắn', 'ADVANCED', '/ˌser.ənˈdɪp.ə.ti/', 'noun', ?, ?)
  `).run(wordId, now, now);

  const study = new StudyRepository(database);
  study.putPreferences({
    timeZone: 'UTC',
    studyDays: [1, 2, 3, 4, 5, 6, 7],
    learningTarget: 10,
    reviewTarget: 20,
    grammarTarget: 1,
  });

  study.createTask({
    id: taskId,
    scheduledDate: '2026-10-09',
    kind: 'REVIEW_WORDS',
    targetCount: 5,
    source: 'MANUAL',
  }, now);
}

export const sampleCanonicalRatings = calculateEffectiveRatings({
  recallResult: 'EXACT',
  recallScore: 100,
  outputMethod: 'AI',
  outputScore: 92,
});

export const sampleCompletedAttempt: ReviewAttemptRow = {
  id: 'attempt-completed-01',
  wordId,
  studyTaskId: taskId,
  status: 'COMPLETED',
  stage: 'ASSESS',
  version: 3,
  promptType: 'RECALL',
  promptText: 'fortunate accident',
  expectedDueAt: '2026-10-09T08:00:00.000Z',
  expectedLastReviewedAt: null,
  expectedRepetitions: 0,
  expectedInterval: 0,
  expectedEaseFactor: 2.5,
  expectedLapses: 0,
  expectedWordUpdatedAt: now,
  needsOutput: true,
  weakReasons: ['RETENTION_LAPSE'],
  recallAnswer: 'serendipity',
  recallResult: 'EXACT',
  recallScore: 100,
  responseTime: 1800,
  outputAnswer: 'Finding this book was sheer serendipity.',
  outputMethod: 'AI',
  outputScore: 92,
  outputExplanation: 'Great context and accurate collocations.',
  outputSuggestion: null,
  outputConfigRevision: 'rev-01',
  selfRating: 'GOOD',
  effectiveRating: sampleCanonicalRatings.GOOD,
  completedAt: now,
  createdAt: now,
  updatedAt: now,
};

export const sampleCompleteResult = {
  attempt: {
    id: sampleCompletedAttempt.id,
    wordId: sampleCompletedAttempt.wordId,
    studyTaskId: sampleCompletedAttempt.studyTaskId,
    status: 'COMPLETED' as const,
    stage: 'ASSESS' as const,
    version: 3,
    prompt: { type: 'RECALL' as const, text: 'fortunate accident' },
    needsOutput: true,
    weakReasons: ['RETENTION_LAPSE'],
    recall: {
      answer: 'serendipity',
      result: 'EXACT' as const,
      score: 100,
      responseTime: 1800,
    },
    output: {
      answer: 'Finding this book was sheer serendipity.',
      method: 'AI' as const,
      score: 92,
      explanation: 'Great context and accurate collocations.',
      suggestion: null,
      configRevision: 'rev-01',
    },
    word: {
      id: wordId,
      word: 'serendipity',
      definition: 'fortunate accident',
      translation: 'sự tình cờ may mắn',
      phonetic: '/ˌser.ənˈdɪp.ə.ti/',
      partOfSpeech: 'noun',
    },
    examples: [],
    contexts: [],
    intervalPreviews: { AGAIN: '1d', HARD: '2d', GOOD: '4d', EASY: '7d' },
    effectiveRatings: sampleCanonicalRatings,
    createdAt: now,
    updatedAt: now,
  },
  selfRating: 'GOOD' as const,
  effectiveRating: sampleCanonicalRatings.GOOD,
  reviewState: {
    id: 'state-01',
    wordId,
    interval: 4,
    easeFactor: 2.5,
    repetitions: 1,
    lapses: 0,
    dueAt: '2026-10-13T10:00:00.000Z',
    lastReviewedAt: now,
  },
  learningProgress: {
    wordId,
    status: 'LEARNING',
    recognitionScore: 100,
    recallScore: 100,
    productionScore: 92,
  },
  reviewLog: {
    id: 'log-01',
    wordId,
    reviewType: 'RECALL',
    rating: sampleCanonicalRatings.GOOD,
    answer: 'serendipity',
    correct: true,
    responseTime: 1800,
    createdAt: now,
  },
};

export const sampleCompleteRequest: ReviewAttemptRequestRow = {
  requestId: 'req-complete-01',
  attemptId: 'attempt-completed-01',
  action: 'COMPLETE',
  requestBody: JSON.stringify({
    requestId: 'req-complete-01',
    attemptId: 'attempt-completed-01',
    expectedVersion: 3,
    rating: 'GOOD',
  }),
  response: JSON.stringify(sampleCompleteResult),
  createdAt: now,
};
