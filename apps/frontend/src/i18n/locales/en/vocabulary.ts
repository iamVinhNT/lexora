/**
 * @file vocabulary.ts
 * @description English translations for vocabulary management, forms, details, and pagination.
 */
export default {
  title: 'Vocabulary', subtitle: 'Keep words, meanings, and examples in one focused workspace.', addWord: 'Add word', filters: 'Vocabulary filters', search: 'Search vocabulary', searchPlaceholder: 'Word, definition, example…',
  cefrDifficulty: 'CEFR difficulty', allLevels: 'All levels', status: 'Vocabulary status', allStatuses: 'All statuses', tagFilter: 'Tag filter', tagPlaceholder: 'e.g. work', pagination: 'Vocabulary pagination',
  noMatch: 'No words match', noMatchDescription: 'Try a different search or add a word to begin building your vocabulary.', loading: 'Loading vocabulary…', retry: 'Retry', viewDetails: 'View details', detailsFor: 'Details for {{word}}',
  addTitle: 'Add word', editTitle: 'Edit {{word}}', required: '{{field}} is required', chooseCefr: 'Choose CEFR level', save: 'Save word', saving: 'Saving…', cancel: 'Cancel',
  wordFamilies: 'Word families', noWordFamilies: 'No word families yet.', noCollocations: 'No collocations yet.', noExamples: 'No examples yet.', noContexts: 'No contexts linked yet.',
  progress3d: '3D progress', noProgress: 'No progress recorded yet.', reviewState: 'Review state', due: 'Due {{date}} · {{repetitions}} repetitions · {{lapses}} lapses', noReviewState: 'No review state recorded yet.',
  deleteTitle: 'Delete word', deleteDescription: 'This will remove {{word}} and its vocabulary details. This action cannot be undone.', deleting: 'Deleting…', confirmDelete: 'Confirm delete',
  fields: { word: 'Word', definition: 'Definition', translation: 'Translation', phonetic: 'Phonetic', partOfSpeech: 'Part of speech', difficulty: 'Difficulty', tags: 'Tags', collocations: 'Collocations', examples: 'Examples' },
  scoreSummary: 'Recognition {{recognition}} · Recall {{recall}} · Production {{production}}', scores: { recognition: 'Recognition', recall: 'Recall', production: 'Production' },
  states: { NEW: 'New', LEARNING: 'Learning', FAMILIAR: 'Familiar', MASTERED: 'Mastered', MAINTENANCE: 'Maintenance' },
} as const;
