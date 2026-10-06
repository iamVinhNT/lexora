/**
 * @file cohesion-ellipsis.ts
 * @description B2 lesson 29: Textual cohesion through ellipsis (auxiliary, infinitive, nominal, and gapping).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-cohesion-ellipsis-29',
  revisionId: 'grammar-v2-b2-cohesion-ellipsis-29@1.0.0',
  revision: '1.0.0',
  title: 'Liên kết văn bản bằng phép tỉnh lược (Cohesion through Ellipsis)',
  objective: 'Nhận diện và sử dụng thành thạo các hình thức tỉnh lược ngữ pháp (ellipsis) gồm tỉnh lược trợ động từ (auxiliary ellipsis), tỉnh lược nguyên mẫu với "to" (infinitive ellipsis), tỉnh lược danh từ sau từ chỉ lượng và hiện tượng lược động từ sóng đôi (gapping).',
  prerequisiteIds: ['grammar-v2-b2-cohesion-substitution-28'],
  coverage: ['cohesion-ellipsis', 'elliptical-structures', 'auxiliary-ellipsis', 'infinitive-ellipsis', 'textual-economy'],
  context: {
    english: 'Effective editors and eloquent speakers eliminate redundant wording without sacrificing clarity by omitting syntactically recoverable elements in paired clauses and conversational exchanges.',
    vietnamese: 'Các biên tập viên hiệu quả và diễn giả lưu loát loại bỏ những từ ngữ thừa thãi mà không làm mất đi sự rõ ràng bằng cách tỉnh lược các thành phần ngữ pháp có thể khôi phục được từ ngữ cảnh trong các vế sóng đôi và hội thoại.',
  },
  guide: {
    pattern: 'Auxiliary Ellipsis: S + Auxiliary | Infinitive Ellipsis: S + Verb + to | Nominal Ellipsis: Quantifier / Demonstrative + [Ø] | Gapping: S + V + O and S + [Ø] + O',
    whenToUse: [
      'Giữ lại trợ động từ ở vế sau để đại diện cho cả cụm vị ngữ khi không muốn lặp lại (She can speak French, and her brother can too).',
      'Giữ lại tiểu từ "to" đơn độc sau các động từ như want, hope, mean, afford, refuse khi lược bỏ động từ nguyên thể (You may leave early if you want to).',
      'Lược bỏ danh từ sau từ định lượng, số đếm hoặc từ chỉ định khi tiền ngữ đã rõ (Five candidates were invited, but only two showed up).',
      'Lược bỏ động từ trùng lặp ở vế thứ hai trong câu ghép đẳng lập (gapping) để tạo nhịp điệu đăng đối (The doctor examined the parents, and the nurse the children).',
    ],
    signalWords: ['if you want to', 'he did too', 'neither could', 'only two', 'than she does'],
    check: [
      'Thành phần bị lược bỏ có thể được khôi phục chính xác 100% từ ngữ cảnh phía trước mà không gây hiểu lầm không?',
      'Sau động từ muốn/mong đợi, đã giữ lại "to" trong phép tỉnh lược nguyên mẫu (want to, promise to) thay vì lược bỏ cả "to" chưa?',
      'Trợ động từ được giữ lại có hòa hợp đúng về thì và thể với vị ngữ phía trước không?',
    ],
  },
  explanation: 'Phép tỉnh lược (Ellipsis) là hiện tượng lược bỏ một hoặc nhiều từ trong câu vì người nghe/đọc có thể dễ dàng tự suy ra và khôi phục chúng từ tiền ngữ (contextual recoverability). Đây là dấu hiệu của tiếng Anh tự nhiên và tinh tế. 1) Tỉnh lược trợ động từ (Auxiliary ellipsis): Trợ động từ hoặc động từ khiếm khuyết được giữ lại để đại diện cho toàn bộ cụm động từ (Has the shipment arrived? — It has [arrived]; She didn’t read the brief, but her supervisor did [read the brief]). Trong so sánh: "He earns far more than I do". 2) Tỉnh lược nguyên mẫu (Infinitive ellipsis): Khi một cụm to-infinitive bị lược bỏ, hạt nhân "to" thường được giữ lại ở cuối sau các động từ như want, hope, intend, mean, refuse, forget, be able to (I asked him to help with the moving boxes, but he refused to [help with the moving boxes]; You don’t have to apologize unless you really want to). 3) Tỉnh lược danh từ (Nominal ellipsis): Danh từ trung tâm bị tỉnh lược sau số từ, từ chỉ lượng hoặc đại từ chỉ định (Many tourists booked the excursion, but several [tourists] canceled at the last minute). 4) Lược động từ sóng đôi (Gapping): Trong câu ghép có liên từ "and" hoặc "or", động từ ở mệnh đề sau được lược bỏ để tránh lặp lại (The architect drafted the blueprints, and the builder [drafted] the budget).',
  examples: [
    {
      english: 'The senior partner reviewed the commercial contracts, and the junior associate the disclosure exhibits.',
      vietnamese: 'Luật sư thành viên cấp cao đã xem xét các hợp đồng thương mại, và luật sư cộng sự cấp dưới xem xét các tài liệu công bố.',
    },
    {
      english: 'You do not need to attend the optional workshop unless you genuinely wish to.',
      vietnamese: 'Bạn không cần phải tham dự buổi hội thảo tự chọn trừ khi bạn thực sự muốn tham gia.',
    },
    {
      english: 'Several major technology firms applied for the public grant, but only two were approved.',
      vietnamese: 'Nhiều công ty công nghệ lớn đã nộp đơn xin tài trợ công, nhưng chỉ có hai công ty được phê duyệt.',
    },
    {
      english: 'He promised to submit the revised manuscript by Friday, but he completely forgot to.',
      vietnamese: 'Anh ấy đã hứa sẽ nộp bản thảo sửa đổi trước thứ Sáu, nhưng anh ấy hoàn toàn quên mất việc đó.',
    },
    {
      english: 'Some participants preferred quantitative analysis, while others qualitative interviews.',
      vietnamese: 'Một số người tham gia ưa thích phân tích định lượng, trong khi những người khác thích phỏng vấn định tính.',
    },
    {
      english: 'The original lab tests did not reveal anomalies, but the subsequent scans did.',
      vietnamese: 'Các xét nghiệm ban đầu trong phòng thí nghiệm không phát hiện điều bất thường, nhưng các đợt chụp quét tiếp theo thì có.',
    },
  ],
  contrasts: [
    {
      form: 'She didn’t accept the overseas fellowship, although her mentors advised her to.',
      whyFits: 'Dùng to ở cuối (infinitive ellipsis) giúp câu vừa gọn gàng vừa đúng quy ước duy trì hạt nhân nguyên mẫu sau advise someone to.',
      whyNot: '"...advised her" mà không có to sẽ làm đổi nghĩa sang "khuyên bảo cô ấy nói chung" chứ không phải khuyên cô ấy nhận học bổng.',
    },
    {
      form: 'The first engineer couldn’t decipher the legacy code, but the senior architect could.',
      whyFits: 'Giữ lại trợ động từ could để khôi phục toàn bộ vị ngữ decipher the legacy code một cách tinh gọn.',
      whyNot: '"...but the senior architect could decipher" là câu dở dang thiếu tân ngữ; lặp lại cả câu thì rườm rà không cần thiết.',
    },
  ],
  commonMistakes: [
    'Lược bỏ "to" ở nguyên mẫu trong trường hợp cấu trúc yêu cầu giữ nó (ví dụ: "if you want to"); một số động từ như "want" cũng cho phép lược bỏ "to" khi bổ ngữ được hiểu rõ ("if you want").',
    'Dùng sai trợ động từ đối ứng trong phép tỉnh lược vị ngữ (ví dụ: "She likes classical music and her brother is too" thay vì "does too").',
    'Tỉnh lược khi tiền ngữ chưa rõ ràng, khiến người đọc không thể khôi phục được nghĩa chính xác của câu.',
  ],
  summary: 'Phép tỉnh lược loại bỏ những từ thừa có thể khôi phục từ ngữ cảnh: giữ lại trợ động từ (auxiliary ellipsis), giữ lại "to" đơn độc (infinitive ellipsis), tỉnh lược danh từ sau từ chỉ lượng, và lược động từ sóng đôi (gapping) tạo nên sự súc tích chuẩn mực.',
  exercises: [
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q1',
      kind: 'choice',
      prompt: 'Select the version that explicitly retains the infinitive particle "to" while omitting the repeated activity:',
      options: [
        { text: 'You do not have to join the advisory panel unless you really want to.', correct: true, rationale: 'Want to retains the infinitive particle to to indicate ellipsis of join the advisory panel.' },
        { text: 'You do not have to join the advisory panel unless you really want.', correct: false, rationale: 'This is also possible ellipsis after want, but it does not explicitly retain the particle requested.' },
        { text: 'You do not have to join the advisory panel unless you really want it.', correct: false, rationale: 'Want it replaces the activity with an awkward pronoun reference.' },
        { text: 'You do not have to join the advisory panel unless you really want doing so.', correct: false, rationale: 'Want does not take a gerund doing so.' },
      ],
      acceptedAnswers: [{ text: 'You do not have to join the advisory panel unless you really want to.', rationale: 'Want to correctly demonstrates infinitive ellipsis.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q2',
      kind: 'choice',
      prompt: 'Choose the correct auxiliary verb to complete the elliptical clause: "The first auditor failed to notice the tax irregularity, but the forensic accountant ___."',
      options: [
        { text: 'did', correct: true, rationale: 'Did is the past auxiliary corresponding to the simple past action noticed.' },
        { text: 'was', correct: false, rationale: 'Was is an auxiliary for passive or continuous aspect, not simple past active notice.' },
        { text: 'has', correct: false, rationale: 'Has is present perfect, which clashes with simple past failed.' },
        { text: 'could', correct: false, rationale: 'Could changes meaning to hypothetical ability rather than actual detection.' },
      ],
      acceptedAnswers: [{ text: 'did', rationale: 'Did provides the correct past simple auxiliary ellipsis.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q3',
      kind: 'choice',
      prompt: 'Identify the sentence that correctly employs gapping in coordinated academic prose:',
      options: [
        { text: 'The macroeconomist analyzed the interest rates, and the sociologist the demographic trends.', correct: true, rationale: 'The verb analyzed is neatly elided in the second coordinate clause (gapping).' },
        { text: 'The macroeconomist analyzed the interest rates, and the sociologist analyzed the demographic trends too also.', correct: false, rationale: 'Redundant and repetitive wording.' },
        { text: 'The macroeconomist analyzed the interest rates, and the sociologist did the demographic trends.', correct: false, rationale: 'Did cannot directly take demographic trends as an object in this sense.' },
        { text: 'The macroeconomist analyzed the interest rates, and the sociologist so the demographic trends.', correct: false, rationale: 'So is ungrammatical as a verb substitute here.' },
      ],
      acceptedAnswers: [{ text: 'The macroeconomist analyzed the interest rates, and the sociologist the demographic trends.', rationale: 'Correct gapping ellipsis in coordinated clauses.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q4',
      kind: 'choice',
      prompt: 'Select the sentence with proper nominal ellipsis after a quantifier:',
      options: [
        { text: 'Twelve candidates were interviewed in the morning, but only three were called back for a second round.', correct: true, rationale: 'Candidates is appropriately elided after the numeral quantifier three.' },
        { text: 'Twelve candidates were interviewed in the morning, but only three ones were called back.', correct: false, rationale: 'Ones is redundant and ungrammatical directly after a cardinal number.' },
        { text: 'Twelve candidates were interviewed in the morning, but only three candidate were called back.', correct: false, rationale: 'Singular candidate clashes with numeral three.' },
        { text: 'Twelve candidates were interviewed in the morning, but only three of candidate were called back.', correct: false, rationale: 'Missing determiner and plural inflection after of.' },
      ],
      acceptedAnswers: [{ text: 'Twelve candidates were interviewed in the morning, but only three were called back for a second round.', rationale: 'Three correctly demonstrates nominal ellipsis.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q5',
      kind: 'gap',
      prompt: 'Fill in the infinitive marker retained in ellipsis: "I asked him to verify the calculations, and he promised _____."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Promised to retains the infinitive particle while eliding verify the calculations.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q6',
      kind: 'gap',
      prompt: 'Fill in the auxiliary verb for past ellipsis: "None of the interns recognized the error, but the senior engineer _____."',
      options: [],
      acceptedAnswers: [{ text: 'did', rationale: 'Did elides recognized the error in past simple.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q7',
      kind: 'gap',
      prompt: 'Complete the infinitive ellipsis: "She did not accept the position, although her family urged her _____."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Urged her to retains the infinitive particle.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q8',
      kind: 'gap',
      prompt: 'Fill in the auxiliary in the comparative clause: "Our competitors spend significantly more on marketing than our firm _____."',
      options: [],
      acceptedAnswers: [{ text: 'does', rationale: 'Does elides spends on marketing in present simple.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q9',
      kind: 'transform',
      prompt: 'Apply infinitive ellipsis to eliminate repetition: "She did not disclose the confidential figures because she was explicitly instructed not to disclose the confidential figures."',
      options: [],
      acceptedAnswers: [
        { text: 'She did not disclose the confidential figures because she was explicitly instructed not to.', rationale: 'Elides disclose the confidential figures leaving particle not to.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q10',
      kind: 'transform',
      prompt: 'Rewrite with gapping by omitting the repeated verb: "The director signed the executive order, and the secretary signed the budget amendment."',
      options: [],
      acceptedAnswers: [
        { text: 'The director signed the executive order, and the secretary the budget amendment.', rationale: 'Omits the repeated verb signed in the second coordinated clause (gapping).' },
        { text: 'The director signed the executive order, and the secretary stamped the budget amendment.', rationale: 'This repeats its predicates and does not demonstrate gapping.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q11',
      kind: 'correction',
      prompt: 'Rewrite to explicitly retain the infinitive marker after want: "You do not need to stay for the reception if you do not want."',
      options: [],
      acceptedAnswers: [
        { text: 'You don’t need to stay for the reception if you don’t want to.', rationale: 'Adds necessary infinitive particle to after want.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-q12',
      kind: 'correction',
      prompt: 'Correct the mismatch in the ellipsis auxiliary after the present perfect: "He has never visited the headquarters in Zurich, but his business partner did."',
      options: [],
      acceptedAnswers: [
        { text: 'He has never visited the headquarters in Zurich, but his business partner has.', rationale: 'Matches present perfect auxiliary has with preceding has never visited.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-r1',
      kind: 'choice',
      prompt: 'Select the sentence that handles verb phrase ellipsis accurately:',
      options: [
        { text: 'Many analysts expected the currency to depreciate, but it didn’t.', correct: true, rationale: 'Didn’t cleanly elides depreciate with the appropriate past auxiliary.' },
        { text: 'Many analysts expected the currency to depreciate, but it wasn’t.', correct: false, rationale: 'Wasn’t does not match the active lexical verb depreciate.' },
        { text: 'Many analysts expected the currency to depreciate, but it hasn’t depreciated yet already.', correct: false, rationale: 'Tense clash and redundant adverbials.' },
      ],
      acceptedAnswers: [{ text: 'Many analysts expected the currency to depreciate, but it didn’t.', rationale: 'Didn’t correctly elides the verb phrase.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-r2',
      kind: 'gap',
      prompt: 'Fill in the infinitive marker: "They hadn’t planned to redevelop the waterfront, but rising tourism prompted them _____."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Prompted them to retains the infinitive particle.' }],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-r3',
      kind: 'transform',
      prompt: 'Rewrite using auxiliary ellipsis in the comparison: "Germany produces more solar energy than the United Kingdom produces."',
      options: [],
      acceptedAnswers: [
        { text: 'Germany produces more solar energy than the United Kingdom does.', rationale: 'Replaces repeated verb produces with auxiliary does.' },
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-r4',
      kind: 'correction',
      prompt: 'Correct the redundant numeral phrase: "Five architects presented proposals, but only three ones met the seismic safety criteria."',
      options: [],
      acceptedAnswers: [
        { text: 'Five architects presented proposals, but only three met the seismic safety criteria.', rationale: 'Removes redundant pronoun ones after numeral three.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-o1',
      prompt: 'Viết 1-2 câu trong một cuộc trao đổi công việc, sử dụng cấu trúc tỉnh lược nguyên mẫu với "to" (ví dụ: "if you would like to", "hesitated to") để diễn đạt sự tôn trọng quyền tự quyết của đối tác.',
      modelAnswer: 'You are welcome to revise the contractual clauses before Friday if you wish to. Our legal counsel offered to draft an addendum, should you require us to.',
      checks: [
        'Sử dụng cấu trúc tỉnh lược nguyên mẫu giữ lại hạt nhân "to".',
        'Văn phong lịch sự, chuyên nghiệp.',
        'Ngữ cảnh đối thoại hoặc thư từ công việc tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-b2-cohesion-ellipsis-29-o2',
      prompt: 'Viết 1-2 câu học thuật hoặc phân tích kinh tế, sử dụng kỹ thuật gapping (lược động từ sóng đôi) hoặc tỉnh lược trợ động từ (auxiliary ellipsis) trong so sánh.',
      modelAnswer: 'The central bank adjusted short-term interest rates, and the finance ministry fiscal stimulus measures. Domestic manufacturers adapted swiftly, whereas foreign exporters did not.',
      checks: [
        'Sử dụng gapping (lược động từ sóng đôi giữa hai mệnh đề nối bởi and/whereas) hoặc tỉnh lược trợ động từ (did not).',
        'Cấu trúc cân đối, mạch lạc, súc tích.',
        'Ngữ pháp chuẩn xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-hasan-ellipsis',
      title: 'Halliday & Hasan: Cohesion in English - Ellipsis',
      url: 'https://www.cambridge.org/core/books/cohesion-in-english/ellipsis',
      claims: [
        'Ellipsis is substitution by zero, where grammatical elements are omitted but retrievable from context.',
        'Infinitive ellipsis often retains to, although some constructions allow it to be omitted; gapping can omit a repeated verb or predicate material across coordinated clauses.',
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
