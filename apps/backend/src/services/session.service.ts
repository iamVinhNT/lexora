/**
 * @file session.service.ts
 * @description Service for managing learning sessions, step progression, and SM-2/3D knowledge updates.
 */

import { SessionRepository, AppError, NotFoundError, ConflictError, ValidationError } from '../repositories/session.repository.js';
import type { StartSessionInput, SubmitStepInput } from '../schemas/session.schema.js';
import { createCloze } from '../domain/text/cloze.js';

export { AppError, NotFoundError, ConflictError, ValidationError };

export class SessionService {
  constructor(private repo: SessionRepository) {}

  /**
   * Starts a new learning session for the specified mode.
   */
  startSession(input: StartSessionInput) {
    if (input.mode === 'context' && !input.contextId) {
      throw new ValidationError('contextId is required for context mode');
    }

    if (input.mode === 'topic' && !input.topic && !input.tag) {
      throw new ValidationError('topic or tag is required for topic mode');
    }

    return this.repo.createSession(input);
  }

  /**
   * Retrieves a learning session by ID.
   */
  getSessionById(id: string) {
    const session = this.repo.findById(id);
    if (!session) {
      throw new NotFoundError(`Learning session with id "${id}" not found`);
    }
    return session;
  }

  /**
   * Returns any currently active (IN_PROGRESS) session.
   */
  findActiveSession() {
    return this.repo.findActiveSession();
  }

  /**
   * Returns recent sessions.
   */
  getRecentSessions(limit: number = 10) {
    return this.repo.findRecentSessions(limit);
  }

  /**
   * Records progress on a specific cognitive step for a word in the session.
   * Enforces session state transitions and provides cloze sentence during RECALL step.
   */
  submitStep(sessionId: string, input: SubmitStepInput) {
    const session = this.repo.findById(sessionId);
    if (!session) {
      throw new NotFoundError(`Learning session with id "${sessionId}" not found`);
    }

    if (session.completedAt) {
      throw new ValidationError('Cannot submit steps to a completed session');
    }

    const item = session.items.find((i: any) => i.wordId === input.wordId);
    if (!item) {
      throw new NotFoundError(`Word "${input.wordId}" is not part of this session`);
    }

    const allowedTransitions: Record<string, string[]> = {
      initial: ['CONTEXT'],
      CONTEXT: ['CONTEXT', 'UNDERSTAND'],
      UNDERSTAND: ['UNDERSTAND', 'RECALL'],
      RECALL: ['RECALL', 'OUTPUT'],
      OUTPUT: ['OUTPUT', 'ASSESS'],
      ASSESS: ['ASSESS'],
    };

    const currentStep = item.completedStep ?? 'initial';
    const allowed = allowedTransitions[currentStep] || [];
    if (!allowed.includes(input.step)) {
      throw new ValidationError(`Invalid step transition from ${currentStep} to ${input.step}`);
    }

    if (input.step === 'RECALL' && !input.recallAnswer?.trim()) {
      throw new ValidationError('recallAnswer is required for RECALL step');
    }

    if (input.step === 'OUTPUT' && !input.userSentence?.trim()) {
      throw new ValidationError('userSentence is required for OUTPUT step');
    }

    if (input.step === 'ASSESS' && !input.assessmentRating) {
      throw new ValidationError('assessmentRating is required for ASSESS step');
    }

    const updatedItem = this.repo.updateSessionItem({
      sessionId,
      wordId: input.wordId,
      step: input.step,
      recallAnswer: input.recallAnswer,
      recallCorrect: input.recallCorrect,
      userSentence: input.userSentence,
      assessmentRating: input.assessmentRating,
    });

    if (!updatedItem) {
      throw new NotFoundError(`Failed to update step for word "${input.wordId}"`);
    }

    // Ensure clozeSentence is present during RECALL step if example or context exists
    if (input.step === 'RECALL' && !updatedItem.clozeSentence) {
      const sentence = updatedItem.word?.contextSentence || updatedItem.word?.examples?.[0]?.sentence;
      if (sentence && updatedItem.word?.word) {
        updatedItem.clozeSentence = createCloze(sentence, updatedItem.word.word);
      }
    }

    return updatedItem;
  }

  /**
   * Finalizes the learning session, advances knowledge progress, and recalculates SM-2 schedules.
   */
  completeSession(sessionId: string) {
    const session = this.repo.findById(sessionId);
    if (!session) {
      throw new NotFoundError(`Learning session with id "${sessionId}" not found`);
    }

    if (session.completedAt) {
      throw new ValidationError('Session is already completed');
    }

    const hasIncompleteItem = session.items.some(
      (item) => !item || item.completedStep !== 'ASSESS' || !item.reviewRating
    );
    if (hasIncompleteItem) {
      throw new ValidationError('Cannot complete session: all items must be assessed');
    }

    return this.repo.completeSession(sessionId);
  }
}
