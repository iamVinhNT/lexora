/**
 * @file past-simple-irregular.ts
 * @description Thì quá khứ đơn với động từ bất quy tắc thông dụng: bảng biến đổi, phủ định và nghi vấn với did.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-past-simple-irregular-19',
  revisionId: 'grammar-v2-a1-past-simple-irregular-19@1.0.0',
  revision: '1.0.0',
  title: 'Quá khứ đơn: Động từ bất quy tắc thông dụng',
  objective: 'Ghi nhớ và sử dụng chính xác các động từ bất quy tắc thông dụng (go → went, see → saw, buy → bought, have → had, eat → ate) trong câu khẳng định, phủ định (didn’t + V) và câu hỏi (Did + S + V?).',
  prerequisiteIds: ['grammar-v2-a1-past-simple-regular-18'],
  coverage: ['past-simple-irregular', 'past-simple', 'irregular-verbs', 'did-questions'],
  context: {
    english: 'Duong describes his trip to Hoi An ancient town last weekend: riding a bicycle, drinking herbal tea, seeing historic wooden bridges, and buying handmade souvenirs.',
    vietnamese: 'Dương miêu tả chuyến đi phố cổ Hội An cuối tuần trước: đi xe đạp, uống trà thảo mộc, ngắm những cây cầu gỗ cổ kính và mua quà lưu niệm thủ công.',
  },
  guide: {
    pattern: 'Khẳng định: S + V2 (bất quy tắc); Phủ định: S + didn’t + V(nguyên mẫu); Câu hỏi: Did + S + V(nguyên mẫu)...?',
    whenToUse: [
      'Diễn tả hành động đã diễn ra và kết thúc trong quá khứ khi động từ thuộc nhóm bất quy tắc (không thêm đuôi -ed).',
      'Kể lại trải nghiệm, chuyến đi hoặc những sự việc trong ngày đã qua.',
    ],
    signalWords: ['yesterday', 'last night', 'last weekend', 'two days ago', 'when I was young', 'in the past'],
    check: [
      'Động từ ở dạng khẳng định đã được chuyển sang cột quá khứ (V2) chưa? (Ví dụ: go → went, see → saw, buy → bought, have → had, make → made, eat → ate, take → took).',
      'Trong câu phủ định (didn’t) và câu hỏi (Did), động từ CHÍNH có bị nhầm lẫn dùng dạng V2 không? (Bắt buộc dùng dạng nguyên mẫu: didn’t go, KHÔNG DÙNG didn’t went).',
    ],
  },
  explanation: 'Các động từ bất quy tắc có dạng quá khứ riêng, không suy ra bằng cách thêm -ed: go → went, buy → bought, see → saw. Với các động từ thường trong bài, câu phủ định dùng didn’t + V nguyên mẫu và câu hỏi dùng Did + S + V nguyên mẫu. Không khái quát rằng mọi dạng bất quy tắc chỉ có trong khẳng định: be dùng was/were cả trong câu phủ định và câu hỏi (She wasn’t here; Were they late?). Câu hỏi chủ ngữ cũng có thể dùng dạng quá khứ trực tiếp (Who came?).',
  examples: [
    { english: 'We went to the night market in Hoi An yesterday evening.', vietnamese: 'Chúng tôi đã đi chợ đêm ở Hội An tối hôm qua. (Go chuyển thành went trong câu khẳng định).' },
    { english: 'Mai bought a beautiful handmade lantern for her mother.', vietnamese: 'Mai đã mua một chiếc đèn lồng thủ công xinh xắn cho mẹ cô. (Buy đổi thành bought).' },
    { english: 'I saw an old friend from secondary school at the train station.', vietnamese: 'Tôi đã nhìn thấy một người bạn cấp hai cũ tại nhà ga xe lửa. (See đổi thành saw).' },
    { english: 'They ate traditional noodle soup for breakfast two hours ago.', vietnamese: 'Họ đã ăn món bún truyền thống cho bữa sáng cách đây hai tiếng. (Eat đổi thành ate).' },
    { english: 'He didn’t have enough cash, so he used a credit card.', vietnamese: 'Anh ấy đã không có đủ tiền mặt, nên anh ấy đã dùng thẻ tín dụng. (Didn’t have giữ nguyên mẫu have).' },
    { english: 'Did you take any photographs of the ancient bridge? — Yes, I did.', vietnamese: 'Bạn có chụp bức ảnh nào về cây cầu cổ không? — Có, tôi đã chụp. (Did + take nguyên mẫu).' },
  ],
  contrasts: [
    {
      form: 'We went there vs We didn’t go there',
      whyFits: 'Went là dạng V2 dùng trong câu khẳng định; go là dạng nguyên mẫu bắt buộc sau trợ động từ phủ định didn’t.',
      whyNot: 'Câu "We didn’t went there" là lỗi nghiêm trọng do dùng V2 sau trợ động từ did.',
    },
    {
      form: 'She bought a book vs She buyed a book',
      whyFits: 'Buy là động từ bất quy tắc, dạng quá khứ chính xác là bought.',
      whyNot: 'Dạng "buyed" là lỗi suy diễn sai quy tắc thêm -ed vào động từ bất quy tắc.',
    },
  ],
  commonMistakes: [
    'Thêm -ed vào động từ bất quy tắc: “I goed to school yesterday” → Cần sửa thành “I went to school yesterday”.',
    'Dùng dạng V2 sau trợ động từ didn’t: “He didn’t saw the doctor” → Cần sửa thành “He didn’t see the doctor”.',
    'Nhầm lẫn giữa do và did trong câu hỏi quá khứ: “Do you went to bed early last night?” → Cần sửa thành “Did you go to bed early last night?”.',
  ],
  summary: 'Khẳng định dùng V2 bất quy tắc (go → went, buy → bought, see → saw, have → had). Phủ định và nghi vấn: didn’t / Did + V nguyên mẫu. Học thuộc lòng các cặp từ cốt lõi.',
  exercises: [
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q1',
      kind: 'choice',
      prompt: 'Yesterday, my family ___ to the beach and stayed there all afternoon.',
      options: [
        { text: 'went', correct: true, rationale: 'Went là dạng quá khứ đơn (V2) của động từ bất quy tắc go.' },
        { text: 'goed', correct: false, rationale: 'Go là động từ bất quy tắc, không có dạng goed.' },
        { text: 'goes', correct: false, rationale: 'Goes là thì hiện tại đơn ngôi thứ ba số ít.' },
      ],
      acceptedAnswers: [{ text: 'went', rationale: 'Went là dạng quá khứ đơn chuẩn xác của go.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q2',
      kind: 'choice',
      prompt: 'Huy ___ a new laptop last Friday for his graphic design course.',
      options: [
        { text: 'bought', correct: true, rationale: 'Bought là dạng quá khứ của buy.' },
        { text: 'buyed', correct: false, rationale: 'Buy là động từ bất quy tắc, không thêm -ed.' },
        { text: 'buys', correct: false, rationale: 'Buys là thì hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'bought', rationale: 'Bought là dạng V2 của buy.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q3',
      kind: 'choice',
      prompt: 'We ___ dinner at home last night because we were tired from traveling.',
      options: [
        { text: 'didn’t have', correct: true, rationale: 'Phủ định quá khứ đơn dùng didn’t + động từ nguyên mẫu have.' },
        { text: 'didn’t had', correct: false, rationale: 'Không dùng dạng quá khứ had sau trợ động từ didn’t.' },
        { text: 'not had', correct: false, rationale: 'Sai cấu trúc ngữ pháp; cần trợ động từ did.' },
      ],
      acceptedAnswers: [{ text: 'didn’t have', rationale: 'Didn’t have tuân thủ quy tắc phủ định quá khứ.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q4',
      kind: 'choice',
      prompt: 'Did you ___ your passport when you traveled to Thailand last summer?',
      options: [
        { text: 'lose', correct: true, rationale: 'Sau trợ động từ Did, động từ chính giữ nguyên mẫu lose.' },
        { text: 'lost', correct: false, rationale: 'Lost là dạng quá khứ, không dùng trực tiếp sau Did trong câu hỏi.' },
        { text: 'losing', correct: false, rationale: 'Losing là dạng V-ing.' },
      ],
      acceptedAnswers: [{ text: 'lose', rationale: 'Lose giữ nguyên mẫu trong câu hỏi với Did.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q5',
      kind: 'gap',
      prompt: 'Lan ___ (see) an interesting art exhibition yesterday afternoon.',
      options: [],
      acceptedAnswers: [
        { text: 'saw', rationale: 'Saw là dạng quá khứ đơn (V2) của see.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q6',
      kind: 'gap',
      prompt: 'They ___ (eat) traditional beef noodle soup for breakfast this morning.',
      options: [],
      acceptedAnswers: [
        { text: 'ate', rationale: 'Ate là dạng quá khứ đơn của eat.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q7',
      kind: 'gap',
      prompt: 'I ___ (not / take) any medicine yesterday because I felt fine.',
      options: [],
      acceptedAnswers: [
        { text: 'didn’t take', rationale: 'Phủ định quá khứ đơn: didn’t + take nguyên mẫu.' },
        { text: 'did not take', rationale: 'Dạng đầy đủ did not take hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q8',
      kind: 'gap',
      prompt: 'Did he ___ (come) to the office on time yesterday? (come / came)',
      options: [],
      acceptedAnswers: [
        { text: 'come', rationale: 'Sau Did, động từ giữ nguyên thể come.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q9',
      kind: 'transform',
      prompt: 'Chuyển cả câu sang quá khứ đơn, thêm yesterday ở cuối câu: "He makes a delicious cup of coffee."',
      options: [],
      acceptedAnswers: [
        { text: 'He made a delicious cup of coffee yesterday.', rationale: 'Makes đổi thành made ở thì quá khứ đơn và thêm yesterday.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q10',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định ở thì quá khứ đơn: "We went to the supermarket last night."',
      options: [],
      acceptedAnswers: [
        { text: 'We didn’t go to the supermarket last night.', rationale: 'Mượn didn’t và chuyển went về dạng nguyên mẫu go.' },
        { text: 'We did not go to the supermarket last night.', rationale: 'Dạng đầy đủ did not go cũng hoàn toàn chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "She didn’t went to the cinema with her friends yesterday."',
      options: [],
      acceptedAnswers: [
        { text: 'She didn’t go to the cinema with her friends yesterday.', rationale: 'Đổi went về dạng nguyên mẫu go sau trợ động từ didn’t.' },
        { text: 'She did not go to the cinema with her friends yesterday.', rationale: 'Dạng đầy đủ did not go cũng chính xác.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-q12',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "My father buyed a second-hand motorbike two days ago."',
      options: [],
      acceptedAnswers: [
        { text: 'My father bought a second-hand motorbike two days ago.', rationale: 'Buy là động từ bất quy tắc, dạng quá khứ đúng là bought.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-r1',
      kind: 'choice',
      prompt: 'An ___ a long letter to her pen pal in France last weekend.',
      options: [
        { text: 'wrote', correct: true, rationale: 'Wrote là dạng quá khứ của động từ bất quy tắc write.' },
        { text: 'writed', correct: false, rationale: 'Write là động từ bất quy tắc, không thêm -ed.' },
        { text: 'writes', correct: false, rationale: 'Writes là dạng hiện tại đơn.' },
      ],
      acceptedAnswers: [{ text: 'wrote', rationale: 'Wrote là dạng quá khứ đơn chuẩn của write.' }],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-r2',
      kind: 'gap',
      prompt: 'Chia give ở quá khứ đơn, chỉ nhập phần thiếu: "We ___ (give) our teacher a bouquet of flowers on Teachers’ Day last year."',
      options: [],
      acceptedAnswers: [
        { text: 'gave', rationale: 'Gave là dạng quá khứ đơn (V2) của give.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-r3',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang câu hỏi nghi vấn Yes/No: "You drank tea this morning."',
      options: [],
      acceptedAnswers: [
        { text: 'Did you drink tea this morning?', rationale: 'Đảo Did lên đầu câu và chuyển drank về nguyên mẫu drink.' },
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai duy nhất trong câu sau: "Did you saw the news on television last night?"',
      options: [],
      acceptedAnswers: [
        { text: 'Did you see the news on television last night?', rationale: 'Chuyển saw về dạng nguyên mẫu see sau trợ động từ Did.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-o1',
      prompt: 'Viết 4 câu kể về những việc bạn đã làm vào kỳ nghỉ hoặc cuối tuần trước, sử dụng ít nhất 3 động từ bất quy tắc khác nhau (ví dụ: went, bought, saw, ate, had, took).',
      modelAnswer: 'Last weekend, I went to an ancient pagoda near my hometown. I bought some fresh lotus flowers at the market. In the afternoon, I had lunch with my childhood friends. I took many memorable photos with them.',
      checks: [
        'Sử dụng ít nhất 3 động từ bất quy tắc ở dạng V2 đúng chính tả.',
        'Kể các hành động trong quá khứ có mốc thời gian rõ ràng (Last weekend, in the afternoon).',
        'Cấu trúc câu hoàn chỉnh và tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-a1-past-simple-irregular-19-o2',
      prompt: 'Viết 3-4 câu kể về một sự việc không diễn ra như dự định trong quá khứ, dùng ít nhất một câu phủ định với didn’t và ít nhất hai động từ bất quy tắc trong câu khẳng định.',
      modelAnswer: 'Yesterday, I wanted to cook dinner, but I didn’t have any vegetables in the fridge. I didn’t go to the supermarket because it rained heavily. So I ate some bread and drank a cup of warm milk.',
      checks: [
        'Có ít nhất 1 câu phủ định dùng didn’t + V nguyên mẫu (didn’t have, didn’t go).',
        'Có ít nhất 2 động từ bất quy tắc ở dạng quá khứ khẳng định (ate, drank).',
      ],
    },
  ],
  sources: [
    {
      "id": "past",
      "title": "British Council: Past simple",
      "url": "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-simple",
      "claims": [
        "Past simple uses regular -ed or irregular forms; did questions and did not negatives use the base verb."
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
