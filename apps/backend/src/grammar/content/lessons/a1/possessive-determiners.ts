/**
 * @file possessive-determiners.ts
 * @description A1 possessive-determiners lesson definition: my, your, his, her, its, our, their before nouns.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-possessive-determiners-07',
  revisionId: 'grammar-v2-a1-possessive-determiners-07@1.0.0',
  revision: '1.0.0',
  title: 'Tính từ sở hữu: my, your, his, her, its, our, their',
  objective: 'Nhận biết và sử dụng thành thạo các tính từ sở hữu (my, your, his, her, its, our, their) đứng trước danh từ để diễn đạt quyền sở hữu, mối quan hệ và đặc điểm.',
  prerequisiteIds: ['grammar-v2-a1-object-pronouns-06'],
  coverage: ['possessive-determiners', 'determiners', 'possession'],
  context: {
    english: 'My name is Peter. This is my sister, and her hobby is drawing pictures. We love our cat, and its fur is white.',
    vietnamese: 'Tên tôi là Peter. Đây là em gái tôi, và sở thích của cô ấy là vẽ tranh. Chúng tôi yêu chú mèo của mình, và lông của nó màu trắng.',
  },
  guide: {
    pattern: 'Possessive Determiner (my / your / his / her / its / our / their) + Noun',
    whenToUse: [
      'Đứng ngay trước danh từ để chỉ đối tượng đó thuộc quyền sở hữu của ai',
      'Diễn tả mối quan hệ gia đình, bạn bè hoặc đồng nghiệp (my mother, our teacher)',
      'Miêu tả các bộ phận cơ thể hoặc đặc điểm của người và động vật (her eyes, its tail)',
    ],
    signalWords: ['my', 'your', 'his', 'her', 'its', 'our', 'their', 'belonging', 'name', 'family'],
    check: [
      'Tính từ sở hữu luôn đi kèm một danh từ theo sau, không bao giờ đứng một mình',
      'Bảng quy đổi tương ứng: I -> my, you -> your, he -> his, she -> her, it -> its, we -> our, they -> their',
      'Tuyệt đối phân biệt "its" (tính từ sở hữu) và "it\'s" (viết tắt của it is hoặc it has)',
      'Phân biệt "your" (của bạn) và "you\'re" (you are); "their" (của họ) và "they\'re" (they are)',
      'Tính từ sở hữu không thay đổi hình thái theo danh từ số ít hay số nhiều (our car / our cars)',
    ],
  },
  explanation: 'Tính từ sở hữu (possessive determiners hay possessive adjectives) là những từ đứng ngay trước danh từ nhằm làm rõ danh từ đó thuộc về người hoặc vật nào. Trong tiếng Anh, mỗi đại từ nhân xưng có một tính từ sở hữu tương ứng: ngôi thứ nhất số ít "I" chuyển thành "my" (của tôi); ngôi thứ hai "you" thành "your" (của bạn/các bạn); ngôi thứ ba số ít gồm "his" (của anh ấy), "her" (của cô ấy), và "its" (của nó); ngôi thứ nhất số nhiều "we" thành "our" (của chúng tôi/chúng ta); ngôi thứ ba số nhiều "they" thành "their" (của họ/của chúng). Điểm mấu chốt là tính từ sở hữu không bao giờ đứng độc lập; phía sau nó bắt buộc phải có một danh từ (ví dụ: my bag, her brother). Ngoài ra, người học thường nhầm lẫn giữa "its" và "it\'s": "its" là tính từ sở hữu không có dấu phẩy trên (The cat licked its tail), trong khi "it\'s" là dạng rút gọn của "it is" hoặc "it has" (It\'s a lovely morning). Tương tự, "your" đi với danh từ (your passport), còn "you\'re" là viết tắt của "you are".',
  examples: [
  { english: 'I misplaced my apartment key this morning.', vietnamese: 'Sáng nay tôi để quên chìa khóa căn hộ của tôi. (my đứng trước key).' },
  { english: 'Sarah loves her new job at the international school.', vietnamese: 'Sarah rất thích công việc mới của cô ấy tại trường quốc tế. (her đứng trước job).' },
  { english: 'The kitten injured its front leg while playing.', vietnamese: 'Chú mèo con bị thương ở chân trước của nó khi đang chơi đùa. (its không có dấu nháy đơn).' },
  { english: 'Our team completed the quarterly report ahead of schedule.', vietnamese: 'Đội ngũ của chúng tôi đã hoàn thành báo cáo quý trước thời hạn. (our đứng trước team).' },
  { english: 'Could you please confirm your email address?', vietnamese: 'Bạn có thể vui lòng xác nhận địa chỉ email của bạn được không? (your đứng trước email address).' },
  { english: 'The teachers submitted their lesson plans yesterday.', vietnamese: 'Các giáo viên đã nộp giáo án của họ ngày hôm qua. (their đứng trước lesson plans).' },
  ],
  contrasts: [
  {
    form: 'The company changed its logo vs The company changed it\'s logo',
    whyFits: 'Dùng "its" (không có dấu nháy đơn) vì đây là tính từ sở hữu đứng trước danh từ "logo".',
    whyNot: '"it\'s" là dạng viết tắt của "it is" hoặc "it has", không thể dùng làm từ hạn định sở hữu.',
  },
  {
    form: 'Take your umbrella with you vs Take you\'re umbrella with you',
    whyFits: 'Dùng "your" để chỉ quyền sở hữu đối với chiếc ô (danh từ umbrella).',
    whyNot: '"you\'re" là viết tắt của "you are" (bạn là), viết "you\'re umbrella" sẽ biến nghĩa thành "bạn là cái ô".',
  },
  ],
  commonMistakes: [
  'Viết nhầm "it\'s" có dấu nháy đơn thay cho tính từ sở hữu "its": viết "The dog wagged it\'s tail".',
  'Nhầm lẫn giữa "your" và "you\'re": viết "Is this you\'re jacket?" thay vì "your jacket".',
  'Thêm "s" vào tính từ sở hữu khi danh từ phía sau là số nhiều: viết "ours teachers" hoặc "theirs books".',
  ],
  summary: 'Tính từ sở hữu đứng trước danh từ: my, your, his, her, its, our, their. Không đổi dạng theo số nhiều/số ít của danh từ. Nhớ phân biệt its (sở hữu) và it\'s (it is).',
  exercises: [
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q1',
    kind: 'choice',
    prompt: 'Chọn tính từ sở hữu thích hợp để điền vào câu: "Linda called ___ parents immediately after hearing the good news."',
    options: [
      { text: 'her', correct: true, rationale: 'Linda là nữ số ít, tính từ sở hữu tương ứng là "her".' },
      { text: 'she', correct: false, rationale: '"she" là đại từ chủ ngữ, không đứng trước danh từ để chỉ sở hữu.' },
      { text: 'hers', correct: false, rationale: '"hers" là đại từ sở hữu, không đứng trước danh từ.' },
    ],
    acceptedAnswers: [{ text: 'her', rationale: 'her là tính từ sở hữu chỉ ngôi she.' }],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q2',
    kind: 'choice',
    prompt: 'Chọn từ chính xác để hoàn thành câu: "The smartphone has lost ___ network connection."',
    options: [
      { text: 'its', correct: true, rationale: '"its" là tính từ sở hữu đúng nghĩa của đồ vật số ít.' },
      { text: "it's", correct: false, rationale: '"it\'s" là viết tắt của "it is", sai ngữ pháp trước danh từ connection.' },
      { text: "its'", correct: false, rationale: '"its\'" không phải là dạng từ tồn tại trong tiếng Anh chuẩn.' },
    ],
    acceptedAnswers: [{ text: 'its', rationale: 'its là tính từ sở hữu không có dấu nháy đơn.' }],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q3',
    kind: 'choice',
    prompt: 'Chọn tính từ sở hữu thích hợp: "We really enjoy working with ___ new manager."',
    options: [
      { text: 'our', correct: true, rationale: 'Chủ ngữ là "We", tính từ sở hữu tương ứng là "our".' },
      { text: 'us', correct: false, rationale: '"us" là đại từ tân ngữ.' },
      { text: 'ours', correct: false, rationale: '"ours" là đại từ sở hữu đứng độc lập.' },
    ],
    acceptedAnswers: [{ text: 'our', rationale: 'our là tính từ sở hữu tương ứng với we.' }],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q4',
    kind: 'choice',
    prompt: 'Chọn từ đúng điền vào câu: "The students forgot to bring ___ notebooks to class."',
    options: [
      { text: 'their', correct: true, rationale: '"The students" là ngôi thứ ba số nhiều, tính từ sở hữu tương ứng là "their".' },
      { text: "they're", correct: false, rationale: '"they\'re" là viết tắt của "they are".' },
      { text: 'there', correct: false, rationale: '"there" là từ chỉ vị trí hoặc cấu trúc tồn tại.' },
    ],
    acceptedAnswers: [{ text: 'their', rationale: 'their là tính từ sở hữu cho ngôi they.' }],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q5',
    kind: 'gap',
    prompt: 'Điền tính từ sở hữu thích hợp: "I ride a bicycle to school. ___ bicycle is red and white."',
    options: [],
    acceptedAnswers: [
      { text: 'My', rationale: 'Tính từ sở hữu ngôi I đứng đầu câu viết hoa là My.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q6',
    kind: 'gap',
    prompt: 'Điền tính từ sở hữu của ngôi "he": "David is washing ___ hands before having lunch."',
    options: [],
    acceptedAnswers: [
      { text: 'his', rationale: 'David là nam số ít, tính từ sở hữu tương ứng là his.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q7',
    kind: 'gap',
    prompt: 'Điền tính từ sở hữu của con vật số ít: "The puppy is wagging ___ tail happily."',
    options: [],
    acceptedAnswers: [
      { text: 'its', rationale: 'its là tính từ sở hữu chỉ con vật số ít (không dùng dấu nháy đơn).' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q8',
    kind: 'gap',
    prompt: 'Điền tính từ sở hữu thích hợp vào câu hỏi: "Excuse me, what is ___ phone number, please?" (hỏi người đối diện)',
    options: [],
    acceptedAnswers: [
      { text: 'your', rationale: 'Hỏi người đối diện (ngôi you) dùng tính từ sở hữu your.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q9',
    kind: 'transform',
    prompt: 'Viết lại câu sau dùng tính từ sở hữu: "This camera belongs to me." -> "This is ___."',
    options: [],
    acceptedAnswers: [
      { text: 'This is my camera.', rationale: 'Thay belongs to me bằng my camera.' },
      { text: 'my camera', rationale: 'Cụm danh từ my camera thay cho camera belongs to me.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q10',
    kind: 'transform',
    prompt: 'Viết lại câu sau dùng tính từ sở hữu: "The house belongs to Nam and Lan." -> "It is ___."',
    options: [],
    acceptedAnswers: [
      { text: 'It is their house.', rationale: 'Nam and Lan là ngôi they, chuyển thành their house.' },
      { text: 'their house', rationale: 'Cụm danh từ their house.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q11',
    kind: 'correction',
    prompt: 'Sửa lỗi sai chính tả trong câu sau: "The bird returned to it\'s nest before sunset."',
    options: [],
    acceptedAnswers: [
      { text: 'its', rationale: 'Bỏ dấu nháy đơn để chuyển it\'s thành tính từ sở hữu its.' },
      { text: 'The bird returned to its nest before sunset.', rationale: 'Câu hoàn chỉnh sửa it\'s thành its.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-q12',
    kind: 'correction',
    prompt: 'Sửa từ dùng sai trong câu sau: "Please remember to sign you\'re application form."',
    options: [],
    acceptedAnswers: [
      { text: 'your', rationale: 'Thay you\'re (you are) bằng tính từ sở hữu your đứng trước application form.' },
      { text: 'Please remember to sign your application form.', rationale: 'Câu hoàn chỉnh sửa you\'re thành your.' },
    ],
  },
  ],
  reviewExercises: [
  {
    id: 'grammar-v2-a1-possessive-determiners-07-r1',
    kind: 'choice',
    prompt: 'Chọn câu viết đúng quy tắc tính từ sở hữu trong email thông báo nội bộ:',
    options: [
      { text: 'All employees must submit their weekly timesheets by Friday.', correct: true, rationale: 'their đứng trước weekly timesheets hoàn toàn chuẩn ngữ pháp.' },
      { text: "All employees must submit they're weekly timesheets by Friday.", correct: false, rationale: "they're là viết tắt của they are." },
      { text: 'All employees must submit theirs weekly timesheets by Friday.', correct: false, rationale: 'theirs là đại từ sở hữu, không đứng trước danh timesheets.' },
    ],
    acceptedAnswers: [{ text: 'All employees must submit their weekly timesheets by Friday.', rationale: 'their là tính từ sở hữu chính xác.' }],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-r2',
    kind: 'gap',
    prompt: 'Hoàn thành câu: "My sister and I enjoy spending ___ summer vacation in Da Lat."',
    options: [],
    acceptedAnswers: [
      { text: 'our', rationale: 'My sister and I là chủ ngữ we, tính từ sở hữu tương ứng là our.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-r3',
    kind: 'transform',
    prompt: 'Viết lại câu sau dùng tính từ sở hữu: "That car belongs to Mr. Tuan." -> "That is ___."',
    options: [],
    acceptedAnswers: [
      { text: 'That is his car.', rationale: 'Mr. Tuan là nam số ít, chuyển thành his car.' },
      { text: 'his car', rationale: 'Cụm his car.' },
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-r4',
    kind: 'correction',
    prompt: 'Sửa lỗi sai trong câu: "The laptop stopped working because it\'s battery was completely empty."',
    options: [],
    acceptedAnswers: [
      { text: 'its', rationale: 'Đổi it\'s thành its trước danh từ battery.' },
      { text: 'The laptop stopped working because its battery was completely empty.', rationale: 'Câu hoàn chỉnh sửa it\'s thành its.' },
    ],
  },
  ],
  outputPrompts: [
  {
    id: 'grammar-v2-a1-possessive-determiners-07-o1',
    prompt: 'Viết 3 câu giới thiệu bản thân và các thành viên trong gia đình bạn, sử dụng ít nhất 3 tính từ sở hữu khác nhau (ví dụ: my, his, her, our).',
    modelAnswer: 'My name is Minh, and I live in Hanoi. My father loves gardening, and his favorite plant is an orchid. Our family often has dinner together every evening.',
    checks: [
      'Sử dụng ít nhất 3 tính từ sở hữu khác nhau (my, his, her, our)',
      'Tất cả tính từ sở hữu đều đứng trước danh từ phù hợp',
      'Đúng chính tả, đặc biệt không nhầm lẫn dấu nháy đơn',
    ],
  },
  {
    id: 'grammar-v2-a1-possessive-determiners-07-o2',
    prompt: 'Viết 3 câu miêu tả nơi làm việc hoặc lớp học của bạn và các bạn cùng lớp, sử dụng tính từ sở hữu "our" và "their".',
    modelAnswer: 'Our classroom is equipped with a modern projector and air conditioning. All students keep their desks clean and organized. Our teacher always checks the assignments carefully.',
    checks: [
      'Sử dụng đúng tính từ sở hữu our trước danh từ',
      'Sử dụng đúng tính từ sở hữu their trước danh từ số nhiều',
      'Câu văn tự nhiên, đúng ngữ cảnh học tập/công việc',
    ],
  },
  ],
  sources: [
    {
      "id": "possAdj",
      "title": "British Council: Possessives: adjectives",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/possessives-adjectives",
      "claims": [
        "Possessive determiners occur with nouns, and possessive its has no apostrophe."
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
