/**
 * @file be-questions.ts
 * @description Lesson: Động từ to be câu hỏi Yes/No (be-questions).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-be-questions-07',
  revisionId: 'grammar-v2-0-be-questions-07@1.0.0',
  revision: '1.0.0',
  title: 'Động từ to be câu hỏi Yes/No',
  objective: 'Biết cách đảo am, is, are lên trước chủ ngữ để đặt câu hỏi Yes/No và trả lời ngắn gọn (Yes, S + be / No, S + be + not).',
  prerequisiteIds: ['grammar-v2-0-be-negative-06'],
  coverage: ['be-questions', 'to-be', 'yes-no-questions', 'short-answers', 'inversion'],
  context: {
    english: 'Are you ready? Yes, I am. Is your brother at home? No, he isn\'t.',
    vietnamese: 'Bạn đã sẵn sàng chưa? Vâng, tôi sẵn sàng. Anh trai bạn có ở nhà không? Không, anh ấy không ở nhà.',
  },
  guide: {
    pattern: 'Am / Is / Are + Subject + [Noun / Adjective / Preposition]? -> Yes, S + be. / No, S + be + not.',
    whenToUse: [
      'Hỏi xác nhận thông tin có đúng hay không bằng câu hỏi Yes/No.',
      'Hỏi về cảm xúc, tình trạng hiện tại (Are you tired? Is it cold?).',
      'Trả lời ngắn lịch sự và đúng chuẩn ngữ pháp thay vì chỉ nói Yes hoặc No.',
    ],
    signalWords: [
      'Bắt đầu câu hỏi bằng: Am I...?, Is he/she/it...?, Are you/we/they...?',
      'Dấu hỏi chấm (?) ở cuối câu',
      'Câu trả lời khẳng định: Yes, I am / Yes, he is / Yes, they are (KHÔNG viết tắt)',
      'Câu trả lời phủ định: No, I\'m not / No, he isn\'t / No, they aren\'t',
    ],
    check: [
      'Đã đảo động từ to be (Am / Is / Are) lên trước chủ ngữ chưa?',
      'Cuối câu hỏi đã có dấu chấm hỏi (?) chưa?',
      'Trong câu trả lời khẳng định ngắn, có giữ nguyên dạng đầy đủ (Yes, he is; không viết Yes, he\'s) không?',
    ],
  },
  explanation: 'Để tạo câu hỏi Yes/No với động từ "to be" ở hiện tại, ta thực hiện quy tắc đảo ngữ đơn giản: đưa Am, Is hoặc Are lên đứng đầu câu trước chủ ngữ:\n1. Am I + ...?\n2. Is + he / she / it / danh từ số ít + ...?\n3. Are + you / we / they / danh từ số nhiều + ...?\n\nCách trả lời ngắn (Short answers):\n- Nếu đồng ý: "Yes, + đại từ chủ ngữ + to be." (Lưu ý: KHÔNG BAO GIỜ viết tắt trong câu trả lời ngắn khẳng định. Ví dụ: "Yes, I am", KHÔNG nói "Yes, I\'m"; "Yes, he is", KHÔNG nói "Yes, he\'s").\n- Nếu không đồng ý: "No, + đại từ chủ ngữ + to be + not." (Thường dùng dạng viết tắt: "No, I\'m not", "No, he isn\'t", "No, they aren\'t").',
  examples: [
    { english: 'Are you a teacher? Yes, I am.', vietnamese: 'Bạn có phải là giáo viên không? Vâng, đúng vậy. ("Are" đảo lên trước "you", trả lời đầy đủ "Yes, I am".)' },
    { english: 'Is he tired? No, he isn\'t.', vietnamese: 'Anh ấy có mệt không? Không, anh ấy không mệt. ("Is" đảo lên trước "he".)' },
    { english: 'Is this your bag? Yes, it is.', vietnamese: 'Đây là túi của bạn phải không? Vâng, đúng rồi. ("it is" không viết tắt.)' },
    { english: 'Are they from Vietnam? Yes, they are.', vietnamese: 'Họ đến từ Việt Nam phải không? Vâng, đúng vậy.' },
    { english: 'Is the weather hot today? No, it isn\'t.', vietnamese: 'Hôm nay thời tiết có nóng không? Không, không nóng.' },
    { english: 'Are we late for the movie? No, we aren\'t.', vietnamese: 'Chúng mình có bị muộn xem phim không? Không, không muộn.' },
  ],
  contrasts: [
    {
      form: 'Are you ready? - Yes, I am.',
      whyFits: 'Đảo Are lên đầu câu hỏi; câu trả lời khẳng định ngắn giữ dạng đầy đủ I am.',
      whyNot: 'Viết "Yes, I\'m" sai quy tắc vì không được viết tắt to be ở cuối câu trả lời ngắn khẳng định.',
    },
    {
      form: 'Is she your sister?',
      whyFits: 'Is đứng trước chủ ngữ ngôi thứ ba số ít she để tạo câu hỏi nghi vấn.',
      whyNot: 'Viết "She is your sister?" giữ nguyên trật tự câu trần thuật thay vì đảo ngữ trong câu hỏi chuẩn.',
    },
  ],
  commonMistakes: [
    'Quên đảo động từ to be lên trước chủ ngữ khi đặt câu hỏi (ví dụ hỏi "You are hungry?" thay vì "Are you hungry?").',
    'Viết tắt động từ to be trong câu trả lời ngắn khẳng định (viết "Yes, he\'s" thay vì "Yes, he is").',
    'Dùng sai đại từ trong câu trả lời ngắn (khi người ta hỏi "Are you happy?", phải trả lời là "Yes, I am", không trả lời "Yes, you are").',
  ],
  summary: 'Đảo Am/Is/Are lên trước chủ ngữ để hỏi Yes/No. Trả lời khẳng định không viết tắt (Yes, S + be), trả lời phủ định dùng rút gọn (No, S + be not).',
  exercises: [
    {
      id: 'grammar-v2-0-be-questions-07-q1',
      kind: 'choice',
      prompt: 'Chọn câu hỏi đúng ngữ pháp để hỏi ai đó có đói không:',
      options: [
        { text: 'Are you hungry?', correct: true, rationale: 'Đảo Are lên trước chủ ngữ you để tạo câu hỏi.' },
        { text: 'You are hungry?', correct: false, rationale: 'Chưa đảo to be lên trước chủ ngữ.' },
        { text: 'Is you hungry?', correct: false, rationale: 'You phải đi với are, không dùng is.' },
      ],
      acceptedAnswers: [{ text: 'Are you hungry?', rationale: 'Are you hungry? là câu hỏi chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q2',
      kind: 'choice',
      prompt: 'Điền từ thích hợp vào câu hỏi: "___ he your brother?"',
      options: [
        { text: 'Is', correct: true, rationale: 'Chủ ngữ he đi với to be Is.' },
        { text: 'Are', correct: false, rationale: 'Are dùng cho you, we, they.' },
        { text: 'Am', correct: false, rationale: 'Am chỉ dùng cho I.' },
      ],
      acceptedAnswers: [{ text: 'Is', rationale: 'Is đi với chủ ngữ he.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q3',
      kind: 'choice',
      prompt: 'Người A hỏi: "Are you tired?" - Người B trả lời khẳng định đúng là:',
      options: [
        { text: 'Yes, I am.', correct: true, rationale: 'Trả lời với I am và không viết tắt.' },
        { text: 'Yes, I\'m.', correct: false, rationale: 'Không viết tắt to be trong câu trả lời ngắn khẳng định.' },
        { text: 'Yes, you are.', correct: false, rationale: 'Người được hỏi phải xưng là I.' },
      ],
      acceptedAnswers: [{ text: 'Yes, I am.', rationale: 'Yes, I am là câu trả lời chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q4',
      kind: 'choice',
      prompt: 'Người A hỏi: "Is the book interesting?" - Người B trả lời phủ định đúng là:',
      options: [
        { text: 'No, it isn\'t.', correct: true, rationale: 'The book được thay bằng it; đi với isn\'t.' },
        { text: 'No, it not is.', correct: false, rationale: 'Sai cấu trúc phủ định.' },
        { text: 'No, he isn\'t.', correct: false, rationale: 'The book là đồ vật nên phải dùng it, không dùng he.' },
      ],
      acceptedAnswers: [{ text: "No, it isn't.", rationale: "No, it isn't là câu trả lời phủ định chính xác." }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q5',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào đầu câu hỏi: "___ they students?"',
      options: [],
      acceptedAnswers: [{ text: 'Are', rationale: 'Chủ ngữ they đi với Are.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q6',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào đầu câu hỏi: "___ your mother at home?"',
      options: [],
      acceptedAnswers: [{ text: 'Is', rationale: 'your mother là danh từ số ít nên dùng Is.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q7',
      kind: 'gap',
      prompt: 'Hoàn thành câu trả lời ngắn khẳng định: "Is he happy? - Yes, he ___."',
      options: [],
      acceptedAnswers: [{ text: 'is', rationale: 'Trong câu trả lời khẳng định ngắn, giữ nguyên dạng đầy đủ is.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q8',
      kind: 'gap',
      prompt: 'Hoàn thành câu trả lời ngắn phủ định: "Are you ready? - No, I\'m ___."',
      options: [],
      acceptedAnswers: [{ text: 'not', rationale: 'No, I\'m not là câu trả lời phủ định.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q9',
      kind: 'transform',
      prompt: 'Chuyển câu khẳng định sau thành câu hỏi Yes/No: "She is a doctor."',
      options: [],
      acceptedAnswers: [
        { text: 'Is she a doctor?', rationale: 'Đảo Is lên trước chủ ngữ she và thêm dấu hỏi chấm.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q10',
      kind: 'transform',
      prompt: 'Chuyển câu khẳng định sau thành câu hỏi Yes/No: "They are at school."',
      options: [],
      acceptedAnswers: [
        { text: 'Are they at school?', rationale: 'Đảo Are lên trước chủ ngữ they và thêm dấu hỏi chấm.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ trong câu hỏi sau: "You are thirsty?"',
      options: [],
      acceptedAnswers: [
        { text: 'Are you thirsty?', rationale: 'Đảo to be Are lên trước chủ ngữ you.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-questions-07-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi viết tắt sai quy tắc trong câu trả lời ngắn khẳng định sau: "Is it cold? - Yes, it\'s."',
      options: [],
      acceptedAnswers: [
        { text: 'Yes, it is.', rationale: 'Không viết tắt to be ở cuối câu trả lời ngắn khẳng định; phải viết Yes, it is.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-be-questions-07-r1',
      kind: 'choice',
      prompt: 'Chọn câu hỏi có hình thức đúng:',
      options: [
        { text: 'Is the water cold?', correct: true, rationale: 'Is đứng đầu câu hỏi với chủ ngữ không đếm được the water.' },
        { text: 'Are the water cold?', correct: false, rationale: 'water không đi với Are.' },
        { text: 'The water is cold?', correct: false, rationale: 'Chưa đảo to be lên trước chủ ngữ.' },
      ],
      acceptedAnswers: [{ text: 'Is the water cold?', rationale: 'Is the water cold? đúng quy tắc đảo ngữ.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-r2',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào đầu câu hỏi: "___ these pens new?"',
      options: [],
      acceptedAnswers: [{ text: 'Are', rationale: 'these pens là danh từ số nhiều nên dùng Are.' }],
    },
    {
      id: 'grammar-v2-0-be-questions-07-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau thành câu hỏi Yes/No: "He is your friend."',
      options: [],
      acceptedAnswers: [
        { text: 'Is he your friend?', rationale: 'Đảo Is lên đầu câu và thêm dấu hỏi chấm.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-questions-07-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi trong câu trả lời ngắn sau: "Are they friendly? - Yes, they\'re."',
      options: [],
      acceptedAnswers: [
        { text: 'Yes, they are.', rationale: 'Không viết tắt trong câu trả lời khẳng định ngắn: Yes, they are.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-be-questions-07-o1',
      prompt: 'Viết 1 câu hỏi Yes/No với "Are you...?" để hỏi về cảm xúc hoặc trạng thái của một người bạn (ví dụ: Are you happy? / Are you ready?).',
      modelAnswer: 'Are you happy?',
      checks: [
        'Bắt đầu bằng Are you',
        'Có tính từ miêu tả cảm xúc hoặc trạng thái theo sau',
        'Kết thúc bằng dấu hỏi chấm (?)',
      ],
    },
    {
      id: 'grammar-v2-0-be-questions-07-o2',
      prompt: 'Viết 1 cặp câu gồm câu hỏi bắt đầu bằng "Is he...?" hoặc "Is she...?" và câu trả lời ngắn tương ứng (ví dụ: Is he a teacher? - Yes, he is.).',
      modelAnswer: 'Is he a teacher? - Yes, he is.',
      checks: [
        'Câu hỏi bắt đầu bằng Is he hoặc Is she và có dấu hỏi (?)',
        'Câu trả lời ngắn đúng mẫu Yes, he/she is hoặc No, he/she isn\'t',
        'Không viết tắt to be trong câu trả lời khẳng định ngắn',
      ],
    },
  ],
  sources: [
    {
      "id": "be",
      "title": "British Council: Present simple: to be",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be",
      "claims": [
        "Present be uses am/is/are, negatives with not, inversion in questions and uncontracted affirmative short answers."
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
