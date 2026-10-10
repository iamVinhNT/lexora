/**
 * @file Button.test.tsx
 * @description Verifies accessible icon buttons, tooltip precedence, and minimum touch target classes.
 */
import { render, screen } from '@testing-library/react';
import { Send, X } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { Button } from '../src/components/ui/Button';

describe('Button icons', () => {
  it('keeps a CTA label visible beside a decorative icon', () => {
    render(<Button icon={Send}>Submit answer</Button>);
    const button = screen.getByRole('button', { name: 'Submit answer' });
    expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    expect(button.querySelector('.sr-only')).toBeNull();
    expect(button.textContent).toBe('Submit answer');
  });

  it('keeps the icon-only name in sr-only text and uses it for the tooltip', () => {
    render(<Button icon={X} iconOnly>Cancel</Button>);
    const button = screen.getByRole('button', { name: 'Cancel' });
    expect(button.querySelector('.sr-only')?.textContent).toBe('Cancel');
    expect(button.title).toBe('Cancel');
    expect(button.classList.contains('min-h-11')).toBe(true);
    expect(button.classList.contains('min-w-11')).toBe(true);
    expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('uses aria-label for a tooltip when children are a React node', () => {
    render(<Button icon={X} iconOnly aria-label="Close dialog"><span>Close</span></Button>);
    expect(screen.getByRole('button', { name: 'Close dialog' }).title).toBe('Close dialog');
  });

  it('uses aria-label for an icon-only button without children', () => {
    render(<Button icon={X} iconOnly aria-label="Close dialog" />);
    expect(screen.getByRole('button', { name: 'Close dialog' }).title).toBe('Close dialog');
  });

  it('prefers explicit title over aria-label and string children', () => {
    render(<Button icon={X} iconOnly title="Dismiss this dialog" aria-label="Close dialog">Close</Button>);
    expect(screen.getByRole('button', { name: 'Close dialog' }).title).toBe('Dismiss this dialog');
  });
});
