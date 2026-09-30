/**
 * @file grammar-tutor.routes.test.ts
 * @description Verifies local-only optional grammar tutoring without provider spend or progress mutation.
 */
import { describe, expect, it, vi } from 'vitest';
import { buildApp } from '../../src/app.js';
import { getGrammarCurriculum } from '../../src/grammar/content/manifest.js';

const lessonId = 'grammar-0-word-roles';
const url = `/api/grammar/${lessonId}/tutor`;
const payload = { question: 'Vì sao từ này là động từ?' };

function reviewedCurriculum() {
  const curriculum = getGrammarCurriculum();
  curriculum.stages[0]!.publicationStatus = 'published';
  for (const lesson of curriculum.stages[0]!.lessons) {
    lesson.review = { status: 'approved', reviewer: 'Test-only reviewer', reviewedAt: '2026-09-26T10:00:00.000Z' };
  }
  return curriculum;
}

describe('grammar tutor local boundary', () => {
  it('refuses withdrawn draft content without changing learner progress', async () => {
    const withdrawn = getGrammarCurriculum();
    withdrawn.stages[0]!.publicationStatus = 'draft';
    const app = await buildApp({ logger: false, grammarCurriculum: withdrawn });
    try {
      const result = await app.inject({ method: 'POST', url, payload });
      expect(result.statusCode).toBe(404);
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_lesson_progress').get()).toEqual({ count: 0 });
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
    } finally { await app.close(); }
  });

  it('rejects untrusted peer, host, origin and invalid inputs before invoking the provider', async () => {
    const provider = vi.fn().mockResolvedValue({ explanation: 'Đây là động từ vì mô tả hành động.', contrast: 'Danh từ mô tả sự vật, không phải hành động.' });
    const app = await buildApp({ logger: false, grammarCurriculum: reviewedCurriculum(), grammarTutorProvider: provider });
    try {
      for (const options of [
        { remoteAddress: '192.168.1.10' },
        { headers: { host: 'evil.example' } },
        { headers: { host: 'localhost:3001', origin: 'https://evil.example' } },
        { headers: { host: 'localhost:3001', origin: 'http://localhost.evil.example:5173' } },
      ]) {
        const response = await app.inject({ method: 'POST', url, payload, ...options });
        expect(response.statusCode).toBe(403);
      }
      const invalid = await app.inject({ method: 'POST', url, payload: { question: 'a'.repeat(501) } });
      expect(invalid.statusCode).toBe(400);
      expect(provider).not.toHaveBeenCalled();
    } finally { await app.close(); }
  });

  it('accepts local web/desktop origins, bounds calls, and keeps deterministic grades untouched', async () => {
    const provider = vi.fn().mockResolvedValue({ explanation: 'Đây là động từ vì mô tả hành động.', contrast: 'Danh từ mô tả sự vật, không phải hành động.' });
    const app = await buildApp({ logger: false, grammarCurriculum: reviewedCurriculum(), grammarTutorProvider: provider });
    try {
      for (const origin of ['http://localhost:5173', 'http://127.0.0.1:3001']) {
        const response = await app.inject({ method: 'POST', url, payload, headers: { host: '127.0.0.1:3001', origin } });
        expect(response.statusCode).toBe(200);
        expect(response.json().data.explanation).toContain('động từ');
        expect(response.payload).not.toContain('acceptedAnswers');
      }
      expect(app.db.sqlite.prepare('SELECT count(*) AS count FROM grammar_exercise_attempts').get()).toEqual({ count: 0 });
      let limited;
      for (let i = 0; i < 30; i++) {
        limited = await app.inject({ method: 'POST', url, payload });
        if (limited.statusCode === 429) break;
      }
      expect(limited?.statusCode).toBe(429);
      expect(provider.mock.calls.length).toBeLessThan(32);
    } finally { await app.close(); }
  });

  it('returns a safe unavailable response when the provider fails', async () => {
    const provider = vi.fn().mockRejectedValue(new Error('private provider diagnostic'));
    const app = await buildApp({ logger: false, grammarCurriculum: reviewedCurriculum(), grammarTutorProvider: provider });
    try {
      const response = await app.inject({ method: 'POST', url, payload });
      expect(response.statusCode).toBe(503);
      expect(response.json().error.code).toBe('SERVICE_UNAVAILABLE');
      expect(response.payload).not.toContain('private provider diagnostic');
    } finally { await app.close(); }
  });
});
