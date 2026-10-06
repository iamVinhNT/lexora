/**
 * @file stative-action-verbs.ts
 * @description Bài học B1 về động từ chỉ trạng thái và động từ chỉ hành động (Stative vs Action Verbs).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-stative-action-verbs-05',
  revisionId: 'grammar-v2-b1-stative-action-verbs-05@1.0.0',
  revision: '1.0.0',
  title: 'Động từ chỉ trạng thái và hành động (Stative vs Action Verbs)',
  objective: 'Phân biệt động từ chỉ trạng thái (không chia tiếp diễn) và động từ hành động; nhận diện sự thay đổi ý nghĩa khi các động từ đa nghĩa (think, have, taste, see, look) dùng ở thể tiếp diễn.',
  prerequisiteIds: ['grammar-v2-b1-perfect-simple-vs-continuous-04'],
  coverage: ['stative-action-verbs', 'stative-verbs', 'dynamic-verbs', 'dual-meaning-verbs', 'b1-grammar'],
  context: {
    english: 'Right now, the chef is tasting the tomato sauce to check the seasoning. He thinks that the soup tastes delicious, but it still needs a pinch of sea salt.',
    vietnamese: 'Ngay lúc này, bếp trưởng đang nếm thử nước sốt cà chua để kiểm tra gia vị. Ông ấy nghĩ rằng món súp có vị rất ngon, nhưng nó vẫn cần thêm một nhúm muối biển.',
  },
  guide: {
    pattern: 'Nghĩa trạng thái (nhận thức, cảm xúc, sở hữu, giác quan tự nhiên) -> Thì đơn; Nghĩa hành động (hoạt động chủ ý, tiến trình tạm thời) -> Có thể chia tiếp diễn (-ing)',
    whenToUse: [
      'Dùng thì đơn với các động từ thuần trạng thái miêu tả nhận thức (know, realize, believe), cảm xúc (like, love, prefer, want), và sở hữu (belong, possess, own).',
      'Dùng thì tiếp diễn với các động từ hành động diễn tả hoạt động vật lý hoặc tinh thần chủ ý đang diễn ra.',
      'Linh hoạt chuyển đổi thì cho các động từ có cả hai nét nghĩa: think (nghĩ rằng vs đang suy ngẫm), have (sở hữu vs đang ăn/uống/trải nghiệm), taste (có vị vs đang nếm).',
    ],
    signalWords: ['think', 'have', 'taste', 'smell', 'look', 'see', 'feel', 'weigh', 'belong to', 'prefer'],
    check: [
      'Xác định nét nghĩa trong ngữ cảnh: trạng thái bất biến hay hành động chủ ý tức thời?',
      'Động từ sở hữu "have" không chia tiếp diễn; nhưng cụm từ "have breakfast/a shower/fun" chia tiếp diễn bình thường.',
      'Động từ giác quan "taste/smell" mang nghĩa "có vị/có mùi" dùng thì đơn; mang nghĩa "đang nếm/đang ngửi" dùng thì tiếp diễn.',
    ],
  },
  explanation: 'Trong tiếng Anh, động từ được chia thành hai nhóm chính: Động từ hành động (Action/Dynamic verbs) miêu tả những hoạt động cụ thể có khởi đầu và kết thúc (run, build, write) – nhóm này có thể chia ở cả thì đơn lẫn thì tiếp diễn. Ngược lại, Động từ trạng thái (Stative verbs) miêu tả tình trạng, cảm xúc, mối quan hệ sở hữu hoặc nhận thức nội tâm (know, hate, belong, understand) – nhóm này thông thường không được chia ở các thì tiếp diễn (-ing).\n\nĐiểm quan trọng ở trình độ B1 là nhóm Động từ đa nghĩa (Dual-meaning verbs). Tùy vào ngữ cảnh, chúng mang nghĩa trạng thái hoặc hành động:\n- Think: "I think you are right" (trạng thái: quan điểm, tin rằng) đối lập với "I am thinking about moving" (hành động: đang cân nhắc trong đầu).\n- Have: "She has a laptop" (trạng thái: sở hữu) đối lập với "She is having lunch" (hành động: đang ăn).\n- Taste: "The cake tastes sweet" (trạng thái: có vị ngọt) đối lập với "The baker is tasting the cream" (hành động: người thợ đang nếm kem).\n- Look: "You look tired" (trạng thái: trông có vẻ) đối lập với "She is looking at the painting" (hành động: đang ngắm nhìn).',
  examples: [
    {
      english: 'I think that your proposal is very practical.',
      vietnamese: 'Tôi nghĩ rằng đề xuất của bạn rất thực tế (quan điểm cá nhân -> thì đơn).',
    },
    {
      english: 'Don\'t disturb him; he is thinking about a difficult math problem.',
      vietnamese: 'Đừng làm phiền anh ấy; anh ấy đang suy nghĩ về một bài toán khó (quá trình suy ngẫm -> tiếp diễn).',
    },
    {
      english: 'We have a small cottage near the coast.',
      vietnamese: 'Chúng tôi có một ngôi nhà nhỏ gần bờ biển (sở hữu -> thì đơn).',
    },
    {
      english: 'The manager is having a private meeting with the client right now.',
      vietnamese: 'Vị giám đốc đang có một cuộc họp riêng với khách hàng ngay lúc này (hành động đang diễn ra -> tiếp diễn).',
    },
    {
      english: 'This hot tea smells like fresh mint.',
      vietnamese: 'Tách trà nóng này có mùi giống như bạc hà tươi (đặc tính tự nhiên -> thì đơn).',
    },
    {
      english: 'Why are you smelling the milk carton? – I want to check if it has gone bad.',
      vietnamese: 'Tại sao bạn lại đang ngửi hộp sữa? – Tôi muốn xem nó đã hỏng chưa (hành động chủ ý -> tiếp diễn).',
    },
  ],
  contrasts: [
    {
      form: 'I think vs I am thinking',
      whyFits: 'I think it is raining outside (nêu ý kiến, quan điểm tại thời điểm nói).',
      whyNot: 'I think it is raining states an opinion. I am thinking can be used when the context presents an active process of consideration, so this example targets the opinion meaning.',
    },
    {
      form: 'She has a car vs She is having dinner',
      whyFits: 'Having dinner là cụm diễn tả hành động ăn tối, hoàn toàn chia được tiếp diễn.',
      whyNot: 'She is having a red car (sai vì sở hữu xe là trạng thái, phải dùng has).',
    },
  ],
  commonMistakes: [
    'Chia tiếp diễn động từ sở hữu "have": nói "I am having three sisters" (sai) thay vì "I have three sisters" (đúng).',
    'Chia tiếp diễn động từ nhận thức "know/understand": nói "I am understanding the lesson now" (sai) thay vì "I understand the lesson now" (đúng).',
    'Dùng look nối với tính từ để mô tả vẻ ngoài; dùng look at + object cho hành động nhìn: He looks tired / He is looking at the screen.',
  ],
  summary: 'Stative verbs (nhận thức, sở hữu, cảm xúc) không chia -ing. Dual-meaning verbs đổi nghĩa: thì đơn chỉ trạng thái/quan điểm, tiếp diễn chỉ hành động/quá trình tạm thời.',
  exercises: [
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q1',
      kind: 'choice',
      prompt: 'Be quiet for a moment, please. I ___ about our travel itinerary for next week.',
      options: [
        { text: 'am thinking', correct: true, rationale: 'Suy ngẫm, cân nhắc là hành động tư duy đang diễn ra, dùng tiếp diễn.' },
        { text: 'think', correct: false, rationale: 'Think thì đơn mang nghĩa "tin rằng, có quan điểm rằng", không phù hợp với hành động đang cân nhắc.' },
        { text: 'have thought', correct: false, rationale: 'Have thought chỉ kết quả hoàn tất trong quá khứ, không phù hợp với ngữ cảnh be quiet now.' },
      ],
      acceptedAnswers: [{ text: 'am thinking', rationale: 'Think dùng tiếp diễn khi mang nghĩa đang suy nghĩ, cân nhắc.' }],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q2',
      kind: 'choice',
      prompt: 'This vintage leather jacket ___ to my grandfather.',
      options: [
        { text: 'belongs', correct: true, rationale: 'Belong to là động từ trạng thái sở hữu, luôn chia ở thì đơn.' },
        { text: 'is belonging', correct: false, rationale: 'Belong không bao giờ chia ở thì tiếp diễn.' },
        { text: 'has been belonging', correct: false, rationale: 'Không dùng thì hoàn thành tiếp diễn với belong.' },
      ],
      acceptedAnswers: [{ text: 'belongs', rationale: 'Belong là động từ trạng thái chỉ sở hữu, không dùng tiếp diễn.' }],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q3',
      kind: 'choice',
      prompt: 'Listen to the music! Do you ___ that strange violin sound in the background?',
      options: [
        { text: 'hear', correct: true, rationale: 'Hear là động từ tri giác tự nhiên (nghe thấy), dùng thì đơn hoặc can hear, không chia tiếp diễn.' },
        { text: 'hearing', correct: false, rationale: 'Thiếu trợ động từ và hear không chia tiếp diễn ở nghĩa tri giác.' },
        { text: 'are hearing', correct: false, rationale: 'Hear tri giác không dùng thì hiện tại tiếp diễn.' },
      ],
      acceptedAnswers: [{ text: 'hear', rationale: 'Hear là động từ tri giác, dùng thì đơn trong câu hỏi Do you hear...?' }],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q4',
      kind: 'choice',
      prompt: 'Mrs. Davis cannot answer the phone because she ___ a shower upstairs.',
      options: [
        { text: 'is having', correct: true, rationale: 'Have a shower là cụm diễn tả hành động đang tắm, chia thì tiếp diễn.' },
        { text: 'has', correct: false, rationale: 'Has thì đơn chỉ thói quen, không giải thích lý do không thể nhấc máy ngay lúc này.' },
        { text: 'has had', correct: false, rationale: 'Has had ngụ ý đã tắm xong rồi, mâu thuẫn với việc không thể nghe điện thoại bây giờ.' },
      ],
      acceptedAnswers: [{ text: 'is having', rationale: 'Have trong cụm have a shower là hành động, chia tiếp diễn.' }],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q5',
      kind: 'gap',
      prompt: 'The soup ___ (taste) delicious; what herbs did you put into the broth?',
      options: [],
      acceptedAnswers: [
        { text: 'tastes', rationale: 'Taste mang nghĩa trạng thái "có vị" nên chia ở thì hiện tại đơn ngôi thứ ba số ít.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q6',
      kind: 'gap',
      prompt: 'Why are you on your knees? – The chef ___ (taste) the curry sauce to see if it needs more chili.',
      options: [],
      acceptedAnswers: [
        { text: 'is tasting', rationale: 'Taste mang nghĩa hành động chủ ý "đang nếm thử", dùng thì hiện tại tiếp diễn.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q7',
      kind: 'gap',
      prompt: 'We ___ (not / agree) with the terms of the revised contract.',
      options: [],
      acceptedAnswers: [
        { text: 'do not agree', rationale: 'Agree là động từ trạng thái quan điểm, chia thì hiện tại đơn phủ định.' },
        { text: "don't agree", rationale: 'Dạng rút gọn don\'t agree.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q8',
      kind: 'gap',
      prompt: 'Right now, our legal team ___ (have) a meeting with the overseas partners.',
      options: [],
      acceptedAnswers: [
        { text: 'is having', rationale: 'Have a meeting là hành động đang diễn ra, chia hiện tại tiếp diễn với chủ ngữ số ít.' },
        { text: 'are having', rationale: 'Chấp nhận are having khi xem collective noun legal team là tập hợp các cá nhân.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng động từ "think" ở thì thích hợp để biểu thị quan điểm: "In my opinion, this city needs more green spaces."',
      options: [],
      acceptedAnswers: [
        { text: 'I think that this city needs more green spaces.', rationale: 'Dùng I think (thì đơn) để thể hiện quan điểm cá nhân.' },
        { text: 'I think this city needs more green spaces.', rationale: 'Lược bỏ liên từ that.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q10',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "see" ở thì tiếp diễn để diễn đạt một cuộc hẹn trong tương lai gần: "I have an appointment with my dentist tomorrow morning."',
      options: [],
      acceptedAnswers: [
        { text: 'I am seeing my dentist tomorrow morning.', rationale: 'See mang nghĩa gặp gỡ / có cuộc hẹn được chia ở thì tiếp diễn.' },
        { text: "I'm seeing my dentist tomorrow morning.", rationale: 'Dạng viết tắt I\'m seeing.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thì tiếp diễn không phù hợp của động từ trạng thái: "I am knowing the answer to this riddle."',
      options: [],
      acceptedAnswers: [
        { text: 'I know the answer to this riddle.', rationale: 'Know là động từ trạng thái nhận thức, bắt buộc dùng thì đơn I know.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai khi dùng động từ sở hữu: "My uncle is having a large summer house in the countryside."',
      options: [],
      acceptedAnswers: [
        { text: 'My uncle has a large summer house in the countryside.', rationale: 'Have mang nghĩa sở hữu ngôi nhà là trạng thái, dùng thì hiện tại đơn has.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-r1',
      kind: 'choice',
      prompt: 'What are you looking at? – I ___ that woman over there is our new art director.',
      options: [
        { text: 'think', correct: true, rationale: 'Nêu nhận định/suy đoán dùng I think ở thì đơn.' },
        { text: 'am thinking', correct: false, rationale: 'Không dùng am thinking để dẫn xuất một mệnh đề nhận định (that...).' },
        { text: 'was thinking', correct: false, rationale: 'Ngữ cảnh ở hiện tại, không dùng thì quá khứ.' },
      ],
      acceptedAnswers: [{ text: 'think', rationale: 'Think mang nghĩa quan điểm/nhận định dùng thì hiện tại đơn.' }],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-r2',
      kind: 'gap',
      prompt: 'Look at the sky! The dark clouds ___ (look) very threatening right now.',
      options: [],
      acceptedAnswers: [
        { text: 'look', rationale: 'Look đi với tính từ miêu tả vẻ ngoài là động từ liên kết trạng thái, dùng thì đơn.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "weigh" ở thì tiếp diễn để diễn đạt hành động cân đo: "The post office clerk is putting the package on the scales to measure its weight."',
      options: [],
      acceptedAnswers: [
        { text: 'The post office clerk is weighing the package.', rationale: 'Weigh ở dạng tiếp diễn diễn tả hành động đặt lên bàn cân để đo trọng lượng.' },
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Are you believing what he just told us?"',
      options: [],
      acceptedAnswers: [
        { text: 'Do you believe what he just told us?', rationale: 'Believe là động từ trạng thái niềm tin, dùng câu hỏi thì hiện tại đơn Do you believe...?' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-o1',
      prompt: 'Viết 2–3 câu sử dụng động từ "think" ở cả hai dạng: một câu mang nghĩa quan điểm cá nhân (thì đơn) và một câu mang nghĩa đang suy ngẫm/cân nhắc một kế hoạch (thì tiếp diễn).',
      modelAnswer: 'I think that studying a foreign language every day is the most effective learning habit. Currently, I am thinking about enrolling in an intensive Spanish course next summer.',
      checks: [
        'Dùng I think + mệnh đề cho quan điểm (thì hiện tại đơn).',
        'Dùng am thinking about + V-ing/noun cho hành động cân nhắc (thì tiếp diễn).',
        'Câu văn mạch lạc, đúng ngữ pháp và bối cảnh B1.',
      ],
    },
    {
      id: 'grammar-v2-b1-stative-action-verbs-05-o2',
      prompt: 'Viết 2–3 câu sử dụng động từ "have" trong hai tình huống khác nhau: một câu chỉ quyền sở hữu tài sản (thì đơn) và một câu chỉ hoạt động sinh hoạt thường ngày (thì tiếp diễn).',
      modelAnswer: 'My family has a cozy apartment in the city center with three bedrooms. At this moment, everyone is in the dining room because we are having a celebratory dinner together.',
      checks: [
        'Dùng has/have ở thì đơn khi mang nghĩa sở hữu tài sản.',
        'Dùng is/are having ở thì tiếp diễn cho hoạt động sinh hoạt (having dinner, having fun...).',
        'Chính xác về sự hòa hợp giữa chủ ngữ và động từ.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-stative-verbs',
      title: 'Cambridge Grammar: Stative and dynamic verbs',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/stative-verbs',
      claims: ['Phân biệt động từ trạng thái và động từ hành động, cũng như các động từ đổi nghĩa theo thì'],
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
