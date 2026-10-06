/**
 * @file this-that-these-those.ts
 * @description Đại từ và từ chỉ định this, that, these, those theo khoảng cách và số lượng.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-this-that-these-those-13',
  revisionId: 'grammar-v2-a1-this-that-these-those-13@1.0.0',
  revision: '1.0.0',
  title: 'Đại từ chỉ định: this, that, these, those',
  objective: 'Nhận biết và sử dụng chính xác this, that, these, those theo số lượng (số ít / số nhiều) và khoảng cách vị trí/thời gian (gần / xa).',
  prerequisiteIds: ['grammar-v2-a1-the-in-context-12'],
  coverage: ['this-that-these-those', 'demonstratives', 'determiners', 'pronouns'],
  context: {
    english: 'Tom and Sarah are browsing a craft market. Tom points to souvenirs right on their table and pottery displayed across the pathway.',
    vietnamese: 'Tom và Sarah đang dạo chợ thủ công. Tom chỉ vào những món lưu niệm ngay trên bàn trước mặt và đồ gốm trưng bày bên kia lối đi.',
  },
  guide: {
    pattern: 'this / that + danh từ số ít (hoặc đại từ độc lập); these / those + danh từ số nhiều (hoặc đại từ độc lập)',
    whenToUse: [
      'Dùng this (số ít) và these (số nhiều) cho người hoặc vật ở gần người nói về khoảng cách không gian hoặc thời gian hiện tại.',
      'Dùng that (số ít) và those (số nhiều) cho người hoặc vật ở xa người nói về khoảng cách không gian hoặc thời điểm khác.',
    ],
    signalWords: ['here', 'there', 'over there', 'near', 'far', 'look at', 'right now'],
    check: [
      'Danh từ được nhắc đến là số ít hay số nhiều?',
      'Vật thể hoặc người ở khoảng cách gần (here/close) hay xa (there/far away)?',
    ],
  },
  explanation: 'This, that, these, those được gọi là từ chỉ định (demonstratives). Chúng có thể đóng vai trò từ hạn định đứng trước danh từ (this cup) hoặc làm đại từ đứng độc lập (This is my cup). Quy tắc phân biệt gồm hai trục: số lượng (số ít: this/that; số nhiều: these/those) và khoảng cách (gần: this/these; xa: that/those). Khi giới thiệu người bên cạnh, người ta thường dùng: This is + tên người. Khi trả lời điện thoại, dùng: This is + tên người.',
  examples: [
    { english: 'This book on my desk is very interesting.', vietnamese: 'Quyển sách này trên bàn tôi rất thú vị. (Một quyển sách, ở ngay gần người nói).' },
    { english: 'That red car over there belongs to my uncle.', vietnamese: 'Chiếc xe màu đỏ đằng kia là của chú tôi. (Một chiếc xe, ở vị trí xa).' },
    { english: 'These fresh apples in my basket smell great.', vietnamese: 'Những quả táo tươi này trong giỏ của tôi thơm quá. (Nhiều quả táo, ở gần người nói).' },
    { english: 'Look at those birds flying in the sky.', vietnamese: 'Nhìn những con chim kia đang bay trên trời kìa. (Nhiều con chim, ở khoảng cách xa).' },
    { english: 'This is my classmate, Linh.', vietnamese: 'Đây là bạn cùng lớp của tôi, Linh. (Giới thiệu người ở gần).' },
    { english: 'Do you remember that funny movie we saw last week?', vietnamese: 'Bạn có nhớ bộ phim hài hước đó mà chúng ta xem tuần trước không? (Chỉ sự việc trong quá khứ xa hơn).' },
  ],
  contrasts: [
    {
      form: 'this pen vs that pen',
      whyFits: 'This pen dùng khi cây bút nằm ngay trên tay hoặc trước mặt người nói.',
      whyNot: 'That pen dùng khi cây bút nằm ở phía bàn bên kia hoặc cách xa tầm với.',
    },
    {
      form: 'this apple vs these apples',
      whyFits: 'This kết hợp với danh từ số ít (apple).',
      whyNot: 'These bắt buộc kết hợp với danh từ số nhiều (apples). Dùng "this apples" là sai hòa hợp số lượng.',
    },
  ],
  commonMistakes: [
    'Dùng this với danh từ số nhiều: “This shoes are comfortable” → Cần dùng “These shoes are comfortable”.',
    'Dùng those với danh từ số ít: “Look at those bird” → Cần dùng “Look at that bird” hoặc “those birds”.',
    'Dùng this với động từ số nhiều: “This are my friend Nam” → “This is my friend Nam”. “He is my friend Nam” vẫn đúng khi người nghe đã biết bạn đang nhắc đến ai.',
  ],
  summary: 'Gần dùng this (ít) / these (nhiều); Xa dùng that (ít) / those (nhiều). Chú ý sự hòa hợp giữa từ chỉ định và danh từ đi kèm.',
  exercises: [
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q1',
      kind: 'choice',
      prompt: 'Look at ___ tall tree over there across the river.',
      options: [
        { text: 'that', correct: true, rationale: 'Cây ở xa (over there) và là số ít (tall tree), nên dùng that.' },
        { text: 'this', correct: false, rationale: 'This dùng cho danh từ số ít ở khoảng cách gần.' },
        { text: 'those', correct: false, rationale: 'Those dùng cho danh từ số nhiều ở khoảng cách xa.' },
      ],
      acceptedAnswers: [{ text: 'that', rationale: 'That chỉ một đối tượng số ít ở vị trí xa.' }],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q2',
      kind: 'choice',
      prompt: '___ flowers in my hands smell sweet.',
      options: [
        { text: 'These', correct: true, rationale: 'Hoa đang cầm trong tay (in my hands, ở gần) và là số nhiều (flowers), nên dùng These.' },
        { text: 'This', correct: false, rationale: 'This chỉ đi với danh từ số ít.' },
        { text: 'Those', correct: false, rationale: 'Those chỉ danh từ số nhiều ở xa.' },
      ],
      acceptedAnswers: [{ text: 'These', rationale: 'These đi với danh từ số nhiều ở cự ly gần.' }],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q3',
      kind: 'choice',
      prompt: 'Hello, ___ is David speaking from the office.',
      options: [
        { text: 'this', correct: true, rationale: 'Trong đàm thoại điện thoại, người nói tự giới thiệu bản thân bằng cụm "This is...".' },
        { text: 'that', correct: false, rationale: 'That is dùng để hỏi hoặc xác nhận người ở đầu dây bên kia (Is that David?).' },
        { text: 'these', correct: false, rationale: 'These là từ chỉ định số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'this', rationale: 'This is dùng khi tự giới thiệu qua điện thoại.' }],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q4',
      kind: 'choice',
      prompt: 'Who owns ___ old bicycles parked on the opposite side of the road?',
      options: [
        { text: 'those', correct: true, rationale: 'Xe đạp là số nhiều (bicycles) và ở phía bên kia đường (xa), nên dùng those.' },
        { text: 'these', correct: false, rationale: 'These dùng cho danh từ số nhiều ở vị trí gần.' },
        { text: 'that', correct: false, rationale: 'That dùng cho danh từ số ít.' },
      ],
      acceptedAnswers: [{ text: 'those', rationale: 'Those đi kèm danh từ số nhiều ở khoảng cách xa.' }],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q5',
      kind: 'gap',
      prompt: 'Can you sign ___ document right here on my desk? (this / that)',
      options: [],
      acceptedAnswers: [
        { text: 'this', rationale: 'Tài liệu nằm ngay trên bàn trước mặt (right here) và là số ít, nên dùng this.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q6',
      kind: 'gap',
      prompt: 'Look at ___ stars shining brightly in the night sky! (these / those)',
      options: [],
      acceptedAnswers: [
        { text: 'those', rationale: 'Các ngôi sao trên bầu trời ở rất xa và là số nhiều, nên dùng those.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q7',
      kind: 'gap',
      prompt: '___ soup I am eating right now is delicious. (This / That)',
      options: [],
      acceptedAnswers: [
        { text: 'This', rationale: 'Món súp đang ăn ngay lúc này ở cự ly gần nhất với người nói, nên dùng This.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q8',
      kind: 'gap',
      prompt: 'Do you know ___ people standing near the entrance gate over there? (these / those)',
      options: [],
      acceptedAnswers: [
        { text: 'those', rationale: 'People là danh từ số nhiều và ở cổng đằng xa (over there), nên dùng those.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang số nhiều: "This watch is expensive."',
      options: [],
      acceptedAnswers: [
        { text: 'These watches are expensive.', rationale: 'This đổi thành These, watch thành watches, is thành are.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang số ít: "Those buildings are very tall."',
      options: [],
      acceptedAnswers: [
        { text: 'That building is very tall.', rationale: 'Those đổi thành That, buildings thành building, are thành is.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "Look at that dogs playing in the park across the street."',
      options: [],
      acceptedAnswers: [
        { text: 'Look at those dogs playing in the park across the street.', rationale: 'Dogs là danh từ số nhiều ở xa nên phải dùng those thay vì that.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "These book on my table belongs to the teacher."',
      options: [],
      acceptedAnswers: [
        { text: 'This book on my table belongs to the teacher.', rationale: 'Book là danh từ số ít ở gần (on my table), động từ belongs số ít, nên phải dùng This thay vì These.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-this-that-these-those-13-r1',
      kind: 'choice',
      prompt: 'Do you prefer this blue shirt here or ___ white one over on the top shelf?',
      options: [
        { text: 'that', correct: true, rationale: 'Chiếc áo ở trên kệ cao (xa) và là số ít (white one), nên dùng that để đối chiếu với this blue shirt here.' },
        { text: 'these', correct: false, rationale: 'These dùng cho số nhiều ở gần.' },
        { text: 'those', correct: false, rationale: 'Those dùng cho danh từ số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'that', rationale: 'That đối lập với this để chỉ vật số ít ở xa.' }],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-r2',
      kind: 'gap',
      prompt: '___ keys in my pocket belong to the front door. (These / Those)',
      options: [],
      acceptedAnswers: [
        { text: 'These', rationale: 'Chùm chìa khóa trong túi người nói (in my pocket) ở khoảng cách gần nhất và là số nhiều, dùng These.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang dạng số nhiều: "That student comes from Da Nang."',
      options: [],
      acceptedAnswers: [
        { text: 'Those students come from Da Nang.', rationale: 'That đổi thành Those, student thành students, động từ comes thành come.' },
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "This shoes under my chair are very dirty."',
      options: [],
      acceptedAnswers: [
        { text: 'These shoes under my chair are very dirty.', rationale: 'Shoes và are là số nhiều ở khoảng cách gần nên phải dùng These thay vì This.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-this-that-these-those-13-o1',
      prompt: 'Quan sát xung quanh nơi bạn đang ngồi. Viết 2 câu mô tả đồ vật ở gần bạn (dùng this/these) và 2 câu mô tả đồ vật ở khoảng cách xa hơn (dùng that/those).',
      modelAnswer: 'This laptop in front of me is new. These notebooks on my desk are very tidy. That painting on the far wall is colorful. Those trees outside the window are tall.',
      checks: [
        'Sử dụng đúng this cho một vật ở gần và these cho nhiều vật ở gần.',
        'Sử dụng đúng that cho một vật ở xa và those cho nhiều vật ở xa.',
        'Động từ to be (is/are) và danh từ đi kèm hòa hợp chính xác về số lượng.',
      ],
    },
    {
      id: 'grammar-v2-a1-this-that-these-those-13-o2',
      prompt: 'Viết một đoạn hội thoại ngắn 3-4 câu khi bạn đi mua sắm quần áo hoặc đồ ăn, dùng this/that/these/those để hỏi về các món đồ gần và xa.',
      modelAnswer: 'Customer: How much is this black jacket here?\nShopkeeper: It is forty dollars.\nCustomer: And what about those hats on the top shelf?\nShopkeeper: Those are fifteen dollars each.',
      checks: [
        'Dùng ít nhất hai từ chỉ định khác nhau (ví dụ: this và those).',
        'Ngữ cảnh giao tiếp rõ ràng và tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      "id": "demonstratives",
      "title": "British Council: Demonstratives",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/demonstratives",
      "claims": [
        "This/these and that/those distinguish singular/plural and near/distant referents and can be pronouns or accompany nouns."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    }
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Lexora internal AI editorial reviewers; main assistant source verification',
    reviewedAt: "2026-10-06T15:30:39.729Z",
    summary: 'Independent internal-AI prose/exercise review completed; cited reference claims checked on publisher pages. No human-expert or CEFR certification.',
  },
};

export default lesson;
