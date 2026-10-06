/**
 * @file few-and-little.ts
 * @description A2 lesson on quantifiers 'few', 'a few', 'little', and 'a little'.
 */
import type { GrammarLesson } from '../../types.js';

const fewAndLittleLesson: GrammarLesson = {
  id: 'grammar-v2-a2-few-and-little-16',
  revisionId: 'grammar-v2-a2-few-and-little-16@1.0.0',
  revision: '1.0.0',
  title: 'Lượng từ Few, A Few, Little và A Little (Few, A Few, Little, and A Little)',
  objective: 'Phân biệt chính xác few/a few với danh từ đếm được số nhiều và little/a little với danh từ không đếm được, nắm vững sắc thái tích cực và tiêu cực.',
  prerequisiteIds: ['grammar-v2-a2-much-and-many-15'],
  coverage: ['few-and-little', 'quantifiers', 'countable-uncountable', 'a-few-vs-few', 'a-little-vs-little'],
  context: {
    english: 'In daily conversations, "a few" and "a little" express a positive small quantity (some, enough), while "few" and "little" emphasize scarcity or absence (almost none).',
    vietnamese: 'Trong giao tiếp thường ngày, "a few" và "a little" diễn tả số lượng nhỏ mang tính tích cực (có một ít, đủ dùng), còn "few" và "little" nhấn mạnh sự khan hiếm hoặc thiếu hụt (hầu như không có).',
  },
  guide: {
    pattern: 'a few / few + plural countable noun | a little / little + uncountable noun',
    whenToUse: [
      'Dùng "a few" với danh từ đếm được số nhiều; thường gợi ý vẫn còn/có một số lượng nhỏ, nhưng không nhất thiết đủ dùng.',
      'Dùng "few" với danh từ đếm được số nhiều; thường nhấn mạnh số lượng nhỏ hoặc thiếu, tùy ngữ cảnh.',
      'Dùng "a little" với danh từ không đếm được; thường nhấn mạnh vẫn còn/có một lượng nhỏ, nhưng lượng đó có thể chưa đủ.',
      'Dùng "little" với danh từ không đếm được; thường nhấn mạnh lượng nhỏ hoặc thiếu, tùy ngữ cảnh.',
    ],
    signalWords: ['a few', 'few', 'a little', 'little', 'very few', 'very little', 'only a few', 'only a little'],
    check: [
      'Danh từ theo sau là đếm được số nhiều (chọn few/a few) hay không đếm được (chọn little/a little)?',
      'Xét ngữ cảnh để chọn sắc thái: a few/a little thường trình bày lượng nhỏ như vẫn còn; few/little thường nhấn mạnh thiếu hụt.',
      'Sau a few/few, danh từ đã thêm s/es chưa?',
    ],
  },
  explanation: 'Few/a few đi với danh từ đếm được số nhiều (friends, books, days); little/a little đi với danh từ không đếm được (water, money, time). A few/a little thường trình bày một lượng nhỏ như vẫn còn/có một ít; few/little thường nhấn mạnh lượng quá ít hoặc gần như không có. Đây là sắc thái theo ngữ cảnh, không phải lượng “đủ dùng” cố định: a little time can still be too little for a task, and few people can simply report a small number.',
  examples: [
    {
      english: 'Do not worry, we still have a few minutes before the train departs.',
      vietnamese: 'Đừng lo, chúng ta vẫn còn một vài phút trước khi tàu khởi hành.',
    },
    {
      english: 'There is a little milk left in the bottle, enough for breakfast.',
      vietnamese: 'Còn một ít sữa trong chai, đủ dùng cho bữa sáng.',
    },
    {
      english: 'Very few people attended the outdoor concert because of heavy rain.',
      vietnamese: 'Rất ít người tham dự buổi hòa nhạc ngoài trời vì mưa lớn.',
    },
    {
      english: 'The patient had little hope of recovering without immediate surgery.',
      vietnamese: 'Bệnh nhân hầu như không có hy vọng hồi phục nếu không phẫu thuật ngay.',
    },
    {
      english: 'We can buy some snacks because I still have a little cash.',
      vietnamese: 'Chúng ta có thể mua chút đồ ăn vặt vì tôi vẫn còn một ít tiền mặt.',
    },
    {
      english: 'Few tourists visit this quiet fishing village during the rainy season.',
      vietnamese: 'Rất ít khách du lịch ghé thăm làng chài yên tĩnh này trong mùa mưa.',
    },
  ],
  contrasts: [
    {
      form: 'I have a few close friends in Da Nang, so I visit them often.',
      whyFits: '"A few friends" mang nghĩa tích cực (có vài người bạn), phù hợp với việc thường xuyên ghé thăm.',
      whyNot: '"I have few friends..." mang sắc thái cô đơn, thiếu thốn; không ăn khớp với vế câu nói về sự vui vẻ gặp gỡ.',
    },
    {
      form: 'There is a little water in the flask; you can have a drink.',
      whyFits: '"A little water" thể hiện còn một lượng nước vừa đủ để mời người khác uống một ngụm.',
      whyNot: '"There is little water" có nghĩa bình nước gần cạn kiệt, không phù hợp cho một lời mời uống nước.',
    },
  ],
  commonMistakes: [
    'Dùng little hoặc a little với danh từ đếm được số nhiều (viết "a little books" thay vì "a few books").',
    'Bỏ mất mạo từ "a" khi muốn diễn đạt ý tích cực (viết "I have few money" thay vì "I have a little money").',
    'Dùng few với danh từ không đếm được (viết "few time" thay vì "little time").',
  ],
  summary: 'A few/few + danh từ đếm được số nhiều; A little/little + danh từ không đếm được. Có "a" mang nghĩa tích cực (còn một ít, đủ dùng); không có "a" mang nghĩa tiêu cực (quá ít, hầu như không có).',
  exercises: [
    {
      id: 'grammar-v2-a2-few-and-little-16-q1',
      kind: 'choice',
      prompt: 'Select the correct quantifier: "Relax, we still have ___ minutes before the movie starts."',
      options: [
        { text: 'a few', correct: true, rationale: 'Minutes là danh từ đếm được số nhiều; ngữ cảnh thư giãn chỉ còn một ít thời gian đủ dùng (tích cực).' },
        { text: 'few', correct: false, rationale: 'Few mang nghĩa quá ít, thiếu thốn, không hợp với lời khuyên Relax.' },
        { text: 'a little', correct: false, rationale: 'A little chỉ dùng với danh từ không đếm được, không đi với minutes.' },
        { text: 'little', correct: false, rationale: 'Little không đi với danh từ đếm được số nhiều minutes.' },
      ],
      acceptedAnswers: [{ text: 'a few', rationale: 'Minutes is a plural countable noun and the positive context requires a few.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q2',
      kind: 'choice',
      prompt: 'Choose the correct word: "Unfortunately, the drought-stricken village has ___ clean drinking water."',
      options: [
        { text: 'little', correct: true, rationale: 'Water là danh từ không đếm được; unfortunately chỉ sự thiếu thốn nghiêm trọng (tiêu cực).' },
        { text: 'a little', correct: false, rationale: 'A little mang nghĩa tích cực (vẫn có đủ), trái ngược với từ unfortunately.' },
        { text: 'few', correct: false, rationale: 'Few không dùng với danh từ không đếm được water.' },
        { text: 'a few', correct: false, rationale: 'A few chỉ dùng với danh từ đếm được số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'little', rationale: 'Water is uncountable and the negative outcome requires little.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q3',
      kind: 'choice',
      prompt: 'Select the right phrase: "Can you please lend me ___ sugar for my tea recipe?"',
      options: [
        { text: 'a little', correct: true, rationale: 'Sugar là danh từ không đếm được; lời nhờ mượn một lượng nhỏ tích cực dùng a little.' },
        { text: 'little', correct: false, rationale: 'Little mang nghĩa gần như không có, không hợp khi muốn mượn ai đó.' },
        { text: 'a few', correct: false, rationale: 'A few không dùng với danh từ không đếm được sugar.' },
        { text: 'few', correct: false, rationale: 'Few chỉ đi với danh từ đếm được số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'a little', rationale: 'Sugar is uncountable and a positive small amount requires a little.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q4',
      kind: 'choice',
      prompt: 'Choose the correct option: "Sadly, ___ tourists visit this remote museum in winter."',
      options: [
        { text: 'few', correct: true, rationale: 'Tourists là danh từ đếm được số nhiều; từ sadly báo hiệu sự vắng vẻ, hiếm hoi (tiêu cực).' },
        { text: 'a few', correct: false, rationale: 'A few mang nghĩa có một số lượng nhỏ tích cực, không hợp với sadly.' },
        { text: 'little', correct: false, rationale: 'Little không đi với danh từ số nhiều tourists.' },
        { text: 'a little', correct: false, rationale: 'A little không đi với danh từ đếm được số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'few', rationale: 'Tourists is plural countable and sadly indicates negative scarcity.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "few" or "little": "Could I please have a _____ (few / little) warm water?"',
      options: [],
      acceptedAnswers: [{ text: 'little', rationale: 'Water là danh từ không đếm được, dùng a little.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with "few" or "little": "She can speak a _____ (few / little) basic phrases in Japanese."',
      options: [],
      acceptedAnswers: [{ text: 'few', rationale: 'Phrases là danh từ đếm được số nhiều, dùng a few.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with "few" or "little": "The busy chef has very _____ (few / little) patience for careless mistakes."',
      options: [],
      acceptedAnswers: [{ text: 'little', rationale: 'Patience là danh từ không đếm được, dùng very little.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with "few" or "little": "There are only a _____ (few / little) fresh apples remaining on the plate."',
      options: [],
      acceptedAnswers: [{ text: 'few', rationale: 'Apples là danh từ đếm được số nhiều, dùng only a few.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q9',
      kind: 'transform',
      prompt: 'Rewrite using "a little": "We still have some petrol left, so we can reach the next town."',
      options: [],
      acceptedAnswers: [
        { text: 'We still have a little petrol left, so we can reach the next town.', rationale: 'Replaces some with a little for uncountable noun petrol.' },
      ],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q10',
      kind: 'transform',
      prompt: 'Rewrite using "Few": "Hardly any students passed the extremely difficult test."',
      options: [],
      acceptedAnswers: [
        { text: 'Few students passed the extremely difficult test.', rationale: 'Replaces hardly any students with Few students.' },
      ],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "I have a little colleagues who live near my apartment."',
      options: [],
      acceptedAnswers: [
        { text: 'I have a few colleagues who live near my apartment.', rationale: 'Replaces a little with a few for plural noun colleagues.' },
      ],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "There is few petrol in the scooter, so we cannot go far."',
      options: [],
      acceptedAnswers: [
        { text: 'There is little petrol in the scooter, so we cannot go far.', rationale: 'Replaces few with little for uncountable noun petrol.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-few-and-little-16-r1',
      kind: 'choice',
      prompt: 'Choose the correct option: "The shy boy said very ___ words throughout the entire evening."',
      options: [
        { text: 'few', correct: true, rationale: 'Words là danh từ đếm được số nhiều; very few nhấn mạnh hầu như không nói từ nào.' },
        { text: 'a few', correct: false, rationale: 'Very a few là sai ngữ pháp trong tiếng Anh.' },
        { text: 'little', correct: false, rationale: 'Little không đi với danh từ số nhiều words.' },
      ],
      acceptedAnswers: [{ text: 'few', rationale: 'Words is plural countable, modified by very few.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with "few" or "little": "Please add a _____ (few / little) salt to make the soup tastier."',
      options: [],
      acceptedAnswers: [{ text: 'little', rationale: 'Salt là danh từ không đếm được, dùng a little.' }],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-r3',
      kind: 'transform',
      prompt: 'Rewrite using "little": "She has almost no experience in graphic design."',
      options: [],
      acceptedAnswers: [
        { text: 'She has little experience in graphic design.', rationale: 'Replaces almost no experience with little experience.' },
      ],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-r4',
      kind: 'correction',
      prompt: 'Correct the error: "We only need a few advice from the senior teacher."',
      options: [],
      acceptedAnswers: [
        { text: 'We only need a little advice from the senior teacher.', rationale: 'Replaces a few with a little because advice is uncountable.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-few-and-little-16-o1',
      prompt: 'Viết 2 câu kể về việc chuẩn bị nấu ăn, dùng "a little" cho gia vị/nước dùng và "a few" cho rau củ hoặc trái cây.',
      modelAnswer: 'I will add a little olive oil to the warm frying pan. Then I plan to slice a few red tomatoes for the salad.',
      checks: [
        'Dùng a little với danh từ không đếm được (oil/sauce/salt).',
        'Dùng a few với danh từ đếm được số nhiều (tomatoes/onions/vegetables).',
        'Câu văn thể hiện ý định nấu nướng rõ ràng, tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-a2-few-and-little-16-o2',
      prompt: 'Viết 2 câu chia sẻ về việc chuyển đến một thành phố mới, dùng "few" (ít bạn bè) và "a little" (chút thời gian/tiền bạc) để diễn tả cảm xúc.',
      modelAnswer: 'When I first moved to Hue, I had few friends and felt quite lonely. Fortunately, I had a little money to support my daily life.',
      checks: [
        'Dùng few với danh từ đếm được số nhiều mang nghĩa tiêu cực (few friends).',
        'Dùng a little với danh từ không đếm được mang nghĩa còn một lượng nhỏ (a little money/time).',
        'Diễn đạt trôi chảy, đúng ngữ pháp.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-few-little',
      title: 'British Council: Little, a little, few, a few',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/little-few',
      claims: [
        'A few and few are used with plural countable nouns; a little and little are used with uncountable nouns.',
        'A few and a little often present a small amount as available; sufficiency depends on context.',
        'Few and little without an article convey a negative sense indicating scarcity or hardly any.',
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

export default fewAndLittleLesson;
