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
  hideGuide: 'Hide Lexi',
  showGuide: 'Show Lexi',
  loading3d: 'Loading 3D…',
  unavailable3d: '3D unavailable',
  includeContent: 'Include content',
  includeProgress: 'Include progress',
  privacyControls: 'Sharing and privacy',
  privacyNotice: 'Your question, recent conversation, selected content, and progress (only if enabled) are sent to your configured AI provider. Lexi cannot change your learning data.',
  inputPlaceholder: 'Ask Lexi…',
  followUpPlaceholder: 'Ask a follow-up…',
  inputLabel: 'Your question',
  send: 'Send',
  sending: 'Thinking…',
  emptyDescription: 'Ask about this page or selected content. I can explain, give examples, or help you practise.',
  tipQuestion: 'How can I practise what I am viewing without revealing the answers?',
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
    grammar: 'Grammar: {{id}}',
    learning: 'Learning: {{step}}'
  }
} as const;
