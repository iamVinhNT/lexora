/**
 * @file client.ts
 * @description Typed HTTP client for Lexora's uniform API response envelope.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  query?: Record<string, string | number | undefined | null>;
  body?: unknown;
};

type ApiEnvelope<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; details?: unknown } };

export function resolveApiBaseUrl(
  configuredUrl = import.meta.env.VITE_API_BASE_URL,
  isProduction = import.meta.env.PROD,
  currentOrigin = window.location.origin,
): string {
  if (configuredUrl) return configuredUrl;
  return isProduction ? currentOrigin : 'http://localhost:3001';
}

const API_BASE_URL = resolveApiBaseUrl();

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = new URL(path, API_BASE_URL);
  Object.entries(options.query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  });

  const headers = new Headers(options.headers);
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');
  const response = await fetch(url, {
    ...options,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  let envelope: ApiEnvelope<T> | undefined;
  try {
    envelope = (await response.json()) as ApiEnvelope<T>;
  } catch {
    throw new ApiError('The server returned an invalid response.', response.status, 'INVALID_RESPONSE');
  }

  if (!response.ok || !envelope.success) {
    const error = envelope.success
      ? { code: 'HTTP_ERROR', message: response.statusText || 'Request failed' }
      : envelope.error;
    throw new ApiError(error.message, response.status, error.code, 'details' in error ? error.details : undefined);
  }

  return envelope.data;
}
