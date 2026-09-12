/**
 * @file learning-flow.test.ts
 * @description Real SQLite end-to-end coverage for the complete learning lifecycle.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app.js';
import { getDb } from '../../src/db/client.js';
import { seedDatabase } from '../../src/db/seed.js';
import { createCloze } from '../../src/domain/text/cloze.js';
import {
  collocations,
  contextWords,
  contexts,
  examples,
  learningProgress,
  reviewStates,
  tags,
  wordTags,
  words,
} from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';
import type { BackupData } from '../../src/schemas/data.schema.js';

type BackupTable = keyof BackupData;
type BackupRow = Record<string, any>;

const backupTables: BackupTable[] = [
  'users',
  'words',
  'wordFamilies',
  'collocations',
  'examples',
  'contexts',
  'contextWords',
  'learningProgress',
  'reviewStates',
  'reviewLogs',
  'tags',
  'wordTags',
  'learningSessions',
  'learningSessionItems',
];

const rowKeyDefinitions: Record<BackupTable, Record<string, (row: BackupRow) => string>> = {
  users: {
    id: (row) => row.id,
    email: (row) => row.email.toLowerCase(),
  },
  words: {
    id: (row) => row.id,
    headword: (row) => row.word.toLowerCase(),
  },
  wordFamilies: {
    id: (row) => row.id,
    relationship: (row) => `${row.wordId}\u0000${row.relatedWordId}\u0000${row.relationship}`,
  },
  collocations: {
    id: (row) => row.id,
    wordPhrase: (row) => `${row.wordId}\u0000${row.phrase}`,
  },
  examples: {
    id: (row) => row.id,
    wordSentence: (row) => `${row.wordId}\u0000${row.sentence}`,
  },
  contexts: { id: (row) => row.id },
  contextWords: { composite: (row) => `${row.contextId}\u0000${row.wordId}` },
  learningProgress: {
    id: (row) => row.id,
    wordId: (row) => row.wordId,
  },
  reviewStates: {
    id: (row) => row.id,
    wordId: (row) => row.wordId,
  },
  reviewLogs: { id: (row) => row.id },
  tags: {
    id: (row) => row.id,
    name: (row) => row.name,
  },
  wordTags: { composite: (row) => `${row.wordId}\u0000${row.tagId}` },
  learningSessions: { id: (row) => row.id },
  learningSessionItems: {
    id: (row) => row.id,
    sessionWord: (row) => `${row.sessionId}\u0000${row.wordId}`,
  },
};

const sortKeyDefinitions: Record<BackupTable, (row: BackupRow) => string> = {
  users: (row) => row.email,
  words: (row) => row.word,
  wordFamilies: (row) => `${row.wordId}\u0000${row.relatedWordId}\u0000${row.relationship}`,
  collocations: (row) => `${row.wordId}\u0000${row.phrase}`,
  examples: (row) => `${row.wordId}\u0000${row.sentence}`,
  contexts: (row) => row.id,
  contextWords: (row) => `${row.contextId}\u0000${row.wordId}`,
  learningProgress: (row) => row.wordId,
  reviewStates: (row) => row.wordId,
  reviewLogs: (row) => `${row.wordId}\u0000${row.reviewType}\u0000${row.rating}`,
  tags: (row) => row.name,
  wordTags: (row) => `${row.wordId}\u0000${row.tagId}`,
  learningSessions: (row) => row.id,
  learningSessionItems: (row) => `${row.sessionId}\u0000${row.wordId}`,
};

function withoutFields(row: BackupRow, fields: string[]): BackupRow {
  return Object.fromEntries(Object.entries(row).filter(([field]) => !fields.includes(field)));
}

function canonicalizeBackup(data: BackupData): Record<BackupTable, BackupRow[]> {
  const wordNames = new Map(data.words.map((row) => [row.id, row.word]));
  const tagNames = new Map(data.tags.map((row) => [row.id, row.name]));
  const sessionKeys = new Map(data.learningSessions.map((row) => [row.id, row.id]));

  const canonicalizeRow = (table: BackupTable, source: BackupRow): BackupRow => {
    const row = { ...source };
    const wordName = wordNames.get(row.wordId) ?? row.wordId;
    const relatedWordName = wordNames.get(row.relatedWordId) ?? row.relatedWordId;
    const tagName = tagNames.get(row.tagId) ?? row.tagId;

    switch (table) {
      case 'users':
        return withoutFields(row, ['createdAt']);
      case 'words':
        return withoutFields({ ...row, id: row.word }, ['createdAt', 'updatedAt']);
      case 'wordFamilies':
        return withoutFields({
          ...row,
          id: `${wordName}\u0000${relatedWordName}\u0000${row.relationship}`,
          wordId: wordName,
          relatedWordId: relatedWordName,
        }, []);
      case 'collocations':
        return withoutFields({ ...row, id: `${wordName}\u0000${row.phrase}`, wordId: wordName }, []);
      case 'examples':
        return withoutFields({ ...row, id: `${wordName}\u0000${row.sentence}`, wordId: wordName }, []);
      case 'contexts':
        return withoutFields(row, ['createdAt', 'updatedAt']);
      case 'contextWords':
        return withoutFields({ ...row, wordId: wordName }, ['firstSeenAt', 'lastSeenAt']);
      case 'learningProgress':
        return withoutFields({ ...row, id: wordName, wordId: wordName }, ['updatedAt']);
      case 'reviewStates':
        return withoutFields({ ...row, id: wordName, wordId: wordName }, ['dueAt']);
      case 'reviewLogs':
        return withoutFields({ ...row, wordId: wordName }, ['createdAt']);
      case 'tags':
        return withoutFields({ ...row, id: row.name }, ['createdAt']);
      case 'wordTags':
        return { ...row, wordId: wordName, tagId: tagName };
      case 'learningSessions':
        return withoutFields({ ...row, id: sessionKeys.get(row.id) ?? row.id }, ['startedAt']);
      case 'learningSessionItems':
        return withoutFields({ ...row, id: `${row.sessionId}\u0000${wordName}`, wordId: wordName }, ['createdAt']);
    }
  };

  return Object.fromEntries(backupTables.map((table) => {
    const rows = data[table].map((row) => canonicalizeRow(table, row as BackupRow));
    rows.sort((left, right) => sortKeyDefinitions[table](left).localeCompare(sortKeyDefinitions[table](right)));
    return [table, rows];
  })) as Record<BackupTable, BackupRow[]>;
}

function expectUniqueBackupKeys(data: BackupData, label: string): void {
  for (const table of backupTables) {
    for (const [keyName, key] of Object.entries(rowKeyDefinitions[table])) {
      const keys = data[table].map((row) => key(row as BackupRow));
      expect(new Set(keys).size, `${label}.${table}.${keyName}`).toBe(keys.length);
    }
  }
}

describe('learning lifecycle end to end', () => {
  let app: FastifyInstance | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it('learns, reviews, analyzes, backs up, resets, and restores seed data', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });
    const firstSeed = await seedDatabase(app.db);
    const secondSeed = await seedDatabase(app.db);
    expect(firstSeed.wordCount).toBeGreaterThanOrEqual(50);
    expect(firstSeed.contextCount).toBeGreaterThanOrEqual(3);
    expect(secondSeed.wordCount).toBe(firstSeed.wordCount);
    expect(secondSeed.contextCount).toBe(0);

    const seedContexts = app.db.select().from(contexts).all();
    const seedLinks = app.db.select().from(contextWords).all();
    expect(seedLinks).toHaveLength(seedContexts.length * 10);
    for (const link of seedLinks) {
      const context = seedContexts.find((item) => item.id === link.contextId);
      const word = app.db.select().from(words).where(eq(words.id, link.wordId)).all()[0];
      expect(context).toBeDefined();
      expect(word).toBeDefined();
      expect(createCloze(context!.content, word!.word)).not.toBe(context!.content);
    }

    const concurrentSeeds = await Promise.all([seedDatabase(app.db), seedDatabase(app.db)]);
    expect(concurrentSeeds[0].contextCount + concurrentSeeds[1].contextCount).toBe(0);
    expect(app.db.select().from(words).all()).toHaveLength(firstSeed.wordCount);
    expect(app.db.select().from(contexts).all()).toHaveLength(firstSeed.contextCount);
    expect(app.db.select().from(contextWords).all()).toHaveLength(firstSeed.contextCount * 10);

    const wordsResponse = await app.inject({ method: 'GET', url: '/api/words?limit=100' });
    expect(wordsResponse.statusCode).toBe(200);
    const wordsBody = JSON.parse(wordsResponse.payload);
    expect(wordsBody.data.total).toBeGreaterThanOrEqual(50);

    const target = wordsBody.data.items.find((word: any) => word.word === 'resilient');
    expect(target).toBeDefined();
    expect(target.collocations.length).toBeGreaterThan(0);
    expect(target.examples.length).toBeGreaterThan(0);
    expect(target.phonetic).toBeTruthy();
    expect(target.partOfSpeech).toBeTruthy();
    expect(target.translation).toBeTruthy();
    expect(target.tags.length).toBeGreaterThan(0);

    const wordResponse = await app.inject({ method: 'GET', url: `/api/words/${target.id}` });
    expect(wordResponse.statusCode).toBe(200);
    expect(JSON.parse(wordResponse.payload).data.learningProgress.status).toBe('NEW');

    const contextsResponse = await app.inject({ method: 'GET', url: '/api/contexts?limit=100' });
    expect(contextsResponse.statusCode).toBe(200);
    const contextsBody = JSON.parse(contextsResponse.payload);
    expect(contextsBody.data.total).toBeGreaterThanOrEqual(3);
    const contextId = contextsBody.data.items[0].id;

    const contextResponse = await app.inject({ method: 'GET', url: `/api/contexts/${contextId}` });
    expect(contextResponse.statusCode).toBe(200);
    expect(JSON.parse(contextResponse.payload).data.words.length).toBeGreaterThan(0);

    const startResponse = await app.inject({
      method: 'POST',
      url: '/api/learning/session',
      payload: { mode: 'context', contextId, count: 1 },
    });
    expect(startResponse.statusCode).toBe(201);
    const session = JSON.parse(startResponse.payload).data;
    const sessionWordId = session.items[0].wordId;

    const stepPayloads = [
      { wordId: sessionWordId, step: 'CONTEXT' },
      { wordId: sessionWordId, step: 'UNDERSTAND' },
      { wordId: sessionWordId, step: 'RECALL', recallAnswer: session.items[0].word.word, recallCorrect: true },
      {
        wordId: sessionWordId,
        step: 'OUTPUT',
        userSentence: `The team built a resilient service that recovered quickly.`,
      },
      { wordId: sessionWordId, step: 'ASSESS', assessmentRating: 'GOOD' },
    ];

    for (const payload of stepPayloads) {
      const response = await app.inject({
        method: 'POST',
        url: `/api/learning/session/${session.id}/step`,
        payload,
      });
      expect(response.statusCode).toBe(200);
    }

    const completeResponse = await app.inject({
      method: 'POST',
      url: `/api/learning/session/${session.id}/complete`,
    });
    expect(completeResponse.statusCode).toBe(200);
    expect(JSON.parse(completeResponse.payload).data.completedAt).not.toBeNull();

    const reviewResponse = await app.inject({
      method: 'POST',
      url: '/api/reviews',
      payload: {
        wordId: sessionWordId,
        reviewType: 'PRODUCTION',
        rating: 'GOOD',
        answer: 'The team built a resilient service that recovered quickly.',
        correct: true,
      },
    });
    expect(reviewResponse.statusCode).toBe(200);
    expect(JSON.parse(reviewResponse.payload).data.reviewState.repetitions).toBe(2);

    const progressResponse = await app.inject({ method: 'GET', url: `/api/progress/${sessionWordId}` });
    expect(progressResponse.statusCode).toBe(200);
    const progress = JSON.parse(progressResponse.payload).data;
    expect(progress.status).not.toBe('NEW');
    expect(progress.reviewSummary.totalReviews).toBeGreaterThanOrEqual(4);

    const statisticsResponse = await app.inject({ method: 'GET', url: '/api/statistics/dashboard' });
    expect(statisticsResponse.statusCode).toBe(200);
    expect(JSON.parse(statisticsResponse.payload).data.todayReviews).toBeGreaterThan(0);

    const contextBeforeRestore = JSON.parse(
      (await app.inject({ method: 'GET', url: `/api/contexts/${contextId}` })).payload
    ).data;

    const backupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
    expect(backupResponse.statusCode).toBe(200);
    const backup = JSON.parse(backupResponse.payload).data;
    expect(backup.data.words.length).toBeGreaterThanOrEqual(50);
    expect(backup.data.reviewLogs.length).toBeGreaterThan(0);
    expect(backup.data.learningSessions.length).toBe(1);

    const resetResponse = await app.inject({
      method: 'POST',
      url: '/api/data/reset-progress',
      payload: { confirm: true },
    });
    expect(resetResponse.statusCode).toBe(200);

    const resetProgressResponse = await app.inject({ method: 'GET', url: `/api/progress/${sessionWordId}` });
    expect(JSON.parse(resetProgressResponse.payload).data.status).toBe('NEW');
    expect(JSON.parse(resetProgressResponse.payload).data.reviewSummary.totalReviews).toBe(0);

    const restorePreviewResponse = await app.inject({
      method: 'POST',
      url: '/api/restore/preview',
      payload: { backup },
    });
    expect(restorePreviewResponse.statusCode).toBe(200);
    const restorePreviewBody = JSON.parse(restorePreviewResponse.payload);
    expect(restorePreviewBody.success).toBe(true);
    expect(restorePreviewBody.data.previewToken).toEqual(expect.any(String));

    const restoreResponse = await app.inject({
      method: 'POST',
      url: '/api/restore',
      payload: {
        backup,
        confirm: true,
        previewToken: restorePreviewBody.data.previewToken,
      },
    });
    expect(restoreResponse.statusCode).toBe(200);
    const restoreBody = JSON.parse(restoreResponse.payload);
    expect(restoreBody.success).toBe(true);
    expect(restoreBody.data.restored).toBe(true);

    const restoredProgressResponse = await app.inject({ method: 'GET', url: `/api/progress/${sessionWordId}` });
    expect(restoredProgressResponse.statusCode).toBe(200);
    expect(JSON.parse(restoredProgressResponse.payload).data.status).toBe(progress.status);

    const restoredBackupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
    const restoredBackup = JSON.parse(restoredBackupResponse.payload).data;
    const primaryKeys: Record<string, (row: any) => string> = {
      users: (row) => row.id,
      words: (row) => row.id,
      wordFamilies: (row) => row.id,
      collocations: (row) => row.id,
      examples: (row) => row.id,
      contexts: (row) => row.id,
      contextWords: (row) => `${row.contextId}\u0000${row.wordId}`,
      learningProgress: (row) => row.id,
      reviewStates: (row) => row.id,
      reviewLogs: (row) => row.id,
      tags: (row) => row.id,
      wordTags: (row) => `${row.wordId}\u0000${row.tagId}`,
      learningSessions: (row) => row.id,
      learningSessionItems: (row) => row.id,
    };
    for (const table of Object.keys(primaryKeys)) {
      const sortRows = (rows: any[]) => [...rows].sort((left, right) => primaryKeys[table](left).localeCompare(primaryKeys[table](right)));
      expect(sortRows(restoredBackup.data[table]), table).toEqual(sortRows(backup.data[table]));
    }

    const restoredWordResponse = await app.inject({ method: 'GET', url: `/api/words/${target.id}` });
    expect(JSON.parse(restoredWordResponse.payload).data).toMatchObject({
      id: target.id,
      word: target.word,
      phonetic: target.phonetic,
      partOfSpeech: target.partOfSpeech,
      definition: target.definition,
      translation: target.translation,
      difficulty: target.difficulty,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
      collocations: target.collocations,
      examples: target.examples,
      tags: target.tags,
    });

    const contextAfterRestore = JSON.parse((await app.inject({ method: 'GET', url: `/api/contexts/${contextId}` })).payload).data;
    expect(contextAfterRestore).toEqual(contextBeforeRestore);

    const restoredContextLink = restoredBackup.data.contextWords.find(
      (link: any) => link.contextId === contextId && link.wordId === sessionWordId
    );
    const originalContextLink = backup.data.contextWords.find(
      (link: any) => link.contextId === contextId && link.wordId === sessionWordId
    );
    expect(restoredContextLink).toEqual(originalContextLink);

    expect(restoredBackup.data.collocations.find((row: any) => row.wordId === target.id)).toEqual(
      backup.data.collocations.find((row: any) => row.wordId === target.id)
    );
    expect(restoredBackup.data.examples.find((row: any) => row.wordId === target.id)).toEqual(
      backup.data.examples.find((row: any) => row.wordId === target.id)
    );
    const targetTagIds = backup.data.wordTags.filter((row: any) => row.wordId === target.id).map((row: any) => row.tagId);
    expect(restoredBackup.data.wordTags.filter((row: any) => row.wordId === target.id)).toEqual(
      backup.data.wordTags.filter((row: any) => row.wordId === target.id)
    );
    expect(restoredBackup.data.tags.filter((row: any) => targetTagIds.includes(row.id))).toEqual(
      backup.data.tags.filter((row: any) => targetTagIds.includes(row.id))
    );

    expect(restoredBackup.data.reviewStates.find((row: any) => row.wordId === sessionWordId)).toEqual(
      backup.data.reviewStates.find((row: any) => row.wordId === sessionWordId)
    );
    expect(restoredBackup.data.reviewLogs.filter((row: any) => row.wordId === sessionWordId)).toEqual(
      backup.data.reviewLogs.filter((row: any) => row.wordId === sessionWordId)
    );
    expect(restoredBackup.data.learningSessions.find((row: any) => row.id === session.id)).toEqual(
      backup.data.learningSessions.find((row: any) => row.id === session.id)
    );
    expect(restoredBackup.data.learningSessionItems.filter((row: any) => row.sessionId === session.id)).toEqual(
      backup.data.learningSessionItems.filter((row: any) => row.sessionId === session.id)
    );
  });

  it('recreates the complete seed baseline after reset-all without duplicates', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });

    const firstSeed = await seedDatabase(app.db);
    const firstBackupPayload = JSON.parse((await app.inject({ method: 'GET', url: '/api/backup' })).payload).data;
    expect(firstBackupPayload.version).toBe(1);
    expect(firstBackupPayload.application).toBe('Lexora');
    const firstBackup = firstBackupPayload.data;
    expect(firstBackup).toEqual(expect.objectContaining(Object.fromEntries(backupTables.map((table) => [table, expect.any(Array)]))));
    expect(app.db.sqlite.prepare('SELECT id FROM lexora_seed_markers').all()).toEqual([
      { id: 'lexora-curated-vocabulary-v1' },
    ]);
    expectUniqueBackupKeys(firstBackup, 'first-seed');

    const resetResponse = await app.inject({
      method: 'POST',
      url: '/api/data/reset-all',
      payload: { confirm: true },
    });
    expect(resetResponse.statusCode).toBe(200);
    expect(app.db.sqlite.prepare('SELECT id FROM lexora_seed_markers').all()).toEqual([]);

    const emptyBackup = JSON.parse((await app.inject({ method: 'GET', url: '/api/backup' })).payload).data.data;
    for (const table of Object.keys(firstBackup)) {
      expect(emptyBackup[table], table).toEqual([]);
    }

    const secondSeed = await seedDatabase(app.db);
    const secondBackupPayload = JSON.parse((await app.inject({ method: 'GET', url: '/api/backup' })).payload).data;
    expect(secondBackupPayload.version).toBe(1);
    expect(secondBackupPayload.application).toBe('Lexora');
    const secondBackup = secondBackupPayload.data;

    expect(secondSeed.wordCount).toBe(firstSeed.wordCount);
    expect(secondSeed.contextCount).toBe(firstSeed.contextCount);
    expect(secondBackup).toEqual(expect.objectContaining(Object.fromEntries(backupTables.map((table) => [table, expect.any(Array)]))));
    expect(app.db.sqlite.prepare('SELECT id FROM lexora_seed_markers').all()).toEqual([
      { id: 'lexora-curated-vocabulary-v1' },
    ]);
    expectUniqueBackupKeys(secondBackup, 'second-seed');
    expect(canonicalizeBackup(secondBackup)).toEqual(canonicalizeBackup(firstBackup));
  });

  it('enforces exact import and restore preview token lifecycles through the real app boundary', async () => {
    app = await buildApp({ dbPath: ':memory:', logger: false });
    await seedDatabase(app.db);

    const importContent = 'e2e-contract-token';
    const importPreview = await app.inject({
      method: 'POST',
      url: '/api/import/preview',
      payload: { format: 'TXT', content: importContent },
    });
    expect(importPreview.statusCode).toBe(200);
    const importPreviewBody = JSON.parse(importPreview.payload);
    const importCommit = await app.inject({
      method: 'POST',
      url: '/api/import/commit',
      payload: { format: 'TXT', content: importContent, previewToken: importPreviewBody.data.previewToken },
    });
    expect(importCommit.statusCode).toBe(200);
    expect(JSON.parse(importCommit.payload).data.importedCount).toBe(1);

    const backup = JSON.parse((await app.inject({ method: 'GET', url: '/api/backup' })).payload).data;
    const wordsBeforeFailedRestores = app.db.select().from(words).all().length;

    const missingToken = await app.inject({
      method: 'POST',
      url: '/api/restore',
      payload: { backup, confirm: true },
    });
    expect(missingToken.statusCode).toBe(400);
    expect(app.db.select().from(words).all()).toHaveLength(wordsBeforeFailedRestores);

    const mismatchPreview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
    const mismatchToken = JSON.parse(mismatchPreview.payload).data.previewToken;
    const changedBackup = { ...backup, exportedAt: new Date(Date.now() + 1000).toISOString() };
    const mismatchedRestore = await app.inject({
      method: 'POST',
      url: '/api/restore',
      payload: { backup: changedBackup, confirm: true, previewToken: mismatchToken },
    });
    expect(mismatchedRestore.statusCode).toBe(400);
    expect(app.db.select().from(words).all()).toHaveLength(wordsBeforeFailedRestores);

    const validPreview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
    const validToken = JSON.parse(validPreview.payload).data.previewToken;
    const validRestore = await app.inject({
      method: 'POST',
      url: '/api/restore',
      payload: { backup, confirm: true, previewToken: validToken },
    });
    expect(validRestore.statusCode).toBe(200);
    const wordsAfterValidRestore = app.db.select().from(words).all().length;

    const reusedRestore = await app.inject({
      method: 'POST',
      url: '/api/restore',
      payload: { backup, confirm: true, previewToken: validToken },
    });
    expect(reusedRestore.statusCode).toBe(400);
    expect(app.db.select().from(words).all()).toHaveLength(wordsAfterValidRestore);

    const originalNow = Date.now();
    const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(originalNow);
    try {
      const expiredPreview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
      const expiredToken = JSON.parse(expiredPreview.payload).data.previewToken;
      nowSpy.mockReturnValue(originalNow + 15 * 60 * 1000 + 1);
      const expiredRestore = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup, confirm: true, previewToken: expiredToken },
      });
      expect(expiredRestore.statusCode).toBe(400);
      expect(app.db.select().from(words).all()).toHaveLength(wordsAfterValidRestore);
    } finally {
      nowSpy.mockRestore();
    }
  });

  it('rolls back the complete seed when any seed write fails', async () => {
    const db = getDb(':memory:');
    db.sqlite.exec(`
      CREATE TRIGGER fail_seed_context
      BEFORE INSERT ON contexts
      BEGIN
        SELECT RAISE(ABORT, 'seed context failure');
      END;
    `);

    await expect(seedDatabase(db)).rejects.toThrow('seed context failure');
    expect(db.select().from(words).all()).toHaveLength(0);
    expect(db.select().from(contexts).all()).toHaveLength(0);
    expect(db.select().from(contextWords).all()).toHaveLength(0);
    expect(db.select().from(collocations).all()).toHaveLength(0);
    expect(db.select().from(examples).all()).toHaveLength(0);
    expect(db.select().from(tags).all()).toHaveLength(0);
    expect(db.select().from(wordTags).all()).toHaveLength(0);
    expect(db.select().from(learningProgress).all()).toHaveLength(0);
    expect(db.select().from(reviewStates).all()).toHaveLength(0);
    db.sqlite.close();
  });

  it('serializes seed acquisition across separate SQLite connections and creates one baseline', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'lexora-seed-'));
    const databasePath = join(directory, 'seed.db');
    const firstDb = getDb(databasePath);
    const secondDb = getDb(databasePath);

    try {
      firstDb.sqlite.exec('BEGIN IMMEDIATE');
      const waitingSeed = seedDatabase(secondDb);
      await new Promise<void>((resolve) => setTimeout(resolve, 25));
      firstDb.sqlite.exec('ROLLBACK');

      const firstResult = await waitingSeed;
      const secondResult = await seedDatabase(firstDb);

      expect(firstResult.wordCount).toBeGreaterThanOrEqual(50);
      expect(firstResult.contextCount).toBeGreaterThanOrEqual(3);
      expect(secondResult.contextCount).toBe(0);
      expect(firstDb.select().from(words).all()).toHaveLength(firstResult.wordCount);
      expect(firstDb.select().from(contexts).all()).toHaveLength(firstResult.contextCount);
      expect(firstDb.select().from(contextWords).all()).toHaveLength(firstResult.contextCount * 10);
    } finally {
      if (firstDb.sqlite.open) firstDb.sqlite.close();
      if (secondDb.sqlite.open) secondDb.sqlite.close();
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
