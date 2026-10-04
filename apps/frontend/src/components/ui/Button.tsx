/**
 * @file Button.tsx
 * @description Reusable semantic button styles for primary and secondary actions.
 */
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-foreground hover:bg-border',
  ghost: 'text-muted hover:bg-secondary hover:text-foreground',
  danger: 'bg-danger text-danger-foreground hover:opacity-90',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className = '', variant = 'primary', ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
});
