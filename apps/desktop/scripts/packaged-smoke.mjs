/**
 * @file packaged-smoke.mjs
 * @description Launches the unpacked packaged Electron executable and verifies renderer bridge smoke behavior.
 */
import { runPackagedSmoke } from './artifact-smoke.mjs';

const result = await runPackagedSmoke();
console.log(JSON.stringify({ packagedSmoke: true, stdout: result.stdout, stderr: result.stderr }, null, 2));
