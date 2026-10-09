/**
 * @file speech-smoke.mjs
 * @description Exercises vocabulary pronunciation in the built, sandboxed Linux desktop with an isolated in-memory database.
 */
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const desktopRoot = fileURLToPath(new URL('..', import.meta.url));
const root = await mkdtemp(join(tmpdir(), 'lexora-speech-smoke-'));
const harness = join(root, 'harness.cjs');
const mainUrl = pathToFileURL(join(desktopRoot, 'dist/main.js')).href;

try {
  await writeFile(harness, `
const { app, BrowserWindow } = require('electron');
app.setPath('userData', ${JSON.stringify(join(root, 'profile'))});
async function poll(read) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const result = await read();
    if (result) return result;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error('Desktop speech smoke timed out');
}
async function run() {
  await import(${JSON.stringify(mainUrl)});
  await app.whenReady();
  const win = await poll(() => BrowserWindow.getAllWindows().find(w => /^http:/.test(w.webContents.getURL()) && !w.webContents.isLoading()));
  const origin = new URL(win.webContents.getURL()).origin;
  const response = await fetch(origin + '/api/words', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ word: 'reliable', definition: 'Able to be trusted.' })
  });
  if (response.status !== 201) throw new Error('Could not seed isolated vocabulary');
  await win.loadURL(origin + '/words');
  await poll(() => win.webContents.executeJavaScript(
    "Array.from(document.querySelectorAll('button')).some(b => /^(Pronounce|Phát âm) reliable$/.test(b.getAttribute('aria-label') || ''))"
  ));
  const result = await win.webContents.executeJavaScript(
    \`new Promise(resolve => {
      const events = [];
      const originalSpeak = speechSynthesis.speak.bind(speechSynthesis);
      const timeout = setTimeout(() => resolve({events, error: 'timeout'}), 10000);
      speechSynthesis.speak = utterance => {
        utterance.addEventListener('start', () => events.push('start'));
        utterance.addEventListener('end', () => {
          events.push('end');
          clearTimeout(timeout);
          resolve({events, text: utterance.text, lang: utterance.lang});
        });
        utterance.addEventListener('error', event => {
          clearTimeout(timeout); resolve({events, error: event.error});
        });
        originalSpeak(utterance);
      };
      const button = Array.from(document.querySelectorAll('button')).find(b => /^(Pronounce|Phát âm) reliable$/.test(b.getAttribute('aria-label') || ''));
      button.click();
    })\`, true
  );
  console.log('LEXORA_SPEECH_RESULT ' + JSON.stringify(result));
  app.quit();
}
run().catch(error => { console.error(error); app.exit(1); });
`, 'utf8');
  const { ELECTRON_RUN_AS_NODE: _runAsNode, ...environment } = process.env;
  const result = await promisify(execFile)(join(desktopRoot, 'node_modules/electron/dist/electron'), [harness], {
    cwd: desktopRoot,
    env: { ...environment, DATABASE_PATH: ':memory:' },
    timeout: 35_000,
    maxBuffer: 2 * 1024 * 1024,
  });
  const line = result.stdout.split('\n').find(value => value.startsWith('LEXORA_SPEECH_RESULT '));
  assert.ok(line, `No speech result. ${result.stderr}`);
  const speech = JSON.parse(line.slice('LEXORA_SPEECH_RESULT '.length));
  assert.deepEqual(speech, { events: ['start', 'end'], text: 'reliable', lang: 'en-US' });
  console.log('Desktop vocabulary pronunciation passed:', speech);
} finally {
  await rm(root, { recursive: true, force: true });
}
