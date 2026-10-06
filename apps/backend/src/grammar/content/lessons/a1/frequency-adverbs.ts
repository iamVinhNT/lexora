/**
 * @file frequency-adverbs.ts
 * @description Trạng từ chỉ tần suất: thang đo mức độ và vị trí đứng trước động từ thường, sau to be.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-frequency-adverbs-16',
  revisionId: 'grammar-v2-a1-frequency-adverbs-16@1.0.0',
  revision: '1.0.0',
  title: 'Trạng từ chỉ tần suất: Vị trí và cách dùng',
  objective: 'Nhận biết thang mức độ thường xuyên và đặt đúng vị trí các trạng từ tần suất (always, usually, often, sometimes, rarely, never) trước động từ thường và sau động từ to be.',
  prerequisiteIds: ['grammar-v2-a1-present-simple-questions-negatives-15'],
  coverage: ['frequency-adverbs', 'adverbs', 'word-order', 'present-simple'],
  context: {
    english: 'Marcus discusses his healthy living habits, workout routine, and weekend relaxation with his fitness coach.',
    vietnamese: 'Marcus trao đổi về các thói quen sống lành mạnh, lịch tập thể dục và cách thư giãn cuối tuần với huấn luyện viên thể hình của mình.',
  },
  guide: {
    pattern: 'Chủ ngữ + Trạng từ + Động từ thường; Chủ ngữ + to be (am / is / are) + Trạng từ',
    whenToUse: [
      'Diễn tả tần suất tương đối: always (luôn), usually (thường), often (hay), sometimes (thỉnh thoảng), rarely/seldom (hiếm khi), never (không bao giờ). Đây không phải các tỷ lệ phần trăm cố định.',
      'Trả lời câu hỏi How often...? (Bao lâu một lần / thường xuyên đến mức nào?).',
    ],
    signalWords: ['always', 'usually', 'often', 'sometimes', 'rarely', 'seldom', 'never', 'how often'],
    check: [
      'Động từ trong câu là động từ thường hay động từ to be?',
      'Trong trật tự trung tính đang luyện, trạng từ thường đứng trước động từ thường hoặc sau be; vị trí khác có thể dùng để nhấn mạnh.',
      'Nếu muốn nói không bao giờ trong tiếng Anh tiêu chuẩn, dùng never với động từ chia khẳng định; không thêm not để lặp nghĩa phủ định.',
    ],
  },
  explanation: 'Trạng từ tần suất cho biết hành động xảy ra thường xuyên đến mức nào, không có tỷ lệ phần trăm cố định. Vị trí trung tính thường là trước động từ thường (I usually walk) và sau be (She is always cheerful). Trong câu hỏi, trạng từ đứng sau chủ ngữ trước động từ chính (Do you often exercise?); sau trợ động từ trong câu phủ định (She doesn’t always agree). Sometimes có thể đứng đầu hoặc cuối câu; trạng từ trước be có thể nhấn mạnh, nên She always is polite không tự động sai. Để nói không bao giờ, dùng He never smokes, không dùng phủ định kép với not.',
  examples: [
    { english: 'I always drink a large glass of warm water after waking up.', vietnamese: 'Tôi luôn luôn uống một cốc nước ấm lớn sau khi thức dậy. (Always đứng trước động từ thường drink).' },
    { english: 'Mai is usually cheerful and energetic in the morning.', vietnamese: 'Mai thường vui vẻ và tràn đầy năng lượng vào buổi sáng. (Usually đứng sau động từ to be is).' },
    { english: 'We often play badminton in the park on Saturday afternoons.', vietnamese: 'Chúng tôi thường chơi cầu lông ở công viên vào chiều thứ Bảy.' },
    { english: 'He sometimes walks to his office when the weather is pleasant.', vietnamese: 'Anh ấy thỉnh thoảng đi bộ đến văn phòng khi thời tiết dễ chịu.' },
    { english: 'They are rarely late for their morning lectures.', vietnamese: 'Họ hiếm khi trễ giờ các buổi giảng sáng. (Rarely đứng sau are).' },
    { english: 'Mr. An never drinks alcoholic beverages before driving.', vietnamese: 'Ông An không bao giờ uống đồ uống có cồn trước khi lái xe. (Never đứng trước drinks, chia ngôi số ít).' },
  ],
  contrasts: [
    {
      form: 'I always arrive early vs I am always early',
      whyFits: 'Arrive là động từ thường nên always đứng trước; am là động từ to be nên always đứng sau.',
      whyNot: 'I always am early có thể dùng khi nhấn mạnh am, nhưng bài này luyện trật tự trung tính I am always early; I arrive always early không phải vị trí thường dùng.',
    },
    {
      form: 'He never smokes vs He doesn’t never smoke',
      whyFits: 'Never tự thân đã mang nghĩa phủ định tuyệt đối (0%), động từ smokes chia khẳng định.',
      whyNot: 'Dùng "doesn’t never" tạo ra lỗi phủ định kép (double negative) không được chấp nhận trong tiếng Anh tiêu chuẩn.',
    },
  ],
  commonMistakes: [
    'Đặt trạng từ sau động từ thường: “I drink usually coffee” → Cần sửa thành “I usually drink coffee”.',
    'Trong văn cảnh trung tính, ưu tiên “She is always polite”. “She always is polite” có thể đúng khi nhấn mạnh is, không phải lỗi ngữ pháp tuyệt đối.',
    'Dùng phủ định kép với never: “They don’t never visit us” → Cần sửa thành “They never visit us”.',
  ],
  summary: 'Trật tự trung tính: thường trước động từ thường, sau be. Tần suất là tương đối, không có phần trăm cố định. Dùng never + động từ chia khẳng định để nói không bao giờ.',
  exercises: [
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q1',
      kind: 'choice',
      prompt: 'Lan is ___ friendly and helpful toward new classmates.',
      options: [
        { text: 'always', correct: true, rationale: 'Trạng từ tần suất always đứng sau động từ to be is.' },
        { text: 'every day', correct: false, rationale: 'Every day là cụm trạng ngữ thường đứng cuối câu hoặc đầu câu.' },
        { text: 'ever', correct: false, rationale: 'Ever thường dùng trong câu hỏi hoặc câu phủ định.' },
      ],
      acceptedAnswers: [{ text: 'always', rationale: 'Always đứng sau động từ to be is theo đúng quy tắc trật tự từ.' }],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q2',
      kind: 'choice',
      prompt: 'They ___ go swimming on Sunday mornings when the weather is warm.',
      options: [
        { text: 'usually', correct: true, rationale: 'Usually đứng trước go để nói hành động thường xảy ra; không tương ứng một tỷ lệ cố định.' },
        { text: 'is usually', correct: false, rationale: 'Không thêm is khi câu đã có động từ thường go.' },
        { text: 'usually are', correct: false, rationale: 'Không dùng dạng be khi động từ chính là go.' },
      ],
      acceptedAnswers: [{ text: 'usually', rationale: 'Usually đứng trước động từ thường go.' }],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q3',
      kind: 'choice',
      prompt: 'We ___ eat fast food: only once or twice a year; we normally cook at home.',
      options: [
        { text: 'rarely', correct: true, rationale: 'Rarely chỉ tần suất rất thấp (hiếm khi), đứng trước động từ thường eat.' },
        { text: 'always', correct: false, rationale: 'Always mang nghĩa luôn luôn, trái ngược với vế sau thích nấu ăn tại nhà.' },
        { text: 'never don’t', correct: false, rationale: 'Sai ngữ pháp do lỗi phủ định kép.' },
      ],
      acceptedAnswers: [{ text: 'rarely', rationale: 'Rarely phù hợp về cả vị trí lẫn ngữ nghĩa của câu.' }],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q4',
      kind: 'choice',
      prompt: 'Chọn câu đặt often ngay sau be theo trật tự trung tính đang luyện.',
      options: [
        { text: 'He is often tired after a long workday.', correct: true, rationale: 'Trạng từ often đứng sau động từ to be is.' },
        { text: 'He often is tired after a long workday.', correct: false, rationale: 'Có thể đúng trong văn cảnh nhấn mạnh is, nhưng không đặt often ngay sau be như yêu cầu.' },
        { text: 'He is tired often after a long workday.', correct: false, rationale: 'Không đặt often ngay sau be như yêu cầu; vị trí cuối câu có thể dùng trong văn cảnh khác.' },
      ],
      acceptedAnswers: [{ text: 'He is often tired after a long workday.', rationale: 'Trạng từ tần suất đứng sau động từ to be is.' }],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q5',
      kind: 'gap',
      prompt: 'I ___ (often / visit) my grandparents on the weekend.',
      options: [],
      acceptedAnswers: [
        { text: 'often visit', rationale: 'Trạng từ often đứng trước động từ thường visit với chủ ngữ I.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q6',
      kind: 'gap',
      prompt: 'The students are ___ (always) excited before school holidays.',
      options: [],
      acceptedAnswers: [
        { text: 'always', rationale: 'Always đứng sau động từ to be are.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q7',
      kind: 'gap',
      prompt: 'Hoa ___ (never / drink) iced tea in the winter.',
      options: [],
      acceptedAnswers: [
        { text: 'never drinks', rationale: 'Never đứng trước động từ drinks, động từ chia ngôi thứ ba số ít theo chủ ngữ Hoa.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q8',
      kind: 'gap',
      prompt: 'Do you ___ (usually / wake) up before six in the morning?',
      options: [],
      acceptedAnswers: [
        { text: 'usually wake', rationale: 'Trong câu hỏi, trạng từ usually đứng trước động từ chính wake.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q9',
      kind: 'transform',
      prompt: 'Chèn always ngay sau is, viết cả câu: "Bao is punctual for our team meetings."',
      options: [],
      acceptedAnswers: [
        { text: 'Bao is always punctual for our team meetings.', rationale: 'Always đứng sau động từ to be is.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q10',
      kind: 'transform',
      prompt: 'Chèn often ngay trước cook, viết cả câu: "They cook dinner together on Friday evenings."',
      options: [],
      acceptedAnswers: [
        { text: 'They often cook dinner together on Friday evenings.', rationale: 'Often đứng trước động từ thường cook.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ trong câu sau: "My brother drinks usually milk before going to bed."',
      options: [],
      acceptedAnswers: [
        { text: 'My brother usually drinks milk before going to bed.', rationale: 'Trạng từ usually phải đứng trước động từ thường drinks.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-q12',
      kind: 'correction',
      prompt: 'Biên tập theo trật tự trung tính: chuyển always ra sau is, giữ nguyên các từ còn lại và viết cả câu: "She always is ready to help other people in the neighborhood."',
      options: [],
      acceptedAnswers: [
        { text: 'She is always ready to help other people in the neighborhood.', rationale: 'Đặt always sau is theo yêu cầu trật tự trung tính; câu gốc có thể dùng để nhấn mạnh is.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-r1',
      kind: 'choice',
      prompt: 'Mr. Minh ___ takes a taxi; he normally drives his own car.',
      options: [
        { text: 'rarely', correct: true, rationale: 'Rarely (hiếm khi) đứng trước động từ thường takes và hợp nghĩa thích tự lái xe.' },
        { text: 'always', correct: false, rationale: 'Always không hợp lý với việc người nói thích tự lái xe.' },
        { text: 'never doesn’t', correct: false, rationale: 'Sai cấu trúc ngữ pháp vì phủ định kép.' },
      ],
      acceptedAnswers: [{ text: 'rarely', rationale: 'Rarely đứng trước động từ thường takes và hoàn toàn chuẩn nghĩa.' }],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-r2',
      kind: 'gap',
      prompt: 'David is ___ (never) late for important meetings.',
      options: [],
      acceptedAnswers: [
        { text: 'never', rationale: 'Trạng từ never đứng sau động từ to be is.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-r3',
      kind: 'transform',
      prompt: 'Chèn sometimes ngay trước eat, viết cả câu: "We eat out at a seafood restaurant on Sundays."',
      options: [],
      acceptedAnswers: [
        { text: 'We sometimes eat out at a seafood restaurant on Sundays.', rationale: 'Sometimes đứng trước động từ thường eat out.' },
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-r4',
      kind: 'correction',
      prompt: 'Sửa câu để diễn đạt rõ "Anh ấy không bao giờ bỏ tập sáng": bỏ doesn’t, giữ never và chia lại động từ; viết cả câu: "He doesn’t never skip morning exercise."',
      options: [],
      acceptedAnswers: [
        { text: 'He never skips morning exercise.', rationale: 'Bỏ doesn’t và chia động từ skips với chủ ngữ số ít He để tránh lỗi phủ định kép.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-o1',
      prompt: 'Sử dụng 4 trạng từ chỉ tần suất khác nhau (always, usually, sometimes, never) để viết 4 câu về các hoạt động sinh hoạt và học tập hàng ngày của bạn.',
      modelAnswer: 'I always review new vocabulary before going to sleep. I usually have lunch at the office canteen. I sometimes go jogging in the park after work. I never drink coffee late at night.',
      checks: [
        'Sử dụng đúng 4 trạng từ tần suất khác nhau.',
        'Đặt trạng từ trước động từ thường hoặc sau động từ to be.',
        'Chia đúng động từ tương ứng với chủ ngữ I.',
      ],
    },
    {
      id: 'grammar-v2-a1-frequency-adverbs-16-o2',
      prompt: 'Viết đoạn văn ngắn 3-4 câu trả lời câu hỏi: "How often do you exercise and how do you feel?" Chú ý dùng cả động từ thường và động từ to be với trạng từ tần suất.',
      modelAnswer: 'I usually exercise four times a week. I often go cycling with my brother on Sunday mornings. I am always happy and energetic after a good workout.',
      checks: [
        'Có câu sử dụng trạng từ trước động từ thường (usually exercise, often go).',
        'Có câu sử dụng trạng từ sau động từ to be (am always happy).',
        'Trả lời đúng trọng tâm câu hỏi về thói quen luyện tập.',
      ],
    },
  ],
  sources: [
    {
      "id": "frequency",
      "title": "British Council: How often",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/how-often",
      "claims": [
        "One-word frequency adverbials usually precede the main verb but follow be."
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
