/**
 * @file since-and-for.ts
 * @description Lesson: Present Perfect with since and for (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-since-and-for-07',
  revisionId: 'grammar-v2-a2-since-and-for-07@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại hoàn thành: Since và For (Khoảng thời gian và Mốc thời gian)',
  objective: 'Phân biệt và sử dụng chính xác giới từ since (mốc thời gian bắt đầu) và for (khoảng thời gian kéo dài) trong thì Hiện tại hoàn thành.',
  prerequisiteIds: ['grammar-v2-a2-present-perfect-result-06'],
  coverage: ['since-and-for', 'present-perfect', 'duration-prepositions', 'a2-grammar'],
  context: {
    english: 'Minh has lived in Da Nang for five years. He has worked at this software company since 2021.',
    vietnamese: 'Minh đã sống ở Đà Nẵng được năm năm. Anh ấy đã làm việc tại công ty phần mềm này từ năm 2021.',
  },
  guide: {
    pattern: 'S + have/has + V3/ed + for + khoảng thời gian | S + have/has + V3/ed + since + mốc thời gian',
    whenToUse: [
      'Dùng "for" khi muốn nói về một khoảng thời gian kéo dài (thời lượng: for two weeks, for five months, for a long time).',
      'Dùng "since" khi muốn nói về một mốc thời gian bắt đầu sự việc trong quá khứ và kéo dài đến hiện tại (since 2015, since Monday, since 9 AM, since I left school).',
      'Dùng trong câu hỏi bắt đầu bằng "How long" để hỏi về khoảng thời gian của một hành động hay trạng thái kéo dài đến nay.',
    ],
    signalWords: ['since', 'for', 'how long', 'since yesterday', 'for three days', 'for a decade'],
    check: [
      'Sau "since" luôn là một thời điểm xác định (năm, ngày, tháng, giờ) hoặc một mệnh đề ở thì quá khứ đơn (since I was a kid).',
      'Sau "for" luôn là một khoảng thời gian gồm số lượng và đơn vị thời gian (hours, days, weeks, years) hoặc cụm từ như "a long time", "ages".',
      'Động từ trong mệnh đề chính chia ở thì Hiện tại hoàn thành (have/has + V3/ed).',
    ],
  },
  explanation: 'Khi diễn tả một hành động hoặc trạng thái bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại, ta dùng thì Hiện tại hoàn thành kết hợp với "for" hoặc "since". Điểm khác biệt mấu chốt nằm ở loại thông tin thời gian theo sau: 1. "For" đi với một khoảng thời gian (period of time) trả lời cho câu hỏi "bao lâu?" (ví dụ: for ten minutes, for three years, for many days). 2. "Since" đi với một mốc thời gian bắt đầu (point in time) trả lời cho câu hỏi "từ khi nào?" (ví dụ: since 2010, since last Christmas, since 7:00). Ngoài ra, sau "since" có thể là một mệnh đề chỉ sự kiện quá khứ: "since we graduated from university".',
  examples: [
    { english: 'I have known Lan for ten years.', vietnamese: 'Tôi đã quen biết Lan được mười năm rồi.' },
    { english: 'We have lived in this house since 2018.', vietnamese: 'Chúng tôi đã sống trong ngôi nhà này từ năm 2018.' },
    { english: 'He has worked as an engineer for a long time.', vietnamese: 'Anh ấy đã làm kỹ sư được một thời gian dài rồi.' },
    { english: 'She hasn\'t eaten anything since breakfast.', vietnamese: 'Cô ấy chưa ăn gì kể từ bữa sáng đến giờ.' },
    { english: 'How long have you studied English at this centre?', vietnamese: 'Bạn đã học tiếng Anh tại trung tâm này được bao lâu rồi?' },
    { english: 'They have been married since they finished college.', vietnamese: 'Họ đã kết hôn kể từ khi họ tốt nghiệp đại học.' },
  ],
  contrasts: [
    {
      form: 'for (period of time) vs since (point in time)',
      whyFits: 'Dùng for cho độ dài thời gian (for 6 months), dùng since cho mốc bắt đầu (since June).',
      whyNot: 'Không nói "since 6 months" hoặc "for June" vì vi phạm tính chất loại thời gian đi sau giới từ.'
    },
    {
      form: 'since + Past Simple clause vs for + duration',
      whyFits: 'Dùng since kèm một mệnh đề quá khứ để làm mốc thời điểm (since I was eight years old).',
      whyNot: 'Không dùng for trước một mệnh đề có chủ ngữ và động từ chỉ sự kiện quá khứ.'
    }
  ],
  commonMistakes: [
    'Dùng "since" với khoảng thời gian: nói "I have studied here since three years" thay vì "for three years".',
    'Dùng "for" với mốc thời gian: nói "She has lived here for 2015" thay vì "since 2015".',
    'Dùng thì Hiện tại đơn thay vì Hiện tại hoàn thành khi có since/for: nói "I live here for 5 years" thay vì "I have lived here for 5 years".'
  ],
  summary: '"For" + khoảng thời gian (for 3 days, for 5 years). "Since" + mốc thời gian (since 2020, since yesterday, since I was a child). Động từ chia ở Hiện tại hoàn thành.',
  exercises: [
    {
      id: 'grammar-v2-a2-since-and-for-07-q1',
      kind: 'choice',
      prompt: 'My parents have lived in this town _____ over twenty years.',
      options: [
        { text: 'for', rationale: 'Twenty years là một khoảng thời gian nên dùng giới từ for.', correct: true },
        { text: 'since', rationale: 'Since chỉ dùng trước mốc thời gian, không đi với khoảng thời gian twenty years.', correct: false },
        { text: 'during', rationale: 'During đi với danh từ chỉ dịp/giai đoạn (during the summer), không dùng trong cấu trúc đo thời lượng với thì hoàn thành.', correct: false },
      ],
      acceptedAnswers: [{ text: 'for', rationale: 'Dùng for trước khoảng thời gian over twenty years.' }]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q2',
      kind: 'choice',
      prompt: 'Nam has been absent from school _____ last Monday.',
      options: [
        { text: 'since', rationale: 'Last Monday là một mốc thời gian cụ thể trong quá khứ nên dùng since.', correct: true },
        { text: 'for', rationale: 'For đi với khoảng thời gian, không đi với mốc thứ Hai tuần trước.', correct: false },
        { text: 'from', rationale: 'Trong thì Hiện tại hoàn thành chỉ sự việc kéo dài đến nay, ta dùng since chứ không dùng from.', correct: false },
      ],
      acceptedAnswers: [{ text: 'since', rationale: 'Dùng since trước mốc thời gian last Monday.' }]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q3',
      kind: 'choice',
      prompt: 'How long _____ your best friend?',
      options: [
        { text: 'have you known', rationale: 'Cấu trúc câu hỏi thời lượng với How long dùng thì Hiện tại hoàn thành: have you known.', correct: true },
        { text: 'do you know', rationale: 'Hiện tại đơn không thể hiện được tính kéo dài từ quá khứ đến hiện tại với How long.', correct: false },
        { text: 'did you know', rationale: 'Quá khứ đơn hàm ý mối quan hệ quen biết đã chấm dứt hoàn toàn trong quá khứ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'have you known', rationale: 'Dùng have you known trong câu hỏi How long.' }]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q4',
      kind: 'choice',
      prompt: 'She hasn\'t spoken to him _____ they had an argument.',
      options: [
        { text: 'since', rationale: 'Since đi với mệnh đề thì quá khứ đơn "they had an argument" làm mốc thời điểm bắt đầu.', correct: true },
        { text: 'for', rationale: 'For không đi kèm một mệnh đề có chủ ngữ và động từ.', correct: false },
        { text: 'ago', rationale: 'Ago đứng sau một khoảng thời gian và dùng trong quá khứ đơn, không dùng làm liên từ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'since', rationale: 'Dùng since trước mệnh đề quá khứ đơn.' }]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q5',
      kind: 'gap',
      prompt: 'We have been friends _____ (for/since) primary school.',
      options: [],
      acceptedAnswers: [
        { text: 'since', rationale: 'Primary school là mốc thời gian (thời tiểu học), dùng giới từ since.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q6',
      kind: 'gap',
      prompt: 'He has worked in that hospital _____ (for/since) three months.',
      options: [],
      acceptedAnswers: [
        { text: 'for', rationale: 'Three months là một khoảng thời gian, dùng giới từ for.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q7',
      kind: 'gap',
      prompt: 'I _____ (not see) Huong since we graduated last summer.',
      options: [],
      acceptedAnswers: [
        { text: "haven't seen", rationale: 'Chủ ngữ I đi với haven\'t + V3 (seen).' },
        { text: 'have not seen', rationale: 'Dạng đầy đủ của have not seen.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q8',
      kind: 'gap',
      prompt: 'They _____ (live) in this apartment for six years.',
      options: [],
      acceptedAnswers: [
        { text: 'have lived', rationale: 'Chủ ngữ They đi với have lived để thể hiện sự việc sống ở đây kéo dài 6 năm.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "for": "He started learning guitar three years ago, and he still learns it."',
      options: [],
      acceptedAnswers: [
        { text: 'He has learned guitar for three years.', rationale: 'Dùng thì Hiện tại hoàn thành với for three years.' },
        { text: 'He has learnt guitar for three years.', rationale: 'Chấp nhận biến thể quá khứ phân từ learnt.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "since": "We moved here in 2019, and we still live here now."',
      options: [],
      acceptedAnswers: [
        { text: 'We have lived here since 2019.', rationale: 'Dùng thì Hiện tại hoàn thành have lived kèm since 2019.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I have known Peter since five years."',
      options: [],
      acceptedAnswers: [
        { text: 'I have known Peter for five years.', rationale: 'Five years là khoảng thời gian nên phải dùng giới từ for thay vì since.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "She lives in London for a long time."',
      options: [],
      acceptedAnswers: [
        { text: 'She has lived in London for a long time.', rationale: 'Hành động bắt đầu trong quá khứ kéo dài đến nay với for a long time phải dùng thì Hiện tại hoàn thành (has lived).' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-since-and-for-07-r1',
      kind: 'choice',
      prompt: 'Mr. An has taught math at our school _____ 2015.',
      options: [
        { text: 'since', rationale: '2015 là mốc năm xác định nên dùng giới từ since.', correct: true },
        { text: 'for', rationale: 'For dùng cho khoảng thời gian, không dùng cho mốc năm 2015.', correct: false },
        { text: 'in', rationale: 'Giới từ in dùng với quá khứ đơn (taught in 2015), không dùng với thì hiện tại hoàn thành mang nghĩa kéo dài tới nay.', correct: false },
      ],
      acceptedAnswers: [{ text: 'since', rationale: 'Dùng since trước mốc năm 2015.' }]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-r2',
      kind: 'gap',
      prompt: 'They have waited for the train _____ (for/since) two hours.',
      options: [],
      acceptedAnswers: [
        { text: 'for', rationale: 'Two hours là khoảng thời gian kéo dài, dùng for.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-r3',
      kind: 'transform',
      prompt: 'Đặt câu hỏi với "How long" cho câu: "She has worked at this hospital for seven years."',
      options: [],
      acceptedAnswers: [
        { text: 'How long has she worked at this hospital?', rationale: 'Đảo trợ động từ has lên trước chủ ngữ she và dùng How long.' }
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "My brother has had this laptop for last month."',
      options: [],
      acceptedAnswers: [
        { text: 'My brother has had this laptop since last month.', rationale: 'Last month là mốc thời gian nên phải dùng giới từ since thay vì for.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-since-and-for-07-o1',
      prompt: 'Viết 2 câu về bản thân bạn: 1 câu dùng "for" chỉ khoảng thời gian bạn làm/học điều gì đó, và 1 câu dùng "since" chỉ mốc thời gian bắt đầu một sở thích hay thói quen.',
      modelAnswer: 'I have studied English for three years. I have played badminton since 2022.',
      checks: [
        'Dùng đúng thì Hiện tại hoàn thành (have/has + V3) trong cả hai câu.',
        'Câu thứ nhất dùng đúng giới từ for + khoảng thời gian.',
        'Câu thứ hai dùng đúng giới từ since + mốc thời gian.'
      ]
    },
    {
      id: 'grammar-v2-a2-since-and-for-07-o2',
      prompt: 'Viết một câu hỏi bắt đầu bằng "How long have you...?" để hỏi một người bạn về một đồ vật hoặc nơi chốn của họ, và viết câu trả lời mẫu dùng "since" hoặc "for".',
      modelAnswer: 'How long have you had this motorbike? - I have had it for two years.',
      checks: [
        'Đặt câu hỏi đúng ngữ pháp với How long have you + V3...?',
        'Câu trả lời phối hợp thì hiện tại hoàn thành và giới từ for hoặc since chuẩn xác.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-for-and-since',
      title: 'British Council LearnEnglish: For and since',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/for-and-since',
      claims: ['We use for to talk about a period of time and since to talk about a point in past time.'],
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
