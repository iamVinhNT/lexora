/**
 * @file ai-assistant-context.ts
 * @description Bounded server-owned menu data, without answer keys, secrets or unconsented progress.
 */
import type { AiAssistantChatRequest } from '../schemas/ai-conversation.schema.js';
import { civilDateAt } from '../domain/study/calendar-date.js';
import { AppError, type VocabularyService } from './vocabulary.service.js';
import type { ContextService } from './context.service.js';
import type { GrammarService } from './grammar.service.js';
import type { SessionService } from './session.service.js';
import type { StudyService } from './study.service.js';
import type { AnalyticsService } from './analytics.service.js';

export interface AiAssistantContextServices {
  vocabularyService?: VocabularyService;
  contextService?: ContextService;
  grammarService?: GrammarService;
  sessionService?: SessionService;
  studyService?: StudyService;
  analyticsService?: AnalyticsService;
}
export type AssistantResolvedContext = { kind: 'general' | 'screen'; label: string; data: Record<string, unknown> };
const SCREEN_NAMES = {
  vi: { overview: 'Tổng quan', learn: 'Học từ vựng', review: 'Ôn tập', vocabulary: 'Kho từ vựng', calendar: 'Lịch học tập', grammar: 'Ngữ pháp', contexts: 'Ngữ cảnh', statistics: 'Thống kê', settings: 'Cài đặt' },
  en: { overview: 'Overview', learn: 'Learn', review: 'Review', vocabulary: 'Vocabulary', calendar: 'Calendar', grammar: 'Grammar', contexts: 'Contexts', statistics: 'Statistics', settings: 'Settings' },
};
function required<T>(service: T | undefined): T {
  if (!service) throw new AppError(500, 'INTERNAL_ERROR', 'Assistant context service unavailable');
  return service;
}

export function resolveAssistantContext(services: AiAssistantContextServices, input: AiAssistantChatRequest): AssistantResolvedContext {
  const { context, locale, includeContent, includeProgress } = input;
  if (context.kind === 'general') return { kind: 'general', label: locale === 'vi' ? 'Trợ lý chung' : 'General assistant', data: {} };
  const { screen } = context;
  const result: AssistantResolvedContext = { kind: 'screen', label: SCREEN_NAMES[locale][screen], data: { screen } };
  if (!includeContent) return { ...result, data: { screen, contentIncluded: false } };
  switch (screen) {
    case 'vocabulary': {
      const list = required(services.vocabularyService).listWords({ page: 1, limit: 30 });
      const words = list.items.map(item => ({
        word: item.word.slice(0, 128), definition: item.definition.slice(0, 500),
        translation: item.translation?.slice(0, 200) ?? null, partOfSpeech: item.partOfSpeech?.slice(0, 80) ?? null,
      }));
      result.data = { screen, total: list.total, supplied: words.length, truncated: list.total > words.length,
        textTruncated: list.items.some(item => item.word.length > 128 || item.definition.length > 500 || (item.translation?.length ?? 0) > 200 || (item.partOfSpeech?.length ?? 0) > 80), words };
      break;
    }
    case 'contexts': {
      const list = required(services.contextService).listContexts({ page: 1, limit: 15 });
      const contexts = list.items.map(item => ({ title: item.title.slice(0, 160), content: item.content.slice(0, 250) }));
      result.data = { screen, total: list.total, supplied: contexts.length, truncated: list.total > contexts.length,
        textTruncated: list.items.some(item => item.title.length > 160 || item.content.length > 250), contexts };
      break;
    }
    case 'grammar': {
      const course = required(services.grammarService).getCourse();
      const stages = course.stages.map(stage => ({ level: stage.level, title: stage.title, lessonCount: stage.lessons.length,
        lessons: stage.lessons.slice(0, 5).map(lesson => ({ title: lesson.title, objective: lesson.objective })) }));
      const totalLessons = course.stages.reduce((sum, stage) => sum + stage.lessons.length, 0);
      const suppliedLessons = stages.reduce((sum, stage) => sum + stage.lessons.length, 0);
      result.data = { screen, totalStages: stages.length, totalLessons, suppliedLessons, truncated: suppliedLessons < totalLessons, stages };
      break;
    }
    case 'calendar': {
      const study = required(services.studyService);
      const preferences = study.getPreferences();
      result.data = { screen, preferences: preferences ? { timeZone: preferences.timeZone, studyDays: preferences.studyDays,
        learningTarget: preferences.learningTarget, reviewTarget: preferences.reviewTarget, grammarTarget: preferences.grammarTarget } : null };
      if (includeProgress) {
        const now = new Date().toISOString();
        const today = civilDateAt(now, preferences?.timeZone ?? 'UTC');
        const calendar = study.getCalendar({ from: today, to: today }, now);
        const tasks = calendar.days[0]?.tasks ?? [];
        result.data.calendar = { date: today, total: tasks.length, supplied: Math.min(tasks.length, 30), truncated: tasks.length > 30,
          todayTasks: tasks.slice(0, 30).map(task => ({ kind: task.kind, targetCount: task.targetCount, isComplete: task.isComplete })) };
      }
      break;
    }
    case 'learn': {
      const active = required(services.sessionService).findActiveSession();
      result.data = { screen, hasActiveSession: Boolean(active), ...(active ? { mode: active.mode, step: active.cursor.step } : {}) };
      if (includeProgress && active) result.data.totalWords = active.totalWords;
      break;
    }
    case 'review':
      if (includeProgress) result.data.totalDue = required(services.analyticsService).getDashboardStatistics().dueCount;
      break;
    case 'statistics':
    case 'overview':
    case 'settings': break;
  }
  return result;
}
