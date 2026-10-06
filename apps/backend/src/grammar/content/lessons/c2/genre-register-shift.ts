/**
 * @file genre-register-shift.ts
 * @description C2 lesson: Genre and register shift across statutory, judicial, academic, and diplomatic discourses.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-genre-register-shift-14',
  revisionId: 'grammar-v2-c2-genre-register-shift-14@1.0.0',
  revision: '1.0.0',
  title: 'Chuyển dịch thể loại và phong cách chức năng (Genre & Register Shift)',
  objective: 'Làm chủ các biến thể ngữ pháp chức năng theo thể loại (genre) và văn phong (register) ở cấp độ C2: phân biệt và chuyển hóa linh hoạt giữa ngôn ngữ pháp chế định chế (statutory), biện luận tư pháp (judicial), chuyên khảo học thuật (academic) và thông cáo ngoại giao (diplomatic).',
  prerequisiteIds: ['grammar-v2-c2-substitution-reference-precision-13'],
  coverage: ['genre-register-shift', 'functional-grammar', 'stylistic-variation', 'c2-register', 'academic-legal-diplomatic'],
  context: {
    english: 'A senior counsel must seamlessly adapt syntactic structures when converting statutory mandates ("The licensee shall forthwith...") into judicial submissions ("It is respectfully submitted that the tribunal ought to find...") and subsequent academic commentary ("The empirical efficacy of such regulatory constraints remains disputed").',
    vietnamese: 'Một cố vấn pháp lý cao cấp phải thích ứng cấu trúc cú pháp liền mạch khi chuyển đổi từ các mệnh lệnh luật định ("Người được cấp phép phải ngay lập tức...") sang văn bản đệ trình tư pháp ("Kính đề nghị hội đồng trọng tài công nhận rằng...") và bình luận học thuật sau đó ("Hiệu quả thực nghiệm của các ràng buộc pháp lý này vẫn còn gây tranh cãi").',
  },
  guide: {
    pattern: 'Statutory [shall + bare inf / provided that] -> Judicial [respectfully submitted / held that] -> Academic [evidence suggests / epistemic hedging] -> Diplomatic [notes with grave concern / reaffirms commitment]',
    whenToUse: [
      'Áp dụng thể chế định (shall, save where, provided always) trong soạn thảo văn kiện quy phạm và điều lệ',
      'Sử dụng cấu trúc đệ trình tư pháp trang trọng (it is submitted that, we hold that, the court is of the view) trong tranh tụng',
      'Vận dụng các rào đón nhận thức (epistemic hedging: appears to indicate, tends to corroborate) trong nghiên cứu khoa học',
      'Triển khai tính mơ hồ xây dựng (constructive ambiguity) và bị động vô nhân xưng trong tuyên bố ngoại giao',
    ],
    signalWords: ['provided that', 'save where', 'respectfully submitted', 'it is held that', 'evidence indicates', 'notes with satisfaction'],
    check: [
      'Văn phong có bị xung đột thể loại (ví dụ: dùng "shall" của luật định trong bài luận học thuật) không?',
      'Mức độ cam kết chân lý (epistemic commitment) có phù hợp với mục tiêu của thể loại văn bản không?',
      'Cấu trúc bị động vô nhân xưng có phục vụ đúng mục đích ngoại giao hay chỉ làm câu trở nên nặng nề?',
    ],
  },
  explanation: 'Ở trình độ C2, ngữ pháp không cố định mà là hệ thống các nguồn lực biến thiên theo ngữ cảnh xã hội (Systemic Functional Linguistics). Mỗi thể loại chuyên môn (genre) và phong cách chức năng (register) đều sở hữu hệ thống cú pháp đặc thù: (1) Statutory Register (Văn bản luật): đặc trưng bởi trợ động từ chỉ nghĩa vụ bắt buộc tuyệt đối ("shall", "must"), các điều khoản loại trừ pháp lý ("save as otherwise provided", "notwithstanding anything to the contrary"), và danh từ hóa cực độ; (2) Judicial Register (Văn bản phán quyết/tranh tụng): kết hợp giữa kính ngữ nghi thức ("it is respectfully submitted") và các phán quyết xác lập tiền lệ ("the learned judge held that", "we concur in the result"); (3) Academic Register (Bài báo học thuật): tránh tuyệt đối mệnh lệnh, ưu tiên các cấu trúc rào đón nhận thức (epistemic hedging) như "the data point toward", "it may tentatively be inferred"; (4) Diplomatic Register (Thông cáo ngoại giao): tận dụng tối đa bị động khuyết tác nhân (agentless passives) và các cụm từ thể hiện lập trường có mức độ ("takes note of", "views with serious concern") nhằm duy trì không gian thương lượng.',
  examples: [
    {
      english: 'Statutory: The licensee shall forthwith notify the regulatory authority of any material insolvency, provided that notice be served in writing.',
      vietnamese: 'Luật định: Bên được cấp phép phải ngay lập tức thông báo cho cơ quan quản lý về mọi sự mất khả năng thanh toán trọng yếu, với điều kiện thông báo phải được lập thành văn bản.',
    },
    {
      english: 'Judicial: It is respectfully submitted that the lower court erred in construing the exclusion clause so narrowly.',
      vietnamese: 'Tư pháp: Kính đệ trình rằng tòa án cấp dưới đã sai lầm khi giải thích điều khoản loại trừ một cách quá hạn hẹp.',
    },
    {
      english: 'Academic: The empirical data appear to indicate that fiscal stimulus exerts diminishing returns in high-inflation environments.',
      vietnamese: 'Học thuật: Các dữ liệu thực nghiệm dường như chỉ ra rằng kích thích tài khóa mang lại hiệu suất giảm dần trong môi trường lạm phát cao.',
    },
    {
      english: 'Diplomatic: The High Contracting Parties note with profound concern the escalating tension along the demilitarized frontier.',
      vietnamese: 'Ngoại giao: Các Bên Ký kết Cấp cao ghi nhận với sự quan ngại sâu sắc tình trạng căng thẳng leo thang dọc biên giới phi quân sự.',
    },
    {
      english: 'Statutory: Save as provided in subsection (4), no person shall disclose confidential telemetry data without ministerial authorization.',
      vietnamese: 'Luật định: Ngoại trừ trường hợp quy định tại khoản (4), không người nào được tiết lộ dữ liệu đo xa bảo mật mà không có sự ủy quyền của bộ trưởng.',
    },
    {
      english: 'Diplomatic: Deep regret is expressed regarding the unilateral termination of bilateral maritime fisheries agreements.',
      vietnamese: 'Ngoại giao: Sự tiếc nuối sâu sắc được bày tỏ liên quan đến việc đơn phương chấm dứt các thỏa thuận nghề cá hàng hải song phương (Bị động vô nhân xưng).',
    },
  ],
  contrasts: [
    {
      form: 'Statutory Prescriptive Mandate vs Academic Epistemic Hedging',
      whyFits: '"The board shall conduct annual audits" phù hợp với văn bản quy chế vì nó thiết lập một nghĩa vụ pháp lý cưỡng chế dứt khoát.',
      whyNot: '"The board shall conduct annual audits" nếu đưa vào bài phân tích học thuật sẽ bị coi là sai thể loại (prescriptive tone vi phạm tính khách quan phân tích, bài học thuật cần viết "Empirical studies recommend that boards conduct annual audits").',
    },
    {
      form: 'Diplomatic Agentless Passive vs Judicial Attributed Agency',
      whyFits: '"Regret is expressed over the border incident" phù hợp với thông cáo ngoại giao nhằm giảm đối đầu trực diện.',
      whyNot: '"*Regret is expressed over the contract breach" trong phán quyết tư pháp là không thể chấp nhận được vì tòa án bắt buộc phải chỉ đích danh bên vi phạm và chủ thể gánh chịu trách nhiệm bồi thường.',
    },
  ],
  commonMistakes: [
    'Sử dụng ngôn ngữ luật định mang tính áp đặt ("shall", "must") trong các bài tiểu luận phân tích học thuật.',
    'Bỏ sót các cụm từ rào đón (hedging devices) khi khái quát hóa kết quả nghiên cứu, biến giả thuyết thành mệnh lệnh độc đoán.',
    'Dùng văn phong đối đầu trực diện có chủ ngữ cá nhân ("You violated our border") trong các thông cáo ngoại giao thay vì cấu trúc nghi thức gián tiếp.',
  ],
  summary: 'Làm chủ chuyển dịch thể loại (register shift) bằng cách hiệu chỉnh modal auxiliaries, mức độ rào đón (hedging), và mức độ tường minh của chủ thể hành động cho từng mục đích diễn ngôn chuyên biệt.',
  exercises: [
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q1',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện chính xác phong cách chức năng luật định (Statutory Drafting) với điều kiện bảo lưu quy chuẩn.',
      options: [
        { text: 'The concessionaire shall maintain comprehensive liability insurance, provided that the policy limit be approved by the minister.', correct: true, rationale: 'Cấu trúc "shall + bare inf" kết hợp với "provided that + subjunctive be" là chuẩn mực kinh điển của văn bản pháp quy.' },
        { text: 'The concessionaire must definitely buy good insurance because it seems the minister really likes it.', correct: false, rationale: 'Văn phong khẩu ngữ bình dân hoàn toàn lạc điệu với văn bản luật.' },
        { text: 'It might be wise for the concessionaire to maintain insurance as research suggests.', correct: false, rationale: 'Văn phong rào đón học thuật không có tính pháp lý bắt buộc.' },
      ],
      acceptedAnswers: [{ text: 'The concessionaire shall maintain comprehensive liability insurance, provided that the policy limit be approved by the minister.', rationale: 'Statutory drafting chuẩn mực với shall và provided that subjunctive.' }],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q2',
      kind: 'choice',
      prompt: 'Xác định câu thể hiện đúng văn phong tranh tụng tư pháp (Judicial Submissions) trước tòa phúc thẩm.',
      options: [
        { text: 'It is respectfully submitted that the learned trial judge misdirected the jury on the burden of proof.', correct: true, rationale: 'Kính ngữ nghi thức "It is respectfully submitted that..." và danh xưng "the learned trial judge" là quy chuẩn tư pháp Anh-Mỹ.' },
        { text: 'The judge was totally wrong and we demand an immediate apology from the court.', correct: false, rationale: 'Vi phạm nghiêm trọng quy tắc ứng xử và kính ngữ tòa án.' },
        { text: 'Empirical data indicate that the judge probably made a cognitive error in judgment.', correct: false, rationale: 'Cách viết học thuật không phù hợp với văn bản tố tụng pháp lý.' },
      ],
      acceptedAnswers: [{ text: 'It is respectfully submitted that the learned trial judge misdirected the jury on the burden of proof.', rationale: 'Nghi thức tư pháp phúc thẩm trang trọng.' }],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q3',
      kind: 'choice',
      prompt: 'Chọn câu học thuật áp dụng kỹ thuật rào đón nhận thức (epistemic hedging) phù hợp nhất cho bài báo kinh tế.',
      options: [
        { text: 'These regression estimates suggest that tariff liberalizations may exert an asymmetric effect on rural wage dynamics.', correct: true, rationale: 'Sử dụng "suggest that" và "may exert" để định lượng mức độ chắc chắn khoa học một cách khiêm tốn và cẩn trọng.' },
        { text: 'These regression estimates prove once and for all that tariff liberalizations destroy rural wages.', correct: false, rationale: 'Khẳng định cực đoan phi khoa học ("prove once and for all").' },
        { text: 'Tariff liberalizations shall immediately exert effects pursuant to econometric law.', correct: false, rationale: 'Lạm dụng modal pháp chế "shall" vào bài báo học thuật.' },
      ],
      acceptedAnswers: [{ text: 'These regression estimates suggest that tariff liberalizations may exert an asymmetric effect on rural wage dynamics.', rationale: 'Epistemic hedging mẫu mực trong văn bản học thuật quốc tế.' }],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q4',
      kind: 'choice',
      prompt: 'Chọn câu thông cáo ngoại giao sử dụng bị động vô nhân xưng và ngôn ngữ nghi thức nhằm duy trì không gian đàm phán.',
      options: [
        { text: 'Grave apprehension is expressed regarding the recent mobilization, while an earnest appeal is made for restraint.', correct: true, rationale: 'Bị động khuyết tác nhân và danh từ hóa biểu đạt thái độ quan ngại mà không đẩy xung đột lên đỉnh điểm.' },
        { text: 'We hate your military buildup and demand you stop right now or face severe war.', correct: false, rationale: 'Ngôn từ tối hậu thư thô thiển, phá vỡ phép tắc ngoại giao.' },
        { text: 'The treaty says you shall not move troops, as stipulated in subsection 2.', correct: false, rationale: 'Áp dụng trích dẫn điều lệ cơ học thay cho diễn ngôn ngoại giao đa phương.' },
      ],
      acceptedAnswers: [{ text: 'Grave apprehension is expressed regarding the recent mobilization, while an earnest appeal is made for restraint.', rationale: 'Constructive ambiguity và agentless passive chuẩn ngoại giao.' }],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q5',
      kind: 'gap',
      prompt: 'Điền modal bắt buộc truyền thống trong văn bản luật để thiết lập nghĩa vụ pháp lý: "The administrator ___ submit the audited balance sheet within thirty days of fiscal closure."',
      options: [],
      acceptedAnswers: [
        { text: 'shall', rationale: '"shall" là modal pháp quy kinh điển thể hiện nghĩa vụ cưỡng chế pháp lý (mandatory obligation).' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q6',
      kind: 'gap',
      prompt: 'Điền liên từ điều kiện ngoại lệ trang trọng trong văn bản quy phạm pháp luật: "No expenditure shall be authorized, ___ as expressly permitted under Section 14."',
      options: [],
      acceptedAnswers: [
        { text: 'save', rationale: '"save as" là cấu trúc ngoại lệ chuẩn mực trong văn kiện pháp luật (ngoại trừ khi).' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q7',
      kind: 'gap',
      prompt: 'Điền trạng từ thể hiện thái độ kính cẩn trong văn bản đệ trình tòa án: "It is ___ submitted that the petition discloses no justiciable cause of action."',
      options: [],
      acceptedAnswers: [
        { text: 'respectfully', rationale: '"respectfully submitted" là công thức tố tụng chuẩn mực trước tòa án.' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q8',
      kind: 'gap',
      prompt: 'Điền động từ ngoại giao diễn đạt việc ghi nhận chính thức mà chưa đồng tình tuyệt đối: "The delegation takes ___ of the proposed framework without prejudice to its sovereign rights."',
      options: [],
      acceptedAnswers: [
        { text: 'note', rationale: '"takes note of" là thuật ngữ ngoại giao đa phương kinh điển để ghi nhận văn bản mà không tự ràng buộc nghĩa vụ tán thành.' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q9',
      kind: 'transform',
      prompt: 'Chuyển nhận định học thuật mang tính khẳng định cứng sau sang câu có mức độ rào đón nhận thức (hedging) phù hợp: "Artificial intelligence displaces white-collar jobs." -> "Emerging evidence suggests that artificial intelligence ___ white-collar jobs."',
      options: [],
      acceptedAnswers: [
        { text: 'may displace', rationale: 'Dùng "may displace" để hạ bớt mức độ cực đoan và tạo khoảng cách nhận thức khách quan.' },
        { text: 'tends to displace', rationale: '"tends to displace" thể hiện xu hướng thực nghiệm thay vì quy luật tất yếu.' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q10',
      kind: 'transform',
      prompt: 'Chuyển câu mệnh lệnh thông thường sau sang hình thức điều khoản quy định pháp chế với "shall": "Officers must not disclose classified intelligence." -> "No officer ___ disclose classified intelligence."',
      options: [],
      acceptedAnswers: [
        { text: 'shall', rationale: 'Cấu trúc quy phạm luật kinh điển: "No [person] shall [action]".' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng từ mang tính luật định cứng nhắc sai thể loại trong bài luận học thuật: "Economists shall conclude that price ceilings trigger market rationing."',
      options: [],
      acceptedAnswers: [
        { text: 'Economists generally conclude that price ceilings trigger market rationing.', rationale: 'Thay "shall" bằng trạng từ "generally" để phản ánh nhận thức luận học thuật.' },
        { text: 'Economists tend to conclude that price ceilings trigger market rationing.', rationale: 'Dùng cụm tend to conclude để biểu đạt xu hướng học thuật.' },
        { text: 'generally conclude that price ceilings trigger market rationing', rationale: 'Cụm vị ngữ thay shall bằng generally conclude.' },
        { text: 'tend to conclude that price ceilings trigger market rationing', rationale: 'Cụm vị ngữ thay shall bằng tend to conclude.' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi ngôn ngữ đối đầu thiếu tính ngoại giao trong thông cáo chung: "We reject your territorial claims because they are fraudulent."',
      options: [],
      acceptedAnswers: [
        { text: 'The territorial claims advanced are viewed as lacking historical foundation.', rationale: 'Chuyển sang bị động vô nhân xưng và ngôn từ ngoại giao trung tính.' },
        { text: 'The government cannot recognize territorial claims that lack international legal basis.', rationale: 'Chuyển sang văn phong tuyên bố quốc gia chính thức.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-genre-register-shift-14-r1',
      kind: 'choice',
      prompt: 'Chọn câu đáp ứng hoàn hảo tiêu chí của văn phong phán quyết tư pháp cấp cao (Judicial Opinion).',
      options: [
        { text: 'Having weighed the competing public interests, the court holds that the statutory immunity does not extend to ultra vires administrative acts.', correct: true, rationale: 'Cấu trúc chuẩn mực của bản án phúc thẩm: "Having weighed..., the court holds that...".' },
        { text: 'The administrative acts shall be illegal because the judges really dislike them.', correct: false, rationale: 'Lối hành văn phi tư pháp và khiếm nhã.' },
        { text: 'The court tentatively guesses that immunity might not be super applicable here.', correct: false, rationale: 'Sử dụng rào đón học thuật quá đà làm suy yếu tính quyền uy bắt buộc của bản án.' },
      ],
      acceptedAnswers: [{ text: 'Having weighed the competing public interests, the court holds that the statutory immunity does not extend to ultra vires administrative acts.', rationale: 'Phán quyết tư pháp uy nghiêm và chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-r2',
      kind: 'gap',
      prompt: 'Điền từ hoàn thành mệnh đề rào đón phương thức trong văn bản học thuật: "It is ___ plausible that structural debt dynamics will constrain monetary policy autonomy."',
      options: [],
      acceptedAnswers: [
        { text: 'eminently', rationale: '"eminently plausible" là cụm từ học thuật C2 kinh điển (hoàn toàn hợp lý/có cơ sở).' },
        { text: 'entirely', rationale: '"entirely plausible" biểu đạt tính hợp lý thuyết phục.' },
        { text: 'highly', rationale: '"highly plausible" biểu thị độ khả tín cao.' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-r3',
      kind: 'transform',
      prompt: 'Chuyển câu ngoại giao trực tiếp sau sang hình thức gián tiếp trang trọng với "reaffirms": "We still promise to keep the border open." -> "The government ___ its commitment to maintaining an open frontier."',
      options: [],
      acceptedAnswers: [
        { text: 'reaffirms', rationale: '"reaffirms its commitment to" là công thức ngoại giao chuẩn mực cao cấp.' },
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng đại từ cá nhân thiếu tính quy chuẩn trong điều khoản hợp đồng: "If you don\'t pay us on time, we can cancel the contract."',
      options: [],
      acceptedAnswers: [
        { text: 'In the event of default on scheduled payments, the seller may terminate the agreement forthwith.', rationale: 'Chuyển hóa sang cấu trúc pháp lý khách quan, định danh rõ tư cách chủ thể.' },
        { text: 'Failure to pay on time entitles the seller to terminate the contract.', rationale: 'Cấu trúc pháp lý trang trọng với chủ ngữ danh từ hóa.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-genre-register-shift-14-o1',
      prompt: 'Viết cùng một nội dung quy định (yêu cầu bảo mật thông tin) dưới hai phong cách chức năng khác nhau: (1) Văn phong quy phạm pháp chế (Statutory drafting với shall/provided that); (2) Văn phong thông cáo ngoại giao đa phương (Diplomatic communique với constructive ambiguity và agentless passive).',
      modelAnswer: 'Statutory drafting: "Authorized personnel shall maintain absolute confidentiality regarding classified cryptographic protocols, provided that disclosure may be made pursuant to a valid judicial warrant." Diplomatic communique: "The utmost importance is attached to safeguarding sensitive communications infrastructure, and all parties reaffirm their shared commitment to exercising rigorous discretion in interstate deliberations."',
      checks: [
        'Phiên bản pháp chế thể hiện rõ cấu trúc cưỡng chế với "shall" và điều khoản dự phòng "provided that"',
        'Phiên bản ngoại giao sử dụng bị động vô nhân xưng và ngôn từ nghi thức đa phương',
        'Phân biệt rõ rệt hai trường ngữ nghĩa và cấu trúc cú pháp của từng thể loại',
      ],
    },
    {
      id: 'grammar-v2-c2-genre-register-shift-14-o2',
      prompt: 'Chuyển đổi một tuyên bố học thuật khẳng định tuyệt đối ("Monetary tightening causes sudden recessions") thành một đoạn văn 2 câu áp dụng kỹ thuật rào đón nhận thức (epistemic hedging) và tích hợp luận cứ khoa học chuẩn mực C2.',
      modelAnswer: 'While historical time-series data suggest that aggressive monetary tightening correlates with contractions in aggregate output, it would be premature to assert an invariant causal nexus across diverse institutional settings. Rather, empirical findings appear to indicate that the transmission velocity of rate hikes depends substantially on prevailing private debt leverage.',
      checks: [
        'Sử dụng các cấu trúc rào đón nhận thức học thuật (suggest that, premature to assert, appear to indicate)',
        'Văn phong khách quan, sắc sảo, không giáo điều',
        'Cú pháp phức hợp đạt trình độ diễn ngôn học thuật C2',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-functional-grammar',
      title: "Halliday's Introduction to Functional Grammar (Halliday & Matthiessen)",
      url: 'https://www.routledge.com/Hallidays-Introduction-to-Functional-Grammar/Halliday-Matthiessen/p/book/9780415826280',
      claims: ['Registers vary systematically according to field, tenor, and mode', 'Grammatical metaphor enables register-specific discourse construction'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'swales-genre-analysis',
      title: 'Genre Analysis: English in Academic and Research Settings (John M. Swales)',
      url: 'https://www.cambridge.org/core/books/genre-analysis/9E4E2C7D1E5E770732A0CFEB04A81084',
      claims: ['Discourse communities enforce conventionalized syntactic moves and lexical constraints across professional genres'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified genre and functional register shifts, statutory/judicial/academic styles, 16 exercises, outputs, and canonical sources.',
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
