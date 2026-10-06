/**
 * @file relative-pronoun-omission.ts
 * @description B1 lesson on omitting relative pronouns when they function as objects in defining relative clauses (contact clauses).
 */
import type { GrammarLesson } from '../../types.js';

const relativePronounOmissionLesson: GrammarLesson = {
  id: 'grammar-v2-b1-relative-pronoun-omission-22',
  revisionId: 'grammar-v2-b1-relative-pronoun-omission-22@1.0.0',
  revision: '1.0.0',
  title: 'Lược bỏ đại từ quan hệ (Relative Pronoun Omission)',
  objective: 'Nhận biết và sử dụng thành thạo quy tắc lược bỏ đại từ quan hệ (who, which, that) khi đóng vai trò tân ngữ trong mệnh đề xác định (contact clause).',
  prerequisiteIds: ['grammar-v2-b1-non-defining-relatives-21'],
  coverage: ['relative-pronoun-omission', 'contact-clauses', 'subject-vs-object-pronouns', 'defining-omission', 'informal-spoken-english'],
  context: {
    english: 'The documentary we watched last night explored marine ecosystems, and the marine biologist they interviewed explained coral bleaching clearly.',
    vietnamese: 'Bộ phim tài liệu chúng tôi xem tối qua khám phá hệ sinh thái biển, và nhà sinh học biển họ phỏng vấn đã giải thích hiện tượng tẩy trắng san hô rất rõ ràng.',
  },
  guide: {
    pattern: 'Noun + [who / which / that] + Subject + Verb -> Noun + Subject + Verb (OBJECT PRONOUN IN DEFINING CLAUSE ONLY)',
    whenToUse: [
      'Lược bỏ đại từ quan hệ (who/which/that) khi nó đóng vai trò TÂN NGỮ trong mệnh đề quan hệ xác định (ngay sau đại từ là một chủ ngữ khác).',
      'Giúp câu văn tự nhiên, súc tích hơn, đặc biệt phổ biến trong giao tiếp hàng ngày và văn phong hiện đại.',
      'Không bỏ riêng đại từ làm chủ ngữ trong mệnh đề đầy đủ. Mệnh đề rút gọn như the man standing there là cấu trúc khác.',
      'KHÔNG ĐƯỢC lược bỏ trong mệnh đề quan hệ không xác định (mệnh đề có dấu phẩy).',
    ],
    signalWords: ['the book (that) I read', 'the girl (who) we met', 'the car (which) he drives', 'contact clause'],
    check: [
      'Xác định vai trò thật sự, không chỉ nhìn từ kế tiếp: the man who often calls me có trạng từ sau who nhưng who vẫn là chủ ngữ.',
      'Đây có phải là mệnh đề quan hệ xác định không có dấu phẩy không?',
      'Có nhầm lẫn lược bỏ đại từ khi nó làm chủ ngữ của câu không?',
    ],
  },
  explanation: 'Trong mệnh đề quan hệ xác định, có thể bỏ đại từ tân ngữ: The cake that she baked -> The cake she baked. Đại từ tân ngữ có thể là who/whom/which/that. Nếu giới từ đứng trước đại từ (the person to whom I spoke), không bỏ riêng whom; có thể đưa giới từ về cuối rồi bỏ đại từ (the person I spoke to). Không bỏ riêng đại từ làm chủ ngữ trong mệnh đề đầy đủ: The woman who baked the cake is kind không thể thành The woman baked the cake is kind. Đừng nhầm với mệnh đề rút gọn dùng phân từ. Mệnh đề không xác định có dấu phẩy không cho phép bỏ đại từ, kể cả đại từ tân ngữ.',
  examples: [
    { english: 'The hotel we stayed at in Da Lat had a scenic garden view. (omitted: which/that)', vietnamese: 'Khách sạn chúng tôi ở tại Đà Lạt có tầm nhìn ra khu vườn tuyệt đẹp (đã lược bỏ which/that).' },
    { english: 'The candidate the interview panel selected has extensive software experience. (omitted: who/whom/that)', vietnamese: 'Ứng viên hội đồng phỏng vấn lựa chọn có kinh nghiệm phần mềm dày dặn (đã lược bỏ who/whom/that).' },
    { english: 'Is this the coffee shop you recommended yesterday? (omitted: which/that)', vietnamese: 'Đây có phải là quán cà phê bạn đã gợi ý hôm qua không? (đã lược bỏ which/that).' },
    { english: 'The man who delivered the package forgot to ask for a signature. (CANNOT omit: who is subject)', vietnamese: 'Người đàn ông giao kiện hàng đã quên xin chữ ký (KHÔNG THỂ lược bỏ: who là chủ ngữ).' },
    { english: 'I received the parcel you sent from Japan. (omitted: which/that)', vietnamese: 'Tôi đã nhận được kiện hàng bạn gửi từ Nhật Bản (đã lược bỏ which/that).' },
    { english: 'A doctor who specializes in skin diseases is called a dermatologist. (CANNOT omit: who is subject)', vietnamese: 'Bác sĩ chuyên về các bệnh về da được gọi là bác sĩ da liễu (KHÔNG THỂ lược bỏ: who là chủ ngữ).' },
  ],
  contrasts: [
    {
      form: 'The book I read vs The author wrote the book',
      whyFits: '"The book I read was thrilling": lược bỏ that/which vì I là chủ ngữ mới, read cần tân ngữ.',
      whyNot: 'Không thể lược bỏ đại từ chủ ngữ: viết "The author wrote the book is famous" là sai vì thiếu đại từ liên kết "who" (phải là "The author who wrote the book is famous").',
    },
    {
      form: 'The man (who) I met yesterday vs Mr. An, whom I met yesterday, ...',
      whyFits: 'Trong mệnh đề xác định, "The man I met yesterday" lược bỏ đại từ hoàn toàn tự nhiên.',
      whyNot: 'Trong mệnh đề không xác định có dấu phẩy, không bao giờ được lược bỏ đại từ: không thể viết "Mr. An, I met yesterday, is kind".',
    },
  ],
  commonMistakes: [
    'Lược bỏ đại từ quan hệ khi nó làm chủ ngữ của mệnh đề (ví dụ: viết "The boy lives next door is friendly" thay vì "The boy who lives next door is friendly").',
    'Lược bỏ đại từ quan hệ trong mệnh đề không xác định sau dấu phẩy (ví dụ: viết "Hanoi, I visited last year, was cold").',
    'Thêm lại đại từ tân ngữ thừa thãi sau khi đã lược bỏ (ví dụ viết "The car I bought it yesterday" - thừa chữ "it").',
  ],
  summary: 'Chỉ lược bỏ who/which/that khi làm TÂN NGỮ trong mệnh đề xác định (phía sau có Subject + Verb). Không bao giờ lược bỏ khi đại từ làm CHỦ NGỮ hoặc trong mệnh đề có dấu phẩy.',
  exercises: [
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q1',
      kind: 'choice',
      prompt: 'In which of the following sentences can the relative pronoun be safely omitted?',
      options: [
        { text: 'The shoes that I bought online fit perfectly.', correct: true, rationale: '"That" is the object of "bought" (followed by subject "I").' },
        { text: 'The runner who won the gold medal trained for years.', correct: false, rationale: '"Who" is the subject of the relative clause verb "won".' },
        { text: 'A machine that washes dishes automatically is called a dishwasher.', correct: false, rationale: '"That" is the subject of "washes".' },
        { text: 'The teacher who inspired me retired last semester.', correct: false, rationale: '"Who" is the subject of "inspired".' },
      ],
      acceptedAnswers: [{ text: 'The shoes that I bought online fit perfectly.', rationale: '"That" can be omitted because it is an object pronoun.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q2',
      kind: 'choice',
      prompt: 'Why CANNOT "who" be omitted in: "I thanked the doctor who cured my chronic cough"?',
      options: [
        { text: 'Because "who" is the grammatical subject of the verb "cured".', correct: true, rationale: 'Subject relative pronouns cannot be omitted without creating a sentence fragment/run-on.' },
        { text: 'Because the sentence is in the past tense.', correct: false, rationale: 'Tense does not affect pronoun omission.' },
        { text: 'Because "doctor" is a medical professional.', correct: false, rationale: 'Vocabulary meaning does not determine syntactic omission.' },
        { text: 'Because commas are required.', correct: false, rationale: 'No commas are used in this defining clause.' },
      ],
      acceptedAnswers: [{ text: 'Because "who" is the grammatical subject of the verb "cured".', rationale: 'Subject relative pronouns cannot be omitted.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q3',
      kind: 'choice',
      prompt: 'Select the grammatically correct contact clause with the relative pronoun omitted:',
      options: [
        { text: 'The presentation we heard this morning was very informative.', correct: true, rationale: 'Object pronoun which/that is naturally omitted before "we heard".' },
        { text: 'The presentation we heard it this morning was very informative.', correct: false, rationale: 'Redundant object pronoun "it" makes the clause ungrammatical.' },
        { text: 'The presentation we this morning heard was very informative it.', correct: false, rationale: 'The main clause contains a redundant it and does not preserve the correct contact-clause structure.' },
        { text: 'The presentation, we heard this morning, was very informative.', correct: false, rationale: 'Cannot insert non-defining commas with an omitted pronoun.' },
      ],
      acceptedAnswers: [{ text: 'The presentation we heard this morning was very informative.', rationale: 'Correct omission without redundant object.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q4',
      kind: 'choice',
      prompt: 'Can the relative pronoun be omitted in: "My boss, whom I respect deeply, is retiring"?',
      options: [
        { text: 'No, because relative pronouns can never be omitted in non-defining clauses with commas.', correct: true, rationale: 'Non-defining relative clauses strictly prohibit pronoun omission.' },
        { text: 'Yes, because whom is an object pronoun.', correct: false, rationale: 'Object status does not override the non-defining comma rule.' },
        { text: 'Yes, but only in formal writing.', correct: false, rationale: 'It is never permitted in non-defining clauses.' },
        { text: 'No, because whom must always be replaced by that.', correct: false, rationale: '"That" cannot be used in non-defining clauses.' },
      ],
      acceptedAnswers: [{ text: 'No, because relative pronouns can never be omitted in non-defining clauses with commas.', rationale: 'Non-defining clauses never allow pronoun omission.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q5',
      kind: 'gap',
      prompt: 'Complete the contact clause with the subject from "We cooked the meal": "The meal _____ cooked together tasted delicious." Write only the missing subject.',
      options: [],
      acceptedAnswers: [{ text: 'we', rationale: 'The omitted relative object is followed by the separate subject we.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q6',
      kind: 'gap',
      prompt: 'Supply the subject relative pronoun (who/that), which cannot be omitted: "The musician _____ composed this melody is very talented."',
      options: [],
      acceptedAnswers: [{ text: 'who', rationale: 'Who is subject of composed.' }, { text: 'that', rationale: 'That is also a subject relative pronoun in a defining clause.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q7',
      kind: 'gap',
      prompt: 'Complete the contact clause with the past form of buy: "The laptop she _____ last week has a cracked screen."',
      options: [],
      acceptedAnswers: [{ text: 'bought', rationale: 'She is the relative-clause subject; the object relative pronoun before she is omitted.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q8',
      kind: 'gap',
      prompt: 'Supply the subject relative pronoun (who/that): "Students _____ study abroad often gain independence."',
      options: [],
      acceptedAnswers: [{ text: 'who', rationale: 'Who is subject of study and cannot be omitted.' }, { text: 'that', rationale: 'That is also valid as a subject relative pronoun here.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q9',
      kind: 'transform',
      prompt: 'Rewrite the sentence by omitting the relative pronoun: "The guitar that my uncle gave me is over forty years old."',
      options: [],
      acceptedAnswers: [
        { text: 'The guitar my uncle gave me is over forty years old.', rationale: 'Removes "that" without changing the rest of the sentence.' },
      ],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q10',
      kind: 'transform',
      prompt: 'Rewrite the sentence by omitting the relative pronoun: "The project that we completed ahead of schedule won praise from the director."',
      options: [],
      acceptedAnswers: [
        { text: 'The project we completed ahead of schedule won praise from the director.', rationale: 'Removes "that" cleanly.' },
      ],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q11',
      kind: 'correction',
      prompt: 'Correct the run-on error where a subject relative pronoun was wrongly omitted: "The woman owns that bakery always donates bread."',
      options: [],
      acceptedAnswers: [
        { text: 'The woman who owns that bakery always donates bread.', rationale: 'Restores subject pronoun "who".' },
        { text: 'The woman that owns that bakery always donates bread.', rationale: 'Accepts subject pronoun "that".' },
      ],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-q12',
      kind: 'correction',
      prompt: 'Correct the error in this contact clause: "The novel I borrowed it from the library was thrilling."',
      options: [],
      acceptedAnswers: [
        { text: 'The novel I borrowed from the library was thrilling.', rationale: 'Removes redundant pronoun "it".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-r1',
      kind: 'choice',
      prompt: 'Identify the sentence in which the relative pronoun CANNOT be dropped:',
      options: [
        { text: 'The engineer who fixed the server resolved the issue in ten minutes.', correct: true, rationale: '"Who" is the subject of "fixed" and must be kept.' },
        { text: 'The advice that she offered helped me overcome my anxiety.', correct: false, rationale: '"That" is an object pronoun (she offered) and can be dropped.' },
        { text: 'The movie which we saw last Friday was hilarious.', correct: false, rationale: '"Which" is an object pronoun (we saw) and can be dropped.' },
      ],
      acceptedAnswers: [{ text: 'The engineer who fixed the server resolved the issue in ten minutes.', rationale: '"Who" cannot be dropped as subject.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-r2',
      kind: 'gap',
      prompt: 'Supply the subject relative pronoun (which/that), not an omission: "The hotel _____ overlooks the bay is fully booked."',
      options: [],
      acceptedAnswers: [{ text: 'which', rationale: 'Which is subject of overlooks.' }, { text: 'that', rationale: 'That is also a valid subject relative pronoun in this defining clause.' }],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-r3',
      kind: 'transform',
      prompt: 'Omit the relative pronoun: "The coffee shop that I visit every Saturday morning serves great pastries."',
      options: [],
      acceptedAnswers: [
        { text: 'The coffee shop I visit every Saturday morning serves great pastries.', rationale: 'Omits object pronoun "that".' },
      ],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-r4',
      kind: 'correction',
      prompt: 'Correct the error: "The student won the speaking contest received a scholarship."',
      options: [],
      acceptedAnswers: [
        { text: 'The student who won the speaking contest received a scholarship.', rationale: 'Restores mandatory subject pronoun "who".' },
        { text: 'The student that won the speaking contest received a scholarship.', rationale: 'Accepts subject pronoun "that".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-o1',
      prompt: 'Viết 2 câu mô tả những đồ vật hoặc món ăn yêu thích của bạn, sử dụng mệnh đề quan hệ dạng lược bỏ đại từ (contact clause: the food I love, the film we saw).',
      modelAnswer: 'The coffee beans my brother brought from Buon Ma Thuot produce a wonderfully rich flavor. The bicycle I bought second-hand three years ago still rides smoothly.',
      checks: [
        'Lược bỏ đại từ quan hệ một cách tự nhiên trong mệnh đề xác định.',
        'Đảm bảo không lặp lại đại từ tân ngữ (tránh lỗi thêm "it" hoặc "them").',
        'Cấu trúc câu hoàn chỉnh với chủ ngữ và vị ngữ chính rõ ràng.',
      ],
    },
    {
      id: 'grammar-v2-b1-relative-pronoun-omission-22-o2',
      prompt: 'Viết 2 câu: một câu sử dụng đại từ quan hệ làm chủ ngữ (bắt buộc giữ lại) và một câu sử dụng đại từ làm tân ngữ (đã lược bỏ).',
      modelAnswer: 'The colleague who organized the annual company retreat received high praise from management. The presentation we delivered on Tuesday impressed all our overseas clients.',
      checks: [
        'Câu thứ nhất giữ lại "who" vì đại từ đóng vai trò chủ ngữ.',
        'Câu thứ hai lược bỏ đại từ quan hệ (that/which) vì đại từ là tân ngữ.',
        'Ngữ nghĩa rõ ràng và chuẩn xác ngữ pháp B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-relative-pronoun-omission',
      title: 'Cambridge Dictionary: Relative pronouns – omission and contact clauses',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/relative-pronouns',
      claims: [
        'Relative pronouns can be omitted when they are the object of the relative clause in defining clauses.',
        'Relative pronouns cannot be omitted when they are the subject of the clause.',
        'Omission is not allowed in non-defining relative clauses.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal)',
    reviewedAt: '2026-10-06T00:00:00Z',
    summary: 'Reviewed the complete lesson for grammar accuracy, contextual answerability, distractors, authored variants, output prompts, and source-claim alignment. Applied editorial corrections where needed.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};

export default relativePronounOmissionLesson;
