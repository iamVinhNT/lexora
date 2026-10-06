/**
 * @file be-negative.ts
 * @description Lesson: Động từ to be thể phủ định (be-negative).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-be-negative-06',
  revisionId: 'grammar-v2-0-be-negative-06@1.0.0',
  revision: '1.0.0',
  title: 'Động từ to be thể phủ định',
  objective: 'Biết cách thêm not sau am, is, are và sử dụng các dạng rút gọn isn\'t, aren\'t, I\'m not để tạo câu phủ định chính xác.',
  prerequisiteIds: ['grammar-v2-0-be-positive-05'],
  coverage: ['be-negative', 'to-be', 'negation', 'not', 'isnt-arent'],
  context: {
    english: 'Tom is not tired today. I am not late for school. We are not angry.',
    vietnamese: 'Tom không mệt hôm nay. Tôi không bị muộn học. Chúng tôi không tức giận.',
  },
  guide: {
    pattern: 'Subject + am / is / are + not + [Noun / Adjective / Preposition]',
    whenToUse: [
      'Phủ nhận một đặc điểm, trạng thái hoặc cảm xúc (She is not sad, We aren\'t busy).',
      'Phủ định nghề nghiệp, vai trò hoặc danh tính (He is not a driver).',
      'Phủ định vị trí nơi chốn (They are not in the classroom).',
    ],
    signalWords: [
      'not (từ phủ định đứng sau to be)',
      'I am not -> I\'m not',
      'is not -> isn\'t (hoặc he\'s not, she\'s not, it\'s not)',
      'are not -> aren\'t (hoặc you\'re not, we\'re not, they\'re not)',
    ],
    check: [
      'Từ "not" đã đứng ngay sau động từ to be (am / is / are) chưa?',
      'Có nhầm lẫn viết tắt không? Ghi nhớ: "I am not" chỉ rút gọn thành "I\'m not", không bao giờ viết "amn\'t".',
    ],
  },
  explanation: 'Để tạo câu phủ định với động từ "to be" ở hiện tại đơn, ta chỉ cần thêm từ phủ định "not" ngay phía sau am, is hoặc are:\n1. I am not (dạng viết tắt: I\'m not). Tiếng Anh chuẩn không có dạng "amn\'t".\n2. He / She / It + is not (dạng viết tắt phổ biến: isn\'t; hoặc có thể viết He\'s not, She\'s not, It\'s not).\n3. You / We / They + are not (dạng viết tắt phổ biến: aren\'t; hoặc có thể viết You\'re not, We\'re not, They\'re not).\nTrong giao tiếp hàng ngày và văn phong thân mật, người bản xứ thường dùng dạng viết tắt (isn\'t, aren\'t, I\'m not) để câu nói tự nhiên và trôi chảy hơn.',
  examples: [
    { english: 'I am not hungry right now.', vietnamese: 'Bây giờ tôi không đói. ("am not" phủ định tính từ "hungry".)' },
    { english: 'She isn\'t at school today.', vietnamese: 'Hôm nay cô ấy không ở trường. ("isn\'t" là dạng viết tắt của "is not".)' },
    { english: 'The soup is not salty.', vietnamese: 'Món súp không bị mặn. ("is not" đi với danh từ số ít "The soup".)' },
    { english: 'We aren\'t tired after the walk.', vietnamese: 'Chúng tôi không mệt sau chuyến đi bộ. ("aren\'t" đi với chủ ngữ "We".)' },
    { english: 'They are not at home.', vietnamese: 'Họ không có ở nhà. ("are not" phủ định vị trí.)' },
    { english: 'You aren\'t wrong.', vietnamese: 'Bạn không sai. ("aren\'t" đi với chủ ngữ "You".)' },
  ],
  contrasts: [
    {
      form: 'He isn\'t a teacher.',
      whyFits: 'isn\'t là dạng viết tắt chuẩn xác của is not với chủ ngữ He.',
      whyNot: 'Viết "He not is a teacher" đặt từ not trước to be là sai cấu trúc phủ định tiếng Anh.',
    },
    {
      form: 'I\'m not sleepy.',
      whyFits: 'I\'m not rút gọn từ I am not.',
      whyNot: 'Viết "I amn\'t sleepy" sai vì trong tiếng Anh chuẩn không tồn tại từ amn\'t.',
    },
  ],
  commonMistakes: [
    'Đặt "not" trước động từ to be theo thói quen tiếng Việt "không là/không phải" (ví dụ viết "He not is happy" thay vì "He is not happy").',
    'Tạo dạng viết tắt sai quy tắc "amn\'t" cho chủ ngữ I (phải dùng "I\'m not").',
    'Dùng trợ động từ do not / don\'t với to be (ví dụ viết "She doesn\'t be tired" thay vì "She isn\'t tired").',
  ],
  summary: 'Thêm not ngay sau to be: am not (I\'m not), is not (isn\'t), are not (aren\'t). Không dùng trợ động từ do/does.',
  exercises: [
    {
      id: 'grammar-v2-0-be-negative-06-q1',
      kind: 'choice',
      prompt: 'Chọn câu phủ định đúng ngữ pháp:',
      options: [
        { text: 'He is not sad.', correct: true, rationale: 'not đứng ngay sau động từ to be is.' },
        { text: 'He not is sad.', correct: false, rationale: 'Đặt not trước is là sai trật tự.' },
        { text: 'He does not be sad.', correct: false, rationale: 'Không dùng trợ động từ does not với to be.' },
      ],
      acceptedAnswers: [{ text: 'He is not sad.', rationale: 'He is not sad là câu phủ định chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q2',
      kind: 'choice',
      prompt: 'Dạng viết tắt đúng của "is not" là gì?',
      options: [
        { text: 'isn\'t', correct: true, rationale: 'isn\'t là dạng viết tắt thông dụng của is not.' },
        { text: 'aren\'t', correct: false, rationale: 'aren\'t là dạng viết tắt của are not, không phải is not.' },
        { text: 'aint', correct: false, rationale: 'aint không phải dạng chuẩn được học ở cấp độ này.' },
      ],
      acceptedAnswers: [{ text: 'isn\'t', rationale: 'is not viết tắt thành isn\'t.' }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q3',
      kind: 'choice',
      prompt: 'Điền dạng phủ định thích hợp: "We ___ ready yet."',
      options: [
        { text: 'aren\'t', correct: true, rationale: 'We đi với are not, viết tắt là aren\'t.' },
        { text: 'isn\'t', correct: false, rationale: 'isn\'t chỉ dùng cho chủ ngữ số ít.' },
        { text: 'am not', correct: false, rationale: 'am not chỉ dùng cho I.' },
      ],
      acceptedAnswers: [{ text: 'aren\'t', rationale: 'We aren\'t ready yet.' }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q4',
      kind: 'choice',
      prompt: 'Dạng phủ định viết tắt đúng của "I am not" là gì?',
      options: [
        { text: 'I\'m not', correct: true, rationale: 'I am not chỉ viết tắt thành I\'m not.' },
        { text: 'I amn\'t', correct: false, rationale: 'Tiếng Anh chuẩn không có amn\'t.' },
        { text: 'I are not', correct: false, rationale: 'I không đi với are.' },
      ],
      acceptedAnswers: [{ text: 'I\'m not', rationale: 'I am not viết tắt là I\'m not.' }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q5',
      kind: 'gap',
      prompt: 'Điền từ phủ định "not" vào vị trí đúng: "She is ___ angry."',
      options: [],
      acceptedAnswers: [{ text: 'not', rationale: 'not đứng sau động từ to be is.' }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q6',
      kind: 'gap',
      prompt: 'Điền dạng rút gọn to be phủ định thích hợp vào chỗ trống: "The water ___ hot."',
      options: [],
      acceptedAnswers: [{ text: "isn't", rationale: "The water là danh từ số ít nên dùng isn't." }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q7',
      kind: 'gap',
      prompt: 'Điền dạng rút gọn to be phủ định thích hợp vào chỗ trống: "The students ___ in class."',
      options: [],
      acceptedAnswers: [{ text: "aren't", rationale: "The students là danh từ số nhiều nên dùng aren't." }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q8',
      kind: 'gap',
      prompt: 'Điền đại từ và dạng rút gọn to be phủ định cho ngôi thứ nhất số ít: "___ thirsty."',
      options: [],
      acceptedAnswers: [{ text: "I'm not", rationale: "I đi với 'm not để tạo I'm not thirsty." }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q9',
      kind: 'transform',
      prompt: 'Chuyển câu khẳng định sau sang phủ định bằng cách thêm "not": "They are tired."',
      options: [],
      acceptedAnswers: [
        { text: 'They are not tired.', rationale: 'Thêm not ngay sau are: They are not tired.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách dùng dạng rút gọn "isn\'t": "The dog is not big."',
      options: [],
      acceptedAnswers: [
        { text: "The dog isn't big.", rationale: "is not rút gọn thành isn't." },
      ],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ trong câu phủ định sau: "She not is a nurse."',
      options: [],
      acceptedAnswers: [
        { text: 'She is not a nurse.', rationale: 'Đưa từ not ra sau động từ to be is.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-negative-06-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai dạng viết tắt trong câu sau: "I amn\'t late."',
      options: [],
      acceptedAnswers: [
        { text: "I'm not late.", rationale: "Không dùng amn't, phải viết là I'm not." },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-be-negative-06-r1',
      kind: 'choice',
      prompt: 'Chọn câu phủ định viết đúng chuẩn:',
      options: [
        { text: 'These shoes aren\'t clean.', correct: true, rationale: 'These shoes là danh từ số nhiều đi với aren\'t.' },
        { text: 'These shoes isn\'t clean.', correct: false, rationale: 'These shoes số nhiều không đi với isn\'t.' },
        { text: 'These shoes not are clean.', correct: false, rationale: 'not đặt trước are là sai.' },
      ],
      acceptedAnswers: [{ text: "These shoes aren't clean.", rationale: "These shoes aren't clean đúng quy tắc." }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-r2',
      kind: 'gap',
      prompt: 'Điền dạng rút gọn to be phủ định thích hợp vào chỗ trống: "The room ___ cold."',
      options: [],
      acceptedAnswers: [{ text: "isn't", rationale: "The room là danh từ số ít nên dùng isn't." }],
    },
    {
      id: 'grammar-v2-0-be-negative-06-r3',
      kind: 'transform',
      prompt: 'Chuyển câu khẳng định sau sang phủ định: "We are at the park."',
      options: [],
      acceptedAnswers: [
        { text: 'We are not at the park.', rationale: 'Thêm not sau are để phủ định vị trí.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-negative-06-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai to be phủ định trong câu sau: "My brother aren\'t tall."',
      options: [],
      acceptedAnswers: [
        { text: "My brother isn't tall.", rationale: "My brother là danh từ số ít nên phải dùng isn't." },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-be-negative-06-o1',
      prompt: 'Viết 1 câu phủ định tiếng Anh với chủ ngữ "I" nói về một cảm xúc mà bạn không cảm thấy lúc này (ví dụ: I am not tired / I\'m not sad).',
      modelAnswer: 'I am not tired.',
      checks: [
        'Bắt đầu bằng chủ ngữ I',
        'Có động từ to be kèm từ phủ định (am not hoặc I\'m not)',
        'Kết thúc bằng một tính từ chỉ cảm xúc hoặc thể trạng',
      ],
    },
    {
      id: 'grammar-v2-0-be-negative-06-o2',
      prompt: 'Viết 1 câu phủ định tiếng Anh sử dụng dạng viết tắt "isn\'t" để miêu tả một sự vật hoặc con vật (ví dụ: The car isn\'t old / The cat isn\'t black).',
      modelAnswer: 'The car isn\'t old.',
      checks: [
        'Chủ ngữ là một danh từ số ít',
        'Sử dụng đúng dạng viết tắt isn\'t',
        'Có tính từ miêu tả đặc điểm theo sau',
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
