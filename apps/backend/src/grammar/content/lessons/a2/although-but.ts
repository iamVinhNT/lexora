/**
 * @file although-but.ts
 * @description A2 lesson on conjunctions 'although' and 'but' expressing contrast and concession.
 */
import type { GrammarLesson } from '../../types.js';

const althoughButLesson: GrammarLesson = {
  id: 'grammar-v2-a2-although-but-28',
  revisionId: 'grammar-v2-a2-although-but-28@1.0.0',
  revision: '1.0.0',
  title: 'Liên từ Although và But chỉ sự tương phản (Although and But for Contrast)',
  objective: 'Hiểu và sử dụng although cho mệnh đề nhượng bộ và but để nối hai mệnh đề tương phản; không ghép chúng để đánh dấu cùng một quan hệ nhượng bộ.',
  prerequisiteIds: ['grammar-v2-a2-because-so-27'],
  coverage: ['although-but', 'conjunctions', 'contrast', 'concession', 'clauses'],
  context: {
    english: 'We use the conjunctions "although" and "but" to connect contrasting or surprising facts. While "but" coordinates two main clauses, "although" introduces a subordinate concessive clause.',
    vietnamese: 'Chúng ta sử dụng các liên từ "although" và "but" để kết nối hai thông tin mang tính tương phản hoặc bất ngờ. Trong khi "but" nối hai mệnh đề độc lập, "although" dẫn dắt một mệnh đề phụ nhượng bộ.',
  },
  guide: {
    pattern: 'Main clause + although + Concessive clause | Although + Concessive clause, Main clause | Clause 1, but + Clause 2',
    whenToUse: [
      'Dùng "although" (hoặc "even though") để bắt đầu mệnh đề nhượng bộ: sự việc ở mệnh đề chính vẫn xảy ra dù có trở ngại (Although it was cold, we swam in the sea).',
      'Mệnh đề "although" có thể đứng đầu câu (có dấu phẩy trước mệnh đề chính) hoặc đứng ở cuối câu (không cần dấu phẩy).',
      'Dùng "but" để nối hai mệnh đề tương phản trong câu ghép, đứng sau dấu phẩy (He studied very hard, but he failed the exam).',
      'Không ghép although-clause với but để nối cùng một cặp ý tương phản trong tiếng Anh chuẩn (Although..., S + V; hoặc S + V, but S + V).',
    ],
    signalWords: ['although', 'even though', 'though', 'but', 'contrast', 'however', 'despite the fact that'],
    check: [
      'Không dùng although và but cùng đánh dấu một quan hệ nhượng bộ/tương phản: chọn Although S + V, S + V hoặc S + V, but S + V.',
      'Khi mệnh đề Although đứng đầu câu, bắt buộc phải có dấu phẩy ở giữa: Although S + V, S + V.',
      'Trước liên từ "but" nối hai mệnh đề độc lập phải có dấu phẩy: S + V, but S + V.',
      'Sau although luôn luôn là một mệnh đề hoàn chỉnh gồm chủ ngữ và vị ngữ (chủ ngữ + động từ).',
    ],
  },
  explanation: 'Although là liên từ phụ thuộc dẫn dắt mệnh đề nhượng bộ; but là liên từ kết hợp nối hai mệnh đề độc lập tương phản. Với cùng một cặp ý, chọn một cấu trúc: Although the tickets were expensive, they bought them, hoặc The tickets were expensive, but they bought them. Tránh đặt but trong mệnh đề chính để lặp lại quan hệ mà although đã đánh dấu; although và but vẫn có thể cùng xuất hiện trong một câu nếu chúng nối các quan hệ/mệnh đề khác nhau. Dùng dấu phẩy sau mệnh đề although đứng đầu câu và trước but nối hai mệnh đề độc lập.',
  examples: [
    {
      english: 'Although the weather was freezing, the children played happily in the park.',
      vietnamese: 'Mặc dù thời tiết băng giá, những đứa trẻ vẫn chơi đùa vui vẻ trong công viên.',
    },
    {
      english: 'Nam was feeling quite tired, but he still stayed up to help his sister with her homework.',
      vietnamese: 'Nam cảm thấy khá mệt mỏi, nhưng anh ấy vẫn thức khuya để giúp em gái làm bài tập về nhà.',
    },
    {
      english: 'She decided to accept the job offer although the salary was slightly lower than expected.',
      vietnamese: 'Cô ấy đã quyết định nhận lời mời làm việc mặc dù mức lương thấp hơn đôi chút so với kỳ vọng.',
    },
    {
      english: 'This second-hand smartphone is quite old, but it still runs all basic apps smoothly.',
      vietnamese: 'Chiếc điện thoại cũ này khá cũ kỹ rồi, nhưng nó vẫn chạy mượt mà mọi ứng dụng cơ bản.',
    },
    {
      english: 'Although they arrived at the cinema late, they did not miss the start of the movie.',
      vietnamese: 'Mặc dù họ đến rạp chiếu phim muộn, họ đã không bỏ lỡ phần mở đầu của bộ phim.',
    },
    {
      english: 'The hotel room had a fantastic ocean view, but the air conditioner was broken.',
      vietnamese: 'Căn phòng khách sạn có tầm nhìn hướng biển tuyệt đẹp, nhưng máy điều hòa lại bị hỏng.',
    },
  ],
  contrasts: [
    {
      form: 'Although Mr. Brown is over seventy years old, he still jogs five kilometers every morning.',
      whyFits: 'Sử dụng liên từ although ở đầu câu nhượng bộ, có dấu phẩy trước mệnh đề chính, không dùng thừa but.',
      whyNot: 'Dùng although và but cùng đánh dấu quan hệ nhượng bộ này là lặp liên từ trong tiếng Anh chuẩn.',
    },
    {
      form: 'She practiced speaking every day, but she still felt nervous before the presentation.',
      whyFits: 'Liên từ but đứng sau dấu phẩy nối hai mệnh đề độc lập chỉ sự tương phản tâm lý.',
      whyNot: '"She practiced speaking every day, although she still felt nervous..." sai logic vì although phải đi với vế rào cản/nỗ lực, không đi với vế kết quả.',
    },
  ],
  commonMistakes: [
    'Ghép although và but để cùng nối một cặp ý nhượng bộ/tương phản ("Although he was sick, but he went to school") thay vì chọn một cấu trúc.',
    'Quên dấu phẩy khi mệnh đề Although đứng đầu câu (viết "Although it rained we went out").',
    'Đặt mệnh đề Although vào sai vế làm đảo lộn ý nghĩa logic của câu.',
  ],
  summary: 'Dùng although + mệnh đề nhượng bộ hoặc mệnh đề 1, but + mệnh đề 2 để nối cùng cặp ý; không ghép although và but để đánh dấu cùng một quan hệ.',
  exercises: [
    {
      id: 'grammar-v2-a2-although-but-28-q1',
      kind: 'choice',
      prompt: 'Select the correct conjunction: "___ it was raining heavily, the football team continued their training session."',
      options: [
        { text: 'Although', correct: true, rationale: 'Although đứng đầu mệnh đề nhượng bộ chỉ trở ngại thời tiết mưa to, có dấu phẩy ngăn cách mệnh đề chính.' },
        { text: 'But', correct: false, rationale: 'But là liên từ kết hợp, không đứng đầu câu để mở mệnh đề nhượng bộ trong ngữ cảnh này.' },
        { text: 'Because', correct: false, rationale: 'Because chỉ nguyên nhân, trái ngược hoàn toàn về nghĩa với việc tiếp tục tập luyện dưới mưa.' },
        { text: 'So', correct: false, rationale: 'So chỉ kết quả, không đứng đầu mệnh đề này.' },
      ],
      acceptedAnswers: [{ text: 'Although', rationale: 'Although introduces the concessive clause showing the obstacle.' }],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q2',
      kind: 'choice',
      prompt: 'Select the correct conjunction: "The apartment is quite small, ___ it is located in a very convenient neighborhood."',
      options: [
        { text: 'but', correct: true, rationale: 'Sau dấu phẩy, dùng but để nối hai ý tương phản (căn hộ nhỏ nhưng vị trí thuận tiện).' },
        { text: 'although', correct: false, rationale: 'Không dùng although sau dấu phẩy để nối hai mệnh đề tương phản theo mẫu coordinate này.' },
        { text: 'so', correct: false, rationale: 'So chỉ kết quả, không phản ánh sự đối lập.' },
        { text: 'because', correct: false, rationale: 'Because chỉ nguyên nhân, không phù hợp quan hệ tương phản.' },
      ],
      acceptedAnswers: [{ text: 'but', rationale: 'But coordinates two contrasting statements after a comma.' }],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q3',
      kind: 'choice',
      prompt: 'Choose the sentence that is grammatically correct:',
      options: [
        { text: 'Although she was exhausted, she finished the report on time.', correct: true, rationale: 'Mệnh đề Although ở đầu câu có dấu phẩy và không có liên từ but ở mệnh đề chính.' },
        { text: 'Although she was exhausted, but she finished the report on time.', correct: false, rationale: 'Lỗi sai phổ biến: dùng thừa cả although và but trong cùng một câu.' },
        { text: 'She was exhausted although, she finished the report on time.', correct: false, rationale: 'Sai vị trí của although và đặt dấu phẩy sai.' },
        { text: 'Because she was exhausted, but she finished the report on time.', correct: false, rationale: 'Sai cả liên từ nguyên nhân lẫn liên từ kết hợp.' },
      ],
      acceptedAnswers: [{ text: 'Although she was exhausted, she finished the report on time.', rationale: 'Correct sentence with single concessive conjunction Although and comma.' }],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q4',
      kind: 'choice',
      prompt: 'Choose the correct form: "He bought that expensive jacket ___ he did not really have enough money."',
      options: [
        { text: 'although', correct: true, rationale: 'Although đứng trước mệnh đề nhượng bộ ở vế sau của câu.' },
        { text: 'but', correct: false, rationale: 'But cần đứng trước mệnh đề đối lập sau dấu phẩy, không nối câu theo cách này khi không có dấu phẩy.' },
        { text: 'because', correct: false, rationale: 'Because chỉ nguyên nhân, việc không đủ tiền không phải lý do để mua áo đắt tiền.' },
        { text: 'so', correct: false, rationale: 'So chỉ kết quả, không hợp logic.' },
      ],
      acceptedAnswers: [{ text: 'although', rationale: 'Although introduces the subordinate concessive clause at the end of the sentence.' }],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "Although" or "But": "_____ the exam was very difficult, all students in our class passed it."',
      options: [],
      acceptedAnswers: [
        { text: 'Although', rationale: 'Capitalized Although introduces the concessive clause at the beginning of the sentence.' },
        { text: 'Even though', rationale: 'Even though is also accepted as an emphatic variant.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with "although" or "but": "He wanted to buy the vintage motorcycle, _____ he could not afford the high price."',
      options: [],
      acceptedAnswers: [
        { text: 'but', rationale: 'Coordinating conjunction but follows a comma to express contrast.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with "although" or "but": "She decided to go for a run _____ she was feeling a little bit tired."',
      options: [],
      acceptedAnswers: [
        { text: 'although', rationale: 'Subordinating conjunction although introduces the concession clause.' },
        { text: 'though', rationale: 'Informal variant though is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with "although" or "but": "The food at the new bistro tasted delicious, _____ the service was very slow."',
      options: [],
      acceptedAnswers: [
        { text: 'but', rationale: 'Follows a comma to present a contrasting drawback.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q9',
      kind: 'transform',
      prompt: 'Rewrite using "Although" at the beginning of the sentence: "The book was quite long, but Minh finished reading it in two days."',
      options: [],
      acceptedAnswers: [
        { text: 'Although the book was quite long, Minh finished reading it in two days.', rationale: 'Converts compound sentence into complex sentence starting with Although and comma.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q10',
      kind: 'transform',
      prompt: 'Rewrite using "but": "Although she was nervous about the interview, she answered all questions with confidence."',
      options: [],
      acceptedAnswers: [
        { text: 'She was nervous about the interview, but she answered all questions with confidence.', rationale: 'Converts Although sentence into compound sentence with comma and but.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Although he woke up early, but he still missed the morning express train."',
      options: [],
      acceptedAnswers: [
        { text: 'Although he woke up early, he still missed the morning express train.', rationale: 'Removes redundant coordinating conjunction but from the main clause.' },
        { text: 'He woke up early, but he still missed the morning express train.', rationale: 'Alternative correction keeping but and removing Although is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Although the weather was very stormy we decided to drive to the beach."',
      options: [],
      acceptedAnswers: [
        { text: 'Although the weather was very stormy, we decided to drive to the beach.', rationale: 'Adds the required comma between the sentence-initial Although clause and the main clause.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-although-but-28-r1',
      kind: 'choice',
      prompt: 'Choose the correct sentence: "Which sentence expresses contrast accurately without grammatical redundancy?"',
      options: [
        { text: 'Although the traffic was congested, they arrived at the airport on time.', correct: true, rationale: 'Cấu trúc chuẩn xác với Although ở đầu câu, có dấu phẩy và không dùng but.' },
        { text: 'Although the traffic was congested, but they arrived at the airport on time.', correct: false, rationale: 'Sai vì dùng thừa cả although và but.' },
        { text: 'The traffic was congested although, they arrived at the airport on time.', correct: false, rationale: 'Sai vị trí đặt liên từ although.' },
      ],
      acceptedAnswers: [{ text: 'Although the traffic was congested, they arrived at the airport on time.', rationale: 'Accurate complex sentence with initial Although clause.' }],
    },
    {
      id: 'grammar-v2-a2-although-but-28-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with "although" or "but": "The hotel was very cheap, _____ the bedroom was remarkably clean and comfortable."',
      options: [],
      acceptedAnswers: [
        { text: 'but', rationale: 'Follows a comma to link contrasting positive qualities.' },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-r3',
      kind: 'transform',
      prompt: 'Rewrite using "although": "He has lived in London for five years, but he cannot speak English fluently."',
      options: [],
      acceptedAnswers: [
        { text: 'Although he has lived in London for five years, he cannot speak English fluently.', rationale: 'Rewrites compound sentence into complex sentence with Although at start.' },
        { text: "Although he has lived in London for five years, he can't speak English fluently.", rationale: "Contraction can't is accepted." },
        { text: 'He cannot speak English fluently although he has lived in London for five years.', rationale: 'Variant placing although clause second is accepted.' },
        { text: "He can't speak English fluently although he has lived in London for five years.", rationale: "Contraction can't with although clause second is accepted." },
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-r4',
      kind: 'correction',
      prompt: 'Correct the error: "Although she studied hard for two months, but she did not get the certificate."',
      options: [],
      acceptedAnswers: [
        { text: 'Although she studied hard for two months, she did not get the certificate.', rationale: 'Removes redundant but from the main clause.' },
        { text: "Although she studied hard for two months, she didn't get the certificate.", rationale: "Contraction didn't is accepted." },
        { text: 'She studied hard for two months, but she did not get the certificate.', rationale: 'Alternative rewrite keeping but is accepted.' },
        { text: "She studied hard for two months, but she didn't get the certificate.", rationale: "Contraction didn't with but is accepted." },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-although-but-28-o1',
      prompt: 'Viết 2 câu kể về một chuyến du lịch có sự việc bất ngờ, một câu dùng "although" ở đầu câu và câu còn lại dùng "but" nối hai mệnh đề.',
      modelAnswer: 'Although it rained heavily during our weekend trip to Da Lat, we still visited several beautiful flower gardens. The hotel service was quite slow, but the staff were extremely polite and helpful.',
      checks: [
        'Một câu sử dụng Although ở đầu câu kèm dấu phẩy phân tách mệnh đề chính.',
        'Một câu sử dụng liên từ but (sau dấu phẩy) nối hai ý tương phản.',
        'Không dùng although và but cùng đánh dấu một quan hệ nhượng bộ/tương phản; với cùng cặp ý, chọn một cấu trúc.',
      ],
    },
    {
      id: 'grammar-v2-a2-although-but-28-o2',
      prompt: 'Viết 2 câu chia sẻ về trải nghiệm học một kỹ năng mới (nấu ăn, thể thao hoặc ngoại ngữ), sử dụng "although" và "but" để miêu tả khó khăn ban đầu và sự kiên trì của bạn.',
      modelAnswer: 'Although learning English pronunciation was challenging at first, I practiced listening every morning. I made many mistakes in the beginning, but my confidence improved steadily over time.',
      checks: [
        'Dùng đúng liên từ although thể hiện sự nhượng bộ trước khó khăn.',
        'Dùng đúng liên từ but chỉ kết quả kiên trì tích cực.',
        'Ngữ pháp chuẩn xác, câu văn gãy gọn và tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-although-but',
      title: 'Cambridge Dictionary: Conjunctions – although, but',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/although-and-though',
      claims: [
        'Although is a subordinating conjunction introducing a concessive clause.',
        'But is a coordinating conjunction linking two contrasting main clauses.',
        'Using both although and but to mark the same concessive contrast is generally avoided in standard English.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'Final review A2 curriculum.A2 audit west',
    reviewedAt: '2026-10-06T05:54:31Z',
  },
};

export default althoughButLesson;
