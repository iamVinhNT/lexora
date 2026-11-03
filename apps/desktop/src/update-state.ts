/**
 * @file update-state.ts
 * @description Persists desktop update preferences (last check time, dismissed version) as a small JSON file.
 */
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export interface PersistedUpdateState {
  lastCheckedAt?: string;
  dismissedVersion?: string;
}

export interface UpdateStateStore {
  load(): Promise<PersistedUpdateState>;
  save(patch: PersistedUpdateState): Promise<void>;
}

const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function sanitize(value: unknown): PersistedUpdateState {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return {};
  const raw = value as Record<string, unknown>;
  const state: PersistedUpdateState = {};
  if (typeof raw.lastCheckedAt === 'string' && !Number.isNaN(Date.parse(raw.lastCheckedAt))) state.lastCheckedAt = raw.lastCheckedAt;
  if (typeof raw.dismissedVersion === 'string' && SEMVER.test(raw.dismissedVersion)) state.dismissedVersion = raw.dismissedVersion;
  return state;
}

export function createUpdateStateStore(filePath: string): UpdateStateStore {
  let queue: Promise<unknown> = Promise.resolve();

  async function load(): Promise<PersistedUpdateState> {
    try {
      return sanitize(JSON.parse(await readFile(filePath, 'utf8')));
    } catch {
      return {};
    }
  }

  async function write(patch: PersistedUpdateState): Promise<void> {
    const next = { ...(await load()), ...patch };
    await mkdir(dirname(filePath), { recursive: true });
    const temporaryPath = `${filePath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(next)}\n`, 'utf8');
    await rename(temporaryPath, filePath);
  }

  return {
    load,
    save(patch) {
      const result = queue.then(() => write(patch));
      queue = result.catch(() => undefined);
      return result;
    },
  };
}
