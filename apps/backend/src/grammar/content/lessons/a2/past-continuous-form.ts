/**
 * @file past-continuous-form.ts
 * @description Lesson: Past Continuous: form and affirmative/negative/question patterns (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-past-continuous-form-01',
  revisionId: 'grammar-v2-a2-past-continuous-form-01@1.0.0',
  revision: '1.0.0',
  title: 'Quá khứ tiếp diễn: Cấu trúc cơ bản',
  objective: 'Nắm vững cấu trúc khẳng định, phủ định và câu hỏi của thì quá khứ tiếp diễn (was/were + V-ing) tại thời điểm xác định trong quá khứ.',
  prerequisiteIds: ['grammar-v2-a1-place-and-time-order-24'],
  coverage: ['past-continuous-form', 'past-tenses', 'continuous-aspect', 'a2-grammar'],
  context: {
    english: 'At 8:00 PM yesterday, Tom was reading a book while his sister was studying in her room.',
    vietnamese: 'Vào lúc 8 giờ tối hôm qua, Tom đang đọc sách trong khi em gái anh ấy đang học bài trong phòng.',
  },
  guide: {
    pattern: 'S + was/were (not) + V-ing | Was/Were + S + V-ing?',
    whenToUse: [
      'Diễn tả hành động đang diễn ra tại một thời điểm xác định trong quá khứ.',
      'Nhấn mạnh tính liên tục, chưa kết thúc của hành động tại mốc quá khứ.',
    ],
    signalWords: ['at 8 PM yesterday', 'at that moment', 'at this time last week'],
    check: [
      'Dùng was với I/he/she/it và danh từ số ít; dùng were với you/we/they và danh từ số nhiều.',
      'Động từ chính phải ở dạng đuôi -ing (V-ing).',
    ],
  },
  explanation: 'Thì quá khứ tiếp diễn miêu tả hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ. Cấu trúc khẳng định: S + was/were + V-ing (ví dụ: She was sleeping). Dạng phủ định: S + was not (wasn\'t) / were not (weren\'t) + V-ing. Dạng nghi vấn đảo trợ động từ lên trước: Was/Were + S + V-ing? (ví dụ: Were you working at 9 PM?). Lưu ý quy tắc biến đổi đuôi -ing: make -> making, run -> running, lie -> lying.',
  examples: [
    { english: 'I was watching television at eight o\'clock last night.', vietnamese: 'Tôi đang xem tivi vào lúc tám giờ tối qua.' },
    { english: 'They were playing tennis at this time yesterday.', vietnamese: 'Họ đang chơi quần vợt vào giờ này ngày hôm qua.' },
    { english: 'He was not listening when the teacher gave instructions.', vietnamese: 'Anh ấy đã không chú ý lắng nghe khi giáo viên hướng dẫn.' },
    { english: 'We were living in Da Nang two years ago.', vietnamese: 'Chúng tôi đang sống ở Đà Nẵng vào hai năm trước.' },
    { english: 'Were you sleeping when I called your phone?', vietnamese: 'Bạn có đang ngủ lúc tôi gọi điện không?' },
    { english: 'What was she doing at midnight yesterday?', vietnamese: 'Cô ấy đang làm gì vào nửa đêm hôm qua?' },
  ],
  contrasts: [
    {
      form: 'Past Continuous (was doing) vs Past Simple (did)',
      whyFits: 'Dùng was doing khi muốn nhấn mạnh hành động đang diễn ra dở dang tại thời điểm nói trong quá khứ.',
      whyNot: 'Không dùng did nếu muốn nhấn mạnh quá trình đang xảy ra tại một thời điểm cụ thể (at 8 PM).'
    },
    {
      form: 'was vs were',
      whyFits: 'Dùng was cho ngôi thứ nhất số ít (I) và ngôi thứ ba số ít (he/she/it); dùng were cho you/we/they.',
      whyNot: 'Tránh dùng was cho chủ ngữ số nhiều như we/they hoặc danh từ đếm được số nhiều.'
    }
  ],
  commonMistakes: [
    'Quên trợ động từ to be ở quá khứ: nói "I walking home" thay vì "I was walking home".',
    'Chia sai dạng số ít/số nhiều của to be: dùng "they was playing" thay vì "they were playing".',
    'Dùng động từ nguyên mẫu sau was/were: dùng "she was clean the room" thay vì "she was cleaning the room".'
  ],
  summary: 'Quá khứ tiếp diễn có công thức: S + was/were + V-ing. Dùng cho hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ.',
  exercises: [
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q1',
      kind: 'choice',
      prompt: 'At 7 PM yesterday, Linda _____ dinner in the kitchen.',
      options: [
        { text: 'was cooking', rationale: 'Linda là ngôi thứ ba số ít nên đi với was + V-ing.', correct: true },
        { text: 'were cooking', rationale: 'Were chỉ dùng cho chủ ngữ số nhiều hoặc you/we/they.', correct: false },
        { text: 'is cooking', rationale: 'Is cooking là thì hiện tại tiếp diễn, không phù hợp với mốc yesterday.', correct: false },
      ],
      acceptedAnswers: [{ text: 'was cooking', rationale: 'Chủ ngữ số ít Linda đi với was cooking.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q2',
      kind: 'choice',
      prompt: 'Choose the past continuous form to show the discussion was in progress when the bell rang: "The students _____ their project when the bell rang."',
      options: [
        { text: 'were discussing', rationale: 'The students là danh từ số nhiều nên dùng were discussing.', correct: true },
        { text: 'was discussing', rationale: 'Was chỉ dùng cho chủ ngữ số ít.', correct: false },
        { text: 'discussed', rationale: 'Discussed can report a completed event; the prompt asks for past continuous to show the activity was in progress when the bell rang.', correct: false },
      ],
      acceptedAnswers: [{ text: 'were discussing', rationale: 'The students là số nhiều, dùng were discussing.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q3',
      kind: 'choice',
      prompt: 'What _____ you doing at 10 PM last night?',
      options: [
        { text: 'were', rationale: 'Chủ ngữ you đi với trợ động từ were trong câu hỏi quá khứ tiếp diễn.', correct: true },
        { text: 'was', rationale: 'Was không đi với chủ ngữ you.', correct: false },
        { text: 'did', rationale: 'Did đi với động từ nguyên mẫu do, không đi với doing.', correct: false },
      ],
      acceptedAnswers: [{ text: 'were', rationale: 'Trợ động từ phù hợp với you là were.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q4',
      kind: 'choice',
      prompt: 'I _____ attention because I had a headache.',
      options: [
        { text: 'was not paying', rationale: 'Chủ ngữ I đi với was not + V-ing trong câu phủ định.', correct: true },
        { text: 'were not paying', rationale: 'I không đi với were trong câu trần thuật thông thường.', correct: false },
        { text: 'did not paying', rationale: 'Did not đi với V nguyên mẫu, không kết hợp với V-ing.', correct: false },
      ],
      acceptedAnswers: [{ text: 'was not paying', rationale: 'I đi với was not paying.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q5',
      kind: 'gap',
      prompt: 'At 9 AM this morning, Mark _____ (read) a newspaper in the cafe.',
      options: [],
      acceptedAnswers: [
        { text: 'was reading', rationale: 'Chủ ngữ Mark là số ít, dùng was reading cho hành động đang diễn ra lúc 9 AM.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q6',
      kind: 'gap',
      prompt: 'We _____ (wait) for the bus at 6:30 yesterday evening.',
      options: [],
      acceptedAnswers: [
        { text: 'were waiting', rationale: 'Chủ ngữ We là số nhiều, dùng were waiting.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q7',
      kind: 'gap',
      prompt: 'It _____ (not rain) when we left the cinema.',
      options: [],
      acceptedAnswers: [
        { text: 'was not raining', rationale: 'Dạng phủ định với chủ ngữ It là was not raining.' },
        { text: "wasn't raining", rationale: 'Dạng viết tắt chính xác của was not raining.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q8',
      kind: 'gap',
      prompt: '_____ they _____ (sleep) when you arrived home? (Điền trợ động từ và dạng V-ing cách nhau bằng dấu cách)',
      options: [],
      acceptedAnswers: [
        { text: 'Were sleeping', rationale: 'Câu hỏi với they: Were they sleeping.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định: "She was listening to music at that time."',
      options: [],
      acceptedAnswers: [
        { text: 'She was not listening to music at that time.', rationale: 'Thêm not sau was để tạo câu phủ định.' },
        { text: "She wasn't listening to music at that time.", rationale: 'Dạng viết tắt wasn\'t hoàn toàn chính xác.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi Yes/No: "You were writing an email at 4 PM."',
      options: [],
      acceptedAnswers: [
        { text: 'Were you writing an email at 4 PM?', rationale: 'Đảo trợ động từ Were lên đầu câu để tạo câu hỏi.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Yesterday at noon, they was eating lunch together."',
      options: [],
      acceptedAnswers: [
        { text: 'Yesterday at noon, they were eating lunch together.', rationale: 'Chủ ngữ they phải đi với were, không đi với was.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I was drive to work when my car broke down."',
      options: [],
      acceptedAnswers: [
        { text: 'I was driving to work when my car broke down.', rationale: 'Sau was phải là V-ing (driving), không dùng động từ nguyên mẫu drive.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-past-continuous-form-01-r1',
      kind: 'choice',
      prompt: 'At 3 PM last Sunday, our family _____ in the garden.',
      options: [
        { text: 'was relaxing', rationale: 'Our family xem như một chỉnh thể số ít ở đây đi với was relaxing.', correct: true },
        { text: 'were relax', rationale: 'Sau were phải có V-ing.', correct: false },
        { text: 'is relaxing', rationale: 'Is relaxing là thì hiện tại, câu có mốc last Sunday.', correct: false }
      ],
      acceptedAnswers: [{ text: 'was relaxing', rationale: 'Dùng was relaxing cho hành động đang diễn ra tại mốc quá khứ.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-r2',
      kind: 'gap',
      prompt: 'The workers _____ (repair) the road at 11 PM last night.',
      options: [],
      acceptedAnswers: [
        { text: 'were repairing', rationale: 'The workers là danh từ số nhiều, đi với were repairing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi với từ để hỏi Where: "He was staying at a hotel in Hanoi last week."',
      options: [],
      acceptedAnswers: [
        { text: 'Where was he staying last week?', rationale: 'Đảo was lên trước chủ ngữ he và dùng Where.' },
        { text: 'Where was he staying in Hanoi last week?', rationale: 'Dạng hỏi chi tiết với Where.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Anna and Ben was studying in the library all afternoon."',
      options: [],
      acceptedAnswers: [
        { text: 'Anna and Ben were studying in the library all afternoon.', rationale: 'Hai chủ ngữ nối bằng and tạo thành chủ ngữ số nhiều, phải dùng were.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-past-continuous-form-01-o1',
      prompt: 'Viết 2 câu miêu tả bạn và người thân đang làm gì vào lúc 8 giờ tối hôm qua (sử dụng thì quá khứ tiếp diễn).',
      modelAnswer: 'At 8 PM yesterday, I was doing my English homework. My brother was playing video games in the living room.',
      checks: [
        'Sử dụng đúng cấu trúc was/were + V-ing phù hợp với chủ ngữ.',
        'Có mốc thời gian cụ thể trong quá khứ (ví dụ: at 8 PM yesterday).'
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-form-01-o2',
      prompt: 'Viết 1 câu hỏi và 1 câu trả lời dạng phủ định về việc một người bạn có đang làm gì đó vào một thời điểm cụ thể tối qua không.',
      modelAnswer: 'Were you watching the football match at 9 PM yesterday? - No, I wasn\'t watching it; I was reading a book.',
      checks: [
        'Câu hỏi dùng đúng cấu trúc Was/Were + S + V-ing?',
        'Câu trả lời phủ định dùng đúng wasn\'t hoặc weren\'t + V-ing.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-past-continuous-form',
      title: 'British Council LearnEnglish: Past continuous',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/past-continuous',
      claims: ['Past continuous form consists of was/were + -ing form to describe actions in progress at a past point in time.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only'
    }
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit east',
    reviewedAt: '2026-10-06T05:55:07.025Z'
  }
};

export default lesson;
