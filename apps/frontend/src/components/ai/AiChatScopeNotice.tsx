/**
 * @file AiChatScopeNotice.tsx
 * @description In-chat warnings and guidance for scope mismatch, provider migration, and memory modes.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { AiChatLocale, AiChatScreen } from '../../api/ai.api';
import type { AiConversation } from '../../api/ai-history.api';
import { useAiAssistantStore } from '../../stores/ai-assistant.store';
import { Button } from '../ui/Button';
import { primaryNavigation } from '../layout/navigation';

interface AiChatScopeNoticeProps {
  activeConversation?: AiConversation;
  currentScreen: AiChatScreen;
  currentLocale: AiChatLocale;
  isScopeMatching: boolean;
  isProviderMismatch: boolean;
  currentProvider: string;
  onAllowProviderChange: () => void;
  onConsentMatch: () => void;
}

export function AiChatScopeNotice({
  activeConversation,
  currentScreen,
  currentLocale,
  isScopeMatching,
  isProviderMismatch,
  currentProvider,
  onAllowProviderChange,
  onConsentMatch,
}: AiChatScopeNoticeProps) {
  const { t, i18n } = useTranslation('assistant');
  const activeMemoryMode = useAiAssistantStore((s) => s.activeMemoryMode);
  const consentDiffers = useAiAssistantStore(state => Boolean(activeConversation && (
    state.includeContent !== activeConversation.includeContent || state.includeProgress !== activeConversation.includeProgress
  )));
  const scopeScreen = activeConversation?.context.kind === 'screen' ? activeConversation.context.screen : undefined;
  const scopePath = primaryNavigation.find(item => item.labelKey === scopeScreen)?.path;

  return (
    <div className="space-y-2">
      {activeConversation && !isScopeMatching && (
        <div className="space-y-2 rounded-xl border border-warning/40 bg-warning/5 p-2.5 text-xs">
          <p className="font-semibold text-warning-foreground">
            {t('scopeMismatchWarning')}
          </p>
          <div className="flex flex-wrap gap-2">
            {activeConversation.context.kind === 'screen' &&
              scopePath && activeConversation.context.screen !== currentScreen && (
                <Link
                  to={scopePath}
                  className="inline-flex min-h-11 items-center rounded-lg bg-surface px-2.5 py-1.5 font-semibold text-primary underline"
                >
                  {t('goToScopeScreen', {
                    screen: t(`screens.${activeConversation.context.screen}`),
                  })}
                </Link>
              )}
            {activeConversation.locale !== currentLocale && (
              <button
                type="button"
                onClick={() => void i18n.changeLanguage(activeConversation.locale)}
                className="inline-flex min-h-11 items-center rounded-lg bg-surface px-2.5 py-1.5 font-semibold text-primary underline"
              >
                {t('switchLanguage', {
                  locale: activeConversation.locale.toUpperCase(),
                })}
              </button>
            )}
            {consentDiffers && (
              <button
                type="button"
                onClick={onConsentMatch}
                className="inline-flex min-h-11 items-center rounded-lg bg-surface px-2.5 py-1.5 font-semibold text-primary underline"
              >
                {t('scopeMismatchConsent')}
              </button>
            )}
          </div>
        </div>
      )}

      {isProviderMismatch && (
        <div className="space-y-2 rounded-xl border border-border bg-muted/10 p-2.5 text-xs">
          <p className="text-muted">
            {t('providerChangedWarning', {
              provider: currentProvider,
            })}
          </p>
          <Button
            variant="secondary"
            onClick={onAllowProviderChange}
            className="min-h-11 w-full text-xs"
            disabled={!currentProvider}
          >
            {t('allowProviderChangeConfirm')}
          </Button>
        </div>
      )}

      {activeMemoryMode === 'compacted' && (
        <p className="text-xs text-muted">
          <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
            {t('memoryModes.compacted')}
          </span>{' '}
          {t('memoryCompactedNotice')}
        </p>
      )}

      {activeMemoryMode === 'limited' && (
        <p className="text-xs text-muted">
          <span className="rounded bg-warning/20 px-1.5 py-0.5 font-medium text-warning-foreground">
            {t('memoryModes.limited')}
          </span>{' '}
          {t('memoryLimitedNotice')}
        </p>
      )}
    </div>
  );
}
