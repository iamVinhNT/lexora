/**
 * @file past-continuous-background.ts
 * @description Lesson: Past Continuous for background description and parallel actions with while (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-past-continuous-background-03',
  revisionId: 'grammar-v2-a2-past-continuous-background-03@1.0.0',
  revision: '1.0.0',
  title: 'Quá khứ tiếp diễn: Miêu tả bối cảnh và hai hành động song song',
  objective: 'Sử dụng thì quá khứ tiếp diễn để miêu tả bối cảnh không gian trong một câu chuyện và diễn đạt hai hành động diễn ra song song cùng lúc trong quá khứ.',
  prerequisiteIds: ['grammar-v2-a2-past-continuous-interruption-02'],
  coverage: ['past-continuous-background', 'past-tenses', 'narrative-tenses', 'a2-grammar'],
  context: {
    english: 'The sun was shining and the birds were singing. In the garden, my father was reading while my mother was watering the plants.',
    vietnamese: 'Mặt trời đang chiếu sáng và chim chóc đang hót. Trong vườn, bố tôi đang đọc báo trong khi mẹ tôi đang tưới cây.',
  },
  guide: {
    pattern: 'S1 + was/were + V-ing while S2 + was/were + V-ing | While S1 + was/were + V-ing, S2 + was/were + V-ing',
    whenToUse: [
      'Miêu tả bối cảnh không gian, khung cảnh hoặc thời tiết mở đầu một câu chuyện trong quá khứ.',
      'Diễn tả hai hay nhiều hành động kéo dài diễn ra song song cùng một lúc trong quá khứ.',
    ],
    signalWords: ['while', 'at the same time', 'meanwhile', 'as'],
    check: [
      'Khi muốn nhấn mạnh hai hành động đang cùng diễn ra, dùng quá khứ tiếp diễn ở cả hai vế. While cũng có thể đi với quá khứ đơn nếu người nói xem hành động như sự kiện trọn vẹn hoặc lặp lại.',
      'Động từ miêu tả bối cảnh nền thường là thời tiết, âm thanh hoặc trạng thái xung quanh.',
    ],
  },
  explanation: 'Thì quá khứ tiếp diễn có hai ứng dụng kể chuyện quan trọng: 1. Tạo bối cảnh (Setting the scene): Để mở đầu một câu chuyện, người nói thường dùng quá khứ tiếp diễn nhằm vẽ nên một bức tranh sống động về những gì đang diễn ra xung quanh (ví dụ: The wind was blowing hard and snow was falling). Sau đó, các sự kiện chính sẽ dùng quá khứ đơn. 2. Hành động song song (Parallel actions): Khi hai người cùng làm hai việc khác nhau trong cùng một khoảng thời gian, cả hai mệnh đề đều dùng quá khứ tiếp diễn và nối với nhau bằng "while" (ví dụ: While John was preparing dinner, Mary was setting the table).',
  examples: [
    { english: 'The rain was falling heavily and people were hurrying home.', vietnamese: 'Mưa đang rơi nặng hạt và mọi người đang vội vã trở về nhà.' },
    { english: 'While Nam was washing dishes, his brother was sweeping the floor.', vietnamese: 'Trong khi Nam đang rửa bát thì anh trai cậu ấy đang quét nhà.' },
    { english: 'My father was watching news while my mother was cooking.', vietnamese: 'Bố tôi đang xem thời sự trong khi mẹ tôi đang nấu ăn.' },
    { english: 'The music was playing softly while the guests were chatting.', vietnamese: 'Tiếng nhạc đang du dương vang lên trong khi các vị khách đang trò chuyện.' },
    { english: 'We were studying in the library while other students were playing outside.', vietnamese: 'Chúng tôi đang học trong thư viện trong khi các học sinh khác đang chơi bên ngoài.' },
    { english: 'Were you taking notes while the lecturer was speaking?', vietnamese: 'Bạn có đang ghi chép trong khi giảng viên đang nói không?' },
  ],
  contrasts: [
    {
      form: 'Parallel actions (both Past Continuous) vs Interruption (Past Continuous + Past Simple)',
      whyFits: 'Dùng quá khứ tiếp diễn cho cả hai vế khi hai hành động diễn ra song song cùng lúc mà không làm gián đoạn nhau.',
      whyNot: 'Nếu một hành động đột ngột cắt ngang hành động kia, hành động xen vào phải chia ở thì quá khứ đơn.'
    },
    {
      form: 'Background scene (Past Continuous) vs Main story action (Past Simple)',
      whyFits: 'Dùng quá khứ tiếp diễn để miêu tả phông nền (bầu trời, thời tiết, hoạt động xung quanh).',
      whyNot: 'Các biến cố, quyết định hoặc hành động cốt lõi của nhân vật phải dùng thì quá khứ đơn.'
    }
  ],
  commonMistakes: [
    'Dùng thì quá khứ đơn cho một vế khi hai hành động thực sự diễn ra song song liên tục: viết "While I was studying, he slept" thay vì "he was sleeping".',
    'Nhầm lẫn giữa hành động song song và hành động nối tiếp theo thứ tự thời gian.',
    'Quên to be ở vế thứ hai: viết "While I was cooking, my sister washing dishes" (thiếu was).'
  ],
  summary: 'Dùng quá khứ tiếp diễn để dựng bối cảnh (mưa rơi, gió thổi, nhạc vang) và miêu tả hai hành động diễn ra song song (While S1 was doing..., S2 was doing...).',
  exercises: [
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q1',
      kind: 'choice',
      prompt: 'Choose the past continuous form to emphasize that both actions were in progress together: "While my sister was practicing the piano, I _____ my history essay."',
      options: [
        { text: 'was writing', rationale: 'Hai hành động diễn ra song song trong quá khứ nên cả hai đều dùng quá khứ tiếp diễn.', correct: true },
        { text: 'wrote', rationale: 'Wrote can describe the essay as a completed event; the prompt asks for past continuous to emphasize an action in progress.', correct: false },
        { text: 'am writing', rationale: 'Am writing là thì hiện tại, không hòa hợp với was practicing ở quá khứ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'was writing', rationale: 'Dùng was writing cho hành động song song.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q2',
      kind: 'choice',
      prompt: 'Choose the past continuous form to set the ongoing weather background: "It was a cold night. The wind _____ loudly and leaves were flying everywhere."',
      options: [
        { text: 'was blowing', rationale: 'Miêu tả bối cảnh thời tiết xung quanh dùng thì quá khứ tiếp diễn was blowing.', correct: true },
        { text: 'blew', rationale: 'Blew can describe the wind as a completed event; the prompt asks for past continuous to set the ongoing background.', correct: false },
        { text: 'were blowing', rationale: 'The wind là chủ ngữ số ít ở đây nên dùng was; danh từ wind cũng có thể đếm được ở nghĩa một cơn gió (a wind).', correct: false },
      ],
      acceptedAnswers: [{ text: 'was blowing', rationale: 'Miêu tả khung cảnh nền dùng was blowing.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q3',
      kind: 'choice',
      prompt: 'Choose the past continuous form to show the action in progress alongside Minh preparing the contracts: "In the office, Lan _____ phone calls while Minh was preparing the contracts."',
      options: [
        { text: 'was making', rationale: 'Chủ ngữ Lan số ít đi với was making trong cấu trúc hai hành động song song.', correct: true },
        { text: 'were making', rationale: 'Lan là chủ ngữ số ít, không dùng were.', correct: false },
        { text: 'made', rationale: 'Made có thể đúng nếu xem việc gọi điện như một sự kiện trọn vẹn; bài này yêu cầu nhấn mạnh hành động đang diễn ra song song với lúc Minh chuẩn bị hợp đồng.', correct: false },
      ],
      acceptedAnswers: [{ text: 'was making', rationale: 'Dùng was making cho ngôi thứ ba số ít.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q4',
      kind: 'choice',
      prompt: 'Choose the past continuous form to emphasize that both actions were in progress together: "What were the children doing while their parents _____ the meal?"',
      options: [
        { text: 'were preparing', rationale: 'Their parents là chủ ngữ số nhiều, hai hành động song song dùng were preparing.', correct: true },
        { text: 'was preparing', rationale: 'Their parents là số nhiều nên không dùng was.', correct: false },
        { text: 'prepared', rationale: 'Prepared có thể mô tả một sự kiện trọn vẹn; dùng were preparing khi muốn nhấn mạnh hai việc đang diễn ra đồng thời.', correct: false },
      ],
      acceptedAnswers: [{ text: 'were preparing', rationale: 'Chủ ngữ số nhiều dùng were preparing.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q5',
      kind: 'gap',
      prompt: 'Use the past continuous to show both activities were in progress at the same time: "While Tom was painting the fence, his friends _____ (wash) the car."',
      options: [],
      acceptedAnswers: [
        { text: 'were washing', rationale: 'Chủ ngữ his friends là số nhiều, hành động song song dùng were washing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q6',
      kind: 'gap',
      prompt: 'When we walked into the hall, soft music _____ (play) in the background.',
      options: [],
      acceptedAnswers: [
        { text: 'was playing', rationale: 'Bối cảnh âm thanh nền lúc bước vào dùng was playing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q7',
      kind: 'gap',
      prompt: 'She was listening to an audiobook while she _____ (iron) the clothes.',
      options: [],
      acceptedAnswers: [
        { text: 'was ironing', rationale: 'Hai việc làm đồng thời của cùng một người dùng was ironing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q8',
      kind: 'gap',
      prompt: 'Outside the house, the snow _____ (fall) quietly and the temperature was dropping.',
      options: [],
      acceptedAnswers: [
        { text: 'was falling', rationale: 'Miêu tả bối cảnh tuyết đang rơi dùng was falling.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q9',
      kind: 'transform',
      prompt: 'Nối hai câu sau thành một câu diễn tả hai hành động song song với "while": "Lan was reading. Her brother was drawing."',
      options: [],
      acceptedAnswers: [
        { text: 'Lan was reading while her brother was drawing.', rationale: 'Dùng while nối hai mệnh đề quá khứ tiếp diễn song song.' },
        { text: 'While Lan was reading, her brother was drawing.', rationale: 'Đặt While đầu câu có dấu phẩy ngăn cách.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau bắt đầu bằng "While we were having lunch...": "We were having lunch and the radio was playing in the background."',
      options: [],
      acceptedAnswers: [
        { text: 'While we were having lunch, the radio was playing in the background.', rationale: 'Sử dụng liên từ While đứng đầu câu.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "While I was studying for the test, my roommate was play guitar."',
      options: [],
      acceptedAnswers: [
        { text: 'While I was studying for the test, my roommate was playing guitar.', rationale: 'Động từ sau was phải ở dạng V-ing (playing).' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "The sun were shining brightly when we stepped outside."',
      options: [],
      acceptedAnswers: [
        { text: 'The sun was shining brightly when we stepped outside.', rationale: 'The sun là danh từ số ít, phải dùng was shining.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-past-continuous-background-03-r1',
      kind: 'choice',
      prompt: 'Choose the past continuous form to emphasize that note-taking was in progress during the explanation: "While the teacher was explaining the problem, some students _____ notes carefully."',
      options: [
        { text: 'were taking', rationale: 'Hành động song song của some students (số nhiều) dùng were taking.', correct: true },
        { text: 'was taking', rationale: 'Some students là số nhiều, không dùng was.', correct: false },
        { text: 'took', rationale: 'Took notes cũng có thể đúng nếu kể một hành động trọn vẹn; were taking nhấn mạnh việc ghi chép đang tiếp diễn cùng lúc với lời giải thích.', correct: false }
      ],
      acceptedAnswers: [{ text: 'were taking', rationale: 'Dùng were taking cho chủ ngữ số nhiều.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-r2',
      kind: 'gap',
      prompt: 'The birds _____ (sing) sweetly in the garden while we were drinking tea.',
      options: [],
      acceptedAnswers: [
        { text: 'were singing', rationale: 'The birds là số nhiều, bối cảnh nền dùng were singing.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-r3',
      kind: 'transform',
      prompt: 'Nối hai câu sau bằng "while" để diễn tả hai hành động song song: "David was driving. Sarah was checking the map."',
      options: [],
      acceptedAnswers: [
        { text: 'David was driving while Sarah was checking the map.', rationale: 'Dùng while nối hai hành động song song.' },
        { text: 'While David was driving, Sarah was checking the map.', rationale: 'Đặt While ở đầu câu.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "While John was washing the car, Mary cleaning the windows."',
      options: [],
      acceptedAnswers: [
        { text: 'While John was washing the car, Mary was cleaning the windows.', rationale: 'Thiếu trợ động từ was trước cleaning.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-past-continuous-background-03-o1',
      prompt: 'Viết 2 câu miêu tả khung cảnh một buổi sáng hoặc buổi chiều trong quá khứ (thời tiết, hoạt động của mọi người xung quanh) sử dụng thì quá khứ tiếp diễn.',
      modelAnswer: 'The birds were singing merrily in the tall trees. People were jogging along the peaceful river bank.',
      checks: [
        'Sử dụng thì quá khứ tiếp diễn để miêu tả bối cảnh nền.',
        'Động từ to be was/were chia chính xác theo chủ ngữ.'
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-background-03-o2',
      prompt: 'Viết 1 câu miêu tả hai người trong gia đình hoặc bạn bè bạn đang làm hai việc khác nhau cùng một lúc tối hôm qua (dùng liên từ while).',
      modelAnswer: 'While my mother was preparing dinner in the kitchen, my father was helping my little sister with her homework.',
      checks: [
        'Cả hai mệnh đề đều dùng thì quá khứ tiếp diễn.',
        'Sử dụng đúng liên từ while để nối hai hành động song song.'
      ]
    }
  ],
  sources: [
    {
      id: 'cambridge-past-continuous-narrative',
      title: 'Cambridge English Grammar: Past continuous for background and parallel actions',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/past-continuous',
      claims: ['Past continuous is used to describe the background situation in a story and two actions in progress at the same time.'],
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
