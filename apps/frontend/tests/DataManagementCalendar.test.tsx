/**
 * @file DataManagementCalendar.test.tsx
 * @description Verifies calendar-aware restore preview warnings in active dialogs, destructive restore mutation guards, and reset scopes.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DataManagementPanel } from '../src/components/data-management/DataManagementPanel';
import i18n from '../src/i18n/config';

const now = '2026-10-03T00:00:00.000Z';

const legacyV3Backup = {
  version: 3,
  application: 'Lexora',
  exportedAt: now,
  data: {
    users: [],
    words: [{ id: 'w1', word: 'ephemeral' }],
    wordFamilies: [],
    collocations: [],
    examples: [],
    contexts: [],
    contextWords: [],
    learningProgress: [],
    reviewStates: [],
    reviewLogs: [],
    tags: [],
    wordTags: [],
    learningSessions: [],
    learningSessionItems: [],
    grammarLessonProgress: [],
    grammarExerciseAttempts: [],
  },
};

const v4Backup = {
  version: 4,
  application: 'Lexora',
  exportedAt: now,
  data: {
    ...legacyV3Backup.data,
    studyPreferences: [{ id: 'local', timeZone: 'Asia/Ho_Chi_Minh', studyDays: '[1,2,3,4,5]', learningTarget: 5, reviewTarget: 10, grammarTarget: 1 }],
    studyTasks: [
      { id: 't1', scheduledDate: '2026-10-03', taskKind: 'LEARN_WORDS', targetCount: 5, completedCount: 0, status: 'PLANNED' },
      { id: 't2', scheduledDate: '2026-10-03', taskKind: 'REVIEW_WORDS', targetCount: 10, completedCount: 0, status: 'PLANNED' },
    ],
  },
};

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify({ success: status < 400, data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function fileWithText(name: string, content: string) {
  const file = new File([content], name, { type: 'application/json' });
  Object.defineProperty(file, 'text', { value: () => Promise.resolve(content) });
  return file;
}

function renderPanel(queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/settings']}>
        <DataManagementPanel />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('DataManagementCalendar', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('warns of calendar overwrite in active dialog when previewing legacy v3 backup and prevents restore on invalid phrase', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method ?? 'GET';

      if (url.includes('/api/restore/preview') && method === 'POST') {
        return Promise.resolve(
          response({
            valid: true,
            version: 3,
            application: 'Lexora',
            exportedAt: now,
            tableCounts: { words: 1 },
            totalRecords: 1,
            previewToken: 'v3-restore-token',
            conflictSummary: {
              existingRecordsCount: 5,
              willOverwrite: true,
              existingTableCounts: { words: 5 },
            },
            calendarSummary: {
              includedInBackup: false,
              willOverwrite: true,
              backupTaskCount: 0,
              existingTaskCount: 4,
              willReplacePreferences: true,
            },
          }),
        );
      }

      if (url.includes('/api/restore') && method === 'POST') {
        return Promise.resolve(response({ restored: true }));
      }

      return Promise.resolve(response({}));
    });

    vi.stubGlobal('fetch', fetchMock);

    renderPanel();

    const fileInput = screen.getByLabelText('Restore backup file');
    fireEvent.change(fileInput, {
      target: { files: [fileWithText('lexora-backup-v3.json', JSON.stringify(legacyV3Backup))] },
    });

    // 1. Dialog opens automatically and is the active modal overlay
    const dialog = await screen.findByRole('dialog', { name: 'Restore backup' });
    expect(dialog).toBeTruthy();
    // 2. Active dialog description contains explicit calendar overwrite & absence warnings
    expect(within(dialog).getByText(/older backup has no calendar data/i)).toBeTruthy();
    expect(within(dialog).getByText(/replace 4 current calendar tasks/i)).toBeTruthy();
    expect(within(dialog).getByText(/Confirming restore replaces the current calendar tasks/i)).toBeTruthy();

    // Warning stays in active dialog; inert background is intentionally excluded.
    // 3. Warning lives inside active dialog; inert background is intentionally excluded.
    expect(within(dialog).getAllByRole('alert').length).toBeGreaterThan(0);

    // 4. Invalid confirmation phrase blocks destructive restore
    const phraseInput = within(dialog).getByLabelText('Type RESTORE to confirm');
    fireEvent.change(phraseInput, { target: { value: 'WRONG' } });

    const restoreButton = within(dialog).getByRole('button', { name: 'Restore backup' }) as HTMLButtonElement;
    expect(restoreButton.disabled).toBe(true);

    fireEvent.click(restoreButton);
    const restoreCallsBeforeValid = fetchMock.mock.calls.filter(([url]) => String(url).endsWith('/api/restore'));
    expect(restoreCallsBeforeValid).toHaveLength(0);

    // 5. Valid confirmation phrase allows restore execution with required payload
    fireEvent.change(phraseInput, { target: { value: 'RESTORE' } });
    expect(restoreButton.disabled).toBe(false);

    fireEvent.click(restoreButton);

    await waitFor(() => {
      const restoreCalls = fetchMock.mock.calls.filter(([url]) => String(url).endsWith('/api/restore'));
      expect(restoreCalls).toHaveLength(1);
      const payload = JSON.parse(String(restoreCalls[0][1]?.body));
      expect(payload.confirm).toBe(true);
      expect(payload.previewToken).toBe('v3-restore-token');
    });

    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toContain('Restore completed.');
    });
  });

  it('displays calendar task counts and overwrite warnings for v4 backup preview', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes('/api/restore/preview')) {
        return Promise.resolve(
          response({
            valid: true,
            version: 4,
            application: 'Lexora',
            exportedAt: now,
            tableCounts: { words: 1, studyTasks: 8 },
            totalRecords: 9,
            previewToken: 'v4-restore-token',
            conflictSummary: {
              existingRecordsCount: 2,
              willOverwrite: true,
              existingTableCounts: { studyTasks: 3 },
            },
            calendarSummary: {
              includedInBackup: true,
              willOverwrite: true,
              backupTaskCount: 8,
              existingTaskCount: 3,
              willReplacePreferences: true,
            },
          }),
        );
      }
      return Promise.resolve(response({}));
    });

    vi.stubGlobal('fetch', fetchMock);

    renderPanel();

    fireEvent.change(screen.getByLabelText('Restore backup file'), {
      target: { files: [fileWithText('lexora-backup-v4.json', JSON.stringify(v4Backup))] },
    });

    const dialog = await screen.findByRole('dialog', { name: 'Restore backup' });
    expect(dialog).toBeTruthy();
    expect(within(dialog).getByText(/includes 8 calendar tasks/i)).toBeTruthy();
    expect(within(dialog).getByText(/replace 3 current calendar tasks/i)).toBeTruthy();
  });

  it('describes calendar preservation and removal boundaries in reset progress and delete all dialogs', async () => {
    renderPanel();

    // 1. Reset progress explicitly states calendar tasks and evidence are removed, while templates and time zone are retained
    fireEvent.click(screen.getByRole('button', { name: 'Reset learning progress' }));
    const progressDialog = await screen.findByRole('dialog', { name: 'Reset learning progress' });
    expect(within(progressDialog).getByText(/removes calendar tasks and their learning evidence, while keeping study templates and time zone/i)).toBeTruthy();

    fireEvent.click(within(progressDialog).getByRole('button', { name: 'Cancel' }));

    // 2. Delete all states all data including calendar tasks, evidence, templates, and time zone are removed
    fireEvent.click(screen.getByRole('button', { name: 'Delete all data' }));
    const allDialog = await screen.findByRole('dialog', { name: 'Delete all data' });
    expect(within(allDialog).getByText(/removes all data, including calendar tasks, evidence, study templates, and time zone/i)).toBeTruthy();
  });

  it('renders localized calendar warnings and checks Vietnamese confirmation phrase', async () => {
    await i18n.changeLanguage('vi');

    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/api/restore/preview')) {
        return Promise.resolve(
          response({
            valid: true,
            version: 3,
            application: 'Lexora',
            exportedAt: now,
            tableCounts: { words: 1 },
            totalRecords: 1,
            previewToken: 'v3-vi-token',
            conflictSummary: {
              existingRecordsCount: 2,
              willOverwrite: true,
              existingTableCounts: {},
            },
            calendarSummary: {
              includedInBackup: false,
              willOverwrite: true,
              backupTaskCount: 0,
              existingTaskCount: 2,
              willReplacePreferences: true,
            },
          }),
        );
      }
      return Promise.resolve(response({}));
    });

    vi.stubGlobal('fetch', fetchMock);

    renderPanel();

    fireEvent.change(screen.getByLabelText('Tệp sao lưu'), {
      target: { files: [fileWithText('backup.json', JSON.stringify(legacyV3Backup))] },
    });

    const dialog = await screen.findByRole('dialog', { name: 'Khôi phục bản sao lưu' });
    expect(dialog).toBeTruthy();
    expect(within(dialog).getByText(/Bản sao lưu cũ này không có dữ liệu lịch/i)).toBeTruthy();
    expect(within(dialog).getByText(/Khôi phục sẽ thay thế 2 nhiệm vụ lịch hiện tại/i)).toBeTruthy();

    const input = within(dialog).getByLabelText('Nhập KHÔI PHỤC để xác nhận');
    const confirmButton = within(dialog).getByRole('button', { name: 'Khôi phục bản sao lưu' }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'SAI' } });
    expect(confirmButton.disabled).toBe(true);

    fireEvent.change(input, { target: { value: 'KHÔI PHỤC' } });
    expect(confirmButton.disabled).toBe(false);
  });
});
