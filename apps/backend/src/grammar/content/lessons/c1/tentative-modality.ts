/**
 * @file tentative-modality.ts
 * @description C1 lesson on tentative modal expressions (might, could, would, may well) for nuanced speculation and cautious proposals.
 */
import type { GrammarLesson } from '../../types.js';

const tentativeModalityLesson: GrammarLesson = {
  id: 'grammar-v2-c1-tentative-modality-14',
  revisionId: 'grammar-v2-c1-tentative-modality-14@1.0.0',
  revision: '1.0.0',
  title: 'Động từ tình thái mang tính thăm dò (Tentative Modality)',
  objective: 'Phân biệt và vận dụng các trợ động từ tình thái ở mức độ thăm dò (might, could, would appear, may well) để đưa ra phán đoán cẩn trọng, khuyến nghị nhã nhặn và phân tích kịch bản giả thuyết.',
  prerequisiteIds: ['grammar-v2-c1-hedging-propositions-13'],
  coverage: ['tentative-modality', 'epistemic-modality', 'might-could-would', 'may-well', 'c1-academic-writing'],
  context: {
    english: 'Senior analysts rarely issue unconditional forecasts. In policy white papers, they favor tentative modality: "A sudden tightening of liquidity could precipitate volatility, while consumer credit may well contract over successive quarters."',
    vietnamese: 'Các nhà phân tích cấp cao hiếm khi đưa ra dự báo vô điều kiện. Trong các báo cáo chính sách, họ chuộng modal tình thái thăm dò: "Việc thắt chặt thanh khoản đột ngột có thể châm ngòi biến động, trong khi tín dụng tiêu dùng rất có thể sẽ co hẹp qua các quý kế tiếp".',
  },
  guide: {
    pattern: 'Subject + might / could / would + base verb / perfect infinitive (have + V3) | Subject + may / might well + base verb',
    whenToUse: [
      'Đưa ra suy luận có căn cứ nhưng vẫn chừa khả năng sai lệch trong dữ liệu thực tế.',
      'Đề xuất phương án cải tiến mang tính gợi ý lịch thiệp, tránh áp đặt lên đối tác hoặc hội đồng.',
      'Phân tích nguyên nhân quá khứ dưới góc độ giả thuyết ("could have been caused by...").',
    ],
    signalWords: ['might well', 'could plausibly', 'would appear to', 'may conceivably', 'would seem', 'it might be argued'],
    check: [
      'Đã phân biệt sắc thái giữa "may well" (xác suất cao nhưng chừng mực) và "might" (thăm dò dè dặt hơn) chưa?',
      'Sau trợ động từ tình thái đã dùng động từ nguyên thể không "to" chưa?',
    ],
  },
  explanation: 'Tentative Modality (tình thái thăm dò) ở bậc C1 vượt xa việc chỉ diễn tả khả năng thông thường. Nó là công cụ hiệu chỉnh mức độ khẳng định (epistemic commitment). Trong đó: "could" và "might" hạ thấp mức độ cam kết so với "will" hoặc "must", diễn tả suy đoán cẩn trọng; "may well" / "might well" diễn đạt khả năng cao xảy ra nhưng vẫn giữ văn phong lịch sự, không áp đặt; "would" tạo khoảng cách giả định, làm cho các đề xuất trở nên tinh tế ("One would expect...", "It would seem advisable to..."). Khi hồi tưởng quá khứ, cấu trúc modal + have + V3 mở ra các kịch bản suy luận chưa thể kiểm chứng tuyệt đối.',
  examples: [
    {
      english: 'Prolonged monetary easing could conceivably exacerbate asset price inflation.',
      vietnamese: 'Nới lỏng tiền tệ kéo dài rất có thể sẽ làm trầm trọng thêm tình trạng lạm phát giá tài sản.',
    },
    {
      english: 'The sudden dip in quarterly revenue may well reflect seasonal supply chain bottlenecks.',
      vietnamese: 'Sự sụt giảm đột ngột trong doanh thu quý rất có thể phản ánh các nút thắt chuỗi cung ứng theo mùa.',
    },
    {
      english: 'It might be prudent to defer the system migration until penetration testing is finalized.',
      vietnamese: 'Có lẽ sẽ là thận trọng nếu hoãn việc chuyển đổi hệ thống cho đến khi hoàn tất thử nghiệm xâm nhập.',
    },
    {
      english: 'The discrepancies would appear to stem from divergent calibration standards across labs.',
      vietnamese: 'Những điểm sai lệch dường như bắt nguồn từ các tiêu chuẩn hiệu chuẩn khác nhau giữa các phòng thí nghiệm.',
    },
    {
      english: 'A retrospective audit might have identified the internal control deficiencies much earlier.',
      vietnamese: 'Một cuộc kiểm toán hồi tố có lẽ đã có thể nhận diện các lỗ hổng kiểm soát nội bộ sớm hơn nhiều.',
    },
    {
      english: 'One could argue that the initial regulatory intervention was disproportionately punitive.',
      vietnamese: 'Người ta có thể lập luận rằng biện pháp can thiệp pháp lý ban đầu mang tính trừng phạt thái quá.',
    },
  ],
  contrasts: [
    {
      form: 'The reform will cause unrest vs The reform could well trigger localized protests',
      whyFits: 'Could well trigger kết hợp thăm dò và nhận diện xác suất hợp lý, tránh giọng điệu tiên tri cực đoan.',
      whyNot: 'Will cause biến phán đoán tương lai thành một tiền định chắc chắn, thiếu căn cứ bao quát.',
    },
    {
      form: 'This must be the explanation vs This would appear to be the most plausible explanation',
      whyFits: 'Would appear to be the most plausible cho phép hội đồng tranh luận và kiểm chứng thêm.',
      whyNot: 'Must be áp đặt suy luận chủ quan như kết luận duy nhất, vi phạm chuẩn mực học thuật.',
    },
  ],
  commonMistakes: [
    'Dùng động từ tình thái chỉ sự chắc chắn tuyệt đối như "must" thay vì động từ thăm dò (could, might) khi diễn giải dữ liệu khoa học chưa được kiểm chứng đầy đủ.',
    'Ghép hai trợ động từ tình thái cạnh nhau (double modals), ví dụ viết "might could" thay vì chọn duy nhất một trợ động từ thích hợp.',
    'Dùng động từ trực diện khẳng định (is/are) khi phản biện ý kiến chuyên gia thay vì dùng modal thăm dò (would seem to be, might appear) để giảm tính đối đầu.',
  ],
  summary: 'Tentative Modality vận dụng might, could, would và cụm may well để giảm độ khẳng định, xây dựng giả thuyết khoa học cẩn trọng và đưa ra đề xuất mang tính ngoại giao, tôn trọng người đọc.',
  exercises: [
    {
      id: 'grammar-v2-c1-tentative-modality-14-q1',
      kind: 'choice',
      prompt: 'Select the sentence that expresses high probability with diplomatic, non-dogmatic restraint.',
      options: [
        { text: 'Given the persistent deficit, consumer spending may well slow in the upcoming quarters.', correct: true, rationale: '"May well" indicates a strong probability framed with academic modesty.' },
        { text: 'Consumer spending must absolutely collapse completely next month.', correct: false, rationale: 'Overstated certainty with absolute vocabulary.' },
        { text: 'It is impossible that consumer spending will ever show any resilience.', correct: false, rationale: 'Categorical negative assertion without nuance.' },
        { text: 'Consumer spending might possibly perhaps maybe experience some minor contraction.', correct: false, rationale: 'Excessive and ungrammatical modal stacking.' },
      ],
      acceptedAnswers: [{ text: 'Given the persistent deficit, consumer spending may well slow in the upcoming quarters.', rationale: 'Correct use of may well for disciplined tentative projection.' }],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q2',
      kind: 'choice',
      prompt: 'Choose the best modal construction for a delicate peer-review recommendation: "It ___ beneficial to replicate the assay with a larger cohort."',
      options: [
        { text: 'would be', correct: true, rationale: 'Hypothetical modal would softens the advice into an elegant, polite suggestion.' },
        { text: 'must necessarily be', correct: false, rationale: 'Imposes an aggressive directive rather than constructive academic critique.' },
        { text: 'is going to be obligatory to be', correct: false, rationale: 'Clunky and unnecessarily authoritarian phrasing.' },
        { text: 'will without doubt be', correct: false, rationale: 'Unwarranted certainty in a peer review context.' },
      ],
      acceptedAnswers: [{ text: 'would be', rationale: 'Appropriate polite modal framing.' }],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q3',
      kind: 'choice',
      prompt: 'Identify the sentence expressing tentative retrospective analysis.',
      options: [
        { text: 'The anomalous reading could have resulted from electromagnetic interference during calibration.', correct: true, rationale: 'Could have + V3 correctly forms tentative retrospective hypothesis.' },
        { text: 'The anomalous reading must definitely result from interference every time.', correct: false, rationale: 'Present habitual certainty does not address past retrospective hypothesis.' },
        { text: 'The anomalous reading was having to result from interference.', correct: false, rationale: 'Malformed modal aspect.' },
        { text: 'The anomalous reading should have to be an interference issue.', correct: false, rationale: 'Confuses obligation with epistemic deduction.' },
      ],
      acceptedAnswers: [{ text: 'The anomalous reading could have resulted from electromagnetic interference during calibration.', rationale: 'Correct modal perfect for retrospective deduction.' }],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q4',
      kind: 'choice',
      prompt: 'Which sentence best hedges an observation about human behavior in sociological research?',
      options: [
        { text: 'One might reasonably infer that socio-economic status influences digital literacy acquisition.', correct: true, rationale: '"One might reasonably infer" balances impersonal pronoun with tentative modal deduction.' },
        { text: 'Everyone knows socio-economic status dictates complete computer incompetence.', correct: false, rationale: 'Informal generalization and sweeping prejudice.' },
        { text: 'Socio-economic status will permanently determine everything about literacy.', correct: false, rationale: 'Inflexible determinism inappropriate in sociology.' },
        { text: 'It might could be deduced that people have zero chance of learning.', correct: false, rationale: 'Ungrammatical double modal.' },
      ],
      acceptedAnswers: [{ text: 'One might reasonably infer that socio-economic status influences digital literacy acquisition.', rationale: 'Disciplined academic stance.' }],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q5',
      kind: 'gap',
      prompt: 'Complete the tentative prediction: "The emerging trade friction may _____ disrupt microchip supply timelines. (well / will)"',
      options: [],
      acceptedAnswers: [
        { text: 'well', rationale: 'May well expresses strong probability framed with scholarly restraint.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q6',
      kind: 'gap',
      prompt: 'Fill in the modal verb expressing tentative perception: "The proposed protocol _____ appear to resolve previous latency issues. (would / shall)"',
      options: [],
      acceptedAnswers: [
        { text: 'would', rationale: 'Would appear to is the canonical C1 tentative perceptual frame.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q7',
      kind: 'gap',
      prompt: 'Supply the tentative modal for cautious retrospection: "The discrepancy _____ have arisen from differing sample preparation methods. (could / should)"',
      options: [],
      acceptedAnswers: [
        { text: 'could', rationale: 'Could have arisen expresses a plausible retrospective possibility.' },
        { text: 'might', rationale: 'Might have arisen is equally acceptable for cautious retrospection.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q8',
      kind: 'gap',
      prompt: 'Complete the formal suggestion: "It _____ seem advisable to conduct further sensitivity analyses. (would / will)"',
      options: [],
      acceptedAnswers: [
        { text: 'would', rationale: 'Would seem advisable softens the recommendation appropriately.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q9',
      kind: 'transform',
      prompt: 'Rewrite this categorical sentence tentatively using "could well": "Automated underwriting will displace entry-level loan evaluators."',
      options: [],
      acceptedAnswers: [
        { text: 'Automated underwriting could well displace entry-level loan evaluators.', rationale: 'Replaces definitive will with tentative high-probability could well.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q10',
      kind: 'transform',
      prompt: 'Rewrite using "One would expect": "We expect the new statutory framework to enhance transparency."',
      options: [],
      acceptedAnswers: [
        { text: 'One would expect the new statutory framework to enhance transparency.', rationale: 'Shifts personal we expect to impersonal tentative one would expect.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q11',
      kind: 'correction',
      prompt: 'Correct the inappropriate dogmatism in this scientific deduction: "These laboratory outcomes must prove that the existing taxonomy is obsolete."',
      options: [],
      acceptedAnswers: [
        { text: 'These laboratory outcomes might suggest that the existing taxonomy is obsolete.', rationale: 'Replaces must prove with tentative modal phrase might suggest.' },
        { text: 'These laboratory outcomes could indicate that the existing taxonomy is obsolete.', rationale: 'Uses tentative could indicate.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-q12',
      kind: 'correction',
      prompt: 'Fix the double modal error: "The newly synthesized compound might could exhibit antimicrobial efficacy."',
      options: [],
      acceptedAnswers: [
        { text: 'The newly synthesized compound might exhibit antimicrobial efficacy.', rationale: 'Removes extraneous modal could.' },
        { text: 'The newly synthesized compound could exhibit antimicrobial efficacy.', rationale: 'Removes extraneous modal might.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c1-tentative-modality-14-r1',
      kind: 'choice',
      prompt: 'Choose the most diplomatically phrased observation for an executive briefing.',
      options: [
        { text: 'The enterprise architecture would appear to require targeted refactoring.', correct: true, rationale: 'Would appear to softens criticism into a collaborative appraisal.' },
        { text: 'The enterprise architecture is garbage and must be destroyed immediately.', correct: false, rationale: 'Unprofessional emotive language.' },
        { text: 'The architecture will without question fail before midnight.', correct: false, rationale: 'Alarmist categorical prediction.' },
      ],
      acceptedAnswers: [{ text: 'The enterprise architecture would appear to require targeted refactoring.', rationale: 'Polite and objective professional stance.' }],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-r2',
      kind: 'gap',
      prompt: 'Insert the adverb in the modal idiom: "Higher interest rates may _____ dampen commercial real estate valuations. (well / much)"',
      options: [],
      acceptedAnswers: [{ text: 'well', rationale: 'May well is the standard idiom for strong likelihood framed politely.' }],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-r3',
      kind: 'transform',
      prompt: 'Convert to tentative retrospection with "might have": "Perhaps the catalyst evaporated before the reaction began."',
      options: [],
      acceptedAnswers: [
        { text: 'The catalyst might have evaporated before the reaction began.', rationale: 'Uses might have + past participle to encode tentative past possibility.' },
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-r4',
      kind: 'correction',
      prompt: 'Correct the modal form: "It would seems that the consensus has shifted."',
      options: [],
      acceptedAnswers: [
        { text: 'It would seem that the consensus has shifted.', rationale: 'Modal would must be followed by base verb seem, not inflected seems.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c1-tentative-modality-14-o1',
      prompt: 'Viết 2 câu phân tích rủi ro tài chính hoặc công nghệ, sử dụng "may well" để dự báo một xu hướng có xác suất cao và "could conceivably" để nêu một tình huống biên (edge case).',
      modelAnswer: 'Sustained inflationary pressure may well prompt central banks to keep interest rates elevated throughout the fiscal year. Under extreme market stress, such tightening could conceivably trigger liquidity crunches across mid-tier lenders.',
      checks: [
        'Sử dụng cấu trúc "may well + động từ nguyên thể".',
        'Sử dụng cấu trúc "could conceivably + động từ nguyên thể".',
        'Ngữ cảnh phân tích rủi ro chuyên nghiệp, câu văn mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-c1-tentative-modality-14-o2',
      prompt: 'Viết 1-2 câu phản biện học thuật nhã nhặn về một nghiên cứu tiền nhiệm, sử dụng "would appear to" và "could have been influenced by".',
      modelAnswer: 'While the findings are provocative, the reported effect size would appear to be somewhat overstated. Specifically, participant retention could have been influenced by self-selection bias during the initial recruitment phase.',
      checks: [
        'Sử dụng cụm tình thái thăm dò "would appear to".',
        'Sử dụng tình thái hoàn thành suy luận quá khứ "could have been influenced by".',
        'Văn phong lịch thiệp, mang tính xây dựng học thuật.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-modality-meanings-and-uses',
      title: 'English Grammar Today: Modality: meanings and uses',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/modality-meanings-and-uses',
      claims: [
        'Modality refers to a speaker or writer attitude towards certainty, possibility, and interpersonal stance.',
        'Tentative modals like could, might, and would express cautious possibility, politeness, and hypothetical distance.',
        'Expressions such as may well and might well denote significant likelihood tempered by epistemic caution.',
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
    summary: 'Comprehensive review completed. Tentative modal expressions (could, might, would appear, may well), retrospective modal perfects, exercise keys, and verified Cambridge Grammar source confirmed.',
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

export default tentativeModalityLesson;
