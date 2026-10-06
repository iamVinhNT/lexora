/**
 * @file shared-database.test.ts
 * @description Verifies safe first-run consolidation of web and desktop SQLite data.
 */
import { existsSync, mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import Database from 'better-sqlite3';
import { afterEach, describe, expect, it } from 'vitest';
import { getDb } from '../../src/db/client.js';
import { prepareSharedDatabase, sharedDatabasePath } from '../../src/db/shared-database.js';

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('shared local database', () => {
  it('preserves output-only grammar practice from a secondary database without inventing review state', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-practice-')); roots.push(root);
    const home = join(root, 'home'), backendRoot = join(root, 'backend');
    const desktopPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const webPath = join(backendRoot, 'data', 'lexora.db');
    for (const path of [desktopPath, webPath]) mkdirSync(dirname(path), { recursive: true });
    getDb(desktopPath).sqlite.close();
    const web = getDb(webPath);
    web.sqlite.prepare("INSERT INTO grammar_practice_attempts (id,request_id,lesson_id,revision_id,revision,kind,prompt_id,text,rubric,assessment_source,created_at) VALUES ('output','request','lesson','revision','1.0.0','output','prompt','My original sentence.','{\"form\":2,\"meaning\":1,\"use\":1}','self','2026-10-05T12:00:00.000Z')").run();
    web.sqlite.close();
    const target = sharedDatabasePath(home); await prepareSharedDatabase(target, home, backendRoot);
    const merged = getDb(target);
    try {
      expect(merged.sqlite.prepare('SELECT request_id, text, assessment_source FROM grammar_practice_attempts').all()).toEqual([{request_id:'request',text:'My original sentence.',assessment_source:'self'}]);
      expect(merged.sqlite.prepare('SELECT * FROM grammar_review_states').all()).toEqual([]);
      expect(() => merged.sqlite.prepare("UPDATE grammar_practice_attempts SET text='Changed'").run()).toThrow(/immutable/);
    } finally { merged.sqlite.close(); }
  });
  it('merges distinct words and their learning history without duplicating shared tags', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const desktopPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const webPath = join(backendRoot, 'data', 'lexora.db');
    for (const path of [desktopPath, webPath]) mkdirSync(dirname(path), { recursive: true });

    const desktop = getDb(desktopPath);
    desktop.sqlite.prepare("INSERT INTO words (id, word, definition, created_at) VALUES ('desktop-word', 'desktop', 'desktop definition', '2026-09-20T00:00:00Z')").run();
    desktop.sqlite.prepare("INSERT INTO tags (id, name) VALUES ('shared-tag', 'shared')").run();
    desktop.sqlite.prepare("INSERT INTO word_tags (word_id, tag_id) VALUES ('desktop-word', 'shared-tag')").run();
    desktop.sqlite.close();

    const web = getDb(webPath);
    web.sqlite.prepare("INSERT INTO words (id, word, definition, created_at) VALUES ('web-word', 'web', 'web definition', '2026-09-20T00:00:00Z')").run();
    web.sqlite.prepare("INSERT INTO tags (id, name) VALUES ('shared-tag', 'shared')").run();
    web.sqlite.prepare("INSERT INTO word_tags (word_id, tag_id) VALUES ('web-word', 'shared-tag')").run();
    web.sqlite.prepare("INSERT INTO learning_sessions (id, session_type, total_words, status, started_at) VALUES ('session', 'new_words', 1, 'IN_PROGRESS', '2026-09-20T00:00:00Z')").run();
    web.sqlite.prepare("INSERT INTO learning_session_items (id, session_id, word_id) VALUES ('item', 'session', 'web-word')").run();
    web.sqlite.prepare("INSERT INTO learning_attempts (id, session_item_id, request_id, type, attempt_number, answer, result, performance_score, created_at) VALUES ('attempt', 'item', 'request', 'RECALL', 1, 'web', 'CORRECT', 100, '2026-09-20T00:00:00Z')").run();
    web.sqlite.close();

    const path = sharedDatabasePath(home);
    await prepareSharedDatabase(path, home, backendRoot);
    const merged = getDb(path);
    expect(merged.sqlite.prepare('SELECT word FROM words ORDER BY word').all()).toEqual([{ word: 'desktop' }, { word: 'web' }]);
    expect(merged.sqlite.prepare('SELECT count(*) AS count FROM tags').get()).toEqual({ count: 1 });
    expect(merged.sqlite.prepare('SELECT count(*) AS count FROM word_tags').get()).toEqual({ count: 2 });
    expect(merged.sqlite.prepare('SELECT answer FROM learning_attempts').get()).toEqual({ answer: 'web' });
    expect(merged.sqlite.pragma('foreign_key_check')).toEqual([]);
    merged.sqlite.close();
    await prepareSharedDatabase(path, home, backendRoot);
    expect(getDb(webPath).sqlite.prepare('SELECT count(*) AS count FROM words').get()).toEqual({ count: 1 });
  });
  it('preserves study preferences, transferred tasks, and linked evidence across legacy merges', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-study-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const desktopPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const webPath = join(backendRoot, 'data', 'lexora.db');
    for (const path of [desktopPath, webPath]) mkdirSync(dirname(path), { recursive: true });

    const desktop = getDb(desktopPath);
    desktop.sqlite.prepare("INSERT INTO words (id, word, definition, created_at) VALUES ('desktop-word', 'word', 'definition', '2026-09-20')").run();
    desktop.sqlite.prepare(`
      INSERT INTO study_preferences (id, time_zone, study_days, learning_target, review_target, grammar_target, updated_at)
      VALUES ('local', 'America/Toronto', '[1,2,3,4,5]', 5, 10, 1, '2026-09-20T00:00:00Z')
    `).run();
    desktop.sqlite.prepare(`
      INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, mode, version, created_at, updated_at, creation_intent)
      VALUES ('desktop-task', '2026-09-19', 'LEARN_WORDS', 2, 'MANUAL', 'new_words', 1, '2026-09-20', '2026-09-20', '{"origin":"manual"}')
    `).run();
    desktop.sqlite.close();

    const web = getDb(webPath);
    web.sqlite.prepare(`
      INSERT INTO study_preferences (id, time_zone, study_days, learning_target, review_target, grammar_target, updated_at)
      VALUES ('local', 'America/Toronto', '[1,2,3,4,5]', 5, 10, 1, '2026-09-20T00:00:00Z')
    `).run();
    const insertTask = web.sqlite.prepare(`
      INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, mode, version, created_at, updated_at, transferred_at, transferred_to_task_id, transferred_count, creation_intent, transfer_intent)
      VALUES (?, '2026-09-20', 'LEARN_WORDS', 2, 'MANUAL', 'new_words', 1, '2026-09-20', '2026-09-20', ?, ?, 1, '{"origin":"manual"}', ?)
    `);
    web.sqlite.prepare("INSERT INTO words (id, word, definition, created_at) VALUES ('desktop-word', 'word', 'definition', '2026-09-20')").run();
    web.sqlite.transaction(() => {
      web.sqlite.pragma('defer_foreign_keys = ON');
      insertTask.run('source-task', '2026-09-20', 'child-task', '{"reason":"move"}');
      insertTask.run('child-task', null, null, null);
    })();
    web.sqlite.exec(`
      INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, version, created_at, updated_at, creation_intent)
      VALUES ('review-task', '2026-09-20', 'REVIEW_WORDS', 1, 'MANUAL', 1, '2026-09-20', '2026-09-20', '{"origin":"manual"}');
      INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, lesson_id, revision_id, revision, version, created_at, updated_at, creation_intent)
      VALUES ('grammar-task', '2026-09-20', 'GRAMMAR', 1, 'MANUAL', 'lesson', 'revision-id', 'revision', 1, '2026-09-20', '2026-09-20', '{"origin":"manual"}');
    `);
    web.sqlite.prepare("INSERT INTO learning_sessions (id, session_type, total_words, status, started_at, study_task_id) VALUES ('session', 'new_words', 1, 'IN_PROGRESS', '2026-09-20', 'source-task')").run();
    web.sqlite.prepare(`
      INSERT INTO grammar_lesson_progress (lesson_id, revision_id, revision, created_at, updated_at)
      VALUES ('lesson', 'revision-id', 'revision', '2026-09-20', '2026-09-20')
    `).run();
    web.sqlite.prepare(`
      INSERT INTO grammar_exercise_attempts (id, lesson_id, revision_id, revision, exercise_id, request_id, answer, is_correct, feedback, created_at, study_task_id, completed_lesson)
      VALUES ('grammar-attempt', 'lesson', 'revision-id', 'revision', 'exercise', 'request', 'answer', 1, 'feedback', '2026-09-20', 'grammar-task', 1)
    `).run();
    web.sqlite.prepare(`
      INSERT INTO review_logs (id, word_id, review_type, rating, created_at, study_task_id)
      SELECT 'review-log', id, 'RECALL', 'GOOD', '2026-09-20', 'review-task' FROM words WHERE id = 'desktop-word'
    `).run();
    web.sqlite.close();

    const path = sharedDatabasePath(home);
    await prepareSharedDatabase(path, home, backendRoot);
    const merged = getDb(path);
    expect(merged.sqlite.prepare('SELECT id, creation_intent, transferred_to_task_id, transfer_intent FROM study_tasks ORDER BY id').all()).toEqual([
      { id: 'child-task', creation_intent: '{"origin":"manual"}', transferred_to_task_id: null, transfer_intent: null },
      { id: 'desktop-task', creation_intent: '{"origin":"manual"}', transferred_to_task_id: null, transfer_intent: null },
      { id: 'grammar-task', creation_intent: '{"origin":"manual"}', transferred_to_task_id: null, transfer_intent: null },
      { id: 'review-task', creation_intent: '{"origin":"manual"}', transferred_to_task_id: null, transfer_intent: null },
      { id: 'source-task', creation_intent: '{"origin":"manual"}', transferred_to_task_id: 'child-task', transfer_intent: '{"reason":"move"}' },
    ]);
    expect(merged.sqlite.prepare(`
      SELECT (SELECT study_task_id FROM learning_sessions WHERE id = 'session') AS session_task,
        (SELECT study_task_id FROM review_logs WHERE id = 'review-log') AS review_task,
        (SELECT study_task_id FROM grammar_exercise_attempts WHERE id = 'grammar-attempt') AS grammar_task,
        (SELECT completed_lesson FROM grammar_exercise_attempts WHERE id = 'grammar-attempt') AS completed_lesson
    `).get()).toEqual({ session_task: 'source-task', review_task: 'review-task', grammar_task: 'grammar-task', completed_lesson: 1 });
    expect(merged.sqlite.prepare(`
      SELECT s.id FROM learning_sessions s LEFT JOIN study_tasks t ON t.id = s.study_task_id
      WHERE s.study_task_id IS NOT NULL AND t.id IS NULL
    `).all()).toEqual([]);
    expect(merged.sqlite.pragma('foreign_key_check')).toEqual([]);
    merged.sqlite.close();
  });

  it('rolls back conflicting study task IDs without publishing merged data', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-study-conflict-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const desktopPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const webPath = join(backendRoot, 'data', 'lexora.db');
    for (const path of [desktopPath, webPath]) mkdirSync(dirname(path), { recursive: true });

    for (const [path, intent] of [[desktopPath, '{"source":"desktop"}'], [webPath, '{"source":"web"}']]) {
      const db = getDb(path);
      db.sqlite.prepare(`
        INSERT INTO study_preferences (id, time_zone, study_days, learning_target, review_target, grammar_target, updated_at)
        VALUES ('local', 'America/Toronto', '[1,2,3,4,5]', 5, 10, 1, '2026-09-20')
      `).run();
      db.sqlite.prepare(`
        INSERT INTO study_tasks (id, scheduled_date, kind, target_count, source, mode, version, created_at, updated_at, creation_intent)
        VALUES ('same-task', '2026-09-20', 'LEARN_WORDS', 2, 'MANUAL', 'new_words', 1, '2026-09-20', '2026-09-20', ?)
      `).run(intent);
      db.sqlite.close();
    }
    const path = sharedDatabasePath(home);
    await expect(prepareSharedDatabase(path, home, backendRoot)).rejects.toThrow(/Conflicting study_tasks record/);
    expect(existsSync(path)).toBe(false);
    for (const originalPath of [desktopPath, webPath]) {
      const original = getDb(originalPath);
      expect(original.sqlite.prepare('SELECT time_zone FROM study_preferences').get()).toEqual({ time_zone: 'America/Toronto' });
      original.sqlite.close();
    }
  });
  it('merges legacy grammar evidence with defaulted calendar columns', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-old-grammar-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const primaryPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const legacyPath = join(home, '.config', 'Lexora', 'data', 'lexora.db');
    mkdirSync(dirname(primaryPath), { recursive: true });
    mkdirSync(dirname(legacyPath), { recursive: true });
    getDb(primaryPath).sqlite.close();

    const legacy = new Database(legacyPath);
    legacy.exec(`
      CREATE TABLE grammar_lesson_progress (
        lesson_id TEXT PRIMARY KEY, revision_id TEXT NOT NULL, revision TEXT NOT NULL,
        last_position INTEGER NOT NULL, is_complete INTEGER NOT NULL, completed_at TEXT,
        created_at TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE grammar_exercise_attempts (
        id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES grammar_lesson_progress(lesson_id),
        revision_id TEXT NOT NULL, revision TEXT NOT NULL, exercise_id TEXT NOT NULL,
        request_id TEXT NOT NULL, answer TEXT NOT NULL, is_correct INTEGER NOT NULL,
        feedback TEXT NOT NULL, created_at TEXT NOT NULL
      );
      INSERT INTO grammar_lesson_progress VALUES ('lesson', 'revision-id', 'revision', 0, 0, NULL, '2026-09-20', '2026-09-20');
      INSERT INTO grammar_exercise_attempts VALUES ('attempt', 'lesson', 'revision-id', 'revision', 'exercise', 'request', 'answer', 1, 'feedback', '2026-09-20');
    `);
    legacy.close();

    await prepareSharedDatabase(sharedDatabasePath(home), home, backendRoot);
    const merged = getDb(sharedDatabasePath(home));
    expect(merged.sqlite.prepare("SELECT study_task_id, completed_lesson FROM grammar_exercise_attempts WHERE id = 'attempt'").get())
      .toEqual({ study_task_id: null, completed_lesson: 0 });
    expect(merged.sqlite.pragma('foreign_key_check')).toEqual([]);
    merged.sqlite.close();
  });

  it('rolls back conflicting study preferences without publishing merged data', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-preference-conflict-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const desktopPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const webPath = join(backendRoot, 'data', 'lexora.db');
    for (const path of [desktopPath, webPath]) mkdirSync(dirname(path), { recursive: true });
    for (const [path, zone] of [[desktopPath, 'America/Toronto'], [webPath, 'Europe/Paris']]) {
      const db = getDb(path);
      db.sqlite.prepare(`
        INSERT INTO study_preferences (id, time_zone, study_days, learning_target, review_target, grammar_target, updated_at)
        VALUES ('local', ?, '[1,2,3,4,5]', 5, 10, 1, '2026-09-20')
      `).run(zone);
      db.sqlite.close();
    }
    await expect(prepareSharedDatabase(sharedDatabasePath(home), home, backendRoot)).rejects.toThrow(/Conflicting study_preferences record/);
    expect(existsSync(sharedDatabasePath(home))).toBe(false);
    for (const [originalPath, zone] of [[desktopPath, 'America/Toronto'], [webPath, 'Europe/Paris']]) {
      const original = getDb(originalPath);
      expect(original.sqlite.prepare('SELECT time_zone FROM study_preferences').get()).toEqual({ time_zone: zone });
      original.sqlite.close();
    }
  });

  it('refuses incompatible source study tables instead of skipping them', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-study-schema-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const primaryPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const legacyPath = join(home, '.config', 'Lexora', 'data', 'lexora.db');
    mkdirSync(dirname(primaryPath), { recursive: true });
    mkdirSync(dirname(legacyPath), { recursive: true });
    getDb(primaryPath).sqlite.close();

    const legacy = new Database(legacyPath);
    legacy.exec('CREATE TABLE study_preferences (id TEXT, time_zone TEXT)');
    legacy.prepare("INSERT INTO study_preferences VALUES ('local', 'UTC')").run();
    legacy.close();

    await expect(prepareSharedDatabase(sharedDatabasePath(home), home, backendRoot)).rejects.toThrow(/incompatible primary key: study_preferences/);
    expect(existsSync(sharedDatabasePath(home))).toBe(false);
  });

  it('refuses conflicting records without publishing a partial shared database', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const desktopPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const webPath = join(backendRoot, 'data', 'lexora.db');
    for (const path of [desktopPath, webPath]) mkdirSync(dirname(path), { recursive: true });
    for (const [path, definition] of [[desktopPath, 'first'], [webPath, 'second']]) {
      const db = getDb(path);
      db.sqlite.prepare('INSERT INTO words (id, word, definition, created_at) VALUES (?, ?, ?, ?)').run('same-id', 'same', definition, '2026-09-20T00:00:00Z');
      db.sqlite.close();
    }

    const path = sharedDatabasePath(home);
    await expect(prepareSharedDatabase(path, home, backendRoot)).rejects.toThrow(/Conflicting words record/);
    expect(existsSync(path)).toBe(false);
    expect(getDb(desktopPath).sqlite.prepare('SELECT definition FROM words').get()).toEqual({ definition: 'first' });
    expect(getDb(webPath).sqlite.prepare('SELECT definition FROM words').get()).toEqual({ definition: 'second' });
  });

  it('merges legacy rows with fewer columns into the expanded shared schema', async () => {
    const root = mkdtempSync(join(tmpdir(), 'lexora-shared-legacy-'));
    roots.push(root);
    const home = join(root, 'home');
    const backendRoot = join(root, 'backend');
    const primaryPath = join(home, '.config', '@lexora', 'desktop', 'data', 'lexora.db');
    const legacyPath = join(home, '.config', 'Lexora', 'data', 'lexora.db');
    mkdirSync(dirname(primaryPath), { recursive: true });
    mkdirSync(dirname(legacyPath), { recursive: true });

    const primary = getDb(primaryPath);
    primary.sqlite.prepare("INSERT INTO words (id, word, definition, created_at) VALUES ('primary-word', 'primary', 'primary definition', '2026-09-20T00:00:00Z')").run();
    primary.sqlite.close();

    const legacy = new Database(legacyPath);
    legacy.exec('CREATE TABLE words (id TEXT PRIMARY KEY, word TEXT NOT NULL, definition TEXT NOT NULL, created_at TEXT NOT NULL)');
    legacy.prepare('INSERT INTO words VALUES (?, ?, ?, ?)').run('legacy-word', 'legacy', 'legacy definition', '2026-09-20T00:00:00Z');
    legacy.close();

    const path = sharedDatabasePath(home);
    await prepareSharedDatabase(path, home, backendRoot);
    const merged = getDb(path);
    expect(merged.sqlite.prepare('SELECT id, word, updated_at FROM words ORDER BY word').all()).toEqual([
      { id: 'legacy-word', word: 'legacy', updated_at: null },
      { id: 'primary-word', word: 'primary', updated_at: null },
    ]);
    merged.sqlite.close();
  });
});
