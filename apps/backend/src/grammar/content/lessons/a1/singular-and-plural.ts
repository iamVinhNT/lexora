/**
 * @file singular-and-plural.ts
 * @description A1 singular-and-plural lesson definition: regular plural forms (-s, -es, -ies, -ves).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-singular-and-plural-09',
  revisionId: 'grammar-v2-a1-singular-and-plural-09@1.0.0',
  revision: '1.0.0',
  title: 'Danh từ số ít và số nhiều có quy tắc: -s, -es, -ies, -ves',
  objective: 'Nhận diện và biến đổi danh từ số ít sang số nhiều theo quy tắc chính tả thông dụng; lưu ý một số danh từ tận cùng -f/-fe có dạng riêng.',
  prerequisiteIds: ['grammar-v2-a1-possessive-pronouns-08'],
  coverage: ['singular-and-plural', 'nouns', 'morphology'],
  context: {
    english: 'There are two buses at the station. Minh buys three boxes of pencils and four oranges for his art class.',
    vietnamese: 'Có hai chiếc xe buýt ở nhà ga. Minh mua ba hộp bút chì và bốn quả cam cho lớp học mỹ thuật của mình.',
  },
  guide: {
    pattern: 'Hầu hết danh từ: + -s | Đuôi -s, -ss, -sh, -ch, -x: + -es | Phụ âm + y: -y -> -ies | Nguyên âm + y: + -s | Một số danh từ đuôi -f/-fe: -> -ves',
    whenToUse: [
      'Chuyển đổi danh từ từ số ít (chỉ một đối tượng) sang số nhiều (từ hai đối tượng trở lên)',
      'Áp dụng quy tắc chính tả chuẩn xác dựa trên chữ cái kết thúc của danh từ',
      'Đảm bảo sự hòa hợp giữa chủ ngữ số nhiều và động từ (plural verb agreement)',
    ],
    signalWords: ['two', 'three', 'many', 'some', 'several', 'a lot of', 'these', 'those'],
    check: [
      'Hầu hết danh từ chỉ cần thêm -s: book -> books, apple -> apples, cup -> cups',
      'Danh từ tận cùng bằng -s, -ss, -sh, -ch, -x thường thêm -es (bus -> buses, box -> boxes, watch -> watches); một số từ vay mượn có chính tả riêng.',
      'Phụ âm + y: đổi y thành -ies (city -> cities, party -> parties, baby -> babies)',
      'Nguyên âm (a, e, o, u) + y: chỉ thêm -s (day -> days, key -> keys, boy -> boys)',
      'Một số danh từ tận cùng -f/-fe đổi thành -ves (shelf -> shelves, knife -> knives, leaf -> leaves); nhiều từ khác chỉ thêm -s (roof -> roofs, chief -> chiefs)',
    ],
  },
  explanation: 'Trong tiếng Anh, danh từ đếm được có hai hình thức: số ít (singular - chỉ một người, một vật) và số nhiều (plural - từ hai người hoặc hai vật trở lên). Khi chuyển sang số nhiều có quy tắc, người học cần chú ý các quy tắc chính tả sau:\n1. Quy tắc thông thường: Thêm đuôi "-s" vào sau hầu hết các danh từ (ví dụ: cat -> cats, pen -> pens, student -> students).\n2. Danh từ kết thúc bằng các âm xuýt (-s, -ss, -sh, -ch, -x): Thêm đuôi "-es" để dễ phát âm hơn (ví dụ: bus -> buses, glass -> glasses, dish -> dishes, watch -> watches, box -> boxes).\n3. Danh từ kết thúc bằng đuôi "-y": Nếu trước "y" là một phụ âm, ta đổi "y" thành "-ies" (ví dụ: baby -> babies, story -> stories, city -> cities). Tuy nhiên, nếu trước "y" là một nguyên âm (a, e, i, o, u), ta giữ nguyên và chỉ thêm "-s" (ví dụ: day -> days, key -> keys, boy -> boys, monkey -> monkeys).\n4. Danh từ kết thúc bằng đuôi "-f" hoặc "-fe": Đa số đổi thành "-ves" (ví dụ: knife -> knives, leaf -> leaves, shelf -> shelves, wife -> wives).\nKhi danh từ ở dạng số nhiều, động từ theo sau cũng phải chia ở dạng số nhiều tương ứng (ví dụ: The boxes are heavy).',
  examples: [
    { english: 'She bought two books and three pens at the store.', vietnamese: 'Cô ấy đã mua hai cuốn sách và ba cây bút ở cửa hàng. (Thêm -s thông thường).' },
    { english: 'There are four buses waiting outside the school.', vietnamese: 'Có bốn chiếc xe buýt đang đợi bên ngoài trường học. (bus kết thúc bằng -s nên thêm -es).' },
    { english: 'My father washes the dishes and glasses after dinner.', vietnamese: 'Bố tôi rửa bát đĩa và cốc chén sau bữa tối. (dish và glass thêm -es).' },
    { english: 'Many big cities have clean parks and modern hospitals.', vietnamese: 'Nhiều thành phố lớn có công viên sạch sẽ và bệnh viện hiện đại. (city đổi y thành -ies).' },
    { english: 'The boys play with their colorful toys every Sunday.', vietnamese: 'Những cậu bé chơi với đồ chơi nhiều màu sắc vào mỗi Chủ Nhật. (boy và toy có nguyên âm trước y nên chỉ thêm -s).' },
    { english: 'Please put the plates on the wooden shelves.', vietnamese: 'Làm ơn hãy đặt những chiếc đĩa lên các kệ gỗ. (shelf đổi -f thành -ves).' },
  ],
  contrasts: [
    {
      form: 'city -> cities vs day -> days',
      whyFits: 'city có phụ âm "t" đứng trước "y" nên đổi thành -ies; day có nguyên âm "a" đứng trước "y" nên chỉ thêm -s.',
      whyNot: 'Viết "daies" hoặc "partys" là sai quy tắc chính tả căn bản của tiếng Anh.',
    },
    {
      form: 'box -> boxes vs box -> boxs',
      whyFits: 'Từ kết thúc bằng chữ "x" bắt buộc phải thêm "-es" để tạo thành âm đọc hai âm tiết /bɒksɪz/.',
      whyNot: 'Không thể thêm "-s" đơn độc sau "x" vì không phát âm được trong tiếng Anh.',
    },
  ],
  commonMistakes: [
    'Đổi nhầm "y" thành "ies" sau nguyên âm: viết "boy -> boies" hoặc "holiday -> holidaies".',
    'Quên thêm "-es" cho danh từ kết thúc bằng âm xuýt: viết "watchs", "dishs", "boxs".',
    'Chia động từ số ít cho chủ ngữ danh từ số nhiều: nói "The keys is on the table" thay vì "The keys are on the table".',
  ],
  summary: 'Hầu hết danh từ thêm -s. Đuôi -s, -ss, -sh, -ch, -x thêm -es. Phụ âm + y đổi thành -ies; nguyên âm + y thêm -s. Một số danh từ đuôi -f/-fe đổi thành -ves; các từ khác chỉ thêm -s.',
  exercises: [
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q1',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "sandwich" là gì?',
      options: [
        { text: 'sandwiches', correct: true, rationale: 'Từ kết thúc bằng đuôi -ch nên thêm -es.' },
        { text: 'sandwichs', correct: false, rationale: 'Thiếu e trước s đối với danh từ kết thúc bằng -ch.' },
        { text: 'sandwichies', correct: false, rationale: 'Sai quy tắc biến đổi đuôi.' },
      ],
      acceptedAnswers: [{ text: 'sandwiches', rationale: 'sandwiches là dạng số nhiều đúng.' }],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q2',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "party" là gì?',
      options: [
        { text: 'parties', correct: true, rationale: 'Đứng trước y là phụ âm t nên y đổi thành -ies.' },
        { text: 'partys', correct: false, rationale: 'Chưa đổi y thành -ies sau phụ âm.' },
        { text: 'partees', correct: false, rationale: 'Sai chính tả.' },
      ],
      acceptedAnswers: [{ text: 'parties', rationale: 'parties là dạng số nhiều đúng.' }],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q3',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "holiday" là gì?',
      options: [
        { text: 'holidays', correct: true, rationale: 'Trước y là nguyên âm a nên chỉ thêm -s.' },
        { text: 'holidaies', correct: false, rationale: 'Không đổi y thành ies khi trước nó là nguyên âm.' },
        { text: 'holidayes', correct: false, rationale: 'Không thêm -es sau nguyên âm + y.' },
      ],
      acceptedAnswers: [{ text: 'holidays', rationale: 'holidays là dạng số nhiều đúng.' }],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q4',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "shelf" là gì?',
      options: [
        { text: 'shelves', correct: true, rationale: 'Danh từ kết thúc bằng -f đổi thành -ves.' },
        { text: 'shelfs', correct: false, rationale: 'Không giữ nguyên f rồi thêm s.' },
        { text: 'shelfes', correct: false, rationale: 'Sai quy tắc biến đổi.' },
      ],
      acceptedAnswers: [{ text: 'shelves', rationale: 'shelves là dạng số nhiều đúng.' }],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q5',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "My mother bought two new ___ (watch) for my brothers."',
      options: [],
      acceptedAnswers: [
        { text: 'watches', rationale: 'watch kết thúc bằng -ch nên thêm -es thành watches.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q6',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "There are three big ___ (city) in this region."',
      options: [],
      acceptedAnswers: [
        { text: 'cities', rationale: 'city đổi y thành -ies sau phụ âm t.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q7',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "We need four clean ___ (glass) for the fruit juice."',
      options: [],
      acceptedAnswers: [
        { text: 'glasses', rationale: 'glass kết thúc bằng -ss nên thêm -es.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q8',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "In autumn, yellow ___ (leaf) fall from the trees."',
      options: [],
      acceptedAnswers: [
        { text: 'leaves', rationale: 'leaf đổi -f thành -ves thành leaves.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q9',
      kind: 'transform',
      prompt: 'Chuyển danh từ trong ngoặc sang số nhiều: "He packed three (box) of books." -> "He packed three ___ of books."',
      options: [],
      acceptedAnswers: [
        { text: 'boxes', rationale: 'box kết thúc bằng -x nên thêm -es thành boxes.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q10',
      kind: 'transform',
      prompt: 'Chuyển danh từ số ít gạch chân sang số nhiều: "The baby is sleeping." -> "The ___ are sleeping."',
      options: [],
      acceptedAnswers: [
        { text: 'babies', rationale: 'baby đổi y thành -ies thành babies.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi chính tả số nhiều trong câu sau: "The cat chased two small flys in the garden."',
      options: [],
      acceptedAnswers: [
        { text: 'flies', rationale: 'fly có phụ âm l trước y nên đổi thành flies.' },
        { text: 'The cat chased two small flies in the garden.', rationale: 'Câu hoàn chỉnh sửa flys thành flies.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-q12',
      kind: 'correction',
      prompt: 'Sửa từ sai chính tả trong câu sau: "Please put the knifes on the kitchen table."',
      options: [],
      acceptedAnswers: [
        { text: 'knives', rationale: 'knife đổi đuôi -fe thành -ves thành knives.' },
        { text: 'Please put the knives on the kitchen table.', rationale: 'Câu hoàn chỉnh sửa knifes thành knives.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-singular-and-plural-09-r1',
      kind: 'choice',
      prompt: 'Chọn từ số nhiều đúng điền vào câu: "Look at those beautiful ___ in the window."',
      options: [
        { text: 'dresses', correct: true, rationale: 'dress kết thúc bằng -ss nên thêm -es.' },
        { text: 'dresss', correct: false, rationale: 'Không thể có 3 chữ s liền nhau.' },
        { text: 'dressies', correct: false, rationale: 'Sai quy tắc biến đổi.' },
      ],
      acceptedAnswers: [{ text: 'dresses', rationale: 'dresses là dạng số nhiều chuẩn.' }],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu với dạng số nhiều: "They spent five ___ (day) in Da Nang."',
      options: [],
      acceptedAnswers: [
        { text: 'days', rationale: 'day có nguyên âm a trước y nên chỉ thêm -s.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-r3',
      kind: 'transform',
      prompt: 'Chuyển danh từ số ít sang số nhiều: "The thief ran away." -> "The ___ ran away."',
      options: [],
      acceptedAnswers: [
        { text: 'thieves', rationale: 'thief đổi -f thành -ves thành thieves.' },
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi chính tả trong câu: "There are twenty familyes living in this small village."',
      options: [],
      acceptedAnswers: [
        { text: 'families', rationale: 'family đổi y thành -ies thành families.' },
        { text: 'There are twenty families living in this small village.', rationale: 'Câu hoàn chỉnh sửa familyes thành families.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-singular-and-plural-09-o1',
      prompt: 'Viết 3 câu miêu tả những đồ vật trong phòng khách hoặc lớp học của bạn, sử dụng ít nhất 3 danh từ số nhiều có quy tắc (ví dụ: boxes, watches, glasses, books).',
      modelAnswer: 'There are three wooden boxes under the desk. We also have two new clocks on the white wall. Four students are reading interesting books near the window.',
      checks: [
        'Sử dụng ít nhất 3 danh từ số nhiều có quy tắc',
        'Viết đúng chính tả đuôi -s hoặc -es',
        'Động từ hòa hợp với chủ ngữ số nhiều (There are, are reading)',
      ],
    },
    {
      id: 'grammar-v2-a1-singular-and-plural-09-o2',
      prompt: 'Viết 3 câu kể về một chuyến đi dã ngoại hoặc đi chợ của bạn, sử dụng ít nhất 2 danh từ số nhiều có đuôi -ies hoặc -ves (ví dụ: strawberries, knives, leaves, cities).',
      modelAnswer: 'Yesterday, my sister bought fresh strawberries at the local market. In the park, we saw many dry leaves falling from the tall trees. We really love spending weekends in small peaceful cities.',
      checks: [
        'Sử dụng ít nhất 2 danh từ số nhiều đuôi -ies hoặc -ves',
        'Đúng quy tắc chính tả khi biến đổi từ danh từ số ít',
        'Câu văn mạch lạc, phù hợp ngữ cảnh sinh hoạt hàng ngày',
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
