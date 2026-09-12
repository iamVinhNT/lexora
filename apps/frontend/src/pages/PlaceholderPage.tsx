/**
 * @file PlaceholderPage.tsx
 * @description Accessible placeholder page for frontend routes awaiting feature work.
 */
import { PageHeader } from '../components/layout/PageHeader';

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} subtitle={description} />
      <div className="rounded-2xl border border-border bg-surface p-8 text-sm text-muted">
        This space is ready for your learning workflow.
      </div>
    </div>
  );
}
