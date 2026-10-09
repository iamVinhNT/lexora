/**
 * @file review-evidence.repository.ts
 * @description Vocabulary, schedule and knowledge evidence access for atomic adaptive review orchestration.
 */
import { eq } from 'drizzle-orm';
import type { AppDatabase } from '../db/client.js';
import { words, examples, contexts, contextWords, reviewStates, reviewLogs, learningProgress } from '../db/schema.js';

export class ReviewEvidenceRepository {
  constructor(private readonly db: AppDatabase) {}

  getWord(wordId: string) {
    return this.db.select().from(words).where(eq(words.id, wordId)).get();
  }

  getExamples(wordId: string) {
    return this.db.select().from(examples).where(eq(examples.wordId, wordId)).all();
  }

  getContexts(wordId: string) {
    return this.db.select({ title: contexts.title, content: contexts.content })
      .from(contextWords).innerJoin(contexts, eq(contexts.id, contextWords.contextId))
      .where(eq(contextWords.wordId, wordId)).all();
  }

  getReviewState(wordId: string) {
    return this.db.select().from(reviewStates).where(eq(reviewStates.wordId, wordId)).get();
  }

  getHistory(wordId: string) {
    return this.db.select().from(reviewLogs).where(eq(reviewLogs.wordId, wordId)).all();
  }

  getProgress(wordId: string) {
    return this.db.select().from(learningProgress).where(eq(learningProgress.wordId, wordId)).get();
  }

  getReviewLog(id: string) {
    return this.db.select().from(reviewLogs).where(eq(reviewLogs.id, id)).get();
  }

  updateReviewState(wordId: string, data: Partial<typeof reviewStates.$inferInsert>) {
    this.db.update(reviewStates).set(data).where(eq(reviewStates.wordId, wordId)).run();
  }

  insertReviewState(data: typeof reviewStates.$inferInsert) {
    this.db.insert(reviewStates).values(data).run();
  }

  insertReviewLog(data: typeof reviewLogs.$inferInsert) {
    this.db.insert(reviewLogs).values(data).run();
  }

  updateProgress(wordId: string, data: Partial<typeof learningProgress.$inferInsert>) {
    this.db.update(learningProgress).set(data).where(eq(learningProgress.wordId, wordId)).run();
  }

  insertProgress(data: typeof learningProgress.$inferInsert) {
    this.db.insert(learningProgress).values(data).run();
  }
}
