/**
 * @file update-state.test.ts
 * @description Verifies tolerant loading and atomic saving of persisted desktop update preferences.
 */
import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createUpdateStateStore } from '../src/update-state.js';

let directory: string;
let filePath: string;
beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'lexora-update-state-'));
  filePath = join(directory, 'nested', 'update-state.json');
});
afterEach(async () => { await rm(directory, { recursive: true, force: true }); });

describe('createUpdateStateStore', () => {
  it('loads an empty state when the file does not exist', async () => {
    expect(await createUpdateStateStore(filePath).load()).toEqual({});
  });

  it('treats corrupt JSON and wrong-shaped content as empty', async () => {
    const store = createUpdateStateStore(filePath);
    await store.save({ lastCheckedAt: '2026-11-03T00:00:00.000Z' });
    await writeFile(filePath, '{not json');
    expect(await store.load()).toEqual({});
    await writeFile(filePath, JSON.stringify([1, 2]));
    expect(await store.load()).toEqual({});
  });

  it('drops fields with the wrong type or an invalid value', async () => {
    const store = createUpdateStateStore(filePath);
    await store.save({});
    await writeFile(filePath, JSON.stringify({ lastCheckedAt: 5, dismissedVersion: 'nightly', extra: true }));
    expect(await store.load()).toEqual({});
  });

  it('merges saves, keeps earlier fields, and survives a reload', async () => {
    const store = createUpdateStateStore(filePath);
    await store.save({ lastCheckedAt: '2026-11-03T08:00:00.000Z' });
    await store.save({ dismissedVersion: '0.4.0' });
    expect(await createUpdateStateStore(filePath).load()).toEqual({ lastCheckedAt: '2026-11-03T08:00:00.000Z', dismissedVersion: '0.4.0' });
  });

  it('writes through a temporary file so no partial file remains', async () => {
    const store = createUpdateStateStore(filePath);
    await store.save({ dismissedVersion: '0.4.0' });
    expect(await readdir(join(directory, 'nested'))).toEqual(['update-state.json']);
    expect(JSON.parse(await readFile(filePath, 'utf8'))).toEqual({ dismissedVersion: '0.4.0' });
  });

  it('serializes concurrent saves without losing a field', async () => {
    const store = createUpdateStateStore(filePath);
    await Promise.all([store.save({ lastCheckedAt: '2026-11-03T08:00:00.000Z' }), store.save({ dismissedVersion: '0.4.0' })]);
    expect(await store.load()).toEqual({ lastCheckedAt: '2026-11-03T08:00:00.000Z', dismissedVersion: '0.4.0' });
  });
});
