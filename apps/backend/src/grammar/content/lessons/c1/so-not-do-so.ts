/**
 * @file so-not-do-so.ts
 * @description C1 lesson on clausal and verbal substitution with so, not, and do so in formal discourse.
 */
import type { GrammarLesson } from '../../types.js';

const soNotDoSoLesson: GrammarLesson = {
  id: 'grammar-v2-c1-so-not-do-so-12',
  revisionId: 'grammar-v2-c1-so-not-do-so-12@1.0.0',
  revision: '1.0.0',
  title: 'Thay thế vị ngữ và mệnh đề với So, Not, và Do So (Substitution with So, Not, and Do So)',
  objective: 'Làm chủ kỹ thuật thay thế mệnh đề (clausal substitution: think so, hope not, if so) và thay thế cụm động từ hành vi (verbal substitution: do so, do that, do it) trong văn phong trang trọng C1, phân biệt rạch ròi phạm vi áp dụng của "do so" (chỉ dùng cho động từ hành động có chủ ý, cấm dùng cho động từ trạng thái).',
  prerequisiteIds: ['grammar-v2-c1-one-ones-substitution-11'],
  coverage: ['so-not-do-so', 'verbal-substitution', 'clausal-substitution', 'do-so', 'cohesion'],
  context: {
    english: 'In judicial opinions, diplomatic diplomacy, and scholarly argumentation, authors use clausal and verbal substitution to reference prior propositions or actions concisely without cluttering sentences with repetitive dependent clauses.',
    vietnamese: 'Trong các phán quyết tư pháp, ngoại giao thượng đỉnh và lập luận học thuật, người viết sử dụng phép thay thế mệnh đề và cụm động từ để quy chiếu các phát biểu hoặc hành động trước đó một cách súc tích mà không làm vướng víu câu văn bằng các mệnh đề phụ trùng lặp.',
  },
  guide: {
    pattern: 'Clausal: Subject + Verb of stance / thought (think / believe / suppose / hope / assume) + so / not | Conditional: If so, ... / If not, ... | Verbal: Subject + do / does / did so [replaces dynamic verb phrase + complements]',
    whenToUse: [
      'Thay thế toàn bộ một mệnh đề trần thuật bằng "so" sau các động từ nhận thức hoặc phỏng đoán: "Will the stimulus package avert a recession? Leading macroeconomists believe so [that it will avert a recession]".',
      'Phủ định mệnh đề: dùng "hope not / fear not / suspect not" (thay vì don\'t hope so) và "don\'t think so / don\'t suppose so".',
      'Mệnh đề điều kiện rút gọn trong văn bản pháp lý/hành chính: "If so [if that is the case], statutory remedies will apply; if not, arbitration proceeds".',
      'Thay thế cụm động từ hành động có chủ đích bằng "do so": "The board resolved to decommission the facility, and did so within ninety days".',
    ],
    signalWords: ['economists expect so', 'analysts fear not', 'if so', 'if not', 'promptly did so', 'failed to do so'],
    check: [
      '"Do so" có chỉ thay thế cho động từ HÀNH ĐỘNG (dynamic: publish, implement, withdraw) không? Tuyệt đối không dùng "do so" cho động từ trạng thái (stative: understand, possess, resemble, know)!',
      'Với hope, fear, suspect, đã dùng cấu trúc phủ định "hope not", "fear not" thay vì "don\'t hope so" chưa?',
      'Với think, believe, suppose, đã dùng hình thức chuyển dịch phủ định thông thường "don\'t think so" thay vì "think not" (vốn mang sắc thái cổ xưa) chưa?',
    ],
  },
  explanation: 'Phép thay thế với So, Not và Do So là phương thức tạo tính liên kết văn bản ở tầng bậc cao. 1) Clausal Substitution (Thay thế mệnh đề): "So" thay thế cho một mệnh đề khẳng định sau các động từ như think, believe, expect, suppose, imagine, hope. Ví dụ: "Has the inflation rate peaked? The central bank anticipates so." Khi phủ định, cần phân biệt hai nhóm động từ: Nhóm chuyển dịch phủ định lên động từ chính (Negative Transfer): "don\'t think so", "don\'t believe so"; Nhóm phủ định trực tiếp bằng "not": "hope not", "fear not", "suspect not" (tuyệt đối không nói "don\'t hope so"). 2) Conditional Substitution: "If so" (Nếu đúng như vậy) và "If not" (Nếu không phải như vậy) thay thế cho toàn bộ điều kiện giả định trước đó. 3) Verbal Substitution với "Do so": "Do so" thay thế cho cả động từ và các bổ ngữ của nó. Điểm cốt yếu ở trình độ C1 là "do so" đòi hỏi một tác nhân có ý chí (agentive subject) và một hành động có chủ đích (dynamic action). Tuyệt đối không dùng "do so" cho các trạng thái tri giác hoặc sở hữu: không nói "She loved music and he did so too" (phải nói "and so did he").',
  examples: [
    {
      english: 'Will the multilateral sanctions compel behavioral compliance? Security analysts certainly hope so.',
      vietnamese: 'Liệu các lệnh trừng phạt đa phương có buộc được sự tuân thủ hành vi hay không? Các nhà phân tích an ninh chắc chắn hy vọng như vậy.',
    },
    {
      english: 'Has the antibiotic resistance mutation spread beyond the initial regional cluster? Epidemiologists earnestly fear not.',
      vietnamese: 'Liệu đột biến kháng kháng sinh đã lan rộng ra ngoài cụm dịch khu vực ban đầu chưa? Các nhà dịch tễ học thực sự lo ngại là chưa (hoặc sợ rằng đã lan - tùy ngữ cảnh hỏi, ở đây fear not = hy vọng là không).',
    },
    {
      english: 'The sovereign government was legally obligated to compensate the displaced communities, and promptly did so.',
      vietnamese: 'Chính phủ có nghĩa vụ pháp lý phải bồi thường cho các cộng đồng bị di dời, và đã nhanh chóng làm như vậy.',
    },
    {
      english: 'Does the experimental therapeutic compound induce hepatotoxicity? Preliminary biomarker panels suggest not.',
      vietnamese: 'Hợp chất điều trị thử nghiệm có gây độc tính cho gan không? Các bảng chỉ điểm sinh học sơ bộ cho thấy là không.',
    },
    {
      english: 'The defense counsel requested an immediate adjournment of the proceedings, but the presiding judge refused to do so.',
      vietnamese: 'Luật sư bào chữa đã yêu cầu hoãn phiên tòa ngay lập tức, nhưng thẩm phán chủ tọa đã từ chối làm điều đó.',
    },
    {
      english: 'Were the original signatures forged? If so, the conveyance deed is null and void ab initio; if not, title passes immediately.',
      vietnamese: 'Liệu các chữ ký ban đầu có bị làm giả không? Nếu đúng như vậy, chứng thư chuyển nhượng sẽ hoàn toàn vô hiệu ngay từ đầu; nếu không, quyền sở hữu sẽ được chuyển giao ngay lập tức.',
    },
  ],
  contrasts: [
    {
      form: 'The prime minister intended to reshuffle the cabinet in September, and subsequently did so.',
      whyFits: 'Reshuffle là động từ hành động có chủ đích (dynamic agentive action), nên được thay thế hoàn hảo bằng did so.',
      whyNot: '"Dr. Vance understood the theoretical formulation, and Dr. Thorne did so too" sai vì understand là động từ trạng thái nhận thức (stative verb), không được dùng với did so (phải dùng ellipsis: and Dr. Thorne did too).',
    },
    {
      form: 'Will the fiscal deficit trigger a sovereign credit rating downgrade? The treasury board hopes not.',
      whyFits: 'Hope phủ định mệnh đề trực tiếp bằng not: hopes not.',
      whyNot: '"The treasury board does not hope so" sai ngữ dụng vì hope không thuộc nhóm động từ chuyển dịch phủ định như think/believe.',
    },
  ],
  commonMistakes: [
    'Dùng "do so" để thay thế cho động từ chỉ trạng thái hoặc cảm xúc (viết "He owned the land and his brother did so too" thay vì "and his brother did too").',
    'Nói "I don\'t hope so" hoặc "I don\'t fear so" thay vì cấu trúc chuẩn mực "I hope not" / "I fear not".',
    'Nhầm lẫn giữa "do so" (thay thế hành động trang trọng) với "do it / do that" (thường nhấn mạnh đối tượng cụ thể hoặc văn phong thân mật hơn).',
  ],
  summary: '"So" và "Not" thay thế cho cả mệnh đề sau động từ nhận thức hoặc điều kiện ("If so / If not"). "Do so" thay thế cho cụm động từ hành động có ý chí, tuyệt đối không dùng cho động từ trạng thái.',
  exercises: [
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q1',
      kind: 'choice',
      prompt: 'Select the sentence with standard clausal negation following a verb of emotion/expectation:',
      options: [
        { text: 'Will the regional banking crisis trigger systemic contagion? Financial regulators earnestly hope not.', correct: true, rationale: 'Standard clausal negation with "hope not".' },
        { text: 'Will the regional banking crisis trigger systemic contagion? Financial regulators do not hope so.', correct: false, rationale: '"do not hope so" is unidiomatic and non-standard in English.' },
        { text: 'Will the regional banking crisis trigger systemic contagion? Financial regulators hope no.', correct: false, rationale: '"hope no" is grammatically invalid.' },
        { text: 'Will the regional banking crisis trigger systemic contagion? Financial regulators do not hope that.', correct: false, rationale: 'Fails to use clausal substitution correctly.' },
      ],
      acceptedAnswers: [{ text: 'Will the regional banking crisis trigger systemic contagion? Financial regulators earnestly hope not.', rationale: 'Standard clausal negation with hope not.' }],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q2',
      kind: 'choice',
      prompt: 'Choose the sentence that correctly employs "do so" with a dynamic agentive predicate:',
      options: [
        { text: 'The municipal council resolved to expropriate the blighted industrial zone, and officially did so yesterday.', correct: true, rationale: 'Dynamic, deliberate action (expropriate) is appropriately replaced by "did so".' },
        { text: 'The senior curator loved the early Renaissance altarpiece, and the visiting archivist did so as well.', correct: false, rationale: '"love" is a stative verb and cannot be replaced by "do so".' },
        { text: 'The lead researcher understood the complex tensor geometry, and her doctoral student did so too.', correct: false, rationale: '"understand" is a stative verb of cognition; "do so" is ungrammatical.' },
        { text: 'The prototype resembled an ancient navigation device, and the patent design did so equally.', correct: false, rationale: '"resemble" is a stative relationship verb, strictly forbidding "do so".' },
      ],
      acceptedAnswers: [{ text: 'The municipal council resolved to expropriate the blighted industrial zone, and officially did so yesterday.', rationale: 'Correct dynamic verbal substitution with did so.' }],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q3',
      kind: 'choice',
      prompt: 'Identify the sentence demonstrating standard negative transfer with a verb of cognition:',
      options: [
        { text: 'Do the new trade tariffs violate multilateral treaty obligations? The attorney general does not believe so.', correct: true, rationale: 'Standard negative transfer: "does not believe so".' },
        { text: 'Do the new trade tariffs violate multilateral treaty obligations? The attorney general believes not so.', correct: false, rationale: 'Ungrammatical syntax: "believes not so".' },
        { text: 'Do the new trade tariffs violate multilateral treaty obligations? The attorney general believes no.', correct: false, rationale: '"believes no" is completely non-standard.' },
        { text: 'Do the new trade tariffs violate multilateral treaty obligations? The attorney general doesn\'t believe it to.', correct: false, rationale: 'Malformed verbal complement.' },
      ],
      acceptedAnswers: [{ text: 'Do the new trade tariffs violate multilateral treaty obligations? The attorney general does not believe so.', rationale: 'Standard negative transfer does not believe so.' }],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q4',
      kind: 'choice',
      prompt: 'Select the well-formed legal condition using conditional substitution:',
      options: [
        { text: 'Has the licensee materially breached data confidentiality? If so, the licensor may terminate the agreement immediately; if not, ninety days\' notice is required.', correct: true, rationale: 'Flawless formal conditional substitution with "If so" and "if not".' },
        { text: 'Has the licensee materially breached data confidentiality? If that, the licensor may terminate; if not that, notice is required.', correct: false, rationale: '"If that" is ungrammatical as a conditional clausal substitute.' },
        { text: 'Has the licensee breached data confidentiality? If yes, licensor terminates; if no, notice is required.', correct: false, rationale: '"If yes / if no" is informal and unsuitable for formal legal register.' },
        { text: 'Has the licensee breached data confidentiality? If doing so, licensor terminates; if not doing so, notice is required.', correct: false, rationale: 'Participle phrase does not substitute for a completed factual condition.' },
      ],
      acceptedAnswers: [{ text: 'Has the licensee materially breached data confidentiality? If so, the licensor may terminate the agreement immediately; if not, ninety days\' notice is required.', rationale: 'Standard legal conditional substitution with If so / if not.' }],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q5',
      kind: 'gap',
      prompt: 'Supply the clausal substitute: "Did the industrial tribunal rule in favor of the union? The labor correspondent reported _____."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"so" substitutes for the affirmative clause "that the tribunal ruled in favor of the union".' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q6',
      kind: 'gap',
      prompt: 'Complete the negative clausal substitution with "fear": "Will the escalating maritime confrontation culminate in kinetic conflict? The diplomatic delegation earnestly fears _____."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"fears so" indicates apprehension that the negative outcome is indeed true.' },
        { text: 'not', rationale: '"fears not" can denote an archaic or specialized reading, but "so" is primary when fearing an affirmative catastrophe.' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q7',
      kind: 'gap',
      prompt: 'Complete the verbal substitution: "The central bank had the statutory authority to intervene in spot currency markets, and did _____ with unprecedented velocity."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"did so" substitutes for the dynamic action "intervene in spot currency markets".' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q8',
      kind: 'gap',
      prompt: 'Supply the conditional substitute: "Is external financing available on concessionary terms? If _____, infrastructure construction will commence immediately."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"If so" substitutes for the conditional clause "If external financing is available on concessionary terms".' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q9',
      kind: 'transform',
      prompt: 'Use verbal substitution with "do so" to eliminate the repeated action: "The regulatory board instructed the commercial bank to recapitalize its regional branch, and the commercial bank recapitalized its regional branch within thirty days."',
      options: [],
      acceptedAnswers: [
        { text: 'The regulatory board instructed the commercial bank to recapitalize its regional branch, and the commercial bank did so within thirty days.', rationale: 'Replaces repeated verb phrase with "did so".' },
        { text: 'The regulatory board instructed the commercial bank to recapitalize its regional branch, and it did so within thirty days.', rationale: 'Uses pronoun it and did so.' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q10',
      kind: 'transform',
      prompt: 'Condense using clausal substitution with "hope": "Will the experimental cancer immunotherapy cause severe adverse events? Medical researchers hope that the experimental cancer immunotherapy will not cause severe adverse events."',
      options: [],
      acceptedAnswers: [
        { text: 'Will the experimental cancer immunotherapy cause severe adverse events? Medical researchers hope not.', rationale: 'Replaces negative clausal complement with concise "hope not".' },
        { text: 'Medical researchers hope not.', rationale: 'Accepts concise standalone response clause.' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q11',
      kind: 'correction',
      prompt: 'Correct the ungrammatical use of "do so" with a stative verb: "The lead investigator knew the forensic evidence was compromised, and her supervisor did so too."',
      options: [],
      acceptedAnswers: [
        { text: 'The lead investigator knew the forensic evidence was compromised, and her supervisor did too.', rationale: 'Replaces ungrammatical "did so" with standard auxiliary ellipsis "did too" for stative verb knew.' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-q12',
      kind: 'correction',
      prompt: 'Correct the unidiomatic clausal negation: "Will the treaty negotiations collapse overnight? The foreign minister does not hope so."',
      options: [],
      acceptedAnswers: [
        { text: 'Will the treaty negotiations collapse overnight? The foreign minister hopes not.', rationale: 'Replaces unidiomatic "does not hope so" with standard "hopes not".' },
        { text: 'The foreign minister hopes not.', rationale: 'Accepts standalone corrected sentence.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-so-not-do-so-12-r1',
      kind: 'choice',
      prompt: 'Select the sentence with standard verbal substitution in formal register:',
      options: [
        { text: 'The corporation was mandated to publish its carbon audit, and failed to do so.', correct: true, rationale: 'Standard verbal substitution with "do so" following infinitive failed to.' },
        { text: 'The corporation was mandated to publish its carbon audit, and failed to do it.', correct: false, rationale: '"do it" is less formal and often implies a tangible physical object rather than institutional compliance.' },
        { text: 'The corporation was mandated to publish its carbon audit, and failed to do that.', correct: false, rationale: '"do that" conveys contrastive or spoken emphasis.' },
      ],
      acceptedAnswers: [{ text: 'The corporation was mandated to publish its carbon audit, and failed to do so.', rationale: 'Formal verbal substitution failed to do so.' }],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-r2',
      kind: 'gap',
      prompt: 'Complete with the negative clausal substitute: "Will the central bank hike the overnight lending rate? Bond market analysts expect _____."',
      options: [],
      acceptedAnswers: [
        { text: 'not', rationale: '"expect not" concisely negates the clausal proposition in formal syntax.' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-r3',
      kind: 'transform',
      prompt: 'Use conditional substitution: "If the preliminary audit reveals insolvency, liquidation will begin. If the preliminary audit does not reveal insolvency, restructuring will proceed."',
      options: [],
      acceptedAnswers: [
        { text: 'If the preliminary audit reveals insolvency, liquidation will begin; if not, restructuring will proceed.', rationale: 'Uses "if not" to substitute for the negative conditional clause.' },
        { text: 'If the preliminary audit reveals insolvency, liquidation will begin. If not, restructuring will proceed.', rationale: 'Accepts sentence division with period.' },
        { text: 'If the preliminary audit reveals insolvency, liquidation will begin, and if not, restructuring will proceed.', rationale: 'Accepts coordinator and if not.' },
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-r4',
      kind: 'correction',
      prompt: 'Correct the stative substitution error: "The older bridge possessed exceptional structural durability, and the newer span did so as well."',
      options: [],
      acceptedAnswers: [
        { text: 'The older bridge possessed exceptional structural durability, and the newer span did as well.', rationale: 'Removes "so" because possess is a stative verb that licenses auxiliary ellipsis (did as well), not verbal substitution (did so).' },
        { text: 'The older bridge possessed exceptional structural durability, and the newer span did too.', rationale: 'Accepts auxiliary ellipsis with did too.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-so-not-do-so-12-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng phép thay thế mệnh đề với "believe so / expect not / fear so" hoặc cấu trúc điều kiện rút gọn "If so, ...; if not, ...".',
      modelAnswer: 'Will the introduction of automated diagnostic algorithms diminish clinical misdiagnoses? Health economists largely expect so. If so, medical malpractice litigation may decline substantially; if not, regulatory scrutiny will intensify.',
      checks: [
        'Sử dụng expect so (hoặc biến thể tương đương) để thay thế mệnh đề khẳng định.',
        'Sử dụng cấu trúc điều kiện rút gọn If so / if not.',
        'Văn phong học thuật sắc sảo, mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-c1-so-not-do-so-12-o2',
      prompt: 'Viết 1-2 câu trong báo cáo pháp lý hoặc quản trị doanh nghiệp sử dụng phép thay thế cụm động từ hành vi "did so" hoặc "failed to do so".',
      modelAnswer: 'The independent compliance monitor recommended that the board divest its non-core logistics assets, but executive leadership regrettably failed to do so before the market downturn.',
      checks: [
        'Sử dụng failed to do so (hoặc did so) để thay thế cụm động từ hành động có chủ ý.',
        'Động từ được thay thế là động từ hành động (dynamic action), không phải động từ trạng thái.',
        'Ngữ cảnh quản trị chuyên nghiệp, diễn đạt tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-hasan-clausal-substitution',
      title: 'Cohesion in English: Clausal and Verbal Substitution (So, Not, Do So)',
      url: 'https://www.routledge.com/Cohesion-in-English/Halliday-Hasan/p/book/9780582550315',
      claims: [
        'Clausal substitution with "so" and "not" operates under verbs of thinking, believing, hoping, and saying.',
        'Verbal substitute "do so" requires an agentive dynamic antecedent and cannot substitute for stative predicates.',
        'Conditional substitution "if so / if not" replaces entire presupposed conditional clauses.',
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
    summary: 'Comprehensive review completed. Clausal substitution with so/not, verbal substitution with do so, stative restrictions, conditional if so/if not, and Halliday & Hasan sources verified.',
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

export default soNotDoSoLesson;
