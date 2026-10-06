/**
 * @file because-so.ts
 * @description A2 lesson on coordinating and subordinating conjunctions 'because' and 'so' expressing reason and result.
 */
import type { GrammarLesson } from '../../types.js';

const becauseSoLesson: GrammarLesson = {
  id: 'grammar-v2-a2-because-so-27',
  revisionId: 'grammar-v2-a2-because-so-27@1.0.0',
  revision: '1.0.0',
  title: 'Liên từ Because và So chỉ nguyên nhân và kết quả (Because and So for Reason and Result)',
  objective: 'Sử dụng because để chỉ nguyên nhân và so để chỉ kết quả, đồng thời phân biệt cách ghép chúng cho cùng một cặp mệnh đề.',
  prerequisiteIds: ['grammar-v2-a2-infinitive-after-verbs-26'],
  coverage: ['because-so', 'conjunctions', 'reason-and-result', 'cause-and-effect', 'clauses'],
  context: {
    english: 'We use the conjunction "because" to explain the reason why something happens, and "so" to describe the result or effect of a situation.',
    vietnamese: 'Chúng ta sử dụng liên từ "because" để giải thích lý do vì sao một việc xảy ra (nguyên nhân), và "so" để miêu tả kết quả hoặc hệ quả của một tình huống.',
  },
  guide: {
    pattern: 'Result clause + because + Reason clause | Because + Reason clause, Result clause | Reason clause, so + Result clause',
    whenToUse: [
      'Dùng "because" đứng trước mệnh đề chỉ nguyên nhân hoặc lý do (She wore a coat because it was freezing).',
      'Mệnh đề "because" có thể đứng ở đầu câu, khi đó bắt buộc dùng dấu phẩy ngăn cách trước mệnh đề chính (Because it was freezing, she wore a coat).',
      'Dùng "so" đứng trước mệnh đề chỉ kết quả hoặc hành động phát sinh, có dấu phẩy đặt trước "so" (It was freezing, so she wore a coat).',
      'Với cùng một cặp nguyên nhân-kết quả, chọn because hoặc so thay vì dùng cả hai để nối chính cặp đó.',
    ],
    signalWords: ['because', 'so', 'reason', 'result', 'why', 'therefore', 'consequence'],
    check: [
      'Sau "because" là nguyên nhân; sau "so" là kết quả (Because [nguyên nhân] -> [kết quả]; [nguyên nhân], so [kết quả]).',
      'Tránh dùng because và so cùng đánh dấu một cặp nguyên nhân-kết quả; dùng because [nguyên nhân] hoặc [nguyên nhân], so [kết quả].',
      'Khi mệnh đề Because đứng đầu câu, phải có dấu phẩy ngăn cách ở giữa câu.',
      'Trước liên từ "so" nối hai mệnh đề độc lập thường có dấu phẩy (clause 1, so clause 2).',
    ],
  },
  explanation: 'Because là liên từ phụ thuộc dẫn dắt mệnh đề chỉ nguyên nhân; so là liên từ kết hợp dẫn dắt mệnh đề chỉ kết quả. Với cùng một cặp ý, chọn một cấu trúc: He missed the bus because his alarm did not go off, hoặc His alarm did not go off, so he missed the bus. Tránh đặt cả because và so để cùng nối một quan hệ nguyên nhân-kết quả; chúng có thể cùng xuất hiện nếu phục vụ các quan hệ mệnh đề khác nhau.',
  examples: [
    {
      english: 'We stayed at home all day yesterday because the weather was terribly stormy.',
      vietnamese: 'Chúng tôi đã ở nhà cả ngày hôm qua vì thời tiết có bão khủng khiếp.',
    },
    {
      english: 'Because Lan practiced speaking English every day, she passed the interview easily.',
      vietnamese: 'Vì Lan đã luyện nói tiếng Anh mỗi ngày, cô ấy đã vượt qua buổi phỏng vấn một cách dễ dàng.',
    },
    {
      english: 'The flight was delayed by two hours, so we had coffee at the airport lounge.',
      vietnamese: 'Chuyến bay bị hoãn hai tiếng, vì vậy chúng tôi đã uống cà phê tại phòng chờ sân bay.',
    },
    {
      english: 'Minh felt very exhausted after the football match, so he went to bed early.',
      vietnamese: 'Minh cảm thấy rất kiệt sức sau trận bóng đá, cho nên anh ấy đã đi ngủ sớm.',
    },
    {
      english: 'I bought this compact laptop because I need to travel frequently for business.',
      vietnamese: 'Tôi đã mua chiếc máy tính xách tay nhỏ gọn này vì tôi cần phải đi công tác thường xuyên.',
    },
    {
      english: 'The central supermarket was closed for renovation, so we bought groceries at the local market.',
      vietnamese: 'Siêu thị trung tâm đã đóng cửa để sửa chữa, cho nên chúng tôi đã mua thực phẩm ở chợ địa phương.',
    },
  ],
  contrasts: [
    {
      form: 'Because the roads were flooded, we could not drive to work.',
      whyFits: 'Dùng một liên từ because ở đầu mệnh đề nguyên nhân, có dấu phẩy ngăn cách mệnh đề kết quả.',
      whyNot: '"Because the roads were flooded, so we could not..." sai nghiêm trọng do dùng thừa cả because và so trong một câu.',
    },
    {
      form: 'The laptop was very expensive, so I decided not to buy it.',
      whyFits: 'So đứng trước mệnh đề kết quả sau dấu phẩy, nêu rõ hệ quả của việc máy tính đắt tiền.',
      whyNot: '"The laptop was very expensive because I decided..." sai ngữ nghĩa hoàn toàn vì đảo ngược nguyên nhân và kết quả.',
    },
  ],
  commonMistakes: [
    'Khi nối cùng một cặp nguyên nhân-kết quả, không dùng cả because và so (ví dụ: "Because it was raining, so we stayed home").',
    'Đảo ngược vị trí nguyên nhân và kết quả (viết "It rained because I took an umbrella" thay vì "I took an umbrella because it rained").',
    'Quên dấu phẩy khi mệnh đề Because đứng đầu câu (viết "Because he was ill he stayed in bed").',
  ],
  summary: 'Dùng because + nguyên nhân; dùng ", so" + kết quả. Có thể đặt Because ở đầu câu (kèm dấu phẩy). Với cùng một cặp nguyên nhân-kết quả, chọn một liên từ, không ghép cả because và so.',
  exercises: [
    {
      id: 'grammar-v2-a2-because-so-27-q1',
      kind: 'choice',
      prompt: 'Select the correct conjunction: "She wore a thick woolen scarf ___ the winter wind was extremely cold."',
      options: [
        { text: 'because', correct: true, rationale: 'Vế sau là nguyên nhân (gió mùa đông rất lạnh), dùng because.' },
        { text: 'so', correct: false, rationale: 'So chỉ kết quả, không đứng trước nguyên nhân.' },
        { text: 'so that', correct: false, rationale: 'So that chỉ mục đích, không hợp nghĩa.' },
        { text: 'although', correct: false, rationale: 'Although chỉ sự tương phản, không phù hợp quan hệ nhân quả ở đây.' },
      ],
      acceptedAnswers: [{ text: 'because', rationale: 'Because introduces the reason why she wore a scarf.' }],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q2',
      kind: 'choice',
      prompt: 'Select the correct conjunction: "The alarm clock did not ring this morning, ___ Nam arrived at school late."',
      options: [
        { text: 'so', correct: true, rationale: 'Vế sau là kết quả (Nam đến trường muộn), có dấu phẩy đứng trước so.' },
        { text: 'because', correct: false, rationale: 'Because dẫn dắt nguyên nhân, không đứng trước mệnh đề kết quả.' },
        { text: 'but', correct: false, rationale: 'But chỉ sự tương phản, không phù hợp quan hệ nhân quả tự nhiên.' },
        { text: 'because of', correct: false, rationale: 'Because of đi với danh từ hoặc cụm từ, không đi với mệnh đề.' },
      ],
      acceptedAnswers: [{ text: 'so', rationale: 'So introduces the result of the alarm clock not ringing.' }],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q3',
      kind: 'choice',
      prompt: 'Choose the grammatically correct sentence:',
      options: [
        { text: 'Because the weather was bad, we canceled the camping trip.', correct: true, rationale: 'Dùng duy nhất liên từ Because ở đầu câu chỉ nguyên nhân, có dấu phẩy trước mệnh đề chính.' },
        { text: 'Because the weather was bad, so we canceled the camping trip.', correct: false, rationale: 'Sai vì using both because and so to link the same cause-and-result pair.' },
        { text: 'The weather was bad because we canceled the camping trip.', correct: false, rationale: 'Sai quan hệ logic: việc thời tiết xấu không phải do chúng tôi hủy chuyến đi.' },
        { text: 'We canceled the camping trip, because the weather was bad, so.', correct: false, rationale: 'Sai cấu trúc ngữ pháp và thừa từ so ở cuối câu.' },
      ],
      acceptedAnswers: [{ text: 'Because the weather was bad, we canceled the camping trip.', rationale: 'Standard complex sentence with initial Because clause and comma, without redundant so.' }],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q4',
      kind: 'choice',
      prompt: 'Select the right connector for the result: "I was very thirsty after the marathon run, ___ I drank a large bottle of water."',
      options: [
        { text: 'so', correct: true, rationale: 'Sau dấu phẩy, dùng so để chỉ hành động kết quả (uống chai nước lớn).' },
        { text: 'because', correct: false, rationale: 'Không dùng because sau dấu phẩy trước mệnh đề kết quả.' },
        { text: 'since', correct: false, rationale: 'Since mang nghĩa nguyên nhân như because, không chỉ kết quả.' },
        { text: 'although', correct: false, rationale: 'Although chỉ sự nhượng bộ, không hợp nghĩa.' },
      ],
      acceptedAnswers: [{ text: 'so', rationale: 'So introduces the consequence of being thirsty.' }],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q5',
      kind: 'gap',
      prompt: 'Fill in the blank with "because" or "so": "The restaurant was fully booked on Valentine’s Day, _____ we had to find another place to eat."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: 'Introduces the result clause after a comma.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q6',
      kind: 'gap',
      prompt: 'Fill in the blank with "because" or "so": "She could not sleep last night _____ she had drunk three cups of strong espresso."',
      options: [],
      acceptedAnswers: [
        { text: 'because', rationale: 'Introduces the reason why she could not sleep.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q7',
      kind: 'gap',
      prompt: 'Fill in the blank with "Because" or "So": "_____ the public library was closed on Sunday, students had to study at a nearby café."',
      options: [],
      acceptedAnswers: [
        { text: 'Because', rationale: 'Sentence-initial reason clause requires capitalized Because.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q8',
      kind: 'gap',
      prompt: 'Fill in the blank with "because" or "so": "I do not eat seafood _____ I am allergic to shrimp and crabs."',
      options: [],
      acceptedAnswers: [
        { text: 'because', rationale: 'Introduces the medical reason for not eating seafood.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q9',
      kind: 'transform',
      prompt: 'Rewrite using "so": "We stayed at home all evening because it was raining heavily outside."',
      options: [],
      acceptedAnswers: [
        { text: 'It was raining heavily outside, so we stayed at home all evening.', rationale: 'Reverses clauses to place cause first, followed by comma and so with result.' },
        { text: 'It was raining heavily outside, so we stayed home all evening.', rationale: 'Variant omitting preposition at is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q10',
      kind: 'transform',
      prompt: 'Rewrite using "because": "Lan was tired after her long shift, so she took a warm shower and went to sleep early."',
      options: [],
      acceptedAnswers: [
        { text: 'Lan took a warm shower and went to sleep early because she was tired after her long shift.', rationale: 'Places result first, followed by because and reason clause.' },
        { text: 'Because she was tired after her long shift, Lan took a warm shower and went to sleep early.', rationale: 'Sentence-initial Because clause with comma is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q11',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "Because I did not study for the test, so I received a low score."',
      options: [],
      acceptedAnswers: [
        { text: 'Because I did not study for the test, I received a low score.', rationale: 'Removes redundant so from the result clause.' },
        { text: "Because I didn't study for the test, I received a low score.", rationale: "Contraction didn't is accepted." },
        { text: 'I did not study for the test, so I received a low score.', rationale: 'Alternative rewrite keeping so and removing Because is accepted.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "The battery was completely dead because my smartphone turned off."',
      options: [],
      acceptedAnswers: [
        { text: 'My smartphone turned off because the battery was completely dead.', rationale: 'Fixes reversed cause-and-effect logic (dead battery caused phone to turn off).' },
        { text: 'The battery was completely dead, so my smartphone turned off.', rationale: 'Alternative correction using so to show consequence.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-a2-because-so-27-r1',
      kind: 'choice',
      prompt: 'Choose the correct sentence to describe cause and effect: "Which sentence is punctuated and structured correctly?"',
      options: [
        { text: 'Phong forgot his key, so he had to wait outside until his roommate came home.', correct: true, rationale: 'Dùng so sau dấu phẩy để chỉ kết quả hợp lý của việc quên chìa khóa.' },
        { text: 'Because Phong forgot his key, so he had to wait outside until his roommate came home.', correct: false, rationale: 'Sai vì dùng cả Because lẫn so.' },
        { text: 'Phong forgot his key so because he had to wait outside.', correct: false, rationale: 'Sai trật tự liên từ.' },
      ],
      acceptedAnswers: [{ text: 'Phong forgot his key, so he had to wait outside until his roommate came home.', rationale: 'Proper coordination using comma and so.' }],
    },
    {
      id: 'grammar-v2-a2-because-so-27-r2',
      kind: 'gap',
      prompt: 'Fill in the blank with "because" or "so": "The internet connection was very unstable this morning, _____ we could not attend the Zoom video meeting."',
      options: [],
      acceptedAnswers: [
        { text: 'so', rationale: 'Introduces the result clause after a comma.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-r3',
      kind: 'transform',
      prompt: 'Rewrite using "Because" at the beginning of the sentence: "Minh was hungry, so he made a sandwich."',
      options: [],
      acceptedAnswers: [
        { text: 'Because Minh was hungry, he made a sandwich.', rationale: 'Converts coordinate sentence into complex sentence starting with Because and comma.' },
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-r4',
      kind: 'correction',
      prompt: 'Correct the error: "Because the coffee shop had no free seats, so we decided to go to the park."',
      options: [],
      acceptedAnswers: [
        { text: 'Because the coffee shop had no free seats, we decided to go to the park.', rationale: 'Removes the redundant conjunction so.' },
        { text: 'The coffee shop had no free seats, so we decided to go to the park.', rationale: 'Accepts alternative rewrite using so without Because.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-a2-because-so-27-o1',
      prompt: 'Viết 2 câu kể về một sự cố giao thông hoặc thời tiết mà bạn từng gặp, một câu dùng "because" chỉ nguyên nhân và một câu dùng "so" chỉ kết quả.',
      modelAnswer: 'I was late for my university class yesterday because the morning highway was heavily jammed. The heavy rain continued for hours, so many motorbikes broke down on the flooded street.',
      checks: [
        'Một câu sử dụng liên từ because nối mệnh đề nguyên nhân.',
        'Một câu sử dụng liên từ so (sau dấu phẩy) nối mệnh đề kết quả.',
        'Với cùng một cặp nguyên nhân-kết quả, dùng because hoặc so để nối các mệnh đề; không dùng cả hai cho cùng cặp ý.',
      ],
    },
    {
      id: 'grammar-v2-a2-because-so-27-o2',
      prompt: 'Viết 2 câu chia sẻ về quyết định học tiếng Anh của bạn, trong đó có một câu bắt đầu bằng "Because [mệnh đề], [mệnh đề chính]".',
      modelAnswer: 'Because English is essential for global business communication, I decided to take an evening language course. I want to travel abroad confidently, so I practice speaking every day.',
      checks: [
        'Đặt mệnh đề Because ở đầu câu kèm dấu phẩy phân tách mệnh đề chính.',
        'Sử dụng so nối mệnh đề kết quả trong câu thứ hai.',
        'Ý nghĩa mạch lạc, đúng thì ngữ pháp.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-because-so',
      title: 'Cambridge Dictionary: Conjunctions – because, so',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/clauses-of-reason-and-result',
      claims: [
        'Because is a subordinating conjunction introducing a clause of reason.',
        'So is a coordinating conjunction introducing a clause of result or consequence.',
        'Avoid using because and so together to link the same cause-and-result pair.',
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

export default becauseSoLesson;
