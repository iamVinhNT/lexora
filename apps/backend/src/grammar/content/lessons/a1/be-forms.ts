/**
 * @file be-forms.ts
 * @description A1 be-forms lesson definition: am, is, are in affirmative, negative, and interrogative structures.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-be-forms-01',
  revisionId: 'grammar-v2-a1-be-forms-01@1.0.0',
  revision: '1.0.0',
  title: 'Động từ to be: am, is, are',
  objective: 'Sử dụng thành thạo động từ to be (am, is, are) ở dạng khẳng định, phủ định và câu hỏi để giới thiệu thông tin cá nhân, nghề nghiệp và miêu tả đặc điểm.',
  prerequisiteIds: ['grammar-v2-0-plurals-and-punctuation-08'],
  coverage: ['be-forms', 'verbs', 'present-tense'],
  context: {
    english: 'Hello! I am Minh. This is Sarah, and she is my new classmate. We are students at a language school.',
    vietnamese: 'Xin chào! Tôi là Minh. Đây là Sarah, và cô ấy là bạn học mới của tôi. Chúng tôi là học viên tại một trường ngoại ngữ.',
  },
  guide: {
    pattern: 'Khẳng định: S + am/is/are + C | Phủ định: S + am/is/are + not + C | Nghi vấn: Am/Is/Are + S + C?',
    whenToUse: [
      'Giới thiệu tên, tuổi, nghề nghiệp, quốc tịch',
      'Mô tả tính chất, đặc điểm hoặc cảm xúc hiện tại',
      'Xác định vị trí của người hoặc đồ vật',
    ],
    signalWords: ['am', 'is', 'are', 'not', 'student', 'teacher', 'happy'],
    check: [
      'Chủ ngữ I luôn đi với am (\'m / \'m not)',
      'Chủ ngữ he, she, it hoặc danh từ số ít đi với is (\'s / isn\'t)',
      'Chủ ngữ you, we, they hoặc danh từ số nhiều đi với are (\'re / aren\'t)',
      'Đảo am/is/are lên trước chủ ngữ khi đặt câu hỏi Yes/No',
    ],
  },
  explanation: 'Động từ "to be" ở thì hiện tại đơn có ba dạng: am, is và are. Chọn dạng nào phụ thuộc vào chủ ngữ của câu. Với ngôi "I", dùng "am" (dạng viết tắt: I\'m). Với ngôi thứ ba số ít (he, she, it hoặc danh từ số ít như "the doctor", "my dog"), dùng "is" (dạng viết tắt: he\'s, she\'s, it\'s). Với các ngôi số nhiều (we, you, they hoặc danh từ số nhiều như "the students"), dùng "are" (dạng viết tắt: we\'re, you\'re, they\'re). Trong câu phủ định, thêm "not" ngay sau "be": is not thành isn\'t, are not thành aren\'t. Trong tiếng Anh tiêu chuẩn, phủ định của I am là "I am not" hoặc "I\'m not" (dạng "amn\'t" chỉ là biến thể địa phương ở một số vùng như Ireland/Scotland, không dùng trong tiếng Anh chuẩn). Để đặt câu hỏi Yes/No, chỉ cần đảo động từ to be lên trước chủ ngữ: Is he a teacher? Are they ready?',
  examples: [
    { english: 'I am a student here.', vietnamese: 'Tôi là học sinh ở đây. (I đi với am).' },
    { english: 'She is very friendly and kind.', vietnamese: 'Cô ấy rất thân thiện và tốt bụng. (She đi với is).' },
    { english: 'They are in the classroom now.', vietnamese: 'Họ đang ở trong lớp học bây giờ. (They đi với are).' },
    { english: 'He is not tired after the long walk.', vietnamese: 'Anh ấy không mệt sau chuyến đi bộ dài. (Phủ định với is not / isn\'t).' },
    { english: 'We aren\'t ready for the test.', vietnamese: 'Chúng tôi chưa sẵn sàng cho bài kiểm tra. (Phủ định với aren\'t).' },
    { english: 'Are you from Hanoi?', vietnamese: 'Bạn đến từ Hà Nội phải không? (Đảo are lên đầu câu hỏi).' },
  ],
  contrasts: [
    {
      form: 'She is a doctor vs She does a doctor',
      whyFits: 'Dùng "is" vì to be kết nối chủ ngữ với danh từ chỉ nghề nghiệp để định danh.',
      whyNot: 'Không dùng trợ động từ "does" vì đây không phải hành động thông thường.',
    },
    {
      form: 'They are ready vs They is ready',
      whyFits: 'Chủ ngữ "they" chỉ số nhiều nên bắt buộc dùng "are".',
      whyNot: '"is" chỉ dành cho chủ ngữ số ít hoặc ngôi he/she/it.',
    },
  ],
  commonMistakes: [
    'Quên động từ to be khi dịch từ tiếng Việt: nói "I happy" thay vì "I am happy".',
    'Nhầm lẫn giữa he is và they is: dùng sai "is" cho chủ ngữ số nhiều.',
    'Dùng sai dạng phủ định chuẩn của am not: viết "I amn\'t" thay vì dạng chuẩn mực "I am not" hoặc "I\'m not".',
  ],
  summary: 'Nhớ quy tắc: I + am, He/She/It + is, You/We/They + are. Phủ định thêm not sau be, câu hỏi đảo be lên trước chủ ngữ.',
  exercises: [
    {
      id: 'grammar-v2-a1-be-forms-01-q1',
      kind: 'choice',
      prompt: 'My brother ___ a teacher at a primary school in Da Nang.',
      options: [
        { text: 'is', correct: true, rationale: 'Chủ ngữ "My brother" là danh từ số ít (ngôi thứ ba), do đó dùng "is".' },
        { text: 'are', correct: false, rationale: '"are" chỉ dùng cho ngôi số nhiều hoặc you.' },
        { text: 'am', correct: false, rationale: '"am" chỉ dùng cho ngôi thứ nhất "I".' },
      ],
      acceptedAnswers: [{ text: 'is', rationale: 'Dạng đúng của to be với danh từ số ít là "is".' }],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q2',
      kind: 'choice',
      prompt: '___ your friends at the library today?',
      options: [
        { text: 'Are', correct: true, rationale: '"your friends" là danh từ số nhiều nên câu hỏi dùng "Are".' },
        { text: 'Is', correct: false, rationale: '"Is" chỉ dùng cho danh từ số ít.' },
        { text: 'Am', correct: false, rationale: '"Am" chỉ đi với chủ ngữ "I".' },
      ],
      acceptedAnswers: [{ text: 'Are', rationale: 'Câu hỏi với chủ ngữ số nhiều bắt đầu bằng "Are".' }],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q3',
      kind: 'choice',
      prompt: 'I ___ tired, but I want to finish this book.',
      options: [
        { text: 'am not', correct: true, rationale: 'Ngôi "I" đi với phủ định "am not" (hoặc I\'m not).' },
        { text: 'isn\'t', correct: false, rationale: '"isn\'t" đi với ngôi he, she, it hoặc danh từ số ít.' },
        { text: 'aren\'t', correct: false, rationale: '"aren\'t" đi với you, we, they hoặc danh từ số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'am not', rationale: 'Phủ định của I với be là "am not".' }],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q4',
      kind: 'choice',
      prompt: 'These books ___ very helpful for our English class.',
      options: [
        { text: 'are', correct: true, rationale: '"These documents" là danh từ số nhiều nên dùng "are".' },
        { text: 'is', correct: false, rationale: '"is" không dùng cho danh từ số nhiều.' },
        { text: 'be', correct: false, rationale: 'Cần chia to be theo ngôi, không dùng dạng nguyên mẫu "be".' },
      ],
      acceptedAnswers: [{ text: 'are', rationale: 'Danh từ số nhiều đi kèm động từ "are".' }],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q5',
      kind: 'gap',
      prompt: 'Lan and Minh ___ excited about their trip to Hue next week.',
      options: [],
      acceptedAnswers: [
        { text: 'are', rationale: 'Lan and Minh là hai người (chủ ngữ số nhiều), nên dùng "are".' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q6',
      kind: 'gap',
      prompt: 'Mr. David ___ from Canada; he is from Australia.',
      options: [],
      acceptedAnswers: [
        { text: 'is not', rationale: 'Mr. David là ngôi thứ ba số ít, phủ định dùng is not.' },
        { text: "isn't", rationale: 'Dạng viết tắt của is not là isn\'t.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q7',
      kind: 'gap',
      prompt: 'Hello! I ___ your new English teacher for this class.',
      options: [],
      acceptedAnswers: [
        { text: 'am', rationale: 'Chủ ngữ "I" đi với "am".' },
        { text: "'m", rationale: 'Dạng rút gọn của am sau I.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q8',
      kind: 'gap',
      prompt: '___ the library open on Sunday mornings?',
      options: [],
      acceptedAnswers: [
        { text: 'Is', rationale: 'The library là danh từ số ít nên câu hỏi đảo "Is" lên trước.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định: "The teacher is in her room."',
      options: [],
      acceptedAnswers: [
        { text: 'The teacher is not in her room.', rationale: 'Thêm not sau is để tạo câu phủ định.' },
        { text: "The teacher isn't in her room.", rationale: 'Dùng dạng rút gọn isn\'t thay cho is not.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi Yes/No: "You are ready for the test."',
      options: [],
      acceptedAnswers: [
        { text: 'Are you ready for the test?', rationale: 'Đảo are lên trước chủ ngữ you để tạo câu hỏi.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai động từ to be trong câu: "My parents is proud of my progress."',
      options: [],
      acceptedAnswers: [
        { text: 'are', rationale: '"My parents" là danh từ số nhiều, cần đổi "is" thành "are".' },
        { text: 'My parents are proud of my progress.', rationale: 'Câu hoàn chỉnh sau khi sửa is thành are.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu phủ định sau: "I amn\'t late for the class."',
      options: [],
      acceptedAnswers: [
        { text: 'am not', rationale: 'Dạng phủ định chuẩn mực trong tiếng Anh của I am là "am not".' },
        { text: "'m not", rationale: 'Dạng rút gọn chuẩn là I\'m not.' },
        { text: 'I am not late for the class.', rationale: 'Câu hoàn chỉnh dùng I am not.' },
        { text: "I'm not late for the class.", rationale: 'Câu hoàn chỉnh dùng I\'m not.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-be-forms-01-r1',
      kind: 'choice',
      prompt: 'Chọn câu viết đúng ngữ pháp trong email giới thiệu bản thân:',
      options: [
        { text: 'I am pleased to meet everyone in my class.', correct: true, rationale: 'I đi với am; câu khẳng định đúng ngữ pháp.' },
        { text: 'I is pleased to meet everyone in my class.', correct: false, rationale: 'I không đi với is.' },
        { text: 'I are pleased to meet everyone in my class.', correct: false, rationale: 'I không đi với are.' },
      ],
      acceptedAnswers: [{ text: 'I am pleased to meet everyone in my class.', rationale: 'I am là dạng chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-r2',
      kind: 'gap',
      prompt: 'Hoàn thành hội thoại: A: "Where is Linh?" - B: "She ___ at the library with her classmates."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Chủ ngữ "She" đi với "is".' },
        { text: "'s", rationale: 'Dạng rút gọn của is là \'s.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-r3',
      kind: 'transform',
      prompt: 'Tạo câu hỏi từ thông tin sau: "They are from Tokyo." -> "___?"',
      options: [],
      acceptedAnswers: [
        { text: 'Are they from Tokyo?', rationale: 'Đảo are lên đầu để tạo câu hỏi nghi vấn.' },
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-r4',
      kind: 'correction',
      prompt: 'Tìm và sửa từ sai trong câu: "The weather are very cold this morning."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: '"The weather" là danh từ không đếm được/ngôi thứ ba số ít, cần sửa "are" thành "is".' },
        { text: 'The weather is very cold this morning.', rationale: 'Câu hoàn chỉnh sửa are thành is.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-be-forms-01-o1',
      prompt: 'Viết một đoạn văn ngắn (3-4 câu) giới thiệu bản thân bạn: tên, tuổi/nghề nghiệp, quê quán và cảm xúc hôm nay, sử dụng ít nhất 3 dạng to be (am, is, are).',
      modelAnswer: 'Hello, I am Nam. I am a university student in Da Nang. My hometown is Quang Nam, and the people there are very welcoming. Today, I am happy to meet everyone.',
      checks: [
        'Sử dụng đúng I am / I\'m khi giới thiệu tên và nghề nghiệp',
        'Sử dụng đúng is khi nói về danh từ số ít (quê quán, địa điểm)',
        'Sử dụng đúng are khi nói về danh từ số nhiều',
      ],
    },
    {
      id: 'grammar-v2-a1-be-forms-01-o2',
      prompt: 'Viết 3 câu mô tả đồng nghiệp hoặc bạn bè của bạn tại nơi làm việc hoặc trường học, gồm: 1 câu khẳng định, 1 câu phủ định với to be, và 1 câu hỏi nghi vấn.',
      modelAnswer: 'Mai is a friendly student in our class. She isn\'t busy this afternoon. Are you ready to study with her?',
      checks: [
        'Có câu khẳng định dùng đúng is/are',
        'Có câu phủ định dùng isn\'t / aren\'t / not',
        'Có câu hỏi nghi vấn đảo to be lên trước chủ ngữ',
      ],
    },
  ],
  sources: [
    {
      "id": "be",
      "title": "British Council: Present simple: to be",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be",
      "claims": [
        "Present be uses am/is/are, negatives with not, inversion in questions and uncontracted affirmative short answers."
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
