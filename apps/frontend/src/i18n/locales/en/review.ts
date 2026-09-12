/**
 * @file review.ts
 * @description English translations for spaced-repetition review and rating controls.
 */
export default {
  title: 'Review', subtitle: 'Recall due words, then rate how well you remembered them.', loading: 'Loading review queue…', loadingAnnouncement: 'Loading review queue.', completeAnnouncement: 'Review complete. No reviews are due right now.', dueToday: '{{count}} due today', recallMode: 'SM-2 recall', recallReview: 'Recall review', statusNew: 'NEW', recallTheWord: 'Recall the word', recallPrompt: 'Recall prompt', cloze: 'Cloze', completeSentence: 'Complete the sentence with the target word.', revealAnswer: 'Reveal answer', answer: 'Answer', rateRecall: 'Rate recall', chooseRating: 'Choose how well you recalled this word.', revealBeforeRating: 'Reveal answer before rating.', ratingButton: '{{label}}, next review {{interval}}', saved: '{{rating}} saved. Next review in {{count}} day.', saved_other: '{{rating}} saved. Next review in {{count}} days.',
  reviewComplete: 'Review complete', noDue: 'No reviews are due right now.', returnOverview: 'Return to overview', learnNewWords: 'Learn new words', retry: 'Retry', couldNotLoad: 'Could not load review queue.', couldNotSave: 'Could not save review.', saving: 'Saving review…',
  table: 'Review queue', intervalDay: '{{count}} day', intervalDay_other: '{{count}} days', intervalMonth: '{{count}} month', intervalMonth_other: '{{count}} months', intervalYear: '{{count}} year', intervalYear_other: '{{count}} years',
  rating: { AGAIN: 'Again', HARD: 'Hard', GOOD: 'Good', EASY: 'Easy' }, states: { NEW: 'New', LEARNING: 'Learning', FAMILIAR: 'Familiar', MASTERED: 'Mastered', MAINTENANCE: 'Maintenance' },
} as const;
