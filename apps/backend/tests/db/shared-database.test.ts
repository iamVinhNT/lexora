/**
 * @file shared-database.test.ts
 * @description Verifies safe first-run consolidation of web and desktop SQLite data.
 */
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { getDb } from '../../src/db/client.js';
import { prepareSharedDatabase, sharedDatabasePath } from '../../src/db/shared-database.js';

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('shared local database', () => {
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
    expect(() => getDb(path)).not.toThrow();
    expect(getDb(desktopPath).sqlite.prepare('SELECT definition FROM words').get()).toEqual({ definition: 'first' });
    expect(getDb(webPath).sqlite.prepare('SELECT definition FROM words').get()).toEqual({ definition: 'second' });
  });
});
