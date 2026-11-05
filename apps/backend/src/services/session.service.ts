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
  type PendingOutputGrade,
} from '../repositories/session.repository.js';
import type { StartSessionInput, SubmitStepInput } from '../schemas/session.schema.js';
import { outputGradeSchema, type OutputGrade, type OutputGrader } from '../domain/learning/ai-output-grader.js';
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
    if (input.step !== 'OUTPUT') return this.repo.submitAction(sessionId, input);
    // Output sentences are only saved here; gradeOutputs() grades them all together at the end of the session.
    const sentence = input.answer?.trim() ?? '';
    if (!sentence) throw new ValidationError('Output sentence cannot be empty', 'EMPTY_OUTPUT');
    return this.repo.submitAction(sessionId, { ...input, answer: sentence });
  }

  /** Grades every saved, ungraded Output sentence in one AI round trip, outside any SQLite transaction. */
  async gradeOutputs(sessionId: string) {
    const pending = this.repo.getPendingOutputGrades(sessionId);
    if (pending.length) {
      let grades: Array<{ itemId: string; sentence: string; grade: OutputGrade }>;
      try {
        grades = await this.gradePending(pending);
      } catch {
        throw new AppError(503, 'SERVICE_UNAVAILABLE', 'AI grading unavailable; please retry');
      }
      this.repo.commitOutputGrades(sessionId, grades);
    }
    return this.getSessionById(sessionId);
  }

  private async gradePending(pending: PendingOutputGrade[]) {
    const inputs = pending.map(({ itemId, word, definition, sentence }) => ({ id: itemId, word, definition, sentence }));
    const graded = this.outputGrader.gradeBatch
      ? await this.outputGrader.gradeBatch(inputs)
      : await Promise.all(inputs.map(async (input) => ({ id: input.id, ...(await this.outputGrader.grade(input)) })));
    const byId = new Map(graded.map((grade) => [grade.id, grade]));
    if (byId.size !== graded.length || inputs.some((input) => !byId.has(input.id))) throw new Error('AI grader did not return exactly one grade per sentence');
    return pending.map(({ itemId, sentence }) => {
      const { score, explanation, suggestion } = byId.get(itemId)!;
      return { itemId, sentence, grade: outputGradeSchema.parse({ score, explanation, suggestion }) };
    });
  }

  abandonSession(sessionId: string) { return this.repo.abandonSession(sessionId); }

  completeSession(sessionId: string) { return this.repo.completeSession(sessionId); }
}
