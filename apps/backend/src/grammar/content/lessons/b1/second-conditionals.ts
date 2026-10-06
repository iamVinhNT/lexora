/**
 * @file second-conditionals.ts
 * @description Bài học B1 về câu điều kiện loại 2 (Second Conditionals: If + Past Simple / were, would/could + V-inf).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-second-conditionals-09',
  revisionId: 'grammar-v2-b1-second-conditionals-09@1.0.0',
  revision: '1.0.0',
  title: 'Câu điều kiện loại 2 (Second Conditionals)',
  objective: 'Sử dụng cấu trúc câu điều kiện loại 2 (If + Past Simple / were, would/could/might + V-inf) để nói về các tình huống tưởng tượng, trái ngược với thực tế ở hiện tại hoặc tương lai, và đưa ra lời khuyên.',
  prerequisiteIds: ['grammar-v2-b1-first-conditionals-08'],
  coverage: ['second-conditionals', 'conditional-sentences', 'unreal-present-future', 'hypothetical-advice', 'b1-grammar'],
  context: {
    english: 'If I won the international lottery prize tomorrow, I would purchase a solar-powered farmhouse in the mountains. If I were the minister of education, I would also invest heavily in public school libraries.',
    vietnamese: 'Nếu ngày mai tôi trúng giải xổ số quốc tế, tôi sẽ mua một trang trại chạy bằng năng lượng mặt trời trên núi. Nếu tôi là bộ trưởng giáo dục, tôi cũng sẽ đầu tư mạnh mẽ vào các thư viện trường công lập.',
  },
  guide: {
    pattern: 'Mệnh đề điều kiện: If + S + V(quá khứ đơn / were); Mệnh đề kết quả: S + would / could / might + V-nguyên thể',
    whenToUse: [
      'Nói về một tình huống hoàn toàn không có thật hoặc trái ngược với thực tế ở hiện tại.',
      'Nói về một khả năng cực kỳ khó xảy ra (chỉ là giả định tưởng tượng) trong tương lai.',
      'Đưa ra lời khuyên chân thành và lịch sự bằng cấu trúc cố định: "If I were you, I would...".',
    ],
    signalWords: ['if', 'if I were you', 'would definitely', 'could possibly', 'imagine if', 'unreal present'],
    check: [
      'Không dùng "would" trong mệnh đề If (dùng Quá khứ đơn hoặc were).',
      'Trong văn phong chuẩn mực (formal / standard English), dùng "were" cho tất cả các ngôi (If I/he/she were), và bắt buộc trong cụm "If I were you".',
      'Phân biệt với câu điều kiện loại 1: loại 1 là có thể xảy ra thật, loại 2 là thuần tưởng tượng trái với thực tế.',
    ],
  },
  explanation: 'Câu điều kiện loại 2 (Second Conditional) đưa người nói vào thế giới giả định (hypothetical world). Mặc dù mệnh đề điều kiện sử dụng động từ ở thì Quá khứ đơn (Past Simple), ý nghĩa thời gian của câu hoàn toàn là ở HIỆN TẠI hoặc TƯƠNG LAI. Hình thức quá khứ ở đây đóng vai trò là "quá khứ giả định" (subjunctive / distance in reality) nhằm biểu thị khoảng cách xa vời với thực tế.\n\nĐặc biệt, với động từ "to be", văn phong tiếng Anh học thuật và chuẩn mực ưu tiên dùng "were" cho mọi ngôi (If I were, If she were, If it were). Trong khẩu ngữ hàng ngày, người bản xứ đôi khi dùng "was" cho các ngôi số ít, nhưng trong bài thi chuẩn hóa và đặc biệt trong lời khuyên cố định "If I were you, I would...", việc dùng "were" là tiêu chuẩn bắt buộc.\n\nMệnh đề chính dùng "would + V-inf" khi kết quả là hệ quả tất yếu trong giả định, "could + V-inf" khi muốn diễn đạt khả năng/năng lực, và "might + V-inf" khi kết quả chỉ là một phỏng đoán không chắc chắn.',
  examples: [
    {
      english: 'If I had a private jet, I would travel around the world every weekend.',
      vietnamese: 'Nếu tôi có một chiếc máy bay riêng, tôi sẽ đi du lịch khắp thế giới mỗi cuối tuần (thực tế: tôi không có máy bay).',
    },
    {
      english: 'If she knew the answer to the puzzle, she would tell us immediately.',
      vietnamese: 'Nếu cô ấy biết câu trả lời cho câu đố, cô ấy đã nói cho chúng ta ngay rồi (thực tế: cô ấy không biết).',
    },
    {
      english: 'If I were you, I would accept the job offer in Vancouver.',
      vietnamese: 'Nếu tôi là bạn, tôi sẽ nhận lời đề nghị làm việc ở Vancouver (lời khuyên).',
    },
    {
      english: 'If we lived closer to the beach, we could go surfing every morning.',
      vietnamese: 'Nếu chúng tôi sống gần bãi biển hơn, chúng tôi đã có thể đi lướt sóng mỗi buổi sáng.',
    },
    {
      english: 'He might feel much healthier if he stopped eating junk food late at night.',
      vietnamese: 'Anh ấy có thể sẽ cảm thấy khỏe mạnh hơn nhiều nếu anh ngừng ăn đồ ăn vặt lúc đêm muộn.',
    },
    {
      english: 'What would you do if an alien spacecraft landed in your backyard?',
      vietnamese: 'Bạn sẽ làm gì nếu một chiếc tàu vũ trụ của người ngoài hành tinh hạ cánh xuống sân sau nhà bạn?',
    },
  ],
  contrasts: [
    {
      form: 'Second Conditional vs First Conditional',
      whyFits: 'If I had time tomorrow, I would visit you (người nói biết rõ ngày mai mình rất bận, chỉ giả định ước ao).',
      whyNot: 'If I have time tomorrow, I will visit you (người nói thực sự có thể có thời gian rảnh vào ngày mai).',
    },
    {
      form: 'If I were you vs If I was you',
      whyFits: 'If I were you, I would apologize (cụm thành ngữ cố định chuẩn mực tuyệt đối trong tiếng Anh chuẩn).',
      whyNot: 'If I was you bị coi là thiếu trang trọng và không phù hợp trong văn bản học thuật hoặc kiểm tra chuẩn hóa.',
    },
  ],
  commonMistakes: [
    'Dùng "would" trong mệnh đề điều kiện If: nói "If I would have more money, I would buy..." (sai, phải là "If I had more money...").',
    'Dùng "was" trong lời khuyên cố định: nói "If I was you" (thiếu tự nhiên và không chuẩn mực bằng "If I were you").',
    'Nhầm lẫn giữa điều kiện có thật (loại 1) và giả định phi thực tế (loại 2) dẫn đến chia sai cặp thì.',
  ],
  summary: 'Second Conditional (If + Past Simple / were, would/could + V-inf) diễn tả tình huống tưởng tượng trái với hiện tại hoặc đưa ra lời khuyên.',
  exercises: [
    {
      id: 'grammar-v2-b1-second-conditionals-09-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ thích hợp trong mệnh đề If khi diễn tả giả định trái với hiện tại: "If Liam ___ more free time, he would volunteer at the local animal shelter."',
      options: [
        { text: 'had', correct: true, rationale: 'Mệnh đề If loại 2 dùng thì Quá khứ đơn (had) để diễn tả điều kiện trái với hiện tại.' },
        { text: 'has', correct: false, rationale: 'Has là hiện tại đơn, không hòa hợp với would volunteer trong câu loại 2.' },
        { text: 'would have', correct: false, rationale: 'Không dùng would trong mệnh đề If.' },
      ],
      acceptedAnswers: [{ text: 'had', rationale: 'Quá khứ đơn had trong mệnh đề If câu điều kiện loại 2.' }],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q2',
      kind: 'choice',
      prompt: 'Chọn dạng chuẩn mực của động từ "to be" trong lời khuyên đưa ra: "If I ___ you, I would take that intensive language course."',
      options: [
        { text: 'were', correct: true, rationale: 'Were là dạng chuẩn mực bắt buộc trong thành ngữ đưa ra lời khuyên "If I were you".' },
        { text: 'am', correct: false, rationale: 'Am là hiện tại đơn, không dùng cho cấu trúc giả định lời khuyên.' },
        { text: 'would be', correct: false, rationale: 'Không dùng would be trong mệnh đề If.' },
      ],
      acceptedAnswers: [{ text: 'were', rationale: 'Cấu trúc cố định đưa ra lời khuyên: If I were you.' }],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q3',
      kind: 'choice',
      prompt: 'Chọn dạng động từ trong mệnh đề kết quả chỉ năng lực giả định: "If we had a bigger kitchen, we ___ bake bread for the whole community."',
      options: [
        { text: 'could', correct: true, rationale: 'Could + V-inf diễn tả khả năng/năng lực có thể làm được trong tình huống giả định.' },
        { text: 'can', correct: false, rationale: 'Can là hiện tại, không dùng trong mệnh đề chính của câu điều kiện loại 2.' },
        { text: 'will can', correct: false, rationale: 'Will can sai ngữ pháp, không kết hợp hai động từ khuyết thiếu cạnh nhau.' },
      ],
      acceptedAnswers: [{ text: 'could', rationale: 'Could dùng trong mệnh đề chính câu điều kiện loại 2.' }],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q4',
      kind: 'choice',
      prompt: 'Phân biệt sắc thái: Trong câu "If the CEO ___ tomorrow, she would address our concerns", người nói ám chỉ điều gì?',
      options: [
        { text: 'visited (việc CEO đến vào ngày mai rất khó xảy ra hoặc chỉ là giả thuyết)', correct: true, rationale: 'Câu điều kiện loại 2 dùng visited và would diễn tả tình huống giả định khó xảy ra trong thực tế.' },
        { text: 'visits (việc CEO đến vào ngày mai có khả năng xảy ra rất cao)', correct: false, rationale: 'Visits kết hợp với will address là câu loại 1, không phù hợp với would address ở mệnh đề chính.' },
        { text: 'will visit (chắc chắn sẽ đến)', correct: false, rationale: 'Mệnh đề If không dùng will visit.' },
      ],
      acceptedAnswers: [{ text: 'visited (việc CEO đến vào ngày mai rất khó xảy ra hoặc chỉ là giả thuyết)', rationale: 'Second conditional diễn tả tình huống giả định ít khả năng xảy ra.' }],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q5',
      kind: 'gap',
      prompt: 'If I ___ (own) a vacation home in Switzerland, I would invite my friends every winter.',
      options: [],
      acceptedAnswers: [
        { text: 'owned', rationale: 'Mệnh đề If câu điều kiện loại 2 dùng Quá khứ đơn owned.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q6',
      kind: 'gap',
      prompt: 'If she were the project manager, she ___ (manage) the budget much more transparently.',
      options: [],
      acceptedAnswers: [
        { text: 'would manage', rationale: 'Mệnh đề chính câu điều kiện loại 2 dùng would manage.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q7',
      kind: 'gap',
      prompt: 'If they ___ (speak) fluent Japanese, they could apply for that position in Tokyo.',
      options: [],
      acceptedAnswers: [
        { text: 'spoke', rationale: 'Động từ bất quy tắc speak ở quá khứ đơn là spoke trong mệnh đề If loại 2.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q8',
      kind: 'gap',
      prompt: 'What ___ you ___ (do) if your smartphone fell into a deep lake?',
      options: [],
      acceptedAnswers: [
        { text: 'would you do', rationale: 'Câu hỏi giả định trong mệnh đề chính câu điều kiện loại 2: would you do.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If I were you, I would..." để đưa ra lời khuyên cho tình huống: "You look exhausted; my advice is that you take a short break."',
      options: [],
      acceptedAnswers: [
        { text: 'If I were you, I would take a short break.', rationale: 'Cấu trúc lời khuyên chuẩn mực: If I were you, I would take a short break.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If we did not have so much work today, we could..." để viết lại: "We have so much work today, so we cannot join the picnic."',
      options: [],
      acceptedAnswers: [
        { text: 'If we did not have so much work today, we could join the picnic.', rationale: 'Chuyển thực tế phủ định/khẳng định sang câu điều kiện loại 2 giả định.' },
        { text: "If we didn't have so much work today, we could join the picnic.", rationale: 'Dạng rút gọn didn\'t have.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng "would" trong mệnh đề If: "If I would win the design award, I would celebrate with my colleagues."',
      options: [],
      acceptedAnswers: [
        { text: 'If I won the design award, I would celebrate with my colleagues.', rationale: 'Mệnh đề If câu điều kiện loại 2 dùng Quá khứ đơn won thay cho would win.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thì hiện tại trong câu điều kiện giả định trái thực tế: "If she lives in Paris right now, she would visit the Louvre weekly."',
      options: [],
      acceptedAnswers: [
        { text: 'If she lived in Paris right now, she would visit the Louvre weekly.', rationale: 'Giả định trái với thực tế hiện tại đòi hỏi thì Quá khứ đơn lived trong mệnh đề If.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-second-conditionals-09-r1',
      kind: 'choice',
      prompt: 'If you had the opportunity to study any subject for free, what ___ you choose?',
      options: [
        { text: 'would', correct: true, rationale: 'Câu hỏi giả định trong mệnh đề chính loại 2 dùng would.' },
        { text: 'will', correct: false, rationale: 'Will là loại 1 có thật, không hòa hợp với had ở mệnh đề If.' },
        { text: 'did', correct: false, rationale: 'Did là trợ động từ quá khứ, không diễn đạt ý tưởng tượng giả định.' },
      ],
      acceptedAnswers: [{ text: 'would', rationale: 'Would dùng trong câu hỏi giả định của Second Conditional.' }],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-r2',
      kind: 'gap',
      prompt: 'If the weather ___ (be) warmer today, we could eat lunch out on the patio.',
      options: [],
      acceptedAnswers: [
        { text: 'were', rationale: 'Were là dạng chuẩn mực cho câu điều kiện loại 2.' },
        { text: 'was', rationale: 'Was được chấp nhận trong văn phong thông thường cho ngôi thứ ba số ít.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If I knew her email address, I would..." để viết lại: "I do not know her email address, so I cannot contact her."',
      options: [],
      acceptedAnswers: [
        { text: 'If I knew her email address, I would contact her.', rationale: 'Chuyển thực tế không biết địa chỉ sang giả định biết địa chỉ bằng Second Conditional.' },
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "If they had a bigger budget, they will hire three more programmers."',
      options: [],
      acceptedAnswers: [
        { text: 'If they had a bigger budget, they would hire three more programmers.', rationale: 'Mệnh đề If chia ở quá khứ đơn (had) thì mệnh đề chính phải dùng would hire.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-second-conditionals-09-o1',
      prompt: 'Viết 2–3 câu tưởng tượng bạn bất ngờ có một siêu năng lực (ví dụ: bay lượn, tàng hình hoặc đọc suy nghĩ), bạn sẽ làm gì và cảm thấy thế nào, sử dụng Second Conditional.',
      modelAnswer: 'If I possessed the ability to fly, I would soar above the mountain clouds every weekend. I could travel to any remote island without buying an airline ticket, which would make my life full of adventures.',
      checks: [
        'Dùng thì Quá khứ đơn trong mệnh đề If (If I possessed...).',
        'Dùng would hoặc could + V-inf trong mệnh đề kết quả (would soar, could travel).',
        'Nội dung giàu tính tưởng tượng, ngữ pháp chuẩn xác.',
      ],
    },
    {
      id: 'grammar-v2-b1-second-conditionals-09-o2',
      prompt: 'Viết 2–3 câu đưa ra lời khuyên cho một người bạn đang phân vân giữa việc tiếp tục công việc hiện tại hay chuyển nghề, sử dụng cấu trúc "If I were you, I would...".',
       modelAnswer: 'If I were you, I would make a detailed list of advantages and disadvantages before submitting any resignation letter. If you feel unhappy every morning at your current desk, I would definitely recommend looking for new creative opportunities.',
      checks: [
        'Sử dụng cấu trúc chuẩn mực: If I were you, I would...',
        'Có câu điều kiện loại 2 giả định cảm xúc hoặc tình huống (If you felt...).',
        'Lời khuyên lịch sự, rõ ràng và mạch lạc.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-second-conditional',
      title: 'Cambridge Grammar: Second conditional (hypothetical and unreal situations)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/conditionals-second',
      claims: ['Câu điều kiện loại 2 diễn đạt tình huống giả định trái với thực tế hiện tại và lời khuyên'],
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
