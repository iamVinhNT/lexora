/**
 * @file useGrammar.ts
 * @description React Query reads and answer submissions for grammar lessons.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  askGrammarTutor,
  getGrammarCourse,
  getGrammarLesson,
  submitGrammarAnswer,
  type GrammarAnswerSubmission,
  type GrammarLesson,
} from '../api/grammar.api';
import { invalidateStudyQueries } from './useStudyCalendar';

export const grammarKeys = {
  all: ['grammar'] as const,
  course: () => [...grammarKeys.all, 'course'] as const,
  lesson: (id: string) => [...grammarKeys.all, 'lesson', id] as const,
};

export function useGrammarCourse() {
  return useQuery({
    queryKey: grammarKeys.course(),
    queryFn: ({ signal }) => getGrammarCourse(signal),
  });
}

export function useGrammarLesson(id: string) {
  return useQuery({
    queryKey: grammarKeys.lesson(id),
    queryFn: ({ signal }) => getGrammarLesson(id, signal),
    enabled: Boolean(id),
  });
}

export function useSubmitGrammarAnswer(lessonId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submission: GrammarAnswerSubmission) => submitGrammarAnswer(lessonId, submission),
    onSuccess: (result) => {
      queryClient.setQueryData<GrammarLesson>(grammarKeys.lesson(lessonId), (current) =>
        current
          ? {
              ...current,
              progress: result.progress,
              nextLessonId: result.nextLessonId,
              firstAttemptAccuracy: result.firstAttemptAccuracy ?? current.firstAttemptAccuracy,
            }
          : current,
      );
      void queryClient.invalidateQueries({ queryKey: grammarKeys.course() });
      void queryClient.invalidateQueries({ queryKey: ['grammar-practice', 'progress'] });
      if (result.progress.isComplete) {
        void queryClient.invalidateQueries({ queryKey: ['grammar-practice', 'due'] });
      }
      void invalidateStudyQueries(queryClient);
    },
  });
}

export function useAskGrammarTutor(lessonId: string) {
  return useMutation({
    mutationFn: (question: string) => askGrammarTutor(lessonId, question),
  });
}
