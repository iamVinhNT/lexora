/**
 * @file coordination-scope.ts
 * @description C2 lesson: Coordination scope, distributive vs collective readings, and structural symmetry.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-coordination-scope-12',
  revisionId: 'grammar-v2-c2-coordination-scope-12@1.0.0',
  revision: '1.0.0',
  title: 'Phạm vi đẳng lập cú pháp và diễn giải song song (Coordination Scope)',
  objective: 'Làm chủ phạm vi chi phối của các liên từ đẳng lập (coordination scope), phân biệt cách hiểu phân phối (distributive) và tập hợp (collective), hóa giải sự mơ hồ bổ ngữ trong các cấu trúc danh từ và vị ngữ ghép trong văn kiện pháp lý và học thuật cấp cao.',
  prerequisiteIds: ['grammar-v2-c2-ellipsis-antecedents-11'],
  coverage: ['coordination-scope', 'syntactic-parallelism', 'scope-ambiguity', 'c2-precision', 'distributive-collective'],
  context: {
    english: 'In statutory interpretation and commercial litigation, whether a pre-modifying adjective or post-modifying relative clause governs both coordinated elements or only the immediately contiguous element frequently determines contractual liability.',
    vietnamese: 'Trong diễn giải luật định và tranh tụng thương mại, việc một tính từ đứng trước hoặc một mệnh đề quan hệ đứng sau chi phối cả hai thành phần đẳng lập hay chỉ chi phối thành phần tiếp giáp gần nhất thường mang tính quyết định đến trách nhiệm pháp lý theo hợp đồng.',
  },
  guide: {
    pattern: '[Modifier + N1] and [Modifier + N2] (rõ phạm vi phân phối) vs [Both N1 and N2 + shared post-modifier] (rõ phạm vi bao trùm)',
    whenToUse: [
      'Xóa bỏ sự nhập nhằng khi tính từ đứng trước hai danh từ liên kết bằng "and" hoặc "or" (Pre-nominal modifier scope)',
      'Phân định ranh giới rõ ràng khi mệnh đề quan hệ hoặc cụm giới từ đứng sau cụm danh từ ghép (Post-modifier attachment)',
      'Duy trì tính đối xứng cú pháp hoàn hảo giữa các thành phần đẳng lập phức tạp (Syntactic parallelism)',
    ],
    signalWords: ['respectively', 'jointly and severally', 'both ... and', 'either ... or', 'as well as', 'not only ... but also'],
    check: [
      'Tính từ đứng trước có vô tình bị hiểu là chỉ bổ nghĩa cho danh từ thứ nhất không?',
      'Mệnh đề quan hệ ở cuối có dấu phẩy để phân biệt giữa bổ nghĩa cho cả cụm ghép hay chỉ danh từ thứ hai không?',
      'Các vế đẳng lập có đồng nhất tuyệt đối về cấu trúc ngữ pháp (danh từ đi với danh từ, mệnh đề đi với mệnh đề) không?',
    ],
  },
  explanation: 'Phạm vi đẳng lập (Coordination Scope) là trọng tâm nghiên cứu cú pháp trong văn bản cấp độ C2. Khi liên từ đẳng lập ("and", "or") kết hợp hai hoặc nhiều ngữ đoạn, các bổ ngữ đi kèm có thể tạo ra "scope ambiguity" (mơ hồ phạm vi). Ví dụ trong cụm "foreign banks and corporations", tính từ "foreign" có phạm vi phân phối (distributive: các ngân hàng nước ngoài và các tập đoàn nước ngoài) hay phạm vi hẹp (narrow scope: các tập đoàn nói chung và chỉ các ngân hàng nước ngoài)? Trong văn bản pháp lý, sự mơ hồ này có thể dẫn đến kiện tụng kéo dài. Ba phương pháp kỹ thuật xử lý gồm: (1) Lặp lại từ hạn định hoặc tính từ ("foreign banks and foreign corporations"); (2) Đảo vị trí thành phần đơn lẻ lên trước ("corporations and foreign banks"); (3) Sử dụng cấu trúc bao bọc lưỡng cực ("both ... and", hoặc thêm trạng từ "respectively" khi đối chiếu từng cặp). Ngoài ra, luật song song đòi hỏi mọi thành phần đẳng lập phải tương thích chặt chẽ về chức năng cú pháp.',
  examples: [
    {
      english: 'The statute penalizes fraudulent misrepresentations and fraudulent omissions made during securities offerings.',
      vietnamese: 'Đạo luật xử phạt các hành vi xuyên tạc gian lận và các hành vi thiếu sót gian lận trong các đợt chào bán chứng khoán (Lặp tính từ để xác định rõ phạm vi phân phối).',
    },
    {
      english: 'The directive applies to all state agencies and private contractors that receive public subsidies.',
      vietnamese: 'Chỉ thị áp dụng cho tất cả các cơ quan nhà nước và các nhà thầu tư nhân có nhận trợ cấp công (Mệnh đề quan hệ chi phối cả hai hoặc chỉ nhà thầu tư nhân - cần làm rõ bằng dấu câu hoặc trật tự từ).',
    },
    {
      english: 'The arbitral award established that the insurer was liable neither for punitive damages nor for consequential losses.',
      vietnamese: 'Phán quyết trọng tài xác định rằng bên bảo hiểm không phải chịu trách nhiệm đối với cả thiệt hại mang tính trừng phạt lẫn các tổn thất mang tính hệ quả (Neither... nor song song cụm giới từ).',
    },
    {
      english: 'The ministers agreed to accelerate customs clearance and to harmonize sanitary inspection protocols.',
      vietnamese: 'Các bộ trưởng nhất trí đẩy nhanh thông quan hải quan và hài hòa hóa các quy thức kiểm dịch y tế (Lặp lại "to" bảo đảm tính song song của hai động từ nguyên mẫu).',
    },
    {
      english: 'The university admitted both undergraduate applicants and graduate candidates who demonstrated exceptional aptitude.',
      vietnamese: 'Trường đại học đã tiếp nhận cả các ứng viên đại học lẫn các ứng viên sau đại học thể hiện năng khiếu xuất chúng (Both... and làm rõ phạm vi tiếp nhận).',
    },
    {
      english: 'The audit examined the integrity of financial ledgers and the effectiveness of internal control mechanisms.',
      vietnamese: 'Cuộc kiểm toán đã kiểm tra tính toàn vẹn của sổ sách tài chính và hiệu quả của các cơ chế kiểm soát nội bộ (Cân bằng cấu trúc: the N1 of NP and the N2 of NP).',
    },
  ],
  contrasts: [
    {
      form: 'Ambiguous Pre-nominal Scope vs Disambiguated Reordering',
      whyFits: '"The decree regulates private individuals and charitable organizations" đặt danh từ không có bổ ngữ lên trước, loại trừ khả năng hiểu "private" bổ nghĩa cho cả "charitable organizations".',
      whyNot: '"The decree regulates charitable organizations and private individuals" nếu viết "private charitable organizations and individuals" thì "private" có thể bị hiểu là trùm lên cả "individuals".',
    },
    {
      form: 'Correlative Parallelism vs Asymmetric Conjunction',
      whyFits: '"The board resolved not only to audit foreign subsidiaries but also to dismiss negligent directors" duy trì trọn vẹn cặp động từ nguyên mẫu có "to".',
      whyNot: '"*The board resolved not only to audit foreign subsidiaries but also dismissing negligent directors" phá vỡ nguyên lý song song cú pháp khi ghép "to audit" với "dismissing".',
    },
  ],
  commonMistakes: [
    'Đặt tính từ trước danh từ ghép khiến người đọc không thể xác định tính từ bổ nghĩa cho một hay cả hai danh từ.',
    'Phá vỡ tính đối xứng trong cấu trúc liên từ tương quan (như "either... or", "not only... but also") bằng cách kết hợp hai loại từ loại khác nhau.',
    'Để mệnh đề quan hệ đứng sau hai danh từ đẳng lập mà không làm rõ liệu mệnh đề đó bổ nghĩa cho cả hai hay chỉ danh từ đứng liền kề.',
  ],
  summary: 'Kiểm soát phạm vi đẳng lập bằng cách phân định rành mạch phạm vi của bổ ngữ đứng trước và bổ ngữ đứng sau, duy trì tính đối xứng cú pháp tuyệt đối giữa các vế liên kết.',
  exercises: [
    {
      id: 'grammar-v2-c2-coordination-scope-12-q1',
      kind: 'choice',
      prompt: 'Chọn câu loại trừ hoàn toàn sự mơ hồ về phạm vi bổ nghĩa của tính từ "maritime" trong văn bản luật.',
      options: [
        { text: 'The treaty governs maritime borders and maritime exclusive economic zones.', correct: true, rationale: 'Lặp lại tính từ "maritime" xác định rõ ràng phạm vi phân phối cho từng danh từ.' },
        { text: 'The treaty governs maritime borders and economic zones.', correct: false, rationale: 'Dễ gây tranh chấp xem economic zones có bắt buộc phải thuộc về maritime hay không.' },
        { text: 'The treaty governs borders and maritime economic zones in general.', correct: false, rationale: 'Vị trí này khiến borders hoàn toàn phi biển, có thể đi chệch khỏi mục đích công ước biển.' },
      ],
      acceptedAnswers: [{ text: 'The treaty governs maritime borders and maritime exclusive economic zones.', rationale: 'Lặp lại bổ ngữ loại bỏ triệt để tranh chấp về phạm vi đẳng lập.' }],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q2',
      kind: 'choice',
      prompt: 'Chọn câu tuân thủ tính đối xứng song song hoàn hảo (syntactic parallelism) với liên từ tương quan "neither... nor".',
      options: [
        { text: 'The appellate court upheld neither the punitive damages awarded by the jury nor the injunctive relief granted by the chancellor.', correct: true, rationale: 'Cả hai vế sau neither và nor đều là cụm danh từ có phân từ bổ nghĩa phía sau, đối xứng hoàn hảo.' },
        { text: 'The appellate court neither upheld the punitive damages nor granting the injunctive relief.', correct: false, rationale: 'Bất đối xứng nghiêm trọng giữa động từ quá khứ upheld và dạng V-ing granting.' },
        { text: 'The appellate court upheld neither the punitive damages nor did it grant the injunctive relief.', correct: false, rationale: 'Sau neither là cụm danh từ nhưng sau nor lại là một mệnh đề hoàn chỉnh.' },
      ],
      acceptedAnswers: [{ text: 'The appellate court upheld neither the punitive damages awarded by the jury nor the injunctive relief granted by the chancellor.', rationale: 'Cấu trúc đối xứng danh từ tuyệt đối sau liên từ tương quan.' }],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q3',
      kind: 'choice',
      prompt: 'Trong hợp đồng thương mại: "The insurer shall indemnify the policyholder against catastrophic losses and damages caused by armed conflict." Mệnh đề "caused by armed conflict" gây mơ hồ cú pháp như thế nào?',
      options: [
        { text: 'Mơ hồ xem điều kiện "caused by armed conflict" chỉ áp dụng cho "damages" hay áp dụng cho cả "catastrophic losses".', correct: true, rationale: 'Đây là hiện tượng post-modifier attachment ambiguity điển hình trong tranh chấp hợp đồng bảo hiểm.' },
        { text: 'Mơ hồ xem insurer hay policyholder là bên gây ra armed conflict.', correct: false, rationale: 'Chủ thể gây ra xung đột vũ trang không phải là nguồn gốc tranh cãi ngữ pháp ở đây.' },
        { text: 'Mơ hồ về thì của động từ shall indemnify.', correct: false, rationale: 'Shall indemnify là trợ động từ chuẩn xác, không tạo ra mơ hồ thời gian.' },
      ],
      acceptedAnswers: [{ text: 'Mơ hồ xem điều kiện "caused by armed conflict" chỉ áp dụng cho "damages" hay áp dụng cho cả "catastrophic losses".', rationale: 'Tranh chấp kinh điển về phạm vi chi phối của bổ ngữ phía sau.' }],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q4',
      kind: 'choice',
      prompt: 'Chọn câu viết lại hóa giải triệt để sự mơ hồ phạm vi bổ nghĩa trong câu hỏi số 3 theo hướng giới hạn vũ trang cho CẢ HAI đối tượng.',
      options: [
        { text: 'The insurer shall indemnify the policyholder against both losses and damages, in each case where caused by armed conflict.', correct: true, rationale: 'Cụm "both ... and ..., in each case where caused by" xác định phạm vi bao quát toàn bộ.' },
        { text: 'The insurer shall indemnify the policyholder against catastrophic losses, and damages caused by armed conflict.', correct: false, rationale: 'Dấu phẩy này lại ngụ ý tách rời losses (bồi thường vô điều kiện) và damages (chỉ do xung đột vũ trang).' },
        { text: 'The insurer shall indemnify against losses and damages armed conflict caused.', correct: false, rationale: 'Văn phong thiếu tự nhiên và cấu trúc lỏng lẻo.' },
      ],
      acceptedAnswers: [{ text: 'The insurer shall indemnify the policyholder against both losses and damages, in each case where caused by armed conflict.', rationale: 'Cấu trúc "in each case where..." trùm lên cả hai vế đẳng lập.' }],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q5',
      kind: 'gap',
      prompt: 'Điền liên từ tương quan hoàn thành cấu trúc song song đối xứng: "The regulator required the bank ___ only to recalculate its capital reserves but also to suspend dividend disbursements."',
      options: [],
      acceptedAnswers: [
        { text: 'not', rationale: 'Cụm liên từ tương quan "not only ... but also ...".' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q6',
      kind: 'gap',
      prompt: 'Điền từ xác định mối tương quan từng cặp riêng biệt theo đúng thứ tự: "The treasury and the foreign ministry dispatched envoys to Geneva and Brussels, ___."',
      options: [],
      acceptedAnswers: [
        { text: 'respectively', rationale: '"respectively" xác định quan hệ tương ứng 1-1 (Bộ Tài chính đi Geneva, Bộ Ngoại giao đi Brussels), loại bỏ cách hiểu tập hợp gộp chung.' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q7',
      kind: 'gap',
      prompt: 'Điền liên từ hoàn thành cặp song song: "The committee possessed the authority ___ to subpoena reluctant witnesses or to request formal depositions under oath."',
      options: [],
      acceptedAnswers: [
        { text: 'either', rationale: 'Cặp "either ... or ..." kết hợp hai động từ nguyên mẫu có to.' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q8',
      kind: 'gap',
      prompt: 'Điền giới từ nhắc lại để duy trì tính song song cú pháp nghiêm ngặt: "The delegation traveled to Tokyo for trade negotiations and ___ Singapore for maritime security talks."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: 'Nhắc lại giới từ "to" làm rõ hai địa điểm độc lập trong cấu trúc đẳng lập.' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách đảo trật tự danh từ để tính từ "foreign" chỉ bổ nghĩa cho duy nhất một danh từ: "The commission reviewed foreign investors and local regulators." -> "The commission reviewed local regulators and ___."',
      options: [],
      acceptedAnswers: [
        { text: 'foreign investors', rationale: 'Đưa danh từ có bổ ngữ ra sau danh từ độc lập giúp tính từ không bị hiểu lầm là bao trùm cả hai.' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau sang cấu trúc song song hoàn hảo với "both... and": "The tribunal evaluated the credibility of the witness and how reliable the physical evidence was." -> "The tribunal evaluated both the credibility of the witness and the ___."',
      options: [],
      acceptedAnswers: [
        { text: 'reliability of the physical evidence', rationale: 'Đồng bộ hóa thành hai cụm danh từ "the credibility of..." và "the reliability of...".' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi lệch cấu trúc cú pháp (faulty parallelism) trong câu sau: "The managing director was responsible for overseeing daily operations and to formulate long-term strategy."',
      options: [],
      acceptedAnswers: [
        { text: 'The managing director was responsible for overseeing daily operations and formulating long-term strategy.', rationale: 'Đồng bộ hóa hai danh động từ: overseeing ... and formulating ...' },
        { text: 'The managing director was responsible for overseeing daily operations and for formulating long-term strategy.', rationale: 'Lặp lại giới từ for cùng danh động từ formulating.' },
        { text: 'formulating long-term strategy', rationale: 'Cụm danh động từ song song với overseeing daily operations.' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi bất đối xứng vị trí của liên từ tương quan: "The research paper neither examines the quantitative metrics nor the qualitative interviews."',
      options: [],
      acceptedAnswers: [
        { text: 'The research paper examines neither the quantitative metrics nor the qualitative interviews.', rationale: 'Đưa động từ "examines" ra trước "neither" để "neither" và "nor" kết nối trực tiếp hai cụm danh từ đối xứng.' },
        { text: 'examines neither the quantitative metrics nor the qualitative interviews', rationale: 'Cụm vị ngữ đặt examines trước neither để đối xứng hoàn hảo.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-coordination-scope-12-r1',
      kind: 'choice',
      prompt: 'Chọn câu duy trì cấu trúc song song chuẩn mực nhất trong văn kiện ngoại giao.',
      options: [
        { text: 'The signatory nations resolved to disarm border garrisons, to establish neutral corridors, and to welcome international monitors.', correct: true, rationale: 'Chuỗi ba động từ nguyên mẫu có "to" lặp lại nhất quán bảo đảm nhịp điệu và trật tự cú pháp nghiêm ngặt.' },
        { text: 'The signatory nations resolved to disarm border garrisons, establishing neutral corridors, and welcome monitors.', correct: false, rationale: 'Phá vỡ tính song song: trộn lẫn infinitive, V-ing và bare infinitive.' },
        { text: 'The signatory nations resolved disarming border garrisons and to establish corridors.', correct: false, rationale: 'Cấu trúc bất đối xứng lộn xộn giữa hai vế.' },
      ],
      acceptedAnswers: [{ text: 'The signatory nations resolved to disarm border garrisons, to establish neutral corridors, and to welcome international monitors.', rationale: 'Tính song song tam đoạn hoàn hảo.' }],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-r2',
      kind: 'gap',
      prompt: 'Điền từ nối hoàn thành cặp tương quan: "The executive committee decided not only to restructure the governance board ___ also to initiate an external forensic audit."',
      options: [],
      acceptedAnswers: [
        { text: 'but', rationale: 'Cặp liên từ "not only ... but also ...".' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-r3',
      kind: 'transform',
      prompt: 'Tái cấu trúc câu sau để sửa lỗi lệch song song: "The policy aimed at reducing sovereign debt and to promote fiscal transparency." -> "The policy aimed at reducing sovereign debt and ___."',
      options: [],
      acceptedAnswers: [
        { text: 'promoting fiscal transparency', rationale: 'Đồng bộ hóa danh động từ sau giới từ aimed at: reducing ... and promoting ...' },
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-r4',
      kind: 'correction',
      prompt: 'Sửa câu sau để tính từ "qualified" chỉ bổ nghĩa cho "translators" mà không gây hiểu nhầm bổ nghĩa cho cả "interpreters": "The agency dispatched qualified translators and interpreters."',
      options: [],
      acceptedAnswers: [
        { text: 'The agency dispatched interpreters and qualified translators.', rationale: 'Đảo danh từ không có tính từ lên trước loại trừ hoàn toàn phạm vi bao trùm của tính từ.' },
        { text: 'interpreters and qualified translators', rationale: 'Đảo trật tự danh từ để tính từ qualified chỉ bổ nghĩa cho translators.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-coordination-scope-12-o1',
      prompt: 'Viết một điều khoản hợp đồng hoặc quy chuẩn học thuật gồm 2-3 câu, sử dụng cặp liên từ tương quan (either... or / neither... nor / not only... but also) với sự đối xứng cú pháp hoàn hảo và làm rõ phạm vi chi phối của các bổ ngữ đi kèm.',
      modelAnswer: 'The licensee covenants neither to reverse-engineer proprietary firmware algorithms nor to disseminate decompiled source code to unauthorized third parties. Any breach shall entitle the licensor both to seek immediate injunctive relief and to claim liquidated damages as stipulated herein.',
      checks: [
        'Sử dụng cấu trúc liên từ tương quan đối xứng hoàn hảo về mặt từ loại và cú pháp',
        'Không để xảy ra sự mơ hồ về phạm vi bổ nghĩa giữa các thành phần đẳng lập',
        'Văn phong pháp lý/học thuật chuẩn mực, gãy gọn, dứt khoát',
      ],
    },
    {
      id: 'grammar-v2-c2-coordination-scope-12-o2',
      prompt: 'Giải thích một trường hợp tranh chấp ngữ nghĩa do mơ hồ phạm vi đẳng lập (coordination scope ambiguity) và viết lại câu đó bằng hai phương án khác nhau để thể hiện rõ hai cách diễn giải độc lập.',
      modelAnswer: 'Ambiguous original clause: "The council approved subsidies for small businesses and farms damaged by the storm." Ambiguity arises over whether "damaged by the storm" modifies both entities or solely farms. Revision 1 (distributive scope): "The council approved subsidies for both small businesses and farms that sustained damage during the storm." Revision 2 (narrow scope): "The council approved subsidies for all small businesses, as well as for farms damaged by the storm."',
      checks: [
        'Chỉ rõ cấu trúc cú pháp tạo nên sự mơ hồ phạm vi bổ nghĩa',
        'Đưa ra hai phiên bản viết lại phân biệt rành mạch hai nhánh diễn giải',
        'Phân tích cú pháp chính xác, sắc bén',
      ],
    },
  ],
  sources: [
    {
      id: 'cgel-coordination',
      title: 'The Cambridge Grammar of the English Language (Chapter 15: Coordination and Supplementation)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Coordination scope ambiguity arises when modifiers interact with conjunction boundaries', 'Parallelism requires categorical and functional congruence between conjuncts'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'chicago-manual-parallelism',
      title: 'The Chicago Manual of Style (Section 5.242: Parallel Structure)',
      url: 'https://www.chicagomanualofstyle.org/book/ed17/part2/ch05/psec242.html',
      claims: ['Correlative conjunctions demand identical syntactic framing in high-register formal English'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified coordination scope, correlative parallelism, 16 exercises, outputs, and canonical sources.',
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
