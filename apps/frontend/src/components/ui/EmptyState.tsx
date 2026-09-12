/**
 * @file EmptyState.tsx
 * @description Truthful empty-state presentation with one optional primary action.
 */
import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-5 p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
