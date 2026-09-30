/**
 * @file settings.ts
 * @description English translations for preferences, data management, and destructive confirmations.
 */
export default {
  title: 'Settings', subtitle: 'Keep your appearance and learning data under your control.', appearance: 'Appearance', theme: 'Theme', currentTheme: 'Current theme: {{theme}}.', language: 'Language', languageDescription: 'Choose the language used by Lexora interface.', dataManagement: 'Data management', dataDescription: 'Preview imports and restores before any write. Destructive actions state exactly what they remove.',
  importVocabulary: 'Import vocabulary', importDescription: 'Supported formats: TXT, CSV, JSON. Preview is required before import.', importFormat: 'Import format', importFile: 'Import file', selected: 'Selected: {{name}}', importPreview: 'Import preview', valid: 'Valid', duplicate: 'Duplicate', invalid: 'Invalid', skipped: 'Skipped: not reported by API', confirmImport: 'Confirm import', reviewedValid: 'I reviewed valid items.', noValidItems: 'No valid items to import.', preparing: 'Preparing import preview…',
  exportBackup: 'Export and backup', exportDescription: 'Vocabulary export is separate from restorable backup.', exporting: 'Exporting…', preparingBackup: 'Preparing backup…',
  restore: 'Restore backup', restoreDescription: 'Preview validates the backup and reports overwrite information.', restoreFile: 'Restore backup file', restorePreview: 'Restore preview', records: '{{count}} record from {{application}} backup version {{version}}.', records_other: '{{count}} records from {{application}} backup version {{version}}.', overwrite: 'This restore will overwrite {{count}} existing record.', overwrite_other: 'This restore will overwrite {{count}} existing records.', noOverwrite: 'No existing records will be overwritten.', openRestore: 'Open restore confirmation', restoreTitle: 'Restore backup', restoreDescriptionDialog: 'This action overwrites existing data. Preview does not guarantee restore success.',
  grammarOverwrite: 'Grammar restore replaces {{count}} lesson progress records and {{attempts}} attempts.',
  grammarBackup: 'This backup includes {{count}} grammar progress records and {{attempts}} attempts.',
  grammarAbsent: 'This older backup has no grammar data; restoring it clears current grammar progress and attempts.',
  dangerZone: 'Danger zone', dangerDescription: 'These actions cannot be undone.', resetProgress: 'Reset learning progress', resetDescription: 'Keeps vocabulary and contexts, but resets progress, reviews, and sessions.', deleteAll: 'Delete all data', deleteAllDescription: 'Deletes vocabulary, contexts, and all learning data.', resetDialogTitle: 'Reset learning progress', resetDialogDescription: 'This keeps vocabulary and contexts, but removes review logs and sessions and resets learning progress.', deleteDialogTitle: 'Delete all data', deleteDialogDescription: 'This deletes vocabulary, contexts, and all learning data. Nothing is retained.',
  confirmation: {
    restore: 'Type {{phrase}} to confirm', restorePhrase: 'RESTORE',
    resetProgress: 'Type {{phrase}} to confirm', resetProgressPhrase: 'RESET PROGRESS',
    deleteAll: 'Type {{phrase}} to confirm', deleteAllPhrase: 'DELETE ALL DATA',
  },
  errors: { readFile: 'Could not read selected file.', previewImport: 'Could not preview import file.', import: 'Could not import vocabulary.', previewRestore: 'Could not preview restore file.', restore: 'Could not restore backup.', restoreResponse: 'Restore response did not confirm completion.', resetResponse: 'Reset response did not confirm {{scope}} reset.' },
} as const;
