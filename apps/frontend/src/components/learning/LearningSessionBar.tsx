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
    <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 py-1">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {wordLabel}
        </span>
        <div
          role="progressbar"
          aria-valuenow={currentWord}
          aria-valuemin={1}
          aria-valuemax={totalWords}
          aria-label={wordLabel}
          className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary sm:w-32"
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
        className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {tCommon('actions.abandonSession')}
      </button>
    </div>
  );
}
