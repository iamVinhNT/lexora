/**
 * @file present-perfect-experience.ts
 * @description Lesson: Present Perfect for life experiences with ever and never (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-present-perfect-experience-05',
  revisionId: 'grammar-v2-a2-present-perfect-experience-05@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại hoàn thành: Trải nghiệm với Ever và Never',
  objective: 'Sử dụng thì Hiện tại hoàn thành (have/has + V3/ed) cùng với "ever" và "never" để hỏi và nói về các trải nghiệm cuộc sống tính đến thời điểm hiện tại.',
  prerequisiteIds: ['grammar-v2-a2-past-simple-vs-continuous-04'],
  coverage: ['present-perfect-experience', 'present-perfect', 'life-experiences', 'a2-grammar'],
  context: {
    english: 'Have you ever tried Japanese sushi? - No, I have never eaten it, but my sister has visited Tokyo twice.',
    vietnamese: 'Bạn đã từng thử món sushi Nhật Bản bao giờ chưa? - Chưa, tôi chưa từng ăn món đó, nhưng chị gái tôi đã tới Tokyo hai lần rồi.',
  },
  guide: {
    pattern: 'Have/Has + S + ever + V3/ed? | S + have/has never + V3/ed',
    whenToUse: [
      'Hỏi hoặc nói về các trải nghiệm cuộc sống từ trước tới nay mà không nêu mốc thời gian cụ thể.',
      'Dùng ever trong câu hỏi ("đã từng... chưa?") và never trong câu khẳng định mang nghĩa phủ định ("chưa bao giờ").',
    ],
    signalWords: ['ever', 'never', 'before', 'once', 'twice', 'three times'],
    check: [
      'Have đi với I/you/we/they; Has đi với he/she/it và danh từ số ít.',
      'Động từ chính ở dạng quá khứ phân từ (Past Participle - V3/ed).',
      'Ever và never đứng giữa trợ động từ have/has và V3.',
      'Phân biệt have been to (đã từng đến và đã về) và have gone to (đã đi và chưa về).',
    ],
  },
  explanation: 'Thì Hiện tại hoàn thành (Present Perfect) dùng để nói về những trải nghiệm trong đời tính đến thời điểm nói. Khi nói về trải nghiệm chung chung, ta không chỉ rõ thời gian cụ thể (như yesterday, in 2020). Công thức cơ bản: S + have/has + V3/ed. Từ "ever" (từng) thường xuất hiện trong câu nghi vấn: "Have you ever seen an elephant?". Từ "never" (chưa từng) dùng để diễn đạt nghĩa phủ định: "I have never seen an elephant" (lưu ý không dùng "haven\'t never"). Ngoài ra, cấu trúc "have been to" thể hiện trải nghiệm đã từng đến nơi nào đó và hiện đã quay trở về.',
  examples: [
    { english: 'Have you ever travelled to a foreign country?', vietnamese: 'Bạn đã từng du lịch đến nước ngoài bao giờ chưa?' },
    { english: 'I have never flown in an aeroplane.', vietnamese: 'Tôi chưa bao giờ đi máy bay.' },
    { english: 'She has met many famous people in her life.', vietnamese: 'Cô ấy đã gặp rất nhiều người nổi tiếng trong đời.' },
    { english: 'We have watched this documentary three times before.', vietnamese: 'Chúng tôi đã xem bộ phim tài liệu này ba lần trước đây rồi.' },
    { english: 'Has your brother ever eaten spicy noodles?', vietnamese: 'Anh trai bạn đã từng ăn mì cay bao giờ chưa?' },
    { english: 'They have been to Paris twice on vacation.', vietnamese: 'Họ đã từng đến Paris hai lần vào kỳ nghỉ.' },
  ],
  contrasts: [
    {
      form: 'have been to vs have gone to',
      whyFits: 'Dùng have been to khi nói về trải nghiệm đã đến nơi đó và hiện tại đã trở về nơi xuất phát.',
      whyNot: 'Dùng have gone to nghĩa là người đó đã đi đến nơi đó và hiện tại vẫn còn ở đó (chưa quay về).'
    },
    {
      form: 'Present Perfect with ever/never vs Past Simple with past time',
      whyFits: 'Dùng Present Perfect khi nhấn mạnh trải nghiệm mà không nêu mốc thời gian cụ thể.',
      whyNot: 'Dùng Past Simple khi một mốc quá khứ đã kết thúc (yesterday, last year, in 2019) chỉ thời điểm của hành động đó; phân biệt với khoảng thời gian chưa kết thúc và mốc ở một mệnh đề khác.',
    }
  ],
  commonMistakes: [
    'Dùng phủ định kép với never: nói "I haven\'t never been there" thay vì "I have never been there".',
    'Nhầm lẫn giữa been to và gone to khi kể về trải nghiệm du lịch cá nhân.',
    'Dùng hiện tại hoàn thành với mốc quá khứ đã kết thúc gắn trực tiếp với hành động: nói "I have visited him yesterday" thay vì "I visited him yesterday"; khoảng thời gian chưa kết thúc hoặc mệnh đề khác có thể dùng cách khác.',
  ],
  summary: 'Dùng Have/Has + ever + V3 để hỏi về trải nghiệm. Dùng have/has never + V3 để nói chưa từng làm gì. Không dùng mốc thời gian quá khứ xác định.',
  exercises: [
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q1',
      kind: 'choice',
      prompt: '_____ you ever visited the ancient town of Hoi An?',
      options: [
        { text: 'Have', rationale: 'Chủ ngữ you đi với trợ động từ Have trong câu hỏi trải nghiệm.', correct: true },
        { text: 'Has', rationale: 'Has chỉ dùng cho chủ ngữ ngôi thứ ba số ít.', correct: false },
        { text: 'Did', rationale: 'Did đi với động từ nguyên mẫu visit, ở đây là dạng phân từ visited.', correct: false },
      ],
      acceptedAnswers: [{ text: 'Have', rationale: 'Trợ động từ phù hợp với you là Have.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q2',
      kind: 'choice',
      prompt: 'My grandparents _____ travelled by plane; they prefer trains.',
      options: [
        { text: 'have never', rationale: 'My grandparents là số nhiều đi với have never + V3 để chỉ trải nghiệm chưa từng có.', correct: true },
        { text: 'has never', rationale: 'My grandparents là số nhiều, không dùng has.', correct: false },
        { text: 'haven\'t never', rationale: 'Không dùng phủ định kép trong tiếng Anh chuẩn.', correct: false },
      ],
      acceptedAnswers: [{ text: 'have never', rationale: 'Dùng have never cho chủ ngữ số nhiều.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q3',
      kind: 'choice',
      prompt: 'Mai is not at home right now. She _____ to the supermarket.',
      options: [
        { text: 'has gone', rationale: 'Mai hiện không ở nhà vì cô ấy đã đi siêu thị và chưa về (has gone to).', correct: true },
        { text: 'has been', rationale: 'Has been to có nghĩa là đã đi và đã trở về nhà.', correct: false },
        { text: 'went to', rationale: 'Không giải thích rõ trạng thái vắng mặt hiện tại bằng has gone.', correct: false },
      ],
      acceptedAnswers: [{ text: 'has gone', rationale: 'Dùng has gone to vì người nói chưa quay về.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q4',
      kind: 'choice',
      prompt: 'Has David _____ eaten durian fruit before?',
      options: [
        { text: 'ever', rationale: 'Ever đứng giữa chủ ngữ và động từ phân từ trong câu hỏi trải nghiệm.', correct: true },
        { text: 'never', rationale: 'Never dùng trong câu khẳng định mang nghĩa phủ định, không dùng trong câu hỏi thông thường.', correct: false },
        { text: 'already', rationale: 'Ever mang nghĩa "đã từng bao giờ chưa", phù hợp nhất với câu hỏi trải nghiệm.', correct: false },
      ],
      acceptedAnswers: [{ text: 'ever', rationale: 'Dùng ever trong câu hỏi trải nghiệm.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q5',
      kind: 'gap',
      prompt: 'I have _____ (see) that romantic film three times.',
      options: [],
      acceptedAnswers: [
        { text: 'seen', rationale: 'Quá khứ phân từ của động từ see là seen.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q6',
      kind: 'gap',
      prompt: 'She has never _____ (drive) a car in her life.',
      options: [],
      acceptedAnswers: [
        { text: 'driven', rationale: 'Quá khứ phân từ của động từ drive là driven.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q7',
      kind: 'gap',
      prompt: '_____ he ever _____ (win) a swimming competition? (Điền trợ động từ và V3)',
      options: [],
      acceptedAnswers: [
        { text: 'Has won', rationale: 'Chủ ngữ he đi với Has, phân từ của win là won.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q8',
      kind: 'gap',
      prompt: 'We have _____ (be) to Singapore twice for our summer holidays.',
      options: [],
      acceptedAnswers: [
        { text: 'been', rationale: 'Dùng been to để chỉ trải nghiệm đã từng đến một địa điểm.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu phủ định dùng "never": "He has ridden a horse before."',
      options: [],
      acceptedAnswers: [
        { text: 'He has never ridden a horse before.', rationale: 'Thêm never vào giữa has và phân từ ridden.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q10',
      kind: 'transform',
      prompt: 'Đặt câu hỏi trải nghiệm với "ever" cho câu sau: "You have tried scuba diving."',
      options: [],
      acceptedAnswers: [
        { text: 'Have you ever tried scuba diving?', rationale: 'Đảo Have lên đầu câu và thêm ever trước V3 tried.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I haven\'t never climbed a high mountain."',
      options: [],
      acceptedAnswers: [
        { text: 'I have never climbed a high mountain.', rationale: 'Bỏ n\'t vì never đã mang ý nghĩa phủ định.' },
        { text: "I haven't ever climbed a high mountain.", rationale: 'Dùng haven\'t ever cũng chính xác.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Has you ever ate Indian food?"',
      options: [],
      acceptedAnswers: [
        { text: 'Have you ever eaten Indian food?', rationale: 'Chủ ngữ you đi với Have, và phân từ của eat là eaten.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-r1',
      kind: 'choice',
      prompt: 'Peter is on holiday in Rome; he _____ there for two weeks.',
      options: [
        { text: 'has gone', rationale: 'Peter hiện đang đi nghỉ ở Rome (chưa về) nên dùng has gone.', correct: true },
        { text: 'has been', rationale: 'Has been hàm ý đã đi và đã trở về.', correct: false },
        { text: 'goes', rationale: 'Hiện tại đơn không thể hiện hành động đã bắt đầu đi tới đó.', correct: false }
      ],
      acceptedAnswers: [{ text: 'has gone', rationale: 'Dùng has gone vì Peter đang ở đó.' }]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-r2',
      kind: 'gap',
      prompt: 'My brother has never _____ (break) a bone in his body.',
      options: [],
      acceptedAnswers: [
        { text: 'broken', rationale: 'Quá khứ phân từ của break là broken.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "never": "This is the first time I have seen a tiger in real life."',
      options: [],
      acceptedAnswers: [
        { text: 'I have never seen a tiger in real life before.', rationale: 'Dùng have never seen before để diễn tả trải nghiệm lần đầu.' },
        { text: 'I have never seen a tiger in real life.', rationale: 'Bỏ before vẫn giữ trọn vẹn ý nghĩa.' }
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Did you ever been to Australia?"',
      options: [],
      acceptedAnswers: [
        { text: 'Have you ever been to Australia?', rationale: 'Hỏi về trải nghiệm với been to phải dùng trợ động từ Have.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-o1',
      prompt: 'Viết 1 câu hỏi trải nghiệm dùng "Have you ever...?" và 1 câu trả lời dùng "never" về một món ăn hoặc hoạt động thể thao.',
      modelAnswer: 'Have you ever tried skiing? - No, I have never tried skiing in my life.',
      checks: [
        'Câu hỏi dùng đúng Have you ever + V3/ed?',
        'Câu trả lời dùng đúng have/has never + V3/ed.'
      ]
    },
    {
      id: 'grammar-v2-a2-present-perfect-experience-05-o2',
      prompt: 'Viết 2 câu kể về 2 trải nghiệm đáng nhớ của bạn hoặc người thân mà không nêu thời gian cụ thể (sử dụng thì hiện tại hoàn thành).',
      modelAnswer: 'I have visited Ha Long Bay twice with my family. My best friend has met a famous singer in person.',
      checks: [
        'Dùng đúng thì Hiện tại hoàn thành (have/has + V3/ed).',
        'Không dùng từ chỉ thời gian quá khứ xác định.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-present-perfect-experience',
      title: 'British Council LearnEnglish: Present perfect – experiences',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-perfect-experiences',
      claims: ['We use the present perfect with ever and never to talk about experiences without giving a specific time.'],
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
