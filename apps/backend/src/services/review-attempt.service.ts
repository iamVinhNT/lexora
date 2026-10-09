/**
 * @file review-attempt.service.ts
 * @description Facade orchestrating adaptive review attempts, step transitions, AI grading, and atomic completions.
 */

import type { AppDatabase } from '../db/client.js';
import type { ReviewAttemptRepository } from '../repositories/review-attempt.repository.js';
import { StudyRepository } from '../repositories/study.repository.js';
import { ReviewEvidenceRepository } from '../repositories/review-evidence.repository.js';
import { SM2Scheduler } from '../domain/spaced-repetition/sm2.js';
import { KnowledgeAssessmentService } from '../domain/knowledge/assessment.js';
import type { OutputGrader } from '../domain/learning/ai-output-grader.js';
import { LangGraphOutputGrader } from './output-grader.service.js';
import { readAiConfig, type AiConfigResolver, type ResolvedAiConfig } from './ai-client.js';
import type { AiSettingsService } from './ai-settings.service.js';
import { buildReviewAttemptView } from './review-attempt-view.js';
import { executeStartReviewAttempt } from './review-attempt-start.js';
import { executeStepReviewAttempt } from './review-attempt-step.js';
import { executeCompleteReviewAttempt } from './review-attempt-completion.js';
import { NotFoundError, ConflictError } from './vocabulary.service.js';
import type {
  ReviewAttemptRow,
  StartReviewAttemptInput,
  StepReviewAttemptInput,
  CompleteReviewAttemptInput,
  AbandonReviewAttemptInput,
  ReviewAttemptView,
  CompleteReviewResult,
} from '../schemas/review-attempt.schema.js';

export interface ReviewAttemptServiceOptions {
  outputGrader?: OutputGrader;
  aiSettings?: AiSettingsService;
  getConfig?: AiConfigResolver;
  env?: NodeJS.ProcessEnv;
}

export class ReviewAttemptService {
  private readonly sm2Scheduler = new SM2Scheduler();
  private readonly assessmentService = new KnowledgeAssessmentService();
  private readonly studyRepo: StudyRepository;
  private readonly reviewRepo: ReviewEvidenceRepository;
  private readonly outputGrader: OutputGrader;

  constructor(
    private readonly db: AppDatabase,
    private readonly attemptRepo: ReviewAttemptRepository,
    private readonly options: ReviewAttemptServiceOptions = {}
  ) {
    this.studyRepo = new StudyRepository(db);
    this.reviewRepo = new ReviewEvidenceRepository(db);
    this.outputGrader =
      options.outputGrader ??
      new LangGraphOutputGrader({
        getConfig:
          options.getConfig ??
          (options.aiSettings ? () => options.aiSettings!.resolve() : undefined),
        env: options.env,
      });
  }

  private async resolveAiConfig(): Promise<ResolvedAiConfig> {
    if (this.options.getConfig) return this.options.getConfig();
    if (this.options.aiSettings) return this.options.aiSettings.resolve();
    return { config: readAiConfig(this.options.env), revision: 'env-default' };
  }

  buildAttemptView(attempt: ReviewAttemptRow): ReviewAttemptView {
    return buildReviewAttemptView(this.reviewRepo, attempt, this.sm2Scheduler);
  }

  getActiveAttempt(): ReviewAttemptView | null {
    const active = this.attemptRepo.getActiveAttempt();
    if (!active) return null;
    return this.buildAttemptView(active);
  }

  getAttemptById(id: string): ReviewAttemptView | null {
    const attempt = this.attemptRepo.getAttemptById(id);
    if (!attempt) return null;
    return this.buildAttemptView(attempt);
  }

  startAttempt(input: StartReviewAttemptInput): ReviewAttemptView {
    return executeStartReviewAttempt({
      db: this.db,
      attemptRepo: this.attemptRepo,
      reviewRepo: this.reviewRepo,
      studyRepo: this.studyRepo,
      scheduler: this.sm2Scheduler,
      input,
    });
  }

  async stepAttempt(
    attemptId: string,
    input: StepReviewAttemptInput
  ): Promise<ReviewAttemptView> {
    return executeStepReviewAttempt({
      db: this.db,
      attemptRepo: this.attemptRepo,
      reviewRepo: this.reviewRepo,
      scheduler: this.sm2Scheduler,
      outputGrader: this.outputGrader,
      resolveAiConfig: () => this.resolveAiConfig(),
      attemptId,
      input,
    });
  }

  abandonAttempt(
    attemptId: string,
    input: AbandonReviewAttemptInput
  ): ReviewAttemptView {
    const existingRequest = this.attemptRepo.findRequest(input.requestId);
    if (existingRequest) {
      if (
        existingRequest.attemptId !== attemptId ||
        existingRequest.action !== 'ABANDON' ||
        existingRequest.requestBody !== JSON.stringify(input)
      ) {
        throw new ConflictError('Request ID reused with different payload');
      }
      if (existingRequest.response) {
        return JSON.parse(existingRequest.response) as ReviewAttemptView;
      }
    }

    const attempt = this.attemptRepo.getAttemptById(attemptId);
    if (!attempt) {
      throw new NotFoundError(`Review attempt with id "${attemptId}" not found`);
    }
    if (attempt.status !== 'ACTIVE') {
      throw new ConflictError('Review attempt is no longer active');
    }
    if (attempt.version !== input.expectedVersion) {
      throw new ConflictError('Stale review attempt version', {
        expectedVersion: input.expectedVersion,
        actualVersion: attempt.version,
      });
    }

    const now = new Date().toISOString();
    const abandonedAttempt: ReviewAttemptRow = {
      ...attempt,
      status: 'ABANDONED',
      version: attempt.version + 1,
      updatedAt: now,
    };

    let view!: ReviewAttemptView;
    this.db.sqlite.transaction(() => {
      const success = this.attemptRepo.updateAttempt(abandonedAttempt, attempt.version);
      if (!success) {
        throw new ConflictError('Concurrent edit on review attempt');
      }
      view = this.buildAttemptView(abandonedAttempt);
      this.attemptRepo.insertRequest({
        requestId: input.requestId,
        attemptId: attempt.id,
        action: 'ABANDON',
        requestBody: JSON.stringify(input),
        response: JSON.stringify(view),
        createdAt: now,
      });
    })();

    return view;
  }

  completeAttempt(input: CompleteReviewAttemptInput): CompleteReviewResult {
    return executeCompleteReviewAttempt({
      db: this.db,
      attemptRepo: this.attemptRepo,
      reviewRepo: this.reviewRepo,
      studyRepo: this.studyRepo,
      scheduler: this.sm2Scheduler,
      assessmentService: this.assessmentService,
      input,
    });
  }
}
