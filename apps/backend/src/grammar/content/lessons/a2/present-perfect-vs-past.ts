/**
 * @file present-perfect-vs-past.ts
 * @description Lesson: Contrast between Present Perfect and Past Simple (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-present-perfect-vs-past-08',
  revisionId: 'grammar-v2-a2-present-perfect-vs-past-08@1.0.0',
  revision: '1.0.0',
  title: 'Phân biệt Hiện tại hoàn thành và Quá khứ đơn (Present Perfect vs Past Simple)',
  objective: 'Phân biệt chính xác cách sử dụng thì Hiện tại hoàn thành (thời gian chưa xác định, liên hệ tới hiện tại) và Quá khứ đơn (thời gian xác định trong quá khứ, hành động đã kết thúc trọn vẹn).',
  prerequisiteIds: ['grammar-v2-a2-since-and-for-07'],
  coverage: ['present-perfect-vs-past', 'present-perfect', 'past-simple', 'aspect-contrast', 'a2-grammar'],
  context: {
    english: 'I have visited Da Lat twice, but I first went there in 2020. Last year, I stayed at a small homestay near the lake.',
    vietnamese: 'Tôi đã đến Đà Lạt hai lần, nhưng lần đầu tiên tôi đến đó là vào năm 2020. Năm ngoái, tôi đã ở một homestay nhỏ gần hồ.',
  },
  guide: {
    pattern: 'Present Perfect: S + have/has + V3/ed (unspecified / unfinished time) | Past Simple: S + V2/ed (finished past time)',
    whenToUse: [
      'Dùng Quá khứ đơn khi sự việc đã kết thúc và có mốc thời gian quá khứ xác định (yesterday, last month, in 2018, two days ago, when I was five).',
      'Dùng Hiện tại hoàn thành khi không đề cập mốc thời gian cụ thể mà chỉ tập trung vào trải nghiệm, số lần hoặc kết quả hiện tại.',
      'Dùng Hiện tại hoàn thành với khoảng thời gian chưa kết thúc (this morning khi vẫn là buổi sáng, this week, this year).',
      'Khi hỏi thời điểm một sự việc đã hoàn tất trong quá khứ, thường dùng "When..." hoặc "What time..." với Quá khứ đơn.',
    ],
    signalWords: [
      'Quá khứ đơn: yesterday, last night, in 2015, ago, when',
      'Hiện tại hoàn thành: ever, never, already, yet, so far, since, for',
    ],
    check: [
      'Nếu mốc quá khứ đã kết thúc chỉ thời điểm của hành động (yesterday, last week), thường dùng Quá khứ đơn.',
      'Hỏi thời điểm một sự việc đã xảy ra xong -> thường dùng When did you...?; câu hỏi when khác có thể dùng hiện tại hoàn thành trong ngữ cảnh trải nghiệm/thời gian chưa kết thúc.',
      'Trải nghiệm chung chung không kèm thời điểm -> dùng Have you ever...?',
    ],
  },
  explanation: 'Sự khác biệt cốt lõi giữa Past Simple và Present Perfect nằm ở thời điểm và mối liên hệ với hiện tại. Quá khứ đơn thường dùng cho sự việc đã hoàn tất trong một khoảng thời gian quá khứ đã khép lại (I saw him yesterday; We bought the car in 2022). Hiện tại hoàn thành dùng cho trải nghiệm tính đến nay, kết quả hiện tại hoặc khoảng thời gian chưa kết thúc. Khi hỏi thời điểm một sự việc đã hoàn tất, thường dùng quá khứ đơn (When did you arrive?); cách dùng phụ thuộc vào khoảng thời gian và nghĩa cụ thể, không chỉ vào một từ riêng lẻ.',
  examples: [
    { english: 'I have lost my key. (I still don\'t have it now.)', vietnamese: 'Tôi đã làm mất chìa khóa rồi. (Hiện tại tôi vẫn chưa có chìa khóa.)' },
    { english: 'I lost my key yesterday, but I found it this morning.', vietnamese: 'Hôm qua tôi làm mất chìa khóa, nhưng sáng nay tôi đã tìm thấy rồi.' },
    { english: 'She has lived in London for two years. (She still lives there.)', vietnamese: 'Cô ấy đã sống ở London được hai năm rồi. (Hiện nay cô ấy vẫn đang sống ở đó.)' },
    { english: 'She lived in London for two years. (She lives somewhere else now.)', vietnamese: 'Cô ấy đã từng sống ở London trong hai năm. (Hiện nay cô ấy sống ở nơi khác.)' },
    { english: 'Have you seen Minh today? - Yes, I saw him two hours ago.', vietnamese: 'Hôm nay bạn đã gặp Minh chưa? - Rồi, tôi đã gặp cậu ấy hai tiếng trước.' },
    { english: 'When did you buy this smartphone? - I bought it last week.', vietnamese: 'Bạn đã mua chiếc điện thoại thông minh này khi nào? - Tôi đã mua nó tuần trước.' },
  ],
  contrasts: [
    {
      form: 'Finished time word (Past Simple) vs Unfinished/unspecified time (Present Perfect)',
      whyFits: 'Dùng Past Simple với yesterday, last year, in 2020 vì khoảng thời gian đó đã hoàn toàn khép lại.',
      whyNot: 'Không dùng Present Perfect với mốc thời gian đã kết thúc nếu mốc đó chỉ thời điểm của hành động (I have bought this car yesterday).',
    },
    {
      form: 'When did you...? vs Have you ever...?',
      whyFits: 'Dùng When did you...? để hỏi thời điểm cụ thể trong quá khứ; dùng Have you ever...? để hỏi trải nghiệm không thời hạn.',
      whyNot: 'Khi hỏi thời điểm một sự việc đã hoàn tất, thường dùng past simple “When did you...?”; present perfect vẫn có thể xuất hiện với when trong những ngữ cảnh khác.',
    }
  ],
  commonMistakes: [
    'Dùng thì Hiện tại hoàn thành với trạng từ quá khứ xác định: viết "I have seen him yesterday" thay vì "I saw him yesterday".',
    'Dùng "When have you..." để hỏi thời điểm: nói "When have you bought that bag?" thay vì "When did you buy that bag?".',
    'Nhầm lẫn giữa "lived" và "has lived" khi nói về nơi ở hiện tại: dùng "I lived here for 5 years" khi vẫn đang ở đó.'
  ],
  summary: 'Past Simple: thời gian xác định đã khép lại (yesterday, in 2020). Present Perfect: trải nghiệm, kết quả hiện tại, thời gian chưa kết thúc hoặc chưa nêu mốc.',
  exercises: [
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q1',
      kind: 'choice',
      prompt: 'I _____ to Paris in 2019 with my family.',
      options: [
        { text: 'went', rationale: 'The completed visit is placed in the finished past time in 2019, so this event takes the past simple.', correct: true },
        { text: 'have gone', rationale: 'Không dùng thì Hiện tại hoàn thành với mốc thời gian xác định trong quá khứ.', correct: false },
        { text: 'have been', rationale: 'Have been to chỉ trải nghiệm không xác định thời gian, có in 2019 phải dùng went.', correct: false },
      ],
      acceptedAnswers: [{ text: 'went', rationale: 'Dùng went với mốc thời gian in 2019.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q2',
      kind: 'choice',
      prompt: '_____ you ever eaten Mexican food before?',
      options: [
        { text: 'Have', rationale: 'Cấu trúc hỏi trải nghiệm cuộc sống từ trước tới nay dùng Have you ever + V3?', correct: true },
        { text: 'Did', rationale: 'Did đi kèm động từ nguyên mẫu và dùng cho sự việc tại thời điểm quá khứ cụ thể.', correct: false },
        { text: 'Do', rationale: 'Do là trợ động từ hiện tại đơn, không đi với ever eaten.', correct: false },
      ],
      acceptedAnswers: [{ text: 'Have', rationale: 'Dùng Have trong câu hỏi trải nghiệm với ever.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q3',
      kind: 'choice',
      prompt: 'When _____ your new job at the bank?',
      options: [
        { text: 'did you start', rationale: 'This asks when the completed event of starting the job happened, so use the past simple in this context.', correct: true },
        { text: 'have you started', rationale: 'This question asks for the time of the completed starting event; the prompt targets past simple.', correct: false },
        { text: 'do you started', rationale: 'Trợ động từ do không kết hợp với động từ dạng quá khứ started.', correct: false },
      ],
      acceptedAnswers: [{ text: 'did you start', rationale: 'Dùng did you start với từ để hỏi When.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q4',
      kind: 'choice',
      prompt: 'Shakespeare _____ many famous plays and poems during his lifetime.',
      options: [
        { text: 'wrote', rationale: 'Shakespeare là nhân vật lịch sử đã qua đời, cuộc đời ông đã khép lại nên dùng Quá khứ đơn (wrote).', correct: true },
        { text: 'has written', rationale: 'Không dùng Hiện tại hoàn thành cho hành động của người đã mất vì không còn tiếp tục được nữa.', correct: false },
        { text: 'writes', rationale: 'Hiện tại đơn không dùng cho hành vi sáng tác lịch sử trong quá khứ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'wrote', rationale: 'Dùng wrote cho tác giả đã qua đời.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q5',
      kind: 'gap',
      prompt: 'My sister _____ (finish) university two years ago.',
      options: [],
      acceptedAnswers: [
        { text: 'finished', rationale: 'Có cụm từ "two years ago" chỉ thời gian quá khứ xác định, chia Quá khứ đơn finished.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q6',
      kind: 'gap',
      prompt: 'I cannot unlock the door because I _____ (lose) my key.',
      options: [],
      acceptedAnswers: [
        { text: 'have lost', rationale: 'Hành động mất chìa khóa để lại kết quả không mở được cửa ở hiện tại, dùng have lost.' },
        { text: "'ve lost", rationale: 'Dạng viết tắt chính xác của have lost.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q7',
      kind: 'gap',
      prompt: 'What time _____ you _____ (wake) up this morning? (Điền trợ động từ và động từ nguyên mẫu cách nhau một dấu cách)',
      options: [],
      acceptedAnswers: [
        { text: 'did wake', rationale: 'Câu hỏi thời điểm "What time" dùng trợ động từ did và nguyên mẫu wake.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q8',
      kind: 'gap',
      prompt: 'They _____ (not see) each other since last Christmas.',
      options: [],
      acceptedAnswers: [
        { text: "haven't seen", rationale: 'Có cụm "since last Christmas" nên dùng thì Hiện tại hoàn thành haven\'t seen.' },
        { text: 'have not seen', rationale: 'Dạng đầy đủ của have not seen.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng thì Quá khứ đơn kèm mốc thời gian: "This is my first time visiting London." (Bắt đầu bằng: I visited...)',
      options: [],
      acceptedAnswers: [
        { text: 'I visited London for the first time.', rationale: 'Dùng thì Quá khứ đơn visited để kể lại sự kiện lần đầu tiên đến London.' },
        { text: 'I visited London for the first time in my life.', rationale: 'Biến thể diễn đạt chi tiết.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q10',
      kind: 'transform',
      prompt: 'Đặt câu hỏi với "When" cho câu sau: "They arrived in Hanoi last night."',
      options: [],
      acceptedAnswers: [
        { text: 'When did they arrive in Hanoi?', rationale: 'Dùng When did they arrive in Hanoi? với thì Quá khứ đơn.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I have graduated from high school in 2021."',
      options: [],
      acceptedAnswers: [
        { text: 'I graduated from high school in 2021.', rationale: 'Có mốc năm in 2021 thì phải dùng Quá khứ đơn graduated, bỏ have.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "When have you bought this jacket?"',
      options: [],
      acceptedAnswers: [
        { text: 'When did you buy this jacket?', rationale: 'Hỏi với When về thời điểm mua phải dùng Quá khứ đơn: When did you buy...?' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-r1',
      kind: 'choice',
      prompt: 'Lan: "Have you ever tried scuba diving?" - Hoa: "Yes, I _____ it during my holiday last summer."',
      options: [
        { text: 'tried', rationale: 'Có mốc thời gian xác định "during my holiday last summer", câu trả lời chuyển sang Quá khứ đơn (tried).', correct: true },
        { text: 'have tried', rationale: 'Không dùng Hiện tại hoàn thành khi đã nêu rõ thời điểm last summer.', correct: false },
        { text: 'was trying', rationale: 'Không cần thì tiếp diễn vì đây là sự việc đã hoàn tất trong kỳ nghỉ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'tried', rationale: 'Dùng tried cho sự việc tại mốc last summer.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-r2',
      kind: 'gap',
      prompt: 'We _____ (already watch) that movie, but our cousins watched it yesterday.',
      options: [],
      acceptedAnswers: [
        { text: 'have already watched', rationale: 'Có already diễn tả kinh nghiệm/hoàn thành trước hiện tại, dùng have already watched.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thì Hiện tại hoàn thành để nhấn mạnh kinh nghiệm (bỏ mốc thời gian): "I went to Japan in 2018."',
      options: [],
      acceptedAnswers: [
        { text: 'I have been to Japan.', rationale: 'Dùng have been to Japan để diễn tả trải nghiệm đã từng đến Nhật Bản.' },
        { text: 'I have visited Japan.', rationale: 'Chấp nhận động từ have visited Japan.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Did you ever see a tiger in real life?"',
      options: [],
      acceptedAnswers: [
        { text: 'Have you ever seen a tiger in real life?', rationale: 'Hỏi về trải nghiệm cuộc đời tính đến nay dùng Have you ever seen...?' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-o1',
      prompt: 'Viết 2 câu về một chuyến đi của bạn: 1 câu dùng Hiện tại hoàn thành để nói về việc bạn đã từng đến đó bao nhiêu lần, và 1 câu dùng Quá khứ đơn để nói về thời điểm hoặc việc bạn đã làm khi ở đó.',
      modelAnswer: 'I have visited Da Nang three times in my life. Last summer, I went swimming at My Khe beach and enjoyed fresh seafood.',
      checks: [
        'Câu 1 dùng đúng thì Hiện tại hoàn thành nói về trải nghiệm/số lần.',
        'Câu 2 dùng đúng thì Quá khứ đơn kèm mốc thời gian quá khứ xác định (ví dụ: last summer).'
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-vs-past-08-o2',
      prompt: 'Viết một đoạn đối thoại ngắn (2 câu) giữa 2 người: người A hỏi người B xem đã từng xem một bộ phim nào đó chưa, người B trả lời có và nói rõ xem vào khi nào.',
      modelAnswer: 'Have you ever watched Titanic? - Yes, I watched it two years ago with my best friend.',
      checks: [
        'Người A hỏi bằng cấu trúc Have you ever + V3...?',
        'Người B trả lời bằng thì Quá khứ đơn có thời điểm quá khứ xác định (ví dụ: two years ago).'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-present-perfect-past-simple',
      title: 'British Council LearnEnglish: Present perfect and past simple',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-perfect-past-simple',
      claims: ['We use the past simple for past events with finished time, and the present perfect for past events connected to now.'],
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
