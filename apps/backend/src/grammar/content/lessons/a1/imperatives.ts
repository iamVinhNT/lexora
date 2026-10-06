/**
 * @file imperatives.ts
 * @description Câu mệnh lệnh trong tiếng Anh: đưa ra chỉ dẫn, yêu cầu lịch sự và biển cảnh báo với V nguyên mẫu và Don’t.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-imperatives-21',
  revisionId: 'grammar-v2-a1-imperatives-21@1.0.0',
  revision: '1.0.0',
  title: 'Câu mệnh lệnh (Imperatives): Chỉ dẫn, yêu cầu và cấm đoán',
  objective: 'Thành lập câu mệnh lệnh khẳng định (V nguyên mẫu đầu câu) và phủ định (Don’t + V nguyên mẫu) để đưa ra chỉ dẫn, biển báo, lời khuyên và lời yêu cầu lịch sự với Please.',
  prerequisiteIds: ['grammar-v2-a1-wh-questions-20'],
  coverage: ['imperatives', 'instructions', 'requests', 'dont-imperatives'],
  context: {
    english: 'A culinary instructor guides students through a cooking workshop in Ho Chi Minh City, giving direct safety rules and preparation steps.',
    vietnamese: 'Một giảng viên ẩm thực hướng dẫn học viên trong buổi thực hành nấu ăn tại TP. Hồ Chí Minh, đưa ra các quy tắc an toàn trực tiếp và các bước chuẩn bị món ăn.',
  },
  guide: {
    pattern: 'Khẳng định: V(nguyên mẫu) + O / A!; Phủ định: Don’t + V(nguyên mẫu) + O / A!; Lịch sự: Please + V... hoặc V..., please.',
    whenToUse: [
      'Đưa ra chỉ dẫn từng bước (hướng dẫn sử dụng, công thức nấu ăn, chỉ đường).',
      'Đưa ra mệnh lệnh trực tiếp hoặc biển báo cấm đoán, cảnh báo an toàn.',
      'Đưa ra lời đề nghị, mời mọc hoặc yêu cầu lịch sự khi kết hợp với từ "please".',
    ],
    signalWords: ['Please', 'Don’t', 'Be careful', 'Turn left', 'Turn right', 'Listen'],
    check: [
      'Trong mẫu cơ bản này, bắt đầu bằng động từ nguyên mẫu không to và thường lược chủ ngữ you; chủ ngữ vẫn có thể xuất hiện khi nhấn mạnh.',
      'Mệnh lệnh phủ định cơ bản dùng Don’t hoặc Do not + V; biển báo No + V-ing như No smoking có cấu trúc khác.',
      'Với động từ to be, mệnh lệnh bắt đầu bằng "Be" (ví dụ: Be quiet!) hoặc "Don’t be" (Don’t be late!).',
    ],
  },
  explanation: 'Mệnh lệnh cơ bản thường lược chủ ngữ (ngầm hiểu là you) và bắt đầu bằng động từ nguyên mẫu không to: Wash your hands. Phủ định dùng Don’t hoặc Do not + động từ nguyên mẫu: Don’t touch the hot pan. Chủ ngữ có thể được nêu rõ để nhấn mạnh, như You be careful. Please ở đầu/cuối giúp lời yêu cầu mềm hơn, nhưng mức độ lịch sự còn tùy ngữ điệu và quan hệ; không phải cứ thêm please là mọi mệnh lệnh đều lịch sự.',
  examples: [
    { english: 'Wash all the fresh vegetables carefully under cold water.', vietnamese: 'Rửa sạch tất cả rau tươi cẩn thận dưới vòi nước lạnh. (Chỉ dẫn nấu ăn, bắt đầu bằng động từ nguyên mẫu Wash).' },
    { english: 'Turn right at the traffic lights and go straight ahead.', vietnamese: 'Rẽ phải tại cột đèn giao thông và đi thẳng về phía trước. (Chỉ đường, động từ nguyên mẫu Turn và Go).' },
    { english: 'Don’t touch the hot oven with bare hands.', vietnamese: 'Đừng chạm tay trần vào lò nướng đang nóng. (Cảnh báo an toàn, phủ định bắt đầu bằng Don’t).' },
    { english: 'Please close the front door when you leave the office.', vietnamese: 'Làm ơn đóng cửa trước khi bạn rời khỏi văn phòng. (Yêu cầu lịch sự với Please).' },
    { english: 'Be quiet in the reading room of the library!', vietnamese: 'Hãy giữ trật tự trong phòng đọc của thư viện! (Mệnh lệnh với to be bắt đầu bằng Be).' },
    { english: 'Don’t be nervous about your first job interview.', vietnamese: 'Đừng lo lắng về buổi phỏng vấn xin việc đầu tiên của bạn. (Lời khuyên, Don’t be + tính từ nervous).' },
  ],
  contrasts: [
    {
      form: 'Open the window, please vs You open the window',
      whyFits: 'Open the window, please là câu mệnh lệnh yêu cầu lịch sự, bắt đầu bằng động từ nguyên mẫu.',
      whyNot: 'You open the window có thể là câu trần thuật hoặc mệnh lệnh nhấn mạnh you; không phải dạng yêu cầu trung tính, mềm hơn mà bài này luyện.',
    },
    {
      form: 'Don’t run in the hallway vs Not run in the hallway',
      whyFits: 'Don’t run là câu mệnh lệnh phủ định chuẩn với trợ động từ Don’t đứng đầu câu.',
      whyNot: 'Dạng "Not run" hoặc "No run" là lỗi ghép từ sai ngữ pháp tiếng Anh.',
    },
  ],
  commonMistakes: [
    'Thêm "to" vào trước động từ: “To open the door, please” → Cần sửa thành “Open the door, please”.',
    'Dùng "Not" thay vì "Don’t": “Not make noise here” → Cần sửa thành “Don’t make noise here”.',
    'Chia động từ theo chủ ngữ ngôi ba: “Doesn’t talk in class” → Mệnh lệnh phủ định luôn bắt đầu bằng “Don’t talk in class”.',
  ],
  summary: 'Mệnh lệnh khẳng định: V(nguyên mẫu)... Mệnh lệnh phủ định: Don’t + V(nguyên mẫu)... Thêm Please để lịch sự. Với to be dùng Be / Don’t be.',
  exercises: [
    {
      id: 'grammar-v2-a1-imperatives-21-q1',
      kind: 'choice',
      prompt: '___ the medicine twice a day after meals as directed.',
      options: [
        { text: 'Take', correct: true, rationale: 'Câu mệnh lệnh hướng dẫn bắt đầu trực tiếp bằng động từ nguyên mẫu Take.' },
        { text: 'To take', correct: false, rationale: 'Không dùng dạng có to để mở đầu câu mệnh lệnh.' },
        { text: 'Takes', correct: false, rationale: 'Không chia động từ với -s trong câu mệnh lệnh.' },
      ],
      acceptedAnswers: [{ text: 'Take', rationale: 'Take là động từ nguyên mẫu mở đầu câu mệnh lệnh chỉ dẫn.' }],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q2',
      kind: 'choice',
      prompt: '___ photos inside this historical museum! Photography is not permitted.',
      options: [
        { text: 'Don’t take', correct: true, rationale: 'Mệnh lệnh cấm đoán bắt đầu bằng Don’t + động từ nguyên mẫu take.' },
        { text: 'Not take', correct: false, rationale: 'Not không thể đứng một mình trước động từ trong câu mệnh lệnh.' },
        { text: 'Doesn’t take', correct: false, rationale: 'Câu mệnh lệnh phủ định luôn dùng Don’t, không bao giờ dùng Doesn’t.' },
      ],
      acceptedAnswers: [{ text: 'Don’t take', rationale: 'Don’t take là cấu trúc mệnh lệnh phủ định chuẩn.' }],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q3',
      kind: 'choice',
      prompt: 'Please ___ your seatbelt before the plane takes off.',
      options: [
        { text: 'fasten', correct: true, rationale: 'Sau Please, dùng động từ nguyên mẫu không to fasten.' },
        { text: 'to fasten', correct: false, rationale: 'Không dùng to-infinitive sau Please trong câu yêu cầu lịch sự.' },
        { text: 'fastening', correct: false, rationale: 'Không dùng dạng V-ing trong câu mệnh lệnh.' },
      ],
      acceptedAnswers: [{ text: 'fasten', rationale: 'Fasten là động từ nguyên mẫu theo sau Please.' }],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q4',
      kind: 'choice',
      prompt: '___ quiet! The students are taking an important test in this room.',
      options: [
        { text: 'Be', correct: true, rationale: 'Động từ to be ở dạng nguyên mẫu trong câu mệnh lệnh là Be.' },
        { text: 'Are', correct: false, rationale: 'Are là dạng chia theo ngôi hiện tại, không dùng làm mệnh lệnh.' },
        { text: 'Being', correct: false, rationale: 'Being là phân từ, không dùng làm động từ chính của câu mệnh lệnh.' },
      ],
      acceptedAnswers: [{ text: 'Be', rationale: 'Be là dạng nguyên mẫu mở đầu câu mệnh lệnh với to be.' }],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q5',
      kind: 'gap',
      prompt: '___ (Turn) off your mobile phones during the movie screening.',
      options: [],
      acceptedAnswers: [
        { text: 'Turn', rationale: 'Động từ nguyên mẫu Turn mở đầu câu mệnh lệnh yêu cầu.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q6',
      kind: 'gap',
      prompt: '___ (not / step) on the newly planted grass in the botanical garden.',
      options: [],
      acceptedAnswers: [
        { text: 'Don’t step', rationale: 'Mệnh lệnh phủ định bắt đầu bằng Don’t step.' },
        { text: 'Do not step', rationale: 'Dạng trang trọng Do not step hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q7',
      kind: 'gap',
      prompt: 'Please ___ (help) me carry these heavy cardboard boxes up the stairs.',
      options: [],
      acceptedAnswers: [
        { text: 'help', rationale: 'Sau Please dùng động từ nguyên mẫu help.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q8',
      kind: 'gap',
      prompt: '___ (not / be) late for the bus tour tomorrow morning.',
      options: [],
      acceptedAnswers: [
        { text: 'Don’t be', rationale: 'Don’t be là dạng phủ định mệnh lệnh với động từ to be.' },
        { text: 'Do not be', rationale: 'Dạng đầy đủ Do not be hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q9',
      kind: 'transform',
      prompt: 'Biến đổi câu sau thành câu mệnh lệnh lịch sự bắt đầu bằng "Please": "You must listen to the audio guide."',
      options: [],
      acceptedAnswers: [
        { text: 'Please listen to the audio guide.', rationale: 'Bỏ You must và mở đầu bằng Please + động từ nguyên mẫu listen.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q10',
      kind: 'transform',
      prompt: 'Biến đổi cả câu thành mệnh lệnh phủ định bắt đầu bằng Don’t hoặc Do not: "You must not feed the animals at the zoo."',
      options: [],
      acceptedAnswers: [
        { text: 'Don’t feed the animals at the zoo.', rationale: 'Bỏ You must not và thay bằng Don’t + feed nguyên mẫu.' },
        { text: 'Do not feed the animals at the zoo.', rationale: 'Dạng trang trọng Do not feed the animals at the zoo cũng hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong biển cảnh báo sau: "Not park your motorbike in front of this shop gate."',
      options: [],
      acceptedAnswers: [
        { text: 'Don’t park your motorbike in front of this shop gate.', rationale: 'Đổi Not thành Don’t trong câu mệnh lệnh phủ định.' },
        { text: 'Do not park your motorbike in front of this shop gate.', rationale: 'Dạng đầy đủ Do not park hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "To wash the apples before you cut them into slices."',
      options: [],
      acceptedAnswers: [
        { text: 'Wash the apples before you cut them into slices.', rationale: 'Bỏ To ở đầu câu mệnh lệnh chỉ dẫn.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-imperatives-21-r1',
      kind: 'choice',
      prompt: '___ forget to lock the back door before you go to bed tonight.',
      options: [
        { text: 'Don’t', correct: true, rationale: 'Don’t forget là cấu trúc mệnh lệnh nhắc nhở thông dụng.' },
        { text: 'Not', correct: false, rationale: 'Not không dùng đứng một mình đầu câu mệnh lệnh.' },
        { text: 'No', correct: false, rationale: 'No không đi trước động từ nguyên mẫu trong câu mệnh lệnh.' },
      ],
      acceptedAnswers: [{ text: 'Don’t', rationale: 'Don’t mở đầu câu mệnh lệnh phủ định nhắc nhở.' }],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-r2',
      kind: 'gap',
      prompt: '___ (Add) a pinch of black pepper to the soup before serving.',
      options: [],
      acceptedAnswers: [
        { text: 'Add', rationale: 'Động từ nguyên mẫu Add mở đầu bước hướng dẫn nấu ăn.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-r3',
      kind: 'transform',
      prompt: 'Chuyển cả câu thành mệnh lệnh phủ định bắt đầu bằng Don’t hoặc Do not: "Touch the wet paint on the bench."',
      options: [],
      acceptedAnswers: [
        { text: 'Don’t touch the wet paint on the bench.', rationale: 'Thêm Don’t vào trước động từ nguyên mẫu touch.' },
        { text: 'Do not touch the wet paint on the bench.', rationale: 'Dạng đầy đủ Do not touch cũng đúng.' },
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu mệnh lệnh sau: "Please to wait for your turn at the reception desk."',
      options: [],
      acceptedAnswers: [
        { text: 'Please wait for your turn at the reception desk.', rationale: 'Bỏ "to" sau Please, dùng động từ nguyên mẫu wait.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-imperatives-21-o1',
      prompt: 'Viết 4 câu hướng dẫn đơn giản cho một người khách đến thăm nhà bạn (ví dụ: cởi giày, để áo khoác, ngồi xuống ghế, uống trà), sử dụng câu mệnh lệnh khẳng định và Please.',
      modelAnswer: 'Please take off your shoes at the entrance door. Hang your jacket on the coat rack over there. Come into the living room and have a seat. Please enjoy a warm cup of green tea.',
      checks: [
        'Sử dụng động từ nguyên mẫu mở đầu câu mệnh lệnh (take off, Hang, Come, enjoy).',
        'Có sử dụng từ Please để tăng tính lịch sự.',
        'Ngữ cảnh hiếu khách, tự nhiên và dễ hiểu.',
      ],
    },
    {
      id: 'grammar-v2-a1-imperatives-21-o2',
      prompt: 'Viết 3 biển báo hoặc quy định an toàn ngắn gọn cho một phòng học hoặc thư viện, kết hợp cả mệnh lệnh khẳng định (Be quiet) và mệnh lệnh phủ định (Don’t eat).',
      modelAnswer: '1. Please keep quiet in the reading area.\n2. Don’t bring food or drinks into the computer lab.\n3. Return all reference books to the shelf after reading.',
      checks: [
        'Có ít nhất 1 câu mệnh lệnh khẳng định bắt đầu bằng động từ nguyên mẫu hoặc Please.',
        'Có ít nhất 1 câu mệnh lệnh phủ định bắt đầu bằng Don’t.',
        'Nội dung quy định rõ ràng, đúng chính tả và ngữ pháp.',
      ],
    },
  ],
  sources: [
    {
      "id": "imperatives",
      "title": "British Council: Imperatives",
      "url": "https://learnenglishkids.britishcouncil.org/grammar-vocabulary/grammar-practice/imperatives",
      "claims": [
        "Imperatives use the base verb without you; negative instructions use do not/don’t, and please can soften a request."
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
