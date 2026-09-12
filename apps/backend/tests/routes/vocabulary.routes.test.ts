import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { getDb, AppDatabase } from '../../src/db/client.js';
import { vocabularyRoutes } from '../../src/routes/vocabulary.routes.js';
import { VocabularyRepository } from '../../src/repositories/vocabulary.repository.js';
import { ConflictError } from '../../src/services/vocabulary.service.js';
import { collocations, examples, learningProgress, reviewStates, tags, wordTags, words } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

describe('Vocabulary Routes & Full CRUD API', () => {
  let db: AppDatabase;
  let app: FastifyInstance;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  describe('POST /api/words - Create Word', () => {
    it('creates a word with collocations, examples, tags, and initialized progress/review', async () => {
      const payload = {
        word: 'reliable',
        phonetic: '/rɪˈlaɪəbl/',
        partOfSpeech: 'adjective',
        definition: 'able to be trusted or believed',
        translation: 'đáng tin cậy',
        difficulty: 'B2',
        collocations: ['reliable source', 'reliable information'],
        examples: [
          {
            sentence: 'He is a very reliable worker.',
            translation: 'Anh ấy là một công nhân rất đáng tin cậy.',
            source: 'GENERAL',
          },
        ],
        tags: ['Technology', 'Academic'],
      };

      const res = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data).toBeDefined();
      expect(body.data.id).toBeDefined();
      expect(body.data.word).toBe('reliable');
      expect(body.data.difficulty).toBe('B2');

      // Verify collocations in response
      expect(body.data.collocations).toHaveLength(2);
      expect(body.data.collocations.map((c: any) => c.phrase)).toEqual(
        expect.arrayContaining(['reliable source', 'reliable information'])
      );

      // Verify examples in response
      expect(body.data.examples).toHaveLength(1);
      expect(body.data.examples[0].sentence).toBe('He is a very reliable worker.');

      // Verify tags in response
      expect(body.data.tags).toHaveLength(2);
      expect(body.data.tags.map((t: any) => t.name)).toEqual(
        expect.arrayContaining(['Technology', 'Academic'])
      );

      // Verify learning_progress initialized
      expect(body.data.learningProgress).toBeDefined();
      expect(body.data.learningProgress.status).toBe('NEW');
      expect(body.data.learningProgress.recognitionScore).toBe(0);
      expect(body.data.learningProgress.recallScore).toBe(0);
      expect(body.data.learningProgress.productionScore).toBe(0);

      // Verify review_states initialized
      expect(body.data.reviewState).toBeDefined();
      expect(body.data.reviewState.interval).toBe(0);
      expect(body.data.reviewState.easeFactor).toBe(2.5);
      expect(body.data.reviewState.repetitions).toBe(0);
      expect(body.data.reviewState.lapses).toBe(0);
      expect(body.data.reviewState.dueAt).toBeDefined();

      // Verify directly in DB
      const dbWords = db.select().from(words).where(eq(words.id, body.data.id)).all();
      expect(dbWords).toHaveLength(1);

      const dbTags = db.select().from(tags).all();
      expect(dbTags).toHaveLength(2);
    });

    it('reuses existing tags without duplicate key errors', async () => {
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'frontend',
          definition: 'the part of a software system that users interact with',
          tags: ['Tech', 'Dev'],
        },
      });
      expect(res1.statusCode).toBe(201);

      const res2 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'backend',
          definition: 'the part of a software system not directly accessed by the user',
          tags: ['Tech', 'Dev', 'System'],
        },
      });
      expect(res2.statusCode).toBe(201);

      const allTags = db.select().from(tags).all();
      expect(allTags).toHaveLength(3); // 'Tech', 'Dev', 'System'
    });

    it('supports object format for collocations and examples', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'deep',
          definition: 'extending far down from top or surface',
          collocations: [{ phrase: 'deep dive' }],
          examples: [{ sentence: 'Let us take a deep dive.', translation: 'Hãy cùng đi sâu vào.' }],
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.data.collocations[0].phrase).toBe('deep dive');
      expect(body.data.examples[0].sentence).toBe('Let us take a deep dive.');
      expect(body.data.examples[0].translation).toBe('Hãy cùng đi sâu vào.');
    });

    it('rejects duplicate words with 409 Conflict error envelope (case-insensitive)', async () => {
      // 1. Create first word
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'Reliable',
          definition: 'able to be trusted',
        },
      });
      expect(res1.statusCode).toBe(201);

      // 2. Attempt creating duplicate in lowercase with surrounding spaces
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: '  reliable  ',
          definition: 'synonym or duplicate definition',
        },
      });

      expect(res2.statusCode).toBe(409);
      const body2 = JSON.parse(res2.payload);
      expect(body2.success).toBe(false);
      expect(body2.error).toBeDefined();
      expect(body2.error.code).toBe('CONFLICT');
      expect(body2.error.message).toMatch(/already exists/i);
    });

    it('maps SQLite constraint failures to the BAD_REQUEST error envelope', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'orphaned-family',
          definition: 'a word with an invalid family relation',
          wordFamilies: [{
            relatedWordId: '00000000-0000-0000-0000-000000000000',
            relationship: 'noun',
          }],
        },
      });

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.payload)).toMatchObject({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Invalid data request' },
      });
    });

    it('throws ConflictError directly from repository transaction when duplicate word exists', () => {
      const repo = new VocabularyRepository(db);
      repo.create({
        word: 'uniqueness',
        definition: 'the quality of being the only one of its kind',
      });

      expect(() => {
        repo.create({
          word: 'UNIQUENESS',
          definition: 'duplicate attempt directly at repo level',
        });
      }).toThrowError(ConflictError);
    });

    it('rejects invalid payload missing required fields with 400 Validation Error', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          // missing word & definition
          phonetic: '/test/',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error).toBeDefined();
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/words - List Words with Filters and Pagination', () => {
    beforeEach(async () => {
      // Seed 3 words
      await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'algorithm',
          definition: 'A process or set of rules to be followed in calculations',
          difficulty: 'C1',
          tags: ['Technology', 'Math'],
        },
      });

      await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'resilient',
          definition: 'Able to withstand or recover quickly from difficult conditions',
          difficulty: 'B2',
          tags: ['Mindset'],
        },
      });

      await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'flexible',
          definition: 'Capable of bending easily without breaking',
          difficulty: 'B2',
          tags: ['General'],
        },
      });
    });

    it('returns paginated words with total, page, limit, items', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?page=1&limit=2',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.total).toBe(3);
      expect(body.data.page).toBe(1);
      expect(body.data.limit).toBe(2);
      expect(body.data.items).toHaveLength(2);
    });

    it('filters words by text search on word or definition', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?search=withstand',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('resilient');
    });

    it('filters words by difficulty', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?difficulty=B2',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(2);
      const wordNames = body.data.items.map((i: any) => i.word);
      expect(wordNames).toContain('resilient');
      expect(wordNames).toContain('flexible');
    });

    it('filters words by tag', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?tag=Technology',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('algorithm');
    });

    it('filters words by learning status', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?status=NEW',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(3);
    });
  });

  describe('GET /api/words/:id - Get Word Detail', () => {
    it('returns word with full relational graph', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'collaborate',
          definition: 'work jointly on an activity or project',
          collocations: ['collaborate closely'],
          examples: [{ sentence: 'Teams collaborate on open source.' }],
          tags: ['Work'],
        },
      });
      const createdWord = JSON.parse(createRes.payload).data;

      const res = await app.inject({
        method: 'GET',
        url: `/api/words/${createdWord.id}`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(createdWord.id);
      expect(body.data.word).toBe('collaborate');
      expect(body.data.collocations).toHaveLength(1);
      expect(body.data.examples).toHaveLength(1);
      expect(body.data.tags).toHaveLength(1);
      expect(body.data.tags[0].name).toBe('Work');
      expect(body.data.learningProgress).toBeDefined();
      expect(body.data.reviewState).toBeDefined();
      expect(Array.isArray(body.data.wordFamilies)).toBe(true);
      expect(Array.isArray(body.data.contexts)).toBe(true);
    });

    it('returns 404 for non-existent word ID', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words/non-existent-id',
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('PATCH /api/words/:id - Update Word', () => {
    it('updates word fields and relations', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'obsolete',
          definition: 'no longer produced or used; out of date',
          difficulty: 'B2',
          collocations: ['become obsolete'],
          tags: ['Old'],
        },
      });
      const createdWord = JSON.parse(createRes.payload).data;

      const updateRes = await app.inject({
        method: 'PATCH',
        url: `/api/words/${createdWord.id}`,
        payload: {
          definition: 'no longer used because something newer exists',
          difficulty: 'C1',
          translation: 'lỗi thời',
          collocations: ['largely obsolete', 'technologically obsolete'],
          tags: ['Technology', 'Modern'],
        },
      });

      expect(updateRes.statusCode).toBe(200);
      const body = JSON.parse(updateRes.payload);
      expect(body.success).toBe(true);
      expect(body.data.definition).toBe('no longer used because something newer exists');
      expect(body.data.difficulty).toBe('C1');
      expect(body.data.translation).toBe('lỗi thời');
      expect(body.data.collocations).toHaveLength(2);
      expect(body.data.tags).toHaveLength(2);
      expect(body.data.tags.map((t: any) => t.name)).toEqual(
        expect.arrayContaining(['Technology', 'Modern'])
      );
    });

    it('updates word without changing word name and does not self-conflict', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: { word: 'consistent', definition: 'acting or done in the same way' },
      });
      const created = JSON.parse(res.payload).data;

      const updateRes = await app.inject({
        method: 'PATCH',
        url: `/api/words/${created.id}`,
        payload: { definition: 'compatible or in agreement' },
      });

      expect(updateRes.statusCode).toBe(200);
      const updated = JSON.parse(updateRes.payload).data;
      expect(updated.definition).toBe('compatible or in agreement');
      expect(updated.word).toBe('consistent');
    });

    it('rejects updating word to an existing word with 409 Conflict', async () => {
      await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: { word: 'first', definition: 'first word' },
      });

      const res2 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: { word: 'second', definition: 'second word' },
      });
      const secondWord = JSON.parse(res2.payload).data;

      const patchRes = await app.inject({
        method: 'PATCH',
        url: `/api/words/${secondWord.id}`,
        payload: { word: 'First' },
      });

      expect(patchRes.statusCode).toBe(409);
      const body = JSON.parse(patchRes.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('CONFLICT');
    });

    it('throws ConflictError directly from repository transaction when updating word to duplicate', () => {
      const repo = new VocabularyRepository(db);
      const w1 = repo.create({ word: 'alpha', definition: 'first letter' });
      const w2 = repo.create({ word: 'beta', definition: 'second letter' });

      expect(() => {
        repo.update(w2.id, { word: 'ALPHA' });
      }).toThrowError(ConflictError);
    });

    it('returns 404 when updating non-existent word', async () => {
      const res = await app.inject({
        method: 'PATCH',
        url: '/api/words/non-existent-id',
        payload: { definition: 'test' },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('DELETE /api/words/:id - Delete Word & Cascade', () => {
    it('deletes word and cascades to collocations, examples, progress, reviewState, wordTags', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'temporary',
          definition: 'lasting for only a limited period of time',
          collocations: ['temporary solution'],
          examples: [{ sentence: 'This is a temporary fix.' }],
          tags: ['GeneralTag'],
        },
      });
      const createdWord = JSON.parse(createRes.payload).data;
      const wordId = createdWord.id;

      // Delete the word
      const delRes = await app.inject({
        method: 'DELETE',
        url: `/api/words/${wordId}`,
      });

      expect(delRes.statusCode).toBe(200);
      const delBody = JSON.parse(delRes.payload);
      expect(delBody.success).toBe(true);

      // Verify 404 on subsequent get
      const getRes = await app.inject({
        method: 'GET',
        url: `/api/words/${wordId}`,
      });
      expect(getRes.statusCode).toBe(404);

      // Verify cascade deletion in database tables
      expect(db.select().from(words).where(eq(words.id, wordId)).all()).toHaveLength(0);
      expect(db.select().from(collocations).where(eq(collocations.wordId, wordId)).all()).toHaveLength(0);
      expect(db.select().from(examples).where(eq(examples.wordId, wordId)).all()).toHaveLength(0);
      expect(db.select().from(wordTags).where(eq(wordTags.wordId, wordId)).all()).toHaveLength(0);
      expect(db.select().from(learningProgress).where(eq(learningProgress.wordId, wordId)).all()).toHaveLength(0);
      expect(db.select().from(reviewStates).where(eq(reviewStates.wordId, wordId)).all()).toHaveLength(0);

      // Shared tag 'GeneralTag' must NOT be deleted
      const existingTags = db.select().from(tags).where(eq(tags.name, 'GeneralTag')).all();
      expect(existingTags).toHaveLength(1);
    });

    it('returns 404 when deleting non-existent word', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/words/non-existent-id',
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Prefix Support (/api/words prefix option)', () => {
    it('works correctly when registered with { prefix: "/api/words" }', async () => {
      const prefixedApp = Fastify();
      const testDb = getDb(':memory:');
      await prefixedApp.register(vocabularyRoutes, { db: testDb, prefix: '/api/words' });
      await prefixedApp.ready();

      const res = await prefixedApp.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'prefixed',
          definition: 'registered under prefix',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.data.word).toBe('prefixed');

      const listRes = await prefixedApp.inject({
        method: 'GET',
        url: '/api/words',
      });
      expect(listRes.statusCode).toBe(200);
      expect(JSON.parse(listRes.payload).data.total).toBe(1);

      await prefixedApp.close();
      testDb.sqlite.close();
    });
  });

  describe('Word Families Relations & Persistence', () => {
    it('creates and retrieves word with wordFamilies showing populated related word info and reciprocal relation', async () => {
      // 1. Create base word 'act'
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'act',
          partOfSpeech: 'verb',
          definition: 'take action; do something',
        },
      });
      expect(res1.statusCode).toBe(201);
      const actWord = JSON.parse(res1.payload).data;

      // 2. Create related word 'action' linking to 'act'
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'action',
          partOfSpeech: 'noun',
          definition: 'the fact or process of doing something',
          wordFamilies: [
            {
              relatedWordId: actWord.id,
              relationship: 'noun_form',
            },
          ],
        },
      });
      expect(res2.statusCode).toBe(201);
      const actionWord = JSON.parse(res2.payload).data;

      // Verify populated related word on created word
      expect(actionWord.wordFamilies).toHaveLength(1);
      expect(actionWord.wordFamilies[0].relationship).toBe('noun_form');
      expect(actionWord.wordFamilies[0].word).toBeDefined();
      expect(actionWord.wordFamilies[0].word.id).toBe(actWord.id);
      expect(actionWord.wordFamilies[0].word.word).toBe('act');
      expect(actionWord.wordFamilies[0].word.partOfSpeech).toBe('verb');
      expect(actionWord.wordFamilies[0].word.definition).toBe('take action; do something');

      // Verify raw join tables are omitted
      expect(actionWord.wordTags).toBeUndefined();
      expect(actionWord.contextWords).toBeUndefined();
      expect(actionWord.relatedWordFamilies).toBeUndefined();

      // 3. Retrieve base word 'act' and verify reciprocal relationship appears
      const res3 = await app.inject({
        method: 'GET',
        url: `/api/words/${actWord.id}`,
      });
      expect(res3.statusCode).toBe(200);
      const actDetail = JSON.parse(res3.payload).data;
      expect(actDetail.wordFamilies).toHaveLength(1);
      expect(actDetail.wordFamilies[0].relationship).toBe('noun_form');
      expect(actDetail.wordFamilies[0].word.id).toBe(actionWord.id);
      expect(actDetail.wordFamilies[0].word.word).toBe('action');
      expect(actDetail.wordFamilies[0].word.partOfSpeech).toBe('noun');

      // Verify raw join tables are omitted on GET detail
      expect(actDetail.wordTags).toBeUndefined();
      expect(actDetail.contextWords).toBeUndefined();
      expect(actDetail.relatedWordFamilies).toBeUndefined();

      // 4. Update wordFamilies via PATCH
      const res4 = await app.inject({
        method: 'PATCH',
        url: `/api/words/${actionWord.id}`,
        payload: {
          wordFamilies: [
            {
              relatedWordId: actWord.id,
              relationship: 'derived_noun',
            },
          ],
        },
      });
      expect(res4.statusCode).toBe(200);
      const updatedAction = JSON.parse(res4.payload).data;
      expect(updatedAction.wordFamilies).toHaveLength(1);
      expect(updatedAction.wordFamilies[0].relationship).toBe('derived_noun');
      expect(updatedAction.wordFamilies[0].word.id).toBe(actWord.id);
    });
  });

  describe('Compound Search across collocations, examples, and tags', () => {
    beforeEach(async () => {
      await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'torrential',
          definition: 'falling rapidly and in copious quantities',
          collocations: ['torrential downpour'],
          examples: [{ sentence: 'The mountain roads were washed away.' }],
          tags: ['Weather'],
        },
      });
    });

    it('matches search term in collocations', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?search=downpour',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('torrential');
    });

    it('matches search term in example sentences', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?search=mountain',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('torrential');
    });

    it('matches search term in tags', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?search=weather',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('torrential');
    });
  });

  describe('Case-insensitive difficulty and tag filtering', () => {
    beforeEach(async () => {
      await app.inject({
        method: 'POST',
        url: '/api/words',
        payload: {
          word: 'ubiquitous',
          definition: 'present, appearing, or found everywhere',
          difficulty: 'C1',
          tags: ['FormalVocabulary'],
        },
      });
    });

    it('filters by difficulty with case-insensitivity', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?difficulty=c1',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('ubiquitous');
    });

    it('filters by tag with case-insensitivity', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/words?tag=formalvocabulary',
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].word).toBe('ubiquitous');
    });
  });

  describe('500 Error sanitization', () => {
    it('sanitizes unexpected internal 500 errors and does not leak error message details', async () => {
      const brokenApp = Fastify();
      const mockService = {
        getWordById: () => {
          throw new Error('sensitive database stack trace or internal details');
        },
      };
      await brokenApp.register(vocabularyRoutes, { db, service: mockService as any });
      await brokenApp.ready();

      const res = await brokenApp.inject({
        method: 'GET',
        url: '/api/words/test-id',
      });

      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(res.payload).not.toContain('sensitive database stack trace');

      await brokenApp.close();
    });
  });
});
