/**
 * @file ai-study-planner.repository.test.ts
 * @description Verifies planner candidate counts and metadata-only projections.
 */
import { afterEach, describe, expect, it } from 'vitest';
import { contexts, contextWords, learningProgress, tags, wordTags, words } from '../../src/db/schema.js';
import { getDb, type AppDatabase } from '../../src/db/client.js';
import { StudyRepository } from '../../src/repositories/study.repository.js';

const databases: AppDatabase[] = [];
function setup() {
  const db = getDb(':memory:');
  databases.push(db);
  return { db, repo: new StudyRepository(db) };
}
function addWord(db: AppDatabase, id: string) {
  db.insert(words).values({ id, word: 'private word ' + id, definition: 'private definition ' + id,
    createdAt: '2026-10-01T00:00:00.000Z', updatedAt: '2026-10-01T00:00:00.000Z' }).run();
}

afterEach(() => { for (const db of databases.splice(0)) db.sqlite.close(); });

describe('StudyRepository planner catalog', () => {
  it('counts supported candidates including empty contexts without exposing word content', () => {
    const { db, repo } = setup();
    addWord(db, 'new-untracked');
    addWord(db, 'new-state');
    addWord(db, 'known');
    db.insert(learningProgress).values([
      { id: 'progress-new', wordId: 'new-state', status: 'NEW', recognitionScore: 0, recallScore: 0, productionScore: 0 },
      { id: 'progress-known', wordId: 'known', status: 'FAMILIAR', recognitionScore: 80, recallScore: 80, productionScore: 70, lastStudiedAt: '2026-10-01T00:00:00.000Z' },
    ]).run();
    db.insert(contexts).values([
      { id: 'context-1', title: 'Reading', content: 'PRIVATE_CONTEXT_BODY', createdAt: '2026-10-01T00:00:00.000Z', updatedAt: '2026-10-01T00:00:00.000Z' },
      { id: 'context-empty', title: 'Empty', content: 'PRIVATE_EMPTY_CONTEXT', createdAt: '2026-10-01T00:00:00.000Z', updatedAt: '2026-10-01T00:00:00.000Z' },
    ]).run();
    db.insert(contextWords).values([
      { contextId: 'context-1', wordId: 'new-untracked' }, { contextId: 'context-1', wordId: 'new-state' },
    ]).run();
    db.insert(tags).values({ id: 'topic-1', name: 'Travel', createdAt: '2026-10-01T00:00:00.000Z' }).run();
    db.insert(wordTags).values({ wordId: 'known', tagId: 'topic-1' }).run();

    const catalog = repo.getPlannerCandidates();

    expect(catalog).toEqual({ newWordCount: 2,
      contexts: [{ id: 'context-empty', title: 'Empty', wordCount: 0 }, { id: 'context-1', title: 'Reading', wordCount: 2 }],
      topics: [{ id: 'topic-1', title: 'Travel', wordCount: 1 }] });
    const serialized = JSON.stringify(catalog);
    expect(serialized).not.toContain('private word');
    expect(serialized).not.toContain('PRIVATE_CONTEXT_BODY');
    expect(serialized).not.toContain('PRIVATE_EMPTY_CONTEXT');
  });
});
