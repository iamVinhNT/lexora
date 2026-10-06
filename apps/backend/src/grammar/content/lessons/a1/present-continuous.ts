/**
 * @file present-continuous.ts
 * @description Thì hiện tại tiếp diễn: cấu trúc am/is/are + V-ing, hành động đang diễn ra và quy tắc chính tả.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-present-continuous-17',
  revisionId: 'grammar-v2-a1-present-continuous-17@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại tiếp diễn: Hành động đang diễn ra và quy tắc thêm đuôi -ing',
  objective: 'Thành lập và vận dụng chính xác thì hiện tại tiếp diễn (am / is / are + V-ing) ở thể khẳng định, phủ định và nghi vấn để diễn tả hành động đang xảy ra ngay tại thời điểm nói.',
  prerequisiteIds: ['grammar-v2-a1-frequency-adverbs-16'],
  coverage: ['present-continuous', 'be-ing', 'present-actions', 'spelling-ing'],
  context: {
    english: 'Liam is video-calling his mother from a park in Da Nang while people around him are jogging, sketching, and playing badminton.',
    vietnamese: 'Liam đang gọi điện video cho mẹ từ một công viên ở Đà Nẵng trong khi mọi người xung quanh anh đang chạy bộ, vẽ tranh và chơi cầu lông.',
  },
  guide: {
    pattern: 'Khẳng định: S + am / is / are + V-ing; Phủ định: S + am / is / are + not + V-ing; Câu hỏi: Am / Is / Are + S + V-ing?',
    whenToUse: [
      'Diễn tả hành động đang thực sự diễn ra ngay tại thời điểm nói (now, right now, at the moment).',
      'Diễn tả tình huống hoặc hành động tạm thời diễn ra trong khoảng thời gian xung quanh hiện tại (these days, this week).',
      'Kêu gọi sự chú ý đến sự việc đang xảy ra trước mắt (Look!, Listen!).',
    ],
    signalWords: ['now', 'right now', 'at the moment', 'Look!', 'Listen!', 'at present', 'these days'],
    check: [
      'Đã có đầy đủ cả hai thành phần: trợ động từ to be (am / is / are) VÀ động từ thêm đuôi -ing chưa?',
      'Với e câm cuối từ, thường bỏ e (write → writing), nhưng giữ e trong seeing/agreeing. Với một nguyên âm + một phụ âm cuối ở âm tiết được nhấn, thường nhân đôi phụ âm (run → running, begin → beginning), trừ w/x/y (snowing, fixing, playing). Đuôi -ie đổi thành -ying (lie → lying).',
    ],
  },
  explanation: 'Thì hiện tại tiếp diễn (Present Continuous) được cấu tạo bắt buộc bởi hai thành tố: động từ to be chia theo chủ ngữ (I am, he/she/it is, we/you/they are) và phân từ hiện tại (V-ing) của động từ chính. Khi thiếu một trong hai thành tố, câu sẽ sai ngữ pháp. Thể phủ định thêm "not" ngay sau to be (is not = isn’t, are not = aren’t, am not). Thể nghi vấn đảo to be lên trước chủ ngữ. Lưu ý các động từ chỉ trạng thái, cảm xúc, nhận thức (như like, want, know, understand) thường không dùng ở thì tiếp diễn ở trình độ cơ bản.',
  examples: [
    { english: 'I am writing an email to my supervisor right now.', vietnamese: 'Tôi đang viết một email gửi cho người giám sát ngay lúc này. (Hành động đang diễn ra, write bỏ e thêm -ing).' },
    { english: 'Mai is reading an architecture magazine on the balcony.', vietnamese: 'Mai đang đọc một tạp chí kiến trúc ngoài ban công. (Mai là ngôi ba số ít đi với is + reading).' },
    { english: 'The children are running happily on the grass.', vietnamese: 'Những đứa trẻ đang chạy vui vẻ trên thảm cỏ. (Children số nhiều đi với are, run nhân đôi n thành running).' },
    { english: 'Listen! Someone is singing a beautiful folk song.', vietnamese: 'Lắng nghe kìa! Ai đó đang hát một bài dân ca tuyệt đẹp. (Tín hiệu Listen! chỉ hành động đang diễn ra).' },
    { english: 'We are not watching television; we are discussing homework.', vietnamese: 'Chúng tôi không đang xem ti vi; chúng tôi đang thảo luận bài tập về nhà.' },
    { english: 'Are you waiting for the express bus to the airport?', vietnamese: 'Bạn có đang đợi chuyến xe buýt nhanh ra sân bay không? (Câu hỏi đảo Are lên đầu).' },
  ],
  contrasts: [
    {
      form: 'She is reading vs She reads',
      whyFits: 'She is reading diễn tả hành động đang diễn ra ngay tại thời điểm nói (Right now, she is reading a book).',
      whyNot: 'She reads diễn tả thói quen hoặc sở thích chung chung lặp đi lặp lại (She reads books every night).',
    },
    {
      form: 'He is running vs He is runing',
      whyFits: 'Run là động từ một âm tiết có kết cấu 1 phụ âm + 1 nguyên âm + 1 phụ âm nên bắt buộc nhân đôi phụ âm cuối trước khi thêm -ing (running).',
      whyNot: 'Dạng "runing" là lỗi sai chính tả phổ biến do quên nhân đôi phụ âm cuối.',
    },
  ],
  commonMistakes: [
    'Thiếu trợ động từ to be: “I reading a book” → Cần sửa thành “I am reading a book”.',
    'Thiếu đuôi -ing ở động từ chính: “She is read a magazine” → Cần sửa thành “She is reading a magazine”.',
    'Giữ e câm trong make: “She is makeing tea” → “She is making tea”. Không bỏ e trong mọi từ: see → seeing.',
  ],
  summary: 'Hiện tại tiếp diễn: S + am/is/are + V-ing, thường dùng cho hành động đang diễn ra hoặc tình huống tạm thời. Chú ý quy tắc chính tả khi thêm -ing; một số động từ trạng thái thường không dùng ở dạng này.',
  exercises: [
    {
      id: 'grammar-v2-a1-present-continuous-17-q1',
      kind: 'choice',
      prompt: 'Look! The two boys ___ across the street toward the bakery.',
      options: [
        { text: 'are running', correct: true, rationale: 'Chủ ngữ "The two boys" là số nhiều, đi với are running (nhân đôi phụ âm n).' },
        { text: 'is running', correct: false, rationale: 'Is chỉ dùng cho chủ ngữ số ít.' },
        { text: 'are runing', correct: false, rationale: 'Sai chính tả vì run chưa nhân đôi phụ âm n trước khi thêm -ing.' },
      ],
      acceptedAnswers: [{ text: 'are running', rationale: 'Are running chia đúng to be số nhiều và chính tả gấp đôi phụ âm n.' }],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q2',
      kind: 'choice',
      prompt: 'Be quiet, please! The baby ___ in the next room.',
      options: [
        { text: 'is sleeping', correct: true, rationale: 'The baby là danh từ số ít, đi với is sleeping để diễn tả việc đang ngủ lúc này.' },
        { text: 'are sleeping', correct: false, rationale: 'Are sleeping dùng cho chủ ngữ số nhiều.' },
        { text: 'sleeps', correct: false, rationale: 'Sleeps là thì hiện tại đơn chỉ thói quen, không phù hợp ngữ cảnh nhắc nhở Be quiet.' },
      ],
      acceptedAnswers: [{ text: 'is sleeping', rationale: 'Is sleeping diễn tả hành động đang diễn ra ngay lúc nói.' }],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q3',
      kind: 'choice',
      prompt: 'I ___ an important report right now, so I cannot answer the phone.',
      options: [
        { text: 'am typing', correct: true, rationale: 'Chủ ngữ I đi với am typing (type bỏ e trước khi thêm -ing).' },
        { text: 'am typeing', correct: false, rationale: 'Sai quy tắc chính tả, động từ tận cùng bằng e phải bỏ e trước khi thêm -ing.' },
        { text: 'is typing', correct: false, rationale: 'Is typing không dùng cho chủ ngữ I.' },
      ],
      acceptedAnswers: [{ text: 'am typing', rationale: 'Am typing phù hợp với chủ ngữ I và tuân thủ quy tắc bỏ đuôi e.' }],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q4',
      kind: 'choice',
      prompt: '___ your friends waiting for you at the cafe entrance?',
      options: [
        { text: 'Are', correct: true, rationale: 'Your friends là danh từ số nhiều nên câu hỏi hiện tại tiếp diễn bắt đầu bằng Are.' },
        { text: 'Do', correct: false, rationale: 'Do dùng với động từ nguyên mẫu trong hiện tại đơn, không đi với V-ing waiting.' },
        { text: 'Is', correct: false, rationale: 'Is chỉ đi với danh từ số ít.' },
      ],
      acceptedAnswers: [{ text: 'Are', rationale: 'Are là dạng to be số nhiều trong câu hỏi hiện tại tiếp diễn.' }],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q5',
      kind: 'gap',
      prompt: 'Listen! The birds ___ (sing) sweetly on the high branches.',
      options: [],
      acceptedAnswers: [
        { text: 'are singing', rationale: 'The birds là danh từ số nhiều, đi với are singing.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q6',
      kind: 'gap',
      prompt: 'Huy ___ (make) a fresh cup of coffee in the kitchen right now.',
      options: [],
      acceptedAnswers: [
        { text: 'is making', rationale: 'Huy là ngôi ba số ít, make bỏ e thêm -ing thành is making.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q7',
      kind: 'gap',
      prompt: 'We ___ (not / swim) today because the water is too cold.',
      options: [],
      acceptedAnswers: [
        { text: 'are not swimming', rationale: 'Chủ ngữ We đi với are not swimming, swim nhân đôi m.' },
        { text: 'aren’t swimming', rationale: 'Dạng rút gọn aren’t swimming hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q8',
      kind: 'gap',
      prompt: 'Điền một cụm duy nhất vào chỗ trống; dùng hiện tại tiếp diễn của write: "___ her personal diary at the moment?" (chủ ngữ she; viết cụm gồm be + she + V-ing).',
      options: [],
      acceptedAnswers: [
        { text: 'Is she writing', rationale: 'Đảo to be Is lên trước chủ ngữ she và write bỏ e thêm -ing.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q9',
      kind: 'transform',
      prompt: 'Viết lại cả câu ở hiện tại tiếp diễn, thay in the evening bằng now và đặt now ở cuối: "Nam does his homework in the evening."',
      options: [],
      acceptedAnswers: [
        { text: 'Nam is doing his homework now.', rationale: 'Does chuyển thành is doing đi cùng trạng từ now.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định ở thì hiện tại tiếp diễn: "They are repairing the bridge."',
      options: [],
      acceptedAnswers: [
        { text: 'They are not repairing the bridge.', rationale: 'Thêm not sau are thành are not repairing.' },
        { text: 'They aren’t repairing the bridge.', rationale: 'Dạng rút gọn aren’t repairing chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "Look! That man is runing very fast to catch the bus."',
      options: [],
      acceptedAnswers: [
        { text: 'Look! That man is running very fast to catch the bus.', rationale: 'Run phải nhân đôi phụ âm n thành running.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "The children playing games in the living room right now."',
      options: [],
      acceptedAnswers: [
        { text: 'The children are playing games in the living room right now.', rationale: 'Thiếu trợ động từ to be are trước phân từ playing.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-present-continuous-17-r1',
      kind: 'choice',
      prompt: 'Where is Linh? — She ___ lunch with a colleague at the canteen.',
      options: [
        { text: 'is having', correct: true, rationale: 'Have diễn tả hành động ăn trưa (have lunch), bỏ e thêm -ing thành is having.' },
        { text: 'is haveing', correct: false, rationale: 'Sai quy tắc chính tả khi chưa bỏ đuôi e.' },
        { text: 'has', correct: false, rationale: 'Has là thì hiện tại đơn, không diễn tả việc đang xảy ra tại thời điểm được hỏi.' },
      ],
      acceptedAnswers: [{ text: 'is having', rationale: 'Is having diễn tả hành động đang ăn trưa tại thời điểm nói.' }],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-r2',
      kind: 'gap',
      prompt: 'The workers ___ (sit) under the shade of the mango tree at the moment.',
      options: [],
      acceptedAnswers: [
        { text: 'are sitting', rationale: 'The workers số nhiều đi với are sitting (sit nhân đôi t).' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi nghi vấn ở thì hiện tại tiếp diễn: "Minh is preparing dinner in the kitchen."',
      options: [],
      acceptedAnswers: [
        { text: 'Is Minh preparing dinner in the kitchen?', rationale: 'Đảo to be Is lên đầu câu để tạo câu hỏi nghi vấn.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "I am writeing a postcard to send to my friend in London."',
      options: [],
      acceptedAnswers: [
        { text: 'I am writing a postcard to send to my friend in London.', rationale: 'Write tận cùng bằng e nên bỏ e rồi mới thêm -ing thành writing.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-present-continuous-17-o1',
      prompt: 'Hãy nhìn quanh căn phòng hoặc không gian bạn đang ngồi và viết 3-4 câu miêu tả những việc bạn và người khác đang làm ngay lúc này (dùng thì hiện tại tiếp diễn).',
      modelAnswer: 'I am sitting at my desk. My sister is listening to instrumental music with her earphones. Outside the window, a gentle rain is falling.',
      checks: [
        'Sử dụng cấu trúc am / is / are + V-ing trong tất cả các câu.',
        'Chia đúng to be phù hợp với các chủ ngữ khác nhau.',
        'Chính tả đuôi -ing chính xác (sitting, listening, falling).',
      ],
    },
    {
      id: 'grammar-v2-a1-present-continuous-17-o2',
      prompt: 'Viết một đoạn hội thoại ngắn 3-4 câu qua điện thoại giữa hai người bạn, một người hỏi người kia đang làm gì và người kia trả lời.',
      modelAnswer: 'Alex: Hi Minh, what are you doing right now?\nMinh: Hello Alex! I am cooking dinner for my family.\nAlex: Are you making spaghetti?\nMinh: Yes, I am preparing the tomato sauce right now.',
      checks: [
        'Có câu hỏi hiện tại tiếp diễn (What are you doing? / Are you making...?).',
        'Có câu trả lời khẳng định hiện tại tiếp diễn (I am cooking / I am preparing).',
      ],
    },
  ],
  sources: [
    {
      "id": "continuous",
      "title": "British Council: Present continuous",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-continuous",
      "claims": [
        "Present continuous uses present be plus an -ing form for actions happening now and temporary situations."
      ],
      "checkedAt": "2026-10-06",
      "provenance": "reference-only"
    }
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Lexora internal AI editorial reviewers; main assistant source verification',
    reviewedAt: "2026-10-06T15:30:39.729Z",
    summary: 'Independent internal-AI prose/exercise review completed; cited reference claims checked on publisher pages. No human-expert or CEFR certification.',
  },
};

export default lesson;
