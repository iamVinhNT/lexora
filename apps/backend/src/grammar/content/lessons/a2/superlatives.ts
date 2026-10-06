/**
 * @file superlatives.ts
 * @description A2 lesson on superlative adjectives and adverbs.
 */
import type { GrammarLesson } from '../../types.js';

const superlativesLesson: GrammarLesson = {
  id: 'grammar-v2-a2-superlatives-18',
  revisionId: 'grammar-v2-a2-superlatives-18@1.0.0',
  revision: '1.0.0',
  title: 'So sánh nhất của tính từ và trạng từ (Superlative Adjectives and Adverbs)',
  objective: 'Nhận biết, cấu tạo và sử dụng chính xác dạng so sánh nhất với tính từ ngắn (the -est), tính từ dài (the most) và các dạng bất quy tắc (the best, the worst, the farthest).',
  prerequisiteIds: ['grammar-v2-a2-comparatives-17'],
  coverage: ['superlatives', 'comparison', 'short-adjectives', 'long-adjectives', 'irregular-superlatives'],
  context: {
    english: 'We use superlative adjectives and adverbs to compare one person, object, or action against a whole group of three or more, identifying the highest or lowest degree.',
    vietnamese: 'Chúng ta sử dụng tính từ và trạng từ so sánh nhất để so sánh một người, sự vật hoặc hành động với một tập thể từ ba đối tượng trở lên, nhằm chỉ ra đối tượng có mức độ cao nhất hoặc vượt trội nhất.',
  },
  guide: {
    pattern: 'the + short adj/adv + -est | the most + long adj/adv | the least + adj | irregular (the best / the worst / the farthest)',
    whenToUse: [
      'Dùng so sánh nhất để nêu mức cao nhất/thấp nhất trong một nhóm; khi chỉ so sánh hai đối tượng, dạng so sánh hơn thường được ưu tiên.',
      'Tính từ ngắn (1 âm tiết, hoặc 2 âm tiết đuôi -y): the + adj + -est (the tallest, the easiest, the fastest).',
      'Tính từ dài thường dùng the most + adjective (the most modern, the most difficult); cách dùng với tính từ hai âm tiết có thể thay đổi theo từ.',
      'Các trường hợp bất quy tắc: good/well -> the best; bad/badly -> the worst; far -> the farthest / the furthest.',
    ],
    signalWords: ['the most', '-est', 'the best', 'the worst', 'in the world', 'of all', 'ever', 'in my class', 'by far'],
    check: [
      'Tính từ so sánh nhất thường có the ở trước; không dùng the sau từ sở hữu (my best friend). Với trạng từ so sánh nhất, the có thể thay đổi theo cấu trúc.',
      'Tính từ đuôi -y đã đổi thành -iest chưa (busy -> the busiest)?',
      'Tính từ có 1 nguyên âm đơn kẹp giữa 2 phụ âm đã gấp đôi phụ âm cuối chưa (big -> the biggest, hot -> the hottest)?',
      'Tránh dùng đồng thời cả "the most" và đuôi "-est" (không viết "the most fastest").',
      'Dùng giới từ "in" cho tập hợp/địa điểm (in the class, in town) và "of" cho khoảng thời gian hoặc danh sách (of the year, of all).',
    ],
  },
  explanation: 'So sánh nhất (Superlatives) dùng để nêu mức cao nhất hoặc thấp nhất của một người, vật hay hành động trong nhóm. Khi so sánh hai đối tượng, dạng so sánh hơn thường được ưu tiên. Công thức chung thường có the trước tính từ/trạng từ so sánh nhất, nhưng từ sở hữu hoặc một số cấu trúc khác có thể thay vị trí the. Tính từ một âm tiết thường thêm -est (cheap -> the cheapest, old -> the oldest); nếu tận cùng là phụ âm sau một nguyên âm đơn, thường gấp đôi phụ âm cuối (big -> the biggest, hot -> the hottest). Nhiều tính từ hai âm tiết tận cùng bằng -y đổi thành -iest (happy -> the happiest); tính từ dài thường dùng the most (the most beautiful, the most expensive). Dạng bất quy tắc phổ biến gồm good/well -> the best, bad/badly -> the worst, far -> the farthest/furthest.',
  examples: [
    {
      english: 'Mount Everest is the highest mountain in the world.',
      vietnamese: 'Đỉnh Everest là ngọn núi cao nhất trên thế giới.',
    },
    {
      english: 'Tokyo is one of the most crowded cities in Asia.',
      vietnamese: 'Tokyo là một trong những thành phố đông đúc nhất châu Á.',
    },
    {
      english: 'This is the best cup of coffee I have ever tasted.',
      vietnamese: 'Đây là tách cà phê ngon nhất mà tôi từng nếm thử.',
    },
    {
      english: 'Yesterday was the hottest day of the entire summer.',
      vietnamese: 'Hôm qua là ngày nóng nhất trong toàn bộ mùa hè.',
    },
    {
      english: 'Which student ran the fastest in the school competition?',
      vietnamese: 'Học sinh nào đã chạy nhanh nhất trong cuộc thi của trường?',
    },
    {
      english: 'That was the worst hotel room we have ever stayed in.',
      vietnamese: 'Đó là căn phòng khách sạn tồi tệ nhất mà chúng tôi từng ở.',
    },
  ],
  contrasts: [
    {
      form: 'Ha Long Bay is the most famous tourist destination in northern Vietnam.',
      whyFits: 'Famous thường dùng the most famous khi so sánh nhất.',
      whyNot: 'The most famous là dạng thông dụng; famousest không phải dạng chuẩn trong cách dùng này.',
    },
    {
      form: 'Minh is the tallest student in our secondary school class.',
      whyFits: 'So sánh Minh với toàn bộ tập thể lớp (nhiều hơn 2 người), dùng so sánh nhất the tallest.',
      whyNot: 'Taller than dùng để so sánh hai đối tượng; trong ví dụ này, the tallest nêu học sinh cao nhất trong lớp.',
    },
  ],
  commonMistakes: [
    'Quên mạo từ "the" trước dạng so sánh nhất (viết "He is tallest boy" thay vì "He is the tallest boy").',
    'Dùng thừa cả "the most" lẫn đuôi "-est" (viết "the most easiest" thay vì "the easiest").',
    'Dùng nhầm giới từ "of" thay vì "in" khi chỉ địa điểm hoặc tổ chức (viết "the biggest city of Vietnam" thay vì "in Vietnam").',
  ],
  summary: 'So sánh nhất dùng "the + adj-est" cho tính từ ngắn và "the most + adj" cho tính từ dài để chỉ đối tượng đứng đầu nhóm. Good -> the best, bad -> the worst. Dùng "in" cho nơi chốn/nhóm và "of" cho khoảng thời gian.',
  exercises: [
    {
      id: 'grammar-v2-a2-superlatives-18-q1',
      kind: 'choice',
      prompt: 'Choose the correct superlative form: "Russia is ___ country in the world by land area."',
      options: [
        { text: 'the largest', correct: true, rationale: 'Large là tính từ ngắn 1 âm tiết, thêm đuôi -st kèm mạo từ the: the largest.' },
        { text: 'the most large', correct: false, rationale: 'Tính từ ngắn không dùng the most.' },
        { text: 'largest', correct: false, rationale: 'Thiếu mạo từ the trước dạng so sánh nhất.' },
        { text: 'the larger', correct: false, rationale: 'The larger là so sánh hơn, không dùng khi so sánh với toàn thế giới.' },
      ],
      acceptedAnswers: [{ text: 'the largest', rationale: 'Large is a short adjective requiring the + -st.' }],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q2',
      kind: 'choice',
      prompt: 'Select the right form: "This modern laptop is ___ device in the whole computer shop."',
      options: [
        { text: 'the most expensive', correct: true, rationale: 'Expensive là tính từ dài (3 âm tiết), bắt buộc dùng the most expensive.' },
        { text: 'the expensivest', correct: false, rationale: 'Tính từ dài không thêm đuôi -est.' },
        { text: 'most expensive', correct: false, rationale: 'Thiếu mạo từ the trong cấu trúc so sánh nhất.' },
        { text: 'more expensive', correct: false, rationale: 'More expensive là so sánh hơn giữa hai vật, không dùng cho toàn cửa hàng.' },
      ],
      acceptedAnswers: [{ text: 'the most expensive', rationale: 'Expensive is a three-syllable adjective requiring the most.' }],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q3',
      kind: 'choice',
      prompt: 'Choose the correct irregular superlative: "That was ___ presentation of the entire conference."',
      options: [
        { text: 'the best', correct: true, rationale: 'Good biến đổi bất quy tắc thành the best trong so sánh nhất.' },
        { text: 'the goodest', correct: false, rationale: 'Goodest không tồn tại trong tiếng Anh chuẩn.' },
        { text: 'the most good', correct: false, rationale: 'Good không kết hợp với the most.' },
        { text: 'the better', correct: false, rationale: 'Better là so sánh hơn, không dùng cho toàn bộ hội nghị.' },
      ],
      acceptedAnswers: [{ text: 'the best', rationale: 'Good changes irregularly to the best in superlative form.' }],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q4',
      kind: 'choice',
      prompt: 'Choose the correct preposition and form: "July is usually ___ month of the year in Hanoi."',
      options: [
        { text: 'the hottest', correct: true, rationale: 'Hot là tính từ ngắn có 1 nguyên âm kẹp giữa 2 phụ âm, gấp đôi phụ âm t thành the hottest.' },
        { text: 'the hotest', correct: false, rationale: 'Sai quy tắc chính tả vì chưa gấp đôi phụ âm t.' },
        { text: 'the most hot', correct: false, rationale: 'Hot là tính từ 1 âm tiết, không dùng the most.' },
        { text: 'hottest', correct: false, rationale: 'Thiếu mạo từ the trước dạng so sánh nhất.' },
      ],
      acceptedAnswers: [{ text: 'the hottest', rationale: 'Hot doubles its final consonant before -est: the hottest.' }],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with the superlative form of "busy": "Monday is _____ day of the week at our medical clinic."',
      options: [],
      acceptedAnswers: [
        { text: 'the busiest', rationale: 'Busy ends in -y, changing to -iest with the definite article: the busiest.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the superlative form of "bad": "That was _____ movie we have watched this year."',
      options: [],
      acceptedAnswers: [
        { text: 'the worst', rationale: 'Bad changes irregularly to the worst in superlative form.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the superlative form of "popular": "Football is _____ sport in the entire nation."',
      options: [],
      acceptedAnswers: [
        { text: 'the most popular', rationale: 'Popular is a long adjective requiring the most popular.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with the superlative form of "fast": "The cheetah is _____ land animal on Earth."',
      options: [],
      acceptedAnswers: [
        { text: 'the fastest', rationale: 'Fast is a short adjective requiring the fastest.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q9',
      kind: 'transform',
      prompt: 'Rewrite using a superlative adjective: "No other student in the class is taller than Nam."',
      options: [],
      acceptedAnswers: [
        { text: 'Nam is the tallest student in the class.', rationale: 'Rewrites comparative expression into superlative the tallest student in the class.' },
        { text: "Nam is the tallest student in class.", rationale: 'Variation omitting article before class is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q10',
      kind: 'transform',
      prompt: 'Rewrite using "the most interesting": "All the other books in the library are less interesting than this novel."',
      options: [],
      acceptedAnswers: [
        { text: 'This novel is the most interesting book in the library.', rationale: 'Rewrites comparison to state that this novel is the most interesting.' },
        { text: "This is the most interesting book in the library.", rationale: 'Concise variation using This as subject pronoun is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "She is the most smartest girl in our study group."',
      options: [],
      acceptedAnswers: [
        { text: 'She is the smartest girl in our study group.', rationale: 'Removes the redundant most before the short superlative smartest.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Da Nang is one of peacefulest cities in Vietnam."',
      options: [],
      acceptedAnswers: [
        { text: 'Da Nang is one of the most peaceful cities in Vietnam.', rationale: 'Replaces peacefulest with the most peaceful and adds the article the.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-superlatives-18-r1',
      kind: 'choice',
      prompt: 'Choose the correct superlative: "Which member of your team solved the problem ___?"',
      options: [
        { text: 'the most quickly', correct: true, rationale: 'Quickly là trạng từ hai âm tiết đuôi -ly, dùng the most quickly.' },
        { text: 'the quickliest', correct: false, rationale: 'Trạng từ kết thúc bằng -ly không thêm đuôi -est.' },
        { text: 'more quickly', correct: false, rationale: 'More quickly là dạng so sánh hơn, không phải so sánh nhất của cả nhóm.' },
      ],
      acceptedAnswers: [{ text: 'the most quickly', rationale: 'Adverbs ending in -ly form superlatives with the most.' }],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the superlative form of "far": "Neptune is _____ planet from the sun in our solar system."',
      options: [],
      acceptedAnswers: [
        { text: 'the farthest', rationale: 'Far changes irregularly to the farthest for physical distance.' },
        { text: 'the furthest', rationale: 'The furthest is equally accepted for distance.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-r3',
      kind: 'transform',
      prompt: 'Rewrite using "the cheapest": "All the other hotels in the resort town are more expensive than the Blue Wave Hotel."',
      options: [],
      acceptedAnswers: [
        { text: 'The Blue Wave Hotel is the cheapest hotel in the resort town.', rationale: 'Converts comparison into superlative the cheapest hotel.' },
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-r4',
      kind: 'correction',
      prompt: 'Correct the error: "This building is the taller structure in our entire neighborhood."',
      options: [],
      acceptedAnswers: [
        { text: 'This building is the tallest structure in our entire neighborhood.', rationale: 'Changes comparative taller to superlative tallest for comparing within the entire neighborhood.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-superlatives-18-o1',
      prompt: 'Viết 2 câu miêu tả địa điểm bạn yêu thích, sử dụng một tính từ so sánh nhất ngắn (the cleanest / the coolest / the highest) và một tính từ dài (the most beautiful / the most famous).',
      modelAnswer: 'Phu Quoc has the cleanest beaches in southern Vietnam. In my opinion, sunset at Sunset Sanato is the most beautiful moment of the trip.',
      checks: [
        'Sử dụng đúng mạo từ the kèm tính từ ngắn đuôi -est (the cleanest).',
        'Sử dụng đúng the most đi kèm tính từ dài (the most beautiful).',
        'Có cụm giới từ chỉ phạm vi (in southern Vietnam, of the trip).',
      ],
    },
    {
      id: 'grammar-v2-a2-superlatives-18-o2',
      prompt: 'Viết 2 câu nhận xét về lớp học hoặc câu lạc bộ của bạn, dùng ít nhất một dạng bất quy tắc (the best / the worst) và một tính từ chỉ phẩm chất (friendly / hard-working).',
      modelAnswer: 'Linh is the best English speaker in our conversation club. She is also the most hard-working member during weekend sessions.',
      checks: [
        'Dùng đúng dạng bất quy tắc the best hoặc the worst.',
        'Dùng đúng so sánh nhất với the most hoặc đuôi -est.',
        'Ngữ pháp chuẩn xác, câu văn tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-superlatives',
      title: 'British Council: Superlative adjectives',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/superlative-adjectives',
      claims: [
        'Superlative adjectives compare one person or thing against a whole group.',
        'Many longer adjectives use the most; one-syllable adjectives and many two-syllable adjectives ending in -y take -est, and some two-syllable forms vary by adjective.',
        'Irregular superlative forms include good to the best, bad to the worst, and far to the farthest/furthest.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit east',
    reviewedAt: '2026-10-06T05:55:07.025Z',
  },
};

export default superlativesLesson;
