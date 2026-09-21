/**
 * @file useLearningSession.ts
 * @description TanStack Query hooks for server-owned learning session state and actions.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { abandonLearningSession, completeLearningSession, getLearningOptions, getLearningSession, getLearningSessionById, startLearningSession, submitLearningSessionStep, type SessionStartPayload, type SubmitStepPayload } from '../api/session.api';
import { analyticsKeys } from './useAnalytics';

export const sessionKeys = { all: ['learning-sessions'] as const, overview: () => [...sessionKeys.all, 'overview'] as const, options: () => [...sessionKeys.all, 'options'] as const, detail: (id: string) => [...sessionKeys.all, 'detail', id] as const };
function invalidate(queryClient: ReturnType<typeof useQueryClient>) { queryClient.invalidateQueries({ queryKey: ['progress'] }); queryClient.invalidateQueries({ queryKey: ['reviews'] }); queryClient.invalidateQueries({ queryKey: analyticsKeys.all }); }
export function useLearningOptions() { return useQuery({ queryKey: sessionKeys.options(), queryFn: getLearningOptions }); }
export function useLearningSessionOverview() { return useQuery({ queryKey: sessionKeys.overview(), queryFn: getLearningSession }); }
export function useLearningSession(id: string | null) { return useQuery({ queryKey: sessionKeys.detail(id ?? ''), queryFn: () => getLearningSessionById(id!), enabled: Boolean(id), staleTime: 30_000 }); }
export function useStartLearningSession() { const queryClient = useQueryClient(); return useMutation({ mutationFn: (payload: SessionStartPayload) => startLearningSession(payload), onSuccess: (session) => { queryClient.setQueryData(sessionKeys.detail(session.id), session); queryClient.invalidateQueries({ queryKey: sessionKeys.all }); invalidate(queryClient); } }); }
export function useSubmitLearningStep() { const queryClient = useQueryClient(); return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: SubmitStepPayload }) => submitLearningSessionStep(id, payload), onSuccess: (result: any, variables) => { if (!result?.item) { invalidate(queryClient); return; } const updatedItem = { ...result.item, feedback: result.feedback ?? result.item.feedback ?? null }; const updateSession = (session: any) => session ? { ...session, cursor: result.cursor, items: (session.items ?? []).map((item: any) => item.id === updatedItem.id ? updatedItem : item) } : session; queryClient.setQueryData(sessionKeys.detail(variables.id), updateSession); queryClient.setQueryData(sessionKeys.overview(), (overview: any) => overview?.activeSession?.id === variables.id ? { ...overview, activeSession: updateSession(overview.activeSession) } : overview); invalidate(queryClient); } }); }
export function useCompleteLearningSession() { const queryClient = useQueryClient(); return useMutation({ mutationFn: completeLearningSession, onSuccess: (session) => { queryClient.setQueryData(sessionKeys.detail(session.id), session); queryClient.invalidateQueries({ queryKey: sessionKeys.all }); invalidate(queryClient); } }); }
export function useAbandonLearningSession() { const queryClient = useQueryClient(); return useMutation({ mutationFn: abandonLearningSession, onSuccess: (session) => { queryClient.setQueryData(sessionKeys.detail(session.id), session); queryClient.invalidateQueries({ queryKey: sessionKeys.all }); } }); }
