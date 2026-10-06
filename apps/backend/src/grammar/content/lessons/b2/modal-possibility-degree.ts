/**
 * @file modal-possibility-degree.ts
 * @description Lesson: Mức độ khả năng và độ chắc chắn của Modal Verbs (Degrees of Possibility & Certainty).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-modal-possibility-degree-13',
  revisionId: 'grammar-v2-b2-modal-possibility-degree-13@1.0.0',
  revision: '1.0.0',
  title: 'Mức độ khả năng và độ chắc chắn của Modal Verbs (Degrees of Possibility & Certainty)',
  objective: 'Làm chủ thang đo mức độ chắc chắn và khả năng (Certainty & Possibility Scale) bằng cách kết hợp linh hoạt các modal verbs (must, will, should, ought to, may, might, could) cùng các phó từ chỉ mức độ (may well, could easily, might conceivably) trong văn phong học thuật và phân tích chuyên nghiệp.',
  prerequisiteIds: ['grammar-v2-b2-past-modal-deduction-12'],
  coverage: ['modal-possibility-degree', 'certainty-scale', 'may-might-could-well', 'modal-adverbs', 'b2-grammar'],
  context: {
    english: 'Presenting the macroeconomic risk forecast, the chief strategist stated: "Inflation should ease by the fourth quarter under normal market dynamics, but geopolitical tensions may well disrupt energy distribution and could easily trigger renewed volatility."',
    vietnamese: 'Thuyết trình về dự báo rủi ro kinh tế vĩ mô, chiến lược gia trưởng phát biểu: "Lạm phát theo lẽ thường sẽ hạ nhiệt vào quý IV dưới tác động của thị trường thông thường, nhưng căng thẳng địa chính trị rất có thể sẽ làm gián đoạn chuỗi phân phối năng lượng và hoàn toàn có thể kích hoạt biến động trở lại."',
  },
  guide: {
    pattern: 'S + modal + (well / easily / conceivably) + V-bare | S + modal + (presumably / definitely) + V-bare',
    whenToUse: [
      'Sắp xếp các modal theo sắc thái trong ngữ cảnh: must thường thể hiện suy luận rất chắc; should/ought to thường thể hiện kỳ vọng; may/might/could thường nêu khả năng, với khác biệt phụ thuộc ngữ cảnh.',
      'Dùng "may well" hoặc "could easily" để nhấn mạnh khả năng đáng kể hoặc dễ xảy ra; mức độ chắc chắn vẫn phụ thuộc ngữ cảnh.',
      'Dùng "might just" hoặc "might conceivably" để nêu khả năng, đôi khi có sắc thái dè dặt; không phải thang xác suất cố định.',
      'Dùng "should / ought to" để diễn tả kỳ vọng bình thường (expectation) nếu mọi thứ diễn ra theo đúng kế hoạch thông lệ.',
    ],
    signalWords: ['may well', 'could easily', 'might conceivably', 'should arrive by', 'almost certainly', 'in all likelihood'],
    check: [
      'Phân biệt "should" (kỳ vọng thông thường/dự tính) với "must" (kết luận tất yếu dựa trên bằng chứng hiển nhiên).',
      'Đã đặt phó từ "well / easily" ngay sau modal verb chưa? (may well + V, could easily + V).',
      'Có nhận biết sự khác biệt giữa may (khả năng thực tế hơn) và might/could (khả năng mang tính giả định/ít chắc hơn)?',
    ],
  },
  explanation: 'Các động từ khuyết thiếu thể hiện đánh giá của người nói, không tạo ra thang xác suất cố định. Must thường biểu đạt suy luận mạnh dựa trên thông tin hiện có; should / ought to thường nêu kỳ vọng hợp lý; may, might và could nêu khả năng với sắc thái khác nhau tùy ngữ cảnh. Các kết hợp như may well và could easily có thể tăng cường khả năng được đánh giá là đáng kể, còn might conceivably thường dè dặt hơn. Không thể gán tỷ lệ phần trăm phổ quát cho các modal.',
  examples: [
    {
      english: 'Given current atmospheric stability, the flight should land twenty minutes ahead of schedule.',
      vietnamese: 'Với tình hình khí quyển ổn định hiện nay, theo lẽ thường chuyến bay sẽ hạ cánh trước lịch trình hai mươi phút (kỳ vọng hợp lý).',
    },
    {
      english: 'If raw material prices continue to soar, manufacturers may well pass the increased costs onto consumers.',
      vietnamese: 'Nếu giá nguyên liệu thô tiếp tục tăng vọt, các nhà sản xuất rất có thể sẽ chuyển phần chi phí gia tăng đó sang người tiêu dùng.',
    },
    {
      english: 'Leaving confidential client dossiers unattended could easily compromise the entire firm\'s professional reputation.',
      vietnamese: 'Để các hồ sơ khách hàng mật không ai trông coi hoàn toàn có thể dễ dàng làm tổn hại danh tiếng chuyên môn của cả công ty.',
    },
    {
      english: 'With rapid technological adaptation, renewable energy might conceivably replace fossil fuels sooner than projected.',
      vietnamese: 'Với tốc độ thích ứng công nghệ nhanh chóng, năng lượng tái tạo có thể hình dung là sẽ thay thế nhiên liệu hóa thạch sớm hơn dự kiến.',
    },
    {
      english: 'The laboratory results must be accurate because three independent specialists verified the telemetry readings.',
      vietnamese: 'Kết quả phòng thí nghiệm chắc chắn là chính xác vì ba chuyên gia độc lập đã kiểm chứng các chỉ số đo xa.',
    },
    {
      english: 'Don\'t discard that handwritten draft; it might just contain the lost mathematical theorem.',
      vietnamese: 'Đừng vứt bản thảo viết tay đó; nó rất có thể (dù cơ hội mong manh) chứa đựng định lý toán học đã thất lạc.',
    },
  ],
  contrasts: [
    {
      form: 'The train should arrive at 5 PM vs The train must arrive at 5 PM',
      whyFits: '"The train should arrive at 5 PM" thể hiện kỳ vọng bình thường theo lịch trình đường sắt (nếu không có sự cố đường ray).',
      whyNot: '\"The train must arrive at 5 PM\" can express an expectation or a strong inference in context, but it does not convey the ordinary timetable expectation as neutrally as should.',
    },
    {
      form: 'may well happen vs might just happen',
      whyFits: '"The company may well double profits" thể hiện khả năng rất cao dựa trên số liệu kinh doanh tích cực.',
      whyNot: '"The company might just double profits" ngụ ý một khả năng rất mong manh, chỉ có thể xảy ra nhờ may mắn kỳ diệu.',
    },
  ],
  commonMistakes: [
    'Dùng must để nói về sự việc mong đợi theo kế hoạch tương lai: viết "The letter must arrive tomorrow" thay vì "The letter should arrive tomorrow".',
    'Đặt sai vị trí phó từ kết hợp: viết "may happen well" thay vì "may well happen".',
    'Nhầm lẫn could easily (khả năng xảy ra rủi ro) với can easily (khả năng kỹ năng thông thường).',
  ],
  summary: 'Must thường biểu đạt suy luận mạnh; should/ought to thường nêu kỳ vọng; may/might/could nêu khả năng. Các sắc thái phụ thuộc ngữ cảnh, không phải thang xác suất cố định.',
  exercises: [
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q1',
      kind: 'choice',
      prompt: 'Choose the modal that expresses a normal expectation rather than a requirement or a general possibility: "The express train is scheduled to arrive on time; it ___ in Edinburgh by 4 PM."',
      options: [
        { text: 'should arrive', correct: true, rationale: 'Dựa trên lịch trình thông thường và điều kiện thuận lợi, "should arrive" thể hiện kỳ vọng hợp lý (reasonable expectation).' },
        { text: 'must arrive', correct: false, rationale: 'Must can express a strong inference or obligation; the prompt asks for an ordinary expectation based on the schedule.' },
        { text: 'can arrive', correct: false, rationale: 'Can không dùng để diễn đạt dự tính cho một sự kiện cụ thể trong tương lai.' },
      ],
      acceptedAnswers: [{ text: 'should arrive', rationale: 'should arrive diễn tả kỳ vọng logic theo lịch trình bình thường.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q2',
      kind: 'choice',
      prompt: 'If the central bank raises lending rates again, real estate investments ___ a substantial contraction.',
      options: [
        { text: 'may well suffer', correct: true, rationale: 'may well kết hợp động từ chỉ khả năng rất cao (strong possibility) xảy ra trước rủi ro kinh tế.' },
        { text: 'must well suffer', correct: false, rationale: 'Không có kết hợp "must well" trong tiếng Anh.' },
        { text: 'should well suffer', correct: false, rationale: 'Không kết hợp "should well" theo cách này.' },
      ],
      acceptedAnswers: [{ text: 'may well suffer', rationale: 'may well suffer diễn tả khả năng sụt giảm rất cao.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q3',
      kind: 'choice',
      prompt: 'Complete with a possibility modal + easily to express a plausible risk: Driving on bald tires during heavy rain ___ a catastrophic rollover accident.',
      options: [
        { text: 'could easily cause', correct: true, rationale: 'could easily chỉ một nguy cơ hoàn toàn có thể dễ dàng xảy ra.' },
        { text: 'should cause', correct: false, rationale: 'This does not follow the requested modal + easily pattern and could otherwise express an expectation.' },
        { text: 'might well to cause', correct: false, rationale: 'Sau modal verb không dùng to-infinitive.' },
      ],
      acceptedAnswers: [{ text: 'could easily cause', rationale: 'could easily cause thể hiện nguy cơ tai nạn rất dễ xảy ra.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q4',
      kind: 'choice',
      prompt: 'Select the sentence that expresses a very remote, marginal possibility:',
      options: [
        { text: 'With sheer determination and favorable circumstances, the experimental vaccine might conceivably eradicate the pathogen.', correct: true, rationale: '"might conceivably" thể hiện khả năng xa vời, mong manh nhưng vẫn có thể hình dung được.' },
        { text: 'The experimental vaccine will eradicate the pathogen without doubt.', correct: false, rationale: 'Câu này khẳng định chắc chắn 100%.' },
        { text: 'The experimental vaccine may well eradicate the pathogen next year.', correct: false, rationale: '"may well" thể hiện khả năng rất cao, không phải khả năng xa vời.' },
      ],
      acceptedAnswers: [{ text: 'With sheer determination and favorable circumstances, the experimental vaccine might conceivably eradicate the pathogen.', rationale: 'might conceivably diễn tả khả năng mong manh nhưng có thể hình dung.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q5',
      kind: 'gap',
      prompt: 'The delivery driver set out twenty minutes ago; she ___ (should / arrive) before the lunch rush commences.',
      options: [],
      acceptedAnswers: [{ text: 'should arrive', rationale: 'should arrive thể hiện kỳ vọng hợp lý theo tiến độ di chuyển.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q6',
      kind: 'gap',
      prompt: 'Without adequate firewall encryption, an amateur hacker ___ (could / easily / infiltrate) the unprotected database.',
      options: [],
      acceptedAnswers: [{ text: 'could easily infiltrate', rationale: 'could easily infiltrate diễn đạt nguy cơ xâm nhập rất dễ xảy ra.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q7',
      kind: 'gap',
      prompt: 'If the union rejects the proposed pension restructuring, the factory workers ___ (may / well / strike) next Monday.',
      options: [],
      acceptedAnswers: [{ text: 'may well strike', rationale: 'may well strike thể hiện khả năng đình công rất cao.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q8',
      kind: 'gap',
      prompt: 'The latest archaeological survey suggests that this tomb ___ (might / conceivably / belong) to a forgotten Dynasty pharaoh.',
      options: [],
      acceptedAnswers: [{ text: 'might conceivably belong', rationale: 'might conceivably belong thể hiện giả thuyết mong manh nhưng có thể hình dung.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q9',
      kind: 'transform',
      prompt: 'It is highly probable that the regulatory tribunal will impose severe financial penalties on the cartel. -> The regulatory tribunal ___ severe financial penalties on the cartel.',
      options: [],
      acceptedAnswers: [
        { text: 'may well impose', rationale: 'Dùng may well impose để chuyển từ cấu trúc highly probable.' },
        { text: 'could well impose', rationale: 'Dùng could well impose thể hiện khả năng rất cao.' },
      ],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q10',
      kind: 'transform',
      prompt: 'If everything goes according to normal expectations, our plane lands at 6:30 PM. -> Our plane ___ at 6:30 PM.',
      options: [],
      acceptedAnswers: [
        { text: 'should land', rationale: 'Dùng should land để diễn tả kỳ vọng bình thường theo lịch trình.' },
        { text: 'ought to land', rationale: 'Dùng ought to land.' },
      ],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q11',
      kind: 'correction',
      prompt: 'Rewrite to express a significant possibility of escalation using modal + well: "If the negotiations stall, the trade dispute may escalate well into a prolonged embargo."',
      options: [],
      acceptedAnswers: [
        { text: 'If the negotiations stall, the trade dispute may well escalate into a prolonged embargo.', rationale: 'Đặt "well" ngay sau trợ động từ "may": may well escalate.' },
      ],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-q12',
      kind: 'correction',
      prompt: 'Rewrite to express a normal delivery expectation based on ordinary postal timing, not a requirement or a deduction: "We posted the legal notices on Monday, so the defendant must receive them by Thursday."',
      options: [],
      acceptedAnswers: [
        { text: 'We posted the legal notices on Monday, so the defendant should receive them by Thursday.', rationale: 'Thay "must receive" bằng "should receive" (hoặc ought to receive) vì đây là kỳ vọng theo tiến độ bưu chính thông thường, không phải bằng chứng xác thực.' },
        { text: 'We posted the legal notices on Monday, so the defendant ought to receive them by Thursday.', rationale: 'Dùng ought to receive.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-r1',
      kind: 'choice',
      prompt: 'The software update has passed all automated staging tests, so the deployment ___ smoothly tonight.',
      options: [
        { text: 'should go', correct: true, rationale: 'should go thể hiện kỳ vọng hợp lý dựa trên kết quả kiểm thử thuận lợi.' },
        { text: 'must to go', correct: false, rationale: 'Sai vì sau must không dùng to-infinitive.' },
        { text: 'can go', correct: false, rationale: 'Can không dùng để thể hiện kỳ vọng cho một sự kiện cụ thể tối nay.' },
      ],
      acceptedAnswers: [{ text: 'should go', rationale: 'should go diễn tả kỳ vọng triển khai thuận lợi.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-r2',
      kind: 'gap',
      prompt: 'Given the sudden surge in online pre-orders, the inventory ___ (could / easily / sell) out before launch day.',
      options: [],
      acceptedAnswers: [{ text: 'could easily sell', rationale: 'could easily sell thể hiện khả năng hết hàng rất dễ xảy ra.' }],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-r3',
      kind: 'transform',
      prompt: 'There is a strong likelihood that the environmental agency will veto the mining concession. -> The environmental agency ___ the mining concession.',
      options: [],
      acceptedAnswers: [
        { text: 'may well veto', rationale: 'Dùng may well veto để diễn tả strong likelihood.' },
        { text: 'could well veto', rationale: 'Dùng could well veto.' },
      ],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi ngữ pháp: "Under present market conditions, the venture capital fund might conceivably to double its initial valuation."',
      options: [],
      acceptedAnswers: [
        { text: 'Under present market conditions, the venture capital fund might conceivably double its initial valuation.', rationale: 'Sau might (và phó từ conceivably) động từ ở dạng nguyên mẫu không to (double).' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-o1',
      prompt: 'Viết 1 câu tiếng Anh sử dụng cấu trúc "should + V-bare" để diễn tả một kỳ vọng hợp lý theo lịch trình hoặc quy trình làm việc thông thường.',
      modelAnswer: 'The technician dispatched the replacement circuit board this morning, so the system should be fully operational by three o\'clock this afternoon.',
      checks: [
        'Sử dụng should + V-bare diễn đạt kỳ vọng hợp lý',
        'Có căn cứ thời gian hoặc hành động trước đó làm tiền đề',
        'Không nhầm lẫn với should chỉ lời khuyên hay must',
      ],
    },
    {
      id: 'grammar-v2-b2-modal-possibility-degree-13-o2',
      prompt: 'Viết 1 câu tiếng Anh trong văn phong phân tích kinh doanh hoặc học thuật sử dụng cụm "may well + V-bare" hoặc "could easily + V-bare" để dự báo một rủi ro hoặc khả năng có xác suất cao.',
      modelAnswer: 'If international shipping tariffs escalate, domestic retailers may well raise consumer prices to maintain operating margins.',
      checks: [
        'Sử dụng chính xác cụm may well + V-bare hoặc could easily + V-bare',
        'Văn phong mang tính phân tích, học thuật hoặc kinh doanh',
        'Cấu trúc ngữ pháp hoàn chỉnh, tự nhiên',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-modals-certainty-possibility',
      title: 'Cambridge Grammar: Modals - degrees of certainty and possibility',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/modals-expressing-certainty-and-possibility',
      claims: ['Modals express a continuum of certainty from necessity (must) through expectation (should) to possibility (may, might, could).'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'oxford-epistemic-modality',
      title: 'Oxford Academic: Epistemic Modality and Modal Adverbs in Academic Discourse',
      url: 'https://academic.oup.com/eltj/article-abstract/54/1/45/2785120',
      claims: ['Examines combinations of modals with adverbs like well, easily, conceivably to calibrate epistemic stance.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal editorial review)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'AI-internal review of teaching content, controlled and transfer exercises, output prompts, and reference claims; corrected ambiguity and overgeneralized rules.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default lesson;
