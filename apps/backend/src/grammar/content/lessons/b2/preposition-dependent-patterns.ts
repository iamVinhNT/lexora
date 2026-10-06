/**
 * @file preposition-dependent-patterns.ts
 * @description B2 lesson 27: Advanced dependent preposition patterns with verbs, adjectives, and nouns.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-preposition-dependent-patterns-27',
  revisionId: 'grammar-v2-b2-preposition-dependent-patterns-27@1.0.0',
  revision: '1.0.0',
  title: 'Các mẫu giới từ phụ thuộc nâng cao (Dependent Preposition Patterns)',
  objective: 'Làm chủ các cụm giới từ cố định sau động từ, tính từ và danh từ ở trình độ B2 (attribute to, stem from, prone to, devoid of, insight into, objection to); khi một giới từ được theo sau bởi động từ, dùng dạng gerund (-ing).',
  prerequisiteIds: ['grammar-v2-b2-quantifier-scope-26'],
  coverage: ['preposition-dependent-patterns', 'dependent-prepositions', 'verb-prepositions', 'adjective-prepositions', 'noun-prepositions', 'gerund-complements'],
  context: {
    english: 'Academic writers and legal analysts rely on exact dependent prepositional pairings to express precise relationships between causal factors, personal inclinations, and institutional decisions.',
    vietnamese: 'Các tác giả học thuật và nhà phân tích pháp lý dựa vào các cặp giới từ phụ thuộc chuẩn xác để diễn đạt mối quan hệ chặt chẽ giữa các yếu tố nguyên nhân, thiên hướng cá nhân và quyết định định chế.',
  },
  guide: {
    pattern: 'Verb + Preposition + Noun/V-ing | Adjective + Preposition + Noun/V-ing | Noun + Preposition + Noun/V-ing',
    whenToUse: [
      'Sử dụng các cặp động từ - giới từ học thuật: attribute something to (quy cho), stem from (bắt nguồn từ), deter someone from (ngăn cản khỏi), refrain from (kiềm chế không làm).',
      'Sử dụng các cặp tính từ - giới từ chính xác: prone to (dễ bị), susceptible to (dễ mắc), devoid of (hoàn toàn thiếu), exempt from (được miễn), oblivious to (không nhận thức được).',
      'Sử dụng các cặp danh từ - giới từ chuyên dụng: insight into (cái nhìn sâu sắc vào), objection to (sự phản đối đối với), demand for (nhu cầu về).',
      'Khi động từ theo sau một giới từ, dùng dạng -ing; chú ý "to" có thể là giới từ trong object to / look forward to hoặc là thành phần của nguyên mẫu trong want to do.',
    ],
    signalWords: ['attribute to', 'stem from', 'prone to', 'susceptible to', 'objection to', 'refrain from'],
    check: [
      'Từ "to" trong cụm là giới từ (preposition) hay ký hiệu nguyên mẫu (infinitive)? Nếu là giới từ (object to, look forward to, prone to), động từ theo sau đã ở dạng V-ing chưa?',
      'Đã dùng đúng giới từ cố định cho tính từ (devoid OF, compatible WITH, susceptible TO) chưa?',
      'Phân biệt rõ "result in" (dẫn đến kết quả gì) và "result from" (bắt nguồn từ nguyên nhân gì)?',
    ],
  },
  explanation: 'Giới từ phụ thuộc (Dependent Prepositions) là các liên kết cố định giữa từ loại chính và giới từ đi kèm. Ở trình độ B2, người học cần nắm các quy luật và cấu trúc nâng cao: 1) Động từ đi với giới từ: "attribute A to B" (quy A là do B), "stem from" (bắt nguồn từ), "deter someone from doing something" (ngăn cản ai làm gì), "refrain from doing" (kiềm chế làm gì), "resort to doing" (phải viện đến cách làm gì). Chú ý sự đảo chiều quan hệ: "A results in B" (A gây ra B) khác với "A results from B" (A bắt nguồn từ B). 2) Tính từ đi với giới từ: "prone to + N/V-ing" (dễ bị tổn thương/dễ có xu hướng xấu), "susceptible to" (dễ bị nhiễm/ảnh hưởng), "devoid of" (trống rỗng, không có chút nào), "compatible with" (tương thích với), "oblivious to" (thờ ơ, không để ý đến). 3) Danh từ đi với giới từ: "objection to + V-ing/N" (phản đối việc gì), "insight into" (hiểu biết thấu đáo về), "attitude towards/to" (thái độ đối với). 4) Bẫy phổ biến nhất: Khi "to" là một giới từ (như trong object to, be prone to, look forward to, in addition to), động từ theo sau BẮT BUỘC là V-ing, tuyệt đối không dùng động từ nguyên thể không "ing".',
  examples: [
    {
      english: 'Epidemiologists attribute the sudden decline in infection rates to rigorous contact tracing.',
      vietnamese: 'Các nhà dịch tễ học quy sự sụt giảm đột ngột về tỷ lệ lây nhiễm là nhờ vào việc truy vết tiếp xúc nghiêm ngặt.',
    },
    {
      english: 'Economic instability in the region stems from persistent trade deficits and inflation.',
      vietnamese: 'Sự bất ổn kinh tế trong khu vực bắt nguồn từ thâm hụt thương mại kéo dài và lạm phát.',
    },
    {
      english: 'Coastal embankments are particularly prone to erosion during seasonal monsoons.',
      vietnamese: 'Các con đê ven biển đặc biệt dễ bị xói mòn trong mùa gió mùa.',
    },
    {
      english: 'The official statement was entirely devoid of substance or concrete policy proposals.',
      vietnamese: 'Tuyên bố chính thức hoàn toàn thiếu vắng nội dung thực chất hoặc các đề xuất chính sách cụ thể.',
    },
    {
      english: 'The board raised strong objections to relocating corporate headquarters overseas.',
      vietnamese: 'Hội đồng quản trị đã đưa ra những phản đối mạnh mẽ đối với việc chuyển trụ sở doanh nghiệp ra nước ngoài.',
    },
    {
      english: 'Library patrons are politely requested to refrain from answering phone calls in quiet zones.',
      vietnamese: 'Độc giả thư viện được yêu cầu lịch sự kiềm chế không nghe điện thoại trong các khu vực yên tĩnh.',
    },
  ],
  contrasts: [
    {
      form: 'Many conservative investors object to allocating capital to unproven crypto assets.',
      whyFits: 'Dùng allocating (V-ing) vì "to" trong cụm "object to" là một giới từ phụ thuộc bắt buộc đi với danh từ hoặc danh động từ.',
      whyNot: '"...object to allocate capital..." là lỗi sai nghiêm trọng do nhầm lẫn giới từ "to" với ký hiệu nguyên mẫu to-infinitive.',
    },
    {
      form: 'The severe financial shortfall resulted from unexpected supply chain disruptions.',
      whyFits: 'Dùng resulted from vì sự cố gián đoạn chuỗi cung ứng là nguyên nhân gây ra sự thiếu hụt tài chính.',
      whyNot: '"The severe shortfall resulted in supply chain disruptions" sẽ đảo ngược logic nhân quả, biến thiếu hụt thành nguyên nhân của gián đoạn.',
    },
  ],
  commonMistakes: [
    'Dùng động từ nguyên mẫu (bare infinitive hoặc to-V) sau các cụm có giới từ "to" như object to, be prone to, resort to (ví dụ: viết "he objects to pay" thay vì "he objects to paying").',
    'Nhầm lẫn giữa "result in" (dẫn đến kết quả) và "result from" (bắt nguồn từ nguyên nhân) làm đảo ngược logic câu.',
    'Dùng sai giới từ cố định cho tính từ (ví dụ: viết "devoid with" thay vì "devoid of", "prone for" thay vì "prone to").',
  ],
  summary: 'Các động từ, tính từ và danh từ có thể kết hợp với giới từ cố định; khi giới từ được theo sau bởi động từ, dùng dạng -ing. Phân biệt giới từ to (object to, prone to) với dấu hiệu nguyên mẫu (want to do), và phân biệt result in với result from.',
  exercises: [
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q1',
      kind: 'choice',
      prompt: 'Select the correct dependent preposition to complete the sentence: "The newly drafted bylaws are fully compatible ___ existing state legislation."',
      options: [
        { text: 'with', correct: true, rationale: 'Compatible collocate exclusively with the dependent preposition with.' },
        { text: 'to', correct: false, rationale: 'Compatible to is non-standard.' },
        { text: 'for', correct: false, rationale: 'Compatible for is ungrammatical.' },
        { text: 'about', correct: false, rationale: 'Compatible about is incorrect.' },
      ],
      acceptedAnswers: [{ text: 'with', rationale: 'Compatible with is the standard dependent preposition combination.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q2',
      kind: 'choice',
      prompt: 'Choose the correct complement form after "object to": "Several shareholders strongly objected to ___ the chief executive a discretionary bonus."',
      options: [
        { text: 'granting', correct: true, rationale: 'Object to requires a gerund complement (granting) because to functions as a preposition.' },
        { text: 'grant', correct: false, rationale: 'Grant is a bare infinitive, which cannot follow preposition to.' },
        { text: 'be granted', correct: false, rationale: 'Be granted lacks active transitive voice and proper gerund morphology.' },
        { text: 'have granted', correct: false, rationale: 'Lacks gerund form required after preposition.' },
      ],
      acceptedAnswers: [{ text: 'granting', rationale: 'Granting is the correct gerund complement following object to.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q3',
      kind: 'choice',
      prompt: 'Select the sentence that accurately uses "attribute ... to":',
      options: [
        { text: 'The climatologists attribute the extended drought to anomalous atmospheric pressure systems.', correct: true, rationale: 'Attribute [effect] to [cause] is the correct academic transitive prepositional frame.' },
        { text: 'The climatologists attribute the extended drought with anomalous atmospheric pressure systems.', correct: false, rationale: 'Attribute does not take with.' },
        { text: 'The climatologists attribute anomalous atmospheric pressure systems from the extended drought.', correct: false, rationale: 'Attribute from is ungrammatical and reverses cause-effect.' },
        { text: 'The climatologists attribute for the extended drought to anomalous pressures.', correct: false, rationale: 'Attribute takes a direct object without for.' },
      ],
      acceptedAnswers: [{ text: 'The climatologists attribute the extended drought to anomalous atmospheric pressure systems.', rationale: 'Attribute ... to is the correct syntactic frame.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with correct prepositional meaning indicating cause (not result):',
      options: [
        { text: 'The engine failure resulted from contaminated aviation fuel.', correct: true, rationale: 'Resulted from correctly identifies the contaminated fuel as the antecedent cause.' },
        { text: 'The engine failure resulted in contaminated aviation fuel.', correct: false, rationale: 'Resulted in incorrectly implies the engine failure caused the fuel to become contaminated.' },
        { text: 'The engine failure resulted of contaminated aviation fuel.', correct: false, rationale: 'Result of is a noun phrase; the verb cannot take of.' },
        { text: 'The engine failure resulted with contaminated aviation fuel.', correct: false, rationale: 'Result with is non-standard.' },
      ],
      acceptedAnswers: [{ text: 'The engine failure resulted from contaminated aviation fuel.', rationale: 'Resulted from correctly links consequence to antecedent cause.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q5',
      kind: 'gap',
      prompt: 'Fill in the dependent preposition: "Children under the age of twelve are particularly susceptible _____ seasonal viral infections."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Susceptible takes dependent preposition to.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q6',
      kind: 'gap',
      prompt: 'Fill in the dependent preposition: "The wasteland was completely devoid _____ vegetation or animal life."',
      options: [],
      acceptedAnswers: [{ text: 'of', rationale: 'Devoid collocates uniquely with of.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q7',
      kind: 'gap',
      prompt: 'Fill in the dependent preposition: "The sociologist provided valuable insight _____ the integration challenges facing immigrant families."',
      options: [],
      acceptedAnswers: [{ text: 'into', rationale: 'Insight takes dependent preposition into.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q8',
      kind: 'gap',
      prompt: 'Fill in the dependent preposition: "The presence of security cameras deterred many thieves _____ targeting the electronic storefront."',
      options: [],
      acceptedAnswers: [{ text: 'from', rationale: 'Deter someone from doing something is the standard pattern.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q9',
      kind: 'transform',
      prompt: 'Rewrite using "stems from": "The ongoing dispute between the two departments is caused by miscommunication during the initial rollout."',
      options: [],
      acceptedAnswers: [
        { text: 'The ongoing dispute between the two departments stems from miscommunication during the initial rollout.', rationale: 'Replaces is caused by with stems from.' },
      ],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q10',
      kind: 'transform',
      prompt: 'Rewrite using the adjective "prone to" followed by a gerund: "Elderly individuals tend to suffer fractures when walking on icy sidewalks."',
      options: [],
      acceptedAnswers: [
        { text: 'Elderly individuals are prone to suffering fractures when walking on icy sidewalks.', rationale: 'Uses prone to followed by gerund suffering.' },
      ],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q11',
      kind: 'correction',
      prompt: 'Correct the complement error after preposition "to": "The union leaders vehemently objected to accept the proposed pay freeze."',
      options: [],
      acceptedAnswers: [
        { text: 'The union leaders vehemently objected to accepting the proposed pay freeze.', rationale: 'Changes infinitive accept to gerund accepting after prepositional object to.' },
      ],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-q12',
      kind: 'correction',
      prompt: 'Correct the wrong dependent preposition: "The new operating guidelines are completely devoid with practical examples."',
      options: [],
      acceptedAnswers: [
        { text: 'The new operating guidelines are completely devoid of practical examples.', rationale: 'Replaces incorrect with with required dependent preposition of after devoid.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-r1',
      kind: 'choice',
      prompt: 'Select the sentence with accurate preposition selection and complementation:',
      options: [
        { text: 'The diplomat refrained from commenting on ongoing bilateral security talks.', correct: true, rationale: 'Refrain takes from followed by a gerund (commenting).' },
        { text: 'The diplomat refrained to comment on ongoing bilateral security talks.', correct: false, rationale: 'Refrain cannot take a to-infinitive.' },
        { text: 'The diplomat refrained of commenting on ongoing bilateral security talks.', correct: false, rationale: 'Refrain cannot take of.' },
      ],
      acceptedAnswers: [{ text: 'The diplomat refrained from commenting on ongoing bilateral security talks.', rationale: 'Refrain from + gerund is the correct collocation.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-r2',
      kind: 'gap',
      prompt: 'Fill in the correct dependent preposition: "The company’s remarkable turnaround can be attributed _____ restructuring its supply chain."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Attributed to is the passive form taking preposition to.' }],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-r3',
      kind: 'transform',
      prompt: 'Rewrite using "susceptible to": "Young seedlings are easily damaged by sudden spring frosts."',
      options: [],
      acceptedAnswers: [
        { text: 'Young seedlings are susceptible to damage from sudden spring frosts.', rationale: 'Uses susceptible to with noun damage.' },
        { text: 'Young seedlings are susceptible to being damaged by sudden spring frosts.', rationale: 'Uses susceptible to with passive gerund being damaged.' },
      ],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-r4',
      kind: 'correction',
      prompt: 'Correct the preposition error: "The investigative panel gained deep insights of the roots of systemic corruption."',
      options: [],
      acceptedAnswers: [
        { text: 'The investigative panel gained deep insights into the roots of systemic corruption.', rationale: 'Replaces of with into after noun insights.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-o1',
      prompt: 'Viết 1-2 câu trong một bài phân tích kinh tế hoặc công nghệ, sử dụng các cụm "attribute ... to" và "stems from" để giải thích nguyên nhân và kết quả.',
      modelAnswer: 'Economists attribute the accelerated adoption of cloud computing to significant infrastructure cost reductions. The current semiconductor shortage largely stems from geopolitical tensions and supply disruptions.',
      checks: [
        'Sử dụng đúng cấu trúc "attribute something to" và "stems from".',
        'Quan hệ nhân quả mạch lạc và chính xác.',
        'Văn phong học thuật, chuẩn mực.',
      ],
    },
    {
      id: 'grammar-v2-b2-preposition-dependent-patterns-27-o2',
      prompt: 'Viết 1-2 câu sử dụng tính từ "prone to" hoặc "susceptible to" kèm theo danh từ hoặc danh động từ (V-ing) để miêu tả rủi ro y tế hoặc an ninh mạng.',
      modelAnswer: 'Outdated corporate servers are notoriously susceptible to ransomware incursions. Inexperienced staff members are often prone to clicking malicious phishing links in unverified emails.',
      checks: [
        'Sử dụng đúng "susceptible to" hoặc "prone to".',
        'Sau giới từ "to" là danh từ hoặc danh động từ V-ing (clicking, incursions).',
        'Ý tứ diễn đạt tự nhiên, chặt chẽ.',
      ],
    },
  ],
  sources: [
    {
      id: 'collins-dependent-prepositions',
      title: 'Collins COBUILD English Grammar: Dependent prepositions',
      url: 'https://grammar.collinsdictionary.com/english-usage/dependent-prepositions',
      claims: [
        'Certain verbs, adjectives, and nouns take fixed dependent prepositions followed by nouns or gerunds.',
        'When to is a preposition (such as in object to, prone to), it must be followed by a gerund or noun, not a bare infinitive.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal editorial review)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'AI-internal review of teaching content, controlled and transfer exercises, output prompts, and reference claims; corrected ambiguity and overgeneralized rules.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default lesson;
