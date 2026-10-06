/**
 * @file possessive-pronouns.ts
 * @description A1 possessive-pronouns lesson definition: mine, yours, his, hers, ours, theirs replacing possessive phrases.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-possessive-pronouns-08',
  revisionId: 'grammar-v2-a1-possessive-pronouns-08@1.0.0',
  revision: '1.0.0',
  title: 'Đại từ sở hữu: mine, yours, his, hers, ours, theirs',
  objective: 'Nhận biết và sử dụng thành thạo các đại từ sở hữu (mine, yours, his, hers, ours, theirs) để thay thế cụm tính từ sở hữu + danh từ, tránh lặp từ và làm câu văn gọn gàng.',
  prerequisiteIds: ['grammar-v2-a1-possessive-determiners-07'],
  coverage: ['possessive-pronouns', 'pronouns', 'possession'],
  context: {
    english: 'This green pen is mine, and that blue one is yours. Sarah lost her notebook, but David found his on the desk.',
    vietnamese: 'Chiếc bút màu xanh lá này là của tôi, còn chiếc màu xanh dương kia là của bạn. Sarah làm mất cuốn vở của cô ấy, nhưng David đã tìm thấy cuốn của anh ấy trên bàn.',
  },
  guide: {
    pattern: 'Subject / Noun phrase + be + Possessive Pronoun (mine / yours / his / hers / ours / theirs) || Possessive Pronoun as Subject/Object',
    whenToUse: [
      'Thay thế hoàn toàn cụm "tính từ sở hữu + danh từ" đã được đề cập trước đó',
      'Đứng độc lập làm chủ ngữ hoặc bổ ngữ sau động từ to be mà không cần danh từ đi kèm',
      'Trả lời trực tiếp câu hỏi hỏi quyền sở hữu bắt đầu bằng từ để hỏi "Whose...?"',
    ],
    signalWords: ['mine', 'yours', 'his', 'hers', 'ours', 'theirs', 'whose', 'belong to', 'own'],
    check: [
      'Bảng tương ứng: my book -> mine, your phone -> yours, his car -> his, her bag -> hers, our room -> ours, their tickets -> theirs',
      'Đại từ sở hữu đứng một mình, KHÔNG BAO GIỜ có danh từ theo sau (KHÔNG nói: mine laptop, hers cat)',
      'Tuyệt đối không có dấu nháy đơn trong yours, hers, ours, theirs (KHÔNG viết your\'s, her\'s, our\'s, their\'s)',
      '"his" vừa là tính từ sở hữu vừa là đại từ sở hữu (his watch / this watch is his)',
      'Dạng "its" hầu như không dùng làm đại từ sở hữu độc lập trong tiếng Anh hiện đại',
    ],
  },
  explanation: 'Đại từ sở hữu (possessive pronouns) được dùng để thay thế cho cả cụm gồm "tính từ sở hữu + danh từ" khi đối tượng sở hữu đã rõ ràng trong ngữ cảnh trước đó. Việc sử dụng đại từ sở hữu giúp câu văn ngắn gọn, mạch lạc và tự nhiên hơn rất nhiều so với việc lặp lại danh từ liên tục. Ví dụ, thay vì nói "My coffee is hot, but your coffee is cold", ta nói gọn lại thành "My coffee is hot, but yours is cold" (ở đây "yours" thay cho "your coffee"). Bảng đại từ sở hữu gồm: "mine" (của tôi), "yours" (của bạn/các bạn), "his" (của anh ấy), "hers" (của cô ấy), "ours" (của chúng tôi/chúng ta), và "theirs" (của họ/chúng). Điểm khác biệt quan trọng nhất giữa tính từ sở hữu và đại từ sở hữu là: tính từ sở hữu luôn bắt buộc có danh từ phía sau (my pen), còn đại từ sở hữu đứng độc lập và không bao giờ đi kèm danh từ (This pen is mine). Chú ý không được thêm dấu nháy đơn vào các đại từ sở hữu có đuôi -s (rất nhiều người viết sai thành your\'s hay her\'s).',
  examples: [
    { english: 'This umbrella is mine; yours is standing in the corner.', vietnamese: 'Chiếc ô này là của tôi; của bạn đang dựng ở góc phòng kìa. (mine = my umbrella; yours = your umbrella).' },
    { english: 'Her presentation was great, but his was even more detailed.', vietnamese: 'Bài thuyết trình của cô ấy rất hay, nhưng bài của anh ấy còn chi tiết hơn nữa. (his = his presentation).' },
    { english: 'Our apartment has a balcony, while theirs has a large terrace.', vietnamese: 'Căn hộ của chúng tôi có ban công, trong khi căn hộ của họ có sân thượng rộng. (theirs = their apartment).' },
    { english: 'Whose jacket is this on the conference chair? - It\'s hers.', vietnamese: 'Chiếc áo khoác này trên ghế hội nghị là của ai? - Là của cô ấy. (hers = her jacket).' },
    { english: 'Your proposal won the client\'s approval, and ours came very close.', vietnamese: 'Đề xuất của bạn đã được khách hàng duyệt, còn đề xuất của chúng tôi cũng bám sát. (ours = our proposal).' },
    { english: 'Don\'t worry about that water bottle; it isn\'t yours.', vietnamese: 'Đừng bận tâm về chai nước đó; nó không phải là của bạn đâu. (yours đứng độc lập sau isn\'t).' },
  ],
  contrasts: [
    {
      form: 'This bag is mine vs This is mine bag',
      whyFits: 'Dùng "This bag is mine" chuẩn xác vì mine đứng độc lập làm bổ ngữ sau động từ to be.',
      whyNot: '"mine bag" là lỗi nghiêm trọng vì mine là đại từ sở hữu, không được đứng trước danh từ. Phải dùng "my bag".',
    },
    {
      form: 'Is that notebook yours? vs Is that notebook your\'s?',
      whyFits: 'Dùng "yours" đúng quy tắc chính tả đại từ sở hữu.',
      whyNot: 'Đại từ sở hữu tuyệt đối không có dấu nháy đơn; "your\'s" là lỗi chính tả do nhầm với sở hữu cách danh từ (\'s).',
    },
  ],
  commonMistakes: [
    'Đặt danh từ phía sau đại từ sở hữu: nói "That is mine car" thay vì "That is my car" hoặc "That car is mine".',
    'Thêm dấu nháy đơn vào đại từ sở hữu có đuôi s: viết "her\'s", "your\'s", "our\'s", "their\'s".',
    'Nhầm lẫn giữa my và mine: nói "Where is mine notebook?" thay vì "my notebook".',
  ],
  summary: 'Đại từ sở hữu thay thế cho [tính từ sở hữu + danh từ]: mine, yours, his, hers, ours, theirs. Đứng độc lập, không đi kèm danh từ, không có dấu nháy đơn.',
  exercises: [
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q1',
      kind: 'choice',
      prompt: 'Chọn từ chính xác để hoàn thành câu: "My computer is slow, but ___ is extremely fast."',
      options: [
        { text: 'hers', correct: true, rationale: '"hers" là đại từ sở hữu thay thế cho cụm "her computer".' },
        { text: 'her', correct: false, rationale: '"her" là tính từ sở hữu, bắt buộc phải có danh từ theo sau.' },
        { text: "her's", correct: false, rationale: '"her\'s" là lỗi viết sai chính tả, đại từ sở hữu không có dấu nháy đơn.' },
      ],
      acceptedAnswers: [{ text: 'hers', rationale: 'hers là đại từ sở hữu chính xác.' }],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q2',
      kind: 'choice',
      prompt: 'Chọn câu trả lời đúng cho câu hỏi: "Whose car is parked in front of the gate?"',
      options: [
        { text: 'It is mine.', correct: true, rationale: '"mine" là đại từ sở hữu đứng độc lập chỉ "xe của tôi".' },
        { text: 'It is my.', correct: false, rationale: '"my" là tính từ sở hữu, không được đứng một mình cuối câu.' },
        { text: 'It is me.', correct: false, rationale: '"me" là đại từ tân ngữ chỉ người, không chỉ quyền sở hữu chiếc xe.' },
      ],
      acceptedAnswers: [{ text: 'It is mine.', rationale: 'mine thay cho my car.' }],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q3',
      kind: 'choice',
      prompt: 'Chọn đại từ sở hữu thích hợp: "Our flight was on time, but ___ was delayed by two hours."',
      options: [
        { text: 'theirs', correct: true, rationale: '"theirs" thay thế cho "their flight" một cách chính xác.' },
        { text: 'their', correct: false, rationale: '"their" là tính từ sở hữu, thiếu danh từ flight đi kèm.' },
        { text: "their's", correct: false, rationale: '"their\'s" là lỗi viết sai chính tả.' },
      ],
      acceptedAnswers: [{ text: 'theirs', rationale: 'theirs thay thế cho their flight.' }],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q4',
      kind: 'choice',
      prompt: 'Chọn phương án viết đúng đại từ sở hữu: "Is this black jacket ___?"',
      options: [
        { text: 'yours', correct: true, rationale: '"yours" là đại từ sở hữu đúng chính tả.' },
        { text: "your's", correct: false, rationale: '"your\'s" viết sai chính tả vì có dấu nháy đơn.' },
        { text: 'your', correct: false, rationale: '"your" là tính từ sở hữu, không thể đứng đơn độc ở cuối câu.' },
      ],
      acceptedAnswers: [{ text: 'yours', rationale: 'yours là đại từ sở hữu chuẩn.' }],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q5',
      kind: 'gap',
      prompt: 'Điền đại từ sở hữu của ngôi "I": "I found this pen under the table. Is it your pen or is it ___?"',
      options: [],
      acceptedAnswers: [
        { text: 'mine', rationale: 'mine là đại từ sở hữu của ngôi I.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q6',
      kind: 'gap',
      prompt: 'Điền đại từ sở hữu thích hợp: "Lan forgot her umbrella, so I lent her ___ (của tôi)."',
      options: [],
      acceptedAnswers: [
        { text: 'mine', rationale: 'mine thay thế cho my umbrella.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q7',
      kind: 'gap',
      prompt: 'Điền đại từ sở hữu của ngôi "we": "They brought their projector, and we brought ___."',
      options: [],
      acceptedAnswers: [
        { text: 'ours', rationale: 'ours là đại từ sở hữu tương ứng với we (thay cho our projector).' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q8',
      kind: 'gap',
      prompt: 'Điền đại từ sở hữu của ngôi "he": "That is not my briefcase; it is ___ (của anh ấy)."',
      options: [],
      acceptedAnswers: [
        { text: 'his', rationale: 'his là đại từ sở hữu của ngôi he.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng đại từ sở hữu "mine": "This is my seat." -> "This seat is ___."',
      options: [],
      acceptedAnswers: [
        { text: 'This seat is mine.', rationale: 'Chuyển my seat thành This seat is mine.' },
        { text: 'mine', rationale: 'mine là đại từ sở hữu thay thế cho my seat.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng đại từ sở hữu "theirs": "Those are their bicycles." -> "Those bicycles are ___."',
      options: [],
      acceptedAnswers: [
        { text: 'Those bicycles are theirs.', rationale: 'Chuyển their bicycles thành Those bicycles are theirs.' },
        { text: 'theirs', rationale: 'theirs thay cho their bicycles.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai dùng từ trong câu sau: "You can take mine jacket because it is cold."',
      options: [],
      acceptedAnswers: [
        { text: 'my jacket', rationale: 'Trước danh từ jacket phải dùng tính từ sở hữu my thay vì đại từ sở hữu mine.' },
        { text: 'my', rationale: 'Đổi mine thành my.' },
        { text: 'You can take my jacket because it is cold.', rationale: 'Câu hoàn chỉnh sau khi sửa.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi chính tả trong câu sau: "This blue backpack is her\'s."',
      options: [],
      acceptedAnswers: [
        { text: 'hers', rationale: 'Bỏ dấu nháy đơn, viết đúng là hers.' },
        { text: 'This blue backpack is hers.', rationale: 'Câu hoàn chỉnh sửa her\'s thành hers.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-r1',
      kind: 'choice',
      prompt: 'Chọn câu diễn đạt tự nhiên và đúng ngữ pháp nhất:',
      options: [
        { text: 'Your coffee is on the counter, and mine is in the fridge.', correct: true, rationale: 'mine đứng độc lập thay cho my coffee rất tự nhiên và chính xác.' },
        { text: 'Your coffee is on the counter, and my is in the fridge.', correct: false, rationale: 'my không thể đứng độc lập làm chủ ngữ.' },
        { text: "Your coffee is on the counter, and mine's is in the fridge.", correct: false, rationale: "mine's là từ viết sai ngữ pháp." },
      ],
      acceptedAnswers: [{ text: 'Your coffee is on the counter, and mine is in the fridge.', rationale: 'mine là đại từ sở hữu chính xác.' }],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu: "We compared our test results: their scores were high, but ___ were even higher." (chúng tôi)',
      options: [],
      acceptedAnswers: [
        { text: 'ours', rationale: 'ours thay thế cho our scores.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng đại từ sở hữu: "That passport belongs to you." -> "That passport is ___."',
      options: [],
      acceptedAnswers: [
        { text: 'That passport is yours.', rationale: 'Thay belongs to you bằng is yours.' },
        { text: 'yours', rationale: 'yours là đại từ sở hữu.' },
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi chính tả trong câu: "Are these keys our\'s or your\'s?"',
      options: [],
      acceptedAnswers: [
        { text: 'ours or yours', rationale: 'Đổi our\'s và your\'s thành ours và yours.' },
        { text: 'Are these keys ours or yours?', rationale: 'Câu hoàn chỉnh bỏ dấu nháy đơn.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-o1',
      prompt: 'Viết 3 câu so sánh đồ dùng học tập hoặc thiết bị công nghệ giữa bạn và một người bạn, sử dụng đại từ sở hữu (ví dụ: mine, yours, his, hers).',
      modelAnswer: 'My smartphone has a cracked screen, but yours looks brand new. I really admire your photography skills, though mine are improving quickly. If you forget your charger, you can always borrow mine.',
      checks: [
        'Sử dụng ít nhất 2 đại từ sở hữu khác nhau (mine, yours)',
        'Đại từ sở hữu đứng độc lập, không đi kèm danh từ theo sau',
        'Không có lỗi chính tả dấu nháy đơn',
      ],
    },
    {
      id: 'grammar-v2-a1-possessive-pronouns-08-o2',
      prompt: 'Viết đoạn đối thoại 4 lượt lời giữa hai đồng nghiệp tìm chủ nhân của một cuốn sổ hoặc món đồ thất lạc trong phòng họp, dùng câu hỏi "Whose...?" và đại từ sở hữu.',
      modelAnswer: 'A: Whose notebook is this on the conference table?\nB: It isn\'t mine. I think it is hers because she was sitting there earlier.\nA: Are you sure? What about these pens?\nB: Those pens are definitely theirs; the design team left them behind.',
      checks: [
        'Có câu hỏi với Whose...?',
        'Sử dụng đúng các đại từ sở hữu (mine, hers, theirs)',
        'Ngữ cảnh giao tiếp tự nhiên và lịch sự',
      ],
    },
  ],
  sources: [
    {
      "id": "possPro",
      "title": "British Council: Possessives: pronouns",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/possessives-pronouns",
      "claims": [
        "Mine/yours/his/hers/ours/theirs replace possessive noun phrases and do not take apostrophes."
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
