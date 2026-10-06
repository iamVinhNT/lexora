/**
 * @file irregular-plurals.ts
 * @description A1 irregular-plurals lesson definition: people, children, men, women, feet, teeth, mice, sheep.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-irregular-plurals-10',
  revisionId: 'grammar-v2-a1-irregular-plurals-10@1.0.0',
  revision: '1.0.0',
  title: 'Danh từ số nhiều bất quy tắc: people, children, men, women, feet, teeth',
  objective: 'Ghi nhớ và sử dụng chính xác các danh từ số nhiều bất quy tắc phổ biến nhất trong tiếng Anh, không thêm đuôi -s/-es và chia đúng động từ số nhiều đi kèm.',
  prerequisiteIds: ['grammar-v2-a1-singular-and-plural-09'],
  coverage: ['irregular-plurals', 'nouns', 'morphology'],
  context: {
    english: 'There are many people in the park today. Several children are playing with balloons, and two men are reading books under a tree.',
    vietnamese: 'Có rất nhiều người trong công viên hôm nay. Một vài đứa trẻ đang chơi với bóng bay, và hai người đàn ông đang đọc sách dưới gốc cây.',
  },
  guide: {
    pattern: 'person -> people | child -> children | man -> men | woman -> women | foot -> feet | tooth -> teeth | mouse -> mice | sheep -> sheep | fish -> fish',
    whenToUse: [
      'Chỉ nhóm đối tượng số nhiều của các danh từ không tuân theo quy tắc thêm -s hoặc -es',
      'Miêu tả con người và thành viên trong gia đình: people, children, men, women',
      'Nói về các bộ phận cơ thể: feet (bàn chân), teeth (răng)',
      'Nói về một số loài động vật đặc biệt: mice (chuột), sheep (cừu), fish (cá)',
    ],
    signalWords: ['people', 'children', 'men', 'women', 'feet', 'teeth', 'mice', 'sheep', 'fish'],
    check: [
      'TUYỆT ĐỐI KHÔNG thêm -s vào các từ đã ở dạng số nhiều (KHÔNG viết: childrens, peoples, mens)',
      'person (1 người) -> people (từ 2 người trở lên); "people" luôn đi với động từ số nhiều (People are)',
      'child (1 đứa trẻ) -> children (những đứa trẻ)',
      'man /mæn/ -> men /men/; woman /ˈwʊmən/ -> women /ˈwɪmɪn/',
      'foot -> feet (hai bàn chân); tooth -> teeth (hàm răng)',
      'sheep và fish giữ nguyên hình thái ở cả số ít lẫn số nhiều (one sheep -> ten sheep)',
    ],
  },
  explanation: 'Danh từ số nhiều bất quy tắc (irregular plural nouns) là những danh từ khi chuyển sang số nhiều không thêm đuôi "-s" hay "-es". Do biến đổi theo lịch sử phát triển của ngôn ngữ, người học cần ghi nhớ từng trường hợp cụ thể:\n1. Nhóm từ chỉ người (rất phổ biến):\n- person (người số ít) -> people (những người / mọi người)\n- child (đứa trẻ) -> children (những đứa trẻ)\n- man (người đàn ông) -> men (những người đàn ông)\n- woman (người phụ nữ) -> women (những người phụ nữ)\n2. Nhóm biến đổi nguyên âm đôi (oo -> ee):\n- foot (bàn chân) -> feet (những bàn chân)\n- tooth (chiếc răng) -> teeth (những chiếc răng)\n- goose (con ngỗng) -> geese (những con ngỗng)\n3. Nhóm biến đổi hoàn toàn:\n- mouse (con chuột) -> mice (những con chuột)\n4. Nhóm giữ nguyên dạng viết cho cả số ít và số nhiều:\n- sheep (con cừu) -> sheep (những con cừu)\n- fish (con cá) -> fish (những con cá)\nLưu ý ngữ pháp tối quan trọng: Vì các từ này đã mang nghĩa số nhiều, tuyệt đối không thêm đuôi "-s" vào sau chúng (lỗi viết "peoples" hay "childrens" rất phổ biến ở người mới học). Động từ đi kèm luôn phải chia ở dạng số nhiều, ví dụ: "The children are happy", "People were listening carefully".',
  examples: [
    { english: 'The children are playing happily in the garden.', vietnamese: 'Những đứa trẻ đang chơi đùa vui vẻ trong vườn. (children là số nhiều của child).' },
    { english: 'Many people visit this beach during the summer.', vietnamese: 'Nhiều người đến thăm bãi biển này vào mùa hè. (people là số nhiều của person).' },
    { english: 'Two men and three women work in this library.', vietnamese: 'Hai người đàn ông và ba người phụ nữ làm việc trong thư viện này. (men và women là dạng số nhiều).' },
    { english: 'Remember to brush your teeth every morning and night.', vietnamese: 'Hãy nhớ đánh răng mỗi sáng và tối. (teeth là số nhiều của tooth).' },
    { english: 'My feet are tired after walking all day.', vietnamese: 'Đôi chân tôi mỏi nhừ sau khi đi bộ cả ngày. (feet là số nhiều của foot, đi với are).' },
    { english: 'The farmer has twenty sheep on his green hill.', vietnamese: 'Người nông dân có hai mươi con cừu trên ngọn đồi xanh. (sheep giữ nguyên dạng số nhiều).' },
  ],
  contrasts: [
    {
      form: 'The children are playing vs The childrens are playing',
      whyFits: 'children vốn dĩ đã là dạng số nhiều của child, không thêm -s.',
      whyNot: 'childrens là lỗi sai nghiêm trọng vì thêm s thừa vào danh từ bất quy tắc.',
    },
    {
      form: 'People in Vietnam are friendly vs People in Vietnam is friendly',
      whyFits: 'People là danh từ số nhiều chỉ người nên động từ to be bắt buộc là "are".',
      whyNot: 'Không chia động từ số ít "is" với people.',
    },
  ],
  commonMistakes: [
    'Thêm -s vào các từ đã là số nhiều: viết "childrens", "peoples", "mens", "feets".',
    'Chia động từ số ít cho people: nói "People is very nice" thay vì "People are very nice".',
    'Nhầm lẫn chính tả giữa man/men và woman/women (viết nhầm nguyên âm a và e).',
  ],
  summary: 'Số nhiều bất quy tắc: person -> people, child -> children, man -> men, woman -> women, foot -> feet, tooth -> teeth, mouse -> mice, sheep -> sheep. Không thêm -s; động từ chia số nhiều.',
  exercises: [
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q1',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "person" là gì?',
      options: [
        { text: 'people', correct: true, rationale: 'people là dạng số nhiều bất quy tắc của person.' },
        { text: 'peoples', correct: false, rationale: 'Không thêm s vào people trong ngữ cảnh chỉ nhiều người.' },
        { text: 'persons', correct: false, rationale: 'persons rất hiếm dùng trong giao tiếp chuẩn thông thường.' },
      ],
      acceptedAnswers: [{ text: 'people', rationale: 'people là dạng số nhiều của person.' }],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q2',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "child" là gì?',
      options: [
        { text: 'children', correct: true, rationale: 'children là dạng số nhiều bất quy tắc của child.' },
        { text: 'childrens', correct: false, rationale: 'Sai vì thêm s vào từ đã mang nghĩa số nhiều.' },
        { text: 'childs', correct: false, rationale: 'child không đổi thành childs.' },
      ],
      acceptedAnswers: [{ text: 'children', rationale: 'children là số nhiều của child.' }],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q3',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "tooth" là gì?',
      options: [
        { text: 'teeth', correct: true, rationale: 'tooth đổi nguyên âm oo thành ee thành teeth.' },
        { text: 'tooths', correct: false, rationale: 'Không thêm s vào tooth.' },
        { text: 'toothes', correct: false, rationale: 'Sai quy tắc biến đổi.' },
      ],
      acceptedAnswers: [{ text: 'teeth', rationale: 'teeth là số nhiều của tooth.' }],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q4',
      kind: 'choice',
      prompt: 'Dạng số nhiều chính xác của danh từ "mouse" là gì?',
      options: [
        { text: 'mice', correct: true, rationale: 'mouse biến đổi thành mice.' },
        { text: 'mouses', correct: false, rationale: 'mouses chỉ dùng trong nghĩa chuột máy tính trong một số ngữ cảnh kỹ thuật, không dùng cho con vật.' },
        { text: 'mices', correct: false, rationale: 'Sai chính tả.' },
      ],
      acceptedAnswers: [{ text: 'mice', rationale: 'mice là số nhiều của mouse.' }],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q5',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "There are three ___ (man) waiting outside the clinic."',
      options: [],
      acceptedAnswers: [
        { text: 'men', rationale: 'man đổi nguyên âm a thành e thành men.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q6',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "Both of my ___ (foot) hurt after a long walk."',
      options: [],
      acceptedAnswers: [
        { text: 'feet', rationale: 'foot đổi oo thành ee thành feet.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q7',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "Two ___ (woman) opened a small coffee shop on this street."',
      options: [],
      acceptedAnswers: [
        { text: 'women', rationale: 'woman đổi a thành e thành women.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q8',
      kind: 'gap',
      prompt: 'Điền dạng số nhiều của từ trong ngoặc: "The farmer is feeding twenty white ___ (sheep)."',
      options: [],
      acceptedAnswers: [
        { text: 'sheep', rationale: 'sheep giữ nguyên dạng ở số nhiều.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q9',
      kind: 'transform',
      prompt: 'Chuyển danh từ số ít sang số nhiều: "The child is singing." -> "The ___ are singing."',
      options: [],
      acceptedAnswers: [
        { text: 'children', rationale: 'child chuyển thành children.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q10',
      kind: 'transform',
      prompt: 'Chuyển cụm danh từ số ít sang số nhiều: "One person is waiting." -> "Four ___ are waiting."',
      options: [],
      acceptedAnswers: [
        { text: 'people', rationale: 'person chuyển thành people.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu sau: "The childrens are playing in the schoolyard."',
      options: [],
      acceptedAnswers: [
        { text: 'children', rationale: 'Bỏ đuôi s vì children đã là số nhiều.' },
        { text: 'The children are playing in the schoolyard.', rationale: 'Câu hoàn chỉnh sau khi sửa.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi chia động từ trong câu sau: "People in this town is very kind."',
      options: [],
      acceptedAnswers: [
        { text: 'are', rationale: 'People là danh từ số nhiều nên phải dùng are thay vì is.' },
        { text: 'People in this town are very kind.', rationale: 'Câu hoàn chỉnh sửa is thành are.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-irregular-plurals-10-r1',
      kind: 'choice',
      prompt: 'Chọn từ số nhiều đúng: "We saw three big ___ swimming in the clean river."',
      options: [
        { text: 'fish', correct: true, rationale: 'fish giữ nguyên dạng khi nói về số lượng nhiều con cá.' },
        { text: 'fishs', correct: false, rationale: 'Không thêm s vào fish.' },
        { text: 'fishes', correct: false, rationale: 'fishes chỉ dùng khi chỉ các loài cá khác nhau trong sinh học, không dùng cho số đếm con cá thông thường.' },
      ],
      acceptedAnswers: [{ text: 'fish', rationale: 'fish là dạng số nhiều đúng.' }],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu với dạng số nhiều: "The dentist examined all of my ___ (tooth) carefully."',
      options: [],
      acceptedAnswers: [
        { text: 'teeth', rationale: 'tooth chuyển thành teeth.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-r3',
      kind: 'transform',
      prompt: 'Chuyển danh từ số ít sang số nhiều: "A mouse ran across the floor." -> "Two ___ ran across the floor."',
      options: [],
      acceptedAnswers: [
        { text: 'mice', rationale: 'mouse chuyển thành mice.' },
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "How many peoples live in your neighborhood?"',
      options: [],
      acceptedAnswers: [
        { text: 'people', rationale: 'Bỏ s, viết đúng là people.' },
        { text: 'How many people live in your neighborhood?', rationale: 'Câu hoàn chỉnh sau khi sửa peoples thành people.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-irregular-plurals-10-o1',
      prompt: 'Viết 3 câu miêu tả một sự kiện đông người (như lễ hội, hội chợ hoặc công viên), sử dụng ít nhất 2 danh từ số nhiều bất quy tắc (ví dụ: people, children, men, women).',
      modelAnswer: 'At the weekend food festival, there are hundreds of people tasting different dishes. Many children are holding colorful balloons and laughing together. A few men and women are dancing to the cheerful music.',
      checks: [
        'Sử dụng ít nhất 2 danh từ số nhiều bất quy tắc chỉ người (people, children, men, women)',
        'Không thêm -s vào các danh từ bất quy tắc này',
        'Động từ chia đúng dạng số nhiều (are holding, are dancing)',
      ],
    },
    {
      id: 'grammar-v2-a1-irregular-plurals-10-o2',
      prompt: 'Viết 3 câu về thói quen chăm sóc cá nhân hoặc động vật ở nông trại, sử dụng ít nhất 2 danh từ số nhiều bất quy tắc (ví dụ: teeth, feet, sheep, mice).',
      modelAnswer: 'Healthy people always brush their teeth twice a day. After walking for two hours, my feet feel quite tired. On my uncle\'s farm, there are thirty sheep eating green grass.',
      checks: [
        'Sử dụng ít nhất 2 danh từ số nhiều bất quy tắc (teeth, feet, sheep)',
        'Đúng quy tắc biến đổi từ foot -> feet, tooth -> teeth, sheep -> sheep',
        'Câu văn tự nhiên, rõ nghĩa',
      ],
    },
  ],
  sources: [
    {
      "id": "plural",
      "title": "British Council: Count nouns",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/count-nouns",
      "claims": [
        "Count nouns have singular and plural forms; regular plural spelling and common irregular forms are distinguished."
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
