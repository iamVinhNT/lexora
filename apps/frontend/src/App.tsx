/**
 * @file App.tsx
 * @description Route map for the foundational Lexora frontend shell.
 */
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { ContextPage } from './pages/ContextPage';
import { LearningSessionPage } from './pages/LearningSessionPage';
import { ReviewPage } from './pages/ReviewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return <Routes>
    <Route element={<AppShell />}>
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
  </Routes>;
}
