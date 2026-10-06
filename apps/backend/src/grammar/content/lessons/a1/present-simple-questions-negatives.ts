/**
 * @file present-simple-questions-negatives.ts
 * @description Câu hỏi và phủ định thì hiện tại đơn với trợ động từ do và does.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-present-simple-questions-negatives-15',
  revisionId: 'grammar-v2-a1-present-simple-questions-negatives-15@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại đơn: Câu phủ định và câu hỏi với Do / Does',
  objective: 'Thành lập chính xác câu phủ định và câu hỏi Yes/No trong thì hiện tại đơn với trợ động từ do / does / don’t / doesn’t, giữ động từ chính ở dạng nguyên thể.',
  prerequisiteIds: ['grammar-v2-a1-present-simple-positive-14'],
  coverage: ['present-simple-questions-negatives', 'present-simple', 'negative', 'questions', 'auxiliary-do'],
  context: {
    english: 'Ben and Clara are interviewing a prospective roommate about daily habits, dietary preferences, and weekend schedules.',
    vietnamese: 'Ben và Clara đang phỏng vấn một người bạn cùng phòng tiềm năng về thói quen sinh hoạt, sở thích ăn uống và lịch trình cuối tuần.',
  },
  guide: {
    pattern: 'Phủ định: S + do not (don’t) / does not (doesn’t) + V(nguyên mẫu); Câu hỏi: Do / Does + S + V(nguyên mẫu)...?',
    whenToUse: [
      'Dùng don’t (I/you/we/they) hoặc doesn’t (he/she/it) để phủ định thói quen hoặc sự thật ở hiện tại.',
      'Dùng Do hoặc Does ở đầu câu để hỏi dạng Yes/No về thói quen, công việc hoặc tình trạng.',
    ],
    signalWords: ['don’t', 'doesn’t', 'do you', 'does he', 'never', 'usually', 'often'],
    check: [
      'Động từ chính đã được đưa về dạng nguyên thể (không thêm -s/-es) sau do / does / don’t / doesn’t chưa?',
      'Đã chọn đúng don’t / doesn’t và Do / Does tương ứng với chủ ngữ chưa?',
    ],
  },
  explanation: 'Trong câu phủ định với not và câu hỏi Yes/No hiện tại đơn của động từ thường, dùng do/does theo chủ ngữ và giữ động từ chính ở dạng nguyên mẫu không to. Trả lời ngắn: Yes, S + do/does; No, S + don’t/doesn’t. Be và động từ khuyết thiếu có cấu trúc riêng, không mượn do trong những câu này. Không phải mọi cách phủ định đều cần do: He never drinks coffee dùng never với động từ chia khẳng định.',
  examples: [
    { english: 'I don’t drink coffee late in the evening.', vietnamese: 'Tôi không uống cà phê vào buổi tối muộn. (I đi với don’t + drink nguyên mẫu).' },
    { english: 'Mark doesn’t eat seafood because of an allergy.', vietnamese: 'Mark không ăn hải sản vì bị dị ứng. (Mark là ngôi ba số ít, dùng doesn’t + eat nguyên mẫu).' },
    { english: 'Do you live near the city university? — Yes, I do.', vietnamese: 'Bạn có sống gần trường đại học thành phố không? — Có, tôi có sống gần đó.' },
    { english: 'Does your sister work on Saturdays? — No, she doesn’t.', vietnamese: 'Chị gái bạn có làm việc vào thứ Bảy không? — Không, chị ấy không làm.' },
    { english: 'They don’t own a car, so they take the bus.', vietnamese: 'Họ không sở hữu ô tô, nên họ đi xe buýt.' },
    { english: 'Does this bus go to the airport?', vietnamese: 'Chuyến xe buýt này có đi đến sân bay không?' },
  ],
  contrasts: [
    {
      form: 'She doesn’t work vs She doesn’t works',
      whyFits: 'Sau trợ động từ doesn’t, động từ chính work bắt buộc giữ ở dạng nguyên mẫu.',
      whyNot: 'Dạng "doesn’t works" là lỗi chia ngôi hai lần (ở cả trợ động từ và động từ chính).',
    },
    {
      form: 'Do you like tea? vs Are you like tea?',
      whyFits: 'Like là động từ thường nên phải mượn trợ động từ Do trong câu hỏi.',
      whyNot: 'Are là dạng của to be; không dùng to be làm trợ động từ đứng trước động từ nguyên mẫu thường.',
    },
  ],
  commonMistakes: [
    'Giữ lại đuôi -s sau doesn’t: “He doesn’t watches TV” → Cần sửa thành “He doesn’t watch TV”.',
    'Dùng nhầm don’t cho chủ ngữ ngôi thứ ba số ít: “She don’t like milk” → Cần dùng “She doesn’t like milk”.',
    'Dùng to be thay vì do/does trong câu hỏi: “Are you work here?” → Cần sửa thành “Do you work here?”.',
  ],
  summary: 'Với động từ thường: S + don’t/doesn’t + V; Do/Does + S + V? Sau do/does, động từ chính ở dạng nguyên mẫu. Không áp dụng cấu trúc này cho be hoặc động từ khuyết thiếu.',
  exercises: [
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q1',
      kind: 'choice',
      prompt: '___ your brother play the guitar in a band?',
      options: [
        { text: 'Does', correct: true, rationale: 'Your brother là ngôi thứ ba số ít nên câu hỏi Yes/No dùng trợ động từ Does.' },
        { text: 'Do', correct: false, rationale: 'Do chỉ dùng cho các chủ ngữ số nhiều hoặc I / you.' },
        { text: 'Is', correct: false, rationale: 'Is không đi cùng động từ nguyên mẫu play để tạo câu hỏi hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'Does', rationale: 'Does là trợ động từ câu hỏi cho ngôi thứ ba số ít.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q2',
      kind: 'choice',
      prompt: 'I ___ eat spicy food because my stomach is sensitive.',
      options: [
        { text: 'don’t', correct: true, rationale: 'Chủ ngữ I kết hợp với trợ động từ phủ định don’t.' },
        { text: 'doesn’t', correct: false, rationale: 'Doesn’t chỉ dùng cho ngôi he/she/it.' },
        { text: 'not', correct: false, rationale: 'Not không thể đứng một mình trước động từ thường mà cần trợ động từ.' },
      ],
      acceptedAnswers: [{ text: 'don’t', rationale: 'Don’t là dạng phủ định đi với ngôi I.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q3',
      kind: 'choice',
      prompt: 'Does Sarah ___ to the gym three times a week?',
      options: [
        { text: 'go', correct: true, rationale: 'Sau trợ động từ Does, động từ chính giữ nguyên mẫu go.' },
        { text: 'goes', correct: false, rationale: 'Không thêm -es vào động từ chính khi đã có trợ động từ Does.' },
        { text: 'going', correct: false, rationale: 'Going là dạng V-ing, không phải động từ nguyên mẫu trong cấu trúc hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'go', rationale: 'Go ở dạng nguyên mẫu sau trợ động từ Does.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q4',
      kind: 'choice',
      prompt: 'They ___ have classes on Saturday mornings.',
      options: [
        { text: 'don’t', correct: true, rationale: 'They là chủ ngữ số nhiều, phủ định dùng don’t.' },
        { text: 'doesn’t', correct: false, rationale: 'Doesn’t chỉ dùng cho chủ ngữ ngôi thứ ba số ít.' },
        { text: 'aren’t', correct: false, rationale: 'Aren’t không dùng trước động từ nguyên mẫu have.' },
      ],
      acceptedAnswers: [{ text: 'don’t', rationale: 'Don’t đi với chủ ngữ số nhiều They.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q5',
      kind: 'gap',
      prompt: 'Nam doesn’t ___ (watch) television in the morning.',
      options: [],
      acceptedAnswers: [
        { text: 'watch', rationale: 'Sau trợ động từ doesn’t, động từ watch ở dạng nguyên mẫu không thêm -es.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q6',
      kind: 'gap',
      prompt: '___ you speak English with your colleagues? (Do / Does)',
      options: [],
      acceptedAnswers: [
        { text: 'Do', rationale: 'Chủ ngữ you dùng trợ động từ Do trong câu hỏi.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q7',
      kind: 'gap',
      prompt: 'My father ___ (not / drink) coffee after 4 PM.',
      options: [],
      acceptedAnswers: [
        { text: 'doesn’t drink', rationale: 'My father là ngôi thứ ba số ít, phủ định dùng doesn’t drink.' },
        { text: 'does not drink', rationale: 'Dạng đầy đủ does not drink hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q8',
      kind: 'gap',
      prompt: 'Does this train ___ (arrive) on time every day? (arrive / arrives)',
      options: [],
      acceptedAnswers: [
        { text: 'arrive', rationale: 'Động từ chính giữ nguyên mẫu arrive sau trợ động từ Does.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định: "Huy drinks green tea every morning."',
      options: [],
      acceptedAnswers: [
        { text: 'Huy doesn’t drink green tea every morning.', rationale: 'Mượn doesn’t và đưa drinks về nguyên mẫu drink.' },
        { text: 'Huy does not drink green tea every morning.', rationale: 'Dạng đầy đủ does not drink hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi Yes/No: "You live near the train station."',
      options: [],
      acceptedAnswers: [
        { text: 'Do you live near the train station?', rationale: 'Thêm trợ động từ Do ở đầu câu hỏi với chủ ngữ you.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "My sister doesn’t likes spicy food."',
      options: [],
      acceptedAnswers: [
        { text: 'My sister doesn’t like spicy food.', rationale: 'Đưa likes về dạng nguyên mẫu like sau trợ động từ doesn’t.' },
        { text: 'My sister does not like spicy food.', rationale: 'Dạng đầy đủ does not like cũng chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "Do your father work at a hospital?"',
      options: [],
      acceptedAnswers: [
        { text: 'Does your father work at a hospital?', rationale: 'Your father là ngôi thứ ba số ít nên câu hỏi phải dùng trợ động từ Does.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-r1',
      kind: 'choice',
      prompt: 'Does this small bakery ___ credit card payments?',
      options: [
        { text: 'accept', correct: true, rationale: 'Sau trợ động từ Does, động từ chính accept giữ ở dạng nguyên mẫu.' },
        { text: 'accepts', correct: false, rationale: 'Không chia -s vào động từ chính khi đã có trợ động từ Does.' },
        { text: 'accepting', correct: false, rationale: 'Accepting là dạng V-ing, không phù hợp sau trợ động từ Does.' },
      ],
      acceptedAnswers: [{ text: 'accept', rationale: 'Accept giữ nguyên mẫu sau trợ động từ Does.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-r2',
      kind: 'gap',
      prompt: 'We ___ (not / work) on Sundays.',
      options: [],
      acceptedAnswers: [
        { text: 'don’t work', rationale: 'Chủ ngữ We đi với don’t work.' },
        { text: 'do not work', rationale: 'Dạng đầy đủ do not work hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi Yes/No: "Minh speaks Japanese very well."',
      options: [],
      acceptedAnswers: [
        { text: 'Does Minh speak Japanese very well?', rationale: 'Đặt Does ở đầu câu và đưa speaks về nguyên mẫu speak.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "She don’t live with her parents anymore."',
      options: [],
      acceptedAnswers: [
        { text: 'She doesn’t live with her parents anymore.', rationale: 'Chủ ngữ She là ngôi thứ ba số ít nên phải dùng doesn’t thay vì don’t.' },
        { text: 'She does not live with her parents anymore.', rationale: 'Dạng đầy đủ does not live cũng đúng.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-o1',
      prompt: 'Viết 4 câu hỏi Yes/No sử dụng Do hoặc Does để phỏng vấn một người bạn mới về thói quen sinh hoạt và sở thích.',
      modelAnswer: 'Do you wake up early on weekends?\nDo you like spicy food?\nDoes your best friend play computer games?\nDoes your family have pets at home?',
      checks: [
        'Sử dụng chính xác Do với you/your friends (số nhiều) và Does với he/she/your friend (số ít).',
        'Động từ chính trong cả 4 câu đều ở dạng nguyên mẫu không thêm -s/-es.',
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-questions-negatives-15-o2',
      prompt: 'Viết 3-4 câu nói về những việc bạn KHÔNG làm vào các ngày trong tuần (dùng I don’t...) và những việc một người thân KHÔNG làm (dùng he/she doesn’t...).',
      modelAnswer: 'I don’t stay up late on weekdays. I don’t drink coffee in the evening. My sister doesn’t eat breakfast at home. She doesn’t walk to school because it is far.',
      checks: [
        'Sử dụng đúng don’t với I và doesn’t với he/she.',
        'Động từ chính đi sau don’t và doesn’t giữ nguyên thể.',
      ],
    },
  ],
  sources: [
    {
      "id": "present",
      "title": "British Council: Present simple",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-simple",
      "claims": [
        "Present simple expresses regular actions and facts; third person singular changes the verb, and do/does forms questions and negatives."
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
