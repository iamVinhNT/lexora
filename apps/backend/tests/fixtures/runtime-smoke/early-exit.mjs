/**
 * @file early-exit.mjs
 * @description Emits both child output streams before exiting with a startup failure.
 */

process.stdout.write('early child stdout\n');
process.stderr.write('early child stderr\n');
process.exitCode = 23;
