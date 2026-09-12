/**
 * @file resource-parity.test.ts
 * @description Ensures bundled English and Vietnamese translation namespaces share identical key structures.
 */
import { describe, expect, it } from 'vitest';

import { resources } from '../../src/i18n/resources';

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return prefix ? [prefix] : [];
  return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
}

describe('translation resource parity', () => {
  it('contains matching namespace and key structures', () => {
    expect(Object.keys(resources.en)).toEqual(Object.keys(resources.vi));
    expect(flattenKeys(resources.en)).toEqual(flattenKeys(resources.vi));
  });
});
