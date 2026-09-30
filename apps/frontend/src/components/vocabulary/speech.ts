/**
 * @file speech.ts
 * @description Native Web Speech helper for English vocabulary pronunciation.
 */

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

export function speakEnglishWord(text: string): boolean {
  if (!isSpeechSupported()) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(trimmed);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}
