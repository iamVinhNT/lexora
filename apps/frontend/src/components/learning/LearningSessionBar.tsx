/**
 * @file LearningSessionBar.tsx
 * @description Focus mode session top bar displaying word progress and ghost abandon action.
 */
import { useTranslation } from 'react-i18next';

export interface LearningSessionBarProps {
  currentWord: number;
  totalWords: number;
  onAbandon: () => void;
  isPending: boolean;
}

export function LearningSessionBar({
  currentWord,
  totalWords,
  onAbandon,
  isPending,
}: LearningSessionBarProps) {
  const { t } = useTranslation('learning');
  const { t: tCommon } = useTranslation('common');
  const percentage = totalWords > 0 ? Math.min(100, Math.max(0, (currentWord / totalWords) * 100)) : 0;
  const wordLabel = t('wordProgress', { current: currentWord, total: totalWords });

  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 sm:gap-4 py-1">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="shrink-0 text-xs sm:text-sm font-semibold tracking-tight text-foreground">
          {wordLabel}
        </span>
        <div
          role="progressbar"
          aria-valuenow={currentWord}
          aria-valuemin={1}
          aria-valuemax={totalWords}
          aria-label={wordLabel}
          className="h-1.5 w-16 min-w-12 sm:w-32 overflow-hidden rounded-full bg-secondary"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onAbandon}
        disabled={isPending}
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg px-2.5 py-2 text-xs sm:px-3 sm:text-sm font-medium text-muted transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {tCommon('actions.abandonSession')}
      </button>
    </div>
  );
}
