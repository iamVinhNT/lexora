/**
 * @file c2.ts
 * @description Original Vietnamese C2 lessons on fine-grained meaning, discourse, and register variation.
 */
import { ownerApproval, type GrammarLesson, type GrammarSource } from './types.js';

const fallbackSources: GrammarSource[] = [
  { id: 'cambridge-cefr', title: 'Cambridge English: CEFR', url: 'https://www.cambridgeenglish.org/exams-and-tests/cefr/' },
  { id: 'cambridge-activities', title: 'Cambridge English: Learning activities', url: 'https://www.cambridgeenglish.org/learning-english/activities-for-learners/' },
  { id: 'purdue-grammar', title: 'Purdue OWL: Grammar', url: 'https://owl.purdue.edu/owl/general_writing/grammar/index.html' },
];
const narrativeSources: GrammarSource[] = [
  { id: 'british-council-c1-present', title: 'British Council: Advanced present simple and continuous', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/advanced-present-simple-continuous' },
];
const emphasisSources: GrammarSource[] = [
  { id: 'british-council-c1-emphasis', title: 'British Council: Emphasis: cleft sentences, inversion and auxiliaries', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries' },
];

export const c2Lessons: GrammarLesson[] = [
  {
    id: 'grammar-c2-modality-nuance', revisionId: 'grammar-c2-modality-nuance@1.0.0', revision: '1.0.0', title: 'Modality tinh tế: nguồn quyền hạn, suy luận và cam kết',
    objective: 'Phân biệt cách modal định vị nghĩa vụ, suy luận, khả năng và thái độ; chọn dạng theo nguồn phát ngôn và thời điểm.',
    prerequisiteIds: ['grammar-c1-register'], coverage: ['modality-nuance', 'deontic-epistemic-modality', 'modal-remoteness'],
    explanation: 'Một modal không có một mức nghĩa cố định: must có thể là nghĩa vụ do người nói áp đặt (You must submit the form) hoặc suy luận mạnh (She must be at home), còn have to thường làm nguồn quy định/hoàn cảnh nổi rõ hơn. Should có thể là lời khuyên, kỳ vọng có căn cứ, hoặc phê bình hồi cố trong should have + phân từ; cùng hình thức nhưng ngữ điệu, mệnh đề và tình huống quyết định cách hiểu. May/might/could có thể đánh dấu khả năng với mức dè dặt khác nhau trong một ngữ cảnh, song không tạo ra phần trăm xác suất phổ quát. Could/would trong lời yêu cầu thường biểu thị khoảng cách lịch sự, không đơn thuần là quá khứ. Phủ định cần đọc theo phạm vi: mustn’t thường cấm; don’t have to phủ định sự cần thiết; can’t be thường loại trừ khả năng. Khi nhận xét một người, “You must be exhausted” là suy luận, còn “You must rest” là chỉ dẫn; ngữ cảnh quyền lực và giọng nói có thể khiến câu giống mệnh lệnh. Nêu ai có quyền đặt nghĩa vụ và bằng chứng nào hỗ trợ suy luận để giải thích đúng sắc thái.',
    examples: [
      { english: 'The door is sealed, so the archive must be closed today.', vietnamese: 'Must be là suy luận từ dấu hiệu cửa niêm phong, không phải quy định buộc kho lưu trữ đóng cửa.' },
      { english: 'Under the revised policy, staff have to record each transfer, but they do not have to upload a copy immediately.', vietnamese: 'Have to gắn nghĩa vụ với chính sách; don’t have to nói việc tải ngay không bắt buộc, không phải bị cấm.' },
    ],
    contrasts: [{ form: 'You must not enter the archive without an escort.', whyFits: 'Trong ngữ cảnh biển quy định, must not cấm hành động; nguồn nghĩa vụ là quy tắc tiếp cận.', whyNot: '“You do not have to enter the archive” chỉ nói không bắt buộc phải vào, không ngăn người đọc bước vào. Nếu ý chỉ là kho có lẽ đang đóng, cần modal suy luận và ngữ cảnh bằng chứng khác.' }],
    commonMistakes: ['Gán xác suất số học cứng cho may, might hoặc could.', 'Nhầm can’t/don’t have to/mustn’t vì chỉ nhìn hình thức phủ định.', 'Đọc mọi should have như lời khuyên tương lai thay vì xét sắc thái tiếc nuối/phê bình hồi cố.'],
    summary: 'Giải thích modal bằng nguồn nghĩa vụ/bằng chứng, phạm vi phủ định, thời điểm và quan hệ người nói; một dạng có thể làm nhiều việc.',
    exercises: [{ id: 'grammar-c2-modality-nuance-q1', prompt: 'Quy định của tòa nhà cấm khách vào phòng lưu trữ một mình. Chọn câu thể hiện lệnh cấm, không phải lời khuyên.', options: [
      { text: 'Visitors must not enter the archive alone.', correct: true, rationale: 'Trong quy định, must not đặt lệnh cấm rõ với nguồn là chính sách của tòa nhà.' },
      { text: 'Visitors do not have to enter the archive alone.', correct: false, rationale: 'Câu này chỉ nói không cần vào một mình; nó không cấm việc đó.' },
      { text: 'Visitors should not enter the archive alone.', correct: false, rationale: 'Should thường đưa lời khuyên/kỳ vọng, nhẹ hơn và không nêu lệnh cấm bắt buộc như ngữ cảnh.' },
    ], acceptedAnswers: [{ text: 'Visitors must not enter the archive alone.', rationale: 'Must not biểu thị lệnh cấm trong quy định, khác với không bắt buộc hoặc lời khuyên.' }] }], sources: [
      { id: 'bc-modals-obligation', title: 'British Council: Modals: permission and obligation', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-permission-obligation' },
      { id: 'bc-modals-present', title: 'British Council: Modals: deductions about the present', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-present' },
      { id: 'bc-modals-past', title: 'British Council: Modals: deductions about the past', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-past' },
      { id: 'bc-requests', title: 'British Council: Requests, offers and invitations', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/requests-offers-invitations' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-c2-tense-aspect-discourse', revisionId: 'grammar-c2-tense-aspect-discourse@1.0.0', revision: '1.0.0', title: 'Thì và thể như lựa chọn tổ chức diễn ngôn',
    objective: 'Phân biệt thời gian tham chiếu với cách người viết đặt nền, tiến trình, sự kiện và khoảng cách kể chuyện.',
    prerequisiteIds: ['grammar-c2-modality-nuance'], coverage: ['tense-aspect-discourse', 'narrative-present', 'historical-present', 'aspectual-viewpoint'],
    explanation: 'Thì đặt sự việc vào quan hệ thời gian với điểm nhìn; thể cho thấy người viết nhìn sự việc như tiến trình, sự kiện trọn vẹn, kinh nghiệm hay trạng thái kéo dài. Vì vậy quá khứ đơn không chỉ là “xảy ra lâu rồi”, và hiện tại hoàn thành không chỉ là một mốc gần đây. Trong tường thuật, past continuous có thể dựng nền còn past simple đưa sự kiện tiến lên; past perfect lùi thêm một mốc khi thứ tự có ý nghĩa. Historical present đôi khi chuyển một biến cố quá khứ sang hiện tại để làm cảnh sống động hoặc tóm tắt cốt truyện: In 1912, the ship leaves port... Đây là lựa chọn diễn ngôn có tín hiệu khung quá khứ, không phải lỗi tự động; chuyển qua lại thiếu chủ ý mới gây nhiễu. Present simple cũng có thể nói lịch trình, chân lý khái quát hay quy ước tóm tắt. Thay thì có thể làm đổi tiêu điểm hoặc hiệu ứng người đọc dù trật tự thực tế không đổi. Hãy ghi mốc kể và chức năng từng câu trước khi sửa một đoạn; không sửa máy móc để mọi động từ có cùng một thì.',
    examples: [
      { english: 'The witness was describing the platform when the lights failed.', vietnamese: 'Was describing mở nền đang diễn ra; failed đưa sự kiện làm gián đoạn lên tiến trình kể.' },
      { english: 'In the final scene, Mara opens the envelope and discovers that the address is her own.', vietnamese: 'Hiện tại lịch sử tạo hiệu ứng tóm tắt sống động trong khung cốt truyện đã được thiết lập; các động từ thống nhất với hiệu ứng này.' },
    ],
    contrasts: [{ form: 'At the hearing, the witness paused, then corrected the date.', whyFits: 'Past simple kể các bước liên tiếp làm tiến trình sự kiện đi tới.', whyNot: '“At the hearing, the witness was pausing, then was correcting the date” đặt mỗi việc như nền kéo dài và làm mờ chuỗi hành động hoàn tất; tiếp diễn có thể dùng nếu người kể muốn nhấn khoảng ngập ngừng, nhưng không phải ý trung tính ở đây.' }],
    commonMistakes: ['Coi historical present luôn là lỗi lùi/tiến thì dù khung kể đã rõ.', 'Dùng past perfect cho mọi sự kiện trước trong một truyện, làm mất trục chính.', 'Chọn thì chỉ từ trạng từ đơn lẻ mà không xét chức năng thông tin của câu.'],
    summary: 'Thì/thể tổ chức điểm nhìn và nhịp diễn ngôn bên cạnh thời gian; theo dõi mốc kể, nền/sự kiện và hiệu ứng mà người viết chọn.',
    exercises: [{ id: 'grammar-c2-tense-aspect-discourse-q1', prompt: 'Trong tóm tắt tiểu thuyết đã xác định là quá khứ, người viết muốn tạo nhịp kể hiện tại lịch sử nhất quán: “At midnight, the caretaker ___ the bell, and the villagers ___.”', options: [
      { text: 'rings / wake', correct: true, rationale: 'Hiện tại lịch sử ở cả hai động từ tạo nhịp sự kiện liên tiếp trong cùng khung tóm tắt.' },
      { text: 'rang / wake', correct: false, rationale: 'Chuyển từ quá khứ sang hiện tại không có lý do diễn ngôn trong cụm sự kiện này làm khung thì thiếu nhất quán.' },
      { text: 'was ringing / were waking', correct: false, rationale: 'Tiếp diễn nhấn tiến trình đang diễn ra, không thực hiện mục tiêu kể chuỗi sự kiện trọn vẹn theo hiện tại lịch sử.' },
    ], acceptedAnswers: [{ text: 'rings / wake', rationale: 'Hai hiện tại đơn liên tiếp duy trì quy ước historical present và trình bày sự kiện theo thứ tự.' }] }], sources: narrativeSources, review: ownerApproval,
  },
  {
    id: 'grammar-c2-information-structure', revisionId: 'grammar-c2-information-structure@1.0.0', revision: '1.0.0', title: 'Information structure: chủ đề, tiêu điểm và thông tin đã biết',
    objective: 'Sắp xếp thành phần câu theo chủ đề và tiêu điểm để hỗ trợ mạch văn mà không làm thay đổi quan hệ ngữ pháp.',
    prerequisiteIds: ['grammar-c2-tense-aspect-discourse'], coverage: ['information-structure', 'topic-focus', 'end-weight'],
    explanation: 'Information structure mô tả cách người viết phân phối cái đang được nói tới (topic/theme) và phần đóng góp mới hoặc tương phản (focus/rheme); nó không đồng nhất máy móc với chủ ngữ/vị ngữ. Chủ ngữ thường là điểm xuất phát, nhưng trạng ngữ đầu câu có thể thiết lập khung: In the coastal villages, the pattern was different. Trật tự thông tin cũ→mới thường giúp người đọc nối câu, còn trọng lượng/cuối câu (end-weight) có thể để cụm dài ở cuối: The panel rejected the proposal that ... Fronting hoặc cleft có thể đặt phần cần đối chiếu vào vị trí nổi bật. Đổi trật tự không phải lúc nào cũng trung tính: “This file, I have not opened” đặt file thành chủ đề đối lập; câu “I have not opened this file” là báo tin trung tính hơn. Dùng bị động có thể giữ chủ đề xuyên câu, nhưng cũng có thể che tác nhân. Hãy hỏi câu trước đang nói về gì và câu hiện tại muốn thêm thông tin nào; trọng âm trong lời nói cũng có thể tạo focus mà không đổi trật tự. Không suy ra focus chỉ từ vị trí cuối nếu cấu trúc/nhấn giọng nói điều khác.',
    examples: [
      { english: 'The first report describes the northern site. The southern site, by contrast, remained unmeasured.', vietnamese: 'Southern site làm chủ đề nối mạch với northern site, còn by contrast báo phần thông tin mới tương phản.' },
      { english: 'That the committee overlooked the warning is difficult to explain.', vietnamese: 'Mệnh đề that dài làm chủ ngữ được đặt trước; có thể viết “It is difficult to explain why ...” nếu muốn cấu trúc nhẹ hơn nhưng sắc thái cú pháp thay đổi.' },
    ],
    contrasts: [{ form: 'The archive retained the original map; the later edition, it discarded.', whyFits: 'Later edition tiếp nối đối tượng đang so sánh và fronting tạo tương phản song song với original map.', whyNot: '“It discarded the later edition” vẫn đúng nhưng it có thể chỉ archive, đồng thời chuyển từ chủ đề edition sang archive; lựa chọn phụ thuộc chủ ý nối chủ đề chứ không chỉ độ đúng ngữ pháp.' }],
    commonMistakes: ['Đồng nhất topic với chủ ngữ trong mọi câu.', 'Fronting một cụm mà không tạo được liên kết hay tương phản khiến văn phong gượng.', 'Cho rằng cụm cuối câu luôn là tiêu điểm dù ngữ cảnh/trọng âm chỉ ra phần khác.'],
    summary: 'Sắp xếp câu theo chủ đề đang theo dõi và phần mới cần nêu; dùng trật tự đánh dấu chỉ khi nó hỗ trợ liên kết hoặc tương phản.',
    exercises: [{ id: 'grammar-c2-information-structure-q1', prompt: 'Câu trước giới thiệu “the western entrance”. Câu sau cần tiếp tục chủ đề và tương phản với cửa này; nhóm nghiên cứu đã khảo sát cửa phía đông trước. Chọn cách nối mạch rõ nhất.', options: [
      { text: 'The eastern entrance, the team surveyed first.', correct: true, rationale: 'Eastern entrance được đưa lên làm chủ đề tương phản tiếp nối cửa phía tây; first nằm ở phần thông tin mới.' },
      { text: 'The team surveyed the eastern entrance first.', correct: false, rationale: 'Câu đúng ngữ pháp và trung tính, nhưng giữ team làm chủ ngữ thay vì tiếp nối chủ đề entrance được yêu cầu.' },
      { text: 'First the western entrance surveyed the team.', correct: false, rationale: 'Trật tự này làm western entrance thành chủ thể khảo sát và không diễn đạt quan hệ nghĩa dự định.' },
    ], acceptedAnswers: [{ text: 'The eastern entrance, the team surveyed first.', rationale: 'Fronting cụm eastern entrance duy trì chủ đề đối chiếu, còn mệnh đề giữ đúng tác nhân team.' }] }], sources: emphasisSources, review: ownerApproval,
  },
  {
    id: 'grammar-c2-ellipsis-substitution', revisionId: 'grammar-c2-ellipsis-substitution@1.0.0', revision: '1.0.0', title: 'Ellipsis và substitution: lược hay thay để kiểm soát mạch lặp',
    objective: 'Chọn ellipsis hoặc từ thay thế theo cấu trúc lặp, phân biệt mức độ quy chiếu và tránh khiến người đọc đoán tiền ngữ.',
    prerequisiteIds: ['grammar-c2-information-structure'], coverage: ['ellipsis-substitution', 'substitution', 'pro-form-reference'],
    explanation: 'Ellipsis bỏ một thành phần có thể khôi phục từ cấu trúc và ngữ cảnh: “I can review the draft if you can” lược review the draft sau can. Substitution giữ một từ thay thế để người nghe nhận ra loại thành phần được nhắc lại: one/ones thay danh từ đếm được đã xác định (the blue one), do so thay một hành động (They promised to revise the map and did so), so/not thay một mệnh đề trong một số cấu trúc (I think so; I hope not). These/those có thể tham chiếu ý đã nêu nhưng thường cần danh từ hoặc ngữ cảnh đủ rõ; same cũng cần tiền ngữ xác định. Không phải mọi từ ngắn đều là phép thay cùng loại: so trong so I left có thể là liên từ kết quả chứ không thay mệnh đề. Ellipsis thường gọn hơn nhưng phụ thuộc khả năng phục hồi; substitution giữ dấu hiệu loại ngữ pháp và có thể tạo tương phản. Trong văn bản nhiều đối tượng, lặp lại danh từ chính có thể tốt hơn one/it/do so mơ hồ. Kiểm tra tiền ngữ, dạng số ít/số nhiều và vai cú pháp trước khi xóa/thay.',
    examples: [
      { english: 'The coastal map is newer than the inland one.', vietnamese: 'One thay danh từ đếm được map đã nhắc, tránh lặp map nhưng vẫn chỉ rõ cùng loại vật.' },
      { english: 'Mira promised to label every sample, and she did so before the review.', vietnamese: 'Do so thay cụm hành động label every sample; nó giữ dấu hiệu động từ/hành động, còn ellipsis thuần túy bỏ hẳn cụm ấy.' },
    ],
    contrasts: [{ form: 'We can archive the signed copies, and the unsigned ones can go to the editor.', whyFits: 'Ones thay copies số nhiều và tạo đối lập rõ giữa hai nhóm cùng loại.', whyNot: '“The unsigned can go to the editor” thường cần danh từ đã được lược theo một số biến thể/cấu trúc, nhưng trong văn bản này có thể mơ hồ người/vật; “the unsigned ones” làm phép thay hiển thị rõ. “The unsigned do so” lại cần tiền ngữ hành động, không phải danh từ copies.' }],
    commonMistakes: ['Dùng one(s) không khớp số lượng hoặc không có danh từ cùng loại làm tiền ngữ.', 'Dùng do so thay một danh từ thay vì hành động.', 'Lược thành phần khi nhiều tiền ngữ cạnh tranh khiến tham chiếu không rõ.'],
    summary: 'Ellipsis bỏ phần lặp có thể phục hồi; substitution đặt từ thay cho loại thành phần tương ứng. Chọn theo tiền ngữ và độ rõ, không chỉ để câu ngắn.',
    exercises: [{ id: 'grammar-c2-ellipsis-substitution-q1', prompt: 'Tránh lặp danh từ đếm được số nhiều “drafts” trong câu: “The first drafts are complete; the revised ___ are due tomorrow.”', options: [
      { text: 'ones', correct: true, rationale: 'Ones thay drafts số nhiều; revised ones vẫn xác định cùng loại tài liệu đã nêu.' },
      { text: 'one', correct: false, rationale: 'One là số ít, không hòa hợp với drafts số nhiều được nhắc tới.' },
      { text: 'do so', correct: false, rationale: 'Do so thay một hành động, trong khi vị trí trống cần danh từ drafts.' },
    ], acceptedAnswers: [{ text: 'ones', rationale: 'Ones là dạng số nhiều thay cho drafts và giữ đúng loại danh từ.' }] }], sources: [
      { id: 'bc-c1-ellipsis', title: 'British Council: Ellipsis', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/ellipsis' },
      { id: 'bc-one-ones', title: 'British Council: one and ones', url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/one-ones' },
    ], review: ownerApproval,
  },
  {
    id: 'grammar-c2-register-variation', revisionId: 'grammar-c2-register-variation@1.0.0', revision: '1.0.0', title: 'Biến thể register: thể loại, cộng đồng và mục tiêu',
    objective: 'Đánh giá lựa chọn cấu trúc theo thể loại và cộng đồng sử dụng, phân biệt khác biệt phong cách với lỗi gây hiểu nhầm.',
    prerequisiteIds: ['grammar-c2-ellipsis-substitution'], coverage: ['register-variation', 'genre-and-community', 'spoken-written-variation'],
    explanation: 'Register biến đổi theo kênh (nói/viết), thể loại (báo cáo, thư, phỏng vấn), quan hệ và cộng đồng quy ước; một lựa chọn không thể đánh giá chỉ bằng nhãn formal/informal. Trong hội thoại, câu rút gọn, contraction, discourse marker và lược bỏ có thể tự nhiên vì người nghe chia sẻ tình huống; văn bản học thuật thường cần quy chiếu tường minh và cấu trúc dễ kiểm tra. Tuy vậy, báo cáo nội bộ có thể dùng we, email học thuật có thể dùng contraction tùy chính sách, và diễn ngôn pháp lý có thể chấp nhận công thức riêng của thể loại. Biến thể Anh-Mỹ, Anh-Anh và các cộng đồng English khác nhau có khác biệt từ vựng, chính tả, phát âm và một số tập quán cú pháp; nhất quán với độc giả/mục tiêu quan trọng hơn xếp hạng biến thể. Phân biệt biến thể có hệ thống với lỗi ngẫu nhiên bằng ngữ cảnh, mẫu dùng ổn định và chuẩn mà tài liệu đang cam kết theo. Khi biên tập, nêu quy ước mục tiêu; đừng “sửa” tiếng Anh địa phương thành một chuẩn duy nhất nếu việc đó không phục vụ giao tiếp. Cũng không nên bắt chước đặc điểm biến thể mà mình không kiểm soát được nếu nó làm người đọc hiểu sai.',
    examples: [
      { english: 'Spoken: “Already sent it — want me to forward the receipt?”', vietnamese: 'Trong trao đổi trực tiếp giữa đồng nghiệp quen, chủ ngữ/trợ động từ có thể được lược nhờ ngữ cảnh chung; trong email cần lưu trữ hồ sơ, viết đầy đủ có thể phù hợp hơn.' },
      { english: 'Written record: “I have sent the document and can forward the receipt if required.”', vietnamese: 'Văn bản lưu trữ dùng câu đầy đủ, nêu rõ chủ thể và quan hệ điều kiện; không có nghĩa mọi lời nói ngắn đều sai ngữ pháp.' },
    ],
    contrasts: [{ form: '“The results are different from those reported in the earlier edition.”', whyFits: 'Those tránh lặp results và liên kết chính xác với nhóm kết quả trong một văn bản so sánh đã biên tập.', whyNot: '“The results are different than the old ones” có thể tự nhiên trong nhiều cách dùng Anh-Mỹ, nhưng nếu tài liệu đã cam kết chuẩn biên tập dùng from + those reported, hãy giữ lựa chọn nhất quán. Đây là khác biệt quy ước/register chứ không phải bằng chứng rằng một cộng đồng không biết ngữ pháp.' }],
    commonMistakes: ['Gọi một biến thể English là sai chỉ vì khác quy ước biên tập mình quen.', 'Bắt chước câu nói rút gọn trong báo cáo cần lưu trữ mà không xét người đọc.', 'Sửa khác biệt phong cách dù nó không ảnh hưởng mục tiêu, nhất quán hay khả năng hiểu.'],
    summary: 'Đánh giá cấu trúc theo thể loại, người đọc và quy ước được chọn; sửa lỗi gây cản trở hoặc không nhất quán, không xóa biến thể hợp lệ máy móc.',
    exercises: [{ id: 'grammar-c2-register-variation-q1', prompt: 'Một nhóm biên tập đã chọn chuẩn Anh-Anh cho tài liệu hướng tới độc giả tại Anh. Chọn câu giữ nhất quán chính tả đã quy định; ngữ cảnh không yêu cầu hội thoại.', options: [
      { text: 'The organisation will analyse the results before publication.', correct: true, rationale: 'Organisation và analyse theo chính tả Anh-Anh mục tiêu của tài liệu.' },
      { text: 'The organization will analyze the results before publication.', correct: false, rationale: 'Câu đúng trong quy ước Anh-Mỹ, nhưng không nhất quán với chuẩn Anh-Anh đã được chọn cho tài liệu này.' },
      { text: 'Org’ll analyse the results before publication.', correct: false, rationale: 'Dạng rút gọn này không phù hợp một tài liệu biên tập chính thức và làm từ organisation thiếu rõ.' },
    ], acceptedAnswers: [{ text: 'The organisation will analyse the results before publication.', rationale: 'Câu theo chuẩn chính tả Anh-Anh đã được nêu; biến thể khác có thể hợp lệ trong tài liệu theo chuẩn khác.' }] }], sources: fallbackSources, review: ownerApproval,
  },
];
