import { describe, it, expect } from 'vitest';
import {
  KnowledgeAssessmentService,
  calculateDimensionScores,
  calculateVocabularyState,
  isWeakWord,
  assessKnowledge,
} from '../../src/domain/knowledge/assessment.js';
import type { ReviewLogEntry, DimensionScores, AssessmentInput } from '../../src/domain/knowledge/types.js';

describe('Knowledge Assessment Service', () => {
  const service = new KnowledgeAssessmentService();

  describe('3D Scores Calculation (recognitionScore, recallScore, productionScore)', () => {
    it('returns all 0 scores for empty review histories', () => {
      const scores = calculateDimensionScores([]);

      expect(scores).toEqual({
        recognitionScore: 0,
        recallScore: 0,
        productionScore: 0,
      });
    });

    it('calculates recognitionScore from RECOGNITION review logs', () => {
      const logs: ReviewLogEntry[] = [
        { reviewType: 'RECOGNITION', correct: true },
        { reviewType: 'RECOGNITION', correct: true },
        { reviewType: 'RECOGNITION', correct: false },
        { reviewType: 'RECOGNITION', correct: true },
      ];
      // 3 correct out of 4 = 75%
      const scores = calculateDimensionScores(logs);

      expect(scores.recognitionScore).toBe(75);
      expect(scores.recallScore).toBe(0);
      expect(scores.productionScore).toBe(0);
    });

    it('calculates recallScore from both RECALL and CLOZE review logs', () => {
      const logs: ReviewLogEntry[] = [
        { reviewType: 'RECALL', correct: true },
        { reviewType: 'CLOZE', correct: true },
        { reviewType: 'CLOZE', correct: false },
      ];
      // 2 correct out of 3 = 67%
      const scores = calculateDimensionScores(logs);

      expect(scores.recognitionScore).toBe(0);
      expect(scores.recallScore).toBe(67);
      expect(scores.productionScore).toBe(0);
    });

    it('calculates productionScore from PRODUCTION review logs', () => {
      const logs: ReviewLogEntry[] = [
        { reviewType: 'PRODUCTION', correct: true },
        { reviewType: 'PRODUCTION', correct: false },
      ];
      // 1 out of 2 = 50%
      const scores = calculateDimensionScores(logs);

      expect(scores.productionScore).toBe(50);
    });

    it('supports rating fallback when correct boolean is not explicitly set', () => {
      const logs: ReviewLogEntry[] = [
        { reviewType: 'RECOGNITION', rating: 'GOOD' }, // correct
        { reviewType: 'RECOGNITION', rating: 'EASY' }, // correct
        { reviewType: 'RECOGNITION', rating: 'HARD' }, // correct
        { reviewType: 'RECOGNITION', rating: 'AGAIN' }, // incorrect
      ];
      // 3 correct out of 4 = 75%
      const scores = calculateDimensionScores(logs);
      expect(scores.recognitionScore).toBe(75);
    });

    it('clamps scores strictly between 0 and 100', () => {
      const logs: ReviewLogEntry[] = [
        { reviewType: 'RECALL', correct: true },
      ];
      const scores = calculateDimensionScores(logs);
      expect(scores.recallScore).toBe(100);
    });
  });

  describe('5 Vocabulary States (NEW, LEARNING, FAMILIAR, MASTERED, MAINTENANCE)', () => {
    it('evaluates NEW when repetitions = 0 and interval = 0 with no reviews', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 0, recallScore: 0, productionScore: 0 },
        repetitions: 0,
        interval: 0,
      });
      expect(state).toBe('NEW');
    });

    it('evaluates LEARNING when actively practiced but repetitions < 3 and interval < 6', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 100, recallScore: 80, productionScore: 0 },
        repetitions: 1,
        interval: 1,
      });
      expect(state).toBe('LEARNING');
    });

    it('evaluates FAMILIAR when interval >= 6 days and steady recall accuracy (>= 60%)', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 90, recallScore: 70, productionScore: 40 },
        repetitions: 2,
        interval: 6,
      });
      expect(state).toBe('FAMILIAR');
    });

    it('evaluates MASTERED when interval >= 21 days with high recall (>= 70%) and production (>= 60%)', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 95, recallScore: 85, productionScore: 75 },
        repetitions: 4,
        interval: 25,
      });
      expect(state).toBe('MASTERED');
    });

    it('does not reach MASTERED if production is low (< 60%), staying FAMILIAR even with long interval', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 95, recallScore: 85, productionScore: 30 },
        repetitions: 4,
        interval: 25,
      });
      expect(state).toBe('FAMILIAR');
    });

    it('evaluates MAINTENANCE when interval >= 60 days with high mastery scores', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 100, recallScore: 90, productionScore: 80 },
        repetitions: 6,
        interval: 65,
      });
      expect(state).toBe('MAINTENANCE');
    });

    it('does not qualify for MAINTENANCE if production score is below master threshold, staying FAMILIAR', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 90, recallScore: 75, productionScore: 50 },
        repetitions: 6,
        interval: 70,
      });
      expect(state).toBe('FAMILIAR');
    });

    it('falls back to LEARNING if recall score drops below steady threshold (< 60%)', () => {
      const state = calculateVocabularyState({
        scores: { recognitionScore: 60, recallScore: 50, productionScore: 50 },
        repetitions: 6,
        interval: 70,
      });
      expect(state).toBe('LEARNING');
    });
  });

  describe('Weak Words Identification', () => {
    it('flags word as weak when lapses >= 2', () => {
      const input: AssessmentInput = {
        scores: { recognitionScore: 80, recallScore: 70, productionScore: 60 },
        repetitions: 1,
        interval: 1,
        lapses: 2,
      };
      const result = isWeakWord(input);
      expect(result).toBe(true);

      const assessment = assessKnowledge(input);
      expect(assessment.weakStatus.isWeak).toBe(true);
      expect(assessment.weakStatus.reasons).toContain('Frequent lapses (>= 2)');
    });

    it('flags word as weak when recognition is high (>= 70%) but production is low (< 50%)', () => {
      const input: AssessmentInput = {
        scores: { recognitionScore: 90, recallScore: 70, productionScore: 30 },
        repetitions: 3,
        interval: 10,
        lapses: 0,
      };
      const result = isWeakWord(input);
      expect(result).toBe(true);

      const assessment = assessKnowledge(input);
      expect(assessment.weakStatus.isWeak).toBe(true);
      expect(assessment.weakStatus.reasons).toContain('High recognition but low production (< 50%)');
    });

    it('flags word as weak when recall < 50% after practice', () => {
      const input: AssessmentInput = {
        scores: { recognitionScore: 40, recallScore: 35, productionScore: 0 },
        repetitions: 1,
        interval: 1,
        lapses: 1,
        reviewLogs: [
          { reviewType: 'RECALL', correct: false },
          { reviewType: 'RECALL', correct: true },
          { reviewType: 'RECALL', correct: false },
        ],
      };
      const result = isWeakWord(input);
      expect(result).toBe(true);

      const assessment = assessKnowledge(input);
      expect(assessment.weakStatus.isWeak).toBe(true);
      expect(assessment.weakStatus.reasons).toContain('Low recall accuracy (< 50%) after practice');
    });

    it('does NOT flag new unpracticed words as weak even though recall is 0', () => {
      const input: AssessmentInput = {
        scores: { recognitionScore: 0, recallScore: 0, productionScore: 0 },
        repetitions: 0,
        interval: 0,
        lapses: 0,
      };
      const result = isWeakWord(input);
      expect(result).toBe(false);

      const assessment = assessKnowledge(input);
      expect(assessment.weakStatus.isWeak).toBe(false);
      expect(assessment.weakStatus.reasons).toHaveLength(0);
    });

    it('does NOT falsely flag a newly learned word with 100% recognition and no recall/production attempts as weak', () => {
      // Review logs scenario: only recognition review performed
      const inputWithLogs: AssessmentInput = {
        repetitions: 1,
        interval: 1,
        lapses: 0,
        reviewLogs: [
          { reviewType: 'RECOGNITION', correct: true },
        ],
      };
      expect(isWeakWord(inputWithLogs)).toBe(false);

      const assessmentLogs = assessKnowledge(inputWithLogs);
      expect(assessmentLogs.weakStatus.isWeak).toBe(false);
      expect(assessmentLogs.weakStatus.reasons).toEqual([]);

      // Scores scenario: only recognitionScore provided, no recall or production practice
      const inputWithScores: AssessmentInput = {
        repetitions: 1,
        interval: 1,
        lapses: 0,
        scores: {
          recognitionScore: 100,
        },
      };
      expect(isWeakWord(inputWithScores)).toBe(false);

      const assessmentScores = assessKnowledge(inputWithScores);
      expect(assessmentScores.weakStatus.isWeak).toBe(false);
      expect(assessmentScores.weakStatus.reasons).toEqual([]);
    });

    it('flags multiple weak reasons when multiple conditions are met', () => {
      const input: AssessmentInput = {
        scores: { recognitionScore: 85, recallScore: 30, productionScore: 20 },
        repetitions: 2,
        interval: 3,
        lapses: 2,
      };
      const assessment = assessKnowledge(input);
      expect(assessment.weakStatus.isWeak).toBe(true);
      expect(assessment.weakStatus.reasons).toHaveLength(3);
      expect(assessment.weakStatus.reasons).toContain('Frequent lapses (>= 2)');
      expect(assessment.weakStatus.reasons).toContain('High recognition but low production (< 50%)');
      expect(assessment.weakStatus.reasons).toContain('Low recall accuracy (< 50%) after practice');
    });

    it('handles case-insensitive review types gracefully in logs', () => {
      const logs: ReviewLogEntry[] = [
        { reviewType: 'recognition', correct: true },
        { reviewType: 'cloze', correct: true },
        { reviewType: 'production', correct: true },
      ];
      const scores = calculateDimensionScores(logs);
      expect(scores.recognitionScore).toBe(100);
      expect(scores.recallScore).toBe(100);
      expect(scores.productionScore).toBe(100);
    });

    it('does NOT flag strong words with good scores and no lapses', () => {
      const input: AssessmentInput = {
        scores: { recognitionScore: 90, recallScore: 85, productionScore: 75 },
        repetitions: 3,
        interval: 15,
        lapses: 0,
      };
      const result = isWeakWord(input);
      expect(result).toBe(false);

      const assessment = assessKnowledge(input);
      expect(assessment.weakStatus.isWeak).toBe(false);
    });
  });

  describe('objective performance scoring', () => {
    it('averages persisted performance scores instead of binary correctness', () => {
      expect(calculateDimensionScores([
        { reviewType: 'RECALL', correct: true, performanceScore: 100 },
        { reviewType: 'RECALL', correct: true, performanceScore: 70 },
      ]).recallScore).toBe(85);
    });
  });

  describe('Comprehensive KnowledgeAssessmentService method', () => {
    it('assesses complete knowledge profile from review logs and review state', () => {
      const assessment = service.assess({
        repetitions: 3,
        interval: 22,
        lapses: 0,
        reviewLogs: [
          { reviewType: 'RECOGNITION', correct: true },
          { reviewType: 'RECALL', correct: true },
          { reviewType: 'CLOZE', correct: true },
          { reviewType: 'PRODUCTION', correct: true },
        ],
      });

      expect(assessment.scores.recognitionScore).toBe(100);
      expect(assessment.scores.recallScore).toBe(100);
      expect(assessment.scores.productionScore).toBe(100);
      expect(assessment.state).toBe('MASTERED');
      expect(assessment.weakStatus.isWeak).toBe(false);
    });
  });
});
