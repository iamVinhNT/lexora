/**
 * @file editing-reference-chains.ts
 * @description C1 lesson on identifying and repairing broken, vague, or ambiguous reference chains (unsupported this, dangling reference, lexical chains) in academic and professional prose.
 */
import type { GrammarLesson } from '../../types.js';

const editingReferenceChainsLesson: GrammarLesson = {
  id: 'grammar-v2-c1-editing-reference-chains-24',
  revisionId: 'grammar-v2-c1-editing-reference-chains-24@1.0.0',
  revision: '1.0.0',
  title: 'Hiệu đính chuỗi quy chiếu và tính chuẩn xác chỉ xuất (Editing Reference Chains)',
  objective: 'Chẩn đoán và khắc phục triệt để các lỗi quy chiếu mờ nhạt (đại từ "this" trơ trọi, đại từ mơ hồ antecedent, mệnh đề which nhập nhằng, phân từ lơ lửng) và thiết lập các chuỗi quy chiếu từ vựng tầng bậc trong văn bản học thuật C1.',
  prerequisiteIds: ['grammar-v2-c1-academic-coherence-23'],
  coverage: ['editing-reference-chains', 'anaphora', 'lexical-chains', 'vague-pronoun-reference', 'cohesion-editing', 'c1-academic-writing'],
  context: {
    english: 'A hallmark of professional prose is anaphoric precision. Novice writers frequently leave pronouns unanchored: "The algorithm detected unusual spending patterns and flagged the transaction. This was unexpected." A discerning C1 editor anchors the reference: "This anomaly was unexpected" or "This automated intervention was unexpected," eliminating all ambiguity.',
    vietnamese: 'Dấu ấn của ngòi bút chuyên nghiệp là tính chính xác trong chỉ xuất quy chiếu (anaphoric precision). Người viết non tay thường để đại từ trôi nổi không điểm tựa: "The algorithm detected unusual spending patterns and flagged the transaction. This was unexpected." Một biên tập viên C1 sắc sảo neo giữ quy chiếu: "This anomaly was unexpected" hoặc "This automated intervention was unexpected", loại bỏ hoàn toàn sự mơ hồ.',
  },
  guide: {
    pattern: 'Vague Pronoun (This / It / Which) -> Demonstrative Determiner (This / These / Such) + Concrete / Shell Noun + Specific Antecedent Tie',
    whenToUse: [
      'Hiệu đính các bản thảo học thuật hoặc báo cáo pháp lý để loại bỏ các đại từ "this" đứng đơn độc (unsupported/rogue "this").',
      'Làm rõ các mệnh đề quan hệ bắt đầu bằng "which" khi chưa rõ nó bổ nghĩa cho danh từ đứng trước hay toàn bộ sự việc ở mệnh đề trước.',
      'Dệt chuỗi quy chiếu từ vựng (lexical reference chains) bằng từ đồng nghĩa, từ thượng vị (hypernyms) và danh từ bao quát để duy trì mạch văn mà không gây trùng lặp.',
    ],
    signalWords: ['this phenomenon', 'such disparities', 'these anomalies', 'the aforementioned', 'this development', 'this intervention'],
    check: [
      'Mỗi đại từ "it", "they", "this" có một tiền đề (antecedent) duy nhất, rõ ràng và gần kề không?',
      'Đại từ chỉ định "this" đã được bổ sung một danh từ tóm tắt (this finding, this outcome) thay vì đứng trơ trọi làm chủ ngữ chưa?',
      'Mệnh đề phân từ ở đầu câu có cùng chủ ngữ logic với mệnh đề chính không (tránh lỗi dangling modifier)?',
    ],
  },
  explanation: 'Chuỗi quy chiếu (Reference Chains) là mạch máu liên kết ngữ nghĩa xuyên suốt văn bản học thuật (Halliday & Hasan, 1976). Ở bậc C1, kỹ năng biên tập chuỗi quy chiếu tập trung vào việc xử lý bốn căn bệnh phổ biến: 1) Đại từ chỉ định trôi nổi (Unsupported / Rogue "This"): Dùng "This" một mình để chỉ một mệnh đề dài phức tạp phía trước khiến người đọc bối rối không biết "This" là toàn bộ hành động, kết quả hay đối tượng bị tác động; biện pháp khắc phục là luôn ghép "This + Noun" (ví dụ: This divergence, This discrepancy); 2) Tiền đề nhập nhằng (Ambiguous Pronoun Antecedents): Khi hai danh từ cùng số xuất hiện trong câu, dùng "they" hoặc "it" sẽ tạo sự cạnh tranh điểm tựa quy chiếu; 3) Mệnh đề "which" quy chiếu lỏng lẻo (Broad / Sentential "which"): Dùng ", which was surprising" có thể gây hiểu lầm là bổ nghĩa cho danh từ đứng ngay trước; 4) Phân từ lơ lửng (Dangling Modifiers): Mệnh đề phân từ rút gọn mở đầu câu không có cùng chủ ngữ với mệnh đề chính làm sai lệch tác nhân hành động (ví dụ: "Having analyzed the data, the conclusion was obvious" -> dữ liệu không thể tự rút ra kết luận). Việc tái cấu trúc chuỗi quy chiếu bằng danh từ thượng vị và danh từ bao quát giúp văn bản đạt độ sáng tỏ và chuẩn xác tối thượng.',
  examples: [
    {
      english: 'Vague: The committee rejected the budget and dismissed the director. This alarmed investors. -> Edited: This sudden dismissal alarmed investors.',
      vietnamese: 'Mơ hồ: Ủy ban bác ngân sách và bãi nhiệm giám đốc. Điều này làm nhà đầu tư lo sợ. -> Đã sửa: Việc bãi nhiệm đột ngột này đã làm các nhà đầu tư lo sợ. (Làm rõ "this" quy chiếu về việc bãi nhiệm).',
    },
    {
      english: 'Vague: The scientists tested the compounds under intense heat, which caused structural degradation. -> Edited: The scientists tested the compounds under intense heat, a process that caused structural degradation.',
      vietnamese: 'Mơ hồ: Các nhà khoa học thử nghiệm hợp chất dưới nhiệt độ cao, điều này gây suy thoái cấu trúc. -> Đã sửa: ...dưới nhiệt độ cao, một quá trình gây ra sự suy thoái kết cấu. (Thay "which" lỏng lẻo bằng cụm đồng vị tóm tắt "a process that").',
    },
    {
      english: 'Dangling: Having completed the baseline survey, the demographic data was compiled. -> Edited: Having completed the baseline survey, the research team compiled the demographic data.',
      vietnamese: 'Lơ lửng: Sau khi hoàn thành khảo sát cơ sở, dữ liệu nhân khẩu học được tổng hợp. -> Đã sửa: Sau khi hoàn thành khảo sát cơ sở, nhóm nghiên cứu đã tổng hợp dữ liệu. (Khắc phục lỗi dangling modifier).',
    },
    {
      english: 'The report highlighted systemic discrepancies between stated municipal priorities and actual capital expenditures. These disparities underscore entrenched fiscal friction.',
      vietnamese: 'Báo cáo làm nổi bật những khác biệt có tính hệ thống giữa các ưu tiên đã tuyên bố của thành phố và chi tiêu vốn thực tế. Những chênh lệch này nhấn mạnh sự ma sát tài khóa thâm căn cố đế. (Dùng "These disparities" làm mắt xích quy chiếu từ vựng).',
    },
    {
      english: 'Researchers observed a sudden influx of migratory waterfowl into the estuarine wetlands. This avian influx coincided with peak seasonal fish spawning.',
      vietnamese: 'Các nhà nghiên cứu ghi nhận một đợt tràn vào đột ngột của chim nước di cư vào vùng đất ngập nước cửa sông. Đợt tràn vào của loài chim này trùng hợp với đỉnh điểm mùa cá đẻ trứng. (Chuỗi quy chiếu từ vựng chuẩn xác).',
    },
    {
      english: 'The central bank expanded open-market operations while the treasury issued sovereign bonds; the former stabilized interbank rates, while the latter funded public infrastructure.',
      vietnamese: 'Ngân hàng trung ương mở rộng các nghiệp vụ thị trường mở trong khi kho bạc phát hành trái phiếu chính phủ; cơ quan thứ nhất ổn định lãi suất liên ngân hàng, trong khi cơ quan thứ hai tài trợ cho cơ sở hạ tầng công cộng.',
    },
  ],
  contrasts: [
    {
      form: 'Edited: "This regulatory inertia paralyzed investment" vs Unedited: "This paralyzed investment"',
      whyFits: '"This regulatory inertia" xác định cụ thể danh từ khái niệm (sự trì trệ quy định) làm nguyên nhân trực tiếp, giúp câu văn cô đọng và sáng rõ tuyệt đối.',
      whyNot: '"This" đứng đơn độc buộc người đọc phải đoán xem sự kiện hay hành động nào trong câu trước là tác nhân làm tê liệt đầu tư.',
    },
    {
      form: 'Edited: "...intense radiation, a factor which accelerated mutation" vs Unedited: "...intense radiation, which accelerated mutation"',
      whyFits: 'Dùng cụm đồng vị "a factor which" khẳng định bức xạ là nhân tố thúc đẩy đột biến, loại trừ mọi mơ hồ cú pháp.',
      whyNot: 'Dùng "which" đơn độc có thể bị hiểu nhầm là bổ nghĩa cho toàn bộ mệnh đề thay vì bản thân bức xạ cường độ cao.',
    },
  ],
  commonMistakes: [
    'Để đại từ chỉ định "this" đứng trơ trọi làm chủ ngữ câu ("This shows that...", "This was problematic") mà không kèm danh từ tóm tắt định nghĩa bản chất sự việc.',
    'Mắc lỗi phân từ lơ lửng (dangling participle) khi rút gọn mệnh đề ở đầu câu, khiến chủ ngữ logic của phân từ bị gán sai cho chủ ngữ ngữ pháp của mệnh đề chính.',
    'Dùng đại từ "it" hoặc "they" khi câu trước có từ 2 danh từ tiềm năng trở lên, tạo sự nhập nhằng tiền đề khiến người đọc hiểu sai ý tác giả.',
  ],
  summary: 'Hiệu đính chuỗi quy chiếu C1 đòi hỏi thay thế đại từ trôi nổi bằng cụm danh từ chỉ định chính xác (this finding, such anomalies), gắn kết phân từ với chủ ngữ logic và sử dụng chuỗi từ vựng đồng nghĩa/thượng vị để duy trì mạch văn chặt chẽ.',
  exercises: [
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q1',
      kind: 'choice',
      prompt: 'Select the revision that most effectively eliminates the vague unsupported "this": "The central bank unexpectedly raised the reserve requirement. This caused immediate turmoil in interbank lending markets."',
      options: [
        { text: 'This policy tightening caused immediate turmoil in interbank lending markets.', correct: true, rationale: 'Anchors the demonstrative with the precise summary noun phrase This policy tightening.' },
        { text: 'This thing caused immediate turmoil in interbank lending markets.', correct: false, rationale: 'Colloquial and imprecise noun thing.' },
        { text: 'This situation caused immediate turmoil in interbank lending markets.', correct: false, rationale: 'Vague shell noun situation lacks analytical precision.' },
        { text: 'This doing of the central bank caused immediate turmoil in interbank lending markets.', correct: false, rationale: 'Awkward ungrammatical phrasing.' },
      ],
      acceptedAnswers: [{ text: 'This policy tightening caused immediate turmoil in interbank lending markets.', rationale: 'Precise analytical encapsulation.' }],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q2',
      kind: 'choice',
      prompt: 'Identify the sentence that repairs the dangling modifier: "Having synthesized the chemical reagent, the purity was confirmed through chromatography."',
      options: [
        { text: 'Having synthesized the chemical reagent, the researchers confirmed its purity through chromatography.', correct: true, rationale: 'Aligns the logical agent researchers as subject of both the participial clause and the main clause.' },
        { text: 'Having synthesized the chemical reagent, chromatography confirmed the purity.', correct: false, rationale: 'Chromatography cannot perform the synthesis; dangling modifier persists.' },
        { text: 'Synthesizing the chemical reagent, the purity confirmation occurred via chromatography.', correct: false, rationale: 'Dangling modifier remains uncorrected.' },
        { text: 'Having synthesized the chemical reagent, it was confirmed that purity was high.', correct: false, rationale: 'Dummy pronoun it cannot perform the chemical synthesis.' },
      ],
      acceptedAnswers: [{ text: 'Having synthesized the chemical reagent, the researchers confirmed its purity through chromatography.', rationale: 'Correct resolution of dangling modifier.' }],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q3',
      kind: 'choice',
      prompt: 'Choose the sentence that resolves the ambiguous antecedent between the two competing plural nouns: "The regulators interviewed the compliance officers, but they failed to recognize the severity of the infractions."',
      options: [
        { text: 'The regulators interviewed the compliance officers, but the officers failed to recognize the severity of the infractions.', correct: true, rationale: 'Replaces ambiguous pronoun they with the specific noun the officers.' },
        { text: 'The regulators interviewed the compliance officers, but they themselves failed to recognize the severity of the infractions.', correct: false, rationale: 'Intensive pronoun themselves fails to disambiguate whether regulators or officers are meant.' },
        { text: 'The regulators interviewed the compliance officers, and they were unaware of the infractions.', correct: false, rationale: 'Pronoun they remains completely ambiguous between regulators and officers.' },
        { text: 'The regulators interviewed the compliance officers, where they failed to recognize the severity of infractions.', correct: false, rationale: 'Ungrammatical locative relative where and ambiguous pronoun they.' },
      ],
      acceptedAnswers: [{ text: 'The regulators interviewed the compliance officers, but the officers failed to recognize the severity of the infractions.', rationale: 'Direct lexical disambiguation.' }],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q4',
      kind: 'choice',
      prompt: 'Select the revision that replaces an ambiguous sentential "which" with an appositive noun phrase: "The government subsidized deep-water oil drilling, which drew fierce condemnation from climate scientists."',
      options: [
        { text: 'The government subsidized deep-water oil drilling, a decision that drew fierce condemnation from climate scientists.', correct: true, rationale: 'Appositive noun phrase a decision that cleanly encapsulates the proposition.' },
        { text: 'The government subsidized deep-water oil drilling, and which drew fierce condemnation from climate scientists.', correct: false, rationale: 'Ungrammatical coordination and which.' },
        { text: 'The government subsidized deep-water oil drilling, what drew fierce condemnation from climate scientists.', correct: false, rationale: 'Incorrect relative what.' },
        { text: 'The government subsidized deep-water oil drilling, with which drew fierce condemnation from climate scientists.', correct: false, rationale: 'Ungrammatical prepositional relative clause.' },
      ],
      acceptedAnswers: [{ text: 'The government subsidized deep-water oil drilling, a decision that drew fierce condemnation from climate scientists.', rationale: 'Elegant appositive noun encapsulation.' }],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q5',
      kind: 'gap',
      prompt: 'Anchor the demonstrative pronoun with an appropriate summary noun: "The team discovered an irreconcilable variance in the trial data. This _____ necessitated a complete re-audit." (discrepancy / inconsistency)',
      options: [],
      acceptedAnswers: [
        { text: 'discrepancy', rationale: 'Shell noun discrepancy accurately defines variance in trial data.' },
        { text: 'inconsistency', rationale: 'Accepts inconsistency as a valid synonym.' },
        { text: 'variance', rationale: 'Accepts direct lexical echo variance.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q6',
      kind: 'gap',
      prompt: 'Complete the appositive noun phrase replacing loose which: "The reactor reached supercritical temperatures, an _____ that triggered automated emergency shutdowns." (event / occurrence)',
      options: [],
      acceptedAnswers: [
        { text: 'event', rationale: 'Appositive noun an event that encapsulates the incident.' },
        { text: 'occurrence', rationale: 'Accepts an occurrence.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q7',
      kind: 'gap',
      prompt: 'Supply the demonstrative determiner to form a cohesive lexical chain: "Several specimens exhibited severe structural necrosis. _____ pathological changes were irreversible." (These / Such)',
      options: [],
      acceptedAnswers: [
        { text: 'These', rationale: 'Demonstrative These forms the anaphoric cohesive tie.' },
        { text: 'Such', rationale: 'Accepts determinative Such.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q8',
      kind: 'gap',
      prompt: 'Supply the hypernym (superordinate noun) to replace the repetitive mention of "lions, leopards, and cheetahs": "The reserve protects lions, leopards, and cheetahs; these large _____ require expansive contiguous habitats." (carnivores / predators)',
      options: [],
      acceptedAnswers: [
        { text: 'predators', rationale: 'Superordinate hypernym predators avoids repetitive listing.' },
        { text: 'carnivores', rationale: 'Accepts carnivores.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q9',
      kind: 'transform',
      prompt: 'Edit the sentence to resolve the dangling modifier: "Upon reviewing the financial ledgers, several unexplained accounting discrepancies were noted."',
      options: [],
      acceptedAnswers: [
        { text: 'Upon reviewing the financial ledgers, the auditors noted several unexplained accounting discrepancies.', rationale: 'Introduces the human agent the auditors as the grammatical subject.' },
        { text: 'Upon reviewing the financial ledgers, the auditors noticed several unexplained accounting discrepancies.', rationale: 'Accepts verb noticed.' },
        { text: 'Upon reviewing the financial ledgers, investigators noted several unexplained accounting discrepancies.', rationale: 'Accepts investigators.' },
        { text: 'Upon reviewing the financial ledgers, accountants noted several unexplained accounting discrepancies.', rationale: 'Accepts accountants.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q10',
      kind: 'transform',
      prompt: 'Replace the vague standalone "This" with a demonstrative phrase using "development": "The two rival telecommunications giants agreed to merge their fiber networks. This stunned market analysts."',
      options: [],
      acceptedAnswers: [
        { text: 'This unexpected development stunned market analysts.', rationale: 'Anchors This with the modifier and summary noun development.' },
        { text: 'This development stunned market analysts.', rationale: 'Accepts unmodified This development.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q11',
      kind: 'correction',
      prompt: 'Correct the pronoun ambiguity in this sentence: "The researchers presented their models to the advisory committee, but they were deeply flawed."',
      options: [],
      acceptedAnswers: [
        { text: 'The researchers presented their models to the advisory committee, but the models were deeply flawed.', rationale: 'Replaces ambiguous pronoun they with the specific noun the models.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-q12',
      kind: 'correction',
      prompt: 'Correct the dangling participle error: "Having failed to secure regulatory clearance, the pharmaceutical project was abandoned."',
      options: [],
      acceptedAnswers: [
        { text: 'Having failed to secure regulatory clearance, the company abandoned the pharmaceutical project.', rationale: 'Restores the true logical agent the company as main clause subject.' },
        { text: 'Having failed to secure regulatory clearance, the developers abandoned the pharmaceutical project.', rationale: 'Accepts the developers.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-r1',
      kind: 'choice',
      prompt: 'Select the edited version that exhibits flawless reference precision and eliminates pronoun ambiguity.',
      options: [
        { text: 'The minister conferred with the regional governor before the governor announced the state of emergency.', correct: true, rationale: 'Replaces ambiguous pronoun he with the explicit title the governor.' },
        { text: 'The minister conferred with the regional governor before he announced the state of emergency.', correct: false, rationale: 'Ambiguous pronoun he leaves unclear whether minister or governor made the announcement.' },
        { text: 'The minister conferred with the governor, who then made this announcement about it.', correct: false, rationale: 'Vague pronouns this and it clutter the predicate.' },
      ],
      acceptedAnswers: [{ text: 'The minister conferred with the regional governor before the governor announced the state of emergency.', rationale: 'Definitive resolution of referential ambiguity.' }],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-r2',
      kind: 'gap',
      prompt: 'Anchor the demonstrative with the precise shell noun: "The municipal council voted to slash healthcare subsidies. This regressive _____ triggered citywide civic unrest." (measure / decision)',
      options: [],
      acceptedAnswers: [
        { text: 'measure', rationale: 'Shell noun measure defines the legislative cut.' },
        { text: 'decision', rationale: 'Accepts decision.' },
        { text: 'policy', rationale: 'Accepts policy.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-r3',
      kind: 'transform',
      prompt: 'Repair the dangling modifier starting with "Having analyzed the telemetry": "Having analyzed the telemetry, the orbital trajectory was deemed unstable by engineers."',
      options: [],
      acceptedAnswers: [
        { text: 'Having analyzed the telemetry, engineers deemed the orbital trajectory unstable.', rationale: 'Aligns engineers as subject of the active main clause.' },
        { text: 'Having analyzed the telemetry, the engineers deemed the orbital trajectory unstable.', rationale: 'Accepts the engineers with definite article.' },
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-r4',
      kind: 'correction',
      prompt: 'Correct the unsupported "this" in this academic paper excerpt: "The specimen degraded under ultraviolet exposure. This confirms our hypothesis."',
      options: [],
      acceptedAnswers: [
        { text: 'This degradation confirms our hypothesis.', rationale: 'Nominalises process into This degradation as subject.' },
        { text: 'This finding confirms our hypothesis.', rationale: 'Accepts shell noun This finding.' },
        { text: 'This result confirms our hypothesis.', rationale: 'Accepts This result.' },
        { text: 'The specimen degraded under ultraviolet exposure. This degradation confirms our hypothesis.', rationale: 'Accepts full two-sentence revision.' },
        { text: 'The specimen degraded under ultraviolet exposure. This finding confirms our hypothesis.', rationale: 'Accepts full two-sentence revision with finding.' },
        { text: 'The specimen degraded under ultraviolet exposure. This result confirms our hypothesis.', rationale: 'Accepts full two-sentence revision with result.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-o1',
      prompt: 'Viết 2 câu trong bài báo cáo nghiên cứu hoặc văn kiện pháp lý: câu thứ nhất trình bày một diễn biến hoặc sai sót kỹ thuật phức tạp; câu thứ hai mở đầu bằng một cụm danh từ chỉ định chính xác (Demonstrative + Shell Noun, ví dụ: "This procedural oversight...", "This structural deficiency...") thay vì dùng "This" đơn độc, và duy trì chuỗi liên kết từ vựng chuẩn xác.',
      modelAnswer: 'The quality assurance team failed to calibrate the cryogenic storage sensors prior to specimen transfer. This procedural oversight compromised the thermal stability of forty biological samples, rendering the experimental cohort statistically unusable.',
      checks: [
        'Câu thứ nhất trình bày rõ ràng sự cố hoặc quá trình.',
        'Câu thứ hai sử dụng "This procedural oversight" (hoặc cụm danh từ tóm tắt tương đương) làm chủ ngữ, loại bỏ hoàn toàn rogue "this".',
        'Chuỗi quy chiếu từ vựng mạch lạc và chính xác tuyệt đối.',
      ],
    },
    {
      id: 'grammar-v2-c1-editing-reference-chains-24-o2',
      prompt: 'Viết 1 câu học thuật phức hợp mở đầu bằng một mệnh đề phân từ rút gọn (Having + V3 hoặc Upon + V-ing) và đảm bảo chủ ngữ của mệnh đề chính là tác nhân logic đích thực (tránh hoàn toàn lỗi phân từ lơ lửng - dangling modifier), kết thúc bằng một cụm đồng vị tóm tắt thay thế cho mệnh đề "which" lỏng lẻo.',
      modelAnswer: 'Having isolated the anomalous protein sequence from the biological sample, the biochemical researchers mapped its structural coordinates, an empirical breakthrough that clarified the receptor binding mechanism.',
      checks: [
        'Mệnh đề phân từ hoàn thành (Having isolated...) chia sẻ cùng chủ ngữ logic với mệnh đề chính (the biochemical researchers).',
        'Tuyệt đối không mắc lỗi dangling modifier.',
        'Kết thúc câu bằng cụm đồng vị tóm tắt (an empirical breakthrough that...) thay vì dùng ", which".',
      ],
    },
  ],
  sources: [
    {
      id: 'swales-feak-academic-writing',
      url: 'https://press.umich.edu/Books/A/Academic-Writing-for-Graduate-Students-3rd-Edition',
      title: 'Swales & Feak: Academic Writing for Graduate Students (Reference Precision and Summary Nouns)',
      claims: [
        'Unsupported demonstratives (vague this) impair reader comprehension and thematic tracking.',
        'Dangling participles disrupt agent attribution in formal scientific reporting.',
        'Lexical chains and appositive summaries establish robust anaphoric coherence across complex paragraphs.',
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
    summary: 'Verified all 12 exercises, 4 review exercises, 2 output prompts, and updated reference chain source to Swales & Feak Academic Writing for Graduate Students.',
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

export default editingReferenceChainsLesson;
