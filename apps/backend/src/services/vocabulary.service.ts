import { normalizeWord } from '../domain/text/normalization.js';
import type { VocabularyRepository } from '../repositories/vocabulary.repository.js';
import type { CreateWord, UpdateWord, QueryWords } from '../schemas/vocabulary.schema.js';

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(409, 'CONFLICT', message, details);
    this.name = 'ConflictError';
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

export class VocabularyService {
  constructor(private repo: VocabularyRepository) {}

  createWord(data: CreateWord) {
    const normalized = normalizeWord(data.word);
    if (!normalized) {
      throw new ValidationError('Word cannot be empty');
    }

    const existing = this.repo.findByWord(normalized);
    if (existing) {
      throw new ConflictError(`Word "${data.word}" already exists`);
    }

    return this.repo.create({
      ...data,
      word: normalized,
    });
  }

  getWordById(id: string) {
    const word = this.repo.findById(id);
    if (!word) {
      throw new NotFoundError(`Word with id "${id}" not found`);
    }
    return word;
  }

  listWords(query: QueryWords) {
    return this.repo.findMany(query);
  }

  updateWord(id: string, data: UpdateWord) {
    const existing = this.repo.findById(id);
    if (!existing) {
      throw new NotFoundError(`Word with id "${id}" not found`);
    }

    const payload = { ...data };

    if (data.word !== undefined) {
      const normalized = normalizeWord(data.word);
      if (!normalized) {
        throw new ValidationError('Word cannot be empty');
      }

      const duplicate = this.repo.findByWord(normalized);
      if (duplicate && duplicate.id !== id) {
        throw new ConflictError(`Word "${data.word}" already exists`);
      }

      payload.word = normalized;
    }

    return this.repo.update(id, payload);
  }

  deleteWord(id: string) {
    const deleted = this.repo.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Word with id "${id}" not found`);
    }
    return { success: true };
  }
}
