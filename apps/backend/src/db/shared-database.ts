/**
 * @file shared-database.ts
 * @description Resolves one per-user SQLite database and imports legacy local databases once.
 */
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import Database from 'better-sqlite3';
import { createTables } from './client.js';

const TABLES = [
  'users', 'words', 'word_families', 'collocations', 'examples', 'contexts',
  'context_words', 'learning_progress', 'review_states', 'tags', 'word_tags',
  'study_preferences', 'study_tasks',
  'review_logs', 'learning_sessions', 'learning_session_items', 'learning_attempts',
  'grammar_lesson_progress', 'grammar_exercise_attempts',
] as const;

export function sharedDatabasePath(home = homedir()): string {
  return join(home, '.lexora', 'data', 'lexora.db');
}

function legacyDatabasePaths(home: string, backendRoot: string): string[] {
  return [
    join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db'),
    join(home, '.config', 'Lexora', 'data', 'lexora.db'),
    join(backendRoot, 'data', 'lexora.db'),
  ];
}

function mergeDatabase(target: Database.Database, sourcePath: string): void {
  const source = new Database(sourcePath, { readonly: true, fileMustExist: true });
  try {
    if (source.pragma('integrity_check', { simple: true }) !== 'ok') {
      throw new Error(`Legacy database failed integrity check: ${sourcePath}`);
    }
    target.pragma('foreign_keys = ON');
    target.transaction(() => {
      target.pragma('defer_foreign_keys = ON');
      for (const table of TABLES) {
        if (!source.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(table)) continue;
        const sourceRows = source.prepare(`SELECT * FROM ${table}`).all() as Record<string, unknown>[];
        if (!sourceRows.length) continue;
        const sourceColumns = source.prepare(`PRAGMA table_info(${table})`).all() as { name: string; pk: number }[];
        const targetColumns = target.prepare(`PRAGMA table_info(${table})`).all() as { name: string; pk: number }[];
        if (sourceColumns.some((column) => !targetColumns.some((candidate) => candidate.name === column.name))) {
          throw new Error(`Cannot merge table with unknown columns: ${table}`);
        }
        const names = sourceColumns.filter((column) => targetColumns.some((candidate) => candidate.name === column.name)).map((column) => column.name);
        const keys = sourceColumns.filter((column) => column.pk).sort((a, b) => a.pk - b.pk).map((column) => column.name);
        const targetKeys = targetColumns.filter((column) => column.pk).sort((a, b) => a.pk - b.pk).map((column) => column.name);
        if (!keys.length || JSON.stringify(keys) !== JSON.stringify(targetKeys)) throw new Error(`Cannot merge table with an incompatible primary key: ${table}`);
        const existing = target.prepare(`SELECT * FROM ${table}`);
        const rowsByKey = new Map((existing.all() as Record<string, unknown>[]).map((row) => [JSON.stringify(keys.map((key) => row[key])), row]));
        const insert = target.prepare(`INSERT INTO ${table} (${names.join(', ')}) VALUES (${names.map(() => '?').join(', ')})`);
        for (const row of sourceRows) {
          const key = JSON.stringify(keys.map((name) => row[name]));
          const prior = rowsByKey.get(key);
          if (prior) {
            if (names.some((name) => row[name] !== prior[name])) {
              throw new Error(`Conflicting ${table} record ${key} in ${sourcePath}; original databases remain untouched`);
            }
            continue;
          }
          insert.run(...names.map((name) => row[name] as string | number | bigint | Buffer | null));
          rowsByKey.set(key, row);
        }
      }
    })();
  } finally {
    source.close();
  }
}

/** Creates the shared file only if absent; legacy files remain available for rollback. */
export async function prepareSharedDatabase(path: string, home = homedir(), backendRoot = resolve(import.meta.dirname, '../../')): Promise<void> {
  if (path !== sharedDatabasePath(home) || existsSync(path)) return;
  const sources = legacyDatabasePaths(home, backendRoot).filter(existsSync);
  if (!sources.length) return;

  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  const temporaryPath = `${path}.${process.pid}.${crypto.randomUUID()}.tmp`;
  try {
    const base = new Database(sources[0], { readonly: true, fileMustExist: true });
    try {
      if (base.pragma('integrity_check', { simple: true }) !== 'ok') {
        throw new Error(`Legacy database failed integrity check: ${sources[0]}`);
      }
      await base.backup(temporaryPath);
    } finally {
      base.close();
    }
    const target = new Database(temporaryPath);
    try {
      createTables(target);
      for (const source of sources.slice(1)) mergeDatabase(target, source);
      if ((target.pragma('foreign_key_check') as unknown[]).length) throw new Error('Merged database has invalid foreign keys');
      if (target.pragma('integrity_check', { simple: true }) !== 'ok') throw new Error('Merged database failed integrity check');
    } finally {
        target.close();
      }
    // link is exclusive: another process may finish the same migration first.
    try {
      const { linkSync } = await import('node:fs');
      linkSync(temporaryPath, path);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    }
  } finally {
    if (existsSync(temporaryPath)) unlinkSync(temporaryPath);
  }
}
