/**
 * @file session.service.ts
 * @description Application service for server-owned learning session transitions.
 */
import { SessionRepository, AppError, ConflictError, NotFoundError, ValidationError } from '../repositories/session.repository.js';
import type { StartSessionInput, SubmitStepInput } from '../schemas/session.schema.js';
export { AppError, ConflictError, NotFoundError, ValidationError };

export class SessionService {
  constructor(private readonly repo: SessionRepository) {}
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
  submitStep(sessionId: string, input: SubmitStepInput) { return this.repo.submitAction(sessionId, input); }
  abandonSession(sessionId: string) { return this.repo.abandonSession(sessionId); }
  completeSession(sessionId: string) { return this.repo.completeSession(sessionId); }
}
