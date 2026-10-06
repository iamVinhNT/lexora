/**
 * @file GrammarPage.tsx
 * @description Published grammar stages with resume links and a truthful unpublished state.
 */
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGrammarCourse } from '../hooks/useGrammar';
import { getLocalizedErrorMessage } from '../i18n/presentation';
import { GrammarCatalogFilters } from '../components/grammar/GrammarCatalogFilters';
import { GrammarDueQueue } from '../components/grammar/GrammarDueQueue';
import { GrammarPracticeHistory } from '../components/grammar/GrammarPracticeHistory';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
export function GrammarPage() {
  const { t } = useTranslation('grammar');
  const { t: tCommon } = useTranslation('common');
  const course = useGrammarCourse();
  const data = course.data;
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [topic, setTopic] = useState('all');

  const hasLessons = Boolean(data?.stages.some((stage) => stage.lessons.length > 0));
  const nextLesson = data?.stages.flatMap((stage) => stage.lessons).find(({ id }) => id === data.nextLessonId);
  const totals = data?.stages.reduce((sum, stage) => ({
    completed: sum.completed + stage.lessons.filter((lesson) => lesson.progress?.isComplete).length,
    total: sum.total + stage.lessons.length,
  }), { completed: 0, total: 0 });
  const accuracyTotals = data?.stages.flatMap((stage) => stage.lessons).reduce((sum, lesson) => ({
    correct: sum.correct + lesson.firstAttemptAccuracy.correct,
    total: sum.total + lesson.firstAttemptAccuracy.total,
  }), { correct: 0, total: 0 });
  const firstAttemptAccuracy = accuracyTotals && accuracyTotals.total > 0
    ? {
        ...accuracyTotals,
        percent: accuracyTotals.total >= 5
          ? Math.round(accuracyTotals.correct / accuracyTotals.total * 100)
          : null,
      }
    : null;

  const levels = Array.from(
    new Set(data?.stages.map((stage) => stage.level).filter(Boolean) ?? []),
  );
  const topics = Array.from(
    new Set(
      data?.stages
        .flatMap((stage) => stage.lessons.flatMap((lesson) => lesson.coverage))
        .filter(Boolean) ?? [],
    ),
  );

  const hasActiveFilters = Boolean(search.trim() || level !== 'all' || topic !== 'all');

  const filteredStages = (data?.stages ?? [])
    .map((stage) => {
      if (level !== 'all' && stage.level !== level) return null;
      const matchingLessons = stage.lessons.filter((lesson) => {
        if (topic !== 'all' && !lesson.coverage.includes(topic)) return false;
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          const matchTitle = lesson.title.toLowerCase().includes(q);
          const matchObj = lesson.objective.toLowerCase().includes(q);
          const matchCov = lesson.coverage.some((c) => c.toLowerCase().includes(q));
          if (!matchTitle && !matchObj && !matchCov) return false;
        }
        return true;
      });
      if (matchingLessons.length === 0) return null;
      return { ...stage, lessons: matchingLessons };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader title={t('title')} subtitle={t('subtitle')} action={
        nextLesson ? <Link to={`/grammar/${encodeURIComponent(nextLesson.id)}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto text-center">{t('continueCourse')}<ArrowRight aria-hidden="true" size={17} /></Link> : undefined
      } />

      {course.isLoading && <p role="status" aria-busy="true" className="rounded-xl border border-border bg-surface p-5 text-sm text-muted">{t('loading')}</p>}
      {course.isError && <div role="alert" className="space-y-4 rounded-xl border border-border bg-secondary p-5"><p className="text-sm text-foreground">{getLocalizedErrorMessage(course.error, tCommon)}</p><Button type="button" variant="secondary" onClick={() => void course.refetch()}>{t('retry')}</Button></div>}
      {data && !hasLessons && <Card><EmptyState title={t('unpublishedTitle')} description={t('unpublishedDescription')} /></Card>}
      {data && hasLessons && <>
        <GrammarDueQueue />

        {totals && <Card className="space-y-3.5 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-foreground">{t('courseProgress')}</h2>
            <p className="text-sm text-muted">{t('completedLessons', totals)}</p>
          </div>
          <progress aria-label={t('courseProgress')} value={totals.completed} max={totals.total} className="h-3 w-full overflow-hidden rounded-full bg-secondary [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary" />
          {firstAttemptAccuracy && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs sm:text-sm">
              <span className="font-semibold text-foreground">{t('firstAttemptAccuracy')}:</span>
              {firstAttemptAccuracy.percent !== null ? (
                <span className="font-medium text-primary">
                  {t('firstAttemptAccuracyValue', {
                    percent: firstAttemptAccuracy.percent,
                    correct: firstAttemptAccuracy.correct,
                    total: firstAttemptAccuracy.total,
                  })}
                </span>
              ) : (
                <span className="text-muted">{t('insufficientSamples')}</span>
              )}
              <span className="text-muted">· {t('practicedSeparateAccuracy')}</span>
            </div>
          )}
          {data.legacyProgress && (
            <p className="rounded-lg bg-secondary/50 p-2.5 text-xs text-muted">
              {t('legacyNotice', { completed: data.legacyProgress.completedLessons, total: data.legacyProgress.totalLessons })}
            </p>
          )}
          <p className="text-xs leading-6 text-muted">{t('levelNotice')}</p>
        </Card>}
        {data.isComplete && !data.nextLessonId && <p role="status" className="rounded-xl border border-primary/30 bg-primary-subtle px-4 py-3 text-sm text-foreground">{t('courseComplete')}</p>}

        <GrammarCatalogFilters
          search={search}
          onSearchChange={setSearch}
          level={level}
          onLevelChange={setLevel}
          levels={levels}
          topic={topic}
          onTopicChange={setTopic}
          topics={topics}
          onClear={() => {
            setSearch('');
            setLevel('all');
            setTopic('all');
          }}
          hasActiveFilters={hasActiveFilters}
        />

        {filteredStages.length === 0 && (
          <Card className="p-6 text-center space-y-3">
            <h3 className="text-base font-semibold text-foreground">{t('noMatchesTitle')}</h3>
            <p className="text-sm text-muted">{t('noMatchesDescription')}</p>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setSearch('');
                setLevel('all');
                setTopic('all');
              }}
            >
              {t('clearFilters')}
            </Button>
          </Card>
        )}
        <div className="space-y-6">
          {filteredStages.map((stage) => <section key={stage.id} aria-labelledby={`grammar-stage-${stage.id}`} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary"><GraduationCap aria-hidden="true" size={20} /></span>
              <div><h2 id={`grammar-stage-${stage.id}`} className="text-lg font-semibold text-foreground">{stage.title}</h2><p className="text-sm text-muted">{stage.level} · {t('completedLessons', { completed: stage.lessons.filter((lesson) => lesson.progress?.isComplete).length, total: stage.lessons.length })}</p></div>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {stage.lessons.map((lesson) => {
                const isComplete = Boolean(lesson.progress?.isComplete);
                const isInProgress = Boolean(lesson.progress && !isComplete);
                const status = isComplete ? t('completed') : isInProgress ? t('inProgress') : t('notStarted');
                return <li key={lesson.id}>
                  <Link to={`/grammar/${encodeURIComponent(lesson.id)}`} aria-label={`${lesson.title}. ${status}. ${isInProgress ? t('resumeLesson') : t('openLesson')}`} className="flex h-full min-h-32 sm:min-h-36 flex-col gap-2.5 sm:gap-3 rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">{isComplete ? <CheckCircle2 aria-hidden="true" size={16} className="text-primary" /> : <Circle aria-hidden="true" size={16} />}{status}</span>
                    <span className="font-semibold text-foreground">{lesson.title}</span>
                    <span className="text-sm leading-relaxed text-muted line-clamp-3">{lesson.objective}</span>
                  </Link>
                </li>;
              })}
            </ol>
          </section>)}

        <GrammarPracticeHistory />
        </div>
      </>}
    </div>
  );
}
