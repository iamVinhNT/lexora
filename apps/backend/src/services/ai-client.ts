/**
 * @file ai-client.ts
 * @description Shared AI provider configuration and ChatOpenAI model creation.
 */
import { ChatOpenAI } from '@langchain/openai';
import { AppError } from './vocabulary.service.js';

export type AiConfig = {
  apiKey: string;
  baseURL: string;
  model: string;
  timeoutMs: number;
};

export interface ResolvedAiConfig { config: AiConfig; revision: string }
export type AiConfigResolver = () => Promise<ResolvedAiConfig>;

export function normalizeAiBaseURL(value: string): string {
  const parsed = new URL(value);
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
  if ((parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && loopback))
    || parsed.username || parsed.password || value.includes('?') || value.includes('#')
    || /^[a-z]+:\/\/[^/]*@/i.test(value)) throw new Error('Invalid AI endpoint');
  return parsed.href.replace(/\/+$/, '');
}

export function readAiConfig(env: NodeJS.ProcessEnv = process.env): AiConfig {
  try {
    const apiKey = env.API_KEY?.trim();
    if (!apiKey || apiKey.length > 4096) throw new Error('Missing credential');
    const baseURL = normalizeAiBaseURL(env.BASE_URL?.trim() || 'https://api.openai.com/v1');
    const parsed = new URL(baseURL);
    const official = parsed.origin === 'https://api.openai.com' && ['', '/', '/v1'].includes(parsed.pathname);
    const model = env.AI_MODEL?.trim() || (official ? 'gpt-4o-mini' : '');
    if (!model || model.length > 200) throw new Error('Missing model');
    const rawTimeout = env.AI_TIMEOUT_MS ?? '15000';
    const timeoutMs = Number(rawTimeout);
    if (!/^\d+$/.test(rawTimeout.trim()) || !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 30000) throw new Error('Invalid timeout');
    return { apiKey, baseURL, model, timeoutMs };
  } catch {
    throw new AppError(503, 'AI_NOT_CONFIGURED', 'AI provider is not configured');
  }
}

export function createAiChatModel(config: AiConfig, maxTokens?: number): ChatOpenAI {
  return new ChatOpenAI({
    apiKey: config.apiKey,
    model: config.model,
    timeout: config.timeoutMs,
    maxRetries: 0,
    maxTokens,
    configuration: { baseURL: config.baseURL },
  });
}
