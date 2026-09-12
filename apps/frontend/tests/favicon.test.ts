/**
 * @file favicon.test.ts
 * @description Verifies the frontend declares and ships its branded favicon asset.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const indexHtmlPath = resolve(process.cwd(), 'index.html');
const faviconPath = resolve(process.cwd(), 'public/favicon.svg');

describe('frontend favicon', () => {
  it('declares the shipped SVG favicon in the HTML entry point', () => {
    const indexHtml = readFileSync(indexHtmlPath, 'utf8');
    const favicon = readFileSync(faviconPath, 'utf8');

    expect(indexHtml).toContain('<link rel="icon" href="/favicon.svg" type="image/svg+xml" />');
    expect(favicon).toContain('<svg');
    expect(favicon).toContain('#4F46E5');
  });
});
