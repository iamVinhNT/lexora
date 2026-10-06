/**
 * @file subject-verb-order.ts
 * @description Lesson: Trật tự chủ ngữ và động từ (subject-verb-order).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-subject-verb-order-04',
  revisionId: 'grammar-v2-0-subject-verb-order-04@1.0.0',
  revision: '1.0.0',
  title: 'Trật tự chủ ngữ và động từ',
  objective: 'Nắm vững cấu trúc câu chuẩn Chủ ngữ (S) + Động từ (V) + Tân ngữ (O) và sắp xếp câu tiếng Anh đúng trật tự.',
  prerequisiteIds: ['grammar-v2-0-subjects-and-actions-03'],
  coverage: ['subject-verb-order', 'svo-pattern', 'word-order', 'sentence-structure'],
  context: {
    english: 'Mark loves music. He listens to songs after school. His sister plays the guitar.',
    vietnamese: 'Mark yêu âm nhạc. Cậu ấy nghe các bài hát sau giờ học. Chị gái cậu ấy chơi đàn ghi-ta.',
  },
  guide: {
    pattern: 'Subject (Chủ ngữ) + Verb (Động từ) + [Object (Tân ngữ)] (Quy tắc S-V-O)',
    whenToUse: [
      'Xây dựng câu khẳng định tiếng Anh thông thường.',
      'Sắp xếp các từ theo đúng thứ tự: Ai làm gì, tác động lên cái gì.',
    ],
    signalWords: [
      'Subject (S): Anna, My father, We, They, The boy',
      'Verb (V): like, open, watch, build, drink, see',
      'Object (O): tea, the door, a house, the ball',
    ],
    check: [
      'Chủ ngữ đã đứng trước động từ chưa?',
      'Động từ có đứng ngay sau chủ ngữ (không bị tân ngữ xen vào giữa) không?',
    ],
  },
  explanation: 'Trong tiếng Anh chuẩn, cấu trúc câu khẳng định cơ bản nhất là S - V - O (Subject - Verb - Object: Chủ ngữ - Động từ - Tân ngữ):\n1. Subject (Chủ ngữ): Đứng đầu câu để chỉ ai/vật gì thực hiện hành động.\n2. Verb (Động từ): Đứng ngay sau chủ ngữ để diễn tả hành động.\n3. Object (Tân ngữ): Đứng sau động từ để chỉ người/vật tiếp nhận hành động.\nVí dụ: "Linh (S) drinks (V) water (O)."\nKhông bao giờ đặt tân ngữ vào giữa chủ ngữ và động từ (viết "Linh water drinks" là sai) và không đưa động từ lên trước chủ ngữ trong câu trần thuật (viết "Drinks Linh water" là sai).',
  examples: [
    { english: 'I kick the ball.', vietnamese: 'Tôi đá quả bóng. (I là S, kick là V, the ball là O.)' },
    { english: 'My mother washes dishes.', vietnamese: 'Mẹ tôi rửa bát đĩa. (My mother là S, washes là V, dishes là O.)' },
    { english: 'Cats catch mice.', vietnamese: 'Mèo bắt chuột. (Cats là S, catch là V, mice là O.)' },
    { english: 'They build houses.', vietnamese: 'Họ xây nhà. (They là S, build là V, houses là O.)' },
    { english: 'The boy opens the door.', vietnamese: 'Cậu bé mở cửa. (The boy là S, opens là V, the door là O.)' },
    { english: 'We watch a film.', vietnamese: 'Chúng tôi xem một bộ phim. (We là S, watch là V, a film là O.)' },
  ],
  contrasts: [
    {
      form: 'She eats an apple.',
      whyFits: 'She (chủ ngữ) đứng đầu, eats (động từ) theo sau, an apple (tân ngữ) ở cuối câu.',
      whyNot: 'Viết "She an apple eats" đưa tân ngữ chen vào giữa chủ ngữ và động từ là sai trật tự S-V-O.',
    },
    {
      form: 'The teacher explains the lesson.',
      whyFits: 'Trật tự chuẩn S (The teacher) + V (explains) + O (the lesson).',
      whyNot: 'Viết "Explains the teacher the lesson" đảo động từ lên đầu là sai trong câu khẳng định.',
    },
  ],
  commonMistakes: [
    'Đặt tân ngữ trước động từ theo thói quen suy nghĩ (viết "I football play" thay vì "I play football").',
    'Đảo động từ lên đầu câu trần thuật (viết "Like they music" thay vì "They like music").',
    'Chèn trạng từ hoặc từ bổ nghĩa tách rời chủ ngữ và động từ một cách tùy tiện.',
  ],
  summary: 'Câu trần thuật tiếng Anh luôn đi theo trật tự S - V - O: Chủ ngữ + Động từ + Tân ngữ.',
  exercises: [
    {
      id: 'grammar-v2-0-subject-verb-order-04-q1',
      kind: 'choice',
      prompt: 'Sắp xếp các từ sau thành câu đúng ngữ pháp: "tea / drinks / My father"',
      options: [
        { text: 'My father drinks tea.', correct: true, rationale: 'Trật tự đúng S (My father) + V (drinks) + O (tea).' },
        { text: 'My father tea drinks.', correct: false, rationale: 'Đặt tân ngữ trước động từ là sai.' },
        { text: 'Drinks my father tea.', correct: false, rationale: 'Đưa động từ lên đầu câu trần thuật là sai.' },
      ],
      acceptedAnswers: [{ text: 'My father drinks tea.', rationale: 'My father drinks tea tuân theo đúng trật tự S-V-O.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q2',
      kind: 'choice',
      prompt: 'Trong câu "Anna opens the window.", từ "the window" đóng vai trò ngữ pháp gì?',
      options: [
        { text: 'Tân ngữ (Object)', correct: true, rationale: 'the window đứng sau động từ opens và chịu hành động mở.' },
        { text: 'Chủ ngữ (Subject)', correct: false, rationale: 'Chủ ngữ là Anna.' },
        { text: 'Động từ (Verb)', correct: false, rationale: 'Động từ là opens.' },
      ],
      acceptedAnswers: [{ text: 'Tân ngữ (Object)', rationale: 'the window là tân ngữ trong câu.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q3',
      kind: 'choice',
      prompt: 'Câu nào dưới đây có trật tự từ chính xác?',
      options: [
        { text: 'We like fresh juice.', correct: true, rationale: 'Chủ ngữ We + động từ like + tân ngữ fresh juice.' },
        { text: 'We fresh juice like.', correct: false, rationale: 'Sai trật tự S-O-V.' },
        { text: 'Like we fresh juice.', correct: false, rationale: 'Sai vì đưa động từ lên đầu câu trần thuật.' },
      ],
      acceptedAnswers: [{ text: 'We like fresh juice.', rationale: 'We like fresh juice đúng cấu trúc S-V-O.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q4',
      kind: 'choice',
      prompt: 'Vị trí thông thường của động từ trong câu khẳng định tiếng Anh là:',
      options: [
        { text: 'Ngay sau chủ ngữ', correct: true, rationale: 'Động từ đứng ngay sau chủ ngữ theo cấu trúc S-V-O.' },
        { text: 'Ở cuối câu sau tân ngữ', correct: false, rationale: 'Tiếng Anh không đặt động từ ở cuối câu giống một số ngôn ngữ khác.' },
        { text: 'Ở đầu câu trước chủ ngữ', correct: false, rationale: 'Đầu câu là vị trí của chủ ngữ.' },
      ],
      acceptedAnswers: [{ text: 'Ngay sau chủ ngữ', rationale: 'Động từ đứng ngay sau chủ ngữ trong câu trần thuật.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q5',
      kind: 'gap',
      prompt: 'Điền động từ chỉ hành động đọc sách thích hợp vào sau chủ ngữ: "The girl ___ a storybook."',
      options: [],
      acceptedAnswers: [{ text: 'reads', rationale: 'reads là động từ đứng ngay sau chủ ngữ The girl.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q6',
      kind: 'gap',
      prompt: 'Điền động từ chỉ hành động chơi thể thao thích hợp vào sau chủ ngữ: "Peter ___ tennis."',
      options: [],
      acceptedAnswers: [
        { text: 'plays', rationale: 'plays là động từ đứng sau chủ ngữ Peter trong cấu trúc S-V-O.' },
      ],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q7',
      kind: 'gap',
      prompt: 'Điền tân ngữ chỉ sữa thích hợp vào sau động từ: "The baby drinks ___."',
      options: [],
      acceptedAnswers: [{ text: 'milk', rationale: 'milk là tân ngữ đứng sau động từ drinks.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q8',
      kind: 'gap',
      prompt: 'Điền đại từ nhân xưng ngôi thứ ba số nhiều làm chủ ngữ vào đầu câu: "___ visit their grandparents."',
      options: [],
      acceptedAnswers: [{ text: 'They', rationale: 'They là chủ ngữ đứng đầu câu.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q9',
      kind: 'transform',
      prompt: 'Sắp xếp các từ sau thành câu trần thuật hoàn chỉnh: "the guitar / plays / Minh"',
      options: [],
      acceptedAnswers: [
        { text: 'Minh plays the guitar.', rationale: 'Minh (S) + plays (V) + the guitar (O).' },
      ],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q10',
      kind: 'transform',
      prompt: 'Sắp xếp các từ sau thành câu trần thuật hoàn chỉnh: "wear / uniforms / Students"',
      options: [],
      acceptedAnswers: [
        { text: 'Students wear uniforms.', rationale: 'Students (S) + wear (V) + uniforms (O).' },
      ],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q11',
      kind: 'correction',
      prompt: 'Sửa lại câu sau cho đúng trật tự S-V-O: "I delicious apples eat."',
      options: [],
      acceptedAnswers: [
        { text: 'I eat delicious apples.', rationale: 'Đưa động từ eat lên trước tân ngữ delicious apples.' },
      ],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-q12',
      kind: 'correction',
      prompt: 'Sửa trật tự từ trong câu sau: "Kicks he the ball."',
      options: [],
      acceptedAnswers: [
        { text: 'He kicks the ball.', rationale: 'Chủ ngữ He phải đứng trước động từ kicks.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-subject-verb-order-04-r1',
      kind: 'choice',
      prompt: 'Chọn câu có trật tự S - V - O chính xác:',
      options: [
        { text: 'Farmers grow rice.', correct: true, rationale: 'Farmers (S) + grow (V) + rice (O).' },
        { text: 'Farmers rice grow.', correct: false, rationale: 'Tân ngữ rice đứng trước động từ grow là sai.' },
        { text: 'Grow farmers rice.', correct: false, rationale: 'Động từ grow đứng đầu câu khẳng định là sai.' },
      ],
      acceptedAnswers: [{ text: 'Farmers grow rice.', rationale: 'Farmers grow rice tuân theo đúng cấu trúc S-V-O.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-r2',
      kind: 'gap',
      prompt: 'Điền động từ chỉ hành động nấu nướng thích hợp vào sau chủ ngữ: "Mother ___ lunch."',
      options: [],
      acceptedAnswers: [{ text: 'cooks', rationale: 'cooks là động từ đứng ngay sau chủ ngữ Mother.' }],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-r3',
      kind: 'transform',
      prompt: 'Sắp xếp các từ thành câu đúng trật tự: "bread / buys / He"',
      options: [],
      acceptedAnswers: [
        { text: 'He buys bread.', rationale: 'He (S) + buys (V) + bread (O).' },
      ],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-r4',
      kind: 'correction',
      prompt: 'Sửa lại câu sau theo trật tự S-V-O: "They a new house build."',
      options: [],
      acceptedAnswers: [
        { text: 'They build a new house.', rationale: 'Đưa động từ build lên trước cụm tân ngữ a new house.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-subject-verb-order-04-o1',
      prompt: 'Viết 1 câu tiếng Anh có cấu trúc S-V-O kể về sở thích ăn hoặc uống của bạn (ví dụ: I drink orange juice / I eat rice).',
      modelAnswer: 'I drink orange juice.',
      checks: [
        'Bắt đầu bằng chủ ngữ I',
        'Động từ hành động đứng ngay sau chủ ngữ (ví dụ: drink, eat, like)',
        'Tân ngữ chỉ món ăn/thức uống đứng sau động từ',
      ],
    },
    {
      id: 'grammar-v2-0-subject-verb-order-04-o2',
      prompt: 'Viết 1 câu tiếng Anh gồm đủ 3 thành phần S-V-O kể về một người bạn hoặc người thân (ví dụ: My sister reads books / Nam plays tennis).',
      modelAnswer: 'My sister reads books.',
      checks: [
        'Chủ ngữ chỉ người cụ thể (ví dụ: My sister, Linh, Nam)',
        'Động từ theo sau chia đúng chủ ngữ số ít (ví dụ: reads, plays, paints)',
        'Tân ngữ nhận hành động đứng cuối câu',
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
