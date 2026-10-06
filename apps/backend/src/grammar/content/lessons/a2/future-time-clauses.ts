/**
 * @file future-time-clauses.ts
 * @description Lesson: Future time clauses with when, as soon as, before, after, until (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-future-time-clauses-12',
  revisionId: 'grammar-v2-a2-future-time-clauses-12@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề trạng ngữ chỉ thời gian trong tương lai (Future Time Clauses)',
  objective: 'Nắm vững quy tắc sử dụng thì Hiện tại đơn trong mệnh đề chỉ thời gian (bắt đầu bằng when, as soon as, before, after, until) khi nói về tương lai, kết hợp với mệnh đề chính dùng will.',
  prerequisiteIds: ['grammar-v2-a2-present-continuous-arrangements-11'],
  coverage: ['future-time-clauses', 'future-forms', 'time-clauses', 'subordination', 'a2-grammar'],
  context: {
    english: 'I will call you as soon as I arrive at the hotel. Before we start our presentation, we will check the microphone and projector.',
    vietnamese: 'Tôi sẽ gọi cho bạn ngay khi tôi đến khách sạn. Trước khi chúng tôi bắt đầu bài thuyết trình, chúng tôi sẽ kiểm tra micrô và máy chiếu.',
  },
  guide: {
    pattern: 'Main clause (S + will + V-inf) + Time clause (when / as soon as / before / after / until + S + V-s/es/inf) | Time clause, Main clause',
    whenToUse: [
      'Diễn tả thứ tự và mối quan hệ thời gian giữa hai hành động trong tương lai.',
      'Sử dụng các liên từ chỉ thời gian: when (khi), as soon as (ngay khi), before (trước khi), after (sau khi), until (cho đến khi).',
      'Trong mệnh đề trạng ngữ chỉ thời gian nói về tương lai, thường dùng hiện tại đơn thay cho will (I will call when I arrive).',
    ],
    signalWords: ['when', 'as soon as', 'before', 'after', 'until', 'by the time'],
    check: [
      'Mệnh đề chính dùng thì tương lai (S + will + V) hoặc câu mệnh lệnh.',
      'Trong mẫu A2 này, mệnh đề trạng ngữ chỉ thời gian dùng hiện tại đơn (thường có -s/-es ở ngôi he/she/it); không dùng will chỉ vì sự việc còn ở tương lai.',
      'Nếu mệnh đề thời gian đứng đầu câu, phải có dấu phẩy (,) ngăn cách hai mệnh đề.',
    ],
  },
  explanation: 'Khi nối hai sự việc trong tương lai bằng mệnh đề trạng ngữ chỉ thời gian (when, as soon as, before, after, until), ta thường dùng hiện tại đơn thay vì will trong mệnh đề thời gian: I will send you the document when I finish it. Tùy ngữ cảnh, các dạng hiện tại khác như hiện tại hoàn thành cũng có thể xuất hiện; điểm cần tránh ở bài này là dùng will chỉ vì sự việc chưa xảy ra. Mệnh đề chính có thể dùng will; nếu mệnh đề thời gian đứng đầu câu, thường đặt dấu phẩy trước mệnh đề chính.',
  examples: [
    { english: 'I will text you when I get home.', vietnamese: 'Tôi sẽ nhắn tin cho bạn khi tôi về đến nhà.' },
    { english: 'As soon as the rain stops, we will go for a walk in the park.', vietnamese: 'Ngay khi cơn mưa tạnh, chúng tôi sẽ đi dạo trong công viên.' },
    { english: 'Wash your hands before you eat dinner.', vietnamese: 'Hãy rửa tay trước khi con ăn bữa tối.' },
    { english: 'We will clean the kitchen after our guests leave.', vietnamese: 'Chúng tôi sẽ dọn dẹp nhà bếp sau khi các vị khách rời đi.' },
    { english: 'Please wait here until the doctor calls your name.', vietnamese: 'Xin vui lòng đợi ở đây cho đến khi bác sĩ gọi tên bạn.' },
    { english: 'What will you do when you graduate from university?', vietnamese: 'Bạn sẽ làm gì khi bạn tốt nghiệp đại học?' },
  ],
  contrasts: [
    {
      form: 'Main clause (will + V) vs Time clause (Present Simple)',
      whyFits: 'Dùng Hiện tại đơn sau when/as soon as/before/after dù hành động mang nghĩa tương lai (When he comes, I will tell him).',
      whyNot: 'Trong mệnh đề trạng ngữ chỉ thời gian này, dùng hiện tại đơn thay vì will (When he comes, I will tell him).',
    },
    {
      form: 'Time clause at the beginning vs at the end',
      whyFits: 'Khi mệnh đề thời gian đứng đầu câu, cần có dấu phẩy (Before you leave, turn off the lights).',
      whyNot: 'Khi mệnh đề thời gian đứng sau mệnh đề chính, thông thường không cần dấu phẩy (Turn off the lights before you leave).'
    }
  ],
  commonMistakes: [
    'Dùng will trong mệnh đề trạng ngữ chỉ thời gian tương lai: trong mẫu A2 này, nói "I will call you when I arrive" thay vì "when I will arrive".',
    'Quên chia ngôi thứ ba số ít ở thì hiện tại đơn trong mệnh đề thời gian: nói "when he come" thay vì "when he comes".',
    'Nhầm lẫn giữa "until" (cho đến khi sự việc xảy ra) và "before" (trước khi sự việc xảy ra).'
  ],
  summary: 'Trong mệnh đề trạng ngữ chỉ thời gian nói về tương lai, thường dùng hiện tại đơn (hoặc dạng hiện tại phù hợp khác) thay cho will; mệnh đề chính có thể dùng will.',
  exercises: [
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q1',
      kind: 'choice',
      prompt: 'I will call you as soon as I _____ at the airport tomorrow.',
      options: [
        { text: 'arrive', rationale: 'Sau as soon as chỉ thời gian tương lai dùng thì Hiện tại đơn (arrive), không dùng will.', correct: true },
        { text: 'will arrive', rationale: 'Không dùng will trong mệnh đề trạng ngữ chỉ thời gian.', correct: false },
        { text: 'arrived', rationale: 'Arrived là quá khứ đơn, câu nói về sự việc ngày mai.', correct: false },
      ],
      acceptedAnswers: [{ text: 'arrive', rationale: 'Dùng arrive ở thì hiện tại đơn sau as soon as.' }]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q2',
      kind: 'choice',
      prompt: 'When he _____ back from his business trip, we will discuss the project.',
      options: [
        { text: 'comes', rationale: 'Sau when dùng thì Hiện tại đơn, chủ ngữ he đi với động từ thêm -s là comes.', correct: true },
        { text: 'will come', rationale: 'Không dùng will trong mệnh đề thời gian sau when.', correct: false },
        { text: 'come', rationale: 'Chủ ngữ he là ngôi thứ ba số ít, phải thêm -s vào động từ come.', correct: false },
      ],
      acceptedAnswers: [{ text: 'comes', rationale: 'Dùng comes chia theo chủ ngữ he ở hiện tại đơn.' }]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q3',
      kind: 'choice',
      prompt: 'Please turn off all the lights before you _____ the office.',
      options: [
        { text: 'leave', rationale: 'Sau before dùng thì Hiện tại đơn leave với chủ ngữ you.', correct: true },
        { text: 'will leave', rationale: 'Không dùng will sau liên từ thời gian before.', correct: false },
        { text: 'left', rationale: 'Left là thì quá khứ, không phù hợp với lời nhắc nhở trước khi làm gì.', correct: false },
      ],
      acceptedAnswers: [{ text: 'leave', rationale: 'Dùng leave sau before.' }]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q4',
      kind: 'choice',
      prompt: 'We will stay inside the house until the storm _____.',
      options: [
        { text: 'passes', rationale: 'Sau until dùng thì Hiện tại đơn, the storm là danh từ số ít nên chia passes.', correct: true },
        { text: 'will pass', rationale: 'Không dùng will sau until.', correct: false },
        { text: 'passed', rationale: 'Passed là dạng quá khứ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'passes', rationale: 'Dùng passes sau until với chủ ngữ the storm.' }]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q5',
      kind: 'gap',
      prompt: 'I will buy some bread when I _____ (go) to the supermarket later.',
      options: [],
      acceptedAnswers: [
        { text: 'go', rationale: 'Sau when dùng thì Hiện tại đơn với chủ ngữ I: go.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q6',
      kind: 'gap',
      prompt: 'As soon as Lan _____ (finish) her homework, she will watch her favourite movie.',
      options: [],
      acceptedAnswers: [
        { text: 'finishes', rationale: 'Sau as soon as dùng Hiện tại đơn, chủ ngữ Lan chia động từ finishes (thêm -es sau -sh).' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q7',
      kind: 'gap',
      prompt: 'We _____ (have) lunch after you return from the gym.',
      options: [],
      acceptedAnswers: [
        { text: 'will have', rationale: 'Mệnh đề chính dùng thì tương lai đơn will have.' },
        { text: "'ll have", rationale: 'Dạng viết tắt: \'ll have.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q8',
      kind: 'gap',
      prompt: 'Do not sign the contract before you _____ (read) all the terms carefully.',
      options: [],
      acceptedAnswers: [
        { text: 'read', rationale: 'Sau before dùng thì Hiện tại đơn với chủ ngữ you: read.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q9',
      kind: 'transform',
      prompt: 'Nối hai câu sau dùng "when" (đặt mệnh đề when ở đầu câu): "I will arrive in Da Nang tomorrow. I will send you a postcard."',
      options: [],
      acceptedAnswers: [
        { text: 'When I arrive in Da Nang tomorrow, I will send you a postcard.', rationale: 'Bỏ will sau when và dùng thì hiện tại đơn arrive, thêm dấu phẩy giữa hai mệnh đề.' },
        { text: 'When I arrive in Da Nang, I will send you a postcard.', rationale: 'Biến thể lược bỏ tomorrow.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q10',
      kind: 'transform',
      prompt: 'Nối hai câu sau dùng "as soon as": "The teacher will enter the classroom. The students will stand up."',
      options: [],
      acceptedAnswers: [
        { text: 'The students will stand up as soon as the teacher enters the classroom.', rationale: 'Mệnh đề sau as soon as chuyển sang thì hiện tại đơn: the teacher enters.' },
        { text: 'As soon as the teacher enters the classroom, the students will stand up.', rationale: 'Biến thể đặt as soon as ở đầu câu kèm dấu phẩy.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I will tell him the news when he will call me tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'I will tell him the news when he calls me tonight.', rationale: 'Sau when không dùng will, đổi will call thành calls theo chủ ngữ he.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Before she will leave the house, she will lock all the doors."',
      options: [],
      acceptedAnswers: [
        { text: 'Before she leaves the house, she will lock all the doors.', rationale: 'Bỏ will sau Before và chia động từ ở hiện tại đơn ngôi thứ ba: leaves.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-future-time-clauses-12-r1',
      kind: 'choice',
      prompt: 'We will not leave the office until the manager _____ our report.',
      options: [
        { text: 'approves', rationale: 'Sau until dùng thì Hiện tại đơn, the manager đi với động từ thêm -s là approves.', correct: true },
        { text: 'will approve', rationale: 'Không dùng will trong mệnh đề thời gian sau until.', correct: false },
        { text: 'approved', rationale: 'Approved là dạng quá khứ, không phù hợp với ngữ cảnh tương lai.', correct: false },
      ],
      acceptedAnswers: [{ text: 'approves', rationale: 'Dùng approves sau until.' }]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-r2',
      kind: 'gap',
      prompt: 'After he _____ (graduate) from university next summer, he will look for a job.',
      options: [],
      acceptedAnswers: [
        { text: 'graduates', rationale: 'Sau After dùng thì Hiện tại đơn, chủ ngữ he đi với graduates.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-r3',
      kind: 'transform',
      prompt: 'Chuyển mệnh đề thời gian ra đầu câu: "I will make dinner after I finish this report."',
      options: [],
      acceptedAnswers: [
        { text: 'After I finish this report, I will make dinner.', rationale: 'Đưa After I finish this report lên đầu câu và thêm dấu phẩy ngăn cách.' }
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "As soon as we will receive your order, we will ship the goods."',
      options: [],
      acceptedAnswers: [
        { text: 'As soon as we receive your order, we will ship the goods.', rationale: 'Bỏ will sau As soon as, dùng động từ nguyên mẫu receive ở thì hiện tại đơn.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-future-time-clauses-12-o1',
      prompt: 'Viết 2 câu miêu tả kế hoạch của bạn sau khi bạn về nhà vào chiều hoặc tối nay (dùng "when" hoặc "as soon as").',
      modelAnswer: 'As soon as I arrive home this evening, I will take a warm shower. When I finish dinner, I will read a book for thirty minutes.',
      checks: [
        'Sử dụng đúng liên từ thời gian (as soon as, when).',
        'Mệnh đề sau liên từ dùng thì Hiện tại đơn (không có will).',
        'Mệnh đề chính dùng đúng thì tương lai đơn (will + V).'
      ]
    },
    {
      id: 'grammar-v2-a2-future-time-clauses-12-o2',
      prompt: 'Viết 1 câu khuyên hoặc dặn dò ai đó làm việc gì trước khi hoặc sau khi làm điều gì trong tương lai (dùng "before" hoặc "after").',
      modelAnswer: 'Remember to double-check your passport before you leave for the airport tomorrow.',
      checks: [
        'Sử dụng before hoặc after trong câu.',
        'Mệnh đề đi sau liên từ chia ở thì Hiện tại đơn.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-future-time-clauses',
      title: 'British Council LearnEnglish: Clauses of time in future',
      url: 'https://learnenglish.britishcouncil.org/grammar/intermediate-to-upper-intermediate/future-time-clauses',
      claims: ['In time clauses with when, as soon as, before, after, until referring to the future, we use present tenses rather than future forms.'],
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
