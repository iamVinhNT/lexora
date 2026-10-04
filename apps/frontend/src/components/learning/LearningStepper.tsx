/**
 * @file LearningStepper.tsx
 * @description Visual 5-step cognitive progress stepper for learning sessions.
 */
import { useTranslation } from 'react-i18next';

import type { LearningCursor, SessionStep } from '../../api/session.api';

export interface LearningStepperProps {
  currentStep: SessionStep;
  cursor?: LearningCursor | null;
}

const STEP_ORDER: SessionStep[] = ['CONTEXT', 'UNDERSTAND', 'RECALL', 'OUTPUT', 'ASSESS'];

export function LearningStepper({ currentStep, cursor }: LearningStepperProps) {
  const { t } = useTranslation('learning');
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  const stepLabels: Record<SessionStep, string> = {
    CONTEXT: t('context'),
    UNDERSTAND: t('understand'),
    RECALL: t('recall'),
    OUTPUT: t('output'),
    ASSESS: t('assess'),
  };

  const phaseBadge =
    cursor && (cursor.phase === 'ENCODE' || cursor.phase === 'RETRIEVE')
      ? `${cursor.phase === 'ENCODE' ? t('phaseEncode') : t('phaseRetrieve')} · ${t('groupWordProgress', {
          current: cursor.itemIndex + 1,
          total: cursor.groupSize,
        })}`
      : null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div aria-live="polite" className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {t('step', { current: currentIndex + 1, total: 5 })}
          </div>
          {phaseBadge && (
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted border border-border/60">
              {phaseBadge}
            </span>
          )}
        </div>
        <div className="text-xs font-medium text-muted">
          {stepLabels[currentStep]}
        </div>
      </div>

      <ol aria-label={t('learningProgressAria')} className="grid grid-cols-5 gap-1 sm:gap-2">
        {STEP_ORDER.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li
              key={step}
              className="flex flex-col gap-1"
              aria-current={isActive ? 'step' : undefined}
            >
              <div
                className={`h-1.5 w-full rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary'
                    : isCompleted
                    ? 'bg-primary/50'
                    : 'bg-secondary'
                }`}
              />
              <span
                className={`text-center text-[10px] sm:text-xs leading-tight transition-colors break-words ${
                  isActive
                    ? 'font-semibold text-primary'
                    : isCompleted
                    ? 'font-medium text-muted'
                    : 'text-muted/60'
                }`}
              >
                {stepLabels[step]}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
