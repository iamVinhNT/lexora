/**
 * @file there-are.ts
 * @description A1 there-are lesson definition: expressing existence and quantity of plural nouns.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-a1-there-are-04',
  revisionId: 'grammar-v2-a1-there-are-04@1.0.0',
  revision: '1.0.0',
  title: 'Cấu trúc There are: Sự tồn tại của danh từ số nhiều',
  objective: 'Sử dụng thành thạo cấu trúc There are ở thể khẳng định, phủ định và câu hỏi kết hợp với các từ chỉ số lượng (some, any, many, con số) để miêu tả sự tồn tại của danh từ số nhiều.',
  prerequisiteIds: ['grammar-v2-a1-there-is-03'],
  coverage: ['there-are', 'existential-there', 'plural'],
  context: {
    english: 'In our town park, there are many tall trees and there are three small lakes. On weekends, there are lots of children playing sports.',
    vietnamese: 'Trong công viên thị trấn của chúng tôi, có nhiều cây cao và có ba hồ nước nhỏ. Vào cuối tuần, có rất nhiều trẻ em chơi thể thao.',
  },
  guide: {
    pattern: 'Khẳng định: There are + number/some/many + plural noun | Phủ định: There aren’t + any + plural noun | Nghi vấn: Are there + any + plural noun? | Số lượng: How many + plural noun + are there?',
    whenToUse: [
      'Miêu tả sự hiện diện của từ hai người hoặc hai đồ vật trở lên ở một địa điểm',
      'Liệt kê danh sách các tiện ích, sản phẩm hoặc thành viên trong nhóm',
      'Hỏi về số lượng hoặc sự có mặt của danh từ số nhiều',
    ],
    signalWords: ['some', 'any', 'many', 'a lot of', 'how many', 'several', 'in the park'],
    check: [
      'Dùng There are với danh từ số nhiều có quy tắc (-s, -es) và bất quy tắc (people, children, men)',
      'Thường dùng some trong câu khẳng định và any trong phủ định/câu hỏi thông tin; some cũng dùng trong lời mời, đề nghị hoặc khi mong đợi câu trả lời đồng ý',
      'Phủ định dùng There are not hoặc There aren\'t',
      'Nghi vấn đảo Are lên đầu: Are there any seats left? -> Yes, there are. / No, there aren\'t.',
      'Câu hỏi số lượng bắt đầu bằng: How many + danh từ số nhiều + are there?',
    ],
  },
  explanation: 'Cấu trúc "There are" được sử dụng khi đối tượng được nói đến ở vị trí sau là danh từ số nhiều (plural noun). Trong câu khẳng định, ta có thể dùng các số đếm cụ thể (two, five, ten) hoặc các từ chỉ lượng không xác định như "some" (một vài), "many" (nhiều), "a lot of" (rất nhiều), ví dụ: "There are some books on the shelf." Ở thể phủ định, ta thêm "not" vào sau are để tạo thành "There are not" hoặc "There aren\'t", thường kết hợp với "any" (không có... nào cả), ví dụ: "There aren\'t any tickets available." Trong câu hỏi nghi vấn Yes/No, ta đảo "Are" lên trước "there": "Are there any questions?" với câu trả lời ngắn là "Yes, there are." hoặc "No, there aren\'t." Để hỏi cụ thể về số lượng, ta dùng cấu trúc: "How many + danh từ số nhiều + are there...?". Lưu ý không viết tắt "There are" thành "There\'re" trong văn phong chuẩn mực.',
  examples: [
    { english: 'There are twenty students in my language class.', vietnamese: 'Có hai mươi học viên trong lớp học ngoại ngữ của tôi. (Dùng số đếm cụ thể twenty).' },
    { english: 'There are some beautiful flowers in the botanic garden.', vietnamese: 'Có vài bông hoa tuyệt đẹp trong vườn bách thảo. (Dùng some trong câu khẳng định).' },
    { english: 'There aren\'t any empty tables at this restaurant right now.', vietnamese: 'Không còn chiếc bàn trống nào ở nhà hàng này lúc này. (Phủ định với aren\'t any).' },
    { english: 'Are there any good coffee shops near your office?', vietnamese: 'Có quán cà phê nào ngon gần văn phòng bạn không? (Nghi vấn với Are there any).' },
    { english: 'How many parks are there in this city?', vietnamese: 'Có bao nhiêu công viên trong thành phố này? (Hỏi số lượng với How many).' },
    { english: 'There are several people waiting outside the theater.', vietnamese: 'Có một vài người đang đứng đợi bên ngoài nhà hát. (People là danh từ số nhiều bất quy tắc).' },
  ],
  contrasts: [
    {
      form: 'There are three banks on this street vs They are three banks on this street',
      whyFits: 'Dùng "There are" để nêu sự tồn tại của ba ngân hàng ở con phố này.',
      whyNot: '"They are" dùng đại từ thay thế cho đối tượng đã biết trước đó, không dùng để giới thiệu sự tồn tại ban đầu.',
    },
    {
      form: 'There are some pens on the desk vs There aren\'t some pens on the desk',
      whyFits: '"some" dùng tự nhiên trong câu khẳng định.',
      whyNot: 'Trong câu phủ định, "any" được dùng thay thế cho "some": "There aren\'t any pens on the desk".',
    },
  ],
  commonMistakes: [
    'Dùng There is với danh từ số nhiều: nói "There is three apples" thay vì "There are three apples".',
    'Dùng "some" trong câu phủ định: nói "There aren\'t some chairs" thay vì "There aren\'t any chairs".',
    'Quên dạng số nhiều của danh từ: nói "There are two car" thay vì "There are two cars".',
  ],
  summary: 'There are dùng với danh từ số nhiều. Thường dùng some trong câu khẳng định và any trong phủ định/câu hỏi thông tin; một số loại câu hỏi có thể dùng some. Hỏi số lượng: How many + danh từ số nhiều + are there?',
  exercises: [
    {
      id: 'grammar-v2-a1-there-are-04-q1',
      kind: 'choice',
      prompt: '___ three meeting rooms on the fourth floor of this office building.',
      options: [
        { text: 'There are', correct: true, rationale: '"three meeting rooms" là danh từ số nhiều nên dùng "There are".' },
        { text: 'There is', correct: false, rationale: '"There is" chỉ dùng cho danh từ số ít hoặc không đếm được.' },
        { text: 'They are have', correct: false, rationale: 'Cấu trúc sai ngữ pháp.' },
      ],
      acceptedAnswers: [{ text: 'There are', rationale: 'There are đi với danh từ số nhiều.' }],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q2',
      kind: 'choice',
      prompt: 'Are there ___ vegetarian options on the lunch menu?',
      options: [
        { text: 'any', correct: true, rationale: 'Trong câu hỏi nghi vấn với danh từ số nhiều, dùng "any".' },
        { text: 'some', correct: false, rationale: '"some" thường dùng trong khẳng định hoặc lời mời chào lịch sự.' },
        { text: 'a', correct: false, rationale: '"a" chỉ dùng cho danh từ số ít, không đi với options.' },
      ],
      acceptedAnswers: [{ text: 'any', rationale: 'Dùng any trong câu hỏi Are there any...?' }],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q3',
      kind: 'choice',
      prompt: 'We want to buy some souvenirs, but there ___ any shops open after 10 PM.',
      options: [
        { text: 'weren\'t', correct: false, rationale: 'Đây là câu ở hiện tại nên chưa dùng quá khứ.' },
        { text: 'aren\'t', correct: true, rationale: 'Phủ định hiện tại với danh từ số nhiều "shops" dùng "aren\'t".' },
        { text: 'isn\'t', correct: false, rationale: '"shops" là danh từ số nhiều nên không dùng isn\'t.' },
      ],
      acceptedAnswers: [{ text: "aren't", rationale: "Phủ định số nhiều hiện tại dùng aren't." }],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q4',
      kind: 'choice',
      prompt: '___ computers are there in the multimedia lab?',
      options: [
        { text: 'How many', correct: true, rationale: '"computers" là danh từ đếm được số nhiều nên hỏi số lượng dùng "How many".' },
        { text: 'How much', correct: false, rationale: '"How much" dùng cho danh từ không đếm được hoặc giá cả.' },
        { text: 'How long', correct: false, rationale: '"How long" hỏi về độ dài thời gian hoặc khoảng cách.' },
      ],
      acceptedAnswers: [{ text: 'How many', rationale: 'How many dùng để hỏi số lượng danh từ đếm được số nhiều.' }],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q5',
      kind: 'gap',
      prompt: 'There are ___ interesting books about world history in the school library.',
      options: [],
      acceptedAnswers: [
        { text: 'many', rationale: 'Dùng many để chỉ nhiều với danh từ số nhiều đếm được.' },
        { text: 'some', rationale: 'Dùng some để chỉ một vài/một số cuốn sách.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q6',
      kind: 'gap',
      prompt: '___ there any clean towels in the cabinet?',
      options: [],
      acceptedAnswers: [
        { text: 'Are', rationale: 'Towels là danh từ số nhiều nên câu hỏi bắt đầu bằng "Are".' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q7',
      kind: 'gap',
      prompt: 'There ___ several foreign tourists taking photos near the lake.',
      options: [],
      acceptedAnswers: [
        { text: 'are', rationale: 'Tourists là danh từ số nhiều nên đi với "are".' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q8',
      kind: 'gap',
      prompt: 'How many people ___ there in your immediate family?',
      options: [],
      acceptedAnswers: [
        { text: 'are', rationale: 'People là danh từ số nhiều nên động từ là "are" trong cấu trúc How many people are there.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q9',
      kind: 'transform',
      prompt: 'Chuyển câu sau sang thể phủ định dùng "any": "There are some mistakes in this draft."',
      options: [],
      acceptedAnswers: [
        { text: "There aren't any mistakes in this draft.", rationale: "Phủ định số nhiều đổi are thành aren't và some thành any." },
        { text: 'There are not any mistakes in this draft.', rationale: 'Dạng phủ định đầy đủ.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q10',
      kind: 'transform',
      prompt: 'Đặt câu hỏi số lượng với "How many" cho câu: "There are four chairs around the dining table."',
      options: [],
      acceptedAnswers: [
        { text: 'How many chairs are there around the dining table?', rationale: 'Dùng How many chairs are there để hỏi số lượng.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q11',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu sau: "There is many people at the bus stop."',
      options: [],
      acceptedAnswers: [
        { text: 'There are many people at the bus stop.', rationale: 'People là danh từ số nhiều nên dùng There are.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-q12',
      kind: 'correction',
      prompt: 'Sửa từ sai trong câu: "There aren\'t some pencils in the pencil case."',
      options: [],
      acceptedAnswers: [
        { text: 'any', rationale: 'Trong câu phủ định cần đổi some thành any.' },
        { text: "There aren't any pencils in the pencil case.", rationale: 'Câu hoàn chỉnh sau khi đổi some thành any.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a1-there-are-04-r1',
      kind: 'choice',
      prompt: 'Chọn câu thông báo đúng cho bảng hướng dẫn khách sạn:',
      options: [
        { text: 'There are two swimming pools available for all hotel guests.', correct: true, rationale: 'Two swimming pools là danh từ số nhiều, dùng There are.' },
        { text: 'There is two swimming pools available for all hotel guests.', correct: false, rationale: 'Sai vì dùng There is cho hai hồ bơi.' },
        { text: 'They are two swimming pools in this hotel for booking.', correct: false, rationale: 'Dùng sai đại từ They are thay cho cấu trúc tồn tại.' },
      ],
      acceptedAnswers: [{ text: 'There are two swimming pools available for all hotel guests.', rationale: 'There are đi với danh từ số nhiều.' }],
    },
    {
      id: 'grammar-v2-a1-there-are-04-r2',
      kind: 'gap',
      prompt: 'Hoàn thành hội thoại: A: "Are there any tickets left for tonight?" - B: "No, there ___ none left."',
      options: [],
      acceptedAnswers: [
        { text: 'are', rationale: 'Cấu trúc there are none left (hoặc there aren\'t any).' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-r3',
      kind: 'transform',
      prompt: 'Viết lại câu sau sang câu hỏi nghi vấn: "There are some direct flights to Da Nang today." -> "___?"',
      options: [],
      acceptedAnswers: [
        { text: 'Are there any direct flights to Da Nang today?', rationale: 'Đảo Are lên đầu và đổi some thành any trong câu hỏi.' },
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-r4',
      kind: 'correction',
      prompt: 'Sửa lỗi sai trong câu: "In our company there are forty employee."',
      options: [],
      acceptedAnswers: [
        { text: 'employees', rationale: 'Sau forty và There are danh từ phải ở dạng số nhiều employees.' },
        { text: 'In our company there are forty employees.', rationale: 'Câu hoàn chỉnh sau khi thêm s vào employee.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a1-there-are-04-o1',
      prompt: 'Viết 3 câu miêu tả khu phố hoặc tòa nhà nơi bạn sinh sống, sử dụng cấu trúc There are: 1 câu dùng số lượng cụ thể, 1 câu dùng "some/many", và 1 câu phủ định với "There aren\'t any".',
      modelAnswer: 'In my neighborhood, there are three small parks where children play in the afternoon. There are many delicious noodle shops along the main street. However, there aren\'t any cinema theaters near my house.',
      checks: [
        'Sử dụng There are với số lượng cụ thể và danh từ số nhiều',
        'Sử dụng There are với many/some',
        'Sử dụng đúng thể phủ định There aren\'t any + danh từ số nhiều',
      ],
    },
    {
      id: 'grammar-v2-a1-there-are-04-o2',
      prompt: 'Viết một đoạn hỏi đáp ngắn giữa bạn và đồng nghiệp về phòng họp công ty, gồm câu hỏi số lượng "How many... are there?" và câu trả lời đầy đủ.',
      modelAnswer: 'A: How many laptops are there in the conference room?\nB: There are five laptops ready on the table for the training session.\nA: Are there any extra power plugs?\nB: Yes, there are plenty of plugs along the wall.',
      checks: [
        'Sử dụng đúng cấu trúc How many + plural noun + are there?',
        'Câu trả lời sử dụng đúng There are + số lượng',
        'Có câu hỏi nghi vấn Are there any...?',
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
