/**
 * @file GrammarLessonContent.tsx
 * @description Accessible lesson contents with authored formation, usage, context cues, and recap.
 */
import { useTranslation } from 'react-i18next';
import type { GrammarLessonDetail } from '../../api/grammar.api';
import { Card } from '../ui/Card';

export function GrammarLessonContent({ lesson }: { lesson: GrammarLessonDetail }) {
  const { t } = useTranslation('grammar');
  const sections = [
    ...(lesson.context ? [{ id: 'grammar-context', label: t('contextTitle') }] : []),
    { id: 'grammar-explanation', label: t('explanation') },
    { id: 'grammar-pattern', label: t('pattern') },
    { id: 'grammar-usage', label: t('whenToUse') },
    { id: 'grammar-signals', label: t('signalWords') },
    ...(lesson.examples.length ? [{ id: 'grammar-examples', label: t('examples') }] : []),
    ...(lesson.contrasts.length ? [{ id: 'grammar-contrasts', label: t('contrasts') }] : []),
    ...(lesson.commonMistakes.length ? [{ id: 'grammar-mistakes', label: t('commonMistakes') }] : []),
    { id: 'grammar-check', label: t('learnerCheck') },
    { id: 'grammar-summary', label: t('summary') },
    ...(lesson.exercises.length ? [{ id: 'grammar-practice-heading', label: t('exercises') }] : []),
    ...(lesson.outputPrompts?.length ? [{ id: 'grammar-output-heading', label: t('outputSectionTitle') }] : []),
  ];
  return <>
    <nav aria-label={t('contents')} className="rounded-2xl border border-border bg-surface p-3 sm:p-4">
      <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted">{t('contents')}</p>
      <ol className="flex flex-wrap gap-2">
        {sections.map(({ id, label }) => <li key={id}><a href={`#${id}`} className="inline-flex min-h-11 items-center rounded-lg border border-border/70 bg-background/60 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{label}</a></li>)}
      </ol>
    </nav>
    {lesson.coverage && lesson.coverage.length > 0 && (
      <div className="flex flex-wrap items-center gap-1.5" aria-label={t('filterTopic')}>
        {lesson.coverage.map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-md border border-border/80 bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted">
            {tag}
          </span>
        ))}
      </div>
    )}

    {lesson.context && (
      <section aria-labelledby="grammar-context">
        <Card className="space-y-2 p-3 sm:p-4">
          <h2 id="grammar-context" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">
            {t('contextTitle')}
          </h2>
          <div className="space-y-2 rounded-xl border border-primary/20 bg-primary-subtle p-2 sm:p-3">
            <p lang="en" className="font-medium leading-7 text-foreground">{lesson.context.english}</p>
            <p lang="vi" className="text-sm leading-6 text-foreground">{lesson.context.vietnamese}</p>
          </div>
        </Card>
      </section>
    )}

    <section aria-labelledby="grammar-explanation">
      <Card className="p-3 sm:p-4">
        <h2 id="grammar-explanation" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('explanation')}</h2>
        <p className="mt-2 whitespace-pre-line leading-7 text-foreground">{lesson.explanation}</p>
      </Card>
    </section>

    <section aria-labelledby="grammar-pattern">
      <Card className="space-y-2 p-3 sm:p-4">
        <h2 id="grammar-pattern" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('pattern')}</h2>
        <p className="whitespace-pre-line rounded-xl border border-primary/20 bg-primary-subtle p-2 sm:p-3 text-sm leading-7 text-foreground">{lesson.guide.pattern}</p>
        <details className="rounded-lg border border-border px-3 py-1">
          <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('notationTitle')}</summary>
          <p className="pt-2 text-sm leading-6 text-muted">{t('notationDescription')}</p>
        </details>
      </Card>
    </section>

    {([
      { id: 'grammar-usage', label: t('whenToUse'), items: lesson.guide.whenToUse },
      { id: 'grammar-signals', label: t('signalWords'), items: lesson.guide.signalWords },
    ]).map(({ id, label, items }) => <section key={id} aria-labelledby={id}>
      <Card className="p-3 sm:p-4">
        <h2 id={id} tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{label}</h2>
        {id === 'grammar-signals' && <p className="mt-2 text-sm leading-6 text-muted">{t('signalNotice')}</p>}
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground">{items.map((item) => <li key={item}>{item}</li>)}</ul>
      </Card>
    </section>)}

    {lesson.examples.length > 0 && <section aria-labelledby="grammar-examples"><Card className="p-3 sm:p-4">
      <h2 id="grammar-examples" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('examples')}</h2>
      <ul className="mt-2 space-y-2">{lesson.examples.map((example, index) => <li key={`${index}-${example.english}`} className="rounded-xl bg-secondary/60 p-2 sm:p-3"><p lang="en" className="font-medium leading-7 text-foreground">{example.english}</p><p lang="vi" className="mt-2 text-sm leading-6 text-muted">{example.vietnamese}</p></li>)}</ul>
    </Card></section>}

    {lesson.contrasts.length > 0 && <section aria-labelledby="grammar-contrasts"><Card className="p-3 sm:p-4">
      <h2 id="grammar-contrasts" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('contrasts')}</h2>
      <ul className="mt-2 space-y-2">{lesson.contrasts.map((contrast, index) => <li key={`${index}-${contrast.form}`} className="rounded-xl border border-border p-2 sm:p-3"><p className="font-semibold leading-7 text-foreground">{contrast.form}</p><p className="mt-2 text-sm leading-6 text-foreground"><strong>{t('whyFits')}: </strong>{contrast.whyFits}</p><p className="mt-2 text-sm leading-6 text-muted"><strong>{t('whyNot')}: </strong>{contrast.whyNot}</p></li>)}</ul>
    </Card></section>}

    {lesson.commonMistakes.length > 0 && <section aria-labelledby="grammar-mistakes"><Card className="p-3 sm:p-4">
      <h2 id="grammar-mistakes" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('commonMistakes')}</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground">{lesson.commonMistakes.map((mistake, index) => <li key={`${index}-${mistake}`}>{mistake}</li>)}</ul>
    </Card></section>}

    <section aria-labelledby="grammar-check"><Card className="p-3 sm:p-4">
      <h2 id="grammar-check" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('learnerCheck')}</h2>
      <p className="mt-2 text-sm text-muted">{t('checkDescription')}</p>
      <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-7 text-foreground">{lesson.guide.check.map((item) => <li key={item}>{item}</li>)}</ol>
    </Card></section>

    <section aria-labelledby="grammar-summary"><Card className="border-primary/30 bg-primary-subtle p-3 sm:p-4">
      <h2 id="grammar-summary" tabIndex={-1} className="scroll-mt-20 sm:scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground">{t('summary')}</h2>
      <p className="mt-2 text-sm leading-7 text-foreground">{lesson.summary}</p>
    </Card></section>

    {lesson.sources.length > 0 && <section aria-labelledby="grammar-sources"><Card className="p-3 sm:p-4">
      <h2 id="grammar-sources" className="text-lg font-semibold text-foreground">{t('sources')}</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">{lesson.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer" className="break-words text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{source.title}</a></li>)}</ul>
    </Card></section>}
  </>;
}
