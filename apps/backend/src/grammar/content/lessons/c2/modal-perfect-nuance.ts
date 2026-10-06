/**
 * @file modal-perfect-nuance.ts
 * @description C2 lesson on modal perfect nuances: retrospective deduction, counterfactual reproach, unfulfilled obligation, and epistemic evaluation.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-modal-perfect-nuance-04',
  revisionId: 'grammar-v2-c2-modal-perfect-nuance-04@1.0.0',
  revision: '1.0.0',
  title: 'Sắc thái tinh tế của Modal Perfect: Phán đoán hồi cố và trách cứ phản thực tế',
  objective: 'Phân tích và làm chủ các sắc thái nâng cao của Modal Perfect (must have, should have, could have, might have, would have, need not have, did not need to) trong đánh giá hồi cố, quy trách nhiệm và lập luận phản thực tế.',
  prerequisiteIds: ['grammar-v2-c2-modal-commitment-context-03'],
  coverage: ['modal-perfect-nuance', 'modality', 'counterfactuals', 'retrospective-evaluation'],
  context: {
    english: 'A marine casualty investigation board examines the chronology of navigational decisions preceding a vessel collision, rigorously distinguishing between what officers must have inferred, what protocols dictated they should have executed, and what gratuitous actions they need not have undertaken.',
    vietnamese: 'Ủy ban điều tra tai nạn hàng hải xem xét trình tự các quyết định điều động trước vụ va chạm tàu, phân định chặt chẽ giữa điều các sĩ quan chắc hẳn đã suy đoán, điều quy chuẩn buộc họ lẽ ra phải thực hiện, và hành vi không cần thiết mà họ đáng lẽ không cần làm.',
  },
  guide: {
    pattern: 'S + modal auxiliary + have + past participle | Epistemic Deduction: must/cannot have V-ed | Counterfactual Duty: should/ought to have V-ed | Unrealized Capacity: could have V-ed | Interpersonal Reproach: might have V-ed | Gratuitous Action: need not have V-ed vs did not need to V',
    whenToUse: [
      'Đánh giá hồi cố các hành động hoặc phán đoán trong quá khứ dựa trên những dữ kiện được sáng tỏ sau biến cố (ex post facto analysis).',
      'Diễn đạt lời trách móc tinh tế (subtle reproach) hoặc sự nuối tiếc đối với một khả năng không được hiện thực hóa trong quá khứ.',
      'Phân biệt rạch ròi giữa hành động đã làm trong vô ích (need not have done) và việc không tồn tại bổn phận phải làm (did not need to do).',
    ],
    signalWords: ['in retrospect', 'with the benefit of hindsight', 'ex post facto', 'procedural lapse', 'gratuitous action', 'counterfactually'],
    check: [
      'Tuyệt đối không dùng "must have V-ed" để diễn đạt nghĩa vụ bắt buộc trong quá khứ; nghĩa vụ quá khứ bắt buộc phải dùng "had to V".',
      'Phân biệt: "need not have V-ed" xác nhận hành động ĐÃ diễn ra nhưng lãng phí/không cần thiết; "did not need to V" chỉ việc không có nghĩa vụ (có thể đã làm hoặc không làm).',
      'Nhận diện "might have V-ed" với ngữ điệu đặc thù như một lời phàn nàn/trách cứ nhã nhặn (ví dụ: "You might have told me!").',
    ],
  },
  explanation: 'Ở trình độ C2, modal perfect không chỉ là công thức ghép thì cơ bản mà là hệ thống công cụ phản ánh nhận thức hồi cố (retrospective epistemic and deontic reasoning). Thứ nhất, sự đối lập giữa suy đoán và nghĩa vụ: "must have V-ed" thuần túy là suy luận nhận thức (epistemic deduction: "The hull must have fractured on impact" - chắc hẳn thân tàu đã nứt), trong khi nghĩa vụ quá khứ bắt buộc phải dùng "had to" ("The captain had to abandon ship"). Thứ hai, "should have / ought to have V-ed" thiết lập một trạng thái phản thực tế (counterfactual): một chuẩn mực đạo nghĩa hoặc quy trình lẽ ra phải xảy ra nhưng trên thực tế đã bị vi phạm. Thứ ba, "could have V-ed" biểu thị năng lực/cơ hội tiềm tàng trong quá khứ không được khai thác, đối lập với "was able to V" (đã nỗ lực và thực sự hoàn thành). Thứ tư, "might have V-ed" có thể vận hành như một phương tiện dụng học trách cứ nhẹ nhàng ("You might have warned us"). Cuối cùng, sự phân biệt kinh điển giữa "need not have V-ed" (hành động đã thực hiện nhưng hóa ra thừa thãi) và "did not need to V" (không có nghĩa vụ) là thước đo độ chính xác trong các báo cáo pháp lý và kiểm toán.',
  examples: [
    {
      english: 'The watch officer must have miscalculated the rate of drift under the prevailing crosscurrent.',
      vietnamese: 'Sĩ quan trực ca chắc hẳn đã tính toán sai tốc độ dạt dưới tác động của dòng chảy xiết lúc đó. (Suy luận nhận thức tất yếu về nguyên nhân quá khứ: must have).',
    },
    {
      english: 'In accordance with maritime collision regulations, the tanker should have altered course to starboard well in advance.',
      vietnamese: 'Theo quy chuẩn phòng ngừa đâm va hàng hải, tàu chở dầu lẽ ra phải đổi hướng sang mạn phải từ sớm. (Nghĩa vụ quy chuẩn đã không được thực hiện: should have).',
    },
    {
      english: 'With three auxiliary tugs on standby, the pilot could easily have berthed the vessel without incident.',
      vietnamese: 'Với ba tàu lai dắt phụ trợ túc trực, hoa tiêu hoàn toàn có thể đã cập bến tàu mà không gặp sự cố nào. (Cơ hội có thật trong quá khứ nhưng đã không tận dụng: could have).',
    },
    {
      english: 'You might at least have notified the harbour master before commencing the hazardous fuel transfer!',
      vietnamese: 'Ít nhất anh cũng có thể đã báo cho cảng vụ trước khi bắt đầu chuyển nhiên liệu nguy hiểm chứ! (Lời trách móc tế nhị nhưng nghiêm khắc: might have).',
    },
    {
      english: 'The crew need not have jettisoned the refrigerated containers, as the watertight bulkheads were never breached.',
      vietnamese: 'Thủy thủ đoàn đáng lẽ không cần phải vứt bỏ các container hàng đông lạnh, bởi các vách ngăn kín nước chưa từng bị thủng. (Hành động đã làm nhưng thực tế thừa thãi: need not have).',
    },
    {
      english: 'Because the automated bilge pump activated autonomously, the technician did not need to descend into the flooded hold.',
      vietnamese: 'Vì máy bơm la-gông tự động đã kích hoạt độc lập, kỹ thuật viên đã không cần phải xuống khoang ngập nước. (Không có nghĩa vụ/sự cần thiết phải làm: did not need to).',
    },
  ],
  contrasts: [
    {
      form: 'The auditors need not have inspected every receipt vs The auditors did not need to inspect every receipt',
      whyFits: 'Need not have inspected khẳng định kiểm toán viên ĐÃ kiểm tra từng hóa đơn nhưng việc đó vô ích; did not need to inspect chỉ ra rằng quy chế không bắt buộc kiểm tra (và thông thường họ không làm).',
      whyNot: 'Không được dùng need not have khi kiểm toán viên biết trước quy định và đã bỏ qua các hóa đơn đó.',
    },
    {
      form: 'The suspect must have signed the waiver vs The suspect had to sign the waiver',
      whyFits: 'Must have signed là kết luận suy đoán của điều tra viên dựa trên chữ ký trên tài liệu; had to sign là nghĩa vụ bắt buộc thực tế mà nghi phạm bị áp đặt tại đồn cảnh sát.',
      whyNot: 'Không bao giờ dùng must have để nói ai đó bị ép buộc hay bắt buộc phải làm việc gì trong quá khứ.',
    },
  ],
  commonMistakes: [
    'Dùng "must have" để diễn tả nghĩa vụ quá khứ thay vì "had to" (ví dụ: *I must have renewed my visa last week -> I had to renew my visa last week).',
    'Nhầm lẫn giữa "need not have V-ed" (đã làm điều thừa thãi) và "didn\'t need to V" (không phải làm), dẫn đến kết luận sai lệch trong các báo cáo kiểm toán.',
    'Bỏ qua chức năng trách cứ dụng học của "might have + past participle", hiểu nhầm thành phỏng đoán khả năng thuần túy.',
  ],
  summary: 'Modal perfect là hệ thống phân tích hồi cố then chốt: phân biệt suy đoán tất yếu (must have), bổn phận bị vi phạm (should have), cơ hội bỏ lỡ (could have), lời trách nhã nhặn (might have), và hành động dư thừa (need not have).',
  exercises: [
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q1',
      kind: 'choice',
      prompt: 'Trong biên bản thẩm vấn: "The treasurer ___ obtained board approval before liquidating the treasury bonds, but deliberately bypassed the committee." Chọn phương án chính xác diễn tả nghĩa vụ bị vi phạm:',
      options: [
        { text: 'should have', correct: true, rationale: '"Should have obtained" thể hiện nghĩa vụ quy chế lẽ ra phải làm nhưng thực tế đã không làm.' },
        { text: 'must have', correct: false, rationale: '"Must have obtained" chỉ suy đoán rằng thủ quỹ chắc hẳn đã có được phê chuẩn (mâu thuẫn với vế sau).' },
        { text: 'could have', correct: false, rationale: '"Could have" chỉ khả năng lý thuyết, không nhấn mạnh tính bắt buộc theo điều lệ.' },
      ],
      acceptedAnswers: [{ text: 'should have', rationale: 'Should have diễn tả nghĩa vụ bị vi phạm trong quá khứ.' }],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q2',
      kind: 'choice',
      prompt: 'Xét phát biểu: "We need not have printed five hundred copies of the confidential prospectus." Điều này ngụ ý sự thật khách quan nào?',
      options: [
        { text: 'Chúng tôi ĐÃ in 500 bản, nhưng việc làm đó sau đó hóa ra hoàn toàn không cần thiết', correct: true, rationale: 'Need not have V-ed luôn xác nhận hành vi đã diễn ra trong thực tế nhưng mang tính thừa thãi.' },
        { text: 'Chúng tôi đã KHÔNG in 500 bản vì quy chế bảo mật cấm in ấn', correct: false, rationale: 'Nếu không in, người ta dùng didn\'t need to print.' },
        { text: 'Chúng tôi bị bắt buộc phải in nhưng máy in gặp sự cố', correct: false, rationale: 'Hoàn toàn sai nghĩa của modal perfect.' },
      ],
      acceptedAnswers: [{ text: 'Chúng tôi ĐÃ in 500 bản, nhưng việc làm đó sau đó hóa ra hoàn toàn không cần thiết', rationale: 'Need not have V-ed chỉ hành vi đã hoàn thành nhưng dư thừa.' }],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q3',
      kind: 'choice',
      prompt: 'Câu nào sau đây sử dụng modal perfect để thể hiện một lời trách móc nhã nhặn (interpersonal reproach) đối với hành vi tắc trách của đồng nghiệp?',
      options: [
        { text: 'You might have informed me that the negotiating parameters had changed!', correct: true, rationale: '"You might have + past participle" là cấu trúc kinh điển để biểu thị sự phàn nàn/trách cứ lịch thiệp.' },
        { text: 'You could be informing me about the negotiating parameters right now.', correct: false, rationale: 'Đây là câu hiện tại tiếp diễn, không phải modal perfect hồi cố.' },
        { text: 'You must have informed the delegates about the negotiating parameters.', correct: false, rationale: 'Đây là suy đoán nhận thức tích cực về việc người đó đã thông báo.' },
      ],
      acceptedAnswers: [{ text: 'You might have informed me that the negotiating parameters had changed!', rationale: 'Might have + V-ed mang nét nghĩa trách cứ nhã nhặn.' }],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q4',
      kind: 'choice',
      prompt: 'Phân tích câu: "The pilot was able to land the damaged aircraft safely on the foam-covered runway." Tại sao không dùng "could land" ở đây?',
      options: [
        { text: 'Vì đây là một thành tựu cụ thể trong quá khứ đã được hoàn thành sau nỗ lực thực tế, đòi hỏi "was able to" thay vì "could"', correct: true, rationale: 'Could chỉ khả năng chung; đối với biến cố cụ thể được hoàn thành thành công trong quá khứ phải dùng was/were able to hoặc managed to.' },
        { text: 'Vì could land là cấu trúc cấm kỵ trong văn phong báo cáo kỹ thuật', correct: false, rationale: 'Could land đúng ngữ pháp nhưng khác biệt về tính hoàn thành thực tế.' },
        { text: 'Vì phi công đã không thể hạ cánh chiếc máy bay đó', correct: false, rationale: 'Phi công đã hạ cánh thành công.' },
      ],
      acceptedAnswers: [{ text: 'Vì đây là một thành tựu cụ thể trong quá khứ đã được hoàn thành sau nỗ lực thực tế, đòi hỏi "was able to" thay vì "could"', rationale: 'Was able to dùng cho sự việc cụ thể hoàn thành thành công.' }],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q5',
      kind: 'gap',
      prompt: 'Điền cụm modal perfect diễn tả hành động đã thực hiện nhưng hoàn toàn vô ích: "The laboratory team ___ have discarded the biological samples, as the freezer malfunction was immediately rectified."',
      options: [],
      acceptedAnswers: [
        { text: 'need not', rationale: 'Need not have discarded chỉ hành động vứt bỏ mẫu phẩm đã xảy ra nhưng thực chất thừa thãi.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q6',
      kind: 'gap',
      prompt: 'Điền modal thích hợp chỉ suy đoán logic tất yếu từ dấu vết hiện trường: "Given that the safe was opened without physical damage, the perpetrator ___ have possessed the master combination code."',
      options: [],
      acceptedAnswers: [
        { text: 'must', rationale: 'Must have possessed thể hiện suy luận tất yếu từ hiện trường không có dấu vết cậy phá.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q7',
      kind: 'gap',
      prompt: 'Điền modal thể hiện chuẩn mực quy trình bị bỏ sót trong quá khứ: "The compliance officer ___ have flagged the suspicious wire transfer within twenty-four hours."',
      options: [],
      acceptedAnswers: [
        { text: 'should', rationale: 'Should have flagged thể hiện nghĩa vụ quy chế bị vi phạm.' },
        { text: 'ought to', rationale: 'Ought to have flagged có giá trị quy chuẩn tương đương.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q8',
      kind: 'gap',
      prompt: 'Điền modal biểu đạt cơ hội/năng lực trong quá khứ đã không được tận dụng: "With sufficient liquidity reserves, the conglomerate ___ have acquired its rival before the market rebound."',
      options: [],
      acceptedAnswers: [
        { text: 'could', rationale: 'Could have acquired chỉ khả năng phản thực tế có thể xảy ra nhưng đã không được kích hoạt.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q9',
      kind: 'transform',
      prompt: 'Sửa lỗi dùng "must have" cho nghĩa vụ quá khứ sang cấu trúc chính xác: "Under statutory rules, the firm must have submitted the disclosure last Monday." -> "Under statutory rules, the firm ___ the disclosure last Monday."',
      options: [],
      acceptedAnswers: [
        { text: 'had to submit', rationale: 'Nghĩa vụ bắt buộc trong quá khứ phải dùng had to submit, không thể dùng must have.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q10',
      kind: 'transform',
      prompt: 'Chuyển lời phàn nàn trực diện thành lời trách cứ tinh tế sử dụng "might have": "Why didn\'t you warn us about the sudden price hike?" -> "You ___ warned us about the sudden price hike!"',
      options: [],
      acceptedAnswers: [
        { text: 'might have', rationale: 'Might have warned us biến lời trách thành câu trách cứ mang đăng thức lịch thiệp cao.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng modal trong câu tường thuật nghĩa vụ pháp lý đã diễn ra tuần trước: "Every witness must have appeared before the grand jury on Tuesday."',
      options: [],
      acceptedAnswers: [
        { text: 'had to appear', rationale: 'Must have appeared chỉ là suy đoán nhận thức; để diễn đạt nghĩa vụ bắt buộc trong quá khứ phải dùng had to appear.' },
        { text: 'was required to appear', rationale: 'Phương án học thuật diễn đạt sự bắt buộc theo lệnh triệu tập.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng modal trong trường hợp hành động đã diễn ra nhưng vô ích: "We did not need to destroy the confidential archives yesterday, but we foolishly shredded everything before reading the preservation subpoena."',
      options: [],
      acceptedAnswers: [
        { text: 'need not have destroyed', rationale: 'Hành động hủy tài liệu ĐÃ diễn ra trong thực tế nhưng hóa ra vô ích/sai lầm, phải dùng need not have destroyed.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-r1',
      kind: 'choice',
      prompt: 'Trong vụ án hình sự: "The forensic pathologist concluded that the victim ___ expired instantly upon impact, precluding any subsequent movement." Chọn dạng modal perfect phù hợp nhất:',
      options: [
        { text: 'must have', correct: true, rationale: 'Must have expired là suy đoán hồi cố tất yếu của giám định viên pháp y dựa trên bằng chứng giải phẫu.' },
        { text: 'should have', correct: false, rationale: 'Should have expired ám chỉ cái chết là bổn phận hoặc kỳ vọng đạo đức, hoàn toàn vô lý.' },
        { text: 'need not have', correct: false, rationale: 'Need not have không phù hợp với ngữ cảnh phân tích nguyên nhân tử vong.' },
      ],
      acceptedAnswers: [{ text: 'must have', rationale: 'Suy luận nguyên nhân cái chết dựa trên bằng chứng khoa học.' }],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-r2',
      kind: 'gap',
      prompt: 'Điền cụm từ hoàn thiện câu: "Since the government granted an unconditional tax moratorium, small enterprises ___ not need to file quarterly withholding statements."',
      options: [],
      acceptedAnswers: [
        { text: 'did', rationale: 'Did not need to file chỉ sự vắng mặt của nghĩa vụ nộp tờ khai.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-r3',
      kind: 'transform',
      prompt: 'Chuyển nhận xét sau sang câu diễn đạt khả năng tiềm tàng không được khai thác: "It was within the negotiator\'s power to reject the ultimatum, but she accepted it." -> "The negotiator ___ the ultimatum, but she accepted it."',
      options: [],
      acceptedAnswers: [
        { text: 'could have rejected', rationale: 'Could have rejected thể hiện khả năng trong quá khứ đã không được sử dụng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng từ trong email trách cứ đối tác liên doanh: "You should at least have give us twenty-four hours\' notice before terminating the supply agreement."',
      options: [],
      acceptedAnswers: [
        { text: 'should at least have given', rationale: 'Sau have trong modal perfect bắt buộc phải là past participle (given, không phải give).' },
        { text: 'might at least have given', rationale: 'Might at least have given là cấu trúc trách cứ lịch thiệp kinh điển.' },
        { text: 'given', rationale: 'Sửa động từ give thành past participle given sau have.' },
        { text: 'have given', rationale: 'Cụm have + past participle chính xác trong cấu trúc modal perfect.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-o1',
      prompt: 'Viết một đoạn văn 3-4 câu trong báo cáo phân tích sự cố kỹ thuật hàng không hoặc hàng hải, phối hợp chặt chẽ ba cấu trúc modal perfect phân biệt: (1) suy luận tất yếu từ dữ liệu hộp đen (must have V-ed), (2) quy trình an toàn lẽ ra phải tuân thủ (should have V-ed), và (3) thao tác can thiệp thừa thãi không cần thiết (need not have V-ed).',
      modelAnswer: 'Telemetry logs indicate that the flight crew must have experienced severe spatial disorientation amidst violent turbulence. Under standard emergency operating procedures, the pilot in command should have engaged the automated terrain avoidance system immediately upon initial alarm sounding. Consequently, the manual rudder deflection applied in the final seconds was superfluous; the crew need not have overridden the flight management computer.',
      checks: [
        'Sử dụng chính xác must have V-ed cho suy luận hồi cố từ dữ liệu khách quan.',
        'Sử dụng chính xác should have V-ed cho quy chuẩn an toàn đã bị vi phạm.',
        'Sử dụng chính xác need not have V-ed cho thao tác đã thực hiện nhưng thừa thãi.',
        'Mạch lạc chuyên môn cao, ngữ cảnh chặt chẽ chuẩn C2.',
      ],
    },
    {
      id: 'grammar-v2-c2-modal-perfect-nuance-04-o2',
      prompt: 'Soạn thảo một công hàm phản đối ngoại giao tế nhị (diplomatic demurral) gửi đại sứ quán một quốc gia láng giềng về việc đột ngột áp đặt hạn ngạch xuất khẩu. Sử dụng "might have + past participle" để diễn đạt lời trách cứ lịch thiệp và "could have + past participle" để đề cập đến phương án hợp tác song phương lẽ ra đã có thể tránh được bất đồng.',
      modelAnswer: 'Excellency, while fully cognizant of your government\'s domestic agricultural imperatives, our ministry considers that your trade representatives might at least have provided prior bilateral notification before decreeing unilateral tariff adjustments. Through timely consultations under Article 4 of the Joint Economic Accord, our delegations could easily have devised a phased quota framework without inflicting reciprocal supply shocks upon cross-border commerce.',
      checks: [
        'Sử dụng might have V-ed như công cụ trách cứ nhã nhặn (might at least have provided).',
        'Sử dụng could have V-ed cho giải pháp hợp tác phản thực tế (could easily have devised).',
        'Đạt chuẩn mực ngoại giao đỉnh cao, sắc thái kiềm chế và tinh tế.',
      ],
    },
  ],
  sources: [
    {
      id: 'quirk-grammar-contemporary-english',
      title: 'A Comprehensive Grammar of the English Language (Quirk, Greenbaum, Leech, Svartvik)',
      url: 'https://www.pearson.com/en-us/subject-catalog/p/comprehensive-grammar-of-the-english-language-a/P200000002330',
      claims: ['Phân tích ngữ nghĩa hồi cố của modal perfects, đối lập giữa need not have và didn\'t need to, và chức năng counterfactual.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'cambridge-grammar-counterfactual-modals',
      title: 'The Cambridge Grammar of the English Language: Past Modals and Counterfactuality',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Khảo sát cấu trúc modal + have + past participle trong vai trò epistemic deduction và interpersonal reproach.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified counterfactual and retrospective modal perfect nuances, 16 exercises, outputs, and canonical reference sources.',
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
