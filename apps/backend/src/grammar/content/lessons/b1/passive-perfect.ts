/**
 * @file passive-perfect.ts
 * @description Bài học B1 về thể bị động ở các thì hoàn thành (Passive Voice - Perfect Tenses: have/has been + V3/ed, had been + V3/ed).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-passive-perfect-14',
  revisionId: 'grammar-v2-b1-passive-perfect-14@1.0.0',
  revision: '1.0.0',
  title: 'Thể bị động ở các thì hoàn thành (Passive Voice - Perfect Tenses)',
  objective: 'Sử dụng cấu trúc bị động thì hiện tại hoàn thành (have/has been + V3/ed) và quá khứ hoàn thành (had been + V3/ed) để cập nhật tiến độ công việc và diễn đạt hành động hoàn tất trước một mốc thời gian.',
  prerequisiteIds: ['grammar-v2-b1-passive-past-13'],
  coverage: ['passive-perfect', 'passive-voice', 'present-perfect-passive', 'past-perfect-passive', 'b1-grammar'],
  context: {
    english: 'The airport authority announced that two new international terminals have been opened this month. Before the grand opening ceremony yesterday, all security scanners had already been tested and certified by aviation regulators.',
    vietnamese: 'Ban quản lý sân bay thông báo rằng hai nhà ga quốc tế mới đã được khánh thành trong tháng này. Trước buổi lễ khai mạc trọng thể vào ngày hôm qua, tất cả các máy quét an ninh đều đã được thử nghiệm và cấp chứng nhận bởi các cơ quan quản lý hàng không.',
  },
  guide: {
    pattern: 'Hiện tại hoàn thành bị động: S + have/has been + V3/ed; Quá khứ hoàn thành bị động: S + had been + V3/ed',
    whenToUse: [
      'Báo cáo tin tức gần đây, cập nhật tiến độ dự án hoặc thông báo kết quả mới hoàn thành (Present Perfect Passive).',
      'Diễn tả sự việc bị động đã hoàn thành trước một mốc thời gian hoặc trước một hành động khác trong quá khứ (Past Perfect Passive).',
      'Nhấn mạnh vào tình trạng hoàn tất của đối tượng mà không cần tập trung vào người thực hiện.',
    ],
    signalWords: ['has been completed', 'have already been sent', 'had been warned', 'just', 'recently', 'by the time', 'so far'],
    check: [
      'Bắt buộc phải có "been" đứng giữa trợ động từ (have/has/had) và quá khứ phân từ V3/ed; thiếu "been" câu sẽ biến thành thể chủ động.',
      'Hiện tại hoàn thành: chủ ngữ số ít dùng has been, số nhiều dùng have been.',
      'Quá khứ hoàn thành: dùng had been cho tất cả các ngôi khi có mốc quá khứ đối chiếu.',
    ],
  },
  explanation: 'Thể bị động ở các thì hoàn thành kết hợp hai yếu tố ngữ pháp: tính hoàn tất (Perfect aspect) và tính bị động (Passive voice). Yếu tố cốt lõi của cấu trúc này là trợ động từ "been" (dạng phân từ của to be):\n\n1. Hiện tại hoàn thành bị động (Present Perfect Passive):\nCông thức: S + have/has been + V3/ed.\nDùng khi muốn thông báo một sự việc vừa xảy ra hoặc vừa hoàn thành xong và kết quả của nó đang có hiệu lực ở hiện tại. Ví dụ: "The missing files have been recovered" (Các tệp bị mất đã được khôi phục – tin vui ở hiện tại).\n\n2. Quá khứ hoàn thành bị động (Past Perfect Passive):\nCông thức: S + had been + V3/ed.\nDùng khi muốn chỉ rõ một sự việc bị động đã xảy ra và hoàn tất TRƯỚC một sự kiện quá khứ khác. Ví dụ: "When we arrived at the concert, all the front-row seats had already been reserved" (Khi chúng tôi tới, các ghế hàng đầu đều đã được đặt chỗ từ trước).\n\nLỗi sai nghiêm trọng nhất mà người học B1 thường mắc phải là quên từ "been":\n- "The road has repaired" (Sai: có nghĩa là con đường tự đi sửa cái gì đó!).\n- "The road has been repaired" (Đúng: con đường đã được sửa chữa).',
  examples: [
    {
      english: 'A new community park has been established in our district recently.',
      vietnamese: 'Một công viên cộng đồng mới vừa được thành lập tại quận chúng tôi gần đây (Present Perfect Passive).',
    },
    {
      english: 'All invitations have already been emailed to the conference delegates.',
      vietnamese: 'Tất cả thư mời đều đã được gửi qua thư điện tử tới các đại biểu hội nghị.',
    },
    {
      english: 'Has the software bug been resolved by the engineering team yet?',
      vietnamese: 'Lỗi phần mềm đã được đội ngũ kỹ thuật xử lý xong chưa?',
    },
    {
      english: 'By the time the guests sat down, the banquet tables had been decorated with fresh orchids.',
      vietnamese: 'Trước khi khách ngồi vào bàn, các bàn tiệc đã được trang trí bằng hoa lan tươi (Past Perfect Passive).',
    },
    {
      english: 'He realized that his passport had been left in the hotel safety deposit box.',
      vietnamese: 'Anh ấy nhận ra rằng hộ chiếu của mình đã bị để quên trong két sắt an toàn của khách sạn.',
    },
    {
      english: 'Several historic monuments have been damaged by the recent earthquake.',
      vietnamese: 'Một vài di tích lịch sử đã bị hư hại do trận động đất gần đây.',
    },
  ],
  contrasts: [
    {
      form: 'Present Perfect Passive vs Past Perfect Passive',
      whyFits: 'The package has been delivered (bưu kiện vừa được giao, hiện tại đang ở cửa nhà).',
      whyNot: 'The package had been delivered before I woke up (bưu kiện đã được giao trước một mốc quá khứ cụ thể).',
    },
    {
      form: 'has been repaired vs has repaired',
      whyFits: 'The bicycle has been repaired (chiếc xe đạp được sửa, thể bị động có been).',
      whyNot: 'The bicycle has repaired (sai nghiêm trọng vì thiếu been biến thành chủ động).',
    },
  ],
  commonMistakes: [
    'Quên từ "been" trong cấu trúc bị động hoàn thành: nói "The report has published" (sai, phải là "The report has been published").',
    'Nhầm lẫn giữa has been và have been cho danh từ số ít/nhiều: nói "The documents has been signed" (sai, phải là "have been signed").',
    'Dùng nhầm thì Quá khứ hoàn thành bị động khi không có mốc quá khứ nào để so sánh.',
  ],
  summary: 'Passive Perfect (have/has been + V3/ed cho hiện tại; had been + V3/ed cho quá khứ) nhấn mạnh kết quả hoàn tất của đối tượng. Luôn phải có "been".',
  exercises: [
    {
      id: 'grammar-v2-b1-passive-perfect-14-q1',
      kind: 'choice',
      prompt: 'Chọn dạng bị động thích hợp cho cập nhật tin tức tiến độ hiện tại: "The bridge repair work ___ successfully ahead of schedule."',
      options: [
        { text: 'has been completed', correct: true, rationale: 'Chủ ngữ số ít repair work đi với has been completed chỉ kết quả vừa hoàn thành.' },
        { text: 'have been completed', correct: false, rationale: 'Repair work là danh từ không đếm được/số ít, không đi với have.' },
        { text: 'has completed', correct: false, rationale: 'Thiếu been biến câu thành chủ động, công việc sửa chữa không tự hoàn thành.' },
      ],
      acceptedAnswers: [{ text: 'has been completed', rationale: 'Present Perfect Passive số ít: has been completed.' }],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q2',
      kind: 'choice',
      prompt: 'Chọn dạng bị động xảy ra trước một mốc quá khứ: "When the author reached the bookstore, all copies of her book ___ ."',
      options: [
        { text: 'had already been sold', correct: true, rationale: 'Sách đã được bán hết trước thời điểm tác giả đến hiệu sách (Past Perfect Passive).' },
        { text: 'have already been sold', correct: false, rationale: 'Have been sold là hiện tại hoàn thành, không hòa hợp với mốc quá khứ reached.' },
        { text: 'were already selling', correct: false, rationale: 'Selling là chủ động đang bán, không diễn tả sách đã được bán hết trọn vẹn.' },
      ],
      acceptedAnswers: [{ text: 'had already been sold', rationale: 'Past Perfect Passive: had been sold trước mốc quá khứ.' }],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q3',
      kind: 'choice',
      prompt: 'Chọn câu hỏi bị động chính xác ở thì Hiện tại hoàn thành: "___ all the participant certificates ___ yet?"',
      options: [
        { text: 'Have / been printed', correct: true, rationale: 'Chủ ngữ số nhiều certificates đi với Have... been printed.' },
        { text: 'Has / been printed', correct: false, rationale: 'Certificates là số nhiều, không dùng Has.' },
        { text: 'Have / printed', correct: false, rationale: 'Thiếu been khiến câu trở thành chủ động.' },
      ],
      acceptedAnswers: [{ text: 'Have / been printed', rationale: 'Have... been printed là câu hỏi bị động số nhiều ở Hiện tại hoàn thành.' }],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q4',
      kind: 'choice',
      prompt: 'Chọn dạng phủ định bị động của thì Hiện tại hoàn thành: "The confidential financial report ___ to the public."',
      options: [
        { text: 'has not been disclosed', correct: true, rationale: 'Bị động phủ định thì Hiện tại hoàn thành ngôi thứ ba số ít: has not been disclosed.' },
        { text: 'have not been disclosed', correct: false, rationale: 'Report là số ít, không đi với have.' },
        { text: 'has not disclosed', correct: false, rationale: 'Thiếu been biến bản báo cáo thành chủ thể tự tiết lộ.' },
      ],
      acceptedAnswers: [{ text: 'has not been disclosed', rationale: 'Present Perfect Passive phủ định: has not been disclosed.' }],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q5',
      kind: 'gap',
      prompt: 'Over twenty new species of deep-sea creatures ___ (discover) by oceanographers this year.',
      options: [],
      acceptedAnswers: [
        { text: 'have been discovered', rationale: 'Chủ ngữ số nhiều species đi với have been discovered trong khoảng thời gian this year.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q6',
      kind: 'gap',
      prompt: 'By the time the fire department arrived, the blaze ___ (already / extinguish) by neighborhood volunteers.',
      options: [],
      acceptedAnswers: [
        { text: 'had already been extinguished', rationale: 'Đám cháy đã được dập tắt trước khi lính cứu hỏa đến (Past Perfect Passive).' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q7',
      kind: 'gap',
      prompt: 'The damaged painting ___ (restore) carefully by museum experts over the past six months.',
      options: [],
      acceptedAnswers: [
        { text: 'has been restored', rationale: 'Chủ ngữ số ít painting đi với has been restored.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q8',
      kind: 'gap',
      prompt: 'David discovered that his bicycle ___ (steal) from the university campus while he was attending lectures.',
      options: [],
      acceptedAnswers: [
        { text: 'had been stolen', rationale: 'Chiếc xe đạp đã bị đánh cắp trước thời điểm David phát hiện ra (Past Perfect Passive).' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Three modern hospitals have been constructed..." để chuyển sang bị động: "The regional government has constructed three modern hospitals over the past decade."',
      options: [],
      acceptedAnswers: [
        { text: 'Three modern hospitals have been constructed over the past decade.', rationale: 'Chuyển tân ngữ số nhiều three modern hospitals lên đầu câu với have been constructed và lược bỏ tác nhân chính quyền.' },
        { text: 'Three modern hospitals have been constructed by the regional government over the past decade.', rationale: 'Biến thể giữ lại tác nhân by the regional government.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Before the manager arrived, the financial report had already been..." để viết lại: "The accountant had already reviewed the financial report before the manager arrived."',
      options: [],
      acceptedAnswers: [
        { text: 'Before the manager arrived, the financial report had already been reviewed.', rationale: 'Chuyển sang Quá khứ hoàn thành bị động với had already been reviewed.' },
        { text: 'Before the manager arrived, the financial report had already been reviewed by the accountant.', rationale: 'Biến thể giữ lại tác nhân kế toán.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu "been" khiến câu biến thành thể chủ động vô nghĩa: "The stolen jewelry has recovered by the police detectives."',
      options: [],
      acceptedAnswers: [
        { text: 'The stolen jewelry has been recovered by the police detectives.', rationale: 'Thêm been vào sau has để tạo cấu trúc bị động has been recovered.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi chia nhầm trợ động từ số nhiều trong câu bị động: "A new environmental law have been passed by the national parliament."',
      options: [],
      acceptedAnswers: [
        { text: 'A new environmental law has been passed by the national parliament.', rationale: 'Chủ ngữ số ít a new environmental law đòi hỏi trợ động từ has been passed.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-passive-perfect-14-r1',
      kind: 'choice',
      prompt: 'Chọn câu thông báo dự án chính xác nhất:',
      options: [
        { text: 'All project milestones have been achieved on schedule.', correct: true, rationale: 'Have been achieved là thể bị động Hiện tại hoàn thành số nhiều chuẩn mực.' },
        { text: 'All project milestones has been achieved on schedule.', correct: false, rationale: 'Milestones là số nhiều, không đi với has.' },
        { text: 'All project milestones have achieved on schedule.', correct: false, rationale: 'Thiếu been khiến câu sai ngữ nghĩa (các cột mốc không thể tự đạt được).' },
      ],
      acceptedAnswers: [{ text: 'All project milestones have been achieved on schedule.', rationale: 'Have been achieved là thể bị động số nhiều chuẩn mực.' }],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-r2',
      kind: 'gap',
      prompt: 'Before the inspection began, the emergency lighting systems ___ (test) thoroughly.',
      options: [],
      acceptedAnswers: [
        { text: 'had been tested', rationale: 'Past Perfect Passive had been tested xảy ra trước mốc began.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "The software update has been installed on..." để chuyển sang bị động: "Technicians have installed the software update on all company workstations."',
      options: [],
      acceptedAnswers: [
        { text: 'The software update has been installed on all company workstations.', rationale: 'Chuyển sang bị động với has been installed và lược bỏ tác nhân technicians.' },
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "When we entered the classroom, the whiteboard has already been cleaned."',
      options: [],
      acceptedAnswers: [
        { text: 'When we entered the classroom, the whiteboard had already been cleaned.', rationale: 'Mốc entered ở quá khứ đòi hỏi thì Quá khứ hoàn thành bị động had already been cleaned.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-passive-perfect-14-o1',
      prompt: 'Viết 2–3 câu cập nhật tiến độ công việc hoặc dự án của bạn (ví dụ: một bài thuyết trình, dự án nhóm hoặc kế hoạch cải tạo nhà cửa), sử dụng thể bị động thì Hiện tại hoàn thành (have/has been + V3/ed).',
      modelAnswer: 'Our research project has made great progress this week. The questionnaire data has been collected from three hundred respondents, and the preliminary charts have already been designed for tomorrow\'s team presentation.',
      checks: [
        'Sử dụng đúng cấu trúc have/has been + V3/ed.',
        'Kết hợp đúng với các trạng từ như already, recently hoặc this week.',
        'Nội dung tiến độ công việc mạch lạc, rõ ràng.',
      ],
    },
    {
      id: 'grammar-v2-b1-passive-perfect-14-o2',
      prompt: 'Viết 2–3 câu kể lại tình huống khi bạn đến một địa điểm (khách sạn, phòng thi, sân bay...) và mọi sự chuẩn bị đã được hoàn tất trước đó, sử dụng thể bị động thì Quá khứ hoàn thành (had been + V3/ed).',
      modelAnswer: 'When we checked into the mountain resort last Friday evening, our luggage had already been transferred to our suite. The fireplace had been lit, and complimentary hot drinks had been placed on the dining table.',
      checks: [
        'Dùng mốc quá khứ làm điểm tựa (When we checked in...).',
        'Dùng cấu trúc had been + V3/ed cho các hành động bị động hoàn thành trước đó.',
        'Câu văn miêu tả sinh động, chuẩn ngữ pháp B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-passive-perfect',
      title: 'Cambridge Grammar: Passive forms of perfect tenses',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/passive',
      claims: ['Thể bị động thì hiện tại hoàn thành và quá khứ hoàn thành trong báo cáo tiến độ và trần thuật'],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal)',
    reviewedAt: '2026-10-06T00:00:00Z',
    summary: 'Reviewed the complete lesson for grammar accuracy, contextual answerability, distractors, authored variants, output prompts, and source-claim alignment. Applied editorial corrections where needed.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default lesson;
