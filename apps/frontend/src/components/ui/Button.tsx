/**
 * @file Button.tsx
 * @description Reusable semantic button styles for primary and secondary actions.
 * Prefers icons over plain text: pass `icon` to lead the label with a glyph, and `iconOnly`
 * to collapse the label into an accessible tooltip (`sr-only` text + `title`) to save space.
 */
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  /** Render only the icon; children stay in the DOM as `sr-only` text and the default tooltip. */
  iconOnly?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-foreground hover:bg-border',
  ghost: 'text-muted hover:bg-secondary hover:text-foreground',
  danger: 'bg-danger text-danger-foreground hover:opacity-90',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = '', variant = 'primary', icon: Icon, iconOnly = false, title, children, ...props },
  ref,
) {
  const sizeClasses = iconOnly ? 'min-w-11 px-2' : 'px-4';
  const tooltip = title ?? (iconOnly ? props['aria-label'] ?? (typeof children === 'string' ? children : undefined) : undefined);
  return (
    <button
      ref={ref}
      title={tooltip}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${sizeClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={iconOnly ? 18 : 16} aria-hidden="true" className="shrink-0" />}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
    </button>
  );
});
