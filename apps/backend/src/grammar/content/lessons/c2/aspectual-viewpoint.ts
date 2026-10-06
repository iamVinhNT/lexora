/**
 * @file aspectual-viewpoint.ts
 * @description C2 lesson on aspectual viewpoint: perfective vs imperfective framing, telicity, stative coercion, and discourse perspective.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-aspectual-viewpoint-06',
  revisionId: 'grammar-v2-c2-aspectual-viewpoint-06@1.0.0',
  revision: '1.0.0',
  title: 'Góc nhìn thể cách và tính hữu đích: Aspectual Viewpoint & Telicity',
  objective: 'Làm chủ lý thuyết góc nhìn thể cách (aspectual viewpoint) của Carlota Smith và Bernard Comrie: phân định giữa thể hoàn thành (perfective) và tiếp diễn (imperfective), kiểm soát hệ quả chân lý của tính hữu đích (telicity), và vận dụng hiện tượng cưỡng chế trạng thái (stative coercion) trong diễn ngôn pháp lý và phân tích cao cấp.',
  prerequisiteIds: ['grammar-v2-c2-historical-present-discourse-05'],
  coverage: ['aspectual-viewpoint', 'aspect', 'telicity', 'discourse-framing'],
  context: {
    english: 'A forensic linguist analyzes sworn depositions in a corporate embezzlement trial, demonstrating how the defense strategically uses imperfective framing to depict fraudulent transfers as incomplete operational deliberations rather than consummated offenses.',
    vietnamese: 'Một chuyên gia ngôn ngữ học pháp lý phân tích các bản khai có tuyên thệ trong vụ án biển thủ công quỹ, chứng minh cách luật sư bào chữa dùng góc nhìn thể tiếp diễn (imperfective) để miêu tả các khoản chuyển tiền gian lận như những cân nhắc chưa hoàn tất thay vì tội danh đã cấu thành trọn vẹn.',
  },
  guide: {
    pattern: 'Perfective Viewpoint (View from outside as a bounded whole: S + V_ed) vs Imperfective Viewpoint (View from inside an unfolding phase: S + was/were + V_ing) vs Stative Coercion (Dynamic subjective framing: S + be + stative_ing)',
    whenToUse: [
      'Điều khiển góc nhìn thời gian bên trong biến cố: coi sự việc như một chỉnh thể khép kín (perfective) hay mở ra tiến trình đang diễn ra (imperfective).',
      'Khai thác tính hữu đích (telicity) của vị ngữ để định đoạt giá trị pháp lý về việc mục tiêu đã đạt được hay chưa (consequence for truth conditions).',
      'Cưỡng chế động từ trạng thái sang thể tiếp diễn (stative coercion) để biểu đạt sự thay đổi tính chất nhất thời, tính chủ quan, hoặc sắc thái đánh giá tiêu cực (affective habitual).',
    ],
    signalWords: ['at that juncture', 'in the midst of', 'consummated', 'unfolding', 'continually', 'iteratively'],
    check: [
      'Ghi nhớ nghịch lý thể cách (imperfective paradox): với động từ hữu đích (telic verbs), câu tiếp diễn không suy ra câu hoàn thành ("He was crossing the street" KHÔNG đồng nghĩa với "He crossed the street").',
      'Phân biệt thói quen trung tính ở quá khứ đơn với thói quen mang sắc thái phàn nàn/chỉ trích khi kết hợp thể tiếp diễn với constantly/continually.',
      'Tránh lạm dụng thể tiếp diễn với động từ trạng thái trừ khi có chủ đích ngữ dụng nhấn mạnh tính tạm thời hoặc cường điệu hóa trải nghiệm.',
    ],
  },
  explanation: 'Ở trình độ C2, phạm trù thể (Aspect) được tiếp cận như một hệ thống lăng kính nhận thức (cognitive framing device) phản ánh cấu trúc thời gian nội tại của tình huống (internal temporal constituency). Theo lý thuyết hai thành tố của Carlota Smith, thể cách bao gồm: Situation Aspect (bản chất của hành động: trạng thái, hành động tức thời, quá trình hữu đích/vô đích) và Viewpoint Aspect (góc nhìn của người nói). Góc nhìn Perfective (hoàn thành) quan sát sự việc từ bên ngoài như một khối trọn vẹn có điểm khởi đầu và kết thúc xác định. Ngược lại, góc nhìn Imperfective/Progressive đưa người nghe vào bên trong quá trình, làm mờ đi ranh giới bắt đầu và kết thúc. Điều này dẫn tới hiện tượng "Nghịch lý thể cách" (The Imperfective Paradox): đối với các vị ngữ có đích đến xác định (telic accomplishments như "write the report", "transfer the funds"), việc dùng progressive ("The CFO was transferring the funds") ngụ ý hành động đang diễn ra và có thể đã bị chặn đứng trước khi hoàn tất, trong khi simple past ("The CFO transferred the funds") khẳng định tính pháp lý đã hoàn tất 100%. Ngoài ra, hiện tượng Stative Coercion (chuyển đổi động từ trạng thái như know, resemble, love sang thể tiếp diễn) là công cụ tinh vi để biểu thị sự chuyển biến nhận thức nhất thời hoặc cảm xúc chủ quan mãnh liệt.',
  examples: [
    {
      english: 'The defendant was transferring the offshore funds when the regulatory compliance freeze intervened.',
      vietnamese: 'Bị cáo đang thực hiện chuyển các khoản tiền ra nước ngoài thì lệnh phong tỏa của cơ quan kiểm soát can thiệp. (Imperfective view: hành động hữu đích bị gián đoạn, đích đến chưa hoàn tất).',
    },
    {
      english: 'The defendant transferred the offshore funds prior to the audit notification.',
      vietnamese: 'Bị cáo đã chuyển các khoản tiền ra nước ngoài trước thông báo kiểm toán. (Perfective view: hành vi đã hoàn thành trọn vẹn như một sự thật pháp lý xác lập).',
    },
    {
      english: 'The board is currently having serious misgivings about the veracity of the quarterly disclosures.',
      vietnamese: 'Hội đồng quản trị hiện đang có những ngờ vực nghiêm trọng về tính xác thực của các công bố thông tin quý. (Stative coercion: động từ trạng thái "have misgivings" chuyển sang tiếp diễn nhấn mạnh sự dâng trào nhất thời).',
    },
    {
      english: 'The chief executive was continually downplaying balance-sheet liabilities during investor calls.',
      vietnamese: 'Tổng giám đốc liên tục giảm nhẹ mức độ nghiêm trọng của các khoản nợ trên bảng cân đối kế toán trong các cuộc gọi với nhà đầu tư. (Affective progressive: thể tiếp diễn kết hợp continually thể hiện sự chỉ trích gay gắt đối với thói quen tiêu cực).',
    },
    {
      english: 'The historic treaty had been unravelling for months before the formal declaration of hostilities.',
      vietnamese: 'Hiệp ước lịch sử đã và đang rạn nứt trong suốt nhiều tháng trước khi diễn ra tuyên bố thù địch chính thức. (Past perfect continuous: đóng khung quá trình rạn nứt kéo dài làm nền tảng cho biến cố kết liễu).',
    },
    {
      english: 'With each revised draft, the author is sounding increasingly disillusioned with the political establishment.',
      vietnamese: 'Qua từng bản thảo sửa đổi, tác giả nghe ngày càng có vẻ vỡ mộng đối với giới tinh hoa chính trị. (Dynamicized perception verb: "sound" dùng tiếp diễn chỉ sự biến đổi tâm lý tiệm tiến).',
    },
  ],
  contrasts: [
    {
      form: 'The suspect drowned vs The suspect was drowning',
      whyFits: 'The suspect drowned khẳng định biến cố đã hoàn tất và nạn nhân đã tử vong (telic achievement consummated); The suspect was drowning chỉ phản ánh tiến trình đang diễn ra, cho phép khả năng nạn nhân đã được cứu thoát kịp thời.',
      whyNot: 'Không được dùng câu hoàn thành (drowned) trong cáo trạng khi nghi can chỉ suýt chìm và còn sống sót.',
    },
    {
      form: 'The director repeatedly adjusted the forecast vs The director was continually adjusting the forecast',
      whyFits: 'Repeatedly adjusted là tường thuật khách quan về tần suất hành động; was continually adjusting mang sắc thái cảm xúc (affective stance) biểu thị sự bực bội, ngờ vực hoặc chỉ trích hành vi tùy tiện của giám đốc.',
      whyNot: 'Trong báo cáo thống kê khách quan, tránh dùng was continually adjusting để không bị coi là mang định kiến thiên vị.',
    },
  ],
  commonMistakes: [
    'Đồng nhất hóa việc dùng thể tiếp diễn với việc mục tiêu của hành động đã đạt được (vi phạm nghịch lý thể cách trong phân tích pháp lý).',
    'Dùng thể tiếp diễn với động từ trạng thái thuần túy một cách tùy tiện mà không có ngụ ý về tính tạm thời hoặc biến đổi tiệm tiến (ví dụ: *The contract is containing an indemnity clause -> contains).',
    'Bỏ qua sắc thái phán xét đạo đức/thái độ tiêu cực khi dùng progressive với các trạng từ như "always", "constantly", "continually".',
  ],
  summary: 'Góc nhìn thể cách (Aspectual Viewpoint) cho phép người nói đóng khung biến cố dưới dạng chỉnh thể khép kín hoặc tiến trình nội tại, trực tiếp định đoạt hệ quả chân lý và sắc thái cảm xúc trong diễn ngôn.',
  exercises: [
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q1',
      kind: 'choice',
      prompt: 'Trong vụ kiện vi phạm bản quyền: "The architect was designing the civic pavilion when the municipality revoked the tender." Phát biểu nào phản ánh đúng hệ quả chân lý (truth condition) của câu?',
      options: [
        { text: 'Bản thiết kế chưa chắc đã được hoàn thành trọn vẹn tại thời điểm dự thầu bị hủy bỏ', correct: true, rationale: 'Do tính chất hữu đích (telic accomplishment) kết hợp imperfective viewpoint, hành động bị gián đoạn giữa chừng nên chưa đạt đích kết thúc.' },
        { text: 'Bản thiết kế chắc chắn đã được bàn giao và nghiệm thu đầy đủ', correct: false, rationale: 'Nếu đã hoàn tất, người nói phải dùng perfective simple: designed / had designed.' },
        { text: 'Kiến trúc sư đã từ chối thiết kế ngay từ ban đầu', correct: false, rationale: 'Tiến trình thiết kế đã thực sự diễn ra.' },
      ],
      acceptedAnswers: [{ text: 'Bản thiết kế chưa chắc đã được hoàn thành trọn vẹn tại thời điểm dự thầu bị hủy bỏ', rationale: 'Nghịch lý thể cách: tiếp diễn không bảo đảm đạt tới đích của hành động hữu đích.' }],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q2',
      kind: 'choice',
      prompt: 'Xét câu: "The auditor was constantly altering the sampling methodology throughout the investigation." Sắc thái ngữ dụng của cấu trúc "was constantly altering" là gì?',
      options: [
        { text: 'Thể hiện thái độ phê phán, bực bội hoặc hoài nghi về sự thiếu nhất quán của kiểm toán viên (affective stance)', correct: true, rationale: 'Progressive kết hợp constantly/continually là phương tiện kinh điển để thể hiện lập trường cảm xúc tiêu cực đối với một hành vi lặp lại.' },
        { text: 'Tường thuật khách quan về một phương pháp luận khoa học linh hoạt được tán dương', correct: false, rationale: 'Khách quan khoa học sẽ dùng thì quá khứ đơn trung tính: altered the methodology periodically.' },
        { text: 'Khẳng định kiểm toán viên chỉ thay đổi phương pháp đúng một lần duy nhất', correct: false, rationale: 'Constantly chỉ sự lặp đi lặp lại nhiều lần.' },
      ],
      acceptedAnswers: [{ text: 'Thể hiện thái độ phê phán, bực bội hoặc hoài nghi về sự thiếu nhất quán của kiểm toán viên (affective stance)', rationale: 'Cấu trúc tiếp diễn mang sắc thái cảm xúc chỉ trích.' }],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q3',
      kind: 'choice',
      prompt: 'Trường hợp nào sau đây là ví dụ chuẩn xác của hiện tượng cưỡng chế trạng thái (stative coercion) để biểu đạt sự biến đổi tiệm tiến?',
      options: [
        { text: 'The witness is resembling her sister more and more as she matures.', correct: true, rationale: 'Động từ trạng thái resemble được dùng ở thể tiếp diễn kết hợp "more and more" để biểu đạt sự biến đổi tiệm tiến sống động.' },
        { text: 'The treaty is containing thirty-four supplementary articles.', correct: false, rationale: 'Đây là lỗi ngữ pháp; contain chỉ thuộc tính tĩnh vĩnh viễn, không thể dùng tiếp diễn.' },
        { text: 'The diamond is belonging to the national trust.', correct: false, rationale: 'Belong là quan hệ sở hữu tuyệt đối, không chấp nhận thể tiếp diễn.' },
      ],
      acceptedAnswers: [{ text: 'The witness is resembling her sister more and more as she matures.', rationale: 'Stative coercion diễn đạt sự biến đổi tiệm tiến.' }],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q4',
      kind: 'choice',
      prompt: 'Sự khác biệt cốt lõi giữa góc nhìn Perfective (Simple Past) và Imperfective (Past Progressive) khi tường thuật một vụ nổ là gì?',
      options: [
        { text: 'Perfective đóng khung vụ nổ như một sự kiện đơn lẻ trọn vẹn; Imperfective mở rộng khoảnh khắc để miêu tả các chi tiết đang xảy ra đồng thời', correct: true, rationale: 'Perfective nhìn từ ngoài như một biến cố khép kín; Imperfective đưa người nghe vào tâm điểm vụ nổ đang diễn ra.' },
        { text: 'Perfective chỉ xảy ra trong quá khứ xa; Imperfective chỉ xảy ra vào tuần trước', correct: false, rationale: 'Thể không quy định khoảng cách thời gian deictic.' },
        { text: 'Perfective luôn sai về mặt ngữ pháp khi kể chuyện', correct: false, rationale: 'Perfective là trục xương sống của mọi chuỗi tự sự.' },
      ],
      acceptedAnswers: [{ text: 'Perfective đóng khung vụ nổ như một sự kiện đơn lẻ trọn vẹn; Imperfective mở rộng khoảnh khắc để miêu tả các chi tiết đang xảy ra đồng thời', rationale: 'Góc nhìn bên ngoài chỉnh thể vs góc nhìn tiến trình nội tại.' }],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q5',
      kind: 'gap',
      prompt: 'Điền trạng từ phù hợp để biến hành vi lặp lại thành cấu trúc mang sắc thái phàn nàn/chỉ trích gay gắt: "The CFO was ___ shifting accounting provisions to conceal operating losses."',
      options: [],
      acceptedAnswers: [
        { text: 'continually', rationale: 'Continually kết hợp progressive thể hiện sự chỉ trích hành vi lặp đi lặp lại.' },
        { text: 'constantly', rationale: 'Constantly là trạng từ phổ biến nhất trong cấu trúc affective progressive.' },
        { text: 'perpetually', rationale: 'Perpetually diễn tả sự việc xảy ra liên miên gây bức xúc.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q6',
      kind: 'gap',
      prompt: 'Điền dạng động từ thích hợp thể hiện quá trình đang diễn tiến nhưng chưa kết thúc: "The research team was ___ the clinical trial when the regulatory ban took effect."',
      options: [],
      acceptedAnswers: [
        { text: 'conducting', rationale: 'Was conducting đóng khung tiến trình đang diễn ra trước khi bị ngắt quãng.' },
        { text: 'completing', rationale: 'Was completing thể hiện đang trong giai đoạn hoàn thiện nhưng chưa cán đích.' },
        { text: 'finalizing', rationale: 'Was finalizing thể hiện tiến trình về đích chưa khép lại.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q7',
      kind: 'gap',
      prompt: 'Điền dạng động từ to be ở hiện tại tiếp diễn nhằm thể hiện hành vi giả vờ/nhất thời của chủ ngữ: "The defendant is ___ unusually cooperative today, in stark contrast to his earlier defiance."',
      options: [],
      acceptedAnswers: [
        { text: 'being', rationale: 'Is being + adj diễn đạt hành vi biểu hiện nhất thời có chủ ý, thay vì bản chất cố hữu.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q8',
      kind: 'gap',
      prompt: 'Điền phân từ thích hợp để hoàn thiện câu miêu tả trạng thái nhận thức đang biến đổi: "The international community is gradually ___ to the grim reality of climate migration."',
      options: [],
      acceptedAnswers: [
        { text: 'waking', rationale: 'Waking to the reality thể hiện sự chuyển biến nhận thức tiệm tiến.' },
        { text: 'awakening', rationale: 'Awakening mang đăng thức trang trọng học thuật tương đương.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q9',
      kind: 'transform',
      prompt: 'Chuyển câu tường thuật trung tính sang câu thể hiện sự chỉ trích gay gắt đối với thói quen tắc trách dùng thể tiếp diễn: "The subcontractor regularly missed safety deadlines." -> "The subcontractor was ___ safety deadlines."',
      options: [],
      acceptedAnswers: [
        { text: 'constantly missing', rationale: 'Was constantly missing tạo nên sắc thái chỉ trích mạnh mẽ.' },
        { text: 'continually missing', rationale: 'Was continually missing biểu đạt thái độ bức xúc của người nói.' },
        { text: 'perpetually missing', rationale: 'Was perpetually missing nhấn mạnh sự tái diễn triền miên.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q10',
      kind: 'transform',
      prompt: 'Chuyển nhận định khẳng định hành động đã hoàn tất trọn vẹn sang góc nhìn tiến trình chưa chắc hoàn thành tại thời điểm thanh tra can thiệp: "The clerk forged the title deed." -> "The clerk ___ the title deed when inspectors entered."',
      options: [],
      acceptedAnswers: [
        { text: 'was forging', rationale: 'Was forging chuyển đổi từ perfective sang imperfective, giữ ngỏ khả năng việc làm giả chưa hoàn tất.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi lạm dụng thể tiếp diễn với động từ trạng thái sở hữu cố định trong bản hợp đồng: "The subsidiary company is owning four prime commercial properties in London."',
      options: [],
      acceptedAnswers: [
        { text: 'owns', rationale: 'Own là động từ trạng thái sở hữu pháp lý tĩnh, không thể chia tiếp diễn trong ngữ cảnh này.' },
        { text: 'The subsidiary company owns four prime commercial properties in London.', rationale: 'Câu hoàn chỉnh dùng thì hiện tại đơn.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-q12',
      kind: 'correction',
      prompt: 'Sửa câu sau trong báo cáo khách quan để loại bỏ sắc thái thiên vị cảm tính: "The central bank was constantly tinkering with the reserve ratio."',
      options: [],
      acceptedAnswers: [
        { text: 'adjusted the reserve ratio periodically', rationale: 'Thay thế cấu trúc cảm tính (was constantly tinkering) bằng miêu tả kỹ thuật khách quan.' },
        { text: 'periodically adjusted the reserve ratio', rationale: 'Phương án tường thuật trung tính chuẩn mực.' },
        { text: 'The central bank periodically adjusted the reserve ratio.', rationale: 'Câu hoàn chỉnh tường thuật trung tính khách quan.' },
        { text: 'The central bank adjusted the reserve ratio periodically.', rationale: 'Phương án câu hoàn chỉnh đưa trạng từ ra cuối.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-r1',
      kind: 'choice',
      prompt: 'Trong phần tranh tụng: "The captain was navigating the vessel through the shoal when the rudder jammed." Luật sư biện hộ có thể dùng cấu trúc thể cách này để lập luận điều gì?',
      options: [
        { text: 'Thuyền trưởng đang trong tiến trình xử lý và chưa kịp hoàn thành thao tác an toàn trước khi xảy ra sự cố cơ học bất khả kháng', correct: true, rationale: 'Imperfective viewpoint nhấn mạnh sự kiện đang diễn tiến dang dở và bị ngắt quãng bởi yếu tố ngoại cảnh.' },
        { text: 'Thuyền trưởng đã bỏ vị trí lái tàu và đi ngủ trước khi xảy ra tai nạn', correct: false, rationale: 'Câu khẳng định thuyền trưởng đang tích cực điều khiển tàu.' },
        { text: 'Tàu đã vượt qua bãi cạn an toàn rồi mới bị hỏng bánh lái', correct: false, rationale: 'Rudder jammed xảy ra ngay giữa tiến trình navigating.' },
      ],
      acceptedAnswers: [{ text: 'Thuyền trưởng đang trong tiến trình xử lý và chưa kịp hoàn thành thao tác an toàn trước khi xảy ra sự cố cơ học bất khả kháng', rationale: 'Khai thác khía cạnh tiến trình chưa hoàn tất để phân định trách nhiệm.' }],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-r2',
      kind: 'gap',
      prompt: 'Điền dạng tiếp diễn của động từ nhận thức để thể hiện sự dao động tâm lý nhất thời: "The prime minister is ___ second thoughts about the constitutional referendum."',
      options: [],
      acceptedAnswers: [
        { text: 'having', rationale: 'Is having second thoughts thể hiện trạng thái dao động nội tâm đang dâng trào.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-r3',
      kind: 'transform',
      prompt: 'Chuyển nhận định tĩnh về tính cách sang miêu tả hành vi tạm thời trong ngày hôm nay: "He is stubborn." -> "He is ___ stubborn today."',
      options: [],
      acceptedAnswers: [
        { text: 'being', rationale: 'Is being thể hiện hành vi cư xử bất thường nhất thời, phân biệt với tính cách cố hữu.' },
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng thể trong văn bản phân tích dữ liệu tĩnh: "This database is containing records of all transactions executed in 2025."',
      options: [],
      acceptedAnswers: [
        { text: 'contains', rationale: 'Contain diễn tả nội dung chứa đựng tĩnh tại, phải dùng hiện tại đơn.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-o1',
      prompt: 'Viết một đoạn văn 3-4 câu trong bản tóm tắt tranh tụng pháp lý (legal brief), phân tích sự đối lập giữa hai phát ngôn của nhân chứng: (1) "The suspect wrote the fraudulent email" (perfective) và (2) "The suspect was writing the fraudulent email" (imperfective). Làm rõ hệ quả pháp lý của tính hữu đích (telicity) đối với việc cấu thành hành vi phạm tội.',
      modelAnswer: 'The semantic distinction between the two depositions carries decisive legal consequences regarding criminal consummation. The perfective assertion—"The suspect wrote the fraudulent email"—denotes a telic accomplishment brought to completion, establishing that the deceptive communication was fully composed and dispatched. Conversely, the imperfective framing—"The suspect was writing the fraudulent email"—merely situates the agent within an unfolding process, leaving open the vital possibility that the transmission was aborted prior to execution.',
      checks: [
        'Phân tích chuẩn xác sự khác biệt giữa perfective (biến cố hoàn tất) và imperfective (tiến trình đang diễn ra).',
        'Vận dụng chính xác khái niệm tính hữu đích (telic accomplishment) và hệ quả chân lý pháp lý.',
        'Sử dụng thuật ngữ ngôn ngữ học và pháp lý chuẩn C2.',
      ],
    },
    {
      id: 'grammar-v2-c2-aspectual-viewpoint-06-o2',
      prompt: 'Viết một đoạn văn 3 câu miêu tả diễn biến tâm lý của một nhà đàm phán trong phòng họp kín, trong đó sử dụng: (1) một cấu trúc stative coercion (động từ trạng thái chia tiếp diễn để chỉ trạng thái nhất thời), và (2) một cấu trúc affective progressive với continually/constantly để biểu đạt sự bất mãn đối với đối phương.',
      modelAnswer: 'As the midnight deadline approached, the chief envoy was having serious doubts regarding the sincerity of the opposing delegation. Her counterparts were continually shifting the agreed baseline parameters, eroding months of arduous diplomatic groundwork. She remained stone-faced, determined not to betray the mounting exasperation threatening to derail the summit.',
      checks: [
        'Sử dụng chính xác stative coercion (was having serious doubts).',
        'Sử dụng chính xác affective progressive (were continually shifting the agreed baseline parameters).',
        'Văn phong mạch lạc, giàu sức gợi và biểu đạt cảm xúc tinh tế.',
      ],
    },
  ],
  sources: [
    {
      id: 'smith-parameter-aspect',
      title: 'The Parameter of Aspect (Carlota S. Smith)',
      url: 'https://link.springer.com/book/10.1007/978-94-011-5606-6',
      claims: ['Phát triển lý thuyết hai thành tố của thể cách: Situation Aspect và Viewpoint Aspect (Perfective, Imperfective, Neutral).'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'comrie-aspect',
      title: 'Aspect: An Introduction to the Study of Verbal Aspect and Related Problems (Bernard Comrie)',
      url: 'https://www.cambridge.org/core/books/aspect/2C770E8C78FA0BDE91F939DDF5A5CE18',
      claims: ['Khảo sát toàn diện sự đối lập giữa perfective và imperfective, bản chất của tính hữu đích và cấu trúc thời gian nội tại.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified aspectual viewpoint, telicity, stative coercion, 16 exercises, outputs, and canonical sources.',
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
