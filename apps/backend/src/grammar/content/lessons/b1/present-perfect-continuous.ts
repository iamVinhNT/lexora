/**
 * @file present-perfect-continuous.ts
 * @description Bài học B1 về thì hiện tại hoàn thành tiếp diễn (Present Perfect Continuous: have/has been + V-ing).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b1-present-perfect-continuous-03',
  revisionId: 'grammar-v2-b1-present-perfect-continuous-03@1.0.0',
  revision: '1.0.0',
  title: 'Thì hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)',
  objective: 'Sử dụng have/has been + V-ing để nhấn mạnh tính liên tục, khoảng thời lượng (for/since) hoặc dấu vết trực quan ở hiện tại của một hành động vừa diễn ra.',
  prerequisiteIds: ['grammar-v2-b1-past-perfect-first-02'],
  coverage: ['present-perfect-continuous', 'have-been-v-ing', 'duration-focus', 'visible-result', 'b1-grammar'],
  context: {
    english: 'The kitchen smells wonderful because my sister has been baking bread all afternoon. Her apron is covered in flour, and she has been kneading dough for over two hours.',
    vietnamese: 'Nhà bếp thơm nức vì em gái tôi đã nướng bánh mì suốt cả buổi chiều. Tạp dề của em lấm tấm bột mì, và em đã nhào bột liên tục hơn hai tiếng đồng hồ.',
  },
  guide: {
    pattern: 'Khẳng định: S + have/has been + V-ing; Phủ định: S + have/has not (haven\'t/hasn\'t) been + V-ing; Nghi vấn: Have/Has + S + been + V-ing?',
    whenToUse: [
      'Nhấn mạnh hành động bắt đầu trong quá khứ, diễn ra liên tục và vẫn đang tiếp diễn ở hiện tại.',
      'Diễn tả hành động vừa mới dừng lại nhưng để lại kết quả hoặc dấu vết cụ thể, nhìn thấy được ở thời điểm nói.',
      'Nhấn mạnh khoảng thời gian kéo dài của hành động khi đi với các cụm từ như "for...", "since...", "all morning/day/week".',
    ],
    signalWords: ['for two hours', 'since morning', 'all day', 'lately', 'recently', 'how long'],
    check: [
      'Chủ ngữ số ít đi với has been V-ing, số nhiều/I/you/we/they đi với have been V-ing.',
      'Động từ chỉ trạng thái (stative verbs như know, believe, like, understand) không dùng thì tiếp diễn này.',
      'Khi cần nêu số lượng đã hoàn tất, thường dùng Present Perfect Simple; Continuous nhấn mạnh hoạt động kéo dài hoặc lặp lại.',
    ],
  },
  explanation: 'Thì Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous) tập trung vào "tiến trình" và "thời lượng" của hành động thay vì kết quả hoàn tất. Cấu trúc gồm trợ động từ have/has + been + động từ đuôi -ing. Khác với Hiện tại hoàn thành đơn (chú trọng hành động đã xong hay chưa và để lại kết quả gì), thì tiếp diễn trả lời cho câu hỏi "How long?" (bao lâu) và khắc họa hoạt động diễn ra liên miên, không ngừng nghỉ. Ngoài ra, thì này còn dùng rất tự nhiên để giải thích cho một hiện tượng vừa xảy ra: ví dụ "Why are your hands wet? – I have been washing the dishes." (Tại sao tay bạn ướt? – Tôi vừa mới rửa bát xong).',
  examples: [
    {
      english: 'Liam has been studying for the biology examination since early morning.',
      vietnamese: 'Liam đã và đang học cho bài thi sinh học từ sáng sớm.',
    },
    {
      english: 'It has been raining heavily for three hours, so the streets are completely flooded.',
      vietnamese: 'Trời đã mưa như trút suốt ba tiếng đồng hồ rồi, nên các con phố ngập lênh láng.',
    },
    {
      english: 'Why are you out of breath? – I have been running around the park.',
      vietnamese: 'Sao bạn thở hổn hển vậy? – Tôi vừa chạy bộ quanh công viên.',
    },
    {
      english: 'The mechanics have been repairing our car since Tuesday, but it is not ready yet.',
      vietnamese: 'Các thợ cơ khí đã sửa xe của chúng tôi từ hôm thứ Ba, nhưng xe vẫn chưa xong.',
    },
    {
      english: 'How long have you been waiting for the bus at this stop?',
      vietnamese: 'Bạn đã đợi xe buýt ở trạm này được bao lâu rồi?',
    },
    {
      english: 'She has not been sleeping well recently because of exam stress.',
      vietnamese: 'Dạo gần đây cô ấy ngủ không ngon giấc vì căng thẳng thi cử.',
    },
  ],
  contrasts: [
    {
      form: 'has been painting vs has painted',
      whyFits: 'He has been painting the fence all morning (nhấn mạnh hoạt động quét sơn kéo dài suốt buổi sáng, có thể chưa xong).',
      whyNot: 'He has painted two rooms today (nhấn mạnh kết quả hoàn thành cụ thể: 2 căn phòng đã sơn xong).',
    },
    {
      form: 'have been waiting vs waited',
      whyFits: 'I have been waiting for twenty minutes (hành động bắt đầu 20 phút trước và hiện tại vẫn đang phải đứng đợi).',
      whyNot: 'I waited for twenty minutes yesterday (hành động đợi đã chấm dứt hoàn toàn trong quá khứ).',
    },
  ],
  commonMistakes: [
    'Quên trợ động từ "been": nói "She has working" (sai) thay vì "She has been working" (đúng).',
    'Dùng thì tiếp diễn với động từ trạng thái: nói "I have been knowing him for years" (sai) thay vì "I have known him for years" (đúng).',
    'Dùng Continuous như thể khẳng định số lượng đã hoàn tất: với ba email đã gửi xong, dùng "I have sent three emails"; "I have been writing three emails" có thể nói về tiến trình nếu chưa xong.',
  ],
  summary: 'Present Perfect Continuous (have/has been + V-ing) nhấn mạnh tính liên tục, thời lượng (how long) hoặc dấu vết hiện tại của một hành động vừa kết thúc.',
  exercises: [
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q1',
      kind: 'choice',
      prompt: 'Emma looks exhausted because she ___ in the garden all morning.',
      options: [
        { text: 'has been working', correct: true, rationale: 'Nhấn mạnh quá trình làm việc liên tục cả buổi sáng dẫn đến vẻ kiệt sức ở hiện tại.' },
        { text: 'is working', correct: false, rationale: 'Is working chỉ mô tả hành động ngay lúc nói, không giải thích thời lượng cả buổi sáng (all morning).' },
        { text: 'worked', correct: false, rationale: 'Worked là quá khứ đơn, không liên kết trực tiếp với biểu hiện kiệt sức hiện tại bằng thì tiếp diễn.' },
      ],
      acceptedAnswers: [{ text: 'has been working', rationale: 'Present Perfect Continuous nhấn mạnh quá trình kéo dài all morning để lại dấu vết ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q2',
      kind: 'choice',
      prompt: 'How long ___ your friend ___ German at the local institute?',
      options: [
        { text: 'has / been learning', correct: true, rationale: 'Chủ ngữ your friend là ngôi thứ ba số ít, đi với has been learning.' },
        { text: 'have / been learning', correct: false, rationale: 'Have không đi với chủ ngữ số ít your friend.' },
        { text: 'is / learning', correct: false, rationale: 'Is learning không đi kèm câu hỏi thời lượng how long về quá trình kéo dài đến nay.' },
      ],
      acceptedAnswers: [{ text: 'has / been learning', rationale: 'Has... been learning phù hợp với câu hỏi thời lượng How long và chủ ngữ ngôi thứ ba số ít.' }],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q3',
      kind: 'choice',
      prompt: 'The road is slippery because it ___ steadily since noon.',
      options: [
        { text: 'has been raining', correct: true, rationale: 'Mưa liên tục từ trưa tới giờ (since noon), tạo ra đường trơn ở hiện tại.' },
        { text: 'was raining', correct: false, rationale: 'Was raining là quá khứ tiếp diễn, không nối với mốc hiện tại the road is slippery.' },
        { text: 'rains', correct: false, rationale: 'Rains là hiện tại đơn diễn tả quy luật, không phù hợp với mốc thời gian cụ thể since noon.' },
      ],
      acceptedAnswers: [{ text: 'has been raining', rationale: 'Diễn tả thời tiết mưa liên tục từ trưa đến giờ gây kết quả ở hiện tại.' }],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q4',
      kind: 'choice',
      prompt: 'They are covered in paint because they ___ the living room walls.',
      options: [
        { text: 'have been decorating', correct: true, rationale: 'Hành động trang trí vừa diễn ra để lại vết sơn trên người.' },
        { text: 'had decorated', correct: false, rationale: 'Had decorated là quá khứ hoàn thành, không hòa hợp với hiện tại are covered.' },
        { text: 'have decorated', correct: false, rationale: 'Have decorated chú trọng căn phòng đã xong, trong khi have been decorating nhấn mạnh dấu vết hoạt động.' },
      ],
      acceptedAnswers: [{ text: 'have been decorating', rationale: 'Have been decorating nhấn mạnh hoạt động vừa diễn ra để lại dấu vết.' }],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q5',
      kind: 'gap',
      prompt: 'My brother ___ (play) online video games for five hours without taking a break.',
      options: [],
      acceptedAnswers: [
        { text: 'has been playing', rationale: 'Chủ ngữ my brother đi với has been playing để nhấn mạnh thời lượng 5 tiếng liên tục.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q6',
      kind: 'gap',
      prompt: 'We ___ (wait) for the customer service agent since nine o\'clock.',
      options: [],
      acceptedAnswers: [
        { text: 'have been waiting', rationale: 'Chủ ngữ we đi với have been waiting kết hợp với mốc thời gian since nine o\'clock.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q7',
      kind: 'gap',
      prompt: 'Sarah ___ (not / practice) the piano regularly this month.',
      options: [],
      acceptedAnswers: [
        { text: 'has not been practicing', rationale: 'Dạng phủ định has not been practicing.' },
        { text: "hasn't been practicing", rationale: 'Dạng viết tắt hasn\'t been practicing.' },
        { text: 'has not been practising', rationale: 'Chính tả Anh - Anh practising.' },
        { text: "hasn't been practising", rationale: 'Dạng viết tắt chính tả Anh - Anh.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q8',
      kind: 'gap',
      prompt: 'Why are your clothes muddy? – I ___ (plant) vegetables in the backyard.',
      options: [],
      acceptedAnswers: [
        { text: 'have been planting', rationale: 'I have been planting giải thích cho nguyên nhân quần áo bị lấm bùn ở hiện tại.' },
        { text: "'ve been planting", rationale: 'Dạng viết tắt I\'ve been planting.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q9',
      kind: 'transform',
      prompt: 'Viết lại hai câu sau thành một câu dùng Present Perfect Continuous với "since": "Oliver started reading that novel at noon. He is still reading it."',
      options: [],
      acceptedAnswers: [
        { text: 'Oliver has been reading that novel since noon.', rationale: 'Chuyển hành động bắt đầu lúc trưa và vẫn đang đọc sang thì hiện tại hoàn thành tiếp diễn với since noon.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q10',
      kind: 'transform',
      prompt: 'Viết lại câu hỏi sau dùng Present Perfect Continuous với "How long": "When did you start learning to play the guitar?"',
      options: [],
      acceptedAnswers: [
        { text: 'How long have you been learning to play the guitar?', rationale: 'Chuyển câu hỏi thời điểm bắt đầu When did you start sang câu hỏi thời lượng How long have you been learning.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "Lucas has working at this technology firm for four years."',
      options: [],
      acceptedAnswers: [
        { text: 'Lucas has been working at this technology firm for four years.', rationale: 'Thêm trợ động từ been vào sau has trong cấu trúc Present Perfect Continuous.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi thì không phù hợp với động từ trạng thái: "I have been knowing Mr. Henderson for a decade."',
      options: [],
      acceptedAnswers: [
        { text: 'I have known Mr. Henderson for a decade.', rationale: 'Động từ trạng thái know không dùng thì tiếp diễn, chuyển về Hiện tại hoàn thành đơn have known.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-r1',
      kind: 'choice',
      prompt: 'Sophie\'s eyes are red because she ___ onion soup in the kitchen.',
      options: [
        { text: 'has been preparing', correct: true, rationale: 'Hành động thái hành nấu súp vừa diễn ra giải thích nguyên nhân mắt bị đỏ.' },
        { text: 'prepares', correct: false, rationale: 'Prepares là thói quen hiện tại, không giải thích trạng thái tức thời.' },
        { text: 'prepared', correct: false, rationale: 'Prepared là quá khứ đơn, không liên kết trực tiếp với hiện tại bằng tính liên tục.' },
      ],
      acceptedAnswers: [{ text: 'has been preparing', rationale: 'Has been preparing nhấn mạnh hành động vừa diễn ra để lại dấu vết.' }],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-r2',
      kind: 'gap',
      prompt: 'The scientists ___ (research) this renewable energy solution for several months.',
      options: [],
      acceptedAnswers: [
        { text: 'have been researching', rationale: 'Chủ ngữ số nhiều the scientists đi với have been researching cho thời lượng for several months.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng "for" và thì Present Perfect Continuous: "It began snowing at five o\'clock, and it is still snowing now (it is now eight o\'clock)."',
      options: [],
      acceptedAnswers: [
        { text: 'It has been snowing for three hours.', rationale: 'Từ 5 giờ đến 8 giờ là 3 tiếng, dùng for three hours.' },
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "They have been living here since five months."',
      options: [],
      acceptedAnswers: [
        { text: 'They have been living here for five months.', rationale: 'Khoảng thời gian (five months) phải đi với giới từ for, không đi với since.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-o1',
      prompt: 'Viết 2–3 câu mô tả một hoạt động hoặc dự án bạn đã và đang làm liên tục trong tuần này (hoặc tháng này), sử dụng Present Perfect Continuous và giới từ for/since.',
      modelAnswer: 'I have been preparing for my B1 English certificate since the beginning of this month. I have been studying vocabulary and grammar rules for two hours every evening to improve my test scores.',
      checks: [
        'Sử dụng đúng cấu trúc have/has been + V-ing.',
        'Kết hợp chính xác với giới từ for (khoảng thời gian) hoặc since (mốc thời gian).',
        'Nội dung mạch lạc, diễn tả hành động đang tiếp diễn hướng tới hiện tại.',
      ],
    },
    {
      id: 'grammar-v2-b1-present-perfect-continuous-03-o2',
      prompt: 'Viết 2–3 câu giải thích một tình huống mà bạn hoặc ai đó có biểu hiện rõ rệt ở hiện tại (ví dụ: mệt mỏi, quần áo bẩn, khát nước...) bằng một hành động vừa diễn ra liên tục.',
      modelAnswer: 'My brother looks completely exhausted because he has been cleaning the entire garage all afternoon. His clothes are dusty, and he has been moving heavy boxes without taking any rest.',
      checks: [
        'Miêu tả trạng thái hiện tại (exhausted, dusty...).',
        'Dùng thì Present Perfect Continuous để giải thích nguyên nhân vừa diễn ra.',
        'Sử dụng đúng trợ động từ have/has và phân từ been.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-present-perfect-continuous',
      title: 'Cambridge Grammar: Present perfect continuous (I have been working)',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/present-perfect-continuous',
      claims: ['Thì hiện tại hoàn thành tiếp diễn nhấn mạnh thời lượng kéo dài và dấu vết kết quả ở hiện tại'],
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
