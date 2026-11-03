/**
 * @file updates.ts
 * @description English translations for the desktop update notification.
 */
export default {
  bellTitle: 'Version {{version}} available',
  bellLabel: 'New version {{version}} available. Show details',
  title: 'Lexora {{version}} is available',
  summary: 'You are on {{current}}. Released {{date}}.',
  download: 'Download {{file}} ({{size}})',
  savesTo: 'Saves to {{dir}}. Nothing is installed or run.',
  progressLabel: 'Downloading… {{received}} of {{total}}',
  cancel: 'Cancel download',
  done: 'Downloaded to {{path}}',
  nextAppImage: 'Close Lexora, then run the new file. It is already executable.',
  nextDeb: 'Close Lexora, then run this command:',
  nextUnknown: 'Close Lexora, then install the downloaded file.',
  dataSafe: 'Your study data in {{dataDir}} stays untouched.',
  reveal: 'Show in folder',
  retry: 'Retry download',
  errorNetwork: 'Download interrupted. Check your connection and retry.',
  errorVerify: 'The file did not match its checksum and was deleted. Retry.',
  errorDisk: 'Could not save to {{dir}}. Free some space or check permissions.',
  errorNoAsset: 'This release has no file for your install type.',
  skip: 'Skip version {{version}}',
  close: 'Close',
} as const;
