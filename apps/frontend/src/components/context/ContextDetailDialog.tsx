/**
 * @file ContextDetailDialog.tsx
 * @description Context detail, word linking, unlinking, and delete confirmation.
 */
import { useState } from 'react';

import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { useContext, useDeleteContext, useLinkWords, useUnlinkWord } from '../../hooks/useContexts';
import type { Context } from '../../api/context.api';
import type { Word } from '../../api/vocabulary.api';

type Props = { context: Context; words: Word[]; onClose: () => void; onEdit: () => void; onDeleted: () => void };

export function ContextDetailDialog({ context, words, onClose, onEdit, onDeleted }: Props) {
  const [linking, setLinking] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const detailQuery = useContext(context.id);
  const activeContext = detailQuery.data ?? context;
  const deleteMutation = useDeleteContext();
  const unlinkMutation = useUnlinkWord();
  if (confirming) return <DeleteContextDialog context={activeContext} onClose={() => setConfirming(false)} onDeleted={onDeleted} mutation={deleteMutation} />;
  if (linking) return <LinkWordsDialog context={activeContext} words={words} onClose={() => setLinking(false)} />;
  return <Dialog title={activeContext.title} onClose={onClose} wide><div className="space-y-6"><div><div className="flex flex-wrap gap-2 text-xs font-semibold text-primary"><span>{activeContext.sourceType ?? 'Uncategorized'}</span>{activeContext.sourceUrl && <a href={activeContext.sourceUrl} target="_blank" rel="noreferrer" className="underline">Open source</a>}</div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground">{activeContext.content}</p></div><section><div className="flex items-center justify-between gap-3"><h3 className="font-semibold text-foreground">Linked words</h3><Button type="button" variant="secondary" onClick={() => setLinking(true)}>Link words</Button></div>{activeContext.words?.length ? <ul className="mt-3 space-y-3">{activeContext.words.map((item) => <li key={item.wordId} className="flex flex-col gap-2 rounded-lg bg-secondary p-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-foreground">{item.word.word}</p><p className="text-xs text-muted">Exposure count: {item.exposureCount} · First seen {formatDate(item.firstSeenAt)} · Last seen {formatDate(item.lastSeenAt)}</p></div><Button type="button" variant="ghost" aria-label={`Unlink ${item.word.word}`} onClick={() => unlinkMutation.mutate({ contextId: activeContext.id, wordId: item.wordId })} disabled={unlinkMutation.isPending}>Unlink</Button></li>)}</ul> : <p className="mt-3 text-sm text-muted">No words linked yet.</p>}</section><div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onEdit}>Edit context</Button><Button type="button" variant="ghost" aria-label={`Delete ${activeContext.title}`} onClick={() => setConfirming(true)}>Delete context</Button></div></div></Dialog>;
  function formatDate(value?: string | null) { return value ? new Date(value).toLocaleDateString() : '—'; }
}

function LinkWordsDialog({ context, words, onClose }: { context: Context; words: Word[]; onClose: () => void }) {
  const [selected, setSelected] = useState(() => new Set(context.words?.map((item) => item.wordId) ?? []));
  const mutation = useLinkWords();
  const save = () => mutation.mutateAsync({ contextId: context.id, wordIds: [...selected] }).then(onClose).catch(() => undefined);
  return <Dialog title="Link words" onClose={onClose}><div className="space-y-4"><div className="grid gap-2">{words.map((word) => <label key={word.id} className="flex min-h-11 items-center gap-3 rounded-lg border border-border px-3 text-sm text-foreground"><input type="checkbox" aria-label={word.word} checked={selected.has(word.id)} onChange={(event) => setSelected((current) => { const next = new Set(current); if (event.target.checked) next.add(word.id); else next.delete(word.id); return next; })} />{word.word}</label>)}</div>{mutation.error && <p role="alert" className="text-sm text-red-600">{mutation.error.message}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="button" onClick={save} disabled={mutation.isPending}>{mutation.isPending ? 'Saving…' : 'Save links'}</Button></div></div></Dialog>;
}

function DeleteContextDialog({ context, onClose, onDeleted, mutation }: { context: Context; onClose: () => void; onDeleted: () => void; mutation: ReturnType<typeof useDeleteContext> }) { const confirm = () => mutation.mutateAsync(context.id).then(onDeleted).catch(() => undefined); return <Dialog title="Delete context" onClose={onClose}><div className="space-y-5"><p className="text-sm leading-6 text-muted">Delete <strong className="text-foreground">{context.title}</strong>? Linked vocabulary words will be kept.</p>{mutation.error && <p role="alert" className="text-sm text-red-600">{mutation.error.message}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="button" onClick={confirm} disabled={mutation.isPending}>{mutation.isPending ? 'Deleting…' : 'Confirm delete'}</Button></div></div></Dialog>; }
