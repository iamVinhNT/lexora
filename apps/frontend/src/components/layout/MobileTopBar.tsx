/**
 * @file MobileTopBar.tsx
 * @description Compact mobile header with Lexora branding and theme control.
 */
import { Link } from 'react-router-dom';

import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export function MobileTopBar() {
  return (
    <header className="glass-nav sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b px-4 pt-[env(safe-area-inset-top)] md:hidden">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-2.5 rounded-lg text-lg font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">L</span>
        Lexora
      </Link>
      <div className="flex shrink-0 items-center gap-2"><LanguageSelector compact /><ThemeToggle /></div>
    </header>
  );
}
