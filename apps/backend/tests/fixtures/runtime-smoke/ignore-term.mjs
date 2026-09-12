/**
 * @file ignore-term.mjs
 * @description Keeps a real child alive while deliberately ignoring SIGTERM.
 */

process.on('SIGTERM', () => {
  process.stderr.write('SIGTERM ignored\n');
});
setInterval(() => {}, 1_000);
process.stdout.write('ignore-term child ready\n');
