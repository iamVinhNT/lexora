/**
 * @file Dialog.tsx
 * @description Keyboard-accessible modal primitive with focus restore and trapping.
 */
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type DialogProps = { title: string; children: ReactNode; onClose: () => void; wide?: boolean };

export function Dialog({ title, children, onClose, wide = false }: DialogProps) {
  const { t } = useTranslation('common');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  onCloseRef.current = onClose;

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onCloseRef.current();
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') ?? []);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); previousFocusRef.current?.focus(); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-overlay p-0 sm:items-center sm:p-4">
      <button type="button" aria-label={t('dialog.close', { title })} onClick={onClose} className="absolute inset-0 cursor-default" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className={`relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-5 shadow-lg sm:rounded-2xl sm:p-6 ${wide ? 'max-w-3xl' : 'max-w-xl'}`}>
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold text-foreground">{title}</h2>
          <button ref={closeRef} type="button" aria-label={t('dialog.close', { title })} onClick={onClose} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X aria-hidden="true" size={20} /></button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
