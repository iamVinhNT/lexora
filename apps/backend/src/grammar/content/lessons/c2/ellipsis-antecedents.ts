/**
 * @file ellipsis-antecedents.ts
 * @description C2 lesson: Advanced ellipsis, antecedent resolution, and syntactic recovery in elite discourse.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-ellipsis-antecedents-11',
  revisionId: 'grammar-v2-c2-ellipsis-antecedents-11@1.0.0',
  revision: '1.0.0',
  title: 'Lược bỏ cú pháp và xác định tiền ngữ (Ellipsis & Antecedent Resolution)',
  objective: 'Làm chủ các cơ chế lược bỏ cú pháp bậc cao (VP ellipsis, gapping, sluicing, pseudogapping) và kỹ thuật định vị tiền ngữ (antecedent resolution), bảo đảm tính cô đọng tuyệt đối mà không gây đứt gãy tính liên kết mạch lạc trong văn bản học thuật và pháp lý.',
  prerequisiteIds: ['grammar-v2-c2-resolving-structural-ambiguity-10'],
  coverage: ['ellipsis-antecedents', 'vp-ellipsis', 'sluicing-gapping', 'cohesion-coherence', 'c2-discourse'],
  context: {
    english: 'In senior judicial opinions and diplomatic communiques, drafters systematically condense prose through VP ellipsis and gapping while ensuring that every elided predicate has an unambiguous, syntactically accessible antecedent.',
    vietnamese: 'Trong các phán quyết tư pháp cấp cao và thông cáo ngoại giao, người soạn thảo thường xuyên cô đọng văn phong qua kỹ thuật lược bỏ cụm vị ngữ (VP ellipsis) và lược bỏ động từ giữa (gapping), đồng thời bảo đảm mọi vị ngữ bị lược bỏ đều có một tiền ngữ cú pháp tường minh và dễ truy nguyên.',
  },
  guide: {
    pattern: 'Clause 1 [Full Verb Phrase / Predicate] + Conjunction / Contrast + Clause 2 [Auxiliary / Wh-sluice / Gap without redundant VP]',
    whenToUse: [
      'Lược bỏ cụm động từ sau trợ động từ (VP Ellipsis) để tránh lặp lại nguyên văn cấu trúc vị ngữ phức tạp',
      'Áp dụng Gapping trong các vế đẳng lập song song để nhấn mạnh sự tương phản giữa hai chủ thể hoặc tân ngữ',
      'Sử dụng Sluicing (rút gọn mệnh đề danh ngữ sau từ để hỏi) để giữ văn phong ngắn gọn, súc tích trong biện luận',
    ],
    signalWords: ['nor did', 'as did', 'whereas', 'if so', 'in so doing', 'none other than'],
    check: [
      'Tiền ngữ cú pháp (antecedent) có ở thể (voice) tương thích với vế bị lược bỏ không (tránh xung đột active/passive)?',
      'Đại từ hoặc quan hệ sở hữu trong phần lược bỏ có gây lưỡng nghĩa giữa strict identity và sloppy identity không?',
      'Trợ động từ giữ lại có phù hợp chính xác với thì và tính thái của mệnh đề bị lược bỏ không?',
    ],
  },
  explanation: 'Lược bỏ (Ellipsis) ở trình độ C2 là một công cụ kinh tế hóa ngôn ngữ (linguistic economy) đầy quyền năng, cho phép lược bớt các thành phần cú pháp có thể truy nguyên từ ngữ cảnh (syntactically recovered). Ba mô hình lược bỏ cốt lõi gồm: (1) VP-Ellipsis (VPE): lược bỏ toàn bộ cụm động từ sau trợ động từ ("The ministry can intervene, and indeed it should [intervene]"); (2) Gapping: bỏ động từ chính ở vế sau khi cấu trúc hai vế song song ("The treasury funded the infrastructure project, and private equity [funded] the telecommunications network"); (3) Sluicing: giữ lại duy nhất từ để hỏi của một mệnh đề gián tiếp ("The classified document was leaked, but investigators could not determine by whom [it was leaked]"). Thách thức lớn nhất ở cấp độ C2 là hiện tượng "antecedent mismatch" (bất tương thích tiền ngữ): khi câu trước dùng thể bị động nhưng trợ động từ vế sau đòi hỏi tiền ngữ chủ động, việc lược bỏ sẽ bị coi là lỗi ngữ pháp chuẩn mực (ví dụ: *"The theorem was proved by Gauss, and Euler did too"). Người viết phải bảo đảm tính tương thích cú pháp chặt chẽ hoặc tái cấu trúc mệnh đề.',
  examples: [
    {
      english: 'The attorney general declined to pursue prosecution, as did several state prosecutors.',
      vietnamese: 'Bộ trưởng Tư pháp từ chối truy tố, và nhiều công tố viên cấp tiểu bang cũng làm như vậy (VP ellipsis sau "did").',
    },
    {
      english: 'The macroeconomist analyzed fiscal policy distortions, and the sociologist, institutional decay.',
      vietnamese: 'Nhà kinh tế vĩ mô phân tích những biến dạng chính sách tài khóa, còn nhà xã hội học, sự suy thoái thể chế (Gapping: lược bỏ "analyzed").',
    },
    {
      english: 'A systemic breach occurred in the authentication gateway, yet senior engineers could not explain why.',
      vietnamese: 'Một sự cố hệ thống đã xảy ra ở cổng xác thực, thế nhưng các kỹ sư trưởng không thể giải thích lý do tại sao (Sluicing: lược bỏ mệnh đề sau "why").',
    },
    {
      english: 'Some treaty signatories complied fully with emission reduction quotas, while others failed to.',
      vietnamese: 'Một số quốc gia ký hiệp ước tuân thủ đầy đủ hạn ngạch cắt giảm phát thải, trong khi những quốc gia khác thì không (VP ellipsis sau tiểu từ "to").',
    },
    {
      english: 'The prime minister cannot unilaterally revoke the decree, nor should Parliament attempt to do so.',
      vietnamese: 'Thủ tướng không thể đơn phương bãi bỏ sắc lệnh, và Quốc hội cũng không nên cố gắng làm điều đó (Thay thế/lược bỏ qua pro-form "do so").',
    },
    {
      english: 'The central bank intervened to stabilize currency valuations, having previously pledged not to.',
      vietnamese: 'Ngân hàng trung ương đã can thiệp để ổn định định giá tiền tệ, sau khi trước đó đã cam kết sẽ không làm vậy (Ellipsis sau "not to").',
    },
  ],
  contrasts: [
    {
      form: 'Syntactic Voice Compatibility vs Voice Mismatch in VP Ellipsis',
      whyFits: '"The board rejected the restructuring proposal, and the supervisory council did as well" duy trì tiền ngữ chủ động hoàn hảo ("did [reject the restructuring proposal]").',
      whyNot: '"*The restructuring proposal was rejected by the board, and the supervisory council did as well" tạo ra sự xung đột thể ngữ pháp (voice mismatch): trợ động từ "did" đòi hỏi động từ chủ động nhưng tiền ngữ lại ở thể bị động "was rejected".',
    },
    {
      form: 'Gapping with Comma vs Run-on Confusion',
      whyFits: '"The appellate judge upheld the statutory injunction, and the circuit judge, the monetary penalty" dùng dấu phẩy để đánh dấu vị trí động từ bị lược bỏ (gapping mark), giúp câu sáng rõ.',
      whyNot: '"*The appellate judge upheld the statutory injunction and the circuit judge the monetary penalty" không có dấu câu ngăn cách khiến hai cụm danh từ liên tiếp gây khó khăn cho việc phân tích cú pháp.',
    },
  ],
  commonMistakes: [
    'Tạo ra sự bất tương thích về thể (voice mismatch) giữa tiền ngữ bị động và vế lược bỏ chủ động sau trợ động từ "did/does".',
    'Bỏ sót dấu phẩy đại diện cho động từ bị lược trong cấu trúc Gapping, khiến người đọc nhầm lẫn thành chuỗi danh từ ghép.',
    'Để xảy ra hiện tượng lưỡng nghĩa sở hữu (strict vs sloppy ambiguity) khi đại từ sở hữu trong tiền ngữ có thể quy về chủ ngữ vế một hoặc chủ ngữ vế hai.',
  ],
  summary: 'Lược bỏ (VPE, Gapping, Sluicing) mang lại sự cô đọng đỉnh cao trong văn phong C2, nhưng đòi hỏi tiền ngữ phải có cấu trúc tương thích về thể, thì và quan hệ chiếu ứng.',
  exercises: [
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q1',
      kind: 'choice',
      prompt: 'Chọn phương án sử dụng VP Ellipsis tuân thủ chuẩn xác tính tương thích cú pháp về thể (voice parity).',
      options: [
        { text: 'The special prosecutor subpoenaed the corporate records, and the congressional committee did as well.', correct: true, rationale: 'Cả hai vế đều ở dạng chủ động, "did" thay thế trọn vẹn cụm "subpoenaed the corporate records".' },
        { text: 'The corporate records were subpoenaed by the prosecutor, and the congressional committee did as well.', correct: false, rationale: 'Bất tương thích thể ngữ pháp: vế trước bị động nhưng vế sau trợ động từ did đòi hỏi tiền ngữ chủ động.' },
        { text: 'The corporate records subpoenaed the prosecutor, and the committee did so.', correct: false, rationale: 'Sai lệch ngữ nghĩa phi lý về chủ thể hành động.' },
      ],
      acceptedAnswers: [{ text: 'The special prosecutor subpoenaed the corporate records, and the congressional committee did as well.', rationale: 'Voice parity bảo đảm tiền ngữ truy nguyên hợp lệ.' }],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q2',
      kind: 'choice',
      prompt: 'Xác định câu sử dụng cấu trúc Gapping chuẩn xác và dấu câu ngắt nhịp đúng quy chuẩn học thuật.',
      options: [
        { text: 'The defense counsel interrogated the forensic specialist, and the prosecutor, the handwriting expert.', correct: true, rationale: 'Dấu phẩy thứ hai thay thế chính xác cho động từ "interrogated" được lược bỏ.' },
        { text: 'The defense counsel interrogated the forensic specialist and the prosecutor the handwriting expert.', correct: false, rationale: 'Thiếu dấu phẩy đại diện cho vị trí gapping khiến người đọc bị vấp cú pháp.' },
        { text: 'The defense counsel interrogated the forensic specialist, and the prosecutor did the handwriting expert.', correct: false, rationale: '"did" không thể đi liền với tân ngữ trực tiếp mà không có giới từ thích hợp trong ngữ cảnh này.' },
      ],
      acceptedAnswers: [{ text: 'The defense counsel interrogated the forensic specialist, and the prosecutor, the handwriting expert.', rationale: 'Cấu trúc Gapping kinh điển với dấu phẩy thay thế động từ.' }],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q3',
      kind: 'choice',
      prompt: 'Chọn câu áp dụng Sluicing súc tích và chuẩn mực trong phân tích điều tra.',
      options: [
        { text: 'The encrypted hard drives had evidently been wiped, but investigators remained unable to establish when or by whom.', correct: true, rationale: 'Sluicing kép "when or by whom" lược bỏ hoàn toàn phần lặp lại của mệnh đề phụ, cô đọng tuyệt đối.' },
        { text: 'The encrypted hard drives had evidently been wiped, but investigators remained unable to establish when they had been wiped or by whom they had been wiped.', correct: false, rationale: 'Lặp lại rườm rà không cần thiết, làm giảm tính tinh gọn của văn phong C2.' },
        { text: 'The encrypted hard drives had evidently been wiped, but investigators remained unable to establish.', correct: false, rationale: 'Lược bỏ cụt ngủn thiếu hẳn từ nghi vấn làm mốc truy nguyên.' },
      ],
      acceptedAnswers: [{ text: 'The encrypted hard drives had evidently been wiped, but investigators remained unable to establish when or by whom.', rationale: 'Sluicing phối hợp từ nghi vấn tạo câu súc tích và uyển chuyển.' }],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q4',
      kind: 'choice',
      prompt: 'Xác định câu xảy ra lỗi mơ hồ tham chiếu sở hữu (strict vs sloppy ambiguity) cần phải tái cấu trúc.',
      options: [
        { text: 'Professor Evans revised his methodological critique before publication, and Dr. Vance did as well.', correct: true, rationale: 'Mơ hồ giữa strict identity (Dr. Vance sửa bài phê bình của GS Evans) và sloppy identity (Dr. Vance sửa bài phê bình của chính mình).' },
        { text: 'Professor Evans revised his own critique, while Dr. Vance submitted an entirely unrelated monograph.', correct: false, rationale: 'Ngữ nghĩa rành mạch không có sự trùng lắp hay mơ hồ đại từ sở hữu.' },
        { text: 'The research institute archived its primary datasets, as required by statutory regulations.', correct: false, rationale: 'Cấu trúc mệnh đề trạng ngữ rút gọn thông thường, không chứa mơ hồ sở hữu.' },
      ],
      acceptedAnswers: [{ text: 'Professor Evans revised his methodological critique before publication, and Dr. Vance did as well.', rationale: 'Câu điển hình của hiện tượng strict vs sloppy identity trong lý thuyết lược bỏ cú pháp.' }],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q5',
      kind: 'gap',
      prompt: 'Điền trợ động từ duy nhất thích hợp để hoàn thành VP Ellipsis: "The senior regulator warned of impending liquidity contractions, as ___ the governor of the central bank."',
      options: [],
      acceptedAnswers: [
        { text: 'did', rationale: 'Trợ động từ quá khứ đơn "did" đối ứng chính xác với động từ tiền ngữ "warned".' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q6',
      kind: 'gap',
      prompt: 'Điền tiểu từ tạo cụm infinitive ellipsis: "The sovereign fund intended to liquidate its foreign holdings, but the advisory board advised them not ___."',
      options: [],
      acceptedAnswers: [
        { text: 'to', rationale: '"not to" là cấu trúc lược bỏ sau động từ nguyên mẫu có to (pseudogapping/to-ellipsis).' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q7',
      kind: 'gap',
      prompt: 'Điền từ nghi vấn tạo thành cấu trúc Sluicing ngắn gọn: "The classified diplomatic cable had undoubtedly been intercepted, but intelligence analysts could not fathom ___."',
      options: [],
      acceptedAnswers: [
        { text: 'how', rationale: '"how" tạo mệnh đề sluicing chỉ phương thức can thiệp.' },
        { text: 'why', rationale: '"why" tạo mệnh đề sluicing chỉ lý do.' },
        { text: 'where', rationale: '"where" tạo mệnh đề sluicing chỉ địa điểm đánh chặn.' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q8',
      kind: 'gap',
      prompt: 'Điền cụm từ hoàn thành cấu trúc thay thế phủ định: "If the antitrust division decides to initiate litigation, the merger will be halted; if ___, the transaction will close next quarter."',
      options: [],
      acceptedAnswers: [
        { text: 'not', rationale: '"if not" là cấu trúc clausal ellipsis kinh điển thay thế cho toàn bộ mệnh đề phủ định "if the antitrust division does not decide to initiate litigation".' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q9',
      kind: 'transform',
      prompt: 'Rút gọn câu sau bằng kỹ thuật Gapping để loại bỏ động từ lặp: "The first chamber reviewed the statutory amendment, and the second chamber reviewed the fiscal appropriation." -> "The first chamber reviewed the statutory amendment, and the second chamber, ___."',
      options: [],
      acceptedAnswers: [
        { text: 'the fiscal appropriation', rationale: 'Gapping loại bỏ "reviewed" và giữ lại tân ngữ đối lập.' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau sang dạng VP Ellipsis với "nor": "The tribunal could not compel the witness to testify, and the magistrate could not compel the witness either." -> "The tribunal could not compel the witness to testify, nor ___."',
      options: [],
      acceptedAnswers: [
        { text: 'could the magistrate', rationale: 'Đảo ngữ kết hợp VP ellipsis: "nor could the magistrate [compel the witness to testify]".' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi bất tương thích thể (voice mismatch) trong câu sau để tiền ngữ hợp lệ: "The treaty was ratified by France, and Germany did too."',
      options: [],
      acceptedAnswers: [
        { text: 'France ratified the treaty, and Germany did too.', rationale: 'Đưa vế đầu về thể chủ động để tương thích với trợ động từ "did".' },
        { text: 'The treaty was ratified by France, and by Germany as well.', rationale: 'Dùng cấu trúc bị động đẳng lập rút gọn.' },
        { text: 'France ratified the treaty, and so did Germany.', rationale: 'Cấu trúc so did kết hợp đảo ngữ hoàn hảo trong VP ellipsis.' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-q12',
      kind: 'correction',
      prompt: 'Sửa câu sau bằng cách thêm dấu phẩy gapping để cấu trúc song song không bị nhập nhằng: "The senior economist projected a mild recession and the financial analyst a prolonged stagnation."',
      options: [],
      acceptedAnswers: [
        { text: 'The senior economist projected a mild recession, and the financial analyst, a prolonged stagnation.', rationale: 'Thêm dấu phẩy sau "analyst" để đánh dấu vị trí động từ projected bị lược bỏ.' },
        { text: 'and the financial analyst, a prolonged stagnation', rationale: 'Cụm gapping có dấu phẩy thay thế động từ projected.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-r1',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện sự kết hợp hoàn hảo giữa Sluicing và tính tương thích cú pháp trong diễn ngôn học thuật.',
      options: [
        { text: 'The manuscript was clearly redacted in several places, but the archivist could not ascertain when or by what authority.', correct: true, rationale: 'Sluicing hai thành phần ngắn gọn, duy trì nghĩa tường minh.' },
        { text: 'The manuscript was clearly redacted, but the archivist could not ascertain when it was redacted or by what authority it was redacted.', correct: false, rationale: 'Lặp lại cấu trúc rườm rà thiếu tinh tế.' },
        { text: 'The manuscript was redacted by someone, and the archivist did so too.', correct: false, rationale: 'Lỗi gượng ép ngữ nghĩa và bất tương thích tiền ngữ.' },
      ],
      acceptedAnswers: [{ text: 'The manuscript was clearly redacted in several places, but the archivist could not ascertain when or by what authority.', rationale: 'Sluicing mẫu mực trong văn bản học thuật.' }],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-r2',
      kind: 'gap',
      prompt: 'Điền từ hoàn thành cấu trúc rút gọn mệnh đề điều kiện khẳng định: "If the macroeconomic indicators signal persistent inflation, the benchmark rate will rise; if ___, monetary policy will remain accommodative."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: '"if so" đại diện cho toàn bộ mệnh đề khẳng định rút gọn.' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang hình thức VP Ellipsis ngắn gọn với "so do": "Diplomats recognize the urgency of territorial de-escalation, and international mediators recognize the urgency of territorial de-escalation as well." -> "Diplomats recognize the urgency of territorial de-escalation, and ___."',
      options: [],
      acceptedAnswers: [
        { text: 'so do international mediators', rationale: 'Cấu trúc "so do + S" lược bỏ toàn bộ cụm vị ngữ dài phía trước.' },
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu mốc truy nguyên tiền ngữ trong câu: "The audit was commissioned by the chancellor, and the parliamentary committee had as well."',
      options: [],
      acceptedAnswers: [
        { text: 'The chancellor commissioned the audit, and the parliamentary committee did as well.', rationale: 'Tái lập tiền ngữ chủ động để phù hợp với trợ động từ của vế sau.' },
        { text: 'The audit was commissioned by the chancellor, and also by the parliamentary committee.', rationale: 'Đồng bộ hóa cấu trúc tác nhân bị động.' },
        { text: 'The chancellor commissioned the audit, and so did the parliamentary committee.', rationale: 'Cấu trúc so did tương thích thể chủ động.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-o1',
      prompt: 'Viết một đoạn văn 2-3 câu trong một bản tóm tắt pháp lý hoặc báo cáo ngoại giao, sử dụng ít nhất một cấu trúc VP Ellipsis (ví dụ: với "as did" hoặc "nor could") và bảo đảm tuyệt đối tính tương thích thể (voice parity) của tiền ngữ.',
      modelAnswer: 'The chief compliance officer declined to endorse the high-risk financial instruments, as did several senior portfolio managers. Neither party believed that the collateralized debt obligations met statutory prudential standards, nor could the internal risk model justify their acquisition.',
      checks: [
        'Sử dụng chính xác ít nhất một cấu trúc VP Ellipsis (như as did / nor could)',
        'Tiền ngữ cú pháp hoàn toàn tương thích về mặt cấu trúc và thể (không phạm voice mismatch)',
        'Văn phong học thuật/pháp lý trang trọng, tự nhiên',
      ],
    },
    {
      id: 'grammar-v2-c2-ellipsis-antecedents-11-o2',
      prompt: 'Viết một câu phân tích so sánh học thuật áp dụng kỹ thuật Gapping với dấu phẩy ngắt nhịp chính xác để đối chiếu hai trường phái tư tưởng hoặc hai nhân tố kinh tế.',
      modelAnswer: 'Classical economists attribute protracted price inflation primarily to excessive monetary expansion, and structuralist theorists, to persistent supply-side bottlenecks.',
      checks: [
        'Sử dụng cấu trúc Gapping chuẩn xác (loại bỏ động từ chính ở vế thứ hai)',
        'Đặt dấu phẩy thay thế đúng vị trí động từ bị lược bỏ',
        'Hai vế song song hoàn chỉnh về mặt ngữ nghĩa và đối chiếu logic',
      ],
    },
  ],
  sources: [
    {
      id: 'cgel-ellipsis-cohesion',
      title: 'The Cambridge Grammar of the English Language (Chapter 17: Ellipsis and Cohesion)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['VP ellipsis requires structural identity with the antecedent predicate', 'Voice mismatch degrades acceptability in standard formal English'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'merchant-syntax-of-silence',
      title: 'The Syntax of Silence: Sluicing, Islands, and the Theory of Ellipsis (Merchant)',
      url: 'https://academic.oup.com/book/7328',
      claims: ['Sluicing elides sentential complements under wh-phrases while preserving semantic antecedence'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified VP ellipsis, gapping, sluicing, voice parity, 16 exercises, outputs, and canonical sources.',
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
