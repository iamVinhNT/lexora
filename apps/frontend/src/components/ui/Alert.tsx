/**
 * @file Alert.tsx
 * @description Shadcn alert and description primitives for task feedback.
 */
import { forwardRef, type HTMLAttributes } from 'react';

type AlertProps = HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' };

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-3 ${variant === 'destructive' ? 'border-danger/30 bg-danger/10 text-danger' : 'border-border bg-secondary text-foreground'} ${className}`}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

export const AlertDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`text-sm leading-relaxed ${className}`} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';
