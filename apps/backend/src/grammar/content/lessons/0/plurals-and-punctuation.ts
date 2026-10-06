/**
 * @file plurals-and-punctuation.ts
 * @description Lesson: Danh từ số nhiều cơ bản và dấu câu (plurals-and-punctuation).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-plurals-and-punctuation-08',
  revisionId: 'grammar-v2-0-plurals-and-punctuation-08@1.0.0',
  revision: '1.0.0',
  title: 'Danh từ số nhiều cơ bản và dấu câu',
  objective: 'Nắm vững quy tắc thêm -s/-es để tạo danh từ số nhiều cơ bản, quy tắc viết hoa đầu câu/tên riêng và sử dụng dấu chấm, dấu chấm hỏi chính xác.',
  prerequisiteIds: ['grammar-v2-0-be-questions-07'],
  coverage: ['plurals-and-punctuation', 'regular-plurals', 'plural-s-es', 'capitalization', 'punctuation'],
  context: {
    english: 'Anna has two cats and three boxes. Do you like animals? Yes, I do.',
    vietnamese: 'Anna có hai con mèo và ba cái hộp. Bạn có thích động vật không? Vâng, tôi có.',
  },
  guide: {
    pattern: 'Số nhiều thông thường: Noun + s / es (one cat -> two cats, one box -> two boxes); Dấu câu: Viết hoa chữ đầu và tên riêng, kết thúc bằng (.) hoặc (?)',
    whenToUse: [
      'Nói về số lượng từ 2 người, con vật hoặc đồ vật trở lên.',
      'Viết câu tiếng Anh đúng chính tả và ngữ pháp với chữ hoa đầu câu và dấu kết thúc rõ ràng.',
    ],
    signalWords: [
      'Số đếm: two, three, four, many',
      'Đuôi số nhiều thông thường: -s (book -> books, cup -> cups)',
      'Đuôi -es sau các tận cùng: -s, -ss, -sh, -ch, -x (bus -> buses, watch -> watches, box -> boxes)',
      'Dấu câu: Dấu chấm (.) cho câu kể/khẳng định, Dấu hỏi (?) cho câu hỏi',
    ],
    check: [
      'Danh từ đếm được đi sau số lượng từ 2 trở lên đã thêm -s hoặc -es chưa?',
      'Chữ cái đầu câu và tên riêng người/địa danh đã viết hoa chưa?',
      'Cuối câu đã có dấu chấm (.) hoặc dấu chấm hỏi (?) chưa?',
    ],
  },
  explanation: 'Bài học này giúp người học hoàn thiện hai kỹ năng nền tảng trong tiếng Anh viết:\n1. Danh từ số nhiều quy tắc (Regular Plural Nouns):\n- Đa số danh từ đếm được chuyển sang số nhiều bằng cách thêm "-s" vào sau (one pen -> two pens, one cat -> three cats).\n- Những danh từ tận cùng bằng -ch, -sh, -s, -ss, -x thì thêm "-es" để phát âm thuận tiện (one watch -> two watches, one box -> two boxes, one bus -> two buses).\n\n2. Viết hoa và dấu câu cơ bản (Capitalization & Punctuation):\n- Chữ cái đầu tiên của câu luôn luôn phải viết hoa.\n- Đại từ "I" (tôi) luôn luôn viết hoa dù đứng ở bất kỳ vị trí nào trong câu.\n- Tên riêng của người, quốc gia, thành phố phải viết hoa (ví dụ: Anna, Vietnam, London).\n- Câu khẳng định/phủ định kết thúc bằng dấu chấm (.). Câu hỏi kết thúc bằng dấu chấm hỏi (?). Tuyệt đối không để câu lơ lửng không có dấu kết thúc.',
  examples: [
    { english: 'I have three books.', vietnamese: 'Tôi có ba cuốn sách. (book thêm -s sau số từ three; viết hoa I, kết thúc dấu chấm.)' },
    { english: 'He washes two cars.', vietnamese: 'Anh ấy rửa hai chiếc ô tô. (car thêm -s.)' },
    { english: 'There are five boxes on the floor.', vietnamese: 'Có năm cái hộp trên sàn. (box tận cùng bằng -x nên thêm -es thành boxes.)' },
    { english: 'She buys two new watches.', vietnamese: 'Cô ấy mua hai chiếc đồng hồ mới. (watch tận cùng bằng -ch nên thêm -es thành watches.)' },
    { english: 'Peter lives in Hanoi.', vietnamese: 'Peter sống ở Hà Nội. (Viết hoa tên riêng Peter và địa danh Hanoi.)' },
    { english: 'Is this your dog?', vietnamese: 'Đây là con chó của bạn phải không? (Câu hỏi kết thúc bằng dấu chấm hỏi ?.)' },
  ],
  contrasts: [
    {
      form: 'She has two boxes.',
      whyFits: 'box tận cùng là x nên quy tắc ngữ pháp yêu cầu thêm đuôi -es thành boxes.',
      whyNot: 'Viết "She has two boxs" sai chính tả vì các từ tận cùng bằng x phải thêm -es.',
    },
    {
      form: 'David likes cats.',
      whyFits: 'Viết hoa chữ cái đầu của tên riêng David và kết thúc câu bằng dấu chấm.',
      whyNot: 'Viết "david likes cats" không viết hoa tên riêng đầu câu và thiếu dấu chấm vi phạm quy tắc chính tả cơ bản.',
    },
  ],
  commonMistakes: [
    'Quên thêm -s hoặc -es vào danh từ sau số từ hai trở lên (ví dụ viết "two cat" thay vì "two cats").',
    'Thêm nhầm -s thay vì -es cho các từ kết thúc bằng -ch, -sh, -s, -x (ví dụ viết "boxs" thay vì "boxes").',
    'Không viết hoa chữ cái đầu câu, không viết hoa đại từ "I", hoặc quên dấu chấm/dấu hỏi ở cuối câu.',
  ],
  summary: 'Thêm -s (hoặc -es sau ch, sh, s, x) để tạo danh từ số nhiều. Viết hoa đầu câu và tên riêng, kết thúc bằng dấu chấm (.) hoặc dấu hỏi (?).',
  exercises: [
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q1',
      kind: 'choice',
      prompt: 'Dạng số nhiều đúng của từ "apple" là gì?',
      options: [
        { text: 'apples', correct: true, rationale: 'apple thêm -s tạo thành danh từ số nhiều apples.' },
        { text: 'applees', correct: false, rationale: 'Không thêm -es vì tận cùng đã có e.' },
        { text: 'applese', correct: false, rationale: 'Sai quy tắc chính tả.' },
      ],
      acceptedAnswers: [{ text: 'apples', rationale: 'apples là dạng số nhiều chính xác.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q2',
      kind: 'choice',
      prompt: 'Dạng số nhiều đúng của từ "box" (cái hộp) là gì?',
      options: [
        { text: 'boxes', correct: true, rationale: 'Từ tận cùng bằng -x thêm -es tạo thành boxes.' },
        { text: 'boxs', correct: false, rationale: 'Sau x phải thêm -es, không chỉ thêm s.' },
        { text: 'boxies', correct: false, rationale: 'Sai quy tắc biến đổi.' },
      ],
      acceptedAnswers: [{ text: 'boxes', rationale: 'boxes là dạng số nhiều của box.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q3',
      kind: 'choice',
      prompt: 'Chọn câu có hình thức viết hoa tên riêng và đặt dấu câu chuẩn xác:',
      options: [
        { text: 'Peter has three books.', correct: true, rationale: 'Viết hoa tên riêng Peter đầu câu, danh từ số nhiều books và có dấu chấm cuối câu.' },
        { text: 'has Peter three books', correct: false, rationale: 'Đưa động từ lên đầu câu trần thuật và thiếu dấu chấm kết thúc câu.' },
        { text: 'Three book Peter has', correct: false, rationale: 'Trật tự từ sai và thiếu dấu kết thúc câu.' },
      ],
      acceptedAnswers: [{ text: 'Peter has three books.', rationale: 'Peter has three books. đúng toàn bộ quy tắc viết hoa, ngữ pháp và dấu câu.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q4',
      kind: 'choice',
      prompt: 'Dấu câu nào phù hợp nhất để kết thúc câu "Where is the cat___"?',
      options: [
        { text: 'Dấu chấm hỏi (?)', correct: true, rationale: 'Where is the cat là câu hỏi nên kết thúc bằng dấu chấm hỏi (?).' },
        { text: 'Dấu chấm (.)', correct: false, rationale: 'Dấu chấm dùng cho câu trần thuật.' },
        { text: 'Dấu phẩy (,)', correct: false, rationale: 'Dấu phẩy không dùng để kết thúc câu.' },
      ],
      acceptedAnswers: [{ text: 'Dấu chấm hỏi (?)', rationale: 'Dấu chấm hỏi dùng kết thúc câu nghi vấn.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q5',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của "dog" vào chỗ trống: "There are four ___ in the park."',
      options: [],
      acceptedAnswers: [{ text: 'dogs', rationale: 'dog thêm -s tạo thành danh từ số nhiều dogs.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q6',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của "watch" (đồng hồ) vào chỗ trống: "She has two beautiful ___."',
      options: [],
      acceptedAnswers: [{ text: 'watches', rationale: 'watch tận cùng bằng -ch nên thêm -es thành watches.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q7',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của "bus" vào chỗ trống: "Three yellow ___ are coming."',
      options: [],
      acceptedAnswers: [{ text: 'buses', rationale: 'bus tận cùng bằng -s nên thêm -es thành buses.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q8',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của "pen" vào chỗ trống: "I need two black ___."',
      options: [],
      acceptedAnswers: [{ text: 'pens', rationale: 'pen thêm -s thành pens.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q9',
      kind: 'transform',
      prompt: 'Viết lại cụm từ số ít "one glass" sang dạng số nhiều với số lượng 2 (viết đầy đủ cả cụm):',
      options: [],
      acceptedAnswers: [
        { text: 'two glasses', rationale: 'glass tận cùng bằng -ss nên thêm -es thành glasses.' },
        { text: 'glasses', rationale: 'glass tận cùng bằng -ss nên thêm -es thành glasses.' },
      ],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q10',
      kind: 'transform',
      prompt: 'Sửa lại toàn bộ câu sau cho đúng viết hoa và dấu câu: "tom and i play games"',
      options: [],
      acceptedAnswers: [
        { text: 'Tom and I play games.', rationale: 'Viết hoa Tom và I, thêm dấu chấm ở cuối câu.' },
      ],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi danh từ số nhiều trong câu sau: "He buys three sandwichs for lunch."',
      options: [],
      acceptedAnswers: [
        { text: 'He buys three sandwiches for lunch.', rationale: 'sandwich tận cùng bằng -ch nên thêm -es thành sandwiches.' },
      ],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu dấu câu và viết hoa trong câu hỏi sau: "are you ready"',
      options: [],
      acceptedAnswers: [
        { text: 'Are you ready?', rationale: 'Viết hoa chữ Are đầu câu và kết thúc bằng dấu chấm hỏi (?).' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-r1',
      kind: 'choice',
      prompt: 'Dạng số nhiều nào dưới đây viết sai quy tắc chính tả?',
      options: [
        { text: 'dishs', correct: true, rationale: 'dish tận cùng bằng -sh phải thêm -es (dishes), viết dishs là sai.' },
        { text: 'cats', correct: false, rationale: 'cats viết đúng.' },
        { text: 'boxes', correct: false, rationale: 'boxes viết đúng.' },
      ],
      acceptedAnswers: [{ text: 'dishs', rationale: 'dishs là dạng sai, đúng phải là dishes.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-r2',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của danh từ "class": "Our school has ten ___."',
      options: [],
      acceptedAnswers: [{ text: 'classes', rationale: 'class tận cùng bằng -ss nên thêm -es thành classes.' }],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang dạng có danh từ số nhiều "two cats": "She has one cat."',
      options: [],
      acceptedAnswers: [
        { text: 'She has two cats.', rationale: 'Chuyển one cat thành two cats.' },
      ],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi viết hoa và dấu câu trong câu: "anna lives in london"',
      options: [],
      acceptedAnswers: [
        { text: 'Anna lives in London.', rationale: 'Viết hoa Anna và London, kết thúc bằng dấu chấm (.).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-o1',
      prompt: 'Viết 1 câu tiếng Anh kể về đồ vật bạn sở hữu có số lượng từ hai trở lên (ví dụ: I have two pens / I have three books), chú ý viết hoa đầu câu và dấu chấm cuối câu.',
      modelAnswer: 'I have two pens.',
      checks: [
        'Viết hoa chữ cái đầu câu (I)',
        'Có danh từ số nhiều thêm -s hoặc -es sau số đếm (ví dụ: two pens, three books)',
        'Kết thúc câu bằng dấu chấm (.)',
      ],
    },
    {
      id: 'grammar-v2-0-plurals-and-punctuation-08-o2',
      prompt: 'Viết 1 câu hỏi tiếng Anh với "Do you like...?" hỏi về một loài động vật ở dạng số nhiều (ví dụ: Do you like cats? / Do you like dogs?), chú ý dấu hỏi ở cuối.',
      modelAnswer: 'Do you like cats?',
      checks: [
        'Bắt đầu bằng Do you like với chữ D viết hoa',
        'Danh từ chỉ con vật ở dạng số nhiều (cats, dogs, birds)',
        'Kết thúc bằng dấu hỏi chấm (?)',
      ],
    },
  ],
  sources: [
    {
      "id": "plural",
      "title": "British Council: Count nouns",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/count-nouns",
      "claims": [
        "Count nouns have singular and plural forms; regular plural spelling and common irregular forms are distinguished."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    },
    {
      "id": "capitals",
      "title": "Purdue OWL: Help with Capitals",
      "url": "https://owl.purdue.edu/owl/general_writing/mechanics/help_with_capitals.html",
      "claims": [
        "Sentence beginnings, the pronoun I and proper names use capital letters."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    },
    {
      "id": "punctuation",
      "title": "Purdue OWL: Brief Overview of Punctuation",
      "url": "https://owl.purdue.edu/owl/general_writing/punctuation/punctuation/index.html",
      "claims": [
        "Punctuation marks structure written sentences; a period can separate independent clauses."
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
