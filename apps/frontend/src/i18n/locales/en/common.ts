/**
 * @file common.ts
 * @description English translations shared across Lexora controls, statuses, errors, and accessibility labels.
 */
export default {
  appName: 'Lexora',
  actions: {
    addWord: 'Add word', addContext: 'Add context', save: 'Save', saveWord: 'Save word', saveContext: 'Save context',
    cancel: 'Cancel', retry: 'Retry', previous: 'Previous', next: 'Next', editWord: 'Edit word', editContext: 'Edit context',
    deleteWord: 'Delete word', deleteContext: 'Delete context', confirmDelete: 'Confirm delete', confirmDeletion: 'Confirm deletion',
    completeSession: 'Complete session', startSession: 'Start session', abandonSession: 'Abandon session', startNextSession: 'Start next session', returnOverview: 'Return to overview',
    learnNewWords: 'Learn new words', linkWords: 'Link words', saveLinks: 'Save links', unlink: 'Unlink', openSource: 'Open source',
    show: 'Show', hide: 'Hide', viewDetails: 'View details', exportVocabulary: 'Export vocabulary', downloadFullBackup: 'Download full backup',
    openRestoreConfirmation: 'Open restore confirmation', resetLearningProgress: 'Reset learning progress', deleteAllData: 'Delete all data',
    confirmReset: 'Confirm reset', importItems: 'Import {{count}} item', importItems_other: 'Import {{count}} items', restoreBackup: 'Restore backup',
    working: 'Working…', revealAnswer: 'Reveal answer', continue: 'Continue', continueTo: 'Continue to {{step}}', retryDashboard: 'Retry dashboard',
    retryQuery: 'Retry {{query}}',
  },
  status: {
    noData: 'No data yet', unavailable: 'Unavailable', noReviews: 'No reviews', noTimingData: 'No timing data', loading: 'Loading…',
    saving: 'Saving…', deleting: 'Deleting…', exporting: 'Exporting…', preparingBackup: 'Preparing backup…', preparingImport: 'Preparing import preview…',
    preparingRestore: 'Preparing restore preview…', imported: 'Imported {{count}} item.', imported_other: 'Imported {{count}} items.',
    exportDownloaded: 'Vocabulary export downloaded.', backupDownloaded: 'Full backup downloaded.', restoreCompleted: 'Restore completed.',
    progressReset: 'Learning progress reset.', allDataDeleted: 'All data deleted.',
  },
  labels: {
    word: 'Word', definition: 'Definition', translation: 'Translation', phonetic: 'Phonetic', partOfSpeech: 'Part of speech', difficulty: 'Difficulty',
    tags: 'Tags', collocations: 'Collocations', examples: 'Examples', contexts: 'Contexts', sourceType: 'Source type', sourceUrl: 'Source URL',
    date: 'Date', reviews: 'Reviews', correct: 'Correct', accuracy: 'Accuracy', averageResponse: 'Avg response', count: 'Count', state: 'State', percentage: 'Percentage',
    language: 'Language', theme: 'Theme', selected: 'Selected: {{name}}',
  },
  hints: {
    commaSeparated: 'Comma separated', onePhrasePerLine: 'One phrase per line', oneSentencePerLine: 'One sentence per line',
  },
  errors: {
    VALIDATION_ERROR: 'Please check the submitted information.', BAD_REQUEST: 'That request could not be completed.', NOT_FOUND: 'The requested item could not be found.',
    CONFLICT: 'This action conflicts with existing data.', INTERNAL_ERROR: 'Something went wrong on the server.', INVALID_RESPONSE: 'The server returned an invalid response.',
    HTTP_ERROR: 'The request could not be completed.', generic: 'Something went wrong. Please try again.',
  },
  language: { label: 'Language', vietnamese: 'Tiếng Việt', english: 'English' },
  theme: { light: 'light', dark: 'dark', switchToLight: 'Switch to light theme', switchToDark: 'Switch to dark theme' },
  dialog: { close: 'Close {{title}}' },
  confirmation: { restore: 'Type RESTORE to confirm', resetProgress: 'Type RESET PROGRESS to confirm', deleteAll: 'Type DELETE ALL DATA to confirm' },
  pagination: { pageOf: 'Page {{page}} of {{totalPages}}' },
} as const;
