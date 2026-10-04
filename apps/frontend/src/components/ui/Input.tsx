/**
 * @file Input.tsx
 * @description Shadcn input primitive using Lexora theme tokens.
 */
import { forwardRef, type InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={`flex min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm ${className}`}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
