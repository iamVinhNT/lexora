/**
 * @file WordDetailDialog.tsx
 * @description Localized vocabulary detail, progress, review, and delete dialogs.
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import type { Word } from '../../api/vocabulary.api';
import { getLocalizedErrorMessage } from '../../i18n/presentation';
import { useDeleteWord, useWord } from '../../hooks/useVocabulary';
import { useAiAssistantStore } from '../../stores/ai-assistant.store';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';
import { WordDetailContent } from './WordDetailContent';
import { Trash2, X } from 'lucide-react';

type DetailProps = { word: Word; onClose: () => void; onEdit: () => void; onDeleted: () => void; confirmOnOpen?: boolean };

export function WordDetailDialog({ word, onClose, onEdit, onDeleted, confirmOnOpen = false }: DetailProps) {
  const { t } = useTranslation('vocabulary');
  const detailQuery = useWord(confirmOnOpen ? null : word.id);
  const activeWord = detailQuery.data ?? word;
  const deleteMutation = useDeleteWord();
  const [confirming, setConfirming] = React.useState(confirmOnOpen);
  if (confirming) return <DeleteWordDialog word={activeWord} onClose={confirmOnOpen ? onClose : () => setConfirming(false)} onDeleted={onDeleted} mutation={deleteMutation} />;
  const handleAskAssistant = () => {
    onClose();
    useAiAssistantStore.getState().openGuide();
  };
  return <Dialog title={activeWord.word} onClose={onClose} wide fixedContent><WordDetailContent word={activeWord} onEdit={onEdit} onDelete={() => setConfirming(true)} onAskAssistant={handleAskAssistant} fixedActions hideHeading /></Dialog>;
}

function DeleteWordDialog({ word, onClose, onDeleted, mutation }: { word: Word; onClose: () => void; onDeleted: () => void; mutation: ReturnType<typeof useDeleteWord> }) {
  const { t } = useTranslation('vocabulary');
  const { t: tCommon } = useTranslation('common');
  const confirm = () => mutation.mutateAsync(word.id).then(onDeleted).catch(() => undefined);
  const error = mutation.error;
  return <Dialog title={t('deleteTitle')} onClose={onClose}><div className="space-y-5"><p className="text-sm leading-6 text-muted">{t('deleteDescription', { word: word.word })}</p>{error && <p role="alert" className="text-sm text-foreground">{getLocalizedErrorMessage(error, tCommon)}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose} icon={X} iconOnly>{t('cancel')}</Button><Button type="button" onClick={confirm} disabled={mutation.isPending} icon={Trash2}>{mutation.isPending ? t('deleting') : t('confirmDelete')}</Button></div></div></Dialog>;
}
