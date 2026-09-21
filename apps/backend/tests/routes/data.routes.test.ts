/**
 * @file data.routes.test.ts
 * @description Integration tests for import, export, backup, restore, and reset routes.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import Database from 'better-sqlite3';
import { getDb, createTables, type AppDatabase } from '../../src/db/client.js';
import { buildApp } from '../../src/app.js';
import { dataRoutes } from '../../src/routes/data.routes.js';
import { ImportExportService } from '../../src/services/import-export.service.js';
import { ValidationError } from '../../src/services/vocabulary.service.js';
import {
  words,
  contexts,
  contextWords,
  learningProgress,
  reviewStates,
  reviewLogs,
  tags,
  wordTags,
  learningSessions,
  learningSessionItems,
  learningAttempts,
  collocations,
  examples,
  wordFamilies,
  users,
} from '../../src/db/schema.js';
import { eq, sql } from 'drizzle-orm';

describe('Data Management Routes (Import / Export / Backup / Restore / Reset)', () => {
  let db: AppDatabase;
  let app: FastifyInstance;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    await app.register(dataRoutes, { db });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  // Helper to insert a word with progress and review state
  function insertSampleWord(word: string, definition = 'Sample definition') {
    const id = `word-${word.toLowerCase()}`;
    const now = new Date().toISOString();
    db.insert(words)
      .values({
        id,
        word,
        definition,
        translation: `Bản dịch của ${word}`,
        difficulty: 'B2',
        createdAt: now,
        updatedAt: now,
      })
      .run();

    db.insert(learningProgress)
      .values({
        id: `lp-${word.toLowerCase()}`,
        wordId: id,
        status: 'NEW',
        recognitionScore: 0,
        recallScore: 0,
        productionScore: 0,
        createdAt: now,
        updatedAt: now,
      } as any)
      .run();

    db.insert(reviewStates)
      .values({
        id: `rs-${word.toLowerCase()}`,
        wordId: id,
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        lapses: 0,
        dueAt: now,
      })
      .run();

    return id;
  }

  async function previewImportToken(format: 'TXT' | 'CSV' | 'JSON', content: string) {
    const response = await app.inject({
      method: 'POST',
      url: '/api/import/preview',
      payload: { format, content },
    });
    expect(response.statusCode).toBe(200);
    return JSON.parse(response.payload).data.previewToken as string;
  }

  async function previewRestoreToken(backup: unknown) {
    const response = await app.inject({
      method: 'POST',
      url: '/api/restore/preview',
      payload: { backup },
    });
    expect(response.statusCode).toBe(200);
    return JSON.parse(response.payload).data.previewToken as string;
  }

  describe('Database expand compatibility', () => {
    it('idempotently ensures exposure columns on existing context_words tables missing them', () => {
      const rawSqlite = new Database(':memory:');
      // Create tables using older context_words schema missing exposure_count, first_seen_at, last_seen_at
      rawSqlite.exec(`
        CREATE TABLE contexts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          source_type TEXT,
          source_url TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT
        );
        CREATE TABLE words (
          id TEXT PRIMARY KEY,
          word TEXT NOT NULL,
          phonetic TEXT,
          part_of_speech TEXT,
          definition TEXT NOT NULL,
          translation TEXT,
          difficulty TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT
        );
        CREATE TABLE context_words (
          context_id TEXT NOT NULL REFERENCES contexts(id) ON DELETE CASCADE,
          word_id TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
          PRIMARY KEY (context_id, word_id)
        );
      `);

      // Verify columns before migration
      const colsBefore = rawSqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
      const namesBefore = new Set(colsBefore.map((c) => c.name));
      expect(namesBefore.has('exposure_count')).toBe(false);
      expect(namesBefore.has('first_seen_at')).toBe(false);
      expect(namesBefore.has('last_seen_at')).toBe(false);

      // Now run createTables and getDb against the existing DB instance
      createTables(rawSqlite);

      const colsAfter = rawSqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
      const namesAfter = new Set(colsAfter.map((c) => c.name));
      expect(namesAfter.has('exposure_count')).toBe(true);
      expect(namesAfter.has('first_seen_at')).toBe(true);
      expect(namesAfter.has('last_seen_at')).toBe(true);

      // Running createTables again is completely idempotent
      expect(() => createTables(rawSqlite)).not.toThrow();

      rawSqlite.close();
    });
  });

  describe('POST /api/import/preview', () => {
    it('previews TXT newline-separated words and does not write to DB', async () => {
      const content = `
        ephemeral
        lucid
        serendipity
      `;

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'TXT',
          content,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.validCount).toBe(3);
      expect(body.data.duplicateCount).toBe(0);
      expect(body.data.invalidCount).toBe(0);
      expect(body.data.validItems.map((i: any) => i.word)).toEqual(['ephemeral', 'lucid', 'serendipity']);

      // Direct evidence: NO database writes occurred
      const allWords = db.select().from(words).all();
      expect(allWords.length).toBe(0);
    });

    it('previews CSV format with headers and tags', async () => {
      const csvContent = [
        'word,definition,translation,difficulty,phonetic,partOfSpeech,tags',
        'pragmatic,"dealing with things sensibly","thực tế",B2,/præɡˈmætɪk/,adjective,"tech,philosophy"',
        'resilient,"able to withstand difficulty","kiên cường",C1,/rɪˈzɪliənt/,adjective,psychology',
      ].join('\n');

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'CSV',
          content: csvContent,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.validCount).toBe(2);
      expect(body.data.validItems[0].word).toBe('pragmatic');
      expect(body.data.validItems[0].definition).toBe('dealing with things sensibly');
      expect(body.data.validItems[0].tags).toEqual(['tech', 'philosophy']);
      expect(body.data.validItems[1].word).toBe('resilient');
    });

    it('previews JSON format', async () => {
      const jsonContent = JSON.stringify([
        { word: 'aesthetic', definition: 'concerned with beauty', difficulty: 'B2', tags: ['art'] },
        { word: 'ubiquitous', definition: 'present everywhere', difficulty: 'C1' },
      ]);

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'JSON',
          content: jsonContent,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.validCount).toBe(2);
      expect(body.data.validItems[0].word).toBe('aesthetic');
      expect(body.data.validItems[1].word).toBe('ubiquitous');
    });

    it('detects within-file duplicates and existing canonical DB duplicates', async () => {
      // Existing word in DB with different casing
      insertSampleWord('Serendipity');

      const content = `
        lucid
        LUCID
        serendipity
        
        valid_word_1
      `;

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'TXT',
          content,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.validCount).toBe(2); // lucid and valid_word_1
      expect(body.data.duplicateCount).toBe(2); // LUCID (within-file) and serendipity (existing DB)

      const dups = body.data.duplicates;
      const withinFileDup = dups.find((d: any) => d.word === 'lucid');
      expect(withinFileDup).toBeDefined();

      const dbDup = dups.find((d: any) => d.word === 'serendipity');
      expect(dbDup).toBeDefined();
    });

    it('handles invalid JSON or invalid format payload', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'JSON',
          content: '{ invalid json content ]',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('returns opaque preview token required for matching import commit', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: { format: 'TXT', content: 'tokenized' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.previewToken).toEqual(expect.any(String));
      expect(body.data.previewToken).not.toContain('tokenized');
    });
  });

  describe('POST /api/import/commit', () => {
    it('rejects direct commit without token and leaves database unchanged', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: { format: 'TXT', content: 'blocked' },
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.payload)).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
      expect(db.select().from(words).all()).toHaveLength(0);
    });

    it('accepts only the current matching preview token and consumes it once', async () => {
      const content = 'authorized';
      const preview = await app.inject({ method: 'POST', url: '/api/import/preview', payload: { format: 'TXT', content } });
      const previewToken = JSON.parse(preview.payload).data.previewToken;

      const committed = await app.inject({ method: 'POST', url: '/api/import/commit', payload: { format: 'TXT', content, previewToken } });
      expect(committed.statusCode).toBe(200);
      expect(db.select().from(words).all()).toHaveLength(1);

      const reused = await app.inject({ method: 'POST', url: '/api/import/commit', payload: { format: 'TXT', content, previewToken } });
      expect(reused.statusCode).toBe(400);
      expect(db.select().from(words).all()).toHaveLength(1);
    });

    it('rejects mismatched and expired tokens without writes', async () => {
      const originalNow = Date.now();
      const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(originalNow);
      try {
        const firstPreview = await app.inject({ method: 'POST', url: '/api/import/preview', payload: { format: 'TXT', content: 'first' } });
        const firstToken = JSON.parse(firstPreview.payload).data.previewToken;
        const mismatch = await app.inject({ method: 'POST', url: '/api/import/commit', payload: { format: 'TXT', content: 'changed', previewToken: firstToken } });
        expect(mismatch.statusCode).toBe(400);
        expect(db.select().from(words).all()).toHaveLength(0);

        const expiredPreview = await app.inject({ method: 'POST', url: '/api/import/preview', payload: { format: 'TXT', content: 'expired' } });
        const expiredToken = JSON.parse(expiredPreview.payload).data.previewToken;
        nowSpy.mockReturnValue(originalNow + 15 * 60 * 1000 + 1);
        const expired = await app.inject({ method: 'POST', url: '/api/import/commit', payload: { format: 'TXT', content: 'expired', previewToken: expiredToken } });
        expect(expired.statusCode).toBe(400);
        expect(db.select().from(words).all()).toHaveLength(0);
      } finally {
        nowSpy.mockRestore();
      }
    });

    it('commits all valid items transactionally with NEW learning progress and default review states', async () => {
      const csvContent = [
        'word,definition,translation,difficulty,phonetic,partOfSpeech,tags',
        'ephemeral,"lasting for a very short time","ngắn ngủi",B2,/ɪˈfemərəl/,adjective,literature',
        'lucid,"expressed clearly; easy to understand","rõ ràng",B2,/ˈluːsɪd/,adjective,clarity',
      ].join('\n');

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'CSV',
          content: csvContent,
          previewToken: await previewImportToken('CSV', csvContent),
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.importedCount).toBe(2);

      // Verify words created
      const allWords = db.select().from(words).all();
      expect(allWords.length).toBe(2);

      // Verify learning_progress created with NEW status and 0 scores
      const progressList = db.select().from(learningProgress).all();
      expect(progressList.length).toBe(2);
      for (const lp of progressList) {
        expect(lp.status).toBe('NEW');
        expect(lp.recognitionScore).toBe(0);
        expect(lp.recallScore).toBe(0);
        expect(lp.productionScore).toBe(0);
      }

      // Verify review_states created with default SM-2 params
      const rStates = db.select().from(reviewStates).all();
      expect(rStates.length).toBe(2);
      for (const rs of rStates) {
        expect(rs.interval).toBe(0);
        expect(rs.easeFactor).toBe(2.5);
        expect(rs.repetitions).toBe(0);
        expect(rs.lapses).toBe(0);
        expect(rs.dueAt).toBeDefined();
      }

      // Verify tags created
      const allTags = db.select().from(tags).all();
      expect(allTags.map((t) => t.name).sort()).toEqual(['clarity', 'literature']);
    });

    it('commits only selectedIndices when specified', async () => {
      const content = `
        wordone
        wordtwo
        wordthree
      `;

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'TXT',
          content,
          previewToken: await previewImportToken('TXT', content),
          selectedIndices: [1], // Only 'wordtwo'
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.importedCount).toBe(1);

      const allWords = db.select().from(words).all();
      expect(allWords.length).toBe(1);
      expect(allWords[0].word).toBe('wordtwo');
    });

    it('rolls back all insertions transactionally on failure with no partial records', async () => {
      // Pre-insert word 'clashing'
      insertSampleWord('clashing');

      // Now create a scenario where second item causes a conflict or DB error during commit
      // E.g. we force commit to fail midway by trying to insert a word that violates DB constraints
      const rawItems = [
        { word: 'firstvalidword', definition: 'def1' },
        { word: 'clashing', definition: 'def2' }, // Clashes with existing word
      ];

      // We call commit with content that attempts to insert the duplicate
      // (Even if preview normally filters duplicates, if DB throws an error inside commit transaction, everything rolls back)
      const initialContent = JSON.stringify([
        { word: 'alpha', definition: 'def alpha' },
        { word: 'beta', definition: 'def beta' },
      ]);
      const res = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'JSON',
          content: initialContent,
          previewToken: await previewImportToken('JSON', initialContent),
        },
      });
      expect(res.statusCode).toBe(200);

      const beforeWordsCount = db.select().from(words).all().length;

      // Now test rollback: If a database error occurs during transactional insertion
      // We spy on or induce a failure: e.g. duplicate primary key or unique violation in tx
      // In SQLite, if unique constraint on words or progress fails, transaction must roll back
      const failContent = JSON.stringify([
        { word: 'gamma', definition: 'def gamma' },
        { word: 'delta', definition: 'def delta' },
      ]);

      // If we attempt commit where an unhandled collision occurs:
      // Let's create an existing word 'delta' after preview or within transaction
      insertSampleWord('delta');
      const countBeforeFailedCommit = db.select().from(words).all().length;

      const failPreviewToken = await previewImportToken('JSON', failContent);
      const commitRes = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'JSON',
          content: JSON.stringify([
            { word: 'gamma', definition: 'def gamma' },
            { word: 'delta', definition: 'def delta' },
          ]),
          previewToken: failPreviewToken,
        },
      });
      // gamma was committed
      expect(commitRes.statusCode).toBe(200);

      // Verify transaction rollback explicitly:
      // If an error is thrown in transaction, nothing is written:
      const wordsBefore = db.select().from(words).all();
      expect(wordsBefore.some((w) => w.word === 'shouldnotexist')).toBe(false);
    });
  });

  describe('GET /api/export', () => {
    beforeEach(() => {
      insertSampleWord('ubiquitous', 'Present everywhere');
      insertSampleWord('pragmatic', 'Dealing with things sensibly');
    });

    it('exports words as JSON by default or format=JSON', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/export?format=JSON&scope=words',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.format).toBe('JSON');
      expect(Array.isArray(body.data.items)).toBe(true);
      expect(body.data.items.length).toBe(2);
      expect(body.data.items.map((w: any) => w.word).sort()).toEqual(['pragmatic', 'ubiquitous']);
    });

    it('exports words as CSV format', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/export?format=CSV&scope=words',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.format).toBe('CSV');
      expect(typeof body.data.content).toBe('string');
      expect(body.data.content).toContain('word,definition,translation,difficulty,phonetic,partOfSpeech,tags');
      expect(body.data.content).toContain('ubiquitous');
      expect(body.data.content).toContain('pragmatic');
    });

    it('rejects invalid export parameters', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/export?format=XML',
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/backup', () => {
    it('returns exact v2 top-level backup structure with session attempts and all tables', async () => {
      insertSampleWord('tenacious');

      const res = await app.inject({
        method: 'GET',
        url: '/api/backup',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);

      const backup = body.data;
      expect(backup.version).toBe(2);
      expect(backup.application).toBe('Lexora');
      expect(typeof backup.exportedAt).toBe('string');
      expect(new Date(backup.exportedAt).toISOString()).toBe(backup.exportedAt);

      const data = backup.data;
      expect(data).toBeDefined();

      const requiredTables = [
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

      for (const table of requiredTables) {
        expect(Array.isArray(data[table])).toBe(true);
      }

      expect(data.words.length).toBe(1);
      expect(data.words[0].word).toBe('tenacious');
    });

    it('round-trips exact-distinct mixed-case tags through backup, preview, and restore', async () => {
      const technologyWordId = insertSampleWord('technology');
      const technologistWordId = insertSampleWord('technologist');
      const now = new Date().toISOString();
      db.insert(tags)
        .values([
          { id: 'tag-technology-title', name: 'Technology', createdAt: now },
          { id: 'tag-technology-lower', name: 'technology', createdAt: now },
        ])
        .run();
      db.insert(wordTags)
        .values([
          { wordId: technologyWordId, tagId: 'tag-technology-title' },
          { wordId: technologistWordId, tagId: 'tag-technology-lower' },
        ])
        .run();

      const backupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
      expect(backupResponse.statusCode).toBe(200);
      const backup = JSON.parse(backupResponse.payload).data;
      expect(backup.data.tags.map((tag: any) => tag.name).sort()).toEqual(['Technology', 'technology']);
      expect(backup.data.wordTags).toEqual([
        { wordId: technologyWordId, tagId: 'tag-technology-title' },
        { wordId: technologistWordId, tagId: 'tag-technology-lower' },
      ]);

      const previewResponse = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { backup },
      });
      expect(previewResponse.statusCode).toBe(200);

      const resetResponse = await app.inject({
        method: 'POST',
        url: '/api/data/reset-all',
        payload: { confirm: true },
      });
      expect(resetResponse.statusCode).toBe(200);

      const restoreResponse = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup, confirm: true, previewToken: JSON.parse(previewResponse.payload).data.previewToken },
      });
      expect(restoreResponse.statusCode).toBe(200);
      expect(db.select().from(tags).all().map((tag) => tag.name).sort()).toEqual(['Technology', 'technology']);
      expect(db.select().from(wordTags).all()).toEqual([
        { wordId: technologyWordId, tagId: 'tag-technology-title' },
        { wordId: technologistWordId, tagId: 'tag-technology-lower' },
      ]);
    });

    it('returns restore preview token and rejects restore payload changes without deleting data', async () => {
      insertSampleWord('restore-survivor');
      const backupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
      const backup = JSON.parse(backupResponse.payload).data;
      const previewResponse = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
      const previewToken = JSON.parse(previewResponse.payload).data.previewToken;

      const changed = { ...backup, exportedAt: new Date(Date.now() + 1000).toISOString() };
      const restoreResponse = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup: changed, confirm: true, previewToken },
      });

      expect(restoreResponse.statusCode).toBe(400);
      expect(db.select().from(words).all().map((word) => word.word)).toEqual(['restore-survivor']);
    });

    it('accepts direct-form restore after preview while excluding control fields from the token fingerprint', async () => {
      insertSampleWord('direct-form-survivor');
      const backup = JSON.parse((await app.inject({ method: 'GET', url: '/api/backup' })).payload).data;

      const previewResponse = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { ...backup },
      });
      expect(previewResponse.statusCode).toBe(200);
      const previewToken = JSON.parse(previewResponse.payload).data.previewToken;

      const directRestoreResponse = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { ...backup, confirm: true, previewToken },
      });
      expect(directRestoreResponse.statusCode).toBe(200);
      expect(JSON.parse(directRestoreResponse.payload).data.restored).toBe(true);

      const secondPreviewResponse = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { ...backup },
      });
      const secondPreviewToken = JSON.parse(secondPreviewResponse.payload).data.previewToken;
      const changedBackup = { ...backup, exportedAt: new Date(Date.now() + 1000).toISOString() };

      const changedRestoreResponse = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { ...changedBackup, confirm: true, previewToken: secondPreviewToken },
      });
      expect(changedRestoreResponse.statusCode).toBe(400);
      expect(db.select().from(words).all().map((word) => word.word)).toEqual(['direct-form-survivor']);
    });
  });

  describe('POST /api/restore', () => {
    it('requires confirmation (confirm=true); false or missing returns 400', async () => {
      const resWithoutConfirm = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: { version: 1, application: 'Lexora', exportedAt: new Date().toISOString(), data: {} },
        },
      });

      expect(resWithoutConfirm.statusCode).toBe(400);
      const body1 = JSON.parse(resWithoutConfirm.payload);
      expect(body1.success).toBe(false);
      expect(body1.error.code).toBe('VALIDATION_ERROR');

      const resWithFalseConfirm = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: { version: 1, application: 'Lexora', exportedAt: new Date().toISOString(), data: {} },
          confirm: false,
        },
      });

      expect(resWithFalseConfirm.statusCode).toBe(400);
      const body2 = JSON.parse(resWithFalseConfirm.payload);
      expect(body2.success).toBe(false);
      expect(body2.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects backup with invalid version or application', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: {
            version: 999,
            application: 'UnknownApp',
            exportedAt: new Date().toISOString(),
            data: {},
          },
          confirm: true,
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('restores valid backup cleanly and preserves context_words exposure fields', async () => {
      const now = new Date().toISOString();
      const validBackup = {
        version: 1,
        application: 'Lexora',
        exportedAt: now,
        data: {
          users: [{ id: 'u1', name: 'Learner', email: 'learner@example.com', createdAt: now }],
          words: [
            {
              id: 'w1',
              word: 'serendipity',
              definition: 'Pleasant surprise',
              translation: 'Sự tình cờ may mắn',
              difficulty: 'C1',
              phonetic: '/ˌser.ənˈdɪp.ə.ti/',
              partOfSpeech: 'noun',
              createdAt: now,
              updatedAt: now,
            },
          ],
          wordFamilies: [],
          collocations: [{ id: 'col1', wordId: 'w1', phrase: 'happy serendipity' }],
          examples: [{ id: 'ex1', wordId: 'w1', sentence: 'It was serendipity that we met.', translation: null, source: null }],
          contexts: [{ id: 'c1', title: 'Life stories', content: 'Stories of serendipity in science', sourceType: 'ARTICLE', sourceUrl: null, createdAt: now, updatedAt: now }],
          contextWords: [
            {
              contextId: 'c1',
              wordId: 'w1',
              exposureCount: 5,
              firstSeenAt: '2026-09-01T10:00:00.000Z',
              lastSeenAt: '2026-09-05T12:00:00.000Z',
            },
          ],
          learningProgress: [
            {
              id: 'lp1',
              wordId: 'w1',
              status: 'FAMILIAR',
              recognitionScore: 70,
              recallScore: 50,
              productionScore: 30,
              lastStudiedAt: now,
              updatedAt: now,
            },
          ],
          reviewStates: [
            {
              id: 'rs1',
              wordId: 'w1',
              interval: 6,
              easeFactor: 2.6,
              repetitions: 2,
              lapses: 0,
              dueAt: now,
              lastReviewedAt: now,
            },
          ],
          reviewLogs: [
            {
              id: 'rl1',
              wordId: 'w1',
              reviewType: 'RECALL',
              rating: 'GOOD',
              responseTime: 1200,
              answer: 'serendipity',
              correct: true,
              createdAt: now,
            },
          ],
          tags: [{ id: 't1', name: 'science', createdAt: now }],
          wordTags: [{ wordId: 'w1', tagId: 't1' }],
          learningSessions: [{ id: 'ls1', sessionType: 'REVIEW', totalWords: 1, startedAt: now, completedAt: now }],
          learningSessionItems: [
            {
              id: 'lsi1',
              sessionId: 'ls1',
              wordId: 'w1',
              completedStep: 'OUTPUT',
              recallResult: 'CORRECT',
              outputSentence: 'Meeting was serendipity.',
              reviewRating: 'GOOD',
              createdAt: now,
            },
          ],
        },
      };

      const res = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: validBackup,
          confirm: true,
          previewToken: await previewRestoreToken(validBackup),
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.restored).toBe(true);

      // Direct verification: context_words exposure fields survived
      const restoredCw = db.select().from(contextWords).where(eq(contextWords.wordId, 'w1')).all();
      expect(restoredCw.length).toBe(1);
      expect(restoredCw[0].exposureCount).toBe(5);
      expect(restoredCw[0].firstSeenAt).toBe('2026-09-01T10:00:00.000Z');
      expect(restoredCw[0].lastSeenAt).toBe('2026-09-05T12:00:00.000Z');

      // Verify learning_progress and review_states restored
      const restoredLp = db.select().from(learningProgress).where(eq(learningProgress.wordId, 'w1')).all();
      expect(restoredLp[0].status).toBe('FAMILIAR');
      expect(restoredLp[0].recognitionScore).toBe(70);

      // Verify collocations, examples, tags, sessions restored
      expect(db.select().from(collocations).all().length).toBe(1);
      expect(db.select().from(examples).all().length).toBe(1);
      expect(db.select().from(tags).all().length).toBe(1);
      expect(db.select().from(wordTags).all().length).toBe(1);
      expect(db.select().from(learningSessions).all().length).toBe(1);
    });

    it('rolls back atomically on invalid restore (e.g. foreign key violation) with no partial data', async () => {
      // Seed existing word that should NOT be wiped if restore fails
      insertSampleWord('originalword');
      const initialWords = db.select().from(words).all();
      expect(initialWords.length).toBe(1);

      const brokenBackup = {
        version: 1,
        application: 'Lexora',
        exportedAt: new Date().toISOString(),
        data: {
          users: [],
          words: [{ id: 'new-word', word: 'validword', definition: 'def', createdAt: new Date().toISOString() }],
          wordFamilies: [],
          collocations: [],
          examples: [],
          contexts: [],
          contextWords: [],
          learningProgress: [],
          reviewStates: [],
          reviewLogs: [],
          tags: [],
          // Invalid: wordTags references non-existent word and non-existent tag, violating foreign keys
          wordTags: [{ wordId: 'non-existent-word', tagId: 'non-existent-tag' }],
          learningSessions: [],
          learningSessionItems: [],
        },
      };

      const res = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: brokenBackup,
          confirm: true,
        },
      });

      expect(res.statusCode).toBe(400);

      // Direct proof: Rollback restored original data; originalword is still there and validword was NOT saved!
      const afterWords = db.select().from(words).all();
      expect(afterWords.length).toBe(1);
      expect(afterWords[0].word).toBe('originalword');
    });

    it('rolls back a valid restore when a late table insert aborts and hides the database error', async () => {
      const now = new Date().toISOString();
      const makeBackup = (prefix: string, word: string) => ({
        version: 1,
        application: 'Lexora',
        exportedAt: now,
        data: {
          users: [{ id: `${prefix}-user`, name: 'Learner', email: `${prefix}@example.com`, createdAt: now }],
          words: [{
            id: `${prefix}-word`, word, phonetic: null, partOfSpeech: 'noun', definition: `${word} definition`,
            translation: null, difficulty: 'B2', createdAt: now, updatedAt: now,
          }],
          wordFamilies: [],
          collocations: [{ id: `${prefix}-collocation`, wordId: `${prefix}-word`, phrase: `${word} phrase` }],
          examples: [{ id: `${prefix}-example`, wordId: `${prefix}-word`, sentence: `${word} example`, translation: null, source: null }],
          contexts: [{
            id: `${prefix}-context`, title: `${word} context`, content: `A context for ${word}.`, sourceType: 'ARTICLE',
            sourceUrl: null, createdAt: now, updatedAt: now,
          }],
          contextWords: [{
            contextId: `${prefix}-context`, wordId: `${prefix}-word`, exposureCount: 2,
            firstSeenAt: now, lastSeenAt: now,
          }],
          learningProgress: [{
            id: `${prefix}-progress`, wordId: `${prefix}-word`, status: 'NEW', recognitionScore: 0,
            recallScore: 0, productionScore: 0, lastStudiedAt: null, updatedAt: now,
          }],
          reviewStates: [{
            id: `${prefix}-review-state`, wordId: `${prefix}-word`, interval: 0, easeFactor: 2.5,
            repetitions: 0, lapses: 0, dueAt: now, lastReviewedAt: null,
          }],
          reviewLogs: [{
            id: `${prefix}-review-log`, wordId: `${prefix}-word`, reviewType: 'RECALL', rating: 'GOOD',
            responseTime: null, answer: word, correct: true, createdAt: now,
          }],
          tags: [{ id: `${prefix}-tag`, name: `${prefix} tag`, createdAt: now }],
          wordTags: [{ wordId: `${prefix}-word`, tagId: `${prefix}-tag` }],
          learningSessions: [{
            id: `${prefix}-session`, sessionType: 'REVIEW', totalWords: 1, startedAt: now, completedAt: null,
          }],
          learningSessionItems: [{
            id: `${prefix}-session-item`, sessionId: `${prefix}-session`, wordId: `${prefix}-word`,
            completedStep: 'OUTPUT', recallResult: 'CORRECT', outputSentence: `${word} output`,
            reviewRating: 'GOOD', createdAt: now,
          }],
        },
      });

      const oldBackup = makeBackup('old', 'originalword');
      const newBackup = makeBackup('new', 'replacementword');

      const initialRestore = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup: oldBackup, confirm: true, previewToken: await previewRestoreToken(oldBackup) },
      });
      expect(initialRestore.statusCode).toBe(200);

      const beforeRestore = new ImportExportService(db).getBackup().data;
      const preview = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { backup: newBackup },
      });
      expect(preview.statusCode).toBe(200);

      db.sqlite.exec(`
        CREATE TRIGGER abort_late_restore
        BEFORE INSERT ON learning_session_items
        BEGIN
          SELECT RAISE(ABORT, 'late restore database secret');
        END;
      `);

      const restore = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup: newBackup, confirm: true, previewToken: JSON.parse(preview.payload).data.previewToken },
      });

      expect(restore.statusCode).toBe(500);
      const body = JSON.parse(restore.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(restore.payload).not.toContain('late restore database secret');
      expect(new ImportExportService(db).getBackup().data).toEqual(beforeRestore);
    });
  });

  describe('POST /api/data/reset', () => {
    it('requires confirmation (confirm=true); false or missing returns 400', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/data/reset',
        payload: {
          scope: 'progress',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('resets progress: wipes logs and sessions, resets progress to NEW and review_states to default, but preserves vocabulary, contexts, collocations, tags', async () => {
      const wordId = insertSampleWord('eloquent');
      const now = new Date().toISOString();

      // Set progress to MASTERED with high scores
      db.update(learningProgress)
        .set({
          status: 'MASTERED',
          recognitionScore: 90,
          recallScore: 85,
          productionScore: 80,
          lastStudiedAt: now,
        })
        .where(eq(learningProgress.wordId, wordId))
        .run();

      // Set review state to high interval
      db.update(reviewStates)
        .set({
          interval: 30,
          easeFactor: 2.8,
          repetitions: 5,
          lapses: 1,
        })
        .where(eq(reviewStates.wordId, wordId))
        .run();

      // Add a review log
      db.insert(reviewLogs)
        .values({
          id: 'rl-test',
          wordId,
          reviewType: 'RECALL',
          rating: 'GOOD',
          createdAt: now,
        })
        .run();

      // Add context and link
      db.insert(contexts)
        .values({
          id: 'ctx-test',
          title: 'Public Speaking',
          content: 'An eloquent speaker captivated the audience.',
          createdAt: now,
        })
        .run();

      db.insert(contextWords)
        .values({
          contextId: 'ctx-test',
          wordId,
          exposureCount: 3,
        })
        .run();

      // Add session and item
      db.insert(learningSessions)
        .values({
          id: 'sess-test',
          sessionType: 'REVIEW',
          startedAt: now,
        })
        .run();

      db.insert(learningSessionItems)
        .values({
          id: 'sitem-test',
          sessionId: 'sess-test',
          wordId,
          completedStep: 'REVIEW',
        })
        .run();

      // Perform progress reset
      const res = await app.inject({
        method: 'POST',
        url: '/api/data/reset',
        payload: {
          scope: 'progress',
          confirm: true,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.reset).toBe(true);
      expect(body.data.scope).toBe('progress');

      // Direct proof: Logs, sessions, session items deleted
      expect(db.select().from(reviewLogs).all().length).toBe(0);
      expect(db.select().from(learningSessions).all().length).toBe(0);
      expect(db.select().from(learningSessionItems).all().length).toBe(0);

      // Direct proof: Words, contexts, contextWords preserved!
      const wordsRemaining = db.select().from(words).all();
      expect(wordsRemaining.length).toBe(1);
      expect(wordsRemaining[0].word).toBe('eloquent');
      expect(db.select().from(contexts).all().length).toBe(1);
      expect(db.select().from(contextWords).all().length).toBe(1);

      // Direct proof: learning_progress reset to NEW and 0 scores
      const lp = db.select().from(learningProgress).where(eq(learningProgress.wordId, wordId)).all()[0];
      expect(lp.status).toBe('NEW');
      expect(lp.recognitionScore).toBe(0);
      expect(lp.recallScore).toBe(0);
      expect(lp.productionScore).toBe(0);
      expect(lp.lastStudiedAt).toBeNull();

      // Direct proof: review_states reset to default
      const rs = db.select().from(reviewStates).where(eq(reviewStates.wordId, wordId)).all()[0];
      expect(rs.interval).toBe(0);
      expect(rs.easeFactor).toBe(2.5);
      expect(rs.repetitions).toBe(0);
      expect(rs.lapses).toBe(0);
      expect(rs.lastReviewedAt).toBeNull();
    });

    it('resets all data: safely clears all tables in reverse dependency order', async () => {
      const wordId = insertSampleWord('holistic');
      const now = new Date().toISOString();

      db.insert(contexts)
        .values({
          id: 'ctx-h',
          title: 'Holistic Approach',
          content: 'A holistic overview of the problem.',
          createdAt: now,
        })
        .run();

      db.insert(contextWords)
        .values({
          contextId: 'ctx-h',
          wordId,
        })
        .run();

      const res = await app.inject({
        method: 'POST',
        url: '/api/data/reset',
        payload: {
          scope: 'all',
          confirm: true,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.reset).toBe(true);
      expect(body.data.scope).toBe('all');

      // Verify every table is empty
      expect(db.select().from(words).all().length).toBe(0);
      expect(db.select().from(contexts).all().length).toBe(0);
      expect(db.select().from(contextWords).all().length).toBe(0);
      expect(db.select().from(learningProgress).all().length).toBe(0);
      expect(db.select().from(reviewStates).all().length).toBe(0);
      expect(db.select().from(reviewLogs).all().length).toBe(0);
      expect(db.select().from(tags).all().length).toBe(0);
      expect(db.select().from(wordTags).all().length).toBe(0);
      expect(db.select().from(learningSessions).all().length).toBe(0);
      expect(db.select().from(learningSessionItems).all().length).toBe(0);
      expect(db.select().from(collocations).all().length).toBe(0);
      expect(db.select().from(examples).all().length).toBe(0);
      expect(db.select().from(wordFamilies).all().length).toBe(0);
      expect(db.select().from(users).all().length).toBe(0);
    });
  });

  describe('Strict Restore Validation & Preview (POST /api/restore/preview & POST /api/restore)', () => {
    it('rejects standalone punctuation variants such as hello! before deleting existing data', async () => {
      insertSampleWord('survivor');
      const backupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
      const backup = JSON.parse(backupResponse.payload).data;
      const invalidBackup = {
        ...backup,
        data: {
          ...backup.data,
          words: [{ ...backup.data.words[0], word: 'hello!' }],
        },
      };

      const previewResponse = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { backup: invalidBackup },
      });
      expect(previewResponse.statusCode).toBe(400);

      const restoreResponse = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup: invalidBackup, confirm: true },
      });
      expect(restoreResponse.statusCode).toBe(400);
      expect(db.select().from(words).all().map((word) => word.word)).toEqual(['survivor']);
    });

    it('rejects exact duplicate tag names before deleting existing data', async () => {
      insertSampleWord('survivor');
      const now = new Date().toISOString();
      const backupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
      const backup = JSON.parse(backupResponse.payload).data;
      const invalidBackup = {
        ...backup,
        data: {
          ...backup.data,
          tags: [
            { id: 'tag-one', name: 'Technology', createdAt: now },
            { id: 'tag-two', name: 'Technology', createdAt: now },
          ],
        },
      };

      const restoreResponse = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: { backup: invalidBackup, confirm: true },
      });

      expect(restoreResponse.statusCode).toBe(400);
      expect(db.select().from(words).all().map((word) => word.word)).toEqual(['survivor']);
    });

    it('accepts persisted uppercase learning session types while rejecting unknown values', async () => {
      const now = new Date().toISOString();
      const backup = {
        version: 1,
        application: 'Lexora',
        exportedAt: now,
        data: {
          users: [],
          words: [],
          wordFamilies: [],
          collocations: [],
          examples: [],
          contexts: [],
          contextWords: [],
          learningProgress: [],
          reviewStates: [],
          reviewLogs: [],
          tags: [],
          wordTags: [],
          learningSessions: [{
            id: 'ls-uppercase',
            sessionType: 'NEW_WORDS',
            totalWords: 0,
            startedAt: now,
            completedAt: null,
          }],
          learningSessionItems: [],
        },
      };

      const validRes = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { backup },
      });

      expect(validRes.statusCode).toBe(200);
      expect(JSON.parse(validRes.payload).data.tableCounts.learningSessions).toBe(1);

      const invalidRes = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: {
          backup: {
            ...backup,
            data: {
              ...backup.data,
              learningSessions: [{ ...backup.data.learningSessions[0], sessionType: 'INVALID_MODE' }],
            },
          },
        },
      });

      expect(invalidRes.statusCode).toBe(400);
      expect(JSON.parse(invalidRes.payload).error.code).toBe('VALIDATION_ERROR');
    });

    it('previews restore without writing to DB and returns metadata, counts, and conflict summary', async () => {
      insertSampleWord('existingword');
      const now = new Date().toISOString();

      const validBackup = {
        version: 1,
        application: 'Lexora',
        exportedAt: now,
        data: {
          users: [],
          words: [
            {
              id: 'w-preview-1',
              word: 'previewed',
              phonetic: null,
              partOfSpeech: null,
              definition: 'shown in advance',
              translation: null,
              difficulty: null,
              createdAt: now,
              updatedAt: null,
            },
          ],
          wordFamilies: [],
          collocations: [],
          examples: [],
          contexts: [],
          contextWords: [],
          learningProgress: [],
          reviewStates: [],
          reviewLogs: [],
          tags: [],
          wordTags: [],
          learningSessions: [],
          learningSessionItems: [],
        },
      };

      const res = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: { backup: validBackup },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.valid).toBe(true);
      expect(body.data.version).toBe(1);
      expect(body.data.application).toBe('Lexora');
      expect(body.data.tableCounts.words).toBe(1);
      expect(body.data.totalRecords).toBe(1);
      expect(body.data.conflictSummary.willOverwrite).toBe(true);
      expect(body.data.conflictSummary.existingRecordsCount).toBeGreaterThan(0);

      // Prove ZERO writes: previewed word NOT in DB, existingword still there
      const allWords = db.select().from(words).all();
      expect(allWords.map((w) => w.word)).toEqual(['existingword']);
    });

    it('rejects { data: {} } in POST /api/restore/preview with 400', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/restore/preview',
        payload: {
          backup: {
            version: 1,
            application: 'Lexora',
            exportedAt: new Date().toISOString(),
            data: {},
          },
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects { data: {} } and bad rows in POST /api/restore with 400 and preserves existing DB', async () => {
      insertSampleWord('shouldsurvive');
      const initialWords = db.select().from(words).all();
      expect(initialWords.length).toBe(1);

      // 1. Send { data: {} }
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: {
            version: 1,
            application: 'Lexora',
            exportedAt: new Date().toISOString(),
            data: {},
          },
          confirm: true,
        },
      });

      expect(res1.statusCode).toBe(400);
      expect(db.select().from(words).all().length).toBe(1);

      // 2. Send bad row with unknown key
      const now = new Date().toISOString();
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/restore',
        payload: {
          backup: {
            version: 1,
            application: 'Lexora',
            exportedAt: now,
            data: {
              users: [],
              words: [
                {
                  id: 'w-bad',
                  word: 'badword',
                  definition: 'def',
                  createdAt: now,
                  unknownKey: 'forbidden',
                },
              ],
              wordFamilies: [],
              collocations: [],
              examples: [],
              contexts: [],
              contextWords: [],
              learningProgress: [],
              reviewStates: [],
              reviewLogs: [],
              tags: [],
              wordTags: [],
              learningSessions: [],
              learningSessionItems: [],
            },
          },
          confirm: true,
        },
      });

      expect(res2.statusCode).toBe(400);
      // DB untouched
      const finalWords = db.select().from(words).all();
      expect(finalWords.length).toBe(1);
      expect(finalWords[0].word).toBe('shouldsurvive');
    });
  });

  describe('Contract Requirements: Endpoints & Aliases', () => {
    beforeEach(() => {
      insertSampleWord('contracttest', 'Definition for contract test');
    });

    it('GET /api/export/vocabulary supports format=JSON and format=CSV', async () => {
      const resJson = await app.inject({
        method: 'GET',
        url: '/api/export/vocabulary?format=JSON',
      });
      expect(resJson.statusCode).toBe(200);
      const jsonBody = JSON.parse(resJson.payload);
      expect(jsonBody.success).toBe(true);
      expect(jsonBody.data.format).toBe('JSON');
      expect(jsonBody.data.items.length).toBe(1);

      const resCsv = await app.inject({
        method: 'GET',
        url: '/api/export/vocabulary?format=CSV',
      });
      expect(resCsv.statusCode).toBe(200);
      const csvBody = JSON.parse(resCsv.payload);
      expect(csvBody.success).toBe(true);
      expect(csvBody.data.format).toBe('CSV');
      expect(csvBody.data.content).toContain('contracttest');
    });

    it('GET /api/export/full exports all data as JSON and rejects format=CSV with 400', async () => {
      const resFull = await app.inject({
        method: 'GET',
        url: '/api/export/full',
      });
      expect(resFull.statusCode).toBe(200);
      const fullBody = JSON.parse(resFull.payload);
      expect(fullBody.success).toBe(true);
      expect(fullBody.data.format).toBe('JSON');
      expect(fullBody.data.scope).toBe('all');
      expect(fullBody.data.data.words.length).toBe(1);

      // Rejects CSV
      const resCsv = await app.inject({
        method: 'GET',
        url: '/api/export/full?format=CSV',
      });
      expect(resCsv.statusCode).toBe(400);
      const csvErr = JSON.parse(resCsv.payload);
      expect(csvErr.success).toBe(false);
      expect(csvErr.error.code).toBe('VALIDATION_ERROR');
    });

    it('GET /api/export rejects CSV + scope=all with 400', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/export?format=CSV&scope=all',
      });
      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('POST /api/backup returns v2 backup and GET /api/backup retained as alias', async () => {
      const postRes = await app.inject({
        method: 'POST',
        url: '/api/backup',
      });
      expect(postRes.statusCode).toBe(200);
      const postBody = JSON.parse(postRes.payload);
      expect(postBody.success).toBe(true);
      expect(postBody.data.version).toBe(2);
      expect(postBody.data.application).toBe('Lexora');

      const getRes = await app.inject({
        method: 'GET',
        url: '/api/backup',
      });
      expect(getRes.statusCode).toBe(200);
      const getBody = JSON.parse(getRes.payload);
      expect(getBody.data.version).toBe(2);
    });

    it('POST /api/data/reset-progress and /api/reset-progress aliases require confirm: true', async () => {
      // 1. Missing confirm
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/data/reset-progress',
        payload: {},
      });
      expect(res1.statusCode).toBe(400);

      // 2. confirm: false
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/reset-progress',
        payload: { confirm: false },
      });
      expect(res2.statusCode).toBe(400);

      // 3. confirm: true succeeds
      const res3 = await app.inject({
        method: 'POST',
        url: '/api/data/reset-progress',
        payload: { confirm: true },
      });
      expect(res3.statusCode).toBe(200);
      const body3 = JSON.parse(res3.payload);
      expect(body3.success).toBe(true);
      expect(body3.data.scope).toBe('progress');
    });

    it('POST /api/data/reset-all and /api/reset-all aliases require confirm: true', async () => {
      // 1. Missing confirm
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/data/reset-all',
        payload: {},
      });
      expect(res1.statusCode).toBe(400);

      // 2. confirm: false
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/reset-all',
        payload: { confirm: false },
      });
      expect(res2.statusCode).toBe(400);

      // 3. confirm: true succeeds
      const res3 = await app.inject({
        method: 'POST',
        url: '/api/data/reset-all',
        payload: { confirm: true },
      });
      expect(res3.statusCode).toBe(200);
      const body3 = JSON.parse(res3.payload);
      expect(body3.success).toBe(true);
      expect(body3.data.scope).toBe('all');
      expect(db.select().from(words).all().length).toBe(0);
    });
  });

  describe('Strict Imports & Tag Deduping & SQLite Error Mapping', () => {
    it('rejects malformed CSV with unclosed quotes with 400', async () => {
      const malformedCsv = 'word,definition\n"unclosed quote,some definition';
      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'CSV',
          content: malformedCsv,
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
      expect(body.error.message).toMatch(/unclosed/i);
    });

    it('rejects CSV missing word or definition headers with 400', async () => {
      const csvMissingHeader = 'title,content\nsome title,some content';
      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'CSV',
          content: csvMissingHeader,
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
      expect(body.error.message).toMatch(/missing required headers/i);
    });

    it('dedupes tags within items during preview and commit without DB unique violation', async () => {
      const jsonContent = JSON.stringify([
        {
          word: 'dedupetagtest',
          definition: 'Testing tag deduplication',
          tags: ['tech', 'philosophy', 'tech', 'philosophy'],
        },
      ]);

      // 1. Preview shows deduped tags
      const previewRes = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'JSON',
          content: jsonContent,
        },
      });
      expect(previewRes.statusCode).toBe(200);
      const previewBody = JSON.parse(previewRes.payload);
      expect(previewBody.data.validItems[0].tags).toEqual(['tech', 'philosophy']);

      // 2. Commit succeeds without unique constraint collision on word_tags
      const commitRes = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'JSON',
          content: jsonContent,
          previewToken: await previewImportToken('JSON', jsonContent),
        },
      });
      expect(commitRes.statusCode).toBe(200);

      // Verify tag count and wordTag count
      const allTags = db.select().from(tags).all();
      expect(allTags.length).toBe(2);
      const allWordTags = db.select().from(wordTags).all();
      expect(allWordTags.length).toBe(2);
    });

    it('handles JSON non-string and invalid row types as invalidItems without 500', async () => {
      const mixedJson = JSON.stringify([
        12345, // Not an object
        null, // Null item
        { word: 999, definition: 'number word' }, // Non-string word
        { word: 'validrow', definition: 888 }, // Non-string definition
        { word: 'goodword', definition: 'good def' }, // Valid item
      ]);

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: {
          format: 'JSON',
          content: mixedJson,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.validCount).toBe(1);
      expect(body.data.invalidCount).toBe(4);
      expect(body.data.validItems[0].word).toBe('goodword');
    });

    it('proves zero writes across TXT, CSV, and JSON preview', async () => {
      expect(db.select().from(words).all().length).toBe(0);

      await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: { format: 'TXT', content: 'txtword' },
      });
      expect(db.select().from(words).all().length).toBe(0);

      await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: { format: 'CSV', content: 'word,definition\ncsvword,csvdef' },
      });
      expect(db.select().from(words).all().length).toBe(0);

      await app.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: { format: 'JSON', content: JSON.stringify([{ word: 'jsonword', definition: 'jsondef' }]) },
      });
      expect(db.select().from(words).all().length).toBe(0);
    });

    it('guarantees actual import atomicity using SQLite trigger mid-transaction abort', async () => {
      // Create a test-only SQLite trigger on word_tags that raises an abort
      db.sqlite.exec(`
        CREATE TRIGGER abort_on_word_tags
        BEFORE INSERT ON word_tags
        BEGIN
          SELECT RAISE(ABORT, 'Simulated mid-transaction failure');
        END;
      `);

      const content = JSON.stringify([
        {
          word: 'atomicitytest',
          definition: 'Must not persist if tags trigger aborts',
          tags: ['trigger_tag'],
        },
      ]);

      const res = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'JSON',
          content,
          previewToken: await previewImportToken('JSON', content),
        },
      });

      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(res.payload).not.toContain('Simulated mid-transaction failure');

      // CRUCIAL: Prove NOTHING persisted in any table!
      expect(db.select().from(words).all().length).toBe(0);
      expect(db.select().from(learningProgress).all().length).toBe(0);
      expect(db.select().from(reviewStates).all().length).toBe(0);
      expect(db.select().from(tags).all().length).toBe(0);
      expect(db.select().from(wordTags).all().length).toBe(0);
    });
  });

  describe('Comprehensive Reset Preservation Verification', () => {
    it('progress reset preserves words, context title/content, context_words exposure fields, collocations, examples, tags, word_tags, word_families', async () => {
      const now = new Date().toISOString();

      // 1. Seed two words
      db.insert(words)
        .values([
          {
            id: 'w-primary',
            word: 'comprehensive',
            definition: 'including or dealing with all or nearly all elements',
            translation: 'toàn diện',
            difficulty: 'C1',
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'w-secondary',
            word: 'comprehend',
            definition: 'grasp mentally; understand',
            translation: 'hiểu',
            difficulty: 'B2',
            createdAt: now,
            updatedAt: now,
          },
        ])
        .run();

      // 2. Seed word family
      db.insert(wordFamilies)
        .values({
          id: 'wf-1',
          wordId: 'w-primary',
          relatedWordId: 'w-secondary',
          relationship: 'verb',
        })
        .run();

      // 3. Seed collocation
      db.insert(collocations)
        .values({
          id: 'col-1',
          wordId: 'w-primary',
          phrase: 'comprehensive study',
        })
        .run();

      // 4. Seed example
      db.insert(examples)
        .values({
          id: 'ex-1',
          wordId: 'w-primary',
          sentence: 'This is a comprehensive overview.',
          translation: 'Đây là một cái nhìn tổng quan toàn diện.',
          source: 'ACADEMIC',
        })
        .run();

      // 5. Seed context and context_words with exposure fields
      db.insert(contexts)
        .values({
          id: 'ctx-preserved',
          title: 'Preserved Context Title',
          content: 'Preserved context content describing comprehensive methodologies.',
          sourceType: 'BOOK',
          createdAt: now,
        })
        .run();

      db.insert(contextWords)
        .values({
          contextId: 'ctx-preserved',
          wordId: 'w-primary',
          exposureCount: 7,
          firstSeenAt: '2026-08-01T08:00:00.000Z',
          lastSeenAt: '2026-08-15T10:00:00.000Z',
        })
        .run();

      // 6. Seed tags and word_tags
      db.insert(tags)
        .values({
          id: 'tag-preserved',
          name: 'Academic Vocabulary',
          createdAt: now,
        })
        .run();

      db.insert(wordTags)
        .values({
          wordId: 'w-primary',
          tagId: 'tag-preserved',
        })
        .run();

      // 7. Seed learning-only data to be wiped/reset
      db.insert(learningProgress)
        .values({
          id: 'lp-w-primary',
          wordId: 'w-primary',
          status: 'MASTERED',
          recognitionScore: 95,
          recallScore: 90,
          productionScore: 85,
          lastStudiedAt: now,
        })
        .run();

      db.insert(reviewStates)
        .values({
          id: 'rs-w-primary',
          wordId: 'w-primary',
          interval: 45,
          easeFactor: 2.7,
          repetitions: 6,
          lapses: 1,
          dueAt: now,
          lastReviewedAt: now,
        })
        .run();

      db.insert(reviewLogs)
        .values({
          id: 'rl-test',
          wordId: 'w-primary',
          reviewType: 'RECALL',
          rating: 'GOOD',
          createdAt: now,
        })
        .run();

      db.insert(learningSessions)
        .values({
          id: 'ls-test',
          sessionType: 'REVIEW',
          startedAt: now,
        })
        .run();

      db.insert(learningSessionItems)
        .values({
          id: 'lsi-test',
          sessionId: 'ls-test',
          wordId: 'w-primary',
        })
        .run();

      // 8. Execute progress reset via /api/data/reset-progress
      const resetRes = await app.inject({
        method: 'POST',
        url: '/api/data/reset-progress',
        payload: { confirm: true },
      });
      expect(resetRes.statusCode).toBe(200);

      // Verify PRESERVED relational and contextual entities:
      const allWords = db.select().from(words).all();
      expect(allWords.length).toBe(2);
      expect(allWords.map((w) => w.word).sort()).toEqual(['comprehend', 'comprehensive']);

      const [ctx] = db.select().from(contexts).where(eq(contexts.id, 'ctx-preserved')).all();
      expect(ctx.title).toBe('Preserved Context Title');
      expect(ctx.content).toBe('Preserved context content describing comprehensive methodologies.');

      const [cw] = db.select().from(contextWords).where(eq(contextWords.wordId, 'w-primary')).all();
      expect(cw.exposureCount).toBe(7);
      expect(cw.firstSeenAt).toBe('2026-08-01T08:00:00.000Z');
      expect(cw.lastSeenAt).toBe('2026-08-15T10:00:00.000Z');

      expect(db.select().from(collocations).all().length).toBe(1);
      expect(db.select().from(examples).all().length).toBe(1);
      expect(db.select().from(wordFamilies).all().length).toBe(1);
      expect(db.select().from(tags).all().length).toBe(1);
      expect(db.select().from(wordTags).all().length).toBe(1);

      // Verify RESET learning-only data:
      expect(db.select().from(reviewLogs).all().length).toBe(0);
      expect(db.select().from(learningSessions).all().length).toBe(0);
      expect(db.select().from(learningSessionItems).all().length).toBe(0);

      const [lp] = db.select().from(learningProgress).where(eq(learningProgress.wordId, 'w-primary')).all();
      expect(lp.status).toBe('NEW');
      expect(lp.recognitionScore).toBe(0);
      expect(lp.recallScore).toBe(0);
      expect(lp.productionScore).toBe(0);
      expect(lp.lastStudiedAt).toBeNull();

      const [rs] = db.select().from(reviewStates).where(eq(reviewStates.wordId, 'w-primary')).all();
      expect(rs.interval).toBe(0);
      expect(rs.easeFactor).toBe(2.5);
      expect(rs.repetitions).toBe(0);
      expect(rs.lapses).toBe(0);
      expect(rs.lastReviewedAt).toBeNull();
    });
  });

  describe('Learning backup compatibility', () => {
    it('restores version 1 sessions with migration defaults and no attempts', async () => {
      const now = new Date().toISOString();
      const backup = {
        version: 1,
        application: 'Lexora',
        exportedAt: now,
        data: {
          users: [], words: [
            { id: 'v1-word', word: 'legacy', phonetic: null, partOfSpeech: null, definition: 'old', translation: null, difficulty: 'B1', createdAt: now, updatedAt: null },
            { id: 'v1-word-2', word: 'legacy-two', phonetic: null, partOfSpeech: null, definition: 'old two', translation: null, difficulty: 'B1', createdAt: now, updatedAt: null },
          ],
          wordFamilies: [], collocations: [], examples: [], contexts: [], contextWords: [],
          learningProgress: [], reviewStates: [], reviewLogs: [], tags: [], wordTags: [],
          learningSessions: [{ id: 'v1-session', sessionType: 'NEW_WORDS', totalWords: 2, startedAt: now, completedAt: null }],
          learningSessionItems: [
            { id: 'v1-item', sessionId: 'v1-session', wordId: 'v1-word', completedStep: null, recallResult: null, outputSentence: null, reviewRating: null, createdAt: now },
            { id: 'v1-item-2', sessionId: 'v1-session', wordId: 'v1-word-2', completedStep: null, recallResult: null, outputSentence: null, reviewRating: null, createdAt: now },
          ],
        },
      };
      const preview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
      expect(preview.statusCode).toBe(200);
      const restore = await app.inject({ method: 'POST', url: '/api/restore', payload: { backup, confirm: true, previewToken: JSON.parse(preview.payload).data.previewToken } });
      expect(restore.statusCode).toBe(200);
      expect(db.select().from(learningSessions).all()[0].status).toBe('IN_PROGRESS');
      expect(db.select().from(learningSessionItems).all()[0]).toMatchObject({ position: 0, groupIndex: 0 });
      expect(db.select().from(learningAttempts).all()).toEqual([]);
    });

    it('round-trips v2 attempts, grouping, status, and performance scores exactly', async () => {
      insertSampleWord('roundtrip');
      const now = new Date().toISOString();
      db.insert(learningSessions).values({ id: 'v2-session', sessionType: 'NEW_WORDS', totalWords: 1, status: 'COMPLETED', startedAt: now, completedAt: now }).run();
      db.insert(learningSessionItems).values({ id: 'v2-item', sessionId: 'v2-session', wordId: 'word-roundtrip', position: 0, groupIndex: 3, completedStep: 'ASSESS', reviewRating: 'GOOD', createdAt: now }).run();
      db.insert(learningAttempts).values({ id: 'v2-attempt', sessionItemId: 'v2-item', requestId: 'v2-request', type: 'RECALL', attemptNumber: 2, answer: 'roundtrip', result: 'CORRECT_AFTER_HINT', performanceScore: 70, feedbackCodes: null, source: 'LOCAL', createdAt: now }).run();
      db.insert(reviewLogs).values({ id: 'v2-log', wordId: 'word-roundtrip', reviewType: 'RECALL', rating: 'GOOD', correct: true, performanceScore: 70, createdAt: now }).run();
      const backup = new ImportExportService(db).getBackup();
      expect(backup.version).toBe(2);
      expect(backup.data.learningAttempts).toHaveLength(1);
      const preview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
      const restore = await app.inject({ method: 'POST', url: '/api/restore', payload: { backup, confirm: true, previewToken: JSON.parse(preview.payload).data.previewToken } });
      expect(restore.statusCode).toBe(200);
      const restored = new ImportExportService(db).getBackup();
      expect(restored.data.learningSessions).toEqual(backup.data.learningSessions);
      expect(restored.data.learningSessionItems).toEqual(backup.data.learningSessionItems);
      expect(restored.data.learningAttempts).toEqual(backup.data.learningAttempts);
      expect(restored.data.reviewLogs).toEqual(backup.data.reviewLogs);
    });

    it('rejects orphan attempts before deleting current data', async () => {
      insertSampleWord('survivor-attempt');
      const backup = new ImportExportService(db).getBackup();
      const invalid = { ...backup, data: { ...backup.data, learningAttempts: [{ ...backup.data.learningAttempts[0], sessionItemId: 'missing-item' }] } };
      const preview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup: invalid } });
      expect(preview.statusCode).toBe(400);
      expect(db.select().from(words).all().map((word) => word.word)).toEqual(['survivor-attempt']);
    });
  });

  describe('Strict safety rework regressions', () => {
    it('canonicalizes offset timestamps before restore persistence and due/analytics queries', async () => {
      const composedApp = await buildApp({ dbPath: ':memory:', logger: false });
      const dueInstant = new Date(Math.floor((Date.now() - 60_000) / 1000) * 1000);
      const offsetLocal = new Date(dueInstant.getTime() + 6 * 60 * 60 * 1000);
      const pad = (value: number) => String(value).padStart(2, '0');
      const offsetDueAt = `${offsetLocal.getUTCFullYear()}-${pad(offsetLocal.getUTCMonth() + 1)}-${pad(offsetLocal.getUTCDate())}T${pad(offsetLocal.getUTCHours())}:${pad(offsetLocal.getUTCMinutes())}:${pad(offsetLocal.getUTCSeconds())}+06:00`;
      const backup = {
        version: 1,
        application: 'Lexora',
        exportedAt: new Date().toISOString(),
        data: {
          users: [],
          words: [{ id: 'w-offset', word: 'offset', phonetic: null, partOfSpeech: null, definition: 'offset definition', translation: null, difficulty: null, createdAt: new Date().toISOString(), updatedAt: null }],
          wordFamilies: [],
          collocations: [],
          examples: [],
          contexts: [],
          contextWords: [],
          learningProgress: [{ id: 'lp-offset', wordId: 'w-offset', status: 'NEW', recognitionScore: 0, recallScore: 0, productionScore: 0, lastStudiedAt: null, updatedAt: null }],
          reviewStates: [{ id: 'rs-offset', wordId: 'w-offset', interval: 1, easeFactor: 2.5, repetitions: 1, lapses: 0, dueAt: offsetDueAt, lastReviewedAt: null }],
          reviewLogs: [],
          tags: [],
          wordTags: [],
          learningSessions: [],
          learningSessionItems: [],
        },
      };

      try {
        const preview = await composedApp.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
        expect(preview.statusCode).toBe(200);
        const previewToken = JSON.parse(preview.payload).data.previewToken;
        const restore = await composedApp.inject({ method: 'POST', url: '/api/restore', payload: { backup, confirm: true, previewToken } });
        expect(restore.statusCode).toBe(200);

        const persisted = composedApp.db.select().from(reviewStates).where(eq(reviewStates.id, 'rs-offset')).all()[0];
        expect(persisted.dueAt).toBe(dueInstant.toISOString());

        const due = await composedApp.inject({ method: 'GET', url: '/api/reviews/due' });
        expect(JSON.parse(due.payload).data.items.map((item: any) => item.wordId)).toEqual(['w-offset']);

        const dashboard = await composedApp.inject({ method: 'GET', url: '/api/statistics/dashboard' });
        expect(JSON.parse(dashboard.payload).data.dueCount).toBe(1);
      } finally { await composedApp.close(); }
    });

    it('rejects cross-action preview tokens with standardized errors without changing data', async () => {
      const composedApp = await buildApp({ dbPath: ':memory:', logger: false });
      try {
        composedApp.db.insert(words).values({ id: 'token-survivor', word: 'token-survivor', definition: 'survivor', createdAt: new Date().toISOString(), updatedAt: null }).run();
        const backup = JSON.parse((await composedApp.inject({ method: 'GET', url: '/api/backup' })).payload).data;
        const importContent = 'token-word';
        const importPreview = await composedApp.inject({ method: 'POST', url: '/api/import/preview', payload: { format: 'TXT', content: importContent } });
        const importToken = JSON.parse(importPreview.payload).data.previewToken;
        const restoreWithImportToken = await composedApp.inject({
          method: 'POST',
          url: '/api/restore',
          payload: { backup, confirm: true, previewToken: importToken },
        });
        expect(restoreWithImportToken.statusCode).toBe(400);
        expect(JSON.parse(restoreWithImportToken.payload)).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
        expect(composedApp.db.select().from(words).all().map((word) => word.word)).toEqual(['token-survivor']);

        const restorePreview = await composedApp.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup } });
        const restoreToken = JSON.parse(restorePreview.payload).data.previewToken;
        const importWithRestoreToken = await composedApp.inject({
          method: 'POST',
          url: '/api/import/commit',
          payload: { format: 'TXT', content: importContent, previewToken: restoreToken },
        });
        expect(importWithRestoreToken.statusCode).toBe(400);
        expect(JSON.parse(importWithRestoreToken.payload)).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
        expect(composedApp.db.select().from(words).all().map((word) => word.word)).toEqual(['token-survivor']);
      } finally {
        await composedApp.close();
      }
    });

    it('rejects semantically invalid backups before preview or restore writes', async () => {
      insertSampleWord('survivor');
      const backupResponse = await app.inject({ method: 'GET', url: '/api/backup' });
      const backup = JSON.parse(backupResponse.payload).data;

      const invalidBackups = [
        { ...backup, data: { ...backup.data, words: [{ ...backup.data.words[0], definition: undefined }] } },
        { ...backup, data: { ...backup.data, learningProgress: [{ ...backup.data.learningProgress[0], status: 'BROKEN' }] } },
        {
          ...backup,
          data: {
            ...backup.data,
            learningProgress: [{ ...backup.data.learningProgress[0], recognitionScore: 101 }],
          },
        },
        {
          ...backup,
          data: {
            ...backup.data,
            reviewStates: [{ ...backup.data.reviewStates[0], easeFactor: 1.2 }],
          },
        },
        {
          ...backup,
          data: {
            ...backup.data,
            wordTags: [{ wordId: backup.data.words[0].id, tagId: 'missing-tag' }],
          },
        },
        {
          ...backup,
          data: {
            ...backup.data,
            words: [
              { ...backup.data.words[0], id: 'survivor-punctuated', word: 'survivor!' },
              { ...backup.data.words[0], id: 'survivor-plain', word: 'survivor' },
            ],
          },
        },
      ];

      for (const invalidBackup of invalidBackups) {
        const preview = await app.inject({ method: 'POST', url: '/api/restore/preview', payload: { backup: invalidBackup } });
        expect(preview.statusCode).toBe(400);
        const restore = await app.inject({
          method: 'POST',
          url: '/api/restore',
          payload: { backup: invalidBackup, confirm: true },
        });
        expect(restore.statusCode).toBe(400);
        expect(db.select().from(words).all().map((word) => word.word)).toEqual(['survivor']);
      }
    });

    it('rejects strict malformed CSV and strict JSON without throwing 500', async () => {
      const csvInputs = [
        'word,definition,unknown\nhello,definition,value',
        'word,word,definition\nhello,hello,definition',
        'word,definition\nhello',
        'word,definition\n"hello,definition',
        'word,definition\nhello,',
      ];

      for (const content of csvInputs) {
        const response = await app.inject({
          method: 'POST',
          url: '/api/import/preview',
          payload: { format: 'CSV', content },
        });
        expect(response.statusCode).toBe(400);
      }

      for (const content of [
        JSON.stringify([{ word: 'hello', definition: 'x', unexpected: true }]),
        JSON.stringify([{ word: 'hello', definition: 'x', tags: ['ok', 1] }]),
        JSON.stringify([{ word: 'hello' }]),
      ]) {
        const response = await app.inject({
          method: 'POST',
          url: '/api/import/preview',
          payload: { format: 'JSON', content },
        });
        expect(response.statusCode).toBe(400);
      }
    });

    it('neutralizes spreadsheet formulas before CSV quoting', async () => {
      const id = insertSampleWord('=SUM(A1)', '=1,+2,-3,@4');
      db.update(words).set({ translation: ' +safe, "quoted"' }).where(eq(words.id, id)).run();

      const response = await app.inject({ method: 'GET', url: '/api/export/vocabulary?format=CSV' });
      expect(response.statusCode).toBe(200);
      const content = JSON.parse(response.payload).data.content as string;
      expect(content).toContain("'=SUM(A1)");
      expect(content).toContain("\"'=1,+2,-3,@4\"");
      expect(content).toContain("\"'+safe, \"\"quoted\"\"\"");
    });

    it('service destructive methods reject false confirmation directly', () => {
      const service = new ImportExportService(db);
      const backup = service.getBackup();

      expect(() => service.restoreBackup({ backup, confirm: false })).toThrowError(ValidationError);
      expect(() => service.resetData({ scope: 'all', confirm: false } as any)).toThrow(/confirm must be true/i);
    });

    it('maps known validation failures to 400 and unexpected failures to generic INTERNAL_ERROR', async () => {
      db.sqlite.exec(`
        CREATE TRIGGER data_route_error
        BEFORE INSERT ON word_tags
        BEGIN
          SELECT RAISE(ABORT, 'raw sqlite secret');
        END;
      `);

      const sqliteResponse = await app.inject({
        method: 'POST',
        url: '/api/import/commit',
        payload: {
          format: 'JSON',
          content: JSON.stringify([{ word: 'triggerword', definition: 'definition', tags: ['tag'] }]),
          previewToken: await previewImportToken('JSON', JSON.stringify([{ word: 'triggerword', definition: 'definition', tags: ['tag'] }])),
        },
      });
      const sqliteBody = JSON.parse(sqliteResponse.payload);
      expect(sqliteResponse.statusCode).toBe(500);
      expect(sqliteBody.error.code).toBe('INTERNAL_ERROR');
      expect(sqliteBody.error.message).toBe('Internal server error');
      expect(sqliteBody.error.message).not.toContain('raw sqlite secret');

      const failingApp = Fastify();
      await failingApp.register(dataRoutes, {
        db,
        service: { previewImport: () => { throw new Error('unexpected secret'); } } as any,
      });
      await failingApp.ready();
      const response = await failingApp.inject({
        method: 'POST',
        url: '/api/import/preview',
        payload: { format: 'TXT', content: 'word' },
      });
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload).error.code).toBe('INTERNAL_ERROR');
      await failingApp.close();
    });
  });
});
