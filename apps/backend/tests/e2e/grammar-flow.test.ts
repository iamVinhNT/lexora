/**
 * @file grammar-flow.test.ts
 * @description Exercises reviewed-fixture grammar practice, restart, backup, reset, restore, and optional tutor failure.
 */
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildApp } from '../../src/app.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';

const directories: string[] = [];
const lessonId = 'grammar-a1-pronouns-and-articles';

function reviewedFixture() {
  const curriculum = getGrammarCurriculum();
  for (const stage of curriculum.stages.slice(2)) stage.publicationStatus = 'unpublished';
  for (const stage of curriculum.stages.slice(0, 2)) {
    stage.publicationStatus = 'published';
    for (const lesson of stage.lessons) {
      lesson.review = { status: 'approved', reviewer: 'Integration fixture only', reviewedAt: '2026-09-26T10:00:00.000Z' };
    }
  }
  return curriculum;
}

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('reviewed-fixture grammar flow', () => {
  it('moves across the 0→A1 boundary, survives restart and v3 restore, without depending on AI', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'grammar-flow-'));
    directories.push(directory);
    const dbPath = join(directory, 'grammar.db');
    const curriculum = reviewedFixture();
    const provider = vi.fn().mockRejectedValue(new Error('Offline provider'));
    let app = await buildApp({ dbPath, logger: false, grammarCurriculum: curriculum, grammarTutorProvider: provider });
    try {
      const initial = (await app.inject({ method: 'GET', url: '/api/grammar' })).json().data;
      expect(initial.stages.map((stage: { level: string }) => stage.level)).toEqual(['0', 'A1']);
      expect(initial.nextLessonId).toBe('grammar-0-word-roles');
      expect(initial.isComplete).toBe(false);

      for (const stage of curriculum.stages.slice(0, 2)) {
        for (const lesson of stage.lessons) {
          for (const exercise of lesson.exercises) {
            const answer = exercise.options.find((option) => option.correct)!.text;
            const payload = { requestId: `${exercise.id}-once`, exerciseId: exercise.id, answer: { type: 'choice', text: answer } };
            const result = await app.inject({ method: 'POST', url: `/api/grammar/${lesson.id}/answers`, payload });
            expect(result.statusCode).toBe(200);
            expect(result.json().data.attempt.isCorrect).toBe(true);
            expect((await app.inject({ method: 'POST', url: `/api/grammar/${lesson.id}/answers`, payload })).json().data.attempt.id).toBe(result.json().data.attempt.id);
          }
          const detail = (await app.inject({ method: 'GET', url: `/api/grammar/${lesson.id}` })).json().data;
          expect(detail.progress.isComplete).toBe(true);
          expect(JSON.stringify(detail.lesson)).not.toMatch(/"(?:correct|rationale|acceptedAnswers)"\s*:/);
        }
      }
      const completed = (await app.inject({ method: 'GET', url: '/api/grammar' })).json().data;
      expect(completed.nextLessonId).toBeNull();
      expect(completed.isComplete).toBe(false); // C2 remains unpublished, not a certificate.
      const backup = (await app.inject({ method: 'GET', url: '/api/backup' })).json().data;
      expect(backup.version).toBe(3);
      expect(backup.data.grammarExerciseAttempts.length).toBeGreaterThan(0);
      await app.close();
      app = await buildApp({ dbPath, logger: false, grammarCurriculum: curriculum, grammarTutorProvider: provider });
      expect((await app.inject({ method: 'GET', url: `/api/grammar/${lessonId}` })).json().data.progress.isComplete).toBe(true);
      const unavailable = await app.inject({ method: 'POST', url: `/api/grammar/${lessonId}/tutor`, payload: { question: 'Vì sao dùng him?' } });
      expect(unavailable.statusCode).toBe(503);
      expect(provider).toHaveBeenCalledTimes(1);
      expect((await app.inject({ method: 'GET', url: `/api/grammar/${lessonId}` })).json().data.progress.isComplete).toBe(true);

      const reset = await app.inject({ method: 'POST', url: '/api/data/reset-progress', payload: { confirm: true } });
      expect(reset.statusCode).toBe(200);
      expect((await app.inject({ method: 'GET', url: '/api/grammar' })).json().data.nextLessonId).toBe('grammar-0-word-roles');
      const preview = (await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } })).json().data;
      expect(preview.grammarSummary.includedInBackup).toBe(true);
      const restored = await app.inject({ method: 'POST', url: '/api/restore', payload: { backup, confirm: true, previewToken: preview.previewToken } });
      expect(restored.statusCode).toBe(200);
      expect((await app.inject({ method: 'GET', url: `/api/grammar/${lessonId}` })).json().data.progress.isComplete).toBe(true);
      expect((await app.inject({ method: 'GET', url: '/api/backup' })).json().data.data.grammarExerciseAttempts).toEqual(backup.data.grammarExerciseAttempts);
    } finally {
      await app.close();
    }
  });
  it('exposes every owner-approved level in ordered published course without claiming certification', async () => {
    const app = await buildApp({ logger: false });
    try {
      const response = await app.inject({ method: 'GET', url: '/api/grammar' });
      expect(response.statusCode).toBe(200);
      const data = response.json().data;
      expect(data.stages.map((stage: { level: string }) => stage.level)).toEqual(['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
      expect(data.isComplete).toBe(true);
      expect(data.nextLessonId).toBe(data.stages[0].lessons[0].id);
      expect(response.payload).not.toMatch(/certificate|IELTS|C2 proficiency/i);
    } finally {
      await app.close();
    }
  });
});
