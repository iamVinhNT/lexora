/**
 * @file Dialog.tsx
 * @description Full-screen modal dialog primitive with backdrop blur, portal mounting, scroll locking, and accessibility.
 */
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

type DialogProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  fixedContent?: boolean;
};

export function Dialog({ title, children, onClose, wide = false, fixedContent = false }: DialogProps) {
  const { t } = useTranslation('common');
  const dialogRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  onCloseRef.current = onClose;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    const backgroundAttributes = Array.from(document.body.children)
      .filter((element) => element !== portalRef.current)
      .map((element) => ({
        element,
        ariaHidden: element.getAttribute('aria-hidden'),
        inert: element.getAttribute('inert'),
      }));
    document.body.style.overflow = 'hidden';
    backgroundAttributes.forEach(({ element }) => {
      element.setAttribute('aria-hidden', 'true');
      element.setAttribute('inert', '');
    });

    const firstFormField = Array.from(
      dialogRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input:not([type="hidden"]):not(:disabled), select:not(:disabled), textarea:not(:disabled)',
      ) ?? [],
    ).find((field) => {
      const styles = getComputedStyle(field);
      return !field.hidden && styles.display !== 'none' && styles.visibility !== 'hidden';
    });
    (firstFormField ?? closeRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => {
        const styles = getComputedStyle(element);
        return !element.hidden && styles.display !== 'none' && styles.visibility !== 'hidden';
      });
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      backgroundAttributes.forEach(({ element, ariaHidden, inert }) => {
        if (ariaHidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', ariaHidden);
        if (inert === null) element.removeAttribute('inert');
        else element.setAttribute('inert', inert);
      });
      previousFocusRef.current?.focus();
    };
  }, []);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={portalRef}
      className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center ${fixedContent ? 'p-0 sm:p-6' : 'p-2 sm:p-6'}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        tabIndex={-1}
        className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
        data-testid="dialog-backdrop"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`glass-panel relative z-50 w-full min-w-0 rounded-2xl shadow-xl ${fixedContent ? 'flex h-dvh max-h-dvh flex-col overflow-hidden rounded-none p-0 sm:h-auto sm:max-h-[90dvh] sm:rounded-2xl' : 'max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain p-4 sm:max-h-[90dvh] sm:p-6'} ${
          wide ? 'max-w-3xl' : 'max-w-xl'
        }`}
      >
        <div className={`flex shrink-0 items-start justify-between gap-3 ${fixedContent ? 'border-b border-border px-4 py-3 sm:px-7' : 'sticky top-0 z-10 bg-surface pb-3'}`}>
          <h2 id={titleId} className="min-w-0 break-words text-lg font-semibold text-foreground sm:text-xl">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label={t('dialog.close', { title })}
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <div className={fixedContent ? 'min-h-0 flex flex-1 overflow-hidden' : 'mt-5'}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
