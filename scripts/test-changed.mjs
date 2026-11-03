#!/usr/bin/env node
/**
 * @file test-changed.mjs
 * @description Changed verify tier: run only the tests related to uncommitted source changes, per workspace.
 * Uses `vitest related` on the changed source files, so a changed package.json or config file does not
 * trigger the whole suite (the full tier, `pnpm verify`, covers that). Time depends on how central the changed
 * files are: a leaf module takes seconds, a widely imported component can pull in most of a workspace.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).split('\n').filter(Boolean);
const changed = new Set([...git('diff', '--name-only', 'HEAD'), ...git('ls-files', '-o', '--exclude-standard')]);

const byWorkspace = new Map();
for (const file of changed) {
  const match = file.match(/^apps\/([^/]+)\/(.+\.(?:ts|tsx|js|jsx|mjs|cjs))$/);
  if (!match || !existsSync(file)) continue;
  const [, workspace, relative] = match;
  if (!byWorkspace.has(workspace)) byWorkspace.set(workspace, []);
  byWorkspace.get(workspace).push(relative);
}

if (byWorkspace.size === 0) {
  console.log('test-changed: no changed source files, nothing to run');
  process.exit(0);
}

const only = process.argv.slice(2); // optional: limit to named workspaces, e.g. `pnpm test:changed backend`
let failed = false;
for (const [workspace, files] of byWorkspace) {
  if (only.length > 0 && !only.includes(workspace)) continue;
  console.log(`\n==> ${workspace}: vitest related (${files.length} changed file${files.length === 1 ? '' : 's'})`);
  const result = spawnSync('pnpm', ['--filter', `@lexora/${workspace}`, 'exec', 'vitest', 'related', '--run', '--passWithNoTests', ...files], {
    stdio: 'inherit',
  });
  if (result.status !== 0) failed = true;
}
process.exit(failed ? 1 : 0);
