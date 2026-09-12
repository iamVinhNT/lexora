/**
 * @file contexts.ts
 * @description English translations for context management, source labels, forms, and details.
 */
export default {
  title: 'Contexts', subtitle: 'Learn words through sentences and situations that give them meaning.', addContext: 'Add context', filters: 'Context filters', search: 'Search contexts', searchPlaceholder: 'Title or content…', sourceType: 'Source type', allSourceTypes: 'All source types', pagination: 'Context pagination',
  count_one: '{{formattedCount}} context', count_other: '{{formattedCount}} contexts', wordsOnPage_one: '{{formattedCount}} word on page', wordsOnPage_other: '{{formattedCount}} words on page', wordCount_one: '{{formattedCount}} word', wordCount_other: '{{formattedCount}} words', noMatch: 'No contexts match', noMatchDescription: 'Paste a sentence, article, or conversation to learn vocabulary in context.', loading: 'Loading contexts…', retry: 'Retry', viewDetails: 'View details', detailsFor: 'Details for {{title}}',
  addTitle: 'Add context', editTitle: 'Edit {{title}}', fields: { title: 'Title', content: 'Content', sourceUrl: 'Source URL' }, linkExistingWords: 'Link existing words', addVocabularyFirst: 'Add vocabulary before linking words.', titleRequired: 'Title is required', contentRequired: 'Content is required', sourceTypeRequired: 'Source type is required', save: 'Save context', saving: 'Saving…', cancel: 'Cancel',
  uncategorized: 'Uncategorized', openSource: 'Open source', linkedWords: 'Linked words', linkWords: 'Link words', noWordsLinked: 'No words linked yet.', exposure: 'Exposure count: {{formattedCount}} · First seen {{firstSeen}} · Last seen {{lastSeen}}', unlink: 'Unlink', saveLinks: 'Save links', deleting: 'Deleting…', confirmDelete: 'Confirm delete', deleteTitle: 'Delete context', deleteDescription: 'Delete {{title}}? Linked vocabulary words will be kept.',
  sourceTypes: { READING: 'Reading', LISTENING: 'Listening', CONVERSATION: 'Conversation', BOOK: 'Book', ARTICLE: 'Article', YOUTUBE: 'YouTube', WORK: 'Work', PERSONAL: 'Personal', MANUAL: 'Manual' },
} as const;
