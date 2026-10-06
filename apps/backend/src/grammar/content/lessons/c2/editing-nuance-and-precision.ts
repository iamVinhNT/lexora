/**
 * @file editing-nuance-and-precision.ts
 * @description C2 lesson: Advanced editorial nuance, syntactic pruning, and stylistic precision.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-editing-nuance-and-precision-16',
  revisionId: 'grammar-v2-c2-editing-nuance-and-precision-16@1.0.0',
  revision: '1.0.0',
  title: 'Biên tập nâng cao: Sắc thái và độ chuẩn xác cú pháp (Editing Nuance & Precision)',
  objective: 'Làm chủ nghệ thuật biên tập và tinh chỉnh cú pháp đỉnh cao (C2 summit): thanh lọc các cấu trúc câu rườm rà (syntactic pruning), loại bỏ danh từ hóa vô hồn (zombie nouns), kiểm soát kết cấu chủ ngữ giả (expletive constructions), và cân chỉnh từng sắc thái nhận thức (epistemic nuance) nhằm đạt chuẩn xuất bản học thuật và văn kiện chính sách quốc tế.',
  prerequisiteIds: ['grammar-v2-c2-spoken-written-variation-15'],
  coverage: ['editing-nuance-and-precision', 'syntactic-pruning', 'epistemic-calibration', 'discourse-polish', 'c2-mastery'],
  context: {
    english: 'A senior editor at an international academic press or multilateral institution transforms dense, convoluted manuscripts into crystalline, authoritative prose by pruning clausal bloat, activating smothered verbs, and calibrating epistemic claims to exact evidentiary limits.',
    vietnamese: 'Một tổng biên tập tại nhà xuất bản học thuật quốc tế hoặc cơ quan đa phương chuyển hóa các bản thảo rối rắm, nặng nề thành văn phong sắc sảo, uy quyền bằng cách cắt tỉa mệnh đề thừa, giải phóng các động từ bị chôn vùi trong danh từ hóa, và cân chỉnh các tuyên bố nhận thức đúng với giới hạn của chứng cứ.',
  },
  guide: {
    pattern: 'Convoluted [It is a fact that + nominalization + passive stack] -> Crystalline [Precise Agent + Active Verb + Lean Complement + Calibrated Hedge]',
    whenToUse: [
      'Cắt bỏ các cụm từ mở đầu rỗng tuếch (throat-clearing phrases: "It is noteworthy to observe that", "Due to the fact that")',
      'Giải phóng các động từ mạnh bị che giấu dưới các cụm danh từ hóa rườm rà ("conduct an examination of" -> "examine")',
      'Khử bỏ kết cấu chủ ngữ giả ("there is / it is") khi chúng làm suy yếu nhịp điệu và làm lu mờ chủ thể hành động',
      'Cân chỉnh rào đón nhận thức (hedging) để không khẳng định quá mức (overclaiming) cũng không rụt rè thái quá (underclaiming)',
    ],
    signalWords: ['crystalline', 'succinctly', 'substantiate', 'warrant', 'compellingly', 'militates against'],
    check: [
      'Đoạn văn có bị lạm dụng danh từ hóa (nominalization overload / zombie nouns) khiến người đọc nghẹt thở không?',
      'Chủ ngữ của câu có phải là chủ thể thực hiện hành động chính hay bị ẩn sau chủ ngữ giả "it/there"?',
      'Mức độ chắc chắn của câu có phản ánh trung thực trọng lượng của bằng chứng thực nghiệm không?',
    ],
  },
  explanation: 'Đỉnh cao của năng lực ngôn ngữ C2 thể hiện ở khả năng biên tập tự thân (self-editing) và hoàn thiện văn bản đạt độ tinh xảo tối thượng. Nhiều người viết ở trình độ cao mắc bẫy "văn phong học phiệt giả tạo" (pseudo-intellectual verbosity): chồng chất các chuỗi bị động vô cớ, lạm dụng danh từ hóa biến động từ sống động thành các danh từ chết ("make an assumption regarding" thay vì "assume"), và mở đầu câu bằng các cụm dẫn dắt rỗng nghĩa ("It should be remembered that..."). Kỹ thuật biên tập C2 vận hành theo bốn nguyên lý cốt lõi: (1) Cắt tỉa cú pháp (Syntactic Pruning): tiêu diệt các từ đệm và mệnh đề quan hệ thừa ("the factors which are relevant" -> "the relevant factors"); (2) Khôi phục động từ sống động (Verb Activation): chuyển danh từ trừu tượng thành động từ hành động chính; (3) Tinh giản kết cấu chủ ngữ giả: xóa bỏ "There are..." và "It is believed that..." để đưa chủ thể thật lên đầu; (4) Hiệu chỉnh sắc thái nhận thức (Nuance Calibration): lựa chọn chính xác giữa "demonstrates", "suggests", "warrants", "intimates" dựa trên sức nặng của số liệu.',
  examples: [
    {
      english: 'Unedited bloat: It is important to bear in mind the fact that the committee has reached a decision to undertake an investigation into the matter.',
      vietnamese: 'Bản thô rườm rà: Điều quan trọng cần ghi nhớ là ủy ban đã đạt được quyết định tiến hành một cuộc điều tra vào sự việc (Quá nhiều từ đệm và danh từ hóa vô hồn).',
    },
    {
      english: 'Edited C2: The committee resolved to investigate the allegations.',
      vietnamese: 'Biên tập C2 tinh gọn: Ủy ban đã quyết nghị điều tra các cáo buộc (Rút gọn từ 23 từ xuống còn 7 từ, giữ trọn vẹn sức mạnh ngữ nghĩa).',
    },
    {
      english: 'Unedited expletive: There are several empirical considerations that militate against the premature deregulation of banking liquidity.',
      vietnamese: 'Bản thô chủ ngữ giả: Có một số cân nhắc thực nghiệm chống lại việc bãi bỏ quy định sớm về thanh khoản ngân hàng.',
    },
    {
      english: 'Edited crystalline: Several empirical considerations militate against prematurely deregulating banking liquidity.',
      vietnamese: 'Biên tập sáng rõ: Nhiều cân nhắc thực nghiệm phản đối việc bãi bỏ quy định sớm đối với thanh khoản ngân hàng (Xóa bỏ "There are", đẩy chủ ngữ thật lên đầu).',
    },
    {
      english: 'Overclaimed: These clinical trials prove conclusively that the synthesized compound cures all neurological inflammation.',
      vietnamese: 'Khẳng định quá đà: Các thử nghiệm lâm sàng này chứng minh kết luận rằng hợp chất tổng hợp chữa khỏi mọi chứng viêm thần kinh (Vi phạm tính khiêm tốn khoa học).',
    },
    {
      english: 'Calibrated nuance: These clinical trials provide preliminary corroboration that the synthesized compound mitigates localized neuroinflammation.',
      vietnamese: 'Sắc thái chuẩn xác: Các thử nghiệm lâm sàng này cung cấp sự xác thực sơ bộ cho thấy hợp chất tổng hợp làm giảm viêm thần kinh cục bộ (Độ đo lường nhận thức hoàn hảo).',
    },
  ],
  contrasts: [
    {
      form: 'Smothered Verb (Nominalization Stack) vs Activated Verb',
      whyFits: '"The audit team rigorously evaluated capital solvency" trực diện, năng động và tạo lực đẩy cú pháp mạnh mẽ.',
      whyNot: '"The audit team conducted a rigorous evaluation of the status of capital solvency" chôn vùi hành động chính dưới danh từ "evaluation" và động từ yếu "conducted", làm câu trở nên nặng nề và uể oải.',
    },
    {
      form: 'Unwarranted Certainty vs Scientifically Calibrated Hedging',
      whyFits: '"The regression metrics suggest an inverse correlation between interest margins and credit velocity" bảo đảm tính trung thực khoa học trước dữ liệu biến thiên.',
      whyNot: '"*The regression metrics prove indisputably that interest margins control credit velocity" phạm sai lầm học thuật chết người khi dùng ngôn từ tuyệt đối hóa cho các quan hệ tương quan thống kê.',
    },
  ],
  commonMistakes: [
    'Giữ lại các cụm từ mở đầu sáo rỗng ("It goes without saying that", "As is widely acknowledged") gây loãng thông điệp chính.',
    'Để các chuỗi giới từ nối tiếp nhau dài lê thê ("the evaluation of the determination of the implementation of the policy") thay vì cấu trúc lại bằng cụm tính từ - danh từ cô đọng.',
    'Dùng từ khẳng định cực đoan ("indisputably proves") thay cho các động từ đo lường nhận thức chuẩn mực ("indicates", "corroborates", "suggests").',
  ],
  summary: 'Biên tập đẳng cấp C2 là thanh lọc triệt để các cấu trúc rườm rà, giải phóng động từ bị kìm kẹp bởi danh từ hóa, và cân chỉnh sắc thái nhận thức chuẩn xác đến từng từ ngữ.',
  exercises: [
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q1',
      kind: 'choice',
      prompt: 'Chọn phương án biên tập tối ưu loại bỏ hoàn toàn các cụm từ đệm sáo rỗng và danh từ hóa yếu trong câu: "It is necessary to make a mention of the fact that the company underwent a restructuring process."',
      options: [
        { text: 'The company restructured.', correct: true, rationale: 'Cắt bỏ toàn bộ rác cú pháp (throat-clearing), đưa hành động chính về động từ nguyên bản "restructured" tinh gọn tối đa.' },
        { text: 'It is necessary to mention that the company made a restructuring.', correct: false, rationale: 'Vẫn còn cụm mở đầu thừa "It is necessary to" và động từ yếu "made a restructuring".' },
        { text: 'A restructuring process was undergone by the company necessarily.', correct: false, rationale: 'Cấu trúc bị động rối rắm và gượng ép.' },
      ],
      acceptedAnswers: [{ text: 'The company restructured.', rationale: 'Biên tập đỉnh cao: chuyển 20 từ rườm rà thành 3 từ sắc bén.' }],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q2',
      kind: 'choice',
      prompt: 'Xác định câu loại trừ thành công kết cấu chủ ngữ giả "there are" và chuỗi mệnh đề quan hệ rườm rà.',
      options: [
        { text: 'Three statutory hurdles impede the swift ratification of the environmental treaty.', correct: true, rationale: 'Chủ ngữ thật "Three statutory hurdles" đứng đầu, động từ mạnh "impede" làm nòng cốt câu.' },
        { text: 'There are three statutory hurdles that operate to impede the swift ratification of the treaty.', correct: false, rationale: 'Vẫn phụ thuộc vào chủ ngữ giả "There are" và mệnh đề quan hệ thừa "that operate to".' },
        { text: 'It is obvious that there exist three hurdles which are statutory.', correct: false, rationale: 'Chồng chất chủ ngữ giả và cụm rác ngữ pháp.' },
      ],
      acceptedAnswers: [{ text: 'Three statutory hurdles impede the swift ratification of the environmental treaty.', rationale: 'Loại bỏ expletive và kích hoạt động từ chính.' }],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q3',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện mức độ rào đón nhận thức (hedging calibration) chuẩn xác nhất cho một kết luận nghiên cứu kinh tế.',
      options: [
        { text: 'These preliminary econometric findings indicate that subsidy reductions may depress agricultural investment in the short run.', correct: true, rationale: 'Sử dụng "preliminary", "indicate that", và "may depress" để định lượng chính xác độ tin cậy khoa học.' },
        { text: 'These findings prove beyond all shadow of doubt that subsidy reductions always totally crush agricultural investment.', correct: false, rationale: 'Khẳng định quá trớn (overclaiming), mang tính cảm tính thô thiển.' },
        { text: 'It is maybe somewhat possible that something might happen to investment if subsidies are cut.', correct: false, rationale: 'Rụt rè thái quá (underclaiming/mushy hedging) làm mất giá trị học thuật của bài báo.' },
      ],
      acceptedAnswers: [{ text: 'These preliminary econometric findings indicate that subsidy reductions may depress agricultural investment in the short run.', rationale: 'Hiệu chuẩn nhận thức đạt chuẩn xuất bản quốc tế.' }],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q4',
      kind: 'choice',
      prompt: 'Chọn phương án xử lý chuỗi giới từ tích tụ (prepositional pileup): "the assessment of the risk of the failure of the project".',
      options: [
        { text: 'assessing project failure risks', rationale: 'Chuyển danh từ hóa thành danh động từ và cụm danh từ ghép tinh gọn, loại bỏ hoàn toàn chuỗi "of".', correct: true },
        { text: 'the assessment regarding the risk concerning project failure', correct: false, rationale: 'Thay thế giới từ này bằng giới từ khác không giải quyết được căn nguyên tích tụ.' },
        { text: 'risk assessment of project failure occurrences', correct: false, rationale: 'Vẫn còn từ thừa "occurrences" và chuỗi giới từ rườm rà.' },
      ],
      acceptedAnswers: [{ text: 'assessing project failure risks', rationale: 'Cắt tỉa chuỗi giới từ thừa thãi một cách triệt để.' }],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q5',
      kind: 'gap',
      prompt: 'Điền động từ hành động đơn lẻ thay thế cụm danh từ hóa "come to a realization of": "Scholars eventually ___ that structural reform was indispensable."',
      options: [],
      acceptedAnswers: [
        { text: 'realized', rationale: '"realized" kích hoạt động từ bị chôn vùi trong "come to a realization of".' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q6',
      kind: 'gap',
      prompt: 'Điền động từ thay thế cụm "give consideration to": "The arbitration panel will ___ the revised settlement terms tomorrow."',
      options: [],
      acceptedAnswers: [
        { text: 'consider', rationale: '"consider" là động từ mạnh thay thế cho cụm danh từ hóa yếu "give consideration to".' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q7',
      kind: 'gap',
      prompt: 'Điền tính từ học thuật hiệu chuẩn mức độ bằng chứng chỉ mang tính sơ khởi: "These ___ findings warrant further empirical investigation."',
      options: [],
      acceptedAnswers: [
        { text: 'preliminary', rationale: '"preliminary findings" định lượng đúng tính chất mở đầu của dữ liệu.' },
        { text: 'provisional', rationale: '"provisional findings" thể hiện kết quả tạm thời.' },
        { text: 'tentative', rationale: '"tentative findings" thể hiện kết luận thận trọng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q8',
      kind: 'gap',
      prompt: 'Điền động từ thay thế cụm "conduct an analysis of": "The intelligence agency must systematically ___ intercepted communications."',
      options: [],
      acceptedAnswers: [
        { text: 'analyze', rationale: '"analyze" là động từ giải phóng từ cụm "conduct an analysis of".' },
        { text: 'analyse', rationale: '"analyse" là biến thể chính tả chuẩn Anh-Anh.' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q9',
      kind: 'transform',
      prompt: 'Biên tập tinh gọn câu sau bằng cách kích hoạt động từ và loại bỏ chủ ngữ giả: "It was the decision of the ministry to effect a reduction in tariffs." -> "The ministry decided to ___ tariffs."',
      options: [],
      acceptedAnswers: [
        { text: 'reduce', rationale: '"reduce" thay thế cho cụm rườm rà "effect a reduction in".' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q10',
      kind: 'transform',
      prompt: 'Cắt tỉa mệnh đề phụ rườm rà trong câu sau: "All delegates who are in attendance must register." -> "All ___ delegates must register."',
      options: [],
      acceptedAnswers: [
        { text: 'attending', rationale: 'Chuyển mệnh đề quan hệ "who are in attendance" thành phân từ bổ nghĩa đứng trước.' },
        { text: 'present', rationale: 'Dùng tính từ "present" cô đọng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q11',
      kind: 'correction',
      prompt: 'Biên tập loại bỏ danh từ hóa vô hồn và động từ yếu trong câu: "The inspector conducted an investigation into the allegations."',
      options: [],
      acceptedAnswers: [
        { text: 'The inspector investigated the allegations.', rationale: 'Kích hoạt động từ chính "investigated" thay cho "conducted an investigation into".' },
        { text: 'investigated the allegations', rationale: 'Cụm vị ngữ kích hoạt động từ chính investigated.' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi khẳng định quá đà (overclaiming) trong câu kết luận học thuật: "This survey unequivocally proves that everyone supports the policy change."',
      options: [],
      acceptedAnswers: [
        { text: 'This survey suggests broad support for the policy change.', rationale: 'Hiệu chuẩn nhận thức bằng động từ "suggests" và tính từ "broad" thay cho "unequivocally proves" và "everyone".' },
        { text: 'This survey indicates substantial support for the policy change.', rationale: 'Dùng "indicates substantial support" để đạt chuẩn khách quan học thuật.' },
        { text: 'suggests broad support for the policy change', rationale: 'Cụm vị ngữ hiệu chuẩn nhận thức với suggests broad support.' },
        { text: 'indicates substantial support for the policy change', rationale: 'Cụm vị ngữ học thuật với indicates substantial support.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-r1',
      kind: 'choice',
      prompt: 'Chọn câu được biên tập hoàn hảo nhất theo tiêu chuẩn của các tạp chí học thuật hàng đầu (Nature/Oxford University Press).',
      options: [
        { text: 'Targeted fiscal transfers stimulate rural consumption more effectively than general tax credits.', correct: true, rationale: 'Cấu trúc SVO trực diện, không có từ đệm, động từ "stimulate" mạnh mẽ, so sánh đối xứng hoàn hảo.' },
        { text: 'It can be seen that the provision of targeted fiscal transfers operates to have an effect on rural consumption that is better than general tax credits.', correct: false, rationale: 'Nặng nề, rườm rà với hàng loạt từ nối thừa và danh từ hóa yếu.' },
        { text: 'Rural consumption is stimulated by the government giving money rather than doing tax things.', correct: false, rationale: 'Từ vựng nghèo nàn, thiếu độ chuẩn xác học thuật.' },
      ],
      acceptedAnswers: [{ text: 'Targeted fiscal transfers stimulate rural consumption more effectively than general tax credits.', rationale: 'Văn phong C2 tinh xảo, cô đọng và quyền uy.' }],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-r2',
      kind: 'gap',
      prompt: 'Điền động từ kích hoạt duy nhất thay thế cụm "perform an assessment of": "Auditors must ___ the internal accounting controls annually."',
      options: [],
      acceptedAnswers: [
        { text: 'assess', rationale: '"assess" kích hoạt động từ bị kìm kẹp trong "perform an assessment of".' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-r3',
      kind: 'transform',
      prompt: 'Xóa bỏ cụm mở đầu rỗng tuếch và viết lại câu trực diện: "It is widely acknowledged that trade barriers distort market incentives." -> "Trade barriers ___ market incentives."',
      options: [],
      acceptedAnswers: [
        { text: 'distort', rationale: 'Xóa cụm "It is widely acknowledged that" đưa chủ ngữ và động từ chính lên đầu.' },
        { text: 'undeniably distort', rationale: 'Thêm trạng từ nếu muốn nhấn mạnh nhưng vẫn giữ trật tự trực diện.' },
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-r4',
      kind: 'correction',
      prompt: 'Biên tập loại bỏ chuỗi danh từ hóa tích tụ trong câu: "The purpose of the implementation of the strategy is the achievement of revenue growth."',
      options: [],
      acceptedAnswers: [
        { text: 'The strategy aims to increase revenue.', rationale: 'Rút gọn 15 từ chứa 4 danh từ hóa thành 6 từ sắc bén, giàu năng lượng.' },
        { text: 'Implementing the strategy aims to achieve revenue growth.', rationale: 'Dùng danh động từ kích hoạt chủ ngữ.' },
        { text: 'The strategy aims to achieve revenue growth.', rationale: 'Câu rút gọn kích hoạt động từ aims to achieve.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-o1',
      prompt: 'Biên tập lại đoạn văn rườm rà dưới đây thành một đoạn văn 2 câu chuẩn mực C2: cắt tỉa hoàn toàn các từ đệm, loại bỏ chủ ngữ giả, giải phóng các động từ bị danh từ hóa và hiệu chuẩn sắc thái nhận thức. Đoạn văn gốc: "It is a well-known fact that the administration took into consideration the possibility of the introduction of tariff hikes. However, there is empirical evidence that proves conclusively that these measures will cause the total destruction of trade relationships."',
      modelAnswer: 'The administration considered introducing tariff hikes to protect domestic industries. However, preliminary empirical evidence suggests that such protective barriers could severely destabilize multilateral trade relations.',
      checks: [
        'Cắt bỏ hoàn toàn các cụm từ đệm (It is a well-known fact that, took into consideration the possibility of)',
        'Loại bỏ khẳng định quá đà (proves conclusively, total destruction) và thay bằng rào đón học thuật chuẩn xác (suggests, could severely destabilize)',
        'Kích hoạt các động từ hành động chính và bảo đảm nhịp điệu cú pháp chặt chẽ',
      ],
    },
    {
      id: 'grammar-v2-c2-editing-nuance-and-precision-16-o2',
      prompt: 'Viết một hướng dẫn biên tập ngắn (2-3 câu) giải thích vì sao việc chuyển hóa danh từ hóa vô hồn (zombie nouns) thành động từ hành động sống động lại nâng cao sức mạnh lập luận trong các văn kiện phân tích cấp cao.',
      modelAnswer: 'Smothering dynamic processes beneath abstract nominalizations obscures agency and saps sentences of syntactic momentum. By resurrecting buried verbs, writers reinstate clear causal vectors and compel readers to engage directly with substantive human actions rather than static bureaucratic abstractions.',
      checks: [
        'Phân tích sâu sắc tác hại cú pháp của danh từ hóa vô hồn (obscuring agency, sapping momentum)',
        'Làm nổi bật lợi ích của việc kích hoạt động từ sống động đối với sự rõ ràng của chuỗi nhân quả',
        'Sử dụng ngôn ngữ phân tích phê bình và cú pháp học thuật thượng thừa',
      ],
    },
  ],
  sources: [
    {
      id: 'williams-style-clarity',
      title: 'Style: Lessons in Clarity and Grace (Joseph M. Williams & Joseph Bizup)',
      url: 'https://www.pearson.com/en-us/subject-catalog/p/style-lessons-in-clarity-and-grace/P200000003507/9780134080413',
      claims: ['Active verbs and concrete agents eliminate bureaucratic opacity caused by excessive nominalization', 'Pruning redundant clausal metadiscourse sharpens thematic focus'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'hyland-hedging-academic',
      title: 'Hedging in Scientific Research Articles (Ken Hyland)',
      url: 'https://www.benjamins.com/catalog/pbns.54',
      claims: ['Epistemic calibration balances authorial commitment and empirical warrant in high-level peer discourse'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified syntactic pruning, zombie noun activation, epistemic calibration, 16 exercises, outputs, and canonical sources.',
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

export default lesson;
