/**
 * @file place-prepositions.ts
 * @description Giới từ chỉ nơi chốn và vị trí không gian: in, on, at, under, next to, behind, in front of, between.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-place-prepositions-23',
  revisionId: 'grammar-v2-a1-place-prepositions-23@1.0.0',
  revision: '1.0.0',
  title: 'Giới từ chỉ nơi chốn: in, on, at và các giới từ vị trí',
  objective: 'Xác định và sử dụng chính xác các giới từ chỉ nơi chốn thông dụng (in, on, at, under, next to, behind, in front of, between) để miêu tả vị trí của đồ vật, con người và địa điểm trong không gian.',
  prerequisiteIds: ['grammar-v2-a1-time-prepositions-22'],
  coverage: ['place-prepositions', 'prepositions', 'spatial-positions', 'locations'],
  context: {
    english: 'Nam helps a newly hired colleague organize his desk at an open-plan office in Da Nang, arranging documents, digital devices, and office supplies.',
    vietnamese: 'Nam giúp một đồng nghiệp mới sắp xếp bàn làm việc tại văn phòng mở ở Đà Nẵng, bài trí tài liệu, thiết bị số và văn phòng phẩm.',
  },
  guide: {
    pattern: 'S + be / V + Giới từ nơi chốn + Danh từ chỉ địa điểm / vật thể',
    whenToUse: [
      'Dùng "in" cho vị trí bên trong một không gian kín, phòng ốc, tòa nhà, thành phố hoặc quốc gia (in the room, in Hanoi, in Vietnam).',
      'Dùng on cho vị trí trên bề mặt, không nhất thiết phẳng (on the desk, on the wall, on a curved roof), và số tầng (on the second floor).',
      'Dùng "at" cho một điểm dừng, tọa độ cụ thể, địa chỉ nhà hoặc địa điểm công cộng (at the bus stop, at home, at work, at school).',
      'Dùng các giới từ vị trí tương quan: under (ở dưới), next to (ngay bên cạnh), behind (phía sau), in front of (phía trước), between A and B (ở giữa hai đối tượng).',
    ],
    signalWords: ['in the room', 'on the desk', 'at home', 'under the chair', 'next to', 'in front of', 'behind', 'between'],
    check: [
      'Trong ngữ cảnh này, vị trí được xem là bên trong một khu vực (in), trên bề mặt (on) hay tại một điểm/địa điểm hoạt động (at)?',
      'Cụm "in front of" bắt buộc có giới từ "of" (không viết thiếu "of").',
      'Khi nêu hai mốc, dùng between A and B. Between không đòi hỏi vật ở đúng trung điểm và có thể dùng với các mốc được phân biệt rõ nhiều hơn hai.',
    ],
  },
  explanation: 'In thường chỉ bên trong một khu vực (in a box, in Hanoi); on chỉ vị trí trên bề mặt, không nhất thiết phẳng; at xem nơi chốn như một điểm hẹn hoặc nơi hoạt động. Cùng một địa điểm có thể dùng in hoặc at tùy cách nhìn: in the school nhấn mạnh bên trong tòa nhà, at school nhấn mạnh hoạt động/nơi học. Under là ở dưới, next to là kế bên, behind là phía sau, in front of là phía trước. Between A and B là giữa hai mốc, không nhất thiết ở đúng trung điểm.',
  examples: [
    { english: 'My laptop and notebook are on the wooden desk.', vietnamese: 'Máy tính xách tay và cuốn sổ tay của tôi ở trên bàn gỗ. (Tiếp xúc trên bề mặt phẳng, dùng on).' },
    { english: 'All the important contracts are kept safely in the steel drawer.', vietnamese: 'Tất cả các hợp đồng quan trọng được cất giữ an toàn trong ngăn kéo thép. (Bên trong không gian kín, dùng in).' },
    { english: 'A small group of tourists is waiting at the bus stop.', vietnamese: 'Một nhóm nhỏ khách du lịch đang đợi tại trạm dừng xe buýt. (Điểm dừng địa điểm cụ thể, dùng at).' },
    { english: 'The black cat is sleeping soundly under the sofa.', vietnamese: 'Con mèo đen đang ngủ say sưa dưới gầm ghế sô pha. (Vị trí bên dưới, dùng under).' },
    { english: 'The water dispenser is located next to the tall bookshelf.', vietnamese: 'Cây nước uống nằm ngay cạnh giá sách cao. (Vị trí kế bên, dùng next to).' },
    { english: 'The pharmacy is located between the bakery and the bank.', vietnamese: 'Hiệu thuốc nằm ở giữa tiệm bánh và ngân hàng. (Vị trí giữa hai nơi, dùng between... and).' },
  ],
  contrasts: [
    {
      form: 'on the desk vs in the desk',
      whyFits: 'On the desk dùng cho đồ vật đặt trên mặt bàn (laptop, books).',
      whyNot: 'In the desk dùng khi đồ vật nằm trong ngăn kéo bàn (in the desk drawer); dùng "in the desk" cho đồ vật lộ trên mặt phẳng là sai.',
    },
    {
      form: 'in front of the car vs in front the car',
      whyFits: 'In front of là cụm giới từ cố định bắt buộc có "of".',
      whyNot: 'Dạng "in front the car" là lỗi bỏ quên giới từ of thường gặp ở người mới học.',
    },
  ],
  commonMistakes: [
    'Dùng on cho thành phố hoặc quốc gia: “She lives on Da Nang” → Cần sửa thành “She lives in Da Nang”.',
    'Thiếu giới từ "of" trong "in front of": “There is a tree in front our house” → Cần sửa thành “in front of our house”.',
    'Dùng at thay vì on cho bề mặt: “The picture hangs at the wall” → Cần sửa thành “on the wall”.',
  ],
  summary: 'In: trong không gian/thành phố; On: trên bề mặt; At: tại tọa độ/điểm dừng. Các vị trí trực quan: under (dưới), next to (bên cạnh), behind (sau), in front of (trước), between A and B (ở giữa).',
  exercises: [
    {
      id: 'grammar-v2-a1-place-prepositions-23-q1',
      kind: 'choice',
      prompt: 'There is a beautiful family photograph hanging ___ the living room wall.',
      options: [
        { text: 'on', correct: true, rationale: 'Bức ảnh treo tiếp xúc trên bề mặt bức tường (the wall) nên dùng on.' },
        { text: 'in', correct: false, rationale: 'In biểu thị bên trong lòng bức tường.' },
        { text: 'at', correct: false, rationale: 'At không dùng cho bề mặt tường.' },
      ],
      acceptedAnswers: [{ text: 'on', rationale: 'On the wall là cụm giới từ chỉ sự tiếp xúc trên bề mặt tường.' }],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q2',
      kind: 'choice',
      prompt: 'The students are sitting ___ the classroom listening attentively to the teacher.',
      options: [
        { text: 'in', correct: true, rationale: 'Phòng học là không gian ba chiều có ranh giới bao quanh, dùng in.' },
        { text: 'on', correct: false, rationale: 'On the classroom mang nghĩa ở trên mái phòng học.' },
        { text: 'at', correct: false, rationale: 'Dù at school dùng được, nhưng danh từ cụ thể classroom đi với in.' },
      ],
      acceptedAnswers: [{ text: 'in', rationale: 'In the classroom chỉ vị trí bên trong phòng học.' }],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q3',
      kind: 'choice',
      prompt: 'I will meet you ___ the entrance gate of the botanical garden at two o’clock.',
      options: [
        { text: 'at', correct: true, rationale: 'Cổng vào (the entrance gate) là một điểm hẹn tọa độ cụ thể, dùng at.' },
        { text: 'in', correct: false, rationale: 'In không phù hợp với điểm cổng ra vào.' },
        { text: 'on', correct: false, rationale: 'On chỉ dùng khi ở trên bề mặt phẳng.' },
      ],
      acceptedAnswers: [{ text: 'at', rationale: 'At the entrance gate chỉ điểm hẹn cụ thể.' }],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q4',
      kind: 'choice',
      prompt: 'There is a large parking space right ___ the main building.',
      options: [
        { text: 'in front of', correct: true, rationale: 'Cụm giới từ hoàn chỉnh chỉ vị trí phía trước là in front of.' },
        { text: 'in front', correct: false, rationale: 'Thiếu giới từ "of" khi có danh từ the main building đi sau.' },
        { text: 'front of', correct: false, rationale: 'Thiếu giới từ "in" ở đầu cụm từ.' },
      ],
      acceptedAnswers: [{ text: 'in front of', rationale: 'In front of là cụm giới từ hoàn chỉnh.' }],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q5',
      kind: 'gap',
      prompt: 'My shoes are ___ (under / on) the bed, so I cannot see them easily.',
      options: [],
      acceptedAnswers: [
        { text: 'under', rationale: 'Đôi giày ở dưới gầm giường (under the bed) nên khó nhìn thấy.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q6',
      kind: 'gap',
      prompt: 'The printer is placed right ___ (next to / between) the computer desk.',
      options: [],
      acceptedAnswers: [
        { text: 'next to', rationale: 'Next to đi với một vật thể kế bên (the computer desk).' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q7',
      kind: 'gap',
      prompt: 'The bank is situated ___ (between) the post office and the supermarket.',
      options: [],
      acceptedAnswers: [
        { text: 'between', rationale: 'Between đi với cấu trúc "between A and B" để chỉ vị trí ở giữa.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q8',
      kind: 'gap',
      prompt: 'My uncle and his family live ___ (in / at) Ho Chi Minh City.',
      options: [],
      acceptedAnswers: [
        { text: 'in', rationale: 'Thành phố lớn luôn đi cùng giới từ in.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q9',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng cụm giới từ "behind": "The garden is at the back of the house."',
      options: [],
      acceptedAnswers: [
        { text: 'The garden is behind the house.', rationale: 'Thay cụm at the back of bằng giới từ behind.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q10',
      kind: 'transform',
      prompt: 'Hoàn thành câu miêu tả bằng cách sắp xếp các từ: "my bag / There is / a bottle of water / in / ."',
      options: [],
      acceptedAnswers: [
        { text: 'There is a bottle of water in my bag.', rationale: 'There is + danh từ + in my bag.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai giới từ duy nhất trong câu sau: "My grandparents live on a small village near Hue."',
      options: [],
      acceptedAnswers: [
        { text: 'My grandparents live in a small village near Hue.', rationale: 'Thay on bằng in trước ngôi làng/khu vực in a small village.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "A tall tree stands in front our classroom window."',
      options: [],
      acceptedAnswers: [
        { text: 'A tall tree stands in front of our classroom window.', rationale: 'Thêm giới từ "of" vào sau in front.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-place-prepositions-23-r1',
      kind: 'choice',
      prompt: 'The small convenience store is located ___ the corner of Ly Thuong Kiet Street.',
      options: [
        { text: 'at', correct: true, rationale: 'Tại góc đường (at the corner) là một điểm tọa độ nơi chốn, dùng at.' },
        { text: 'in', correct: false, rationale: 'In chỉ dùng khi nói về một không gian bao bọc.' },
        { text: 'under', correct: false, rationale: 'Under mang nghĩa ở bên dưới đáy.' },
      ],
      acceptedAnswers: [{ text: 'at', rationale: 'At the corner chỉ vị trí tại góc phố.' }],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-r2',
      kind: 'gap',
      prompt: 'Chỉ nhập giới từ phù hợp: "A tiny white puppy is hidden from view ___ (behind / on) the big armchair, between its back and the wall."',
      options: [],
      acceptedAnswers: [
        { text: 'behind', rationale: 'Trốn ở phía sau ghế bành (behind the big armchair).' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-r3',
      kind: 'transform',
      prompt: 'Dùng next to để viết một câu bắt đầu bằng My desk is; không dùng here/right: "My desk is here. The window is right beside it."',
      options: [],
      acceptedAnswers: [
        { text: 'My desk is next to the window.', rationale: 'Dùng cụm next to the window để chỉ vị trí cạnh cửa sổ.' },
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-r4',
      kind: 'correction',
      prompt: 'Chìa khóa nằm trên mặt bàn, không trong ngăn kéo. Sửa giới từ, viết cả câu và giữ nguyên các từ khác: "The keys are lying in the dining table."',
      options: [],
      acceptedAnswers: [
        { text: 'The keys are lying on the dining table.', rationale: 'Thay in bằng on vì chìa khóa nằm trên bề mặt bàn ăn.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-place-prepositions-23-o1',
      prompt: 'Miêu tả vị trí 4 đồ vật trên bàn học hoặc trong phòng làm việc của bạn, sử dụng 4 giới từ nơi chốn khác nhau (on, in, under, next to).',
      modelAnswer: 'My laptop is on the wooden table. My favorite pens are in a green pencil case. A small trash bin is under the desk. The table lamp is next to my computer screen.',
      checks: [
        'Sử dụng đúng 4 giới từ nơi chốn khác nhau (on, in, under, next to).',
        'Miêu tả đồ vật và vị trí không gian rõ ràng, chính xác ngữ pháp.',
      ],
    },
    {
      id: 'grammar-v2-a1-place-prepositions-23-o2',
      prompt: 'Viết một đoạn văn ngắn 3-4 câu hướng dẫn một người bạn tìm kiếm một cuốn sách hoặc tài liệu thất lạc trong phòng khách.',
      modelAnswer: 'Please look inside the living room. Your English grammar book is on the small coffee table. If it is not there, check under the sofa cushion. There is also a notebook behind the television set.',
      checks: [
        'Sử dụng ít nhất 3 giới từ chỉ nơi chốn (on, under, behind, inside).',
        'Câu văn mạch lạc, mang tính hướng dẫn tìm đồ vật thực tế.',
      ],
    },
  ],
  sources: [
    {
      "id": "place",
      "title": "British Council: Prepositions of place: in, on, at",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/prepositions-place",
      "claims": [
        "In describes a larger enclosing space, on a surface, and at an activity location or exact position."
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
