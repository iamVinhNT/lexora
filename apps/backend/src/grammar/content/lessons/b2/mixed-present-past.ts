/**
 * @file mixed-present-past.ts
 * @description Lesson: Câu điều kiện hỗn hợp: Hiện tại - Quá khứ (Mixed Conditionals: Present to Past).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-mixed-present-past-08',
  revisionId: 'grammar-v2-b2-mixed-present-past-08@1.0.0',
  revision: '1.0.0',
  title: 'Câu điều kiện hỗn hợp: Hiện tại - Quá khứ (Mixed Conditionals: Present to Past)',
  objective: 'Nắm vững cấu trúc điều kiện hỗn hợp nối một trạng thái hoặc đặc điểm hiện tại/chung (If + Past Simple, thường were) với kết quả giả định trong quá khứ (S + would/could/might have + V3).',
  prerequisiteIds: ['grammar-v2-b2-mixed-past-present-07'],
  coverage: ['mixed-conditionals', 'present-condition-past-result', 'permanent-trait-past-outcome', 'b2-grammar'],
  context: {
    english: 'If our lead architect were not so uncompromising about structural sustainability, the construction committee would have approved the cheaper prefabricated concrete design last month.',
    vietnamese: 'Nếu kiến trúc sư trưởng của chúng tôi không quá khắt khe về tính bền vững của kết cấu như bản tính vốn có, hội đồng xây dựng đã phê duyệt phương án bê tông đúc sẵn giá rẻ hơn vào tháng trước.',
  },
  guide: {
    pattern: 'If + S + were / V-ed (present/general trait), S + would / could / might have + V3/ed (past event) | Were + S + (not) + to-V / complement, S + would have + V3/ed',
    whenToUse: [
      'Giả định một trạng thái, năng lực, sở thích hoặc tình huống hiện tại/chung có thể đã ảnh hưởng đến hành động cụ thể trong quá khứ.',
      'Giải thích một kết quả quá khứ bằng điều kiện giả định hiện tại hoặc đặc điểm có liên quan.',
      'Dùng were với mọi ngôi trong văn phong trang trọng; was cũng xuất hiện trong mệnh đề điều kiện giả định trong cách dùng thân mật, tùy người nói và ngữ cảnh.',
    ],
    signalWords: ['if I were', 'were not so', 'would have done... yesterday', 'last week', 'in the past'],
    check: [
      'Mệnh đề điều kiện có phản ánh trạng thái hiện tại/chung liên quan tới hệ quả quá khứ không? (thường dùng Past Simple: were / V2)',
      'Mệnh đề chính có diễn tả hành động cụ thể đã kết thúc trong quá khứ không? (dùng would/could/might have + V3/ed)',
      'Phân biệt rõ với Mixed loại Quá khứ - Hiện tại (ngược chiều thời gian)?',
    ],
  },
  explanation: 'Câu điều kiện hỗn hợp hiện tại/chung → kết quả quá khứ dùng trạng thái hoặc đặc điểm hiện tại/chung trong mệnh đề if (thường là Past Simple, với were trong văn phong trang trọng) và would/could/might have + V3 cho kết quả giả định quá khứ. Mối liên hệ cần hợp lý theo ngữ cảnh; đây không phải công thức cho mọi quan hệ nhân quả.',
  examples: [
    {
      english: 'If I were not so claustrophobic, I would have explored the subterranean catacombs with the tour group yesterday.',
      vietnamese: 'Nếu tôi không mắc chứng sợ không gian kín (bản tính hiện tại), tôi đã cùng đoàn du lịch khám phá các hầm mộ dưới lòng đất vào hôm qua (hành động quá khứ).',
    },
    {
      english: 'If Dr. Alvarez spoke fluent German, the institute would have assigned her to the Heidelberg research laboratory last summer.',
      vietnamese: 'Nếu Tiến sĩ Alvarez nói trôi chảy tiếng Đức (năng lực hiện tại), viện nghiên cứu đã cử bà tới phòng thí nghiệm Heidelberg vào mùa hè năm ngoái.',
    },
    {
      english: 'If our company were not committed to carbon neutrality, we would have purchased the diesel-powered generators during last winter\'s crisis.',
      vietnamese: 'Nếu công ty chúng tôi không cam kết mục tiêu trung hòa carbon, chúng tôi đã mua các máy phát điện chạy dầu diesel trong cuộc khủng hoảng mùa đông năm ngoái.',
    },
    {
      english: 'If you were a more cautious driver, you would not have dented the bumper while parking yesterday.',
      vietnamese: 'Nếu bạn là người lái xe cẩn thận hơn (tính cách thường trực), bạn đã không làm móp cản xe khi lùi đỗ hôm qua.',
    },
    {
      english: 'Were the director not so stubborn, she would have accepted the mediator\'s compromise during last week\'s negotiations.',
      vietnamese: 'Nếu bà giám đốc không quá bướng bỉnh, bà ấy đã chấp thuận thỏa hiệp của người hòa giải trong cuộc đàm phán tuần trước.',
    },
    {
      english: 'If they understood modern financial instruments, they would not have fallen for that fraudulent cryptocurrency scheme last year.',
      vietnamese: 'Nếu họ am hiểu các công cụ tài chính hiện đại, họ đã không mắc bẫy mô hình tiền điện tử lừa đảo đó vào năm ngoái.',
    },
  ],
  contrasts: [
    {
      form: 'Present-to-Past vs Second Conditional',
      whyFits: '"If I spoke Italian, I would have applied for the Venice fellowship last month" giải thích một quyết định quá khứ dựa trên năng lực hiện tại.',
      whyNot: '"If I spoke Italian, I would apply for the Venice fellowship" giả định về một hành động nộp đơn ở hiện tại hoặc tương lai, không giải thích việc đã bỏ lỡ tháng trước.',
    },
    {
      form: 'Present-to-Past vs Third Conditional',
      whyFits: '"If he were not so impulsive, he would not have quit his job yesterday" nhấn mạnh tính cách bốc đồng vốn có của anh ta.',
      whyNot: '"If he had not been so impulsive yesterday, he would not have quit" chỉ bó hẹp sự bốc đồng vào đúng thời điểm của ngày hôm qua thay vì tính cách thường trực.',
    },
  ],
  commonMistakes: [
    'Dùng Past Perfect ở mệnh đề If khi muốn diễn tả bản tính/năng lực hiện tại: viết "If I had spoken French, I would have taken the Paris assignment" thay vì "If I spoke French...".',
    'Dùng would + V-bare ở mệnh đề chính khi nói về sự việc quá khứ: viết "If he were honest, he would return the wallet yesterday" thay vì "would have returned".',
    'Trong văn phong trang trọng thường chọn were cho mệnh đề giả định; was cũng được dùng trong một số ngữ cảnh thân mật, nên không xem was là lỗi tuyệt đối.',
  ],
  summary: 'Câu điều kiện hỗn hợp Hiện tại/chung - Quá khứ thường dùng If + Past Simple (were trong văn phong trang trọng) và would/could/might have + V3 để nối trạng thái/đặc điểm liên quan hiện tại với kết quả giả định trong quá khứ.',
  exercises: [
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q1',
      kind: 'choice',
      prompt: 'If Liam ___ so terrified of heights, he would have joined his classmates on the mountain climb last weekend.',
      options: [
        { text: 'were not', correct: true, rationale: 'Bản tính sợ độ cao là trạng thái tâm lý thường trực ở hiện tại, kết hợp kết quả quá khứ "last weekend" đòi hỏi If were not.' },
        { text: 'had not been', correct: false, rationale: 'had not been chỉ gói gọn nỗi sợ trong quá khứ, không nhấn mạnh hội chứng sợ hãi thường trực hiện tại.' },
        { text: 'is not', correct: false, rationale: 'Hiện tại đơn không dùng cho mệnh đề giả định trái thực tế.' },
      ],
      acceptedAnswers: [{ text: 'were not', rationale: 'were not thể hiện trạng thái sợ hãi thường trực trong câu điều kiện hỗn hợp.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q2',
      kind: 'choice',
      prompt: 'If the researchers ___ fluent Japanese, they would have translated the historical documents during their Tokyo visit last year.',
      options: [
        { text: 'spoke', correct: true, rationale: 'Năng lực ngôn ngữ là trạng thái/kỹ năng lâu dài (chia Quá khứ đơn spoke) dẫn đến kết quả quá khứ would have translated.' },
        { text: 'had spoken', correct: false, rationale: 'This can form a past-to-past counterfactual, but the prompt asks about a general ability relevant to the past result.' },
        { text: 'speak', correct: false, rationale: 'Hiện tại đơn không thể hiện tính giả định trái thực tế.' },
      ],
      acceptedAnswers: [{ text: 'spoke', rationale: 'spoke diễn tả năng lực ngoại ngữ giả định ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q3',
      kind: 'choice',
      prompt: 'Which sentence correctly demonstrates a present-state to past-result mixed conditional?',
      options: [
        { text: 'If she were a more patient instructor, she would not have reprimanded the young apprentice so harshly yesterday.', correct: true, rationale: 'Mệnh đề If chỉ tính cách kiên nhẫn (were patient) và mệnh đề chính chỉ hành động khiển trách hôm qua (would not have reprimanded yesterday).' },
        { text: 'If she had been a patient instructor, she would not reprimand the apprentice today.', correct: false, rationale: 'Đây là dạng Quá khứ - Hiện tại, ngược chiều với yêu cầu.' },
        { text: 'If she were a patient instructor, she would not reprimand the apprentice.', correct: false, rationale: 'Đây là câu điều kiện loại 2 thuần túy.' },
      ],
      acceptedAnswers: [{ text: 'If she were a more patient instructor, she would not have reprimanded the young apprentice so harshly yesterday.', rationale: 'Cấu trúc hỗn hợp Hiện tại - Quá khứ hoàn chỉnh.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q4',
      kind: 'choice',
      prompt: 'Were the board members not so short-sighted, they ___ that visionary startup two years ago.',
      options: [
        { text: 'would have funded', correct: true, rationale: 'Đảo ngữ hiện tại (Were... not) kết hợp với mốc quá khứ "two years ago" đòi hỏi would have funded.' },
        { text: 'would fund', correct: false, rationale: 'would fund chỉ kết quả ở hiện tại/tương lai, không phù hợp với two years ago.' },
        { text: 'funded', correct: false, rationale: 'Quá khứ đơn không thể hiện giả định điều kiện.' },
      ],
      acceptedAnswers: [{ text: 'would have funded', rationale: 'would have funded thể hiện kết quả quá khứ từ tính cách hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q5',
      kind: 'gap',
      prompt: 'If our lead developer ___ (not be) so meticulous, several critical security flaws would have slipped into last week\'s release.',
      options: [],
      acceptedAnswers: [
        { text: 'were not', rationale: 'were not là dạng giả định chuẩn của to be chỉ tính cách cẩn thận thường trực.' },
        { text: "weren't", rationale: 'Dạng rút gọn của were not.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q6',
      kind: 'gap',
      prompt: 'If she understood statistical modeling, she ___ (not misinterpret) the survey data during yesterday\'s presentation.',
      options: [],
      acceptedAnswers: [
        { text: 'would not have misinterpreted', rationale: 'would not have misinterpreted thể hiện hành động không hiểu sai dữ liệu trong quá khứ.' },
        { text: "wouldn't have misinterpreted", rationale: 'Dạng rút gọn của would not have misinterpreted.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q7',
      kind: 'gap',
      prompt: 'If they ___ (have) basic culinary skills, they would not have burned the anniversary dinner last night.',
      options: [],
      acceptedAnswers: [{ text: 'had', rationale: 'had là dạng quá khứ đơn chỉ kỹ năng nấu ăn ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q8',
      kind: 'gap',
      prompt: 'Were he not so stubborn, he ___ (heed) the mechanic\'s advice before embarking on the desert drive yesterday.',
      options: [],
      acceptedAnswers: [{ text: 'would have heeded', rationale: 'would have heeded chỉ kết quả quá khứ trong câu đảo ngữ Were he not.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q9',
      kind: 'transform',
      prompt: 'I am not an assertive negotiator, so I did not request a salary review during last month\'s appraisal. -> If I were an assertive negotiator, I ___ a salary review during last month\'s appraisal.',
      options: [],
      acceptedAnswers: [
        { text: 'would have requested', rationale: 'Dùng would have requested để diễn tả hành động yêu cầu trong quá khứ dựa trên bản tính hiện tại.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q10',
      kind: 'transform',
      prompt: 'The manager is generally disorganized. That is why she misplaced the client contract three days ago. -> If the manager were not generally disorganized, she ___ the client contract three days ago.',
      options: [],
      acceptedAnswers: [
        { text: 'would not have misplaced', rationale: 'Dùng would not have misplaced để diễn đạt kết quả không làm thất lạc hợp đồng trong quá khứ.' },
        { text: "wouldn't have misplaced", rationale: 'Dạng viết tắt của would not have misplaced.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi mệnh đề chính khi gắn với sự kiện quá khứ: "If our team knew advanced cryptography, we solved the decryption puzzle yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'If our team knew advanced cryptography, we would have solved the decryption puzzle yesterday.', rationale: 'Mệnh đề kết quả quá khứ phải dùng would have solved thay vì quá khứ đơn solved.' },
        { text: 'If our team knew advanced cryptography, we could have solved the decryption puzzle yesterday.', rationale: 'Dùng could have solved để chỉ năng lực giải quyết câu đố hôm qua.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thì ở mệnh đề If khi đối chiếu tính cách hiện tại với sự việc quá khứ: "He is generally dishonest now. If he had been an honest politician, he would not have accepted that bribe last summer."',
      options: [],
      acceptedAnswers: [
        { text: 'If he were an honest politician, he would not have accepted that bribe last summer.', rationale: 'Dùng "were an honest politician" để nhấn mạnh phẩm chất chính trực tổng quát/hiện tại thay vì sự kiện đơn lẻ.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-mixed-present-past-08-r1',
      kind: 'choice',
      prompt: 'If she loved classical literature, she ___ the special symposium on Dante last weekend.',
      options: [
        { text: 'would have attended', correct: true, rationale: 'Sở thích văn học là trạng thái lâu dài (loved) kết hợp sự kiện quá khứ (last weekend) dùng would have attended.' },
        { text: 'would attend', correct: false, rationale: 'would attend chỉ sự kiện hiện tại/tương lai, không khớp với last weekend.' },
        { text: 'attended', correct: false, rationale: 'Quá khứ đơn không thể hiện tính giả định điều kiện.' },
      ],
      acceptedAnswers: [{ text: 'would have attended', rationale: 'would have attended thể hiện hành động tham dự giả định trong quá khứ.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-r2',
      kind: 'gap',
      prompt: 'If they ___ (care) about safety standards, they would not have bypassed the emergency protocols yesterday.',
      options: [],
      acceptedAnswers: [{ text: 'cared', rationale: 'cared là dạng quá khứ đơn chỉ thái độ quan tâm chung ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-r3',
      kind: 'transform',
      prompt: 'He does not know Python programming. That is why he could not assist with the data migration yesterday. -> If he knew Python programming, he ___ with the data migration yesterday.',
      options: [],
      acceptedAnswers: [
        { text: 'could have assisted', rationale: 'could have assisted diễn tả năng lực hỗ trợ trong quá khứ.' },
        { text: 'would have assisted', rationale: 'would have assisted diễn tả hành động giúp đỡ trong quá khứ.' },
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi cấu trúc: "Were she not so shy, she would spoke to the keynote lecturer after yesterday\'s panel."',
      options: [],
      acceptedAnswers: [
        { text: 'Were she not so shy, she would have spoken to the keynote lecturer after yesterday\'s panel.', rationale: 'Mệnh đề kết quả quá khứ phải dùng would have spoken thay vì would spoke.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-mixed-present-past-08-o1',
      prompt: 'Viết 1 câu điều kiện hỗn hợp Hiện tại - Quá khứ (If + were / V2, S + would have + V3) miêu tả một tính cách hoặc sở thích của bạn đã dẫn đến một quyết định trong quá khứ.',
      modelAnswer: 'If I were more adventurous with culinary traditions, I would have sampled the spicy street delicacies during my trip to Bangkok last month.',
      checks: [
        'Mệnh đề If diễn tả tính cách/trạng thái chung (If I were...)',
        'Mệnh đề chính dùng would have + V3 kèm mốc thời gian quá khứ (last month, yesterday)',
        'Ý nghĩa phản ánh đúng quan hệ nhân quả Hiện tại - Quá khứ',
      ],
    },
    {
      id: 'grammar-v2-b2-mixed-present-past-08-o2',
      prompt: 'Viết 1 câu đảo ngữ điều kiện hỗn hợp "Were + S + not..., S + would/could have + V3" về một phẩm chất chuyên môn đã ngăn ngừa sai lầm trong quá khứ.',
      modelAnswer: 'Were our chief accountant not so vigilant, our department would not have detected the invoice discrepancy during last week\'s audit.',
      checks: [
        'Bắt đầu bằng cấu trúc đảo ngữ Were + S + not...',
        'Mệnh đề chính dùng would have / could have + V3/ed',
        'Nội dung gắn kết giữa phẩm chất thường trực và hành động cụ thể trong quá khứ',
      ],
    },
  ],
  sources: [
    {
      id: 'bc-mixed-conditionals',
      title: 'British Council: Conditionals: third and mixed',
      url: 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-third-mixed',
      claims: ['Mixed conditionals imagine a past change with a present result (If + past perfect, would + infinitive) or a present change with a past result (If + past simple, would have + past participle).'],
      checkedAt: '2026-10-06',
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
