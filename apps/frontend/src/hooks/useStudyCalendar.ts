/**
 * @file useStudyCalendar.ts
 * @description TanStack Query transport hooks and cache keys for study data.
 */
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { analyticsKeys } from '../api/analytics.api';
import {
  createStudyTask,
  getStudyCalendar,
  getStudyPreferences,
  getStudyTask,
  patchStudyTask,
  previewAiStudyPlan,
  previewStudyPlan,
  putStudyPreferences,
  type CivilDate,
  type StudyPreferences,
  type StudyPreferencesInput,
  type StudyTaskInput,
  type TaskPatch,
} from '../api/study.api';
import { addCivilDays, dayRangeUtc } from '../utils/calendar-date';

export const studyKeys = {
  all: ['study'] as const,
  preferences: ['study', 'preferences'] as const,
  calendar: (from: string, to: string) => ['study', 'calendar', from, to] as const,
  task: (id: string) => ['study', 'task', id] as const,
  preview: ['study', 'preview'] as const,
};

export function invalidateStudyQueries(client: QueryClient) {
  return client.invalidateQueries({ queryKey: studyKeys.all });
}

export function useStudyPreferences(options: { enabled?: boolean } = {}) {
  return useQuery({ queryKey: studyKeys.preferences, queryFn: getStudyPreferences, enabled: options.enabled ?? true });
}

export function useStudyCalendar(from: CivilDate, to: CivilDate) {
  return useQuery({
    queryKey: studyKeys.calendar(from, to),
    queryFn: () => getStudyCalendar(from, to),
    refetchOnWindowFocus: true,
    refetchInterval: query => {
      const calendar = query.state.data;
      if (!calendar || typeof calendar.today !== 'string' || typeof calendar.timeZone !== 'string') return false;
      const nextMidnight = dayRangeUtc(addCivilDays(calendar.today, 1), calendar.timeZone).start;
      return Math.max(1_000, Date.parse(nextMidnight) - Date.now());
    },
  });
}

export function useStudyTask(taskId: string) {
  return useQuery({
    queryKey: studyKeys.task(taskId),
    queryFn: () => getStudyTask(taskId),
    enabled: taskId.length > 0,
  });
}

export function useStudyPlanPreview() {
  return useMutation({ mutationFn: previewStudyPlan });
}
export function useAiStudyPlanPreview() {
  return useMutation({ mutationFn: previewAiStudyPlan });
}

export function useStudyPreferencesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putStudyPreferences,
    onMutate: () => ({
      previous: queryClient.getQueryData<StudyPreferences | null>(studyKeys.preferences),
    }),
    onSuccess: async (preferences, _input, context) => {
      await invalidateStudyQueries(queryClient);
      if (context.previous?.timeZone !== preferences.timeZone) {
        await queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
      }
    },
  });
}

export function useStudyTaskMutations() {
  const queryClient = useQueryClient();
  const createTask = useMutation({
    mutationFn: (input: StudyTaskInput) => createStudyTask(input),
    onSuccess: () => invalidateStudyQueries(queryClient),
  });
  const patchTask = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: TaskPatch }) => patchStudyTask(id, patch),
    onSuccess: () => invalidateStudyQueries(queryClient),
  });
  return { createTask, patchTask };
}
