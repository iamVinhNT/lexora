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
    <header className="flex min-w-0 flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
      <div className="min-w-0 lg:flex-1 lg:basis-80">
        <h1 tabIndex={-1} className="break-words text-2xl font-bold tracking-tight text-foreground focus:outline-none sm:text-3xl xl:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">{subtitle}</p>
      </div>
      {action && <div className="flex min-w-0 flex-wrap items-center gap-2 lg:max-w-full [&>button]:flex-1 sm:[&>button]:flex-none [&>a]:flex-1 sm:[&>a]:flex-none">{action}</div>}
    </header>
  );
}
