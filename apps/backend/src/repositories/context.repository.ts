import { eq, inArray } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import { contexts, words } from '../db/schema.js';
import type { CreateContext, UpdateContext, QueryContexts } from '../schemas/context.schema.js';

function getSqlite(db: AppDatabase) {
  return (db as any).sqlite ?? (db as any).session?.client;
}

function ensureContextWordsColumns(db: AppDatabase) {
  const sqlite = getSqlite(db);
  if (!sqlite) return;
  const cols = sqlite.prepare("PRAGMA table_info('context_words')").all() as Array<{ name: string }>;
  const names = new Set(cols.map((c) => c.name));
  if (!names.has('exposure_count')) {
    sqlite.exec("ALTER TABLE context_words ADD COLUMN exposure_count INTEGER NOT NULL DEFAULT 1");
  }
  if (!names.has('first_seen_at')) {
    sqlite.exec("ALTER TABLE context_words ADD COLUMN first_seen_at TEXT");
  }
  if (!names.has('last_seen_at')) {
    sqlite.exec("ALTER TABLE context_words ADD COLUMN last_seen_at TEXT");
  }
}

export class ContextRepository {
  private sqlite: any;

  constructor(private db: AppDatabase) {
    this.sqlite = getSqlite(db);
    ensureContextWordsColumns(db);
  }

  create(data: CreateContext) {
    const contextId = randomUUID();
    const now = new Date().toISOString();

    this.db.transaction((tx) => {
      tx.insert(contexts)
        .values({
          id: contextId,
          title: data.title.trim(),
          content: data.content.trim(),
          sourceType: data.sourceType ?? null,
          sourceUrl: data.sourceUrl ? data.sourceUrl.trim() : null,
          createdAt: now,
          updatedAt: now,
        })
        .run();

      if (data.wordIds && data.wordIds.length > 0) {
        const distinctWordIds = Array.from(new Set(data.wordIds.map((w) => w.trim()).filter(Boolean)));
        const insertCw = this.sqlite.prepare(`
          INSERT INTO context_words (context_id, word_id, exposure_count, first_seen_at, last_seen_at)
          VALUES (?, ?, 1, ?, ?)
        `);

        for (const wordId of distinctWordIds) {
          insertCw.run(contextId, wordId, now, now);
        }
      }
    });

    return this.findById(contextId)!;
  }

  findById(id: string) {
    const ctx = this.db.select().from(contexts).where(eq(contexts.id, id)).all()[0];
    if (!ctx) return null;

    const rows = this.sqlite.prepare(`
      SELECT 
        cw.word_id as wordId,
        cw.exposure_count as exposureCount,
        cw.first_seen_at as firstSeenAt,
        cw.last_seen_at as lastSeenAt,
        w.id as w_id,
        w.word as w_word,
        w.phonetic as w_phonetic,
        w.part_of_speech as w_partOfSpeech,
        w.definition as w_definition,
        w.translation as w_translation,
        w.difficulty as w_difficulty,
        w.created_at as w_createdAt,
        w.updated_at as w_updatedAt
      FROM context_words cw
      JOIN words w ON cw.word_id = w.id
      WHERE cw.context_id = ?
      ORDER BY cw.first_seen_at ASC, w.word ASC
    `).all(id) as any[];

    const wordsList = rows.map((r) => ({
      wordId: r.wordId,
      exposureCount: Number(r.exposureCount ?? 1),
      firstSeenAt: r.firstSeenAt,
      lastSeenAt: r.lastSeenAt,
      word: {
        id: r.w_id,
        word: r.w_word,
        phonetic: r.w_phonetic,
        partOfSpeech: r.w_partOfSpeech,
        definition: r.w_definition,
        translation: r.w_translation,
        difficulty: r.w_difficulty,
        createdAt: r.w_createdAt,
        updatedAt: r.w_updatedAt,
      },
    }));

    return {
      id: ctx.id,
      title: ctx.title,
      content: ctx.content,
      sourceType: ctx.sourceType,
      sourceUrl: ctx.sourceUrl,
      createdAt: ctx.createdAt,
      updatedAt: ctx.updatedAt,
      wordCount: wordsList.length,
      words: wordsList,
    };
  }

  findMany(query: QueryContexts) {
    const conditions: string[] = [];
    const params: any[] = [];

    if (query.search && query.search.trim()) {
      const term = `%${query.search.trim()}%`;
      conditions.push(`(lower(c.title) LIKE lower(?) OR lower(c.content) LIKE lower(?))`);
      params.push(term, term);
    }

    if (query.sourceType) {
      conditions.push(`lower(c.source_type) = lower(?)`);
      params.push(query.sourceType.trim());
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRow = this.sqlite.prepare(
      `SELECT count(*) as count FROM contexts c ${whereClause}`
    ).get(...params) as { count: number };

    const total = Number(countRow?.count ?? 0);

    const page = Math.max(1, query.page ?? 1);
    const limit = Math.max(1, Math.min(100, query.limit ?? 20));
    const offset = (page - 1) * limit;

    const rows = this.sqlite.prepare(`
      SELECT 
        c.id,
        c.title,
        c.content,
        c.source_type as sourceType,
        c.source_url as sourceUrl,
        c.created_at as createdAt,
        c.updated_at as updatedAt,
        (SELECT count(*) FROM context_words cw WHERE cw.context_id = c.id) as wordCount
      FROM contexts c
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset) as any[];

    const items = rows.map((r) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      sourceType: r.sourceType,
      sourceUrl: r.sourceUrl,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      wordCount: Number(r.wordCount ?? 0),
    }));

    return { total, page, limit, items };
  }

  update(id: string, data: UpdateContext) {
    const existing = this.db.select().from(contexts).where(eq(contexts.id, id)).all()[0];
    if (!existing) return null;

    const now = new Date().toISOString();
    const updateValues: Partial<typeof contexts.$inferInsert> = {
      updatedAt: now,
    };

    if (data.title !== undefined) updateValues.title = data.title.trim();
    if (data.content !== undefined) updateValues.content = data.content.trim();
    if (data.sourceType !== undefined) updateValues.sourceType = data.sourceType;
    if (data.sourceUrl !== undefined) updateValues.sourceUrl = data.sourceUrl ? data.sourceUrl.trim() : null;

    this.db.update(contexts).set(updateValues).where(eq(contexts.id, id)).run();

    return this.findById(id);
  }

  delete(id: string): boolean {
    const existing = this.db.select().from(contexts).where(eq(contexts.id, id)).all()[0];
    if (!existing) return false;

    this.db.transaction((tx) => {
      this.sqlite.prepare('DELETE FROM context_words WHERE context_id = ?').run(id);
      tx.delete(contexts).where(eq(contexts.id, id)).run();
    });

    return true;
  }

  linkWords(contextId: string, wordIds: string[]) {
    const existingContext = this.db.select().from(contexts).where(eq(contexts.id, contextId)).all()[0];
    if (!existingContext) return null;

    const now = new Date().toISOString();
    const distinctWordIds = Array.from(new Set(wordIds));

    this.db.transaction(() => {
      const selectStmt = this.sqlite.prepare(
        'SELECT exposure_count FROM context_words WHERE context_id = ? AND word_id = ?'
      );
      const updateStmt = this.sqlite.prepare(
        'UPDATE context_words SET exposure_count = exposure_count + 1, last_seen_at = ? WHERE context_id = ? AND word_id = ?'
      );
      const insertStmt = this.sqlite.prepare(
        'INSERT INTO context_words (context_id, word_id, exposure_count, first_seen_at, last_seen_at) VALUES (?, ?, 1, ?, ?)'
      );

      for (const wordId of distinctWordIds) {
        const existing = selectStmt.get(contextId, wordId) as { exposure_count: number } | undefined;
        if (existing) {
          updateStmt.run(now, contextId, wordId);
        } else {
          insertStmt.run(contextId, wordId, now, now);
        }
      }
    });

    return this.findById(contextId);
  }

  unlinkWord(contextId: string, wordId: string): boolean {
    const res = this.sqlite.prepare(
      'DELETE FROM context_words WHERE context_id = ? AND word_id = ?'
    ).run(contextId, wordId);
    return res.changes > 0;
  }

  findWordById(wordId: string) {
    return this.db.select().from(words).where(eq(words.id, wordId)).all()[0] ?? null;
  }

  findWordsByIds(wordIds: string[]) {
    if (wordIds.length === 0) return [];
    return this.db.select().from(words).where(inArray(words.id, wordIds)).all();
  }
}
