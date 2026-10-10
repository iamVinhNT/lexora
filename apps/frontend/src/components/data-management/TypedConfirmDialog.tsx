/**
 * @file TypedConfirmDialog.tsx
 * @description Reusable localized confirmation dialog with exact phrase validation.
 */
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../../api/client';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';
import { Check, X } from 'lucide-react';

const inputClass = 'min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary';

export type TypedConfirmDialogProps = {
  title: string;
  phrase: string;
  value: string;
  onChange: (value: string) => void;
  description: string;
  descriptionRole?: 'alert';
  actionLabel: string;
  pending: boolean;
  error: Error | null;
  onClose: () => void;
  onConfirm: () => void;
  inputLabel: string;
};

export function TypedConfirmDialog({ title, phrase, value, onChange, description, descriptionRole, actionLabel, pending, error, onClose, onConfirm, inputLabel }: TypedConfirmDialogProps) {
  const { t, i18n } = useTranslation('common');
  const previousLanguage = useRef(i18n.language);

  useEffect(() => {
    if (previousLanguage.current === i18n.language) return;
    previousLanguage.current = i18n.language;
    onChange('');
  }, [i18n.language, onChange]);

  const diagnosticError = error instanceof ApiError ? null : error?.message;
  return <Dialog title={title} onClose={onClose}>
    <div className="space-y-5">
      <p role={descriptionRole} className="text-sm text-foreground">{description}</p>
      <div>
        <label htmlFor="typed-confirmation" className="block text-sm font-semibold text-foreground">{inputLabel}</label>
        <input id="typed-confirmation" aria-label={inputLabel} value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} mt-2`} autoComplete="off" />
      </div>
      {error && <p role="alert" className="text-sm text-foreground"><span>{getLocalizedErrorMessage(error, t)}</span>{diagnosticError && <span className="sr-only"> {diagnosticError}</span>}</p>}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onClose} icon={X} iconOnly>{t('actions.cancel')}</Button>
        <Button type="button" variant="danger" disabled={value !== phrase || pending} onClick={onConfirm} icon={Check}>{pending ? t('actions.working') : actionLabel}</Button>
      </div>
    </div>
  </Dialog>;
}
