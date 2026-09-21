import type {
  VocabularyState,
  ReviewLogEntry,
  DimensionScores,
  AssessmentInput,
  WeakStatus,
  AssessmentResult,
} from './types.js';

/**
 * Checks if a single review log is considered correct.
 */
function logScore(log: ReviewLogEntry): number {
  if (log.performanceScore !== undefined && log.performanceScore !== null) return Math.max(0, Math.min(100, log.performanceScore));
  if (log.correct !== undefined && log.correct !== null) return log.correct ? 100 : 0;
  if (log.rating) return log.rating.toUpperCase() !== 'AGAIN' ? 100 : 0;
  return 0;
}

function isLogCorrect(log: ReviewLogEntry): boolean {
  if (log.performanceScore !== undefined && log.performanceScore !== null) return log.performanceScore > 0;
  if (log.correct !== undefined && log.correct !== null) {
    return Boolean(log.correct);
  }
  if (log.rating) {
    return log.rating.toUpperCase() !== 'AGAIN';
  }
  return false;
}

/**
 * Calculates 3D scores (0-100) for recognition, recall, and production dimensions
 * from an array of review logs.
 */
export function calculateDimensionScores(reviewLogs: ReviewLogEntry[] = []): DimensionScores {
  const recognitionLogs: ReviewLogEntry[] = [];
  const recallLogs: ReviewLogEntry[] = [];
  const productionLogs: ReviewLogEntry[] = [];

  for (const log of reviewLogs) {
    const type = (log.reviewType ?? '').toUpperCase();
    if (type === 'RECOGNITION') {
      recognitionLogs.push(log);
    } else if (type === 'RECALL' || type === 'CLOZE' || type === 'CONTEXTUAL') {
      recallLogs.push(log);
    } else if (type === 'PRODUCTION') {
      productionLogs.push(log);
    }
  }

  const calcScore = (logs: ReviewLogEntry[]): number => {
    if (logs.length === 0) return 0;
    const percentage = Math.round(logs.reduce((sum, log) => sum + logScore(log), 0) / logs.length);
    return Math.min(100, Math.max(0, percentage));
  };

  return {
    recognitionScore: calcScore(recognitionLogs),
    recallScore: calcScore(recallLogs),
    productionScore: calcScore(productionLogs),
  };
}

/**
 * Calculates the vocabulary state out of 5 states:
 * NEW -> LEARNING -> FAMILIAR -> MASTERED -> MAINTENANCE
 */
export function calculateVocabularyState(params: {
  scores: DimensionScores;
  repetitions?: number;
  interval?: number;
}): VocabularyState {
  const reps = params.repetitions ?? 0;
  const interval = params.interval ?? 0;
  const { recognitionScore, recallScore, productionScore } = params.scores;

  const isUntouched =
    reps === 0 &&
    interval === 0 &&
    recognitionScore === 0 &&
    recallScore === 0 &&
    productionScore === 0;

  if (isUntouched) {
    return 'NEW';
  }

  // MAINTENANCE: Long-term retention with interval >= 60 days and high mastery scores
  if (interval >= 60 && recallScore >= 70 && productionScore >= 60) {
    return 'MAINTENANCE';
  }

  // MASTERED: High recall (>= 70%) and production (>= 60%), interval >= 21 days
  if (interval >= 21 && recallScore >= 70 && productionScore >= 60) {
    return 'MASTERED';
  }

  // FAMILIAR: Steady recall accuracy (>= 60%) and interval >= 6 days
  if (interval >= 6 && recallScore >= 60) {
    return 'FAMILIAR';
  }

  // LEARNING: In progress or practice started, but hasn't met higher criteria
  return 'LEARNING';
}

/**
 * Evaluates reasons why a word is flagged as weak.
 * Flags words with:
 * 1. Lapses >= 2
 * 2. High recognition (>= 70%) but production < 50%
 * 3. Recall < 50% after practice
 */
export function identifyWeakReasons(input: AssessmentInput): string[] {
  const reasons: string[] = [];
  const lapses = input.lapses ?? 0;
  const reps = input.repetitions ?? 0;
  const interval = input.interval ?? 0;
  const reviewLogs = input.reviewLogs ?? [];

  // Determine scores
  const calculatedScores = calculateDimensionScores(reviewLogs);
  const scores: DimensionScores = {
    recognitionScore: input.scores?.recognitionScore ?? calculatedScores.recognitionScore,
    recallScore: input.scores?.recallScore ?? calculatedScores.recallScore,
    productionScore: input.scores?.productionScore ?? calculatedScores.productionScore,
  };

  // Rule 1: Lapses >= 2
  if (lapses >= 2) {
    reasons.push('Frequent lapses (>= 2)');
  }

  const hasAttempts = reps > 0 || interval > 0 || lapses > 0;

  // Rule 2: High recognition (>= 70%) but production < 50%
  // Only evaluate low production if production has actually been attempted or when word has reached familiar stage
  const hasProductionPractice =
    reviewLogs.some((l) => (l.reviewType ?? '').toUpperCase() === 'PRODUCTION') ||
    (reviewLogs.length === 0 && input.scores?.productionScore !== undefined && hasAttempts);

  const isFamiliar = scores.recallScore >= 60;

  if ((hasProductionPractice || isFamiliar) && scores.recognitionScore >= 70 && scores.productionScore < 50) {
    reasons.push('High recognition but low production (< 50%)');
  }

  // Rule 3: Recall < 50% after practice
  // Check strictly whether recall was tested: do NOT include recognitionScore or productionScore
  const hasRecallPractice =
    reviewLogs.some((l) =>
      ['RECALL', 'CLOZE', 'CONTEXTUAL'].includes((l.reviewType ?? '').toUpperCase())
    ) ||
    (reviewLogs.length === 0 && input.scores?.recallScore !== undefined && hasAttempts);

  if (hasRecallPractice && scores.recallScore < 50) {
    reasons.push('Low recall accuracy (< 50%) after practice');
  }

  return reasons;
}

/**
 * Checks whether a word is considered weak.
 */
export function isWeakWord(input: AssessmentInput): boolean {
  return identifyWeakReasons(input).length > 0;
}

/**
 * Comprehensive assessment function returning 3D scores, state, and weak status.
 */
export function assessKnowledge(input: AssessmentInput): AssessmentResult {
  const reviewLogs = input.reviewLogs ?? [];
  const calculatedScores = calculateDimensionScores(reviewLogs);

  const scores: DimensionScores = {
    recognitionScore: input.scores?.recognitionScore ?? calculatedScores.recognitionScore,
    recallScore: input.scores?.recallScore ?? calculatedScores.recallScore,
    productionScore: input.scores?.productionScore ?? calculatedScores.productionScore,
  };

  const state = calculateVocabularyState({
    scores,
    repetitions: input.repetitions,
    interval: input.interval,
  });

  const reasons = identifyWeakReasons(input);

  return {
    scores,
    state,
    weakStatus: {
      isWeak: reasons.length > 0,
      reasons,
    },
  };
}

/**
 * KnowledgeAssessmentService providing knowledge assessment operations.
 */
export class KnowledgeAssessmentService {
  assess(input: AssessmentInput): AssessmentResult {
    return assessKnowledge(input);
  }

  calculateScores(reviewLogs: ReviewLogEntry[]): DimensionScores {
    return calculateDimensionScores(reviewLogs);
  }

  calculateState(params: {
    scores: DimensionScores;
    repetitions?: number;
    interval?: number;
  }): VocabularyState {
    return calculateVocabularyState(params);
  }

  isWeak(input: AssessmentInput): boolean {
    return isWeakWord(input);
  }
}
