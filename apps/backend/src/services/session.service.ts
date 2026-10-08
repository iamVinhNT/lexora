/**
 * @file session.service.ts
 * @description Application service for server-owned learning session transitions.
 */
import {
  SessionRepository,
  AppError,
  ConflictError,
  NotFoundError,
  ValidationError,
  type LearningActionResult,
} from '../repositories/session.repository.js';
import type { StartSessionInput, SubmitStepInput } from '../schemas/session.schema.js';
import type { OutputGrader } from '../domain/learning/ai-output-grader.js';
import { LangGraphOutputGrader } from './output-grader.service.js';

export { AppError, ConflictError, NotFoundError, ValidationError };

export class SessionService {
  constructor(
    private readonly repo: SessionRepository,
    private readonly outputGrader: OutputGrader = new LangGraphOutputGrader(),
  ) {}

  startSession(input: StartSessionInput) {
    if (input.mode === 'context' && !input.contextId) throw new ValidationError('contextId is required for context mode');
    if (input.mode === 'topic' && !input.topicId) throw new ValidationError('topicId is required for topic mode');
    return this.repo.createSession(input);
  }

  getOptions() { return this.repo.getOptions(); }

  getSessionById(id: string) {
    const session = this.repo.findById(id);
    if (!session) throw new NotFoundError(`Learning session with id "${id}" not found`);
    return session;
  }

  findActiveSession() { return this.repo.findActiveSession(); }

  getRecentSessions(limit = 10) { return this.repo.findRecentSessions(limit); }

  async submitStep(sessionId: string, input: SubmitStepInput): Promise<LearningActionResult> {
    if (input.step !== 'OUTPUT') {
      return this.repo.submitAction(sessionId, input);
    }

    // 1. Idempotency check: if requestId was already processed, return existing result without calling AI
    const existing = this.repo.findExistingActionResultByRequestId(sessionId, input.requestId);
    if (existing) return existing;

    // 2. Preflight validation: verify session state, attempt limit, and match with current cursor
    const target = this.repo.getOutputStepTarget(sessionId, input);

    const sentence = input.answer?.trim() ?? '';
    if (!sentence) {
      throw new ValidationError('Output sentence cannot be empty', 'EMPTY_OUTPUT');
    }

    // 3. Call AI grading OUTSIDE SQLite sync transaction (RISK-1)
    let aiResult;
    try {
      aiResult = await this.outputGrader.grade({
        word: target.word,
        definition: target.definition,
        sentence,
      });
    } catch {
      throw new AppError(503, 'SERVICE_UNAVAILABLE', 'AI grading unavailable; please retry');
    }

    // 4. Commit into database inside transaction with atomic recheck (RISK-3)
    return this.repo.submitAction(sessionId, input, aiResult);
  }

  abandonSession(sessionId: string) { return this.repo.abandonSession(sessionId); }

  completeSession(sessionId: string) { return this.repo.completeSession(sessionId); }
}
