/**
 * @file much-and-many.ts
 * @description A2 lesson on quantifiers 'much' and 'many' with uncountable and plural countable nouns.
 */
import type { GrammarLesson } from '../../types.js';

const muchAndManyLesson: GrammarLesson = {
  id: 'grammar-v2-a2-much-and-many-15',
  revisionId: 'grammar-v2-a2-much-and-many-15@1.0.0',
  revision: '1.0.0',
  title: 'Lượng từ Much và Many (Much and Many with Uncountable and Plural Nouns)',
  objective: 'Phân biệt và sử dụng chính xác much với danh từ không đếm được và many với danh từ đếm được số nhiều trong câu hỏi, phủ định và khẳng định.',
  prerequisiteIds: ['grammar-v2-a2-some-and-any-14'],
  coverage: ['much-and-many', 'quantifiers', 'countable-uncountable', 'determiners'],
  context: {
    english: 'In daily conversation, we use "much" with uncountable nouns and "many" with plural countable nouns, especially in negative statements and questions.',
    vietnamese: 'Trong giao tiếp hằng ngày, ta dùng "much" với danh từ không đếm được và "many" với danh từ đếm được số nhiều, đặc biệt là trong câu phủ định và câu hỏi.',
  },
  guide: {
    pattern: 'much + uncountable noun | many + plural countable noun | How much...? / How many...?',
    whenToUse: [
      'Dùng "much" với danh từ không đếm được (water, time, money, luggage) chủ yếu trong câu phủ định và câu hỏi.',
      'Dùng "many" với danh từ đếm được số nhiều trong câu hỏi và phủ định; cũng dùng được trong câu khẳng định, nhất là văn phong trang trọng hoặc khi nhấn mạnh (trong hội thoại thường dùng a lot of).',
      'Dùng "How much" để hỏi giá cả hoặc lượng không đếm được; dùng "How many" để hỏi số lượng đếm được.',
    ],
    signalWords: ['much', 'many', 'how much', 'how many', 'so much', 'too many', 'not much', 'not many'],
    check: [
      'Danh từ đi sau là không đếm được (dùng much) hay đếm được số nhiều (dùng many)?',
      'Đã chia động từ số ít với much và số nhiều với many chưa?',
      'Câu hỏi về giá cả hoặc chất lỏng có dùng "How much" không?',
    ],
  },
  explanation: 'Much và many đi với các danh từ theo cách chúng được dùng trong câu: much với danh từ mang nghĩa không đếm được (milk, information, traffic, advice, time, money), many với danh từ đếm được số nhiều (students, days, problems, apples). Một danh từ có thể đổi cách đếm theo nghĩa (coffee nói chung / two coffees). Trong văn nói thân mật, much ít đứng một mình trong câu khẳng định, thường được thay bằng a lot of; much phổ biến hơn trong câu phủ định và nghi vấn. How much hỏi lượng không đếm được hoặc giá cả, còn How many hỏi số lượng đếm được.',
  examples: [
    {
      english: 'I do not have much free time during weekdays.',
      vietnamese: 'Tôi không có nhiều thời gian rảnh trong các ngày trong tuần.',
    },
    {
      english: 'How many students are there in your English class?',
      vietnamese: 'Có bao nhiêu học viên trong lớp học tiếng Anh của bạn?',
    },
    {
      english: 'There isn’t much milk left in the refrigerator.',
      vietnamese: 'Không còn lại nhiều sữa trong tủ lạnh.',
    },
    {
      english: 'She has many creative ideas for the school project.',
      vietnamese: 'Cô ấy có nhiều ý tưởng sáng tạo cho dự án trường học.',
    },
    {
      english: 'How much does this warm winter jacket cost?',
      vietnamese: 'Chiếc áo khoác mùa đông ấm áp này giá bao nhiêu tiền?',
    },
    {
      english: 'We did not take many photographs during our vacation.',
      vietnamese: 'Chúng tôi không chụp nhiều ảnh trong suốt kỳ nghỉ của mình.',
    },
  ],
  contrasts: [
    {
      form: 'There is not much luggage in the taxi.',
      whyFits: 'Luggage là danh từ không đếm được, đòi hỏi lượng từ much và động từ số ít is not.',
      whyNot: '"There are not many luggage" sai vì luggage không có hình thái số nhiều và không đi với many.',
    },
    {
      form: 'How much coffee do you drink every morning?',
      whyFits: 'Coffee ở dạng chung là chất lỏng không đếm được, dùng How much để hỏi khối lượng.',
      whyNot: '"How many coffee do you drink" sai vì coffee nguyên khối không đếm được trực tiếp nếu thiếu đơn vị đếm (như cups of coffee).',
    },
  ],
  commonMistakes: [
    'Dùng much với danh từ đếm được số nhiều (viết "much people" thay vì "many people").',
    'Dùng many với danh từ không đếm được (viết "many luggage" hay "many information").',
    'Chia sai trợ động từ số nhiều với much (viết "There aren’t much water" thay vì "There isn’t much water").',
  ],
  summary: 'Much + danh từ không đếm được (thời gian, tiền bạc, nước); many + danh từ đếm được số nhiều (người, sách vở, ngày). How much hỏi giá cả và khối lượng; How many hỏi số lượng cá thể.',
  exercises: [
    {
      id: 'grammar-v2-a2-much-and-many-15-q1',
      kind: 'choice',
      prompt: 'Select the correct quantifier: "We do not have ___ petrol left in the tank; let us stop soon."',
      options: [
        { text: 'much', correct: true, rationale: 'Petrol là danh từ không đếm được, dùng much trong câu phủ định.' },
        { text: 'many', correct: false, rationale: 'Many chỉ dùng với danh từ đếm được số nhiều, không đi với petrol.' },
        { text: 'few', correct: false, rationale: 'Few đi với danh từ số nhiều, không kết hợp với petrol.' },
        { text: 'a few', correct: false, rationale: 'A few đi với danh từ đếm được số nhiều, không dùng cho chất lỏng như petrol.' },
      ],
      acceptedAnswers: [{ text: 'much', rationale: 'Petrol is an uncountable noun requiring much in negative statements.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q2',
      kind: 'choice',
      prompt: 'Choose the correct question word: "How ___ foreign languages can you speak fluently?"',
      options: [
        { text: 'many', correct: true, rationale: 'Languages là danh từ đếm được số nhiều nên dùng How many để hỏi số lượng.' },
        { text: 'much', correct: false, rationale: 'Much không đi với danh từ đếm được số nhiều languages.' },
        { text: 'little', correct: false, rationale: 'Little là lượng từ chỉ số ít, không dùng sau How để tạo câu hỏi số lượng đếm được.' },
        { text: 'any', correct: false, rationale: 'How any không phải là cụm từ để hỏi số lượng trong tiếng Anh.' },
      ],
      acceptedAnswers: [{ text: 'many', rationale: 'Languages is a plural countable noun, requiring How many.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q3',
      kind: 'choice',
      prompt: 'Choose the correct word: "There is not ___ traffic on the highway this Sunday morning."',
      options: [
        { text: 'much', correct: true, rationale: 'Traffic là danh từ không đếm được, dùng much và động từ số ít is not.' },
        { text: 'many', correct: false, rationale: 'Traffic không đếm được nên không thể đi với many.' },
        { text: 'several', correct: false, rationale: 'Several đi với danh từ đếm được số nhiều, không đi với traffic.' },
        { text: 'a few', correct: false, rationale: 'A few chỉ dùng với danh từ đếm được số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'much', rationale: 'Traffic is uncountable, so much is required.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q4',
      kind: 'choice',
      prompt: 'Select the right word: "Did the manager invite ___ colleagues to the annual dinner?"',
      options: [
        { text: 'many', correct: true, rationale: 'Colleagues là danh từ đếm được số nhiều, dùng many trong câu hỏi.' },
        { text: 'much', correct: false, rationale: 'Colleagues là danh từ đếm được nên không dùng much.' },
        { text: 'little', correct: false, rationale: 'Little đi với danh từ không đếm được, không dùng cho colleagues.' },
        { text: 'a little', correct: false, rationale: 'A little chỉ dùng với danh từ không đếm được.' },
      ],
      acceptedAnswers: [{ text: 'many', rationale: 'Colleagues is a plural countable noun, requiring many.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "much" or "many": "How _____ sugar do you take in your coffee?"',
      options: [],
      acceptedAnswers: [{ text: 'much', rationale: 'Sugar là danh từ không đếm được, câu hỏi dùng How much.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with "much" or "many": "There were not _____ empty seats on the commuter train."',
      options: [],
      acceptedAnswers: [{ text: 'many', rationale: 'Seats là danh từ đếm được số nhiều, dùng many trong câu phủ định.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with "much" or "many": "He does not spend _____ money on designer clothes."',
      options: [],
      acceptedAnswers: [{ text: 'much', rationale: 'Money là danh từ không đếm được, dùng much.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with "much" or "many": "How _____ days will you stay in Da Nang for your holiday?"',
      options: [],
      acceptedAnswers: [{ text: 'many', rationale: 'Days là danh từ đếm được số nhiều, dùng How many.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q9',
      kind: 'transform',
      prompt: 'Rewrite the question using "many": "Are there a lot of tourists in Hoi An today?"',
      options: [],
      acceptedAnswers: [
        { text: 'Are there many tourists in Hoi An today?', rationale: 'Replaces a lot of with many for plural noun tourists.' },
      ],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q10',
      kind: 'transform',
      prompt: 'Rewrite using "much": "We do not have a lot of furniture in our new apartment."',
      options: [],
      acceptedAnswers: [
        { text: 'We do not have much furniture in our new apartment.', rationale: 'Replaces a lot of with much for uncountable noun furniture.' },
        { text: "We don't have much furniture in our new apartment.", rationale: "Contraction don't with much furniture is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "How many money did you spend on your new smartphone?"',
      options: [],
      acceptedAnswers: [
        { text: 'How much money did you spend on your new smartphone?', rationale: 'Changes many to much because money is an uncountable noun.' },
      ],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "There was not many information about the bus schedule online."',
      options: [],
      acceptedAnswers: [
        { text: 'There was not much information about the bus schedule online.', rationale: 'Replaces many with much for uncountable noun information.' },
        { text: "There wasn't much information about the bus schedule online.", rationale: "Contraction wasn't with much information is accepted." },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-much-and-many-15-r1',
      kind: 'choice',
      prompt: 'Choose the correct word: "Why are there so ___ dirty dishes in the kitchen sink?"',
      options: [
        { text: 'many', correct: true, rationale: 'Dishes là danh từ đếm được số nhiều, kết hợp với so many.' },
        { text: 'much', correct: false, rationale: 'Much không kết hợp với danh từ đếm được số nhiều dishes.' },
        { text: 'a little', correct: false, rationale: 'A little chỉ dùng với danh từ không đếm được.' },
      ],
      acceptedAnswers: [{ text: 'many', rationale: 'Dishes is plural countable, requiring so many.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with "much" or "many": "I do not have _____ patience when waiting in long lines."',
      options: [],
      acceptedAnswers: [{ text: 'much', rationale: 'Patience là danh từ không đếm được, dùng much.' }],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-r3',
      kind: 'transform',
      prompt: 'Rewrite using "many": "She did not make a lot of mistakes in the listening test."',
      options: [],
      acceptedAnswers: [
        { text: 'She did not make many mistakes in the listening test.', rationale: 'Replaces a lot of with many for plural noun mistakes.' },
        { text: "She didn't make many mistakes in the listening test.", rationale: "Contraction didn't with many mistakes is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-r4',
      kind: 'correction',
      prompt: 'Correct the error: "There is not many time left before our flight departs."',
      options: [],
      acceptedAnswers: [
        { text: 'There is not much time left before our flight departs.', rationale: 'Changes many to much because time is uncountable.' },
        { text: "There isn't much time left before our flight departs.", rationale: "Contraction isn't with much time is accepted." },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-much-and-many-15-o1',
      prompt: 'Viết 2 câu hỏi thăm một người bạn về công việc hằng ngày, dùng "How much" hỏi về thời gian/công việc và "How many" hỏi về nhiệm vụ/cuộc họp.',
      modelAnswer: 'How much time do you spend answering emails each morning? How many meetings do you usually have on Mondays?',
      checks: [
        'Dùng How much đi kèm danh từ không đếm được (time/work).',
        'Dùng How many đi kèm danh từ đếm được số nhiều (meetings/tasks/emails).',
        'Đặt câu hỏi ngữ pháp chuẩn xác với trợ động từ do/does.',
      ],
    },
    {
      id: 'grammar-v2-a2-much-and-many-15-o2',
      prompt: 'Viết 2 câu miêu tả chuyến du lịch của bạn, dùng "not much" cho hành lý/tiền bạc và "many" cho trải nghiệm/địa điểm.',
      modelAnswer: 'I did not bring much luggage on the short weekend trip. However, we visited many historical places around the ancient town.',
      checks: [
        'Dùng not much với danh từ không đếm được (luggage/money/cash).',
        'Dùng many với danh từ đếm được số nhiều (places/photos/friends).',
        'Câu văn mạch lạc, đúng thì và ngữ cảnh giao tiếp.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-much-many',
      title: 'British Council: Much, many, a lot of',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/much-many-lot',
      claims: [
        'Much is used with uncountable nouns, primarily in questions and negative statements.',
        'Many is used with plural countable nouns in all sentence types.',
        'How much asks about quantity of uncountable nouns and prices; How many asks about countable numbers.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit east',
    reviewedAt: '2026-10-06T05:55:07.025Z',
  },
};

export default muchAndManyLesson;
