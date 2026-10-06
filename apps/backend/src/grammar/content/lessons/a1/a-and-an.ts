/**
 * @file a-and-an.ts
 * @description A1 a-and-an lesson definition: indefinite articles based on vowel and consonant sounds.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-a-and-an-11',
  revisionId: 'grammar-v2-a1-a-and-an-11@1.0.0',
  revision: '1.0.0',
  title: 'Mạo từ bất định: a và an',
  objective: 'Phân biệt và sử dụng chính xác mạo từ "a" và "an" trước danh từ đếm được số ít dựa trên âm thanh phát âm (vowel sound / consonant sound) và áp dụng đúng khi nói về nghề nghiệp.',
  prerequisiteIds: ['grammar-v2-a1-irregular-plurals-10'],
  coverage: ['a-and-an', 'articles', 'determiners'],
  context: {
    english: 'Peter buys an apple and a sandwich for lunch. He also carries an umbrella because there is a dark cloud in the sky.',
    vietnamese: 'Peter mua một quả táo và một chiếc bánh mì kẹp cho bữa trưa. Cậu ấy cũng mang theo một chiếc ô vì có một đám mây đen trên bầu trời.',
  },
  guide: {
    pattern: 'a + Consonant Sound (phụ âm: /b/, /d/, /k/, /s/, /j/...) | an + Vowel Sound (nguyên âm: /æ/, /e/, /ɪ/, /ɒ/, /ʌ/...)',
    whenToUse: [
      'Đứng trước danh từ đếm được số ít khi đối tượng được nhắc đến lần đầu hoặc chưa xác định',
      'Dùng trước danh từ chỉ nghề nghiệp khi giới thiệu chức danh hoặc công việc của ai đó (She is a teacher, He is an engineer)',
      'Dùng trong các cụm đo lường hoặc tần suất quen thuộc (once a week, sixty miles an hour)',
    ],
    signalWords: ['a', 'an', 'singular', 'job', 'sound', 'profession'],
    check: [
      'Lựa chọn a hay an phụ thuộc vào ÂM ĐẦU TIÊN KHI PHÁT ÂM, không phụ thuộc vào chữ cái viết',
      'Dùng "a" trước phụ âm: a book, a cat, a desk, a doctor',
      'Dùng "an" trước nguyên âm: an apple, an egg, an orange, an umbrella',
      'Các từ đặc biệt với chữ "u": phát âm là /juː/ (phụ âm) thì dùng "a": a university, a uniform, a useful book',
      'Các từ đặc biệt với chữ "h" câm: phát âm bắt đầu bằng nguyên âm thì dùng "an": an hour, an honest person',
      'Không dùng a/an trước danh từ số nhiều; không dùng trước danh từ không đếm được khi giữ nghĩa chung (như water). Một số danh từ có thể mang nghĩa đếm được trong ngữ cảnh cụ thể (a coffee = a cup of coffee).',
    ],
  },
  explanation: 'Mạo từ bất định "a" và "an" đứng trước danh từ đếm được số ít để chỉ một đối tượng chung chung hoặc một người/vật lần đầu tiên được đề cập trong cuộc trò chuyện. Điểm mấu chốt nhất mà người học cần nắm vững là: Việc dùng "a" hay "an" hoàn toàn dựa trên ÂM THANH PHÁT ÂM (sound), chứ không dựa trên chữ cái viết (spelling).\n1. Dùng "a" trước từ bắt đầu bằng một PHỤ ÂM (consonant sound):\n- a pen, a cup, a doctor, a yellow hat.\n- Lưu ý các trường hợp bắt đầu bằng chữ cái "u" hoặc "eu" nhưng phát âm là phụ âm /juː/: a university (một trường đại học), a uniform (một bộ đồng phục), a European country (một quốc gia châu Âu). Vì âm /j/ là bán nguyên âm đóng vai trò phụ âm, ta bắt buộc phải dùng "a".\n2. Dùng "an" trước từ bắt đầu bằng một NGUYÊN ÂM (vowel sound: /æ/, /e/, /ɪ/, /ɒ/, /ʌ/...):\n- an apple, an elephant, an insect, an orange, an umbrella.\n- Lưu ý các trường hợp chữ cái "h" bị câm (silent h): an hour (một giờ đồng hồ - phát âm /aʊər/), an honest person (người trung thực - phát âm /ˈɒnɪst/). Vì âm đầu tiên là nguyên âm, ta bắt buộc phải dùng "an".\n3. Sử dụng khi nói về nghề nghiệp:\n- Trong tiếng Anh, khi nói về nghề nghiệp của một người, bắt buộc phải có "a" hoặc "an" trước danh từ (ví dụ: My sister is a nurse; He is an architect). Không nói trơ trọi "My sister is nurse".\n4. Không dùng "a" hoặc "an" trước danh từ số nhiều (ví dụ: cats, apples) hoặc danh từ không đếm được (ví dụ: milk, rice, money).',
  examples: [
    { english: 'I eat an apple and a banana for breakfast every morning.', vietnamese: 'Tôi ăn một quả táo và một quả chuối cho bữa sáng mỗi ngày. (an trước apple, a trước banana).' },
    { english: 'My older sister is an engineer at a software firm.', vietnamese: 'Chị gái tôi là một kỹ sư tại một công ty phần mềm. (an engineer: nghề nghiệp bắt đầu bằng nguyên âm).' },
    { english: 'We waited for an hour at the bus stop.', vietnamese: 'Chúng tôi đã đợi một tiếng đồng hồ ở trạm xe buýt. (an hour: h câm, bắt đầu bằng nguyên âm /aʊər/).' },
    { english: 'David studies economics at a university in Hanoi.', vietnamese: 'David học kinh tế tại một trường đại học ở Hà Nội. (a university: phát âm bắt đầu bằng phụ âm /juː/).' },
    { english: 'She is an honest student who always tells the truth.', vietnamese: 'Cô ấy là một học sinh trung thực luôn nói sự thật. (an honest: h câm).' },
    { english: 'Remember to bring an umbrella and a warm jacket.', vietnamese: 'Hãy nhớ mang theo một chiếc ô và một chiếc áo khoác ấm. (an umbrella, a warm jacket).' },
  ],
  contrasts: [
    {
      form: 'an hour vs a house',
      whyFits: 'hour có chữ "h" câm nên âm đầu tiên là nguyên âm /aʊ/, dùng "an"; house phát âm rõ phụ âm /h/ nên dùng "a".',
      whyNot: 'Viết "a hour" là sai quy tắc ngữ âm của mạo từ tiếng Anh.',
    },
    {
      form: 'a university vs an umbrella',
      whyFits: 'university phát âm bắt đầu bằng phụ âm /j/ nên dùng "a"; umbrella phát âm bắt đầu bằng nguyên âm /ʌ/ nên dùng "an".',
      whyNot: 'Viết "an university" là nhầm lẫn tai hại giữa chữ cái viết và âm thanh thực tế.',
    },
  ],
  commonMistakes: [
    'Chọn mạo từ theo mặt chữ cái thay vì phát âm: viết "a hour" (sai vì h câm) hoặc "an university" (sai vì âm /j/).',
    'Dùng "a" hoặc "an" trước danh từ số nhiều: nói "I bought a shoes" thay vì "a pair of shoes" hoặc "shoes".',
    'Bỏ quên mạo từ khi nói về nghề nghiệp: nói "My father is doctor" thay vì "My father is a doctor".',
  ],
  summary: 'Dùng a/an trước danh từ đếm được số ít theo âm đầu của từ theo sau: a trước phụ âm, an trước nguyên âm. Ghi nhớ a university và an hour.',
  exercises: [
    {
      id: 'grammar-v2-a1-a-and-an-11-q1',
      kind: 'choice',
      prompt: 'Chọn mạo từ thích hợp điền vào câu: "Lan has ___ interview at 9 AM tomorrow."',
      options: [
        { text: 'an', correct: true, rationale: 'interview phát âm bắt đầu bằng nguyên âm /ɪ/ nên dùng "an".' },
        { text: 'a', correct: false, rationale: '"a" chỉ đi trước từ bắt đầu bằng phụ âm.' },
        { text: 'the', correct: false, rationale: 'Đây là cuộc phỏng vấn chưa xác định nhắc đến lần đầu.' },
      ],
      acceptedAnswers: [{ text: 'an', rationale: 'an đi trước nguyên âm interview.' }],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q2',
      kind: 'choice',
      prompt: 'Chọn mạo từ thích hợp điền vào câu: "We waited for ___ hour outside the train station."',
      options: [
        { text: 'an', correct: true, rationale: 'hour có chữ h câm, âm đầu là nguyên âm /aʊ/ nên dùng "an".' },
        { text: 'a', correct: false, rationale: 'Sai vì nhầm chữ cái h là phụ âm phát âm.' },
        { text: 'one', correct: false, rationale: 'Không tự nhiên bằng mạo từ an hour trong ngữ cảnh này.' },
      ],
      acceptedAnswers: [{ text: 'an', rationale: 'an đi trước hour có h câm.' }],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q3',
      kind: 'choice',
      prompt: 'Chọn mạo từ thích hợp điền vào câu: "Nam is a student at ___ university in Da Nang."',
      options: [
        { text: 'a', correct: true, rationale: 'university phát âm bắt đầu bằng phụ âm /j/ nên dùng "a".' },
        { text: 'an', correct: false, rationale: 'Sai vì nhìn vào chữ cái u thay vì âm phát âm /j/.' },
        { text: 'the', correct: false, rationale: 'Một trường đại học chung chung chưa xác định danh tính cụ thể.' },
      ],
      acceptedAnswers: [{ text: 'a', rationale: 'a đi trước university có phụ âm /j/.' }],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q4',
      kind: 'choice',
      prompt: 'Chọn câu giới thiệu nghề nghiệp đúng ngữ pháp:',
      options: [
        { text: 'My brother is an architect in Hanoi.', correct: true, rationale: 'architect bắt đầu bằng nguyên âm /ɑː/, cần mạo từ "an".' },
        { text: 'My brother is a architect in Hanoi.', correct: false, rationale: 'Dùng sai "a" trước nguyên âm.' },
        { text: 'My brother is architect in Hanoi.', correct: false, rationale: 'Thiếu mạo từ trước danh từ chỉ nghề nghiệp.' },
      ],
      acceptedAnswers: [{ text: 'My brother is an architect in Hanoi.', rationale: 'Câu dùng an architect chuẩn xác.' }],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q5',
      kind: 'gap',
      prompt: 'Điền "a" hoặc "an" thích hợp: "Please take ___ umbrella with you; it looks like rain."',
      options: [],
      acceptedAnswers: [
        { text: 'an', rationale: 'umbrella bắt đầu bằng nguyên âm /ʌ/ nên dùng an.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q6',
      kind: 'gap',
      prompt: 'Điền "a" hoặc "an" thích hợp: "Students must wear ___ uniform on Monday mornings."',
      options: [],
      acceptedAnswers: [
        { text: 'a', rationale: 'uniform bắt đầu bằng phụ âm /j/ nên dùng a.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q7',
      kind: 'gap',
      prompt: 'Điền "a" hoặc "an" thích hợp: "He is ___ honest man who everyone respects."',
      options: [],
      acceptedAnswers: [
        { text: 'an', rationale: 'honest có chữ h câm nên bắt đầu bằng nguyên âm, dùng an.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q8',
      kind: 'gap',
      prompt: 'Điền "a" hoặc "an" thích hợp: "I need ___ piece of paper to write a note."',
      options: [],
      acceptedAnswers: [
        { text: 'a', rationale: 'piece bắt đầu bằng phụ âm /p/ nên dùng a.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q9',
      kind: 'transform',
      prompt: 'Thêm mạo từ thích hợp vào trước danh từ: "He wants to buy (orange)." -> "He wants to buy ___."',
      options: [],
      acceptedAnswers: [
        { text: 'an orange', rationale: 'orange bắt đầu bằng nguyên âm nên thêm an.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q10',
      kind: 'transform',
      prompt: 'Hoàn thiện câu giới thiệu nghề nghiệp với mạo từ thích hợp: "Linda works as doctor." -> "Linda is ___."',
      options: [],
      acceptedAnswers: [
        { text: 'a doctor', rationale: 'doctor bắt đầu bằng phụ âm nên dùng a doctor.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai mạo từ trong câu sau: "We waited for a hour outside the clinic."',
      options: [],
      acceptedAnswers: [
        { text: 'an hour', rationale: 'hour có h câm nên phải dùng an hour.' },
        { text: 'We waited for an hour outside the clinic.', rationale: 'Câu hoàn chỉnh sửa a hour thành an hour.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai mạo từ trong câu sau: "She wants to study at an university in Da Nang."',
      options: [],
      acceptedAnswers: [
        { text: 'a university', rationale: 'university bắt đầu bằng phụ âm /j/ nên phải dùng a university.' },
        { text: 'She wants to study at a university in Da Nang.', rationale: 'Câu hoàn chỉnh sửa an university thành a university.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-a-and-an-11-r1',
      kind: 'choice',
      prompt: 'Chọn mạo từ thích hợp: "This dictionary is ___ useful tool for English learners."',
      options: [
        { text: 'a', correct: true, rationale: 'useful phát âm bắt đầu bằng phụ âm /j/ nên dùng "a".' },
        { text: 'an', correct: false, rationale: 'Sai vì chỉ nhìn vào chữ cái u.' },
        { text: 'one', correct: false, rationale: 'Không tự nhiên trong cụm danh từ mô tả tính chất.' },
      ],
      acceptedAnswers: [{ text: 'a', rationale: 'a đi trước useful có âm /j/.' }],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu: "She had ___ egg and a slice of bread for breakfast."',
      options: [],
      acceptedAnswers: [
        { text: 'an', rationale: 'egg bắt đầu bằng nguyên âm /e/ nên dùng an.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-r3',
      kind: 'transform',
      prompt: 'Thêm mạo từ thích hợp vào câu: "My brother drives old car." -> "My brother drives ___."',
      options: [],
      acceptedAnswers: [
        { text: 'an old car', rationale: 'old bắt đầu bằng nguyên âm nên dùng an old car.' },
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu mạo từ trong câu: "My father is teacher at a local school."',
      options: [],
      acceptedAnswers: [
        { text: 'a teacher', rationale: 'Nghề nghiệp bắt đầu bằng phụ âm cần mạo từ a teacher.' },
        { text: 'My father is a teacher at a local school.', rationale: 'Câu hoàn chỉnh thêm a trước teacher.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-a-and-an-11-o1',
      prompt: 'Viết 3 câu giới thiệu bản thân, nghề nghiệp của bạn hoặc người thân và một đồ vật bạn thường mang theo, sử dụng đúng cả mạo từ "a" và "an" (ví dụ: a teacher, an engineer, a notebook, an umbrella).',
      modelAnswer: 'My mother is a teacher at a primary school in Hue. My uncle works as an engineer for a construction company. Every day, I always carry an umbrella and a notebook in my bag.',
      checks: [
        'Sử dụng đúng cả "a" và "an" trước danh từ đếm được số ít',
        'Có câu giới thiệu nghề nghiệp dùng a/an',
        'Áp dụng đúng quy tắc âm thanh nguyên âm/phụ âm',
      ],
    },
    {
      id: 'grammar-v2-a1-a-and-an-11-o2',
      prompt: 'Viết 3 câu kể về một bữa sáng hoặc bữa ăn nhẹ của bạn, sử dụng mạo từ "a" và "an" trước các món ăn hoặc thức uống (ví dụ: an apple, an egg, a banana, a sandwich).',
      modelAnswer: 'For breakfast today, I enjoyed an egg and two warm toasts. I also ate a sweet banana before leaving the house. Finally, I drank a cup of green tea to start my morning.',
      checks: [
        'Sử dụng đúng mạo từ an trước từ có nguyên âm (an egg)',
        'Sử dụng đúng mạo từ a trước từ có phụ âm (a banana, a cup)',
        'Câu văn tự nhiên, đúng ngữ cảnh sinh hoạt thường ngày',
      ],
    },
  ],
  sources: [
    {
      "id": "articles",
      "title": "British Council: Articles: a, an, the",
      "url": "https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/articles-a-an-the",
      "claims": [
        "A/an depends on the following sound; singular count nouns need a determiner, and the identifies a known referent."
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
