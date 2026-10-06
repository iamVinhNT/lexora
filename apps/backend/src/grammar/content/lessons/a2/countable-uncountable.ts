/**
 * @file countable-uncountable.ts
 * @description Lesson: Countable and uncountable nouns, plurals, and measure phrases (A2).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a2-countable-uncountable-13',
  revisionId: 'grammar-v2-a2-countable-uncountable-13@1.0.0',
  revision: '1.0.0',
  title: 'Danh từ đếm được và không đếm được (Countable and Uncountable Nouns)',
  objective: 'Phân biệt danh từ đếm được và không đếm được theo nghĩa cụ thể trong câu, chọn đúng số ít/số nhiều, mạo từ và đơn vị đo lường.',
  prerequisiteIds: ['grammar-v2-a2-future-time-clauses-12'],
  coverage: ['countable-uncountable', 'nouns', 'quantifiers', 'noun-classes', 'a2-grammar'],
  context: {
    english: 'For breakfast, Lan usually eats two eggs, a slice of bread, and drinks a glass of fresh milk. She also puts some cheese and butter on the table.',
    vietnamese: 'Vào bữa sáng, Lan thường ăn hai quả trứng, một lát bánh mì và uống một ly sữa tươi. Cô ấy cũng để một ít phô mai và bơ lên bàn.',
  },
  guide: {
    pattern: 'Countable (in this sense): a/an + singular noun | plural noun (-s/-es) || Uncountable (in this sense): singular verb, no a/an, measure words',
    whenToUse: [
      'Danh từ đếm được (countable nouns): chỉ người hoặc vật thể riêng lẻ có thể đếm được bằng số (one book, two apples, three chairs).',
      'Danh từ không đếm được trong một nghĩa nhất định thường chỉ chất, vật liệu, thực phẩm dạng khối/hạt hoặc khái niệm (water, wood, rice, information, advice). Một danh từ có thể đếm được ở nghĩa khác.',
      'Dùng từ chỉ đơn vị đo lường (measure words / partitives) để định lượng cho danh từ không đếm được: a cup of tea, a bottle of water, a loaf of bread, a piece of advice.',
    ],
    signalWords: ['a/an', 'a cup of', 'a bottle of', 'a piece of', 'a slice of', 'water', 'bread', 'information', 'money', 'advice'],
    check: [
      'Danh từ đếm được số ít không được đứng trơ trọi; cần có mạo từ (a/an/the) hoặc từ sở hữu (my/your).',
      'Khi dùng ở nghĩa không đếm được, danh từ này không đi trực tiếp với a/an (advice, bread) và thường không có dạng số nhiều thông thường.',
      'Khi danh từ mang nghĩa không đếm được, động từ chia số ít (advice is useful); hãy xác định nghĩa cụ thể của danh từ trước khi chọn dạng động từ.',
    ],
  },
  explanation: 'Phân loại danh từ thành đếm được (countable) và không đếm được (uncountable) là một nền tảng ngữ pháp quan trọng trong tiếng Anh. Danh từ đếm được có dạng số ít và số nhiều; số ít thường dùng a/an (a pen, an apple), số nhiều thêm -s/-es (pens, apples, boxes). Danh từ không đếm được thường chỉ vật liệu, chất hoặc khái niệm được xem như một khối/thể thống nhất: water, rice, music, homework, furniture, information. Trong nghĩa này, chúng không có dạng số nhiều thông thường và không dùng trực tiếp với a/an. Muốn định lượng chúng, dùng từ chỉ đồ chứa hoặc đơn vị: a bottle of water, two slices of bread, a piece of information. Cách đếm phụ thuộc vào nghĩa: coffee chỉ đồ uống nói chung là không đếm được, còn a coffee có thể chỉ một tách/phần cà phê; chicken chỉ thịt là không đếm được, còn a chicken là con gà.',
  examples: [
    { english: 'There are three apples and an orange in the basket.', vietnamese: 'Có ba quả táo và một quả cam ở trong giỏ.' },
    { english: 'Could you give me a glass of cold water, please?', vietnamese: 'Bạn có thể cho tôi một ly nước lạnh được không?' },
    { english: 'The teacher gave us useful advice on exam preparation.', vietnamese: 'Thầy giáo đã cho chúng tôi lời khuyên hữu ích về việc chuẩn bị kỳ thi.' },
    { english: 'We need to buy some furniture for our new apartment.', vietnamese: 'Chúng tôi cần mua một số đồ nội thất cho căn hộ mới của mình.' },
    { english: 'How much money do you need to buy this textbook?', vietnamese: 'Bạn cần bao nhiêu tiền để mua cuốn sách giáo khoa này?' },
    { english: 'I bought two loaves of fresh bread from the bakery.', vietnamese: 'Tôi đã mua hai ổ bánh mì tươi từ tiệm bánh.' },
  ],
  contrasts: [
    {
      form: 'a/an + Countable noun vs Measure word + Uncountable noun',
      whyFits: 'Dùng a/an trực tiếp với danh từ đếm được số ít (a sandwich, a cup), nhưng phải dùng cụm đo lường với danh từ không đếm được (a slice of bread, a cup of tea).',
      whyNot: 'Không dùng a/an trực tiếp với danh từ không đếm được (tránh nói "a bread" hay "an advice").'
    },
    {
      form: 'Plural Countable (plural verb) vs Uncountable (singular verb)',
      whyFits: 'Danh từ đếm được số nhiều đi với động từ số nhiều (Apples are sweet).',
      whyNot: 'Danh từ không đếm được luôn đi với động từ số ít (Milk is good for health, không dùng Milk are).'
    }
  ],
  commonMistakes: [
    'Thêm -s vào danh từ không đếm được: viết "informations", "advices", "furnitures", "homeworks".',
    'Dùng mạo từ "a" hoặc "an" trực tiếp với danh từ không đếm được: nói "a bread", "an advice" thay vì "a piece of advice".',
    'Chia động từ số nhiều cho danh từ không đếm được: nói "The traffic are heavy today" thay vì "The traffic is heavy today".'
  ],
  summary: 'Countability depends on the noun’s meaning: count nouns have singular/plural forms; uncountable uses do not take a/an or a regular plural and take singular agreement. Measure phrases can quantify uncountable uses.',
  exercises: [
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q1',
      kind: 'choice',
      prompt: 'Our teacher gave us a lot of useful _____ for our upcoming exam.',
      options: [
        { text: 'advice', rationale: 'Advice là danh từ không đếm được, không có dạng số nhiều thêm -s.', correct: true },
        { text: 'advices', rationale: 'Advice không đếm được nên không bao giờ thêm đuôi -s.', correct: false },
        { text: 'an advice', rationale: 'Advice không đi kèm mạo từ an trực tiếp.', correct: false },
      ],
      acceptedAnswers: [{ text: 'advice', rationale: 'Dùng advice là danh từ không đếm được.' }]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q2',
      kind: 'choice',
      prompt: 'Can I have a _____ of bread and some cheese, please?',
      options: [
        { text: 'slice', rationale: 'Dùng cụm từ đo lường "a slice of bread" (một lát bánh mì).', correct: true },
        { text: 'loafs', rationale: 'Dạng số nhiều của loaf là loaves, và trước có a nên không dùng số nhiều.', correct: false },
        { text: 'piece of breads', rationale: 'Bread là không đếm được nên không có dạng breads.', correct: false },
      ],
      acceptedAnswers: [{ text: 'slice', rationale: 'Dùng slice trong cụm a slice of bread.' }]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q3',
      kind: 'choice',
      prompt: 'The traffic in this city _____ getting worse during rush hours.',
      options: [
        { text: 'is', rationale: 'Traffic là danh từ không đếm được nên động từ chia ở dạng số ít is.', correct: true },
        { text: 'are', rationale: 'Are là dạng số nhiều, không đi với danh từ không đếm được traffic.', correct: false },
        { text: 'were', rationale: 'Were là quá khứ số nhiều, không phù hợp ngữ pháp.', correct: false },
      ],
      acceptedAnswers: [{ text: 'is', rationale: 'Traffic là danh từ không đếm được, đi với is.' }]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q4',
      kind: 'choice',
      prompt: 'How many _____ did you buy at the supermarket yesterday?',
      options: [
        { text: 'bottles of milk', rationale: 'How many đi với danh từ đếm được số nhiều: bottles of milk.', correct: true },
        { text: 'milks', rationale: 'Milk là danh từ không đếm được, không thêm -s.', correct: false },
        { text: 'milk', rationale: 'How many không đi trực tiếp với danh từ không đếm được milk (phải dùng How much).', correct: false },
      ],
      acceptedAnswers: [{ text: 'bottles of milk', rationale: 'Dùng bottles of milk sau How many.' }]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q5',
      kind: 'gap',
      prompt: 'I would like a _____ (cup/cups) of hot green tea, please.',
      options: [],
      acceptedAnswers: [
        { text: 'cup', rationale: 'Sau mạo từ a dùng danh từ số ít cup trong cụm a cup of hot green tea.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q6',
      kind: 'gap',
      prompt: 'All the furniture in the hotel lobby _____ (be) brand new now.',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Furniture là danh từ không đếm được nên to be chia ở số ít is.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q7',
      kind: 'gap',
      prompt: 'My brother has three _____ (child) and two cats.',
      options: [],
      acceptedAnswers: [
        { text: 'children', rationale: 'Dạng số nhiều bất quy tắc của danh từ đếm được child là children.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q8',
      kind: 'gap',
      prompt: 'Could you give me some _____ (information) about the morning flight to Hue?',
      options: [],
      acceptedAnswers: [
        { text: 'information', rationale: 'Information là danh từ không đếm được, giữ nguyên dạng không thêm -s.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q9',
      kind: 'transform',
      prompt: 'Sử dụng cụm từ đo lường "a bottle of" để định lượng cho: "water". (Viết câu hoàn chỉnh: "I bought...")',
      options: [],
      acceptedAnswers: [
        { text: 'I bought a bottle of water.', rationale: 'Dùng a bottle of water để định lượng cho danh từ không đếm được water.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q10',
      kind: 'transform',
      prompt: 'Chuyển danh từ số ít sang số nhiều trong câu sau: "A tourist left a bag on the bench."',
      options: [],
      acceptedAnswers: [
        { text: 'Tourists left bags on the bench.', rationale: 'Đổi a tourist thành tourists và a bag thành bags.' },
        { text: 'The tourists left bags on the bench.', rationale: 'Biến thể có the.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "She gave me an advice about finding a part-time job."',
      options: [],
      acceptedAnswers: [
        { text: 'She gave me some advice about finding a part-time job.', rationale: 'Advice không đếm được nên không dùng mạo từ an; thay bằng some advice hoặc a piece of advice.' },
        { text: 'She gave me a piece of advice about finding a part-time job.', rationale: 'Dùng a piece of advice để chỉ một lời khuyên.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "I have too many homeworks to finish tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'I have too much homework to finish tonight.', rationale: 'Homework là danh từ không đếm được, dùng too much homework (không thêm -s).' }
      ]
    }
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-countable-uncountable-13-r1',
      kind: 'choice',
      prompt: 'Where did you put all our _____? - It is in the bedroom.',
      options: [
        { text: 'luggage', rationale: 'Luggage là danh từ không đếm được, đại từ it ở câu sau phù hợp với danh từ số ít không đếm được.', correct: true },
        { text: 'luggages', rationale: 'Luggage không bao giờ có dạng số nhiều thêm -s.', correct: false },
        { text: 'a luggage', rationale: 'Không dùng mạo từ a trực tiếp với danh từ không đếm được luggage.', correct: false },
      ],
      acceptedAnswers: [{ text: 'luggage', rationale: 'Dùng luggage là danh từ không đếm được.' }]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-r2',
      kind: 'gap',
      prompt: 'My grandfather drinks two _____ (glass/glasses) of warm milk every evening.',
      options: [],
      acceptedAnswers: [
        { text: 'glasses', rationale: 'Sau số lượng two dùng danh từ đếm được số nhiều glasses (thêm -es sau -ss).' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng cụm từ đo lường "a piece of" thay cho từ không phù hợp: "He told me an interesting news."',
      options: [],
      acceptedAnswers: [
        { text: 'He told me an interesting piece of news.', rationale: 'News là không đếm được, chuyển thành an interesting piece of news.' },
        { text: 'He told me some interesting news.', rationale: 'Biến thể dùng some thay cho mạo từ.' }
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "The new informations helped us solve the mystery."',
      options: [],
      acceptedAnswers: [
        { text: 'The new information helped us solve the mystery.', rationale: 'Bỏ đuôi -s của informations vì information là danh từ không đếm được.' }
      ]
    }
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-countable-uncountable-13-o1',
      prompt: 'Viết 2 câu liệt kê những món đồ bạn thường mua khi đi siêu thị (1 câu dùng danh từ đếm được số nhiều và 1 câu dùng danh từ không đếm được kèm cụm từ đo lường như a bottle of/a bottle of/a loaf of).',
      modelAnswer: 'I usually buy three apples and two oranges at the supermarket. I also buy a bottle of cooking oil and a loaf of bread.',
      checks: [
        'Câu 1 sử dụng đúng danh từ đếm được số nhiều có số đếm (apples, oranges).',
        'Câu 2 sử dụng đúng cụm từ đo lường đi kèm danh từ không đếm được (a bottle of..., a loaf of...).'
      ]
    },
    {
      id: 'grammar-v2-a2-countable-uncountable-13-o2',
      prompt: 'Viết 1 câu miêu tả bữa ăn sáng của bạn, kết hợp cả danh từ đếm được và danh từ không đếm được.',
      modelAnswer: 'For breakfast, I usually eat an egg with two slices of bread and drink a cup of coffee.',
      checks: [
        'Kết hợp cả danh từ đếm được (an egg) và danh từ không đếm được với cụm đo lường (two slices of bread, a cup of coffee).',
        'Câu đúng ngữ pháp và chính tả.'
      ]
    }
  ],
  sources: [
    {
      id: 'bc-nouns-countable-uncountable',
      title: 'British Council LearnEnglish: Nouns - countable and uncountable',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/nouns-countable-uncountable',
      claims: ['Countable nouns have singular and plural forms; uncountable nouns cannot be counted and have no plural form.'],
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
