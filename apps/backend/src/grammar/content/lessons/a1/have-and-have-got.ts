/**
 * @file have-and-have-got.ts
 * @description A1 have-and-have-got lesson definition: expressing possession, relationships, and characteristics.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-have-and-have-got-02',
  revisionId: 'grammar-v2-a1-have-and-have-got-02@1.0.0',
  revision: '1.0.0',
  title: 'Động từ have và have got',
  objective: 'Sử dụng đúng have và have got ở thể khẳng định, phủ định và nghi vấn để diễn đạt quyền sở hữu, mối quan hệ gia đình và đặc điểm ngoại hình.',
  prerequisiteIds: ['grammar-v2-a1-be-forms-01'],
  coverage: ['have-and-have-got', 'verbs', 'possession'],
  context: {
    english: 'I have a new camera, and my brother has got a blue bicycle. We have got everything we need for our picnic.',
    vietnamese: 'Tôi có một chiếc máy ảnh mới, và em trai tôi có một chiếc xe đạp màu xanh. Chúng tôi có mọi thứ cần thiết cho buổi dã ngoại.',
  },
  guide: {
    pattern: 'Have: S + have/has | S + don\'t/doesn\'t have | Do/Does + S + have? || Have got: S + have/has got | S + haven\'t/hasn\'t got | Have/Has + S + got?',
    whenToUse: [
      'Diễn tả quyền sở hữu đồ vật (xe cộ, nhà cửa, thiết bị)',
      'Nói về các mối quan hệ (gia đình, anh chị em, bạn bè)',
      'Miêu tả đặc điểm ngoại hình hoặc triệu chứng sức khỏe (đau đầu, sốt)',
    ],
    signalWords: ['got', 'any', 'possession'],
    check: [
      'I, you, we, they dùng have / have got (\'ve got)',
      'He, she, it dùng has / has got (\'s got)',
      'Với have thường: phủ định dùng don\'t/doesn\'t have; câu hỏi dùng Do/Does... have?',
      'Với have got: phủ định dùng haven\'t/hasn\'t got; câu hỏi dùng Have/Has... got?',
      'Không dùng have got cho hành động ăn uống (have breakfast, have lunch)',
    ],
  },
  explanation: 'Cả "have" và "have got" đều được dùng để nói về quyền sở hữu (sở hữu đồ vật), mối quan hệ thân nhân hoặc ngoại hình ở hiện tại. Về mặt ý nghĩa, "I have a laptop" và "I have got a laptop" tương đương nhau. Tuy nhiên, cách biến đổi ngữ pháp của hai cấu trúc này rất khác nhau: Với động từ "have" thông thường, ta mượn trợ động từ "do/does" khi làm câu phủ định và câu hỏi (ví dụ: I don\'t have a car; Does she have a brother?). Với "have got" (phổ biến hơn trong tiếng Anh - Anh đàm thoại), chính "have/has" đóng vai trò là trợ động từ, do đó phủ định thêm "not" thành "haven\'t got / hasn\'t got", và câu hỏi đảo "Have/Has" lên trước chủ ngữ (ví dụ: Have you got a car? She hasn\'t got time). Chú ý không kết hợp trợ động từ do/does với got (không nói "Do you have got?"). Ngoài ra, "have got" chỉ dùng cho hiện tại, không dùng cho quá khứ.',
  examples: [
    { english: 'I have two younger sisters.', vietnamese: 'Tôi có hai người em gái. (Dùng have diễn tả mối quan hệ).' },
    { english: 'She has got blue eyes and wavy hair.', vietnamese: 'Cô ấy có đôi mắt xanh và mái tóc lượn sóng. (has got miêu tả ngoại hình).' },
    { english: 'We don\'t have a printer in this room.', vietnamese: 'Chúng tôi không có máy in trong phòng này. (Phủ định với don\'t have).' },
    { english: 'He hasn\'t got any cash on him.', vietnamese: 'Anh ấy không mang theo chút tiền mặt nào. (Phủ định với hasn\'t got).' },
    { english: 'Do you have an extra umbrella?', vietnamese: 'Bạn có chiếc ô thừa nào không? (Câu hỏi dùng Do... have).' },
    { english: 'Have they got tickets for the concert?', vietnamese: 'Họ đã có vé xem buổi hòa nhạc chưa? (Câu hỏi dùng Have... got).' },
  ],
  contrasts: [
    {
      form: 'Do you have a pen? vs Have you got a pen?',
      whyFits: 'Cả hai đều đúng; "Do you have" phổ biến hơn trong tiếng Anh-Mỹ, còn "Have you got" rất thông dụng trong tiếng Anh-Anh thân mật.',
      whyNot: '"Do you have got a pen?" là sai ngữ pháp vì không được dùng cả trợ động từ do lẫn got.',
    },
    {
      form: 'I have breakfast at 7 AM vs I have got breakfast at 7 AM',
      whyFits: 'Dùng "have breakfast" vì đây là cụm từ chỉ hành động ăn uống, không phải sở hữu đồ vật.',
      whyNot: '"have got" chỉ dùng cho sở hữu tĩnh, tuyệt đối không dùng cho hành động sinh hoạt hay thói quen ăn uống.',
    },
  ],
  commonMistakes: [
    'Kết hợp sai trợ động từ: nói "Do you have got a pen?" thay vì "Do you have a pen?" hoặc "Have you got a pen?".',
    'Quên got khi dùng trợ động từ have: nói "Have you a pen?" (lỗi này rất lỗi thời và dễ gây nhầm lẫn).',
    'Dùng has với ngôi số nhiều: nói "My parents has a new apartment" thay vì "have".',
  ],
  summary: 'Have/has thường dùng do/does trong phủ định và câu hỏi. Have/has got phủ định thành haven\'t/hasn\'t got, câu hỏi đảo Have/Has lên trước. Không ghép do với got.',
  exercises: [
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q1',
      kind: 'choice',
      prompt: 'Tom ___ a modern apartment near West Lake.',
      options: [
        { text: 'has', correct: true, rationale: 'Tom là chủ ngữ số ít (ngôi thứ ba) nên dùng "has".' },
        { text: 'have', correct: false, rationale: '"have" đi với chủ ngữ I, you, we, they hoặc số nhiều.' },
        { text: 'is have', correct: false, rationale: 'Không dùng to be đi liền với động từ thường have.' },
      ],
      acceptedAnswers: [{ text: 'has', rationale: 'Chủ ngữ số ít đi với has.' }],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q2',
      kind: 'choice',
      prompt: '___ you got your passport with you right now?',
      options: [
        { text: 'Have', correct: true, rationale: 'Cấu trúc câu hỏi với "got" và chủ ngữ "you" bắt đầu bằng "Have".' },
        { text: 'Do', correct: false, rationale: 'Nếu dùng Do thì phía sau là "you have", không đi với "got".' },
        { text: 'Are', correct: false, rationale: 'To be không dùng chung với cấu trúc sở hữu got.' },
      ],
      acceptedAnswers: [{ text: 'Have', rationale: 'Have you got là cấu trúc câu hỏi chuẩn.' }],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q3',
      kind: 'choice',
      prompt: 'My sister ___ any free time this weekend because of her exams.',
      options: [
        { text: 'doesn\'t have', correct: true, rationale: '"My sister" là chủ ngữ số ít nên phủ định mượn trợ động từ "doesn\'t have".' },
        { text: 'don\'t have', correct: false, rationale: '"don\'t have" chỉ dùng cho I, you, we, they.' },
        { text: 'doesn\'t has', correct: false, rationale: 'Sau trợ động từ doesn\'t, động từ chính trở về nguyên mẫu "have".' },
      ],
      acceptedAnswers: [{ text: "doesn't have", rationale: "Chủ ngữ số ít dùng doesn't have." }],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q4',
      kind: 'choice',
      prompt: 'We ___ enough chairs in this room for all the guests.',
      options: [
        { text: 'haven\'t got', correct: true, rationale: 'Chủ ngữ "We" đi với phủ định "haven\'t got" để chỉ sự thiếu hụt đồ vật.' },
        { text: 'hasn\'t got', correct: false, rationale: '"hasn\'t got" dùng cho chủ ngữ ngôi thứ ba số ít he, she, it.' },
        { text: 'not have got', correct: false, rationale: 'Dạng phủ định cần gắn not vào trợ động từ have.' },
      ],
      acceptedAnswers: [{ text: "haven't got", rationale: "We đi với haven't got." }],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q5',
      kind: 'gap',
      prompt: 'Alex has ___ a brand new motorcycle for his commute.',
      options: [],
      acceptedAnswers: [
        { text: 'got', rationale: 'Cấu trúc has got diễn tả quyền sở hữu.' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q6',
      kind: 'gap',
      prompt: '___ your brother have a driver\'s license?',
      options: [],
      acceptedAnswers: [
        { text: 'Does', rationale: 'Câu hỏi thì hiện tại đơn với chủ ngữ số ít "your brother" dùng trợ động từ "Does".' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q7',
      kind: 'gap',
      prompt: 'They do not ___ any pets in their rented house.',
      options: [],
      acceptedAnswers: [
        { text: 'have', rationale: 'Sau trợ động từ do not, động từ chính ở dạng nguyên mẫu "have".' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q8',
      kind: 'gap',
      prompt: 'She ___ got two brothers who study abroad in Germany.',
      options: [],
      acceptedAnswers: [
        { text: 'has', rationale: 'Chủ ngữ "She" đi với "has got".' },
        { text: "'s", rationale: 'Dạng viết tắt của has là \'s.' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định bằng have got: "He has got a car."',
      options: [],
      acceptedAnswers: [
        { text: "He hasn't got a car.", rationale: "Thêm not vào sau has tạo thành hasn't got." },
        { text: 'He has not got a car.', rationale: 'Dạng phủ định đầy đủ has not got.' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi dùng do/does: "You have a question about this lesson."',
      options: [],
      acceptedAnswers: [
        { text: 'Do you have a question about this lesson?', rationale: 'Dùng trợ động từ Do cho chủ ngữ you để tạo câu hỏi.' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu hỏi sau: "Does your father has a tablet?"',
      options: [],
      acceptedAnswers: [
        { text: 'have', rationale: 'Sau trợ động từ does, động từ chính phải trở về nguyên mẫu "have".' },
        { text: 'Does your father have a tablet?', rationale: 'Câu hoàn chỉnh sau khi đổi has thành have.' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu sau: "Do you have got an email address?"',
      options: [],
      acceptedAnswers: [
        { text: 'Have you got an email address?', rationale: 'Bỏ Do và dùng Have you got.' },
        { text: 'Do you have an email address?', rationale: 'Bỏ got để câu hỏi thành Do you have.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-have-and-have-got-02-r1',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện tự nhiên việc sở hữu trong cuộc trò chuyện:',
      options: [
        { text: 'I\'ve got a meeting with the client at two o\'clock.', correct: true, rationale: 'I\'ve got a meeting diễn tả lịch trình hoặc có cuộc họp rất tự nhiên.' },
        { text: 'I\'ve got lunch at twelve every day.', correct: false, rationale: 'Ăn trưa là hành động sinh hoạt, không dùng have got.' },
        { text: 'I does have a meeting at two o\'clock.', correct: false, rationale: 'Cấu trúc sai trợ động từ.' },
      ],
      acceptedAnswers: [{ text: "I've got a meeting with the client at two o'clock.", rationale: "Câu tự nhiên đúng ngữ pháp." }],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-r2',
      kind: 'gap',
      prompt: 'Hoàn thành hội thoại: A: "___ she got any brothers or sisters?" - B: "Yes, she has."',
      options: [],
      acceptedAnswers: [
        { text: 'Has', rationale: 'Chủ ngữ "she" kết hợp với got trong câu hỏi bắt đầu bằng "Has".' },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau sang dạng tương đương có "got": "She has a nice camera."',
      options: [],
      acceptedAnswers: [
        { text: 'She has got a nice camera.', rationale: 'Thay has bằng has got.' },
        { text: "She's got a nice camera.", rationale: "Dùng dạng rút gọn She's got a nice camera." },
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-r4',
      kind: 'correction',
      prompt: 'Sửa từ sai trong câu: "We doesn\'t have any sugar left in the kitchen."',
      options: [],
      acceptedAnswers: [
        { text: "don't have", rationale: 'Chủ ngữ "We" phải dùng don\'t have thay vì doesn\'t have.' },
        { text: "don't", rationale: 'Đổi trợ động từ doesn\'t thành don\'t.' },
        { text: "We don't have any sugar left in the kitchen.", rationale: 'Câu hoàn chỉnh sau khi sửa.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-have-and-have-got-02-o1',
      prompt: 'Viết 3 câu giới thiệu các đồ vật trong balo hoặc trên bàn làm việc của bạn, sử dụng cả cấu trúc have và have got (ít nhất 1 câu khẳng định và 1 câu phủ định).',
      modelAnswer: 'On my desk, I have a laptop and a notebook. I\'ve got two pens and a small water bottle. However, I don\'t have a calculator here today.',
      checks: [
        'Sử dụng đúng have / has với chủ ngữ phù hợp',
        'Sử dụng đúng cấu trúc have got / has got',
        'Có câu phủ định đúng dạng (don\'t have hoặc haven\'t got)',
      ],
    },
    {
      id: 'grammar-v2-a1-have-and-have-got-02-o2',
      prompt: 'Viết một đoạn hội thoại ngắn (4 lượt lời giữa A và B) hỏi mượn một món đồ (như sạc điện thoại, bút hoặc từ điển) dùng cấu trúc câu hỏi với Have you got...? hoặc Do you have...?',
      modelAnswer: 'A: Do you have a phone charger that I can borrow?\nB: Yes, I do. I have got a fast charger right here.\nA: Thank you so much! Have you got an extra cable as well?\nB: Sorry, I haven\'t got an extra cable today.',
      checks: [
        'Sử dụng câu hỏi với Do you have hoặc Have you got',
        'Câu trả lời ngắn đúng dạng (Yes, I do / Yes, I have / No, I haven\'t)',
        'Ngữ cảnh giao tiếp tự nhiên và mạch lạc',
      ],
    },
  ],
  sources: [
    {
      "id": "have",
      "title": "British Council: Present simple: have got",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-have-got",
      "claims": [
        "Have/has got expresses present possession and uses have/has inversion and negatives."
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
