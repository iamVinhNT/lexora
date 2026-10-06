/**
 * @file be-positive.ts
 * @description Lesson: Động từ to be thể khẳng định (be-positive).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-0-be-positive-05',
  revisionId: 'grammar-v2-0-be-positive-05@1.0.0',
  revision: '1.0.0',
  title: 'Động từ to be thể khẳng định',
  objective: 'Nắm vững cách dùng các dạng am, is, are của động từ to be ở hiện tại khẳng định với các đại từ nhân xưng và danh từ số ít, số nhiều.',
  prerequisiteIds: ['grammar-v2-0-subject-verb-order-04'],
  coverage: ['be-positive', 'to-be', 'am-is-are', 'subject-verb-agreement', 'affirmative'],
  context: {
    english: 'I am a student. My teacher is kind. We are happy in English class.',
    vietnamese: 'Tôi là một học sinh. Giáo viên của tôi rất tốt bụng. Chúng tôi vui vẻ trong lớp học tiếng Anh.',
  },
  guide: {
    pattern: 'I + am (\'m) | He / She / It / Danh từ số ít + is (\'s) | You / We / They / Danh từ số nhiều + are (\'re)',
    whenToUse: [
      'Giới thiệu tên tuổi, nghề nghiệp hoặc danh tính (I am Nam, She is a doctor).',
      'Miêu tả đặc điểm, tính chất, cảm xúc (The room is clean, They are tired).',
      'Nói về vị trí hoặc nơi chốn hiện tại (We are at school, The cat is on the sofa).',
    ],
    signalWords: [
      'I -> am (viết tắt: I\'m)',
      'He, She, It, singular noun -> is (viết tắt: He\'s, She\'s, It\'s)',
      'You, We, They, plural noun -> are (viết tắt: You\'re, We\'re, They\'re)',
    ],
    check: [
      'Chủ ngữ là ai hoặc mấy đối tượng để chọn đúng giữa am, is hay are?',
      'Khi dùng dạng viết tắt, đã đặt đúng dấu nháy đơn (\') chưa (I\'m, he\'s, they\'re)?',
    ],
  },
  explanation: 'Động từ "to be" (thì, là, ở) là một trong những động từ quan trọng nhất trong tiếng Anh. Ở thì hiện tại đơn thể khẳng định, "to be" có ba dạng chia theo chủ ngữ:\n1. am: Chỉ đi duy nhất với chủ ngữ "I" (I am -> dạng viết tắt là I\'m).\n2. is: Đi với chủ ngữ ngôi thứ ba số ít gồm "he", "she", "it" hoặc bất kỳ danh từ số ít, danh từ không đếm được nào (He is -> He\'s, She is -> She\'s, It is -> It\'s, The car is).\n3. are: Đi với chủ ngữ số nhiều hoặc ngôi thứ hai gồm "you", "we", "they" hoặc danh từ số nhiều (You are -> You\'re, We are -> We\'re, They are -> They\'re, The cats are).\nTheo sau to be thường là một danh từ (a doctor), một tính từ (happy), hoặc một cụm giới từ chỉ nơi chốn (at home).',
  examples: [
    { english: 'I am twenty years old.', vietnamese: 'Tôi hai mươi tuổi. ("I" luôn đi với "am".)' },
    { english: 'He is a friendly doctor.', vietnamese: 'Anh ấy là một bác sĩ thân thiện. ("He" đi với "is".)' },
    { english: 'The blue book is on the table.', vietnamese: 'Cuốn sách màu xanh ở trên bàn. ("The blue book" là danh từ số ít nên dùng "is".)' },
    { english: 'We are ready for the test.', vietnamese: 'Chúng tôi đã sẵn sàng cho bài kiểm tra. ("We" đi với "are".)' },
    { english: 'They are best friends.', vietnamese: 'Họ là những người bạn thân nhất. ("They" đi với "are".)' },
    { english: 'You are very kind.', vietnamese: 'Bạn rất tốt bụng. ("You" luôn đi với "are" dù chỉ một hay nhiều người.)' },
  ],
  contrasts: [
    {
      form: 'She is at home.',
      whyFits: 'Chủ ngữ ngôi thứ ba số ít She đi kèm động từ to be is.',
      whyNot: 'Viết "She are at home" sai quy tắc hòa hợp vì are chỉ dùng cho chủ ngữ số nhiều hoặc you.',
    },
    {
      form: 'The children are happy.',
      whyFits: 'The children là danh từ số nhiều (những đứa trẻ) nên phải đi với to be are.',
      whyNot: 'Viết "The children is happy" nhầm lẫn danh từ số nhiều thành số ít.',
    },
  ],
  commonMistakes: [
    'Dùng "is" cho tất cả các chủ ngữ mà không phân biệt số ít và số nhiều (ví dụ viết "They is students").',
    'Bỏ quên to be khi câu có vị ngữ là tính từ (ví dụ viết "I hungry" thay vì "I am hungry").',
    'Nhầm lẫn giữa "you" số ít và "you" số nhiều (cả hai trường hợp "you" đều bắt buộc đi với "are", không bao giờ dùng "you is").',
  ],
  summary: 'I đi với am; He/She/It và danh từ số ít đi với is; You/We/They và danh từ số nhiều đi với are. Danh từ không đếm được thường đi với is.',
  exercises: [
    {
      id: 'grammar-v2-0-be-positive-05-q1',
      kind: 'choice',
      prompt: 'Chọn dạng động từ to be phù hợp cho câu: "I ___ a new student here."',
      options: [
        { text: 'am', correct: true, rationale: 'Chủ ngữ I luôn đi với động từ to be am.' },
        { text: 'is', correct: false, rationale: 'is chỉ dùng cho ngôi thứ ba số ít (he, she, it).' },
        { text: 'are', correct: false, rationale: 'are dùng cho you, we, they và danh từ số nhiều.' },
      ],
      acceptedAnswers: [{ text: 'am', rationale: 'I đi với am.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q2',
      kind: 'choice',
      prompt: 'Chọn từ đúng để điền vào chỗ trống: "My sister ___ very smart."',
      options: [
        { text: 'is', correct: true, rationale: 'My sister là danh từ số ít (tương đương she) nên đi với is.' },
        { text: 'are', correct: false, rationale: 'are chỉ dùng cho danh từ số nhiều.' },
        { text: 'am', correct: false, rationale: 'am chỉ dùng riêng cho đại từ I.' },
      ],
      acceptedAnswers: [{ text: 'is', rationale: 'Chủ ngữ số ít đi với is.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q3',
      kind: 'choice',
      prompt: 'Điền dạng đúng của to be: "We ___ ready for dinner."',
      options: [
        { text: 'are', correct: true, rationale: 'We là đại từ ngôi thứ nhất số nhiều nên đi với are.' },
        { text: 'is', correct: false, rationale: 'is chỉ dùng cho chủ ngữ số ít.' },
        { text: 'am', correct: false, rationale: 'am chỉ đi với I.' },
      ],
      acceptedAnswers: [{ text: 'are', rationale: 'We đi với are.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q4',
      kind: 'choice',
      prompt: 'Chọn câu dùng đúng to be cho danh từ số nhiều:',
      options: [
        { text: 'The dogs are in the garden.', correct: true, rationale: 'The dogs là danh từ số nhiều đi với are.' },
        { text: 'The dogs is in the garden.', correct: false, rationale: 'The dogs là số nhiều, không thể dùng is.' },
        { text: 'The dogs am in the garden.', correct: false, rationale: 'am chỉ đi với I.' },
      ],
      acceptedAnswers: [{ text: 'The dogs are in the garden.', rationale: 'The dogs are in the garden là câu chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q5',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào chỗ trống: "I ___ happy today."',
      options: [],
      acceptedAnswers: [{ text: 'am', rationale: 'Chủ ngữ I đi với am.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q6',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào chỗ trống: "The weather ___ nice."',
      options: [],
      acceptedAnswers: [{ text: 'is', rationale: 'The weather là danh từ không đếm được số ít nên đi với is.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q7',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào chỗ trống: "You ___ a great friend."',
      options: [],
      acceptedAnswers: [{ text: 'are', rationale: 'Chủ ngữ You luôn đi với are.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q8',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào chỗ trống: "Lan and Mai ___ classmates."',
      options: [],
      acceptedAnswers: [{ text: 'are', rationale: 'Lan and Mai là chủ ngữ gồm hai người (số nhiều) nên đi với are.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang dạng viết tắt của to be: "I am ready."',
      options: [],
      acceptedAnswers: [
        { text: "I'm ready.", rationale: "I am viết tắt thành I'm." },
      ],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang dạng viết tắt của to be: "He is a doctor."',
      options: [],
      acceptedAnswers: [
        { text: "He's a doctor.", rationale: "He is viết tắt thành He's." },
      ],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai to be trong câu sau: "They is very friendly."',
      options: [],
      acceptedAnswers: [
        { text: 'They are very friendly.', rationale: 'Chủ ngữ They phải đi với động từ to be are.' },
      ],
    },
    {
      id: 'grammar-v2-0-be-positive-05-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai to be trong câu sau: "She am my English teacher."',
      options: [],
      acceptedAnswers: [
        { text: 'She is my English teacher.', rationale: 'Chủ ngữ She là ngôi thứ ba số ít nên phải đi với is.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-0-be-positive-05-r1',
      kind: 'choice',
      prompt: 'Chọn phương án đúng để hoàn thành câu: "These apples ___ sweet."',
      options: [
        { text: 'are', correct: true, rationale: 'These apples là danh từ số nhiều nên dùng are.' },
        { text: 'is', correct: false, rationale: 'is chỉ dùng cho danh từ số ít.' },
        { text: 'am', correct: false, rationale: 'am chỉ dùng cho I.' },
      ],
      acceptedAnswers: [{ text: 'are', rationale: 'These apples are sweet.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-r2',
      kind: 'gap',
      prompt: 'Điền dạng to be thích hợp vào chỗ trống: "Peter ___ at home now."',
      options: [],
      acceptedAnswers: [{ text: 'is', rationale: 'Peter là tên riêng một người (số ít) nên đi với is.' }],
    },
    {
      id: 'grammar-v2-0-be-positive-05-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang dạng viết tắt: "They are happy."',
      options: [],
      acceptedAnswers: [
        { text: "They're happy.", rationale: "They are viết tắt thành They're." },
      ],
    },
    {
      id: 'grammar-v2-0-be-positive-05-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai to be trong câu sau: "You is my classmate."',
      options: [],
      acceptedAnswers: [
        { text: 'You are my classmate.', rationale: 'You bắt buộc phải đi với are.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-0-be-positive-05-o1',
      prompt: 'Viết 1 câu tiếng Anh giới thiệu tên hoặc nghề nghiệp của bản thân bằng cấu trúc "I am..." (ví dụ: I am Lan / I am a student).',
      modelAnswer: 'I am a student.',
      checks: [
        'Bắt đầu bằng chủ ngữ I',
        'Dùng đúng động từ to be am (hoặc viết tắt I\'m)',
        'Có danh từ chỉ tên hoặc nghề nghiệp đi kèm',
      ],
    },
    {
      id: 'grammar-v2-0-be-positive-05-o2',
      prompt: 'Viết 1 câu tiếng Anh miêu tả đặc điểm của một người thân hoặc bạn bè bằng cấu trúc "He is..." hoặc "She is..." kết hợp với một tính từ (ví dụ: She is kind / He is tall).',
      modelAnswer: 'She is kind.',
      checks: [
        'Dùng chủ ngữ He hoặc She',
        'Đi cùng động từ to be is',
        'Vị ngữ kết thúc bằng một tính từ miêu tả tính cách hoặc ngoại hình',
      ],
    },
  ],
  sources: [
    {
      "id": "be",
      "title": "British Council: Present simple: to be",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be",
      "claims": [
        "Present be uses am/is/are, negatives with not, inversion in questions and uncontracted affirmative short answers."
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
