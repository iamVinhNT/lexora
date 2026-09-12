/**
 * @file PageHeader.tsx
 * @description Accessible page title and supporting text shared by route pages.
 */
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 tabIndex={-1} className="text-3xl font-bold tracking-tight text-foreground focus:outline-none sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{subtitle}</p>
      </div>
      {action}
    </header>
  );
}
