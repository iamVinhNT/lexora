/**
 * @file time-prepositions.ts
 * @description Giới từ chỉ thời gian in, on, at: quy tắc kim tự tháp thời gian và các trường hợp ngoại lệ.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-time-prepositions-22',
  revisionId: 'grammar-v2-a1-time-prepositions-22@1.0.0',
  revision: '1.0.0',
  title: 'Giới từ chỉ thời gian: in, on, at',
  objective: 'Phân biệt và sử dụng chính xác ba giới từ chỉ thời gian cốt lõi: at (giờ giấc, thời điểm cụ thể, ban đêm), on (thứ trong tuần, ngày trong tháng, ngày lễ cụ thể), in (tháng, năm, mùa, các buổi trong ngày).',
  prerequisiteIds: ['grammar-v2-a1-imperatives-21'],
  coverage: ['time-prepositions', 'prepositions', 'in-on-at-time', 'time-expressions'],
  context: {
    english: 'Mai and her study partner organize their university schedule for the new semester: lectures on Monday mornings, laboratory practice at 2:00 PM, and final examinations in December.',
    vietnamese: 'Mai và bạn học sắp xếp lịch học đại học cho học kỳ mới: các bài giảng vào sáng thứ Hai, thực hành thí nghiệm lúc 2 giờ chiều và kỳ thi cuối kỳ vào tháng Mười Hai.',
  },
  guide: {
    pattern: 'at + giờ / thời điểm chính xác; on + thứ / ngày cụ thể; in + buổi / tháng / năm / mùa',
    whenToUse: [
      'Dùng at với giờ, noon, midnight, night và dịp lễ (at Christmas, at Tet). At the weekend phổ biến trong Anh-Anh; on the weekend/on weekends phổ biến trong Anh-Mỹ.',
      'Dùng "on" cho các thứ trong tuần (on Monday), ngày có số (on 15th April), ngày lễ có chữ Day (on Christmas Day) và ngày sinh nhật (on my birthday).',
      'Dùng "in" cho các buổi trong ngày (in the morning, in the afternoon, in the evening), các tháng (in May), các năm (in 2026), các mùa (in summer, in autumn) và thế kỷ.',
    ],
    signalWords: ['at 8 o’clock', 'at night', 'on Friday', 'on weekends', 'in the morning', 'in July', 'in 2025'],
    check: [
      'Khoảng thời gian là mốc giờ (at), một ngày cụ thể (on) hay khoảng thời gian dài hơn/buổi trong ngày (in)?',
      'Lưu ý ngoại lệ: in the morning / afternoon / evening nhưng at night.',
      'Không dùng in / on / at trước các từ chỉ định thời gian như: this, next, last, every (ví dụ: next Monday, NOT on next Monday).',
    ],
  },
  explanation: 'Các kết hợp cơ bản: at cho giờ và một số mốc (at noon); on cho ngày/thứ (on Monday, on my birthday); in cho tháng/năm/mùa và buổi (in May, in the morning). Đây là cách ghi nhớ chứ không phải thước đo độ dài thời gian tuyệt đối. At night thường nói ban đêm nói chung; in the night có thể chỉ trong một đêm cụ thể. Thường không thêm in/on/at trước cụm thời gian bắt đầu bằng this, next, last, every (next Monday, every morning); không khái quát cho mọi cách dùng của các từ đó.',
  examples: [
    { english: 'The morning lecture starts at eight o’clock sharp.', vietnamese: 'Bài giảng sáng bắt đầu vào đúng tám giờ. (Mốc giờ chính xác, dùng at).' },
    { english: 'We have English club meetings on Wednesday afternoons.', vietnamese: 'Chúng tôi có các buổi sinh hoạt câu lạc bộ tiếng Anh vào chiều thứ Tư. (Có thứ Wednesday, dùng on).' },
    { english: 'My sister was born in 2005.', vietnamese: 'Em gái tôi sinh vào năm 2005. (Mốc năm, dùng in).' },
    { english: 'The weather in Da Lat is very pleasant in autumn.', vietnamese: 'Thời tiết ở Đà Lạt rất dễ chịu vào mùa thu. (Mùa thu, dùng in).' },
    { english: 'I usually read an interesting chapter of a book at night.', vietnamese: 'Tôi thường đọc một chương sách hay vào ban đêm. (Ngoại lệ buổi đêm, dùng at night).' },
    { english: 'They arrived in Hanoi on the tenth of October.', vietnamese: 'Họ đã đến Hà Nội vào ngày mùng mười tháng Mười. (Ngày cụ thể có số, dùng on).' },
  ],
  contrasts: [
    {
      form: 'on Monday vs in Monday',
      whyFits: 'On đi kèm với tất cả các thứ trong tuần (on Monday, on Tuesday...).',
      whyNot: 'Dạng "in Monday" là lỗi sai giới từ phổ biến do suy diễn từ tiếng Việt "trong ngày thứ Hai".',
    },
    {
      form: 'at night vs in the morning',
      whyFits: 'Nói buổi sáng chung chung dùng in the morning; nói ban đêm nói chung dùng at night. In the night có thể dùng cho một đêm cụ thể.',
      whyNot: 'Dùng "in night" hoặc "at the morning" đều vi phạm kết hợp từ tự nhiên của tiếng Anh chuẩn.',
    },
  ],
  commonMistakes: [
    'Dùng in cho thứ trong tuần: “I play tennis in Sunday” → Cần sửa thành “I play tennis on Sunday”.',
    'Dùng on cho giờ giấc: “The train leaves on 6:30 PM” → Cần sửa thành “The train leaves at 6:30 PM”.',
    'Thêm giới từ trước last/next: “We met on last Friday” → Cần bỏ on: “We met last Friday”.',
  ],
  summary: 'At + giờ, at night. On + thứ, ngày có số, on my birthday. In + buổi trong ngày (sáng/chiều/tối), tháng, năm, mùa. Bỏ giới từ trước this, next, last, every.',
  exercises: [
    {
      id: 'grammar-v2-a1-time-prepositions-22-q1',
      kind: 'choice',
      prompt: 'The library opens ___ 8:00 AM every weekday morning.',
      options: [
        { text: 'at', correct: true, rationale: 'Giờ giấc cụ thể trên đồng hồ (8:00 AM) luôn đi với giới từ at.' },
        { text: 'on', correct: false, rationale: 'On chỉ dùng cho ngày hoặc thứ.' },
        { text: 'in', correct: false, rationale: 'In dùng cho tháng, năm, mùa hoặc buổi dài.' },
      ],
      acceptedAnswers: [{ text: 'at', rationale: 'At đi cùng mốc giờ chính xác 8:00 AM.' }],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q2',
      kind: 'choice',
      prompt: 'Our family always gathers together for dinner ___ New Year’s Eve.',
      options: [
        { text: 'on', correct: true, rationale: 'New Year’s Eve là một ngày lễ cụ thể, đi với giới từ on.' },
        { text: 'in', correct: false, rationale: 'In chỉ dùng cho tháng hoặc năm.' },
        { text: 'at', correct: false, rationale: 'At Tet / at Christmas (cả dịp lễ), nhưng ngày lễ cụ thể Eve dùng on.' },
      ],
      acceptedAnswers: [{ text: 'on', rationale: 'On đi với ngày lễ cụ thể New Year’s Eve.' }],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q3',
      kind: 'choice',
      prompt: 'The flowers in the botanical garden bloom beautifully ___ spring.',
      options: [
        { text: 'in', correct: true, rationale: 'Các mùa trong năm (spring, summer, autumn, winter) luôn đi với giới từ in.' },
        { text: 'on', correct: false, rationale: 'On không dùng cho các mùa.' },
        { text: 'at', correct: false, rationale: 'At không dùng cho mùa.' },
      ],
      acceptedAnswers: [{ text: 'in', rationale: 'In đi với mùa spring trong năm.' }],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q4',
      kind: 'choice',
      prompt: 'David likes going jogging in the park ___ the morning before breakfast.',
      options: [
        { text: 'in', correct: true, rationale: 'Cụm từ chỉ buổi sáng cố định là "in the morning".' },
        { text: 'at', correct: false, rationale: 'At chỉ dùng với night (at night) hoặc noon (at noon).' },
        { text: 'on', correct: false, rationale: 'On the morning chỉ dùng khi có thứ hoặc ngày cụ thể đi kèm (ví dụ: on Monday morning).' },
      ],
      acceptedAnswers: [{ text: 'in', rationale: 'In the morning là cụm giới từ cố định chuẩn.' }],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q5',
      kind: 'gap',
      prompt: 'The international conference starts ___ (in / on / at) Monday morning.',
      options: [],
      acceptedAnswers: [
        { text: 'on', rationale: 'Khi có thứ trong tuần (Monday morning), giới từ quyết định là on.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q6',
      kind: 'gap',
      prompt: 'My brother graduated from high school ___ (in / on / at) 2022.',
      options: [],
      acceptedAnswers: [
        { text: 'in', rationale: 'Năm (2022) đi với giới từ in.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q7',
      kind: 'gap',
      prompt: 'It is often very quiet on our street ___ (in / on / at) night.',
      options: [],
      acceptedAnswers: [
        { text: 'at', rationale: 'Ban đêm đi với cụm cố định at night.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q8',
      kind: 'gap',
      prompt: 'Her birthday party is ___ (in / on / at) the 12th of November.',
      options: [],
      acceptedAnswers: [
        { text: 'on', rationale: 'Ngày cụ thể có số (the 12th of November) đi với giới từ on.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q9',
      kind: 'transform',
      prompt: 'Viết lại cả câu bằng cách thêm at trước giờ và in trước buổi: "The flight takes off half past six the evening." Giữ thứ tự các từ còn lại.',
      options: [],
      acceptedAnswers: [
        { text: 'The flight takes off at half past six in the evening.', rationale: 'Thêm at trước half past six và in trước the evening, viết lại cả câu.' },

      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q10',
      kind: 'transform',
      prompt: 'Sắp xếp các từ sau thành câu hoàn chỉnh: "football / on / They / play / Saturday afternoons / ."',
      options: [],
      acceptedAnswers: [
        { text: 'They play football on Saturday afternoons.', rationale: 'Chủ ngữ They + động từ play + tân ngữ football + trạng từ thời gian on Saturday afternoons.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai giới từ duy nhất trong câu sau: "My parents usually drink tea in night before going to bed."',
      options: [],
      acceptedAnswers: [
        { text: 'My parents usually drink tea at night before going to bed.', rationale: 'Thay "in night" bằng cụm cố định "at night".' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "We will travel to Da Nang on next Monday."',
      options: [],
      acceptedAnswers: [
        { text: 'We will travel to Da Nang next Monday.', rationale: 'Bỏ giới từ on trước cụm có chứa từ "next".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-time-prepositions-22-r1',
      kind: 'choice',
      prompt: 'Vietnam celebrates National Day ___ the 2nd of September every year.',
      options: [
        { text: 'on', correct: true, rationale: 'Ngày cụ thể trong tháng (the 2nd of September) đi với giới từ on.' },
        { text: 'in', correct: false, rationale: 'In chỉ dùng nếu chỉ có tháng September (in September).' },
        { text: 'at', correct: false, rationale: 'At chỉ dùng cho mốc giờ hoặc thời điểm cụ thể ngắn.' },
      ],
      acceptedAnswers: [{ text: 'on', rationale: 'On đi với ngày cụ thể có ngày và tháng.' }],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-r2',
      kind: 'gap',
      prompt: 'The museum holds a special cultural exhibition ___ (in / on / at) October.',
      options: [],
      acceptedAnswers: [
        { text: 'in', rationale: 'Tháng đứng độc lập (October) luôn đi với giới từ in.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-r3',
      kind: 'transform',
      prompt: 'Viết lại cả câu, bổ sung on Sunday ở cuối: "We go for a long walk in the park."',
      options: [],
      acceptedAnswers: [
        { text: 'We go for a long walk in the park on Sunday.', rationale: 'Bổ sung trạng từ thời gian on Sunday vào cuối câu.' },
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "The train leaves on ten o’clock in the morning."',
      options: [],
      acceptedAnswers: [
        { text: 'The train leaves at ten o’clock in the morning.', rationale: 'Thay on bằng at trước mốc giờ ten o’clock.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-time-prepositions-22-o1',
      prompt: 'Viết 3 câu giới thiệu lịch trình sinh hoạt cá nhân của bạn, sử dụng đủ cả ba giới từ chỉ thời gian: at (cho một mốc giờ), on (cho một thứ trong tuần), và in (cho một buổi trong ngày hoặc một tháng).',
      modelAnswer: 'I wake up at six thirty every morning. On Sundays, I usually ride my bicycle around West Lake. In the evening, I spend an hour reading books.',
      checks: [
        'Sử dụng chính xác giới từ at trước mốc giờ cụ thể (at six thirty).',
        'Sử dụng chính xác giới từ on trước thứ trong tuần (On Sundays).',
        'Sử dụng chính xác giới từ in trước buổi trong ngày (In the evening).',
      ],
    },
    {
      id: 'grammar-v2-a1-time-prepositions-22-o2',
      prompt: 'Viết một email ngắn 3-4 câu hẹn bạn cùng lớp đi học nhóm hoặc xem phim, có nhắc đến ngày trong tuần, giờ cụ thể và tháng hoặc buổi trong ngày.',
      modelAnswer: 'Hi Minh, can we meet on Saturday afternoon to practice our English presentation? Let’s meet at two o’clock at the cafe near our campus. In November, we have our final speaking test, so we need to start preparing early.',
      checks: [
        'Có đủ ngày với on, giờ với at, và tháng/buổi với in như yêu cầu.',
        'Mục đích giao tiếp tự nhiên và lịch sự.',
      ],
    },
  ],
  sources: [
    {
      "id": "time",
      "title": "British Council: Prepositions of time: at, in, on",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/prepositions-of-time-at-in-on",
      "claims": [
        "At is used with clock times, in with longer periods, and on with days and dates."
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
