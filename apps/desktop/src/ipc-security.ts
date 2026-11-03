/**
 * @file ipc-security.ts
 * @description Validates that an Electron IPC event comes from the embedded Lexora server origin.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getSenderUrl(event: unknown): string {
  if (!isRecord(event)) return '';
  const senderFrame = event.senderFrame;
  if (isRecord(senderFrame) && typeof senderFrame.url === 'string') return senderFrame.url;
  const sender = event.sender;
  if (isRecord(sender) && typeof sender.getURL === 'function') return String(sender.getURL());
  return '';
}

export function isTrustedSender(event: unknown, allowedOrigin: string): boolean {
  try {
    return new URL(getSenderUrl(event)).origin === allowedOrigin;
  } catch {
    return false;
  }
}
