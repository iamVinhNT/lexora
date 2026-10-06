/**
 * @file past-continuous-interruption.ts
 * @description Lesson: Past Continuous for interrupted actions with when and while (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-past-continuous-interruption-02',
  revisionId: 'grammar-v2-a2-past-continuous-interruption-02@1.0.0',
  revision: '1.0.0',
  title: 'Quá khứ tiếp diễn: Hành động đang diễn ra bị xen vào (When/While)',
  objective: 'Diễn tả một hành động đang diễn ra trong quá khứ (Past Continuous) thì một hành động ngắn khác xen vào (Past Simple), sử dụng liên từ when và while.',
  prerequisiteIds: ['grammar-v2-a2-past-continuous-form-01'],
  coverage: ['past-continuous-interruption', 'past-tenses', 'subordination', 'a2-grammar'],
  context: {
    english: 'Yesterday evening, Mai was cooking dinner when the electricity went out suddenly.',
    vietnamese: 'Tối hôm qua, Mai đang nấu bữa tối thì đột nhiên bị mất điện.',
  },
  guide: {
    pattern: 'Past Continuous + when + Past Simple | While + Past Continuous, Past Simple',
    whenToUse: [
      'Diễn tả hành động kéo dài đang diễn ra trong quá khứ thì một hành động ngắn khác cắt ngang.',
      'Thường dùng when cho sự kiện xen vào ở quá khứ đơn và while cho hành động nền ở quá khứ tiếp diễn; bản thân hai liên từ không quyết định thì được dùng.',
    ],
    signalWords: ['when', 'while', 'suddenly', 'as'],
    check: [
      'Hành động dài/đang xảy ra: dùng Past Continuous (was/were + V-ing).',
      'Hành động ngắn/cắt ngang: dùng Past Simple (V2/ed).',
      'Nếu mệnh đề While hoặc When đứng đầu câu, cần có dấu phẩy ngăn cách hai mệnh đề.',
    ],
  },
  explanation: 'Khi kể lại một chuỗi sự việc trong quá khứ, ta dùng thì quá khứ tiếp diễn cho hành động nền đang diễn ra (hành động dài hơn). Nếu có một sự kiện bất ngờ hoặc hành động ngắn chen ngang, ta dùng thì quá khứ đơn. Hai mệnh đề được kết nối bằng "when" (khi/thì) hoặc "while" (trong khi). Công thức thông dụng: S + was/were + V-ing + WHEN + S + V-ed/V2 (ví dụ: I was walking home when it started to rain). Hoặc: WHILE + S + was/were + V-ing, S + V-ed/V2 (ví dụ: While I was walking home, it started to rain).',
  examples: [
    { english: 'I was taking a shower when the phone rang.', vietnamese: 'Tôi đang tắm thì điện thoại reo chuông.' },
    { english: 'While we were driving to the beach, our car got a flat tyre.', vietnamese: 'Trong khi chúng tôi đang lái xe ra bãi biển thì xe bị thủng lốp.' },
    { english: 'He hurt his knee while he was playing football.', vietnamese: 'Anh ấy bị đau đầu gối khi đang chơi bóng đá.' },
    { english: 'They were having breakfast when the postman arrived.', vietnamese: 'Họ đang ăn sáng thì người đưa thư đến.' },
    { english: 'While she was crossing the street, she dropped her purse.', vietnamese: 'Trong khi cô ấy đang băng qua đường thì cô ấy làm rơi ví.' },
    { english: 'What were you doing when you heard the strange noise?', vietnamese: 'Bạn đang làm gì khi bạn nghe thấy tiếng động lạ đó?' },
  ],
  contrasts: [
    {
      form: 'while + Past Continuous vs when + Past Simple',
      whyFits: 'Dùng while trước hành động kéo dài (while I was sleeping), dùng when trước hành động ngắn xen vào (when the alarm rang).',
      whyNot: 'While thường giới thiệu hành động nền trong ví dụ này, nhưng bản thân while không bắt buộc thì tiếp diễn; quá khứ đơn vẫn có thể đúng khi nhìn hành động như sự kiện trọn vẹn hoặc lặp lại.'
    },
    {
      form: 'Interrupted action vs Consecutive actions (hai hành động nối tiếp)',
      whyFits: 'Dùng Past Continuous + Past Simple khi hành động ngắn cắt ngang hành động dài đang diễn ra.',
      whyNot: 'Nếu hai hành động diễn ra nối tiếp nhau xong việc này rồi đến việc kia, cả hai đều dùng Past Simple (I arrived and opened the door).'
    }
  ],
  commonMistakes: [
    'Dùng thì quá khứ tiếp diễn cho cả hành động xen vào: viết "when the phone was ringing" thay vì "when the phone rang".',
    'Nhầm lẫn vị trí của when và while: đặt while trước hành động cắt ngang ngắn.',
    'Quên chia thì quá khứ cho động từ xen vào: dùng "when he comes" thay vì "when he came".'
  ],
  summary: 'Hành động dài đang diễn ra dùng Past Continuous (was/were + V-ing). Hành động ngắn cắt ngang dùng Past Simple (V-ed/V2). Liên từ thường dùng là when và while.',
  exercises: [
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q1',
      kind: 'choice',
      prompt: 'Lan was doing her homework when her friend _____ her.',
      options: [
        { text: 'called', rationale: 'Hành động gọi điện là hành động ngắn cắt ngang, dùng Past Simple (called).', correct: true },
        { text: 'was calling', rationale: 'Không dùng quá khứ tiếp diễn sau when cho hành động xen vào chớp nhoáng.', correct: false },
        { text: 'calls', rationale: 'Không dùng hiện tại đơn trong ngữ cảnh quá khứ.', correct: false },
      ],
      acceptedAnswers: [{ text: 'called', rationale: 'Hành động xen vào dùng quá khứ đơn called.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q2',
      kind: 'choice',
      prompt: '_____ we were waiting at the bus stop, it began to rain heavily.',
      options: [
        { text: 'While', rationale: 'While đứng trước mệnh đề hành động đang diễn ra (were waiting).', correct: true },
        { text: 'During', rationale: 'During đi với cụm danh từ, không đi với một mệnh đề có chủ ngữ và vị ngữ.', correct: false },
        { text: 'Because of', rationale: 'Because of chỉ nguyên nhân và đi với danh từ, không phù hợp nghĩa.', correct: false },
      ],
      acceptedAnswers: [{ text: 'While', rationale: 'Dùng While mở đầu mệnh đề tiếp diễn.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q3',
      kind: 'choice',
      prompt: 'Choose the past continuous form to emphasize the game was in progress when the teacher entered: "The teacher entered the classroom while the students _____ noisy games."',
      options: [
        { text: 'were playing', rationale: 'The students là số nhiều, hành động đang diễn ra dùng were playing sau while.', correct: true },
        { text: 'was playing', rationale: 'Was playing không phù hợp với chủ ngữ số nhiều the students.', correct: false },
        { text: 'played', rationale: 'Played can describe a completed event; the prompt asks for past continuous to emphasize that the game was in progress when the teacher entered.', correct: false },
      ],
      acceptedAnswers: [{ text: 'were playing', rationale: 'Dùng were playing sau while với chủ ngữ the students.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q4',
      kind: 'choice',
      prompt: 'Choose the past continuous form to show an action in progress: "He dropped his glass while he _____ the table."',
      options: [
        { text: 'was cleaning', rationale: 'Was cleaning is the past continuous form that shows the action was in progress when he dropped the glass.', correct: true },
        { text: 'were cleaning', rationale: 'Were cleaning does not agree with the singular subject he.', correct: false },
        { text: 'is cleaning', rationale: 'Is cleaning is present continuous, not past continuous.', correct: false },
      ],
      acceptedAnswers: [{ text: 'was cleaning', rationale: 'Use past continuous to show the action in progress.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q5',
      kind: 'gap',
      prompt: 'Use past continuous to show the walk was in progress when I saw my classmate: "I _____ (walk) in the park when I saw an old classmate."',
      options: [],
      acceptedAnswers: [
        { text: 'was walking', rationale: 'Hành động đang đi bộ là hành động nền kéo dài, dùng was walking.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q6',
      kind: 'gap',
      prompt: 'While Susan was baking a cake, the fire alarm _____ (go) off.',
      options: [],
      acceptedAnswers: [
        { text: 'went', rationale: 'Hành động chuông báo cháy reo là hành động ngắn chen vào, quá khứ của go là went.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q7',
      kind: 'gap',
      prompt: 'Use past continuous to show the movie was in progress when the lights went out: "They _____ (watch) a movie when the lights went out."',
      options: [],
      acceptedAnswers: [
        { text: 'were watching', rationale: 'Chủ ngữ They đi với were watching cho hành động đang diễn ra.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q8',
      kind: 'gap',
      prompt: 'What were you thinking about when the teacher _____ (ask) you the question?',
      options: [],
      acceptedAnswers: [
        { text: 'asked', rationale: 'Sau when là hành động ngắn xen vào, dùng dạng quá khứ asked.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q9',
      kind: 'transform',
      prompt: 'Kết hợp hai câu thành một câu có "when": "Nam was sleeping. His alarm clock rang."',
      options: [],
      acceptedAnswers: [
        { text: 'Nam was sleeping when his alarm clock rang.', rationale: 'Nối hai câu bằng when trước hành động cắt ngang rang.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q10',
      kind: 'transform',
      prompt: 'Kết hợp hai câu thành một câu bắt đầu bằng "While": "She was riding her bicycle. She fell off."',
      options: [],
      acceptedAnswers: [
        { text: 'While she was riding her bicycle, she fell off.', rationale: 'Đặt While đầu câu đi kèm hành động tiếp diễn, có dấu phẩy sau mệnh đề.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q11',
      kind: 'correction',
      prompt: 'Rewrite with past continuous for the ongoing action and past simple for the interruption: "I was listening to music when my brother was entering the room."',
      options: [],
      acceptedAnswers: [
        { text: 'I was listening to music when my brother entered the room.', rationale: 'Hành động bước vào phòng là hành động ngắn cắt ngang, phải dùng quá khứ đơn entered.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-q12',
      kind: 'correction',
      prompt: 'Rewrite with past continuous to show the ongoing action: "While we cooked dinner, someone knocked on the door."',
      options: [],
      acceptedAnswers: [
        { text: 'While we were cooking dinner, someone knocked on the door.', rationale: 'Sau While diễn tả hành động đang diễn ra dở dang phải dùng were cooking.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-r1',
      kind: 'choice',
      prompt: 'My brother burned his finger while he _____ an iron.',
      options: [
        { text: 'was using', rationale: 'Sau while dùng thì quá khứ tiếp diễn was using cho hành động đang sử dụng bàn là.', correct: true },
        { text: 'used', rationale: 'Used can describe the activity as a completed event; was using emphasizes that the action was in progress when the finger was burned.', correct: false },
        { text: 'is using', rationale: 'Burned ở thì quá khứ, không thể dùng is using.', correct: false }
      ],
      acceptedAnswers: [{ text: 'was using', rationale: 'Dùng was using sau while.' }]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-r2',
      kind: 'gap',
      prompt: 'She found an old photo while she _____ (clean) the attic.',
      options: [],
      acceptedAnswers: [
        { text: 'was cleaning', rationale: 'Hành động đang dọn gác mái là hành động nền, dùng was cleaning.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "when" thay vì "while": "While he was jogging in the park, he met his teacher."',
      options: [],
      acceptedAnswers: [
        { text: 'He was jogging in the park when he met his teacher.', rationale: 'Đặt when trước mệnh đề hành động cắt ngang he met his teacher.' }
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "When I was walk home from school, it started to snow."',
      options: [],
      acceptedAnswers: [
        { text: 'When I was walking home from school, it started to snow.', rationale: 'Sau was phải là V-ing (walking), không dùng dạng nguyên mẫu walk.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-o1',
      prompt: 'Viết một câu kể lại một tình huống bạn đang làm gì đó thì có một sự việc bất ngờ xảy ra (sử dụng past continuous + when + past simple).',
      modelAnswer: 'I was doing my homework in my bedroom when the power suddenly went out.',
      checks: [
        'Sử dụng đúng thì quá khứ tiếp diễn cho hành động đang diễn ra.',
        'Sử dụng đúng thì quá khứ đơn sau liên từ when cho hành động xen vào.'
      ]
    },
    {
      id: 'grammar-v2-a2-past-continuous-interruption-02-o2',
      prompt: 'Viết một câu bắt đầu bằng "While..." miêu tả một tai nạn nhỏ hoặc sự cố xảy ra khi bạn hoặc ai đó đang làm việc gì đó.',
      modelAnswer: 'While my sister was washing the dishes, she accidentally dropped a glass.',
      checks: [
        'Bắt đầu câu bằng While kết hợp với quá khứ tiếp diễn.',
        'Mệnh đề chính dùng quá khứ đơn và có dấu phẩy ngăn cách giữa hai mệnh đề.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-past-cont-interruption',
      title: 'British Council LearnEnglish: Past continuous and past simple',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/past-continuous-past-simple',
      claims: ['We use the past continuous for an action in progress when another shorter action interrupted it in the past simple.'],
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
