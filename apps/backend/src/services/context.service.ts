import type { ContextRepository } from '../repositories/context.repository.js';
import type { CreateContext, UpdateContext, QueryContexts } from '../schemas/context.schema.js';

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, 'NOT_FOUND', message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, 'VALIDATION_ERROR', message);
    this.name = 'ValidationError';
  }
}

export class ContextService {
  constructor(private repo: ContextRepository) {}

  createContext(data: CreateContext) {
    if (data.wordIds && data.wordIds.length > 0) {
      const distinctWordIds = Array.from(new Set(data.wordIds));
      const foundWords = this.repo.findWordsByIds(distinctWordIds);
      if (foundWords.length !== distinctWordIds.length) {
        const foundIds = new Set(foundWords.map((w) => w.id));
        const missingId = distinctWordIds.find((id) => !foundIds.has(id));
        throw new NotFoundError(`Word with id "${missingId}" not found`);
      }
    }

    return this.repo.create(data);
  }

  getContextById(id: string) {
    const context = this.repo.findById(id);
    if (!context) {
      throw new NotFoundError(`Context with id "${id}" not found`);
    }
    return context;
  }

  listContexts(query: QueryContexts) {
    return this.repo.findMany(query);
  }

  updateContext(id: string, data: UpdateContext) {
    const existing = this.repo.findById(id);
    if (!existing) {
      throw new NotFoundError(`Context with id "${id}" not found`);
    }

    return this.repo.update(id, data);
  }

  deleteContext(id: string) {
    const deleted = this.repo.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Context with id "${id}" not found`);
    }
    return { success: true };
  }

  linkWords(contextId: string, wordIds: string[]) {
    const context = this.repo.findById(contextId);
    if (!context) {
      throw new NotFoundError(`Context with id "${contextId}" not found`);
    }

    const distinctWordIds = Array.from(new Set(wordIds));
    if (distinctWordIds.length > 0) {
      const foundWords = this.repo.findWordsByIds(distinctWordIds);
      if (foundWords.length !== distinctWordIds.length) {
        const foundIds = new Set(foundWords.map((w) => w.id));
        const missingId = distinctWordIds.find((id) => !foundIds.has(id));
        throw new NotFoundError(`Word with id "${missingId}" not found`);
      }
    }

    return this.repo.linkWords(contextId, distinctWordIds)!;
  }

  unlinkWord(contextId: string, wordId: string) {
    const context = this.repo.findById(contextId);
    if (!context) {
      throw new NotFoundError(`Context with id "${contextId}" not found`);
    }

    const unlinked = this.repo.unlinkWord(contextId, wordId);
    if (!unlinked) {
      throw new NotFoundError(`Word with id "${wordId}" is not linked to this context`);
    }

    return { success: true };
  }
}
