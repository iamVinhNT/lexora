/**
 * @file AiSettingsCard.tsx
 * @description Local AI configuration form with ephemeral credentials and revision-safe save/delete.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import type { AiSettingsMetadata } from '../../api/ai-settings.api';
import { ApiError } from '../../api/client';
import { useAiSettings, useDeleteAiSettings, useSaveAiSettings } from '../../hooks/useAiSettings';
import { useAiAssistantStore } from '../../stores/ai-assistant.store';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Dialog } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

function canonicalEndpoint(value: string): string | null {
  try {
    const url = new URL(value.trim());
    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (url.username || url.password || url.search || url.hash || /^[a-z]+:\/\/[^/]*@/i.test(value.trim()) || (url.protocol !== 'https:' && !(url.protocol === 'http:' && loopback))) return null;
    return url.href.replace(/\/+$/, '');
  } catch {
    return null;
  }
}

type Draft = Pick<AiSettingsMetadata, 'baseURL' | 'models' | 'activeModel'>;
type ErrorKey = 'loadError' | 'saveError' | 'deleteError' | 'conflict' | 'keyRequired' | 'unavailable';

export function AiSettingsCard() {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  const settings = useAiSettings();
  const saveMutation = useSaveAiSettings();
  const deleteMutation = useDeleteAiSettings();
  const [baseline, setBaseline] = useState<AiSettingsMetadata | null>(null);
  const [draft, setDraft] = useState<Draft>({ baseURL: '', models: [], activeModel: '' });
  const [apiKey, setApiKey] = useState('');
  const [newModel, setNewModel] = useState('');
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [notice, setNotice] = useState<'saved' | 'deleted' | null>(null);
  const [confirmation, setConfirmation] = useState<'delete' | 'reload' | 'replace' | null>(null);
  const operation = useRef(false);
  const [working, setWorking] = useState(false);

  const adopt = (metadata: AiSettingsMetadata) => {
    setBaseline(metadata);
    setDraft({ baseURL: metadata.baseURL, models: [...metadata.models], activeModel: metadata.activeModel });
    setApiKey('');
    setNewModel('');
    setDirty(false);
  };
  useEffect(() => {
    if (!baseline && settings.data) adopt(settings.data);
  }, [baseline, settings.data]);

  const changedElsewhere = Boolean(baseline && settings.data && settings.data.revision !== baseline.revision);
  const endpoint = canonicalEndpoint(draft.baseURL);
  const keyRequired = !baseline || baseline.source !== 'saved' || !baseline.hasApiKey || !baseline.isConfigured || endpoint !== canonicalEndpoint(baseline.baseURL);
  const valid = Boolean(endpoint && draft.models.length >= 1 && draft.models.length <= 20 && draft.models.includes(draft.activeModel) && (!keyRequired || apiKey.trim()) && (apiKey === '' || apiKey.trim().length > 0) && apiKey.length <= 4096);
  const modelName = newModel.trim();
  const canAddModel = modelName.length > 0 && modelName.length <= 200 && !draft.models.includes(modelName) && draft.models.length < 20;
  const edit = () => { setDirty(true); setNotice(null); };
  const showFailure = (failure: unknown, fallback: ErrorKey) => {
    setError(failure instanceof ApiError && failure.code === 'CONFLICT' ? 'conflict'
      : failure instanceof ApiError && failure.code === 'AI_API_KEY_REQUIRED' ? 'keyRequired'
      : failure instanceof ApiError && failure.code === 'AI_SETTINGS_UNAVAILABLE' ? 'unavailable' : fallback);
  };
  const save = async () => {
    if (!baseline || !valid || operation.current || changedElsewhere || error === 'conflict') return;
    operation.current = true;
    setWorking(true);
    setError(null);
    setNotice(null);
    setConfirmation(null);
    try {
      const metadata = await saveMutation.mutateAsync({ ...draft, baseURL: draft.baseURL.trim(), expectedRevision: baseline.revision, ...(apiKey.trim() ? { apiKey: apiKey.trim() } : {}) });
      adopt(metadata);
      useAiAssistantStore.getState().syncConfiguration(metadata.revision);
      setNotice('saved');
    } catch (failure) {
      showFailure(failure, 'saveError');
    } finally {
      saveMutation.reset();
      operation.current = false;
      setWorking(false);
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (baseline?.source === 'saved' && !baseline.isConfigured && valid) setConfirmation('replace');
    else void save();
  };
  const remove = async () => {
    if (!baseline || operation.current || changedElsewhere || error === 'conflict') return;
    operation.current = true;
    setWorking(true);
    setError(null);
    setNotice(null);
    try {
      const metadata = await deleteMutation.mutateAsync({ expectedRevision: baseline.revision });
      adopt(metadata);
      useAiAssistantStore.getState().syncConfiguration(metadata.revision);
      setConfirmation(null);
      setNotice('deleted');
    } catch (failure) {
      setConfirmation(null);
      showFailure(failure, 'deleteError');
    } finally {
      deleteMutation.reset();
      operation.current = false;
      setWorking(false);
    }
  };
  const reload = async () => {
    if (operation.current) return;
    operation.current = true;
    setWorking(true);
    setConfirmation(null);
    setNotice(null);
    const result = await settings.refetch();
    if (result.data && !result.error) { adopt(result.data); setError(null); }
    else setError('loadError');
    operation.current = false;
    setWorking(false);
  };

  return <Card className="min-w-0 p-4 sm:p-6">
    <section aria-labelledby="ai-settings-title" className="space-y-4">
      <div>
        <h2 id="ai-settings-title" className="text-xl font-semibold text-foreground">{t('ai.title')}</h2>
        <p className="mt-1 text-sm text-muted">{t('ai.description')}</p>
      </div>
      {!baseline ? <div className="space-y-3">
        {settings.isError ? <p role="alert" className="text-sm text-danger">{t('ai.loadError')}</p> : <p role="status" aria-busy="true" className="text-sm text-muted">{t('ai.loading')}</p>}
        {settings.isError && <Button type="button" variant="secondary" disabled={working} onClick={() => void reload()}>{t('ai.reload')}</Button>}
      </div> : <form onSubmit={submit} noValidate className="space-y-4" aria-busy={working}>
        <p className="text-sm text-muted">{t(baseline.source === 'saved' ? 'ai.sourceSaved' : 'ai.sourceEnvironment')}</p>
        {(error || changedElsewhere) && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{changedElsewhere ? t('ai.conflict') : error && t(`ai.${error}`)}</p>}
        {notice && <p role="status" className="text-sm text-foreground">{t(`ai.${notice}`)}</p>}
        {baseline.source === 'saved' && !baseline.isConfigured && <p className="text-sm text-danger">{t('ai.unavailable')}</p>}
        <fieldset disabled={working} className="min-w-0 space-y-4">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="ai-base-url" className="block text-sm font-medium text-foreground">BASE_URL</label>
              <Input id="ai-base-url" type="url" value={draft.baseURL} onChange={event => { edit(); setDraft({ ...draft, baseURL: event.target.value }); }} aria-describedby="ai-url-help" autoComplete="off" spellCheck={false} />
              <p id="ai-url-help" className="text-sm text-muted">{t('ai.urlHelp')}</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="ai-api-key" className="block text-sm font-medium text-foreground">API_KEY</label>
              <Input id="ai-api-key" type="password" value={apiKey} onChange={event => { edit(); setApiKey(event.target.value); }} maxLength={4096} autoComplete="new-password" spellCheck={false} aria-describedby="ai-key-help" />
              <p id="ai-key-help" className="text-sm text-muted">{baseline.hasApiKey && <span aria-hidden="true">•••••••• · </span>}{t(keyRequired ? 'ai.keyRequiredHelp' : 'ai.keySavedHelp')}</p>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="ai-model-name" className="block text-sm font-medium text-foreground">AI_MODEL</label>
            <div className="flex min-w-0 flex-wrap gap-2">
              <Input id="ai-model-name" className="flex-1 basis-40" value={newModel} onChange={event => { edit(); setNewModel(event.target.value); }} maxLength={200} aria-describedby="ai-model-help" autoComplete="off" spellCheck={false} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); if (canAddModel) { setDraft({ ...draft, models: [...draft.models, modelName], activeModel: draft.activeModel || modelName }); setNewModel(''); } } }} />
              <Button type="button" variant="secondary" disabled={!canAddModel} onClick={() => { edit(); setDraft({ ...draft, models: [...draft.models, modelName], activeModel: draft.activeModel || modelName }); setNewModel(''); }}>{t('ai.addModel')}</Button>
            </div>
            <p id="ai-model-help" className="text-sm text-muted">{t('ai.modelsHelp')}</p>
            <ul className="space-y-2">
              {draft.models.map(model => <li key={model} className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-border px-3">
                <span className="min-w-0 break-all text-sm text-foreground">{model}</span>
                <Button type="button" variant="ghost" className="min-w-11 shrink-0 px-2" aria-label={t('ai.removeModel', { model })} onClick={() => { edit(); const models = draft.models.filter(item => item !== model); setDraft({ ...draft, models, activeModel: draft.activeModel === model ? models[0] ?? '' : draft.activeModel }); }}>{t('ai.remove')}</Button>
              </li>)}
            </ul>
          </div>
          <div className="space-y-2">
            <label id="ai-active-model-label" className="block text-sm font-medium text-foreground">{t('ai.activeModel')}</label>
            <Select value={draft.activeModel} onValueChange={activeModel => { edit(); setDraft({ ...draft, activeModel }); }} disabled={working || draft.models.length === 0}>
              <SelectTrigger aria-labelledby="ai-active-model-label" className="min-w-0 text-base sm:text-sm [&>span]:truncate"><SelectValue placeholder={t('ai.selectModel')} /></SelectTrigger>
              <SelectContent>{draft.models.map(model => <SelectItem key={model} value={model} className="min-h-11 text-base sm:text-sm">{model}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </fieldset>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={!valid || working || changedElsewhere || error === 'conflict'}>{t(working ? 'ai.working' : 'ai.save')}</Button>
          <Button type="button" variant="secondary" disabled={working} onClick={() => dirty ? setConfirmation('reload') : void reload()}>{t('ai.reload')}</Button>
          {baseline.source === 'saved' && <Button type="button" variant="ghost" disabled={working || changedElsewhere || error === 'conflict'} onClick={() => setConfirmation('delete')}>{t('ai.delete')}</Button>}
        </div>
      </form>}
      <details className="text-sm text-muted">
        <summary className="flex min-h-11 cursor-pointer items-center font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ai.securityTitle')}</summary>
        <p className="mt-2">{t('ai.security')}</p>
        <p className="mt-2">{t('ai.securityLimit')}</p>
        <p className="mt-2">{t('ai.backupBoundary')}</p>
      </details>
    </section>
    {confirmation && <Dialog title={t(`ai.${confirmation}Title`)} onClose={() => { if (!operation.current) setConfirmation(null); }}>
      <div className="space-y-4">
        <p className="text-sm text-foreground">{t(`ai.${confirmation}Description`)}</p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="secondary" disabled={working} onClick={() => setConfirmation(null)}>{tCommon('actions.cancel')}</Button>
          <Button type="button" variant={confirmation === 'delete' ? 'danger' : 'primary'} disabled={working} onClick={() => void (confirmation === 'delete' ? remove() : confirmation === 'replace' ? save() : reload())}>{t(working ? 'ai.working' : `ai.${confirmation}Confirm`)}</Button>
        </div>
      </div>
    </Dialog>}
  </Card>;
}
