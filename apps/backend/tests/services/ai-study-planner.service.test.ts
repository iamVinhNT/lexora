/**
 * @file ai-study-planner.service.test.ts
 * @description Verifies planner snapshot privacy, candidate quotas, and model-output constraints.
 */
import { describe, expect, it } from 'vitest';
import type { StudyCalendarDay, StudyCalendarResult, StudyPreferences, StudyTaskView } from '../../src/schemas/study.schema.js';
import type { AiStudyPlannerGenerator, AiStudyPlannerProviderInput } from '../../src/services/ai-study-planner.service.js';
import { AiStudyPlannerService } from '../../src/services/ai-study-planner.service.js';
import { addCivilDays } from '../../src/domain/study/calendar-date.js';

const today = '2026-10-05';
const now = '2026-10-05T12:00:00.000Z';

function modelSuggestion(overrides: Record<string, unknown> = {}) {
  return {
    kind: 'LEARN_WORDS', scheduledDate: today, mode: 'context', contextId: 'ctx-1', topicId: null,
    lessonId: null, revisionId: null, targetCount: 2, ...overrides,
  };
}

function makeTask(overrides: Partial<StudyTaskView> = {}): StudyTaskView {
  return {
    id: 'existing-task', kind: 'LEARN_WORDS', mode: 'new_words', scheduledDate: '2026-10-07', targetCount: 2, source: 'MANUAL',
    version: 1, createdAt: now, updatedAt: now, cancelledAt: null, transferredAt: null, transferredToTaskId: null, transferredCount: 0,
    completedCount: 0, onTimeCount: 0, isComplete: false, isLate: false, isUnavailable: false, unavailableReason: null, activeSessionId: null,
    ...overrides,
  };
}

function makeDay(date: string, isStudyDay: boolean, tasks: StudyTaskView[] = [], activities: StudyCalendarDay['activities'] = []): StudyCalendarDay {
  return {
    date, status: 'NO_PLAN', tasks, activities, scheduledDueCount: date === today ? 3 : 1,
    dueNowCount: date === today ? 2 : 0, dueLaterTodayCount: date === today ? 1 : 0, isStudyDay,
  };
}

function makeHarness(generate: AiStudyPlannerGenerator, existingTasks: StudyTaskView[] = []) {
  const providerInputs: AiStudyPlannerProviderInput[] = [];
  const preferences: StudyPreferences = {
    id: 'local', timeZone: 'UTC', studyDays: [1, 3, 5], learningTarget: 3, reviewTarget: 2, grammarTarget: 1, updatedAt: now,
  };
  const plannerCandidates = {
    newWordCount: 6,
    contexts: [{ id: 'ctx-1', title: 'Reading', wordCount: 5, content: 'PRIVATE_CONTEXT_BODY', wordIds: ['PRIVATE_WORD_ID'] }],
    topics: [{ id: 'topic-1', title: 'Travel', wordCount: 4, definition: 'PRIVATE_WORD_DEFINITION' }],
  };
  const grammarCourse = {
    isComplete: false,
    nextLessonId: 'lesson-1',
    stages: [{ id: 'stage-1', level: 'A1' as const, title: 'A1', lessons: [
      { id: 'lesson-1', title: 'Present simple', objective: 'Describe present habits', revisionId: 'rev-1', revision: '1', progress: null,
        explanation: 'PRIVATE_GRAMMAR_CONTENT', exercises: [{ prompt: 'PRIVATE_EXERCISE_CONTENT' }] },
    ] }],
  };
  const calendar = {
    getCalendar(from: string, _to: string, generatedAt: string): StudyCalendarResult {
      if (from === today) {
        return { timeZone: 'UTC', today, generatedAt, backlogCount: 2,
          days: Array.from({ length: 7 }, (_value, index) => {
            const date = addCivilDays(today, index);
            const weekday = new Date(date + 'T00:00:00.000Z').getUTCDay() || 7;
            return makeDay(date, [1, 3, 5].includes(weekday), existingTasks.filter((task) => task.scheduledDate === date));
          }) };
      }
      return { timeZone: 'UTC', today, generatedAt, backlogCount: 2,
        days: [makeDay('2026-10-04', false, [], [{ kind: 'LEARN_WORDS', referenceId: 'PRIVATE_ACTIVITY_ID',
          occurredAt: '2026-10-04T10:00:00.000Z', wordCount: 4, lessonId: 'PRIVATE_LESSON_ID', studyTaskId: 'PRIVATE_TASK_ID',
          isOutsidePlan: true, isIncomplete: false, isLate: false }])] };
    },
  };
  const study = { getPreferences: () => preferences, getPlannerCandidates: () => plannerCandidates };
  const grammar = { getCourseWithProgress: () => grammarCourse };
  const analytics = { getProgressOverview: () => ({ weakWordsCount: 4 }) };
  const service = new AiStudyPlannerService(study, calendar, grammar, analytics, {
    env: { API_KEY: 'fixture-key', AI_MODEL: 'fixture-model' },
    generate: async (input) => { providerInputs.push(input); return generate(input); },
  });
  return { service, providerInputs };
}

describe('AiStudyPlannerService', () => {
  it('sends only allowlisted aggregates with server-computed quotas and returns id-free suggestions', async () => {
    const { service, providerInputs } = makeHarness(async () => ({ suggestions: [modelSuggestion()] }));

    const preview = await service.preview('en', now);
    const input = providerInputs[0]!;

    expect(preview).toMatchObject({ timeZone: 'UTC', from: today, to: '2026-10-11', suggestions: [{ kind: 'LEARN_WORDS', contextId: 'ctx-1', targetCount: 2 }] });
    expect(preview.generatedAt).toBe(now);
    expect(preview.suggestions[0]).not.toHaveProperty('id');
    expect(preview.suggestions[0]).not.toHaveProperty('source');
    expect(input).toMatchObject({ locale: 'en', preferences: { timeZone: 'UTC', studyDays: [1, 3, 5] },
      range: { from: today, to: '2026-10-11' }, backlogCount: 2, aggregateWordCounts: { newWords: 6, weakWords: 4 } });
    expect(input.dueCounts.find((item) => item.date === today)).toMatchObject({ availableCount: 4, maxQuantity: 2 });
    expect(input.candidates.contexts[0]).toMatchObject({ id: 'ctx-1', title: 'Reading', availableCount: 5, maxQuantity: 3 });
    expect(input.candidates.topics[0]).toMatchObject({ id: 'topic-1', title: 'Travel', availableCount: 4, maxQuantity: 3 });
    expect(input.candidates.grammar[0]).toMatchObject({ lessonId: 'lesson-1', revisionId: 'rev-1', maxQuantity: 1 });
    expect(input.recentActivity).toEqual([{ date: '2026-10-04', kind: 'LEARN_WORDS', activityCount: 1, wordCount: 4 }]);

    const serialized = JSON.stringify(input);
    for (const forbidden of ['PRIVATE_CONTEXT_BODY', 'PRIVATE_WORD_ID', 'PRIVATE_WORD_DEFINITION', 'PRIVATE_GRAMMAR_CONTENT',
      'PRIVATE_EXERCISE_CONTENT', 'PRIVATE_ACTIVITY_ID', 'PRIVATE_LESSON_ID', 'PRIVATE_TASK_ID', 'fixture-key']) {
      expect(serialized).not.toContain(forbidden);
    }
  });

  it('maps provider timeouts to a stable 504 without provider details', async () => {
    const { service } = makeHarness(async () => { throw Object.assign(new Error('PRIVATE_PROVIDER_DETAIL'), { name: 'TimeoutError' }); });
    await expect(service.preview('en', now)).rejects.toMatchObject({
      statusCode: 504, code: 'AI_TIMEOUT', message: 'AI planner timed out',
    });
  });

  it('maps provider failures to a stable 502 without exposing provider details', async () => {
    const { service } = makeHarness(async () => { throw new Error('PRIVATE_PROVIDER_DETAIL'); });
    await expect(service.preview('en', now)).rejects.toMatchObject({
      statusCode: 502, code: 'AI_PROVIDER_ERROR', message: 'AI planner provider request failed',
    });
  });
  it.each([
    ['outside the seven-day range', modelSuggestion({ scheduledDate: '2026-10-12' })],
    ['on a rest day', modelSuggestion({ scheduledDate: '2026-10-06' })],
    ['with an unknown context', modelSuggestion({ contextId: 'invented-context' })],
    ['above its server-computed maximum', modelSuggestion({ targetCount: 4 })],
    ['with an illegal selector combination', modelSuggestion({ mode: 'new_words', contextId: 'ctx-1' })],
    ['with a grammar revision not in the catalogue', modelSuggestion({ kind: 'GRAMMAR', mode: null, contextId: null,
      lessonId: 'lesson-1', revisionId: 'invented-revision', targetCount: 1 })],
    ['in a slot already occupied by a task', modelSuggestion({ scheduledDate: '2026-10-07' })],
  ])('rejects a model suggestion %s before returning a preview', async (_description, suggestion) => {
    const existingTasks = suggestion.scheduledDate === '2026-10-07' ? [makeTask()] : [];
    const { service } = makeHarness(async () => ({ suggestions: [suggestion] }), existingTasks);
    await expect(service.preview('en', now)).rejects.toMatchObject({ statusCode: 502, code: 'AI_INVALID_RESPONSE' });
  });

  it('rejects more than one suggestion in the same daily kind slot', async () => {
    const { service } = makeHarness(async () => ({ suggestions: [
      modelSuggestion(), modelSuggestion({ mode: 'new_words', contextId: null }),
    ] }));
    await expect(service.preview('en', now)).rejects.toMatchObject({ statusCode: 502, code: 'AI_INVALID_RESPONSE' });
  });
});
