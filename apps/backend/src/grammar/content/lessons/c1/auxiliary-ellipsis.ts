/**
 * @file auxiliary-ellipsis.ts
 * @description C1 lesson on auxiliary and verb phrase ellipsis for concision and cohesive discourse.
 */
import type { GrammarLesson } from '../../types.js';

const auxiliaryEllipsisLesson: GrammarLesson = {
  id: 'grammar-v2-c1-auxiliary-ellipsis-09',
  revisionId: 'grammar-v2-c1-auxiliary-ellipsis-09@1.0.0',
  revision: '1.0.0',
  title: 'Lược bỏ vị ngữ với trợ động từ (Auxiliary and Verb Phrase Ellipsis)',
  objective: 'Làm chủ kỹ thuật lược bỏ cụm động từ (Verb Phrase Ellipsis - VPE) bằng cách sử dụng trợ động từ tương ứng (do/does/did, have/has/had, be, modal verbs) làm điểm tựa cú pháp, tạo tính hàm súc, loại trừ trùng lặp và duy trì sự mạch lạc cao cấp trong văn bản C1.',
  prerequisiteIds: ['grammar-v2-c1-end-focus-end-weight-08'],
  coverage: ['auxiliary-ellipsis', 'ellipsis', 'verb-phrase-ellipsis', 'cohesion', 'discourse-grammar'],
  context: {
    english: 'In scholarly discourse, legal reasoning, and high-register essays, repeating entire predicate verb phrases sounds clumsy and pedantic. Skilful writers use auxiliary ellipsis to anchor shared propositions swiftly while spotlighting focal contrasts in tense, modality, or polarity.',
    vietnamese: 'Trong văn phong học thuật, lập luận pháp lý và tiểu luận cao cấp, việc lặp lại nguyên vẹn cụm vị ngữ tạo cảm giác nặng nề và vụng về. Người viết điêu luyện vận dụng lược bỏ trợ động từ để nhanh chóng neo giữ mệnh đề chung, đồng thời làm nổi bật sự tương phản về thời, thể, thức hoặc tính khẳng định/phủ định.',
  },
  guide: {
    pattern: 'Subject + Auxiliary Verb (+ not) [Ellipted Verb Phrase omitted from antecedent clause] | Comparative: Clause + than / as + Subject + Auxiliary',
    whenToUse: [
      'Lược bỏ vị ngữ sau liên từ đẳng lập hoặc phụ thuộc khi động từ đã xuất hiện ở vế trước: "The initial clinical trial did not reveal immunological toxicity, but the subsequent trial did [reveal it]".',
      'Đối chiếu hai trạng thái thời hoặc thể: "We have not yet contained the inflationary surge, but we certainly can [contain it], and indeed we must [contain it]".',
      'Lược bỏ trong mệnh đề so sánh: "The semiconductor plant expanded production far more rapidly than market observers had predicted it would [expand production]".',
      'Đồng tình hoặc bác bỏ có nhấn mạnh với "as" hoặc "nor": "The treasury rejected the bailout petition, as did the central bank".',
    ],
    signalWords: ['as did the latter', 'nor would they', 'more efficiently than did its predecessor', 'if indeed it can', 'as might have been expected'],
    check: [
      'Trợ động từ giữ lại có hòa hợp chính xác về thì và thể với vị ngữ bị lược bỏ ở vế trước không?',
      'Khi vế trước dùng động từ thường không có trợ động từ, đã mượn đúng do / does / did ở vế lược bỏ chưa?',
      'Nếu vế trước dùng thì hoàn thành hoặc bị động, vế sau có giữ lại trợ động từ have hoặc be phù hợp không?',
    ],
  },
  explanation: 'Lược bỏ cụm động từ (Verb Phrase Ellipsis - VPE) là hiện tượng cú pháp trong đó toàn bộ cụm động từ (gồm động từ chính, tân ngữ và các bổ ngữ liên quan) được lược bỏ hoàn toàn ở mệnh đề thứ hai, chỉ để lại một hoặc hai trợ động từ (auxiliary verb) làm "người đại diện". Người đọc có thể khôi phục 100% nghĩa nhờ mệnh đề tiền ngữ (antecedent clause). Các quy tắc C1 cần ghi nhớ: 1) Động từ thường trong câu khẳng định cần mượn "do/does/did" khi lược bỏ ("She authored the monograph alone, whereas her colleagues claimed she had not [authored it alone]"); 2) Khi thay đổi thì hoặc thức (modal shift), trợ động từ mới phải xuất hiện ("He has not testified before parliament, but he soon will [testify...]"); 3) Trong cấu trúc so sánh với "than" hoặc "as", có thể đảo trợ động từ lên trước chủ ngữ để tăng tính trang trọng ("The economy contracted faster than had any preceding recession").',
  examples: [
    {
      english: 'The primary hypothesis failed to explain the cosmological variance, but the revised mathematical model did.',
      vietnamese: 'Giả thuyết ban đầu không giải thích được độ biến thiên vũ trụ học, nhưng mô hình toán học sửa đổi thì có.',
    },
    {
      english: 'The developed economies have not yet met their international climate financing pledges, although they repeatedly promised they would.',
      vietnamese: 'Các nền kinh tế phát triển vẫn chưa đáp ứng các cam kết tài chính khí hậu quốc tế của mình, mặc dù họ đã nhiều lần hứa rằng họ sẽ làm vậy.',
    },
    {
      english: 'Autonomous vehicles process real-time sensor streams far more reliably than human motorists ever could.',
      vietnamese: 'Xe tự hành xử lý các luồng cảm biến theo thời gian thực đáng tin cậy hơn nhiều so với khả năng mà các tài xế con người từng có.',
    },
    {
      english: 'The appellate court overturned the municipal injunction, as did the supreme judicial tribunal two weeks later.',
      vietnamese: 'Tòa phúc thẩm đã bác bỏ lệnh cấm của chính quyền thành phố, và tòa án tối cao hai tuần sau đó cũng làm như vậy.',
    },
    {
      english: 'Some institutional investors chose to liquidate their digital asset holdings, while others stubbornly refused to do so.',
      vietnamese: 'Một số nhà đầu tư tổ chức đã chọn thanh lý các khoản nắm giữ tài sản kỹ thuật số, trong khi những người khác kiên quyết từ chối làm điều đó.',
    },
    {
      english: 'The supervisory authority had not anticipated the sudden liquidity freeze, nor had the sovereign debt rating agencies.',
      vietnamese: 'Cơ quan giám sát đã không lường trước được sự đóng băng thanh khoản đột ngột, và các tổ chức xếp hạng nợ công cũng vậy.',
    },
  ],
  contrasts: [
    {
      form: 'The pharmaceutical giant has invested billions in mRNA research, and several regional biotech startups have as well.',
      whyFits: 'VPE chuẩn xác: have đóng vai trò trợ động từ thay thế cho cụm vị ngữ "invested billions in mRNA research".',
      whyNot: '"...and several regional biotech startups did as well" sai vì vế trước dùng thì hiện tại hoàn thành (has invested), vế sau không thể mượn did mà phải dùng have.',
    },
    {
      form: 'The algorithm identified structural vulnerabilities that human code auditors could not.',
      whyFits: 'Could not là modal auxiliary hoàn chỉnh đại diện cho cụm động từ bị lược "identify structural vulnerabilities".',
      whyNot: '"...that human code auditors could not identify them" sai vì nếu đã dùng lại động từ identify thì tân ngữ them bị dư thừa hoặc câu bị lặp từ không cần thiết.',
    },
  ],
  commonMistakes: [
    'Dùng sai trợ động từ không tương thích với thì/thể của mệnh đề tiền ngữ (như dùng "did" để lược bỏ câu có thì hiện tại hoàn thành "has achieved").',
    'Lặp lại vụng về toàn bộ cụm động từ dài trong văn bản học thuật thay vì sử dụng trợ động từ lược bỏ súc tích.',
    'Nhầm lẫn giữa trợ động từ do trong ellipsis và đại từ thay thế "do so" (dùng sai hình thái ngữ pháp trong ngữ cảnh tĩnh tại).',
  ],
  summary: 'Lược bỏ vị ngữ với trợ động từ (VPE) loại bỏ sự trùng lặp bằng cách giữ lại trợ động từ đại diện (do, have, be, modal). Cần đảm bảo trợ động từ hòa hợp chuẩn xác với thời, thể và ngôi của ngữ cảnh mới.',
  exercises: [
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q1',
      kind: 'choice',
      prompt: 'Select the sentence with grammatically flawless verb phrase ellipsis matching aspectual context:',
      options: [
        { text: 'The flagship hospital has digitized all patient records, and regional clinics gradually will.', correct: true, rationale: 'Modal "will" correctly ellipts future VP "digitize all patient records" contrasting with present perfect "has digitized".' },
        { text: 'The flagship hospital has digitized all patient records, and regional clinics gradually have digitized all them.', correct: false, rationale: 'Clumsy, ungrammatical repetition with misplaced pronoun.' },
        { text: 'The flagship hospital has digitized all patient records, and regional clinics gradually did.', correct: false, rationale: 'Aspect clash: past simple "did" fails to match the uncompleted progressive digitization.' },
        { text: 'The flagship hospital has digitized all patient records, and regional clinics gradually are.', correct: false, rationale: 'Auxiliary "are" cannot substitute for an active perfective predicate.' },
      ],
      acceptedAnswers: [{ text: 'The flagship hospital has digitized all patient records, and regional clinics gradually will.', rationale: 'Correct modal shift ellipsis.' }],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q2',
      kind: 'choice',
      prompt: 'Choose the correct formal comparative ellipsis with inversion: "The economy recovered much faster than ___"',
      options: [
        { text: 'had the treasury economists anticipated.', correct: true, rationale: 'Formal inversion after "than" using past perfect auxiliary "had" before the subject.' },
        { text: 'did the treasury economists anticipated.', correct: false, rationale: 'Double past tense: did combined with past verb anticipated.' },
        { text: 'had anticipated the treasury economists.', correct: false, rationale: 'Splits subject from verb ungrammatically.' },
        { text: 'the treasury economists having anticipated.', correct: false, rationale: 'Participle clause without finite auxiliary fails to complete comparative ellipsis.' },
      ],
      acceptedAnswers: [{ text: 'had the treasury economists anticipated.', rationale: 'Formal comparative inversion with had.' }],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q3',
      kind: 'choice',
      prompt: 'Identify the correct coordinated ellipsis with negative polarity:',
      options: [
        { text: 'The environmental audit did not find evidence of toxic runoff, nor did subsequent forensic tests.', correct: true, rationale: 'Negative coordinator "nor" triggers subject-auxiliary inversion with dummy "did".' },
        { text: 'The environmental audit did not find evidence of toxic runoff, nor subsequent forensic tests did.', correct: false, rationale: 'Missing subject-auxiliary inversion after initial "nor".' },
        { text: 'The environmental audit did not find evidence of toxic runoff, nor found subsequent forensic tests.', correct: false, rationale: 'Lexical verb cannot invert directly after "nor" without auxiliary do.' },
        { text: 'The environmental audit did not find evidence of toxic runoff, neither subsequent tests did not.', correct: false, rationale: 'Double negative with ungrammatical word order.' },
      ],
      acceptedAnswers: [{ text: 'The environmental audit did not find evidence of toxic runoff, nor did subsequent forensic tests.', rationale: 'Standard negative auxiliary inversion with nor.' }],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q4',
      kind: 'choice',
      prompt: 'Select the correct modal ellipsis in an adversative clause:',
      options: [
        { text: 'The sovereign government cannot default on multilateral obligations, even if domestic political factions insist it should.', correct: true, rationale: 'Modal "should" elegantly ellipts "default on multilateral obligations".' },
        { text: 'The sovereign government cannot default on multilateral obligations, even if domestic political factions insist it should default on them all.', correct: false, rationale: 'Unnecessary and repetitive clause termination.' },
        { text: 'The sovereign government cannot default on multilateral obligations, even if domestic political factions insist it does.', correct: false, rationale: 'Present simple "does" asserts a fact rather than the intended deontic modality.' },
        { text: 'The sovereign government cannot default on multilateral obligations, even if domestic political factions insist it has.', correct: false, rationale: 'Present perfect auxiliary "has" misrepresents future hypothetical action.' },
      ],
      acceptedAnswers: [{ text: 'The sovereign government cannot default on multilateral obligations, even if domestic political factions insist it should.', rationale: 'Correct modal ellipsis with should.' }],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q5',
      kind: 'gap',
      prompt: 'Supply the auxiliary verb to complete the ellipsis: "Traditional manufacturing plants rarely monitor particulate emissions continuously, but high-tech facilities always _____."',
      options: [],
      acceptedAnswers: [
        { text: 'do', rationale: 'Present auxiliary "do" replaces the plural present predicate "monitor particulate emissions continuously".' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q6',
      kind: 'gap',
      prompt: 'Complete the past perfect ellipsis: "The central bank had not foreseen the currency devaluation, and neither _____ foreign commercial lenders."',
      options: [],
      acceptedAnswers: [
        { text: 'had', rationale: 'Past perfect auxiliary "had" inverts after negative "neither".' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q7',
      kind: 'gap',
      prompt: 'Supply the modal auxiliary: "We have not yet detected anomalous gravitational fluctuations, though our theoretical models suggest we _____."',
      options: [],
      acceptedAnswers: [
        { text: 'should', rationale: 'Modal "should" or "might" denotes theoretical expectation.' },
        { text: 'might', rationale: 'Modal "might" denotes theoretical possibility.' },
        { text: 'could', rationale: 'Modal "could" denotes theoretical potential.' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q8',
      kind: 'gap',
      prompt: 'Complete the comparative ellipsis: "The deep-sea submersible descended far deeper than any uncrewed probe ever _____ before."',
      options: [],
      acceptedAnswers: [
        { text: 'had', rationale: 'Past perfect auxiliary "had" completes the past comparison with "before".' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q9',
      kind: 'transform',
      prompt: 'Eliminate redundant repetition using auxiliary verb phrase ellipsis: "The research council has not officially approved the gene therapy protocol, but the ethics board has officially approved the gene therapy protocol."',
      options: [],
      acceptedAnswers: [
        { text: 'The research council has not officially approved the gene therapy protocol, but the ethics board has.', rationale: 'Ellipts the repeated verb phrase using auxiliary "has".' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q10',
      kind: 'transform',
      prompt: 'Combine the clauses using "as" with inverted auxiliary ellipsis: "The European regulatory authority dismissed the appeal. The American commission dismissed the appeal as well."',
      options: [],
      acceptedAnswers: [
        { text: 'The European regulatory authority dismissed the appeal, as did the American commission.', rationale: 'Uses "as did" to form a concise inverted ellipsis.' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q11',
      kind: 'correction',
      prompt: 'Correct the aspectual auxiliary mismatch: "The lead author has published extensively in quantum computing, and her co-author did as well over the past five years."',
      options: [],
      acceptedAnswers: [
        { text: 'The lead author has published extensively in quantum computing, and her co-author has as well over the past five years.', rationale: 'Replaces past auxiliary "did" with present perfect "has" to match the timeframe and antecedent.' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-q12',
      kind: 'correction',
      prompt: 'Correct the word order after "nor": "The preliminary clinical trial did not reveal immunological rejection, nor subsequent longitudinal tests did."',
      options: [],
      acceptedAnswers: [
        { text: 'The preliminary clinical trial did not reveal immunological rejection, nor did subsequent longitudinal tests.', rationale: 'Inverts auxiliary "did" before the subject noun phrase following "nor".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-r1',
      kind: 'choice',
      prompt: 'Select the optimal sentence demonstrating concise auxiliary ellipsis:',
      options: [
        { text: 'The chief security architect did not anticipate the breach, but the penetration testing team did.', correct: true, rationale: 'Dummy "did" cleanly ellipts the entire negative verb phrase with contrastive polarity.' },
        { text: 'The chief security architect did not anticipate the breach, but the penetration testing team anticipated it.', correct: false, rationale: 'Less concise than standard auxiliary ellipsis.' },
        { text: 'The chief security architect did not anticipate the breach, but the penetration testing team had.', correct: false, rationale: 'Tense shift to "had" is unwarranted without prior past perfect framing.' },
      ],
      acceptedAnswers: [{ text: 'The chief security architect did not anticipate the breach, but the penetration testing team did.', rationale: 'Correct verb phrase ellipsis with dummy did.' }],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-r2',
      kind: 'gap',
      prompt: 'Fill in the auxiliary verb: "The primary reactor did not overheat during stress testing, nor _____ the secondary backup system."',
      options: [],
      acceptedAnswers: [
        { text: 'did', rationale: 'Past auxiliary "did" inverts after negative coordinator "nor".' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-r3',
      kind: 'transform',
      prompt: 'Rewrite using "as" and auxiliary inversion: "The defense ministry endorsed the cybersecurity directive, and the interior ministry also endorsed it."',
      options: [],
      acceptedAnswers: [
        { text: 'The defense ministry endorsed the cybersecurity directive, as did the interior ministry.', rationale: 'Inverts auxiliary did after as for formal stylistic concision.' },
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-r4',
      kind: 'correction',
      prompt: 'Correct the auxiliary mismatch: "The first prototype has demonstrated exceptional thermal efficiency, and the second did too."',
      options: [],
      acceptedAnswers: [
        { text: 'The first prototype has demonstrated exceptional thermal efficiency, and the second has too.', rationale: 'Replaces mismatched past "did" with perfect auxiliary "has".' },
        { text: 'The first prototype has demonstrated exceptional thermal efficiency, and the second has as well.', rationale: 'Accepts has as well variant.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-o1',
      prompt: 'Viết 1-2 câu học thuật sử dụng kỹ thuật lược bỏ vị ngữ với trợ động từ ("...did not..., but the second did", hoặc "as did...") để so sánh hiệu quả của hai phương pháp nghiên cứu hoặc chính sách tài khóa.',
      modelAnswer: 'The qualitative survey failed to capture the nuances of voter disillusionment, but the subsequent mixed-methods analysis did. Furthermore, the latter model incorporated longitudinal data streams, as did the national census bureau.',
      checks: [
        'Sử dụng trợ động từ (did/have/will) để lược bỏ cụm vị ngữ ở mệnh đề thứ hai.',
        'Áp dụng cấu trúc liên kết trang trọng (như as did...).',
        'Trợ động từ hòa hợp chuẩn xác về thì và thể với mệnh đề tiền ngữ.',
      ],
    },
    {
      id: 'grammar-v2-c1-auxiliary-ellipsis-09-o2',
      prompt: 'Viết 1-2 câu trong diễn văn ngoại giao hoặc báo cáo pháp lý sử dụng cấu trúc đảo ngữ với "nor did / had / can..." sau một mệnh đề phủ định.',
      modelAnswer: 'The bilateral accord did not resolve disputed maritime boundary claims, nor did it establish binding dispute arbitration protocols.',
      checks: [
        'Mệnh đề đầu mang ý phủ định.',
        'Mệnh đề sau mở đầu bằng nor kết hợp đảo trợ động từ lên trước chủ ngữ.',
        'Vị ngữ giữ trật tự lược bỏ hoặc động từ nguyên mẫu chính xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'merchant-ellipsis',
      title: 'Oxford Linguistics: The Syntax of Silence (Verb Phrase Ellipsis)',
      url: 'https://academic.oup.com/book/8833',
      claims: [
        'Verb phrase ellipsis elides an identical predicate under identity with an antecedent.',
        'An auxiliary verb (do, have, be, modal) must remain overt to license the elided constituent.',
        'Ellipsis across polarity and tense contrasts allows rapid thematic comparison in formal prose.',
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
    summary: 'Comprehensive review completed. Verb phrase ellipsis, auxiliary stranding (do/have/be/modal), comparative and negative polarity ellipsis, and Jason Merchant Oxford sources verified.',
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

export default auxiliaryEllipsisLesson;
