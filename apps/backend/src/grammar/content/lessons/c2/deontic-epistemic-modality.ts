/**
 * @file deontic-epistemic-modality.ts
 * @description C2 lesson on deontic vs epistemic modality: authority, evidence, and pragmatic ambiguity.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-deontic-epistemic-modality-01',
  revisionId: 'grammar-v2-c2-deontic-epistemic-modality-01@1.0.0',
  revision: '1.0.0',
  title: 'Modality nghĩa vụ và suy luận: Deontic vs Epistemic Modality',
  objective: 'Phân tích và làm chủ sự phân biệt giữa modality chỉ nghĩa vụ/quyền hạn (deontic) và modality chỉ khả năng/suy luận căn cứ trên bằng chứng (epistemic) trong diễn ngôn học thuật và pháp lý bậc cao.',
  prerequisiteIds: ['grammar-v2-c1-editing-reference-chains-24'],
  coverage: ['deontic-epistemic-modality', 'modality', 'discourse-pragmatics'],
  context: {
    english: 'A judicial commission debates whether statutory language imposes a strict duty on regulators or merely registers an evidentiary presumption regarding compliance.',
    vietnamese: 'Ủy ban tư pháp tranh luận xem điều khoản luật áp đặt nghĩa vụ bắt buộc lên cơ quan quản lý hay chỉ đưa ra một giả định suy luận dựa trên chứng cứ.',
  },
  guide: {
    pattern: 'Deontic: S + modal (must/shall/may/should) + bare inf (nghĩa vụ/cấp phép từ nguồn quyền hạn) | Epistemic: S + modal (must/cannot/may/might) + bare inf/perfect inf (suy đoán dựa trên bằng chứng)',
    whenToUse: [
      'Dùng deontic khi người nói xác lập bổn phận, cấp phép, hoặc ra lệnh cấm thông qua thẩm quyền cá nhân hoặc quy chế.',
      'Dùng epistemic khi người nói đánh giá độ khả tín hoặc tất yếu của một mệnh đề dựa trên các dữ kiện hiện có.',
      'Phân giải các câu lưỡng nghĩa (polysemous) trong văn kiện pháp lý và phân tích chính sách.',
    ],
    signalWords: ['by statute', 'mandatory', 'in light of the findings', 'evidently', 'compelling inference'],
    check: [
      'Xác định nguồn phát ngôn: quyền hạn áp đặt (deontic) hay lập luận nhận thức (epistemic).',
      'Kiểm tra phạm vi phủ định: must not (cấm đoán deontic) khác biệt với cannot (loại trừ tất yếu epistemic trong văn phong học thuật chuẩn mực).',
      'Tránh quy kết mức độ phần trăm xác suất cơ học cho modal trong ngữ cảnh thực tế.',
    ],
  },
  explanation: 'Ở trình độ C2, các trợ động từ tình thái (modal auxiliaries) không đơn thuần thể hiện quy tắc ngữ pháp rời rạc mà đóng vai trò công cụ dụng học tinh vi. Modality chia làm hai nhánh cơ bản: Deontic (tình thái đạo nghĩa) liên quan đến sự cho phép, nghĩa vụ, ý chí và các chuẩn mực xử sự do người có thẩm quyền hoặc quy chuẩn áp đặt; Epistemic (tình thái nhận thức) liên quan đến phán đoán của người nói về tính chân lý của mệnh đề dựa trên tri thức và bằng chứng. Ranh giới giữa hai nhánh này tạo nên hiện tượng đa nghĩa (modal polysemy). Ví dụ, "The licensee must maintain audit logs" là deontic (quy định bắt buộc), nhưng "The licensee must be aware of the breach given the alerts" là epistemic (suy đoán chắc chắn từ dữ kiện). Việc kiểm soát sắc thái phủ định cũng tối quan trọng: trong khi "must not" mang nghĩa cấm đoán trong deontic thì "cannot" thường đại diện cho sự bất khả nhận thức trong epistemic.',
  examples: [
    {
      english: 'The oversight committee must submit the audit by Friday noon.',
      vietnamese: 'Ủy ban giám sát bắt buộc phải nộp báo cáo kiểm toán trước trưa thứ Sáu. (Deontic: nghĩa vụ do quy định áp đặt).',
    },
    {
      english: 'Given the sudden liquidation of assets, the firm must be insolvent.',
      vietnamese: 'Xét việc thanh lý tài sản đột ngột, công ty chắc chắn đã mất khả năng thanh toán. (Epistemic: kết luận suy luận từ bằng chứng).',
    },
    {
      english: 'Authorized delegates may inspect the facility without prior notice.',
      vietnamese: 'Các đại biểu được ủy quyền có thể thanh tra cơ sở mà không cần báo trước. (Deontic: trao quyền/cho phép theo luật định).',
    },
    {
      english: 'The projected growth may fail to materialize if credit markets freeze.',
      vietnamese: 'Tăng trưởng dự kiến có khả năng không thành hiện thực nếu thị trường tín dụng đóng băng. (Epistemic: đánh giá khả năng rủi ro).',
    },
    {
      english: 'Minors shall not access the trading platform under any circumstances.',
      vietnamese: 'Người chưa thành niên không được phép truy cập nền tảng giao dịch dưới bất kỳ hình thức nào. (Deontic: lệnh cấm pháp lý tuyệt đối).',
    },
    {
      english: 'The ledger entries cannot have been altered without root administrator access.',
      vietnamese: 'Các bút toán sổ cái không thể nào đã bị can thiệp nếu không có quyền quản trị viên gốc. (Epistemic: loại trừ khả năng quá khứ).',
    },
  ],
  contrasts: [
    {
      form: 'You must not reveal the key vs You cannot be serious',
      whyFits: 'Must not đặt ra lệnh cấm chỉ đạo nghĩa (deontic prohibition), còn cannot biểu thị sự phủ định nhận thức về tính khả thi của mệnh đề (epistemic impossibility).',
      whyNot: 'Trong tiếng Anh chuẩn mực học thuật, suy luận loại trừ khả năng (epistemic impossibility) dùng "cannot"; dù "must not" xuất hiện trong khẩu ngữ tiếng Anh-Mỹ cho suy đoán phủ định, "cannot" là chuẩn mực cho sự bất khả nhận thức.',
    },
    {
      form: 'Officers may requisition supplies vs The forecast may prove inaccurate',
      whyFits: 'May thứ nhất thể hiện quyền năng theo quy định nội bộ (deontic permission), may thứ hai là đánh giá mức độ bất định của giả thuyết khoa học (epistemic possibility).',
      whyNot: 'May trong văn bản pháp luật hành chính hiếm khi là suy đoán ngẫu nhiên mà là sự trao thẩm quyền rõ ràng.',
    },
  ],
  commonMistakes: [
    'Quy đổi cơ học các modal như may/might sang tỉ lệ phần trăm xác suất (ví dụ: may = 50%, might = 35%) thay vì phân tích nguồn quyền hạn và bằng chứng.',
    'Nhầm lẫn giữa deontic prohibition ("must not") và epistemic impossibility ("cannot be") trong các văn bản phân tích lập luận.',
    'Dùng "shall" trong các nhận định phỏng đoán epistemic, trong khi quy ước văn bản trang trọng dành shall cho nghĩa vụ hoặc cam kết pháp lý.',
  ],
  summary: 'Deontic modality áp đặt chuẩn mực và quyền hạn; epistemic modality ước lượng chân lý từ bằng chứng. Nắm vững sự đối lập này để đọc hiểu và soạn thảo văn bản học thuật, pháp lý chuẩn xác.',
  exercises: [
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q1',
      kind: 'choice',
      prompt: 'Xét câu trong điều lệ: "The inspector may examine all financial records at will." Chức năng modality ở đây là gì?',
      options: [
        { text: 'Deontic: trao quyền hạn chính thức cho thanh tra viên theo quy chế', correct: true, rationale: 'Trong văn bản quy chế, "may" đóng vai trò trao quyền (deontic permission), không phải phán đoán xác suất.' },
        { text: 'Epistemic: dự đoán khả năng thanh tra viên sẽ kiểm tra sổ sách', correct: false, rationale: 'Đây là điều lệ trao quyền chứ không phải dự báo hành vi thực tế.' },
        { text: 'Deontic: áp đặt nghĩa vụ bắt buộc thanh tra viên phải kiểm tra', correct: false, rationale: 'May trao quyền được làm, không bắt buộc (bắt buộc phải là shall hoặc must).' },
      ],
      acceptedAnswers: [{ text: 'Deontic: trao quyền hạn chính thức cho thanh tra viên theo quy chế', rationale: 'May trong điều lệ là cấp phép quy chuẩn.' }],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q2',
      kind: 'choice',
      prompt: 'Chọn câu thể hiện phán đoán nhận thức (epistemic deduction), không phải nghĩa vụ hay lệnh cấm.',
      options: [
        { text: 'With all checkpoints closed, the suspect must still be within the perimeter.', correct: true, rationale: 'Must kết hợp với bằng chứng các trạm kiểm soát đã đóng tạo nên suy luận tất yếu (epistemic necessity).' },
        { text: 'The contractor must complete the drainage work before the monsoon season.', correct: false, rationale: 'Đây là nghĩa vụ hợp đồng (deontic obligation).' },
        { text: 'Employees must not disclose classified project specifications to third parties.', correct: false, rationale: 'Đây là mệnh lệnh cấm đoán quy chế (deontic prohibition).' },
      ],
      acceptedAnswers: [{ text: 'With all checkpoints closed, the suspect must still be within the perimeter.', rationale: 'Câu suy luận từ bằng chứng thực tế.' }],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q3',
      kind: 'choice',
      prompt: 'Trong ngữ cảnh tòa án: "The prosecution has presented video evidence; the defendant cannot deny his presence." "Cannot" ở đây mang nét nghĩa gì?',
      options: [
        { text: 'Epistemic: dựa trên chứng cứ vững chắc, việc phủ nhận là phi lý/không thể thành công về mặt logic', correct: true, rationale: 'Cannot chỉ sự bất khả nhận thức trước bằng chứng hiển nhiên.' },
        { text: 'Deontic: tòa án tước bỏ quyền được phát biểu của bị cáo', correct: false, rationale: 'Tòa không cấm bị cáo nói, mà chứng cứ khiến lời phủ nhận trở nên vô căn cứ.' },
        { text: 'Dynamic: bị cáo mất khả năng thể chất để phát âm', correct: false, rationale: 'Dynamic modality chỉ năng lực thể chất hoặc tinh thần nội tại, không khớp ở đây.' },
      ],
      acceptedAnswers: [{ text: 'Epistemic: dựa trên chứng cứ vững chắc, việc phủ nhận là phi lý/không thể thành công về mặt logic', rationale: 'Suy luận loại trừ dựa trên chứng cứ.' }],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q4',
      kind: 'choice',
      prompt: 'Xác định phát ngôn có tính lưỡng nghĩa (ambiguous) giữa deontic và epistemic nếu tách rời ngữ cảnh phát ngôn:',
      options: [
        { text: 'Students may not leave the examination hall before two o\'clock.', correct: true, rationale: 'Có thể hiểu là quy định không cho phép rời đi (deontic), hoặc dự đoán rằng sinh viên có thể không rời đi (epistemic).' },
        { text: 'All citizens shall abide by the constitutional amendments.', correct: false, rationale: 'Shall mang nghĩa pháp lý quy chuẩn thuần túy (deontic obligation).' },
        { text: 'Water boils at 100 degrees Celsius under standard atmospheric pressure.', correct: false, rationale: 'Câu chân lý khoa học, không chứa tình thái modal.' },
      ],
      acceptedAnswers: [{ text: 'Students may not leave the examination hall before two o\'clock.', rationale: 'May not có thể là cấm đoán hoặc ước lượng khả năng.' }],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q5',
      kind: 'gap',
      prompt: 'Điền trợ động từ thích hợp thể hiện sự suy luận logic tất yếu (epistemic necessity): "Judging by the impeccable provenance records, the painting ___ be authentic."',
      options: [],
      acceptedAnswers: [
        { text: 'must', rationale: 'Must diễn tả suy luận tất yếu tích cực dựa trên nguồn gốc rõ ràng.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q6',
      kind: 'gap',
      prompt: 'Điền trợ động từ mang tính trao quyền hạn chính thức (deontic permission) trong văn kiện pháp quy: "The ombudsman ___ initiate investigations on his own initiative."',
      options: [],
      acceptedAnswers: [
        { text: 'may', rationale: 'May được chuẩn hóa trong văn bản quy chuẩn để chỉ sự trao quyền hành động.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q7',
      kind: 'gap',
      prompt: 'Điền trợ động từ thể hiện lệnh cấm ngặt nghèo (deontic prohibition): "Under the non-disclosure covenant, signatories ___ not reveal proprietary algorithms."',
      options: [],
      acceptedAnswers: [
        { text: 'must', rationale: 'Must not diễn đạt mệnh lệnh cấm đoán theo cam kết bảo mật.' },
        { text: 'shall', rationale: 'Shall not là công thức cấm đoán pháp lý trang trọng tương đương.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q8',
      kind: 'gap',
      prompt: 'Điền trợ động từ thể hiện sự loại trừ khả năng trong suy luận (epistemic impossibility): "The forensic analyst concluded that the timestamp anomaly ___ have been caused by simple network latency."',
      options: [],
      acceptedAnswers: [
        { text: 'cannot', rationale: 'Cannot have V-ed diễn tả sự suy luận chắc chắn điều gì không thể đã diễn ra.' },
        { text: "can't", rationale: 'Dạng rút gọn của cannot trong suy luận nhận thức.' },
        { text: 'could not', rationale: 'Could not have V-ed diễn tả phán đoán phủ định về khả năng trong quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q9',
      kind: 'transform',
      prompt: 'Chuyển đổi câu mệnh lệnh trực tiếp sang câu diễn đạt nghĩa vụ chế định (deontic obligation) trang trọng: "Directors, disclose any conflicts of interest immediately." -> "Directors ___ disclose any conflicts of interest immediately."',
      options: [],
      acceptedAnswers: [
        { text: 'shall', rationale: 'Shall thể hiện nghĩa vụ pháp lý bắt buộc đối với chủ thể trong điều lệ công ty.' },
        { text: 'must', rationale: 'Must thiết lập nghĩa vụ bắt buộc trực tiếp.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q10',
      kind: 'transform',
      prompt: 'Viết lại nhận định chủ quan bằng cấu trúc epistemic hoàn thành nhấn mạnh suy đoán chắc chắn về quá khứ: "I am certain that the negotiators reached an impasse earlier." -> "The negotiators ___ reached an impasse earlier."',
      options: [],
      acceptedAnswers: [
        { text: 'must have', rationale: 'Must have + past participle diễn đạt suy luận nhận thức chắc chắn về biến cố quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q11',
      kind: 'correction',
      prompt: 'Sửa trợ động từ sai trong văn cảnh quy chế cấm nhân viên chia sẻ mật khẩu: "Staff cannot disclose security tokens to unverified callers."',
      options: [],
      acceptedAnswers: [
        { text: 'must not', rationale: 'Quy chế cấm đoán cần dùng deontic "must not", thay vì "cannot" (dễ bị hiểu sang năng lực hoặc bất khả logic).' },
        { text: 'shall not', rationale: 'Shall not là lựa chọn chuẩn xác trong quy chuẩn pháp quy.' },
        { text: 'Staff must not disclose security tokens to unverified callers.', rationale: 'Câu hoàn chỉnh dùng must not.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng sai modal trong suy luận khoa học: "Based on seismic readings, tectonic stress shall trigger an aftershock."',
      options: [],
      acceptedAnswers: [
        { text: 'may', rationale: 'Shall không dùng cho suy đoán nhận thức khoa học; thay bằng may hoặc is likely to.' },
        { text: 'might', rationale: 'Might biểu thị suy đoán nhận thức dè dặt có cơ sở.' },
        { text: 'could', rationale: 'Could biểu thị khả năng lý thuyết trong suy luận.' },
        { text: 'will', rationale: 'Will biểu thị dự báo quy luật tự nhiên có độ tin cậy cao.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-r1',
      kind: 'choice',
      prompt: 'Trong bản án phúc thẩm: "The trial judge may have erred in admitting the hearsay testimony." Phát biểu này thuộc nhánh modality nào?',
      options: [
        { text: 'Epistemic: tòa phúc thẩm cân nhắc khả năng thẩm phán sơ thẩm đã mắc sai lầm', correct: true, rationale: 'May have erred là suy đoán nhận thức hồi cố về một khả năng trong quá khứ.' },
        { text: 'Deontic: tòa phúc thẩm trao quyền cho thẩm phán sơ thẩm được sai sót', correct: false, rationale: 'Không thể cấp quyền vi phạm quy tắc tố tụng.' },
        { text: 'Dynamic: năng lực xét xử của thẩm phán bị giới hạn', correct: false, rationale: 'Không phản ánh phẩm chất hay năng lực cá nhân.' },
      ],
      acceptedAnswers: [{ text: 'Epistemic: tòa phúc thẩm cân nhắc khả năng thẩm phán sơ thẩm đã mắc sai lầm', rationale: 'Suy đoán hồi cố dựa trên hồ sơ vụ án.' }],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu trong hợp đồng nhượng quyền thể hiện lệnh cấm tuyệt đối: "Franchisees ___ not alter the brand trademark without prior written consent."',
      options: [],
      acceptedAnswers: [
        { text: 'shall', rationale: 'Shall not là chuẩn mực soạn thảo văn bản hợp đồng để thiết lập nghĩa vụ phủ định/cấm đoán.' },
        { text: 'must', rationale: 'Must not thể hiện mệnh lệnh cấm dứt khoát.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-r3',
      kind: 'transform',
      prompt: 'Chuyển nhận định dựa trên số liệu kiểm toán sau sang câu dùng modal epistemic: "It is logically inescapable that funds were diverted." -> "Funds ___ diverted."',
      options: [],
      acceptedAnswers: [
        { text: 'must have been', rationale: 'Must have been + past participle phản ánh suy luận nhận thức tất yếu dạng bị động trong quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng từ trong điều lệ an toàn bay: "Passengers cannot unfasten seatbelts while the illuminated sign is on."',
      options: [],
      acceptedAnswers: [
        { text: 'must not', rationale: 'Đây là quy tắc an toàn bắt buộc, phải dùng deontic "must not" (hoặc may not) thay vì "cannot".' },
        { text: 'may not', rationale: 'May not diễn đạt sự không được phép trang trọng.' },
        { text: 'Passengers must not unfasten seatbelts while the illuminated sign is on.', rationale: 'Câu hoàn chỉnh sửa cannot thành must not.' },
        { text: 'Passengers may not unfasten seatbelts while the illuminated sign is on.', rationale: 'Phương án trang trọng thay thế cannot bằng may not trong quy định an toàn.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-o1',
      prompt: 'Viết một đoạn văn 3-4 câu trong báo cáo đánh giá rủi ro pháp lý, trong đó phân định rõ ràng giữa: (1) một nghĩa vụ bắt buộc theo quy định hiện hành (dùng deontic must/shall), và (2) một suy luận nhận thức về hệ quả tài chính (dùng epistemic must/may).',
      modelAnswer: 'Under Article 12 of the statutory code, the corporation shall submit audited consolidated accounts within ninety days. In light of recurring irregularities in inventory valuation, internal auditors must be aware of systemic control failures. If left unaddressed, these discrepancies may precipitate immediate regulatory sanctions and reputational damage.',
      checks: [
        'Sử dụng chính xác ít nhất một cấu trúc deontic modal (shall/must) để thiết lập nghĩa vụ pháp lý.',
        'Sử dụng chính xác ít nhất một cấu trúc epistemic modal (must be / may precipitate) cho suy luận chứng cứ.',
        'Văn phong trang trọng, chuẩn mực, rành mạch giữa nguồn quyền hạn và phán đoán nhận thức.',
      ],
    },
    {
      id: 'grammar-v2-c2-deontic-epistemic-modality-01-o2',
      prompt: 'Viết lại thông báo nội bộ sau đây để loại bỏ hoàn toàn tính lưỡng nghĩa dụng học giữa việc cho phép (permission) và khả năng suy đoán (possibility): "Staff may consult external advisors regarding the tender offer."',
      modelAnswer: 'To express formal authorization: "Staff are expressly authorized to consult external advisors regarding the tender offer, provided that strict non-disclosure undertakings are executed." Alternatively, to express epistemic likelihood: "It is plausible that key staff will consult external advisors given the intricate valuation metrics of the tender offer."',
      checks: [
        'Chỉ rõ hai cách hiểu phân biệt (deontic authorization vs epistemic likelihood).',
        'Cung cấp phương án diễn đạt chuẩn xác, minh bạch hóa thẩm quyền và phán đoán.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-grammar-modality',
      title: 'The Cambridge Grammar of the English Language (Huddleston & Pullum)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Phân định tường minh giữa deontic modality (quyền hạn, nghĩa vụ) và epistemic modality (tri thức, suy luận).'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'british-council-modals',
      title: 'British Council: Modals – deduction and obligation',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-deductions-about-present',
      claims: ['Khảo sát sự biến thiên ngữ nghĩa của must, may, can trong các vai trò dụng học khác nhau.'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified deontic vs epistemic theoretical framework, 16 exercises, outputs, and sources with register nuance.',
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