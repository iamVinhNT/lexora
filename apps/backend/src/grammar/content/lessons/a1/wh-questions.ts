/**
 * @file wh-questions.ts
 * @description Câu hỏi lấy thông tin với các từ để hỏi Wh-: cấu trúc trật tự từ với to be và trợ động từ do/does/did.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-wh-questions-20',
  revisionId: 'grammar-v2-a1-wh-questions-20@1.0.0',
  revision: '1.0.0',
  title: 'Câu hỏi có từ để hỏi (Wh-questions): Who, What, Where, When, Why, How',
  objective: 'Xác định đúng từ để hỏi phù hợp với thông tin cần tìm và thành lập câu hỏi Wh- chính xác với động từ to be hoặc trợ động từ do / does / did theo trật tự từ chuẩn.',
  prerequisiteIds: ['grammar-v2-a1-past-simple-irregular-19'],
  coverage: ['wh-questions', 'question-words', 'information-questions', 'word-order'],
  context: {
    english: 'Thu volunteers at a tourist information kiosk near Hoan Kiem Lake, helping international visitors find museums, ask about bus schedules, and discover local street food.',
    vietnamese: 'Thu làm tình nguyện viên tại quầy thông tin du lịch gần hồ Hoàn Kiếm, giúp đỡ du khách quốc tế tìm bảo tàng, hỏi về lịch trình xe buýt và khám phá ẩm thực đường phố địa phương.',
  },
  guide: {
    pattern: 'Với to be: Wh- + am / is / are / was / were + S...?; Với động từ thường: Wh- + do / does / did + S + V(nguyên mẫu)...?',
    whenToUse: [
      'Dùng khi muốn hỏi và nhận câu trả lời là thông tin cụ thể (không thể trả lời chỉ bằng Yes hoặc No).',
      'Phân loại từ để hỏi: Who (người), What (vật, sự việc), Where (địa điểm), When (thời gian), Why (nguyên nhân, lý do), How (cách thức, phương tiện).',
    ],
    signalWords: ['Who', 'What', 'Where', 'When', 'Why', 'How', 'How often', 'How much'],
    check: [
      'Từ để hỏi đã phản ánh đúng loại thông tin cần tìm chưa (Where cho nơi chốn, When cho thời gian...)?',
      'Nếu từ hỏi không phải chủ ngữ, đã đặt trợ động từ hoặc be trước chủ ngữ chưa? Câu hỏi chủ ngữ như Who lives here? không cần do.',
      'Sau trợ động từ do / does / did, động từ chính đã về dạng nguyên mẫu chưa?',
    ],
  },
  explanation: 'Who/what/where/when/why/how hỏi thông tin cụ thể; một câu trả lời chỉ Yes/No thường không cung cấp thông tin cần tìm. Với be, thường đặt từ hỏi trước be và chủ ngữ. Với động từ thường, câu hỏi về tân ngữ hoặc trạng ngữ thường có Wh- + do/does/did + S + V nguyên mẫu. Ngoại lệ quan trọng: khi who/what chính là chủ ngữ, không thêm do hay đảo một chủ ngữ khác (Who lives here? What happened?). Bài này chủ yếu luyện câu hỏi có be và câu hỏi về thông tin không phải chủ ngữ.',
  examples: [
    { english: 'Where in Hanoi do you live? — I live in Ba Dinh District.', vietnamese: 'Bạn sống ở đâu tại Hà Nội? — Tôi sống ở quận Ba Đình. (Where hỏi địa điểm, mượn trợ động từ do).' },
    { english: 'When does the morning train depart? — It departs at eight.', vietnamese: 'Khi nào chuyến tàu sáng khởi hành? — Tàu chạy lúc tám giờ. (When hỏi thời gian, mượn does).' },
    { english: 'What did you buy at the souvenir shop? — I bought two postcards.', vietnamese: 'Bạn đã mua gì ở cửa hàng lưu niệm? — Tôi đã mua hai tấm bưu thiếp. (What hỏi đồ vật, did ở quá khứ).' },
    { english: 'Who is your English teacher? — Ms. Sarah is our teacher.', vietnamese: 'Ai là giáo viên tiếng Anh của bạn? — Cô Sarah là giáo viên của chúng tôi. (Who hỏi người, dùng to be is).' },
    { english: 'Why are you late for class? — Because my bus broke down.', vietnamese: 'Tại sao bạn đi học muộn? — Vì xe buýt của tôi bị hỏng. (Why hỏi lý do, trả lời bằng Because).' },
    { english: 'How do you travel to work every day? — I travel by electric scooter.', vietnamese: 'Bạn đi làm mỗi ngày bằng phương tiện gì? — Tôi đi bằng xe máy điện. (How hỏi cách thức, phương tiện).' },
  ],
  contrasts: [
    {
      form: 'Where do you live? vs Where you live?',
      whyFits: 'Where do you live tuân thủ cấu trúc câu hỏi có mượn trợ động từ do đứng trước chủ ngữ you.',
      whyNot: 'Dạng "Where you live?" là lỗi bỏ quên trợ động từ phổ biến khi học viên ghép từ trực tiếp theo thói quen tiếng Việt.',
    },
    {
      form: 'Do you like coffee? vs What do you like to drink?',
      whyFits: 'Do you like coffee là câu hỏi Yes/No; What do you like to drink là câu hỏi Wh- tìm kiếm thông tin cụ thể về món đồ uống ưa thích.',
      whyNot: 'Trả lời "Yes, I do" cho câu hỏi What do you like là trả lời sai thể loại câu hỏi.',
    },
  ],
  commonMistakes: [
    'Quên trợ động từ: “Where you go yesterday?” → Cần sửa thành “Where did you go yesterday?”.',
    'Nhầm lẫn từ để hỏi: dùng Where thay vì When để hỏi thời gian: “Where does the train leave? — At 6 PM” → Cần dùng “When does the train leave?”.',
    'Chia động từ chính sau trợ động từ: “What did you bought?” → Cần sửa thành “What did you buy?”.',
  ],
  summary: 'Wh- + be + S...?; với câu hỏi không hỏi chủ ngữ: Wh- + do/does/did + S + V...? Who/What làm chủ ngữ thì không cần do (Who called?).',
  exercises: [
    {
      id: 'grammar-v2-a1-wh-questions-20-q1',
      kind: 'choice',
      prompt: '___ did you leave your umbrella yesterday? — In the library reading room.',
      options: [
        { text: 'Where', correct: true, rationale: 'Câu trả lời chỉ nơi chốn (In the library reading room), nên từ để hỏi phù hợp là Where.' },
        { text: 'When', correct: false, rationale: 'When dùng để hỏi thời điểm thời gian.' },
        { text: 'Why', correct: false, rationale: 'Why dùng để hỏi nguyên nhân lý do.' },
      ],
      acceptedAnswers: [{ text: 'Where', rationale: 'Where dùng để hỏi thông tin về địa điểm.' }],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q2',
      kind: 'choice',
      prompt: '___ does the museum open in the morning? — It opens at half past eight.',
      options: [
        { text: 'When', correct: true, rationale: 'Câu trả lời đưa ra mốc thời gian (At half past eight), nên dùng When.' },
        { text: 'Who', correct: false, rationale: 'Who hỏi về con người.' },
        { text: 'Where', correct: false, rationale: 'Where hỏi về địa điểm.' },
      ],
      acceptedAnswers: [{ text: 'When', rationale: 'When là từ để hỏi về thời gian.' }],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q3',
      kind: 'choice',
      prompt: 'What ___ your sister do on Sunday afternoons?',
      options: [
        { text: 'does', correct: true, rationale: 'Your sister là ngôi thứ ba số ít, trợ động từ hiện tại đơn là does.' },
        { text: 'do', correct: false, rationale: 'Do chỉ dùng cho các chủ ngữ số nhiều hoặc I/you.' },
        { text: 'is', correct: false, rationale: 'Is không đi cùng động từ nguyên mẫu do trong câu hỏi hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'does', rationale: 'Does là trợ động từ cho ngôi thứ ba số ít trong câu hỏi hiện tại.' }],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q4',
      kind: 'choice',
      prompt: 'Why ___ you absent from the meeting yesterday morning?',
      options: [
        { text: 'were', correct: true, rationale: 'Absent là tính từ, chủ ngữ you ở thì quá khứ dùng động từ to be were.' },
        { text: 'did', correct: false, rationale: 'Did là trợ động từ cho động từ thường, không dùng trực tiếp trước tính từ absent.' },
        { text: 'are', correct: false, rationale: 'Are là thì hiện tại, không phù hợp mốc yesterday morning.' },
      ],
      acceptedAnswers: [{ text: 'were', rationale: 'Were là dạng to be quá khứ đi với chủ ngữ you.' }],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q5',
      kind: 'gap',
      prompt: '___ (How / Why) do you go to university every morning? — By bicycle.',
      options: [],
      acceptedAnswers: [
        { text: 'How', rationale: 'How dùng để hỏi về cách thức, phương tiện đi lại.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q6',
      kind: 'gap',
      prompt: 'Điền một cụm duy nhất gồm did + you + dạng nguyên mẫu của buy; chỉ nhập cụm thiếu: "Where ___ this warm woolen sweater yesterday?"',
      options: [],
      acceptedAnswers: [
        { text: 'did you buy', rationale: 'Câu hỏi quá khứ đơn có từ để hỏi: Where + did + you + buy nguyên mẫu.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q7',
      kind: 'gap',
      prompt: '___ is your favorite singer? — My favorite singer is My Tam. (Who / What)',
      options: [],
      acceptedAnswers: [
        { text: 'Who', rationale: 'Who dùng để hỏi về danh tính con người.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q8',
      kind: 'gap',
      prompt: 'Why ___ (do / does) Minh study English every evening? — Because he wants to study abroad.',
      options: [],
      acceptedAnswers: [
        { text: 'does', rationale: 'Minh là ngôi thứ ba số ít nên dùng trợ động từ does.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q9',
      kind: 'transform',
      prompt: 'Hỏi phần IN HO CHI MINH CITY bằng Where; viết cả câu hỏi, không nhắc lại địa điểm: "They live IN HO CHI MINH CITY."',
      options: [],
      acceptedAnswers: [
        { text: 'Where do they live?', rationale: 'Hỏi về địa điểm (In Ho Chi Minh City) dùng Where và trợ động từ do.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q10',
      kind: 'transform',
      prompt: 'Hỏi phần AT 9:00 AM bằng When hoặc What time; viết cả câu hỏi, không nhắc lại giờ: "He arrived AT 9:00 AM."',
      options: [],
      acceptedAnswers: [
        { text: 'When did he arrive?', rationale: 'Hỏi về thời điểm quá khứ (At 9:00 AM) dùng When và trợ động từ did.' },
        { text: 'What time did he arrive?', rationale: 'What time cũng hoàn toàn chính xác khi hỏi giờ cụ thể.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ trong câu hỏi sau: "Where you bought this novel yesterday?"',
      options: [],
      acceptedAnswers: [
        { text: 'Where did you buy this novel yesterday?', rationale: 'Thêm trợ động từ did trước chủ ngữ you và đưa bought về nguyên mẫu buy.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "What did you did on your last summer vacation?"',
      options: [],
      acceptedAnswers: [
        { text: 'What did you do on your last summer vacation?', rationale: 'Đưa động từ chính did về dạng nguyên mẫu do sau trợ động từ did.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-wh-questions-20-r1',
      kind: 'choice',
      prompt: '___ did you visit when you went to Da Nang? — I visited my uncle and aunt.',
      options: [
        { text: 'Who', correct: true, rationale: 'Câu trả lời nói về con người (my uncle and aunt), từ để hỏi là Who.' },
        { text: 'What', correct: false, rationale: 'What hỏi về đồ vật hoặc sự việc.' },
        { text: 'Where', correct: false, rationale: 'Where hỏi về địa điểm.' },
      ],
      acceptedAnswers: [{ text: 'Who', rationale: 'Who là từ để hỏi về đối tượng người.' }],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-r2',
      kind: 'gap',
      prompt: 'How often ___ (do / does) your brother go to the fitness gym?',
      options: [],
      acceptedAnswers: [
        { text: 'does', rationale: 'Your brother là ngôi thứ ba số ít, dùng trợ động từ does.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-r3',
      kind: 'transform',
      prompt: 'Hỏi phần lý do bằng Why, chỉ viết câu hỏi về việc học German: "She studies German BECAUSE SHE WANTS TO WORK IN BERLIN."',
      options: [],
      acceptedAnswers: [
        { text: 'Why does she study German?', rationale: 'Hỏi lý do dùng Why, trợ động từ does và động từ nguyên mẫu study.' },
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu hỏi sau: "When does the plane arrives at Noi Bai airport?"',
      options: [],
      acceptedAnswers: [
        { text: 'When does the plane arrive at Noi Bai airport?', rationale: 'Đưa arrives về dạng nguyên mẫu arrive sau trợ động từ does.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-wh-questions-20-o1',
      prompt: 'Viết 4 câu hỏi có từ để hỏi khác nhau (Who, What, Where, When) để phỏng vấn một người bạn mới về công việc, sở thích và nơi ở.',
      modelAnswer: 'Where do you live in the city?\nWhat do you do in your free time?\nWhen do you usually wake up in the morning?\nWho is your favorite musical artist?',
      checks: [
        'Sử dụng đúng 4 từ để hỏi khác nhau (Where, What, When, Who).',
        'Có trợ động từ do/does hoặc to be đứng trước chủ ngữ.',
        'Động từ chính giữ ở dạng nguyên mẫu phù hợp.',
      ],
    },
    {
      id: 'grammar-v2-a1-wh-questions-20-o2',
      prompt: 'Viết một đoạn hội thoại 4 câu giữa một khách du lịch và nhân viên quầy vé xe buýt, có sử dụng ít nhất hai câu hỏi Wh- (ví dụ: What time, How much, Where).',
      modelAnswer: 'Tourist: Excuse me, where does the bus to the Old Quarter leave?\nClerk: It leaves from platform number two right outside.\nTourist: What time does the next bus arrive?\nClerk: The next bus arrives in ten minutes.',
      checks: [
        'Chứa ít nhất hai câu hỏi Wh- chuẩn cấu trúc (Where does..., What time does...).',
        'Câu trả lời tự nhiên, lịch sự và phù hợp với ngữ cảnh giao tiếp.',
      ],
    },
  ],
  sources: [
    {
      "id": "questions",
      "title": "British Council: Question forms",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/question-forms",
      "claims": [
        "Question words precede inversion or do-support; subject questions do not invert subject and verb."
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
