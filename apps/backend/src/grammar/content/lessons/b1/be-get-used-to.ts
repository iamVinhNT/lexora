/**
 * @file be-get-used-to.ts
 * @description B1 lesson contrasting be used to (state of familiarity) and get used to (process of becoming familiar) followed by gerund or noun.
 */
import type { GrammarLesson } from '../../types.js';

const beGetUsedToLesson: GrammarLesson = {
  id: 'grammar-v2-b1-be-get-used-to-26',
  revisionId: 'grammar-v2-b1-be-get-used-to-26@1.0.0',
  revision: '1.0.0',
  title: 'Be used to và Get used to (Be used to & Get used to)',
  objective: 'Phân biệt và sử dụng chính xác cấu trúc be used to (trạng thái quen thuộc) và get used to (tiến trình thích nghi) đi với danh từ hoặc V-ing, phân biệt rõ với used to + bare infinitive.',
  prerequisiteIds: ['grammar-v2-b1-used-to-past-habits-25'],
  coverage: ['be-get-used-to', 'be-used-to', 'get-used-to', 'used-to-vs-be-used-to', 'gerund-after-preposition'],
  context: {
    english: 'When Linh moved from Ho Chi Minh City to London, she found the winter freezing. Gradually, she got used to the cold weather, and now she is used to wearing thick woolen coats every day.',
    vietnamese: 'Khi Linh chuyển từ TP. Hồ Chí Minh sang London, cô thấy mùa đông lạnh buốt. Dần dần, cô đã quen với thời tiết giá lạnh, và bây giờ cô hoàn toàn quen với việc mặc áo khoác len dày mỗi ngày.',
  },
  guide: {
    pattern: 'Subject + be / get + used to + V-ing / Noun / Pronoun',
    whenToUse: [
      '"be used to + V-ing/noun": diễn tả trạng thái đã quen thuộc, không còn thấy mới lạ, khó khăn hay bất ngờ nữa.',
      '"get used to + V-ing/noun": diễn tả quá trình đang dần làm quen, thích nghi với hoàn cảnh hoặc thói quen mới.',
      'Cả hai cấu trúc đều có thể chia ở nhiều thì khác nhau (am/is/are, was/were, will get, have got, am getting...).',
      'Sau "to" BẮT BUỘC là danh từ hoặc V-ing, bởi vì "to" ở đây đóng vai trò là một giới từ (preposition), không phải tiểu từ nguyên mẫu.',
    ],
    signalWords: ['be used to living', 'get used to the climate', 'am getting used to it', 'became used to', 'never get used to'],
    check: [
      'Sau "used to" có dùng danh động từ (V-ing) hoặc danh từ không (không được dùng động từ nguyên mẫu)?',
      'Động từ be hoặc get đã được chia đúng thì và hòa hợp với chủ ngữ chưa?',
      'Có nhầm lẫn giữa "used to + V" (từng làm quá khứ) và "be used to + V-ing" (đã quen với việc gì) không?',
    ],
  },
  explanation: 'Người học tiếng Anh thường rất dễ nhầm lẫn ba cấu trúc có từ "used to". Điểm mấu chốt nằm ở trợ động từ đi trước và hình thái động từ theo sau: (1) "Used to + V (nguyên mẫu)" chỉ thói quen quá khứ đã chấm dứt (ví dụ: "I used to wake up late"). (2) "Be used to + V-ing/Noun" chỉ TRẠNG THÁI quen thuộc ở hiện tại hoặc quá khứ, tương đương với "be accustomed to" (ví dụ: "I am used to waking up early" = tôi đã quen với việc dậy sớm, việc đó không làm tôi khó chịu). (3) "Get used to + V-ing/Noun" nhấn mạnh TIẾN TRÌNH chuyển biến từ chưa quen sang quen (ví dụ: "I am getting used to the noise" = tôi đang dần quen với tiếng ồn). Trong hai cấu trúc này, "to" là một giới từ, do đó bất kỳ động từ nào đi sau đều bắt buộc phải thêm đuôi "-ing".',
  examples: [
    { english: 'I have lived in Hanoi for ten years, so I am used to the heavy morning traffic.', vietnamese: 'Tôi đã sống ở Hà Nội mười năm rồi, vì vậy tôi đã quen với giao thông đông đúc vào buổi sáng.' },
    { english: 'It took me nearly three months to get used to working the night shift.', vietnamese: 'Tôi mất gần ba tháng để dần thích nghi với việc làm việc ca đêm.' },
    { english: 'Are you used to eating with chopsticks, or would you prefer a fork?', vietnamese: 'Bạn đã quen ăn bằng đũa chưa, hay bạn muốn dùng dĩa hơn?' },
    { english: 'Don\'t worry about the spicy flavor; you will soon get used to it.', vietnamese: 'Đừng lo lắng về vị cay; bạn sẽ sớm quen với nó thôi.' },
    { english: 'My grandparents are not used to using touchscreen smartphones.', vietnamese: 'Ông bà tôi chưa quen với việc sử dụng điện thoại thông minh màn hình cảm ứng.' },
    { english: 'She is slowly getting used to living alone in a foreign country.', vietnamese: 'Cô ấy đang dần thích nghi với việc sống một mình ở nước ngoài.' },
  ],
  contrasts: [
    {
      form: 'I used to live in a village vs I am used to living in a city',
      whyFits: '"I used to live" mang nghĩa trong quá khứ tôi từng sống ở làng quê (nay không sống ở đó nữa).',
      whyNot: '"I am used to living" mang nghĩa việc sống ở thành phố là điều quen thuộc, bình thường đối với tôi ở hiện tại (không hề có nghĩa là đã dừng lại).',
    },
    {
      form: 'She is used to the cold vs She is getting used to the cold',
      whyFits: '"Is used to" diễn tả trạng thái cô ấy đã hoàn toàn thích nghi và cảm thấy bình thường.',
      whyNot: '"Is getting used to" diễn tả một quá trình đang diễn tiến, cô ấy vẫn đang trong giai đoạn làm quen dần dần.',
    },
  ],
  commonMistakes: [
    'Dùng động từ nguyên mẫu sau be/get used to (ví dụ viết "I am used to drive on the left" thay vì "driving").',
    'Nhầm lẫn giữa "used to + V" (quá khứ) và "be used to + V-ing" (quen thuộc hiện tại).',
    'Quên chia động từ "be" hoặc "get" theo đúng chủ ngữ và thì (ví dụ viết "He used to living here" khi muốn nói anh ấy quen sống ở đây, thiếu to be "is").',
  ],
  summary: '[be used to + V-ing/noun] = trạng thái đã quen. [get used to + V-ing/noun] = tiến trình dần thích nghi. Chú ý sau "to" luôn là danh từ hoặc V-ing.',
  exercises: [
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q1',
      kind: 'choice',
      prompt: 'Choose the correct form to complete the sentence: "Nam has worked as a chef for fifteen years, so he is used to _____ on his feet all day."',
      options: [
        { text: 'standing', correct: true, rationale: '"Be used to" is followed by a gerund (-ing) indicating familiarity.' },
        { text: 'stand', correct: false, rationale: 'Bare infinitive cannot follow "be used to".' },
        { text: 'to stand', correct: false, rationale: 'Cannot double "to" with infinitive.' },
        { text: 'stood', correct: false, rationale: 'Past participle is grammatically incorrect here.' },
      ],
      acceptedAnswers: [{ text: 'standing', rationale: '"Be used to" requires the gerund form.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q2',
      kind: 'choice',
      prompt: 'Select the sentence that expresses the PROCESS of becoming accustomed:',
      options: [
        { text: 'I am gradually getting used to the humid weather in summer.', correct: true, rationale: '"Getting used to" emphasizes the developing process of adjustment.' },
        { text: 'I am used to the humid weather in summer.', correct: false, rationale: '"Am used to" describes the already established state, not the process.' },
        { text: 'I used to like the humid weather in summer.', correct: false, rationale: '"Used to like" describes a discontinued past feeling.' },
        { text: 'I got use to the humid weather in summer.', correct: false, rationale: 'Incorrect spelling "use" after got.' },
      ],
      acceptedAnswers: [{ text: 'I am gradually getting used to the humid weather in summer.', rationale: '"Getting used to" describes the process of adjustment.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q3',
      kind: 'choice',
      prompt: 'Which sentence correctly means "Tôi từng sống ở Nhật (quá khứ, nay không còn)"?',
      options: [
        { text: 'I used to live in Japan.', correct: true, rationale: '"Used to + bare infinitive" describes past residence that has ended.' },
        { text: 'I am used to living in Japan.', correct: false, rationale: 'Means currently accustomed to living in Japan.' },
        { text: 'I got used to live in Japan.', correct: false, rationale: 'Ungrammatical blend of got used to and bare infinitive.' },
        { text: 'I am used to live in Japan.', correct: false, rationale: '"Be used to" cannot take bare infinitive.' },
      ],
      acceptedAnswers: [{ text: 'I used to live in Japan.', rationale: '"Used to live" denotes discontinued past residence.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with correct grammar and meaning:',
      options: [
        { text: 'She will soon get used to commuting by underground train.', correct: true, rationale: 'Future auxiliary "will get used to" + gerund "commuting".' },
        { text: 'She will soon get used to commute by underground train.', correct: false, rationale: 'Requires gerund commuting, not bare commute.' },
        { text: 'She will soon used to commute by underground train.', correct: false, rationale: 'Missing verb get/be and invalid form.' },
        { text: 'She is soon get used to commuting by underground train.', correct: false, rationale: 'Ungrammatical verb combination "is soon get".' },
      ],
      acceptedAnswers: [{ text: 'She will soon get used to commuting by underground train.', rationale: '"Get used to + gerund" expresses becoming accustomed.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q5',
      kind: 'gap',
      prompt: 'Fill in the correct form of "wake" (wake / waking): "Because I work an early morning shift, I am used to _____ up at 5 a.m."',
      options: [],
      acceptedAnswers: [{ text: 'waking', rationale: '"Be used to" requires gerund waking.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q6',
      kind: 'gap',
      prompt: 'Complete with the correct form of "get": "It took my parents several weeks to _____ used to living in an apartment."',
      options: [],
      acceptedAnswers: [{ text: 'get', rationale: 'Infinitive "to get used to" after took... to.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q7',
      kind: 'gap',
      prompt: 'Fill in the correct preposition: "I am not used _____ speaking English in front of large audiences."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: '"Be used to" takes preposition "to".' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q8',
      kind: 'gap',
      prompt: 'Fill in the correct form of "drive": "British tourists in Europe find it hard to get used to _____ on the right."',
      options: [],
      acceptedAnswers: [{ text: 'driving', rationale: '"Get used to" requires gerund driving.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q9',
      kind: 'transform',
      prompt: 'Rewrite using "am used to": "It is completely normal and familiar for me to cycle in heavy rain."',
      options: [],
      acceptedAnswers: [
        { text: 'I am used to cycling in heavy rain.', rationale: 'Converts familiarity into "am used to cycling".' },
      ],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q10',
      kind: 'transform',
      prompt: 'Rewrite using "get used to": "You will eventually adapt to the fast pace of life in New York."',
      options: [],
      acceptedAnswers: [
        { text: 'You will eventually get used to the fast pace of life in New York.', rationale: 'Converts "adapt to" to "get used to".' },
      ],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q11',
      kind: 'correction',
      prompt: 'Correct the verb form error: "He is used to work ten hours a day, so he does not feel tired."',
      options: [],
      acceptedAnswers: [
        { text: 'He is used to working ten hours a day, so he does not feel tired.', rationale: 'Changes bare infinitive "work" to gerund "working".' },
        { text: "He is used to working ten hours a day, so he doesn't feel tired.", rationale: 'Accepts contracted doesn\'t.' },
      ],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-q12',
      kind: 'correction',
      prompt: 'Correct the missing verb: "At first it was strange, but now I used to the noise from the street."',
      options: [],
      acceptedAnswers: [
        { text: 'At first it was strange, but now I am used to the noise from the street.', rationale: 'Adds auxiliary "am" before "used to".' },
        { text: "At first it was strange, but now I'm used to the noise from the street.", rationale: 'Accepts contracted I\'m.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-be-get-used-to-26-r1',
      kind: 'choice',
      prompt: 'Select the sentence with accurate grammatical form:',
      options: [
        { text: 'She has never got used to living away from her family.', correct: true, rationale: 'Present perfect "has got used to" + gerund "living".' },
        { text: 'She has never got used to live away from her family.', correct: false, rationale: '"Get used to" cannot take bare infinitive live.' },
        { text: 'She has never get used to living away from her family.', correct: false, rationale: 'Incorrect past participle form get.' },
      ],
      acceptedAnswers: [{ text: 'She has never got used to living away from her family.', rationale: 'Correct present perfect with gerund.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-r2',
      kind: 'gap',
      prompt: 'Fill in the correct form of "wear": "In Vietnam, motorcyclists are used to _____ safety helmets on all roads."',
      options: [],
      acceptedAnswers: [{ text: 'wearing', rationale: '"Are used to" requires gerund wearing.' }],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-r3',
      kind: 'transform',
      prompt: 'Rewrite using "is getting used to": "Huy is in the process of becoming accustomed to his new diet."',
      options: [],
      acceptedAnswers: [
        { text: 'Huy is getting used to his new diet.', rationale: 'Replaces "in the process of becoming accustomed to" with "getting used to".' },
      ],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-r4',
      kind: 'correction',
      prompt: 'Correct the error: "When she moved to Canada, she had to get used to write in English every day."',
      options: [],
      acceptedAnswers: [
        { text: 'When she moved to Canada, she had to get used to writing in English every day.', rationale: 'Changes "write" to gerund "writing".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-be-get-used-to-26-o1',
      prompt: 'Viết 2 câu chia sẻ về những điều bạn đã hoàn toàn quen thuộc trong công việc hoặc cuộc sống hàng ngày (sử dụng "I am used to + V-ing/noun").',
      modelAnswer: 'I am used to reading technical documentation in English for several hours each day. I am also used to cooking my own meals after a long workday.',
      checks: [
        'Sử dụng đúng cấu trúc "am used to + V-ing/noun".',
        'Sau "to" là V-ing, không dùng động từ nguyên mẫu.',
        'Ngữ nghĩa thể hiện sự quen thuộc tự nhiên trong đời sống.',
      ],
    },
    {
      id: 'grammar-v2-b1-be-get-used-to-26-o2',
      prompt: 'Viết 2 câu mô tả một trải nghiệm mới mẻ bạn từng trải qua và quá trình thích nghi với nó (sử dụng "get used to" hoặc "got used to").',
      modelAnswer: 'When I first joined my new project team, it took me a few weeks to get used to using the agile project management software. However, with help from my mentor, I soon got used to attending daily standup meetings.',
      checks: [
        'Sử dụng chính xác "get used to / got used to + V-ing/noun".',
        'Thể hiện rõ tiến trình thích nghi từ bỡ ngỡ đến thuần thục.',
        'Văn phong mạch lạc, đúng chuẩn B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-be-used-to-get-used-to',
      title: 'Cambridge Dictionary: Be used to and get used to',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/be-used-to-and-get-used-to',
      claims: [
        'Be used to means to be accustomed to something so that it seems normal.',
        'Get used to means to become accustomed to something through a process of time.',
        'Both structures are followed by a noun, pronoun, or gerund (-ing form), not a bare infinitive.',
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

export default beGetUsedToLesson;
