/**
 * @file modal-remoteness-politeness.ts
 * @description C2 lesson on modal remoteness and interpersonal politeness: strategic distancing and face-saving.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-modal-remoteness-politeness-02',
  revisionId: 'grammar-v2-c2-modal-remoteness-politeness-02@1.0.0',
  revision: '1.0.0',
  title: 'Khoảng cách tình thái và lịch thiệp giao tiếp: Modal Remoteness & Politeness',
  objective: 'Làm chủ các cơ chế lùi thì tình thái (could, might, would) và kết hợp thể tiếp diễn nhằm tạo khoảng cách dụng học, giảm thiểu áp đặt (mitigating face-threats) trong giao tiếp ngoại giao và học thuật đỉnh cao.',
  prerequisiteIds: ['grammar-v2-c2-deontic-epistemic-modality-01'],
  coverage: ['modal-remoteness-politeness', 'modality', 'interpersonal-pragmatics'],
  context: {
    english: 'A senior trade negotiator communicates contentious terms to international counterparts, employing past modal forms to de-escalate friction without conceding substantive ground.',
    vietnamese: 'Một nhà đàm phán thương mại cấp cao trình bày các điều khoản gây tranh cãi cho đối tác quốc tế, sử dụng các dạng modal quá khứ để giảm căng thẳng mà không nhượng bộ lập trường cốt lõi.',
  },
  guide: {
    pattern: 'Direct: Can/Will you + V | Modal Remoteness: Could/Would/Might you (possibly) + V | Continuous Softening: I was wondering if you might + V',
    whenToUse: [
      'Sử dụng các hình thức modal quá khứ (could, would, might) để tạo khoảng cách tâm lý/xã hội, biểu đạt sự tôn trọng tối đa.',
      'Làm mềm các hành vi đe dọa thể diện (face-threatening acts) như bác bỏ đề xuất, đưa yêu cầu hoặc phê bình chuyên môn.',
      'Tạo không gian cho người đối thoại từ chối mà không làm đứt gãy mối quan hệ hợp tác ngoại giao hoặc liên tổ chức.',
    ],
    signalWords: ['might I enquire', 'would you be so kind as to', 'could perhaps', 'with due deference', 'tentatively'],
    check: [
      'Phân biệt: could/would/might ở đây thể hiện khoảng cách giả định/xã hội (attitudinal remoteness), hoàn toàn không mang nghĩa thời gian quá khứ.',
      'Phối hợp nhịp nhàng giữa modal remoteness và thể tiếp diễn (ví dụ: was hoping, was wondering) để gia tăng tính uyển chuyển.',
      'Tránh rào đón thái quá (over-hedging) làm thông điệp trở nên lu mờ hoặc thiếu tự tin.',
    ],
  },
  explanation: 'Trong dụng học tiếng Anh bậc cao (pragmatics at C2), phạm trù "thời gian" (tense) thường được tách rời khỏi phạm trù "thời điểm thực tế" để phục vụ mục đích thiết lập khoảng cách quan hệ (interpersonal distance). Các hình thức như "could", "would", "might" về mặt hình thái là dạng quá khứ của "can", "will", "may", nhưng trong giao tiếp hiện tại chúng thể hiện "remoteness" – khoảng cách xã hội, tính giả định và sự nhã nhặn chiến lược. Thay vì nói trực diện "Can you sign this today?", người bản ngữ cấp cao chuyển sang "Could you possibly countersign the agreement today?" hoặc "I was wondering if you might be amenable to reviewing this clause". Cấu trúc này trao quyền tự quyết tối đa cho người nghe, giảm bớt áp lực tâm lý và bảo toàn thể diện cho cả hai bên trong các cuộc đối thoại nhạy cảm.',
  examples: [
    {
      english: 'Might I venture to propose a temporary suspension of the dispute settlement proceedings?',
      vietnamese: 'Liệu tôi có thể mạn phép đề xuất tạm đình chỉ thủ tục giải quyết tranh chấp? (Might biểu thị sự dè dặt, tôn trọng nghi thức ngoại giao tối đa).',
    },
    {
      english: 'Could you possibly verify the provenance of these archival documents before publication?',
      vietnamese: 'Anh/chị có thể vui lòng xác thực nguồn gốc các tài liệu lưu trữ này trước khi công bố không? (Could + possibly tạo khoảng cách lịch sự cao).',
    },
    {
      english: 'I was wondering whether the committee would consider granting an interim dispensation.',
      vietnamese: 'Tôi đang tự hỏi liệu ủy ban có thể cân nhắc ban hành quy chế miễn trừ tạm thời hay không. (Past continuous + would loại bỏ tính áp đặt).',
    },
    {
      english: 'It might perhaps be prudent to commission an independent actuarial assessment.',
      vietnamese: 'Có lẽ sẽ là thận trọng nếu chúng ta chỉ định một đơn vị đánh giá rủi ro độc lập. (Might + perhaps làm dịu lời kiến nghị).',
    },
    {
      english: 'Would it be imposing too much if I asked for an extension on the monograph submission?',
      vietnamese: 'Liệu có quá đường đột nếu tôi xin gia hạn thời gian nộp bản thảo chuyên khảo không? (Would mở đầu đề nghị hết sức nhã nhặn).',
    },
    {
      english: 'You might want to reconsider phrasing the rejoinder in such unequivocal terms.',
      vietnamese: 'Có thể bạn sẽ muốn cân nhắc lại việc diễn đạt lời phản hồi bằng những từ ngữ dứt khoát như vậy. (Might want to là lời khuyên nhủ tinh tế).',
    },
  ],
  contrasts: [
    {
      form: 'Can you provide the ledger vs Could you possibly provide the ledger',
      whyFits: 'Could + possibly tạo khoảng cách xã hội và giảm thiểu tính áp đặt, phù hợp trong quan hệ giao tiếp chính thức cấp cao.',
      whyNot: 'Can mang tính trực diện, dễ bị cảm nhận là đòi hỏi hoặc áp đặt quyền lực trong bối cảnh nhạy cảm.',
    },
    {
      form: 'I hope you approve this vs I was hoping you might look favourably upon this',
      whyFits: 'Sự kết hợp giữa past continuous (was hoping) và modal remoteness (might) dịch chuyển phát ngôn vào không gian giả định, tôn trọng tuyệt đối quyền quyết định của đối tác.',
      whyNot: 'I hope ở thì hiện tại đơn đặt người nghe vào thế phải phản hồi tức thì và thiếu sắc thái tinh tế.',
    },
  ],
  commonMistakes: [
    'Ngộ nhận rằng could, would, might trong lời thỉnh cầu luôn diễn tả khả năng hoặc hành động đã kết thúc trong quá khứ.',
    'Dùng can/will trực diện trong các công hàm ngoại giao hoặc trao đổi học thuật trang trọng, làm giảm chuẩn mực đăng thức.',
    'Chồng chất quá nhiều yếu tố rào đón vụng về khiến câu văn rườm rà và mất đi trọng tâm thông điệp chuyên nghiệp.',
  ],
  summary: 'Modal remoteness biến hình thái quá khứ thành công cụ dụng học tạo khoảng cách lịch thiệp, giảm áp đặt và giữ gìn thể diện trong diễn ngôn đỉnh cao.',
  exercises: [
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q1',
      kind: 'choice',
      prompt: 'Xét phát ngôn tại hội nghị thượng đỉnh: "Might I suggest that we defer deliberations until tomorrow?" Tác dụng của "might" ở đây là gì?',
      options: [
        { text: 'Thiết lập mức độ lịch thiệp và thận trọng tối đa trong nghi thức ngoại giao', correct: true, rationale: 'Might được dùng để hạ thấp mức độ áp đặt ý kiến cá nhân trong môi trường ngoại giao cấp cao.' },
        { text: 'Thông báo rằng người nói chỉ có 20% khả năng đưa ra gợi ý', correct: false, rationale: 'Không phải xác suất số học mà là chiến lược dụng học.' },
        { text: 'Chỉ hành động đề xuất đã diễn ra trong quá khứ nhưng bị hoãn', correct: false, rationale: 'Đây là lời đề xuất ở hiện tại, không liên quan đến thời điểm quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'Thiết lập mức độ lịch thiệp và thận trọng tối đa trong nghi thức ngoại giao', rationale: 'Tạo khoảng cách dụng học nhã nhặn.' }],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q2',
      kind: 'choice',
      prompt: 'Trong các lựa chọn sau, câu nào thể hiện tính lịch thiệp tinh tế nhất (highest pragmatic politeness) khi đưa ra lời phê bình một bản báo cáo?',
      options: [
        { text: 'You might wish to re-evaluate the premise of the third chapter in light of recent findings.', correct: true, rationale: 'Cấu trúc "might wish to" chuyển lời phê bình thành một gợi ý tùy nghi, bảo vệ thể diện của người viết.' },
        { text: 'You must rewrite the third chapter immediately because it is invalid.', correct: false, rationale: 'Mệnh lệnh trực diện thô thiển, vi phạm nguyên tắc giao tiếp hợp tác.' },
        { text: 'You should understand that chapter three contains substantial blunders.', correct: false, rationale: 'Mang tính chỉ trích trực tiếp và áp đặt nhận thức.' },
      ],
      acceptedAnswers: [{ text: 'You might wish to re-evaluate the premise of the third chapter in light of recent findings.', rationale: 'Chiến lược làm mềm lời phê bình.' }],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q3',
      kind: 'choice',
      prompt: 'Cặp hình thức nào kết hợp nhuần nhuyễn giữa aspect và modal remoteness để tạo lời thỉnh cầu gián tiếp nhất?',
      options: [
        { text: 'I was wondering if you could...', correct: true, rationale: 'Past continuous kết hợp past modal tạo ra khoảng cách tâm lý đa tầng lý tưởng.' },
        { text: 'I wonder if you can...', correct: false, rationale: 'Hiện tại đơn và can mang tính trực diện hơn đáng kể.' },
        { text: 'I will wonder if you will...', correct: false, rationale: 'Sai quy ước dụng học và không mang tính lịch thiệp.' },
      ],
      acceptedAnswers: [{ text: 'I was wondering if you could...', rationale: 'Khoảng cách hóa tối đa bằng thì và thể.' }],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q4',
      kind: 'choice',
      prompt: 'Tại sao phái đoàn đàm phán chọn: "Would you be prepared to revisit the quota?" thay vì "Will you revisit the quota?"',
      options: [
        { text: 'Để thăm dò thiện chí trong không gian giả định, giảm thiểu tổn hại nếu đối phương từ chối', correct: true, rationale: 'Would đặt câu hỏi vào thế giả định, giúp đối tác dễ dàng phản hồi mà không bị ép buộc.' },
        { text: 'Vì quota đó đã được đàm phán xong từ năm ngoái', correct: false, rationale: 'Would ở đây không biểu thị thời điểm quá khứ.' },
        { text: 'Bởi vì ngữ pháp tiếng Anh nghiêm cấm dùng "will" trong câu hỏi nghi vấn', correct: false, rationale: 'Sai hoàn toàn về quy tắc ngữ pháp.' },
      ],
      acceptedAnswers: [{ text: 'Để thăm dò thiện chí trong không gian giả định, giảm thiểu tổn hại nếu đối phương từ chối', rationale: 'Bảo toàn thể diện trong thương lượng.' }],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q5',
      kind: 'gap',
      prompt: 'Điền trợ động từ tạo khoảng cách lịch sự trang trọng trong lời đề nghị: "___ you be kind enough to furnish us with the supplementary protocol?"',
      options: [],
      acceptedAnswers: [
        { text: 'Would', rationale: 'Would you be kind enough to là công thức lịch thiệp chuẩn mực.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q6',
      kind: 'gap',
      prompt: 'Điền từ thích hợp để làm mềm mức độ áp đặt: "Could you ___ reconsider the implementation timetable before signing?"',
      options: [],
      acceptedAnswers: [
        { text: 'possibly', rationale: 'Possibly đóng vai trò trạng từ làm dịu yêu cầu (downtoner/softener).' },
        { text: 'perhaps', rationale: 'Perhaps cũng là trạng từ giảm nhẹ áp lực được chấp nhận.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q7',
      kind: 'gap',
      prompt: 'Điền modal past mang sắc thái mạn phép thưa chuyện trong diễn văn học thuật: "___ I venture to add one reservation regarding the methodology?"',
      options: [],
      acceptedAnswers: [
        { text: 'Might', rationale: 'Might I venture to là quán ngữ kinh điển trong tranh luận học thuật thượng tầng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q8',
      kind: 'gap',
      prompt: 'Điền dạng thì-thể làm mềm đề xuất mở đầu bằng wondering: "We ___ wondering whether your institution might co-sponsor the colloquium."',
      options: [],
      acceptedAnswers: [
        { text: 'were', rationale: 'Were wondering kết hợp past continuous tạo tính gián tiếp nhã nhặn.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q9',
      kind: 'transform',
      prompt: 'Chuyển lời yêu cầu trực diện thành thỉnh cầu lịch thiệp dùng modal remoteness với "could": "Send us the draft treaty immediately." -> "___ send us the draft treaty at your earliest convenience?"',
      options: [],
      acceptedAnswers: [
        { text: 'Could you possibly', rationale: 'Could you possibly là cấu trúc chuyển đổi chuẩn hóa tạo sự lịch thiệp tối đa.' },
        { text: 'Could you perhaps', rationale: 'Could you perhaps làm mềm yêu cầu hiệu quả.' },
        { text: 'Could you please', rationale: 'Could you please tạo mức độ lịch sự phổ biến.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q10',
      kind: 'transform',
      prompt: 'Chuyển nhận định khẳng định thành lời khuyên nhủ tinh tế dùng "might want to": "You must rewrite this paragraph." -> "You ___ reconsider this paragraph."',
      options: [],
      acceptedAnswers: [
        { text: 'might want to', rationale: 'Might want to biến mệnh lệnh thành gợi ý khéo léo.' },
        { text: 'might wish to', rationale: 'Might wish to là biến thể văn phong trang trọng học thuật.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q11',
      kind: 'correction',
      prompt: 'Sửa trợ động từ thiếu tế nhị trong bức thư gửi hội đồng giám khảo: "Can you give me detailed feedback on my rejected dissertation?"',
      options: [],
      acceptedAnswers: [
        { text: 'Could you possibly', rationale: 'Cần thay "Can you" bằng "Could you possibly" để đạt chuẩn mực thỉnh cầu học thuật.' },
        { text: 'Would you be willing to', rationale: 'Biến thể diễn đạt sự thấu hiểu và tôn trọng thời gian của hội đồng.' },
        { text: 'Could you', rationale: 'Could you mang sắc thái lịch sự cơ bản cần thiết.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng thì trực diện trong email thương lượng tế nhị: "I hope you can adjust the shipment deadline."',
      options: [],
      acceptedAnswers: [
        { text: 'was hoping you could', rationale: 'I was hoping you could tạo khoảng cách dụng học nhã nhặn hơn nhiều so với hiện tại đơn.' },
        { text: 'was hoping you might', rationale: 'Was hoping you might gia tăng thêm tính dè dặt tôn trọng đối tác.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-r1',
      kind: 'choice',
      prompt: 'Trong cuộc họp kín giữa các bộ trưởng: "Would the minister be disposed to entertain an amendment?" Cấu trúc này nhằm mục đích gì?',
      options: [
        { text: 'Thăm dò phản ứng của bộ trưởng với sự tôn trọng nghi thức lập pháp tối đa', correct: true, rationale: 'Would be disposed to entertain là phát ngôn ngoại giao mở đường cho thỏa hiệp không áp đặt.' },
        { text: 'Chất vấn liệu bộ trưởng có đủ năng lực hiểu tu chính án hay không', correct: false, rationale: 'Hoàn toàn sai lệch về dụng ý giao tiếp.' },
        { text: 'Khẳng định bộ trưởng bắt buộc phải phê chuẩn tu chính án', correct: false, rationale: 'Đây không phải mệnh lệnh bắt buộc.' },
      ],
      acceptedAnswers: [{ text: 'Thăm dò phản ứng của bộ trưởng với sự tôn trọng nghi thức lập pháp tối đa', rationale: 'Nghi thức ngoại giao lập pháp.' }],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-r2',
      kind: 'gap',
      prompt: 'Điền cụm từ thích hợp trong thư thỉnh nguyện học thuật: "We were ___ if the dean might grant an audience to discuss the curriculum reform."',
      options: [],
      acceptedAnswers: [
        { text: 'wondering', rationale: 'Were wondering kết hợp với might tạo nên lời thỉnh cầu chuẩn mực nhất.' },
        { text: 'hoping', rationale: 'Were hoping cũng là động từ trạng thái tạo khoảng cách lịch sự.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-r3',
      kind: 'transform',
      prompt: 'Làm mềm thông điệp cảnh báo của kiểm toán viên nội bộ sang văn phong hợp tác nhã nhặn: "You must rectify the reporting deficiency." -> "You ___ addressing the reporting deficiency."',
      options: [],
      acceptedAnswers: [
        { text: 'might consider', rationale: 'Might consider + V-ing làm mềm khuyến nghị kiểm toán.' },
        { text: 'might want to consider', rationale: 'Dạng rào đón nhiều tầng trang trọng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu đăng thức trong lời mời hợp tác ngoại giao: "Will you attend our bilateral banquet next Tuesday?"',
      options: [],
      acceptedAnswers: [
        { text: 'Would you be pleased to attend', rationale: 'Thay Will you bằng cấu trúc nghi lễ ngoại giao tương xứng.' },
        { text: 'Would you honor us with your presence at', rationale: 'Diễn đạt nghi thức ngoại giao đỉnh cao.' },
        { text: 'Would you be able to attend', rationale: 'Phương án lịch sự trang trọng thông dụng.' },
        { text: 'Would you care to attend', rationale: 'Công thức mời lịch thiệp trang trọng chuẩn mực.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-o1',
      prompt: 'Soạn thảo một đoạn thư ngoại giao ngắn (3-4 câu) gửi trưởng đoàn đàm phán đối tác nhằm đề nghị hoãn biểu quyết một hiệp định thương mại, ứng dụng nhuần nhuyễn các kỹ thuật: modal remoteness (could/might/would) và continuous softening (was hoping/wondering).',
      modelAnswer: 'Excellency, in light of the intricate regulatory adjustments still pending within our domestic legislature, I was wondering whether your delegation might look favourably upon a brief deferral of the plenary vote. Could we perhaps convene an informal working session tomorrow to harmonize our respective draft annexes? We would be immensely grateful for your flexibility on this matter.',
      checks: [
        'Sử dụng ít nhất một cấu trúc modal remoteness (might look favourably / could we perhaps).',
        'Sử dụng ít nhất một cấu trúc continuous softening (was wondering whether).',
        'Thể hiện đúng đăng thức ngoại giao chuẩn C2: tôn trọng đối tác, không gây áp lực nhưng rõ ràng về mục tiêu.',
      ],
    },
    {
      id: 'grammar-v2-c2-modal-remoteness-politeness-02-o2',
      prompt: 'Chuyển đổi một đoạn nhận xét chuyên môn trực diện, gay gắt sau đây thành lời góp ý học thuật nhã nhặn, tôn trọng đồng nghiệp: "Your analysis completely overlooks sample bias. You must redo the regressions."',
      modelAnswer: 'While the overarching thesis is compelling, one might perhaps query whether the dataset exhibits a degree of sample selectivity. In this regard, you might wish to consider re-estimating the econometric regressions with robust standard errors to further corroborate your conclusions.',
      checks: [
        'Loại bỏ các từ ngữ mang tính công kích trực tiếp (completely overlooks, must redo).',
        'Sử dụng cấu trúc giảm nhẹ (one might perhaps query, might wish to consider).',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-grammar-english-politeness',
      title: 'Cambridge Grammar of English (Carter & McCarthy)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-english/72BAE22DC33CDE5A29D8498CA7ECFA63',
      claims: ['Phân tích vai trò của modal remoteness và past aspect trong việc điều tiết khoảng cách giao tiếp và tính lịch thiệp.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'british-council-polite-requests',
      title: 'British Council: Requests, offers and invitations',
      url: 'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/requests-offers-invitations',
      claims: ['Khảo sát cơ chế làm mềm phát ngôn thông qua could, would, might trong tiếng Anh giao tiếp chuẩn tắc.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified pragmatic modal remoteness, 16 exercises, outputs, and canonical source references.',
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