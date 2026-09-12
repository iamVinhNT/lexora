/**
 * @file Card.tsx
 * @description Surface container primitive used by dashboard content.
 */
import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={`rounded-2xl border border-border bg-surface shadow-sm ${className}`} {...props} />;
}
