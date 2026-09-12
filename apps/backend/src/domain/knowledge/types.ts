export type VocabularyState =
  | 'NEW'
  | 'LEARNING'
  | 'FAMILIAR'
  | 'MASTERED'
  | 'MAINTENANCE';

export type ReviewType =
  | 'RECOGNITION'
  | 'RECALL'
  | 'CLOZE'
  | 'PRODUCTION'
  | 'CONTEXTUAL';

export interface ReviewLogEntry {
  reviewType: ReviewType | string;
  rating?: string | null;
  correct?: boolean | null;
  responseTime?: number | null;
  createdAt?: string | Date;
}

export interface DimensionScores {
  recognitionScore: number;
  recallScore: number;
  productionScore: number;
}

export interface AssessmentInput {
  reviewLogs?: ReviewLogEntry[];
  repetitions?: number;
  interval?: number;
  lapses?: number;
  scores?: Partial<DimensionScores>;
}

export interface WeakStatus {
  isWeak: boolean;
  reasons: string[];
}

export interface AssessmentResult {
  scores: DimensionScores;
  state: VocabularyState;
  weakStatus: WeakStatus;
}
