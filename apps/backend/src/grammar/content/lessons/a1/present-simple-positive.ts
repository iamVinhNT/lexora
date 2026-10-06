/**
 * @file present-simple-positive.ts
 * @description Câu khẳng định thì hiện tại đơn: thói quen, sự thật hiển nhiên và quy tắc chia động từ.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-present-simple-positive-14',
  revisionId: 'grammar-v2-a1-present-simple-positive-14@1.0.0',
  revision: '1.0.0',
  title: 'Hiện tại đơn: Câu khẳng định và quy tắc chia động từ',
  objective: 'Diễn đạt chính xác thói quen hàng ngày, lịch trình và sự thật hiển nhiên bằng câu khẳng định thì hiện tại đơn, chia đúng đuôi động từ theo chủ ngữ.',
  prerequisiteIds: ['grammar-v2-a1-this-that-these-those-13'],
  coverage: ['present-simple-positive', 'present-simple', 'affirmative', 'verb-conjugation'],
  context: {
    english: 'Elena describes her typical weekday morning routine and work schedule at a design studio in Hanoi.',
    vietnamese: 'Elena miêu tả nếp sinh hoạt buổi sáng ngày thường và lịch làm việc của cô tại một công ty thiết kế ở Hà Nội.',
  },
  guide: {
    pattern: 'I / You / We / They / Danh từ số nhiều + V(nguyên mẫu); He / She / It / Danh từ số ít + V(-s / -es)',
    whenToUse: [
      'Diễn tả thói quen, hoạt động lặp đi lặp lại thường xuyên trong đời sống.',
      'Diễn tả chân lý, sự thật khoa học hiển nhiên hoặc tình trạng ổn định lâu dài.',
      'Thông báo thời khóa biểu, lịch trình tàu xe, giờ mở cửa cố định.',
    ],
    signalWords: ['every day', 'always', 'usually', 'often', 'sometimes', 'on weekdays', 'at 7:00 AM'],
    check: [
      'Chủ ngữ là ngôi thứ ba số ít (he / she / it / danh từ số ít) hay các ngôi còn lại?',
      'Đã thêm -es với các đuôi phổ biến -ch, -sh, -ss, -x, -zz (watches, washes, misses, fixes, buzzes), và đổi phụ âm + y thành -ies chưa? Nhớ go → goes, do → does, have → has.',
    ],
  },
  explanation: 'Với động từ thường, hiện tại đơn khẳng định dùng dạng nguyên mẫu cho I/you/we/they và chủ ngữ số nhiều. Ngôi thứ ba số ít thường thêm -s (reads); các đuôi phổ biến -ch, -sh, -ss, -x, -zz thêm -es (watches, washes, misses, fixes, buzzes). Phụ âm + y đổi thành -ies (studies), nhưng nguyên âm + y chỉ thêm -s (plays). Học riêng have → has, go → goes, do → does; không suy ra mọi động từ tận cùng -o đều thêm -es (ví dụ: radio → radios). Be có các dạng am/is/are đã học ở bài trước.',
  examples: [
    { english: 'I wake up at six o’clock every weekday.', vietnamese: 'Tôi thức dậy lúc sáu giờ vào mỗi ngày trong tuần. (Thói quen hàng ngày của I).' },
    { english: 'Lan drinks a glass of warm water before breakfast.', vietnamese: 'Lan uống một ly nước ấm trước bữa sáng. (Ngôi thứ ba số ít Lan, drink thêm -s).' },
    { english: 'The train departs at eight sharp every morning.', vietnamese: 'Chuyến tàu khởi hành lúc đúng tám giờ mỗi sáng. (Lịch trình cố định).' },
    { english: 'They live in a quiet neighborhood near West Lake.', vietnamese: 'Họ sống trong một khu phố yên tĩnh gần Hồ Tây. (Trạng thái lâu dài).' },
    { english: 'The sun rises in the east.', vietnamese: 'Mặt trời mọc ở hướng đông. (Sự thật khoa học hiển nhiên).' },
    { english: 'My brother washes his bicycle every Sunday.', vietnamese: 'Anh trai tôi rửa xe đạp vào mỗi Chủ nhật. (Động từ wash tận cùng -sh thêm -es).' },
  ],
  contrasts: [
    {
      form: 'They work vs He works',
      whyFits: 'They là chủ ngữ số nhiều nên động từ giữ nguyên mẫu work.',
      whyNot: 'He là ngôi thứ ba số ít nên động từ bắt buộc thêm -s thành works. Bỏ -s là lỗi ngữ pháp phổ biến.',
    },
    {
      form: 'She plays vs She studies',
      whyFits: 'Play có nguyên âm "a" trước "y" nên chỉ thêm -s (plays); study có phụ âm "d" trước "y" nên đổi y thành -ies (studies).',
      whyNot: 'Viết "studys" hoặc "plaies" là sai quy tắc chính tả tiếng Anh.',
    },
  ],
  commonMistakes: [
    'Quên chia -s/-es cho ngôi thứ ba số ít: “He work in a bank” → Cần viết “He works in a bank”.',
    'Thêm nhầm -s vào chủ ngữ số nhiều hoặc ngôi I: “I works hard” → Cần viết “I work hard”.',
    'Nhầm đuôi -y: “He studys every evening” → Cần viết “He studies every evening”.',
  ],
  summary: 'Với động từ thường: I/you/we/they + V; he/she/it + V-s/-es. Phụ âm + y → -ies; nhớ riêng has, goes, does. Không áp dụng quy tắc -o cho mọi động từ.',
  exercises: [
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q1',
      kind: 'choice',
      prompt: 'My sister ___ books every night before going to sleep.',
      options: [
        { text: 'reads', correct: true, rationale: 'Chủ ngữ "My sister" là ngôi thứ ba số ít, nên động từ read thêm -s thành reads.' },
        { text: 'read', correct: false, rationale: 'Trong câu hiện tại đơn này, My sister là ngôi thứ ba số ít nên cần reads; read cũng là cách viết dạng quá khứ ở ngữ cảnh khác.', },
        { text: 'reading', correct: false, rationale: 'Dạng V-ing không đứng một mình làm động từ chính trong thì hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'reads', rationale: 'Reads là dạng chia đúng cho chủ ngữ ngôi thứ ba số ít.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q2',
      kind: 'choice',
      prompt: 'We ___ in an apartment near the city center.',
      options: [
        { text: 'live', correct: true, rationale: 'Chủ ngữ "We" là ngôi thứ nhất số nhiều, động từ giữ nguyên mẫu live.' },
        { text: 'lives', correct: false, rationale: 'Lives chỉ dùng cho ngôi thứ ba số ít he/she/it.' },
        { text: 'living', correct: false, rationale: 'Living cần có trợ động từ to be đi kèm.' },
      ],
      acceptedAnswers: [{ text: 'live', rationale: 'Live là dạng nguyên mẫu đi với chủ ngữ We.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q3',
      kind: 'choice',
      prompt: 'The grocery store ___ at seven in the morning.',
      options: [
        { text: 'opens', correct: true, rationale: 'The grocery store là danh từ số ít, open thêm -s thành opens.' },
        { text: 'open', correct: false, rationale: 'Chủ ngữ số ít cần chia động từ với -s.' },
        { text: 'opening', correct: false, rationale: 'Opening không thể làm vị ngữ đơn lẻ trong câu hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'opens', rationale: 'Opens là dạng số ít cho danh từ the grocery store.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q4',
      kind: 'choice',
      prompt: 'Mr. Long ___ history at the secondary school.',
      options: [
        { text: 'teaches', correct: true, rationale: 'Teach kết thúc bằng -ch nên ngôi thứ ba số ít thêm đuôi -es thành teaches.' },
        { text: 'teachs', correct: false, rationale: 'Quy tắc chính tả yêu cầu thêm -es sau âm -ch.' },
        { text: 'teach', correct: false, rationale: 'Mr. Long là ngôi thứ ba số ít nên không thể để động từ nguyên mẫu.' },
      ],
      acceptedAnswers: [{ text: 'teaches', rationale: 'Teaches thêm -es sau âm -ch theo đúng quy tắc chính tả.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q5',
      kind: 'gap',
      prompt: 'Nam usually ___ (catch) the 7:15 bus to work.',
      options: [],
      acceptedAnswers: [
        { text: 'catches', rationale: 'Catch tận cùng bằng đuôi -ch nên chủ ngữ ngôi ba số ít Nam biến đổi thành catches.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q6',
      kind: 'gap',
      prompt: 'They ___ (walk) in the botanical garden every Sunday morning.',
      options: [],
      acceptedAnswers: [
        { text: 'walk', rationale: 'Chủ ngữ They là số nhiều nên động từ giữ nguyên mẫu walk.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q7',
      kind: 'gap',
      prompt: 'Hanh ___ (study) French three evenings each week.',
      options: [],
      acceptedAnswers: [
        { text: 'studies', rationale: 'Study có phụ âm trước -y nên đổi y thành -ies khi đi với chủ ngữ Hanh.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q8',
      kind: 'gap',
      prompt: 'The Earth ___ (go) around the Sun.',
      options: [],
      acceptedAnswers: [
        { text: 'goes', rationale: 'The Earth là danh từ số ít, động từ go thêm -es thành goes.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang chủ ngữ "He": "I brush my teeth twice a day."',
      options: [],
      acceptedAnswers: [
        { text: 'He brushes his teeth twice a day.', rationale: 'I đổi thành He, my đổi thành his, brush tận cùng -sh thêm -es thành brushes.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang chủ ngữ "They": "She enjoys reading books."',
      options: [],
      acceptedAnswers: [
        { text: 'They enjoy reading books.', rationale: 'She đổi thành They, động từ số ít enjoys chuyển về nguyên mẫu enjoy.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "My brother wash his hands before every meal."',
      options: [],
      acceptedAnswers: [
        { text: 'My brother washes his hands before every meal.', rationale: 'My brother là ngôi thứ ba số ít, wash tận cùng -sh nên phải chia là washes.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "We plays football in the park every Saturday."',
      options: [],
      acceptedAnswers: [
        { text: 'We play football in the park every Saturday.', rationale: 'Chủ ngữ We là ngôi thứ nhất số nhiều nên động từ giữ nguyên mẫu play.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-present-simple-positive-14-r1',
      kind: 'choice',
      prompt: 'An ___ to Da Nang twice a month on business trips.',
      options: [
        { text: 'flies', correct: true, rationale: 'Fly có phụ âm trước -y nên đổi thành -ies khi đi với chủ ngữ số ít An.' },
        { text: 'flys', correct: false, rationale: 'Quy tắc chính tả yêu cầu đổi -y thành -ies sau phụ âm.' },
        { text: 'fly', correct: false, rationale: 'An là ngôi thứ ba số ít nên động từ không thể để nguyên mẫu.' },
      ],
      acceptedAnswers: [{ text: 'flies', rationale: 'Flies là dạng chia đúng của fly với chủ ngữ số ít.' }],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-r2',
      kind: 'gap',
      prompt: 'The mechanic ___ (fix) motorcycles in his family workshop.',
      options: [],
      acceptedAnswers: [
        { text: 'fixes', rationale: 'Fix kết thúc bằng -x nên chủ ngữ số ít the mechanic đi kèm fixes.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang chủ ngữ "She": "We have lunch at noon."',
      options: [],
      acceptedAnswers: [
        { text: 'She has lunch at noon.', rationale: 'Động từ have biến đổi bất quy tắc thành has khi đi với ngôi thứ ba số ít She.' },
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "The baby cry loudly when he feels tired."',
      options: [],
      acceptedAnswers: [
        { text: 'The baby cries loudly when he feels tired.', rationale: 'The baby là danh từ số ít, cry đổi -y thành -ies thành cries.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-present-simple-positive-14-o1',
      prompt: 'Viết 4 câu miêu tả thói quen buổi sáng của chính bạn vào các ngày trong tuần (sử dụng chủ ngữ I và các động từ hành động quen thuộc).',
      modelAnswer: 'I get up at six thirty every morning. I wash my face and brush my teeth. I eat a light breakfast with my family. I leave the house at seven fifteen.',
      checks: [
        'Sử dụng động từ ở dạng nguyên thể phù hợp với chủ ngữ I.',
        'Kể ít nhất 3 hành động cụ thể trong thói quen buổi sáng.',
        'Sử dụng từ chỉ thời gian hoặc tần suất (every morning, at...).',
      ],
    },
    {
      id: 'grammar-v2-a1-present-simple-positive-14-o2',
      prompt: 'Viết 3-4 câu miêu tả thói quen hàng ngày của một người bạn hoặc người thân trong gia đình (sử dụng chủ ngữ he/she và chú ý chia động từ -s/-es).',
      modelAnswer: 'My mother wakes up very early. She prepares breakfast for the whole family. She works at a clinic from eight to five. In the evening, she reads books.',
      checks: [
        'Chia đúng đuôi -s hoặc -es cho tất cả động từ đi với ngôi thứ ba số ít (wakes, prepares, works, reads).',
        'Cấu trúc câu hoàn chỉnh và rõ ràng.',
      ],
    },
  ],
  sources: [
    {
      "id": "present",
      "title": "British Council: Present simple",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-simple",
      "claims": [
        "Present simple expresses regular actions and facts; third person singular changes the verb, and do/does forms questions and negatives."
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
