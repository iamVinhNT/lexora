/**
 * @file present-perfect-result.ts
 * @description Lesson: Present Perfect for present result and recent actions with just, already, yet (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-present-perfect-result-06',
  revisionId: 'grammar-v2-a2-present-perfect-result-06@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại hoàn thành: Kết quả ở hiện tại với Just, Already, Yet',
  objective: 'Diễn tả hành động vừa mới xảy ra hoặc hoàn tất trong quá khứ để lại kết quả hoặc tác động trực tiếp ở hiện tại, sử dụng các trạng từ just, already và yet.',
  prerequisiteIds: ['grammar-v2-a2-present-perfect-experience-05'],
  coverage: ['present-perfect-result', 'present-perfect', 'result-aspect', 'a2-grammar'],
  context: {
    english: 'Mai has just lost her house keys, so she cannot open the door. Her brother has already looked everywhere, but he hasn\'t found them yet.',
    vietnamese: 'Mai vừa mới làm mất chìa khóa nhà, nên cô ấy không thể mở cửa. Anh trai cô ấy đã tìm khắp nơi rồi, nhưng vẫn chưa tìm thấy chúng.',
  },
  guide: {
    pattern: 'S + have/has + just/already + V3/ed | S + have/has not + V3/ed + yet | Have/Has + S + V3/ed + yet?',
    whenToUse: [
      'Diễn tả hành động vừa mới diễn ra cách đây ít phút (dùng "just").',
      'Diễn tả hành động đã hoàn tất sớm hơn dự kiến hoặc trước thời điểm nói (dùng "already").',
      'Diễn tả hành động chưa hoàn thành tính đến thời điểm nói trong câu phủ định, hoặc hỏi xem việc đã xảy ra chưa trong câu nghi vấn (dùng "yet" ở cuối câu).',
      'Nhấn mạnh vào kết quả hoặc hậu quả hiện tại của hành động trong quá khứ.',
    ],
    signalWords: ['just', 'already', 'yet', 'recently', 'so far'],
    check: [
      '"Just" và "already" thường đứng giữa trợ động từ (have/has) và phân từ hai (V3/ed).',
      '"Yet" thường đứng ở cuối câu phủ định hoặc câu hỏi nghi vấn.',
      'Không dùng "yet" trong câu khẳng định thông thường.',
      'Hành động để lại kết quả hiện tại: nếu sự việc chỉ xảy ra trong quá khứ và không còn liên hệ tới hiện tại, dùng Quá khứ đơn.',
    ],
  },
  explanation: 'Một trong những cách dùng quan trọng nhất của thì Hiện tại hoàn thành là diễn tả hành động đã xảy ra trong quá khứ nhưng để lại kết quả hoặc ảnh hưởng rõ ràng ở hiện tại. Ba trạng từ chỉ thời gian rất phổ biến là: 1. "Just" (vừa mới): diễn tả sự việc xảy ra rất gần thời điểm nói (ví dụ: I have just eaten lunch - tôi vừa mới ăn trưa xong, hiện tại tôi còn no). 2. "Already" (đã... rồi): diễn tả việc hoàn thành sớm hơn mong đợi (ví dụ: I have already finished my project - tôi đã hoàn thành xong dự án rồi). 3. "Yet" (chưa): đứng cuối câu phủ định ("hasn\'t arrived yet" - vẫn chưa đến) hoặc câu hỏi ("Have you called him yet?" - bạn đã gọi cho anh ấy chưa?).',
  examples: [
    { english: 'I have just finished my homework, so I can go out now.', vietnamese: 'Tôi vừa làm xong bài tập về nhà, nên giờ tôi có thể đi chơi.' },
    { english: 'She has already bought the tickets for tonight\'s concert.', vietnamese: 'Cô ấy đã mua vé cho buổi hòa nhạc tối nay rồi.' },
    { english: 'We haven\'t received any email from the company yet.', vietnamese: 'Chúng tôi vẫn chưa nhận được bất kỳ email nào từ công ty cả.' },
    { english: 'Has your brother arrived at the airport yet?', vietnamese: 'Anh trai bạn đã đến sân bay chưa?' },
    { english: 'He has broken his leg, so he cannot play football today.', vietnamese: 'Cậu ấy bị gãy chân nên hôm nay không thể đá bóng được.' },
    { english: 'They have just painted the wall; please do not touch it.', vietnamese: 'Họ vừa mới sơn bức tường; xin đừng chạm vào nó.' },
  ],
  contrasts: [
    {
      form: 'already vs yet',
      whyFits: 'Dùng already trong câu khẳng định để nhấn mạnh việc đã xong sớm; dùng yet ở cuối câu phủ định hoặc câu nghi vấn để nói về việc chưa xong.',
      whyNot: 'Không dùng already thay thế cho yet ở cuối câu phủ định thông thường (tránh nói "I haven\'t eaten already").'
    },
    {
      form: 'Present Perfect with present result vs Past Simple with past state',
      whyFits: 'Dùng Present Perfect khi kết quả vẫn còn hiệu lực ở hiện tại (He has lost his key = bây giờ vẫn chưa có chìa khóa).',
      whyNot: 'Dùng Past Simple nếu hành động đã kết thúc và không còn ảnh hưởng tới hiện tại (He lost his key yesterday, but he found it this morning).'
    }
  ],
  commonMistakes: [
    'Đặt từ "yet" ở giữa câu khẳng định: nói "I have yet done it" thay vì "I have already done it".',
    'Dùng "just" với thì quá khứ đơn kèm mốc thời gian không phù hợp: nói "I have just seen him 2 hours ago" thay vì "I saw him 2 hours ago".',
    'Quên đổi động từ sang dạng phân từ hai V3/ed sau have/has: nói "He has just finish" thay vì "He has just finished".'
  ],
  summary: 'Hiện tại hoàn thành nhấn mạnh kết quả hiện tại: "just" (vừa mới), "already" (đã rồi, giữa câu khẳng định), "yet" (chưa, cuối câu phủ định và nghi vấn).',
  exercises: [
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q1',
      kind: 'choice',
      prompt: 'Be careful! The floor is wet because I have _____ washed it.',
      options: [
        { text: 'just', rationale: 'Just đứng giữa have và washed diễn tả hành động vừa mới xảy ra, sàn nhà hiện vẫn còn ướt.', correct: true },
        { text: 'yet', rationale: 'Yet đứng ở cuối câu phủ định hoặc nghi vấn, không đứng giữa have và washed trong câu khẳng định.', correct: false },
        { text: 'ever', rationale: 'Ever mang nghĩa "đã từng", không phù hợp diễn tả kết quả vừa xảy ra.', correct: false },
      ],
      acceptedAnswers: [{ text: 'just', rationale: 'Dùng just để chỉ hành động vừa mới diễn ra.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q2',
      kind: 'choice',
      prompt: 'Are you hungry? - No, thanks. I have _____ eaten a big sandwich.',
      options: [
        { text: 'already', rationale: 'Already diễn tả hành động ăn đã hoàn thành rồi, nên hiện tại không đói.', correct: true },
        { text: 'yet', rationale: 'Yet dùng trong câu phủ định hoặc câu hỏi, không dùng trong câu khẳng định này.', correct: false },
        { text: 'still', rationale: 'Still thường đứng trước trợ động từ hoặc động từ thường và mang nghĩa vẫn còn.', correct: false },
      ],
      acceptedAnswers: [{ text: 'already', rationale: 'Dùng already trong câu khẳng định.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q3',
      kind: 'choice',
      prompt: 'We cannot start the meeting because Mr. Brown hasn\'t arrived _____.',
      options: [
        { text: 'yet', rationale: 'Yet đứng ở cuối câu phủ định thể hiện hành động chưa hoàn thành tính đến hiện tại.', correct: true },
        { text: 'already', rationale: 'Already thường không đặt ở cuối câu phủ định thông thường.', correct: false },
        { text: 'just', rationale: 'Just mang nghĩa vừa mới và đứng giữa trợ động từ với động từ chính.', correct: false },
      ],
      acceptedAnswers: [{ text: 'yet', rationale: 'Dùng yet ở cuối câu phủ định.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q4',
      kind: 'choice',
      prompt: 'Look! David has _____ his glasses, so he cannot read the board.',
      options: [
        { text: 'broken', rationale: 'Sau has dùng phân từ hai (V3) broken để diễn tả hành động để lại kết quả hiện tại.', correct: true },
        { text: 'broke', rationale: 'Broke là dạng quá khứ đơn (V2), không dùng sau trợ động từ has.', correct: false },
        { text: 'break', rationale: 'Break là động từ nguyên mẫu, không phù hợp cấu trúc hoàn thành.', correct: false },
      ],
      acceptedAnswers: [{ text: 'broken', rationale: 'Dùng quá khứ phân từ broken sau has.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q5',
      kind: 'gap',
      prompt: 'She cannot find her phone because she has _____ (lose) it.',
      options: [],
      acceptedAnswers: [
        { text: 'lost', rationale: 'Phân từ hai của lose là lost, sau has diễn tả việc làm mất điện thoại để lại kết quả hiện tại.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q6',
      kind: 'gap',
      prompt: 'They have just _____ (arrive) at the hotel after a long flight.',
      options: [],
      acceptedAnswers: [
        { text: 'arrived', rationale: 'Sau have just dùng phân từ hai arrived (động từ có quy tắc thêm -d).' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q7',
      kind: 'gap',
      prompt: 'I _____ (not do) my English homework yet.',
      options: [],
      acceptedAnswers: [
        { text: "haven't done", rationale: 'Chủ ngữ I đi với haven\'t + V3 (done) cùng yet ở cuối câu.' },
        { text: 'have not done', rationale: 'Dạng đầy đủ của have not done.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q8',
      kind: 'gap',
      prompt: '_____ you _____ (send) the invitation email yet? (Điền trợ động từ và phân từ hai cách nhau một dấu cách)',
      options: [],
      acceptedAnswers: [
        { text: 'Have sent', rationale: 'Câu hỏi nghi vấn với you: Have you sent... yet?' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q9',
      kind: 'transform',
      prompt: 'Kết hợp hai câu sau dùng thì Hiện tại hoàn thành với "already": "He cleaned the room. Now the room is tidy."',
      options: [],
      acceptedAnswers: [
        { text: 'He has already cleaned the room.', rationale: 'Dùng has already cleaned the room để nhấn mạnh hành động đã hoàn tất để lại kết quả căn phòng ngăn nắp.' },
        { text: 'He has already cleaned his room.', rationale: 'Biến thể chấp nhận his room.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng thể phủ định với "yet": "She has replied to my message."',
      options: [],
      acceptedAnswers: [
        { text: 'She has not replied to my message yet.', rationale: 'Dạng phủ định thêm not sau has và đặt yet ở cuối câu.' },
        { text: "She hasn't replied to my message yet.", rationale: 'Dạng viết tắt chính xác: She hasn\'t replied to my message yet.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I haven\'t finished the test already."',
      options: [],
      acceptedAnswers: [
        { text: "I haven't finished the test yet.", rationale: 'Trong câu phủ định, thay already bằng yet ở cuối câu.' },
        { text: 'I have not finished the test yet.', rationale: 'Dạng đầy do thay already bằng yet.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Minh has just bought a new car yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'Minh bought a new car yesterday.', rationale: 'Có mốc thời gian xác định yesterday thì dùng thì Quá khứ đơn, bỏ has just.' },
        { text: 'Minh has just bought a new car.', rationale: 'Nếu giữ has just để nhấn mạnh vừa mới mua thì phải bỏ mốc yesterday.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-present-perfect-result-06-r1',
      kind: 'choice',
      prompt: 'Would you like some coffee? - No, thanks. I have _____ had a cup.',
      options: [
        { text: 'already', rationale: 'Already dùng trong câu khẳng định diễn đạt việc đã uống một tách cà phê rồi.', correct: true },
        { text: 'yet', rationale: 'Yet không dùng trong câu khẳng định với vị trí này.', correct: false },
        { text: 'ever', rationale: 'Ever chỉ kinh nghiệm "từng", không trả lời cho lời mời cà phê vừa rồi.', correct: false },
      ],
      acceptedAnswers: [{ text: 'already', rationale: 'Dùng already chỉ hành động đã làm rồi.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-r2',
      kind: 'gap',
      prompt: 'The train has _____ (leave) the station, so we must wait for the next one.',
      options: [],
      acceptedAnswers: [
        { text: 'left', rationale: 'Sau has dùng phân từ hai left (của leave) để chỉ kết quả tàu đã rời ga.' },
        { text: 'already left', rationale: 'Thêm trạng từ already left cũng thể hiện chính xác hành động tàu đã rời ga.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi với "yet": "You have booked the hotel room."',
      options: [],
      acceptedAnswers: [
        { text: 'Have you booked the hotel room yet?', rationale: 'Đảo Have lên đầu câu và thêm yet ở cuối câu hỏi.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "The bell rang, so the class has just begin."',
      options: [],
      acceptedAnswers: [
        { text: 'The bell rang, so the class has just begun.', rationale: 'Phân từ hai của begin là begun, không phải begin.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-present-perfect-result-06-o1',
      prompt: 'Viết 2 câu miêu tả một việc bạn vừa mới làm xong (dùng "just") và kết quả của việc đó ở hiện tại.',
      modelAnswer: 'I have just finished washing my car. It looks very clean and shiny now.',
      checks: [
        'Sử dụng đúng thì Hiện tại hoàn thành với trạng từ just (have/has + just + V3).',
        'Có câu hoặc vế câu nêu rõ kết quả hoặc trạng thái ở hiện tại.'
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-result-06-o2',
      prompt: 'Viết một mẩu đối thoại ngắn (2 câu) hỏi và trả lời về một kế hoạch xem đã hoàn thành chưa (dùng "yet" trong câu hỏi và "already" hoặc "not... yet" trong câu trả lời).',
      modelAnswer: 'Have you submitted your monthly report yet? - Yes, I have already sent it to the manager.',
      checks: [
        'Câu hỏi dùng đúng cấu trúc Have/Has + S + V3... yet?',
        'Câu trả lời dùng đúng already hoặc haven\'t/hasn\'t... yet.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-present-perfect-just-already-yet',
      title: 'British Council LearnEnglish: Just, already, yet',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/just-already-yet',
      claims: ['We use the present perfect with just, already and yet for actions related to the present.'],
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
