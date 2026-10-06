/**
 * @file GrammarPracticeProgress.test.tsx
 * @description Protects insufficient-sample and revision-mismatch display boundaries.
 */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { GrammarPracticeProgressResponse } from '../src/api/grammar-practice.api';
import { GrammarPracticeProgress } from '../src/components/grammar/GrammarPracticeProgress';

const { useGrammarPracticeProgress } = vi.hoisted(() => ({ useGrammarPracticeProgress: vi.fn() }));
vi.mock('../src/hooks/useGrammarPractice', () => ({ useGrammarPracticeProgress }));

const lessonId = 'grammar-a1-example';
const revisionId = `${lessonId}@1.0.0`;

function result(data: GrammarPracticeProgressResponse) {
  return { data, isPending: false, isError: false, refetch: vi.fn() };
}

describe('GrammarPracticeProgress', () => {
  beforeEach(() => vi.clearAllMocks());

  it('labels below-threshold samples insufficient without substituting accuracy', () => {
    useGrammarPracticeProgress.mockReturnValue(result({ lessons: [{
      lessonId, revisionId,
      recognition: { correct: 2, total: 4, percent: null },
      recall: { correct: 0, total: 0, percent: null },
      outputCount: 0, reviewCount: 0, isStable: false, state: null,
    }] }));

    render(<GrammarPracticeProgress lessonId={lessonId} revisionId={revisionId} />);

    expect(screen.getByText('Insufficient samples (4)')).toBeTruthy();
    expect(screen.getByText('Insufficient samples (0)')).toBeTruthy();
    expect(screen.queryByText(/Accuracy:/)).toBeNull();
    expect(screen.getByText('0 self-rated')).toBeTruthy();
  });

  it('reports an absent lesson revision instead of fabricating zero metrics', () => {
    useGrammarPracticeProgress.mockReturnValue(result({ lessons: [{
      lessonId, revisionId: 'old-revision',
      recognition: { correct: 0, total: 0, percent: null },
      recall: { correct: 0, total: 0, percent: null },
      outputCount: 0, reviewCount: 0, isStable: false, state: null,
    }] }));

    render(<GrammarPracticeProgress lessonId={lessonId} revisionId={revisionId} />);

    expect(screen.getByText('No practice progress is recorded for this lesson revision yet.')).toBeTruthy();
    expect(screen.queryByText('0 self-rated')).toBeNull();
  });

});
