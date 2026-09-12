/**
 * @file dashboard.ts
 * @description English translations for dashboard overview, metrics, states, and loading messages.
 */
export default {
  title: 'Overview', subtitle: 'Learn in context. Remember for life.', learningPath: 'Learning path', learningPathDescription: 'A focused path from context to active vocabulary.',
  today: 'Today', todayDescription: 'Your current review activity from Lexora.', workspace: 'Workspace', workspaceDescription: '{{count}} word across your vocabulary states.', workspaceDescription_other: '{{count}} words across your vocabulary states.',
  noLearningData: 'No learning data yet', noLearningDataDescription: 'Start with one word and build your active vocabulary through context, recall, and output.', addFirstWord: 'Add your first word',
  reviewsToday: 'Reviews today', wordsPracticedToday: 'Words practiced today', overallAccuracy: 'Overall accuracy', accuracyUnavailable: 'Accuracy unavailable', currentStreak: 'Current streak',
  day: '{{count}} day', day_other: '{{count}} days', startReview: 'Start review · {{count}} due', learnNewWords: 'Learn new words',
  states: { NEW: 'New', LEARNING: 'Learning', FAMILIAR: 'Familiar', MASTERED: 'Mastered', MAINTENANCE: 'Maintenance' },
  loading: 'Loading dashboard', retry: 'Retry dashboard', couldNotLoad: 'Could not load dashboard.', ready: 'Ready to start a learning session.', activeLoaded: 'Active learning session loaded.',
  steps: { context: 'Context', understand: 'Understand', recall: 'Recall', output: 'Output', review: 'Review' },
} as const;
