/**
 * @file DialogPrimitives.tsx
 * @description Shadcn Radix dialog composition, isolated from existing custom dialog consumers.
 */
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export const Dialog = DialogPrimitive.Root;

type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { closeLabel: string };

export const DialogContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className = '', children, closeLabel, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm" />
      <DialogPrimitive.Content
        ref={ref}
        className={`fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 gap-5 overflow-y-auto overscroll-contain rounded-2xl border border-border bg-surface p-4 text-foreground shadow-xl sm:max-h-[90dvh] sm:p-6 ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4 sm:top-4" aria-label={closeLabel}>
          <X aria-hidden="true" size={20} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

export function DialogHeader({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col space-y-1.5 pr-12 ${className}`} {...props} />;
}

export const DialogTitle = forwardRef<ElementRef<typeof DialogPrimitive.Title>, ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className = '', ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={`break-words text-lg font-semibold tracking-tight sm:text-xl ${className}`} {...props} />
  ),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export function DialogFooter({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:justify-end ${className}`} {...props} />;
}
