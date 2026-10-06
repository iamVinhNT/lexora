/**
 * @file conditional-inversion.ts
 * @description C1 lesson on conditional inversion with Should, Were, and Had in formal discourse.
 */
import type { GrammarLesson } from '../../types.js';

const conditionalInversionLesson: GrammarLesson = {
  id: 'grammar-v2-c1-conditional-inversion-03',
  revisionId: 'grammar-v2-c1-conditional-inversion-03@1.0.0',
  revision: '1.0.0',
  title: 'Đảo ngữ câu điều kiện (Conditional Inversion: Should, Were, Had)',
  objective: 'Thành thạo kỹ thuật lược bỏ liên từ "if" và đảo trợ động từ Should, Were, Had lên đầu mệnh đề điều kiện trong văn bản pháp lý, ngoại giao và học thuật cao cấp.',
  prerequisiteIds: ['grammar-v2-c1-not-only-inversion-02'],
  coverage: ['conditional-inversion', 'had-inversion', 'were-inversion', 'should-inversion', 'hypothetical-conditionals'],
  context: {
    english: 'In diplomatic accords, legal covenants, and high-register academic writing, conditional clauses frequently omit "if" and front the auxiliary to convey stylistic poise, precision, and formality.',
    vietnamese: 'Trong hiệp ước ngoại giao, quy ước pháp lý và văn bản học thuật cao cấp, mệnh đề điều kiện thường lược bỏ "if" và đưa trợ động từ lên đầu câu nhằm tạo phong thái đĩnh đạc, chuẩn xác và trang trọng.',
  },
  guide: {
    pattern: 'Should + Subject + Base Verb (Type 1) | Were + Subject (+ to-Infinitive / Complement) (Type 2) | Had + Subject + Past Participle (Type 3)',
    whenToUse: [
      'Thay thế "if" trong thư tín thương mại, hợp đồng pháp lý hoặc văn phong học thuật để tăng tính trang trọng.',
      'Nhấn mạnh tình huống giả định ít có khả năng xảy ra (Should S + V) hoặc hoàn toàn trái ngược với thực tế (Were S... / Had S + V3).',
    ],
    signalWords: ['should you require', 'were the board to approve', 'had we known', 'had it not been for', 'were it not for'],
    check: [
      'Đã lược bỏ hoàn toàn "if" khi đảo Should / Were / Had lên đầu câu chưa?',
      'Ở thể phủ định, đã đặt "not" sau chủ ngữ (Had / Were / Should + S + not) thay vì viết tắt Hadn\'t / Weren\'t / Shouldn\'t chưa?',
      'Với động từ thường ở loại 2, đã sử dụng cấu trúc "Were + S + to-Infinitive" chưa?',
    ],
  },
  explanation: 'Đảo ngữ câu điều kiện loại bỏ liên từ "if" bằng cách đưa ba trợ động từ đặc trưng lên đầu mệnh đề: Should (loại 1 - diễn tả khả năng thấp hoặc ngữ cảnh lịch sự), Were (loại 2 - giả định hiện tại/tương lai, dùng "Were + S + to V" cho động từ thường hoặc "Were + S + adj/noun" cho to be), và Had (loại 3 - giả định quá khứ). Điểm cốt tử trong văn phong C1 là thể phủ định: tuyệt đối không viết tắt n\'t lên đầu câu (không viết Hadn\'t we), mà phải đặt "not" ngay sau chủ ngữ (Had we not, Were the state not to). Hai cấu trúc đặc biệt thường gặp là "Were it not for + N" (nếu không vì/hiện tại) và "Had it not been for + N" (nếu không nhờ có/quá khứ).',
  examples: [
    {
      english: 'Should you require further clarification regarding the contractual covenants, please contact the legal secretariat.',
      vietnamese: 'Nếu quý vị cần làm rõ thêm về các điều khoản hợp đồng, xin vui lòng liên hệ ban thư ký pháp lý.',
    },
    {
      english: 'Were the supervisory committee to sanction the merger, antitrust scrutiny would intensify immediately.',
      vietnamese: 'Nếu ủy ban giám sát phê duyệt vụ sáp nhập, sự giám sát chống độc quyền sẽ gia tăng ngay lập tức.',
    },
    {
      english: 'Were it not for substantial philanthropic endowments, the institute could hardly sustain its particle physics laboratory.',
      vietnamese: 'Nếu không nhờ các khoản tài trợ từ thiện to lớn, viện nghiên cứu khó có thể duy trì phòng thí nghiệm vật lý hạt.',
    },
    {
      english: 'Had the diagnostic protocol detected the mutation earlier, the therapeutic intervention might have proven far more effective.',
      vietnamese: 'Giá như quy trình chẩn đoán phát hiện đột biến sớm hơn, can thiệp điều trị có thể đã chứng minh được hiệu quả cao hơn nhiều.',
    },
    {
      english: 'Had it not been for the decisive intervention of the central bank, systemic contagion would have engulfed regional lenders.',
      vietnamese: 'Nếu không nhờ sự can thiệp quyết đoán của ngân hàng trung ương, sự lây lan mang tính hệ thống đã nhấn chìm các ngân hàng khu vực.',
    },
    {
      english: 'Should any material discrepancy arise during the fiscal reconciliation, the external auditors must be notified without delay.',
      vietnamese: 'Nếu có bất kỳ sự sai lệch trọng yếu nào phát sinh trong quá trình đối soát tài chính, các kiểm toán viên độc lập phải được thông báo ngay lập tức.',
    },
  ],
  contrasts: [
    {
      form: 'Had the engineering team reinforced the retaining wall, the landslide would not have breached the perimeter.',
      whyFits: 'Had đứng đầu thay thế if trong câu điều kiện loại 3; cấu trúc trang trọng Had + S + V3.',
      whyNot: '"If had the engineering team reinforced..." sai vì thừa liên từ if khi đã đảo had. "Hadn\'t the team reinforced..." sai vì câu đảo ngữ trang trọng không dùng hình thức phủ định co rút n\'t.',
    },
    {
      form: 'Were the central government to mandate carbon quotas, heavy manufacturing would adapt through technological modernization.',
      whyFits: 'Were + S + to V là cấu trúc đảo ngữ chuẩn cho động từ thường ở điều kiện loại 2, kết hợp với would adapt ở mệnh đề chính.',
      whyNot: '"Were the government mandates..." sai ngữ pháp vì sau Were chủ ngữ phải đi với to-infinitive, không chia động từ thì hiện tại.',
    },
  ],
  commonMistakes: [
    'Giữ lại "if" khi đã đảo trợ động từ (viết *"If should you encounter difficulties").',
    'Dùng dạng co rút phủ định n\'t ở đầu câu đảo ngữ (viết *"Hadn\'t we intervened" thay vì "Had we not intervened").',
    'Quên "to-infinitive" khi dùng Were đảo ngữ cho động từ thường (viết *"Were they accept the offer" thay vì "Were they to accept").',
  ],
  summary: 'Lược bỏ "if" và đưa Should (loại 1), Were (loại 2), Had (loại 3) lên đầu mệnh đề điều kiện. Phủ định luôn đặt "not" sau chủ ngữ (Had S not V3). Cấu trúc loại 2 với động từ thường bắt buộc dùng "Were S to V".',
  exercises: [
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q1',
      kind: 'choice',
      prompt: 'Select the correct inverted conditional opener: "___ any contractual dispute escalate to formal arbitration, the designated chamber shall preside."',
      options: [
        { text: 'Should', correct: true, rationale: 'Should + subject + base verb escalate correctly inverts a formal Type 1 conditional.' },
        { text: 'If should', correct: false, rationale: 'Cannot retain if when the auxiliary verb is inverted.' },
        { text: 'Were', correct: false, rationale: 'Were with a lexical verb requires to escalate, not bare escalate.' },
        { text: 'Had', correct: false, rationale: 'Had requires past participle escalated in a Type 3 hypothetical condition.' },
      ],
      acceptedAnswers: [{ text: 'Should', rationale: 'Should begins formal inverted first conditional.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q2',
      kind: 'choice',
      prompt: 'Choose the correct inverted Type 2 conditional: "___ the regulatory agency to revoke the license, operations would cease immediately."',
      options: [
        { text: 'Were', correct: true, rationale: 'Were + subject + to-infinitive to revoke correctly constructs an inverted Type 2 conditional.' },
        { text: 'Should', correct: false, rationale: 'Should pairs with bare infinitive revoke, not to revoke, and typically implies will rather than would.' },
        { text: 'Had', correct: false, rationale: 'Had requires a past participle revoked in a Type 3 condition.' },
        { text: 'If were', correct: false, rationale: 'Unnecessary and ungrammatical retention of conjunction if.' },
      ],
      acceptedAnswers: [{ text: 'Were', rationale: 'Were pairs with to revoke in inverted Type 2.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q3',
      kind: 'choice',
      prompt: 'Identify the correct past conditional inversion: "___ the seismic sensors calibrated in advance, the subterranean tremors would have been tracked accurately."',
      options: [
        { text: 'Had the research team kept', correct: true, rationale: 'Had + subject + past participle correctly constructs inverted Type 3 conditional.' },
        { text: 'Did the research team keep', correct: false, rationale: 'Auxiliary did cannot introduce a conditional past hypothetical clause.' },
        { text: 'Had kept the research team', correct: false, rationale: 'Subject must separate auxiliary had and lexical participle kept.' },
        { text: 'If had the research team kept', correct: false, rationale: 'Redundant conjunction if combined with inverted auxiliary.' },
      ],
      acceptedAnswers: [{ text: 'Had the research team kept', rationale: 'Correct Type 3 conditional inversion.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q4',
      kind: 'choice',
      prompt: 'Select the grammatically acceptable formal negative inversion:',
      options: [
        { text: 'Had the archivists not preserved the fragile papyrus, the inscription would have perished.', correct: true, rationale: 'Negative not is positioned after the subject archivists in formal conditional inversion.' },
        { text: 'Hadn\'t the archivists preserved the fragile papyrus, the inscription would have perished.', correct: false, rationale: 'Contracted negative auxiliaries are ungrammatical in formal conditional inversion.' },
        { text: 'Had the archivists preserved not the fragile papyrus, the inscription would have perished.', correct: false, rationale: 'Unidiomatic placement of negation after lexical verb.' },
        { text: 'Were not the archivists preserved the fragile papyrus, the inscription would have perished.', correct: false, rationale: 'Incorrect auxiliary were used for active past perfect condition.' },
      ],
      acceptedAnswers: [{ text: 'Had the archivists not preserved the fragile papyrus, the inscription would have perished.', rationale: 'Correct placement of uncontracted not after subject.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q5',
      kind: 'gap',
      prompt: 'Supply the auxiliary for hypothetical present inversion: "_____ (Were / Should) the central bank to slash benchmark rates, consumer borrowing would surge."',
      options: [],
      acceptedAnswers: [{ text: 'Were', rationale: 'Were pairs with to slash to introduce an inverted hypothetical conditional.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q6',
      kind: 'gap',
      prompt: 'Supply the past auxiliary: "_____ (Had / Were) the clinical cohort exhibited severe adverse reactions, the advisory panel would have suspended the trials."',
      options: [],
      acceptedAnswers: [{ text: 'Had', rationale: 'Had introduces inverted past counterfactual conditional.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q7',
      kind: 'gap',
      prompt: 'Complete the negative counterfactual phrase: "Had it _____ (not) been for the expeditious rollout of backup generators, the critical care unit would have lost power."',
      options: [],
      acceptedAnswers: [{ text: 'not', rationale: 'Uncontracted negative particle not follows dummy pronoun it.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q8',
      kind: 'gap',
      prompt: 'Complete the formal conditional with bare infinitive: "Should the client _____ (express / expressed) dissatisfaction, the account manager will intervene immediately."',
      options: [],
      acceptedAnswers: [{ text: 'express', rationale: 'Should governs bare infinitive express.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q9',
      kind: 'transform',
      prompt: 'Rewrite without "if": "If the environmental tribunal were to dismiss the injunction, construction on the wetland corridor would resume."',
      options: [],
      acceptedAnswers: [
        { text: 'Were the environmental tribunal to dismiss the injunction, construction on the wetland corridor would resume.', rationale: 'Inverts Were before the environmental tribunal and retains to dismiss.' },
      ],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q10',
      kind: 'transform',
      prompt: 'Rewrite without "if": "If the diplomatic corps had not mediated the territorial dispute, border skirmishes would have escalated."',
      options: [],
      acceptedAnswers: [
        { text: 'Had the diplomatic corps not mediated the territorial dispute, border skirmishes would have escalated.', rationale: 'Inverts Had before subject with uncontracted not following subject.' },
      ],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q11',
      kind: 'correction',
      prompt: 'Correct the error in this conditional sentence: "Hadn\'t the software architect instituted container isolation, the security vulnerability would have spread."',
      options: [],
      acceptedAnswers: [
        { text: 'Had the software architect not instituted container isolation, the security vulnerability would have spread.', rationale: 'Replaces contracted Hadn\'t with Had + subject + not.' },
      ],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-q12',
      kind: 'correction',
      prompt: 'Correct the redundant conjunction: "If should any stakeholder voice procedural reservations, the chairperson will allow open debate."',
      options: [],
      acceptedAnswers: [
        { text: 'Should any stakeholder voice procedural reservations, the chairperson will allow open debate.', rationale: 'Eliminates redundant if before inverted auxiliary Should.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-conditional-inversion-03-r1',
      kind: 'choice',
      prompt: 'Choose the correct formal conditional: "___ the archaeological team to uncover further epigraphic tablets, the academic timeline would expand."',
      options: [
        { text: 'Were', correct: true, rationale: 'Were + subject + to uncover constructs valid Type 2 inverted conditional.' },
        { text: 'If were', correct: false, rationale: 'Redundant conjunction if.' },
        { text: 'Should', correct: false, rationale: 'Should requires bare infinitive uncover rather than to uncover.' },
      ],
      acceptedAnswers: [{ text: 'Were', rationale: 'Were pairs with to uncover.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-r2',
      kind: 'gap',
      prompt: 'Complete the counterfactual opener: "_____ it not been for prompt algorithmic failovers, the financial exchange would have suffered catastrophic downtime."',
      options: [],
      acceptedAnswers: [{ text: 'Had', rationale: 'Had it not been for is the standard past counterfactual idiom.' }],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-r3',
      kind: 'transform',
      prompt: 'Rewrite without "if": "If the oversight committee should identify fiscal discrepancies, an independent audit will be mandated."',
      options: [],
      acceptedAnswers: [
        { text: 'Should the oversight committee identify fiscal discrepancies, an independent audit will be mandated.', rationale: 'Inverts Should before subject the oversight committee.' },
      ],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-r4',
      kind: 'correction',
      prompt: 'Correct the verb form: "Were the municipality allocates supplemental funding, the public transit upgrade would proceed."',
      options: [],
      acceptedAnswers: [
        { text: 'Were the municipality to allocate supplemental funding, the public transit upgrade would proceed.', rationale: 'Replaces finite allocates with to allocate in inverted Type 2 conditional.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-conditional-inversion-03-o1',
      prompt: 'Viết 1-2 câu trong hợp đồng dịch vụ hoặc quy chế công ty sử dụng "Should + S + base verb" hoặc "Were + S + to-V" để quy định hướng xử lý khi xảy ra vi phạm hoặc khiếu nại.',
      modelAnswer: 'Should either party fail to remedy a material breach within thirty business days of written notification, the non-defaulting party may terminate this agreement forthwith. Were an unresolved grievance to persist beyond formal mediation, binding arbitration shall govern resolution.',
      checks: [
        'Sử dụng Should hoặc Were đứng đầu mệnh đề điều kiện không có "if".',
        'Động từ sau Should ở dạng nguyên mẫu không "to", sau Were dùng "to-infinitive".',
        'Mệnh đề chính dùng thức và trợ động từ phù hợp với sắc thái văn bản pháp lý.',
      ],
    },
    {
      id: 'grammar-v2-c1-conditional-inversion-03-o2',
      prompt: 'Viết 1-2 câu học thuật phân tích một sự kiện lịch sử hoặc một thảm họa kỹ thuật dùng "Had + S + not + V3" hoặc "Had it not been for...".',
      modelAnswer: 'Had the structural engineers not disregarded anomalous pressure telemetry during preliminary load testing, the catastrophic failure of the suspension span would have been averted.',
      checks: [
        'Sử dụng Had đứng đầu câu điều kiện loại 3, đặt "not" sau chủ ngữ nếu phủ định.',
        'Mệnh đề chính sử dụng would / could / might have + V3.',
        'Văn phong học thuật, lập luận chặt chẽ và chính xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-inversion-and-conditionals',
      title: 'British Council LearnEnglish: Inversion and conditionals',
      url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-conditionals',
      claims: [
        'In formal styles, if is omitted and Should, Were, or Had is placed before the subject.',
        'Type 1 uses Should + subject + bare infinitive; Type 2 uses Were + subject + to-infinitive.',
        'Type 3 uses Had + subject + past participle; negative inversion places not after the subject.',
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
    summary: 'Comprehensive review completed. Conditional inversion rules for Should/Were/Had, negative placement, exercise keys, transfer items, and authoritative British Council C1 sources verified.',
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

export default conditionalInversionLesson;
