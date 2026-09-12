/**
 * @file phrase-exit.mjs
 * @description Emits a non-specific address phrase that must not classify as EADDRINUSE.
 */

process.stderr.write('Error: address already in use\n');
process.exitCode = 1;
