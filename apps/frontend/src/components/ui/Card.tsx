/**
 * @file Card.tsx
 * @description Surface container primitive used by dashboard content.
 */
import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass-panel rounded-2xl ${className}`} {...props} />;
}
