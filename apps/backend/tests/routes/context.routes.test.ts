import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { getDb, AppDatabase } from '../../src/db/client.js';
import { vocabularyRoutes } from '../../src/routes/vocabulary.routes.js';
import { contextRoutes } from '../../src/routes/context.routes.js';
import { words, contexts, contextWords } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

describe('Context Routes & Context Management API', () => {
  let db: AppDatabase;
  let app: FastifyInstance;

  beforeEach(async () => {
    db = getDb(':memory:');
    app = Fastify();
    await app.register(vocabularyRoutes, { db });
    await app.register(contextRoutes, { db });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.sqlite.close();
  });

  // Helper to create a test word via /api/words
  async function createTestWord(word: string = 'resilient', definition: string = 'able to recover quickly') {
    const res = await app.inject({
      method: 'POST',
      url: '/api/words',
      payload: {
        word,
        definition,
        difficulty: 'B2',
      },
    });
    expect(res.statusCode).toBe(201);
    return JSON.parse(res.payload).data;
  }

  describe('POST /api/contexts - Create Context', () => {
    it('creates context with title, content, sourceType, optional sourceUrl, and initial wordIds', async () => {
      const word1 = await createTestWord('reliable', 'able to be trusted');
      const word2 = await createTestWord('scalable', 'able to be scaled');

      const payload = {
        title: 'Building Scalable APIs',
        content: 'The system needs to be reliable and scalable under heavy traffic.',
        sourceType: 'article', // test case-insensitive transform
        sourceUrl: 'https://example.com/scalable-apis',
        wordIds: [word1.id, word2.id],
      };

      const res = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data).toBeDefined();
      expect(body.data.id).toBeDefined();
      expect(body.data.title).toBe('Building Scalable APIs');
      expect(body.data.content).toBe('The system needs to be reliable and scalable under heavy traffic.');
      expect(body.data.sourceType).toBe('ARTICLE'); // uppercase transformed
      expect(body.data.sourceUrl).toBe('https://example.com/scalable-apis');
      expect(body.data.wordCount).toBe(2);
      expect(body.data.words).toHaveLength(2);

      const linkedWordIds = body.data.words.map((w: any) => w.wordId || w.word.id);
      expect(linkedWordIds).toContain(word1.id);
      expect(linkedWordIds).toContain(word2.id);

      // Verify exposure data initialized
      for (const linkedWord of body.data.words) {
        expect(linkedWord.exposureCount).toBe(1);
        expect(linkedWord.firstSeenAt).toBeDefined();
        expect(linkedWord.lastSeenAt).toBeDefined();
        expect(linkedWord.word).toBeDefined();
        expect(linkedWord.word.definition).toBeDefined();
      }
    });

    it('creates context without optional wordIds or sourceUrl', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Minimal Context',
          content: 'Just some text here.',
          sourceType: 'READING',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.wordCount).toBe(0);
      expect(body.data.words).toEqual([]);
      expect(body.data.sourceUrl).toBeNull();
    });

    it('rejects invalid sourceType with 400 Validation Error', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Invalid Type Context',
          content: 'Some content.',
          sourceType: 'UNKNOWN_TYPE',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects missing required fields (title or content) with 400 Validation Error', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Missing Content',
          sourceType: 'READING',
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects whitespace-only title or content with 400 Validation Error', async () => {
      const resTitle = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: '   ',
          content: 'Valid content',
          sourceType: 'READING',
        },
      });
      expect(resTitle.statusCode).toBe(400);
      const bodyTitle = JSON.parse(resTitle.payload);
      expect(bodyTitle.success).toBe(false);
      expect(bodyTitle.error.code).toBe('VALIDATION_ERROR');

      const resContent = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Valid title',
          content: '   ',
          sourceType: 'READING',
        },
      });
      expect(resContent.statusCode).toBe(400);
      const bodyContent = JSON.parse(resContent.payload);
      expect(bodyContent.success).toBe(false);
      expect(bodyContent.error.code).toBe('VALIDATION_ERROR');
    });

    it('returns 404 when initial wordIds contains a non-existent word ID', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Context with Missing Word',
          content: 'Testing missing word reference.',
          sourceType: 'READING',
          wordIds: ['00000000-0000-0000-0000-000000000000'],
        },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('GET /api/contexts - List Contexts with Filters and Pagination', () => {
    beforeEach(async () => {
      const word1 = await createTestWord('resilience', 'capacity to recover');

      // Context 1: Reading
      await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Psychology of Resilience',
          content: 'Building mental resilience is vital for overcoming adversity.',
          sourceType: 'READING',
          wordIds: [word1.id],
        },
      });

      // Context 2: YouTube
      await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Tech Talk 2026',
          content: 'Distributed architectures in cloud environments.',
          sourceType: 'YOUTUBE',
          sourceUrl: 'https://youtube.com/watch?v=12345',
        },
      });

      // Context 3: Book
      await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Clean Code Chapter 1',
          content: 'Writing readable and maintainable software systems.',
          sourceType: 'BOOK',
        },
      });
    });

    it('returns paginated contexts with total, page, limit, items and calculated wordCount', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/contexts?page=1&limit=2',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.total).toBe(3);
      expect(body.data.page).toBe(1);
      expect(body.data.limit).toBe(2);
      expect(body.data.items).toHaveLength(2);
      expect(body.data.items[0]).toHaveProperty('wordCount');
    });

    it('filters contexts by text search in title or content', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/contexts?search=adversity',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].title).toBe('Psychology of Resilience');
      expect(body.data.items[0].wordCount).toBe(1);
    });

    it('filters contexts by sourceType case-insensitively', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/contexts?sourceType=youtube',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data.total).toBe(1);
      expect(body.data.items[0].title).toBe('Tech Talk 2026');
      expect(body.data.items[0].sourceType).toBe('YOUTUBE');
    });
  });

  describe('GET /api/contexts/:id - Get Context Detail', () => {
    it('loads context and full list of associated words with exposure data and word details', async () => {
      const word = await createTestWord('ubiquitous', 'present everywhere');

      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Ubiquitous Computing',
          content: 'Smart devices are ubiquitous in modern homes.',
          sourceType: 'ARTICLE',
          wordIds: [word.id],
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      const res = await app.inject({
        method: 'GET',
        url: `/api/contexts/${contextId}`,
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(contextId);
      expect(body.data.title).toBe('Ubiquitous Computing');
      expect(body.data.words).toHaveLength(1);

      const associatedWord = body.data.words[0];
      expect(associatedWord.exposureCount).toBe(1);
      expect(associatedWord.firstSeenAt).toBeDefined();
      expect(associatedWord.lastSeenAt).toBeDefined();
      expect(associatedWord.word).toBeDefined();
      expect(associatedWord.word.id).toBe(word.id);
      expect(associatedWord.word.word).toBe('ubiquitous');
      expect(associatedWord.word.definition).toBe('present everywhere');
    });

    it('returns 404 for non-existent context ID', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/contexts/non-existent-id',
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('PATCH /api/contexts/:id - Update Context', () => {
    it('updates context attributes', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Old Title',
          content: 'Old content.',
          sourceType: 'ARTICLE',
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      const updateRes = await app.inject({
        method: 'PATCH',
        url: `/api/contexts/${contextId}`,
        payload: {
          title: 'Updated Title',
          content: 'Updated content.',
          sourceType: 'reading',
          sourceUrl: 'https://updated.example.com',
        },
      });

      expect(updateRes.statusCode).toBe(200);
      const body = JSON.parse(updateRes.payload);
      expect(body.success).toBe(true);
      expect(body.data.title).toBe('Updated Title');
      expect(body.data.content).toBe('Updated content.');
      expect(body.data.sourceType).toBe('READING');
      expect(body.data.sourceUrl).toBe('https://updated.example.com');
      expect(body.data.updatedAt).toBeDefined();
    });

    it('returns 404 when updating non-existent context ID', async () => {
      const res = await app.inject({
        method: 'PATCH',
        url: '/api/contexts/non-existent-id',
        payload: {
          title: 'Should Fail',
        },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });

    it('does not mutate word links when wordIds is included in PATCH payload', async () => {
      const word1 = await createTestWord('testword1', 'test definition 1');
      const word2 = await createTestWord('testword2', 'test definition 2');

      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Word Ignore Context',
          content: 'Context content',
          sourceType: 'ARTICLE',
          wordIds: [word1.id],
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      const updateRes = await app.inject({
        method: 'PATCH',
        url: `/api/contexts/${contextId}`,
        payload: {
          title: 'Updated Word Ignore Context',
          wordIds: [word2.id],
        },
      });

      expect(updateRes.statusCode).toBe(200);
      const detailRes = await app.inject({
        method: 'GET',
        url: `/api/contexts/${contextId}`,
      });
      const detail = JSON.parse(detailRes.payload).data;
      expect(detail.title).toBe('Updated Word Ignore Context');
      expect(detail.words).toHaveLength(1);
      expect(detail.words[0].word.id).toBe(word1.id);
    });
  });

  describe('DELETE /api/contexts/:id - Decoupling Invariant & Cascade', () => {
    it('deletes context, cascading only to context_words, preserving words (decoupling invariant)', async () => {
      const word1 = await createTestWord('retain', 'continue to have something');
      const word2 = await createTestWord('preserve', 'maintain in original state');

      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Preservation Article',
          content: 'We must retain and preserve authentic contexts.',
          sourceType: 'ARTICLE',
          wordIds: [word1.id, word2.id],
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      // Verify contextWords join records exist before deletion
      const initialJoin = db.select().from(contextWords).where(eq(contextWords.contextId, contextId)).all();
      expect(initialJoin).toHaveLength(2);

      // Delete the context
      const delRes = await app.inject({
        method: 'DELETE',
        url: `/api/contexts/${contextId}`,
      });

      expect(delRes.statusCode).toBe(200);
      const delBody = JSON.parse(delRes.payload);
      expect(delBody.success).toBe(true);
      expect(delBody.data.id).toBe(contextId);

      // Context must be gone (404)
      const getRes = await app.inject({
        method: 'GET',
        url: `/api/contexts/${contextId}`,
      });
      expect(getRes.statusCode).toBe(404);

      // context_words join records must be gone
      const remainingJoin = db.select().from(contextWords).where(eq(contextWords.contextId, contextId)).all();
      expect(remainingJoin).toHaveLength(0);

      // Words MUST STILL EXIST in the database! (Decoupling invariant)
      const w1Db = db.select().from(words).where(eq(words.id, word1.id)).all();
      expect(w1Db).toHaveLength(1);
      expect(w1Db[0].word).toBe('retain');

      const w2Db = db.select().from(words).where(eq(words.id, word2.id)).all();
      expect(w2Db).toHaveLength(1);
      expect(w2Db[0].word).toBe('preserve');
    });

    it('returns 404 when deleting non-existent context ID', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/contexts/non-existent-id',
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('POST /api/contexts/:id/words - Linking Words & Exposure Incrementation', () => {
    it('links words, inserting with exposureCount: 1, then incrementing exposureCount and updating lastSeenAt if already linked', async () => {
      const word = await createTestWord('exposure', 'the state of being exposed to something');

      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Exposure Test Context',
          content: 'Repeated exposure improves vocabulary acquisition.',
          sourceType: 'BOOK',
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      // First link: inserts with exposureCount: 1
      const link1Res = await app.inject({
        method: 'POST',
        url: `/api/contexts/${contextId}/words`,
        payload: {
          wordIds: [word.id],
        },
      });

      expect(link1Res.statusCode).toBe(200);
      const body1 = JSON.parse(link1Res.payload);
      expect(body1.success).toBe(true);
      expect(body1.data.words).toHaveLength(1);
      expect(body1.data.words[0].exposureCount).toBe(1);
      const firstSeen = body1.data.words[0].firstSeenAt;
      const initialLastSeen = body1.data.words[0].lastSeenAt;
      expect(firstSeen).toBeDefined();
      expect(initialLastSeen).toBeDefined();

      // Second link: already linked, should increment exposureCount to 2 and update lastSeenAt
      const link2Res = await app.inject({
        method: 'POST',
        url: `/api/contexts/${contextId}/words`,
        payload: {
          wordIds: [word.id],
        },
      });

      expect(link2Res.statusCode).toBe(200);
      const body2 = JSON.parse(link2Res.payload);
      expect(body2.success).toBe(true);
      expect(body2.data.words).toHaveLength(1);
      expect(body2.data.words[0].exposureCount).toBe(2);
      expect(body2.data.words[0].firstSeenAt).toBe(firstSeen); // firstSeenAt preserved!

      // Third link: increment to 3
      const link3Res = await app.inject({
        method: 'POST',
        url: `/api/contexts/${contextId}/words`,
        payload: {
          wordIds: [word.id],
        },
      });

      expect(link3Res.statusCode).toBe(200);
      const body3 = JSON.parse(link3Res.payload);
      expect(body3.data.words[0].exposureCount).toBe(3);
    });

    it('only increments exposure count once when duplicate wordIds are sent in a single request', async () => {
      const word = await createTestWord('duplicate', 'one of two or more identical things');

      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Duplicate Word Test',
          content: 'Testing deduplication of word IDs in linking request.',
          sourceType: 'READING',
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      // Link word with duplicate IDs in same request
      const linkRes = await app.inject({
        method: 'POST',
        url: `/api/contexts/${contextId}/words`,
        payload: {
          wordIds: [word.id, word.id, word.id],
        },
      });

      expect(linkRes.statusCode).toBe(200);
      const body = JSON.parse(linkRes.payload);
      expect(body.success).toBe(true);
      expect(body.data.words).toHaveLength(1);
      expect(body.data.words[0].exposureCount).toBe(1);
    });

    it('returns 404 if context does not exist', async () => {
      const word = await createTestWord('test', 'test definition');
      const res = await app.inject({
        method: 'POST',
        url: '/api/contexts/non-existent-id/words',
        payload: {
          wordIds: [word.id],
        },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });

    it('returns 404 if word does not exist', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Some Context',
          content: 'Some content.',
          sourceType: 'ARTICLE',
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      const res = await app.inject({
        method: 'POST',
        url: `/api/contexts/${contextId}/words`,
        payload: {
          wordIds: ['00000000-0000-0000-0000-000000000000'],
        },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });

    it('returns 400 for invalid UUID format in wordIds', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Some Context',
          content: 'Some content.',
          sourceType: 'ARTICLE',
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      const res = await app.inject({
        method: 'POST',
        url: `/api/contexts/${contextId}/words`,
        payload: {
          wordIds: ['not-a-valid-uuid'],
        },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('DELETE /api/contexts/:id/words/:wordId - Unlinking Word', () => {
    it('unlinks word from context_words and preserves the word', async () => {
      const word = await createTestWord('autonomous', 'having the freedom to act independently');

      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Autonomous Agents',
          content: 'Autonomous systems operate without constant supervision.',
          sourceType: 'ARTICLE',
          wordIds: [word.id],
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      // Unlink word
      const unlinkRes = await app.inject({
        method: 'DELETE',
        url: `/api/contexts/${contextId}/words/${word.id}`,
      });

      expect(unlinkRes.statusCode).toBe(200);
      const unlinkBody = JSON.parse(unlinkRes.payload);
      expect(unlinkBody.success).toBe(true);

      // Verify word is no longer linked in context detail
      const detailRes = await app.inject({
        method: 'GET',
        url: `/api/contexts/${contextId}`,
      });
      expect(detailRes.statusCode).toBe(200);
      const detailBody = JSON.parse(detailRes.payload);
      expect(detailBody.data.words).toHaveLength(0);
      expect(detailBody.data.wordCount).toBe(0);

      // Verify word still exists in words table
      const wordRes = await app.inject({
        method: 'GET',
        url: `/api/words/${word.id}`,
      });
      expect(wordRes.statusCode).toBe(200);
    });

    it('returns 404 when unlinking from non-existent context ID', async () => {
      const word = await createTestWord('test', 'test definition');
      const res = await app.inject({
        method: 'DELETE',
        url: `/api/contexts/non-existent-id/words/${word.id}`,
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });

    it('returns 404 when unlinking word that is not linked to the context', async () => {
      const word = await createTestWord('unlinked', 'not linked');
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Empty Context',
          content: 'No words linked.',
          sourceType: 'ARTICLE',
        },
      });
      const contextId = JSON.parse(createRes.payload).data.id;

      const res = await app.inject({
        method: 'DELETE',
        url: `/api/contexts/${contextId}/words/${word.id}`,
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Prefix Support & 500 Error Sanitization', () => {
    it('works correctly when registered with { prefix: "/api/contexts" }', async () => {
      const prefixedApp = Fastify();
      const testDb = getDb(':memory:');
      await prefixedApp.register(contextRoutes, { db: testDb, prefix: '/api/contexts' });
      await prefixedApp.ready();

      const res = await prefixedApp.inject({
        method: 'POST',
        url: '/api/contexts',
        payload: {
          title: 'Prefixed Context',
          content: 'Content in prefixed router.',
          sourceType: 'WORK',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.data.title).toBe('Prefixed Context');

      const listRes = await prefixedApp.inject({
        method: 'GET',
        url: '/api/contexts',
      });
      expect(listRes.statusCode).toBe(200);
      expect(JSON.parse(listRes.payload).data.total).toBe(1);

      await prefixedApp.close();
      testDb.sqlite.close();
    });

    it('sanitizes unexpected internal 500 errors and does not leak stack trace or internal details', async () => {
      const brokenApp = Fastify();
      const mockService = {
        getContextById: () => {
          throw new Error('database connection exploded with secret table metadata');
        },
      };
      await brokenApp.register(contextRoutes, { db, service: mockService as any });
      await brokenApp.ready();

      const res = await brokenApp.inject({
        method: 'GET',
        url: '/api/contexts/test-id',
      });

      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Internal server error');
      expect(res.payload).not.toContain('secret table metadata');

      await brokenApp.close();
    });
  });
});
