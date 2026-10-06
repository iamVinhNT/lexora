/**
 * @file stance-adverbials.ts
 * @description C1 lesson on stance adverbials (epistemic, attitude, style disjuncts) for authorial positioning and nuanced commentary.
 */
import type { GrammarLesson } from '../../types.js';

const stanceAdverbialsLesson: GrammarLesson = {
  id: 'grammar-v2-c1-stance-adverbials-15',
  revisionId: 'grammar-v2-c1-stance-adverbials-15@1.0.0',
  revision: '1.0.0',
  title: 'Trạng từ thể hiện lập trường (Stance Adverbials)',
  objective: 'Phân loại và sử dụng linh hoạt các trạng từ thể hiện lập trường (epistemic: arguably, ostensibly; attitude: paradoxically, remarkably; style: strictly speaking) để định vị quan điểm tác giả trong văn bản cao cấp.',
  prerequisiteIds: ['grammar-v2-c1-tentative-modality-14'],
  coverage: ['stance-adverbials', 'epistemic-stance', 'attitude-adverbials', 'style-disjuncts', 'c1-academic-writing'],
  context: {
    english: 'Mastery of C1 English requires moving beyond mere facts to express subtle judgment. Experienced essayists use stance adverbials to orient readers: "Arguably, the treaty represented a tactical compromise; ostensibly designed for peace, it paradoxically accelerated regional militarization."',
    vietnamese: 'Nắm vững tiếng Anh C1 đòi hỏi người học vượt qua việc nêu dữ kiện đơn thuần để thể hiện sự đánh giá tinh tế. Các nhà tiểu luận sử dụng trạng từ lập trường để định hướng người đọc: "Có thể coi hiệp ước là một thỏa hiệp chiến thuật; bề ngoài nhằm giữ hòa bình, song nghịch lý thay nó lại thúc đẩy quân sự hóa khu vực".',
  },
  guide: {
    pattern: 'Sentence-initial / Medial stance adverbial (+ comma) + Clause | Stance adverbial modifying predication',
    whenToUse: [
      'Thể hiện mức độ tin cậy của thông tin hoặc nguồn chứng cứ (Epistemic: reportedly, ostensibly, allegedly).',
      'Bộc lộ thái độ hoặc đánh giá giá trị đối với sự việc (Attitude: paradoxically, inevitably, remarkably).',
      'Làm rõ cách thức phát ngôn hoặc khung định nghĩa (Style disjunct: strictly speaking, broadly speaking).',
    ],
    signalWords: ['arguably', 'ostensibly', 'paradoxically', 'strictly speaking', 'reportedly', 'inevitably', 'conceivably'],
    check: [
      'Đã đặt dấu phẩy ngăn cách khi trạng từ lập trường đứng đầu câu hoặc xen giữa chủ ngữ và vị ngữ chưa?',
      'Đã hiểu đúng nghĩa "arguably" là "có thể lập luận thuyết phục rằng" chứ không phải "gây tranh cãi" chưa?',
    ],
  },
  explanation: 'Stance Adverbials (trạng từ lập trường) là nhóm trạng ngữ chỉ thái độ, không bổ nghĩa cho một động từ cụ thể mà bao trùm toàn bộ mệnh đề. Chúng chia thành ba nhóm chính: 1) Epistemic stance: phản ánh mức độ chắc chắn hoặc tính xác thực (arguably = có thể bảo vệ bằng lập luận xác đáng; ostensibly = vẻ bề ngoài, ngụ ý thực tế có thể khác; reportedly = theo tương truyền/báo cáo); 2) Attitude stance: phản ánh cảm xúc hay phán xét giá trị (paradoxically, remarkably, regrettably); 3) Style disjuncts: bình luận về cách tác giả diễn đạt (strictly speaking, bluntly put). Về vị trí, chúng thường đứng đầu câu để tạo khung định hướng (framing), hoặc chêm vào giữa câu (medial position) giữa hai dấu phẩy nhằm tạo nhịp điệu uyển chuyển.',
  examples: [
    {
      english: 'Arguably, the discovery of CRISPR constitutes the most consequential biotechnological milestone of the century.',
      vietnamese: 'Có thể nói rằng phát hiện về CRISPR tạo thành cột mốc công nghệ sinh học có tầm ảnh hưởng lớn nhất thế kỷ.',
    },
    {
      english: 'The fund was ostensibly established for environmental conservation, yet disclosures revealed speculative real estate holdings.',
      vietnamese: 'Quỹ bề ngoài được thành lập để bảo tồn môi trường, nhưng các tiết lộ cho thấy danh mục đầu tư bất động sản đầu cơ.',
    },
    {
      english: 'Paradoxically, increasing highway capacity frequently exacerbates rather than alleviates urban traffic congestion.',
      vietnamese: 'Nghịch lý thay, việc tăng công suất đường cao tốc thường làm trầm trọng thêm thay vì giảm bớt ùn tắc đô thị.',
    },
    {
      english: 'Strictly speaking, the provisional governing council possesses no constitutional authority to levy taxes.',
      vietnamese: 'Nói một cách chặt chẽ theo luật, hội đồng quản trị lâm thời không có thẩm quyền hiến định để đánh thuế.',
    },
    {
      english: 'The board, somewhat predictably, declined to sanction the hostile takeover bid.',
      vietnamese: 'Ban giám đốc, đúng như dự đoán phần nào, đã từ chối thông qua đề nghị thâu tóm thù địch.',
    },
    {
      english: 'The regime, reportedly facing severe domestic dissent, accelerated its public censorship campaigns.',
      vietnamese: 'Chính quyền, theo các nguồn tin đang đối mặt với sự bất đồng nội bộ gay gắt, đã đẩy mạnh chiến dịch kiểm duyệt.',
    },
  ],
  contrasts: [
    {
      form: 'Arguably the greatest novelist vs Undoubtedly the greatest novelist',
      whyFits: 'Arguably ngụ ý có thể đưa ra lập luận chặt chẽ để bảo vệ danh hiệu này, nhưng thừa nhận vẫn có quan điểm khác.',
      whyNot: 'Undoubtedly biến đánh giá thẩm mỹ chủ quan thành chân lý hiển nhiên, thiếu khiêm tốn học thuật.',
    },
    {
      form: 'Ostensibly for research purposes vs Genuinely for research purposes',
      whyFits: 'Ostensibly tạo khoảng cách nghi vấn: mục đích được tuyên bố bề ngoài khác với động cơ thực chất.',
      whyNot: 'Genuinely xác nhận tính chân thực, triệt tiêu sắc thái hoài nghi phản biện.',
    },
  ],
  commonMistakes: [
    'Hiểu sai "arguably" thành "gây tranh cãi hoặc đáng ngờ", trong khi trong văn cảnh C1 nó mang nghĩa "có căn cứ xác đáng để lập luận rằng".',
    'Bỏ quên dấu phẩy ngăn cách trạng từ lập trường khi trạng từ đứng ở đầu câu hoặc xen vào vị trí giữa câu (medial position).',
    'Nhầm lẫn giữa "ostensibly" (bề ngoài có vẻ như vậy, nhưng thực tế có thể khác) với "obviously" (rõ ràng, hiển nhiên).',
  ],
  summary: 'Stance Adverbials (arguably, ostensibly, paradoxically, strictly speaking) định vị góc nhìn tác giả về tính xác thực, thái độ cảm xúc và phong cách phát ngôn, làm phong phú văn phong học thuật.',
  exercises: [
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q1',
      kind: 'choice',
      prompt: 'Select the stance adverbial that suggests a claim is well-supported by reasoned argument without claiming absolute certainty.',
      options: [
        { text: 'Arguably, this institutional reform proved to be the catalyst for subsequent democratization.', correct: true, rationale: 'Arguably introduces an assertion supported by strong argumentation while maintaining academic modesty.' },
        { text: 'Undeniably, everyone agrees without any reservation whatsoever on this reform.', correct: false, rationale: 'Extreme absolute phrasing.' },
        { text: 'Ostensibly, this reform was entirely fictitious and achieved nothing at all.', correct: false, rationale: 'Ostensibly indicates deceptive appearance, which alters the intended meaning.' },
        { text: 'Strictly speaking, the catalyst was totally illegal and disastrous.', correct: false, rationale: 'Strictly speaking focuses on precise definitions rather than defending an argument.' },
      ],
      acceptedAnswers: [{ text: 'Arguably, this institutional reform proved to be the catalyst for subsequent democratization.', rationale: 'Correct use of arguably for defensible academic claims.' }],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q2',
      kind: 'choice',
      prompt: 'Choose the adverbial that highlights a discrepancy between stated purpose and underlying reality: "The regulatory framework was ___ drafted to protect small investors."',
      options: [
        { text: 'ostensibly', correct: true, rationale: 'Ostensibly signals that the stated purpose may not correspond to genuine outcomes.' },
        { text: 'strictly speaking', correct: false, rationale: 'Strictly speaking addresses formal technical correctness, not covert motives.' },
        { text: 'paradoxically', correct: false, rationale: 'Paradoxically marks an unexpected contradiction, not a facade.' },
        { text: 'undoubtedly', correct: false, rationale: 'Undoubtedly confirms certainty rather than skeptical questioning.' },
      ],
      acceptedAnswers: [{ text: 'ostensibly', rationale: 'Ostensibly marks surface appearance vs reality.' }],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q3',
      kind: 'choice',
      prompt: 'Identify the sentence with correct punctuation and placement of a medial attitude stance adverbial.',
      options: [
        { text: 'The municipal council, remarkably, voted unanimously to abolish the commercial tariff.', correct: true, rationale: 'Medial stance adverbial remarkably is correctly enclosed in commas.' },
        { text: 'The municipal council remarkably voted unanimously, to abolish the commercial tariff.', correct: false, rationale: 'Missing opening comma and erroneous comma before infinitive.' },
        { text: 'The municipal council, remarkably voted unanimously to abolish the commercial tariff.', correct: false, rationale: 'Missing closing comma after remarkably.' },
        { text: 'Remarkably the municipal council voted unanimously to abolish, the commercial tariff.', correct: false, rationale: 'Missing initial comma and misplaced final comma.' },
      ],
      acceptedAnswers: [{ text: 'The municipal council, remarkably, voted unanimously to abolish the commercial tariff.', rationale: 'Correct comma placement for parenthetical medial stance adverbial.' }],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q4',
      kind: 'choice',
      prompt: 'Which style disjunct best clarifies that a statement adheres strictly to formal legal definitions?',
      options: [
        { text: 'Strictly speaking, the interim ceasefire does not constitute a permanent peace accord.', correct: true, rationale: 'Strictly speaking specifies precise adherence to formal definitions.' },
        { text: 'Arguably, the interim ceasefire is definitely 100% permanent peace.', correct: false, rationale: 'Contradictory and inaccurate application of arguably.' },
        { text: 'Ostensibly, nobody wants peace anyway.', correct: false, rationale: 'Cynical generalization instead of legal precision.' },
        { text: 'Predictably speaking, peace accords are never signed.', correct: false, rationale: 'Ungrammatical hybrid idiom.' },
      ],
      acceptedAnswers: [{ text: 'Strictly speaking, the interim ceasefire does not constitute a permanent peace accord.', rationale: 'Appropriate use of strictly speaking.' }],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q5',
      kind: 'gap',
      prompt: 'Insert the stance adverbial meaning "based on defensible argument": "_____, the transition to renewable power will reduce long-term capital volatility. (Arguably / Ostensibly)"',
      options: [],
      acceptedAnswers: [
        { text: 'Arguably', rationale: 'Arguably introduces a reasoned, defensible thesis.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q6',
      kind: 'gap',
      prompt: 'Supply the adverb indicating an apparent but questionable motive: "The restructuring was _____ designed to streamline operations, but it primarily served to eliminate dissent. (ostensibly / strictly)"',
      options: [],
      acceptedAnswers: [
        { text: 'ostensibly', rationale: 'Ostensibly highlights the deceptive surface rationale.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q7',
      kind: 'gap',
      prompt: 'Complete the sentence with the attitude adverbial expressing contradiction: "_____, higher punitive fines resulted in an increase in non-compliance. (Paradoxically / Broadly)"',
      options: [],
      acceptedAnswers: [
        { text: 'Paradoxically', rationale: 'Paradoxically introduces a surprising counter-intuitive outcome.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q8',
      kind: 'gap',
      prompt: 'Fill in the style disjunct: "Strictly _____, the software library is proprietary rather than open source. (speaking / spoken)"',
      options: [],
      acceptedAnswers: [
        { text: 'speaking', rationale: 'Strictly speaking is the standard participial style disjunct.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q9',
      kind: 'transform',
      prompt: 'Rewrite the sentence by fronting the stance adverbial "Arguably": "The advent of the printing press was arguably the most transformative cultural disruption in Renaissance Europe."',
      options: [],
      acceptedAnswers: [
        { text: 'Arguably, the advent of the printing press was the most transformative cultural disruption in Renaissance Europe.', rationale: 'Fronts Arguably with a following comma.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q10',
      kind: 'transform',
      prompt: 'Incorporate the medial stance adverbial "paradoxically" between commas: "The austerity budget reduced immediate debt while deepening the structural deficit."',
      options: [],
      acceptedAnswers: [
        { text: 'The austerity budget, paradoxically, reduced immediate debt while deepening the structural deficit.', rationale: 'Inserts paradoxically in medial position with enclosing commas.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q11',
      kind: 'correction',
      prompt: 'Correct the misused stance adverbial in this critique of a disguised policy: "The new decree was obviously aimed at education, but confidential memos proved it was designed for surveillance."',
      options: [],
      acceptedAnswers: [
        { text: 'The new decree was ostensibly aimed at education, but confidential memos proved it was designed for surveillance.', rationale: 'Replaces obviously with ostensibly to signal surface appearance vs covert reality.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-q12',
      kind: 'correction',
      prompt: 'Fix the punctuation error around the sentence-initial style disjunct: "Strictly speaking the candidate does not meet the statutory residency requirement."',
      options: [],
      acceptedAnswers: [
        { text: 'Strictly speaking, the candidate does not meet the statutory residency requirement.', rationale: 'Adds a comma after the introductory disjunct Strictly speaking.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-stance-adverbials-15-r1',
      kind: 'choice',
      prompt: 'Choose the appropriate stance adverbial for an academic assessment of an unexpected outcome.',
      options: [
        { text: 'Paradoxically, lower tuition fees did not correlate with higher matriculation among disadvantaged youths.', correct: true, rationale: 'Paradoxically captures the counter-intuitive empirical finding.' },
        { text: 'Bluntly put, tuition fees are always evil.', correct: false, rationale: 'Crude and emotive register.' },
        { text: 'Ostensibly speaking, everything is totally fine.', correct: false, rationale: 'Confuses ostensibly with disjunct formula.' },
      ],
      acceptedAnswers: [{ text: 'Paradoxically, lower tuition fees did not correlate with higher matriculation among disadvantaged youths.', rationale: 'Accurate attitude stance adverbial.' }],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-r2',
      kind: 'gap',
      prompt: 'Insert the adverb indicating unverified external attribution: "The foreign minister was _____ involved in the clandestine negotiations. (reportedly / strictly)"',
      options: [],
      acceptedAnswers: [{ text: 'reportedly', rationale: 'Reportedly attributes information to external accounts without personal vouching.' }],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-r3',
      kind: 'transform',
      prompt: 'Rewrite using "Strictly speaking,": "From a purely legal standpoint, the agreement is void."',
      options: [],
      acceptedAnswers: [
        { text: 'Strictly speaking, the agreement is void.', rationale: 'Replaces verbose phrase with succinct style disjunct Strictly speaking.' },
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-r4',
      kind: 'correction',
      prompt: 'Correct the error in this epistemic stance clause: "Arguably the fiscal stimulus prevented a recession, but it fueled inflation."',
      options: [],
      acceptedAnswers: [
        { text: 'Arguably, the fiscal stimulus prevented a recession, but it fueled inflation.', rationale: 'Adds the required comma after sentence-initial Arguably.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-stance-adverbials-15-o1',
      prompt: 'Viết 2 câu nghị luận học thuật về tác động của mạng xã hội, sử dụng "Arguably" ở đầu câu đầu tiên và "Paradoxically" ở đầu câu thứ hai để làm nổi bật một hệ quả trái ngược.',
      modelAnswer: 'Arguably, social media platforms have democratized access to specialized educational resources on an unprecedented scale. Paradoxically, this proliferation of unfiltered information has intensified intellectual polarization and eroded public trust in scientific consensus.',
      checks: [
        'Sử dụng "Arguably," mở đầu câu một cách chuẩn xác.',
        'Sử dụng "Paradoxically," mở đầu câu thứ hai để đối lập logic.',
        'Đặt dấu phẩy sau các trạng từ lập trường đứng đầu câu.',
      ],
    },
    {
      id: 'grammar-v2-c1-stance-adverbials-15-o2',
      prompt: 'Viết 1-2 câu phân tích một chiến dịch thương mại hoặc chính sách công, lồng ghép "ostensibly" và một style disjunct (ví dụ "strictly speaking" hoặc "broadly speaking").',
      modelAnswer: 'The conglomerate ostensibly initiated the carbon-offset program to fulfill ethical pledges. Strictly speaking, however, the project served primarily to acquire tradable tax credits under regional environmental regulations.',
      checks: [
        'Sử dụng "ostensibly" để chỉ mục đích bề ngoài.',
        'Sử dụng style disjunct như "strictly speaking" với dấu câu chuẩn mực.',
        'Thể hiện tư duy phản biện và văn phong C1 sắc sảo.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-adverbs-position-stance',
      title: 'English Grammar Today: Adverbs and adverb phrases: position',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/adverbs-and-adverb-phrases-position',
      claims: [
        'Evaluative and viewpoint adverbs (stance adverbs) modify the entire sentence to express speaker attitude or judgment.',
        'Stance adverbs typically occupy front position and are separated from the clause by commas.',
        'Medial parenthetical placement allows stylistic modulation in formal discourse.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. Stance adverbials (epistemic, attitude, style disjuncts), punctuation conventions, exercise items, and verified Cambridge Grammar source confirmed.',
    checks: {
      originalProse: true,
      factualExplanation: true,
      clearContrasts: true,
      singleCorrectChoice: true,
      validTransferExercises: true,
      soundOutputPrompts: true,
      referenceOnlySources: true,
    },
  },
};

export default stanceAdverbialsLesson;
