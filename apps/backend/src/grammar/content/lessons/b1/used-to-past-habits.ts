/**
 * @file used-to-past-habits.ts
 * @description B1 lesson on used to for past habits and states that are no longer true, covering affirmative, negative, and questions.
 */
import type { GrammarLesson } from '../../types.js';

const usedToPastHabitsLesson: GrammarLesson = {
  id: 'grammar-v2-b1-used-to-past-habits-25',
  revisionId: 'grammar-v2-b1-used-to-past-habits-25@1.0.0',
  revision: '1.0.0',
  title: 'Used to: Thói quen và trạng thái trong quá khứ (Used to for Past Habits & States)',
  objective: 'Sử dụng thành thạo cấu trúc used to + bare infinitive để diễn đạt thói quen hoặc trạng thái kéo dài trong quá khứ nhưng nay không còn nữa; nắm vững dạng phủ định didn\'t use to và câu hỏi.',
  prerequisiteIds: ['grammar-v2-b1-verb-patterns-meaning-24'],
  coverage: ['used-to-past-habits', 'past-states', 'didnt-use-to', 'did-you-use-to', 'past-habits-vs-present'],
  context: {
    english: 'My grandfather used to live in a tranquil riverside village, but now he lives with our family in the city. He did not use to use a smartphone, but today he video-calls his friends every morning.',
    vietnamese: 'Ông tôi từng sống ở một ngôi làng ven sông yên bình, nhưng nay ông sống cùng gia đình chúng tôi tại thành phố. Trước đây ông không từng dùng điện thoại thông minh, nhưng ngày nay sáng nào ông cũng gọi video cho bạn bè.',
  },
  guide: {
    pattern: 'Affirmative: Subject + used to + bare infinitive | Negative: Subject + didn\'t use to + bare infinitive | Question: Did + Subject + use to + bare infinitive?',
    whenToUse: [
      'Diễn tả thói quen lặp đi lặp lại trong quá khứ mà hiện tại đã chấm dứt hoàn toàn (past habits).',
      'Diễn tả trạng thái, cảm xúc, hoặc hoàn cảnh kéo dài trong quá khứ (past states với be, live, have, believe...) mà nay không còn nữa.',
      'Dùng trong câu phủ định: "didn\'t use to" (bỏ chữ d ở used trong văn viết chuẩn).',
      'Dùng trong câu nghi vấn: "Did you use to...?" (bỏ chữ d ở used).',
      'KHÔNG dùng "used to" cho hành động chỉ xảy ra duy nhất MỘT LẦN ở một thời điểm xác định (phải dùng thì Quá khứ đơn).',
    ],
    signalWords: ['used to play', 'used to be', "didn't use to like", 'did you use to live', 'not anymore', 'no longer'],
    check: [
      'Sau "used to" có phải là động từ nguyên mẫu không "to" (bare infinitive) không?',
      'Trong câu phủ định và câu hỏi có nhớ bỏ đuôi "-d" (didn\'t use to, Did you use to) không?',
      'Hành động/trạng thái này hiện nay đã dừng hẳn chưa (nếu vẫn còn tiếp diễn thì không dùng used to)?',
    ],
  },
  explanation: 'Cấu trúc "used to + V (nguyên mẫu)" là một phương tiện ngữ pháp quan trọng trong tiếng Anh để nói về quá khứ tương phản với hiện tại: một việc từng xảy ra thường xuyên hoặc một trạng thái từng tồn tại nhưng NAY KHÔNG CÒN NỮA. Khác với "would" (chỉ diễn tả hành động lặp lại, không dùng cho trạng thái), "used to" có thể dùng cho cả hành động ("used to ride a bike") và trạng thái ("used to have long hair", "used to be shy"). Trong câu phủ định, ta mượn trợ động từ didn\'t và đưa used về dạng nguyên mẫu: "didn\'t use to + V". Tương tự trong câu hỏi: "Did + S + use to + V?". Điểm đặc biệt cần tránh: với những sự kiện đơn lẻ chỉ diễn ra đúng một lần (như "tôi mua chiếc xe máy này năm ngoái"), bắt buộc dùng Past Simple ("I bought this bike last year"), tuyệt đối không dùng "used to".',
  examples: [
    { english: 'When I was in primary school, I used to walk to school with my neighbors every morning.', vietnamese: 'Hồi học tiểu học, tôi từng đi bộ đến trường cùng các bạn hàng xóm mỗi sáng.' },
    { english: 'There used to be an ancient cinema on this street corner before they built the modern mall.', vietnamese: 'Từng có một rạp chiếu phim cổ ở góc phố này trước khi người ta xây trung tâm thương mại hiện đại.' },
    { english: 'My sister didn\'t use to like spicy food, but now she loves kimchi.', vietnamese: 'Em gái tôi trước đây không thích ăn đồ cay, nhưng bây giờ cô bé lại rất mê kim chi.' },
    { english: 'Did you use to play any musical instrument when you were a teenager?', vietnamese: 'Hồi thiếu niên bạn có từng chơi nhạc cụ nào không?' },
    { english: 'Huy used to have long curly hair, but he cut it short when he started work.', vietnamese: 'Huy từng có mái tóc xoăn dài, nhưng anh ấy đã cắt ngắn khi bắt đầu đi làm.' },
    { english: 'We didn\'t use to travel abroad because international flights were very expensive.', vietnamese: 'Trước kia chúng tôi không từng đi du lịch nước ngoài vì các chuyến bay quốc tế rất đắt đỏ.' },
  ],
  contrasts: [
    {
      form: 'I used to live in Hue vs I lived in Hue for two years in 2018',
      whyFits: '"I used to live in Hue" nhấn mạnh trạng thái từng sống ở Huế trong quá khứ và hiện nay chắc chắn không còn ở đó nữa.',
      whyNot: 'Nếu nhắc đến một mốc thời gian cụ thể có độ dài xác định như "for two years in 2018", thì dùng thì Quá khứ đơn (lived) là tự nhiên và chính xác hơn.',
    },
    {
      form: 'I didn\'t use to eat vegetables vs I didn\'t used to eat vegetables',
      whyFits: 'Trong văn phạm chuẩn mực, sau trợ động từ phủ định "didn\'t", động từ trở về nguyên mẫu "use" (didn\'t use to).',
      whyNot: 'Dạng "didn\'t used to" chứa đuôi "-d" là lỗi sai ngữ pháp phổ biến do nhầm lẫn giữa cách phát âm và chính tả.',
    },
  ],
  commonMistakes: [
    'Giữ lại chữ "d" trong câu phủ định và câu hỏi (ví dụ viết "didn\'t used to" hoặc "Did you used to?").',
    'Dùng "used to" cho một sự kiện chỉ xảy ra một lần duy nhất (ví dụ viết "I used to break my leg last year" thay vì "I broke my leg last year").',
    'Nhầm lẫn giữa "used to + V" (từng làm gì trong quá khứ) với "be used to + V-ing" (quen với việc gì ở hiện tại).',
  ],
  summary: 'Dùng [used to + V] cho thói quen hoặc trạng thái trong quá khứ nay không còn nữa. Phủ định: [didn\'t use to + V], nghi vấn: [Did + S + use to + V?]. Không dùng cho sự việc xảy ra một lần.',
  exercises: [
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q1',
      kind: 'choice',
      prompt: 'Select the correct sentence expressing a discontinued past habit:',
      options: [
        { text: 'My father used to cycle forty kilometers every weekend when he was younger.', correct: true, rationale: '"Used to cycle" expresses a past routine that no longer happens.' },
        { text: 'My father is used to cycle forty kilometers every weekend.', correct: false, rationale: '"Is used to" requires a gerund (-ing) and expresses current familiarity, not past habit.' },
        { text: 'My father used to cycling forty kilometers every weekend.', correct: false, rationale: '"Used to" must be followed by bare infinitive cycle, not gerund.' },
        { text: 'My father uses to cycle forty kilometers every weekend.', correct: false, rationale: '"Uses to" does not exist in English for present habits.' },
      ],
      acceptedAnswers: [{ text: 'My father used to cycle forty kilometers every weekend when he was younger.', rationale: '"Used to + bare infinitive" describes past habit.' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q2',
      kind: 'choice',
      prompt: 'Choose the correct negative form in standard written English:',
      options: [
        { text: 'We didn\'t use to have internet access when we lived on the remote island.', correct: true, rationale: '"Didn\'t use to" correctly drops the "-d" in standard spelling.' },
        { text: 'We didn\'t used to have internet access when we lived on the remote island.', correct: false, rationale: 'Standard grammar requires "use" without "d" after "didn\'t".' },
        { text: 'We not used to have internet access when we lived on the remote island.', correct: false, rationale: 'Missing auxiliary verb "did".' },
        { text: 'We weren\'t use to have internet access when we lived on the remote island.', correct: false, rationale: 'Incorrect auxiliary "weren\'t" with bare infinitive.' },
      ],
      acceptedAnswers: [{ text: 'We didn\'t use to have internet access when we lived on the remote island.', rationale: '"Didn\'t use to" is the standard negative spelling.' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q3',
      kind: 'choice',
      prompt: 'Which sentence correctly uses "used to" to express a past state (trạng thái)?',
      options: [
        { text: 'There used to be a small traditional market right where this high-rise stands.', correct: true, rationale: '"Used to be" describes a past state/existence that is no longer true.' },
        { text: 'There used to build a small market right here.', correct: false, rationale: 'Passive meaning requires "was built", not "used to build".' },
        { text: 'There was used to be a market here.', correct: false, rationale: 'Unnecessary and ungrammatical "was".' },
        { text: 'There used to having a market here.', correct: false, rationale: 'Requires bare infinitive "be", not gerund "having".' },
      ],
      acceptedAnswers: [{ text: 'There used to be a small traditional market right where this high-rise stands.', rationale: '"Used to be" describes a past state.' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q4',
      kind: 'choice',
      prompt: 'Why is "used to" incorrect in: "I used to buy my laptop last September"?',
      options: [
        { text: 'Because buying the laptop was a single specific event, which requires the Past Simple.', correct: true, rationale: '"Used to" cannot be used for single completed events at specific points in time.' },
        { text: 'Because "buy" is an irregular verb.', correct: false, rationale: 'Verb regularity is irrelevant.' },
        { text: 'Because "September" requires the present perfect.', correct: false, rationale: 'Past Simple is required for past months.' },
        { text: 'Because laptops are modern devices.', correct: false, rationale: 'Device age does not govern syntax.' },
      ],
      acceptedAnswers: [{ text: 'Because buying the laptop was a single specific event, which requires the Past Simple.', rationale: 'Single past events require the Past Simple.' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q5',
      kind: 'gap',
      prompt: 'Complete with the affirmative form: "My sister _____ (live) in Da Nang before she got married."',
      options: [],
      acceptedAnswers: [{ text: 'used to live', rationale: '"Used to live" expresses a past state that has ended.' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q6',
      kind: 'gap',
      prompt: 'Complete the negative form with correct spelling: "I _____ (not / like) seafood when I was a child, but now I eat it often."',
      options: [],
      acceptedAnswers: [
        { text: "didn't use to like", rationale: '"Didn\'t use to like" drops the "-d" in standard English.' },
        { text: 'did not use to like', rationale: 'Uncontracted standard negative form.' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q7',
      kind: 'gap',
      prompt: 'Complete the question: "_____ you _____ (use to / travel) by train when you were a student?"',
      options: [],
      acceptedAnswers: [
        { text: 'Did / use to travel', rationale: 'Standard question frame: Did you use to travel.' },
        { text: 'Did you use to travel', rationale: 'Full question opener.' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q8',
      kind: 'gap',
      prompt: 'Fill in the verb phrase: "This building _____ (be) a public library before it was converted into an art gallery."',
      options: [],
      acceptedAnswers: [{ text: 'used to be', rationale: '"Used to be" expresses past state.' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q9',
      kind: 'transform',
      prompt: 'Rewrite using "used to": "In the past, my uncle was a tour guide, but now he is an office manager."',
      options: [],
      acceptedAnswers: [
        { text: 'My uncle used to be a tour guide.', rationale: 'Converts past profession state into "used to be a tour guide".' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q10',
      kind: 'transform',
      prompt: 'Rewrite using "didn\'t use to": "I never drank black coffee when I was younger, but now I drink it daily."',
      options: [],
      acceptedAnswers: [
        { text: "I didn't use to drink black coffee when I was younger.", rationale: 'Converts to "didn\'t use to drink".' },
        { text: 'I did not use to drink black coffee when I was younger.', rationale: 'Accepts uncontracted negative.' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q11',
      kind: 'correction',
      prompt: 'Correct the spelling in the negative: "She didn\'t used to wear glasses before she started university."',
      options: [],
      acceptedAnswers: [
        { text: "She didn't use to wear glasses before she started university.", rationale: 'Changes "used" to "use" after "didn\'t".' },
        { text: 'She did not use to wear glasses before she started university.', rationale: 'Accepts uncontracted form.' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-q12',
      kind: 'correction',
      prompt: 'Correct the error in this single completed past event: "I used to graduate from university in June 2022."',
      options: [],
      acceptedAnswers: [
        { text: 'I graduated from university in June 2022.', rationale: 'Replaces "used to graduate" with Past Simple "graduated" for a single event.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-r1',
      kind: 'choice',
      prompt: 'Choose the correct question form:',
      options: [
        { text: 'Did people use to write handwritten letters more often in the 1990s?', correct: true, rationale: 'Correct: "Did + subject + use to + bare infinitive".' },
        { text: 'Did people used to write handwritten letters more often in the 1990s?', correct: false, rationale: '"Used" retains "-d" after "did", which is non-standard.' },
        { text: 'Were people use to write handwritten letters more often in the 1990s?', correct: false, rationale: 'Incorrect auxiliary "were".' },
      ],
      acceptedAnswers: [{ text: 'Did people use to write handwritten letters more often in the 1990s?', rationale: 'Standard question structure with "use to".' }],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-r2',
      kind: 'gap',
      prompt: 'Fill in the negative form: "We _____ (not / eat) out very often because our mother cooked every evening."',
      options: [],
      acceptedAnswers: [
        { text: "didn't use to eat", rationale: '"Didn\'t use to eat" describes discontinued past habit.' },
        { text: 'did not use to eat', rationale: 'Accepts uncontracted form.' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-r3',
      kind: 'transform',
      prompt: 'Rewrite using "used to": "There was a beautiful wooden bridge over the canal when I was a child."',
      options: [],
      acceptedAnswers: [
        { text: 'There used to be a beautiful wooden bridge over the canal when I was a child.', rationale: 'Replaces "There was" with "There used to be".' },
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-r4',
      kind: 'correction',
      prompt: 'Correct the single event error: "Last Saturday, we used to visit the national museum."',
      options: [],
      acceptedAnswers: [
        { text: 'Last Saturday, we visited the national museum.', rationale: 'Replaces "used to visit" with Past Simple "visited" for a specific single occasion.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-o1',
      prompt: 'Viết 2 câu kể về sự thay đổi trong cuộc sống của bạn so với 5 năm trước, sử dụng cấu trúc "used to" (thói quen hoặc nơi ở trong quá khứ nay đã đổi khác).',
      modelAnswer: 'Five years ago, I used to wake up at six every morning to catch a crowded bus to high school. Now, I work remotely from home and set my own flexible schedule.',
      checks: [
        'Sử dụng đúng cấu trúc "used to + bare infinitive" cho thói quen quá khứ.',
        'Có sự đối lập rõ ràng với thực tế hiện tại.',
        'Từ vựng và ngữ pháp tự nhiên, chuẩn mực.',
      ],
    },
    {
      id: 'grammar-v2-b1-used-to-past-habits-25-o2',
      prompt: 'Viết 2 câu mô tả sự thay đổi của khu phố hoặc thành phố bạn đang sống, sử dụng "There used to be..." và "didn\'t use to".',
      modelAnswer: 'There used to be open green rice paddies behind our residential quarter ten years ago. Our neighborhood didn\'t use to have heavy traffic during the morning rush hour.',
      checks: [
        'Sử dụng đúng "There used to be..." cho trạng thái/công trình từng tồn tại.',
        'Sử dụng đúng thể phủ định "didn\'t use to" (bỏ chữ d).',
        'Văn phong mô tả mạch lạc, giàu ngữ cảnh.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-used-to',
      title: 'British Council LearnEnglish: Used to – past habits and states',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/used-to',
      claims: [
        'Used to refers to things that happened regularly in the past but no longer happen now.',
        'Used to can refer to past states as well as past repeated actions.',
        'The negative is didn\'t use to and the question form is did you use to in standard grammar.',
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

export default usedToPastHabitsLesson;
