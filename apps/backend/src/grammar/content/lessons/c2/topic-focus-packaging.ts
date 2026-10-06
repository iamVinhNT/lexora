/**
 * @file topic-focus-packaging.ts
 * @description C2 lesson on topic-focus packaging and information structure: theme-rheme dynamics, clefting, fronting, and end-weight in academic discourse.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-topic-focus-packaging-08',
  revisionId: 'grammar-v2-c2-topic-focus-packaging-08@1.0.0',
  revision: '1.0.0',
  title: 'Đóng gói thông tin và cấu trúc Chủ đề - Tiêu điểm: Topic-Focus Packaging',
  objective: 'Làm chủ các cơ chế đóng gói thông tin (information packaging) đỉnh cao theo lý thuyết chức năng của M.A.K. Halliday và Knud Lambrecht: điều phối dòng chảy Thông tin đã biết - Thông tin mới (Given-before-New), vận dụng cấu trúc câu chẻ (It-clefts, Wh-clefts, Reversed clefts), đưa lên đầu câu (fronting) và đảo ngữ vị từ (predicative inversion) để tối ưu hóa sức nặng tu từ (end-weight) trong diễn ngôn học thuật.',
  prerequisiteIds: ['grammar-v2-c2-tense-reference-discourse-07'],
  coverage: ['topic-focus-packaging', 'information-structure', 'cleft-sentences', 'fronting', 'inversion'],
  context: {
    english: 'A senior university press editor revamps the opening chapter of a monograph in political philosophy, restructuring cumbersome clauses through clefting, fronting, and inversion so that established premises anchor the theme while revolutionary arguments occupy sentence-final focus.',
    vietnamese: 'Một tổng biên tập nhà xuất bản đại học biên tập lại chương mở đầu của chuyên khảo triết học chính trị, tái cấu trúc các mệnh đề nặng nề bằng kỹ thuật câu chẻ, đưa lên đầu câu và đảo ngữ để các tiền đề đã biết làm điểm tựa chủ đề trong khi các lập luận đột phá chiếm giữ tiêu điểm cuối câu.',
  },
  guide: {
    pattern: 'Given/Theme (Anchor) -> New/Rheme (Focus) | It-cleft: It is/was [Contrastive Focus] that/who [Presupposition] | Wh-cleft: What [Given Proposition] is [New Focal Claim] | Predicative Inversion: [Complement / Locative] + V + [Heavy Focal Subject]',
    whenToUse: [
      'Điều phối trật tự thông tin để tối ưu hóa khả năng tiếp nhận nhận thức của độc giả (cognitive processing ease) trong các lập luận đa tầng.',
      'Sử dụng cấu trúc câu chẻ (clefting) để làm nổi bật tiêu điểm tương phản (contrastive focus), đập tan những quan niệm ngộ nhận từ trước.',
      'Vận dụng đảo ngữ vị ngữ (predicative/locative inversion) và đưa lên đầu câu (fronting) nhằm tạo mối liên kết mạch lạc hữu cơ (thematic cohesion) với câu văn liền trước.',
    ],
    signalWords: ['it was precisely because', 'what remains undisputed is', 'central to this thesis is', 'such was', 'nowhere is this more evident than'],
    check: [
      'Tuân thủ nghiêm ngặt nguyên tắc "Given-before-New": đặt thông tin người đọc đã biết ở đầu câu làm Chủ đề (Theme) và dồn thông tin mới, nặng ký về cuối câu làm Tiêu điểm (End-Weight/End-Focus).',
      'Tránh lạm dụng câu chẻ "It is..." một cách sáo rỗng khi không có nhu cầu làm nổi bật tiêu điểm tương phản hoặc sửa chữa thông tin sai lệch.',
      'Phân biệt rõ Đảo ngữ toàn phần (Full inversion: [Adv/Adj] + V + S) với Đảo ngữ trợ động từ (Subject-Auxiliary inversion: [Negative Adv] + Aux + S + V).',
    ],
  },
  explanation: 'Ở cấp độ C2, cấu trúc câu không chỉ được đánh giá bằng tính đúng đắn ngữ pháp hình thức (syntactic well-formedness) mà bằng hiệu quả đóng gói thông tin (Information Packaging). Theo M.A.K. Halliday và Knud Lambrecht, mỗi câu văn trong một đoạn văn bản học thuật đều thực hiện hai chức năng: kết nối với điều đã được bàn luận trước đó (Chủ đề - Theme / Given Information) và giới thiệu đóng góp tri thức mới (Thuyết minh - Rheme / New Information / Focus). Nguyên tắc căn bản của văn phong đỉnh cao là "Given-before-New" kết hợp với "End-Weight" (đặt các thành phần ngữ nghĩa phức tạp và nặng ký nhất về cuối câu để tạo ấn tượng lưu giữ). Để kiểm soát tiêu điểm, người viết sử dụng ba công cụ chuyển đổi cấu trúc: Thứ nhất, Câu chẻ (It-clefts: "It was Smith who proposed...", Wh-clefts: "What the data demonstrate is...") giúp cô lập chính xác thành phần mang trọng tâm ngữ nghĩa. Thứ hai, Đưa lên đầu câu (Fronting/Topicalization: "This objection we can dismiss immediately") biến một tân ngữ hoặc bổ ngữ thành mỏ neo chủ đề của câu. Thứ ba, Đảo ngữ vị từ (Predicative Inversion: "Central to this formulation is the assumption that...") đưa tính từ hoặc cụm giới từ liên kết lên đầu câu, đồng thời đẩy toàn bộ mệnh đề danh từ chủ ngữ rất dài và nặng về vị trí tiêu điểm cuối câu.',
  examples: [
    {
      english: 'It was not the sovereign\'s moral authority that sustained the realm, but rather the administrative coercion of the provincial prefects.',
      vietnamese: 'Chính không phải uy quyền đạo đức của bậc quân vương đã duy trì vương quốc, mà là sự cưỡng chế hành chính của các quan tổng đốc địa phương. (It-cleft làm nổi bật tiêu điểm tương phản kép).',
    },
    {
      english: 'What the committee failed to appreciate was the systemic fragility of the collateralized debt obligations.',
      vietnamese: 'Điều mà ủy ban đã không nhận thức được chính là sự mong manh mang tính hệ thống của các nghĩa vụ nợ có thế chấp. (Wh-cleft đóng gói tiền đề thất bại làm nền để nhấn mạnh tiêu điểm nợ xấu ở cuối câu).',
    },
    {
      english: 'Pivotal to the viability of this macroeconomic strategy is the steadfast independence of the central banking authority.',
      vietnamese: 'Giữ vai trò then chốt đối với tính khả thi của chiến lược kinh tế vĩ mô này chính là sự độc lập kiên định của cơ quan ngân hàng trung ương. (Predicative inversion: đưa tính từ then chốt lên đầu, đẩy chủ ngữ nặng ký về cuối).',
    },
    {
      english: 'These philosophical dilemmas the author explores with exemplary analytical rigor in the penultimate chapter.',
      vietnamese: 'Chính những nan đề triết học này tác giả khám phá với sự chuẩn xác phân tích mẫu mực trong chương áp chót. (Fronting/Topicalization: đưa tân ngữ "These philosophical dilemmas" lên đầu làm điểm nối với luận điểm trước).',
    },
    {
      english: 'That persistent structural inequality impedes productivity is what modern institutional economists continually emphasize.',
      vietnamese: 'Việc bất bình đẳng cơ cấu dai dẳng cản trở năng suất chính là điều mà các nhà kinh tế học thể chế đương đại liên tục nhấn mạnh. (Reversed cleft: đặt mệnh đề danh từ làm tiêu điểm khởi đầu và biến nhận định học giả thành phần vị ngữ).',
    },
    {
      english: 'Surrounding the contested oil fields were three heavily fortified cantonments manned by paramilitary battalions.',
      vietnamese: 'Bao quanh các mỏ dầu đang tranh chấp là ba khu đồn trú kiên cố được đồn trú bởi các tiểu đoàn bán quân sự. (Locative inversion: đưa vị trí không gian lên trước để kết nối địa hình, đẩy chủ ngữ nặng về cuối).',
    },
  ],
  contrasts: [
    {
      form: 'The central bank\'s independence is crucial to this reform vs Crucial to this reform is the central bank\'s independence',
      whyFits: 'Crucial to this reform is... (Predicative inversion) kết nối khái niệm "this reform" đã được bàn ở câu trước làm mỏ neo chủ đề, dồn tiêu điểm "independence" về cuối câu để tạo sức nặng tu từ.',
      whyNot: 'Câu thứ nhất tuân theo trật tự tự nhiên S-V-C nhưng làm đứt gãy mạch liên kết nếu câu trước đang thảo luận về quá trình cải cách (reform).',
    },
    {
      form: 'The author criticizes mercantilism in chapter four vs It is mercantilism that the author criticizes in chapter four',
      whyFits: 'It is mercantilism that... (It-cleft) cần thiết khi người viết muốn xác lập sự đối lập rõ rệt rằng tác giả phê phán chủ nghĩa trọng thương chứ không phải chủ nghĩa trọng nông hay tự do.',
      whyNot: 'Nếu chỉ đơn thuần liệt kê nội dung tóm tắt chương sách mà không có hàm ý tương phản, việc dùng It-cleft gây ra sự nhấn mạnh thừa thãi và kiểu cách giả tạo.',
    },
  ],
  commonMistakes: [
    'Lạm dụng câu chẻ "It is/was..." trong các câu văn học thuật thông thường khi không hề có yếu tố tương phản, làm câu văn trở nên rườm rà và chậm chạp.',
    'Vi phạm nguyên tắc "Given-before-New" bằng cách đặt một chủ ngữ cực dài, hoàn toàn mới ở đầu câu trong khi đẩy thông tin người đọc đã biết về cuối câu.',
    'Nhầm lẫn giữa đảo ngữ toàn phần (Inversion: đứng sau cụm giới từ/tính từ không dùng trợ động từ) và đảo ngữ phủ định (cần trợ động từ do/does/did).',
  ],
  summary: 'Đóng gói thông tin (Topic-Focus Packaging) là nghệ thuật điều phối Theme-Rheme, Clefting, Fronting và Inversion để bảo đảm nguyên tắc Given-before-New và End-Weight, tạo nên sự mạch lạc và uy lực tu từ tối thượng trong văn phong C2.',
  exercises: [
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q1',
      kind: 'choice',
      prompt: 'Xét đoạn văn: "Many commentators attributed the crisis to speculative currency trading. However, the forensic audit revealed a different reality. It was systemic regulatory forbearance that enabled the collapse." Chức năng của cấu trúc It-cleft ở câu cuối là gì?',
      options: [
        { text: 'Thiết lập tiêu điểm tương phản (contrastive focus), bác bỏ giả thuyết buôn bán tiền tệ và định vị chính xác nguyên nhân thực sự', correct: true, rationale: 'It-cleft được sử dụng chuẩn mực để đập tan quan niệm sai lệch trước đó và khẳng định nguyên nhân cốt lõi duy nhất.' },
        { text: 'Chỉ ra rằng cuộc khủng hoảng tài chính diễn ra vào một thời điểm lịch sử cụ thể', correct: false, rationale: 'Không đóng vai trò định vị thời gian.' },
        { text: 'Tránh phải nêu rõ chủ ngữ của hành động sụp đổ', correct: false, rationale: 'Chủ ngữ ngữ nghĩa (regulatory forbearance) được nêu rõ và nhấn mạnh ở vị trí tiêu điểm.' },
      ],
      acceptedAnswers: [{ text: 'Thiết lập tiêu điểm tương phản (contrastive focus), bác bỏ giả thuyết buôn bán tiền tệ và định vị chính xác nguyên nhân thực sự', rationale: 'It-cleft tạo tiêu điểm tương phản sắc bén.' }],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q2',
      kind: 'choice',
      prompt: 'Để kết nối mạch lạc với câu trước: "The cabinet announced a radical restructuring plan on Monday.", câu nào sau đây tuân thủ nguyên tắc Given-before-New và End-Weight tốt nhất?',
      options: [
        { text: 'Central to this plan is the wholesale privatization of state-owned logistics enterprises.', correct: true, rationale: 'Predicative inversion đưa "this plan" (given) lên làm theme đầu câu, và đẩy thông tin mới rất nặng "wholesale privatization..." (new focus) về cuối câu.' },
        { text: 'The wholesale privatization of state-owned logistics enterprises is central to this plan.', correct: false, rationale: 'Đặt thông tin mới, dài và nặng ở đầu câu và kết thúc bằng thông tin đã biết (this plan) vi phạm nguyên tắc End-Weight và dòng chảy mạch lạc.' },
        { text: 'What is central to this plan is that state enterprises will be privatized wholly.', correct: false, rationale: 'Wh-cleft ở đây không tối ưu bằng predicative inversion trong việc kết nối mượt mà.' },
      ],
      acceptedAnswers: [{ text: 'Central to this plan is the wholesale privatization of state-owned logistics enterprises.', rationale: 'Predicative inversion tối ưu hóa Given-before-New và End-Weight.' }],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q3',
      kind: 'choice',
      prompt: 'Cấu trúc Wh-cleft nào sau đây đóng gói một mệnh đề hành động để nhấn mạnh sự can thiệp duy nhất của thủ tướng?',
      options: [
        { text: 'What the prime minister did was dismiss the defiant interior minister without consultation.', correct: true, rationale: '"What X did was..." là cấu trúc pseudo-cleft chuẩn hóa để đưa toàn bộ hành động vào vị trí tiêu điểm mới.' },
        { text: 'The prime minister was what dismissed the interior minister.', correct: false, rationale: 'Sai hoàn toàn về cú pháp và đại từ quan hệ.' },
        { text: 'It was dismissing the minister that the prime minister did.', correct: false, rationale: 'Cấu trúc vụng về, không tự nhiên.' },
      ],
      acceptedAnswers: [{ text: 'What the prime minister did was dismiss the defiant interior minister without consultation.', rationale: 'Wh-cleft hành động chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q4',
      kind: 'choice',
      prompt: 'Phân tích câu: "Hardly had the armistice been signed when skirmishes erupted along the perimeter." Đây là dạng đảo ngữ nào?',
      options: [
        { text: 'Đảo ngữ trợ động từ (Subject-Auxiliary Inversion) kích hoạt bởi trạng từ mang nghĩa phủ định/giới hạn đứng đầu câu', correct: true, rationale: 'Hardly đứng đầu câu kích hoạt đảo ngữ trợ động từ had lên trước chủ ngữ.' },
        { text: 'Đảo ngữ toàn phần vị trí (Locative Full Inversion)', correct: false, rationale: 'Không phải đảo ngữ vị trí không gian.' },
        { text: 'Đưa lên đầu câu không đảo ngữ (Topicalization without inversion)', correct: false, rationale: 'Câu có sự đảo vị trí của had và chủ ngữ.' },
      ],
      acceptedAnswers: [{ text: 'Đảo ngữ trợ động từ (Subject-Auxiliary Inversion) kích hoạt bởi trạng từ mang nghĩa phủ định/giới hạn đứng đầu câu', rationale: 'Đảo ngữ phủ định với trợ động từ.' }],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q5',
      kind: 'gap',
      prompt: 'Điền từ thích hợp để hoàn thiện cấu trúc câu chẻ nhấn mạnh phương thức: "It was by ___ the audit findings that the directors managed to conceal their insolvency for another fiscal year."',
      options: [],
      acceptedAnswers: [
        { text: 'suppressing', rationale: 'Suppressing the audit findings là hành vi che giấu kết quả kiểm toán được nhấn mạnh làm tiêu điểm.' },
        { text: 'withholding', rationale: 'Withholding diễn đạt việc ém nhẹm thông tin kiểm toán.' },
        { text: 'concealing', rationale: 'Concealing là phương thức che giấu thích hợp.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q6',
      kind: 'gap',
      prompt: 'Điền từ thích hợp hoàn thiện cấu trúc Wh-cleft: "___ strikes the discerning observer most is the complete absence of empirical safeguards."',
      options: [],
      acceptedAnswers: [
        { text: 'What', rationale: 'What mở đầu mệnh đề danh từ trong cấu trúc pseudo-cleft đóng vai trò Theme.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q7',
      kind: 'gap',
      prompt: 'Điền tính từ thích hợp đứng đầu câu để tạo cấu trúc đảo ngữ vị từ liên kết luận điểm: "___ to this constitutional doctrine is the inviolable principle of judicial independence."',
      options: [],
      acceptedAnswers: [
        { text: 'Fundamental', rationale: 'Fundamental to this doctrine là cụm tính từ mở đầu kinh điển trong đảo ngữ học thuật.' },
        { text: 'Central', rationale: 'Central to mang nghĩa then chốt tương đương.' },
        { text: 'Pivotal', rationale: 'Pivotal to biểu đạt vị trí trọng yếu.' },
        { text: 'Integral', rationale: 'Integral to biểu thị phần cấu thành không thể tách rời.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q8',
      kind: 'gap',
      prompt: 'Điền dạng động từ to be ở dạng đảo ngữ vị trí sau cụm giới từ nơi chốn: "Across the boundary river ___ two heavily fortified radar installations."',
      options: [],
      acceptedAnswers: [
        { text: 'stand', rationale: 'Stand hòa hợp với chủ ngữ số nhiều hai trạm radar ở cuối câu.' },
        { text: 'lay', rationale: 'Lay là quá khứ đơn của lie trong miêu tả địa hình.' },
        { text: 'were', rationale: 'Were là động từ to be số nhiều chuẩn xác.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang cấu trúc It-cleft để nhấn mạnh tác nhân duy nhất gây nên thất bại của dự án: "Faulty structural engineering caused the viaduct to collapse, not severe weather." -> "It was faulty structural engineering ___ caused the viaduct to collapse, not severe weather."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: 'That là từ nối chuẩn mực trong cấu trúc It-cleft.' },
        { text: 'which', rationale: 'Which đôi khi được chấp nhận trong văn cảnh trang trọng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q10',
      kind: 'transform',
      prompt: 'Tái cấu trúc câu sau bằng kỹ thuật Predicative Inversion để dồn thông tin chủ ngữ dài về vị trí End-Weight cuối câu: "The assumption that human behavior is entirely rational is central to neoclassical economics." -> "Central to neoclassical economics ___ the assumption that human behavior is entirely rational."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Đưa tính từ Central to... lên đầu câu và đảo động từ "is" lên trước chủ ngữ danh từ dài.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi trật tự từ trong câu đảo ngữ vị từ liên kết: "Crucial to the resolution of the dispute is was the willingness of both factions to disarm."',
      options: [],
      acceptedAnswers: [
        { text: 'Crucial to the resolution of the dispute was the willingness of both factions to disarm.', rationale: 'Loại bỏ từ thừa "is", giữ lại động từ quá khứ "was" đứng trước chủ ngữ.' },
        { text: 'was the willingness of both factions to disarm', rationale: 'Cụm vị ngữ và chủ ngữ chuẩn xác sau tính từ đảo ngữ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng trợ động từ sai trong đảo ngữ toàn phần sau cụm giới từ nơi chốn: "Behind the podium did stand three decorated ambassadors."',
      options: [],
      acceptedAnswers: [
        { text: 'Behind the podium stood three decorated ambassadors.', rationale: 'Đảo ngữ vị trí không gian (locative inversion) là đảo ngữ toàn phần: chuyển thẳng động từ chính "stood" lên trước chủ ngữ, tuyệt đối không dùng trợ động từ "did".' },
        { text: 'stood three decorated ambassadors', rationale: 'Động từ chính đứng trước chủ ngữ không mượn did.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-r1',
      kind: 'choice',
      prompt: 'Trong đoạn văn học thuật: "The treaty was intended to foster commerce. However, what it ultimately fostered was widespread agricultural dependency." Chức năng của cấu trúc Wh-cleft ở câu hai là gì?',
      options: [
        { text: 'Đóng gói điều hiệp ước tạo ra làm mỏ neo chủ đề, đồng thời dồn sự phụ thuộc nông nghiệp vào vị trí tiêu điểm chấn động cuối câu', correct: true, rationale: 'Pseudo-cleft giúp điều hướng nhận thức người đọc từ điều dự kiến sang hệ quả thực tế bất ngờ ở vị trí End-Focus.' },
        { text: 'Hỏi người đọc xem hiệp ước có thực sự thúc đẩy thương mại hay không', correct: false, rationale: 'Đây là câu trần thuật khẳng định, không phải câu hỏi tu từ.' },
        { text: 'Đơn giản hóa câu văn để học sinh tiểu học dễ hiểu', correct: false, rationale: 'Đây là cấu trúc diễn ngôn học thuật cao cấp.' },
      ],
      acceptedAnswers: [{ text: 'Đóng gói điều hiệp ước tạo ra làm mỏ neo chủ đề, đồng thời dồn sự phụ thuộc nông nghiệp vào vị trí tiêu điểm chấn động cuối câu', rationale: 'Wh-cleft điều hướng sự chú ý vào tiêu điểm cuối câu.' }],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-r2',
      kind: 'gap',
      prompt: 'Điền từ thích hợp để hoàn thiện cấu trúc đảo ngữ vị trí: "At the summit of the promontory ___ a solitary obelisk erected in memory of fallen mariners."',
      options: [],
      acceptedAnswers: [
        { text: 'stands', rationale: 'Stands hòa hợp với danh từ số ít solitary obelisk.' },
        { text: 'stood', rationale: 'Stood ở thì quá khứ đơn.' },
        { text: 'rises', rationale: 'Rises thể hiện đài kỷ niệm vươn cao hùng vĩ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-r3',
      kind: 'transform',
      prompt: 'Tái cấu trúc câu sau bằng It-cleft để làm nổi bật thời điểm diễn ra bước ngoặt: "The geopolitical paradigm shifted irreversibly only after the collapse of the currency union." -> "It was only after the collapse of the currency union ___ the geopolitical paradigm shifted irreversibly."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: 'That hoàn thiện cấu trúc It-cleft nhấn mạnh thời điểm.' },
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc trong câu đảo ngữ vị từ liên kết: "Essential to institutional stability does remain the rule of law."',
      options: [],
      acceptedAnswers: [
        { text: 'Essential to institutional stability remains the rule of law.', rationale: 'Đảo ngữ vị từ không sử dụng trợ động từ does; chuyển trực tiếp động từ "remains" lên trước chủ ngữ.' },
        { text: 'remains the rule of law', rationale: 'Động từ remains đứng trước chủ ngữ the rule of law mà không dùng trợ động từ does.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-o1',
      prompt: 'Viết một đoạn văn 3-4 câu trong bài phê bình chuyên khảo triết học chính trị. Áp dụng chuẩn mực các kỹ thuật đóng gói thông tin (topic-focus packaging): (1) một câu sử dụng Predicative Inversion (Central/Pivotal to... is...) để tạo mỏ neo với luận đề trước đó và dồn một chủ ngữ dài về cuối câu (End-Weight), và (2) một câu sử dụng cấu trúc It-cleft để làm nổi bật một tiêu điểm tương phản sắc bén.',
      modelAnswer: 'Pivotal to the monograph\'s overarching architecture is the provocative premise that democratic legitimacy cannot subsist on procedural electoral mechanisms alone. Many orthodox theorists have sought to locate the origin of modern civic alienation in economic disparity. Yet, as the author convincingly demonstrates, it is the erosion of institutional accountability rather than material deprivation that fuels populist insurgencies across Western democracies.',
      checks: [
        'Sử dụng chính xác Predicative Inversion (Pivotal to... is the provocative premise that...).',
        'Sử dụng chính xác It-cleft cho tiêu điểm tương phản (it is the erosion of... rather than... that fuels...).',
        'Tuân thủ chặt chẽ nguyên tắc Given-before-New và End-Weight xuyên suốt đoạn văn.',
      ],
    },
    {
      id: 'grammar-v2-c2-topic-focus-packaging-08-o2',
      prompt: 'Chuyển đổi một đoạn văn thô sơ, vụng về sau đây thành một đoạn văn học thuật trau chuốt, sử dụng kỹ thuật Fronting (Topicalization) và Wh-cleft (Pseudo-cleft) để tối ưu hóa mạch lạc Theme-Rheme: "The commission examined three contentious amendments. The commission completely rejected the first amendment. The commission recommended the establishment of an independent supervisory ombudsman above all else."',
      modelAnswer: 'The commission meticulously examined three contentious amendments. The first of these proposals the commissioners rejected without equivocation. What they recommended above all else, however, was the immediate establishment of an independent supervisory ombudsman to oversee statutory compliance.',
      checks: [
        'Sử dụng Fronting/Topicalization cho tân ngữ câu thứ hai (The first of these proposals the commissioners rejected...).',
        'Sử dụng Wh-cleft cho câu thứ ba (What they recommended above all else was...).',
        'Duy trì dòng chảy thông tin mạch lạc, uyển chuyển, xóa bỏ sự lặp lại cơ học của chủ ngữ.',
      ],
    },
  ],
  sources: [
    {
      id: 'halliday-functional-grammar',
      title: 'Halliday\'s Introduction to Functional Grammar (M.A.K. Halliday & Christian M.I.M. Matthiessen)',
      url: 'https://www.routledge.com/Hallidays-Introduction-to-Functional-Grammar/Halliday-Matthiessen/p/book/9780415826280',
      claims: ['Thiết lập lý thuyết về Cấu trúc Thông tin (Information Structure), dòng chảy Theme-Rheme và sự phân bổ Given-New trong mệnh đề tiếng Anh.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'lambrecht-information-structure',
      title: 'Information Structure and Sentence Form: Topic, Focus, and the Mental Representations of Discourse Referents (Knud Lambrecht)',
      url: 'https://www.cambridge.org/core/books/information-structure-and-sentence-form/6548BD14FB4157FA5BC0AC87B971B981',
      claims: ['Khảo sát toàn diện về các cấu trúc câu chẻ (clefts), đảo ngữ (inversion) và cách đóng gói thông tin theo nhận thức dụng học.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified Halliday & Lambrecht topic-focus framework, clefts, inversion, 16 exercises, outputs, and canonical sources.',
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
