import { eq, and, or, like, sql, desc, inArray } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { AppDatabase } from '../db/client.js';
import {
  words,
  wordFamilies,
  collocations,
  examples,
  tags,
  wordTags,
  learningProgress,
  reviewStates,
} from '../db/schema.js';
import type { CreateWord, UpdateWord, QueryWords } from '../schemas/vocabulary.schema.js';
import { ConflictError } from '../services/vocabulary.service.js';

export class VocabularyRepository {
  constructor(private db: AppDatabase) {}

  private mapWordResult(result: any) {
    if (!result) return null;
    const { wordTags: _wt, contextWords: _cw, relatedWordFamilies: _rwf, ...rest } = result;

    return {
      ...rest,
      tags: result.wordTags?.map((wt: any) => wt.tag).filter(Boolean) ?? [],
      contexts: result.contextWords?.map((cw: any) => cw.context).filter(Boolean) ?? [],
      wordFamilies: [
        ...(result.wordFamilies ?? [])
          .filter((wf: any) => wf.relatedWord)
          .map((wf: any) => ({
            id: wf.id,
            relationship: wf.relationship,
            word: {
              id: wf.relatedWord.id,
              word: wf.relatedWord.word,
              phonetic: wf.relatedWord.phonetic,
              partOfSpeech: wf.relatedWord.partOfSpeech,
              definition: wf.relatedWord.definition,
            },
          })),
        ...(result.relatedWordFamilies ?? [])
          .filter((rwf: any) => rwf.word)
          .map((rwf: any) => ({
            id: rwf.id,
            relationship: rwf.relationship,
            word: {
              id: rwf.word.id,
              word: rwf.word.word,
              phonetic: rwf.word.phonetic,
              partOfSpeech: rwf.word.partOfSpeech,
              definition: rwf.word.definition,
            },
          })),
      ],
    };
  }

  create(data: CreateWord) {
    let wordId = '';
    const now = new Date().toISOString();

    this.db.transaction((tx) => {
      const normalizedWord = data.word.trim();
      const existing = tx
        .select({ id: words.id })
        .from(words)
        .where(sql`lower(${words.word}) = lower(${normalizedWord})`)
        .all()[0];
      if (existing) {
        throw new ConflictError(`Word "${data.word}" already exists`);
      }

      wordId = randomUUID();

      tx.insert(words)
        .values({
          id: wordId,
          word: data.word,
          phonetic: data.phonetic ?? null,
          partOfSpeech: data.partOfSpeech ?? null,
          definition: data.definition,
          translation: data.translation ?? null,
          difficulty: data.difficulty ?? null,
          createdAt: now,
          updatedAt: now,
        })
        .run();

      if (data.wordFamilies && data.wordFamilies.length > 0) {
        for (const wf of data.wordFamilies) {
          if (wf.relatedWordId && wf.relationship) {
            tx.insert(wordFamilies)
              .values({
                id: randomUUID(),
                wordId,
                relatedWordId: wf.relatedWordId,
                relationship: wf.relationship,
              })
              .run();
          }
        }
      }

      if (data.collocations && data.collocations.length > 0) {
        for (const col of data.collocations) {
          const phrase = typeof col === 'string' ? col.trim() : col.phrase.trim();
          if (phrase) {
            tx.insert(collocations)
              .values({
                id: randomUUID(),
                wordId,
                phrase,
              })
              .run();
          }
        }
      }

      if (data.examples && data.examples.length > 0) {
        for (const ex of data.examples) {
          const sentence = typeof ex === 'string' ? ex.trim() : ex.sentence.trim();
          const translation = typeof ex === 'string' ? null : (ex.translation ?? null);
          const source = typeof ex === 'string' ? null : (ex.source ?? null);
          if (sentence) {
            tx.insert(examples)
              .values({
                id: randomUUID(),
                wordId,
                sentence,
                translation,
                source,
              })
              .run();
          }
        }
      }

      if (data.tags && data.tags.length > 0) {
        const distinctTags = Array.from(
          new Set(data.tags.map((t) => t.trim()).filter(Boolean))
        );
        for (const tagName of distinctTags) {
          let tagRecord = tx
            .select()
            .from(tags)
            .where(eq(tags.name, tagName))
            .all()[0];

          if (!tagRecord) {
            const newTagId = randomUUID();
            tx.insert(tags)
              .values({
                id: newTagId,
                name: tagName,
                createdAt: now,
              })
              .run();
            tagRecord = { id: newTagId, name: tagName, createdAt: now };
          }

          tx.insert(wordTags)
            .values({
              wordId,
              tagId: tagRecord.id,
            })
            .run();
        }
      }

      // Initialize learning_progress (status 'NEW', scores 0)
      tx.insert(learningProgress)
        .values({
          id: randomUUID(),
          wordId,
          status: 'NEW',
          recognitionScore: 0,
          recallScore: 0,
          productionScore: 0,
          lastStudiedAt: null,
          updatedAt: now,
        })
        .run();

      // Initialize review_states (interval 0, ease_factor 2.5, repetitions 0, lapses 0, due_at now)
      tx.insert(reviewStates)
        .values({
          id: randomUUID(),
          wordId,
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          lapses: 0,
          dueAt: now,
          lastReviewedAt: null,
        })
        .run();
    });

    return this.findById(wordId)!;
  }

  findById(id: string) {
    const result = this.db.query.words.findFirst({
      where: eq(words.id, id),
      with: {
        collocations: true,
        examples: true,
        learningProgress: true,
        reviewState: true,
        wordTags: {
          with: {
            tag: true,
          },
        },
        wordFamilies: {
          with: {
            relatedWord: true,
          },
        },
        relatedWordFamilies: {
          with: {
            word: true,
          },
        },
        contextWords: {
          with: {
            context: true,
          },
        },
      },
    }).sync();

    if (!result) return null;

    return this.mapWordResult(result);
  }

  findByWord(word: string) {
    return (
      this.db
        .select()
        .from(words)
        .where(sql`lower(${words.word}) = lower(${word.trim()})`)
        .all()[0] ?? null
    );
  }

  findMany(query: QueryWords) {
    const conditions = [];

    if (query.search && query.search.trim()) {
      const term = `%${query.search.trim()}%`;
      conditions.push(
        or(
          like(words.word, term),
          like(words.definition, term),
          inArray(
            words.id,
            this.db
              .select({ wordId: collocations.wordId })
              .from(collocations)
              .where(like(collocations.phrase, term))
          ),
          inArray(
            words.id,
            this.db
              .select({ wordId: examples.wordId })
              .from(examples)
              .where(like(examples.sentence, term))
          ),
          inArray(
            words.id,
            this.db
              .select({ wordId: wordTags.wordId })
              .from(wordTags)
              .innerJoin(tags, eq(tags.id, wordTags.tagId))
              .where(like(tags.name, term))
          )
        )
      );
    }

    if (query.difficulty && query.difficulty.trim()) {
      conditions.push(
        sql`lower(${words.difficulty}) = lower(${query.difficulty.trim()})`
      );
    }

    if (query.status) {
      conditions.push(
        inArray(
          words.id,
          this.db
            .select({ wordId: learningProgress.wordId })
            .from(learningProgress)
            .where(eq(learningProgress.status, query.status))
        )
      );
    }

    if (query.tag && query.tag.trim()) {
      const tagVal = query.tag.trim();
      conditions.push(
        inArray(
          words.id,
          this.db
            .select({ wordId: wordTags.wordId })
            .from(wordTags)
            .innerJoin(tags, eq(tags.id, wordTags.tagId))
            .where(or(sql`lower(${tags.name}) = lower(${tagVal})`, eq(tags.id, tagVal)))
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const countResult = this.db
      .select({ count: sql<number>`count(*)` })
      .from(words)
      .where(whereClause)
      .all();

    const total = Number(countResult[0]?.count ?? 0);

    const page = Math.max(1, query.page ?? 1);
    const limit = Math.max(1, Math.min(100, query.limit ?? 20));
    const offset = (page - 1) * limit;

    const rawItems = this.db.query.words.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: desc(words.createdAt),
      with: {
        collocations: true,
        examples: true,
        learningProgress: true,
        reviewState: true,
        wordTags: {
          with: {
            tag: true,
          },
        },
        wordFamilies: {
          with: {
            relatedWord: true,
          },
        },
        relatedWordFamilies: {
          with: {
            word: true,
          },
        },
        contextWords: {
          with: {
            context: true,
          },
        },
      },
    }).sync();

    const items = rawItems.map((item) => this.mapWordResult(item)!);

    return { total, page, limit, items };
  }

  update(id: string, data: UpdateWord) {
    const existing = this.db.select().from(words).where(eq(words.id, id)).all()[0];
    if (!existing) return null;

    const now = new Date().toISOString();

    this.db.transaction((tx) => {
      const updateValues: Partial<typeof words.$inferInsert> = {
        updatedAt: now,
      };

      if (data.word !== undefined) {
        const normalizedWord = data.word.trim();
        const duplicate = tx
          .select({ id: words.id })
          .from(words)
          .where(sql`lower(${words.word}) = lower(${normalizedWord})`)
          .all()[0];
        if (duplicate && duplicate.id !== id) {
          throw new ConflictError(`Word "${data.word}" already exists`);
        }
        updateValues.word = data.word;
      }
      if (data.phonetic !== undefined) updateValues.phonetic = data.phonetic;
      if (data.partOfSpeech !== undefined) updateValues.partOfSpeech = data.partOfSpeech;
      if (data.definition !== undefined) updateValues.definition = data.definition;
      if (data.translation !== undefined) updateValues.translation = data.translation;
      if (data.difficulty !== undefined) updateValues.difficulty = data.difficulty;

      tx.update(words)
        .set(updateValues)
        .where(eq(words.id, id))
        .run();

      if (data.wordFamilies !== undefined) {
        tx.delete(wordFamilies).where(eq(wordFamilies.wordId, id)).run();
        for (const wf of data.wordFamilies) {
          if (wf.relatedWordId && wf.relationship) {
            tx.insert(wordFamilies)
              .values({
                id: randomUUID(),
                wordId: id,
                relatedWordId: wf.relatedWordId,
                relationship: wf.relationship,
              })
              .run();
          }
        }
      }

      if (data.collocations !== undefined) {
        tx.delete(collocations).where(eq(collocations.wordId, id)).run();
        for (const col of data.collocations) {
          const phrase = typeof col === 'string' ? col.trim() : col.phrase.trim();
          if (phrase) {
            tx.insert(collocations)
              .values({
                id: randomUUID(),
                wordId: id,
                phrase,
              })
              .run();
          }
        }
      }

      if (data.examples !== undefined) {
        tx.delete(examples).where(eq(examples.wordId, id)).run();
        for (const ex of data.examples) {
          const sentence = typeof ex === 'string' ? ex.trim() : ex.sentence.trim();
          const translation = typeof ex === 'string' ? null : (ex.translation ?? null);
          const source = typeof ex === 'string' ? null : (ex.source ?? null);
          if (sentence) {
            tx.insert(examples)
              .values({
                id: randomUUID(),
                wordId: id,
                sentence,
                translation,
                source,
              })
              .run();
          }
        }
      }

      if (data.tags !== undefined) {
        tx.delete(wordTags).where(eq(wordTags.wordId, id)).run();
        const distinctTags = Array.from(
          new Set(data.tags.map((t) => t.trim()).filter(Boolean))
        );
        for (const tagName of distinctTags) {
          let tagRecord = tx
            .select()
            .from(tags)
            .where(eq(tags.name, tagName))
            .all()[0];

          if (!tagRecord) {
            const newTagId = randomUUID();
            tx.insert(tags)
              .values({
                id: newTagId,
                name: tagName,
                createdAt: now,
              })
              .run();
            tagRecord = { id: newTagId, name: tagName, createdAt: now };
          }

          tx.insert(wordTags)
            .values({
              wordId: id,
              tagId: tagRecord.id,
            })
            .run();
        }
      }
    });

    return this.findById(id);
  }

  delete(id: string): boolean {
    const existing = this.db.select().from(words).where(eq(words.id, id)).all()[0];
    if (!existing) return false;

    this.db.delete(words).where(eq(words.id, id)).run();
    return true;
  }
}
