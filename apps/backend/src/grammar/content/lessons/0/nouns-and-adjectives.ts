/**
 * @file nouns-and-adjectives.ts
 * @description Lesson: Danh từ và tính từ miêu tả (nouns-and-adjectives).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-nouns-and-adjectives-02',
  revisionId: 'grammar-v2-0-nouns-and-adjectives-02@1.0.0',
  revision: '1.0.0',
  title: 'Danh từ và tính từ miêu tả',
  objective: 'Nắm vững trật tự tính từ đứng trước danh từ và vị trí tính từ đứng sau động từ to be để miêu tả đặc điểm người hoặc vật.',
  prerequisiteIds: ['grammar-v2-0-word-roles-01'],
  coverage: ['nouns-and-adjectives', 'nouns', 'adjectives', 'word-order', 'be-complements'],
  context: {
    english: 'Lan has an old bike. Her bike is blue. Today she sees a new car on the street.',
    vietnamese: 'Lan có một chiếc xe đạp cũ. Xe đạp của cô ấy màu xanh lam. Hôm nay cô ấy nhìn thấy một chiếc xe hơi mới trên phố.',
  },
  guide: {
    pattern: 'Adjective + Noun (cụm danh từ: a blue bike) HOẶC Noun + be + Adjective (vị ngữ: The bike is blue)',
    whenToUse: [
      'Miêu tả tính chất, màu sắc, kích cỡ của người hoặc đồ vật.',
      'Đặt tính từ trước danh từ khi làm định ngữ, hoặc sau to be (am/is/are) khi làm vị ngữ.',
    ],
    signalWords: [
      'Size/Age: big, small, old, new, young, tall',
      'Color: red, blue, green, yellow, black, white',
      'Quality: good, bad, clean, warm, cold, nice',
    ],
    check: [
      'Tính từ có đứng ngay TRƯỚC danh từ không (ví dụ "a red apple", không nói "an apple red")?',
      'Khi tính từ đứng sau danh từ, đã có động từ nối "is/are" ở giữa chưa?',
    ],
  },
  explanation: 'Trong tiếng Việt, ta thường đặt danh từ trước rồi đến tính từ ("áo đỏ", "xe mới"). Nhưng trong tiếng Anh, hai vị trí phổ biến của tính từ là:\n1. Đứng trước danh từ: Tính từ bổ nghĩa luôn đứng trước danh từ chính (ví dụ: a new car = một chiếc xe mới; cold water = nước lạnh).\n2. Đứng sau động từ to be: Khi vị ngữ khẳng định đặc điểm của chủ thể, tính từ đứng sau am/is/are (ví dụ: The car is new = Chiếc xe thì mới).\nLưu ý quan trọng: Tính từ trong tiếng Anh không bao giờ thêm đuôi số nhiều -s dù danh từ phía sau là số nhiều (ví dụ: "two small cats", không viết "two smalls cats").',
  examples: [
    { english: 'She wears a red hat.', vietnamese: 'Cô ấy đội một chiếc mũ đỏ. ("red" đứng trước danh từ "hat".)' },
    { english: 'The hat is red.', vietnamese: 'Chiếc mũ màu đỏ. ("red" đứng sau động từ to be "is".)' },
    { english: 'We live in a small house.', vietnamese: 'Chúng tôi sống trong một ngôi nhà nhỏ. ("small" bổ nghĩa cho "house".)' },
    { english: 'The house is small.', vietnamese: 'Ngôi nhà thì nhỏ. ("small" làm vị ngữ sau "is".)' },
    { english: 'They drink cold water.', vietnamese: 'Họ uống nước lạnh. ("cold" đứng trước danh từ "water".)' },
    { english: 'This story is interesting.', vietnamese: 'Câu chuyện này thú vị. ("interesting" đứng sau to be "is".)' },
  ],
  contrasts: [
    {
      form: 'He has a black cat.',
      whyFits: 'black là tính từ miêu tả màu lông đứng ngay trước danh từ cat.',
      whyNot: 'Viết "He has a cat black" áp dụng sai trật tự từ tiếng Việt vào tiếng Anh.',
    },
    {
      form: 'The soup is hot.',
      whyFits: 'Động từ to be is kết nối chủ ngữ The soup với tính từ trạng thái hot.',
      whyNot: 'Viết "The soup hot" thiếu động từ vị ngữ, chưa thành một câu hoàn chỉnh.',
    },
  ],
  commonMistakes: [
    'Đặt tính từ sau danh từ theo thói quen tiếng Việt (viết "a phone new" thay vì "a new phone").',
    'Bỏ sót động từ to be khi tính từ làm vị ngữ (viết "My sister tall" thay vì "My sister is tall").',
    'Thêm đuôi số nhiều -s vào tính từ khi bổ nghĩa cho danh từ số nhiều (viết "smalls dogs" thay vì "small dogs").',
  ],
  summary: 'Tính từ đứng trước danh từ (a nice day) hoặc đứng sau động từ to be (the day is nice). Tính từ không bao giờ thêm -s.',
  exercises: [
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q1',
      kind: 'choice',
      prompt: 'Chọn cụm từ viết đúng trật tự để nói "một quyển sách hay":',
      options: [
        { text: 'a good book', correct: true, rationale: 'Tính từ good phải đứng trước danh từ book.' },
        { text: 'a book good', correct: false, rationale: 'Không đặt tính từ sau danh từ theo trật tự này.' },
        { text: 'good a book', correct: false, rationale: 'Mạo từ a phải đứng trước tính từ và danh từ.' },
      ],
      acceptedAnswers: [{ text: 'a good book', rationale: 'a good book là cụm danh từ đúng chuẩn.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q2',
      kind: 'choice',
      prompt: 'Điền từ thích hợp vào chỗ trống: "My teacher is ___."',
      options: [
        { text: 'kind', correct: true, rationale: 'kind là tính từ đứng sau is để miêu tả tính cách tốt bụng.' },
        { text: 'kindly person', correct: false, rationale: 'Thiếu mạo từ a nếu dùng cụm danh từ.' },
        { text: 'a kind', correct: false, rationale: 'Không dùng mạo từ a trước tính từ đứng một mình.' },
      ],
      acceptedAnswers: [{ text: 'kind', rationale: 'kind là tính từ thích hợp đứng sau động từ to be is.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q3',
      kind: 'choice',
      prompt: 'Câu nào dưới đây đúng ngữ pháp tiếng Anh?',
      options: [
        { text: 'They bought an expensive car.', correct: true, rationale: 'expensive đứng trước danh từ car và dùng mạo từ an hợp lý.' },
        { text: 'They bought a car expensive.', correct: false, rationale: 'Tính từ expensive không đứng sau danh từ car.' },
        { text: 'They bought expensives cars.', correct: false, rationale: 'Tính từ không bao giờ thêm đuôi số nhiều -s.' },
      ],
      acceptedAnswers: [{ text: 'They bought an expensive car.', rationale: 'Câu dùng đúng trật tự tính từ trước danh từ.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q4',
      kind: 'choice',
      prompt: 'Chọn câu diễn đạt đúng về nhiệt độ của cốc cà phê:',
      options: [
        { text: 'The coffee is hot.', correct: true, rationale: 'Chủ ngữ + is + tính từ miêu tả hot.' },
        { text: 'The coffee hot.', correct: false, rationale: 'Câu thiếu động từ to be is.' },
        { text: 'The hot is coffee.', correct: false, rationale: 'Đảo lộn sai vị trí danh từ và tính từ.' },
      ],
      acceptedAnswers: [{ text: 'The coffee is hot.', rationale: 'The coffee is hot có đủ chủ ngữ, to be và tính từ.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q5',
      kind: 'gap',
      prompt: 'Điền tính từ "blue" vào chỗ trống để tạo cụm đúng: "Nam has a ___ shirt."',
      options: [],
      acceptedAnswers: [{ text: 'blue', rationale: 'Tính từ chỉ màu sắc blue đứng trước danh từ shirt.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q6',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào chỗ trống: "The little dog ___ friendly."',
      options: [],
      acceptedAnswers: [{ text: 'is', rationale: 'Chủ ngữ The little dog là số ít nên đi với động từ to be is.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q7',
      kind: 'gap',
      prompt: 'Điền tính từ miêu tả sức nặng "heavy" vào chỗ trống trước danh từ số nhiều: "She carried two ___ boxes."',
      options: [],
      acceptedAnswers: [{ text: 'heavy', rationale: 'Tính từ heavy không thêm s dù đi kèm danh từ số nhiều boxes.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q8',
      kind: 'gap',
      prompt: 'Điền tính từ miêu tả nhiệt độ lạnh vào chỗ trống: "Ice is very ___."',
      options: [],
      acceptedAnswers: [{ text: 'cold', rationale: 'cold là tính từ đứng sau to be is miêu tả tính chất của đá.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q9',
      kind: 'transform',
      prompt: 'Viết lại cả câu hoàn chỉnh khi chuyển tính từ lên trước danh từ: "The room is big." -> bắt đầu bằng "It is a..."',
      options: [],
      acceptedAnswers: [
        { text: 'It is a big room.', rationale: 'Đưa tính từ big lên trước danh từ room.' },
      ],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q10',
      kind: 'transform',
      prompt: 'Viết lại cả câu hoàn chỉnh sang cấu trúc dùng to be: "She has a white cat." -> bắt đầu bằng "Her cat..."',
      options: [],
      acceptedAnswers: [
        { text: 'Her cat is white.', rationale: 'white đứng sau to be is để bổ nghĩa cho chủ ngữ Her cat.' },
      ],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi vị trí tính từ trong câu sau: "I see a bird yellow in the tree."',
      options: [],
      acceptedAnswers: [
        { text: 'I see a yellow bird in the tree.', rationale: 'Tính từ yellow phải đứng trước danh từ bird.' },
      ],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi tính từ trong câu sau: "Those flowers are beautifuls."',
      options: [],
      acceptedAnswers: [
        { text: 'Those flowers are beautiful.', rationale: 'Bỏ đuôi s ở tính từ beautiful vì tính từ không có hình thái số nhiều.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-r1',
      kind: 'choice',
      prompt: 'Cụm từ nào dưới đây có trật tự đúng chuẩn tiếng Anh?',
      options: [
        { text: 'a warm jacket', correct: true, rationale: 'Tính từ warm đứng trước danh từ jacket.' },
        { text: 'a jacket warm', correct: false, rationale: 'Sai trật tự danh từ - tính từ.' },
        { text: 'warm jacket a', correct: false, rationale: 'Mạo từ a phải đứng trước tính từ.' },
      ],
      acceptedAnswers: [{ text: 'a warm jacket', rationale: 'a warm jacket tuân theo trật tự mạo từ + tính từ + danh từ.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-r2',
      kind: 'gap',
      prompt: 'Điền tính từ "tall" vào chỗ trống để hoàn thành câu: "Minh is a ___ boy."',
      options: [],
      acceptedAnswers: [{ text: 'tall', rationale: 'tall là tính từ đứng trước danh từ boy để miêu tả chiều cao.' }],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-r3',
      kind: 'transform',
      prompt: 'Viết lại cả câu hoàn chỉnh bắt đầu bằng "It is an...": "The test is easy."',
      options: [],
      acceptedAnswers: [
        { text: 'It is an easy test.', rationale: 'Đưa tính từ easy lên trước test; dùng mạo từ an trước nguyên âm e.' },
      ],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu động từ trong câu sau: "This tea sweet."',
      options: [],
      acceptedAnswers: [
        { text: 'This tea is sweet.', rationale: 'Cần động từ to be is nối chủ ngữ This tea với tính từ sweet.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-o1',
      prompt: 'Viết 1 câu miêu tả nơi ở hoặc phòng của bạn sử dụng tính từ đứng trước danh từ (ví dụ: I have a small room / We live in a quiet street).',
      modelAnswer: 'I have a small room.',
      checks: [
        'Có tính từ miêu tả (ví dụ: small, quiet, clean, big)',
        'Tính từ đứng ngay trước danh từ (ví dụ: small room, big house)',
        'Câu hoàn chỉnh ngữ pháp có chủ ngữ và vị ngữ',
      ],
    },
    {
      id: 'grammar-v2-0-nouns-and-adjectives-02-o2',
      prompt: 'Viết 1 câu miêu tả thời tiết hoặc đồ vật theo cấu trúc "Chủ ngữ + is + tính từ" (ví dụ: The weather is cold / My phone is new).',
      modelAnswer: 'The weather is cold.',
      checks: [
        'Chủ ngữ số ít đi với động từ to be is',
        'Vị ngữ kết thúc bằng một tính từ miêu tả đặc điểm',
        'Không đặt thêm danh từ thừa sau tính từ trong mẫu câu này',
      ],
    },
  ],
  sources: [
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
