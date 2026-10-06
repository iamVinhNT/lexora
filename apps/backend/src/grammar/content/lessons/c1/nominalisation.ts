/**
 * @file nominalisation.ts
 * @description C1 lesson on nominalisation (grammatical metaphor) to construct abstract, objective academic discourse and packaging theme-rheme progression.
 */
import type { GrammarLesson } from '../../types.js';

const nominalisationLesson: GrammarLesson = {
  id: 'grammar-v2-c1-nominalisation-19',
  revisionId: 'grammar-v2-c1-nominalisation-19@1.0.0',
  revision: '1.0.0',
  title: 'Danh từ hóa và ẩn dụ ngữ pháp (Nominalisation)',
  objective: 'Vận dụng kỹ thuật danh từ hóa (chuyển đổi động từ, tính từ và mệnh đề thành các cụm danh từ trừu tượng) để nâng cao độ khách quan, tính cô đọng học thuật và tạo mạch phát triển chủ đề (thematic progression) tự nhiên.',
  prerequisiteIds: ['grammar-v2-c1-noun-phrase-post-modification-18'],
  coverage: ['nominalisation', 'grammatical-metaphor', 'thematic-progression', 'academic-abstraction', 'c1-academic-writing'],
  context: {
    english: 'Novice writers express processes through congruent verbs: "Because the climate became warmer, glaciers melted rapidly, and this threatened coastal cities." In contrast, C1 academic authors nominalise the processes: "The acceleration of glacial melting driven by climate warming poses severe threats to coastal settlements."',
    vietnamese: 'Người viết mới thường diễn đạt các quá trình bằng động từ trực diện: "Because the climate became warmer, glaciers melted rapidly, and this threatened coastal cities." Ngược lại, tác giả học thuật C1 danh từ hóa các quá trình đó: "The acceleration of glacial melting driven by climate warming poses severe threats to coastal settlements."',
  },
  guide: {
    pattern: 'Verb / Adjective / Clause -> Abstract Noun + Prepositional Complement / Modifier -> New Clause Theme',
    whenToUse: [
      'Gói gọn thông tin vừa nêu ở câu trước (rheme) thành một cụm danh từ đóng vai trò chủ đề (theme) mở đầu câu kế tiếp.',
      'Tạo giọng điệu khách quan, khoa học bằng cách dịch chuyển trọng tâm từ người thực hiện hành vi sang bản thân sự kiện/hiện tượng.',
      'Xây dựng các mối quan hệ nhân quả phức tạp thông qua các động từ liên kết nguyên nhân (precipitate, exacerbate, stem from, trigger).',
    ],
    signalWords: ['proliferation', 'deterioration', 'implementation', 'manifestation', 'discrepancy', 'culmination', 'reconfiguration'],
    check: [
      'Đã sử dụng đúng giới từ đi kèm với danh từ phái sinh (ví dụ: investigation into, reaction to, demand for, deterioration of) chưa?',
      'Việc danh từ hóa có làm câu văn trở nên tối nghĩa, quan liêu hoặc che giấu mất tác nhân chịu trách nhiệm cần thiết không?',
      'Động từ chính của câu danh từ hóa có diễn đạt mối quan hệ logic chính xác (drives, accelerates, underlies, mitigates) không?',
    ],
  },
  explanation: 'Danh từ hóa (Nominalisation) là hình thức ẩn dụ ngữ pháp (grammatical metaphor) quan trọng nhất trong tiếng Anh học thuật (Halliday, 1994). Thay vì thể hiện thế giới dưới dạng các hành động cụ thể do con người thực hiện (Human Agent + Action Verb), danh từ hóa biến hành động, phẩm chất hoặc toàn bộ mệnh đề thành các thực thể danh từ trừu tượng (abstract entities). Cơ chế này mang lại ba lợi ích học thuật cốt lõi: 1) Cô đặc thông tin (informational density): nhiều mệnh đề phụ được nén thành một cụm danh từ duy nhất; 2) Đóng gói chủ đề (thematic packaging): biến thông tin mới ở đuôi câu trước thành điểm tựa chủ đề cho câu sau; 3) Tách biệt cảm xúc cá nhân (authorial detachment): tạo lập giọng văn khoa học khách quan. Tuy nhiên, người viết C1 cần cẩn trọng tránh "lạm dụng danh từ hóa" (zombie nouns / bureaucratic fog) làm văn bản trở nên khô cứng, nặng nề và khó hiểu.',
  examples: [
    {
      english: 'The rapid proliferation of synthetic polymers precipitated an unprecedented ecological crisis.',
      vietnamese: 'Sự sinh sôi nhanh chóng của các polyme tổng hợp đã châm ngòi cho một cuộc khủng hoảng sinh thái chưa từng có.',
    },
    {
      english: 'Their investigation into systemic algorithmic bias revealed substantial disparate impact across cohorts.',
      vietnamese: 'Cuộc điều tra của họ về định kiến thuật toán mang tính hệ thống đã phơi bày tác động chênh lệch đáng kể giữa các nhóm dân số.',
    },
    {
      english: 'The sudden depreciation of the currency hindered capital acquisition across import-dependent industries.',
      vietnamese: 'Sự mất giá đột ngột của đồng tiền đã cản trở việc huy động vốn trên khắp các ngành công nghiệp phụ thuộc nhập khẩu.',
    },
    {
      english: 'Persistent resistance to institutional reform frequently stems from entrenched bureaucratic inertia.',
      vietnamese: 'Sự phản kháng dai dẳng đối với cải cách thể chế thường bắt nguồn từ sức ỳ quan liêu thâm căn cố đế.',
    },
    {
      english: 'A complete restructuring of municipal debt obligations became imperative following revenue collapses.',
      vietnamese: 'Một cuộc tái cấu trúc toàn diện các nghĩa vụ nợ đô thị đã trở nên cấp bách sau những đợt sụt giảm nguồn thu.',
    },
    {
      english: 'The consolidation of decentralized data centers resulted in measurable reductions in thermal dissipation.',
      vietnamese: 'Việc hợp nhất các trung tâm dữ liệu phân tán đã mang lại những mức giảm đo lường được trong phát tán nhiệt.',
    },
  ],
  contrasts: [
    {
      form: 'The implementation of the reform caused disruption vs When the ministry implemented the reform, it disrupted business',
      whyFits: 'Cấu trúc danh từ hóa "The implementation of the reform caused disruption" biến quá trình thành chủ thể học thuật cô đọng, phù hợp bài viết nghiên cứu và báo cáo chính sách.',
      whyNot: 'Câu dùng liên từ thời gian "When the ministry implemented..." mang phong cách kể chuyện tường thuật cá nhân, giảm độ trang trọng học thuật.',
    },
    {
      form: 'The clarification of guidelines improved compliance vs The making of a clarification of guidelines',
      whyFits: 'Danh từ hóa trực tiếp "clarification" súc tích, mạch lạc.',
      whyNot: '"The making of a clarification" là lỗi lạm dụng danh từ hóa rườm rà (smothered verb), làm văn phong luộm thuộm.',
    },
  ],
  commonMistakes: [
    'Tạo chuỗi danh từ hóa rườm rà với động từ yếu (ví dụ: "conduct an investigation into" thay vì "investigate" khi ngữ cảnh không cần nén chủ ngữ).',
    'Dùng sai giới từ đi kèm với danh từ phái sinh (ví dụ: nhầm lẫn giữa "investigation of" và "investigation into", hoặc dùng "deterioration in" thay cho "deterioration of").',
    'Lạm dụng danh từ hóa cực đoan khiến chủ thể hành động bị che giấu hoàn toàn trong các báo cáo quy trách nhiệm pháp lý hoặc đạo đức.',
  ],
  summary: 'Danh từ hóa chuyển đổi động từ và tính từ thành danh từ trừu tượng (implement -> implementation, resist -> resistance), nén mệnh đề và thúc đẩy mạch phát triển chủ ngữ học thuật chặt chẽ.',
  exercises: [
    {
      id: 'grammar-v2-c1-nominalisation-19-q1',
      kind: 'choice',
      prompt: 'Select the sentence that most effectively employs nominalisation to achieve concise academic register.',
      options: [
        { text: 'The exhaustion of subterranean aquifers accelerates land subsidence across the central valley.', correct: true, rationale: 'Nominalises process into noun phrase exhaustion of subterranean aquifers as subject of causal verb accelerates.' },
        { text: 'Because subterranean aquifers are getting exhausted, the land is subsiding rapidly in the central valley.', correct: false, rationale: 'Informal clause-combining conversational style.' },
        { text: 'When farmers exhaust aquifers under the land, subsidence happens with high acceleration in the valley.', correct: false, rationale: 'Congruent narrative style lacking nominal compression.' },
        { text: 'The fact that people exhaust the subterranean aquifers causes the land to subside central valley.', correct: false, rationale: 'Clunky clausal perimeter rather than refined nominalisation.' },
      ],
      acceptedAnswers: [{ text: 'The exhaustion of subterranean aquifers accelerates land subsidence across the central valley.', rationale: 'Exemplary academic nominalisation.' }],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q2',
      kind: 'choice',
      prompt: 'Identify the sentence where nominalisation packages prior information into a clear thematic subject.',
      options: [
        { text: 'This sharp divergence in clinical outcomes prompted a retrospective audit of dosing protocols.', correct: true, rationale: 'This sharp divergence in clinical outcomes encapsulates previous findings into an anaphoric thematic nominal subject.' },
        { text: 'Clinical outcomes diverged sharply and therefore doctors decided to audit what they had dosed.', correct: false, rationale: 'Compound coordination lacking academic nominal encapsulation.' },
        { text: 'Because they noticed that outcomes were divergent, an audit was made of dosing protocols.', correct: false, rationale: 'Loose clausal frame with weak smothered verb an audit was made.' },
        { text: 'This diverging thing caused everyone to look at the dosing protocols retrospectively.', correct: false, rationale: 'Vague colloquial phrasing.' },
      ],
      acceptedAnswers: [{ text: 'This sharp divergence in clinical outcomes prompted a retrospective audit of dosing protocols.', rationale: 'Effective thematic packaging via nominalisation.' }],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q3',
      kind: 'choice',
      prompt: 'Choose the correct preposition to complement the nominalised noun: "An exhaustive investigation _____ market manipulation was initiated."',
      options: [
        { text: 'into', correct: true, rationale: 'Investigation takes the preposition into when examining a phenomenon or offence.' },
        { text: 'towards', correct: false, rationale: 'Investigation towards is unidiomatic.' },
        { text: 'onto', correct: false, rationale: 'Investigation onto is ungrammatical.' },
        { text: 'about', correct: false, rationale: 'About is overly conversational for formal academic titles.' },
      ],
      acceptedAnswers: [{ text: 'into', rationale: 'Investigation into is the standard academic collocate.' }],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q4',
      kind: 'choice',
      prompt: 'Which revision best eliminates unhelpful bureaucratic fog (over-nominalisation) while retaining professional precision?',
      options: [
        { text: 'The supervisory committee must evaluate the grant applications expeditiously.', correct: true, rationale: 'Restores the vigorous verb evaluate, eliminating bureaucratic smothered nominals.' },
        { text: 'The conducting of an evaluation of the grant applications is a requirement of the committee.', correct: false, rationale: 'Heavily cluttered with redundant nominalisations (conducting, evaluation, requirement).' },
        { text: 'The committee needs to effectuate the realization of the evaluation process of grant applications.', correct: false, rationale: 'Extreme bureaucratic jargon.' },
        { text: 'There will be an undertaking of an evaluative assessment by the committee regarding applications.', correct: false, rationale: 'Verbose and obscured agency.' },
      ],
      acceptedAnswers: [{ text: 'The supervisory committee must evaluate the grant applications expeditiously.', rationale: 'Clean, dynamic academic phrasing avoiding zombie nouns.' }],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q5',
      kind: 'gap',
      prompt: 'Convert the verb "deteriorate" into an abstract noun: "The gradual _____ of bilateral diplomatic ties raised regional tensions."',
      options: [],
      acceptedAnswers: [
        { text: 'deterioration', rationale: 'Nominalised form of deteriorate is deterioration.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q6',
      kind: 'gap',
      prompt: 'Supply the nominalised form of the adjective "vulnerable": "The report highlights the heightened economic _____ of developing island nations."',
      options: [],
      acceptedAnswers: [
        { text: 'vulnerability', rationale: 'Nominalised form of vulnerable is vulnerability.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q7',
      kind: 'gap',
      prompt: 'Fill in the correct preposition following the nominalised head: "The government’s refusal to yield led to widespread resistance _____ the proposed labor reforms."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: 'Resistance takes the preposition to.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q8',
      kind: 'gap',
      prompt: 'Supply the nominal form of "allocate": "An equitable _____ of research grants ensures balanced innovation."',
      options: [],
      acceptedAnswers: [
        { text: 'allocation', rationale: 'Nominalised form of allocate is allocation.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q9',
      kind: 'transform',
      prompt: 'Nominalise the cause-effect sentence into a single dense academic statement starting with "The degradation": "Because soil quality degraded significantly, agricultural productivity plummeted."',
      options: [],
      acceptedAnswers: [
        { text: 'The significant degradation of soil quality caused a sharp decline in agricultural productivity.', rationale: 'Nominalises both clauses into degradation of soil quality and decline in productivity.' },
        { text: 'The significant degradation of soil quality led to a sharp drop in agricultural productivity.', rationale: 'Accepts led to variant.' },
        { text: 'The degradation of soil quality resulted in plummeted agricultural productivity.', rationale: 'Accepts resulted in variant.' },
        { text: 'The degradation of soil quality led to a plummet in agricultural productivity.', rationale: 'Accepts led to a plummet.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q10',
      kind: 'transform',
      prompt: 'Transform this informal statement into an academic proposition starting with "The expansion": "Companies expanded aggressively into foreign markets, and this created acute supply bottlenecks."',
      options: [],
      acceptedAnswers: [
        { text: 'The aggressive expansion of companies into foreign markets created acute supply bottlenecks.', rationale: 'Nominalises expanded aggressively into aggressive expansion.' },
        { text: 'The aggressive expansion into foreign markets created acute supply bottlenecks.', rationale: 'Accepts ellipsis of companies.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q11',
      kind: 'correction',
      prompt: 'Correct the preposition error after the nominalised noun: "Her insightful critique on the prevailing macroeconomic model received critical acclaim."',
      options: [],
      acceptedAnswers: [
        { text: 'Her insightful critique of the prevailing macroeconomic model received critical acclaim.', rationale: 'Critique takes the dependent preposition of, not on.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-q12',
      kind: 'correction',
      prompt: 'Correct the morphology error in this nominalised subject: "The consume of non-renewable fossil energy reached record levels."',
      options: [],
      acceptedAnswers: [
        { text: 'The consumption of non-renewable fossil energy reached record levels.', rationale: 'Replaces incorrect base verb consume with abstract noun consumption.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-nominalisation-19-r1',
      kind: 'choice',
      prompt: 'Select the optimal academic nominalisation for expressing the underlying mechanism.',
      options: [
        { text: 'The accumulation of toxic metabolites within neural tissue triggered progressive neurodegeneration.', correct: true, rationale: 'Uses accumulation of toxic metabolites as subject with precise academic terminology.' },
        { text: 'When metabolites that were toxic accumulated in the neural tissue, things degenerated progressively.', correct: false, rationale: 'Informal clausal phrasing with vague pronoun things.' },
        { text: 'The accumulating of toxic things happened and caused neurodegeneration to occur.', correct: false, rationale: 'Awkward gerund and non-academic phrasing.' },
      ],
      acceptedAnswers: [{ text: 'The accumulation of toxic metabolites within neural tissue triggered progressive neurodegeneration.', rationale: 'Flawless academic nominalisation.' }],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-r2',
      kind: 'gap',
      prompt: 'Supply the nominalised form of "intervene": "Timely regulatory _____ prevented a catastrophic liquidity run on domestic banks."',
      options: [],
      acceptedAnswers: [
        { text: 'intervention', rationale: 'Nominalised form of intervene is intervention.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-r3',
      kind: 'transform',
      prompt: 'Nominalise the clause into a subject starting with "The exposure": "Workers were exposed to hazardous particulates, which heightened long-term pulmonary risks."',
      options: [],
      acceptedAnswers: [
        { text: 'The exposure of workers to hazardous particulates heightened long-term pulmonary risks.', rationale: 'Transforms were exposed to into nominal head exposure of workers to.' },
        { text: 'The exposure to hazardous particulates heightened long-term pulmonary risks for workers.', rationale: 'Accepts variant with postposed for workers.' },
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-r4',
      kind: 'correction',
      prompt: 'Correct the noun formation error: "The destabilize of regional currencies prompted emergency multilateral talks."',
      options: [],
      acceptedAnswers: [
        { text: 'The destabilization of regional currencies prompted emergency multilateral talks.', rationale: 'Replaces verb destabilize with abstract noun destabilization.' },
        { text: 'The destabilising of regional currencies prompted emergency multilateral talks.', rationale: 'Accepts gerund destabilising/destabilizing variant.' },
        { text: 'The destabilizing of regional currencies prompted emergency multilateral talks.', rationale: 'Accepts US spelling gerund variant.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-nominalisation-19-o1',
      prompt: 'Viết 2 câu học thuật phân tích tác động của biến đổi khí hậu hoặc chuyển đổi số, trong đó câu thứ nhất nêu một hiện tượng và câu thứ hai sử dụng kỹ thuật danh từ hóa đóng gói (thematic packaging - ví dụ: "This rapid transition...", "The escalation of this trend...") làm chủ ngữ để liên kết chặt chẽ với câu trước.',
      modelAnswer: 'Urban centers are experiencing an unprecedented proliferation of autonomous electric delivery fleets. This rapid transition to automated logistics has significantly alleviated localized nitrogen dioxide emissions while intensifying demands on municipal charging infrastructure.',
      checks: [
        'Câu thứ nhất chứa cấu trúc danh từ hóa mô tả một xu hướng hoặc hiện tượng.',
        'Câu thứ hai đóng gói thông tin từ câu một thành cụm danh từ chủ đề (This rapid transition...) làm chủ ngữ.',
        'Tính liên kết logic cao, văn phong học thuật chuẩn C1.',
      ],
    },
    {
      id: 'grammar-v2-c1-nominalisation-19-o2',
      prompt: 'Chuyển đổi một chuỗi mệnh đề nhân quả thông thường ("Because interest rates escalated rapidly, borrowing declined, which caused real estate prices to drop") thành 1 câu học thuật cô đọng duy nhất sử dụng ít nhất hai cấu trúc danh từ hóa và một động từ chỉ quan hệ nhân quả học thuật (precipitated, triggered, resulted in).',
      modelAnswer: 'The rapid escalation of benchmark interest rates precipitated a marked contraction in consumer borrowing, resulting in a pronounced correction in residential real estate valuations.',
      checks: [
        'Danh từ hóa thành công ít nhất hai hành động/quá trình (escalation, contraction, correction).',
        'Sử dụng động từ nhân quả học thuật chính xác (precipitated, triggered, led to).',
        'Câu văn mạch lạc, tránh lỗi lạm dụng danh từ hóa gây tối nghĩa.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-grammatical-metaphor',
      url: 'https://www.routledge.com/Hallidays-Introduction-to-Functional-Grammar/Halliday-Matthiessen/p/book/9780415415781',
      title: 'Halliday: An Introduction to Functional Grammar: Grammatical Metaphor and Nominalisation',
      claims: [
        'Nominalisation functions as the primary grammatical metaphor transforming processes into semantic things.',
        'Academic writing exploits nominalisation to pack information and construct thematic text progression.',
        'Over-nominalisation risks bureaucratic obfuscation by masking agency and circumstantial context.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Editorial Review Agent (AI-Internal)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Comprehensive review completed. Nominalisation as grammatical metaphor, abstract thematic packaging, prepositions with derived nouns, exercises, and Halliday functional grammar sources verified.',
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

export default nominalisationLesson;
