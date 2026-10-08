/**
 * @file ai-assistant-context.ts
 * @description Resolves server-owned, allowlisted assistant context without exercise answers.
 */
import type { AiAssistantChatRequest } from '../schemas/ai-assistant.schema.js';
import { GrammarCurriculumChangedConflictError, GrammarLessonUnavailableError } from '../grammar/course-read-model.js';
import { AppError, ConflictError, NotFoundError } from './vocabulary.service.js';
import type { VocabularyService } from './vocabulary.service.js';
import type { ContextService } from './context.service.js';
import type { GrammarService } from './grammar.service.js';
import type { SessionService } from './session.service.js';
import type { ReviewService } from './review.service.js';

export interface AiAssistantContextServices {
  vocabularyService?: VocabularyService;
  contextService?: ContextService;
  grammarService?: GrammarService;
  sessionService?: SessionService;
  reviewService?: ReviewService;
}
export type AssistantResolvedContext = { kind: string; label: string; data: Record<string, unknown> };
const SCREEN_NAMES = {
  vi: { overview: 'Tổng quan', learn: 'Học từ vựng', review: 'Ôn tập', vocabulary: 'Kho từ vựng', calendar: 'Lịch học tập', grammar: 'Ngữ pháp', contexts: 'Ngữ cảnh', statistics: 'Thống kê', settings: 'Cài đặt' },
  en: { overview: 'Overview', learn: 'Learn', review: 'Review', vocabulary: 'Vocabulary', calendar: 'Calendar', grammar: 'Grammar', contexts: 'Contexts', statistics: 'Statistics', settings: 'Settings' },
};
function required<T>(value: T | undefined): T {
  if (!value) throw new AppError(500, 'INTERNAL_ERROR', 'Assistant context service unavailable');
  return value;
}
interface AssistantWord {
  word: string; definition: string; translation: string | null; phonetic: string | null; partOfSpeech: string | null;
  examples: Array<{ sentence: string; translation: string | null }>;
}
function vocabularyData(word: AssistantWord) {
  return {
    word: word.word, definition: word.definition, translation: word.translation,
    phonetic: word.phonetic, partOfSpeech: word.partOfSpeech,
    examples: word.examples.slice(0, 5).map((example: { sentence: string; translation: string | null }) => ({ sentence: example.sentence, translation: example.translation })),
  };
}

export function resolveAssistantContext(services: AiAssistantContextServices, input: AiAssistantChatRequest): AssistantResolvedContext {
  const { context, locale } = input;
  const vi = locale === 'vi';
  switch (context.kind) {
    case 'general': return { kind: context.kind, label: vi ? 'Trợ lý chung' : 'General assistant', data: {} };
    case 'screen': return { kind: context.kind, label: SCREEN_NAMES[locale][context.screen], data: { screen: context.screen } };
    case 'grammar': {
      let lesson;
      try { lesson = required(services.grammarService).getLesson(context.lessonId); }
      catch (error) {
        if (error instanceof GrammarLessonUnavailableError) throw new NotFoundError('Grammar lesson unavailable');
        if (error instanceof GrammarCurriculumChangedConflictError) throw new ConflictError('Curriculum changed', { reason: 'CURRICULUM_CHANGED' });
        throw error;
      }
      if (lesson.revisionId !== context.revisionId) throw new ConflictError('Grammar revision changed', { reason: 'CURRICULUM_CHANGED' });
      return { kind: context.kind, label: lesson.title, data: {
        title: lesson.title, objective: lesson.objective, explanation: lesson.explanation,
        examples: lesson.examples, contrasts: lesson.contrasts, summary: lesson.summary,
      } };
    }
    case 'word': {
      const word = required(services.vocabularyService).getWordById(context.wordId);
      return { kind: context.kind, label: word.word, data: vocabularyData(word) };
    }
    case 'context': {
      const selected = required(services.contextService).getContextById(context.contextId);
      return { kind: context.kind, label: selected.title, data: { title: selected.title, content: selected.content } };
    }
    case 'learning': {
      const session = required(services.sessionService).getSessionById(context.sessionId);
      if (session.status !== 'IN_PROGRESS' || session.cursor.wordId !== context.wordId || session.cursor.step !== context.step) {
        throw new ConflictError('Learning cursor changed', { reason: 'CURSOR_MISMATCH' });
      }
      const word = required(services.vocabularyService).getWordById(context.wordId);
      if (context.step === 'RECALL') return {
        kind: context.kind, label: vi ? 'Học từ: Ôn nhớ' : 'Learning: Recall',
        data: { step: context.step, definition: word.definition, translation: word.translation },
      };
      return { kind: context.kind, label: `${word.word} · ${context.step}`, data: { step: context.step, ...vocabularyData(word) } };
    }
    case 'review': {
      const word = required(services.vocabularyService).getWordById(context.wordId);
      if (!required(services.reviewService).isWordDue(context.wordId)) throw new ConflictError('Word is not due for review', { reason: 'WORD_NOT_DUE' });
      return { kind: context.kind, label: vi ? 'Ôn tập từ vựng' : 'Vocabulary review', data: { definition: word.definition, translation: word.translation } };
    }
  }
}
