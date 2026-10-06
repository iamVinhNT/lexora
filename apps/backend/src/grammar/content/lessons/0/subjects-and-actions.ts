/**
 * @file subjects-and-actions.ts
 * @description Lesson: Chủ ngữ và hành động (subjects-and-actions).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-subjects-and-actions-03',
  revisionId: 'grammar-v2-0-subjects-and-actions-03@1.0.0',
  revision: '1.0.0',
  title: 'Chủ ngữ và hành động',
  objective: 'Xác định chủ ngữ (người/vật thực hiện hành động) và chọn đúng động từ hành động tương ứng trong câu đơn giản.',
  prerequisiteIds: ['grammar-v2-0-nouns-and-adjectives-02'],
  coverage: ['subjects-and-actions', 'verbs', 'actions', 'pronouns', 'subject-agreement'],
  context: {
    english: 'The sun rises every morning. Birds sing in the trees. People walk to work.',
    vietnamese: 'Mặt trời mọc mỗi buổi sáng. Những chú chim hót trên cây. Mọi người đi bộ đi làm.',
  },
  guide: {
    pattern: 'Subject (Chủ ngữ: I/You/We/They/He/She/It/Danh từ) + Action Verb (Động từ hành động)',
    whenToUse: [
      'Diễn tả ai hoặc con gì đang làm một hành động cụ thể.',
      'Ghép đúng người thực hiện với hành động tương ứng trong câu.',
    ],
    signalWords: [
      'Subject pronouns: I, you, we, they, he, she, it',
      'Common action verbs: walk, run, eat, drink, sleep, read, write, play, cook',
    ],
    check: [
      'Ai hoặc vật gì đang thực hiện hành động này (chủ ngữ)?',
      'Hành động được thực hiện là gì (động từ)?',
    ],
  },
  explanation: 'Trong một câu trần thuật tiếng Anh đơn giản có động từ hữu hạn, hai thành phần nòng cốt là:\n1. Chủ ngữ (Subject): Đối tượng thực hiện hành động, có thể là tên riêng (Mai, Tom), danh từ (the cat, children), hoặc đại từ nhân xưng (I, you, we, they, he, she, it).\n2. Động từ hành động (Action Verb): Từ chỉ hành vi hoặc hoạt động mà chủ thể làm (run, cook, write, sing).\nTrong câu trần thuật thông thường, tiếng Anh cần chủ ngữ rõ ràng: "It rains", "We go to school". Câu mệnh lệnh là ngoại lệ thường lược chủ ngữ you: "Go to school!".',
  examples: [
    { english: 'Birds fly.', vietnamese: 'Những con chim bay. ("Birds" là chủ ngữ; "fly" là hành động.)' },
    { english: 'We eat breakfast.', vietnamese: 'Chúng tôi ăn bữa sáng. ("We" là chủ ngữ; "eat" là hành động.)' },
    { english: 'The baby sleeps quietly.', vietnamese: 'Em bé ngủ ngoan ngoãn. ("The baby" là chủ ngữ; "sleeps" là hành động.)' },
    { english: 'They play football.', vietnamese: 'Họ chơi bóng đá. ("They" là chủ ngữ; "play" là hành động.)' },
    { english: 'My brother cooks dinner.', vietnamese: 'Anh trai tôi nấu bữa tối. ("My brother" là chủ ngữ; "cooks" là hành động.)' },
    { english: 'Fish swim in the river.', vietnamese: 'Cá bơi trong sông. ("Fish" là chủ ngữ; "swim" là hành động.)' },
  ],
  contrasts: [
    {
      form: 'The boy runs.',
      whyFits: 'The boy là chủ ngữ số ít thực hiện hành động; runs là động từ hành động.',
      whyNot: 'Viết "Runs the boy" đưa động từ lên trước chủ ngữ trong câu trần thuật là sai ngữ pháp.',
    },
    {
      form: 'It rains.',
      whyFits: 'Tiếng Anh bắt buộc có chủ ngữ ngữ pháp It đi cùng động từ rains.',
      whyNot: 'Viết trơ trọi "Rains" bỏ sót chủ ngữ, không tạo thành câu tiếng Anh hoàn chỉnh.',
    },
  ],
  commonMistakes: [
    'Lược bỏ chủ ngữ giống tiếng Việt (ví dụ nói "Go to work" thay vì "I go to work").',
    'Nhầm lẫn giữa người thực hiện hành động (chủ ngữ) và đối tượng chịu tác động (tân ngữ).',
    'Đảo động từ lên trước chủ ngữ trong câu khẳng định thông thường.',
  ],
  summary: 'Mỗi câu hành động cần có chủ ngữ thực hiện và động từ hành động diễn tả việc được làm.',
  exercises: [
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q1',
      kind: 'choice',
      prompt: 'Trong câu "The cat drinks milk.", ai/vật gì là chủ ngữ thực hiện hành động?',
      options: [
        { text: 'The cat', correct: true, rationale: 'The cat là con vật thực hiện hành động uống.' },
        { text: 'drinks', correct: false, rationale: 'drinks là động từ chỉ hành động.' },
        { text: 'milk', correct: false, rationale: 'milk là đối tượng bị uống (tân ngữ).' },
      ],
      acceptedAnswers: [{ text: 'The cat', rationale: 'The cat là chủ ngữ trong câu.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q2',
      kind: 'choice',
      prompt: 'Động từ hành động trong câu "Children laugh happily." là từ nào?',
      options: [
        { text: 'laugh', correct: true, rationale: 'laugh là động từ chỉ hành động cười.' },
        { text: 'Children', correct: false, rationale: 'Children là chủ ngữ chỉ người.' },
        { text: 'happily', correct: false, rationale: 'happily là trạng từ bổ nghĩa.' },
      ],
      acceptedAnswers: [{ text: 'laugh', rationale: 'laugh là động từ chỉ hành động.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q3',
      kind: 'choice',
      prompt: 'Đại từ nhân xưng nào thay thế chính xác cho cụm chủ ngữ "My father and I"?',
      options: [
        { text: 'We', correct: true, rationale: 'My father and I bao gồm người nói nên dùng We (chúng tôi).' },
        { text: 'They', correct: false, rationale: 'They dùng khi không bao gồm người nói.' },
        { text: 'He', correct: false, rationale: 'He chỉ một người nam số ít.' },
      ],
      acceptedAnswers: [{ text: 'We', rationale: 'We là đại từ ngôi thứ nhất số nhiều.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q4',
      kind: 'choice',
      prompt: 'Chọn câu có đầy đủ chủ ngữ và động từ hành động đúng ngữ pháp:',
      options: [
        { text: 'She reads a book.', correct: true, rationale: 'Có chủ ngữ She và động từ reads.' },
        { text: 'Reads a book.', correct: false, rationale: 'Câu thiếu chủ ngữ.' },
        { text: 'She a book.', correct: false, rationale: 'Câu thiếu động từ hành động.' },
      ],
      acceptedAnswers: [{ text: 'She reads a book.', rationale: 'Câu có đầy đủ chủ ngữ và động từ.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q5',
      kind: 'gap',
      prompt: 'Điền động từ chỉ hành động ngủ vào chỗ trống: "The puppies ___ in the basket."',
      options: [],
      acceptedAnswers: [{ text: 'sleep', rationale: 'sleep là động từ chỉ hành động ngủ.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q6',
      kind: 'gap',
      prompt: 'Điền đại từ nhân xưng số nhiều thích hợp thay cho "The students": "The students are active. ___ play soccer."',
      options: [],
      acceptedAnswers: [{ text: 'They', rationale: 'They là đại từ thay thế cho danh từ số nhiều The students.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q7',
      kind: 'gap',
      prompt: 'Điền động từ hành động nấu nướng thích hợp: "Chefs ___ delicious food."',
      options: [],
      acceptedAnswers: [{ text: 'cook', rationale: 'cook là động từ chỉ hành động nấu ăn.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q8',
      kind: 'gap',
      prompt: 'Điền đại từ ngôi thứ nhất số ít chỉ người nói làm chủ ngữ: "___ walk to school every morning."',
      options: [],
      acceptedAnswers: [{ text: 'I', rationale: 'I là đại từ chỉ bản thân người nói.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q9',
      kind: 'transform',
      prompt: 'Thêm chủ ngữ "They" vào cụm hành động sau để tạo thành câu hoàn chỉnh: "eat dinner at home."',
      options: [],
      acceptedAnswers: [
        { text: 'They eat dinner at home.', rationale: 'Thêm đại từ chủ ngữ They vào đầu câu.' },
      ],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q10',
      kind: 'transform',
      prompt: 'Thay thế danh từ chủ ngữ "David" bằng đại từ "He" trong câu: "David writes a letter."',
      options: [],
      acceptedAnswers: [
        { text: 'He writes a letter.', rationale: 'Đại từ He thay thế cho David.' },
      ],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu chủ ngữ bằng cách thêm đại từ "I" vào đầu câu: "Like music very much."',
      options: [],
      acceptedAnswers: [
        { text: 'I like music very much.', rationale: 'Thêm chủ ngữ I và chuyển like thành chữ thường.' },
      ],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-q12',
      kind: 'correction',
      prompt: 'Sửa trật tự từ bị đảo ngược trong câu sau: "Sleeps the baby."',
      options: [],
      acceptedAnswers: [
        { text: 'The baby sleeps.', rationale: 'Chủ ngữ The baby phải đứng trước động từ sleeps.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-subjects-and-actions-03-r1',
      kind: 'choice',
      prompt: 'Trong câu "Musicians play instruments.", từ nào đóng vai trò chủ ngữ?',
      options: [
        { text: 'Musicians', correct: true, rationale: 'Musicians là danh từ làm chủ ngữ thực hiện hành động chơi đàn.' },
        { text: 'play', correct: false, rationale: 'play là động từ.' },
        { text: 'instruments', correct: false, rationale: 'instruments là tân ngữ.' },
      ],
      acceptedAnswers: [{ text: 'Musicians', rationale: 'Musicians là chủ ngữ trong câu.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-r2',
      kind: 'gap',
      prompt: 'Điền động từ hành động chỉ việc bơi lội: "Ducks ___ in the pond."',
      options: [],
      acceptedAnswers: [{ text: 'swim', rationale: 'swim là động từ chỉ hành động bơi.' }],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau khi thay danh từ chủ ngữ "Lisa" bằng đại từ "She": "Lisa sings well."',
      options: [],
      acceptedAnswers: [
        { text: 'She sings well.', rationale: 'Đại từ She thay thế cho Lisa.' },
      ],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-r4',
      kind: 'correction',
      prompt: 'Sửa lại câu trần thuật sau theo trật tự đúng: "Barks the dog loudly."',
      options: [],
      acceptedAnswers: [
        { text: 'The dog barks loudly.', rationale: 'Chủ ngữ The dog đứng trước động từ barks.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-subjects-and-actions-03-o1',
      prompt: 'Viết 1 câu tiếng Anh kể về một việc bạn làm mỗi ngày, bắt đầu bằng chủ ngữ "I" (ví dụ: I read books / I drink tea).',
      modelAnswer: 'I read books.',
      checks: [
        'Bắt đầu bằng chủ ngữ I',
        'Có động từ hành động nguyên mẫu phù hợp (ví dụ: read, drink, run, cook)',
        'Câu diễn đạt hoàn chỉnh một hành động',
      ],
    },
    {
      id: 'grammar-v2-0-subjects-and-actions-03-o2',
      prompt: 'Viết 1 câu tiếng Anh kể về hành động của một nhóm người, bắt đầu bằng chủ ngữ "They" (ví dụ: They play soccer / They watch television).',
      modelAnswer: 'They play soccer.',
      checks: [
        'Bắt đầu bằng chủ ngữ They',
        'Động từ hành động giữ nguyên mẫu (ví dụ: play, sing, dance)',
        'Có tân ngữ hoặc trạng ngữ phù hợp',
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
