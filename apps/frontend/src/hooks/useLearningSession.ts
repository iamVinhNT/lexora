/**
 * @file useLearningSession.ts
 * @description TanStack Query hooks for learning-session lifecycle and progress invalidation.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  completeLearningSession,
  getLearningSession,
  getLearningSessionById,
  startLearningSession,
  submitLearningSessionStep,
  type SessionStartPayload,
  type SubmitStepPayload,
} from '../api/session.api';
import { analyticsKeys } from './useAnalytics';

export const sessionKeys = {
  all: ['learning-sessions'] as const,
  overview: () => [...sessionKeys.all, 'overview'] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};

export function useLearningSessionOverview() {
  return useQuery({ queryKey: sessionKeys.overview(), queryFn: getLearningSession });
}

export function useLearningSession(id: string | null) {
  return useQuery({
    queryKey: sessionKeys.detail(id ?? ''),
    queryFn: () => getLearningSessionById(id!),
    enabled: Boolean(id),
    staleTime: 30_000,
  });
}

function invalidateLearningData(queryClient: ReturnType<typeof useQueryClient>, includeSessions = false) {
  if (includeSessions) queryClient.invalidateQueries({ queryKey: sessionKeys.all });
  queryClient.invalidateQueries({ queryKey: ['progress'] });
  queryClient.invalidateQueries({ queryKey: ['reviews'] });
  queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
}

export function useStartLearningSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SessionStartPayload) => startLearningSession(payload),
    onSuccess: (session) => {
      queryClient.setQueryData(sessionKeys.detail(session.id), session);
      queryClient.setQueryData(sessionKeys.overview(), (current) => ({
        ...(current ?? { latestSession: null, sessions: [] }),
        activeSession: session,
      }));
      invalidateLearningData(queryClient);
    },
  });
}

export function useSubmitLearningStep() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SubmitStepPayload }) => submitLearningSessionStep(id, payload),
    onSuccess: (item, variables) => {
      queryClient.setQueryData(sessionKeys.detail(variables.id), (session: import('../api/session.api').LearningSession | undefined) => {
        if (!session) return session;
        return { ...session, items: session.items.map((existing) => existing.wordId === item.wordId ? item : existing) };
      });
      queryClient.setQueryData(sessionKeys.overview(), (current: import('../api/session.api').LearningSessionOverview | undefined) => {
        if (!current?.activeSession || current.activeSession.id !== variables.id) return current;
        return { ...current, activeSession: { ...current.activeSession, items: current.activeSession.items.map((existing) => existing.wordId === item.wordId ? item : existing) } };
      });
      invalidateLearningData(queryClient);
    },
  });
}

export function useCompleteLearningSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeLearningSession,
    onSuccess: (session) => {
      queryClient.setQueryData(sessionKeys.detail(session.id), session);
      queryClient.setQueryData(sessionKeys.overview(), (current: import('../api/session.api').LearningSessionOverview | undefined) => current ? { ...current, activeSession: null, latestSession: session } : current);
      invalidateLearningData(queryClient, true);
    },
  });
}
