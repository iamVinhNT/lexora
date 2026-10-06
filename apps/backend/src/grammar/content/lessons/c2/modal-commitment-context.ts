/**
 * @file modal-commitment-context.ts
 * @description C2 lesson on modal commitment in context: speaker epistemic stance, graded certainty, and academic hedging.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-modal-commitment-context-03',
  revisionId: 'grammar-v2-c2-modal-commitment-context-03@1.0.0',
  revision: '1.0.0',
  title: 'Mức độ cam kết tình thái và rào đón học thuật: Modal Commitment in Context',
  objective: 'Làm chủ các thang bậc cam kết nhận thức (epistemic commitment), từ khẳng định dứt khoát đến rào đón thận trọng (academic hedging), thông qua sự kết hợp giữa trợ động từ tình thái và trạng từ lập trường (stance adverbials).',
  prerequisiteIds: ['grammar-v2-c2-modal-remoteness-politeness-02'],
  coverage: ['modal-commitment-context', 'modality', 'epistemic-stance', 'academic-hedging'],
  context: {
    english: 'A macroeconomic research institute drafts a policy briefing on monetary tightening, carefully calibrating the degree of certainty attached to inflation forecasts to protect institutional credibility.',
    vietnamese: 'Một viện nghiên cứu kinh tế vĩ mô soạn thảo bản tóm tắt chính sách về thắt chặt tiền tệ, hiệu chuẩn thận trọng mức độ chắc chắn gán cho các dự báo lạm phát nhằm bảo vệ uy tín học thuật.',
  },
  guide: {
    pattern: 'Bare Assertion (no modal) > High Commitment (will certainly / must inevitably) > Medium Commitment (should / would plausibly) > Low/Attenuated Commitment (may well / might conceivably)',
    whenToUse: [
      'Hiệu chuẩn mức độ cam kết của người viết đối với tính chân lý của mệnh đề dựa trên độ vững chắc của dữ liệu thực nghiệm.',
      'Sử dụng rào đón học thuật (hedging) để bảo lưu khả năng sai số hoặc phản biện, tránh những kết luận võ đoán (unwarranted overgeneralization).',
      'Tạo sự hài hòa tình thái (modal harmony) bằng cách kết hợp tương thích giữa trợ động từ và phó từ chỉ lập trường.',
    ],
    signalWords: ['incontestably', 'arguably', 'conceivably', 'tentatively', 'inevitably', 'patently'],
    check: [
      'Tránh xung đột tình thái (modal discordance), chẳng hạn như kết hợp modal chỉ tính tất yếu tuyệt đối với trạng từ ước lượng mơ hồ (*must probably).',
      'Nhận diện rằng khẳng định không dùng modal (bare assertion: "X causes Y") thể hiện mức độ cam kết cao hơn cả câu có modal mạnh ("X will definitely cause Y").',
      'Đảm bảo mức độ rào đón tương xứng với giới hạn phương pháp luận trong văn bản nghiên cứu.',
    ],
  },
  explanation: 'Ở cấp độ C2, việc biểu đạt sự chắc chắn không chỉ là việc chọn lựa ngẫu nhiên giữa "must", "may" hay "might", mà là nghệ thuật dụng học hiệu chuẩn cam kết nhận thức (epistemic commitment). Người viết học thuật và chuyên gia hoạch định chính sách phải kiểm soát chính xác mức độ bảo chứng cho luận điểm của mình. Khẳng định trần trụi (bare assertion, e.g., "Deficits cause inflation") biểu thị sự cam kết tuyệt đối, coi mệnh đề là chân lý hiển nhiên. Khi sử dụng modal "will certainly" hoặc "must", người viết nhấn mạnh tính tất yếu logic nhưng đồng thời cũng thừa nhận rằng đây là một kết luận suy diễn. Để rào đón học thuật (hedging), các modal có độ cam kết thấp hơn như "may well" (khả năng rất cao nhưng không tuyệt đối), "could conceivably" (khả năng trên lý thuyết), và "might arguably" (mở ra không gian tranh luận) được phối hợp tinh tế cùng trạng từ lập trường nhằm duy trì sự khách quan khoa học.',
  examples: [
    {
      english: 'The contraction in consumer expenditure will almost certainly precipitate an inventory glut.',
      vietnamese: 'Sự suy giảm trong chi tiêu tiêu dùng gần như chắc chắn sẽ gây ra tình trạng ứ đọng hàng tồn kho. (Cam kết rất cao: will + almost certainly).',
    },
    {
      english: 'The econometric model suggests that interest rate hikes should curb speculative borrowing by the fourth quarter.',
      vietnamese: 'Mô hình kinh tế lượng gợi ý rằng việc tăng lãi suất lẽ ra sẽ kiềm chế hoạt động vay đầu cơ vào quý IV. (Cam kết trung bình dựa trên kỳ vọng hợp lý: should).',
    },
    {
      english: 'These preliminary clinical findings may well point toward an overlooked genetic pathway.',
      vietnamese: 'Những phát hiện lâm sàng sơ bộ này hoàn toàn có thể chỉ ra một cơ chế di truyền từng bị bỏ qua. (May well: khả năng có căn cứ xác đáng cao nhưng vẫn giữ tính thận trọng).',
    },
    {
      english: 'Under extreme liquidity stress, sovereign bond yields could conceivably decouple from benchmark indices.',
      vietnamese: 'Trong điều kiện căng thẳng thanh khoản tột độ, lợi suất trái phiếu chính phủ hoàn toàn có thể phân tách khỏi các chỉ số tham chiếu trên phương diện giả định. (Cam kết thấp mang tính lý thuyết: could conceivably).',
    },
    {
      english: 'One might arguably maintain that the regulatory overhaul has hindered institutional agility.',
      vietnamese: 'Người ta có thể biện luận một cách hữu lý rằng cuộc đại tu quy chế đã cản trở tính linh hoạt của các thể chế. (Rào đón nhiều tầng: might arguably).',
    },
    {
      english: 'The audited figures demonstrate that the subsidiary is insolvent.',
      vietnamese: 'Các số liệu đã được kiểm toán chứng minh rằng công ty con đã mất khả năng thanh toán. (Bare assertion: khẳng định trần trụi không dùng modal, thể hiện cam kết thực chứng tối đa).',
    },
  ],
  contrasts: [
    {
      form: 'The reform causes disruption vs The reform will inevitably cause disruption',
      whyFits: 'Câu thứ nhất là bare assertion coi biến cố là chân thực hiển nhiên; câu thứ hai bổ sung will inevitably để nhấn mạnh suy luận dự báo có tính tất yếu logic.',
      whyNot: 'Bare assertion thích hợp khi trình bày sự kiện đã hoàn tất hoặc chân lý định nghĩa; will inevitably thích hợp khi người viết muốn cam kết mạnh mẽ vào một dự báo tương lai.',
    },
    {
      form: 'The mechanism may explain the variance vs The mechanism may well explain the variance',
      whyFits: 'May well biểu thị khả năng có cơ sở thực chứng đáng kể (substantial likelihood), trong khi bare may chỉ mở ra khả năng 50/50 trung tính.',
      whyNot: 'Không dùng bare may khi muốn hàm ý dữ liệu thực nghiệm đã ủng hộ mạnh mẽ cho giả thuyết nghiên cứu.',
    },
  ],
  commonMistakes: [
    'Tạo sự bất hòa tình thái (modal discordance), ví dụ: "The hypothesis must probably be rejected" (phải sửa thành "is probably to be rejected" hoặc "must be rejected").',
    'Nhầm lẫn giữa "may well" (khả năng cao, có căn cứ) với "may as well" (thành ngữ chỉ việc làm gì vì không có lựa chọn tốt hơn).',
    'Rào đón quá mức (hyper-hedging, ví dụ: "It could perhaps conceivably possibly be argued...") khiến văn bản học thuật trở nên yếu ớt và thiếu quyết đoán.',
  ],
  summary: 'Modal commitment điều tiết mức độ cam kết nhận thức của người viết thông qua sự phối hợp hài hòa giữa modal và trạng từ lập trường, cốt lõi cho tính chính xác và uy tín trong diễn ngôn học thuật.',
  exercises: [
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q1',
      kind: 'choice',
      prompt: 'Trong bài báo khoa học, cấu trúc nào thể hiện khả năng xảy ra rất cao dựa trên bằng chứng thuyết phục, nhưng vẫn bảo lưu tính thận trọng học thuật?',
      options: [
        { text: 'These findings may well indicate a causal link.', correct: true, rationale: '"May well" biểu đạt khả năng có căn cứ thực nghiệm rất vững, là chuẩn mực rào đón cấp cao.' },
        { text: 'These findings might conceivably indicate a causal link.', correct: false, rationale: '"Might conceivably" biểu đạt mức độ cam kết rất thấp, chỉ dừng ở mức giả định xa xôi.' },
        { text: 'These findings must necessarily indicate a causal link.', correct: false, rationale: '"Must necessarily" là khẳng định áp đặt tuyệt đối, thiếu đi sự thận trọng khoa học.' },
      ],
      acceptedAnswers: [{ text: 'These findings may well indicate a causal link.', rationale: 'May well thể hiện cam kết có căn cứ vững chắc.' }],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q2',
      kind: 'choice',
      prompt: 'Câu nào mắc lỗi bất hòa tình thái (modal discordance) giữa trợ động từ và trạng từ lập trường?',
      options: [
        { text: 'The audit committee must probably endorse the amended budget.', correct: true, rationale: 'Must (tất yếu tuyệt đối) xung đột logic với probably (xác suất phỏng đoán).' },
        { text: 'The audit committee will almost certainly endorse the amended budget.', correct: false, rationale: 'Will và almost certainly kết hợp hài hòa tình thái (modal harmony).' },
        { text: 'The audit committee could conceivably endorse the amended budget.', correct: false, rationale: 'Could và conceivably phối hợp tương thích ở bậc cam kết giả định thấp.' },
      ],
      acceptedAnswers: [{ text: 'The audit committee must probably endorse the amended budget.', rationale: 'Xung đột giữa must và probably.' }],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q3',
      kind: 'choice',
      prompt: 'Xác định cấp độ cam kết nhận thức cao nhất (highest epistemic commitment) trong các câu sau:',
      options: [
        { text: 'The empirical evidence corroborates the initial hypothesis.', correct: true, rationale: 'Bare assertion (khẳng định trần trụi không modal) biểu thị sự cam kết sự thật ở mức cao nhất.' },
        { text: 'The empirical evidence will undoubtedly corroborate the initial hypothesis.', correct: false, rationale: 'Cấu trúc modal tương lai dự báo có tính cam kết cao nhưng vẫn qua lăng kính suy luận.' },
        { text: 'The empirical evidence should logically corroborate the initial hypothesis.', correct: false, rationale: 'Should chỉ thể hiện kỳ vọng hợp lý theo quy chuẩn.' },
      ],
      acceptedAnswers: [{ text: 'The empirical evidence corroborates the initial hypothesis.', rationale: 'Bare assertion có mức cam kết tuyệt đối.' }],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q4',
      kind: 'choice',
      prompt: 'Ý nghĩa của "arguably" khi kết hợp với modal trong câu: "This is arguably the most consequential treatise on monetary policy." là gì?',
      options: [
        { text: 'Mở ra không gian tranh luận hợp lý, cho thấy nhận định này có lý lẽ hậu thuẫn mạnh nhưng không phải chân lý duy nhất', correct: true, rationale: 'Arguably là stance adverbial kinh điển để rào đón các luận điểm quy mô lớn.' },
        { text: 'Khẳng định rằng chuyên khảo này đang bị cộng đồng học thuật phản đối gay gắt', correct: false, rationale: 'Arguably không đồng nghĩa với controversial hay disputed.' },
        { text: 'Báo hiệu rằng người viết hoàn toàn không tin tưởng vào chuyên khảo này', correct: false, rationale: 'Arguably dùng để bảo vệ luận điểm của chính mình một cách lịch thiệp.' },
      ],
      acceptedAnswers: [{ text: 'Mở ra không gian tranh luận hợp lý, cho thấy nhận định này có lý lẽ hậu thuẫn mạnh nhưng không phải chân lý duy nhất', rationale: 'Bảo vệ luận điểm với độ mở học thuật.' }],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q5',
      kind: 'gap',
      prompt: 'Điền từ thích hợp để tạo cụm modal rào đón thể hiện khả năng có căn cứ vững chắc: "Given the robust pipeline, the company may ___ exceed its revenue target."',
      options: [],
      acceptedAnswers: [
        { text: 'well', rationale: 'May well là cấu trúc thành ngữ biểu đạt khả năng thực tế rất cao.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q6',
      kind: 'gap',
      prompt: 'Điền trạng từ phù hợp thể hiện khả năng trên phương diện giả thuyết lý thuyết thuần túy: "Under extreme thermal conditions, the alloy could ___ fracture along the crystalline boundary."',
      options: [],
      acceptedAnswers: [
        { text: 'conceivably', rationale: 'Conceivably kết hợp với could tạo độ cam kết thấp mang tính suy diễn giả định.' },
        { text: 'plausibly', rationale: 'Plausibly thể hiện tính hữu lý trên mô hình lý thuyết.' },
        { text: 'theoretically', rationale: 'Theoretically nhấn mạnh tính chất trên lý thuyết.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q7',
      kind: 'gap',
      prompt: 'Điền modal biểu đạt kỳ vọng hợp lý căn cứ trên quy trình chuẩn: "Barring unforeseen disruptions, the consignment ___ arrive at the terminal by dawn."',
      options: [],
      acceptedAnswers: [
        { text: 'should', rationale: 'Should biểu đạt kỳ vọng dựa trên lịch trình hoặc tiến trình suy diễn hợp lý.' },
        { text: 'ought to', rationale: 'Ought to mang nghĩa tương đương với should trong dự báo quy chuẩn.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q8',
      kind: 'gap',
      prompt: 'Điền trạng từ thể hiện cam kết tất yếu không thể tránh khỏi: "Rapid automation will ___ displace routine clerical operations."',
      options: [],
      acceptedAnswers: [
        { text: 'inevitably', rationale: 'Inevitably thể hiện tính tất yếu logic và thực tế khách quan.' },
        { text: 'invariably', rationale: 'Invariably diễn tả quy luật bất biến diễn ra không đổi.' },
        { text: 'certainly', rationale: 'Certainly biểu thị độ chắc chắn rất cao.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q9',
      kind: 'transform',
      prompt: 'Chuyển nhận định võ đoán sau thành luận điểm có rào đón học thuật thận trọng dùng "may well": "The new tariff structure will destroy domestic manufacturing." -> "The new tariff structure ___ domestic manufacturing."',
      options: [],
      acceptedAnswers: [
        { text: 'may well undermine', rationale: 'May well kết hợp động từ học thuật chuẩn xác làm mềm dự báo.' },
        { text: 'may well disrupt', rationale: 'May well disrupt thể hiện sự tác động tiêu cực có căn cứ.' },
        { text: 'may well harm', rationale: 'May well harm làm dịu nhận định cực đoan.' },
        { text: 'may well destroy', rationale: 'May well destroy làm mềm dự báo quả quyết ban đầu nhưng giữ nguyên động từ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q10',
      kind: 'transform',
      prompt: 'Chuyển câu phỏng đoán yếu sang khẳng định có cam kết dự báo tối đa với modal harmony: "Perhaps the reform succeeds." -> "The reform ___ succeed."',
      options: [],
      acceptedAnswers: [
        { text: 'will undoubtedly', rationale: 'Will undoubtedly nâng mức cam kết lên mức cao nhất có căn cứ.' },
        { text: 'will almost certainly', rationale: 'Will almost certainly thể hiện độ khả tín vượt trội.' },
        { text: 'will certainly', rationale: 'Will certainly tạo sự hài hòa tình thái khẳng định.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi xung đột tình thái (modal discordance) trong báo cáo phân tích: "The aggregate deficit must probably trigger a credit downgrade."',
      options: [],
      acceptedAnswers: [
        { text: 'is likely to trigger', rationale: 'Thay thế cặp must probably bằng is likely to để đảm bảo tính nhất quán của phán đoán.' },
        { text: 'will probably trigger', rationale: 'Will kết hợp hài hòa với probably.' },
        { text: 'The aggregate deficit will probably trigger a credit downgrade.', rationale: 'Câu hoàn chỉnh đã chỉnh sửa hài hòa tình thái.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng sai thành ngữ tình thái trong câu phân tích cơ hội: "With surplus capital at hand, the consortium may as well invest in renewable infrastructure."',
      options: [],
      acceptedAnswers: [
        { text: 'may well invest', rationale: 'May as well mang nghĩa miễn cưỡng làm gì vì không còn lựa chọn; ngữ cảnh này đòi hỏi may well (hoàn toàn có lý do chính đáng để đầu tư).' },
        { text: 'might well invest', rationale: 'Might well biểu thị khả năng cao có căn cứ.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-r1',
      kind: 'choice',
      prompt: 'Khi biên tập luận văn tiến sĩ, phát biểu nào sau đây đạt độ chuẩn mực học thuật cao nhất về mặt hiệu chuẩn cam kết (calibrated commitment)?',
      options: [
        { text: 'The correlation arguably suggests that institutional inertia plays a mediating role.', correct: true, rationale: 'Arguably suggests kết hợp hài hòa tính chất lập luận mở và sự thận trọng thực chứng.' },
        { text: 'The correlation obviously proves that institutional inertia must be the sole culprit.', correct: false, rationale: 'Obviously proves + must be mang tính quả quyết cảm tính, vi phạm chuẩn mực học thuật.' },
        { text: 'The correlation perhaps maybe might show some minor link.', correct: false, rationale: 'Hyper-hedging vụng về, làm mất giá trị học thuật của dữ liệu.' },
      ],
      acceptedAnswers: [{ text: 'The correlation arguably suggests that institutional inertia plays a mediating role.', rationale: 'Hiệu chuẩn cam kết chuẩn mực trong văn phong học thuật.' }],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-r2',
      kind: 'gap',
      prompt: 'Điền trạng từ lập trường thích hợp để hoàn thiện luận điểm được bảo lưu thận trọng: "The experimental protocol is ___ the most rigorous framework devised thus far."',
      options: [],
      acceptedAnswers: [
        { text: 'arguably', rationale: 'Arguably dùng để định vị một nhận định đỉnh cao mà không bị coi là ngạo mạn võ đoán.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau để thể hiện sự suy luận kỳ vọng hợp lý theo quy chuẩn logic: "I expect the arbitration panel will deliver the award by Tuesday." -> "The arbitration panel ___ by Tuesday."',
      options: [],
      acceptedAnswers: [
        { text: 'should deliver the award', rationale: 'Should thể hiện kỳ vọng hợp lý dựa trên lịch trình.' },
        { text: 'ought to deliver the award', rationale: 'Ought to phản ánh kỳ vọng quy chuẩn tương đương.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi bất hòa ngữ nghĩa trong văn bản phân tích rủi ro: "The borrower could undoubtedly default under modest rate increases."',
      options: [],
      acceptedAnswers: [
        { text: 'could conceivably', rationale: 'Could (khả năng giả định) không đi đôi với undoubtedly (chắc chắn không nghi ngờ); thay bằng could conceivably hoặc will undoubtedly.' },
        { text: 'will undoubtedly', rationale: 'Chuyển sang cam kết mạnh mẽ bằng will undoubtedly.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-o1',
      prompt: 'Viết một đoạn văn 3-4 câu trong báo cáo tư vấn chính sách vĩ mô, trình bày dự báo về tác động của thuế carbon. Yêu cầu sử dụng ít nhất ba cấp độ cam kết nhận thức khác nhau: (1) một bare assertion cho sự kiện thực tế, (2) một dự báo cam kết cao với modal harmony, và (3) một rào đón học thuật thận trọng dùng may well hoặc could conceivably.',
      modelAnswer: 'The statutory carbon levy takes effect on the first of January. Given the high energy intensity of heavy manufacturing, production costs will almost certainly escalate across the supply chain in the short term. However, over a multi-year horizon, these price signals may well stimulate breakthrough investments in energy-efficient metallurgy.',
      checks: [
        'Bao gồm một bare assertion trình bày thực tế chính sách (takes effect).',
        'Bao gồm một cấu trúc cam kết cao có modal harmony (will almost certainly escalate).',
        'Bao gồm cấu trúc rào đón thận trọng (may well stimulate / could conceivably).',
        'Văn phong học thuật sắc sảo, nhất quán, không phạm lỗi xung đột tình thái.',
      ],
    },
    {
      id: 'grammar-v2-c2-modal-commitment-context-03-o2',
      prompt: 'Viết lại nhận định gay gắt sau đây của một nhà phân tích thị trường thành hai phương án: (A) Giữ nguyên lập trường mạnh mẽ nhưng dùng ngôn ngữ chuyên môn chuẩn mực có modal harmony, (B) Rào đón thận trọng (academic hedging) để đưa vào báo cáo thường niên: "The central bank made a foolish decision and inflation will definitely explode next month."',
      modelAnswer: 'Option A (High commitment, rigorous stance): "The monetary authority\'s policy stance appears overly accommodative; headline inflation will almost certainly accelerate in the forthcoming quarter." Option B (Calibrated academic hedging): "One might query the timing of the monetary adjustment; inflationary pressures could conceivably intensify should commodity price shocks persist."',
      checks: [
        'Cung cấp hai phương án phân biệt rõ ràng về mức độ cam kết.',
        'Loại bỏ hoàn toàn từ ngữ mang tính quy kết cảm tính (foolish, explode).',
        'Sử dụng đúng kỹ thuật modal harmony và rào đón học thuật chuẩn C2.',
      ],
    },
  ],
  sources: [
    {
      id: 'hyland-hedging-academic-discourse',
      title: 'Hedging in Scientific Research Articles (Ken Hyland)',
      url: 'https://benjamins.com/catalog/pbns.54',
      claims: ['Phân tích cơ chế điều tiết cam kết nhận thức (epistemic commitment) và chức năng của hedging trong diễn ngôn khoa học.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'cambridge-grammar-epistemic-stance',
      title: 'The Cambridge Grammar of the English Language: Epistemic Modality and Stance',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Khảo sát mối quan hệ giữa modal auxiliaries, epistemic adverbs và hiện tượng modal harmony/discordance.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: validated epistemic commitment scales, hedging devices, 16 exercises, outputs, and canonical sources.',
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
