/**
 * @file gerund-after-verbs.ts
 * @description A2 lesson on verbs followed by gerunds (verb + -ing) and gerunds following prepositions.
 */
import type { GrammarLesson } from '../../types.js';

const gerundAfterVerbsLesson: GrammarLesson = {
  id: 'grammar-v2-a2-gerund-after-verbs-25',
  revisionId: 'grammar-v2-a2-gerund-after-verbs-25@1.0.0',
  revision: '1.0.0',
  title: 'Danh động từ sau các động từ thông dụng (Gerunds after Verbs)',
  objective: 'Nhận diện và sử dụng chính xác danh động từ (V-ing) sau các động từ phổ biến (enjoy, finish, avoid, mind, practice, suggest, keep) và sau các giới từ thông dụng.',
  prerequisiteIds: ['grammar-v2-a2-should-advice-24'],
  coverage: ['gerund-after-verbs', 'verb-patterns', 'gerunds', 'ing-forms'],
  context: {
    english: 'Some verbs take a gerund as their complement. A gerund also follows a preposition; distinguish prepositional to (look forward to meeting) from the infinitive marker to (want to meet).',
    vietnamese: 'Một số động từ nhận danh động từ làm bổ ngữ. Sau giới từ dùng danh từ hoặc danh động từ; phân biệt to là giới từ (look forward to meeting) với to là dấu hiệu nguyên mẫu (want to meet).',
  },
  guide: {
    pattern: 'S + Verb (enjoy / finish / avoid / mind / keep / practice / suggest) + V-ing | Preposition + V-ing',
    whenToUse: [
      'Sau các động từ chỉ sở thích và cảm xúc: enjoy, dislike, fancy, feel like + V-ing.',
      'Sau các động từ chỉ sự hoàn thành hoặc tiếp diễn: finish, stop, keep, keep on, give up + V-ing.',
      'Sau các động từ chỉ thái độ và hành vi: avoid, mind, practice, suggest, consider, miss, deny + V-ing.',
      'Sau giới từ dùng danh từ hoặc V-ing: good at, interested in, tired of, before, after, without. Khi to là giới từ, dùng V-ing (look forward to meeting); khi to là dấu hiệu nguyên mẫu, theo sau là động từ nguyên mẫu (want to meet).',
    ],
    signalWords: ['enjoy', 'finish', 'avoid', 'mind', 'practice', 'suggest', 'keep', 'give up', 'good at', 'look forward to'],
    check: [
      'Các động từ bắt buộc dùng V-ing: enjoy, finish, mind, avoid, practice (không dùng to-V: enjoy reading, KHÔNG enjoy to read).',
      'Sau giới từ dùng danh từ hoặc V-ing; phân biệt giới từ to (look forward to meeting) với dấu hiệu nguyên mẫu to (want to meet).',
      'Quy tắc chính tả khi thêm -ing: bỏ -e câm (make -> making, ride -> riding), gấp đôi phụ âm cuối (run -> running, swim -> swimming).',
      'Trong câu phủ định, đặt "not" ngay trước V-ing (She suggested not waiting any longer).',
    ],
  },
  explanation: 'Danh động từ (gerund) là dạng V-ing có thể làm danh từ hoặc bổ ngữ sau một số động từ như enjoy, finish, avoid, mind, practice, keep, suggest. Sau giới từ dùng danh từ hoặc V-ing: Thank you for help; Thank you for helping me. Phân biệt giới từ to trong look forward to meeting với dấu hiệu nguyên mẫu to trong want to meet. Sau giới từ without dùng V-ing (without taking), còn sau dấu hiệu nguyên mẫu to dùng V-bare.',
  examples: [
    {
      english: 'My grandfather enjoys reading historical newspapers on the balcony every morning.',
      vietnamese: 'Ông tôi rất thích đọc báo lịch sử trên ban công vào mỗi buổi sáng.',
    },
    {
      english: 'Have you finished writing your quarterly business report yet?',
      vietnamese: 'Bạn đã hoàn thành việc viết bản báo cáo kinh doanh quý chưa?',
    },
    {
      english: 'You should avoid eating oily street food if your stomach feels sensitive.',
      vietnamese: 'Bạn nên tránh ăn đồ ăn vỉa hè nhiều dầu mỡ nếu dạ dày bạn đang nhạy cảm.',
    },
    {
      english: 'Would you mind closing the window because the outside street is very noisy?',
      vietnamese: 'Bạn có phiền đóng cửa sổ lại không vì đường phố bên ngoài rất ồn ào?',
    },
    {
      english: 'Minh practices speaking English for thirty minutes before going to bed.',
      vietnamese: 'Minh luyện nói tiếng Anh ba mươi phút trước khi đi ngủ.',
    },
    {
      english: 'She left the meeting room quietly without saying a single word.',
      vietnamese: 'Cô ấy rời khỏi phòng họp một cách im lặng mà không nói một lời nào.',
    },
  ],
  contrasts: [
    {
      form: 'We finished cleaning the entire house before our guests arrived.',
      whyFits: 'Finish là động từ chỉ sự hoàn tất, bắt buộc theo sau bởi danh động từ cleaning.',
      whyNot: '"We finished to clean the house..." sai vì finish không bao giờ kết hợp với to-infinitive.',
    },
    {
      form: 'Lan is very good at solving difficult algebraic puzzles.',
      whyFits: 'At là giới từ; sau giới từ dùng danh từ hoặc V-ing (solving).',
      whyNot: '"Lan is very good at solve..." hay "at to solve" đều vi phạm quy tắc giới từ đi với V-ing.',
    },
  ],
  commonMistakes: [
    'Dùng to-infinitive sau enjoy hoặc finish (viết "I enjoy to listen to music" thay vì "enjoy listening").',
    'Dùng V-bare trực tiếp sau giới từ thay vì danh từ/V-ing: ví dụ, “Thank you for help me” thay vì “Thank you for helping me”.',
    'Sai chính tả khi thêm đuôi -ing (viết "makeing" thay vì "making", hoặc "swimmin" thay vì "swimming").',
  ],
  summary: 'Các động từ enjoy, finish, avoid, mind, practice, keep, suggest thường đi với V-ing. Sau giới từ dùng danh từ hoặc V-ing; giới từ to + V-ing (look forward to meeting) khác với to-infinitive (want to meet).',
  exercises: [
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q1',
      kind: 'choice',
      prompt: 'Select the correct verb pattern: "My children really enjoy ___ sandcastles on the beach."',
      options: [
        { text: 'building', correct: true, rationale: 'Enjoy bắt buộc đi kèm danh động từ V-ing (building).' },
        { text: 'to build', correct: false, rationale: 'Enjoy không đi kèm động từ nguyên mẫu có to.' },
        { text: 'build', correct: false, rationale: 'Enjoy không đi trực tiếp với động từ nguyên mẫu không to.' },
        { text: 'built', correct: false, rationale: 'Built là quá khứ phân từ, không đóng vai trò tân ngữ của enjoy.' },
      ],
      acceptedAnswers: [{ text: 'building', rationale: 'Enjoy requires the gerund building as its direct object.' }],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q2',
      kind: 'choice',
      prompt: 'Select the correct form after the verb "mind": "Do you mind ___ your voice down? The baby is sleeping."',
      options: [
        { text: 'keeping', correct: true, rationale: 'Mind luôn đi cùng danh động từ V-ing (keeping).' },
        { text: 'to keep', correct: false, rationale: 'Mind không đi cùng to-infinitive.' },
        { text: 'keep', correct: false, rationale: 'Mind không đi cùng động từ nguyên mẫu không to.' },
        { text: 'kept', correct: false, rationale: 'Kept là thì quá khứ, không phù hợp sau do you mind.' },
      ],
      acceptedAnswers: [{ text: 'keeping', rationale: 'Mind requires a gerund complement: keeping.' }],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q3',
      kind: 'choice',
      prompt: 'Choose the correct form after a preposition: "She walked five kilometers in the rain without ___ an umbrella."',
      options: [
        { text: 'taking', correct: true, rationale: 'Without là giới từ nên theo sau bởi danh từ hoặc V-ing; ở đây dùng taking.' },
        { text: 'to take', correct: false, rationale: 'Ở đây without là giới từ, không phải dấu hiệu nguyên mẫu to.' },
        { text: 'take', correct: false, rationale: 'Sau without ở đây dùng danh từ hoặc V-ing, không dùng động từ nguyên mẫu trần.' },
        { text: 'took', correct: false, rationale: 'Took là thì quá khứ, không dùng sau giới từ.' },
      ],
      acceptedAnswers: [{ text: 'taking', rationale: 'Prepositions such as without must be followed by a gerund: taking.' }],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q4',
      kind: 'choice',
      prompt: 'Select the correct form: "To stay healthy, you should avoid ___ sugary drinks every day."',
      options: [
        { text: 'consuming', correct: true, rationale: 'Avoid đòi hỏi danh động từ V-ing (consuming, bỏ -e câm khi thêm -ing).' },
        { text: 'to consume', correct: false, rationale: 'Avoid không đi cùng to-infinitive.' },
        { text: 'consume', correct: false, rationale: 'Không dùng động từ nguyên thể không to sau avoid.' },
        { text: 'consumed', correct: false, rationale: 'Consumed là quá khứ phân từ, không phù hợp.' },
      ],
      acceptedAnswers: [{ text: 'consuming', rationale: 'Avoid requires a gerund: consuming.' }],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "do": "Have you finished _____ your homework yet?"',
      options: [],
      acceptedAnswers: [
        { text: 'doing', rationale: 'Finish requires the gerund doing.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "play": "Nam practices _____ the violin for forty minutes every evening."',
      options: [],
      acceptedAnswers: [
        { text: 'playing', rationale: 'Practice requires the gerund playing.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "learn": "My sister is very interested in _____ Spanish before her trip to Madrid."',
      options: [],
      acceptedAnswers: [
        { text: 'learning', rationale: 'Preposition in must be followed by the gerund learning.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "make": "The doctor suggested _____ some changes to her daily diet."',
      options: [],
      acceptedAnswers: [
        { text: 'making', rationale: 'Suggest is followed by the gerund making (drop silent -e).' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q9',
      kind: 'transform',
      prompt: 'Rewrite using "enjoy": "Lan likes reading English books in her free time very much."',
      options: [],
      acceptedAnswers: [
        { text: 'Lan enjoys reading English books in her free time.', rationale: 'Replaces likes...very much with enjoys reading.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q10',
      kind: 'transform',
      prompt: 'Rewrite using "good at": "Phong plays badminton with great skill."',
      options: [],
      acceptedAnswers: [
        { text: 'Phong is good at playing badminton.', rationale: 'Converts skill description into prepositional phrase good at + gerund playing.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "I really enjoy to travel to different countries during summer vacation."',
      options: [],
      acceptedAnswers: [
        { text: 'I really enjoy traveling to different countries during summer vacation.', rationale: 'Changes to travel to gerund traveling after enjoy.' },
        { text: 'I really enjoy travelling to different countries during summer vacation.', rationale: 'British spelling travelling is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Thank you so much for help me with the heavy grocery bags."',
      options: [],
      acceptedAnswers: [
        { text: 'Thank you so much for helping me with the heavy grocery bags.', rationale: 'Changes bare verb help to gerund helping after preposition for.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-r1',
      kind: 'choice',
      prompt: 'Choose the correct form: "We are all looking forward to ___ you at the company conference."',
      options: [
        { text: 'seeing', correct: true, rationale: 'Look forward to là cụm giới từ (to là giới từ), bắt buộc theo sau bởi V-ing (seeing).' },
        { text: 'see', correct: false, rationale: 'See là động từ nguyên mẫu, không đứng sau giới từ to trong look forward to.' },
        { text: 'saw', correct: false, rationale: 'Saw là thì quá khứ, không phù hợp.' },
      ],
      acceptedAnswers: [{ text: 'seeing', rationale: 'In look forward to, to is a preposition requiring the gerund seeing.' }],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "watch": "He gave up _____ late-night television so that he could get enough sleep."',
      options: [],
      acceptedAnswers: [
        { text: 'watching', rationale: 'Phrasal verb gave up ends in preposition up, followed by gerund watching.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-r3',
      kind: 'transform',
      prompt: 'Rewrite using "mind": "Please do not smoke in this non-smoking room." (Rewrite starting with "Would you mind...")',
      options: [],
      acceptedAnswers: [
        { text: 'Would you mind not smoking in this non-smoking room?', rationale: 'Uses polite negative gerund pattern Would you mind not smoking.' },
        { text: 'Do you mind not smoking in this non-smoking room?', rationale: 'Alternative with Do you mind is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-r4',
      kind: 'correction',
      prompt: 'Correct the error: "He decided to leave the office without tell anyone."',
      options: [],
      acceptedAnswers: [
        { text: 'He decided to leave the office without telling anyone.', rationale: 'Replaces bare verb tell with gerund telling after preposition without.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-o1',
      prompt: 'Viết 2 câu chia sẻ về các sở thích lúc rảnh rỗi của bạn, sử dụng động từ "enjoy" hoặc "fancy" đi kèm danh động từ (V-ing).',
      modelAnswer: 'In my free time, I really enjoy cooking traditional Vietnamese dishes for my family. I also practice baking banana bread on weekends.',
      checks: [
        'Sử dụng đúng động từ enjoy / practice đi kèm danh động từ V-ing (cooking, baking).',
        'Động từ V-ing đúng chính tả.',
        'Ngữ pháp chuẩn xác, câu văn tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-a2-gerund-after-verbs-25-o2',
      prompt: 'Viết 2 câu về một kỹ năng bạn đang học, dùng cấu trúc "interested in" hoặc "good at" đi kèm danh động từ sau giới từ.',
      modelAnswer: 'I am very interested in learning Spanish because I want to travel to South America next year. My friend is already good at speaking conversational Spanish.',
      checks: [
        'Dùng danh động từ V-ing sau giới từ (interested in learning / good at speaking).',
        'Đúng chính tả và cấu trúc câu.',
        'Nội dung mạch lạc, phù hợp trình độ A2.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-verbs-gerunds',
      title: 'British Council: Verbs followed by -ing forms',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/verbs-followed-ing-or-infinitive',
      claims: [
        'Certain verbs are followed by gerunds (such as enjoy, avoid, finish, mind, practice).',
        'When to is a preposition, it is followed by a noun or gerund; distinguish it from the infinitive marker to (e.g. look forward to meeting vs want to meet).',
        'Gerunds describe actions or activities and function grammatically like nouns.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit west',
    reviewedAt: '2026-10-06T05:54:31Z',
  },
};

export default gerundAfterVerbsLesson;
