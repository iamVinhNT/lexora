/**
 * @file subject-pronouns.ts
 * @description A1 subject-pronouns lesson definition: I, you, he, she, it, we, they as sentence subjects.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-subject-pronouns-05',
  revisionId: 'grammar-v2-a1-subject-pronouns-05@1.0.0',
  revision: '1.0.0',
  title: 'Đại từ nhân xưng chủ ngữ: I, you, he, she, it, we, they',
  objective: 'Nhận biết và sử dụng chuẩn xác các đại từ nhân xưng đóng vai trò chủ ngữ (I, you, he, she, it, we, they) để thay thế cho danh từ nhằm tránh lặp từ và chia động từ chính xác.',
  prerequisiteIds: ['grammar-v2-a1-there-are-04'],
  coverage: ['subject-pronouns', 'pronouns', 'syntax'],
  context: {
    english: 'My friend Nam is a teacher. He lives in Da Nang. We often play football together, and our classmates say they always cheer for our team.',
    vietnamese: 'Bạn tôi là Nam, một giáo viên. Anh ấy sống ở Đà Nẵng. Chúng tôi thường chơi bóng đá cùng nhau, và các bạn cùng lớp nói họ luôn cổ vũ cho đội của chúng tôi.',
  },
  guide: {
    pattern: 'Subject Pronoun (I / You / He / She / It / We / They) + Verb + Object/Complement',
    whenToUse: [
      'Đứng ở vị trí chủ ngữ trước động từ chính trong câu trần thuật',
      'Thay thế danh từ đã được giới thiệu trước đó để đoạn văn mạch lạc, tự nhiên',
      'Xác định rõ ngôi xưng và số lượng (ngôi thứ nhất, hai, ba; số ít hoặc số nhiều)',
    ],
    signalWords: ['I', 'you', 'he', 'she', 'it', 'we', 'they', 'replacement'],
    check: [
      'Đại từ "I" luôn luôn được viết hoa bất kể vị trí nào trong câu',
      'Dùng "he" cho nam số ít, "she" cho nữ số ít, "it" cho đồ vật/con vật/thời tiết số ít',
      'Dùng "they" cho số nhiều của CẢ người và vật (không dùng "it" cho nhiều đồ vật)',
      '"we" gồm người nói và người khác (ví dụ: My brother and I -> We)',
      'Không dùng đại từ tân ngữ (me, him, them) làm chủ ngữ trước động từ chính',
    ],
  },
  explanation: 'Đại từ nhân xưng chủ ngữ (subject pronouns) đại diện cho người hoặc vật thực hiện hành động, đứng trước động từ trong câu khẳng định và phủ định. Tiếng Anh phân chia các đại từ này theo ba ngôi: Ngôi thứ nhất số ít là "I" (tôi - luôn viết hoa), số nhiều là "we" (chúng tôi/chúng ta). Ngôi thứ hai là "you" (bạn hoặc các bạn, dùng cho cả số ít lẫn số nhiều). Ngôi thứ ba số ít gồm "he" (anh ấy/ông ấy), "she" (cô ấy/bà ấy), và "it" (nó - dùng cho đồ vật, sự việc, thời tiết, hoặc con vật khi chưa xác định giới tính). Ngôi thứ ba số nhiều là "they" (họ/chúng nó) - đặc biệt lưu ý: "they" dùng cho cả nhóm người LẪN nhóm đồ vật/con vật số nhiều (ví dụ: The books are on the desk. They are heavy). Khi kết hợp bản thân với người khác làm chủ ngữ, ta đặt người khác lên trước rồi đến "I" (ví dụ: "Mai and I", thay bằng đại từ "we").',
  examples: [
    { english: 'Mai is an account manager. She works at a media agency.', vietnamese: 'Mai là quản lý khách hàng. Cô ấy làm việc tại một công ty truyền thông. (She thay cho Mai).' },
    { english: 'David bought a new tablet, and he uses it every day.', vietnamese: 'David mua một chiếc máy tính bảng mới, và anh ấy dùng nó mỗi ngày. (He thay cho David).' },
    { english: 'Look at those tall buildings. They were built last year.', vietnamese: 'Hãy nhìn những tòa nhà cao tầng kia kìa. Chúng được xây dựng vào năm ngoái. (They thay cho buildings).' },
    { english: 'My brother and I love hiking. We usually go on weekends.', vietnamese: 'Anh trai tôi và tôi thích đi bộ đường dài. Chúng tôi thường đi vào cuối tuần. (We thay cho My brother and I).' },
    { english: 'It is very cold outside this evening.', vietnamese: 'Trời tối nay rất lạnh. (It dùng làm chủ ngữ chỉ thời tiết).' },
    { english: 'You are welcome to join our study group anytime.', vietnamese: 'Bạn luôn được chào đón tham gia nhóm học tập của chúng tôi bất cứ lúc nào. (You làm chủ ngữ).' },
  ],
  contrasts: [
    {
      form: 'These computers are fast. They have SSD drives vs It has SSD drives',
      whyFits: 'Dùng "They" vì computers là danh từ số nhiều.',
      whyNot: '"It" chỉ dùng cho một vật số ít, không thể thay thế cho danh từ số nhiều.',
    },
    {
      form: 'Lan and I arrived early vs Lan and me arrived early',
      whyFits: 'Đứng ở vị trí chủ ngữ trước động từ "arrived", phải dùng đại từ chủ ngữ "I".',
      whyNot: '"me" là đại từ tân ngữ, không thể đứng làm chủ ngữ trong ngữ pháp chuẩn mực.',
    },
  ],
  commonMistakes: [
    'Dùng "it" thay cho đồ vật số nhiều: nói "I love these shoes because it is comfortable" thay vì "they are".',
    'Dùng đại từ tân ngữ làm chủ ngữ: nói "Me and him work together" thay vì "He and I work together".',
    'Không viết hoa chữ I khi đứng giữa câu: viết "my friend and i" thay vì "my friend and I".',
  ],
  summary: 'Chủ ngữ thực hiện hành động: I, You, He, She, It, We, They. Nhớ: They dùng cho cả người và vật số nhiều; I luôn viết hoa; vị trí đứng trước động từ.',
  exercises: [
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q1',
      kind: 'choice',
      prompt: 'Anna is fluent in Japanese because ___ lived in Osaka for four years.',
      options: [
        { text: 'she', correct: true, rationale: 'Anna là nữ số ít, thay bằng đại từ chủ ngữ "she".' },
        { text: 'her', correct: false, rationale: '"her" là đại từ tân ngữ hoặc tính từ sở hữu, không làm chủ ngữ.' },
        { text: 'it', correct: false, rationale: '"it" chỉ đồ vật hoặc con vật, không chỉ người phụ nữ.' },
      ],
      acceptedAnswers: [{ text: 'she', rationale: 'She là đại từ chủ ngữ thay cho Anna.' }],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q2',
      kind: 'choice',
      prompt: 'Where are my car keys? ___ are not on the kitchen counter.',
      options: [
        { text: 'They', correct: true, rationale: '"my car keys" là đồ vật số nhiều, thay bằng đại từ "They".' },
        { text: 'It', correct: false, rationale: '"It" chỉ dùng cho một đồ vật số ít.' },
        { text: 'There', correct: false, rationale: '"There are not" thì đúng cấu trúc tồn tại, nhưng ở đây cần đại từ thay thế cho chủ ngữ đã xác định.' },
      ],
      acceptedAnswers: [{ text: 'They', rationale: 'They thay thế cho danh từ số nhiều my car keys.' }],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q3',
      kind: 'choice',
      prompt: 'My colleague Peter and I have a presentation tomorrow, so ___ need to practice tonight.',
      options: [
        { text: 'we', correct: true, rationale: '"Peter and I" bao gồm người nói và người khác nên thay bằng "we".' },
        { text: 'they', correct: false, rationale: '"they" không bao gồm người nói (I).' },
        { text: 'us', correct: false, rationale: '"us" là đại từ tân ngữ, không thể đứng làm chủ ngữ.' },
      ],
      acceptedAnswers: [{ text: 'we', rationale: 'Peter and I được thay thế bằng we.' }],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q4',
      kind: 'choice',
      prompt: 'The new smartphone camera is impressive. ___ takes crystal-clear photos in low light.',
      options: [
        { text: 'It', correct: true, rationale: '"The new smartphone camera" là đồ vật số ít, thay bằng "It".' },
        { text: 'He', correct: false, rationale: '"He" chỉ người nam.' },
        { text: 'They', correct: false, rationale: '"They" dùng cho danh từ số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'It', rationale: 'It thay thế cho danh từ số ít chỉ đồ vật.' }],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q5',
      kind: 'gap',
      prompt: 'Linh is very energetic; ___ always arrives at the office before 8 AM.',
      options: [],
      acceptedAnswers: [
        { text: 'she', rationale: 'Linh là nữ nên dùng đại từ chủ ngữ she.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q6',
      kind: 'gap',
      prompt: 'My parents live in Da Lat. ___ enjoy gardening in their backyard.',
      options: [],
      acceptedAnswers: [
        { text: 'They', rationale: 'My parents là danh từ số nhiều chỉ người nên dùng đại từ They.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q7',
      kind: 'gap',
      prompt: '___ is raining heavily outside, so remember to bring your umbrella.',
      options: [],
      acceptedAnswers: [
        { text: 'It', rationale: 'Đại từ chủ ngữ giả "It" dùng để nói về thời tiết (It is raining).' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q8',
      kind: 'gap',
      prompt: 'Nam and I are classmates. ___ study together in the library every afternoon.',
      options: [],
      acceptedAnswers: [
        { text: 'We', rationale: 'Nam and I tương đương với đại từ We (chúng tôi).' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q9',
      kind: 'transform',
      prompt: 'Thay thế cụm chủ ngữ gạch chân bằng đại từ thích hợp: "The doctors work hard at the hospital." -> "___ work hard at the hospital."',
      options: [],
      acceptedAnswers: [
        { text: 'They', rationale: 'The doctors là danh từ số nhiều nên thay bằng They.' },
        { text: 'They work hard at the hospital.', rationale: 'Câu hoàn chỉnh với đại từ They.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q10',
      kind: 'transform',
      prompt: 'Thay thế cụm chủ ngữ bằng đại từ thích hợp: "My mother and I cook dinner together." -> "___ cook dinner together."',
      options: [],
      acceptedAnswers: [
        { text: 'We', rationale: 'My mother and I gồm người nói nên thay bằng đại từ We.' },
        { text: 'We cook dinner together.', rationale: 'Câu hoàn chỉnh với đại từ We.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai đại từ trong câu sau: "Me and my sister like drinking bubble tea."',
      options: [],
      acceptedAnswers: [
        { text: 'My sister and I like drinking bubble tea.', rationale: 'Dùng I làm chủ ngữ sau My sister.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai đại từ trong câu sau: "I bought three books yesterday, and it is very useful."',
      options: [],
      acceptedAnswers: [
        { text: 'I bought three books yesterday, and they are very useful.', rationale: 'Three books cần đại từ số nhiều they và động từ are.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-subject-pronouns-05-r1',
      kind: 'choice',
      prompt: 'Chọn câu có đại từ thay thế phù hợp trong đoạn văn sau:',
      options: [
        { text: 'Mr. Quang is our mentor. He gives us valuable career advice.', correct: true, rationale: 'Mr. Quang là nam giới số ít nên thay bằng "He" đúng ngữ pháp.' },
        { text: 'Mr. Quang is our mentor. Him gives us valuable career advice.', correct: false, rationale: '"Him" là đại từ tân ngữ, không thể làm chủ ngữ.' },
        { text: 'Mr. Quang is our mentor. It gives us valuable career advice.', correct: false, rationale: '"It" không dùng để chỉ người.' },
      ],
      acceptedAnswers: [{ text: 'Mr. Quang is our mentor. He gives us valuable career advice.', rationale: 'He là đại từ chủ ngữ chính xác.' }],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu: "Look at the stars tonight! ___ are shining so brightly."',
      options: [],
      acceptedAnswers: [
        { text: 'They', rationale: 'The stars là danh từ số nhiều nên thay thế bằng They.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách thay thế "The coffee shop" bằng đại từ phù hợp: "The coffee shop opens at 7 AM." -> "___ opens at 7 AM."',
      options: [],
      acceptedAnswers: [
        { text: 'It', rationale: 'The coffee shop là địa điểm/sự vật số ít nên thay bằng It.' },
        { text: 'It opens at 7 AM.', rationale: 'Câu hoàn chỉnh với đại từ It.' },
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai đại từ trong câu: "Can you hear the birds? It are singing in the garden."',
      options: [],
      acceptedAnswers: [
        { text: 'They', rationale: 'Birds là danh từ số nhiều nên phải dùng They thay cho It.' },
        { text: 'They are singing in the garden.', rationale: 'Câu hoàn chỉnh sửa It thành They.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-subject-pronouns-05-o1',
      prompt: 'Viết một đoạn văn ngắn (3-4 câu) giới thiệu về gia đình hoặc nhóm bạn thân của bạn, sử dụng ít nhất 3 đại từ chủ ngữ khác nhau (ví dụ: He, She, We, They) để tránh lặp tên.',
      modelAnswer: 'My best friend is Huy. He works as a graphic designer in Hanoi. Huy and I often play badminton on Saturdays, and we usually have coffee afterward. They say our friendship has lasted for ten years.',
      checks: [
        'Sử dụng ít nhất 3 đại từ nhân xưng chủ ngữ (He, She, We, They)',
        'Các đại từ thay thế đúng danh từ đứng trước về ngôi và số',
        'Vị trí của đại từ đứng trước động từ chính',
      ],
    },
    {
      id: 'grammar-v2-a1-subject-pronouns-05-o2',
      prompt: 'Viết 3 câu miêu tả thời tiết và các hoạt động của bạn hôm nay, sử dụng "It" cho thời tiết và "I" hoặc "We" cho người thực hiện hành động.',
      modelAnswer: 'It is sunny and warm in Da Nang today. I walk along My Khe beach every morning before breakfast. We really appreciate this peaceful weather.',
      checks: [
        'Sử dụng đúng "It" làm chủ ngữ chỉ thời tiết',
        'Sử dụng "I" hoặc "We" làm chủ ngữ cho hành động của người',
        'Viết hoa chữ I và đầu câu đầy đủ',
      ],
    },
  ],
  sources: [
    {
      "id": "pronouns",
      "title": "British Council: Personal pronouns",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/personal-pronouns",
      "claims": [
        "Subject pronouns precede the verb in ordinary statements; object pronouns follow transitive verbs and prepositions."
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
