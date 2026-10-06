/**
 * @file past-simple-vs-continuous.ts
 * @description Lesson: Contrast between Past Simple and Past Continuous (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-past-simple-vs-continuous-04',
  revisionId: 'grammar-v2-a2-past-simple-vs-continuous-04@1.0.0',
  revision: '1.0.0',
  title: 'Phân biệt Quá khứ đơn và Quá khứ tiếp diễn',
  objective: 'Phân biệt chính xác cách dùng thì Quá khứ đơn (hành động đã hoàn tất, chuỗi hành động nối tiếp) và Quá khứ tiếp diễn (hành động đang diễn ra dở dang, bối cảnh nền).',
  prerequisiteIds: ['grammar-v2-a2-past-continuous-background-03'],
  coverage: ['past-simple-vs-continuous', 'past-tenses', 'aspect-contrast', 'a2-grammar'],
  context: {
    english: 'Yesterday afternoon, Minh woke up, washed his face, and walked to the library. At 3 PM, he was reading a novel when someone tapped his shoulder.',
    vietnamese: 'Chiều hôm qua, Minh thức dậy, rửa mặt và đi bộ đến thư viện. Lúc 3 giờ chiều, cậu ấy đang đọc một cuốn tiểu thuyết thì có ai đó vỗ vào vai cậu.',
  },
  guide: {
    pattern: 'Past Simple: S + V2/ed (completed) | Past Continuous: S + was/were + V-ing (in progress)',
    whenToUse: [
      'Dùng Quá khứ đơn cho các hành động đã hoàn thành trọn vẹn hoặc một chuỗi các hành động liên tiếp trong quá khứ.',
      'Dùng Quá khứ tiếp diễn cho hành động đang diễn ra tại một mốc thời gian cụ thể hoặc làm nền cho hành động khác.',
    ],
    signalWords: ['yesterday', 'last night', 'ago', 'at that time', 'at 8 PM yesterday'],
    check: [
      'Hành động hoàn tất, xảy ra nối tiếp nhau: chia Quá khứ đơn.',
      'Dùng quá khứ tiếp diễn khi muốn nhấn mạnh hành động đang diễn ra tại mốc quá khứ; quá khứ đơn vẫn có thể đúng nếu xem hành động như một sự kiện hoàn chỉnh.',
      'Động từ chỉ trạng thái thường không dùng dạng tiếp diễn khi giữ nghĩa trạng thái (know, want, believe); một số động từ có thể dùng tiếp diễn với nghĩa khác.',
    ],
  },
  explanation: 'Quá khứ đơn (Past Simple) và Quá khứ tiếp diễn (Past Continuous) thường kết hợp trong câu chuyện kể. Quá khứ đơn diễn tả sự kiện đã hoàn tất hoặc các sự kiện nối tiếp nhau: "He stood up, put on his coat, and left". Quá khứ tiếp diễn diễn tả hành động đang diễn ra tại một thời điểm hoặc làm phông nền: "It was raining outside". Động từ chỉ trạng thái như know, believe, understand thường không dùng ở dạng tiếp diễn khi giữ nghĩa trạng thái; một số động từ như think, feel, want có thể dùng tiếp diễn với nghĩa tạm thời, đang thay đổi hoặc nghĩa hành động.',
  examples: [
    { english: 'I finished my homework at 9 PM and then went to bed.', vietnamese: 'Tôi đã làm xong bài tập lúc 9 giờ tối và sau đó đi ngủ.' },
    { english: 'At 9 PM, I was doing my homework in my room.', vietnamese: 'Lúc 9 giờ tối, tôi đang làm bài tập trong phòng.' },
    { english: 'When she opened the door, a cold wind was blowing.', vietnamese: 'Khi cô ấy mở cửa, một cơn gió lạnh đang thổi vào.' },
    { english: 'He bought a new laptop yesterday because his old one broke.', vietnamese: 'Anh ấy đã mua một chiếc máy tính xách tay mới hôm qua vì máy cũ bị hỏng.' },
    { english: 'I didn\'t understand the lesson yesterday.', vietnamese: 'Tôi đã không hiểu bài học ngày hôm qua.' },
    { english: 'Were you watching television when I phoned you?', vietnamese: 'Bạn có đang xem tivi khi tôi gọi điện cho bạn không?' },
  ],
  contrasts: [
    {
      form: 'Completed action (Past Simple) vs In-progress action (Past Continuous)',
      whyFits: 'Past Simple dùng khi hành động đã kết thúc trọn vẹn; Past Continuous dùng khi hành động đang tiếp diễn dở dang.',
      whyNot: 'Không dùng Past Continuous để kể một chuỗi các hành động liên tiếp đã hoàn thành.'
    },
    {
      form: 'Dynamic verbs vs Stative verbs in past',
      whyFits: 'Các động từ chỉ trạng thái như know, want, understand thường dùng Past Simple khi giữ nghĩa trạng thái, kể cả tại một mốc xác định.',
      whyNot: 'Tránh "I was knowing the answer" khi know mang nghĩa biết; các động từ trạng thái khác có thể dùng tiếp diễn với nghĩa khác trong ngữ cảnh phù hợp.',
    }
  ],
  commonMistakes: [
    'Dùng thì tiếp diễn cho động từ chỉ trạng thái khi giữ nghĩa trạng thái: viết "I was knowing him" thay vì "I knew him"; một số động từ có thể dùng tiếp diễn nếu nghĩa thay đổi.',
    'Dùng thì tiếp diễn cho chuỗi hành động nối tiếp: viết "I was arriving home, was opening the door, and was cooking" thay vì dùng thì quá khứ đơn.',
    'Nhầm lẫn giữa kết quả hoàn tất và quá trình đang làm: "I was reading the book" (đang đọc, chưa chắc xong) vs "I read the book" (đã đọc xong).'
  ],
  summary: 'Quá khứ đơn: sự kiện đã hoàn tất hoặc chuỗi sự việc nối tiếp. Quá khứ tiếp diễn: hành động đang diễn ra tại một thời điểm. Động từ chỉ trạng thái thường không dùng tiếp diễn khi giữ nghĩa trạng thái.',
  exercises: [
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q1',
      kind: 'choice',
      prompt: 'Yesterday, Nam _____ his breakfast and then walked to school.',
      options: [
        { text: 'ate', rationale: 'Chuỗi hành động liên tiếp đã hoàn thành (ate and walked) dùng thì quá khứ đơn.', correct: true },
        { text: 'was eating', rationale: 'Không dùng quá khứ tiếp diễn cho chuỗi hành động liên tiếp hoàn tất.', correct: false },
        { text: 'is eating', rationale: 'Câu có dấu hiệu yesterday ở quá khứ, không dùng hiện tại.', correct: false },
      ],
      acceptedAnswers: [{ text: 'ate', rationale: 'Chuỗi hành động dùng quá khứ đơn ate.' }]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q2',
      kind: 'choice',
      prompt: 'Choose the past continuous to emphasize an activity in progress at that time: "At 10 AM last Sunday, we _____ in the garden."',
      options: [
        { text: 'were working', rationale: 'Hành động đang diễn ra tại một mốc thời gian cụ thể (10 AM last Sunday) dùng Past Continuous.', correct: true },
        { text: 'worked', rationale: 'Worked can report a completed past event; the prompt asks for past continuous to emphasize an activity in progress at 10 AM.', correct: false },
        { text: 'are working', rationale: 'Thời điểm ở quá khứ (last Sunday), không dùng are working.', correct: false },
      ],
      acceptedAnswers: [{ text: 'were working', rationale: 'Dùng were working cho mốc thời gian cụ thể trong quá khứ.' }]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q3',
      kind: 'choice',
      prompt: 'I _____ to buy that coat because it was too expensive.',
      options: [
        { text: 'didn\'t want', rationale: 'Want là động từ chỉ trạng thái (stative verb), không chia tiếp diễn.', correct: true },
        { text: 'was not wanting', rationale: 'Động từ want không chia ở thì tiếp diễn.', correct: false },
        { text: 'don\'t want', rationale: 'Ngữ cảnh ở quá khứ (was too expensive) nên dùng didn\'t want.', correct: false },
      ],
      acceptedAnswers: [{ text: "didn't want", rationale: 'Stative verb want dùng quá khứ đơn didn\'t want.' }]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q4',
      kind: 'choice',
      prompt: 'When we arrived at the party, everyone _____ and dancing.',
      options: [
        { text: 'was singing', rationale: 'Hành động đang diễn ra làm nền khi chúng tôi đến: everyone đi với was singing.', correct: true },
        { text: 'sang', rationale: 'Cần thì tiếp diễn để miêu tả không khí đang diễn ra song song với dancing.', correct: false },
        { text: 'were singing', rationale: 'Everyone theo ngữ pháp chuẩn đi với động từ số ít was.', correct: false },
      ],
      acceptedAnswers: [{ text: 'was singing', rationale: 'Dùng was singing miêu tả không khí nền đang diễn ra.' }]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q5',
      kind: 'gap',
      prompt: 'Last night, John _____ (lock) the front door, turned off the light, and went to bed.',
      options: [],
      acceptedAnswers: [
        { text: 'locked', rationale: 'Chuỗi hành động liên tiếp đã hoàn thành dùng quá khứ đơn locked.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q6',
      kind: 'gap',
      prompt: 'What _____ you _____ (do) at this exact time yesterday? (Điền trợ động từ và V-ing)',
      options: [],
      acceptedAnswers: [
        { text: 'were doing', rationale: 'Câu hỏi về hành động đang diễn ra tại mốc cụ thể: were you doing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q7',
      kind: 'gap',
      prompt: 'She _____ (know) the answer immediately when the teacher asked the question.',
      options: [],
      acceptedAnswers: [
        { text: 'knew', rationale: 'Know là stative verb, dùng quá khứ đơn knew.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q8',
      kind: 'gap',
      prompt: 'While we _____ (drive) along the coast, we saw a family of dolphins.',
      options: [],
      acceptedAnswers: [
        { text: 'were driving', rationale: 'Sau while diễn tả hành động đang lái xe dùng were driving.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thì Quá khứ tiếp diễn với mốc "at 8 PM yesterday": "I painted the fence."',
      options: [],
      acceptedAnswers: [
        { text: 'At 8 PM yesterday, I was painting the fence.', rationale: 'Đổi sang quá khứ tiếp diễn was painting đi với mốc thời gian cụ thể.' },
        { text: 'I was painting the fence at 8 PM yesterday.', rationale: 'Đặt mốc thời gian ở cuối câu hoàn toàn chính xác.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q10',
      kind: 'transform',
      prompt: 'She was finishing her homework when the bell rang, but she kept working until it was done. Rewrite the completed event in the past simple: "She was finishing her homework."',
      options: [],
      acceptedAnswers: [
        { text: 'She finished her homework.', rationale: 'The added context says she continued until the homework was complete, so finished reports the completed event.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "At that time, I was understanding what he meant."',
      options: [],
      acceptedAnswers: [
        { text: 'At that time, I understood what he meant.', rationale: 'Understand is stative here, meaning “comprehend”, so the simple form is used.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "He was standing up, was walking to the door, and left the room."',
      options: [],
      acceptedAnswers: [
        { text: 'He stood up, walked to the door, and left the room.', rationale: 'Chuỗi hành động liên tiếp đã hoàn thành phải dùng toàn bộ thì quá khứ đơn.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-r1',
      kind: 'choice',
      prompt: 'My mother _____ a delicious chocolate cake yesterday afternoon.',
      options: [
        { text: 'baked', rationale: 'Hành động nướng bánh đã hoàn thành xong ở quá khứ dùng quá khứ đơn baked.', correct: true },
        { text: 'was baked', rationale: 'Was baked là dạng bị động, không phù hợp nghĩa chủ động ở đây.', correct: false },
        { text: 'is baking', rationale: 'Yesterday afternoon ở quá khứ, không dùng is baking.', correct: false }
      ],
      acceptedAnswers: [{ text: 'baked', rationale: 'Dùng quá khứ đơn baked cho hành động đã hoàn thành.' }]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-r2',
      kind: 'gap',
      prompt: 'Suddenly, the lights _____ (go) out while everyone was talking.',
      options: [],
      acceptedAnswers: [
        { text: 'went', rationale: 'Sự việc đột ngột cắt ngang dùng quá khứ đơn went.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-r3',
      kind: 'transform',
      prompt: 'Kết hợp hai ý thành một câu phân biệt hành động nền và hành động xen vào: "Tom played football. It started raining."',
      options: [],
      acceptedAnswers: [
        { text: 'Tom was playing football when it started raining.', rationale: 'Dùng was playing cho hành động nền và started cho hành động cắt ngang.' },
        { text: 'While Tom was playing football, it started raining.', rationale: 'Dùng While kết hợp quá khứ tiếp diễn.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I was hearing a strange noise outside last night."',
      options: [],
      acceptedAnswers: [
        { text: 'I heard a strange noise outside last night.', rationale: 'Hear là động từ tri giác, không dùng dạng tiếp diễn trong ngữ cảnh này; dùng heard.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-o1',
      prompt: 'Viết 2 câu kể lại 3 việc bạn đã làm liên tiếp nhau vào sáng hôm qua (dùng thì quá khứ đơn).',
      modelAnswer: 'Yesterday morning, I woke up at six, cooked breakfast, and cycled to school with my friend.',
      checks: [
        'Sử dụng các động từ ở thì Quá khứ đơn (V2/ed).',
        'Kể lại chuỗi hành động theo thứ tự thời gian.'
      ]
    },
    {
      id: 'grammar-v2-a2-past-simple-vs-continuous-04-o2',
      prompt: 'Viết 1 câu kết hợp cả Quá khứ tiếp diễn và Quá khứ đơn để kể lại một sự việc bất ngờ xảy ra khi bạn đang làm việc gì đó.',
      modelAnswer: 'I was walking home from the supermarket when I met my primary school teacher.',
      checks: [
        'Dùng Quá khứ tiếp diễn cho hành động nền đang diễn ra.',
        'Dùng Quá khứ đơn cho hành động xen vào kết nối bằng when hoặc while.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-past-simple-vs-continuous',
      title: 'British Council LearnEnglish: Past continuous and past simple',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/past-continuous-past-simple',
      claims: ['Contrasting completed past actions with actions in progress, and note on verbs not usually used in continuous forms.'],
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
