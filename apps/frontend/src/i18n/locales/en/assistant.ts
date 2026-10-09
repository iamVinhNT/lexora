/**
 * @file assistant.ts
 * @description English translations for Lexi’s character guide.
 */
export default {
  title: 'Lexi · Study guide',
  description: 'Read-only English study guide',
  openAssistant: 'Ask Lexi',
  closeAssistant: 'Close Lexi',
  newConversation: 'New question / clear session',
  resizeHandle: 'Resize chat window: drag or use arrow keys',
  resizeToggle: 'Toggle chat size',
  loading3d: 'Loading 3D…',
  unavailable3d: '3D unavailable',
  includeContent: 'Include saved menu data',
  includeProgress: 'Include progress',
  privacyControls: 'Sharing and privacy',
  privacyNotice: 'Your question, recent conversation, and a bounded sample of saved data for this menu (if enabled) are sent to your configured AI provider. Progress is shared only if enabled. Lexi cannot change your learning data.',
  inputPlaceholder: 'Ask Lexi…',
  followUpPlaceholder: 'Ask a follow-up…',
  inputLabel: 'Your question',
  send: 'Send',
  sending: 'Thinking…',
  emptyDescription: 'Ask about this menu and your saved data. I can explain, give examples, or help you practise.',
  tipQuestion: 'How should I practise with the saved data in this menu?',
  askAssistant: 'Ask Lexi',
  retry: 'Retry',
  notConfigured: 'Set up your AI provider before asking Lexi. You can keep learning without AI.',
  openSettings: 'Open AI settings',
  screens: {
    overview: 'Overview',
    learn: 'Learn',
    review: 'Review',
    vocabulary: 'Vocabulary',
    calendar: 'Calendar',
    grammar: 'Grammar',
    contexts: 'Contexts',
    statistics: 'Statistics',
    settings: 'Settings'
  },
  contextBadges: {
    general: 'General',
    screen: 'Screen: {{screen}}',
  }
} as const;
