/**
 * @file place-and-time-order.ts
 * @description Trật tự trạng từ chỉ nơi chốn và thời gian trong câu tiếng Anh: quy tắc Place before Time.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-place-and-time-order-24',
  revisionId: 'grammar-v2-a1-place-and-time-order-24@1.0.0',
  revision: '1.0.0',
  title: 'Trật tự trạng từ: Nơi chốn trước, Thời gian sau (Place before Time)',
  objective: 'Áp dụng trật tự thông thường Place before Time khi trạng từ nơi chốn và thời gian cùng đứng cuối câu; nhận biết vị trí đầu câu của trạng từ thời gian để nhấn mạnh.',
  prerequisiteIds: ['grammar-v2-a1-place-prepositions-23'],
  coverage: ['place-and-time-order', 'word-order', 'adverbs-order', 'place-time'],
  context: {
    english: 'Linh and her classmates organize an outdoor photography exhibition, planning when and where each team member sets up equipment, meets guests, and holds discussions.',
    vietnamese: 'Linh và các bạn cùng lớp tổ chức một triển lãm nhiếp ảnh ngoài trời, lên kế hoạch thời gian và địa điểm từng thành viên chuẩn bị thiết bị, đón khách và thảo luận.',
  },
  guide: {
    pattern: 'S + V (+ O) + Nơi chốn (Place) + Thời gian (Time); hoặc Thời gian (Time), S + V (+ O) + Nơi chốn (Place)',
    whenToUse: [
      'Áp dụng khi câu có cả cụm từ chỉ nơi chốn và cụm từ chỉ thời gian đứng ở phần cuối câu.',
      'Trong trật tự cuối câu trung tính, PLACE thường đứng trước TIME (Nơi chốn trước, thời gian sau).',
      'Có thể đưa trạng từ thời gian lên đầu câu (theo sau bởi dấu phẩy) để nhấn mạnh mốc thời gian diễn ra sự việc.',
    ],
    signalWords: ['at the station yesterday', 'to school on Monday', 'in the park every morning', 'at home last night'],
    check: [
      'Khi cả hai cụm ở cuối câu, cụm nơi chốn thường đứng trước cụm thời gian; thứ tự khác có thể dùng để nhấn mạnh hoặc tùy cấu trúc câu.',
      'Tránh dịch nguyên si trật tự tiếng Việt; trong trật tự trung tính, thường nói at school yesterday.',
      'Nếu đưa thời gian lên đầu câu, đã có dấu phẩy ngăn cách với mệnh đề chính chưa?',
    ],
  },
  explanation: 'Trong trật tự trung tính, khi cả cụm nơi chốn và thời gian cùng đứng cuối câu, cụm nơi chốn thường đứng trước cụm thời gian: "I went to the market yesterday." Đưa thời gian lên trước nơi chốn cũng có thể đúng để tạo nhấn mạnh hoặc theo cấu trúc câu; đây là xu hướng, không phải lệnh cấm tuyệt đối. Khi xếp nhiều cụm thời gian hoặc nơi chốn, thứ tự tùy loại cụm và ngữ cảnh.',
  examples: [
    { english: 'We arrived at the airport at six o’clock yesterday evening.', vietnamese: 'Chúng tôi đã đến sân bay lúc sáu giờ tối hôm qua. (Nơi chốn: at the airport trước Thời gian: at six o’clock yesterday evening).' },
    { english: 'Mai walks to the university library every Monday morning.', vietnamese: 'Mai đi bộ đến thư viện trường đại học vào mỗi sáng thứ Hai. (Nơi chốn: to the university library trước Thời gian: every Monday morning).' },
    { english: 'They played badminton in the sports center last night.', vietnamese: 'Họ đã chơi cầu lông ở trung tâm thể thao tối qua. (Nơi chốn: in the sports center trước Thời gian: last night).' },
    { english: 'My brother stayed at home all day on Sunday.', vietnamese: 'Anh trai tôi đã ở nhà cả ngày vào Chủ nhật. (Nơi chốn: at home trước Thời gian: all day on Sunday).' },
    { english: 'Yesterday morning, we met our former teacher at the museum.', vietnamese: 'Sáng hôm qua, chúng tôi đã gặp thầy giáo cũ tại bảo tàng. (Đưa thời gian Yesterday morning lên đầu câu để nhấn mạnh).' },
    { english: 'He works in a modern hospital in Ho Chi Minh City.', vietnamese: 'Anh ấy làm việc tại một bệnh viện hiện đại ở TP. Hồ Chí Minh. (Nơi chốn cụ thể trước, địa danh lớn sau).' },
  ],
  contrasts: [
    {
      form: 'I went to school yesterday vs I went yesterday to school',
      whyFits: 'To school (nơi chốn) đứng trước yesterday (thời gian) theo đúng quy tắc Place before Time.',
      whyNot: 'Đặt yesterday trước to school ở cuối câu kém trung tính hơn; cách sắp xếp này có thể dùng khi muốn nhấn mạnh thời gian.',
    },
    {
      form: 'We met at the cafe last night vs We met last night at the cafe',
      whyFits: 'At the cafe before last night is the usual neutral place-before-time order.',
      whyNot: 'Last night before at the cafe can be grammatical, but is less neutral and can shift emphasis.',
    },
  ],
  commonMistakes: [
    'Ở trật tự trung tính, thường đặt nơi chốn trước thời gian: “I played tennis in the park yesterday” thay vì “I played tennis yesterday in the park”.',
    'Chèn trạng từ vào giữa động từ và tân ngữ: “I visited yesterday my grandmother” → Cần sửa thành “I visited my grandmother yesterday”.',
    'Khi nêu cả giờ và năm, cách diễn đạt thông thường là “at 7 AM in 2024”, với giờ cụ thể trước năm.',
  ],
  summary: 'Trật tự cuối câu thường là S + V (+ O) + Nơi chốn + Thời gian; có thể đưa thời gian lên đầu câu để nhấn mạnh. Đây là xu hướng trung tính, không phải quy tắc tuyệt đối.',
  exercises: [
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q1',
      kind: 'choice',
      prompt: 'Which sentence uses the neutral place-before-time order at the end?',
      options: [
        { text: 'We arrived at the bus station at five o’clock.', correct: true, rationale: 'Nơi chốn (at the bus station) đứng trước thời gian (at five o’clock) theo quy tắc Place before Time.' },
        { text: 'We arrived at five o’clock at the bus station.', correct: false, rationale: 'This order is possible for emphasis, but it is not the neutral place-before-time order requested.' },
        { text: 'At five o’clock we at the bus station arrived.', correct: false, rationale: 'Sai cấu trúc ngữ pháp động từ và tân ngữ.' },
      ],
      acceptedAnswers: [{ text: 'We arrived at the bus station at five o’clock.', rationale: 'Nơi chốn đứng trước thời gian ở cuối câu.' }],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q2',
      kind: 'choice',
      prompt: 'A colleague asks where and when Lan studied. Which sentence puts the place before the time in the neutral end position?',
      options: [
        { text: 'Lan studied in the library yesterday afternoon.', correct: true, rationale: 'In the library (nơi chốn) đứng trước yesterday afternoon (thời gian).' },
        { text: 'Lan studied yesterday afternoon in the library.', correct: false, rationale: 'This can be grammatical, but it is not the neutral place-before-time order requested.' },
        { text: 'Lan in the library studied yesterday afternoon.', correct: false, rationale: 'Sai vị trí trạng ngữ nơi chốn chen vào giữa chủ ngữ và động từ.' },
      ],
      acceptedAnswers: [{ text: 'Lan studied in the library yesterday afternoon.', rationale: 'Trật tự chuẩn: Place (in the library) + Time (yesterday afternoon).' }],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q3',
      kind: 'choice',
      prompt: 'Which phrase gives the missing location (not a time) before yesterday evening: at an Italian restaurant, at seven o’clock, or in the evening?',
      options: [
        { text: 'at an Italian restaurant', correct: true, rationale: 'Điền cụm nơi chốn at an Italian restaurant trước cụm thời gian yesterday evening.' },
        { text: 'at seven o’clock', correct: false, rationale: 'This is another time expression, not the missing location.' },
        { text: 'in the evening', correct: false, rationale: 'This is a time phrase, not the missing location.' },
      ],
      acceptedAnswers: [{ text: 'at an Italian restaurant', rationale: 'Cụm nơi chốn đứng trước cụm thời gian yesterday evening.' }],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q4',
      kind: 'choice',
      prompt: 'Which sentence correctly emphasizes time at the beginning of the sentence?',
      options: [
        { text: 'Last Sunday, we walked around Hoan Kiem Lake.', correct: true, rationale: 'Đưa thời gian Last Sunday lên đầu câu có dấu phẩy, nơi chốn around Hoan Kiem Lake ở cuối câu.' },
        { text: 'Around Hoan Kiem Lake, we walked last Sunday.', correct: false, rationale: 'This starts with a place phrase, not the time emphasis requested.' },
        { text: 'Last Sunday walked we around Hoan Kiem Lake.', correct: false, rationale: 'The subject and verb are in the wrong order.' },
      ],
      acceptedAnswers: [{ text: 'Last Sunday, we walked around Hoan Kiem Lake.', rationale: 'Thời gian đứng đầu câu kèm dấu phẩy, nơi chốn ở cuối câu.' }],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q5',
      kind: 'gap',
      prompt: 'Điền hai cụm theo thứ tự trung tính, nơi chốn trước thời gian: at a cafe; yesterday. Minh met his old classmates ___ ___.',
      options: [],
      acceptedAnswers: [
        { text: 'at a cafe yesterday', rationale: 'Place (at a cafe) đứng trước Time (yesterday).' },
        { text: 'at a cafe / yesterday', rationale: 'Vị trí thứ nhất là at a cafe, vị trí thứ hai là yesterday.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q6',
      kind: 'gap',
      prompt: 'The students played football ___ (in the park) ___ (on Sunday afternoon). (in the park / on Sunday afternoon)',
      options: [],
      acceptedAnswers: [
        { text: 'in the park on Sunday afternoon', rationale: 'Place (in the park) đứng trước Time (on Sunday afternoon).' },
        { text: 'in the park / on Sunday afternoon', rationale: 'Cụm thứ nhất là in the park, cụm thứ hai là on Sunday afternoon.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q7',
      kind: 'gap',
      prompt: 'We will meet each other ___ (at the main gate) ___ (at 8:30 AM tomorrow).',
      options: [],
      acceptedAnswers: [
        { text: 'at the main gate at 8:30 AM tomorrow', rationale: 'Nơi chốn at the main gate đứng trước thời gian at 8:30 AM tomorrow.' },
        { text: 'at the main gate / at 8:30 AM tomorrow', rationale: 'Nơi chốn trước, thời gian sau.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q8',
      kind: 'gap',
      prompt: 'She was born in a small village ___ (in 2002 / in Hue). (in Hue in 2002 / in 2002 in Hue)',
      options: [],
      acceptedAnswers: [
        { text: 'in Hue in 2002', rationale: 'Địa điểm in Hue đứng trước thời gian in 2002.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q9',
      kind: 'transform',
      prompt: 'Sắp xếp các từ sau thành câu chuẩn theo quy tắc Place before Time: "to the supermarket / Nam / this morning / went / ."',
      options: [],
      acceptedAnswers: [
        { text: 'Nam went to the supermarket this morning.', rationale: 'Chủ ngữ Nam + động từ went + nơi chốn to the supermarket + thời gian this morning.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách đưa trạng từ thời gian lên đầu câu để nhấn mạnh: "They visited the art gallery yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'Yesterday, they visited the art gallery.', rationale: 'Đưa Yesterday lên đầu câu và thêm dấu phẩy ngăn cách.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ duy nhất trong câu sau: "My father washed his motorbike yesterday in the yard."',
      options: [],
      acceptedAnswers: [
        { text: 'My father washed his motorbike in the yard yesterday.', rationale: 'Đưa nơi chốn in the yard lên trước thời gian yesterday.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ duy nhất trong câu sau: "We arrived at 10 PM at the railway station."',
      options: [],
      acceptedAnswers: [
        { text: 'We arrived at the railway station at 10 PM.', rationale: 'Đặt nơi chốn at the railway station trước thời gian at 10 PM.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-place-and-time-order-24-r1',
      kind: 'choice',
      prompt: 'Choose the sentence with the most natural word order:',
      options: [
        { text: 'She exercises in the gym every morning.', correct: true, rationale: 'Nơi chốn in the gym đứng trước thời gian every morning.' },
        { text: 'She exercises every morning in the gym.', correct: false, rationale: 'Đặt thời gian trước nơi chốn ở cuối câu không tự nhiên.' },
        { text: 'Every morning she in the gym exercises.', correct: false, rationale: 'Sai trật tự động từ.' },
      ],
      acceptedAnswers: [{ text: 'She exercises in the gym every morning.', rationale: 'Place (in the gym) đứng trước Time (every morning).' }],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-r2',
      kind: 'gap',
      prompt: 'David waited for his sister ___ (at the airport) ___ (for two hours yesterday).',
      options: [],
      acceptedAnswers: [
        { text: 'at the airport for two hours yesterday', rationale: 'Place (at the airport) đứng trước Time (for two hours yesterday).' },
        { text: 'at the airport / for two hours yesterday', rationale: 'Nơi chốn trước, thời gian sau.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-r3',
      kind: 'transform',
      prompt: 'Sắp xếp các từ sau thành câu hoàn chỉnh: "tennis / played / We / in the sports club / last Saturday / ."',
      options: [],
      acceptedAnswers: [
        { text: 'We played tennis in the sports club last Saturday.', rationale: 'S + V + O + Place + Time.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trật tự từ trong câu sau: "They bought fresh fruits yesterday morning at the local market."',
      options: [],
      acceptedAnswers: [
        { text: 'They bought fresh fruits at the local market yesterday morning.', rationale: 'Chuyển nơi chốn at the local market lên trước thời gian yesterday morning.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-place-and-time-order-24-o1',
      prompt: 'Viết 3 câu kể về các hoạt động bạn đã làm gần đây, mỗi câu phải có cả trạng từ chỉ nơi chốn và trạng từ chỉ thời gian đứng ở cuối câu (tuân thủ quy tắc Place before Time).',
      modelAnswer: 'I bought a new notebook at the bookstore yesterday afternoon. My brother played badminton in the school yard this morning. We had dinner at a traditional restaurant last night.',
      checks: [
        'Cả 3 câu đều có trạng từ nơi chốn đứng trước trạng từ thời gian ở cuối câu.',
        'Động từ chia thì quá khứ đơn chính xác.',
        'Nội dung câu tự nhiên, mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-a1-place-and-time-order-24-o2',
      prompt: 'Viết một đoạn văn ngắn 3-4 câu lên kế hoạch cho một buổi gặp mặt cuối tuần với bạn bè, kết hợp một câu đưa thời gian lên đầu câu (có dấu phẩy) và các câu có trật tự nơi chốn trước thời gian sau.',
      modelAnswer: 'Next Sunday, we will go on a picnic together. We will gather at the park entrance at eight o’clock in the morning. After that, we will eat lunch at a riverside cafe in the afternoon.',
      checks: [
        'Có câu đưa thời gian lên đầu câu kèm dấu phẩy (Next Sunday, ...).',
        'Có câu đặt nơi chốn trước thời gian ở cuối câu (at the park entrance at eight o’clock; at a riverside cafe in the afternoon).',
      ],
    },
  ],
  sources: [
    {
      "id": "adverbials",
      "title": "British Council: Where adverbials go in a sentence",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/where-adverbials-go-sentence",
      "claims": [
        "Adverbials normally follow the verb and its object or complement; initial adverbials can be used for emphasis."
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
