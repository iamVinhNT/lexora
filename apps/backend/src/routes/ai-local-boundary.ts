/**
 * @file ai-local-boundary.ts
 * @description Local peer, Host and Origin boundary shared by AI chat and credential management.
 */
import type { FastifyRequest } from 'fastify';

export function allowsLocalAiRequest(request: FastifyRequest): boolean {
  const peer = request.raw.socket.remoteAddress;
  if (peer !== '127.0.0.1' && peer !== '::1' && peer !== '::ffff:127.0.0.1') return false;
  const host = request.headers.host;
  if (!host || !/^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/.test(host)) return false;
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    if (parsed.origin !== origin || parsed.protocol !== 'http:') return false;
    if (parsed.origin === 'http://localhost:5173' || parsed.origin === 'http://127.0.0.1:5173') return true;
    return parsed.host === host;
  } catch { return false; }
}
