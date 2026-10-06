/**
 * @file prefer-would-rather.ts
 * @description B1 lesson on expressing general and specific preferences using prefer, would prefer, and would rather.
 */
import type { GrammarLesson } from '../../types.js';

const preferWouldRatherLesson: GrammarLesson = {
  id: 'grammar-v2-b1-prefer-would-rather-27',
  revisionId: 'grammar-v2-b1-prefer-would-rather-27@1.0.0',
  revision: '1.0.0',
  title: 'Sở thích: Prefer, Would prefer, Would rather (Prefer, Would prefer & Would rather)',
  objective: 'Biểu đạt chính xác sở thích chung và sở thích cụ thể trong tình huống thực tế bằng prefer, would prefer và would rather với các giới từ và liên từ to, than, rather than.',
  prerequisiteIds: ['grammar-v2-b1-be-get-used-to-26'],
  coverage: ['prefer-would-rather', 'prefer-to', 'would-prefer-to', 'would-rather-than', 'expressing-preferences'],
  context: {
    english: 'During our weekend trip discussion, Nam said he prefers travelling by train to flying, but for tomorrow\'s urgent client meeting in Da Nang, he would rather take a flight to arrive on time.',
    vietnamese: 'Trong buổi thảo luận chuyến đi cuối tuần, Nam nói anh thích đi tàu hỏa hơn đi máy bay, nhưng đối với cuộc họp khẩn với khách hàng ngày mai tại Đà Nẵng, anh thà đi máy bay để đến đúng giờ.',
  },
  guide: {
    pattern: 'Prefer + Noun/V-ing + TO + Noun/V-ing | Would prefer + TO-infinitive (rather than + bare V) | Would rather + bare infinitive + THAN + bare infinitive',
    whenToUse: [
      '"prefer ... to ...": dùng cho sở thích chung, lâu dài mang tính thói quen (đi với danh từ hoặc V-ing, nối bằng TO).',
      '"would prefer to ... (rather than ...)": dùng cho sở thích trong một hoàn cảnh cụ thể ở hiện tại hoặc tương lai (đi với to-V).',
      '"would rather + bare V + than + bare V": diễn tả lựa chọn ưu tiên trong một tình huống cụ thể (động từ nguyên thể không to, nối bằng THAN).',
      'Phủ định: "prefer not to + V", "would prefer not to + V", "would rather NOT + bare V".',
    ],
    signalWords: ['prefer ... to', 'would rather ... than', 'would prefer to', 'rather than', 'would rather not'],
    check: [
      'Sau "prefer" có dùng giới từ "to" để so sánh hai vế không (không dùng than)?',
      'Sau "would rather" có dùng động từ nguyên mẫu không to (bare infinitive) không?',
      'Hai vế của "would rather" có được nối với nhau bằng "than" không?',
    ],
  },
  explanation: 'Để diễn đạt sự yêu thích hoặc lựa chọn, tiếng Anh phân biệt rõ giữa sở thích chung và lựa chọn tình huống: (1) "Prefer": diễn tả sở thích mang tính bản chất lâu dài. Cấu trúc chuẩn: "prefer something to something" hoặc "prefer doing something to doing something" (chú ý bắt buộc dùng "to", không dùng "than"; ví dụ: "I prefer tea to coffee"). (2) "Would prefer": thể hiện sở thích trong tình huống cụ thể, đi kèm to-infinitive: "I would prefer to stay home tonight". Nếu có đối tượng so sánh, dùng: "would prefer to do A rather than (do) B". (3) "Would rather" (viết tắt là \'d rather): cũng diễn tả lựa chọn cụ thể nhưng đi với động từ nguyên mẫu KHÔNG to, và dùng liên từ "than" khi so sánh: "I would rather walk than take a taxi". Phủ định của would rather là "would rather not + V" (ví dụ: "I\'d rather not discuss it now").',
  examples: [
    { english: 'I generally prefer reading physical books to reading digital e-books.', vietnamese: 'Nhìn chung tôi thích đọc sách giấy hơn là đọc sách điện tử.' },
    { english: 'My sister prefers classical music to pop music.', vietnamese: 'Chị tôi thích nhạc cổ điển hơn nhạc pop.' },
    { english: 'Would you prefer to sit inside or outside on the terrace tonight?', vietnamese: 'Tối nay bạn thích ngồi bên trong nhà hay ngoài sân hiên hơn?' },
    { english: 'I would rather cook dinner at home than eat at a noisy restaurant.', vietnamese: 'Tôi thà nấu bữa tối ở nhà còn hơn ăn ở một nhà hàng ồn ào.' },
    { english: 'He said he would rather not talk about the exam results right now.', vietnamese: 'Anh ấy bảo anh ấy không muốn nói về kết quả bài thi lúc này.' },
    { english: 'She would prefer to travel off-peak rather than go during public holidays.', vietnamese: 'Cô ấy muốn đi du lịch vào mùa thấp điểm hơn là đi vào các dịp nghỉ lễ.' },
  ],
  contrasts: [
    {
      form: 'I prefer cycling to driving vs I prefer cycling than driving',
      whyFits: '"Prefer" luôn đi với giới từ "to" để kết nối hai danh từ hoặc hai danh động từ V-ing.',
      whyNot: '"Than" không đi cùng với động từ "prefer"; đây là lỗi dịch chuyển phổ biến từ cấu trúc so sánh hơn.',
    },
    {
      form: 'I would rather stay vs I would rather to stay',
      whyFits: '"Would rather" là trợ động từ khiếm khuyết tương đương với modal verb, bắt buộc theo sau bởi động từ nguyên mẫu không to (bare infinitive).',
      whyNot: 'Không bao giờ dùng "to-infinitive" ngay sau "would rather" (đây là lỗi nhầm lẫn với would prefer).',
    },
  ],
  commonMistakes: [
    'Dùng "than" sau prefer (ví dụ viết "I prefer tea than coffee" thay vì "prefer tea to coffee").',
    'Thêm "to" sau would rather (ví dụ viết "I would rather to stay home" thay vì "would rather stay").',
    'Dùng sai từ nối sau would rather (ví dụ viết "would rather walk to take a bus" thay vì "would rather walk than take a bus").',
  ],
  summary: '[prefer + V-ing/N + to + V-ing/N] cho sở thích chung. [would prefer to + V] cho tình huống cụ thể. [would rather + bare V + than + bare V] cho lựa chọn cụ thể.',
  exercises: [
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q1',
      kind: 'choice',
      prompt: 'Select the correct preposition following "prefer": "Many young professionals prefer working remotely _____ commuting to an office."',
      options: [
        { text: 'to', correct: true, rationale: '"Prefer... to..." is the standard prepositional pattern.' },
        { text: 'than', correct: false, rationale: '"Than" is used with rather/comparatives, not with prefer.' },
        { text: 'from', correct: false, rationale: '"From" does not express comparison of preferences.' },
        { text: 'over', correct: false, rationale: '"Over" is used with some adjectives, but "to" is standard with prefer.' },
      ],
      acceptedAnswers: [{ text: 'to', rationale: '"Prefer X to Y" uses the preposition "to".' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q2',
      kind: 'choice',
      prompt: 'Choose the correct verb form after "would rather": "Tonight I am exhausted; I would rather _____ at home."',
      options: [
        { text: 'stay', correct: true, rationale: '"Would rather" is followed by a bare infinitive without "to".' },
        { text: 'to stay', correct: false, rationale: '"To" must not follow "would rather" (contrast with would prefer).' },
        { text: 'staying', correct: false, rationale: '"Would rather" cannot take a gerund.' },
        { text: 'stayed', correct: false, rationale: 'Past tense is only used when the subject of the second clause is different.' },
      ],
      acceptedAnswers: [{ text: 'stay', rationale: '"Would rather" takes a bare infinitive.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q3',
      kind: 'choice',
      prompt: 'Identify the grammatically correct sentence comparing two specific choices:',
      options: [
        { text: 'She would rather study abroad than attend a local university.', correct: true, rationale: '"Would rather + bare V (study) + than + bare V (attend)".' },
        { text: 'She would rather study abroad to attend a local university.', correct: false, rationale: '"To" cannot link choices after would rather; must use "than".' },
        { text: 'She would rather to study abroad than to attend a local university.', correct: false, rationale: 'Incorrect infinitives with "to" after would rather.' },
        { text: 'She would rather studying abroad than attending a local university.', correct: false, rationale: 'Gerunds cannot follow would rather directly.' },
      ],
      acceptedAnswers: [{ text: 'She would rather study abroad than attend a local university.', rationale: '"Would rather + bare V + than + bare V" is correct.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q4',
      kind: 'choice',
      prompt: 'Select the correct negative form of "would rather":',
      options: [
        { text: 'I would rather not make a decision until I review the financial figures.', correct: true, rationale: '"Would rather not + bare infinitive" is the standard negative structure.' },
        { text: 'I wouldn\'t rather make a decision until I review the figures.', correct: false, rationale: 'Negation attaches to "rather" (would rather not), not to would.' },
        { text: 'I would rather not to make a decision until I review the figures.', correct: false, rationale: 'Incorrect inclusion of "to".' },
        { text: 'I don\'t would rather make a decision.', correct: false, rationale: 'Auxiliary "don\'t" cannot combine with modal would.' },
      ],
      acceptedAnswers: [{ text: 'I would rather not make a decision until I review the financial figures.', rationale: '"Would rather not + bare V" is standard.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q5',
      kind: 'gap',
      prompt: 'Fill in the preposition: "My parents prefer living in a quiet suburban town _____ living in the crowded city center."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: '"Prefer... to..." links two gerunds.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q6',
      kind: 'gap',
      prompt: 'Fill in the linking word: "I would rather walk in the cool evening breeze _____ take a crowded bus."',
      options: [],
      acceptedAnswers: [{ text: 'than', rationale: '"Would rather... than..." links two bare verbs.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q7',
      kind: 'gap',
      prompt: 'Fill in the correct form of "order": "Would you prefer _____ (order) Italian pasta or Japanese sushi tonight?"',
      options: [],
      acceptedAnswers: [{ text: 'to order', rationale: '"Would prefer" is followed by to-infinitive.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q8',
      kind: 'gap',
      prompt: 'Complete with the negative particle: "He would rather _____ discuss personal matters in a public meeting."',
      options: [],
      acceptedAnswers: [{ text: 'not', rationale: '"Would rather not" expresses negative preference.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q9',
      kind: 'transform',
      prompt: 'Rewrite using "prefer ... to ...": "I like drinking green tea more than drinking black coffee."',
      options: [],
      acceptedAnswers: [
        { text: 'I prefer drinking green tea to drinking black coffee.', rationale: 'Converts comparison into prefer... to with gerunds.' },
        { text: 'I prefer green tea to black coffee.', rationale: 'Converts directly using nouns.' },
      ],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q10',
      kind: 'transform',
      prompt: 'Rewrite using "would rather": "I prefer to watch a movie at home instead of going to the cinema tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'I would rather watch a movie at home than go to the cinema tonight.', rationale: 'Converts to "would rather + bare V + than + bare V".' },
        { text: "I'd rather watch a movie at home than go to the cinema tonight.", rationale: 'Accepts contracted I\'d rather.' },
      ],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q11',
      kind: 'correction',
      prompt: 'Correct the preposition error: "My grandfather prefers drinking herbal tea than sugary soft drinks."',
      options: [],
      acceptedAnswers: [
        { text: 'My grandfather prefers drinking herbal tea to sugary soft drinks.', rationale: 'Replaces "than" with "to" after prefers.' },
        { text: 'My grandfather prefers herbal tea to sugary soft drinks.', rationale: 'Accepts noun comparison with "to".' },
      ],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-q12',
      kind: 'correction',
      prompt: 'Correct the infinitive error: "We are tired, so we would rather to take a taxi home."',
      options: [],
      acceptedAnswers: [
        { text: 'We are tired, so we would rather take a taxi home.', rationale: 'Removes "to" after "would rather".' },
        { text: "We're tired, so we would rather take a taxi home.", rationale: 'Accepts contracted We\'re.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-r1',
      kind: 'choice',
      prompt: 'Select the sentence with fully correct syntax:',
      options: [
        { text: 'I would prefer to have the interview on Friday morning.', correct: true, rationale: '"Would prefer" is followed by a to-infinitive.' },
        { text: 'I would prefer have the interview on Friday morning.', correct: false, rationale: 'Missing "to" after would prefer.' },
        { text: 'I would rather to have the interview on Friday morning.', correct: false, rationale: '"Would rather" must not take "to".' },
      ],
      acceptedAnswers: [{ text: 'I would prefer to have the interview on Friday morning.', rationale: '"Would prefer to + verb" is correct.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-r2',
      kind: 'gap',
      prompt: 'Fill in the missing word: "Dung prefers swimming _____ running because swimming is gentler on his joints."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: '"Prefer... to..." connects activities.' }],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-r3',
      kind: 'transform',
      prompt: 'Rewrite using "would rather not": "I do not want to disturb her while she is studying."',
      options: [],
      acceptedAnswers: [
        { text: 'I would rather not disturb her while she is studying.', rationale: 'Uses "would rather not disturb".' },
        { text: "I'd rather not disturb her while she is studying.", rationale: 'Accepts contracted I\'d.' },
      ],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-r4',
      kind: 'correction',
      prompt: 'Correct the conjunction error: "They would rather rent an apartment to buy a house right now."',
      options: [],
      acceptedAnswers: [
        { text: 'They would rather rent an apartment than buy a house right now.', rationale: 'Replaces "to" with "than" after would rather.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-o1',
      prompt: 'Viết 2 câu so sánh sở thích của bạn: một câu dùng "prefer ... to ..." cho sở thích chung và một câu dùng "would rather ... than ..." cho một tình huống cụ thể.',
      modelAnswer: 'In my everyday life, I prefer listening to instrumental music to listening to loud songs while studying. However, at the party tonight, I would rather dance with my friends than sit quietly in the corner.',
      checks: [
        'Sử dụng đúng "prefer... to..." kết nối hai danh từ hoặc V-ing.',
        'Sử dụng đúng "would rather + bare V + than + bare V" cho tình huống cụ thể.',
        'Văn phong tự nhiên, đúng ngữ cảnh đời sống.',
      ],
    },
    {
      id: 'grammar-v2-b1-prefer-would-rather-27-o2',
      prompt: 'Viết 2 câu lịch sự từ chối một lời đề nghị trong cuộc họp hoặc bữa tiệc, sử dụng "would prefer to" và "would rather not".',
      modelAnswer: 'Thank you for the kind invitation, but I would rather not drink any alcohol tonight as I have an early flight tomorrow. I would prefer to have a glass of sparkling water instead.',
      checks: [
        'Sử dụng chính xác "would rather not + bare V" để từ chối lịch sự.',
        'Sử dụng chính xác "would prefer to + V" để đề xuất phương án thay thế.',
        'Văn phong giao tiếp chuẩn mực, thanh lịch.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-prefer-and-would-rather',
      title: 'British Council LearnEnglish: Prefer and would rather',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/prefer-and-would-rather',
      claims: [
        'Prefer takes a noun or -ing form and uses the preposition "to" to connect alternatives.',
        'Would prefer takes a to-infinitive for specific preferences.',
        'Would rather takes a bare infinitive and uses "than" to link alternatives.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal)',
    reviewedAt: '2026-10-06T00:00:00Z',
    summary: 'Reviewed the complete lesson for grammar accuracy, contextual answerability, distractors, authored variants, output prompts, and source-claim alignment. Applied editorial corrections where needed.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default preferWouldRatherLesson;
