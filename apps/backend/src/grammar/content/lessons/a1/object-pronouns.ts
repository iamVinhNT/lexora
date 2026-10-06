/**
 * @file object-pronouns.ts
 * @description A1 object-pronouns lesson definition: me, you, him, her, it, us, them after verbs and prepositions.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-object-pronouns-06',
  revisionId: 'grammar-v2-a1-object-pronouns-06@1.0.0',
  revision: '1.0.0',
  title: 'Đại từ tân ngữ: me, you, him, her, it, us, them',
  objective: 'Nhận diện và sử dụng chuẩn xác các đại từ nhân xưng tân ngữ (me, you, him, her, it, us, them) đứng sau động từ hoặc giới từ để chỉ đối tượng tiếp nhận hành động.',
  prerequisiteIds: ['grammar-v2-a1-subject-pronouns-05'],
  coverage: ['object-pronouns', 'pronouns', 'syntax'],
  context: {
    english: 'Our teacher gave us a new exercise book today. Lan asked me for a pen, so I lent it to her with a smile.',
    vietnamese: 'Giáo viên đã đưa cho chúng tôi một cuốn sách bài tập mới hôm nay. Lan đã hỏi xin tôi một cây bút, nên tôi đã cho cô ấy mượn với một nụ cười.',
  },
  guide: {
    pattern: 'Subject + Verb + Object Pronoun (me / you / him / her / it / us / them) || Preposition (to, for, with, at, about) + Object Pronoun',
    whenToUse: [
      'Đứng sau động từ để làm tân ngữ tiếp nhận hành động trực tiếp hoặc gián tiếp (help me, see them)',
      'Đứng ngay sau giới từ như to, for, with, at, from, about (wait for us, talk to him)',
      'Dùng trong câu trả lời ngắn trong giao tiếp thân mật (ví dụ: Who did that? - Not me!)',
    ],
    signalWords: ['me', 'you', 'him', 'her', 'it', 'us', 'them', 'with', 'for', 'to'],
    check: [
      'Bảng quy đổi tương ứng: I -> me, you -> you, he -> him, she -> her, it -> it, we -> us, they -> them',
      'Đứng sau động từ bắt buộc dùng đại từ tân ngữ (call him, KHÔNG nói call he)',
      'Đứng sau giới từ bắt buộc dùng đại từ tân ngữ (listen to me, KHÔNG nói listen to I)',
      'Lưu ý "you" và "it" giữ nguyên dạng cho cả chủ ngữ và tân ngữ',
      'Phân biệt đại từ tân ngữ "her" (I like her) và tính từ sở hữu "her" (her laptop)',
    ],
  },
  explanation: 'Đại từ tân ngữ (object pronouns) dùng để chỉ người hoặc vật chịu tác động của hành động do chủ ngữ gây ra. Đại từ tân ngữ có hai vị trí xuất hiện chính trong câu: Thứ nhất, đứng ngay sau ngoại động từ (transitive verb), ví dụ: "Can you help me?" (Bạn có thể giúp tôi không?). Thứ hai, đứng ngay sau một giới từ (preposition) như with, for, to, at, about, after, ví dụ: "She is talking to him" (Cô ấy đang nói chuyện với anh ấy). Hãy nhớ sự biến đổi tương ứng giữa hai nhóm đại từ: I thành me, he thành him, she thành her, we thành us, they thành them. Riêng "you" và "it" giữ nguyên dạng viết dù đứng trước hay sau động từ. Tuyệt đối không dùng đại từ chủ ngữ sau động từ hoặc giới từ trong ngữ pháp chuẩn (không viết "wait for they" hay "send I an email").',
  examples: [
    { english: 'Could you please send me the final report by noon?', vietnamese: 'Bạn có thể gửi cho tôi bản báo cáo cuối cùng trước buổi trưa được không? (Me đứng sau send).' },
    { english: 'We invited him to our team dinner yesterday.', vietnamese: 'Chúng tôi đã mời anh ấy đến bữa tối của đội hôm qua. (Him làm tân ngữ của invited).' },
    { english: 'Our manager wants to talk to us about the new project.', vietnamese: 'Quản lý muốn nói chuyện với chúng tôi về dự án mới. (Us đứng sau giới từ to).' },
    { english: 'Do you know that girl? I often see her in the library.', vietnamese: 'Bạn có biết cô gái đó không? Tôi thường thấy cô ấy trong thư viện. (Her làm tân ngữ của see).' },
    { english: 'I have three questions, so I will email them to the professor.', vietnamese: 'Tôi có ba câu hỏi, nên tôi sẽ gửi email chúng cho giáo sư. (Them thay cho three questions).' },
    { english: 'This gift is for you from all of us.', vietnamese: 'Món quà này là dành cho bạn từ tất cả chúng tôi. (You và us đứng sau giới từ for và of).' },
  ],
  contrasts: [
    {
      form: 'She phoned him yesterday vs She phoned he yesterday',
      whyFits: 'Dùng "him" vì đứng sau động từ phoned là vị trí tân ngữ tiếp nhận cuộc gọi.',
      whyNot: '"he" là đại từ chủ ngữ, chỉ có thể đứng trước động từ để thực hiện hành động.',
    },
    {
      form: 'Come with us to the cinema vs Come with we to the cinema',
      whyFits: 'Sau giới từ "with", bắt buộc phải dùng đại từ tân ngữ "us".',
      whyNot: '"we" là dạng chủ ngữ, không bao giờ đi trực tiếp sau giới từ.',
    },
  ],
  commonMistakes: [
    'Dùng đại từ chủ ngữ sau giới từ: nói "She sat next to I" thay vì "next to me".',
    'Nhầm lẫn giữa he và him sau động từ: nói "Tell he to come" thay vì "Tell him to come".',
    'Dùng sai hình thức tân ngữ của they: nói "I saw they at the mall" thay vì "I saw them at the mall".',
  ],
  summary: 'Đại từ tân ngữ đứng sau động từ và giới từ: me, you, him, her, it, us, them. Ghi nhớ: I -> me, he -> him, she -> her, we -> us, they -> them.',
  exercises: [
    {
      id: 'grammar-v2-a1-object-pronouns-06-q1',
      kind: 'choice',
      prompt: 'If you see Minh at the cafeteria, please give ___ this document.',
      options: [
        { text: 'him', correct: true, rationale: 'Minh là nam giới, đứng sau động từ "give" cần đại từ tân ngữ "him".' },
        { text: 'he', correct: false, rationale: '"he" là đại từ chủ ngữ, không đứng sau động từ give.' },
        { text: 'his', correct: false, rationale: '"his" là tính từ sở hữu hoặc đại từ sở hữu, không dùng độc lập ở đây.' },
      ],
      acceptedAnswers: [{ text: 'him', rationale: 'Him là đại từ tân ngữ số ít nam.' }],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q2',
      kind: 'choice',
      prompt: 'Our teacher gave ___ a lot of useful feedback on our writing.',
      options: [
        { text: 'us', correct: true, rationale: 'Đứng sau động từ gave là vị trí tân ngữ của we, tức là "us".' },
        { text: 'we', correct: false, rationale: '"we" là chủ ngữ, không làm tân ngữ sau động từ.' },
        { text: 'our', correct: false, rationale: '"our" là tính từ sở hữu, phải có danh từ theo sau.' },
      ],
      acceptedAnswers: [{ text: 'us', rationale: 'Us là đại từ tân ngữ của we.' }],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q3',
      kind: 'choice',
      prompt: 'These documents are very confidential; please don\'t share ___ with unauthorized people.',
      options: [
        { text: 'them', correct: true, rationale: '"These documents" là danh từ số nhiều, sau động từ share dùng đại từ tân ngữ "them".' },
        { text: 'it', correct: false, rationale: '"it" chỉ dùng cho số ít.' },
        { text: 'they', correct: false, rationale: '"they" là đại từ chủ ngữ.' },
      ],
      acceptedAnswers: [{ text: 'them', rationale: 'Them thay cho these documents ở vị trí tân ngữ.' }],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q4',
      kind: 'choice',
      prompt: 'My grandparents love gardening. I always visit ___ on Sunday afternoons.',
      options: [
        { text: 'them', correct: true, rationale: '"My grandparents" là số nhiều, đứng sau visit cần đại từ tân ngữ "them".' },
        { text: 'they', correct: false, rationale: '"they" là chủ ngữ.' },
        { text: 'their', correct: false, rationale: '"their" là tính từ sở hữu.' },
      ],
      acceptedAnswers: [{ text: 'them', rationale: 'Them là đại từ tân ngữ của they.' }],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q5',
      kind: 'gap',
      prompt: 'Can you hear ___ clearly, or is the microphone too quiet?',
      options: [],
      acceptedAnswers: [
        { text: 'me', rationale: 'Đứng sau động từ hear chỉ người nói dùng đại từ tân ngữ me.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q6',
      kind: 'gap',
      prompt: 'Jessica is looking for her keys. Can you help ___ find them?',
      options: [],
      acceptedAnswers: [
        { text: 'her', rationale: 'Jessica là nữ số ít, sau help dùng đại từ tân ngữ her.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q7',
      kind: 'gap',
      prompt: 'We are going for coffee. Would you like to come with ___?',
      options: [],
      acceptedAnswers: [
        { text: 'us', rationale: 'Sau giới từ with, thay thế cho we là đại từ tân ngữ us.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q8',
      kind: 'gap',
      prompt: 'I like this watch, but I can\'t afford ___ right now.',
      options: [],
      acceptedAnswers: [
        { text: 'it', rationale: 'This watch là đồ vật số ít, tân ngữ của afford là it.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q9',
      kind: 'transform',
      prompt: 'Thay thế danh từ gạch chân bằng đại từ tân ngữ: "The teacher called Lan to the board." -> "The teacher called ___ to the board."',
      options: [],
      acceptedAnswers: [
        { text: 'her', rationale: 'Lan là nữ nên thay bằng đại từ tân ngữ her.' },
        { text: 'The teacher called her to the board.', rationale: 'Câu hoàn chỉnh với her.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q10',
      kind: 'transform',
      prompt: 'Thay thế cụm từ gạch chân bằng đại từ tân ngữ: "Mr. Brown bought gifts for his children." -> "Mr. Brown bought gifts for ___."',
      options: [],
      acceptedAnswers: [
        { text: 'them', rationale: 'His children là danh từ số nhiều, sau giới từ for dùng them.' },
        { text: 'Mr. Brown bought gifts for them.', rationale: 'Câu hoàn chỉnh với them.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai đại từ trong câu sau: "Please listen to I when I explain the instructions."',
      options: [],
      acceptedAnswers: [
        { text: 'me', rationale: 'Sau giới từ to phải dùng đại từ tân ngữ me thay vì đại từ chủ ngữ I.' },
        { text: 'Please listen to me when I explain the instructions.', rationale: 'Câu hoàn chỉnh sửa I thành me.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai đại từ trong câu sau: "Our manager invited she to the annual dinner."',
      options: [],
      acceptedAnswers: [
        { text: 'her', rationale: 'Sau động từ invited phải dùng đại từ tân ngữ her thay vì she.' },
        { text: 'Our manager invited her to the annual dinner.', rationale: 'Câu hoàn chỉnh sửa she thành her.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-object-pronouns-06-r1',
      kind: 'choice',
      prompt: 'Chọn câu đáp lại tự nhiên và chính xác trong ngữ cảnh công việc:',
      options: [
        { text: 'Thank you for contacting us; we will reply soon.', correct: true, rationale: 'Sau contacting dùng tân ngữ "us" rất chính xác và trang trọng.' },
        { text: 'Thank you for contacting we; we will reply soon.', correct: false, rationale: '"contacting we" là sai ngữ pháp vì dùng đại từ chủ ngữ.' },
        { text: 'Thank you for contacting our; we will reply soon.', correct: false, rationale: '"our" là tính từ sở hữu, không đứng độc lập làm tân ngữ.' },
      ],
      acceptedAnswers: [{ text: 'Thank you for contacting us; we will reply soon.', rationale: 'Us là đại từ tân ngữ chính xác.' }],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-r2',
      kind: 'gap',
      prompt: 'Hoàn thành hội thoại: A: "Where is Mr. Hoang?" - B: "I just saw ___ in the conference room."',
      options: [],
      acceptedAnswers: [
        { text: 'him', rationale: 'Mr. Hoang là nam số ít, sau động từ saw dùng him.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách dùng đại từ tân ngữ thay cho "the letter": "The postman delivered the letter to the office." -> "The postman delivered ___ to the office."',
      options: [],
      acceptedAnswers: [
        { text: 'it', rationale: 'The letter là đồ vật số ít nên thay bằng it.' },
        { text: 'The postman delivered it to the office.', rationale: 'Câu hoàn chỉnh với it.' },
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-r4',
      kind: 'correction',
      prompt: 'Sửa từ sai trong câu: "My friends are waiting for I outside the cinema."',
      options: [],
      acceptedAnswers: [
        { text: 'me', rationale: 'Sau giới từ for phải dùng đại từ tân ngữ me.' },
        { text: 'My friends are waiting for me outside the cinema.', rationale: 'Câu hoàn chỉnh sửa I thành me.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-object-pronouns-06-o1',
      prompt: 'Viết một email hoặc tin nhắn ngắn (3 câu) nhờ đồng nghiệp hoặc bạn bè giúp đỡ việc gì đó, sử dụng ít nhất hai đại từ tân ngữ khác nhau (ví dụ: me, it, him, us).',
      modelAnswer: 'Hi Trang, could you please help me with the budget report? I attached it to this email. You can call us if you have any questions.',
      checks: [
        'Sử dụng ít nhất 2 đại từ tân ngữ chính xác (me, it, us)',
        'Đại từ tân ngữ đứng sau động từ hoặc giới từ',
        'Lời văn lịch sự và đúng ngữ cảnh nhờ vả',
      ],
    },
    {
      id: 'grammar-v2-a1-object-pronouns-06-o2',
      prompt: 'Viết 3 câu kể về một người bạn hoặc người thân đặc biệt đối với bạn, sử dụng đại từ tân ngữ sau giới từ (ví dụ: with him/her, for him/her, about him/her).',
      modelAnswer: 'My grandmother lives in the countryside, and I deeply respect her. I often cook traditional meals with her whenever I visit. My parents always prepare warm gifts for her on New Year.',
      checks: [
        'Sử dụng đúng đại từ tân ngữ sau động từ hoặc giới từ (her, him)',
        'Không nhầm lẫn giữa đại từ chủ ngữ và đại từ tân ngữ',
        'Nội dung mạch lạc và đúng ngữ pháp',
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
