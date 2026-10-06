/**
 * @file infinitive-after-verbs.ts
 * @description A2 lesson on verbs followed by to-infinitives and the infinitive of purpose.
 */
import type { GrammarLesson } from '../../types.js';

const infinitiveAfterVerbsLesson: GrammarLesson = {
  id: 'grammar-v2-a2-infinitive-after-verbs-26',
  revisionId: 'grammar-v2-a2-infinitive-after-verbs-26@1.0.0',
  revision: '1.0.0',
  title: 'Động từ nguyên mẫu có To sau các động từ thông dụng (Infinitives after Verbs)',
  objective: 'Nhận diện và sử dụng chính xác động từ nguyên mẫu có to (to-infinitive) sau các động từ chỉ kế hoạch, quyết định, hy vọng và lời hứa (decide, hope, want, plan, agree, promise, refuse, need, would like), và sử dụng to-V để chỉ mục đích của hành động.',
  prerequisiteIds: ['grammar-v2-a2-gerund-after-verbs-25'],
  coverage: ['infinitive-after-verbs', 'verb-patterns', 'to-infinitives', 'purpose-infinitives'],
  context: {
    english: 'Many common English verbs expressing decisions, plans, hopes, and promises must be followed by a to-infinitive. We also use the to-infinitive to explain the purpose of an action.',
    vietnamese: 'Nhiều động từ tiếng Anh thông dụng diễn tả quyết định, kế hoạch, hy vọng và lời hứa bắt buộc phải đi kèm với động từ nguyên mẫu có to (to-infinitive). Chúng ta cũng dùng to-infinitive để giải thích mục đích của hành động.',
  },
  guide: {
    pattern: 'S + Verb (decide / plan / hope / want / agree / promise / refuse / need / would like) + to-V | S + V + to-V (chỉ mục đích: để làm gì)',
    whenToUse: [
      'Sau các động từ chỉ quyết định và kế hoạch tương lai: decide, plan, arrange, choose, manage, prepare + to-V.',
      'Sau các động từ chỉ mong muốn, nguyện vọng và lời hứa: want, hope, wish, expect, promise, agree, refuse, offer, threaten + to-V.',
      'Sau các cấu trúc mong muốn lịch sự: would like, would love, would prefer + to-V.',
      'Dùng to-infinitive để nêu mục đích của hành động (infinitive of purpose): I turned on the heater to warm up the room.',
    ],
    signalWords: ['decide', 'hope', 'want', 'plan', 'promise', 'agree', 'refuse', 'need', 'would like', 'in order to', 'so as to'],
    check: [
      'Sau các động từ decide, plan, hope, want, promise luôn có "to" đi trước động từ nguyên mẫu (decide to go, không phải decide go hay decide going).',
      'Phân biệt "like + V-ing" (sở thích chung nói chung) với "would like + to-V" (mong muốn cụ thể ở một thời điểm).',
      'Phủ định to-infinitive thường đặt not trước to (decide not to buy); not to là mẫu cơ bản trong bài. To not + V cũng có thể dùng trong tiếng Anh hiện đại.',
      'Khi chỉ mục đích, dùng "to + V-bare", không dùng "for + V-bare" hoặc "for + to-V" (went to buy groceries, KHÔNG went for buy).',
    ],
  },
  explanation: 'Động từ nguyên mẫu có to (To-infinitive) là một trong những mẫu câu cơ bản và quan trọng nhất trong tiếng Anh. Khác với danh động từ (V-ing), nhóm động từ đi với to-infinitive thường hướng đến tương lai, kế hoạch, ý định hoặc mục tiêu mà chủ ngữ muốn đạt được. Các động từ phổ biến nhất trong nhóm này bao gồm: decide (quyết định), plan (lên kế hoạch), hope (hy vọng), want (muốn), promise (hứa), agree (đồng ý), refuse (từ chối), need (cần), manage (xoay xở được), và learn (học cách làm gì). Ví dụ: "She decided to study abroad in Australia" (Cô ấy đã quyết định đi du học ở Úc). Người bản ngữ tuyệt đối không nói "decided studying". Cụm từ lịch sự "would like" (viết tắt là \'d like) cũng luôn luôn đi với to-infinitive: "I would like to reserve a double room." Ngoài ra, to-infinitive còn có một chức năng độc lập rất phổ biến là chỉ mục đích hành động (Infinitive of Purpose), trả lời cho câu hỏi "Why?" (Tại sao lại làm việc đó?). Ví dụ: "He woke up early to catch the sunrise" (Anh ấy dậy sớm để ngắm bình minh) - ở đây "to catch" tương đương với "in order to catch".',
  examples: [
    {
      english: 'We decided to book our flight tickets three months in advance.',
      vietnamese: 'Chúng tôi đã quyết định đặt vé máy bay trước ba tháng.',
    },
    {
      english: 'Nam hopes to find a good marketing job after graduating from university.',
      vietnamese: 'Nam hy vọng tìm được một công việc tiếp thị tốt sau khi tốt nghiệp đại học.',
    },
    {
      english: 'I would like to order a cup of hot green tea, please.',
      vietnamese: 'Tôi muốn gọi một tách trà xanh nóng, làm ơn.',
    },
    {
      english: 'They promised to call us as soon as they arrived at the airport.',
      vietnamese: 'Họ đã hứa sẽ gọi cho chúng tôi ngay khi họ đến sân bay.',
    },
    {
      english: 'She went to the local post office to send an urgent parcel to her parents.',
      vietnamese: 'Cô ấy đã đến bưu điện địa phương để gửi một bưu kiện khẩn cho bố mẹ.',
    },
    {
      english: 'The company refused to pay for the employee’s personal travel expenses.',
      vietnamese: 'Công ty đã từ chối chi trả cho các chi phí đi lại cá nhân của nhân viên.',
    },
  ],
  contrasts: [
    {
      form: 'We planned to visit our grandparents in the countryside this weekend.',
      whyFits: 'Plan diễn đạt kế hoạch tương lai, đòi hỏi to-infinitive to visit.',
      whyNot: '"We planned visiting..." sai vì plan không kết hợp với danh động từ V-ing.',
    },
    {
      form: 'I study English hard every evening to get a higher scholarship.',
      whyFits: 'To get đóng vai trò to-infinitive chỉ mục đích (để đạt được học bổng).',
      whyNot: '"I study English for get a higher scholarship" sai vì chỉ mục đích không dùng for + V-bare.',
    },
  ],
  commonMistakes: [
    'Dùng V-ing sau các động từ như decide, plan, hope, want (viết "I decide going" thay vì "I decide to go").',
    'Dùng "for + V" thay vì "to + V" để chỉ mục đích (viết "I went to the supermarket for buy food" thay vì "to buy food").',
    'Dạng phủ định cơ bản được dạy ở đây là not to + V (decide not to go); to not + V cũng có thể dùng trong tiếng Anh hiện đại.',
  ],
  summary: 'Các động từ decide, hope, want, plan, promise, agree, refuse, would like luôn đi với to-V. To-V cũng dùng để chỉ mục đích hành động (để làm gì). Phủ định đặt not trước to: not to V.',
  exercises: [
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q1',
      kind: 'choice',
      prompt: 'Select the correct verb form: "My brother decided ___ a new laptop for his graphic design classes."',
      options: [
        { text: 'to buy', correct: true, rationale: 'Decide luôn đi kèm động từ nguyên mẫu có to (to buy).' },
        { text: 'buying', correct: false, rationale: 'Decide không đi với danh động từ V-ing.' },
        { text: 'buy', correct: false, rationale: 'Decide không đi với động từ nguyên mẫu không to.' },
        { text: 'for buying', correct: false, rationale: 'Không dùng for buying làm tân ngữ của động từ decide.' },
      ],
      acceptedAnswers: [{ text: 'to buy', rationale: 'Decide is followed by a to-infinitive: to buy.' }],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q2',
      kind: 'choice',
      prompt: 'Choose the correct form after "would like": "I would like ___ a table for four people this evening."',
      options: [
        { text: 'to reserve', correct: true, rationale: 'Would like diễn tả mong muốn lịch sự, bắt buộc theo sau bởi to-infinitive (to reserve).' },
        { text: 'reserving', correct: false, rationale: 'Reserving dùng với like diễn tả sở thích chung, không đi với would like.' },
        { text: 'reserve', correct: false, rationale: 'Thiếu to trước động từ nguyên mẫu.' },
        { text: 'to reserved', correct: false, rationale: 'Động từ sau to phải ở dạng nguyên mẫu, không chia quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'to reserve', rationale: 'Would like requires a to-infinitive complement: to reserve.' }],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q3',
      kind: 'choice',
      prompt: 'Select the correct form expressing purpose: "She went to the convenience store ___ some bottled water."',
      options: [
        { text: 'to buy', correct: true, rationale: 'To buy là to-infinitive chỉ mục đích (để mua nước).' },
        { text: 'for buy', correct: false, rationale: 'Không dùng for + V-bare để chỉ mục đích trong tiếng Anh.' },
        { text: 'for to buy', correct: false, rationale: 'For to buy là cấu trúc sai ngữ pháp.' },
        { text: 'buying', correct: false, rationale: 'Buying đơn lẻ không đóng vai trò chỉ mục đích thay cho to buy.' },
      ],
      acceptedAnswers: [{ text: 'to buy', rationale: 'An infinitive of purpose (to buy) expresses why she went to the store.' }],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q4',
      kind: 'choice',
      prompt: 'Choose the usual negative infinitive form for this exercise: "We decided ___ outside because of the heavy thunderstorm."',
      options: [
        { text: 'not to go', correct: true, rationale: 'Trong cấu trúc phủ định của to-infinitive, "not" đứng ngay trước "to": not to go.' },
        { text: 'to not go', correct: false, rationale: 'To not go cũng đúng ngữ pháp; bài này yêu cầu mẫu phủ định cơ bản not to go.' },
        { text: 'not going', correct: false, rationale: 'Decide không đi với danh động từ V-ing.' },
        { text: 'don’t go', correct: false, rationale: 'Không đặt don’t go làm tân ngữ trực tiếp sau decided.' },
      ],
      acceptedAnswers: [{ text: 'not to go', rationale: 'Negative infinitives are formed with not + to-infinitive: not to go.' }],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "learn": "Minh wants _____ how to play acoustic guitar this summer."',
      options: [],
      acceptedAnswers: [
        { text: 'to learn', rationale: 'Want requires the to-infinitive to learn.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "visit": "Our family plans _____ Hue and Da Nang next month."',
      options: [],
      acceptedAnswers: [
        { text: 'to visit', rationale: 'Plan requires the to-infinitive to visit.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the infinitive of purpose for "ask": "He stopped at the information desk _____ for directions to the railway station."',
      options: [],
      acceptedAnswers: [
        { text: 'to ask', rationale: 'Infinitive of purpose to ask explains why he stopped.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "help": "They promised _____ us organize the charity event."',
      options: [],
      acceptedAnswers: [
        { text: 'to help', rationale: 'Promise requires the to-infinitive to help.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q9',
      kind: 'transform',
      prompt: 'Rewrite using "decided to": "Lan made a decision that she would take a gap year."',
      options: [],
      acceptedAnswers: [
        { text: 'Lan decided to take a gap year.', rationale: 'Simplifies made a decision that she would take into decided to take.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q10',
      kind: 'transform',
      prompt: 'Rewrite using an infinitive of purpose: "He turned on his laptop because he wanted to check his emails."',
      options: [],
      acceptedAnswers: [
        { text: 'He turned on his laptop to check his emails.', rationale: 'Expresses purpose concisely with to check his emails.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "We hope seeing our former teacher at the school reunion next Sunday."',
      options: [],
      acceptedAnswers: [
        { text: 'We hope to see our former teacher at the school reunion next Sunday.', rationale: 'Replaces seeing with to-infinitive to see after hope.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "She went to the library for borrow some reference books."',
      options: [],
      acceptedAnswers: [
        { text: 'She went to the library to borrow some reference books.', rationale: 'Replaces incorrect for borrow with infinitive of purpose to borrow.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-r1',
      kind: 'choice',
      prompt: 'Choose the correct form: "The customer refused ___ for the damaged merchandise."',
      options: [
        { text: 'to pay', correct: true, rationale: 'Refuse bắt buộc đi với to-infinitive (to pay).' },
        { text: 'paying', correct: false, rationale: 'Refuse không đi với V-ing.' },
        { text: 'pay', correct: false, rationale: 'Thiếu to trước động từ nguyên mẫu.' },
      ],
      acceptedAnswers: [{ text: 'to pay', rationale: 'Refuse takes a to-infinitive complement: to pay.' }],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "attend": "She managed _____ all the online lectures despite her busy work schedule."',
      options: [],
      acceptedAnswers: [
        { text: 'to attend', rationale: 'Manage is followed by the to-infinitive to attend.' },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-r3',
      kind: 'transform',
      prompt: 'Rewrite using "would like to": "I want to have a meeting with the marketing director tomorrow."',
      options: [],
      acceptedAnswers: [
        { text: 'I would like to have a meeting with the marketing director tomorrow.', rationale: 'Uses polite expression would like to have.' },
        { text: "I'd like to have a meeting with the marketing director tomorrow.", rationale: "Contraction I'd like to have is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-r4',
      kind: 'correction',
      prompt: 'Correct the error: "They agreed helping us with the community cleanup project."',
      options: [],
      acceptedAnswers: [
        { text: 'They agreed to help us with the community cleanup project.', rationale: 'Changes helping to to-infinitive to help after agreed.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-o1',
      prompt: 'Viết 2 câu về kế hoạch hoặc mục tiêu tương lai của bạn, sử dụng các động từ "plan", "hope" hoặc "decide" đi kèm với to-infinitive.',
      modelAnswer: 'I plan to study advanced web development at university next year. I also hope to achieve an IELTS band score of 7.0 before graduation.',
      checks: [
        'Dùng đúng plan / hope / decide đi kèm to-infinitive (to study, to achieve).',
        'Cấu trúc câu hoàn chỉnh, đúng thì ngữ pháp.',
        'Ý nghĩa rõ ràng, phù hợp chủ đề kế hoạch tương lai.',
      ],
    },
    {
      id: 'grammar-v2-a2-infinitive-after-verbs-26-o2',
      prompt: 'Viết 2 câu kể về việc bạn đi đến một địa điểm cụ thể và nêu rõ mục đích của chuyến đi bằng cách dùng to-infinitive of purpose (để làm gì).',
      modelAnswer: 'Yesterday afternoon, I went to the central bookstore to buy a new English dictionary. Later, I stopped at a quiet coffee shop to read the first chapter.',
      checks: [
        'Sử dụng to-infinitive chỉ mục đích (to buy, to read).',
        'Không dùng for + V-bare để chỉ mục đích.',
        'Câu văn mạch lạc, đúng thì quá khứ đơn.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-verbs-infinitives',
      title: 'Cambridge Dictionary: Verbs followed by to-infinitive',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/verb-patterns-verbs-with-to-infinitive',
      claims: [
        'Verbs such as decide, hope, plan, promise, and refuse are followed by a to-infinitive.',
        'The to-infinitive can be used as an infinitive of purpose to explain why someone does something.',
        'Negative infinitives place not before to (e.g., decide not to go).',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit west',
    reviewedAt: '2026-10-06T05:54:31Z',
  },
};

export default infinitiveAfterVerbsLesson;
