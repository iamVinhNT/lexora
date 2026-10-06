/**
 * @file inversion-after-so-such.ts
 * @description C1 lesson on emphatic inversion with "So" and "Such" in result clauses.
 */
import type { GrammarLesson } from '../../types.js';

const inversionAfterSoSuchLesson: GrammarLesson = {
  id: 'grammar-v2-c1-inversion-after-so-such-04',
  revisionId: 'grammar-v2-c1-inversion-after-so-such-04@1.0.0',
  revision: '1.0.0',
  title: 'Đảo ngữ với So và Such (Inversion after So and Such)',
  objective: 'Làm chủ cấu trúc đảo ngữ mang màu sắc hùng biện và văn học với "So + adj/adv" và "Such + be + noun phrase" để làm nổi bật cường độ, quy mô và hệ quả tất yếu.',
  prerequisiteIds: ['grammar-v2-c1-conditional-inversion-03'],
  coverage: ['inversion-after-so-such', 'so-adjective-that', 'such-be-noun', 'result-clause-emphasis', 'literary-syntax'],
  context: {
    english: 'In high-register journalism, literary prose, and academic critique, fronting "So" + adjective or "Such" + be dramatizes the extent of a phenomenon before unveiling its consequence.',
    vietnamese: 'Trong báo chí cao cấp, văn xuôi học thuật và phê bình chuyên sâu, đưa "So" + tính từ hoặc "Such" + be lên đầu câu giúp kịch tính hóa mức độ của sự vật, hiện tượng trước khi mở ra mệnh đề hệ quả.',
  },
  guide: {
    pattern: 'So + Adjective / Adverb + Auxiliary + Subject + that... | Such + be + Noun Phrase + that...',
    whenToUse: [
      'Nhấn mạnh mức độ phi thường hoặc quy mô đặc biệt của một hiện tượng trong văn phong học thuật, xã luận hoặc văn chương.',
      'Tạo nhịp điệu dồn dập, định hướng sự chú ý của người đọc vào kết quả chấn động được giới thiệu ở mệnh đề "that".',
    ],
    signalWords: ['so profound was', 'so rapidly did', 'such was the severity', 'such were the complications', 'so acute is'],
    check: [
      'Với "So", đã đi liền với tính từ hoặc trạng từ rồi mới đến trợ động từ đảo chưa (So acute was the crisis)?',
      'Với "Such", đã dùng dạng thức to be hòa hợp với danh từ theo sau chưa (Such was + N số ít; Such were + N số nhiều)?',
      'Mệnh đề sau "that" có giữ nguyên trật tự câu khẳng định xuôi bình thường không?',
    ],
  },
  explanation: 'Đảo ngữ với So và Such là cấu trúc tu từ đảo thành phần bổ ngữ mang tính chất mức độ lên đầu câu để gây ấn tượng mạnh mẽ: 1. "So + Adjective + be + Subject + that..." (hoặc "So + Adverb + auxiliary + Subject + Main Verb + that..."). Ví dụ: "So acute was the shortage that emergency reserves were mobilized." 2. "Such + be + Noun Phrase + that...". Cấu trúc này tương đương với "The noun phrase was so great that...". Lưu ý to be phải hòa hợp với cụm danh từ phía sau (Such was the impact / Such were the difficulties). Mệnh đề sau liên từ "that" biểu thị kết quả và luôn giữ trật tự câu xuôi.',
  examples: [
    {
      english: 'So profound was the mathematician\'s insight that it resolved a century-old cosmological conjecture.',
      vietnamese: 'Cái nhìn sâu sắc của nhà toán học uyên bác đến mức nó đã giải quyết được một giả thuyết vũ trụ học tồn tại cả thế kỷ.',
    },
    {
      english: 'So rapidly did the automated algorithm execute trades that human market makers could not intervene.',
      vietnamese: 'Thuật toán tự động thực hiện các lệnh giao dịch nhanh đến mức các nhà tạo lập thị trường bằng con người không thể kịp can thiệp.',
    },
    {
      english: 'Such was the intensity of public indignation that the legislative chamber repealed the statute within hours.',
      vietnamese: 'Sự phẫn nộ của công chúng mãnh liệt đến mức viện lập pháp đã bãi bỏ đạo luật chỉ trong vòng vài giờ đồng hồ.',
    },
    {
      english: 'Such were the technical complexities of orbital assembly that engineers revised the blueprint five times.',
      vietnamese: 'Những phức tạp kỹ thuật của việc lắp ráp trên quỹ đạo lớn đến mức các kỹ sư đã phải chỉnh sửa bản thiết kế tới năm lần.',
    },
    {
      english: 'So pervasive is digital surveillance in contemporary life that absolute informational privacy is virtually obsolete.',
      vietnamese: 'Sự giám sát kỹ thuật số trong đời sống đương đại phổ biến đến mức sự riêng tư thông tin tuyệt đối gần như đã trở nên lỗi thời.',
    },
    {
      english: 'Such was the prestige of the international fellowship that thousands of doctoral researchers applied for three openings.',
      vietnamese: 'Uy tín của học bổng quốc tế ấy lớn lao đến mức hàng ngàn nghiên cứu sinh tiến sĩ đã nộp đơn tranh tài cho vỏn vẹn ba vị trí.',
    },
  ],
  contrasts: [
    {
      form: 'So severe was the drought that municipal reservoirs dropped to critical thresholds.',
      whyFits: 'So đi kèm tính từ severe đứng đầu câu; to be was đảo lên trước chủ ngữ the drought.',
      whyNot: '"So severe the drought was that..." sai vì thiếu đảo động từ was lên trước chủ ngữ. "So the drought was severe that..." sai cấu trúc đảo ngữ kết quả.',
    },
    {
      form: 'Such was the influence of the seminal essay that it redefined twentieth-century literary criticism.',
      whyFits: 'Such đứng đầu câu kết hợp trực tiếp với to be was và cụm danh từ the influence.',
      whyNot: '"So was the influence that..." sai vì So chỉ bổ nghĩa cho tính từ hoặc trạng từ, không đi với danh từ làm bổ ngữ theo mẫu này.',
    },
  ],
  commonMistakes: [
    'Dùng So thay cho Such trước cụm danh từ (viết *"So was the reputation that" thay vì "Such was the reputation that").',
    'Quên đảo động từ to be hoặc trợ động từ sau So + adj/adv (viết *"So acute the crisis was that...").',
    'Chia sai số của động từ to be sau Such (viết *"Such was the challenges that" thay vì "Such were the challenges that").',
  ],
  summary: 'So + tính từ/trạng từ + trợ động từ + S + that... diễn tả mức độ; Such + be + N + that... diễn tả quy mô/tác động to lớn. Mệnh đề sau "that" luôn giữ trật tự xuôi.',
  exercises: [
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q1',
      kind: 'choice',
      prompt: 'Select the correct inverted clause: "So ___ that regional ecosystems may require centuries to regenerate fully."',
      options: [
        { text: 'catastrophic was the ecological degradation', correct: true, rationale: 'So + adjective catastrophic correctly triggers inversion of singular auxiliary was before subject degradation.' },
        { text: 'was catastrophic the ecological degradation', correct: false, rationale: 'Adjective must precede auxiliary verb immediately following So.' },
        { text: 'catastrophic the ecological degradation was', correct: false, rationale: 'Fails to invert auxiliary was before the subject.' },
        { text: 'catastrophic were the ecological degradation', correct: false, rationale: 'Singular subject degradation requires was, not plural were.' },
      ],
      acceptedAnswers: [{ text: 'catastrophic was the ecological degradation', rationale: 'Correct So + adjective + was + subject pattern.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q2',
      kind: 'choice',
      prompt: 'Complete the formal result clause: "Such ___ of the ancient parchment that conservators handled it solely within climate-regulated chambers."',
      options: [
        { text: 'was the fragility', correct: true, rationale: 'Such + singular was + noun phrase the fragility correctly introduces the inverted structure.' },
        { text: 'the fragility was', correct: false, rationale: 'Missing inversion of was before the noun phrase.' },
        { text: 'was fragile', correct: false, rationale: 'Such pairs with a noun phrase, not an isolated adjective without noun.' },
        { text: 'did the fragility be', correct: false, rationale: 'Ungrammatical auxiliary do-support with stative be complement.' },
      ],
      acceptedAnswers: [{ text: 'was the fragility', rationale: 'Such was + noun phrase pattern.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q3',
      kind: 'choice',
      prompt: 'Identify the correct adverbial inversion: "So meticulously ___ that construction proceeded without a single structural delay."',
      options: [
        { text: 'did the architects draft the blueprints', correct: true, rationale: 'So + adverb meticulously triggers auxiliary did before subject the architects and base verb draft.' },
        { text: 'the architects drafted the blueprints', correct: false, rationale: 'Missing inversion after initial So + adverb.' },
        { text: 'drafted the architects the blueprints', correct: false, rationale: 'Lexical verb cannot precede subject without auxiliary do-support.' },
        { text: 'were the architects drafted the blueprints', correct: false, rationale: 'Incorrect passive auxiliary were with active transitive verb.' },
      ],
      acceptedAnswers: [{ text: 'did the architects draft the blueprints', rationale: 'So + adverb + did + subject + base verb.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q4',
      kind: 'choice',
      prompt: 'Choose the correct inverted clause with plural subject: "Such ___ that border transit was halted indefinitely."',
      options: [
        { text: 'were the diplomatic tensions', correct: true, rationale: 'Such + plural were agrees with plural noun tensions.' },
        { text: 'was the diplomatic tensions', correct: false, rationale: 'Agreement error: singular was used with plural subject tensions.' },
        { text: 'did the diplomatic tensions become', correct: false, rationale: 'Such be + NP is the canonical emphatic pattern here.' },
        { text: 'the diplomatic tensions were', correct: false, rationale: 'Fails to invert were before the noun phrase.' },
      ],
      acceptedAnswers: [{ text: 'were the diplomatic tensions', rationale: 'Plural agreement with were.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q5',
      kind: 'gap',
      prompt: 'Supply the plural auxiliary to complete the inversion: "So devastating _____ (was / were) the monsoon floods that municipal infrastructure collapsed across three provinces."',
      options: [],
      acceptedAnswers: [{ text: 'were', rationale: 'Plural were agrees with plural noun floods.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q6',
      kind: 'gap',
      prompt: 'Supply the singular auxiliary: "Such _____ (was / were) the authority of the supreme magistrate that her verdicts went unchallenged."',
      options: [],
      acceptedAnswers: [{ text: 'was', rationale: 'Singular was agrees with uncountable noun authority.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q7',
      kind: 'gap',
      prompt: 'Complete with the past auxiliary: "So vehemently _____ (did) the faculty protest the budget cuts that the provost agreed to renegotiate."',
      options: [],
      acceptedAnswers: [{ text: 'did', rationale: 'Auxiliary did precedes subject the faculty before base verb protest.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q8',
      kind: 'gap',
      prompt: 'Complete the result clause conjunction: "So complex was the encrypted payload _____ (that) quantum computing clusters took months to decrypt it."',
      options: [],
      acceptedAnswers: [{ text: 'that', rationale: 'Subordinating conjunction that introduces the result clause.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q9',
      kind: 'transform',
      prompt: 'Rewrite using initial "So": "The impact of the economic embargo was so widespread that essential supply chains froze."',
      options: [],
      acceptedAnswers: [
        { text: 'So widespread was the impact of the economic embargo that essential supply chains froze.', rationale: 'Fronts So widespread, inverts was before subject the impact.' },
      ],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q10',
      kind: 'transform',
      prompt: 'Rewrite using initial "Such": "The popularity of the exhibition was such that organizers extended its run by six months."',
      options: [],
      acceptedAnswers: [
        { text: 'Such was the popularity of the exhibition that organizers extended its run by six months.', rationale: 'Fronts Such was before noun phrase the popularity of the exhibition.' },
      ],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q11',
      kind: 'correction',
      prompt: 'Correct the word order: "So severe the regulatory penalty was that the enterprise faced immediate liquidation."',
      options: [],
      acceptedAnswers: [
        { text: 'So severe was the regulatory penalty that the enterprise faced immediate liquidation.', rationale: 'Inverts was before the subject the regulatory penalty.' },
      ],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-q12',
      kind: 'correction',
      prompt: 'Correct the subject-verb agreement: "Such was the obstacles encountered by the polar expedition that they abandoned the depot."',
      options: [],
      acceptedAnswers: [
        { text: 'Such were the obstacles encountered by the polar expedition that they abandoned the depot.', rationale: 'Changes was to were to agree with plural obstacles.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-r1',
      kind: 'choice',
      prompt: 'Choose the correct inverted clause: "Such ___ that emergency relief operations were marshaled overnight."',
      options: [
        { text: 'was the urgency of the humanitarian crisis', correct: true, rationale: 'Such was + singular noun phrase correctly conveys intense degree.' },
        { text: 'the urgency was of the humanitarian crisis', correct: false, rationale: 'Uninverted and fragmented word order.' },
        { text: 'did the urgency be of the crisis', correct: false, rationale: 'Ungrammatical auxiliary combination with stative be.' },
      ],
      acceptedAnswers: [{ text: 'was the urgency of the humanitarian crisis', rationale: 'Such was + noun phrase pattern.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-r2',
      kind: 'gap',
      prompt: 'Supply the auxiliary: "So thoroughly _____ the investigation uncover institutional collusion that criminal indictments were issued."',
      options: [],
      acceptedAnswers: [{ text: 'did', rationale: 'Auxiliary did precedes subject before base verb uncover.' }],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-r3',
      kind: 'transform',
      prompt: 'Rewrite using initial "So": "The heat from the industrial furnace was so intense that workers donned insulated ceramic suits."',
      options: [],
      acceptedAnswers: [
        { text: 'So intense was the heat from the industrial furnace that workers donned insulated ceramic suits.', rationale: 'Fronts So intense, inverts was before subject the heat.' },
      ],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "So the public response was overwhelming that the digital platform crashed within minutes."',
      options: [],
      acceptedAnswers: [
        { text: 'So overwhelming was the public response that the digital platform crashed within minutes.', rationale: 'Fronts adjective overwhelming and inverts was before subject the public response.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng cấu trúc "So + Adjective + be + Subject + that..." để nhấn mạnh mức độ nghiêm trọng hoặc sự phức tạp của một thách thức kinh tế hoặc sinh thái.',
      modelAnswer: 'So acute was the liquidity crisis among secondary lending institutions that the monetary authority was compelled to execute emergency quantitative easing.',
      checks: [
        'Sử dụng So + tính từ ở đầu câu.',
        'Đảo to be (was/were/is) lên trước chủ ngữ.',
        'Mệnh đề sau that giữ trật tự xuôi, nêu rõ hệ quả xác đáng.',
      ],
    },
    {
      id: 'grammar-v2-c1-inversion-after-so-such-04-o2',
      prompt: 'Viết 1-2 câu học thuật sử dụng "Such + was / were + Noun Phrase + that..." để làm nổi bật tầm vóc lịch sử hoặc uy tín của một công trình nghiên cứu.',
      modelAnswer: 'Such was the rigorous precision of the seminal sociological study that it permanently altered legislative approaches to urban poverty alleviation.',
      checks: [
        'Sử dụng Such kết hợp was (hoặc were) và cụm danh từ ở đầu câu.',
        'Hòa hợp số giữa to be và cụm danh từ theo sau.',
        'Mệnh đề sau that thể hiện kết quả tương xứng và ngữ nghĩa mạch lạc.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-inversion-so-such',
      title: 'English Grammar Today: Inversion',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/inversion',
      claims: [
        'So followed by an adjective or adverb at sentence initial position causes subject-verb inversion.',
        'Such followed by be and a noun phrase creates an emphatic inversion equivalent to The noun phrase was such that.',
        'The consequence clause introduced by that maintains standard affirmative word order.',
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
    summary: 'Comprehensive review completed. Inversion patterns with So and Such, copula agreement, result clause syntax, exercise items, and Cambridge Grammar source verified.',
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

export default inversionAfterSoSuchLesson;
