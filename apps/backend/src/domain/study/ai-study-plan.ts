/**
 * @file ai-study-plan.ts
 * @description Builds the allowlisted planner snapshot and validates suggestions against it.
 */
import { civilDateAt, isCivilDate } from './calendar-date.js';
import type { StudyCalendarResult, StudyPreferencesInput } from '../../schemas/study.schema.js';
import type { AiStudyPlanSuggestion, AiStudyPlannerModelOutput, AiStudyPlannerProviderInput } from '../../schemas/ai-study-planner.schema.js';

export interface AiStudyPlannerCatalog {
  newWordCount: number;
  contexts: Array<{ id: string; title: string; wordCount: number }>;
  topics: Array<{ id: string; title: string; wordCount: number }>;
}

export interface AiStudyPlannerGrammarCandidate {
  lessonId: string;
  revisionId: string;
  revision: string;
  title: string;
}

export interface AiStudyPlanSnapshotSource {
  locale: 'en' | 'vi';
  preferences: StudyPreferencesInput;
  today: string;
  to: string;
  calendar: StudyCalendarResult;
  weakWordCount: number;
  recentCalendar: StudyCalendarResult;
  catalog: AiStudyPlannerCatalog;
  grammarCandidate: AiStudyPlannerGrammarCandidate | null;
}

export interface AiStudyPlanSnapshot {
  providerInput: AiStudyPlannerProviderInput;
  learningMax: Readonly<Record<'new_words' | 'weak_words', number>>;
  contextMax: ReadonlyMap<string, number>;
  topicMax: ReadonlyMap<string, number>;
  grammarCandidates: ReadonlyMap<string, AiStudyPlannerGrammarCandidate>;
  reviewMax: ReadonlyMap<string, number>;
}

function weekday(date: string): number {
  const day = new Date(date + 'T00:00:00.000Z').getUTCDay();
  return day === 0 ? 7 : day;
}


export function buildAiStudyPlanSnapshot(source: AiStudyPlanSnapshotSource): AiStudyPlanSnapshot {
  const learningMax: Record<'new_words' | 'weak_words', number> = { new_words: 0, weak_words: 0 };
  const learningModes: AiStudyPlannerProviderInput['candidates']['learningModes'] = [];
  for (const [mode, availableCount] of [['new_words', source.catalog.newWordCount], ['weak_words', source.weakWordCount]] as const) {
    const maxQuantity = Math.min(source.preferences.learningTarget, availableCount);
    if (maxQuantity > 0) {
      learningMax[mode] = maxQuantity;
      learningModes.push({ mode, availableCount, maxQuantity });
    }
  }
  const contextMax = new Map<string, number>();
  const contexts = source.catalog.contexts.flatMap((candidate) => {
    const maxQuantity = Math.min(source.preferences.learningTarget, candidate.wordCount);
    if (maxQuantity <= 0) return [];
    contextMax.set(candidate.id, maxQuantity);
    return [{ id: candidate.id, title: candidate.title, availableCount: candidate.wordCount, maxQuantity }];
  });
  const topicMax = new Map<string, number>();
  const topics = source.catalog.topics.flatMap((candidate) => {
    const maxQuantity = Math.min(source.preferences.learningTarget, candidate.wordCount);
    if (maxQuantity <= 0) return [];
    topicMax.set(candidate.id, maxQuantity);
    return [{ id: candidate.id, title: candidate.title, availableCount: candidate.wordCount, maxQuantity }];
  });
  const grammarCandidates = new Map<string, AiStudyPlannerGrammarCandidate>();
  const grammar = source.preferences.grammarTarget === 1 && source.grammarCandidate
    ? [{ ...source.grammarCandidate, maxQuantity: 1 as const }]
    : [];
  for (const candidate of grammar) grammarCandidates.set(candidate.lessonId, candidate);

  const dueCounts = source.calendar.days.map((day) => {
    const availableCount = day.date === source.today
      ? source.calendar.backlogCount + (day.dueNowCount ?? 0)
      : day.scheduledDueCount ?? 0;
    const maxQuantity = Math.min(source.preferences.reviewTarget, availableCount);
    return { date: day.date, scheduledDueCount: day.scheduledDueCount ?? 0, availableCount, maxQuantity };
  });
  const reviewMax = new Map(dueCounts.map((due) => [due.date, due.maxQuantity]));

  const activity = new Map<string, { date: string; kind: 'LEARN_WORDS' | 'REVIEW_WORDS' | 'GRAMMAR'; activityCount: number; wordCount: number }>();
  for (const day of source.recentCalendar.days) {
    for (const item of day.activities) {
      const date = civilDateAt(item.occurredAt, source.preferences.timeZone);
      const key = JSON.stringify([date, item.kind]);
      const aggregate = activity.get(key) ?? { date, kind: item.kind, activityCount: 0, wordCount: 0 };
      aggregate.activityCount += 1;
      aggregate.wordCount += item.wordCount ?? 0;
      activity.set(key, aggregate);
    }
  }
  const recentActivity = [...activity.values()].sort((left, right) => left.date.localeCompare(right.date) || left.kind.localeCompare(right.kind));

  const existingTasks: AiStudyPlannerProviderInput['existingTasks'] = source.calendar.days.flatMap((day) => day.tasks.map((task) => ({
    id: task.id,
    scheduledDate: task.scheduledDate,
    kind: task.kind,
    mode: task.kind === 'LEARN_WORDS' ? task.mode : null,
    contextId: task.kind === 'LEARN_WORDS' ? task.contextId ?? null : null,
    topicId: task.kind === 'LEARN_WORDS' ? task.topicId ?? null : null,
    lessonId: task.kind === 'GRAMMAR' ? task.lessonId : null,
    revisionId: task.kind === 'GRAMMAR' ? task.revisionId : null,
    targetCount: task.targetCount,
    completedCount: task.completedCount,
    cancelled: task.cancelledAt !== null,
    transferred: task.transferredAt !== null,
  })));
  const providerInput: AiStudyPlannerProviderInput = {
    locale: source.locale,
    preferences: {
      timeZone: source.preferences.timeZone,
      studyDays: [...source.preferences.studyDays],
      learningTarget: source.preferences.learningTarget,
      reviewTarget: source.preferences.reviewTarget,
      grammarTarget: source.preferences.grammarTarget,
    },
    range: { from: source.today, to: source.to },
    days: source.calendar.days.map((day) => ({ date: day.date, status: day.status, isStudyDay: source.preferences.studyDays.includes(weekday(day.date)) })),
    backlogCount: source.calendar.backlogCount,
    dueCounts,
    aggregateWordCounts: { newWords: source.catalog.newWordCount, weakWords: source.weakWordCount },
    recentActivity,
    existingTasks,
    candidates: {
      learningModes, contexts, topics, grammar,
    },
  };
  return { providerInput, learningMax, contextMax, topicMax, grammarCandidates, reviewMax };
}

export class InvalidAiStudyPlanError extends Error {
  constructor() { super('AI planner returned an invalid plan'); this.name = 'InvalidAiStudyPlanError'; }
}

function invalidPlan(): never {
  throw new InvalidAiStudyPlanError();
}

export function validateAiStudyPlan(output: AiStudyPlannerModelOutput, snapshot: AiStudyPlanSnapshot): AiStudyPlanSuggestion[] {
  const { providerInput } = snapshot;
  const occupied = new Set<string>();
  const suggestions: AiStudyPlanSuggestion[] = [];
  for (const item of output.suggestions) {
    if (!isCivilDate(item.scheduledDate) || item.scheduledDate < providerInput.range.from || item.scheduledDate > providerInput.range.to) invalidPlan();
    const day = providerInput.days.find((candidate) => candidate.date === item.scheduledDate);
    if (!day?.isStudyDay || !providerInput.preferences.studyDays.includes(weekday(item.scheduledDate))) invalidPlan();

    const key = item.kind === 'GRAMMAR'
      ? JSON.stringify(['GRAMMAR', item.scheduledDate, item.lessonId])
      : JSON.stringify([item.kind, item.scheduledDate]);
    if (occupied.has(key)) invalidPlan();
    occupied.add(key);

    if (item.kind === 'LEARN_WORDS') {
      if (item.lessonId !== null || item.revisionId !== null) invalidPlan();
      let maxQuantity: number | undefined;
      if (item.mode === 'new_words' || item.mode === 'weak_words') {
        if (item.contextId !== null || item.topicId !== null) invalidPlan();
        maxQuantity = snapshot.learningMax[item.mode];
      } else if (item.mode === 'context' && item.contextId !== null && item.topicId === null) {
        maxQuantity = snapshot.contextMax.get(item.contextId);
      } else if (item.mode === 'topic' && item.topicId !== null && item.contextId === null) {
        maxQuantity = snapshot.topicMax.get(item.topicId);
      } else invalidPlan();
      if (maxQuantity === undefined || item.targetCount > maxQuantity) invalidPlan();
      if (providerInput.existingTasks.some((task) => task.kind === 'LEARN_WORDS' && task.scheduledDate === item.scheduledDate && !task.cancelled && !task.transferred)) invalidPlan();
      const { mode: selectedMode, contextId, topicId, scheduledDate, targetCount } = item;
      suggestions.push({ kind: 'LEARN_WORDS', scheduledDate, mode: selectedMode,
        ...(contextId === null ? {} : { contextId }), ...(topicId === null ? {} : { topicId }), targetCount });
      continue;
    }

    if (item.kind === 'REVIEW_WORDS') {
      if (item.mode !== null || item.contextId !== null || item.topicId !== null || item.lessonId !== null || item.revisionId !== null) invalidPlan();
      const maxQuantity = snapshot.reviewMax.get(item.scheduledDate) ?? 0;
      if (item.targetCount > maxQuantity) invalidPlan();
      if (providerInput.existingTasks.some((task) => task.kind === 'REVIEW_WORDS' && task.scheduledDate === item.scheduledDate && !task.cancelled && !task.transferred)) invalidPlan();
      suggestions.push({ kind: 'REVIEW_WORDS', scheduledDate: item.scheduledDate, targetCount: item.targetCount });
      continue;
    }

    if (item.mode !== null || item.contextId !== null || item.topicId !== null || item.lessonId === null || item.revisionId === null) invalidPlan();
    const candidate = snapshot.grammarCandidates.get(item.lessonId);
    if (!candidate || candidate.revisionId !== item.revisionId || item.targetCount !== 1) invalidPlan();
    if (providerInput.existingTasks.some((task) => task.kind === 'GRAMMAR' && task.scheduledDate === item.scheduledDate
      && task.lessonId === candidate.lessonId && !task.cancelled && !task.transferred)) invalidPlan();
    suggestions.push({ kind: 'GRAMMAR', scheduledDate: item.scheduledDate, lessonId: candidate.lessonId,
      revisionId: candidate.revisionId, revision: candidate.revision, targetCount: 1 });
  }
  return suggestions;
}
