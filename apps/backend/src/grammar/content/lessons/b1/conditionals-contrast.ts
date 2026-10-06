/**
 * @file conditionals-contrast.ts
 * @description Bài học B1 so sánh và đối chiếu các câu điều kiện loại 0, loại 1 và loại 2.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-conditionals-contrast-10',
  revisionId: 'grammar-v2-b1-conditionals-contrast-10@1.0.0',
  revision: '1.0.0',
  title: 'So sánh câu điều kiện loại 0, 1 và 2 (Conditionals Contrast)',
  objective: 'Phân biệt và lựa chọn chính xác giữa câu điều kiện loại 0 (chân lý), loại 1 (tương lai có thể xảy ra) và loại 2 (giả định trái ngược thực tế) dựa trên ngữ cảnh và góc nhìn của người nói.',
  prerequisiteIds: ['grammar-v2-b1-second-conditionals-09'],
  coverage: ['conditionals-contrast', 'conditional-patterns', 'real-vs-unreal', 'likelihood-spectrum', 'b1-grammar'],
  context: {
    english: 'A meteorologist explains: "If ocean temperatures rise globally, coral reefs die. If the current storm intensifies tomorrow, coastal authorities will issue an evacuation warning. If I had the authority to halt emissions overnight, I would enact strict green laws immediately."',
    vietnamese: 'Một nhà khí tượng học giải thích: "Nếu nhiệt độ đại dương tăng trên toàn cầu, các rạn san hô chết. Nếu cơn bão hiện tại mạnh lên vào ngày mai, chính quyền ven biển sẽ phát đi cảnh báo sơ tán. Nếu tôi có quyền lực để chấm dứt khí thải ngay trong đêm, tôi sẽ ban hành các đạo luật xanh nghiêm ngặt ngay lập tức."',
  },
  guide: {
    pattern: 'Loại 0: If + Present, Present (quy luật/đặc điểm chung); Loại 1: If + Present, will/can + V-inf (khả năng tương lai được xem là thực tế); Loại 2: If + Past, would/could + V-inf (góc nhìn giả định hoặc xa thực tế)',
    whenToUse: [
      'Dùng Loại 0 khi nói về nguyên lý khoa học, quy luật tự nhiên hoặc phản xạ bất biến.',
      'Dùng Loại 1 khi người nói tin rằng tình huống hoàn toàn có thể xảy ra trong tương lai và muốn nêu kết quả thực tế.',
      'Dùng Loại 2 cho tình huống hiện tại không thật hoặc khi người nói chọn một góc nhìn giả định/ít khả năng; hình thức không tự khẳng định điều đó là bất khả thi.',
    ],
    signalWords: ['always', 'definitely', 'tomorrow', 'if I had', 'if I were you', 'scientific fact', 'imagine'],
    check: [
      'Xác định góc nhìn của người nói: sự thật phổ quát (Type 0), khả năng thực tế (Type 1), hay thuần tưởng tượng (Type 2)?',
      'Trong các mẫu cơ bản đang luyện, giữ cặp thì phù hợp; mixed conditionals cũng có thể đúng khi hai mệnh đề quy chiếu đến thời điểm khác nhau.',
      'Trong các mẫu điều kiện tương lai/giả định cơ bản đang luyện, mệnh đề If thường không dùng will/would; một số ngữ cảnh đặc biệt có thể dùng will để diễn tả sự sẵn lòng/khăng khăng.',
    ],
  },
  explanation: 'Các dạng cơ bản khác nhau ở cách người nói nhìn mối quan hệ giữa điều kiện và kết quả, không phải ở xác suất cố định. Type 0 thường nêu quy luật hoặc thói quen chung (If/When + Present, Present), nhưng kết quả không nhất thiết phải là chân lý 100%. Type 1 nêu khả năng tương lai được xem là thực tế (If + Present, will/can/might + V). Type 2 diễn tả tình huống hiện tại/tương lai từ góc nhìn giả định hoặc xa thực tế (If + Past, would/could/might + V); không nhất thiết là bất khả thi. Mixed conditionals cũng có thể đúng khi điều kiện và kết quả thuộc các thời điểm khác nhau; bài này luyện ba mẫu cơ bản trong ngữ cảnh đơn giản.',
  examples: [
    {
      english: 'If you heat chocolate over a flame, it melts.',
      vietnamese: 'Nếu bạn đun sô-cô-la trên ngọn lửa, nó tan chảy (Loại 0: quy luật vật lý hiển nhiên).',
    },
    {
      english: 'If we buy the ingredients now, we will bake the chocolate cake tonight.',
      vietnamese: 'Nếu chúng ta mua nguyên liệu bây giờ, chúng ta sẽ nướng bánh sô-cô-la tối nay (Loại 1: kế hoạch có thật).',
    },
    {
      english: 'If I owned a French chocolate boutique, I would invent new dessert flavors every month.',
      vietnamese: 'Nếu tôi sở hữu một cửa tiệm sô-cô-la Pháp, tôi sẽ sáng tạo các hương vị tráng miệng mới mỗi tháng (Loại 2: tưởng tượng phi thực tế).',
    },
    {
      english: 'When temperatures plunge below freezing, the fountain water freezes solid.',
      vietnamese: 'Khi nhiệt độ giảm xuống dưới mức đóng băng, nước đài phun nước đóng băng cứng (Loại 0).',
    },
    {
      english: 'If the road conditions worsen tonight, the school bus will not run tomorrow.',
      vietnamese: 'Nếu điều kiện đường sá xấu đi đêm nay, xe buýt trường học sẽ không hoạt động vào ngày mai (Loại 1).',
    },
    {
      english: 'If our town had an underground metro system, commuting would be effortless.',
      vietnamese: 'Nếu thị trấn của chúng tôi có hệ thống tàu điện ngầm ngầm, việc đi lại đã thật nhẹ nhàng (Loại 2).',
    },
  ],
  contrasts: [
    {
      form: 'Type 1 vs Type 2 cùng tình huống',
      whyFits: 'If I see Emma tonight, I will tell her (người nói có khả năng cao sẽ gặp Emma ở bữa tiệc tối nay).',
      whyNot: 'If I saw Emma tonight, I would tell her (người nói biết Emma đang ở thành phố khác, chỉ giả định tình cờ).',
    },
    {
      form: 'Type 0 vs Type 1',
      whyFits: 'If you press the button, the machine stops (hướng dẫn vận hành quy tắc chung, luôn đúng).',
      whyNot: 'If you press that red switch now, the power will cut out (cảnh báo một hành động cụ thể ngay lúc này).',
    },
  ],
  commonMistakes: [
    'Dùng If I have time, I would call you mà không có ngữ cảnh giải thích góc nhìn từng mệnh đề; chọn mẫu thống nhất trong bài cơ bản (If I have time, I will call / If I had time, I would call).',
    'Dùng loại 2 cho quy luật khoa học hiển nhiên: nói "If you heated ice, it would melt" (ngữ cảnh quy luật khoa học phải dùng loại 0).',
    'Dùng will/would trong mệnh đề If của các mẫu điều kiện cơ bản đang luyện; ngoại lệ về sự sẵn lòng hoặc yêu cầu nhấn mạnh cần ngữ cảnh riêng.',
  ],
  summary: 'Loại 0 = quy luật hiển nhiên (Pres + Pres); Loại 1 = tương lai có thật (Pres + Will); Loại 2 = tưởng tượng trái thực tế (Past/were + Would).',
  exercises: [
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q1',
      kind: 'choice',
      prompt: 'Xác định loại câu điều kiện phù hợp cho quy luật tự nhiên hiển nhiên: "If oil is mixed with water, it ___ on top."',
      options: [
        { text: 'floats', correct: true, rationale: 'Hiện tượng vật lý hiển nhiên luôn xảy ra, dùng câu điều kiện loại 0 (floats).' },
        { text: 'will float', correct: false, rationale: 'Will float hướng vào một sự kiện dự đoán đơn lẻ, quy luật khoa học chuẩn mực dùng thì hiện tại đơn.' },
        { text: 'would float', correct: false, rationale: 'Would float là giả định loại 2, mâu thuẫn với thực tế khoa học hiển nhiên.' },
      ],
      acceptedAnswers: [{ text: 'floats', rationale: 'Quy luật tự nhiên dùng Zero Conditional (floats).' }],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q2',
      kind: 'choice',
      prompt: 'Chọn dạng động từ phù hợp cho tình huống có khả năng cao sẽ xảy ra vào ngày mai: "If the train tickets are affordable, we ___ visit the museum tomorrow."',
      options: [
        { text: 'will', correct: true, rationale: 'Tình huống có thật ở tương lai ngày mai dùng First Conditional với will.' },
        { text: 'would', correct: false, rationale: 'Would là loại 2 giả định, không phù hợp khi vé tàu có giá cả thực tế có thể mua được ngày mai.' },
        { text: 'had', correct: false, rationale: 'Had không đứng trước động từ nguyên thể visit để chỉ thì tương lai.' },
      ],
      acceptedAnswers: [{ text: 'will', rationale: 'First conditional dùng will cho tình huống có thể xảy ra ở tương lai.' }],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q3',
      kind: 'choice',
      prompt: 'Chọn dạng động từ cho tình huống hoàn toàn tưởng tượng trái với thực tế: "If animals ___ talk, humans would listen more carefully."',
      options: [
        { text: 'could', correct: true, rationale: 'Động vật biết nói là tình huống giả định phi thực tế ở hiện tại, dùng Second Conditional với could.' },
        { text: 'can', correct: false, rationale: 'Can là hiện tại, biến câu thành tình huống có thật mâu thuẫn với thực tế.' },
        { text: 'will can', correct: false, rationale: 'Will can sai ngữ pháp hoàn toàn.' },
      ],
      acceptedAnswers: [{ text: 'could', rationale: 'Second conditional dùng could cho tình huống giả định tưởng tượng.' }],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q4',
      kind: 'choice',
      prompt: 'Người nói tin chắc mình không có tiền để mua du thuyền. Câu nào thể hiện đúng nhất niềm tin đó?',
      options: [
        { text: 'If I had enough money, I would buy a yacht.', correct: true, rationale: 'Second conditional (had ... would buy) thể hiện rõ ràng điều này trái với thực tế tài chính hiện tại.' },
        { text: 'If I have enough money, I will buy a yacht.', correct: false, rationale: 'First conditional ngụ ý người nói có khả năng thực tế sẽ có đủ tiền để mua.' },
        { text: 'When I have enough money, I buy a yacht.', correct: false, rationale: 'Zero conditional ngụ ý đây là thói quen cứ có tiền là đi mua du thuyền.' },
      ],
      acceptedAnswers: [{ text: 'If I had enough money, I would buy a yacht.', rationale: 'Second conditional dùng cho tình huống trái với thực tế.' }],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q5',
      kind: 'gap',
      prompt: 'When you drop a heavy stone into a pond, it ___ (sink) to the bottom.',
      options: [],
      acceptedAnswers: [
        { text: 'sinks', rationale: 'Quy luật vật lý hiển nhiên (Zero Conditional) dùng Hiện tại đơn sinks.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q6',
      kind: 'gap',
      prompt: 'If our budget allows next month, we ___ (purchase) modern tablets for the classroom.',
      options: [],
      acceptedAnswers: [
        { text: 'will purchase', rationale: 'Kế hoạch có thể thực hiện được vào tháng tới (First Conditional) dùng will purchase.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q7',
      kind: 'gap',
      prompt: 'If I ___ (be) ten years younger, I would learn how to pilot a commercial aircraft.',
      options: [],
      acceptedAnswers: [
        { text: 'were', rationale: 'Giả định trái thực tế với động từ to be trong Second Conditional chuẩn mực là were.' },
        { text: 'was', rationale: 'Was được chấp nhận trong văn phong ít trang trọng.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q8',
      kind: 'gap',
      prompt: 'What ___ you ___ (do) if you won a free scholarship to Oxford University tomorrow?',
      options: [],
      acceptedAnswers: [
        { text: 'would you do', rationale: 'Câu hỏi giả định Second Conditional với mốc won: would you do.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If I lived in an English-speaking country, I would..." để viết lại giả định: "I do not live in an English-speaking country, so I cannot practice English every day."',
      options: [],
      acceptedAnswers: [
        { text: 'If I lived in an English-speaking country, I would practice English every day.', rationale: 'Chuyển thực tế hiện tại sang câu điều kiện loại 2 giả định.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If you leave chocolate under the blazing sun, it..." để viết lại quy luật tự nhiên: "Leaving chocolate under the blazing sun always causes it to melt."',
      options: [],
      acceptedAnswers: [
        { text: 'If you leave chocolate under the blazing sun, it melts.', rationale: 'Quy luật tự nhiên dùng Zero Conditional với thì Hiện tại đơn ở cả hai vế.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q11',
      kind: 'correction',
      prompt: 'Correct the verb combination for an outcome viewed as a realistic future possibility: "If I find your lost key tomorrow, I would give it back to you."',
      options: [],
      acceptedAnswers: [
        { text: 'If I find your lost key tomorrow, I will give it back to you.', rationale: 'Tình huống tìm thấy chìa khóa vào ngày mai là khả năng có thật (First Conditional), dùng will give.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-q12',
      kind: 'correction',
      prompt: 'When describing the result as a usual physical rule, rewrite with the Zero Conditional rather than a hypothetical Second Conditional: "If you heat ice, it would melt."',
      options: [],
      acceptedAnswers: [
        { text: 'If you heat ice, it melts.', rationale: 'The prompt specifies the usual physical rule; a hypothetical reading would require a different context.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-r1',
      kind: 'choice',
      prompt: 'Câu nào diễn tả một lời khuyên chân thành và tế nhị nhất?',
      options: [
        { text: 'If I were in your position, I would discuss the issue directly with the director.', correct: true, rationale: 'Second conditional với were là cấu trúc chuẩn mực diễn đạt lời khuyên khéo léo.' },
        { text: 'If I am in your position, I will discuss the issue directly with the director.', correct: false, rationale: 'First conditional không phải là mẫu câu khuyên nhủ giả định bản thân.' },
        { text: 'When I am in your position, I discuss the issue.', correct: false, rationale: 'Zero conditional không diễn đạt được sự giả định đặt mình vào vị trí người khác.' },
      ],
      acceptedAnswers: [{ text: 'If I were in your position, I would discuss the issue directly with the director.', rationale: 'Cấu trúc lời khuyên chuẩn mực bằng Second conditional.' }],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-r2',
      kind: 'gap',
      prompt: 'If you ___ (mix) vinegar with baking soda, carbon dioxide gas bubbles up immediately.',
      options: [],
      acceptedAnswers: [
        { text: 'mix', rationale: 'Phản ứng hóa học hiển nhiên (Zero Conditional) dùng thì Hiện tại đơn mix.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If you book your hotel room today, you will..." để viết lại: "Booking your hotel room today guarantees a 20% discount."',
      options: [],
      acceptedAnswers: [
        { text: 'If you book your hotel room today, you will receive a 20% discount.', rationale: 'Viết lại câu bằng First Conditional chỉ khả năng thực tế có được ưu đãi.' },
        { text: 'If you book your hotel room today, you will get a 20% discount.', rationale: 'Biến thể dùng get a 20% discount.' },
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai thì trong câu giả định trái thực tế: "If we had wings, we will fly to warm countries in winter."',
      options: [],
      acceptedAnswers: [
        { text: 'If we had wings, we would fly to warm countries in winter.', rationale: 'Con người có cánh là tình huống giả định phi thực tế (Second Conditional), phải dùng would fly.' },
        { text: 'If we had wings, we could fly to warm countries in winter.', rationale: 'Biến thể dùng could fly.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-o1',
      prompt: 'Viết 3 câu độc lập về cùng một chủ đề (ví dụ: việc học tiếng Anh hoặc công nghệ), trong đó: câu 1 dùng Zero Conditional (quy luật), câu 2 dùng First Conditional (kế hoạch thực tế), và câu 3 dùng Second Conditional (giả định tưởng tượng).',
      modelAnswer: '(1) If you practice speaking English every day, your pronunciation improves naturally. (2) If I pass my English test next Friday, I will celebrate with a dinner at my favorite restaurant. (3) If I spoke ten foreign languages fluently, I would work as an interpreter for the United Nations.',
      checks: [
        'Câu 1 dùng đúng thì Hiện tại đơn ở cả hai vế (Zero Conditional).',
        'Câu 2 dùng Present Simple + will (First Conditional).',
        'Câu 3 dùng Past Simple + would (Second Conditional).',
        'Ý nghĩa mạch lạc và thể hiện rõ ba mức độ khả thi.',
      ],
    },
    {
      id: 'grammar-v2-b1-conditionals-contrast-10-o2',
      prompt: 'Giải thích ngắn gọn (2–3 câu bằng tiếng Anh hoặc tiếng Việt) sự khác nhau về mức độ niềm tin của người nói giữa hai câu: "If I find a better job, I will resign" và "If I found a better job, I would resign".',
      modelAnswer: 'The first sentence uses the First Conditional, indicating that the speaker genuinely believes finding a better job is realistic and possible in the near future. The second sentence uses the Second Conditional, showing that the speaker considers finding a better job unlikely or is simply daydreaming about a hypothetical scenario.',
      checks: [
        'Chỉ ra câu thứ nhất thể hiện niềm tin thực tế có thể xảy ra (First Conditional).',
        'Chỉ ra câu thứ hai thể hiện tình huống giả định ít khả năng xảy ra (Second Conditional).',
        'Giải thích chính xác góc nhìn của người nói.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-conditionals-contrast',
      title: 'Cambridge Grammar: Conditionals summary and comparison',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/conditionals',
      claims: ['So sánh các loại câu điều kiện 0, 1 và 2 theo mức độ khả thi và tính thực tế'],
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
