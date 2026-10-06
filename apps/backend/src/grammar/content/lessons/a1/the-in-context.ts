/**
 * @file the-in-context.ts
 * @description A1 the-in-context lesson definition: definite article 'the' for second mentions, unique objects, and clear contexts.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-the-in-context-12',
  revisionId: 'grammar-v2-a1-the-in-context-12@1.0.0',
  revision: '1.0.0',
  title: 'Mạo từ xác định: The trong ngữ cảnh cụ thể',
  objective: 'Nhận biết và sử dụng thành thạo mạo từ xác định "the" khi đối tượng được nhắc lại lần thứ hai, khi sự vật là duy nhất trong tự nhiên, hoặc khi đối tượng đã rõ ràng trong tình huống giao tiếp.',
  prerequisiteIds: ['grammar-v2-a1-a-and-an-11'],
  coverage: ['the-in-context', 'articles', 'definiteness'],
  context: {
    english: 'There is a cat and a dog in the garden. The cat is sleeping under a tree, while the dog is playing with a small ball.',
    vietnamese: 'Có một con mèo và một con chó trong vườn. Con mèo đang ngủ dưới một cái cây, trong khi con chó đang chơi với một quả bóng nhỏ.',
  },
  guide: {
    pattern: 'Lần 1: a/an + singular noun | Lần 2 trở đi: the + noun || Duy nhất/ngữ cảnh đã rõ: the + noun (the sun, the moon, the sky, the door)',
    whenToUse: [
      'Nhắc lại danh từ lần thứ hai trong đoạn văn khi người nghe/người đọc đã biết rõ đối tượng đó là ai/cái gì',
      'Chỉ các sự vật độc nhất vô nhị trong tự nhiên: the sun, the moon, the earth, the sky, the world',
      'Chỉ đối tượng duy nhất và rõ ràng trong tình huống cụ thể (the door của phòng này, the teacher của lớp này)',
    ],
    signalWords: ['the', 'definite', 'second mention', 'sun', 'moon', 'sky', 'earth', 'door'],
    check: [
      'Lần đầu tiên giới thiệu sự vật số ít đếm được dùng a/an; khi nhắc lại dùng the (I saw a film. The film was exciting)',
      'Sự vật độc nhất trong vũ trụ luôn đi kèm the: The sun rises in the east; The moon is bright',
      'Trong phòng, nếu chỉ có một vật cụ thể thì dùng the: Turn off the light; Close the window',
      'KHÔNG dùng "the" khi nói về danh từ số nhiều nói chung (Cats love milk, KHÔNG nói The cats love milk khi nói khái quát loài mèo)',
      'Phát âm: đọc là /ðə/ trước phụ âm (the book); đọc là /ðiː/ trước nguyên âm (the apple, the earth)',
    ],
  },
  explanation: 'Mạo từ xác định "the" (definite article) được sử dụng khi cả người nói và người nghe đều biết rõ đối tượng cụ thể đang được đề cập tới. Ở trình độ A1, người học cần nắm chắc 3 ngữ cảnh sử dụng cơ bản nhất:\n1. Nhắc lại lần thứ hai (second mention):\n- Khi một sự vật số ít đếm được xuất hiện lần đầu, ta dùng "a" hoặc "an". Nhưng khi nhắc lại sự vật đó ở câu tiếp theo, nó đã trở nên xác định, vì vậy ta bắt buộc phải dùng "the".\n- Ví dụ: "I bought a notebook and a pen. The notebook is blue, but the pen is black."\n2. Sự vật độc nhất trong tự nhiên (unique in nature):\n- Những sự vật chỉ có duy nhất một cá thể trên thế giới hoặc trong vũ trụ luôn đi kèm "the": the sun (mặt trời), the moon (mặt trăng), the earth (trái đất), the sky (bầu trời), the world (thế giới).\n- Ví dụ: "The sun is shining in the sky." (Không nói trơ trọi "Sun is shining in sky").\n3. Đối tượng đã rõ ràng trong ngữ cảnh thực tế (contextual uniqueness):\n- Khi ở trong một căn phòng hoặc tình huống cụ thể mà người nghe dễ dàng hiểu được đang nói về vật nào: "Could you open the door?" (cửa của căn phòng này); "The teacher is in the classroom" (giáo viên của lớp này).\n4. Trường hợp không dùng "the":\n- Không dùng "the" khi nói về danh từ số nhiều hoặc danh từ không đếm được với ý nghĩa chung chung, khái quát (general meaning).\n- Ví dụ: "Children like playing games" (trẻ em nói chung thích chơi trò chơi - không dùng The children khi khái quát).\n- Ví dụ: "I like coffee" (tôi thích cà phê nói chung - không nói I like the coffee).',
  examples: [
    { english: 'I ordered a sandwich and an orange juice. The sandwich was very fresh.', vietnamese: 'Tôi đã gọi một chiếc bánh mì kẹp và một cốc nước cam. Chiếc bánh mì kẹp rất tươi ngon. (Lần đầu a sandwich, lần hai the sandwich).' },
    { english: 'Look up at the sky! The moon is so bright tonight.', vietnamese: 'Hãy nhìn lên bầu trời kìa! Mặt trăng tối nay thật sáng. (the sky và the moon là sự vật độc nhất).' },
    { english: 'Could you please turn off the light before you leave the room?', vietnamese: 'Bạn có thể vui lòng tắt đèn trước khi rời khỏi phòng được không? (the light và the room đã rõ trong ngữ cảnh).' },
    { english: 'The teacher explained the new grammar lesson very clearly.', vietnamese: 'Giáo viên đã giải thích bài học ngữ pháp mới rất rõ ràng. (the teacher trong ngữ cảnh lớp học).' },
    { english: 'The earth moves around the sun.', vietnamese: 'Trái đất chuyển động quanh mặt trời. (the earth và the sun là duy nhất trong hệ mặt trời).' },
    { english: 'They visited a small museum yesterday. The museum had many old photos.', vietnamese: 'Họ đã ghé thăm một bảo tàng nhỏ hôm qua. Bảo tàng có rất nhiều ảnh cũ. (Lần đầu a museum, lần hai the museum).' },
  ],
  contrasts: [
    {
      form: 'I saw a dog. The dog was barking vs I saw a dog. A dog was barking',
      whyFits: 'Dùng "The dog" ở câu thứ hai vì chú chó đã được giới thiệu ở câu trước, người nghe đã biết rõ.',
      whyNot: 'Dùng lại "A dog" sẽ khiến người nghe hiểu lầm là xuất hiện thêm một con chó thứ hai khác.',
    },
    {
      form: 'The sun rises in the east vs Sun rises in the east',
      whyFits: 'Mặt trời là thực thể độc nhất trong vũ trụ, bắt buộc có mạo từ xác định "The".',
      whyNot: 'Bỏ quên mạo từ trước danh từ độc nhất là lỗi sai ngữ pháp căn bản trong tiếng Anh.',
    },
  ],
  commonMistakes: [
    'Quên dùng "the" trước các sự vật độc nhất: nói "Moon is bright tonight" thay vì "The moon is bright tonight".',
    'Lặp lại mạo từ "a" khi nhắc đến đồ vật lần thứ hai: nói "I bought a shirt. A shirt is white" thay vì "The shirt is white".',
    'Dùng thừa "the" khi nói về sự vật nói chung: nói "The dogs are friendly animals" khi muốn phát biểu quy luật chung về loài chó (chuẩn là "Dogs are friendly animals").',
  ],
  summary: 'Dùng "the" khi đối tượng đã xác định: nhắc lại lần 2 (a book -> the book), đối tượng rõ trong ngữ cảnh cụ thể (the door, the light), và sự vật độc nhất (the sun, the moon, the earth). Không dùng the khi nói chung chung.',
  exercises: [
    {
      id: 'grammar-v2-a1-the-in-context-12-q1',
      kind: 'choice',
      prompt: 'Chọn mạo từ thích hợp điền vào câu thứ hai: "We stayed at a hotel near the sea. ___ hotel had a lovely pool."',
      options: [
        { text: 'The', correct: true, rationale: 'Khách sạn đã được nhắc ở câu trước nên lần thứ hai dùng "The".' },
        { text: 'A', correct: false, rationale: 'Không dùng lại "A" khi đối tượng đã xác định.' },
        { text: 'An', correct: false, rationale: '"hotel" phát âm bắt đầu bằng phụ âm /h/.' },
      ],
      acceptedAnswers: [{ text: 'The', rationale: 'The dùng cho lần nhắc lại thứ hai.' }],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q2',
      kind: 'choice',
      prompt: 'Chọn phương án đúng điền vào câu: "Look outside! ___ sun is shining brightly."',
      options: [
        { text: 'The', correct: true, rationale: 'Mặt trời là sự vật độc nhất nên bắt buộc dùng "The".' },
        { text: 'A', correct: false, rationale: 'Mặt trời không phải là một trong nhiều vật chung chung.' },
        { text: 'An', correct: false, rationale: 'Sai mạo từ.' },
      ],
      acceptedAnswers: [{ text: 'The', rationale: 'The sun là danh từ chỉ vật độc nhất.' }],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q3',
      kind: 'choice',
      prompt: 'Chọn từ đúng điền vào câu: "Could you please close ___ window? It is very windy."',
      options: [
        { text: 'the', correct: true, rationale: 'Cửa sổ của căn phòng hiện tại đã rõ ràng trong tình huống.' },
        { text: 'a', correct: false, rationale: 'Dùng "a" không thể hiện rõ cửa sổ cụ thể trong phòng.' },
        { text: 'an', correct: false, rationale: '"window" bắt đầu bằng phụ âm /w/.' },
      ],
      acceptedAnswers: [{ text: 'the', rationale: 'the window xác định trong ngữ cảnh phòng.' }],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q4',
      kind: 'choice',
      prompt: 'Chọn câu nói đúng khi phát biểu về loài chó nói chung:',
      options: [
        { text: 'Dogs are very friendly pets.', correct: true, rationale: 'Nói về loài vật nói chung dùng danh từ số nhiều không có the.' },
        { text: 'The dogs are very friendly pets.', correct: false, rationale: 'Thêm the sẽ mang nghĩa ám chỉ một đàn chó cụ thể nào đó.' },
        { text: 'A dogs are very friendly pets.', correct: false, rationale: 'Không dùng "a" với danh từ số nhiều dogs.' },
      ],
      acceptedAnswers: [{ text: 'Dogs are very friendly pets.', rationale: 'Câu khái quát dùng danh từ số nhiều không có the.' }],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q5',
      kind: 'gap',
      prompt: 'Điền mạo từ thích hợp: "I found a leather wallet on the bus. ___ wallet was completely empty."',
      options: [],
      acceptedAnswers: [
        { text: 'The', rationale: 'Chiếc ví đã được nhắc ở câu trước nên câu này dùng The.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q6',
      kind: 'gap',
      prompt: 'Điền mạo từ thích hợp vào chỗ trống: "___ moon is full and bright tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'The', rationale: 'Mặt trăng là thực thể độc nhất trong tự nhiên nên dùng The.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q7',
      kind: 'gap',
      prompt: 'Điền mạo từ thích hợp: "The teacher wrote three practice sentences on ___ board."',
      options: [],
      acceptedAnswers: [
        { text: 'the', rationale: 'the board là chiếc bảng trong lớp học đã rõ ràng với học sinh.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q8',
      kind: 'gap',
      prompt: 'Điền mạo từ thích hợp: "They walked into a small cafe. ___ tea there was delicious."',
      options: [],
      acceptedAnswers: [
        { text: 'The', rationale: 'Món trà của quán cà phê đó đã được xác định cụ thể trong ngữ cảnh.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q9',
      kind: 'transform',
      prompt: 'Sửa mạo từ trong ngoặc cho câu thứ hai: "I bought a book yesterday. (A) book is very interesting." -> "___ book is very interesting."',
      options: [],
      acceptedAnswers: [
        { text: 'The', rationale: 'Đổi A thành The vì cuốn sách đã được nhắc ở câu trước.' },
        { text: 'The book is very interesting.', rationale: 'Câu hoàn chỉnh dùng The book.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q10',
      kind: 'transform',
      prompt: 'Thêm mạo từ xác định cho sự vật độc nhất: "(Sun) gives us light and warmth." -> "___ gives us light and warmth."',
      options: [],
      acceptedAnswers: [
        { text: 'The sun', rationale: 'Thêm The trước sun.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu mạo từ trong câu sau: "Moon shines brightly over the lake tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'The moon', rationale: 'Thêm The trước danh từ độc nhất moon.' },
        { text: 'The moon shines brightly over the lake tonight.', rationale: 'Câu hoàn chỉnh thêm The trước moon.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi lặp mạo từ bất định: "She adopted a puppy. A puppy is very playful."',
      options: [],
      acceptedAnswers: [
        { text: 'The puppy', rationale: 'Đổi A puppy thành The puppy khi nhắc lại lần hai.' },
        { text: 'She adopted a puppy. The puppy is very playful.', rationale: 'Câu hoàn chỉnh sau khi sửa.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-the-in-context-12-r1',
      kind: 'choice',
      prompt: 'Chọn từ thích hợp: "Could you please pass me ___ salt on the dining table?"',
      options: [
        { text: 'the', correct: true, rationale: 'Lọ muối trên bàn ăn đã được xác định rõ ràng với người nghe.' },
        { text: 'a', correct: false, rationale: 'salt là danh từ không đếm được, không dùng với a.' },
        { text: 'an', correct: false, rationale: 'Không dùng an với salt.' },
      ],
      acceptedAnswers: [{ text: 'the', rationale: 'the salt xác định trên bàn ăn.' }],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu: "We live on ___ earth, which travels around the sun."',
      options: [],
      acceptedAnswers: [
        { text: 'the', rationale: 'earth là hành tinh duy nhất của chúng ta nên đi với the.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-r3',
      kind: 'transform',
      prompt: 'Chuyển mạo từ phù hợp khi nhắc lại: "He met a singer. (A) singer was very polite." -> "___ singer was very polite."',
      options: [],
      acceptedAnswers: [
        { text: 'The', rationale: 'Đổi A thành The khi nhắc lại ca sĩ lần thứ hai.' },
        { text: 'The singer was very polite.', rationale: 'Câu hoàn chỉnh với The.' },
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi thiếu mạo từ trong câu: "Earth is the third planet from the sun."',
      options: [],
      acceptedAnswers: [
        { text: 'The Earth', rationale: 'Thêm The trước danh từ riêng Trái Đất.' },
        { text: 'The Earth is the third planet from the sun.', rationale: 'Câu hoàn chỉnh thêm The.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-the-in-context-12-o1',
      prompt: 'Viết 3 câu kể về một món đồ bạn mới mua hoặc được tặng: câu đầu giới thiệu dùng "a" hoặc "an", hai câu sau miêu tả chi tiết đặc điểm của món đồ đó dùng "the".',
      modelAnswer: 'Yesterday, I bought a new backpack at the shopping mall. The backpack is dark blue with two side pockets. The material is very durable and light to carry.',
      checks: [
        'Câu đầu dùng đúng a/an để giới thiệu danh từ số ít lần đầu (a backpack)',
        'Câu tiếp theo dùng đúng the khi nhắc lại danh từ (The backpack)',
        'Miêu tả tự nhiên, đúng ngữ pháp',
      ],
    },
    {
      id: 'grammar-v2-a1-the-in-context-12-o2',
      prompt: 'Viết 3 câu miêu tả cảnh quan thiên nhiên xung quanh bạn (bầu trời, mặt trời, mặt trăng, biển), sử dụng mạo từ "the" cho các sự vật độc nhất.',
      modelAnswer: 'In the early morning, the sun rises gently over the blue sea. The sky looks clear without any dark clouds. All tourists on the beach enjoy the fresh sea breeze.',
      checks: [
        'Sử dụng đúng "the" trước các danh từ độc nhất (the sun, the sky)',
        'Sử dụng đúng "the" cho không gian ngữ cảnh cụ thể (the beach, the sea)',
        'Câu văn mạch lạc, đúng thì hiện tại đơn',
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
