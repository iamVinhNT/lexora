/**
 * @file present-continuous-arrangements.ts
 * @description Lesson: Present Continuous for fixed future arrangements (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-present-continuous-arrangements-11',
  revisionId: 'grammar-v2-a2-present-continuous-arrangements-11@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại tiếp diễn chỉ Kế hoạch đã thu xếp (Present Continuous for Future Arrangements)',
  objective: 'Sử dụng thì Hiện tại tiếp diễn (am/is/are + V-ing) kết hợp với mốc thời gian tương lai để diễn đạt các kế hoạch hoặc cuộc hẹn đã được thu xếp cố định từ trước (fixed arrangements).',
  prerequisiteIds: ['grammar-v2-a2-going-to-intentions-10'],
  coverage: ['present-continuous-arrangements', 'future-forms', 'present-continuous', 'arrangements', 'a2-grammar'],
  context: {
    english: 'Minh is flying to Singapore at 9:00 AM tomorrow. He has already bought the airline ticket and booked his hotel room.',
    vietnamese: 'Minh sẽ bay sang Singapore vào lúc 9 giờ sáng mai. Anh ấy đã mua vé máy bay và đặt phòng khách sạn xong xuôi rồi.',
  },
  guide: {
    pattern: 'S + am/is/are + V-ing + future time marker (tomorrow, this evening, next Monday)',
    whenToUse: [
      'Diễn tả kế hoạch tương lai đã được thu xếp chắc chắn, có lịch hẹn cụ thể (đã đặt vé, hẹn gặp người khác, có giờ giấc rõ ràng).',
      'Thường dùng với các động từ chỉ sự di chuyển hoặc gặp gỡ xã hội (meet, travel, fly, visit, have lunch with, see the dentist).',
      'Một mốc thời gian tương lai hoặc ngữ cảnh phù hợp thường làm rõ cách dùng tương lai; không bắt buộc phải nêu mốc tường minh nếu ngữ cảnh đã rõ.',
    ],
    signalWords: ['tomorrow', 'this evening', 'tonight', 'next Friday', 'at 10 AM tomorrow', 'this weekend'],
    check: [
      'Cấu trúc giống thì hiện tại tiếp diễn thông thường: S + am/is/are + V-ing.',
      'Có mốc thời gian tương lai trong câu hoặc ngữ cảnh để nhận ra cách dùng này; không phải lúc nào mốc cũng phải được nêu thành từ riêng trong câu.',
      'Hành động đã có sự sắp xếp thực tế (arrangements) giữa hai người hoặc đã đặt lịch/mua vé.',
    ],
  },
  explanation: 'Thì Hiện tại tiếp diễn (Present Continuous) diễn tả hành động đang xảy ra và cũng có thể nói về kế hoạch cá nhân đã thu xếp cho tương lai. Một mốc thời gian tương lai hoặc ngữ cảnh phù hợp giúp nhận ra cách dùng tương lai (ví dụ: I am meeting Lan tomorrow). Kế hoạch thường đã có sự thu xếp cụ thể, như một cuộc hẹn hoặc lịch trình, nhưng không nhất thiết phải có vé hay lịch chốt chính thức.',
  examples: [
    { english: 'I am seeing the dentist at 2:30 PM tomorrow.', vietnamese: 'Tôi có hẹn khám nha sĩ vào lúc 2 giờ 30 chiều mai.' },
    { english: 'They are getting married in November.', vietnamese: 'Họ sẽ làm đám cưới vào tháng mười một tới.' },
    { english: 'We are having dinner with our clients tonight.', vietnamese: 'Tối nay chúng tôi sẽ ăn tối với các khách hàng của mình.' },
    { english: 'She is not working next week because she is taking a holiday.', vietnamese: 'Cô ấy sẽ không đi làm vào tuần tới vì cô ấy nghỉ phép.' },
    { english: 'Are you doing anything special this Saturday evening?', vietnamese: 'Thứ Bảy tuần này bạn có kế hoạch gì đặc biệt không?' },
    { english: 'My brother is flying to London on Monday morning.', vietnamese: 'Anh trai tôi sẽ bay đến London vào sáng thứ Hai.' },
  ],
  contrasts: [
    {
      form: 'Present Continuous for now vs Present Continuous for future arrangements',
      whyFits: 'Khi có từ chỉ thời gian tương lai (tomorrow, next week), thì tiếp diễn chỉ kế hoạch đã chốt.',
      whyNot: 'Nếu không có từ chỉ thời gian tương lai hoặc dấu hiệu ngữ cảnh, câu sẽ được hiểu là hành động đang xảy ra ngay bây giờ (She is cooking in the kitchen).'
    },
    {
      form: 'Present Continuous (fixed arrangement) vs Be going to (intention)',
      whyFits: 'Dùng Present Continuous khi kế hoạch đã chốt giờ cụ thể hoặc đã có sự thu xếp với người khác (I am meeting Peter at 5 PM).',
      whyNot: 'Dùng be going to khi mới chỉ là ý định trong đầu mà chưa chốt lịch hay chuẩn bị cụ thể (I am going to meet Peter soon).'
    }
  ],
  commonMistakes: [
    'Thiếu ngữ cảnh có thể khiến câu Present Continuous được hiểu là việc đang diễn ra; thêm mốc thời gian hoặc ngữ cảnh tương lai khi đó cần thiết để làm rõ nghĩa, nhưng không phải mọi cách dùng tương lai đều bắt buộc có mốc thời gian tường minh.',
    'Dùng thì Hiện tại đơn cho cuộc hẹn cá nhân: nói "I meet the doctor tomorrow" thay vì "I am meeting the doctor tomorrow".',
    'Chia sai dạng V-ing: viết "he is runing" thay vì "he is running" hoặc "she is makeing" thay vì "making".'
  ],
  summary: 'Công thức: S + am/is/are + V-ing + mốc tương lai. Dùng cho kế hoạch đã thu xếp chắc chắn, có cuộc hẹn hoặc lịch trình cố định.',
  exercises: [
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q1',
      kind: 'choice',
      prompt: 'I have an appointment with Dr. Ha. I _____ him at 10 AM tomorrow.',
      options: [
        { text: 'am seeing', rationale: 'Cuộc hẹn đã được thu xếp cụ thể có giờ giấc (at 10 AM tomorrow), dùng thì Hiện tại tiếp diễn am seeing.', correct: true },
        { text: 'see', rationale: 'Hiện tại đơn không dùng cho cuộc hẹn cá nhân trong tương lai.', correct: false },
        { text: 'saw', rationale: 'Saw là thì quá khứ đơn, không phù hợp mốc tomorrow.', correct: false },
      ],
      acceptedAnswers: [{ text: 'am seeing', rationale: 'Dùng am seeing cho cuộc hẹn đã thu xếp.' }]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q2',
      kind: 'choice',
      prompt: 'Hoa and Nam _____ dinner together at an Italian restaurant tonight.',
      options: [
        { text: 'are having', rationale: 'Chủ ngữ hai người là số nhiều, kế hoạch tối nay đã lên lịch dùng are having.', correct: true },
        { text: 'is having', rationale: 'Chủ ngữ hai người Hoa and Nam là số nhiều, không đi với is having.', correct: false },
        { text: 'have had', rationale: 'Have had là thì hoàn thành, không dùng cho sự việc tối nay chưa xảy ra.', correct: false },
      ],
      acceptedAnswers: [{ text: 'are having', rationale: 'Dùng are having cho hai người với kế hoạch tối nay.' }]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q3',
      kind: 'choice',
      prompt: 'What time _____ you meeting the director tomorrow morning?',
      options: [
        { text: 'are', rationale: 'Chủ ngữ you đi với to be are trong cấu trúc tiếp diễn chỉ tương lai: What time are you meeting...?', correct: true },
        { text: 'do', rationale: 'Do không kết hợp với V-ing meeting.', correct: false },
        { text: 'will', rationale: 'Will không đi với meeting.', correct: false },
      ],
      acceptedAnswers: [{ text: 'are', rationale: 'Dùng are với chủ ngữ you.' }]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q4',
      kind: 'choice',
      prompt: 'She cannot come to the cinema with us because she has arranged a visit to her grandmother this evening. She _____ her grandmother then.',
      options: [
        { text: 'is visiting', rationale: 'Ngữ cảnh xác nhận cô ấy đã hẹn thăm bà tối nay, nên đây là một sự thu xếp cá nhân tương lai.', correct: true },
        { text: 'visits', rationale: 'Hiện tại đơn chỉ thói quen lặp lại, không dùng cho lịch hẹn tối nay.', correct: false },
        { text: 'visited', rationale: 'Visited là quá khứ đơn.', correct: false },
      ],
      acceptedAnswers: [{ text: 'is visiting', rationale: 'Dùng is visiting cho kế hoạch tối nay.' }]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q5',
      kind: 'gap',
      prompt: 'We _____ (leave) for Tokyo on the 7:00 AM flight tomorrow.',
      options: [],
      acceptedAnswers: [
        { text: 'are leaving', rationale: 'Chuyến bay ngày mai đã chốt vé và giờ, dùng are leaving.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q6',
      kind: 'gap',
      prompt: 'John _____ (not play) tennis with us this Saturday because he has already arranged other plans.',
      options: [],
      acceptedAnswers: [
        { text: 'is not playing', rationale: 'Dạng phủ định đầy đủ: is not playing.' },
        { text: "isn't playing", rationale: 'Dạng viết tắt chính xác: isn\'t playing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q7',
      kind: 'gap',
      prompt: 'I have booked a room near the beach. I _____ (stay) there this weekend.',
      options: [],
      acceptedAnswers: [
        { text: 'am staying', rationale: 'Kế hoạch đã đặt phòng khách sạn cuối tuần này: am staying.' },
        { text: "'m staying", rationale: 'Dạng viết tắt: \'m staying.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q8',
      kind: 'gap',
      prompt: '_____ they _____ (hold) the annual meeting next Friday? (Điền to be và V-ing cách nhau một dấu cách)',
      options: [],
      acceptedAnswers: [
        { text: 'Are holding', rationale: 'Câu hỏi với they: Are they holding...?' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thì Hiện tại tiếp diễn chỉ kế hoạch đã thu xếp trong tương lai: "My flight to Da Nang is booked for next Monday."',
      options: [],
      acceptedAnswers: [
        { text: 'I am flying to Da Nang next Monday.', rationale: 'Dùng am flying để nêu kế hoạch bay đã thu xếp cho ngày thứ Hai tới.' },
        { text: "I'm flying to Da Nang next Monday.", rationale: 'Dạng viết tắt tự nhiên của am flying.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q10',
      kind: 'transform',
      prompt: 'Đặt câu hỏi Yes/No với thì Hiện tại tiếp diễn cho câu sau: "You are having lunch with Mai tomorrow."',
      options: [],
      acceptedAnswers: [
        { text: 'Are you having lunch with Mai tomorrow?', rationale: 'Đảo Are lên đầu câu để tạo câu hỏi.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q11',
      kind: 'correction',
      prompt: 'Sửa câu theo chủ đề bằng thì Hiện tại tiếp diễn cho cuộc hẹn đã thu xếp: "I meet my advisor at 3 PM tomorrow afternoon."',
      options: [],
      acceptedAnswers: [
        { text: 'I am meeting my advisor at 3 PM tomorrow afternoon.', rationale: 'Kế hoạch gặp có giờ giấc cụ thể ngày mai phải dùng thì Hiện tại tiếp diễn (am meeting).' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "They are fly to London next Sunday."',
      options: [],
      acceptedAnswers: [
        { text: 'They are flying to London next Sunday.', rationale: 'Sau to be are phải là động từ thêm đuôi -ing (flying), không dùng fly.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-r1',
      kind: 'choice',
      prompt: 'A: "Can we talk tomorrow morning?" - B: "Sorry, I _____ an interview at that time."',
      options: [
        { text: 'am having', rationale: 'Lịch phỏng vấn đã được hẹn giờ từ trước, dùng am having.', correct: true },
        { text: 'have', rationale: 'Hiện tại đơn không thể hiện lịch hẹn cụ thể tương lai.', correct: false },
        { text: 'had', rationale: 'Had là thì quá khứ, không phù hợp mốc tomorrow.', correct: false },
      ],
      acceptedAnswers: [{ text: 'am having', rationale: 'Dùng am having cho lịch hẹn phỏng vấn.' }]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-r2',
      kind: 'gap',
      prompt: 'My brother _____ (start) his new university course next month.',
      options: [],
      acceptedAnswers: [
        { text: 'is starting', rationale: 'Lịch học khóa mới đã đăng ký và xếp lịch: is starting.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-r3',
      kind: 'transform',
      prompt: 'Đặt câu hỏi với "Where" cho câu sau: "They are staying in Paris next week."',
      options: [],
      acceptedAnswers: [
        { text: 'Where are they staying next week?', rationale: 'Đảo are lên trước they kèm từ để hỏi Where.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "We are take an exam next Tuesday morning."',
      options: [],
      acceptedAnswers: [
        { text: 'We are taking an exam next Tuesday morning.', rationale: 'Đổi take thành taking sau are để tạo thì hiện tại tiếp diễn.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-o1',
      prompt: 'Viết 2 câu miêu tả lịch trình cố định của bạn trong tuần tới (ví dụ: một cuộc hẹn bác sĩ, đi gặp bạn bè hoặc một buổi học).',
      modelAnswer: 'I am seeing my dentist at 9 AM on Wednesday. On Friday evening, I am having dinner with my university friends.',
      checks: [
        'Sử dụng đúng cấu trúc thì Hiện tại tiếp diễn (am/is/are + V-ing).',
        'Có mốc thời gian cụ thể trong tương lai (ví dụ: at 9 AM on Wednesday, On Friday evening).'
      ]
    },
    {
      id: 'grammar-v2-a2-present-continuous-arrangements-11-o2',
      prompt: 'Viết một câu hỏi và một câu trả lời từ chối khéo léo một lời mời đi chơi vào tối nay vì đã có lịch hẹn từ trước.',
      modelAnswer: 'Are you free for a movie tonight? - I am sorry, I can\'t. I am attending my cousin\'s birthday party tonight.',
      checks: [
        'Câu hỏi hoặc câu trả lời sử dụng thì Hiện tại tiếp diễn chỉ kế hoạch đã có lịch trước.',
        'Ngữ cảnh giao tiếp tự nhiên và lịch sự.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-present-continuous-future',
      title: 'British Council LearnEnglish: Present continuous for future arrangements',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-continuous-future-arrangements',
      claims: ['We use the present continuous to talk about future arrangements with a fixed time and place.'],
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
