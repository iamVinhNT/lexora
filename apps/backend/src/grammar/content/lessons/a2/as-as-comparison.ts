/**
 * @file as-as-comparison.ts
 * @description A2 lesson on equality and inequality comparisons using 'as...as' and 'not as...as'.
 */
import type { GrammarLesson } from '../../types.js';

const asAsComparisonLesson: GrammarLesson = {
  id: 'grammar-v2-a2-as-as-comparison-19',
  revisionId: 'grammar-v2-a2-as-as-comparison-19@1.0.0',
  revision: '1.0.0',
  title: 'So sánh bằng và không bằng (as...as / not as...as)',
  objective: 'Sử dụng cấu trúc as + adjective/adverb + as để diễn đạt sự ngang bằng, và not as / not so + adj/adv + as để diễn đạt sự kém hơn giữa hai người, sự vật hoặc hành động.',
  prerequisiteIds: ['grammar-v2-a2-superlatives-18'],
  coverage: ['as-as-comparison', 'comparison', 'equality-comparison', 'not-as-as'],
  context: {
    english: 'We use "as...as" to say that two people, things, or actions are equal in a particular quality, and "not as...as" to show that one has less of that quality than another.',
    vietnamese: 'Chúng ta sử dụng "as...as" để nói hai người, sự vật hoặc hành động ngang bằng nhau về một đặc điểm nào đó, và "not as...as" để chỉ ra một bên kém hơn bên kia về mức độ.',
  },
  guide: {
    pattern: 'as + adj/adv + as | not as + adj/adv + as | not so + adj/adv + as',
    whenToUse: [
      'Diễn đạt sự ngang bằng: S + be/V + as + adj/adv + as + đối tượng so sánh.',
      'Diễn đạt sự không bằng nhau (kém hơn): S + trợ động từ phủ định + V + as + adj/adv + as + đối tượng so sánh.',
      'Có thể thêm trạng từ bổ nghĩa trước cấu trúc: just as...as (hoàn toàn bằng), nearly as...as (gần bằng), not nearly as...as (kém xa).',
      'Dùng tính từ nguyên thể sau be hoặc linking verbs; dùng trạng từ nguyên thể sau động từ hành động.',
    ],
    signalWords: ['as...as', 'not as...as', 'not so...as', 'just as', 'nearly as', 'almost as'],
    check: [
      'Tính từ hoặc trạng từ nằm giữa hai từ "as" phải ở dạng nguyên thể, tuyệt đối không thêm -er hoặc more (as tall as, không phải as taller as).',
      'Đã chọn đúng tính từ hay trạng từ chưa: sau động từ hành động cần trạng từ (run as fast as, speak as fluently as).',
      'Ghi nhớ "A is not as tall as B" tương đương về nghĩa với "B is taller than A".',
      'Không dùng liên từ "than" thay cho từ "as" thứ hai (tránh viết "as big than").',
    ],
  },
  explanation: 'Cấu trúc so sánh bằng "as + adjective/adverb + as" cho phép người học đối chiếu hai đối tượng mà không cần biến đổi hình thái từ như trong so sánh hơn hay so sánh nhất. Quy tắc cốt lõi: từ nằm kẹp giữa hai chữ "as" luôn luôn ở dạng nguyên mẫu (positive form). Ví dụ: "My brother is as tall as my father." (Anh tôi cao bằng bố tôi). Khi chuyển sang câu phủ định "not as + adj/adv + as" (hoặc đôi khi là "not so...as"), câu mang ý nghĩa bên thứ nhất kém hơn bên thứ hai. Ví dụ: "This tablet is not as expensive as the laptop" đồng nghĩa với "The laptop is more expensive than this tablet". Khi bổ nghĩa cho động từ hành động, ta sử dụng trạng từ giữa hai chữ "as": "She plays the piano as beautifully as a professional artist." Các từ bổ trợ như "just" (chính xác bằng), "nearly / almost" (gần bằng), hoặc "not quite" (không hẳn bằng) thường được đặt ngay trước chữ "as" đầu tiên để tinh chỉnh sắc thái biểu đạt.',
  examples: [
    {
      english: 'My younger brother is already as tall as our father.',
      vietnamese: 'Em trai tôi giờ đã cao bằng bố của chúng tôi rồi.',
    },
    {
      english: 'Taking the subway is usually not as slow as traveling by bus.',
      vietnamese: 'Đi tàu điện ngầm thường không chậm bằng đi xe buýt.',
    },
    {
      english: 'Linh sings English songs as beautifully as a native singer.',
      vietnamese: 'Linh hát các ca khúc tiếng Anh hay như một ca sĩ bản xứ.',
    },
    {
      english: 'This local coffee shop is not as noisy as the downtown branch.',
      vietnamese: 'Quán cà phê địa phương này không ồn ào bằng chi nhánh ở trung tâm thành phố.',
    },
    {
      english: 'Can you type this business report as quickly as possible?',
      vietnamese: 'Bạn có thể gõ bản báo cáo kinh doanh này càng nhanh càng tốt không?',
    },
    {
      english: 'The second exam was just as difficult as the first one.',
      vietnamese: 'Bài thi thứ hai cũng khó hệt như bài thi đầu tiên.',
    },
  ],
  contrasts: [
    {
      form: 'Her new apartment is as modern as her previous flat.',
      whyFits: 'Modern giữ nguyên dạng tính từ gốc giữa cấu trúc as...as.',
      whyNot: '"Her new apartment is as more modern as..." sai vì không dùng more trong so sánh bằng.',
    },
    {
      form: 'He does not drive as carefully as his older sister.',
      whyFits: 'Drive là động từ hành động, đòi hỏi trạng từ carefully giữa as...as.',
      whyNot: '"He does not drive as careful as..." dùng sai tính từ careful thay vì trạng từ bổ nghĩa cho drive.',
    },
  ],
  commonMistakes: [
    'Dùng dạng so sánh hơn giữa as...as (viết "as bigger as" thay vì "as big as").',
    'Dùng "than" thay cho "as" ở vế sau (viết "as cold than" thay vì "as cold as").',
    'Dùng tính từ thay vì trạng từ sau động từ hành động (viết "runs as quick as" thay vì "runs as quickly as / as fast as").',
  ],
  summary: 'Dùng as + adj/adv + as để so sánh bằng; not as + adj/adv + as để diễn đạt kém hơn. Từ giữa hai chữ as luôn ở dạng nguyên gốc, không thêm -er hay more.',
  exercises: [
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q1',
      kind: 'choice',
      prompt: 'Select the correct sentence structure: "Our hotel room was ___ comfortable ___ we expected."',
      options: [
        { text: 'as / as', correct: true, rationale: 'Cấu trúc so sánh bằng dùng cặp liên từ as...as với tính từ nguyên thể comfortable.' },
        { text: 'as / than', correct: false, rationale: 'Than chỉ dùng trong so sánh hơn, không đi với as ở vế trước.' },
        { text: 'so / than', correct: false, rationale: 'Không tồn tại cặp liên từ so...than trong so sánh bằng.' },
        { text: 'more / as', correct: false, rationale: 'More đi kèm than, không đi kèm as.' },
      ],
      acceptedAnswers: [{ text: 'as / as', rationale: 'Equality comparison requires as + adjective + as.' }],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q2',
      kind: 'choice',
      prompt: 'Choose the correct form: "This old laptop is not ___ as the brand-new model."',
      options: [
        { text: 'as fast', correct: true, rationale: 'Sau not dùng as + tính từ nguyên thể fast.' },
        { text: 'as faster', correct: false, rationale: 'Không dùng dạng so sánh hơn faster giữa hai từ as.' },
        { text: 'faster', correct: false, rationale: 'Faster cần liên từ than thay vì as.' },
        { text: 'as fastest', correct: false, rationale: 'Fastest là dạng so sánh nhất, không đứng giữa as...as.' },
      ],
      acceptedAnswers: [{ text: 'as fast', rationale: 'The adjective between as...as must be in positive base form: as fast.' }],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q3',
      kind: 'choice',
      prompt: 'Select the correct adverb form: "Nam solved the puzzle ___ as his teacher."',
      options: [
        { text: 'as easily', correct: true, rationale: 'Solved là động từ hành động, cần trạng từ easily trong cấu trúc as...as.' },
        { text: 'as easy', correct: false, rationale: 'Easy là tính từ, không bổ nghĩa cho động từ solved.' },
        { text: 'as easier', correct: false, rationale: 'Không dùng so sánh hơn trong cấu trúc as...as.' },
        { text: 'more easily', correct: false, rationale: 'More easily cần liên từ than thay vì as.' },
      ],
      acceptedAnswers: [{ text: 'as easily', rationale: 'An adverb in base form is required after action verb solved: as easily.' }],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q4',
      kind: 'choice',
      prompt: 'Choose the right meaning equivalent: "Motorbikes are not as safe as cars."',
      options: [
        { text: 'Cars are safer than motorbikes.', correct: true, rationale: '"Not as safe as" (không an toàn bằng) đồng nghĩa với "safer than" (an toàn hơn).' },
        { text: 'Motorbikes are safer than cars.', correct: false, rationale: 'Ngược hoàn toàn với ý nghĩa của câu gốc.' },
        { text: 'Cars are not safe at all.', correct: false, rationale: 'Câu gốc không khẳng định ô tô không an toàn.' },
        { text: 'Motorbikes and cars are equally safe.', correct: false, rationale: 'Câu gốc chỉ ra hai phương tiện không an toàn bằng nhau.' },
      ],
      acceptedAnswers: [{ text: 'Cars are safer than motorbikes.', rationale: 'Not as safe as means the second item is safer than the first.' }],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with the correct word: "The winter in Da Lat is not as cold _____ the winter in Sapa."',
      options: [],
      acceptedAnswers: [
        { text: 'as', rationale: 'The second connector in comparison of equality/inequality is as.' },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q6',
      kind: 'gap',
      prompt: 'Fill in the blanks with "as" and the adjective "good": "Her spoken English is _____ as her written English."',
      options: [],
      acceptedAnswers: [
        { text: 'as good', rationale: 'Positive comparison uses as good as with base adjective good.' },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with the adverb form of "fluent": "Minh speaks German as _____ as his native classmate."',
      options: [],
      acceptedAnswers: [
        { text: 'fluently', rationale: 'Speaks is an action verb requiring the adverb fluently.' },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q8',
      kind: 'gap',
      prompt: 'Complete the common idiom: "Please send me the feedback as soon as _____."',
      options: [],
      acceptedAnswers: [
        { text: 'possible', rationale: 'Completes the common idiom as soon as possible.' },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q9',
      kind: 'transform',
      prompt: 'Rewrite using "not as...as": "Travelling by airplane is faster than travelling by train."',
      options: [],
      acceptedAnswers: [
        { text: 'Travelling by train is not as fast as travelling by airplane.', rationale: 'Converts comparative faster than into negative inequality not as fast as.' },
        { text: "Traveling by train is not as fast as traveling by airplane.", rationale: 'American spelling traveling is accepted.' },
        { text: "Travelling by train isn't as fast as travelling by airplane.", rationale: "Contraction isn't is accepted." },
        { text: "Traveling by train isn't as fast as traveling by airplane.", rationale: "American spelling with contraction isn't is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q10',
      kind: 'transform',
      prompt: 'Rewrite using "as well as": "Phong plays football with the same skill as his brother."',
      options: [],
      acceptedAnswers: [
        { text: 'Phong plays football as well as his brother.', rationale: 'Uses adverb phrase as well as to compare playing ability.' },
        { text: 'Phong plays football as well as his brother does.', rationale: 'Accepts clause ending with auxiliary does.' },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Today is not as colder as yesterday was."',
      options: [],
      acceptedAnswers: [
        { text: 'Today is not as cold as yesterday was.', rationale: 'Replaces comparative colder with base adjective cold.' },
        { text: "Today isn't as cold as yesterday was.", rationale: "Contraction isn't with base adjective cold is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "The bus is as crowded than the morning subway train."',
      options: [],
      acceptedAnswers: [
        { text: 'The bus is as crowded as the morning subway train.', rationale: 'Replaces incorrect than with as in an equality comparison.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-as-as-comparison-19-r1',
      kind: 'choice',
      prompt: 'Choose the correct form: "Lan works ___ as any member in our sales department."',
      options: [
        { text: 'as hard', correct: true, rationale: 'Hard vừa là tính từ vừa là trạng từ chỉ sự chăm chỉ, dạng nguyên thể: as hard as.' },
        { text: 'as hardly', correct: false, rationale: 'Hardly mang nghĩa là "hầu như không", không phù hợp về ngữ nghĩa.' },
        { text: 'harder', correct: false, rationale: 'Harder cần liên từ than thay vì as.' },
      ],
      acceptedAnswers: [{ text: 'as hard', rationale: 'Hard functions as an adverb meaning with great effort: as hard as.' }],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with the base form of the adjective: "This mobile phone is not as _____ (expensive) as I thought."',
      options: [],
      acceptedAnswers: [
        { text: 'expensive', rationale: 'Adjectives in the not as...as structure remain in their base form.' },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-r3',
      kind: 'transform',
      prompt: 'Rewrite using "not as...as": "My current salary is lower than my previous salary."',
      options: [],
      acceptedAnswers: [
        { text: 'My current salary is not as high as my previous salary.', rationale: 'Rewrites lower than into not as high as.' },
        { text: "My current salary isn't as high as my previous salary.", rationale: "Contraction isn't is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-r4',
      kind: 'correction',
      prompt: 'Correct the error: "He cannot run as faster as his coach."',
      options: [],
      acceptedAnswers: [
        { text: 'He cannot run as fast as his coach.', rationale: 'Replaces comparative faster with base adverb fast.' },
        { text: "He can't run as fast as his coach.", rationale: "Contraction can't is accepted." },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-as-as-comparison-19-o1',
      prompt: 'Viết 2 câu so sánh thói quen học tập của bạn và một người bạn, sử dụng cấu trúc "as...as" để nói về sự ngang bằng và "not as...as" để nói về điểm khác biệt.',
      modelAnswer: 'I study as hard as my classmate during the final exam week. However, I am not as patient as she is when reading long grammar books.',
      checks: [
        'Sử dụng đúng cấu trúc khẳng định as...as với tính từ hoặc trạng từ nguyên thể.',
        'Sử dụng đúng cấu trúc phủ định not as...as.',
        'Ý tứ rõ ràng, ngữ pháp chuẩn xác.',
      ],
    },
    {
      id: 'grammar-v2-a2-as-as-comparison-19-o2',
      prompt: 'Viết 2 câu so sánh hai mùa trong năm tại quê hương bạn, dùng "not as...as" để so sánh thời tiết (nhiệt độ, lượng mưa) giữa hai mùa.',
      modelAnswer: 'Spring in Hanoi is not as hot as summer. Furthermore, autumn is not as humid as spring, so many people enjoy walking outside.',
      checks: [
        'Dùng đúng not as + tính từ + as (not as hot as / not as humid as).',
        'Tính từ giữ nguyên thể, không thêm đuôi -er.',
        'Câu văn mạch lạc, phù hợp ngữ cảnh A2.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-as-as',
      title: 'Cambridge Dictionary: As...as comparison',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/as-and-as-as',
      claims: [
        'We use as + adjective/adverb + as to make comparisons when the things we are comparing are equal in some way.',
        'We use not as + adjective/adverb + as to say that something is less than something else.',
        'The adjective or adverb between as and as remains in its base form without inflection.',
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

export default asAsComparisonLesson;
