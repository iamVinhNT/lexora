/**
 * @file comparatives.ts
 * @description A2 lesson on comparative adjectives and adverbs.
 */
import type { GrammarLesson } from '../../types.js';

const comparativesLesson: GrammarLesson = {
  id: 'grammar-v2-a2-comparatives-17',
  revisionId: 'grammar-v2-a2-comparatives-17@1.0.0',
  revision: '1.0.0',
  title: 'So sánh hơn của tính từ và trạng từ (Comparative Adjectives and Adverbs)',
  objective: 'Sử dụng thành thạo cấu trúc so sánh hơn với tính từ/trạng từ ngắn (-er + than), dài (more + than) và các dạng bất quy tắc.',
  prerequisiteIds: ['grammar-v2-a2-few-and-little-16'],
  coverage: ['comparatives', 'comparison', 'short-adjectives', 'long-adjectives', 'irregular-comparatives'],
  context: {
    english: 'We use comparative adjectives and adverbs with "than" to describe differences between two people, objects, places, or actions.',
    vietnamese: 'Chúng ta sử dụng tính từ và trạng từ so sánh hơn kèm theo "than" để miêu tả sự khác biệt giữa hai người, sự vật, địa điểm hoặc hành động.',
  },
  guide: {
    pattern: 'Short adj/adv + -er + than | more + Long adj/adv + than | irregular (better / worse / farther / further) + than',
    whenToUse: [
      'So sánh hai người, vật hoặc việc: đối tượng nào có đặc điểm vượt trội hơn.',
      'Tính từ một âm tiết thường thêm -er (fast -> faster); nhiều tính từ hai âm tiết tận cùng bằng -y đổi thành -ier (busy -> busier).',
      'Tính từ dài thường dùng more + adjective (more modern, more expensive). Một số tính từ hai âm tiết có thể dùng cả hai dạng hoặc ưu tiên một dạng theo từ/cách dùng.',
      'Các trường hợp bất quy tắc: good/well -> better; bad/badly -> worse; far -> farther/further.',
    ],
    signalWords: ['than', 'more', '-er', 'better', 'worse', 'farther', 'further', 'much taller', 'a bit faster'],
    check: [
      'Tính từ là ngắn hay dài? Nếu đuôi -y đã đổi thành -ier chưa (busy -> busier)?',
      'Nếu phụ âm-nguyên âm-phụ âm đã gấp đôi phụ âm cuối chưa (big -> bigger)?',
      'Đã có liên từ "than" để nối với đối tượng so sánh thứ hai chưa?',
      'Tránh dùng đồng thời cả "more" và đuôi "-er" (không viết "more taller").',
    ],
  },
  explanation: 'So sánh hơn (Comparatives) dùng để so sánh hai đối tượng hoặc hai hành động. Tính từ một âm tiết thường thêm -er (taller, colder, faster); nhiều tính từ hai âm tiết tận cùng bằng -y đổi thành -ier (easy -> easier). Một số tính từ tận cùng bằng phụ âm sau một nguyên âm đơn gấp đôi phụ âm cuối (big -> bigger, hot -> hotter). Tính từ dài thường dùng more (more modern, more comfortable); cách dùng với tính từ hai âm tiết có thể thay đổi theo từ, nên học dạng thông dụng của từng từ. Hầu hết trạng từ tận cùng bằng -ly dùng more (more carefully, more quickly). Dạng bất quy tắc phổ biến gồm good/well -> better; bad/badly -> worse; far -> farther/further. Than đứng sau dạng so sánh hơn để nêu đối tượng còn lại.',
  examples: [
    {
      english: 'My new laptop is much faster than my old desktop computer.',
      vietnamese: 'Máy tính xách tay mới của tôi nhanh hơn nhiều so với máy tính bàn cũ.',
    },
    {
      english: 'Living in a countryside village is quieter than living in a crowded metropolis.',
      vietnamese: 'Sống ở một ngôi làng miền quê thì yên tĩnh hơn sống ở một đô thị đông đúc.',
    },
    {
      english: 'This Italian restaurant is more expensive than the local noodle shop.',
      vietnamese: 'Nhà hàng Ý này đắt tiền hơn quán mì địa phương.',
    },
    {
      english: 'Lan speaks English more fluently than she did last academic semester.',
      vietnamese: 'Lan nói tiếng Anh lưu loát hơn so với học kỳ trước.',
    },
    {
      english: 'Today’s storm forecast is even worse than yesterday’s warning.',
      vietnamese: 'Dự báo bão hôm nay thậm chí còn tồi tệ hơn lời cảnh báo ngày hôm qua.',
    },
    {
      english: 'The international airport is farther than the central railway terminal.',
      vietnamese: 'Sân bay quốc tế thì xa hơn ga đường sắt trung tâm.',
    },
  ],
  contrasts: [
    {
      form: 'This backpack is more practical than the old handbag.',
      whyFits: 'Practical thường dùng với more trong so sánh hơn (more practical).',
      whyNot: 'More practical là dạng chuẩn, không dùng practicaler trong cách dùng này.',
    },
    {
      form: 'Nam performs better than his teammates in difficult matches.',
      whyFits: 'Good/well biến đổi bất quy tắc thành better trong so sánh hơn.',
      whyNot: '"Nam performs more good..." hay "gooder" là lỗi sai ngữ pháp nghiêm trọng.',
    },
  ],
  commonMistakes: [
    'Dùng đồng thời cả more và đuôi -er (viết "more cheaper" hoặc "more easier").',
    'Nhầm lẫn giữa "than" (hơn) và "then" (sau đó) (viết "taller then him").',
    'Biến đổi sai tính từ bất quy tắc (viết "badder" thay vì "worse", "gooder" thay vì "better").',
  ],
  summary: 'Tính từ ngắn thêm -er + than (smarter than); tính từ dài dùng more + adj + than (more polite than). Bất quy tắc: good -> better, bad -> worse, far -> farther/further. Tuyệt đối không ghép more với đuôi -er.',
  exercises: [
    {
      id: 'grammar-v2-a2-comparatives-17-q1',
      kind: 'choice',
      prompt: 'Select the correct comparative form: "Travelling by express train is usually ___ than riding a motorbike on highways."',
      options: [
        { text: 'faster', correct: true, rationale: 'Fast là tính từ ngắn 1 âm tiết, thêm đuôi -er thành faster.' },
        { text: 'more fast', correct: false, rationale: 'Tính từ ngắn 1 âm tiết không đi với more.' },
        { text: 'more faster', correct: false, rationale: 'Không dùng đồng thời cả more và đuôi -er.' },
        { text: 'fastest', correct: false, rationale: 'Fastest là dạng so sánh nhất, câu so sánh hai đối tượng dùng than đòi hỏi so sánh hơn.' },
      ],
      acceptedAnswers: [{ text: 'faster', rationale: 'Fast is a one-syllable adjective taking -er.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q2',
      kind: 'choice',
      prompt: 'Choose the correct form: "This new armchair is considerably ___ than the wooden stool."',
      options: [
        { text: 'more comfortable', correct: true, rationale: 'Comfortable là tính từ dài, so sánh hơn dùng more comfortable.' },
        { text: 'comfortabler', correct: false, rationale: 'Tính từ dài 4 âm tiết không nhận đuôi -er.' },
        { text: 'most comfortable', correct: false, rationale: 'Most comfortable là so sánh nhất, không đi với than.' },
        { text: 'more comfort', correct: false, rationale: 'Comfort là danh từ, so sánh hơn cần tính từ comfortable.' },
      ],
      acceptedAnswers: [{ text: 'more comfortable', rationale: 'Comfortable is a multi-syllable adjective requiring more.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q3',
      kind: 'choice',
      prompt: 'Select the right irregular form: "His recent exam results were ___ than his teacher had expected."',
      options: [
        { text: 'worse', correct: true, rationale: 'Bad có dạng so sánh hơn bất quy tắc là worse.' },
        { text: 'badder', correct: false, rationale: 'Badder không tồn tại trong ngữ pháp tiếng Anh chuẩn.' },
        { text: 'more bad', correct: false, rationale: 'Không dùng more bad trong so sánh hơn của bad.' },
        { text: 'worst', correct: false, rationale: 'Worst là dạng so sánh nhất, câu có than cần so sánh hơn.' },
      ],
      acceptedAnswers: [{ text: 'worse', rationale: 'Worse is the irregular comparative of bad.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q4',
      kind: 'choice',
      prompt: 'Select the correct comparative adverb: "Could you please walk a bit ___? We have only five minutes left."',
      options: [
        { text: 'faster', correct: true, rationale: 'Fast vừa là tính từ vừa là trạng từ ngắn, dạng so sánh hơn là faster.' },
        { text: 'more fastly', correct: false, rationale: 'Fastly không tồn tại trong tiếng Anh chuẩn.' },
        { text: 'fastlier', correct: false, rationale: 'Từ này không có thật.' },
        { text: 'more faster', correct: false, rationale: 'Thừa từ more.' },
      ],
      acceptedAnswers: [{ text: 'faster', rationale: 'Fast is an adverb taking -er to form faster.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q5',
      kind: 'gap',
      prompt: 'Supply the comparative form of the adjective in brackets: "My younger brother is _____ (tall) than my father now."',
      options: [],
      acceptedAnswers: [{ text: 'taller', rationale: 'Tall là tính từ ngắn, thêm đuôi -er thành taller.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q6',
      kind: 'gap',
      prompt: 'Supply the comparative form: "This software application is _____ (useful) than the older version."',
      options: [],
      acceptedAnswers: [{ text: 'more useful', rationale: 'Useful là tính từ hai âm tiết, dùng more useful.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q7',
      kind: 'gap',
      prompt: 'Supply the comparative form: "Her physical fitness is getting _____ (good) day by day."',
      options: [],
      acceptedAnswers: [{ text: 'better', rationale: 'Good đổi bất quy tắc thành better.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q8',
      kind: 'gap',
      prompt: 'Supply the comparative form: "Summer in Hanoi is generally _____ (hot) than winter in Da Lat."',
      options: [],
      acceptedAnswers: [{ text: 'hotter', rationale: 'Hot kết thúc bằng một nguyên âm và một phụ âm, gấp đôi chữ t thành hotter.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q9',
      kind: 'transform',
      prompt: 'Rewrite using "cheaper than": "The red jacket is 50 dollars, but the blue jacket is 30 dollars."',
      options: [],
      acceptedAnswers: [
        { text: 'The blue jacket is cheaper than the red jacket.', rationale: 'Compares the prices using cheaper than.' },
      ],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q10',
      kind: 'transform',
      prompt: 'Rewrite using "lighter than": "My previous suitcase was heavy, but this new suitcase is light."',
      options: [],
      acceptedAnswers: [
        { text: 'This new suitcase is lighter than my previous suitcase.', rationale: 'Compares the weight of the two suitcases using lighter than.' },
      ],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "This history textbook is more thicker then the science magazine."',
      options: [],
      acceptedAnswers: [
        { text: 'This history textbook is thicker than the science magazine.', rationale: 'Removes more before short adjective thicker and corrects then to than.' },
      ],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "My pronunciation is getting more better after daily practice."',
      options: [],
      acceptedAnswers: [
        { text: 'My pronunciation is getting better after daily practice.', rationale: 'Removes redundant more before irregular comparative better.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-comparatives-17-r1',
      kind: 'choice',
      prompt: 'Choose the correct form: "An airplane flight is usually ___ than a coach journey."',
      options: [
        { text: 'more expensive', correct: true, rationale: 'Expensive là tính từ ba âm tiết, đi với more expensive than.' },
        { text: 'expensiver', correct: false, rationale: 'Không thêm đuôi -er cho tính từ ba âm tiết expensive.' },
        { text: 'most expensive', correct: false, rationale: 'Most expensive là so sánh nhất, không đi với than.' },
      ],
      acceptedAnswers: [{ text: 'more expensive', rationale: 'Expensive requires more expensive.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-r2',
      kind: 'gap',
      prompt: 'Supply the comparative form: "The outdoor market is usually _____ (noisy) than the supermarket."',
      options: [],
      acceptedAnswers: [{ text: 'noisier', rationale: 'Noisy tận cùng là -y, đổi thành noisier.' }],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-r3',
      kind: 'transform',
      prompt: 'Rewrite using "better than": "His speech was good, but her speech was clearly superior."',
      options: [],
      acceptedAnswers: [
        { text: 'Her speech was better than his speech.', rationale: 'Uses irregular comparative better than.' },
      ],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "Minh drives more slower than his friend on foggy mountain roads."',
      options: [],
      acceptedAnswers: [
        { text: 'Minh drives slower than his friend on foggy mountain roads.', rationale: 'Removes redundant more before slower.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-comparatives-17-o1',
      prompt: 'Viết 2 câu so sánh hai phương tiện di chuyển (xe buýt và xe máy), dùng một tính từ ngắn (faster/cheaper) và một tính từ dài (more convenient / more dangerous).',
      modelAnswer: 'Riding a motorbike is faster than taking the public bus during rush hour. However, the bus is more comfortable than the motorbike in rainy weather.',
      checks: [
        'Dùng đúng dạng so sánh hơn của tính từ ngắn (faster/cheaper).',
        'Dùng đúng dạng so sánh hơn của tính từ dài với more (more comfortable / more convenient).',
        'Có liên từ than kết nối hai vế so sánh.',
      ],
    },
    {
      id: 'grammar-v2-a2-comparatives-17-o2',
      prompt: 'Viết 2 câu so sánh cuộc sống ở làng quê và cuộc sống ở thành phố lớn, dùng ít nhất một dạng so sánh bất quy tắc (better / worse).',
      modelAnswer: 'Air quality in the countryside is much better than in big cities. Nevertheless, public transportation in the capital is more modern than in rural areas.',
      checks: [
        'Sử dụng dạng bất quy tắc better hoặc worse đúng ngữ cảnh.',
        'Sử dụng dạng so sánh hơn của tính từ dài (more modern) hoặc ngắn.',
        'Câu văn gãy gọn, ngữ pháp chuẩn xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-comparatives',
      title: 'British Council: Comparative adjectives',
      url: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/comparative-adjectives',
      claims: [
        'Comparative adjectives compare differences between two nouns.',
        'One-syllable adjectives and many two-syllable adjectives take -er; longer adjectives usually take more, while some two-syllable forms vary by adjective.',
        'Irregular comparative forms include good to better, bad to worse, and far to farther/further.',
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

export default comparativesLesson;
