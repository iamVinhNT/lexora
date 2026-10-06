/**
 * @file will-predictions.ts
 * @description Lesson: Will for predictions, instant decisions, and promises (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-will-predictions-09',
  revisionId: 'grammar-v2-a2-will-predictions-09@1.0.0',
  revision: '1.0.0',
  title: 'Tương lai đơn với Will: Dự đoán và Quyết định tức thì',
  objective: 'Sử dụng trợ động từ will (khẳng định, phủ định won\'t, nghi vấn) để đưa ra dự đoán về tương lai (với I think, I hope) và đưa ra quyết định nhanh ngay tại thời điểm nói.',
  prerequisiteIds: ['grammar-v2-a2-present-perfect-vs-past-08'],
  coverage: ['will-predictions', 'future-forms', 'predictions', 'modal-will', 'a2-grammar'],
  context: {
    english: 'I think our team will win the match tomorrow. Look, it is getting chilly outside; I\'ll close the window right away.',
    vietnamese: 'Tôi nghĩ đội của chúng ta sẽ thắng trận đấu ngày mai. Nhìn kìa, ngoài trời đang se lạnh; tôi sẽ đóng cửa sổ ngay bây giờ.',
  },
  guide: {
    pattern: 'S + will + V-inf | S + will not (won\'t) + V-inf | Will + S + V-inf?',
    whenToUse: [
      'Đưa ra dự đoán về tương lai dựa trên quan điểm, niềm tin cá nhân (thường đi kèm I think, I believe, I hope, probably).',
      'Đưa ra quyết định tức thì, bộc phát ngay tại thời điểm nói mà không có kế hoạch tính toán từ trước.',
      'Đưa ra lời hứa (promises: I will not tell anyone) hoặc lời đề nghị giúp đỡ (offers: I\'ll carry this bag for you).',
    ],
    signalWords: ['tomorrow', 'next week', 'soon', 'I think', 'I don\'t think', 'I hope', 'probably', 'maybe'],
    check: [
      'Sau will/won\'t luôn là động từ nguyên mẫu không "to" (V-infinitive), không chia ngôi thứ ba số ít thêm -s.',
      'Dạng phủ định viết tắt của will not là won\'t.',
      'Trong ví dụ về quyết định tức thì, will thường là lựa chọn tự nhiên; lựa chọn thì tương lai vẫn phụ thuộc vào ý định và ngữ cảnh.',
    ],
  },
  explanation: 'Will là một cách thông dụng để nói về tương lai ở trình độ A2. Có thể dùng will cho dự đoán dựa trên ý kiến, niềm tin hoặc hy vọng; cho quyết định hình thành ngay lúc nói; và cho lời hứa hoặc lời đề nghị. Đây là các cách dùng thường gặp, không phải lựa chọn duy nhất cho mọi câu nói về tương lai. Trong mệnh đề khẳng định/phủ định, will và dạng phủ định will not theo sau bởi động từ nguyên mẫu không to; trong câu hỏi, đưa will lên trước chủ ngữ.',
  examples: [
    { english: 'I think people will live on Mars in the next century.', vietnamese: 'Tôi nghĩ con người sẽ sống trên sao Hỏa trong thế kỷ tới.' },
    { english: 'It\'s too hot in this room. I\'ll turn on the air conditioner.', vietnamese: 'Trong phòng này nóng quá. Tôi sẽ bật điều hòa nhiệt độ lên.' },
    { english: 'Don\'t worry about the exam; you will pass it easily.', vietnamese: 'Đừng lo lắng về kỳ thi; bạn sẽ vượt qua nó dễ dàng thôi.' },
    { english: 'I promise I won\'t be late for the meeting tomorrow.', vietnamese: 'Tôi hứa tôi sẽ không đến muộn cuộc họp ngày mai.' },
    { english: 'Will you help me carry these heavy boxes upstairs?', vietnamese: 'Bạn sẽ giúp tôi khiêng những chiếc hộp nặng này lên lầu chứ?' },
    { english: 'I don\'t think she will accept the job offer in New York.', vietnamese: 'Tôi không nghĩ cô ấy sẽ nhận lời mời làm việc ở New York.' },
  ],
  contrasts: [
    {
      form: 'will for a decision made now vs be going to for a prior intention',
      whyFits: 'Will thường tự nhiên khi người nói quyết định ngay lúc nghe thông tin ("Oh, we have no milk. I will go buy some").',
      whyNot: 'Be going to thường hợp hơn nếu ý định đã có trước ("I know. I am going to buy some after work"); ngữ cảnh mới quyết định sắc thái.',
    },
    {
      form: 'I think... won\'t vs I don\'t think... will',
      whyFits: '"I do not think + S + will..." thường tự nhiên khi phủ định ý kiến; cấu trúc "I think + S + will not..." cũng đúng.',
      whyNot: 'Hai cấu trúc đều đúng; khác biệt nằm ở cách đặt phủ định và sắc thái nhấn mạnh.',
    }
  ],
  commonMistakes: [
    'Thêm "to" sau will: nói "I will to help you" thay vì "I will help you".',
    'Thêm -s vào động từ sau will ở ngôi thứ ba: nói "He will arrives" thay vì "He will arrive".',
    'Dùng thì hiện tại đơn cho quyết định tức thì: nói "The phone is ringing. I answer it" thay vì "I will answer it".'
  ],
  summary: 'Công thức: S + will/won\'t + V nguyên mẫu. Dùng cho dự đoán cá nhân (I think...) và quyết định tức thì ngay khi nói.',
  exercises: [
    {
      id: 'grammar-v2-a2-will-predictions-09-q1',
      kind: 'choice',
      prompt: 'A: "There is no sugar in the kitchen." - B: "Really? I _____ to the supermarket to get some."',
      options: [
        { text: 'will go', rationale: 'Quyết định tức thì ngay tại thời điểm nói khi vừa nhận thông tin, dùng will go.', correct: true },
        { text: 'go', rationale: 'Thì hiện tại đơn không dùng cho quyết định hành động trong tương lai.', correct: false },
        { text: 'went', rationale: 'Went là thì quá khứ đơn, không phù hợp cho hành động sắp làm.', correct: false },
      ],
      acceptedAnswers: [{ text: 'will go', rationale: 'Dùng will go cho quyết định tức thì.' }]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q2',
      kind: 'choice',
      prompt: 'Use will for an opinion-based prediction: "I think that electric cars _____ much cheaper in the future."',
      options: [
        { text: 'will become', rationale: 'Sau I think để dự đoán tương lai dùng will + động từ nguyên mẫu become.', correct: true },
        { text: 'will to become', rationale: 'Sau will không dùng động từ có to.', correct: false },
        { text: 'became', rationale: 'Became là dạng quá khứ, không dùng cho mốc tương lai in the future.', correct: false },
      ],
      acceptedAnswers: [{ text: 'will become', rationale: 'Dùng will become cho dự đoán tương lai.' }]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q3',
      kind: 'choice',
      prompt: 'Don\'t worry! I promise I _____ your secret to anyone.',
      options: [
        { text: 'won\'t tell', rationale: 'Lời hứa không làm điều gì dùng won\'t + V nguyên mẫu tell.', correct: true },
        { text: 'don\'t tell', rationale: 'Don\'t tell là mệnh lệnh hoặc hiện tại đơn, không thể hiện lời hứa tương lai.', correct: false },
        { text: 'will tell not', rationale: 'Trật tự từ sai, phủ định của will là will not hoặc won\'t.', correct: false },
      ],
      acceptedAnswers: [{ text: "won't tell", rationale: 'Dùng won\'t tell cho lời hứa phủ định.' }]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q4',
      kind: 'choice',
      prompt: '_____ the weather be sunny this weekend?',
      options: [
        { text: 'Will', rationale: 'Đảo Will lên đầu câu để tạo câu hỏi dự đoán tương lai với động từ be.', correct: true },
        { text: 'Does', rationale: 'Does không đi với động từ to be nguyên mẫu be trong câu hỏi.', correct: false },
        { text: 'Is', rationale: 'Is không đi với dạng nguyên mẫu be.', correct: false },
      ],
      acceptedAnswers: [{ text: 'Will', rationale: 'Dùng Will mở đầu câu hỏi tương lai.' }]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q5',
      kind: 'gap',
      prompt: 'Wait a second! I _____ (carry) that heavy suitcase for you.',
      options: [],
      acceptedAnswers: [
        { text: 'will carry', rationale: 'Quyết định đề nghị giúp đỡ ngay lập tức, dùng will carry.' },
        { text: "'ll carry", rationale: 'Dạng viết tắt: \'ll carry.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q6',
      kind: 'gap',
      prompt: 'Use will after "I hope": "I hope scientists _____ (find) a cure for this disease soon."',
      options: [],
      acceptedAnswers: [
        { text: 'will find', rationale: 'Sau I hope để diễn đạt hy vọng tương lai, dùng will find.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q7',
      kind: 'gap',
      prompt: 'Use will for a prediction: "I think she _____ (not come) to the party tonight because she feels unwell."',
      options: [],
      acceptedAnswers: [
        { text: "won't come", rationale: 'Dạng phủ định tương lai: won\'t come.' },
        { text: 'will not come', rationale: 'Dạng đầy đủ: will not come.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q8',
      kind: 'gap',
      prompt: 'What time _____ the train _____ (arrive) tomorrow morning? (Điền will và động từ nguyên mẫu cách nhau một dấu cách)',
      options: [],
      acceptedAnswers: [
        { text: 'will arrive', rationale: 'Câu hỏi tương lai: What time will the train arrive...?' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang dạng phủ định dùng "won\'t": "I think he will agree with our proposal."',
      options: [],
      acceptedAnswers: [
        { text: "I don't think he will agree with our proposal.", rationale: 'Cấu trúc phủ định tự nhiên nhất: I don\'t think he will agree with our proposal.' },
        { text: "I think he won't agree with our proposal.", rationale: 'Cấu trúc chấp nhận: I think he won\'t agree with our proposal.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q10',
      kind: 'transform',
      prompt: 'Viết câu đưa ra quyết định tức thì với "I\'ll" khi nghe thấy: "Someone is knocking on the front door."',
      options: [],
      acceptedAnswers: [
        { text: "I'll open it.", rationale: 'Quyết định bộc phát: I\'ll open it.' },
        { text: "I will open it.", rationale: 'Dạng đầy đủ: I will open it.' },
        { text: "I'll answer the door.", rationale: 'Biến thể tự nhiên: I\'ll answer the door.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I will to call you as soon as I arrive home."',
      options: [],
      acceptedAnswers: [
        { text: 'I will call you as soon as I arrive home.', rationale: 'Sau will phải là động từ nguyên mẫu không to (call), bỏ to.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "My brother will passes the driving test next week."',
      options: [],
      acceptedAnswers: [
        { text: 'My brother will pass the driving test next week.', rationale: 'Sau will động từ giữ nguyên mẫu pass, không chia thêm -es.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-will-predictions-09-r1',
      kind: 'choice',
      prompt: 'Do you think humans _____ on other planets by the year 2100?',
      options: [
        { text: 'will live', rationale: 'Câu hỏi dự đoán tương lai với Do you think dùng will live.', correct: true },
        { text: 'are living', rationale: 'Hiện tại tiếp diễn không dùng cho dự đoán xa chưa có sắp xếp.', correct: false },
        { text: 'lived', rationale: 'Lived là thì quá khứ, mốc thời gian là năm 2100.', correct: false },
      ],
      acceptedAnswers: [{ text: 'will live', rationale: 'Dùng will live cho câu hỏi dự đoán tương lai.' }]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-r2',
      kind: 'gap',
      prompt: 'Oh, you dropped your pen! I _____ (pick) it up for you.',
      options: [],
      acceptedAnswers: [
        { text: "'ll pick", rationale: 'Quyết định giúp đỡ ngay lúc xảy ra: I\'ll pick it up.' },
        { text: 'will pick', rationale: 'Dạng đầy đủ: will pick.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi phỏng đoán tương lai bắt đầu bằng "Will": "Technology will replace many jobs in ten years."',
      options: [],
      acceptedAnswers: [
        { text: 'Will technology replace many jobs in ten years?', rationale: 'Đảo trợ động từ Will lên đầu câu.' }
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I promise I will not forgetting your birthday."',
      options: [],
      acceptedAnswers: [
        { text: 'I promise I will not forget your birthday.', rationale: 'Sau will not phải là động từ nguyên mẫu forget, không dùng V-ing.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-will-predictions-09-o1',
      prompt: 'Viết 2 câu dự đoán về tương lai của bạn hoặc thế giới trong 10 năm tới (bắt đầu bằng "I think..." hoặc "I hope...").',
      modelAnswer: 'I think artificial intelligence will change the way students learn. I hope I will travel to many European countries.',
      checks: [
        'Dùng đúng cấu trúc dự đoán với will + V nguyên mẫu.',
        'Mở đầu bằng I think hoặc I hope để thể hiện quan điểm/mong muốn cá nhân.'
      ]
    },
    {
      id: 'grammar-v2-a2-will-predictions-09-o2',
      prompt: 'Viết một mẩu hội thoại ngắn (2 câu) trong đó người thứ nhất nêu ra một vấn đề bất ngờ và người thứ hai đưa ra một quyết định tức thì dùng "I\'ll...".',
      modelAnswer: 'It\'s raining heavily and I don\'t have a raincoat. - Don\'t worry, I\'ll lend you my umbrella.',
      checks: [
        'Người thứ hai sử dụng I\'ll hoặc I will + V nguyên mẫu cho quyết định tức thì.',
        'Ngữ cảnh đối thoại hợp lý và tự nhiên.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-future-predictions-will',
      title: 'British Council LearnEnglish: Future - will and shall',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/future-will-shall',
      claims: ['We use will to make predictions about the future and for spontaneous decisions made at the moment of speaking.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only'
    }
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit west',
    reviewedAt: '2026-10-06T05:54:31Z'
  }
};

export default lesson;
