/**
 * @file IconFirstUi.test.tsx
 * @description Guards difficulty badge styles and compact chat send/retry semantics against icon-first regressions.
 */
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { Word } from '../src/api/vocabulary.api';
import { AiChatInput } from '../src/components/ai/AiChatInput';
import { VocabularyList } from '../src/components/vocabulary/VocabularyList';

describe('icon-first regressions', () => {
  it('preserves the difficulty badge typography and color', () => {
    const word: Word = {
      id: 'word-1', word: 'walk', definition: 'Move on foot', difficulty: 'BEGINNER',
      tags: [], collocations: [], examples: [], wordFamilies: [], contexts: [],
    };
    render(<VocabularyList words={[word]} isLoading={false} error={null} onRetry={vi.fn()} onDetails={vi.fn()} />);
    const badge = screen.getByText('BEGINNER');
    for (const className of ['text-xs', 'font-semibold', 'text-primary']) {
      expect(badge.classList.contains(className)).toBe(true);
    }
  });

  it.each([
    { isError: false, name: 'Send', iconClass: 'lucide-send' },
    { isError: true, name: 'Retry', iconClass: 'lucide-rotate-cw' },
  ])('keeps $name compact, accessible, and paired with its correct icon', ({ isError, name, iconClass }) => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(<AiChatInput textareaRef={createRef<HTMLTextAreaElement>()} draft="Hello" onDraftChange={vi.fn()}
      onSubmit={onSubmit} disabled={false} canSend hasTurns={false} isError={isError} />);
    const button = screen.getByRole('button', { name });
    expect(button.title).toBe(name);
    expect(button.querySelector('.sr-only')?.textContent).toBe(name);
    expect(button.querySelector(`svg.${iconClass}`)?.getAttribute('aria-hidden')).toBe('true');
    expect(button.classList.contains('min-h-11')).toBe(true);
    expect(button.classList.contains('min-w-11')).toBe(true);
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
