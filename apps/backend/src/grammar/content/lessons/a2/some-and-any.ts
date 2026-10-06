/**
 * @file some-and-any.ts
 * @description Lesson: Quantifiers some and any in affirmative, negative, questions, and offers/requests (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-some-and-any-14',
  revisionId: 'grammar-v2-a2-some-and-any-14@1.0.0',
  revision: '1.0.0',
  title: 'Lượng từ Some và Any (Some and Any)',
  objective: 'Sử dụng chính xác lượng từ some và any với danh từ đếm được số nhiều và danh từ không đếm được trong câu khẳng định, phủ định, câu hỏi thông thường, cũng như các trường hợp đặc biệt như lời mời và lời yêu cầu lịch sự.',
  prerequisiteIds: ['grammar-v2-a2-countable-uncountable-13'],
  coverage: ['some-and-any', 'quantifiers', 'determiners', 'indefinite-pronouns', 'a2-grammar'],
  context: {
    english: 'There are some fresh apples on the kitchen table, but there isn\'t any milk in the fridge. Would you like some orange juice instead?',
    vietnamese: 'Có vài quả táo tươi trên bàn bếp, nhưng không còn chút sữa nào trong tủ lạnh. Bạn có muốn dùng một ít nước cam thay thế không?',
  },
  guide: {
    pattern: 'some + plural / uncountable noun (affirmative, offers/requests) | any + plural / uncountable noun (negative, questions)',
    whenToUse: [
      'Dùng "some" trong câu khẳng định để chỉ một lượng không xác định với danh từ đếm được số nhiều (some friends) hoặc không đếm được (some sugar).',
      'Dùng "any" trong câu phủ định (not... any) và câu hỏi nghi vấn thông thường (Do you have any...?).',
      'Trong câu hỏi, some thường được dùng cho lời mời/yêu cầu khi người nói mong đợi hoặc đề nghị câu trả lời thuận lợi; any cũng có thể dùng trong lời mời trung tính hoặc khi hỏi về lựa chọn.',
      'Cấu trúc tương đương: not... any = no (There isn\'t any bread = There is no bread).',
    ],
    signalWords: ['some', 'any', 'would you like some', 'can I have some', 'there isn\'t any', 'are there any'],
    check: [
      'Trong câu khẳng định thông thường, some thường dùng để chỉ lượng/số không xác định.',
      'Trong câu phủ định, any thường dùng (not... any); một số ngữ cảnh nhấn mạnh/đặc biệt có thể dùng some.',
      'Câu hỏi thông thường để hỏi có hay không -> dùng any.',
      'Trong lời mời hoặc yêu cầu, some thường tự nhiên khi mong đợi/đề nghị câu trả lời đồng ý; any có thể phù hợp với câu hỏi trung tính hoặc khi hỏi lựa chọn.',
      'Some thường đi với danh từ đếm được số nhiều hoặc không đếm được; với danh từ đếm được số ít, dùng a/an nếu nói chung về một đơn vị (a book). Any cũng có thể đi với số ít trong nghĩa “bất kỳ” (any book).',
    ],
  },
  explanation: '"Some" và "any" chỉ lượng hoặc số không xác định. Quy tắc thường gặp: some dùng trong câu khẳng định với danh từ đếm được số nhiều và không đếm được (some pens; some free time); any thường dùng trong câu phủ định và câu hỏi trung tính (not any money; any questions). Trong câu hỏi, some thường dùng cho lời mời hoặc yêu cầu (Would you like some coffee?; Can I borrow some money?) khi người nói mong đợi hoặc đề nghị một câu trả lời thuận lợi. Đây là xu hướng, không phải quy tắc cứng: some cũng dùng được với danh từ đếm được số ít khi nghĩa là “một người/vật nào đó” (Some person called) và any với số ít có thể nghĩa là “bất kỳ” (Any book will do).',
  examples: [
    { english: 'We bought some delicious strawberries at the market.', vietnamese: 'Chúng tôi đã mua một ít dâu tây rất ngon ở chợ.' },
    { english: 'There isn\'t any water left in the kettle.', vietnamese: 'Không còn chút nước nào trong ấm đun nước cả.' },
    { english: 'Do you have any brothers or sisters?', vietnamese: 'Bạn có anh chị em nào không?' },
    { english: 'Would you like some sugar in your coffee?', vietnamese: 'Bạn có muốn cho một ít đường vào cà phê không?' },
    { english: 'Can I have some paper to write down your phone number?', vietnamese: 'Tôi có thể xin một ít giấy để ghi lại số điện thoại của bạn không?' },
    { english: 'She did not make any mistakes in her English test.', vietnamese: 'Cô ấy đã không mắc bất kỳ lỗi nào trong bài kiểm tra tiếng Anh.' },
  ],
  contrasts: [
    {
      form: 'General question (any) vs Polite offer/request (some)',
      whyFits: 'Dùng any trong câu hỏi tìm kiếm thông tin chưa biết có hay không (Is there any coffee left?).',
      whyNot: 'Dùng some khi mời ai đó dùng món hoặc xin điều gì một cách lịch sự (Would you like some coffee?).'
    },
    {
      form: 'not... any vs no',
      whyFits: 'Cả hai đều diễn tả sự không có: "There aren\'t any eggs" tương đương "There are no eggs".',
      whyNot: 'Không kết hợp cả hai từ phủ định trong một câu (tránh nói "There aren\'t no eggs").'
    }
  ],
  commonMistakes: [
    'Trong lời mời hoặc yêu cầu, some thường phù hợp khi người nói đề nghị/đang mong câu trả lời đồng ý; any có thể dùng trong lời mời trung tính hoặc hỏi lựa chọn.',
    'Dùng "some" trong câu phủ định: nói "I don\'t have some time" thay vì "I don\'t have any time".',
    'Dùng "some" trước danh từ đếm được số ít khi chỉ một đơn vị nói chung: trong nghĩa đó, dùng "a book"; "some book" có thể mang nghĩa “một quyển nào đó”.'
  ],
  summary: 'Some: câu khẳng định, lời mời (Would you like some...?), lời yêu cầu (Can I have some...?). Any: câu phủ định (not... any), câu hỏi thông thường.',
  exercises: [
    {
      id: 'grammar-v2-a2-some-and-any-14-q1',
      kind: 'choice',
      prompt: 'I am hungry, but there isn\'t _____ food in the refrigerator.',
      options: [
        { text: 'any', rationale: 'Trong câu phủ định có isn\'t, dùng any với danh từ không đếm được food.', correct: true },
        { text: 'some', rationale: 'Some thường không dùng trong câu phủ định thông thường.', correct: false },
        { text: 'no', rationale: 'Isn\'t đã có phủ định not, không dùng thêm no để tránh phủ định kép.', correct: false },
      ],
      acceptedAnswers: [{ text: 'any', rationale: 'Dùng any trong câu phủ định.' }]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q2',
      kind: 'choice',
      prompt: 'Choose the usual friendly offer form: "Would you like _____ hot tea to warm up on this cold day?"',
      options: [
        { text: 'some', rationale: 'Trong lời mời thân thiện có đề nghị một tách trà, some là lựa chọn thông dụng để mời người nghe.', correct: true },
        { text: 'any', rationale: 'Any is possible in a neutral offer question; this prompt asks for the usual friendly offer with some.', correct: false },
        { text: 'a', rationale: 'Tea là danh từ không đếm được nên không dùng mạo từ a trực tiếp.', correct: false },
      ],
      acceptedAnswers: [{ text: 'some', rationale: 'Dùng some trong lời mời lịch sự Would you like...?' }]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q3',
      kind: 'choice',
      prompt: 'Do you know _____ good restaurants near our hotel?',
      options: [
        { text: 'any', rationale: 'Câu hỏi nghi vấn thông thường hỏi xem có hay không dùng any.', correct: true },
        { text: 'some', rationale: 'Some ít dùng trong câu hỏi thông thường trừ khi là lời mời hoặc yêu cầu.', correct: false },
        { text: 'an', rationale: 'Restaurants là danh từ số nhiều nên không dùng an.', correct: false },
      ],
      acceptedAnswers: [{ text: 'any', rationale: 'Dùng any trong câu hỏi thông thường.' }]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q4',
      kind: 'choice',
      prompt: 'We met _____ interesting people while travelling in Sapa.',
      options: [
        { text: 'some', rationale: 'Câu khẳng định đi với danh từ số nhiều people dùng some.', correct: true },
        { text: 'any', rationale: 'Any không dùng trong câu khẳng định thông thường mang nghĩa tích cực.', correct: false },
        { text: 'a', rationale: 'People là danh từ số nhiều nên không dùng a.', correct: false },
      ],
      acceptedAnswers: [{ text: 'some', rationale: 'Dùng some trong câu khẳng định.' }]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q5',
      kind: 'gap',
      prompt: 'Can I have _____ (some/any) fresh water, please?',
      options: [],
      acceptedAnswers: [
        { text: 'some', rationale: 'Đây là lời yêu cầu xin phép lịch sự (Can I have...), dùng some.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q6',
      kind: 'gap',
      prompt: 'I searched everywhere, but I could not find _____ (some/any) keys.',
      options: [],
      acceptedAnswers: [
        { text: 'any', rationale: 'Câu phủ định với could not dùng any keys.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q7',
      kind: 'gap',
      prompt: 'There are _____ (some/any) beautiful flowers in the garden behind the house.',
      options: [],
      acceptedAnswers: [
        { text: 'some', rationale: 'Câu khẳng định có There are dùng some beautiful flowers.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q8',
      kind: 'gap',
      prompt: 'Are there _____ (some/any) letters for me today?',
      options: [],
      acceptedAnswers: [
        { text: 'any', rationale: 'Câu hỏi nghi vấn thông thường dùng any letters.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q9',
      kind: 'transform',
      prompt: 'Chuyển câu khẳng định sau sang câu phủ định dùng "any": "She bought some souvenirs at the market."',
      options: [],
      acceptedAnswers: [
        { text: "She didn't buy any souvenirs at the market.", rationale: 'Chuyển sang phủ định: didn\'t buy any souvenirs.' },
        { text: 'She did not buy any souvenirs at the market.', rationale: 'Dạng đầy đủ của did not buy any souvenirs.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "not... any" thay cho "no": "There are no empty seats on the bus."',
      options: [],
      acceptedAnswers: [
        { text: "There aren't any empty seats on the bus.", rationale: 'Chuyển no empty seats thành aren\'t any empty seats.' },
        { text: 'There are not any empty seats on the bus.', rationale: 'Dạng đầy đủ: There are not any empty seats on the bus.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q11',
      kind: 'correction',
      prompt: 'Viết lại lời hỏi trung tính thành lời mời thân thiện dùng some: "Would you like any biscuits with your tea?"',
      options: [],
      acceptedAnswers: [
        { text: 'Would you like some biscuits with your tea?', rationale: 'Some is the usual choice for a friendly offer; any is possible in a neutral offer question.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-q12',
      kind: 'correction',
      prompt: 'Rewrite to express having no time available: "I do not have some time to talk right now."',
      options: [],
      acceptedAnswers: [
        { text: "I don't have any time to talk right now.", rationale: 'Trong câu phủ định (don\'t have), thay some bằng any time.' },
        { text: 'I do not have any time to talk right now.', rationale: 'Dạng đầy đủ: I do not have any time to talk right now.' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-some-and-any-14-r1',
      kind: 'choice',
      prompt: 'A: "Do you have _____ cash with you?" - B: "No, I don\'t have _____ money left."',
      options: [
        { text: 'any / any', rationale: 'Vế đầu là câu hỏi thông thường (any), vế sau là câu phủ định don\'t have (any).', correct: true },
        { text: 'some / some', rationale: 'Câu hỏi thông thường và câu phủ định đều không dùng some ở đây.', correct: false },
        { text: 'some / any', rationale: 'Câu hỏi thông thường hỏi xem có hay không nên dùng any.', correct: false },
      ],
      acceptedAnswers: [{ text: 'any / any', rationale: 'Dùng any trong cả câu hỏi thông thường và câu phủ định.' }]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-r2',
      kind: 'gap',
      prompt: 'Can you lend me _____ (some/any) money until tomorrow?',
      options: [],
      acceptedAnswers: [
        { text: 'some', rationale: 'Lời yêu cầu mượn tiền lịch sự (Can you lend me...), dùng some.' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-r3',
      kind: 'transform',
      prompt: 'Chuyển lời đề nghị sau thành câu hỏi mời lịch sự bắt đầu bằng "Would you like": "Have some fresh fruit."',
      options: [],
      acceptedAnswers: [
        { text: 'Would you like some fresh fruit?', rationale: 'Lời mời lịch sự dùng Would you like some fresh fruit?' }
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "There aren\'t no clean glasses in the cupboard."',
      options: [],
      acceptedAnswers: [
        { text: "There aren't any clean glasses in the cupboard.", rationale: 'Sửa phủ định kép bằng cách đổi no thành any clean glasses.' },
        { text: 'There are no clean glasses in the cupboard.', rationale: 'Biến thể dùng There are no clean glasses.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-some-and-any-14-o1',
      prompt: 'Viết 2 câu miêu tả những thứ có và không có trong tủ lạnh của bạn (1 câu khẳng định dùng "some" và 1 câu phủ định dùng "any").',
      modelAnswer: 'There are some eggs and vegetables in the fridge. However, there isn\'t any milk left.',
      checks: [
        'Câu khẳng định sử dụng đúng lượng từ some.',
        'Câu phủ định sử dụng đúng lượng từ any (not... any).'
      ]
    },
    {
      id: 'grammar-v2-a2-some-and-any-14-o2',
      prompt: 'Viết một câu hỏi mời một người bạn dùng đồ ăn/uống (dùng "Would you like some...?") và một câu hỏi xin phép lịch sự (dùng "Can I have some...?").',
      modelAnswer: 'Would you like some chocolate cake? - Can I have some water first, please?',
      checks: [
        'Câu mời dùng đúng Would you like some...?',
        'Câu yêu cầu dùng đúng Can I have some...?'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-quantifiers-some-any',
      title: 'British Council LearnEnglish: Some and any',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/some-and-any',
      claims: ['We use some in affirmative statements and in offers/requests; we use any in negative statements and questions.'],
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
