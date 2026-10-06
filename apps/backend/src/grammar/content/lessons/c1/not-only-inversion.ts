/**
 * @file not-only-inversion.ts
 * @description C1 lesson on inversion with correlative "not only" in formal syntax.
 */
import type { GrammarLesson } from '../../types.js';

const notOnlyInversionLesson: GrammarLesson = {
  id: 'grammar-v2-c1-not-only-inversion-02',
  revisionId: 'grammar-v2-c1-not-only-inversion-02@1.0.0',
  revision: '1.0.0',
  title: 'Đảo ngữ với Not Only trong câu ghép (Not Only Inversion)',
  objective: 'Làm chủ cấu trúc đảo ngữ ở mệnh đề đầu với "Not only" để nhấn mạnh hai sự việc song song hoặc tăng tiến, đồng thời duy trì trật tự xuôi chuẩn xác ở mệnh đề thứ hai.',
  prerequisiteIds: ['grammar-v2-c1-negative-adverb-inversion-01'],
  coverage: ['not-only-inversion', 'not-only-but-also', 'parallel-structure', 'clausal-inversion', 'formal-register'],
  context: {
    english: 'In persuasive essays, formal rhetoric, and scholarly commentary, initiating a compound structure with "Not only" highlights dual benefits or compounding consequences with stylistic gravity.',
    vietnamese: 'Trong bài luận thuyết phục, diễn văn trang trọng và nhận định học thuật, bắt đầu câu ghép bằng "Not only" giúp làm nổi bật hai lợi ích hoặc hệ quả song hành với phong thái đĩnh đạc và thuyết phục.',
  },
  guide: {
    pattern: 'Not only + Auxiliary Verb + Subject + Main Verb, but (Subject) + also + Verb (+ as well)',
    whenToUse: [
      'Nhấn mạnh hai hành động, thuộc tính hoặc sự kiện có tính chất bổ trợ hoặc tăng tiến trong văn cảnh trang trọng.',
      'Tạo sự tương phản mạnh mẽ hoặc dẫn dắt người đọc tới luận điểm thứ hai có sức nặng lớn hơn.',
    ],
    signalWords: ['not only... but also', 'not only... but... as well', 'not only did', 'not only does', 'not only has'],
    check: [
      'Đã đảo trợ động từ lên trước chủ ngữ ở mệnh đề "Not only" chưa?',
      'Mệnh đề sau "but (also)" có giữ trật tự câu xuôi bình thường không (tuyệt đối không đảo ngữ ở mệnh đề thứ hai)?',
      'Đã phân biệt trường hợp Not only nối hai mệnh đề (phải đảo ngữ) với trường hợp Not only nối hai cụm danh từ làm chủ ngữ (không đảo ngữ)?',
    ],
  },
  explanation: 'Khi cụm liên từ "Not only" đứng ở đầu câu để liên kết hai mệnh đề trọn vẹn, mệnh đề đầu tiên bắt buộc phải đảo trợ động từ lên trước chủ ngữ (Not only did / does / has S + V). Mệnh đề thứ hai được liên kết bằng "but", "but also", hoặc "but... as well" và giữ nguyên trật tự chủ-vị thông thường. Cần phân biệt rành mạch: nếu "Not only" chỉ đóng vai trò liên từ đẳng lập nối hai cụm danh từ cùng làm chủ ngữ ("Not only the director but also the analysts were consulted"), câu không xảy ra hiện tượng đảo ngữ.',
  examples: [
    {
      english: 'Not only did the clinical trial validate the vaccine\'s efficacy, but it also revealed unexpected immunological benefits.',
      vietnamese: 'Không những thử nghiệm lâm sàng xác thực hiệu quả của vắc-xin, mà nó còn hé lộ những lợi ích miễn dịch bất ngờ.',
    },
    {
      english: 'Not only does the revised zoning framework protect arable land, but it also fosters sustainable housing density.',
      vietnamese: 'Không những khung phân vùng sửa đổi bảo vệ quỹ đất canh tác, mà nó còn thúc đẩy mật độ nhà ở bền vững.',
    },
    {
      english: 'Not only have institutional investors divested from fossil equities, but they have also channeled capital into grid storage.',
      vietnamese: 'Không những các nhà đầu tư tổ chức đã thoái vốn khỏi cổ phiếu nhiên liệu hóa thạch, mà họ còn rót vốn vào công nghệ lưu trữ lưới điện.',
    },
    {
      english: 'Not only was the original hypothesis mathematically unsound, but the empirical methodology was also fundamentally flawed.',
      vietnamese: 'Không những giả thuyết ban đầu sai lầm về mặt toán học, mà phương pháp thực nghiệm cũng mang khiếm khuyết cơ bản.',
    },
    {
      english: 'Not only can generative models parse convoluted statutory syntax, but they can also draft routine compliance briefs.',
      vietnamese: 'Không chỉ các mô hình sinh ngữ có thể phân tích cú pháp luật định phức tạp, mà chúng còn có thể soạn thảo tóm tắt tuân thủ định kỳ.',
    },
    {
      english: 'Not only did the conservators restore the ancient fresco ahead of schedule, but they also identified previously uncatalogued inscriptions.',
      vietnamese: 'Không những các chuyên viên phục chế phục hồi bức tranh tường cổ trước thời hạn, mà họ còn nhận diện được những văn khắc chưa từng được lập danh mục.',
    },
  ],
  contrasts: [
    {
      form: 'Not only did the monetary policy curb core inflation, but it also stabilized interbank liquidity.',
      whyFits: 'Đảo did lên trước the monetary policy ở mệnh đề đầu; mệnh đề sau giữ trật tự xuôi với it also stabilized.',
      whyNot: '"Not only the monetary policy curbed inflation..." sai vì thiếu đảo ngữ sau Not only đứng đầu câu. "Not only did the policy curb... but also did it stabilize..." sai vì đảo ngữ cả mệnh đề sau but.',
    },
    {
      form: 'Not only the department head but also the senior investigators were briefed on the protocol change.',
      whyFits: 'Not only ở đây chỉ nối hai cụm danh từ làm chủ ngữ phức hợp, động từ were briefed chia theo chủ ngữ gần nhất investigators.',
      whyNot: '"Not only were the department head but also the senior investigators briefed..." sai vì đảo ngữ không áp dụng khi Not only liên kết danh từ chủ ngữ.',
    },
  ],
  commonMistakes: [
    'Đảo ngữ cả ở mệnh đề thứ hai (viết "Not only did she write the monograph, but also did she edit the journal").',
    'Bỏ qua trợ động từ ở mệnh đề đầu (viết "Not only he resolved the discrepancy, but he also...").',
    'Nhầm lẫn giữa đảo mệnh đề và liên từ nối chủ ngữ (viết *"Not only was the manager but also the staff present").',
  ],
  summary: 'Not only đứng đầu mệnh đề đòi hỏi đảo trợ động từ lên trước chủ ngữ ở mệnh đề đầu; mệnh đề thứ hai sau "but (also)" giữ nguyên trật tự khẳng định chuẩn. Khi Not only nối hai chủ ngữ, không áp dụng đảo ngữ.',
  exercises: [
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q1',
      kind: 'choice',
      prompt: 'Select the correct inverted clause: "Not only ___ the municipal archives, but they also digitized thousands of rare colonial cartographic records."',
      options: [
        { text: 'did the historians catalogue', correct: true, rationale: 'Auxiliary did precedes subject the historians, followed by base verb catalogue.' },
        { text: 'the historians catalogued', correct: false, rationale: 'Fails to invert auxiliary and subject after initial Not only.' },
        { text: 'catalogued the historians', correct: false, rationale: 'Cannot invert a lexical past-tense verb directly without auxiliary do-support.' },
        { text: 'did the historians catalogued', correct: false, rationale: 'Double past marking: auxiliary did requires base infinitive catalogue.' },
      ],
      acceptedAnswers: [{ text: 'did the historians catalogue', rationale: 'Correct negative auxiliary inversion.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q2',
      kind: 'choice',
      prompt: 'Choose the correct continuation: "Not only does the computational algorithm detect seismic tremors, ___ the probable epicenter within milliseconds."',
      options: [
        { text: 'but it also calculates', correct: true, rationale: 'Retains standard subject-verb order in second clause with coordinating but it also.' },
        { text: 'but also does it calculate', correct: false, rationale: 'The second clause must not undergo inversion.' },
        { text: 'and also calculates it', correct: false, rationale: 'Lacks standard correlative coordination and incorrectly inverts pronoun position.' },
        { text: 'but calculates it also', correct: false, rationale: 'Awkward unidiomatic placement of verb before subject.' },
      ],
      acceptedAnswers: [{ text: 'but it also calculates', rationale: 'Standard uninverted second clause.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q3',
      kind: 'choice',
      prompt: 'Identify the sentence with correct subject coordination without inappropriate inversion.',
      options: [
        { text: 'Not only the chief editor but also the associate reviewers were recognized for their contributions.', correct: true, rationale: 'When Not only coordinates noun phrase subjects, standard S-V agreement applies without inversion.' },
        { text: 'Not only was the chief editor but also the associate reviewers recognized for their contributions.', correct: false, rationale: 'Inversion should not be applied to coordinated noun subjects.' },
        { text: 'Not only did the chief editor but also the associate reviewers were recognized.', correct: false, rationale: 'Spurious auxiliary insertion before conjoined subjects.' },
        { text: 'Were recognized not only the chief editor but also the reviewers.', correct: false, rationale: 'Incorrect predicate fronting.' },
      ],
      acceptedAnswers: [{ text: 'Not only the chief editor but also the associate reviewers were recognized for their contributions.', rationale: 'Correct non-inverted subject coordination.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q4',
      kind: 'choice',
      prompt: 'Complete the sentence: "Not only ___ to negotiate mutually acceptable terms, but they also severed diplomatic communications."',
      options: [
        { text: 'did the delegates fail', correct: true, rationale: 'Past simple auxiliary did precedes subject the delegates, matching subsequent past severed.' },
        { text: 'the delegates failed', correct: false, rationale: 'Missing required inversion after clausal Not only.' },
        { text: 'have the delegates failed', correct: false, rationale: 'Tense mismatch with subsequent past tense severed.' },
        { text: 'failed the delegates', correct: false, rationale: 'Lexical verb cannot precede subject without auxiliary.' },
      ],
      acceptedAnswers: [{ text: 'did the delegates fail', rationale: 'Past auxiliary did followed by subject and base verb.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q5',
      kind: 'gap',
      prompt: 'Supply the appropriate singular present auxiliary: "Not only _____ (do / does) the renewable initiative lower carbon emissions, but it also creates sustainable local employment."',
      options: [],
      acceptedAnswers: [{ text: 'does', rationale: 'Singular present auxiliary does agrees with subject the renewable initiative.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q6',
      kind: 'gap',
      prompt: 'Fill in the correct auxiliary: "Not only _____ (have / had) philanthropic foundations pledged matching funds, but corporate donors have also broadened their endowments."',
      options: [],
      acceptedAnswers: [{ text: 'have', rationale: 'Present perfect auxiliary have agrees with plural foundations.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q7',
      kind: 'gap',
      prompt: 'Supply the correlative conjunction introducing the second clause: "Not only did the architect conserve the historic stonework, _____ she also integrated passive geothermal ventilation."',
      options: [],
      acceptedAnswers: [{ text: 'but', rationale: 'But is the coordinating conjunction pairing with Not only.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q8',
      kind: 'gap',
      prompt: 'Insert the adverb reinforcing addition in the second clause: "Not only was the translation linguistically faithful, but it was _____ remarkably evocative of the author\'s original cadence."',
      options: [],
      acceptedAnswers: [
        { text: 'also', rationale: 'Also is the standard adverb placed after auxiliary was in the second clause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q9',
      kind: 'transform',
      prompt: 'Rewrite using initial "Not only": "The pharmaceutical lab not only synthesized the novel compound, but it also published the crystallography data open-access."',
      options: [],
      acceptedAnswers: [
        { text: 'Not only did the pharmaceutical lab synthesize the novel compound, but it also published the crystallography data open-access.', rationale: 'Fronts Not only, inverts auxiliary did before the subject, and uses base verb synthesize.' },
      ],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q10',
      kind: 'transform',
      prompt: 'Rewrite using initial "Not only": "The appellate ruling not only clarified statutory ambiguity, but it also established a binding legal precedent."',
      options: [],
      acceptedAnswers: [
        { text: 'Not only did the appellate ruling clarify statutory ambiguity, but it also established a binding legal precedent.', rationale: 'Fronts Not only with auxiliary did inverted before subject the appellate ruling.' },
      ],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Not only the committee sanctioned the proposal, but it also allocated supplemental reserve funding."',
      options: [],
      acceptedAnswers: [
        { text: 'Not only did the committee sanction the proposal, but it also allocated supplemental reserve funding.', rationale: 'Inverts auxiliary did before the committee and changes sanctioned to base verb sanction.' },
      ],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-q12',
      kind: 'correction',
      prompt: 'Correct the erroneous double inversion: "Not only did the consortium upgrade the telemetry array, but also did they recalibrate the orbital tracking sensors."',
      options: [],
      acceptedAnswers: [
        { text: 'Not only did the consortium upgrade the telemetry array, but they also recalibrated the orbital tracking sensors.', rationale: 'Restores standard uninverted order in the second clause.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-not-only-inversion-02-r1',
      kind: 'choice',
      prompt: 'Choose the correct inverted clause: "Not only ___ the committee\'s statutory recommendations, but parliament also expedited the implementation decree."',
      options: [
        { text: 'did lawmakers endorse', correct: true, rationale: 'Auxiliary did precedes subject lawmakers, followed by base verb endorse.' },
        { text: 'lawmakers endorsed', correct: false, rationale: 'Missing inversion after clausal Not only.' },
        { text: 'endorsed lawmakers', correct: false, rationale: 'Direct lexical inversion without auxiliary is ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'did lawmakers endorse', rationale: 'Correct auxiliary inversion.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-r2',
      kind: 'gap',
      prompt: 'Complete with the past auxiliary: "Not only _____ the envoy deliver the formal protest, but she also outlined concrete remediation steps."',
      options: [],
      acceptedAnswers: [{ text: 'did', rationale: 'Past auxiliary did matches delivery of historical action.' }],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-r3',
      kind: 'transform',
      prompt: 'Rewrite starting with "Not only": "The smart grid framework not only curtails peak energy demand, but it also enhances distribution stability."',
      options: [],
      acceptedAnswers: [
        { text: 'Not only does the smart grid framework curtail peak energy demand, but it also enhances distribution stability.', rationale: 'Inverts present auxiliary does before singular subject the smart grid framework.' },
      ],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "Not only she drafted the charter, but she also spearheaded the legislative ratification drive."',
      options: [],
      acceptedAnswers: [
        { text: 'Not only did she draft the charter, but she also spearheaded the legislative ratification drive.', rationale: 'Inserts auxiliary did before subject she and converts drafted to base verb draft.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-not-only-inversion-02-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng "Not only did / does..., but... also..." để phân tích hai tác động tích cực của một giải pháp công nghệ hoặc chính sách môi trường.',
      modelAnswer: 'Not only does decentralized solar generation diminish municipal reliance on fossil thermal plants, but it also democratizes local energy autonomy across rural cooperatives.',
      checks: [
        'Sử dụng cấu trúc Not only ở đầu câu kết hợp mệnh đề thứ hai với but... also.',
        'Đảo trợ động từ (does/did/has) chính xác ở mệnh đề đầu.',
        'Duy trì trật tự xuôi hoàn chỉnh ở mệnh đề thứ hai.',
      ],
    },
    {
      id: 'grammar-v2-c1-not-only-inversion-02-o2',
      prompt: 'Viết 1-2 câu trong báo cáo chuyên nghiệp chỉ ra hai khuyết tật hệ thống, dùng "Not only was / were..., but... was / were also...".',
      modelAnswer: 'Not only were the legacy authentication protocols vulnerable to credential stuffing attacks, but the backup recovery servers were also severely desynchronized.',
      checks: [
        'Sử dụng Not only kết hợp trợ động từ to be (was/were) đảo lên trước chủ ngữ.',
        'Mệnh đề sau dùng trật tự khẳng định xuôi với also.',
        'Từ vựng chính xác, ngữ cảnh báo cáo kỹ thuật rõ ràng.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-inversion-not-only',
      title: 'English Grammar Today: Inversion',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/inversion',
      claims: [
        'Initial Not only connecting clauses triggers auxiliary-subject inversion in the first clause.',
        'The second clause introduced by but (also) maintains standard affirmative subject-verb order.',
        'Coordination of noun phrases by not only... but also does not trigger inversion.',
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
    summary: 'Comprehensive review completed. Initial clausal Not only inversion, second-clause affirmative order, non-inverted subject coordination, exercises, and sources verified.',
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

export default notOnlyInversionLesson;
