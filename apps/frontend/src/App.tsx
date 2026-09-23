/**
 * @file App.tsx
 * @description Route map for the foundational Lexora frontend shell.
 */
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { AppShell } from './components/layout/AppShell';

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then(({ DashboardPage }) => ({ default: DashboardPage })),
);
const VocabularyPage = lazy(() =>
  import('./pages/VocabularyPage').then(({ VocabularyPage }) => ({ default: VocabularyPage })),
);
const ContextPage = lazy(() =>
  import('./pages/ContextPage').then(({ ContextPage }) => ({ default: ContextPage })),
);
const LearningSessionPage = lazy(() =>
  import('./pages/LearningSessionPage').then(({ LearningSessionPage }) => ({ default: LearningSessionPage })),
);
const ReviewPage = lazy(() =>
  import('./pages/ReviewPage').then(({ ReviewPage }) => ({ default: ReviewPage })),
);
const AnalyticsPage = lazy(() =>
  import('./pages/AnalyticsPage').then(({ AnalyticsPage }) => ({ default: AnalyticsPage })),
);
const SettingsPage = lazy(() =>
  import('./pages/SettingsPage').then(({ SettingsPage }) => ({ default: SettingsPage })),
);

export default function App() {
  return <Routes>
    <Route element={<AppShell />}>
      <Route
        element={
          <Suspense
            fallback={
              <div
                role="status"
                aria-busy="true"
                className="min-h-32 animate-pulse rounded-2xl bg-secondary"
              />
            }
          >
            <Outlet />
          </Suspense>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="learn" element={<LearningSessionPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route
          path="words"
          element={<VocabularyPage />}
        />
        <Route
          path="contexts"
          element={<ContextPage />}
        />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Route>
  </Routes>;
}
