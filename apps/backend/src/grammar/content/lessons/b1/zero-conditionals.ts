/**
 * @file zero-conditionals.ts
 * @description Bài học B1 về câu điều kiện loại 0 (Zero Conditionals: If/When + Present Simple, Present Simple).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-zero-conditionals-07',
  revisionId: 'grammar-v2-b1-zero-conditionals-07@1.0.0',
  revision: '1.0.0',
  title: 'Câu điều kiện loại 0 (Zero Conditionals)',
  objective: 'Sử dụng cấu trúc câu điều kiện loại 0 (If/When + Present Simple, Present Simple) để diễn đạt các chân lý khoa học, quy luật tự nhiên, thói quen và sự thật luôn luôn đúng.',
  prerequisiteIds: ['grammar-v2-b1-tense-choice-in-context-06'],
  coverage: ['zero-conditionals', 'conditional-sentences', 'general-truths', 'cause-effect-habits', 'b1-grammar'],
  context: {
    english: 'In the chemistry laboratory, students learn that if you heat water to one hundred degrees Celsius, it boils and turns into steam. When liquid nitrogen touches room temperature air, it evaporates almost immediately.',
    vietnamese: 'Trong phòng thí nghiệm hóa học, học sinh học được rằng nếu bạn đun nước đến 100 độ C, nó sôi và biến thành hơi nước. Khi nitơ lỏng tiếp xúc với không khí ở nhiệt độ phòng, nó bay hơi gần như ngay lập tức.',
  },
  guide: {
    pattern: 'Mệnh đề điều kiện: If/When + S + V(hiện tại đơn); Mệnh đề chính: S + V(hiện tại đơn) hoặc V-nguyên thể (mệnh lệnh thức)',
    whenToUse: [
      'Diễn tả các quy luật khoa học và xu hướng tự nhiên nói chung; dùng ngữ cảnh để tránh biến xu hướng thành khẳng định tuyệt đối.',
      'Diễn tả các thói quen cá nhân hoặc quy tắc ứng xử luôn luôn xảy ra mỗi khi có điều kiện tương ứng.',
      'Đưa ra chỉ dẫn hoặc mệnh lệnh trực tiếp khi một điều kiện xảy ra (ví dụ: If the alarm rings, leave the building).',
    ],
    signalWords: ['if', 'when', 'whenever', 'every time', 'normally', 'always', 'water boils', 'melts'],
    check: [
      'Trong mẫu Zero Conditional cơ bản đang học, hai mệnh đề thường dùng Hiện tại đơn; mệnh đề chính cũng có thể là mệnh lệnh khi đưa chỉ dẫn.',
      'Với quy luật chung, thường dùng Hiện tại đơn thay vì will; dùng will có thể đổi câu thành dự đoán cho một trường hợp tương lai cụ thể.',
      'Với sự kiện lặp lại hoặc quy luật chung, when/whenever có thể thay if; lựa chọn phụ thuộc mức chắc chắn và ý định của người nói.',
    ],
  },
  explanation: 'Zero Conditional thường mô tả quy luật, thói quen hoặc quan hệ nhân–quả chung bằng If/When + Present Simple, Present Simple. Dùng when/whenever khi sự kiện được dự kiến lặp lại; if giữ sắc thái điều kiện hơn. Không phải mọi kết quả đều tuyệt đối chắc chắn, vì câu có thể diễn tả xu hướng hoặc quy tắc thông thường. Mệnh đề chính cũng có thể là mệnh lệnh trong chỉ dẫn, ví dụ: If the alarm rings, leave the building. Khi nói về một dự đoán cho dịp cụ thể trong tương lai, người nói có thể chọn First Conditional với will.',
  examples: [
    {
      english: 'If you expose ice to heat, it melts rapidly.',
      vietnamese: 'Nếu bạn để băng tiếp xúc với nhiệt độ cao, nó tan chảy nhanh chóng.',
    },
    {
      english: 'When people do not get enough sleep, their concentration drops.',
      vietnamese: 'Khi con người không ngủ đủ giấc, khả năng tập trung của họ giảm sút.',
    },
    {
      english: 'If you mix red and yellow paint, you get orange.',
      vietnamese: 'Nếu bạn trộn sơn màu đỏ và màu vàng, bạn sẽ được màu cam.',
    },
    {
      english: 'Plants die if they do not receive sunlight and water.',
      vietnamese: 'Cây cối chết nếu chúng không nhận được ánh sáng mặt trời và nước.',
    },
    {
      english: 'When Marcus feels stressed, he listens to classical piano music.',
      vietnamese: 'Mỗi khi Marcus cảm thấy căng thẳng, anh ấy nghe nhạc piano cổ điển (thói quen bất biến).',
    },
    {
      english: 'If the fire alarm sounds, evacuate through the nearest emergency exit.',
      vietnamese: 'Nếu chuông báo cháy reo, hãy sơ tán qua lối thoát hiểm gần nhất (chỉ dẫn quy tắc).',
    },
  ],
  contrasts: [
    {
      form: 'Zero Conditional vs First Conditional',
      whyFits: 'If you freeze water, it expands (quy luật khoa học bất biến, dùng Hiện tại đơn ở cả hai vế).',
      whyNot: 'If you freeze this bottle tonight, it will expand (dự đoán một tình huống cụ thể ở tương lai, dùng First Conditional với will).',
    },
    {
      form: 'If vs When trong quy luật',
      whyFits: 'Trong Zero Conditional, "If you press this button, the machine starts" tương đương với "When you press this button, the machine starts".',
      whyNot: 'Trong các tình huống bất định, if chỉ khả năng có thể xảy ra, còn when chỉ thời điểm chắc chắn sẽ tới.',
    },
  ],
  commonMistakes: [
    'Dùng "will" trong mệnh đề chính của quy luật khoa học: nói "If you heat ice, it will melt" (đúng ngữ pháp câu loại 1 cho trường hợp cụ thể, nhưng với quy luật phổ quát vĩnh viễn chuẩn mực là "it melts").',
    'Dùng "will" ngay trong mệnh đề "If": nói "If it will rain, grass grows" (sai nghiêm trọng, mệnh đề If không dùng will).',
    'Quên chia ngôi thứ ba số ít (thêm -s/-es) ở động từ của mệnh đề kết quả khi chủ ngữ là it/he/she.',
  ],
  summary: 'Zero Conditional (If/When + Present Simple, Present Simple) diễn tả chân lý, định luật khoa học hoặc thói quen luôn luôn đúng.',
  exercises: [
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ biểu thị quy luật khoa học bất biến: "If water reaches zero degrees Celsius, it ___ into solid ice."',
      options: [
        { text: 'freezes', correct: true, rationale: 'Quy luật vật lý hiển nhiên dùng thì Hiện tại đơn ngôi thứ ba số ít (freezes).' },
        { text: 'will freeze', correct: false, rationale: 'Will freeze hướng tới dự đoán một lần trong tương lai, quy luật khoa học chung chuẩn mực dùng thì hiện tại đơn.' },
        { text: 'froze', correct: false, rationale: 'Froze là quá khứ đơn, sai thì khi nêu chân lý phổ quát.' },
      ],
      acceptedAnswers: [{ text: 'freezes', rationale: 'Zero Conditional diễn tả quy luật khoa học dùng Hiện tại đơn ở cả hai mệnh đề.' }],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q2',
      kind: 'choice',
      prompt: 'Chọn liên từ thích hợp để diễn đạt một nguyên lý kỹ thuật: "___ you press the emergency stop lever, the conveyor belt halts immediately."',
      options: [
        { text: 'If', correct: true, rationale: 'If/When giới thiệu điều kiện kích hoạt nguyên lý hoạt động của máy móc.' },
        { text: 'Unless', correct: false, rationale: 'Unless mang nghĩa "trừ khi", làm đảo ngược ý nghĩa logic kỹ thuật.' },
        { text: 'Although', correct: false, rationale: 'Although là liên từ chỉ sự nhượng bộ, không dùng trong câu điều kiện nguyên nhân - kết quả.' },
      ],
      acceptedAnswers: [{ text: 'If', rationale: 'If mở đầu mệnh đề điều kiện loại 0.' }],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q3',
      kind: 'choice',
      prompt: 'Chọn dạng động từ biểu thị thói quen sức khỏe cố định: "When people eat too much refined sugar, their blood glucose levels ___ sharply."',
      options: [
        { text: 'rise', correct: true, rationale: 'Chủ ngữ levels là số nhiều, động từ hiện tại đơn ở dạng nguyên thể rise.' },
        { text: 'rises', correct: false, rationale: 'Levels là danh từ số nhiều, không chia rises số ít.' },
        { text: 'will be rising', correct: false, rationale: 'Tương lai tiếp diễn không phù hợp với việc diễn đạt quy luật sinh lý học thường xuyên.' },
      ],
      acceptedAnswers: [{ text: 'rise', rationale: 'Hiện tại đơn số nhiều (rise) trong mệnh đề kết quả loại 0.' }],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q4',
      kind: 'choice',
      prompt: 'Chọn câu chỉ dẫn mệnh lệnh thức khi điều kiện xảy ra: "If the printer displays an error code, ___ the device immediately."',
      options: [
        { text: 'restart', correct: true, rationale: 'Mệnh lệnh thức dùng động từ nguyên thể không "to" trong mệnh đề chính của Zero Conditional.' },
        { text: 'restarting', correct: false, rationale: 'Dạng V-ing không làm vị ngữ mệnh lệnh trực tiếp.' },
        { text: 'restarted', correct: false, rationale: 'Dạng quá khứ không dùng cho chỉ dẫn quy tắc hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'restart', rationale: 'Mệnh lệnh thức (restart) dùng trong mệnh đề chính khi đưa ra chỉ dẫn.' }],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q5',
      kind: 'gap',
      prompt: 'If you heat iron to very high temperatures, it ___ (become) soft and pliable.',
      options: [],
      acceptedAnswers: [
        { text: 'becomes', rationale: 'Quy luật vật lý dùng Hiện tại đơn ngôi thứ ba số ít (iron -> becomes).' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q6',
      kind: 'gap',
      prompt: 'When sea water evaporates, salt crystals ___ (remain) behind.',
      options: [],
      acceptedAnswers: [
        { text: 'remain', rationale: 'Chủ ngữ số nhiều salt crystals đi với động từ nguyên thể remain ở thì Hiện tại đơn.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q7',
      kind: 'gap',
      prompt: 'Wood floats if you ___ (place) it in fresh water.',
      options: [],
      acceptedAnswers: [
        { text: 'place', rationale: 'Mệnh đề If ở hiện tại đơn với chủ ngữ you (place).' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q8',
      kind: 'gap',
      prompt: 'If a customer ___ (not / retain) the purchase receipt, the store does not offer a refund.',
      options: [],
      acceptedAnswers: [
        { text: 'does not retain', rationale: 'Hiện tại đơn phủ định ngôi thứ ba số ít a customer does not retain.' },
        { text: "doesn't retain", rationale: 'Dạng rút gọn doesn\'t retain.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q9',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "If you leave metal out in the rain,..." để viết lại nguyên lý: "Leaving metal out in the rain causes it to rust."',
      options: [],
      acceptedAnswers: [
        { text: 'If you leave metal out in the rain, it rusts.', rationale: 'Chuyển danh động từ thành câu điều kiện loại 0 diễn tả quy luật tự nhiên.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q10',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "When babies are hungry,..." để diễn đạt phản xạ tự nhiên: "Hungry babies always cry."',
      options: [],
      acceptedAnswers: [
        { text: 'When babies are hungry, they cry.', rationale: 'Dùng When + Hiện tại đơn và mệnh đề kết quả Hiện tại đơn chỉ phản xạ tự nhiên.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi dùng "will" trong mệnh đề If khi diễn tả quy luật hiển nhiên: "If you will boil milk for too long, it overflows."',
      options: [],
      acceptedAnswers: [
        { text: 'If you boil milk for too long, it overflows.', rationale: 'Mệnh đề If không dùng will, chuyển thành thì Hiện tại đơn boil.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi chia thì quá khứ trong câu khẳng định quy luật khoa học phổ quát: "Plants died if they did not get sufficient light."',
      options: [],
      acceptedAnswers: [
        { text: 'Plants die if they do not get sufficient light.', rationale: 'Quy luật sinh học phổ quát luôn dùng thì Hiện tại đơn ở cả hai mệnh đề.' },
        { text: "Plants die if they don't get sufficient light.", rationale: 'Dạng viết tắt don\'t get.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-zero-conditionals-07-r1',
      kind: 'choice',
      prompt: 'If grease catches fire in a frying pan, never ___ water onto the flames.',
      options: [
        { text: 'pour', correct: true, rationale: 'Mệnh lệnh thức phủ định (never pour) dùng động từ nguyên thể.' },
        { text: 'pouring', correct: false, rationale: 'Pouring không tạo thành câu mệnh lệnh trực tiếp.' },
        { text: 'poured', correct: false, rationale: 'Quá khứ không dùng cho quy tắc an toàn hiện tại.' },
      ],
      acceptedAnswers: [{ text: 'pour', rationale: 'Mệnh lệnh thức nguyên thể pour trong quy tắc phòng cháy.' }],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-r2',
      kind: 'gap',
      prompt: 'When air temperature drops below zero, dew ___ (turn) into frost.',
      options: [],
      acceptedAnswers: [
        { text: 'turns', rationale: 'Hiện tại đơn ngôi thứ ba số ít (dew -> turns) chỉ quy luật tự nhiên.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-r3',
      kind: 'transform',
      prompt: 'Bắt đầu bằng "Whenever I drink strong coffee late in the evening,..." để viết lại: "Drinking strong coffee late in the evening always keeps me awake."',
      options: [],
      acceptedAnswers: [
        { text: 'Whenever I drink strong coffee late in the evening, I stay awake.', rationale: 'Viết lại câu thói quen bất biến bằng Whenever và thì Hiện tại đơn.' },
        { text: 'Whenever I drink strong coffee late in the evening, it keeps me awake.', rationale: 'Biến thể giữ tân ngữ it keeps me awake.' },
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu hòa hợp chủ ngữ - vị ngữ trong mệnh đề kết quả: "If an athlete trains consistently, their stamina improve."',
      options: [],
      acceptedAnswers: [
        { text: 'If an athlete trains consistently, their stamina improves.', rationale: 'Chủ ngữ không đếm được stamina là số ít, động từ cần thêm s thành improves.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-zero-conditionals-07-o1',
      prompt: 'Viết 2–3 câu nêu các quy tắc an toàn hoặc chỉ dẫn kỹ thuật trong đời sống (ví dụ: khi nấu ăn, lái xe hoặc sử dụng thiết bị điện tử), sử dụng câu điều kiện loại 0 (If/When + Present Simple).',
      modelAnswer: 'If you smell gas inside your kitchen, turn off the main valve immediately and do not turn on any electrical switches. When you handle sharp kitchen knives, always keep your fingers curled away from the blade.',
      checks: [
        'Sử dụng đúng cấu trúc Zero Conditional (If/When + Present Simple).',
        'Có thể kết hợp với câu mệnh lệnh thức (turn off, keep...).',
        'Nội dung quy tắc an toàn rõ ràng, thực tế và mạch lạc.',
      ],
    },
    {
      id: 'grammar-v2-b1-zero-conditionals-07-o2',
      prompt: 'Viết 2–3 câu mô tả các quy luật tự nhiên hoặc phản xạ tâm lý/thói quen của bạn mỗi khi gặp thời tiết xấu hoặc căng thẳng, sử dụng câu điều kiện loại 0.',
      modelAnswer: 'When winter temperatures drop below freezing, water pipes easily burst if they lack proper insulation. Whenever I feel exhausted after a long workday, I take a warm bath and read a book.',
      checks: [
        'Dùng thì Hiện tại đơn cho cả hai vế để diễn tả quy luật hoặc thói quen bất biến.',
        'Sử dụng đúng các từ nối điều kiện như when, whenever hoặc if.',
        'Đúng ngữ pháp chia động từ ngôi thứ ba số ít khi áp dụng.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-zero-conditional',
      title: 'Cambridge Grammar: Zero conditional (general truths and rules)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/conditionals-zero',
      claims: ['Câu điều kiện loại 0 diễn đạt các chân lý khoa học, quy luật hiển nhiên và chỉ dẫn quy tắc'],
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
