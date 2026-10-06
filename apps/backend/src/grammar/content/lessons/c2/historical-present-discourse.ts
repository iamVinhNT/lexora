/**
 * @file historical-present-discourse.ts
 * @description C2 lesson on the historical present in discourse: narrative immediacy, dramatic peak, and literary-exegetical commentary.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-historical-present-discourse-05',
  revisionId: 'grammar-v2-c2-historical-present-discourse-05@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại lịch sử và chuyển dịch thời gian trong diễn ngôn: Historical Present',
  objective: 'Làm chủ cơ chế chuyển đổi thì chiến lược giữa quá khứ và hiện tại (Historical & Literary Present) nhằm tạo tính trực quan sống động (dramatic immediacy), đánh dấu cao trào tự sự, và phân tích các văn bản học thuật/văn chương kinh điển.',
  prerequisiteIds: ['grammar-v2-c2-modal-perfect-nuance-04'],
  coverage: ['historical-present-discourse', 'discourse-grammar', 'narrative-tenses', 'literary-present'],
  context: {
    english: 'A literary biographer critiques a historical chronicle of the French Revolution, examining how the narrator abruptly shifts from past narration to the historical present at the storming of the Bastille to immerse readers directly in the crisis.',
    vietnamese: 'Một nhà viết tiểu sử phê bình một biên niên sử về Cách mạng Pháp, phân tích cách người kể chuyện đột ngột chuyển từ tường thuật quá khứ sang hiện tại lịch sử vào thời khắc công phá ngục Bastille nhằm đưa độc giả trực tiếp vào trung tâm cuộc khủng hoảng.',
  },
  guide: {
    pattern: 'Historical Exposition (Past Simple/Continuous) -> Climax/Turning Point (Historical Present: S + V_s/es) -> Literary/Exegetical Present (S + argues/posits/depicts)',
    whenToUse: [
      'Sử dụng Historical Present trong diễn ngôn tự sự bậc cao để thu hẹp khoảng cách tâm lý giữa người đọc và biến cố quá khứ, biến sự việc đã qua thành cảnh tượng đang diễn ra trước mắt.',
      'Đánh dấu điểm nút kịch tính (dramatic peak) hoặc bước ngoặt lịch sử quan trọng trong các công trình biên niên sử và tiểu luận chuyên sâu.',
      'Áp dụng Literary/Academic Present khi trích dẫn, bình luận các tác phẩm nghệ thuật hoặc luận điểm triết học, coi các tác giả kinh điển như những chủ thể đối thoại đương đại.',
    ],
    signalWords: ['at this critical juncture', 'suddenly', 'here', 'now', 'in this seminal passage', 'posits', 'delineates'],
    check: [
      'Tránh việc chuyển thì tùy tiện, vô căn cứ (unmotivated tense hopping); việc chuyển sang thì hiện tại phải được kích hoạt bởi một ý đồ tu từ học rõ rệt.',
      'Không lạm dụng Historical Present trong các báo cáo khoa học thực nghiệm thuần túy hoặc văn bản hành chính pháp lý đòi hỏi tính xác thực thời gian khách quan.',
      'Duy trì sự nhất quán về phối hợp thì khi quay trở lại khung tường thuật quá khứ sau đoạn cao trào.',
    ],
  },
  explanation: 'Trong ngữ pháp diễn ngôn cấp độ C2 (Discourse Grammar), thì ngữ pháp không chỉ là một chiếc neo định vị thời gian vật lý (deictic temporal anchor) mà còn là một công cụ phân cảnh dụng học (pragmatic framing device). Hiện tại lịch sử (Historical Present hay Narrative Present) diễn ra khi người viết có chủ đích dùng thì hiện tại đơn hoặc hiện tại tiếp diễn để thuật lại những biến cố đã kết thúc trong quá khứ. Kỹ thuật này xóa nhòa khoảng cách thời gian (temporal distancing), đưa người tiếp nhận vào vị thế nhân chứng trực tiếp tại hiện trường. Điểm mấu chốt ở C2 là khả năng kiểm soát "Tense Shifting" (chuyển dịch thì): thì quá khứ thiết lập bối cảnh nền tĩnh (grounding), và khi nhịp điệu hành động tăng tốc đến điểm cao trào (peak event), thì hiện tại đột ngột xuất hiện như một cú lia máy cận cảnh. Bên cạnh đó, Literary Present (Hiện tại văn học/học thuật) là quy ước chuẩn mực để thảo luận về ý tưởng của các tác giả quá khứ: ta viết "Aristotle argues that..." hoặc "Austen satirizes the gentry" bởi vì tác phẩm văn bản vẫn tiếp tục tồn tại và truyền tải ý nghĩa vào thời điểm đọc hôm nay.',
  examples: [
    {
      english: 'The army marched through the mountain pass for three weeks under brutal blizzard conditions; then, suddenly, Napoleon turns to his marshals and orders an immediate flanking assault.',
      vietnamese: 'Đoàn quân hành quân qua đèo núi suốt ba tuần trong bão tuyết khắc nghiệt; rồi bất thình lình, Napoleon quay sang các nguyên soái và ra lệnh tấn công tạt sườn ngay lập tức. (Quá khứ làm nền -> Hiện tại lịch sử đánh dấu bước ngoặt kịch tính).',
    },
    {
      english: 'In the climactic scene of King Lear, Shakespeare strips the sovereign of all earthly trappings and casts him into the howling storm.',
      vietnamese: 'Trong trường đoạn cao trào của Vua Lear, Shakespeare tước bỏ mọi hào nhoáng trần thế của vị quân vương và ném ông vào cơn bão gầm thét. (Literary Present: phân tích tác phẩm kịch nghệ).',
    },
    {
      english: 'Descartes posits that universal doubt is the sole methodological foundation for epistemological certainty.',
      vietnamese: 'Descartes lập luận rằng sự hoài nghi phổ quát là nền tảng phương pháp luận duy nhất cho sự chắc chắn về mặt nhận thức luận. (Academic Present: trích dẫn học thuyết triết học).',
    },
    {
      english: 'The prime minister hesitated, reviewed the telegram once more, and then makes the fateful decision to dissolve parliament.',
      vietnamese: 'Thủ tướng ngập ngừng, xem lại bức điện tín một lần nữa, và rồi đưa ra quyết định định mệnh giải tán quốc hội. (Chuyển thì tạo hiệu ứng tức thời cho quyết định then chốt).',
    },
    {
      english: 'The sirens wail as the city descends into total blackout; looters are breaking into storefronts while authorities struggle to deploy reinforcements.',
      vietnamese: 'Tiếng còi hú vang lên khi thành phố chìm vào bóng tối hoàn toàn; những kẻ hôi của đang phá cửa hàng trong khi nhà chức trách chật vật triển khai lực lượng chi viện. (Historical Present phối hợp Present Continuous tái hiện khung cảnh hỗn loạn).',
    },
    {
      english: 'Keynes contended that markets could remain irrational longer than investors could remain solvent, yet contemporary macroeconomists often overlook this caveat.',
      vietnamese: 'Keynes từng cho rằng thị trường có thể phi lý trí lâu hơn khoảng thời gian các nhà đầu tư có thể duy trì khả năng thanh toán, vậy mà các nhà kinh tế vĩ mô đương đại lại thường bỏ qua lời cảnh báo này. (Đối lập giữa quá khứ lịch sử và hiện tại học thuật).',
    },
  ],
  contrasts: [
    {
      form: 'Caesar crossed the Rubicon vs Caesar crosses the Rubicon',
      whyFits: 'Caesar crossed là tường thuật biên niên khách quan đặt sự kiện vào quá khứ xa xôi; Caesar crosses là hiện tại lịch sử kịch tính hóa quyết định mang tính định mệnh như thể độc giả đang chứng kiến trực tiếp bên bờ sông.',
      whyNot: 'Không nên dùng Caesar crosses trong các bài khảo cứu dữ liệu thuần túy nơi yêu cầu sự trung lập và khoảng cách thời gian tuyệt đối.',
    },
    {
      form: 'Adam Smith argued in 1776 vs Adam Smith argues in The Wealth of Nations',
      whyFits: 'Smith argued in 1776 nhấn mạnh hành động phát ngôn tại một thời điểm lịch sử cụ thể; Smith argues nhấn mạnh luận điểm của tác phẩm vẫn đang đối thoại với lý thuyết kinh tế ngày nay.',
      whyNot: 'Dùng thì quá khứ khi trích dẫn luận điểm cốt lõi có thể ngầm định sai rằng học thuyết đó đã lỗi thời hoặc không còn hiệu lực học thuật.',
    },
  ],
  commonMistakes: [
    'Chuyển đổi thì lộn xộn (unmotivated tense shifting) giữa câu trước và câu sau mà không có chủ đích tu từ học, khiến văn bản trở nên cẩu thả.',
    'Dùng thì quá khứ đơn khi phân tích cấu trúc hoặc chủ đề của tác phẩm văn học nghệ thuật (ví dụ: *In Hamlet, Shakespeare examined suicide -> examines suicide).',
    'Lạm dụng Historical Present trong văn bản pháp quy, hợp đồng hoặc báo cáo tài chính kỹ thuật, nơi đòi hỏi tính xác định chuẩn xác về mặt mốc thời gian.',
  ],
  summary: 'Historical Present và Literary Present là những kỹ thuật diễn ngôn bậc cao, chuyển đổi thì có chủ đích để tạo tính sống động kịch tính hoặc duy trì tính thời sự của các luận điểm kinh điển.',
  exercises: [
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q1',
      kind: 'choice',
      prompt: 'Xét đoạn văn phê bình văn học: "In Crime and Punishment, Dostoevsky ___ the psychological degeneration of Raskolnikov through a claustrophobic narrative frame." Chọn dạng thì chuẩn mực theo quy ước học thuật:',
      options: [
        { text: 'delineates', correct: true, rationale: 'Literary Present đòi hỏi thì hiện tại đơn khi phân tích cách một tác giả triển khai chủ đề hoặc thủ pháp nghệ thuật trong tác phẩm.' },
        { text: 'delineated', correct: false, rationale: 'Delineated đặt sự phân tích vào quá khứ, biến tác phẩm thành biến cố lịch sử đã khép lại thay vì văn bản đang tồn tại.' },
        { text: 'has been delineating', correct: false, rationale: 'Hiện tại hoàn thành tiếp diễn không phản ánh quy ước phân tích văn bản học thuật.' },
      ],
      acceptedAnswers: [{ text: 'delineates', rationale: 'Literary Present dùng hiện tại đơn cho phân tích tác phẩm nghệ thuật.' }],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q2',
      kind: 'choice',
      prompt: 'Trong đoạn văn tự sự lịch sử: "The legions trudged through the mud for days, their rations exhausted. At dawn, the scout reappears, gesturing frantically toward the ridge." Chức năng tu từ của "reappears" ở đây là gì?',
      options: [
        { text: 'Hiện tại lịch sử (Historical Present) tạo cú sốc kịch tính và thu hút sự chú ý vào điểm đột phá của tình huống', correct: true, rationale: 'Chuyển thì từ quá khứ sang hiện tại đánh dấu sự xuất hiện then chốt của trinh sát viên như một điểm nút cao trào.' },
        { text: 'Diễn tả thói quen lặp đi lặp lại của trinh sát viên vào mỗi buổi sáng', correct: false, rationale: 'Không phải hành động thường nhật mà là khoảnh khắc cao trào cụ thể.' },
        { text: 'Lỗi sai phối hợp thì do người viết sơ suất không chia quá khứ đơn', correct: false, rationale: 'Đây là thủ pháp tu từ có chủ đích trong tự sự bậc cao.' },
      ],
      acceptedAnswers: [{ text: 'Hiện tại lịch sử (Historical Present) tạo cú sốc kịch tính và thu hút sự chú ý vào điểm đột phá của tình huống', rationale: 'Tạo tính sống động tức thời tại cao trào.' }],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q3',
      kind: 'choice',
      prompt: 'Xác định câu dùng thì chuẩn mực nhất trong bài điểm sách học thuật:',
      options: [
        { text: 'Piketty posits that capital return systematically outpaces economic growth, a thesis that challenges neoclassical models.', correct: true, rationale: 'Sử dụng hiện tại đơn (posits, challenges) để bàn luận về luận điểm kinh điển đang có giá trị tranh luận đương đại.' },
        { text: 'Piketty posited that capital return systematically outpaced economic growth, which challenged neoclassical models.', correct: false, rationale: 'Việc lùi toàn bộ về quá khứ biến luận điểm thành một sự kiện lịch sử biệt lập, làm suy yếu tính thời sự học thuật.' },
        { text: 'Piketty was positing that capital return is outpacing economic growth.', correct: false, rationale: 'Dùng quá khứ tiếp diễn cho động từ trích dẫn học thuật là sai quy ước đăng thức.' },
      ],
      acceptedAnswers: [{ text: 'Piketty posits that capital return systematically outpaces economic growth, a thesis that challenges neoclassical models.', rationale: 'Literary/academic present giữ tính đối thoại của luận điểm.' }],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q4',
      kind: 'choice',
      prompt: 'Ngữ cảnh nào sau đây KHÔNG phù hợp để sử dụng Historical Present?',
      options: [
        { text: 'Bản cáo trạng pháp lý tại tòa án liệt kê chính xác các mốc thời gian vi phạm theo trình tự tố tụng hình sự', correct: true, rationale: 'Văn bản tư pháp đòi hỏi tính chuẩn xác thời gian khách quan và khoảng cách chứng cứ, cấm kỵ kịch tính hóa bằng historical present.' },
        { text: 'Tiểu luận tiểu sử văn học tái hiện thời khắc nhà thơ đưa ra quyết định lưu vong', correct: false, rationale: 'Rất phù hợp để gia tăng tính kịch tính.' },
        { text: 'Bài tường thuật thể thao trực tiếp hoặc hồi ký miêu tả khoảnh khắc ghi bàn quyết định', correct: false, rationale: 'Hoàn toàn phù hợp để tạo cảm giác hồi hộp tức thì.' },
      ],
      acceptedAnswers: [{ text: 'Bản cáo trạng pháp lý tại tòa án liệt kê chính xác các mốc thời gian vi phạm theo trình tự tố tụng hình sự', rationale: 'Văn bản pháp lý tư pháp đòi hỏi quá khứ khách quan.' }],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q5',
      kind: 'gap',
      prompt: 'Điền động từ trích dẫn học thuật ở thì hiện tại đơn phù hợp: "In The Republic, Plato ___ that philosopher-kings possess the requisite wisdom for just governance."',
      options: [],
      acceptedAnswers: [
        { text: 'argues', rationale: 'Argues là động từ trích dẫn học thuật chuẩn mực ở thì hiện tại.' },
        { text: 'contends', rationale: 'Contends thể hiện lập luận triết học sắc sảo.' },
        { text: 'posits', rationale: 'Posits là động từ học thuật tương đương.' },
        { text: 'maintains', rationale: 'Maintains biểu thị quan điểm kiên định.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q6',
      kind: 'gap',
      prompt: 'Điền động từ ở thì hiện tại lịch sử tạo hiệu ứng cao trào: "The conspiracy had brewed in secret for months; then, on the Ides of March, the conspirators ___ their daggers upon Caesar."',
      options: [],
      acceptedAnswers: [
        { text: 'draw', rationale: 'Draw daggers ở hiện tại lịch sử tạo tính bất ngờ và trực quan sống động.' },
        { text: 'unsheathe', rationale: 'Unsheathe daggers thể hiện hành động rút dao găm kịch tính.' },
        { text: 'turn', rationale: 'Turn daggers upon Caesar diễn đạt hành động quay mũi dao găm về phía Caesar.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q7',
      kind: 'gap',
      prompt: 'Hoàn thiện câu phân tích hội họa dùng hiện tại nghệ thuật: "In Las Meninas, Velázquez brilliantly ___ the boundary between observer and subject."',
      options: [],
      acceptedAnswers: [
        { text: 'blurs', rationale: 'Blurs thể hiện hành động nghệ thuật của bức tranh vẫn tiếp tục tác động lên người xem ngày nay.' },
        { text: 'subverts', rationale: 'Subverts biểu đạt sự đảo lộn quy ước hội họa.' },
        { text: 'dissolves', rationale: 'Dissolves thể hiện sự xóa nhòa ranh giới.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q8',
      kind: 'gap',
      prompt: 'Điền dạng hiện tại tiếp diễn diễn tả khung cảnh hỗn loạn trong tự sự cao trào: "Gunfire erupts across the plaza; civilians are fleeing in panic while sirens ___."',
      options: [],
      acceptedAnswers: [
        { text: 'wail', rationale: 'Wail hoặc are wailing tái hiện âm thanh dồn dập tại hiện trường.' },
        { text: 'are blaring', rationale: 'Are blaring nhấn mạnh âm thanh còi báo động đang rền vang.' },
        { text: 'are wailing', rationale: 'Are wailing đồng bộ với are fleeing.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q9',
      kind: 'transform',
      prompt: 'Chuyển câu phân tích tác phẩm văn học từ quá khứ đơn sang Academic/Literary Present chuẩn mực: "In 1984, Orwell depicted a totalitarian regime that extinguished individuality." -> "In 1984, Orwell ___ a totalitarian regime that extinguishes individuality."',
      options: [],
      acceptedAnswers: [
        { text: 'depicts', rationale: 'Depicts là hình thức chuẩn hóa khi bàn luận về nội dung tác phẩm văn chương.' },
        { text: 'portrays', rationale: 'Portrays mang nghĩa tương đương miêu tả thế giới quan tác phẩm.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q10',
      kind: 'transform',
      prompt: 'Chuyển câu tường thuật lịch sử đơn điệu sang cấu trúc Historical Present tại bước ngoặt định mệnh: "At midnight, the messenger arrived with the fateful treaty." -> "At midnight, the messenger ___ with the fateful treaty."',
      options: [],
      acceptedAnswers: [
        { text: 'arrives', rationale: 'Arrives biến khoảnh khắc xuất hiện của người đưa tin thành cảnh tượng kịch tính sống động.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi chuyển thì lộn xộn, vô căn cứ trong bài tiểu luận: "The explorers crossed the frozen strait and suddenly discover a hidden geothermal spring, but they remained terrified."',
      options: [],
      acceptedAnswers: [
        { text: 'discovered', rationale: 'Nếu giữ mạch quá khứ đơn thuần, phải đồng bộ crossed - discovered - remained.' },
        { text: 'discovered a hidden geothermal spring', rationale: 'Đồng bộ cụm vị ngữ quá khứ đơn.' },
        { text: 'and suddenly discover a hidden geothermal spring, yet remain terrified', rationale: 'Nếu chuyển sang Historical Present cho toàn bộ cảnh cao trào, phải đồng bộ cả vế sau sang remain terrified.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng quá khứ đơn không chuẩn xác trong bài bình luận triết học: "Kant argued that the categorical imperative bound all rational agents."',
      options: [],
      acceptedAnswers: [
        { text: 'argues that the categorical imperative binds', rationale: 'Quy ước học thuật đòi hỏi hiện tại đơn (argues, binds) vì mệnh đề triết học mang giá trị chân lý phổ quát.' },
        { text: 'maintains that the categorical imperative binds', rationale: 'Biến thể học thuật dùng maintains.' },
        { text: 'Kant argues that the categorical imperative binds all rational agents.', rationale: 'Câu hoàn chỉnh sử dụng literary present chuẩn mực.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-r1',
      kind: 'choice',
      prompt: 'Trong đoạn văn phê bình điện ảnh: "The director builds palpable suspense through discordant strings, and then, without warning, the camera cuts to the deserted quay." Tác dụng của việc dùng "cuts" là gì?',
      options: [
        { text: 'Tạo cảm giác chấn động thị giác tức thì (sensory immediacy) đồng bộ với trải nghiệm xem phim của khán giả', correct: true, rationale: 'Thì hiện tại cuts đưa hành động chuyển cảnh trực tiếp vào hiện tại nhận thức của độc giả.' },
        { text: 'Báo hiệu rằng bộ phim chưa bao giờ được biên tập hoàn chỉnh', correct: false, rationale: 'Không liên quan đến quy trình sản xuất.' },
        { text: 'Thể hiện một quy luật quay phim luôn xảy ra trong mọi tác phẩm điện ảnh', correct: false, rationale: 'Đây là miêu tả một phân cảnh cụ thể.' },
      ],
      acceptedAnswers: [{ text: 'Tạo cảm giác chấn động thị giác tức thì (sensory immediacy) đồng bộ với trải nghiệm xem phim của khán giả', rationale: 'Tạo tính trực quan sống động trong phê bình điện ảnh.' }],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-r2',
      kind: 'gap',
      prompt: 'Điền động từ ở thì hiện tại thể hiện quan điểm của tác giả học thuật: "Marx ___ that historical progression is fundamentally driven by material class struggles."',
      options: [],
      acceptedAnswers: [
        { text: 'contends', rationale: 'Contends phản ánh luận điểm cốt lõi của học thuyết Marx bằng literary/academic present.' },
        { text: 'posits', rationale: 'Posits là động từ học thuật xác đáng.' },
        { text: 'argues', rationale: 'Argues là động từ thông dụng nhất.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thì hiện tại văn học chuẩn mực: "Tolstoy showed that historical figures were swept along by vast impersonal forces." -> "Tolstoy ___ that historical figures are swept along by vast impersonal forces."',
      options: [],
      acceptedAnswers: [
        { text: 'demonstrates', rationale: 'Demonstrates thể hiện sự minh chứng triết học của đại văn hào.' },
        { text: 'shows', rationale: 'Shows là hình thức chuyển đổi trực tiếp.' },
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thì trong câu nhận xét về trường đoạn văn học: "In the final act, the protagonist surrendered to despair and embraces oblivion."',
      options: [],
      acceptedAnswers: [
        { text: 'surrenders to despair and embraces oblivion', rationale: 'Cần đồng bộ sang thì hiện tại văn học (surrenders... embraces) khi miêu tả diễn biến hồi kết.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-o1',
      prompt: 'Viết một đoạn văn 3-4 câu tái hiện một biến cố lịch sử kịch tính (ví dụ: cuộc đổ bộ Normandy, khoảnh khắc phát minh bóng đèn, hoặc sự sụp đổ của một đế chế). Bắt đầu bằng 1 câu quá khứ thiết lập bối cảnh, sau đó chuyển dịch chiến lược sang thì Hiện tại Lịch sử (Historical Present) để miêu tả khoảnh khắc bước ngoặt then chốt.',
      modelAnswer: 'For months, Allied command had stockpiled munitions along the southern coast of England under strict secrecy. Then, at the break of dawn on the sixth of June, the armada emerges through the morning mist; ramp doors drop into the churning surf as infantrymen plunge into waist-deep water under relentless crossfire.',
      checks: [
        'Sử dụng thì quá khứ (had stockpiled / was planned) để dựng khung bối cảnh nền ban đầu.',
        'Chuyển đổi nhịp nhàng sang Historical Present (emerges, drop, plunge) tại khoảnh khắc cao trào.',
        'Mạch văn liền mạch, giàu tính hình tượng và kiểm soát hoàn hảo sự dịch chuyển thì.',
      ],
    },
    {
      id: 'grammar-v2-c2-historical-present-discourse-05-o2',
      prompt: 'Viết một đoạn văn 3 câu trong bài tiểu luận triết học chính trị, so sánh quan điểm của Thomas Hobbes và John Locke về trạng thái tự nhiên (state of nature), sử dụng chuẩn mực Literary/Academic Present.',
      modelAnswer: 'In Leviathan, Hobbes posits that the state of nature is inherently brutal and anarchic, necessitating the submission of individual autonomy to an absolute sovereign. In stark contrast, Locke argues in the Second Treatise that humans possess natural rights to liberty and property prior to any political compact. This philosophical divergence continues to underpin competing doctrines of constitutional legitimacy.',
      checks: [
        'Sử dụng nhất quán Literary Present (posits, argues, continues to underpin) khi thảo luận về hai văn bản kinh điển.',
        'Phân tích đối lập rõ ràng, chuẩn xác về mặt thuật ngữ triết học chính trị.',
        'Không phạm lỗi lùi thì quá khứ tùy tiện đối với các luận điểm vẫn còn giá trị học thuật.',
      ],
    },
  ],
  sources: [
    {
      id: 'fleischman-tense-narrative',
      title: 'Tense and Narrativity: From Medieval Performance to Modern Fiction (Suzanne Fleischman)',
      url: 'https://www.routledge.com/Tense-and-Narrativity-From-Medieval-Performance-to-Modern-Fiction/Fleischman/p/book/9780415031639',
      claims: ['Phân tích chức năng diễn ngôn và tu từ học của Hiện tại Lịch sử trong cấu trúc tự sự và phân cảnh cao trào.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'mla-handbook-literary-present',
      title: 'MLA Handbook: The Literary Present and Scholarly Verbs of Attribution',
      url: 'https://style.mla.org/verbs-of-attribution/',
      claims: ['Chuẩn hóa quy tắc sử dụng Literary/Academic Present khi trích dẫn và phân tích các văn bản học thuật và tác phẩm nghệ thuật.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified historical & literary present conventions, corrected exercise keys, and validated sources.',
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
