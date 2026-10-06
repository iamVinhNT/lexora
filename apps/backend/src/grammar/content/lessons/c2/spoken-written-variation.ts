/**
 * @file spoken-written-variation.ts
 * @description C2 lesson: Spoken vs written grammatical variation, dislocation structures, and communicative economy.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-spoken-written-variation-15',
  revisionId: 'grammar-v2-c2-spoken-written-variation-15@1.0.0',
  revision: '1.0.0',
  title: 'Biến thiên ngữ pháp nói và viết (Spoken vs Written Variation)',
  objective: 'Làm chủ sự phân hóa ngữ pháp sâu sắc giữa khẩu ngữ tinh hoa (parliamentary debate, oral advocacy, broadcast interviews) và văn bản viết tích hợp cao; kiểm soát kỹ thuật tách đề (left/right dislocation, headers & tails), lược bỏ tình huống (situational ellipsis) và các đơn vị phi mệnh đề (non-clausal units).',
  prerequisiteIds: ['grammar-v2-c2-genre-register-shift-14'],
  coverage: ['spoken-written-variation', 'spoken-grammar', 'left-right-dislocation', 'situational-ellipsis', 'c2-discourse'],
  context: {
    english: 'In appellate oral advocacy and live parliamentary inquiry, barristers and parliamentarians skillfully deploy spoken grammatical structures—such as headers, tails, and pragmatic tags—to manage real-time cognitive processing without sacrificing precision or solemnity.',
    vietnamese: 'Trong tranh tụng miệng tại tòa phúc thẩm và các phiên điều trần quốc hội trực tiếp, các luật sư tranh tụng và nghị sĩ vận dụng thuần thục các cấu trúc ngữ pháp nói—như tiền tố tách đề (headers), hậu tố giải tỏa (tails), và thẻ dụng học—để điều phối việc tiếp nhận thông tin theo thời gian thực mà không làm suy giảm tính trang nghiêm hay sự chuẩn xác.',
  },
  guide: {
    pattern: 'Header / Left Dislocation: [Topic NP], S + Pronoun + VP | Tail / Right Dislocation: S + Pronoun + VP, [Clarifying NP / Stance Tag]',
    whenToUse: [
      'Sử dụng Header (tiền đề tách biệt) để định hình chủ đề tranh luận ngay lập tức trong đối thoại thời gian thực trước khi triển khai vị ngữ',
      'Áp dụng Tail (hậu tố tách biệt) để bổ sung sự làm rõ hoặc xác lập lập trường đánh giá ở cuối phát ngôn',
      'Phân biệt rõ ràng khi nào cần tích hợp cú pháp chặt chẽ bằng danh từ hóa (trong văn viết) và khi nào cần chia nhỏ thành các cụm linh hoạt (trong tranh luận miệng)',
    ],
    signalWords: ['that proposal, it...', 'they are quite capable, the delegates', 'mind you', 'as it were', 'if I may say so'],
    check: [
      'Cấu trúc tách đề (dislocation) có phục vụ đúng chức năng điều phối dòng thông tin hội thoại hay bị đưa nhầm vào bài luận viết trang trọng?',
      'Đại từ trong mệnh đề chính có tương thích hoàn toàn về giống và số với danh từ tách đề (dislocated NP) không?',
      'Có nhầm lẫn giữa sự lỏng lẻo khẩu ngữ cẩu thả và ngữ pháp nói tinh hoa (high-register spoken grammar) không?',
    ],
  },
  explanation: 'Ngữ pháp khẩu ngữ (Spoken Grammar) ở bậc C2 không phải là phiên bản "kém chuẩn" của văn viết, mà là một hệ thống cấu trúc độc lập được tối ưu hóa cho tương tác trực tiếp theo thời gian thực (real-time processing constraints). Trong khi văn bản viết học thuật chuộng tính tích hợp cú pháp cao (high syntactic integration, clausal subordination, heavy nominalization), ngữ pháp nói trình độ cao vận hành qua các cơ chế phi tuyến tính: (1) Headers (Left Dislocation): Đưa danh từ trọng tâm lên đầu câu làm điểm neo thông tin rồi dùng đại từ trong câu chính ("This latest fiscal package, does it actually stimulate productivity?"); (2) Tails (Right Dislocation): Đặt đại từ trong câu chính rồi bổ sung chi tiết hoặc định danh rõ đối tượng ở đuôi câu ("It is an indefensible strategy, this unilateral withdrawal"); (3) Lược bỏ tình huống (Situational Ellipsis): Bỏ các thành phần có thể suy luận trực tiếp từ bối cảnh giao tiếp; (4) Khối tương tác phi mệnh đề (Non-clausal units & pragmatic markers: "mind you", "to be quite candid", "as it were"). Người học C2 cần phân biệt rạch ròi giữa việc sử dụng các cấu trúc này trong hùng biện/tranh tụng miệng và việc tuyệt đối tránh đưa dislocation vào các văn bản học thuật xuất bản chính thức.',
  examples: [
    {
      english: 'Spoken Header: That sovereign debt restructuring proposal, does it actually safeguard public pension reserves?',
      vietnamese: 'Khẩu ngữ tiền tố: Đề xuất tái cơ cấu nợ công đó, liệu nó có thực sự bảo vệ các quỹ hưu trí quốc gia không? (Left dislocation đưa chủ đề lên làm điểm neo chú ý).',
    },
    {
      english: 'Spoken Tail: It cannot withstand judicial scrutiny, that contentious executive order.',
      vietnamese: 'Khẩu ngữ hậu tố: Nó không thể đứng vững trước sự xem xét tư pháp, sắc lệnh hành pháp gây tranh cãi đó (Right dislocation giải thích đại từ "it" ở cuối).',
    },
    {
      english: 'Written Integrated: The contentious executive order cannot withstand rigorous judicial scrutiny regarding its constitutional foundation.',
      vietnamese: 'Văn viết tích hợp: Sắc lệnh hành pháp gây tranh cãi không thể đứng vững trước sự xem xét tư pháp nghiêm ngặt liên quan đến nền tảng hiến pháp của nó (Cú pháp tích hợp liền mạch).',
    },
    {
      english: 'Spoken Argument: The chancellor, he seemed rather evasive when interrogated on currency interventions, didn\'t he?',
      vietnamese: 'Tranh luận miệng: Ngài thủ tướng, ông ấy có vẻ khá né tránh khi bị chất vấn về các can thiệp tiền tệ, đúng không? (Sử dụng header kết hợp thẻ xác nhận).',
    },
    {
      english: 'Spoken Marker: The proposed defense pact is, as it were, a diplomatic safety valve for regional stability.',
      vietnamese: 'Khẩu ngữ lập trường: Thỏa ước quốc phòng được đề xuất, có thể nói như vậy, là một van an toàn ngoại giao cho sự ổn định khu vực (Dùng "as it were" để làm mềm hóa ẩn dụ).',
    },
    {
      english: 'Written Nominalization: The implementation of quantitative easing precipitated an unprecedented devaluation of fixed-income yields.',
      vietnamese: 'Văn viết danh từ hóa: Việc thực thi nới lỏng định lượng đã dẫn đến sự giảm giá trị chưa từng có của lợi suất thu nhập cố định (Văn viết dày đặc danh từ, không dùng dislocation).',
    },
  ],
  contrasts: [
    {
      form: 'Left Dislocation (Spoken Header) vs Integrated Standard Subject (Written)',
      whyFits: '"This new regulatory amendment, does the commission truly intend to enforce it?" rất hiệu quả trong tranh luận trực tiếp tại nghị viện để thu hút sự chú ý vào chủ đề.',
      whyNot: '"*This new regulatory amendment, the commission does not intend to enforce it" nếu viết trong bài luận nghiên cứu sẽ bị đánh giá là lỗi cú pháp trùng ngữ (faulty double subject / clumsy dislocation); bài viết chuẩn phải là "The commission does not intend to enforce this new regulatory amendment".',
    },
    {
      form: 'Situational Spoken Ellipsis vs Complete Formal Clause',
      whyFits: '"Makes absolute sense under the circumstances" tự nhiên và cô đọng trong đối thoại trực tiếp cấp cao giữa các đồng nghiệp chuyên môn.',
      whyNot: '"*Makes absolute sense" nếu xuất hiện trong bản ghi nhớ phán quyết chính thức sẽ bị coi là vi phạm chuẩn mực văn bản do thiếu chủ ngữ ngữ pháp bắt buộc.',
    },
  ],
  commonMistakes: [
    'Đưa cấu trúc tách đề khẩu ngữ (left/right dislocation với đại từ thừa) vào bài viết học thuật hoặc báo cáo pháp lý trang trọng.',
    'Nhầm lẫn giữa ngôn ngữ nói tinh hoa của giới học giả/nghị sĩ (vẫn dùng từ vựng chính xác) với tiếng lóng bình dân hoặc ngữ pháp vỡ hạt.',
    'Bất đồng bộ về giống hoặc số giữa danh từ được tách đề và đại từ thế vị trong mệnh đề chính (ví dụ: *"Those amendments, does it solve the crisis?").',
  ],
  summary: 'Khẩu ngữ tinh hoa vận dụng cấu trúc tách đề (headers, tails) và dấu hiệu tương tác để điều phối sự chú ý theo thời gian thực, trong khi văn viết đòi hỏi sự tích hợp cú pháp chặt chẽ và danh từ hóa sâu sắc.',
  exercises: [
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q1',
      kind: 'choice',
      prompt: 'Xác định câu khẩu ngữ hùng biện sử dụng cấu trúc tách đề phía trước (Left Dislocation / Header) chuẩn mực trong tranh luận nghị viện.',
      options: [
        { text: 'The cross-border tariff protocol, has the trade minister genuinely assessed its ramifications for domestic agriculture?', correct: true, rationale: 'Cụm danh từ chủ đề đứng đầu câu, đại từ "its" kết nối trong câu hỏi chính tạo thành cấu trúc header kinh điển.' },
        { text: 'Has the trade minister assessed the cross-border tariff protocol for domestic agriculture?', correct: false, rationale: 'Đây là câu hỏi tiêu chuẩn thông thường, không chứa cấu trúc tách đề header.' },
        { text: 'The protocol, it is good, we like it.', correct: false, rationale: 'Văn phong ấu trĩ, thiếu tính chuẩn mực của hùng biện C2.' },
      ],
      acceptedAnswers: [{ text: 'The cross-border tariff protocol, has the trade minister genuinely assessed its ramifications for domestic agriculture?', rationale: 'Left dislocation điều phối chủ đề sắc bén trong đối thoại nghị viện.' }],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q2',
      kind: 'choice',
      prompt: 'Xác định câu khẩu ngữ áp dụng cấu trúc tách đề phía sau (Right Dislocation / Tail) để nhấn mạnh lập trường.',
      options: [
        { text: 'It remains an utterly reckless fiscal experiment, that proposed tax moratorium.', correct: true, rationale: 'Đại từ "It" đứng trước trong mệnh đề chính và danh từ đầy đủ "that proposed tax moratorium" đặt ở đuôi làm rõ nghĩa.' },
        { text: 'That proposed tax moratorium remains an utterly reckless fiscal experiment.', correct: false, rationale: 'Câu trật tự chuẩn SVO thông thường trong văn bản viết.' },
        { text: 'An utterly reckless fiscal experiment remains that proposed tax moratorium.', correct: false, rationale: 'Cấu trúc đảo ngữ vụng về và thiếu tự nhiên.' },
      ],
      acceptedAnswers: [{ text: 'It remains an utterly reckless fiscal experiment, that proposed tax moratorium.', rationale: 'Right dislocation nhấn mạnh phán đoán trước khi định danh đối tượng.' }],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q3',
      kind: 'choice',
      prompt: 'Chọn phương án chuyển đổi câu tách đề khẩu ngữ sang câu văn viết học thuật tích hợp chặt chẽ (syntactically integrated).',
      options: [
        { text: 'The revised fiscal projections indicate a substantial contraction in discretionary state expenditure.', correct: true, rationale: 'Loại bỏ hoàn toàn đại từ thừa, tích hợp cấu trúc qua danh từ hóa và vị ngữ trực tiếp.' },
        { text: 'These revised fiscal projections, they indicate a big contraction in state expenditure.', correct: false, rationale: 'Vẫn giữ cấu trúc tách đề khẩu ngữ "they" không phù hợp với văn viết.' },
        { text: 'State expenditure will contract a lot, those fiscal projections say.', correct: false, rationale: 'Văn phong rời rạc thiếu độ dày học thuật.' },
      ],
      acceptedAnswers: [{ text: 'The revised fiscal projections indicate a substantial contraction in discretionary state expenditure.', rationale: 'Văn viết học thuật tích hợp trọn vẹn.' }],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q4',
      kind: 'choice',
      prompt: 'Chọn câu sử dụng dấu hiệu dụng học làm mềm phát ngôn (pragmatic hedge / stance marker) tự nhiên nhất trong bài phát biểu đối thoại.',
      options: [
        { text: 'The multilateral summit was, as it were, a dress rehearsal for broader security pact negotiations.', correct: true, rationale: '"as it were" đóng vai trò định vị ẩn dụ, điều chỉnh sắc thái diễn ngôn một cách tinh tế.' },
        { text: 'The multilateral summit was strictly and literally a dress rehearsal.', correct: false, rationale: 'Dùng sai từ "literally" cho một hình tượng ẩn dụ.' },
        { text: 'The multilateral summit was a dress rehearsal, you know what I mean.', correct: false, rationale: 'Khẩu ngữ đời thường không đạt chuẩn phát biểu cấp cao.' },
      ],
      acceptedAnswers: [{ text: 'The multilateral summit was, as it were, a dress rehearsal for broader security pact negotiations.', rationale: 'Dấu hiệu dụng học khẩu ngữ bác học C2.' }],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q5',
      kind: 'gap',
      prompt: 'Điền từ tạo thành cụm rào đón khẩu ngữ lịch thiệp khi nêu ý kiến bất đồng: "That line of reasoning is somewhat untenable, if I ___ say so."',
      options: [],
      acceptedAnswers: [
        { text: 'may', rationale: '"if I may say so" là công thức rào đón tranh luận lịch thiệp kinh điển trong khẩu ngữ chính khách và học giả.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q6',
      kind: 'gap',
      prompt: 'Điền đại từ hoàn thành cấu trúc tách đề phía trước (Left Dislocation): "The proposed constitutional amendment, has ___ genuinely addressed the separation of powers?"',
      options: [],
      acceptedAnswers: [
        { text: 'it', rationale: '"it" là đại từ số ít ngôi thứ ba đối ứng với "The proposed constitutional amendment".' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q7',
      kind: 'gap',
      prompt: 'Điền trạng từ thể hiện sự lưu ý phản đề trong khẩu ngữ hùng biện: "The macroeconomic gains are undeniable; ___ you, the distributional inequities remain acute."',
      options: [],
      acceptedAnswers: [
        { text: 'mind', rationale: '"mind you" là điểm nhấn tương phản phổ biến trong khẩu ngữ tranh luận trí thức.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q8',
      kind: 'gap',
      prompt: 'Điền đại từ số nhiều hoàn thành cấu trúc tách đề phía sau (Right Dislocation): "They have consistently outperformed expectations, ___ emerging market equities."',
      options: [],
      acceptedAnswers: [
        { text: 'these', rationale: '"these emerging market equities" xác định cụm danh từ ở đuôi câu.' },
        { text: 'those', rationale: '"those emerging market equities" làm rõ đối tượng quy chiếu.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang hình thức câu có Header (Left Dislocation) để chuẩn bị cho phần tranh luận miệng tại phiên chất vấn: "Does the treasury expect this emergency liquidity facility to prevent corporate insolvencies?" -> "This emergency liquidity facility, does the treasury expect ___ to prevent corporate insolvencies?"',
      options: [],
      acceptedAnswers: [
        { text: 'it', rationale: 'Đại từ "it" giữ vai trò tân ngữ thay thế trong mệnh đề chính sau khi danh từ đã được đưa lên làm header.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q10',
      kind: 'transform',
      prompt: 'Chuyển câu khẩu ngữ tách đề sau sang một câu văn bản viết học thuật trang trọng loại bỏ hoàn toàn đại từ thừa: "That judicial doctrine, scholars have long challenged its underlying rationale." -> "Scholars have long challenged the underlying rationale of ___."',
      options: [],
      acceptedAnswers: [
        { text: 'that judicial doctrine', rationale: 'Tích hợp cú pháp hoàn chỉnh của văn phong viết.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi bất tương hợp đại từ trong cấu trúc tách đề khẩu ngữ sau: "The statutory provisions on data encryption, does it adequately protect consumer privacy?"',
      options: [],
      acceptedAnswers: [
        { text: 'The statutory provisions on data encryption, do they adequately protect consumer privacy?', rationale: '"provisions" là danh từ số nhiều, đại từ và trợ động từ phải là "do they".' },
        { text: 'do they adequately protect consumer privacy?', rationale: 'Vế câu hỏi sửa đổi đại từ và trợ động từ số nhiều do they.' },
        { text: 'do they', rationale: 'Cặp trợ động từ và đại từ số nhiều do they thay thế cho does it.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-q12',
      kind: 'correction',
      prompt: 'Sửa câu sau để loại bỏ cấu trúc tách đề khẩu ngữ không phù hợp trong văn bản học thuật xuất bản chính thức: "The empirical survey results, they undeniably confirm our initial hypothesis."',
      options: [],
      acceptedAnswers: [
        { text: 'The empirical survey results undeniably confirm our initial hypothesis.', rationale: 'Bỏ đại từ thừa "they" để câu trở thành cấu trúc văn viết chuẩn tắc.' },
        { text: 'undeniably confirm our initial hypothesis', rationale: 'Cụm vị ngữ loại bỏ đại từ thừa they.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-r1',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện chính xác kỹ thuật tranh luận miệng cấp cao với cấu trúc đuôi (Tail) nhằm giải tỏa căng thẳng nhận thức.',
      options: [
        { text: 'It was a masterclass in judicial evasion, the attorney general\'s press conference yesterday.', correct: true, rationale: 'Cấu trúc Right Dislocation kinh điển, phù hợp với bình luận miệng sắc sảo.' },
        { text: 'The attorney general press conference yesterday was a masterclass in judicial evasion, yeah?', correct: false, rationale: 'Thẻ hỏi "yeah?" quá suồng sã, phá vỡ tính bác học.' },
        { text: 'It was good, the thing yesterday.', correct: false, rationale: 'Ngữ pháp nghèo nàn, từ vựng mơ hồ.' },
      ],
      acceptedAnswers: [{ text: 'It was a masterclass in judicial evasion, the attorney general\'s press conference yesterday.', rationale: 'Right dislocation tinh tế và trí tuệ trong khẩu ngữ chuyên gia.' }],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-r2',
      kind: 'gap',
      prompt: 'Điền từ hoàn thành cụm từ dấu hiệu dụng học khẩu ngữ: "The proposed trade barriers are, so to ___, an obsolete weapon in a globalized supply chain."',
      options: [],
      acceptedAnswers: [
        { text: 'speak', rationale: '"so to speak" là cụm từ rào đón khẩu ngữ chỉ cách nói ví von.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-r3',
      kind: 'transform',
      prompt: 'Chuyển phát ngôn có Header sau sang câu viết học thuật tích hợp: "That bilateral security pact, historians consider it the catalyst for the conflict." -> "Historians consider that bilateral security pact ___."',
      options: [],
      acceptedAnswers: [
        { text: 'the catalyst for the conflict', rationale: 'Tích hợp cú pháp trực tiếp S + V + O + C trong văn viết.' },
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi tách đề khẩu ngữ sai vị trí trong câu văn viết báo cáo chính sách: "The central bank\'s monetary stance, it has created considerable volatility in bond markets."',
      options: [],
      acceptedAnswers: [
        { text: 'The central bank\'s monetary stance has created considerable volatility in bond markets.', rationale: 'Xóa bỏ đại từ "it" để trả lại câu văn viết hoàn chỉnh và trang trọng.' },
        { text: 'has created considerable volatility in bond markets', rationale: 'Cụm vị ngữ loại bỏ đại từ thừa it.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-o1',
      prompt: 'Viết một trích đoạn 2-3 câu thể hiện phong cách tranh luận khẩu ngữ tinh hoa (Spoken high-register discourse) trong một phiên điều trần quốc hội, sử dụng một cấu trúc Header (Left dislocation) và một dấu hiệu dụng học (pragmatic marker như "mind you" hoặc "if I may say so").',
      modelAnswer: 'The proposed bank bailout package, does it truly insulate taxpayers from speculative losses, or does it merely perpetuate systemic moral hazard? It is an astonishingly generous allocation of public capital, if I may say so, for an institution that disregarded statutory risk thresholds.',
      checks: [
        'Sử dụng chính xác một cấu trúc Header (Left dislocation) đưa chủ đề lên đầu câu',
        'Tích hợp dấu hiệu dụng học khẩu ngữ trang trọng (như if I may say so / mind you)',
        'Thể hiện rõ tính tương tác khẩu ngữ bậc cao mà vẫn duy trì tính chuẩn xác từ vựng',
      ],
    },
    {
      id: 'grammar-v2-c2-spoken-written-variation-15-o2',
      prompt: 'Chuyển đổi một đoạn phát biểu khẩu ngữ chứa các thành phần tách đề rời rạc thành một đoạn văn viết học thuật tích hợp chặt chẽ (syntactically dense written prose) với danh từ hóa và mệnh đề phụ thuộc.',
      modelAnswer: 'Spoken version: "This new carbon border tariff, countries are really worried about it. It creates major trade barriers, this policy." Written conversion: "The implementation of the carbon border adjustment mechanism has elicited widespread apprehension among trading partners, precipitating substantial non-tariff impediments across global supply chains."',
      checks: [
        'Loại bỏ hoàn toàn các đại từ thế vị và cấu trúc tách đề (dislocation) của văn nói',
        'Áp dụng danh từ hóa (nominalization) và kết cấu câu tích hợp dày dặn',
        'Bảo toàn trọn vẹn và nâng tầm nội dung tư tưởng học thuật',
      ],
    },
  ],
  sources: [
    {
      id: 'biber-grammar-spoken-written',
      title: 'Longman Grammar of Spoken and Written English (Biber, Johansson, Leech, Conrad, Finegan)',
      url: 'https://www.routledge.com/Longman-Grammar-of-Spoken-and-Written-English/Biber-Johansson-Leech-Conrad-Finegan/p/book/9780582237254',
      claims: ['Spoken grammar exhibits distinctive syntactic features such as dislocation and non-clausal units tailored for real-time online processing', 'Written registers rely heavily on structural compression and nominal elaboration'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'carter-mccarthy-cambridge-grammar',
      title: 'Cambridge Grammar of English: A Comprehensive Guide (Carter & McCarthy)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-english/72BAE22DC33CDE5A29D8498CA7ECFA63',
      claims: ['Headers and tails function systematically in elite spoken English to negotiate topic and interpersonal stance'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified spoken vs written syntactic variation, headers and tails, 16 exercises, outputs, and canonical sources.',
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
