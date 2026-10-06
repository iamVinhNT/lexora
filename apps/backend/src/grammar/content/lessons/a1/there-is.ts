/**
 * @file there-is.ts
 * @description A1 there-is lesson definition: expressing existence of singular and uncountable nouns.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-there-is-03',
  revisionId: 'grammar-v2-a1-there-is-03@1.0.0',
  revision: '1.0.0',
  title: 'Cấu trúc There is: Sự tồn tại của danh từ số ít và không đếm được',
  objective: 'Nhận biết và sử dụng thành thạo cấu trúc There is ở thể khẳng định, phủ định và nghi vấn để miêu tả sự hiện diện của danh từ đếm được số ít và danh từ không đếm được.',
  prerequisiteIds: ['grammar-v2-a1-have-and-have-got-02'],
  coverage: ['there-is', 'existential-there', 'singular'],
  context: {
    english: 'In my bedroom, there is a big bed and there is a wooden desk near the window. There is also a small lamp on the desk.',
    vietnamese: 'Trong phòng ngủ của tôi, có một chiếc giường lớn và có một chiếc bàn gỗ gần cửa sổ. Cũng có một chiếc đèn nhỏ trên bàn.',
  },
  guide: {
    pattern: 'Khẳng định: There is + a/an + singular countable noun or some + uncountable noun | Phủ định: There isn’t + a/an / any + noun | Nghi vấn: Is there + a/an / any + noun?',
    whenToUse: [
      'Chỉ ra sự tồn tại của một đồ vật, một người hoặc địa điểm lần đầu được đề cập',
      'Nói về sự có mặt của chất lỏng, tiền bạc, thời gian hoặc danh từ không đếm được',
      'Hỏi thăm sự có mặt của cơ sở vật chất ở khu vực xung quanh',
    ],
    signalWords: ['there', 'a', 'an', 'some', 'any', 'nearby', 'in the room'],
    check: [
      'There is (\'s) đi với danh từ đếm được số ít (a bed, an apple)',
      'There is cũng dùng cho danh từ không đếm được (water, coffee, luggage, information)',
      'Phủ định dùng There is not / There isn\'t (There isn\'t any milk left)',
      'Nghi vấn đảo Is lên đầu câu: Is there a bank near here? -> Yes, there is. / No, there isn\'t.',
      'Không dùng "have" theo thói quen tiếng Việt khi muốn diễn đạt sự tồn tại (tránh nói "In room have a table")',
    ],
  },
  explanation: 'Cấu trúc "There is" được dùng để thông báo sự hiện diện hoặc tồn tại của một đối tượng nào đó ở một vị trí cụ thể. "There" ở đây đóng vai trò chủ ngữ giả. Khi danh từ đứng sau là danh từ đếm được số ít (singular countable noun), ta dùng "There is a..." hoặc "There is an..." (dạng viết tắt là "There\'s"). Khi danh từ đứng sau là danh từ không đếm được (uncountable noun như water, tea, information, noise), ta cũng dùng "There is" (thường đi với "some" trong câu khẳng định, ví dụ: "There is some tea in the pot"). Ở thể phủ định, ta thêm "not" thành "There is not" hoặc "There isn\'t" (với danh từ không đếm được thường dùng kèm "any"). Khi đặt câu hỏi, đảo "Is" lên trước "there": "Is there a supermarket nearby?" và câu trả lời ngắn là "Yes, there is." hoặc "No, there isn\'t.". Cần chú ý phân biệt: "There is a restaurant on the corner" (có một nhà hàng ở góc phố - chỉ sự tồn tại) khác với "It is a good restaurant" (Đó là một nhà hàng ngon - miêu tả đặc điểm).',
  examples: [
    { english: 'There is a comfortable sofa in the living room.', vietnamese: 'Có một chiếc ghế sofa thoải mái trong phòng khách. (Danh từ số ít đếm được sofa).' },
    { english: 'There is fresh milk in the refrigerator.', vietnamese: 'Có sữa tươi trong tủ lạnh. (Danh từ không đếm được milk).' },
    { english: 'There\'s a convenience store right opposite our office.', vietnamese: 'Có một cửa hàng tiện lợi ngay đối diện văn phòng chúng tôi. (Dạng rút gọn There\'s).' },
    { english: 'There isn\'t any hot water in the bathroom.', vietnamese: 'Không có nước nóng trong phòng tắm. (Phủ định với isn\'t any).' },
    { english: 'Is there a pharmacy near this hotel?', vietnamese: 'Có hiệu thuốc nào gần khách sạn này không? (Câu hỏi đảo Is there).' },
    { english: 'There is no internet connection in this basement.', vietnamese: 'Không có kết nối mạng internet ở tầng hầm này. (Dùng no sau there is để phủ định).' },
  ],
  contrasts: [
    {
      form: 'There is a bus station nearby vs It is a bus station nearby',
      whyFits: 'Dùng "There is" để chỉ sự tồn tại, giới thiệu địa điểm mới cho người nghe.',
      whyNot: '"It is" dùng để trả lời cho câu hỏi nhận dạng (What is that building?) hoặc miêu tả vật đã biết.',
    },
    {
      form: 'In this town there is a museum vs In this town has a museum',
      whyFits: 'There is is one standard way to introduce the existence of a museum at a location; a possessive alternative can use a subject, as in Our town has a museum.',
      whyNot: '"has a museum" thiếu chủ ngữ chỉ người/vật sở hữu; dịch word-by-word từ tiếng Việt là sai.',
    },
  ],
  commonMistakes: [
    'Dùng động từ have thay cho There is: nói "In the garden has a tree" thay vì "There is a tree in the garden".',
    'Nhầm lẫn giữa There is và It is: nói "It is a new message for you" khi muốn thông báo sự xuất hiện của tin nhắn mới.',
    'Quên a/an trước danh từ số ít: nói "There is book on the desk" thay vì "There is a book on the desk".',
  ],
  summary: 'There is (There\'s) dùng cho danh từ đếm được số ít (với a/an) và danh từ không đếm được. Phủ định: There isn\'t. Nghi vấn: Is there...? Trả lời: Yes, there is / No, there isn\'t.',
  exercises: [
    {
      id: 'grammar-v2-a1-there-is-03-q1',
      kind: 'choice',
      prompt: '___ a quiet study room on the second floor of the library.',
      options: [
        { text: 'There is', correct: true, rationale: '"a quiet study room" là danh từ số ít nên dùng "There is".' },
        { text: 'There are', correct: false, rationale: '"There are" dùng cho danh từ số nhiều.' },
        { text: 'It have', correct: false, rationale: 'Cấu trúc không chuẩn trong tiếng Anh.' },
      ],
      acceptedAnswers: [{ text: 'There is', rationale: 'There is đi với danh từ số ít.' }],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q2',
      kind: 'choice',
      prompt: '___ any coffee left in the pot, or should I make more?',
      options: [
        { text: 'Is there', correct: true, rationale: 'Câu hỏi với danh từ không đếm được "coffee" bắt đầu bằng "Is there".' },
        { text: 'Are there', correct: false, rationale: '"coffee" không đếm được nên không dùng Are there.' },
        { text: 'Does there', correct: false, rationale: 'Không dùng trợ động từ Does với There trong cấu trúc tồn tại.' },
      ],
      acceptedAnswers: [{ text: 'Is there', rationale: 'Is there dùng trong câu hỏi với danh từ không đếm được.' }],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q3',
      kind: 'choice',
      prompt: 'I checked the envelope, but there ___ any letter inside.',
      options: [
        { text: 'isn\'t', correct: true, rationale: 'Phủ định với "any letter" (danh từ số ít) dùng "isn\'t".' },
        { text: 'aren\'t', correct: false, rationale: '"letter" là danh từ số ít, không dùng aren\'t.' },
        { text: 'not is', correct: false, rationale: 'Sai trật tự phủ định.' },
      ],
      acceptedAnswers: [{ text: "isn't", rationale: "isn't là dạng phủ định đúng với danh từ số ít." }],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q4',
      kind: 'choice',
      prompt: 'Look! ___ a lovely rainbow in the eastern sky.',
      options: [
        { text: 'There\'s', correct: true, rationale: 'Dạng viết tắt của "There is" trước danh từ số ít "a lovely rainbow".' },
        { text: 'There\'re', correct: false, rationale: 'Viết tắt "There\'re" không dùng cho số ít.' },
        { text: 'They\'re', correct: false, rationale: '"They\'re" là viết tắt của they are, sai ngữ nghĩa.' },
      ],
      acceptedAnswers: [{ text: "There's", rationale: "There's là dạng viết tắt của There is." }],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q5',
      kind: 'gap',
      prompt: 'There ___ some orange juice in the glass on the table.',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Orange juice là danh từ không đếm được nên động từ to be chia ở số ít "is".' },
        { text: "'s", rationale: 'Dạng rút gọn của is sau There.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q6',
      kind: 'gap',
      prompt: '___ there an elevator in this apartment building?',
      options: [],
      acceptedAnswers: [
        { text: 'Is', rationale: 'Câu hỏi đảo "Is" lên trước "there" đối với danh từ số ít an elevator.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q7',
      kind: 'gap',
      prompt: 'There is ___ ATM right next to the supermarket entrance.',
      options: [],
      acceptedAnswers: [
        { text: 'an', rationale: 'ATM is pronounced with an initial vowel sound /eɪ/, so it takes an.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q8',
      kind: 'gap',
      prompt: 'There ___ not enough sugar to bake the cake today.',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Sugar là danh từ không đếm được nên dùng "is not".' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định: "There is a balcony in our hotel room."',
      options: [],
      acceptedAnswers: [
        { text: "There isn't a balcony in our hotel room.", rationale: "Phủ định bằng There isn't." },
        { text: 'There is not a balcony in our hotel room.', rationale: 'Phủ định đầy đủ There is not.' },
        { text: 'There is no balcony in our hotel room.', rationale: 'Phủ định bằng There is no balcony.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi Yes/No: "There is free parking behind the building."',
      options: [],
      acceptedAnswers: [
        { text: 'Is there free parking behind the building?', rationale: 'Đảo Is lên trước there để tạo câu hỏi.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu mô tả sau: "In my bedroom has a big window."',
      options: [],
      acceptedAnswers: [
        { text: 'There is a big window in my bedroom.', rationale: 'Dùng There is để diễn đạt sự tồn tại thay vì has.' },
        { text: 'In my bedroom there is a big window.', rationale: 'Đổi has thành there is.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu hỏi sau: "Does there a swimming pool in this resort?"',
      options: [],
      acceptedAnswers: [
        { text: 'Is there a swimming pool in this resort?', rationale: 'Cấu trúc câu hỏi tồn tại dùng Is there, không dùng Does there.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-there-is-03-r1',
      kind: 'choice',
      prompt: 'Chọn câu trả lời đúng khi khách du lịch hỏi: "Excuse me, is there a tourist information desk here?"',
      options: [
        { text: 'Yes, there is. It\'s on your left.', correct: true, rationale: 'Câu trả lời khẳng định ngắn đúng chuẩn là "Yes, there is."' },
        { text: 'Yes, it is there desk.', correct: false, rationale: 'Sai cấu trúc ngữ pháp.' },
        { text: 'Yes, there have.', correct: false, rationale: 'Không dùng "there have" trong câu trả lời ngắn cho câu hỏi Is there.' },
      ],
      acceptedAnswers: [{ text: "Yes, there is. It's on your left.", rationale: "Câu trả lời đúng ngữ pháp chuẩn." }],
    },
    {
      id: 'grammar-v2-a1-there-is-03-r2',
      kind: 'gap',
      prompt: 'Hoàn thành câu: "Don\'t worry, ___ is plenty of time before the train leaves."',
      options: [],
      acceptedAnswers: [
        { text: 'there', rationale: 'Cụm từ "there is" chỉ sự tồn tại của thời gian (time).' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau dùng cấu trúc "There is": "This neighborhood has a peaceful park." -> "___ in this neighborhood."',
      options: [],
      acceptedAnswers: [
        { text: 'There is a peaceful park in this neighborhood.', rationale: 'Chuyển cấu trúc has thành There is.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-r4',
      kind: 'correction',
      prompt: 'Sửa từ sai trong câu: "There are much traffic on the highway this morning."',
      options: [],
      acceptedAnswers: [
        { text: 'is', rationale: 'Traffic là danh từ không đếm được nên phải dùng There is thay vì There are.' },
        { text: 'There is much traffic on the highway this morning.', rationale: 'Câu hoàn chỉnh sửa are thành is.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-there-is-03-o1',
      prompt: 'Viết 3 câu miêu tả căn phòng ngủ hoặc phòng làm việc của bạn, sử dụng cấu trúc There is với: 1 danh từ đếm được số ít, 1 danh từ không đếm được, và 1 câu phủ định (There isn\'t).',
      modelAnswer: 'There is a wooden desk next to the window. There is plenty of natural light in the room during the day. However, there isn\'t an air conditioner in here.',
      checks: [
        'Sử dụng There is + a/an với danh từ đếm được số ít',
        'Sử dụng There is với danh từ không đếm được (light, space, water)',
        'Sử dụng đúng thể phủ định There isn\'t',
      ],
    },
    {
      id: 'grammar-v2-a1-there-is-03-o2',
      prompt: 'Đóng vai nhân viên lễ tân trả lời khách hàng hỏi về tiện nghi khách sạn. Viết 3 câu ngắn sử dụng "Is there...?", "There is...", và "There isn\'t...".',
      modelAnswer: 'Guest: Is there a fitness center in the hotel?\nReceptionist: Yes, there is a modern gym on the third floor. However, there isn\'t a sauna available at the moment.',
      checks: [
        'Sử dụng đúng cấu trúc câu hỏi Is there...?',
        'Sử dụng câu trả lời khẳng định với There is',
        'Sử dụng câu trả lời phủ định với There isn\'t',
      ],
    },
  ],
  sources: [
    {
      "id": "there",
      "title": "British Council: Using there is and there are",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/using-there-there-are",
      "claims": [
        "There is takes singular or uncountable nouns and there are takes plural nouns, with corresponding negative and question forms."
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
