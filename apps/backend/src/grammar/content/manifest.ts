/**
 * @file manifest.ts
 * @description Bundles the ordered, versioned 0–C2 curriculum and exposes a copy to callers.
 */
import { a2Lessons } from './a2.js';
import { b1Lessons } from './b1.js';
import { b2Lessons } from './b2.js';
import { c1Lessons } from './c1.js';
import { c2Lessons } from './c2.js';
import { a1Lessons } from './a1.js';
import { zeroLessons } from './zero.js';
import type { GrammarCurriculum } from './types.js';

const curriculum: GrammarCurriculum = {
  version: 'grammar-0-c2-2026-09-v1',
  stages: [
    { id: 'grammar-stage-0', level: '0', title: 'Nền tảng từ số 0', publicationStatus: 'published', prerequisiteIds: [], plannedCoverage: [], lessons: zeroLessons },
    { id: 'grammar-stage-a1', level: 'A1', title: 'Sơ cấp A1', publicationStatus: 'published', prerequisiteIds: ['grammar-stage-0'], plannedCoverage: [], lessons: a1Lessons },
    { id: 'grammar-stage-a2', level: 'A2', title: 'Sơ cấp mở rộng A2', publicationStatus: 'published', prerequisiteIds: ['grammar-stage-a1'], plannedCoverage: ['past-continuous', 'intro-present-perfect', 'future-forms', 'comparatives', 'quantifiers', 'basic-modals'], lessons: a2Lessons },
    { id: 'grammar-stage-b1', level: 'B1', title: 'Trung cấp B1', publicationStatus: 'published', prerequisiteIds: ['grammar-stage-a2'], plannedCoverage: ['tense-aspect-in-context', 'zero-first-second-conditionals', 'passive-voice', 'reported-speech', 'relative-clauses'], lessons: b1Lessons },
    { id: 'grammar-stage-b2', level: 'B2', title: 'Trung cấp cao B2', publicationStatus: 'published', prerequisiteIds: ['grammar-stage-b1'], plannedCoverage: ['third-mixed-conditionals', 'speculative-modals', 'perfect-aspect', 'advanced-clauses', 'cohesion'], lessons: b2Lessons },
    { id: 'grammar-stage-c1', level: 'C1', title: 'Cao cấp C1', publicationStatus: 'published', prerequisiteIds: ['grammar-stage-b2'], plannedCoverage: ['inversion', 'emphasis', 'cleft-sentences', 'ellipsis', 'hedging', 'register'], lessons: c1Lessons },
    { id: 'grammar-stage-c2', level: 'C2', title: 'Tinh tế nâng cao C2', publicationStatus: 'published', prerequisiteIds: ['grammar-stage-c1'], plannedCoverage: ['modality-nuance', 'tense-aspect-discourse', 'information-structure', 'ellipsis-substitution', 'register-variation'], lessons: c2Lessons },
  ],
};

export function getGrammarCurriculum(): GrammarCurriculum {
  return structuredClone(curriculum);
}
