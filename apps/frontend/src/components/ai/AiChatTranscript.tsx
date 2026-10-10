/**
 * @file AiChatTranscript.tsx
 * @description Renders paginated conversation turns, live streaming reply, and empty state guides.
 */
import { useTranslation } from 'react-i18next';
import type { AiTurn } from '../../api/ai-history.api';
import { Button } from '../ui/Button';
import { History, Lightbulb } from 'lucide-react';

interface AiChatTranscriptProps {
  turns: AiTurn[];
  hasOlderTurns: boolean;
  isLoadingOlderTurns: boolean;
  onLoadOlderTurns: () => void;
  isSending: boolean;
  streamingText: string;
  question: string;
  onSendTipQuestion: () => void;
  canSendTipQuestion: boolean;
  onIncludeContentChange: (checked: boolean) => void;
  onIncludeProgressChange: (checked: boolean) => void;
  includeContent: boolean;
  includeProgress: boolean;
}

export function AiChatTranscript({
  turns,
  hasOlderTurns,
  isLoadingOlderTurns,
  onLoadOlderTurns,
  isSending,
  streamingText,
  question,
  onSendTipQuestion,
  canSendTipQuestion,
  onIncludeContentChange,
  onIncludeProgressChange,
  includeContent,
  includeProgress,
}: AiChatTranscriptProps) {
  const { t } = useTranslation('assistant');

  const bubble =
    'max-w-[88%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm leading-relaxed';
  const assistantBubble = `${bubble} border border-border bg-background text-foreground`;
  const userBubble = `${bubble} bg-primary text-primary-foreground`;

  return (
    <div className="space-y-3">
      {hasOlderTurns && (
        <div className="text-center">
          <Button
            variant="ghost"
            disabled={isLoadingOlderTurns}
            onClick={onLoadOlderTurns}
            className="min-h-11 w-full text-xs"
            icon={History}
          >
            {isLoadingOlderTurns ? t('loadingOlder') : t('loadOlder')}
          </Button>
        </div>
      )}

      {!turns.length && !isSending && (
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-muted">{t('emptyDescription')}</p>
          <Button
            variant="secondary"
            disabled={!canSendTipQuestion}
            onClick={onSendTipQuestion}
            className="min-h-11 w-full whitespace-normal text-left text-xs"
            icon={Lightbulb}
          >
            {t('tipQuestion')}
          </Button>
        </div>
      )}

      <p id="lexi-description" className="text-xs leading-relaxed text-muted">
        {t('privacyNotice')}
      </p>

      <details className="text-xs">
        <summary className="flex min-h-11 cursor-pointer items-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          {t('privacyControls')}
        </summary>
        <label className="flex min-h-11 items-center gap-2">
          <input
            type="checkbox"
            checked={includeContent}
            onChange={(event) => onIncludeContentChange(event.target.checked)}
          />
          {t('includeContent')}
        </label>
        <label className="flex min-h-11 items-center gap-2">
          <input
            type="checkbox"
            checked={includeProgress}
            onChange={(event) => onIncludeProgressChange(event.target.checked)}
          />
          {t('includeProgress')}
        </label>
      </details>

      {turns.map((turn) => (
        <div key={turn.id} className="space-y-2">
          <div className="flex justify-end">
            <p className={userBubble}>{turn.userContent}</p>
          </div>
          {turn.assistantReply && (
            <div className="flex justify-start">
              <p className={assistantBubble}>{turn.assistantReply}</p>
            </div>
          )}
          {turn.status === 'FAILED' && (
            <p className="text-xs text-danger">
              {t('turnStatus.failed')}
              {turn.errorCode ? `: ${turn.errorCode}` : ''}
            </p>
          )}
          {turn.status === 'CANCELLED' && (
            <p className="text-xs text-muted">{t('turnStatus.cancelled')}</p>
          )}
        </div>
      ))}

      {isSending && question && (
        <div className="flex justify-end">
          <p className={userBubble}>{question}</p>
        </div>
      )}

      {isSending && (
        <div className="flex justify-start">
          <p className={assistantBubble} aria-busy="true">
            {streamingText || t('sending')}
          </p>
        </div>
      )}

      <p role="status" className="sr-only">
        {isSending ? t('sending') : turns.at(-1)?.assistantReply}
      </p>
    </div>
  );
}
