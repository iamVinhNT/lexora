/**
 * @file generate-icons.mjs
 * @description Generates Linux PNG application icons from Lexora's brand favicon.
 */
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const desktopRoot = resolve(scriptDir, '..');
const source = resolve(desktopRoot, '../frontend/public/favicon.svg');
const output = join(desktopRoot, 'build/icons');
const sizes = [16, 32, 48, 128, 256, 512];

await mkdir(output, { recursive: true });
await Promise.all(sizes.map((size) => sharp(source).resize(size, size).png().toFile(join(output, `${size}x${size}.png`))));
