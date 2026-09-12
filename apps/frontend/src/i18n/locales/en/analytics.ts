/**
 * @file analytics.ts
 * @description English translations for analytics metrics, charts, tables, and stable insights.
 */
export default {
  title: 'Statistics', subtitle: 'Understand what you remember, where you are improving, and what to practice next.', trendRange: 'Trend range', days: '{{count}} day', days_other: '{{count}} days', loading: 'Loading {{label}}', keyMeasures: 'Key measures', vocabulary: 'Vocabulary', reviewsToday: 'Reviews today', accuracy: 'Accuracy', currentStreak: 'Current streak', accuracyUnavailable: 'Accuracy unavailable', unavailable: 'Unavailable', milliseconds: 'ms',
  dimensions: 'Knowledge dimensions', dimensionsDescription: 'Average scores reflect known vocabulary assessments.', recognition: 'Recognition', recall: 'Recall', production: 'Production', noData: 'No data',
  states: 'Vocabulary states', statesDescription: 'Every state has a visible label, count, and percentage.', showStateTable: 'Show state data table', hideStateTable: 'Hide state data table', count: 'Count', new: 'New', learning: 'Learning', familiar: 'Familiar', mastered: 'Mastered', maintenance: 'Maintenance',
  retentionTrend: 'Retention trend', retentionDescription: 'Daily review volume and accuracy from server data.', showRetentionTable: 'Show retention data table', hideRetentionTable: 'Hide retention data table', retentionSummary: '{{count}} active review day. Latest accuracy {{accuracy}}. Latest reviews {{reviews}}. Review volume axis scales independently up to {{max}} reviews.', retentionSummary_other: '{{count}} active review days. Latest accuracy {{accuracy}}. Latest reviews {{reviews}}. Review volume axis scales independently up to {{max}} reviews.', retentionMinimum: 'Retention trend needs at least four active review days.', chartUnavailable: 'Chart preview unavailable in this environment. Use table for exact values.', retentionTable: 'Retention trend data', dailyRetention: 'Daily retention trend data', date: 'Date', reviews: 'Reviews', correct: 'Correct', averageResponse: 'Avg response', noReviews: 'No reviews', noTimingData: 'No timing data',
  stateTable: 'Vocabulary state data', stateDistribution: 'Vocabulary state distribution', stateLabels: 'Vocabulary state labels', percentage: 'Percentage', words: '{{count}} word', words_other: '{{count}} words', noStates: 'No vocabulary states to chart yet.',
  insights: 'Learning insights', insightsDescription: 'Recommendations are calculated from your review and progress data.', noInsight: 'No insight available yet. Keep practicing to create enough learning data.', retry: 'Retry {{query}}', failedToLoad: '{{query}} failed to load.',
  insightTypes: { RECOMMENDATION: 'Recommendation', WARNING: 'Warning', ACHIEVEMENT: 'Achievement', INFO: 'Information' },
  insightFallback: { title: 'Learning information', message: 'Keep practicing to build more learning data.', action: 'View details' },
  insight: {
    recommendOutputPractice: { title: 'Focus on sentence production', message: 'Your recognition is strong, but production is significantly lower. Focus on sentence production to convert passive vocabulary into active knowledge.', action: 'Practice output' },
    reinforceWeakWords: { title: 'Reinforce weak vocabulary', message: 'You have {{count}} word flagged with frequent lapses or low retention.', message_other: 'You have {{count}} words flagged with frequent lapses or low retention.', action: 'Review weak words' },
    pendingDueReviews: { title: 'Reviews waiting', message: 'You have {{count}} review ready today. Regular spaced repetition boosts memory retention.', message_other: 'You have {{count}} reviews ready today. Regular spaced repetition boosts memory retention.', action: 'Start review' },
    streakAchievement: { title: 'Keep up the momentum!', message: 'You are on a {{count}}-day learning streak! Consistent practice yields the fastest language acquisition.' },
    exploreNewWords: { title: 'Ready for new words', message: 'You have {{count}} new word in your library waiting to be learned.', message_other: 'You have {{count}} new words in your library waiting to be learned.', action: 'Learn new words' },
    welcomeStart: { title: 'Start your vocabulary journey', message: 'Add words or import contexts to begin your 5-step cognitive learning process.', action: 'Add words' },
  },
  query: { vocabularyStatistics: 'Vocabulary statistics', dashboardStatistics: 'Dashboard statistics', retentionTrend: 'Retention trend', learningInsights: 'Learning insights' },
} as const;
