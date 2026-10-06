/**
 * @file adjective-vs-adverb.ts
 * @description A2 lesson on distinguishing adjectives and adverbs of manner, including irregular forms.
 */
import type { GrammarLesson } from '../../types.js';

const adjectiveVsAdverbLesson: GrammarLesson = {
  id: 'grammar-v2-a2-adjective-vs-adverb-20',
  revisionId: 'grammar-v2-a2-adjective-vs-adverb-20@1.0.0',
  revision: '1.0.0',
  title: 'Tính từ và trạng từ chỉ cách thức (Adjectives vs. Adverbs of Manner)',
  objective: 'Phân biệt chính xác vị trí và chức năng của tính từ (bổ nghĩa cho danh từ, đứng sau linking verbs) và trạng từ chỉ cách thức (bổ nghĩa cho động từ hành động), nhận diện các dạng bất quy tắc (good/well, fast, hard, late).',
  prerequisiteIds: ['grammar-v2-a2-as-as-comparison-19'],
  coverage: ['adjective-vs-adverb', 'parts-of-speech', 'adverbs-of-manner', 'irregular-adverbs'],
  context: {
    english: 'We use adjectives to describe nouns or follow linking verbs, while adverbs of manner tell us how an action is performed, modifying action verbs.',
    vietnamese: 'Chúng ta dùng tính từ để miêu tả danh từ hoặc đứng sau các liên động từ, trong khi trạng từ chỉ cách thức diễn tả hành động diễn ra như thế nào, bổ nghĩa cho động từ hành động.',
  },
  guide: {
    pattern: 'Adjective + Noun | Linking verb + Adjective | Action verb + Adverb (often -ly) | Irregular: well / fast / hard / late',
    whenToUse: [
      'Dùng tính từ trước danh từ (a careful driver) hoặc sau động từ nối be, look, seem, feel, smell, taste, sound (She looks happy).',
      'Dùng trạng từ chỉ cách thức để mô tả cách hành động diễn ra (He drives carefully).',
      'Hầu hết trạng từ thành lập bằng cách thêm -ly vào tính từ: quick -> quickly, bad -> badly, easy -> easily.',
      'Good thường là tính từ, well là trạng từ chỉ cách thức; fast, hard, late, early có cùng dạng tính từ/trạng từ tùy vị trí và nghĩa.',
    ],
    signalWords: ['carefully', 'quickly', 'slowly', 'well', 'hard', 'fast', 'feel', 'look', 'sound', 'taste', 'smell'],
    check: [
      'Khi look, sound, smell, taste, feel được dùng làm linking verb để nêu đặc điểm của chủ ngữ, theo sau thường là tính từ (The coffee tastes good). Khi diễn tả hành động, các động từ này có thể đi với trạng từ (She looked carefully at the map).',
      'Sau động từ chỉ hành động, dùng trạng từ (She sings well, không phải sings good).',
      'Phân biệt "hard" (chăm chỉ/nỗ lực) và "hardly" (hầu như không - mang nghĩa phủ định).',
      'Tính từ tận cùng bằng -y đổi thành -ily: happy -> happily, heavy -> heavily.',
    ],
  },
  explanation: 'Tính từ (adjectives) miêu tả danh từ hoặc đại từ, thường đứng trước danh từ (a quiet room) hoặc sau linking verb khi mô tả chủ ngữ (The flower smells sweet). Một số động từ như look, feel, smell, taste vừa có thể là linking verb, vừa có thể chỉ hành động: She looks tired (trông có vẻ mệt) nhưng She looked carefully at the map (cô ấy nhìn bản đồ cẩn thận). Trạng từ chỉ cách thức thường bổ nghĩa cho động từ hành động và trả lời “how?” (He drives carefully). Nhiều trạng từ được tạo bằng cách thêm -ly vào tính từ (slow -> slowly), nhưng có ngoại lệ như well, fast, hard, late và từ tận cùng -ly vốn là tính từ.',
  examples: [
    {
      english: 'Nam is a careful driver; he always drives very carefully in heavy traffic.',
      vietnamese: 'Nam là một tài xế cẩn thận; anh ấy luôn lái xe rất cẩn thận trong dòng giao thông đông đúc.',
    },
    {
      english: 'The hot chicken soup smells delicious on this chilly evening.',
      vietnamese: 'Món súp gà nóng hổi thơm ngon tuyệt vời trong buổi tối se lạnh này.',
    },
    {
      english: 'She completed all the difficult math exercises surprisingly easily.',
      vietnamese: 'Cô ấy đã hoàn thành tất cả các bài tập toán khó một cách dễ dàng đến bất ngờ.',
    },
    {
      english: 'They worked hard all weekend to prepare for the exhibition.',
      vietnamese: 'Họ đã làm việc chăm chỉ suốt cả kỳ nghỉ cuối tuần để chuẩn bị cho buổi triển lãm.',
    },
    {
      english: 'The train arrived late because of a mechanical problem on the tracks.',
      vietnamese: 'Chuyến tàu đã đến muộn do sự cố kỹ thuật trên đường ray.',
    },
    {
      english: 'Her English pronunciation sounds very natural after living in London.',
      vietnamese: 'Phát âm tiếng Anh của cô ấy nghe rất tự nhiên sau thời gian sống tại Luân Đôn.',
    },
  ],
  contrasts: [
    {
      form: 'The musician plays the acoustic guitar very well.',
      whyFits: 'Plays là động từ hành động, đòi hỏi trạng từ well bổ nghĩa cho cách thức chơi đàn.',
      whyNot: '"The musician plays the acoustic guitar very good" sai vì good là tính từ, không bổ nghĩa cho động từ hành động.',
    },
    {
      form: 'This fresh strawberry cake tastes sweet and creamy.',
      whyFits: 'Taste là liên động từ giác quan (linking verb), theo sau bởi các tính từ sweet và creamy.',
      whyNot: '"This fresh strawberry cake tastes sweetly..." sai vì liên động từ không kết hợp với trạng từ cách thức.',
    },
  ],
  commonMistakes: [
    'Dùng tính từ "good" thay vì trạng từ "well" sau động từ hành động (nói "He speaks English good" thay vì "well").',
    'Thêm đuôi -ly vào từ bất quy tắc (viết "fastly" thay vì "fast", hoặc "hardly" với ý nghĩa làm việc chăm chỉ thay vì "hard").',
    'Dùng trạng từ sau động từ nối chỉ giác quan (viết "She looks sadly" khi muốn nói cô ấy trông có vẻ buồn, đúng phải là "She looks sad").',
  ],
  summary: 'Tính từ bổ nghĩa danh từ hoặc đứng sau linking verbs (feel, taste, look). Trạng từ (-ly hoặc bất quy tắc well, fast, hard, late) bổ nghĩa cho động từ hành động để chỉ cách thức.',
  exercises: [
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q1',
      kind: 'choice',
      prompt: 'Choose the correct word: "The teacher explained the grammar rules very ___ so everyone understood."',
      options: [
        { text: 'clearly', correct: true, rationale: 'Explained là động từ hành động, cần trạng từ clearly để diễn tả cách giải thích.' },
        { text: 'clear', correct: false, rationale: 'Clear là tính từ, không bổ nghĩa trực tiếp cho động từ explained.' },
        { text: 'clearness', correct: false, rationale: 'Clearness là danh từ, không đứng ở vị trí này.' },
        { text: 'more clear', correct: false, rationale: 'More clear là dạng so sánh tính từ, không phù hợp ngữ pháp.' },
      ],
      acceptedAnswers: [{ text: 'clearly', rationale: 'Explained is an action verb requiring the adverb clearly.' }],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q2',
      kind: 'choice',
      prompt: 'Select the correct option: "You look ___ today; did you get enough sleep last night?"',
      options: [
        { text: 'tired', correct: true, rationale: 'Look là liên động từ (linking verb), đòi hỏi tính từ tired miêu tả trạng thái chủ ngữ.' },
        { text: 'tiredly', correct: false, rationale: 'Tiredly là trạng từ, không dùng sau linking verb look khi nói về vẻ bề ngoài.' },
        { text: 'more tiredly', correct: false, rationale: 'Trạng từ so sánh không đi sau linking verb look trong ngữ cảnh này.' },
        { text: 'tiring', correct: false, rationale: 'Tiring chỉ tính chất gây mệt mỏi cho người khác, không miêu tả trạng thái bản thân.' },
      ],
      acceptedAnswers: [{ text: 'tired', rationale: 'Look is a linking verb requiring an adjective predicate: tired.' }],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q3',
      kind: 'choice',
      prompt: 'Choose the correct form: "Our school football team played ___ in yesterday\'s tournament."',
      options: [
        { text: 'well', correct: true, rationale: 'Played là động từ hành động, trạng từ tương ứng của good là well.' },
        { text: 'good', correct: false, rationale: 'Good là tính từ, không dùng để bổ nghĩa cho động từ played.' },
        { text: 'goodly', correct: false, rationale: 'Goodly không phải là trạng từ chỉ cách thức của good.' },
        { text: 'bestly', correct: false, rationale: 'Bestly không tồn tại trong tiếng Anh chuẩn.' },
      ],
      acceptedAnswers: [{ text: 'well', rationale: 'Played requires the irregular adverb of manner well.' }],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q4',
      kind: 'choice',
      prompt: 'Select the correct word: "He sprinted ___ to catch the departing express bus."',
      options: [
        { text: 'fast', correct: true, rationale: 'Fast vừa là tính từ vừa là trạng từ, không tồn tại từ fastly.' },
        { text: 'fastly', correct: false, rationale: 'Fastly là từ sai, không tồn tại trong tiếng Anh chuẩn.' },
        { text: 'fasterly', correct: false, rationale: 'Fasterly là từ không có thực.' },
        { text: 'with fast', correct: false, rationale: 'Cụm từ with fast sai ngữ pháp.' },
      ],
      acceptedAnswers: [{ text: 'fast', rationale: 'Fast is an irregular adverb identical in form to the adjective.' }],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with the adverb form of "quiet": "The children opened the bedroom door _____ so as not to wake their baby brother."',
      options: [],
      acceptedAnswers: [
        { text: 'quietly', rationale: 'Quiet forms the regular adverb of manner quietly by adding -ly.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct form of "easy": "She passed the driving test _____ after practicing for two months."',
      options: [],
      acceptedAnswers: [
        { text: 'easily', rationale: 'Passed is an action verb requiring the adverb easily (ending in -y changes to -ily).' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the adjective or adverb form of "hard": "The medical students study _____ every evening before their final anatomy exam."',
      options: [],
      acceptedAnswers: [
        { text: 'hard', rationale: 'Hard is an irregular adverb meaning with great effort; hardly would mean almost not at all.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with the adjective form of "wonderful": "This homemade apple pie smells _____."',
      options: [],
      acceptedAnswers: [
        { text: 'wonderful', rationale: 'Smells is a sensory linking verb followed by the adjective wonderful.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q9',
      kind: 'transform',
      prompt: 'Rewrite the sentence using an adverb: "Minh is a fluent speaker of English."',
      options: [],
      acceptedAnswers: [
        { text: 'Minh speaks English fluently.', rationale: 'Converts adjective fluent into adverb fluently modifying the verb speaks.' },
        { text: 'Minh speaks English very fluently.', rationale: 'Accepts variant with intensifier very.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q10',
      kind: 'transform',
      prompt: 'Rewrite the sentence using an adjective: "She sings in a beautiful manner."',
      options: [],
      acceptedAnswers: [
        { text: 'She is a beautiful singer.', rationale: 'Transforms adverbial phrase into adjective-noun combination beautiful singer.' },
        { text: 'Her singing is beautiful.', rationale: 'Alternative transformation using gerund singing as subject is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Our company driver drives the delivery van very careless."',
      options: [],
      acceptedAnswers: [
        { text: 'Our company driver drives the delivery van very carelessly.', rationale: 'Changes adjective careless to adverb of manner carelessly modifying drives.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-q12',
      kind: 'correction',
      prompt: 'Choose the usual adjective for the soup’s taste: "The traditional beef noodle soup tastes delicious, not bland; it tastes _____."',
      options: [],
      acceptedAnswers: [
        { text: 'delicious', rationale: 'An adjective describes the soup’s taste in this linking-verb reading.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-r1',
      kind: 'choice',
      prompt: 'Choose the correct word: "The lecture hall suddenly became completely ___ when the professor entered."',
      options: [
        { text: 'silent', correct: true, rationale: 'Became là liên động từ chỉ sự thay đổi trạng thái, đòi hỏi tính từ silent.' },
        { text: 'silently', correct: false, rationale: 'Silently là trạng từ, không đứng sau liên động từ became.' },
        { text: 'silence', correct: false, rationale: 'Silence là danh từ, không phù hợp vị trí bổ ngữ tính từ.' },
      ],
      acceptedAnswers: [{ text: 'silent', rationale: 'Became is a linking verb requiring the adjective silent.' }],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the adverb form of "polite": "The receptionist answered all our questions _____."',
      options: [],
      acceptedAnswers: [
        { text: 'politely', rationale: 'Answered is an action verb requiring the regular adverb of manner politely.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-r3',
      kind: 'transform',
      prompt: 'Rewrite using the adverb "angrily": "The manager spoke in an angry voice to the staff."',
      options: [],
      acceptedAnswers: [
        { text: 'The manager spoke angrily to the staff.', rationale: 'Replaces in an angry voice with the adverb of manner angrily.' },
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-r4',
      kind: 'correction',
      prompt: 'Correct the error: "He worked hardly all day to finish the report before the deadline."',
      options: [],
      acceptedAnswers: [
        { text: 'He worked hard all day to finish the report before the deadline.', rationale: 'Replaces hardly (almost not at all) with the irregular adverb hard (with great effort).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-o1',
      prompt: 'Viết 2 câu miêu tả kỹ năng làm việc hoặc học tập của bạn, dùng ít nhất một trạng từ đuôi -ly (carefully/patiently/quickly) và một trạng từ bất quy tắc (well/hard/fast).',
      modelAnswer: 'I always check my written assignments very carefully before submitting them. Furthermore, I work hard to improve my communication skills each day.',
      checks: [
        'Dùng đúng trạng từ chỉ cách thức có đuôi -ly (carefully/patiently) bổ nghĩa cho động từ hành động.',
        'Dùng đúng trạng từ bất quy tắc (hard/well/fast).',
        'Ngữ pháp chuẩn xác, cấu trúc câu rõ ràng.',
      ],
    },
    {
      id: 'grammar-v2-a2-adjective-vs-adverb-20-o2',
      prompt: 'Viết 2 câu miêu tả một bữa ăn tại nhà hàng, dùng một liên động từ chỉ giác quan đi kèm tính từ (taste delicious / smell good) và một động từ hành động đi kèm trạng từ (serve quickly / eat hungrily).',
      modelAnswer: 'The grilled seafood smelled wonderful as soon as the waiter brought it to our table. The restaurant staff served every dish quickly and professionally.',
      checks: [
        'Dùng tính từ sau linking verb (smelled wonderful / tasted delicious).',
        'Dùng trạng từ bổ nghĩa cho động từ hành động (served quickly / professionally).',
        'Câu văn mạch lạc, từ vựng phù hợp cấp độ A2.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-adjectives-adverbs',
      title: 'British Council: Adjectives and adverbs',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/adjectives-adverbs',
      claims: [
        'Adjectives describe nouns or follow linking verbs such as be, feel, look, smell, and taste.',
        'Adverbs of manner describe verbs and indicate how an action is performed, usually ending in -ly.',
        'Irregular adverbs include well from good, and fast, hard, and late which share forms with their adjectives.',
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

export default adjectiveVsAdverbLesson;
