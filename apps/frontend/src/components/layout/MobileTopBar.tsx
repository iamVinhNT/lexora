/**
 * @file MobileTopBar.tsx
 * @description Compact mobile header with Lexora branding and theme control.
 */
import { Link } from 'react-router-dom';

import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-border bg-surface px-4 backdrop-blur lg:hidden">
      <Link
        to="/"
        className="text-lg font-bold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Lexora
      </Link>
      <div className="flex items-center gap-1"><LanguageSelector /><ThemeToggle /></div>
    </header>
  );
}
