/**
 * @file first-conditionals.ts
 * @description Bài học B1 về câu điều kiện loại 1 (First Conditionals: If + Present Simple, will + V-inf / modals).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-first-conditionals-08',
  revisionId: 'grammar-v2-b1-first-conditionals-08@1.0.0',
  revision: '1.0.0',
  title: 'Câu điều kiện loại 1 (First Conditionals)',
  objective: 'Sử dụng cấu trúc câu điều kiện loại 1 (If + Present Simple, will/can/might + V-inf) và các liên từ tương đương (unless, as long as) để nói về những sự việc có khả năng thực tế xảy ra trong tương lai.',
  prerequisiteIds: ['grammar-v2-b1-zero-conditionals-07'],
  coverage: ['first-conditionals', 'conditional-sentences', 'future-possibility', 'unless-as-long-as', 'b1-grammar'],
  context: {
    english: 'If our team wins the championship match tomorrow evening, the club will organize an open celebration in the town square. Unless the weather forecast turns stormy, thousands of supporters will attend.',
    vietnamese: 'Nếu đội của chúng tôi thắng trận chung kết vào tối mai, câu lạc bộ sẽ tổ chức một buổi ăn mừng công khai tại quảng trường thị trấn. Trừ khi dự báo thời tiết chuyển biến xấu có bão, hàng nghìn cổ động viên sẽ tham dự.',
  },
  guide: {
    pattern: 'Mệnh đề điều kiện: If + S + V(hiện tại đơn); Mệnh đề kết quả: S + will / can / might / should + V-nguyên thể',
    whenToUse: [
      'Nói về một tình huống cụ thể có khả năng thực tế cao sẽ xảy ra ở hiện tại hoặc tương lai.',
      'Đưa ra lời cảnh báo, lời hứa hẹn, sự đe dọa hoặc đề nghị giúp đỡ có điều kiện.',
      'Sử dụng các biến thể liên từ: "unless" (trừ khi = if not), "as long as" hoặc "provided that" (miễn là).',
    ],
    signalWords: ['if', 'unless', 'as long as', 'provided that', 'in case', 'tomorrow', 'next week', 'will definitely'],
    check: [
      'Trong điều kiện tương lai trung tính, thường dùng Hiện tại đơn sau If / Unless; will cũng có thể diễn tả sự sẵn lòng/khăng khăng trong ngữ cảnh riêng.',
      'Sau "unless" luôn là một mệnh đề khẳng định mang nghĩa phủ định (không dùng phủ định kép như unless you don\'t).',
      'Mệnh đề kết quả có thể linh hoạt thay thế will bằng can (khả năng), might (không chắc chắn) hoặc should (khuyên nhủ).',
    ],
  },
  explanation: 'First Conditional thường diễn đạt một điều kiện tương lai được xem là khả dĩ và kết quả dự kiến: If + Present Simple, will/can/may/might + bare infinitive. Điều kiện ở hiện tại đơn là mẫu trung tính thường dùng, không phải lệnh cấm tuyệt đối: will trong mệnh đề if có thể diễn tả sự sẵn lòng hoặc khăng khăng trong ngữ cảnh riêng (If you will wait here, I will ask the manager). Unless thường tương đương if ... not, còn provided that/as long as nêu điều kiện cần; lựa chọn nối từ phụ thuộc ý định và ngữ cảnh.',
  examples: [
    {
      english: 'If it rains this afternoon, we will postpone the outdoor tennis match.',
      vietnamese: 'Nếu chiều nay trời mưa, chúng tôi sẽ hoãn trận đấu quần vợt ngoài trời.',
    },
    {
      english: 'If you study consistently every day, you will easily pass the B1 examination.',
      vietnamese: 'Nếu bạn học đều đặn mỗi ngày, bạn sẽ dễ dàng vượt qua kỳ thi B1.',
    },
    {
      english: 'Unless they lower the ticket price, nobody will attend the concert.',
      vietnamese: 'Trừ khi họ giảm giá vé, nếu không sẽ chẳng có ai tham dự buổi hòa nhạc.',
    },
    {
      english: 'You can borrow my laptop as long as you return it before Friday.',
      vietnamese: 'Bạn có thể mượn máy tính của tôi miễn là bạn trả lại trước ngày thứ Sáu.',
    },
    {
      english: 'If we miss the final bus tonight, we might have to call an expensive taxi.',
      vietnamese: 'Nếu chúng ta lỡ chuyến xe buýt cuối tối nay, có thể chúng ta sẽ phải gọi một chiếc taxi đắt đỏ.',
    },
    {
      english: 'If you feel dizzy during the exercise session, you should inform the instructor.',
      vietnamese: 'Nếu bạn cảm thấy chóng mặt trong buổi tập thể dục, bạn nên báo cho huấn luyện viên.',
    },
  ],
  contrasts: [
    {
      form: 'First Conditional vs Zero Conditional',
      whyFits: 'If the price rises next month, customers will complain (dự đoán một sự việc cụ thể ở tương lai với will).',
      whyNot: 'If prices rise, demand drops (quy luật kinh tế học hiển nhiên dùng Zero Conditional không có will).',
    },
    {
      form: 'If ... not vs Unless',
      whyFits: 'Unless you leave right now, you will be late (tự nhiên, dứt khoát).',
      whyNot: 'Unless you don\'t leave (sai vì tạo thành phủ định kép vô nghĩa).',
    },
  ],
  commonMistakes: [
    'Dùng "will" trong mệnh đề If: nói "If it will rain tomorrow, I will stay home" (sai, phải là "If it rains tomorrow...").',
    'Dùng phủ định kép sau "unless": nói "Unless you don\'t register..." (sai, phải là "Unless you register...").',
    'Nhầm lẫn thì quá khứ trong câu loại 1: nói "If I studied tomorrow, I will pass" (trộn lẫn loại 2 và loại 1).',
  ],
  summary: 'First Conditional (If + Present Simple, will/can/might + V-inf) diễn đạt điều kiện có thể xảy ra ở tương lai. Unless = If not.',
  exercises: [
    {
      id: 'grammar-v2-b1-first-conditionals-08-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ thích hợp trong mệnh đề If: "If our client ___ the revised contract by 5 PM, we will start the project tomorrow."',
      options: [
        { text: 'approves', correct: true, rationale: 'Mệnh đề If chỉ điều kiện tương lai chia ở thì Hiện tại đơn ngôi thứ ba số ít (approves).' },
        { text: 'will approve', correct: false, rationale: 'Không dùng will trong mệnh đề điều kiện đứng sau If.' },
        { text: 'approved', correct: false, rationale: 'Approved là quá khứ đơn, không hòa hợp với will start trong câu loại 1.' },
      ],
      acceptedAnswers: [{ text: 'approves', rationale: 'Mệnh đề If của câu điều kiện loại 1 dùng thì Hiện tại đơn.' }],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q2',
      kind: 'choice',
      prompt: 'Chọn liên từ thích hợp mang ý nghĩa "trừ khi": "We will not finish the construction on time ___ the supplier delivers the steel promptly."',
      options: [
        { text: 'unless', correct: true, rationale: 'Unless mang nghĩa "trừ phi / nếu nhà cung cấp không giao thép kịp thời".' },
        { text: 'if', correct: false, rationale: 'Dùng if sẽ làm đảo ngược ý nghĩa logic (nếu giao kịp thì lại không xong kịp).' },
        { text: 'although', correct: false, rationale: 'Although là liên từ nhượng bộ, không dùng cấu trúc điều kiện loại 1.' },
      ],
      acceptedAnswers: [{ text: 'unless', rationale: 'Unless = if... not phù hợp về mặt logic điều kiện.' }],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q3',
      kind: 'choice',
      prompt: 'Chọn dạng động từ trong mệnh đề chính khi có khả năng xảy ra không hoàn toàn chắc chắn: "If we depart early in the morning, we ___ avoid the rush hour traffic."',
      options: [
        { text: 'might', correct: true, rationale: 'Might diễn tả khả năng có thể xảy ra trong tương lai một cách dè dặt.' },
        { text: 'would', correct: false, rationale: 'Would dùng trong câu điều kiện loại 2 giả định, không dùng cho loại 1 có depart ở hiện tại.' },
        { text: 'must to', correct: false, rationale: 'Must to là dạng sai ngữ pháp, must không đi với to V.' },
      ],
      acceptedAnswers: [{ text: 'might', rationale: 'Might dùng trong mệnh đề chính chỉ khả năng có thể đạt được.' }],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q4',
      kind: 'choice',
      prompt: 'Chọn mệnh đề đúng sau liên từ "as long as": "You can attend the guest lecture ___ you arrive ten minutes early."',
      options: [
        { text: 'as long as', correct: true, rationale: 'As long as mang nghĩa "miễn là", giới thiệu điều kiện cho phép tham dự bài giảng.' },
        { text: 'unless', correct: false, rationale: 'Unless mang nghĩa phủ định, sai nghĩa thông điệp.' },
        { text: 'in case of', correct: false, rationale: 'In case of đi với danh từ, không đi với mệnh đề you arrive.' },
      ],
      acceptedAnswers: [{ text: 'as long as', rationale: 'As long as mang nghĩa miễn là đi với mệnh đề điều kiện.' }],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q5',
      kind: 'gap',
      prompt: 'If the flight ___ (be) delayed, the airline will provide meal vouchers.',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Động từ to be ở hiện tại đơn ngôi thứ ba số ít là is.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q6',
      kind: 'gap',
      prompt: 'Unless you ___ (wear) a warm coat, you will catch a cold in the freezing wind.',
      options: [],
      acceptedAnswers: [
        { text: 'wear', rationale: 'Sau unless là mệnh đề khẳng định ở thì Hiện tại đơn (you wear).' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q7',
      kind: 'gap',
      prompt: 'If Henry passes his driving test next week, his parents ___ (buy) him a second-hand car.',
      options: [],
      acceptedAnswers: [
        { text: 'will buy', rationale: 'Mệnh đề chính của câu điều kiện loại 1 dùng will buy.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q8',
      kind: 'gap',
      prompt: 'We will go hiking in the national park on Saturday provided that it ___ (not / rain).',
      options: [],
      acceptedAnswers: [
        { text: 'does not rain', rationale: 'Provided that đi với thì Hiện tại đơn phủ định ngôi thứ ba số ít does not rain.' },
        { text: "doesn't rain", rationale: 'Dạng rút gọn doesn\'t rain.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Unless you reserve your tickets early,..." để viết lại: "If you do not reserve your tickets early, you will not get good seats."',
      options: [],
      acceptedAnswers: [
        { text: 'Unless you reserve your tickets early, you will not get good seats.', rationale: 'Thay If... not bằng Unless và giữ nguyên mệnh đề kết quả.' },
        { text: "Unless you reserve your tickets early, you won't get good seats.", rationale: 'Dạng viết tắt won\'t get good seats.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If you press this green button, the door..." để viết lại: "Pressing this green button will open the automatic door."',
      options: [],
      acceptedAnswers: [
        { text: 'If you press this green button, the door will open.', rationale: 'Chuyển danh động từ thành câu điều kiện loại 1 chỉ hành động và kết quả tương lai.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng "will" trong mệnh đề If: "If the train will arrive on time, we will catch our connecting bus."',
      options: [],
      acceptedAnswers: [
        { text: 'If the train arrives on time, we will catch our connecting bus.', rationale: 'Mệnh đề If không dùng will, chuyển thành thì Hiện tại đơn ngôi thứ ba số ít arrives.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-q12',
      kind: 'correction',
      prompt: 'Ý định: bạn sẽ trượt nếu không học chăm chỉ. Viết lại câu bắt đầu bằng "Unless" và dùng mệnh đề khẳng định sau từ nối: "Unless you don\'t study hard, you will fail the test."',
      options: [],
      acceptedAnswers: [
        { text: 'Unless you study hard, you will fail the test.', rationale: 'The prompt specifies the intended meaning and asks for a positive clause after Unless; If you do not study hard also expresses that meaning.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-first-conditionals-08-r1',
      kind: 'choice',
      prompt: 'We can hold the team barbecue in the garden ___ the rain stops before three o\'clock.',
      options: [
        { text: 'provided that', correct: true, rationale: 'Provided that mang nghĩa "với điều kiện là / miễn là", giới thiệu điều kiện thực tế.' },
        { text: 'unless', correct: false, rationale: 'Unless làm đảo ngược ý nghĩa thành "trừ khi mưa tạnh thì không tổ chức".' },
        { text: 'although', correct: false, rationale: 'Although là liên từ nhượng bộ, không dùng cho câu điều kiện có thể xảy ra.' },
      ],
      acceptedAnswers: [{ text: 'provided that', rationale: 'Provided that mang nghĩa với điều kiện là.' }],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-r2',
      kind: 'gap',
      prompt: 'If you ___ (need) additional information about the tour, please call our hotline.',
      options: [],
      acceptedAnswers: [
        { text: 'need', rationale: 'Mệnh đề If dùng thì Hiện tại đơn với chủ ngữ you.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Unless we leave right now,..." để viết lại câu: "If we do not leave right now, we will miss our flight."',
      options: [],
      acceptedAnswers: [
        { text: 'Unless we leave right now, we will miss our flight.', rationale: 'Chuyển If we do not leave thành Unless we leave.' },
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng từ khuyết thiếu trong mệnh đề If: "If you will invite Sarah to dinner, she will certainly come."',
      options: [],
      acceptedAnswers: [
        { text: 'If you invite Sarah to dinner, she will certainly come.', rationale: 'Mệnh đề If dùng thì Hiện tại đơn invite thay cho will invite.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-first-conditionals-08-o1',
      prompt: 'Viết 2–3 câu đưa ra lời khuyên hoặc kế hoạch dự phòng cho chuyến dã ngoại cuối tuần của nhóm bạn, sử dụng câu điều kiện loại 1 với "if" và "unless".',
      modelAnswer: 'If the weather stays sunny on Saturday, we will hike up the pine forest trails. Unless the mountain forecast warns of thunderstorms, we will camp overnight near the clear stream.',
      checks: [
        'Sử dụng đúng cấu trúc First Conditional (If + Present Simple, will + V-inf).',
        'Có câu sử dụng chính xác liên từ "unless" không có phủ định kép.',
        'Kế hoạch cụ thể, logic và đúng ngữ pháp trình độ B1.',
      ],
    },
    {
      id: 'grammar-v2-b1-first-conditionals-08-o2',
      prompt: 'Viết 2–3 câu thỏa thuận hoặc hứa hẹn trong công việc/học tập có điều kiện ràng buộc, sử dụng các liên từ "as long as" hoặc "provided that".',
      modelAnswer: 'I will help you format and proofread the research presentation tomorrow, provided that you send me the final draft before 8 PM tonight. You can borrow my tablet for your study session as long as you return it before class starts.',
      checks: [
        'Sử dụng đúng liên từ "provided that" hoặc "as long as".',
        'Mệnh đề sau liên từ chia ở thì Hiện tại đơn.',
        'Mệnh đề chính dùng will hoặc can + V-inf phù hợp.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-first-conditional',
      title: 'Cambridge Grammar: First conditional (real and possible situations)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/conditionals-first',
      claims: ['Câu điều kiện loại 1 diễn đạt khả năng có thật ở tương lai cùng các liên từ unless, provided that'],
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
