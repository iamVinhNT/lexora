import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real, primaryKey, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// 1. Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// 2. Words table
export const words = sqliteTable(
  'words',
  {
    id: text('id').primaryKey(),
    word: text('word').notNull(),
    phonetic: text('phonetic'),
    partOfSpeech: text('part_of_speech'),
    definition: text('definition').notNull(),
    translation: text('translation'),
    difficulty: text('difficulty'),
    createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
    updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
  },
  (table) => ({
    wordIdx: index('idx_words_word').on(table.word),
  })
);

// 3. Word Families table
export const wordFamilies = sqliteTable(
  'word_families',
  {
    id: text('id').primaryKey(),
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    relatedWordId: text('related_word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    relationship: text('relationship').notNull(),
  },
  (table) => ({
    wordIdIdx: index('idx_word_families_word_id').on(table.wordId),
    relatedWordIdIdx: index('idx_word_families_related_word_id').on(table.relatedWordId),
  })
);

// 4. Collocations table
export const collocations = sqliteTable(
  'collocations',
  {
    id: text('id').primaryKey(),
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    phrase: text('phrase').notNull(),
  },
  (table) => ({
    wordIdIdx: index('idx_collocations_word_id').on(table.wordId),
  })
);

// 5. Examples table
export const examples = sqliteTable(
  'examples',
  {
    id: text('id').primaryKey(),
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    sentence: text('sentence').notNull(),
    translation: text('translation'),
    source: text('source'),
  },
  (table) => ({
    wordIdIdx: index('idx_examples_word_id').on(table.wordId),
  })
);

// 6. Contexts table
export const contexts = sqliteTable('contexts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  sourceType: text('source_type'),
  sourceUrl: text('source_url'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
});

// 7. Context Words join table
export const contextWords = sqliteTable(
  'context_words',
  {
    contextId: text('context_id')
      .notNull()
      .references(() => contexts.id, { onDelete: 'cascade' }),
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    exposureCount: integer('exposure_count').notNull().default(1),
    firstSeenAt: text('first_seen_at'),
    lastSeenAt: text('last_seen_at'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.contextId, table.wordId] }),
    contextIdIdx: index('idx_context_words_context_id').on(table.contextId),
    wordIdIdx: index('idx_context_words_word_id').on(table.wordId),
  })
);

// 8. Learning Progress table
export const learningProgress = sqliteTable(
  'learning_progress',
  {
    id: text('id').primaryKey(),
    wordId: text('word_id')
      .notNull()
      .unique()
      .references(() => words.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('NEW'),
    recognitionScore: integer('recognition_score').notNull().default(0),
    recallScore: integer('recall_score').notNull().default(0),
    productionScore: integer('production_score').notNull().default(0),
    lastStudiedAt: text('last_studied_at'),
    updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
  },
  (table) => ({
    wordIdIdx: index('idx_learning_progress_word_id').on(table.wordId),
  })
);

// 9. Review States table
export const reviewStates = sqliteTable(
  'review_states',
  {
    id: text('id').primaryKey(),
    wordId: text('word_id')
      .notNull()
      .unique()
      .references(() => words.id, { onDelete: 'cascade' }),
    interval: integer('interval').notNull().default(0),
    easeFactor: real('ease_factor').notNull().default(2.5),
    repetitions: integer('repetitions').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    dueAt: text('due_at').notNull(),
    lastReviewedAt: text('last_reviewed_at'),
  },
  (table) => ({
    wordIdIdx: index('idx_review_states_word_id').on(table.wordId),
    dueAtIdx: index('idx_review_states_due_at').on(table.dueAt),
  })
);

// 10. Review Logs table
export const reviewLogs = sqliteTable(
  'review_logs',
  {
    id: text('id').primaryKey(),
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    reviewType: text('review_type').notNull(),
    rating: text('rating').notNull(),
    responseTime: integer('response_time'),
    answer: text('answer'),
    correct: integer('correct', { mode: 'boolean' }),
    performanceScore: integer('performance_score'),
    createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  },
  (table) => ({
    wordIdIdx: index('idx_review_logs_word_id').on(table.wordId),
    createdAtIdx: index('idx_review_logs_created_at').on(table.createdAt),
  })
);

// 11. Tags table
export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});

// 12. Word Tags join table
export const wordTags = sqliteTable(
  'word_tags',
  {
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    tagId: text('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.wordId, table.tagId] }),
    wordIdIdx: index('idx_word_tags_word_id').on(table.wordId),
    tagIdIdx: index('idx_word_tags_tag_id').on(table.tagId),
  })
);

// 13. Learning Sessions table
export const learningSessions = sqliteTable('learning_sessions', {
  id: text('id').primaryKey(),
  sessionType: text('session_type').notNull(),
  totalWords: integer('total_words').notNull().default(0),
  status: text('status').notNull().default('IN_PROGRESS'),
  startedAt: text('started_at').notNull().$defaultFn(() => new Date().toISOString()),
  completedAt: text('completed_at'),
}, (table) => ({
  statusIdx: index('idx_learning_sessions_status').on(table.status),
  startedAtIdx: index('idx_learning_sessions_started_at').on(table.startedAt),
  oneActiveUnique: uniqueIndex('uq_learning_sessions_one_active').on(table.status).where(sql`${table.status} = 'IN_PROGRESS'`),
}));

// 14. Learning Session Items table
export const learningSessionItems = sqliteTable(
  'learning_session_items',
  {
    id: text('id').primaryKey(),
    sessionId: text('session_id')
      .notNull()
      .references(() => learningSessions.id, { onDelete: 'cascade' }),
    wordId: text('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0),
    groupIndex: integer('group_index').notNull().default(0),
    completedStep: text('completed_step'),
    recallResult: text('recall_result'),
    outputSentence: text('output_sentence'),
    reviewRating: text('review_rating'),
    createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  },
  (table) => ({
    sessionIdIdx: index('idx_learning_session_items_session_id').on(table.sessionId),
    wordIdIdx: index('idx_learning_session_items_word_id').on(table.wordId),
    groupPositionIdx: index('idx_learning_session_items_group_position').on(table.sessionId, table.groupIndex, table.position),
    sessionPositionUnique: uniqueIndex('uq_learning_session_items_position').on(table.sessionId, table.position),
    sessionWordUnique: uniqueIndex('uq_learning_session_items_word').on(table.sessionId, table.wordId),
  })
);

export const learningAttempts = sqliteTable('learning_attempts', {
  id: text('id').primaryKey(),
  sessionItemId: text('session_item_id').notNull().references(() => learningSessionItems.id, { onDelete: 'cascade' }),
  requestId: text('request_id').notNull().unique(),
  type: text('type').notNull(),
  attemptNumber: integer('attempt_number').notNull(),
  answer: text('answer').notNull(),
  result: text('result').notNull(),
  performanceScore: integer('performance_score').notNull(),
  feedbackCodes: text('feedback_codes'),
  explanation: text('explanation'),
  suggestion: text('suggestion'),
  source: text('source').notNull().default('LOCAL'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
}, (table) => ({
  itemIdx: index('idx_learning_attempts_session_item_id').on(table.sessionItemId),
  itemTypeIdx: index('idx_learning_attempts_item_type').on(table.sessionItemId, table.type),
  itemTypeAttemptUnique: uniqueIndex('uq_learning_attempts_item_type_attempt').on(table.sessionItemId, table.type, table.attemptNumber),
}));

// Grammar content remains bundled; only learner state is stored in SQLite.
export const grammarLessonProgress = sqliteTable('grammar_lesson_progress', {
  lessonId: text('lesson_id').notNull().primaryKey(),
  revisionId: text('revision_id').notNull(),
  revision: text('revision').notNull(),
  lastPosition: integer('last_position').notNull().default(0),
  isComplete: integer('is_complete', { mode: 'boolean' }).notNull().default(false),
  completedAt: text('completed_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, (table) => ({
  updatedAtIdx: index('idx_grammar_lesson_progress_updated_at').on(table.updatedAt),
}));

export const grammarExerciseAttempts = sqliteTable('grammar_exercise_attempts', {
  id: text('id').notNull().primaryKey(),
  lessonId: text('lesson_id').notNull().references(() => grammarLessonProgress.lessonId, { onDelete: 'cascade' }),
  revisionId: text('revision_id').notNull(),
  revision: text('revision').notNull(),
  exerciseId: text('exercise_id').notNull(),
  requestId: text('request_id').notNull().unique(),
  answer: text('answer').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull(),
  feedback: text('feedback').notNull(),
  createdAt: text('created_at').notNull(),
}, (table) => ({
  lessonIdx: index('idx_grammar_exercise_attempts_lesson_id').on(table.lessonId),
  exerciseIdx: index('idx_grammar_exercise_attempts_exercise_id').on(table.exerciseId),
  createdAtIdx: index('idx_grammar_exercise_attempts_created_at').on(table.createdAt),
}));

// Relations definitions for Drizzle Relational Queries
export const wordsRelations = relations(words, ({ many, one }) => ({
  wordFamilies: many(wordFamilies, { relationName: 'wordFamilies' }),
  relatedWordFamilies: many(wordFamilies, { relationName: 'relatedWordFamilies' }),
  collocations: many(collocations),
  examples: many(examples),
  contextWords: many(contextWords),
  learningProgress: one(learningProgress, {
    fields: [words.id],
    references: [learningProgress.wordId],
  }),
  reviewState: one(reviewStates, {
    fields: [words.id],
    references: [reviewStates.wordId],
  }),
  reviewLogs: many(reviewLogs),
  wordTags: many(wordTags),
  learningSessionItems: many(learningSessionItems),
}));

export const wordFamiliesRelations = relations(wordFamilies, ({ one }) => ({
  word: one(words, {
    fields: [wordFamilies.wordId],
    references: [words.id],
    relationName: 'wordFamilies',
  }),
  relatedWord: one(words, {
    fields: [wordFamilies.relatedWordId],
    references: [words.id],
    relationName: 'relatedWordFamilies',
  }),
}));

export const collocationsRelations = relations(collocations, ({ one }) => ({
  word: one(words, {
    fields: [collocations.wordId],
    references: [words.id],
  }),
}));

export const examplesRelations = relations(examples, ({ one }) => ({
  word: one(words, {
    fields: [examples.wordId],
    references: [words.id],
  }),
}));

export const contextsRelations = relations(contexts, ({ many }) => ({
  contextWords: many(contextWords),
}));

export const contextWordsRelations = relations(contextWords, ({ one }) => ({
  context: one(contexts, {
    fields: [contextWords.contextId],
    references: [contexts.id],
  }),
  word: one(words, {
    fields: [contextWords.wordId],
    references: [words.id],
  }),
}));

export const learningProgressRelations = relations(learningProgress, ({ one }) => ({
  word: one(words, {
    fields: [learningProgress.wordId],
    references: [words.id],
  }),
}));

export const reviewStatesRelations = relations(reviewStates, ({ one }) => ({
  word: one(words, {
    fields: [reviewStates.wordId],
    references: [words.id],
  }),
}));

export const reviewLogsRelations = relations(reviewLogs, ({ one }) => ({
  word: one(words, {
    fields: [reviewLogs.wordId],
    references: [words.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  wordTags: many(wordTags),
}));

export const wordTagsRelations = relations(wordTags, ({ one }) => ({
  word: one(words, {
    fields: [wordTags.wordId],
    references: [words.id],
  }),
  tag: one(tags, {
    fields: [wordTags.tagId],
    references: [tags.id],
  }),
}));

export const learningSessionsRelations = relations(learningSessions, ({ many }) => ({
  items: many(learningSessionItems),
}));

export const learningSessionItemsRelations = relations(learningSessionItems, ({ one }) => ({
  session: one(learningSessions, {
    fields: [learningSessionItems.sessionId],
    references: [learningSessions.id],
  }),
  word: one(words, {
    fields: [learningSessionItems.wordId],
    references: [words.id],
  }),
}));

// Export inferred types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Word = typeof words.$inferSelect;
export type NewWord = typeof words.$inferInsert;
export type WordFamily = typeof wordFamilies.$inferSelect;
export type NewWordFamily = typeof wordFamilies.$inferInsert;
export type Collocation = typeof collocations.$inferSelect;
export type NewCollocation = typeof collocations.$inferInsert;
export type Example = typeof examples.$inferSelect;
export type NewExample = typeof examples.$inferInsert;
export type Context = typeof contexts.$inferSelect;
export type NewContext = typeof contexts.$inferInsert;
export type ContextWord = typeof contextWords.$inferSelect;
export type NewContextWord = typeof contextWords.$inferInsert;
export type LearningProgress = typeof learningProgress.$inferSelect;
export type NewLearningProgress = typeof learningProgress.$inferInsert;
export type ReviewState = typeof reviewStates.$inferSelect;
export type NewReviewState = typeof reviewStates.$inferInsert;
export type ReviewLog = typeof reviewLogs.$inferSelect;
export type NewReviewLog = typeof reviewLogs.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type WordTag = typeof wordTags.$inferSelect;
export type NewWordTag = typeof wordTags.$inferInsert;
export type LearningSession = typeof learningSessions.$inferSelect;
export type NewLearningSession = typeof learningSessions.$inferInsert;
export type LearningSessionItem = typeof learningSessionItems.$inferSelect;
export type NewLearningSessionItem = typeof learningSessionItems.$inferInsert;
export type GrammarLessonProgress = typeof grammarLessonProgress.$inferSelect;
export type GrammarExerciseAttempt = typeof grammarExerciseAttempts.$inferSelect;
