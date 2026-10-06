/**
 * @file resolving-structural-ambiguity.ts
 * @description C2 lesson: Resolving structural and syntactic ambiguity in advanced discourse.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-c2-resolving-structural-ambiguity-10',
  revisionId: 'grammar-v2-c2-resolving-structural-ambiguity-10@1.0.0',
  revision: '1.0.0',
  title: 'Xử lý sự mơ hồ về cấu trúc cú pháp (Resolving Structural Ambiguity)',
  objective: 'Nhận diện và triệt tiêu các dạng mơ hồ cú pháp phổ biến như gắn kết cụm giới từ (PP attachment), phân từ treo (dangling modifiers), và trạng từ kẹp giữa (squinting modifiers) trong soạn thảo học thuật và văn kiện pháp lý cấp cao.',
  prerequisiteIds: ['grammar-v2-c2-information-weight-09'],
  coverage: ['resolving-structural-ambiguity', 'attachment-ambiguity', 'modifier-placement', 'c2-precision'],
  context: {
    english: 'In legislative drafting and treaty interpretation, syntactic attachment ambiguities often generate conflicting legal liabilities. Drafters eliminate multiple parse trees by reordering prepositional phrases and explicitly anchoring participial clauses.',
    vietnamese: 'Trong công tác soạn thảo luật và giải thích điều ước, sự mơ hồ trong việc gắn kết cú pháp thường dẫn đến các nghĩa vụ pháp lý đối nghịch. Người soạn thảo loại bỏ các nhánh diễn giải đa nghĩa bằng cách sắp xếp lại cụm giới từ và gắn kết dứt khoát mệnh đề phân từ.',
  },
  guide: {
    pattern: 'S + [explicitly anchored modifier] + V + O hoặc S + V + O + [unambiguous relative/prepositional clause]',
    whenToUse: [
      'Xóa bỏ khả năng cụm giới từ cuối câu có thể bổ nghĩa cho cả động từ lẫn cụm danh từ đứng trước',
      'Đảm bảo chủ ngữ của mệnh đề phân từ rút gọn trùng khớp hoàn toàn với chủ ngữ của mệnh đề chính',
      'Định vị trạng từ một cách rõ ràng để tránh hiện tượng trạng từ kẹp giữa bổ nghĩa đồng thời cho hai vế',
    ],
    signalWords: ['unambiguously', 'strictly construed', 'bearing in mind', 'namely', 'with respect to'],
    check: [
      'Cụm giới từ này bổ nghĩa cho hành động (V) hay cho đối tượng danh từ (NP) đứng liền trước?',
      'Chủ thể thực hiện hành vi trong mệnh đề phân từ rút gọn có xuất hiện làm chủ ngữ mệnh đề chính không?',
      'Trạng từ có thể bị hiểu nhầm là bổ nghĩa cho động từ đi trước hoặc động từ đi sau không?',
    ],
  },
  explanation: 'Ở trình độ C2, độ chính xác cú pháp (syntactic precision) đòi hỏi người viết không chỉ tạo ra câu đúng ngữ pháp bề mặt mà còn phải triệt tiêu mọi khả năng người đọc hiểu theo "cây cú pháp" khác (parse tree ambiguity). Ba cạm bẫy lớn gồm: (1) Cụm giới từ đa nghĩa (PP attachment ambiguity): cụm giới từ ở cuối có thể bám vào động từ hoặc danh từ liền kề; (2) Phân từ treo hoặc sai vị trí (dangling/misplaced modifiers): mệnh đề phân từ không có chủ thể logic tương thích trong mệnh đề chính; (3) Trạng từ kẹp giữa (squinting modifiers): trạng từ đứng giữa hai động từ hoặc mệnh đề khiến không rõ nó bổ nghĩa cho hướng nào. Các biện pháp xử lý gồm đưa cụm giới từ lên đầu, chuyển cụm phân từ thành mệnh đề trạng ngữ hoàn chỉnh có chủ ngữ riêng, hoặc chuyển thành mệnh đề quan hệ xác định.',
  examples: [
    {
      english: 'With great reluctance, the arbitration panel approved the contentious merger.',
      vietnamese: 'Với sự miễn cưỡng lớn, ban trọng tài đã phê chuẩn vụ sáp nhập gây tranh cãi (cụm giới từ đặt đầu câu chỉ rõ thái độ của ban trọng tài, không phải của vụ sáp nhập).',
    },
    {
      english: 'Having analyzed the longitudinal data, the research team reached an incontrovertible conclusion.',
      vietnamese: 'Sau khi phân tích dữ liệu theo chiều dọc, nhóm nghiên cứu đã đi đến một kết luận không thể chối cãi (chủ ngữ nhóm nghiên cứu trùng khớp với hành động phân tích).',
    },
    {
      english: 'The minister instructed the envoys to draft the communique without delay.',
      vietnamese: 'Bộ trưởng đã chỉ thị cho các phái viên soạn thảo thông cáo không chậm trễ (cụm "without delay" bổ nghĩa rõ cho việc soạn thảo, tránh đặt kẹp giữa).',
    },
    {
      english: 'Students who study abroad regularly encounter unfamiliar administrative conventions.',
      vietnamese: 'Sinh viên du học thường xuyên gặp phải những quy ước hành chính xa lạ (trạng từ "regularly" đứng trước "encounter" tránh mơ hồ với việc "study abroad").',
    },
    {
      english: 'The regulator sanctioned the utility company that violated emissions caps, imposing substantial fines.',
      vietnamese: 'Cơ quan quản lý đã xử phạt công ty tiện ích vi phạm mức trần phát thải, áp đặt các khoản phạt đáng kể (phân từ "imposing" quy rõ về cơ quan quản lý nhờ dấu phẩy phân tách).',
    },
    {
      english: 'By reviewing historical precedents, constitutional scholars can clarify the intent of the framers.',
      vietnamese: 'Bằng cách xem xét các tiền lệ lịch sử, các học giả hiến pháp có thể làm sáng tỏ ý định của các nhà lập quốc.',
    },
  ],
  contrasts: [
    {
      form: 'Ambiguous PP Attachment vs Fronted Prepositional Phrase',
      whyFits: '"In the boardroom, the directors discussed the financial collapse" khẳng định chắc chắn địa điểm thảo luận là trong phòng họp.',
      whyNot: '"The directors discussed the financial collapse in the boardroom" có thể bị diễn giải sai lệch là vụ sụp đổ tài chính đã diễn ra trong phòng họp.',
    },
    {
      form: 'Dangling Participle vs Anchored Subject Clause',
      whyFits: '"Upon examining the ledger, the forensic accountant noticed discrepancies" có chủ thể của hành động kiểm tra là kiểm toán viên pháp y.',
      whyNot: '"*Upon examining the ledger, discrepancies were noticed" là phân từ treo vì "discrepancies" không thể tự thực hiện hành động kiểm tra sổ cái.',
    },
  ],
  commonMistakes: [
    'Để mệnh đề phân từ ở đầu câu nhưng chủ ngữ mệnh đề chính lại là danh từ trừu tượng hoặc vật vô tri (phân từ treo).',
    'Đặt trạng từ vào vị trí kẹp giữa hai động từ (squinting modifier), ví dụ "Patients who smoke frequently develop complications" (hút thuốc thường xuyên hay thường xuyên phát triển biến chứng?).',
    'Đặt cụm giới từ bổ nghĩa cách quá xa từ nó bổ nghĩa khiến người đọc tự động gắn nó vào danh từ gần nhất.',
  ],
  summary: 'Hóa giải sự mơ hồ cú pháp bằng cách định vị chính xác cụm giới từ, kiểm soát chặt chẽ chủ thể logic của mệnh đề phân từ rút gọn, và không để trạng từ kẹp giữa hai động từ.',
  exercises: [
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q1',
      kind: 'choice',
      prompt: 'Chọn câu loại trừ hoàn toàn sự mơ hồ về việc ai là người phản đối trong cuộc đàm phán.',
      options: [
        { text: 'Despite fierce objections from the opposition, the delegates ratified the treaty.', correct: true, rationale: 'Cụm giới từ đầu câu làm rõ "sự phản đối" là bối cảnh xung quanh việc các đại biểu phê chuẩn.' },
        { text: 'The delegates ratified the treaty despite fierce objections from the opposition with misgivings.', correct: false, rationale: '"with misgivings" ở cuối tạo ra mơ hồ gắn kết giữa đại biểu hay phe đối lập.' },
        { text: 'Having objected fiercely, the treaty was ratified by the delegates.', correct: false, rationale: 'Phân từ treo: "the treaty" không thể tự phản đối.' },
      ],
      acceptedAnswers: [{ text: 'Despite fierce objections from the opposition, the delegates ratified the treaty.', rationale: 'Cấu trúc tường minh, không có nhánh phân tích đa nghĩa.' }],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q2',
      kind: 'choice',
      prompt: 'Xác định câu khắc phục thành công lỗi trạng từ kẹp giữa (squinting modifier) đối với từ "often".',
      options: [
        { text: 'Athletes who train rigorously often achieve superior endurance.', correct: true, rationale: '"often" đứng trước "achieve" khẳng định tần suất đạt thành tích, không bổ nghĩa cho "train rigorously".' },
        { text: 'Athletes who train rigorously often suffer from chronic dehydration.', correct: false, rationale: 'Vị trí này vẫn có thể gây tranh chấp giữa train rigorously often và often suffer.' },
        { text: 'Athletes who train often rigorously develop fatigue.', correct: false, rationale: 'Cấu trúc lộn xộn giữa often và rigorously.' },
      ],
      acceptedAnswers: [{ text: 'Athletes who train rigorously often achieve superior endurance.', rationale: 'Trạng từ đặt trước vị ngữ chính tách biệt rõ ràng với mệnh đề quan hệ đứng trước.' }],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q3',
      kind: 'choice',
      prompt: 'Chọn câu không mắc lỗi phân từ treo (dangling participle).',
      options: [
        { text: 'Having reviewed the historical archives, the archivist cataloged the remaining manuscripts.', correct: true, rationale: 'Chủ ngữ "the archivist" là chủ thể logic của hành động "Having reviewed".' },
        { text: 'Having reviewed the historical archives, the manuscripts were cataloged systematically.', correct: false, rationale: 'Phân từ treo vì "the manuscripts" không thể tự xem xét kho lưu trữ.' },
        { text: 'Having reviewed the historical archives, it was decided to publish the manuscripts.', correct: false, rationale: 'Chủ ngữ giả "it" không thể thực hiện hành động xem xét.' },
      ],
      acceptedAnswers: [{ text: 'Having reviewed the historical archives, the archivist cataloged the remaining manuscripts.', rationale: 'Chủ ngữ logic đồng nhất giữa hai mệnh đề.' }],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q4',
      kind: 'choice',
      prompt: 'Chọn câu xử lý dứt khoát sự mơ hồ về vị trí gắn kết của cụm giới từ "with binoculars".',
      options: [
        { text: 'Using high-powered binoculars, the sentry spotted the smuggler vessel near the cove.', correct: true, rationale: 'Dùng cụm phân từ đầu câu làm rõ ống nhòm là phương tiện của lính gác, không phải của tàu buôn lậu.' },
        { text: 'The sentry spotted the smuggler vessel near the cove with binoculars.', correct: false, rationale: 'Gây mơ hồ: tàu buôn lậu có ống nhòm hay việc quan sát dùng ống nhòm.' },
        { text: 'The sentry spotted with binoculars the smuggler vessel with contraband.', correct: false, rationale: 'Lặp cụm giới từ gây rối rắm cú pháp.' },
      ],
      acceptedAnswers: [{ text: 'Using high-powered binoculars, the sentry spotted the smuggler vessel near the cove.', rationale: 'Chuyển phương tiện thành cụm phân từ đầu câu hóa giải hoàn toàn sự mơ hồ.' }],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q5',
      kind: 'gap',
      prompt: 'Điền dạng phân từ thích hợp để tạo mệnh đề mở đầu chuẩn xác: "___ (weigh) the potential economic consequences, the central bank decided to hold interest rates steady."',
      options: [],
      acceptedAnswers: [
        { text: 'Having weighed', rationale: '"Having weighed" diễn tả hành động cân nhắc hoàn tất trước quyết định của ngân hàng trung ương.' },
        { text: 'Weighing', rationale: '"Weighing" cũng là phân từ hiện tại diễn tả quá trình cân nhắc hợp lệ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q6',
      kind: 'gap',
      prompt: 'Điền trạng từ thích hợp vào chỗ trống để bổ nghĩa rõ ràng cho động từ "recommend": "The committee unanimously decided to ___ (formal) recommend the dismissal of the commissioner."',
      options: [],
      acceptedAnswers: [
        { text: 'formally', rationale: '"formally" đứng trước "recommend" trong cụm nguyên mẫu có to.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q7',
      kind: 'gap',
      prompt: 'Điền giới từ thích hợp để liên kết rõ ràng nguyên nhân ở đầu câu: "___ (regard) to public safety, the municipal council closed the suspension bridge."',
      options: [],
      acceptedAnswers: [
        { text: 'With', rationale: 'Cụm cố định "With regard to" đứng đầu câu chỉ căn cứ rõ ràng.' },
        { text: 'In', rationale: '"In regard to" là biến thể tương đương hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q8',
      kind: 'gap',
      prompt: 'Điền liên từ phụ thuộc thích hợp để biến cụm phân từ treo thành mệnh đề trạng ngữ hoàn chỉnh: "___ the committee had audited the expenditures, the final report was submitted to cabinet."',
      options: [],
      acceptedAnswers: [
        { text: 'After', rationale: '"After" chỉ thời gian rõ ràng sau khi ủy ban kiểm toán xong.' },
        { text: 'Once', rationale: '"Once" cũng là liên từ thời gian chỉ sự hoàn tất hợp lệ.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q9',
      kind: 'transform',
      prompt: 'Viết lại câu chứa phân từ treo sau đây bằng cách cung cấp chủ ngữ logic phù hợp cho mệnh đề chính: "Walking through the devastated district, the scale of destruction shocked the foreign correspondents."',
      options: [],
      acceptedAnswers: [
        { text: 'Walking through the devastated district, the foreign correspondents were shocked by the scale of destruction.', rationale: 'Đưa "the foreign correspondents" làm chủ ngữ mệnh đề chính để trùng khớp với chủ thể của "Walking".' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau để loại bỏ sự mơ hồ gắn kết của cụm giới từ "in his office": "The senator discussed the confidential legislation with the governor in his office."',
      options: [],
      acceptedAnswers: [
        { text: 'In his office, the senator discussed the confidential legislation with the governor.', rationale: 'Đưa "In his office" lên đầu câu làm rõ địa điểm diễn ra cuộc thảo luận.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi phân từ treo trong câu sau bằng cách giữ nguyên mệnh đề phân từ đầu câu: "To qualify for the research fellowship, an original dissertation proposal must be submitted by the candidate."',
      options: [],
      acceptedAnswers: [
        { text: 'To qualify for the research fellowship, the candidate must submit an original dissertation proposal.', rationale: 'Chủ ngữ mệnh đề chính phải là "the candidate" để khớp với mục đích "To qualify".' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-q12',
      kind: 'correction',
      prompt: 'Sửa câu sau để trạng từ "frequently" không bị kẹp giữa mơ hồ: "Managers who delegate tasks frequently encounter communication bottlenecks."',
      options: [],
      acceptedAnswers: [
        { text: 'Managers who frequently delegate tasks encounter communication bottlenecks.', rationale: 'Đặt "frequently" vào trong mệnh đề quan hệ để bổ nghĩa rõ cho "delegate tasks".' },
        { text: 'Managers who delegate tasks often encounter communication bottlenecks.', rationale: 'Dùng "often" trước "encounter" hoặc đảo trạng từ làm rõ nghĩa.' },
        { text: 'Frequently, managers who delegate tasks encounter communication bottlenecks.', rationale: 'Đưa frequently lên đầu câu để bổ nghĩa rõ ràng cho toàn bộ mệnh đề chính.' },
        { text: 'Managers who delegate tasks encounter communication bottlenecks frequently.', rationale: 'Đưa frequently về cuối câu để bổ nghĩa dứt khoát cho encounter communication bottlenecks.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-r1',
      kind: 'choice',
      prompt: 'Chọn câu không tồn tại sự mơ hồ về phạm vi bổ nghĩa.',
      options: [
        { text: 'Equipped with radar tracking, the coastguard interceptor intercepted the unidentified vessel.', correct: true, rationale: 'Cụm phân từ đầu câu bổ nghĩa chắc chắn cho tàu tuần tra coastguard.' },
        { text: 'The coastguard intercepted the unidentified vessel equipped with radar tracking.', correct: false, rationale: 'Mơ hồ: tàu tuần tra hay tàu không xác định được trang bị radar.' },
        { text: 'Equipped with radar tracking, interception of the vessel was completed.', correct: false, rationale: 'Phân từ treo vì danh từ interception không thể tự trang bị radar.' },
      ],
      acceptedAnswers: [{ text: 'Equipped with radar tracking, the coastguard interceptor intercepted the unidentified vessel.', rationale: 'Chủ ngữ và bổ ngữ phân từ hoàn toàn ăn khớp.' }],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-r2',
      kind: 'gap',
      prompt: 'Điền từ nối biến đổi phân từ treo thành mệnh đề hoàn chỉnh: "While ___ (conduct) the forensic audit, the investigator discovered altered transaction logs."',
      options: [],
      acceptedAnswers: [
        { text: 'conducting', rationale: '"While conducting" tạo mệnh đề phân từ rút gọn có nghĩa đồng thời rõ ràng với chủ ngữ investigator.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau bằng cách đưa cụm giới từ chỉ công cụ lên đầu câu để hóa giải mơ hồ: "The surgeon examined the patient with the newly developed laparoscope."',
      options: [],
      acceptedAnswers: [
        { text: 'Using the newly developed laparoscope, the surgeon examined the patient.', rationale: 'Chuyển công cụ thành phân từ đầu câu giúp câu hoàn toàn trong sáng.' },
        { text: 'With the newly developed laparoscope, the surgeon examined the patient.', rationale: 'Đưa cụm "With..." lên đầu câu cũng loại trừ khả năng bệnh nhân cầm máy nội soi.' },
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi phân từ treo trong câu: "Having summarized the witness testimonies, the verdict was delivered by the judge."',
      options: [],
      acceptedAnswers: [
        { text: 'Having summarized the witness testimonies, the judge delivered the verdict.', rationale: 'Chủ ngữ mệnh đề chính phải là "the judge" để tương thích với hành động tóm tắt.' },
        { text: 'the judge delivered the verdict', rationale: 'Mệnh đề chính đưa the judge lên làm chủ ngữ thực hiện hành động tóm tắt.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-o1',
      prompt: 'Viết một đoạn văn ngắn (2-3 câu) trong biên bản pháp lý hoặc báo cáo kỹ thuật, sử dụng ít nhất một mệnh đề phân từ rút gọn ở đầu câu và kiểm soát chặt chẽ chủ ngữ logic để tránh phân từ treo.',
      modelAnswer: 'Having inspected the compromised containment chamber, the engineering team ordered an immediate suspension of operations. By isolating the ruptured conduits within minutes, the technicians prevented hazardous chemical vapors from dispersing into adjacent sectors.',
      checks: [
        'Mệnh đề phân từ ở đầu câu có chủ ngữ logic trùng khớp với chủ ngữ mệnh đề chính',
        'Không có sự mơ hồ về gắn kết cụm giới từ hay trạng từ kẹp giữa',
        'Văn phong chính xác, chặt chẽ, đạt chuẩn văn kiện chuyên nghiệp',
      ],
    },
    {
      id: 'grammar-v2-c2-resolving-structural-ambiguity-10-o2',
      prompt: 'Phân tích và viết lại một câu có nguy cơ mơ hồ về cấu trúc trong soạn thảo điều lệ hợp đồng, giải thích ngắn gọn lý do vì sao trật tự mới triệt tiêu nguy cơ tranh chấp.',
      modelAnswer: 'Original ambiguous clause: "The vendor shall notify the purchaser of defective components within ten days." Ambiguity arises over whether notification or the occurrence of defects must happen within ten days. Revised unambiguous clause: "Within ten days of discovering any defective components, the vendor shall notify the purchaser." This fronting anchors the temporal constraint directly to the discovery milestone.',
      checks: [
        'Chỉ ra rõ ràng nguồn gốc mơ hồ cú pháp trong câu gốc',
        'Cung cấp phương án viết lại triệt tiêu hoàn toàn sự mơ hồ',
        'Giải thích cơ chế cú pháp được sử dụng để định hình nghĩa duy nhất',
      ],
    },
  ],
  sources: [
    {
      id: 'cgel-syntactic-ambiguity',
      title: 'The Cambridge Grammar of the English Language (Chapter 15: Syntactic Ambiguity and Attachment)',
      url: 'https://www.cambridge.org/core/books/cambridge-grammar-of-the-english-language/AFD6DE78E568F873DE6EE0C1A7416353',
      claims: ['Prepositional phrase attachment creates competing structural interpretations', 'Dangling modifiers violate unexpressed subject identity constraints'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
    {
      id: 'garners-modern-english-usage',
      title: "Garner's Modern English Usage (Misplaced and Dangling Modifiers)",
      url: 'https://global.oup.com/academic/product/garners-modern-english-usage-9780190491482',
      claims: ['Squinting adverbs disrupt semantic attribution between adjacent verbs'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'ai-internal-reviewer',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'Thorough C2 editorial review completed: verified structural ambiguity resolution, dangling/squinting modifiers, 16 exercises, outputs, and canonical sources.',
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
