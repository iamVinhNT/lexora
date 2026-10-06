/**
 * @file going-to-intentions.ts
 * @description Lesson: Be going to for future intentions and evidence-based predictions (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-going-to-intentions-10',
  revisionId: 'grammar-v2-a2-going-to-intentions-10@1.0.0',
  revision: '1.0.0',
  title: 'Tương lai với Be Going To: Dự định và Dự đoán có căn cứ',
  objective: 'Sử dụng cấu trúc be going to (khẳng định, phủ định, nghi vấn) để nói về ý định/kế hoạch tương lai đã quyết định từ trước và dự đoán tương lai dựa trên bằng chứng thấy rõ trước mắt.',
  prerequisiteIds: ['grammar-v2-a2-will-predictions-09'],
  coverage: ['going-to-intentions', 'future-forms', 'be-going-to', 'intentions', 'a2-grammar'],
  context: {
    english: 'Look at those dark clouds in the sky; it is going to rain very soon. Mai is saving money because she is going to buy a new laptop next month.',
    vietnamese: 'Nhìn những đám mây đen kịt trên bầu trời kìa; trời sắp sửa mưa rồi. Mai đang tiết kiệm tiền vì cô ấy dự định sẽ mua một chiếc máy tính xách tay mới vào tháng tới.',
  },
  guide: {
    pattern: 'S + am/is/are + (not) + going to + V-inf | Am/Is/Are + S + going to + V-inf?',
    whenToUse: [
      'Be going to thường nêu ý định đã có trước hoặc dự đoán dựa trên bằng chứng hiện tại; will cũng có thể diễn đạt các dự đoán/tương lai này với sắc thái khác.',
      'Dùng be going to cho dự đoán có dấu hiệu hiện tại khi muốn nhấn mạnh bằng chứng đó; will cũng có thể dự đoán cùng sự việc.',
      'Hỏi về kế hoạch, dự định tương lai của người khác: What are you going to do...?',
    ],
    signalWords: ['Look at...', 'Watch out!', 'Be careful!', 'next week', 'tonight', 'going to', 'plan to'],
    check: [
      'Bắt buộc phải có dạng to be (am/is/are) tương ứng với chủ ngữ trước cụm "going to".',
      'Sau "going to" luôn là động từ nguyên mẫu (V-inf).',
      'Be going to thường nhấn mạnh ý định có trước; will thường dùng cho quyết định hình thành lúc nói. Đây là khuynh hướng, không phải hai dạng loại trừ nhau trong mọi ngữ cảnh.',
      'Be going to thường nêu dự đoán từ bằng chứng hiện tại; will cũng có thể diễn đạt dự đoán đó từ góc nhìn của người nói.',
    ],
  },
  explanation: 'Be going to + động từ nguyên mẫu diễn đạt dự định đã hình thành trước thời điểm nói hoặc dự đoán dựa trên dấu hiệu hiện tại. Cấu trúc gồm am/is/are + going to + V-inf; phủ định đặt not sau be, câu hỏi đảo be lên trước chủ ngữ. So với will, be going to thường nhấn mạnh dự định có trước hoặc bằng chứng hiện tại, còn will thường dùng cho quyết định tại lúc nói hoặc dự đoán theo ý kiến; đây là khác biệt về cách nhìn, không phải những quy tắc loại trừ nhau tuyệt đối.',
  examples: [
    { english: 'I am going to visit my grandparents in the countryside this weekend.', vietnamese: 'Tôi dự định sẽ đi thăm ông bà ở quê vào cuối tuần này.' },
    { english: 'Look at that careless driver! He is going to crash into the fence.', vietnamese: 'Nhìn người lái xe bất cẩn kìa! Anh ta sắp đâm vào hàng rào rồi.' },
    { english: 'We are not going to sell our old house; we want to keep it.', vietnamese: 'Chúng tôi không có ý định bán ngôi nhà cũ; chúng tôi muốn giữ nó lại.' },
    { english: 'What are you going to wear to the wedding party tonight?', vietnamese: 'Bạn dự định sẽ mặc gì đến bữa tiệc cưới tối nay?' },
    { english: 'The sky is completely clear; it is not going to rain today.', vietnamese: 'Bầu trời hoàn toàn trong xanh; hôm nay trời sẽ không mưa đâu.' },
    { english: 'She is studying very hard because she is going to take the IELTS test.', vietnamese: 'Cô ấy đang học rất chăm chỉ vì cô ấy dự định sẽ thi IELTS.' },
  ],
  contrasts: [
    {
      form: 'be going to (present evidence) vs will (personal opinion)',
      whyFits: 'Be going to thường hợp khi có bằng chứng hiện tại (Look at the clouds! It is going to rain).',
      whyNot: 'Will cũng có thể dự đoán trời mưa; người nói thường chọn dạng này khi nêu nhận định (I think it will rain tomorrow).',
    },
    {
      form: 'be going to (prior plan) vs will (instant decision)',
      whyFits: 'Be going to thường nhấn mạnh ý định có trước (I am going to visit Da Nang next month).',
      whyNot: 'Will thường tự nhiên khi quyết định hình thành lúc nói (Oh, you are going to Da Nang? I will come with you!), nhưng lựa chọn tùy ngữ cảnh.',
    }
  ],
  commonMistakes: [
    'Quên động từ to be: nói "I going to travel" thay vì "I am going to travel".',
    'Dùng động từ dạng V-ing sau going to: nói "She is going to buying a car" thay vì "going to buy".',
    'Nhầm lẫn giữa will và be going to khi có bằng chứng ngay trước mắt: nói "Look! The car will hit the tree" thay vì "is going to hit".'
  ],
  summary: 'Công thức: S + am/is/are + (not) + going to + V-inf. Dùng cho dự định có sẵn từ trước và dự đoán có bằng chứng cụ thể ở hiện tại.',
  exercises: [
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q1',
      kind: 'choice',
      prompt: 'Choose be going to for a prediction based on visible evidence: "Look at the baby! He is walking towards the steps. He _____ fall!"',
      options: [
        { text: 'is going to', rationale: 'Có bằng chứng trước mắt (đang đi về phía bậc thang) dẫn đến dự đoán sắp ngã, dùng is going to.', correct: true },
        { text: 'will', rationale: 'Will can also express a prediction; this prompt specifically asks for be going to with visible present evidence.', correct: false },
        { text: 'goes to', rationale: 'Goes to không phải cấu trúc tương lai.', correct: false },
      ],
      acceptedAnswers: [{ text: 'is going to', rationale: 'Dùng is going to cho dự đoán có bằng chứng.' }]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q2',
      kind: 'choice',
      prompt: 'Choose be going to for a prior plan: "A: Why are you holding that paint brush? - B: I _____ paint my bedroom."',
      options: [
        { text: 'am going to', rationale: 'Cầm sẵn chổi sơn thể hiện kế hoạch đã quyết định từ trước, dùng am going to.', correct: true },
        { text: 'will', rationale: 'Will often expresses a decision made at the time of speaking; the brush and prompt identify a prior plan and request be going to.', correct: false },
        { text: 'painted', rationale: 'Painted là quá khứ đơn, không phù hợp với hành động sắp làm.', correct: false },
      ],
      acceptedAnswers: [{ text: 'am going to', rationale: 'Dùng am going to cho kế hoạch có sẵn.' }]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q3',
      kind: 'choice',
      prompt: 'What _____ you going to do after you graduate from high school?',
      options: [
        { text: 'are', rationale: 'Chủ ngữ you đi với to be are trong câu hỏi: What are you going to do...?', correct: true },
        { text: 'do', rationale: 'Do không đi với going to trong cấu trúc này.', correct: false },
        { text: 'will', rationale: 'Will không đi với going to trong thì tương lai gần.', correct: false },
      ],
      acceptedAnswers: [{ text: 'are', rationale: 'Dùng to be are với chủ ngữ you.' }]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q4',
      kind: 'choice',
      prompt: 'Nam has saved enough money and already decided to buy a new motorbike. He _____ buy it next week.',
      options: [
        { text: 'is going to', rationale: 'Nam đã tiết kiệm tiền chứng tỏ ý định đã có sẵn từ trước, dùng is going to.', correct: true },
        { text: 'going to', rationale: 'Thiếu trợ động từ to be is.', correct: false },
        { text: 'is will', rationale: 'Is will là cấu trúc ngữ pháp sai.', correct: false },
      ],
      acceptedAnswers: [{ text: 'is going to', rationale: 'Dùng is going to cho dự định tương lai.' }]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q5',
      kind: 'gap',
      prompt: 'Use be going to for a prediction based on present evidence: "Look at those black clouds! It _____ (rain) heavily soon."',
      options: [],
      acceptedAnswers: [
        { text: 'is going to rain', rationale: 'Dự đoán có bằng chứng mây đen trước mắt dùng is going to rain.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q6',
      kind: 'gap',
      prompt: 'Use be going to to express the plan we have decided on: "We _____ (not travel) to Thailand this summer because tickets are too expensive."',
      options: [],
      acceptedAnswers: [
        { text: 'are not going to travel', rationale: 'Dạng phủ định đầy đủ: are not going to travel.' },
        { text: "aren't going to travel", rationale: 'Dạng viết tắt chính xác: aren\'t going to travel.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q7',
      kind: 'gap',
      prompt: 'I have already decided: I _____ (learn) how to drive a car next month.',
      options: [],
      acceptedAnswers: [
        { text: 'am going to learn', rationale: 'Ngữ cảnh nêu sẵn ý định đã có trước, nên chọn be going to.' },
        { text: "'m going to learn", rationale: 'Dạng viết tắt: \'m going to learn.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q8',
      kind: 'gap',
      prompt: '_____ she _____ (apply) for the new position at your company? (Điền to be và going to apply cách nhau một dấu cách)',
      options: [],
      acceptedAnswers: [
        { text: 'Is going to apply', rationale: 'Câu hỏi với she: Is she going to apply...?' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định với "be going to": "They are going to move to another city."',
      options: [],
      acceptedAnswers: [
        { text: 'They are not going to move to another city.', rationale: 'Thêm not sau are để tạo câu phủ định.' },
        { text: "They aren't going to move to another city.", rationale: 'Dạng viết tắt aren\'t hoàn toàn chính xác.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q10',
      kind: 'transform',
      prompt: 'Đặt câu hỏi Yes/No với "be going to" cho câu sau: "You are going to cook dinner tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'Are you going to cook dinner tonight?', rationale: 'Đảo Are lên trước chủ ngữ you.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "She going to study medicine at university next year."',
      options: [],
      acceptedAnswers: [
        { text: 'She is going to study medicine at university next year.', rationale: 'Thiếu động từ to be is trước going to.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "We are going to visiting our grandparents tomorrow."',
      options: [],
      acceptedAnswers: [
        { text: 'We are going to visit our grandparents tomorrow.', rationale: 'Sau going to là động từ nguyên mẫu visit, không dùng visiting.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-going-to-intentions-10-r1',
      kind: 'choice',
      prompt: 'Choose be going to for a prediction based on visible evidence: "Be careful! The ladder is shaking; you _____ fall!"',
      options: [
        { text: 'are going to', rationale: 'Có bằng chứng hiện tại cái thang đang rung lắc, dùng are going to fall.', correct: true },
        { text: 'will', rationale: 'Will is another possible future prediction; this prompt specifically asks for be going to based on visible evidence.', correct: false },
        { text: 'go to', rationale: 'Go to fall sai ngữ pháp hoàn toàn.', correct: false },
      ],
      acceptedAnswers: [{ text: 'are going to', rationale: 'Dùng are going to cho dự đoán có bằng chứng.' }]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-r2',
      kind: 'gap',
      prompt: 'Peter has packed his bags. He _____ (leave) for Tokyo tomorrow morning.',
      options: [],
      acceptedAnswers: [
        { text: 'is going to leave', rationale: 'Hành động đã đóng gói hành lý chứng tỏ dự định có sẵn, dùng is going to leave.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-r3',
      kind: 'transform',
      prompt: 'Đặt câu hỏi với "What" cho câu sau: "They are going to build a new bridge across the river."',
      options: [],
      acceptedAnswers: [
        { text: 'What are they going to build across the river?', rationale: 'Dùng từ để hỏi What và đảo are lên trước they.' },
        { text: 'What are they going to build?', rationale: 'Biến thể câu hỏi ngắn gọn.' }
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Look at that runner, he will winning the race!"',
      options: [],
      acceptedAnswers: [
        { text: 'Look at that runner, he is going to win the race!', rationale: 'Có bằng chứng nhìn thấy trước mắt nên dùng is going to win thay vì will winning.' },
        { text: 'Look at that runner, he is going to win!', rationale: 'Dạng rút gọn không có the race.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-going-to-intentions-10-o1',
      prompt: 'Viết 2 câu chia sẻ về dự định hoặc kế hoạch cá nhân của bạn vào cuối tuần này hoặc kỳ nghỉ tới (sử dụng "be going to").',
      modelAnswer: 'I am going to visit my hometown this weekend. I am going to have dinner with my old high school friends.',
      checks: [
        'Sử dụng đúng cấu trúc am/is/are + going to + V nguyên mẫu.',
        'Diễn tả ý định hoặc kế hoạch cá nhân rõ ràng.'
      ]
    },
    {
      id: 'grammar-v2-a2-going-to-intentions-10-o2',
      prompt: 'Viết một tình huống có dấu hiệu hoặc bằng chứng trước mắt (dùng Look at... hoặc Be careful!) và đưa ra lời dự đoán dùng "be going to".',
      modelAnswer: 'Look at that boy carrying too many books! He is going to drop them.',
      checks: [
        'Có câu miêu tả bằng chứng hoặc tình huống hiện tại (ví dụ: Look at...).',
        'Dự đoán tiếp theo sử dụng đúng thì tương lai với be going to.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-future-plans-going-to',
      title: 'British Council LearnEnglish: Future plans - going to and present continuous',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/future-plans-going-to-present-continuous',
      claims: ['We use be going to to talk about future plans and intentions, and predictions based on present evidence.'],
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
