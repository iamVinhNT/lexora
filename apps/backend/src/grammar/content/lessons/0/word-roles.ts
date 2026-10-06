/**
 * @file word-roles.ts
 * @description Lesson: Nhận diện vai trò từ trong câu (word-roles).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-word-roles-01',
  revisionId: 'grammar-v2-0-word-roles-01@1.0.0',
  revision: '1.0.0',
  title: 'Nhận diện vai trò từ trong câu',
  objective: 'Phân biệt vai trò của danh từ (người/vật), động từ (hành động/trạng thái), và tính từ (đặc điểm) trong câu ngắn.',
  prerequisiteIds: [],
  coverage: ['word-roles', 'parts-of-speech', 'nouns', 'verbs', 'adjectives'],
  context: {
    english: 'Tom has a small dog. The dog barks happily. Tom loves his pet.',
    vietnamese: 'Tom có một chú chó nhỏ. Chú chó sủa vui vẻ. Tom yêu thú cưng của mình.',
  },
  guide: {
    pattern: 'Subject (Chủ ngữ: Noun / Pronoun) + Verb (Động từ) [+ Object / Complement]; Cụm danh từ: Adjective (Tính từ) + Noun (Danh từ)',
    whenToUse: [
      'Xác định đúng từ loại (danh từ, động từ, tính từ) tương ứng với vai trò ngữ pháp trong câu.',
      'Đặt tính từ trước danh từ khi bổ nghĩa và dùng đúng động từ vị ngữ cho chủ ngữ.',
    ],
    signalWords: [
      'Noun (danh từ): chỉ người, vật, con vật, nơi chốn (Tom, dog, apple, school)',
      'Verb (động từ): chỉ hành động hoặc trạng thái (run, eat, sleep, is)',
      'Adjective (tính từ): chỉ đặc điểm, màu sắc, kích thước (small, happy, hot, blue)',
    ],
    check: [
      'Từ này đóng vai trò từ loại nào (danh từ chỉ đối tượng, động từ chỉ hành động/trạng thái, tính từ chỉ đặc điểm)?',
      'Tính từ bổ nghĩa đã đứng trước danh từ chưa, và câu đã có động từ vị ngữ chưa?',
    ],
  },
  explanation: 'Trong tiếng Anh, mỗi từ trong câu đều đảm nhận một nhiệm vụ cụ thể. Ba loại từ nền tảng nhất gồm:\n1. Danh từ (Noun): Chỉ người, con vật, đồ vật hoặc địa điểm (ví dụ: cat, teacher, book).\n2. Động từ (Verb): Diễn tả hành động hoặc trạng thái tồn tại (ví dụ: run, sleep, smile, is).\n3. Tính từ (Adjective): Miêu tả đặc điểm, màu sắc, kích thước của danh từ (ví dụ: small, happy, red).\nHiểu đúng vai trò của từ giúp người học sắp xếp câu mạch lạc, tránh nhầm tính từ thành hành động hoặc quên động từ nối.',
  examples: [
    { english: 'The cat sleeps.', vietnamese: 'Con mèo ngủ. ("cat" là danh từ chỉ con vật; "sleeps" là động từ chỉ hành động.)' },
    { english: 'Mina reads a book.', vietnamese: 'Mina đọc sách. ("Mina" và "book" là danh từ; "reads" là động từ.)' },
    { english: 'A small dog barks.', vietnamese: 'Chú chó nhỏ sủa. ("small" là tính từ mô tả "dog"; "barks" là động từ.)' },
    { english: 'The sun is hot.', vietnamese: 'Mặt trời nóng. ("sun" là danh từ; "is" là động từ trạng thái; "hot" là tính từ.)' },
    { english: 'They eat fresh apples.', vietnamese: 'Họ ăn táo tươi. ("apples" là danh từ; "eat" là động từ; "fresh" là tính từ.)' },
    { english: 'A happy child laughs.', vietnamese: 'Đứa trẻ vui vẻ cười. ("child" là danh từ; "happy" là tính từ; "laughs" là động từ.)' },
  ],
  contrasts: [
    {
      form: 'The green leaf falls.',
      whyFits: 'green là tính từ đứng trước danh từ leaf để bổ nghĩa; falls là động từ vị ngữ của câu.',
      whyNot: 'Viết "The leaf green falls" sai vị trí tính từ trong tiếng Anh chuẩn.',
    },
    {
      form: 'A dog runs.',
      whyFits: 'dog là danh từ làm chủ thể; runs là động từ thể hiện hành động của chú chó.',
      whyNot: 'Viết "A run dog" nhầm lẫn hành động thành tên gọi sự vật khiến câu vô nghĩa.',
    },
  ],
  commonMistakes: [
    'Nhầm tính từ thành động từ, ví dụ viết "The room quiet" thay vì cần động từ nối "The room is quiet".',
    'Đặt tính từ đứng sau danh từ theo thói quen tiếng Việt, ví dụ viết "cat black" thay vì "black cat".',
    'Bỏ sót động từ trong câu đơn, chỉ ghép danh từ và tính từ cạnh nhau.',
  ],
  summary: 'Danh từ chỉ người/vật; động từ chỉ hành động hoặc trạng thái; tính từ miêu tả đặc điểm của danh từ.',
  exercises: [
    {
      id: 'grammar-v2-0-word-roles-01-q1',
      kind: 'choice',
      prompt: 'Trong câu "The baby smiles.", từ nào là động từ chỉ hành động?',
      options: [
        { text: 'baby', correct: false, rationale: 'baby là danh từ chỉ người (em bé).' },
        { text: 'smiles', correct: true, rationale: 'smiles là động từ chỉ hành động cười mỉm.' },
        { text: 'The', correct: false, rationale: 'The là mạo từ xác định, không phải động từ.' },
      ],
      acceptedAnswers: [{ text: 'smiles', rationale: 'smiles là động từ chỉ hành động trong câu.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q2',
      kind: 'choice',
      prompt: 'Trong câu "A blue bird sings.", từ "bird" đóng vai trò từ loại nào?',
      options: [
        { text: 'Danh từ', correct: true, rationale: 'bird chỉ loài vật (con chim), đóng vai trò danh từ.' },
        { text: 'Động từ', correct: false, rationale: 'bird không phải hành động.' },
        { text: 'Tính từ', correct: false, rationale: 'bird không phải từ chỉ đặc điểm màu sắc hay tính chất.' },
      ],
      acceptedAnswers: [{ text: 'Danh từ', rationale: 'bird là danh từ chỉ con vật.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q3',
      kind: 'choice',
      prompt: 'Trong câu "The soup is hot.", từ nào là tính từ chỉ đặc điểm?',
      options: [
        { text: 'soup', correct: false, rationale: 'soup là danh từ chỉ món ăn.' },
        { text: 'is', correct: false, rationale: 'is là động từ to be (nối).' },
        { text: 'hot', correct: true, rationale: 'hot miêu tả nhiệt độ/đặc điểm của món súp.' },
      ],
      acceptedAnswers: [{ text: 'hot', rationale: 'hot là tính từ miêu tả món súp nóng.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q4',
      kind: 'choice',
      prompt: 'Trong câu "Cats drink milk.", cả hai từ "cats" và "milk" thuộc nhóm từ nào?',
      options: [
        { text: 'Động từ', correct: false, rationale: 'Chỉ có drink là động từ.' },
        { text: 'Danh từ', correct: true, rationale: 'cats (con mèo) và milk (sữa) đều là danh từ chỉ sự vật.' },
        { text: 'Tính từ', correct: false, rationale: 'Hai từ này không miêu tả tính chất.' },
      ],
      acceptedAnswers: [{ text: 'Danh từ', rationale: 'cats và milk là hai danh từ trong câu.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q5',
      kind: 'gap',
      prompt: 'Trong câu "Dogs bark loudly.", từ "bark" diễn tả hành động sủa nên thuộc từ loại ___ (điền tên từ loại tiếng Anh).',
      options: [],
      acceptedAnswers: [{ text: 'verb', rationale: 'bark là động từ diễn tả hành động sủa của loài chó.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q6',
      kind: 'gap',
      prompt: 'Trong cụm "a fast car", từ "fast" miêu tả đặc điểm tốc độ của chiếc xe nên thuộc từ loại ___ (điền tên từ loại tiếng Anh).',
      options: [],
      acceptedAnswers: [{ text: 'adjective', rationale: 'fast bổ nghĩa cho danh từ car nên là tính từ.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q7',
      kind: 'gap',
      prompt: 'Điền dạng hiện tại đơn của "read" vào chỗ trống; chỉ viết từ còn thiếu: "They ___ books."',
      options: [],
      acceptedAnswers: [{ text: 'read', rationale: 'read là động từ mang nghĩa đọc.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q8',
      kind: 'gap',
      prompt: 'Điền tính từ "big" vào chỗ trống; chỉ viết từ còn thiếu: "An elephant is a ___ animal."',
      options: [],
      acceptedAnswers: [{ text: 'big', rationale: 'big là tính từ miêu tả tầm vóc to lớn của con voi.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q9',
      kind: 'transform',
      prompt: 'Viết lại cả câu hoàn chỉnh khi chuyển tính từ lên trước danh từ: "The room is clean." -> viết cả câu bắt đầu bằng "It is a..."',
      options: [],
      acceptedAnswers: [
        { text: 'It is a clean room.', rationale: 'Đưa tính từ clean lên trước danh từ room để tạo câu hoàn chỉnh.' },
      ],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q10',
      kind: 'transform',
      prompt: 'Thêm tính từ "red" vào trước danh từ trong câu: "I eat an apple." (Chú ý đổi mạo từ)',
      options: [],
      acceptedAnswers: [
        { text: 'I eat a red apple.', rationale: 'Tính từ red đứng trước apple; mạo từ chuyển từ an thành a.' },
      ],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai vị trí của tính từ trong câu sau: "She has a dress red."',
      options: [],
      acceptedAnswers: [
        { text: 'She has a red dress.', rationale: 'Trong tiếng Anh, tính từ red phải đứng trước danh từ dress.' },
      ],
    },
    {
      id: 'grammar-v2-0-word-roles-01-q12',
      kind: 'correction',
      prompt: 'Sửa câu sau thành câu hoàn chỉnh bằng cách bổ sung động từ "is": "The boy happy."',
      options: [],
      acceptedAnswers: [
        { text: 'The boy is happy.', rationale: 'Cần động từ nối is giữa chủ ngữ The boy và tính từ happy.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-word-roles-01-r1',
      kind: 'choice',
      prompt: 'Trong câu "Kind teachers help students.", từ "Kind" thuộc từ loại nào?',
      options: [
        { text: 'Tính từ', correct: true, rationale: 'Kind là tính từ miêu tả phẩm chất tốt bụng của teachers.' },
        { text: 'Động từ', correct: false, rationale: 'Kind không phải hành động.' },
        { text: 'Danh từ', correct: false, rationale: 'Kind không phải tên người hay sự vật.' },
      ],
      acceptedAnswers: [{ text: 'Tính từ', rationale: 'Kind là tính từ bổ nghĩa cho danh từ teachers.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-r2',
      kind: 'gap',
      prompt: 'Trong câu "The sun shines brightly.", từ chỉ hành động/vị ngữ là ___.',
      options: [],
      acceptedAnswers: [{ text: 'shines', rationale: 'shines là động từ chỉ hành động tỏa sáng.' }],
    },
    {
      id: 'grammar-v2-0-word-roles-01-r3',
      kind: 'transform',
      prompt: 'Viết lại câu "He drinks tea." khi thêm tính từ "warm" vào trước danh từ:',
      options: [],
      acceptedAnswers: [
        { text: 'He drinks warm tea.', rationale: 'Đặt tính từ warm trước danh từ tea để tạo cụm danh từ hoàn chỉnh.' },
      ],
    },
    {
      id: 'grammar-v2-0-word-roles-01-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi trật tự từ trong câu sau: "They live in a house big."',
      options: [],
      acceptedAnswers: [
        { text: 'They live in a big house.', rationale: 'Tính từ big phải đứng trước danh từ house.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-word-roles-01-o1',
      prompt: 'Viết 1 câu đơn tiếng Anh gồm một danh từ chỉ con vật, một tính từ miêu tả nó đứng trước và một động từ hành động (ví dụ: chú mèo nhỏ ngủ).',
      modelAnswer: 'A small cat sleeps.',
      checks: [
        'Có danh từ chỉ con vật (ví dụ: cat, dog, bird)',
        'Có tính từ miêu tả đứng trước danh từ (ví dụ: small, black, big)',
        'Có động từ chỉ hành động phù hợp (ví dụ: sleeps, runs, sings)',
      ],
    },
    {
      id: 'grammar-v2-0-word-roles-01-o2',
      prompt: 'Viết 1 câu tiếng Anh giới thiệu một đồ vật trên bàn học theo mẫu "The + danh từ + is + tính từ" (ví dụ cái bút thì mới hoặc cuốn sách thì dày).',
      modelAnswer: 'The pen is new.',
      checks: [
        'Bắt đầu bằng danh từ có The (ví dụ: The pen, The book, The ruler)',
        'Dùng động từ nối is',
        'Kết thúc bằng một tính từ miêu tả (ví dụ: new, old, blue, small)',
      ],
    },
  ],
  sources: [
    {
      "id": "clause",
      "title": "British Council: Clause structure and verb patterns",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/clause-structure-verb-patterns",
      "claims": [
        "Ordinary clauses have a subject and verb phrase; verb patterns may add objects or complements, while imperatives can omit a subject."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    },
    {
      "id": "adjectives",
      "title": "British Council: Where adjectives go in a sentence",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/where-adjectives-go-sentence",
      "claims": [
        "Most adjectives can precede a noun or follow a linking verb."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    },
    {
      "id": "plural",
      "title": "British Council: Count nouns",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/count-nouns",
      "claims": [
        "Count nouns have singular and plural forms; regular plural spelling and common irregular forms are distinguished."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    }
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Lexora internal AI editorial reviewers; main assistant source verification',
    reviewedAt: "2026-10-06T15:30:39.729Z",
    summary: 'Independent internal-AI prose/exercise review completed; cited reference claims checked on publisher pages. No human-expert or CEFR certification.',
  },
};

export default lesson;
