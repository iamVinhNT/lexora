/**
 * @file AiChatInput.tsx
 * @description Accessible text input form for Lexi chat with Enter-to-send and touch-ready buttons.
 */
import type { FormEvent, KeyboardEvent, RefObject } from 'react';
import { RotateCw, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

interface AiChatInputProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  disabled: boolean;
  canSend: boolean;
  hasTurns: boolean;
  isError: boolean;
}

export function AiChatInput({
  textareaRef,
  draft,
  onDraftChange,
  onSubmit,
  disabled,
  canSend,
  hasTurns,
  isError,
}: AiChatInputProps) {
  const { t } = useTranslation('assistant');

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      if (canSend) {
        onSubmit(event);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="shrink-0 border-t border-border p-3">
      <label htmlFor="lexi-question" className="sr-only">
        {t('inputLabel')}
      </label>
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          id="lexi-question"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={hasTurns ? t('followUpPlaceholder') : t('inputPlaceholder')}
          maxLength={2000}
          rows={1}
          disabled={disabled}
          className="min-h-11 min-w-0 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={!canSend}
          aria-label={isError ? t('retry') : t('send')}
          className="min-h-11 min-w-11 px-3"
          icon={isError ? RotateCw : Send}
          iconOnly
        >
          {isError ? t('retry') : t('send')}
        </Button>
      </div>
    </form>
  );
}
