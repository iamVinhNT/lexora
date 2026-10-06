/**
 * @file fixtures.ts
 * @description Contract test fixtures for grammar curriculum v2 core tests.
 */
import type {
  GrammarCurriculum,
  GrammarLesson,
  GrammarStage,
} from '../../src/grammar/content/types.js';

export function createTestLesson(overrides: Partial<GrammarLesson> = {}): GrammarLesson {
  const id = overrides.id ?? 'grammar-v2-0-word-roles-01';
  return {
    id,
    revisionId: overrides.revisionId ?? `${id}@1.0.0`,
    revision: '1.0.0',
    title: overrides.title ?? 'Nhận diện vai trò từ trong câu chuẩn',
    objective: overrides.objective ?? 'Phân biệt vai trò của danh từ, động từ và tính từ trong câu ngắn.',
    prerequisiteIds: overrides.prerequisiteIds ?? [],
    coverage: overrides.coverage ?? ['word-roles', 'parts-of-speech'],
    context: overrides.context ?? {
      english: 'Tom has a dog. The dog barks.',
      vietnamese: 'Tom có một con chó. Con chó sủa.',
    },
    guide: overrides.guide ?? {
      pattern: 'Noun + Verb + Adjective',
      whenToUse: ['Xác định vai trò của từ trong câu'],
      signalWords: ['dog', 'barks', 'small'],
      check: ['Kiểm tra chủ ngữ và động từ'],
    },
    explanation: overrides.explanation ?? 'Giải thích chi tiết về danh từ, động từ và tính từ trong tiếng Anh chuẩn.',
    examples: overrides.examples ?? [
      { english: 'The dog sleeps.', vietnamese: 'Con chó ngủ.' },
      { english: 'Mina reads a book.', vietnamese: 'Mina đọc sách.' },
      { english: 'A small dog barks.', vietnamese: 'Con chó nhỏ sủa.' },
      { english: 'The sun is hot.', vietnamese: 'Mặt trời nóng.' },
      { english: 'They eat apples.', vietnamese: 'Họ ăn táo.' },
      { english: 'A happy child laughs.', vietnamese: 'Đứa trẻ vui vẻ cười.' },
    ],
    contrasts: overrides.contrasts ?? [
      { form: 'The quiet room feels warm.', whyFits: 'quiet bổ nghĩa cho room.', whyNot: 'The room quiet thiếu động từ nối.' },
      { form: 'She runs fast.', whyFits: 'runs là động từ chỉ hành động.', whyNot: 'She fast thiếu động từ.' },
    ],
    commonMistakes: overrides.commonMistakes ?? [
      'Bỏ động từ nối trong câu miêu tả.',
      'Nhầm tính từ với động từ.',
      'Quên mạo từ trước danh từ đếm được số ít.',
    ],
    summary: overrides.summary ?? 'Danh từ chỉ người/vật, động từ chỉ hành động, tính từ chỉ đặc điểm.',
    exercises: overrides.exercises ?? [
      {
        id: `${id}-q1`,
        kind: 'choice',
        prompt: 'Từ nào là động từ?',
        options: [
          { text: 'runs', correct: true, rationale: 'runs là động từ chỉ hành động.' },
          { text: 'dog', correct: false, rationale: 'dog là danh từ.' },
          { text: 'big', correct: false, rationale: 'big là tính từ.' },
        ],
        acceptedAnswers: [{ text: 'runs', rationale: 'runs là động từ chỉ hành động.' }],
      },
      {
        id: `${id}-q2`,
        kind: 'choice',
        prompt: 'Từ nào là danh từ?',
        options: [
          { text: 'cat', correct: true, rationale: 'cat là danh từ.' },
          { text: 'sleeps', correct: false, rationale: 'sleeps là động từ.' },
          { text: 'warm', correct: false, rationale: 'warm là tính từ.' },
        ],
        acceptedAnswers: [{ text: 'cat', rationale: 'cat là danh từ.' }],
      },
      {
        id: `${id}-q3`,
        kind: 'choice',
        prompt: 'Từ nào là tính từ?',
        options: [
          { text: 'hot', correct: true, rationale: 'hot là tính từ.' },
          { text: 'sun', correct: false, rationale: 'sun là danh từ.' },
          { text: 'shines', correct: false, rationale: 'shines là động từ.' },
        ],
        acceptedAnswers: [{ text: 'hot', rationale: 'hot là tính từ.' }],
      },
      {
        id: `${id}-q4`,
        kind: 'choice',
        prompt: 'Chọn danh từ:',
        options: [
          { text: 'book', correct: true, rationale: 'book là danh từ.' },
          { text: 'read', correct: false, rationale: 'read là động từ.' },
          { text: 'new', correct: false, rationale: 'new là tính từ.' },
        ],
        acceptedAnswers: [{ text: 'book', rationale: 'book là danh từ.' }],
      },
      {
        id: `${id}-q5`,
        kind: 'gap',
        prompt: 'Điền từ loại: "bark" là một ___',
        options: [],
        acceptedAnswers: [{ text: 'verb', rationale: 'bark là động từ.' }],
      },
      {
        id: `${id}-q6`,
        kind: 'gap',
        prompt: 'Điền từ loại: "fast" là một ___',
        options: [],
        acceptedAnswers: [{ text: 'adjective', rationale: 'fast là tính từ.' }],
      },
      {
        id: `${id}-q7`,
        kind: 'gap',
        prompt: 'Điền động từ: They ___ books.',
        options: [],
        acceptedAnswers: [{ text: 'read', rationale: 'read là động từ.' }],
      },
      {
        id: `${id}-q8`,
        kind: 'gap',
        prompt: 'Điền tính từ: An elephant is a ___ animal.',
        options: [],
        acceptedAnswers: [{ text: 'big', rationale: 'big là tính từ.' }],
      },
      {
        id: `${id}-q9`,
        kind: 'transform',
        prompt: 'Viết lại câu có tính từ trước danh từ: "It is a ___."',
        options: [],
        acceptedAnswers: [{ text: 'It is a clean room.', rationale: 'Đúng cấu trúc.' }],
      },
      {
        id: `${id}-q10`,
        kind: 'transform',
        prompt: 'Thêm tính từ red: "I eat ___."',
        options: [],
        acceptedAnswers: [{ text: 'I eat a red apple.', rationale: 'Đúng cấu trúc.' }],
      },
      {
        id: `${id}-q11`,
        kind: 'correction',
        prompt: 'Sửa lỗi: She has a dress red.',
        options: [],
        acceptedAnswers: [{ text: 'She has a red dress.', rationale: 'Tính từ đứng trước danh từ.' }],
      },
      {
        id: `${id}-q12`,
        kind: 'correction',
        prompt: 'Sửa câu: The boy happy.',
        options: [],
        acceptedAnswers: [{ text: 'The boy is happy.', rationale: 'Cần động từ is.' }],
      },
    ],
    reviewExercises: overrides.reviewExercises ?? [
      {
        id: `${id}-r1`,
        kind: 'choice',
        prompt: 'Từ loại của kind:',
        options: [
          { text: 'Tính từ', correct: true, rationale: 'Kind là tính từ.' },
          { text: 'Động từ', correct: false, rationale: 'Sai.' },
          { text: 'Danh từ', correct: false, rationale: 'Sai.' },
        ],
        acceptedAnswers: [{ text: 'Tính từ', rationale: 'Kind là tính từ.' }],
      },
      {
        id: `${id}-r2`,
        kind: 'gap',
        prompt: 'Điền từ:',
        options: [],
        acceptedAnswers: [{ text: 'verb', rationale: 'Đúng.' }],
      },
      {
        id: `${id}-r3`,
        kind: 'transform',
        prompt: 'Viết lại:',
        options: [],
        acceptedAnswers: [{ text: 'It is good.', rationale: 'Đúng.' }],
      },
      {
        id: `${id}-r4`,
        kind: 'correction',
        prompt: 'Sửa câu:',
        options: [],
        acceptedAnswers: [{ text: 'He is happy.', rationale: 'Đúng.' }],
      },
    ],
    outputPrompts: overrides.outputPrompts ?? [
      {
        id: `${id}-o1`,
        prompt: 'Viết 2 câu ngắn mô tả con vật.',
        modelAnswer: 'The cat is small. The cat sleeps.',
        checks: ['Có danh từ và động từ', 'Đúng trật tự từ'],
      },
      {
        id: `${id}-o2`,
        prompt: 'Viết 1 câu có tính từ đứng trước danh từ.',
        modelAnswer: 'I see a black dog.',
        checks: ['Tính từ trước danh từ', 'Có mạo từ phù hợp'],
      },
    ],
    sources: overrides.sources ?? [
      {
        id: `${id}-source`,
        title: 'British Council LearnEnglish Grammar Reference',
        url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/nouns',
        claims: ['Nouns identify people, places, or things.'],
        checkedAt: '2026-10-05',
        provenance: 'reference-only',
      },
    ],
    review: overrides.review ?? {
      status: 'approved',
      mode: 'ai-internal',
      reviewer: 'Editorial Reviewer',
      reviewedAt: '2026-10-05T00:00:00.000Z',
    },
  };
}

export function createTestCurriculum(lessonOverrides: Partial<GrammarLesson> = {}): GrammarCurriculum {
  const lesson = createTestLesson(lessonOverrides);
  const stages: GrammarStage[] = [
    {
      id: 'grammar-stage-0',
      level: '0',
      title: 'Nền tảng từ số 0',
      publicationStatus: 'published',
      prerequisiteIds: [],
      plannedCoverage: [],
      lessons: [lesson],
    },
    {
      id: 'grammar-stage-a1',
      level: 'A1',
      title: 'Sơ cấp A1',
      publicationStatus: 'published',
      prerequisiteIds: ['grammar-stage-0'],
      plannedCoverage: [],
      lessons: [
        createTestLesson({
          id: 'grammar-v2-a1-be-forms-01',
          revisionId: 'grammar-v2-a1-be-forms-01@1.0.0',
          title: 'Động từ to be trong tiếng Anh',
          prerequisiteIds: ['grammar-v2-0-word-roles-01'],
          coverage: ['be-forms', 'verbs'],
        }),
      ],
    },
    {
      id: 'grammar-stage-a2',
      level: 'A2',
      title: 'Sơ cấp mở rộng A2',
      publicationStatus: 'published',
      prerequisiteIds: ['grammar-stage-a1'],
      plannedCoverage: [],
      lessons: [
        createTestLesson({
          id: 'grammar-v2-a2-past-continuous-01',
          revisionId: 'grammar-v2-a2-past-continuous-01@1.0.0',
          title: 'Quá khứ tiếp diễn và bối cảnh',
          prerequisiteIds: ['grammar-v2-a1-be-forms-01'],
          coverage: ['past-continuous'],
        }),
      ],
    },
    {
      id: 'grammar-stage-b1',
      level: 'B1',
      title: 'Trung cấp B1',
      publicationStatus: 'published',
      prerequisiteIds: ['grammar-stage-a2'],
      plannedCoverage: [],
      lessons: [
        createTestLesson({
          id: 'grammar-v2-b1-narrative-past-01',
          revisionId: 'grammar-v2-b1-narrative-past-01@1.0.0',
          title: 'Kể chuyện trong quá khứ chuỗi sự kiện',
          prerequisiteIds: ['grammar-v2-a2-past-continuous-01'],
          coverage: ['narrative-past'],
        }),
      ],
    },
    {
      id: 'grammar-stage-b2',
      level: 'B2',
      title: 'Trung cấp cao B2',
      publicationStatus: 'published',
      prerequisiteIds: ['grammar-stage-b1'],
      plannedCoverage: [],
      lessons: [
        createTestLesson({
          id: 'grammar-v2-b2-past-perfect-continuous-01',
          revisionId: 'grammar-v2-b2-past-perfect-continuous-01@1.0.0',
          title: 'Quá khứ hoàn thành tiếp diễn',
          prerequisiteIds: ['grammar-v2-b1-narrative-past-01'],
          coverage: ['past-perfect-continuous'],
        }),
      ],
    },
    {
      id: 'grammar-stage-c1',
      level: 'C1',
      title: 'Cao cấp C1',
      publicationStatus: 'published',
      prerequisiteIds: ['grammar-stage-b2'],
      plannedCoverage: [],
      lessons: [
        createTestLesson({
          id: 'grammar-v2-c1-inversion-01',
          revisionId: 'grammar-v2-c1-inversion-01@1.0.0',
          title: 'Đảo ngữ trong câu tiếng Anh nâng cao',
          prerequisiteIds: ['grammar-v2-b2-past-perfect-continuous-01'],
          coverage: ['inversion'],
        }),
      ],
    },
    {
      id: 'grammar-stage-c2',
      level: 'C2',
      title: 'Tinh tế nâng cao C2',
      publicationStatus: 'published',
      prerequisiteIds: ['grammar-stage-c1'],
      plannedCoverage: [],
      lessons: [
        createTestLesson({
          id: 'grammar-v2-c2-modality-01',
          revisionId: 'grammar-v2-c2-modality-01@1.0.0',
          title: 'Sắc thái modality trong diễn ngôn',
          prerequisiteIds: ['grammar-v2-c1-inversion-01'],
          coverage: ['modality'],
        }),
      ],
    },
  ];

  return {
    version: 'grammar-v2-2026-10-v1',
    stages,
  };
}
