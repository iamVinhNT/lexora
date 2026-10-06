/**
 * @file defining-relatives.ts
 * @description B1 lesson on defining relative clauses using who, which, that to identify nouns without commas.
 */
import type { GrammarLesson } from '../../types.js';

const definingRelativesLesson: GrammarLesson = {
  id: 'grammar-v2-b1-defining-relatives-20',
  revisionId: 'grammar-v2-b1-defining-relatives-20@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề quan hệ xác định (Defining Relative Clauses)',
  objective: 'Hiểu và sử dụng thành thạo mệnh đề quan hệ xác định với who, which và that để cung cấp thông tin thiết yếu nhận diện danh từ, không dùng dấu phẩy.',
  prerequisiteIds: ['grammar-v2-b1-reported-requests-19'],
  coverage: ['defining-relatives', 'who-which-that', 'relative-pronouns', 'no-commas', 'essential-clause'],
  context: {
    english: 'The architect who designed our university library received an award for buildings that use less energy.',
    vietnamese: 'Kiến trúc sư thiết kế thư viện trường đại học của chúng tôi nhận giải thưởng cho những công trình dùng ít năng lượng hơn.',
  },
  guide: {
    pattern: 'Noun (person) + who / that + clause | Noun (thing) + which / that + clause (NO COMMAS)',
    whenToUse: [
      'Bổ nghĩa thông tin thiết yếu để phân biệt danh từ đang nói đến là ai hoặc vật nào trong một nhóm.',
      'Dùng "who" hoặc "that" để bổ nghĩa cho danh từ chỉ người.',
      'Dùng "which" hoặc "that" để bổ nghĩa cho danh từ chỉ đồ vật, sự việc, con vật.',
      'Không dùng dấu phẩy để ngăn cách mệnh đề quan hệ xác định với mệnh đề chính.',
    ],
    signalWords: ['the person who', 'the thing which', 'the book that', 'everyone who', 'the only reason that'],
    check: [
      'Thông tin trong mệnh đề quan hệ có thiết yếu để nhận diện danh từ không (nếu bỏ đi câu có bị tối nghĩa không)?',
      'Đại từ quan hệ có khớp với đối tượng được bổ nghĩa (who cho người, which cho vật, that cho cả hai) không?',
      'Có nhầm lẫn đặt dấu phẩy trước đại từ quan hệ trong mệnh đề xác định không?',
    ],
  },
  explanation: 'Mệnh đề quan hệ xác định (defining relative clause) cung cấp thông tin cốt lõi giúp người nghe hoặc người đọc nhận diện chính xác danh từ đứng trước. Nếu lược bỏ mệnh đề này, ý nghĩa của câu sẽ mơ hồ hoặc không trọn vẹn (ví dụ: "The woman called the police" không rõ người phụ nữ nào, nhưng "The woman who witnessed the accident called the police" thì người nghe biết rõ). Trong mệnh đề xác định: dùng "who" hoặc "that" cho người; dùng "which" hoặc "that" cho vật/sự việc. Đặc điểm nhận diện quan trọng nhất về mặt cấu trúc là KHÔNG CÓ DẤU PHẨY ngăn cách.',
  examples: [
    { english: 'A doctor is a professional who treats sick people.', vietnamese: 'Bác sĩ là một chuyên gia người khám và chữa bệnh cho người ốm.' },
    { english: 'I recently read an article which explained artificial intelligence clearly.', vietnamese: 'Gần đây tôi đã đọc một bài báo giải thích rất rõ ràng về trí tuệ nhân tạo.' },
    { english: 'The hotel that we booked for our vacation is close to the beach.', vietnamese: 'Khách sạn mà chúng tôi đặt cho kỳ nghỉ nằm rất gần bãi biển.' },
    { english: 'Students who submit their assignments late will lose marks.', vietnamese: 'Những sinh viên nộp bài muộn sẽ bị trừ điểm.' },
    { english: 'Can you recommend an app that tracks daily study habits?', vietnamese: 'Bạn có thể gợi ý một ứng dụng theo dõi thói quen học tập hàng ngày được không?' },
    { english: 'The mechanic who fixed my motorbike did an outstanding job.', vietnamese: 'Người thợ sửa xe máy cho tôi đã làm rất tốt.' },
  ],
  contrasts: [
    {
      form: 'The students who worked hard passed (defining, no commas) vs The students, who worked hard, passed (non-defining, commas)',
      whyFits: 'Không có dấu phẩy, mệnh đề khoanh nhóm sinh viên chăm chỉ. Câu nói nhóm này đỗ, không tự khẳng định mọi sinh viên khác đều trượt.',
      whyNot: 'Câu có dấu phẩy mang nghĩa tất cả sinh viên đều chăm chỉ và tất cả đều thi đỗ; thay đổi hoàn toàn ý định diễn đạt.',
    },
    {
      form: 'The book that is on the desk vs The book what is on the desk',
      whyFits: 'Dùng that hoặc which làm đại từ quan hệ bổ nghĩa cho danh từ "the book".',
      whyNot: 'Không dùng "what" làm đại từ quan hệ thay thế cho danh từ đứng trước ("what" chỉ dùng khi không có danh từ đi trước, tương đương the thing which).',
    },
  ],
  commonMistakes: [
    'Dùng dấu phẩy khi muốn mệnh đề giúp nhận diện người nào: The man who called you is my uncle. Câu có dấu phẩy có thể đúng nếu người đàn ông đã được nhận diện từ trước.',
    'Dùng "what" thay vì "which/that" sau danh từ (ví dụ viết "The car what I bought" thay vì "The car that I bought").',
    'Lặp lại đại từ tân ngữ trong mệnh đề quan hệ (ví dụ viết "The book that I read it yesterday" - thừa chữ "it").',
  ],
  summary: 'Mệnh đề quan hệ xác định cung cấp thông tin bắt buộc để nhận diện danh từ. Dùng who/that cho người, which/that cho vật. Tuyệt đối không dùng dấu phẩy và không lặp lại đại từ được thay thế.',
  exercises: [
    {
      id: 'grammar-v2-b1-defining-relatives-20-q1',
      kind: 'choice',
      prompt: 'Select the correct relative pronoun for a person: "The software engineer _____ created this application works in Da Nang."',
      options: [
        { text: 'who', correct: true, rationale: '"Who" is the relative pronoun used for human antecedents.' },
        { text: 'which', correct: false, rationale: '"Which" is reserved for objects and animals, not people.' },
        { text: 'whose', correct: false, rationale: '"Whose" indicates possession, but a subject pronoun is needed here.' },
        { text: 'what', correct: false, rationale: '"What" cannot serve as a relative pronoun with an explicit noun antecedent.' },
      ],
      acceptedAnswers: [{ text: 'who', rationale: '"Who" refers to a person.' }],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q2',
      kind: 'choice',
      prompt: 'Choose which, rather than that, for the object: "I lost the silver pen _____ my father gave me for graduation."',
      options: [
        { text: 'which', correct: true, rationale: '"Which" (or "that") correctly refers to an object (the silver pen).' },
        { text: 'who', correct: false, rationale: '"Who" is used only for people.' },
        { text: 'whom', correct: false, rationale: '"Whom" is used only for people as objects.' },
        { text: 'where', correct: false, rationale: '"Where" refers to locations, not physical objects.' },
      ],
      acceptedAnswers: [{ text: 'which', rationale: '"Which" refers to an object.' }],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q3',
      kind: 'choice',
      prompt: 'Identify the sentence with correct punctuation for a defining relative clause:',
      options: [
        { text: 'People who exercise regularly tend to sleep better at night.', correct: true, rationale: 'Defining relative clauses require no commas because the information is essential.' },
        { text: 'People, who exercise regularly, tend to sleep better at night.', correct: false, rationale: 'Incorrect commas turn an essential clause into a non-defining clause.' },
        { text: 'People who exercise regularly, tend to sleep better at night.', correct: false, rationale: 'Cannot place an isolated comma between subject and predicate.' },
        { text: 'People, who exercise regularly tend to sleep better at night.', correct: false, rationale: 'Missing closing comma, and commas should not be used here.' },
      ],
      acceptedAnswers: [{ text: 'People who exercise regularly tend to sleep better at night.', rationale: 'Essential clauses use no commas.' }],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q4',
      kind: 'choice',
      prompt: 'Which relative pronoun can substitute for BOTH "who" and "which" in defining relative clauses?',
      options: [
        { text: 'that', correct: true, rationale: '"That" can refer to both persons and things in defining relative clauses.' },
        { text: 'what', correct: false, rationale: '"What" cannot replace relative pronouns.' },
        { text: 'where', correct: false, rationale: '"Where" only refers to places.' },
        { text: 'whose', correct: false, rationale: '"Whose" indicates possession only.' },
      ],
      acceptedAnswers: [{ text: 'that', rationale: '"That" is valid for both people and things.' }],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q5',
      kind: 'gap',
      prompt: 'Complete with the relative pronoun for a person: "The volunteer _____ organized the charity run received special recognition."',
      options: [],
      acceptedAnswers: [
        { text: 'who', rationale: '"Who" refers to person antecedent "The volunteer".' },
        { text: 'that', rationale: '"That" is also valid in defining relative clauses.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q6',
      kind: 'gap',
      prompt: 'Complete with the relative pronoun for a machine: "We need a printer _____ can produce double-sided color documents quickly."',
      options: [],
      acceptedAnswers: [
        { text: 'which', rationale: '"Which" refers to inanimate thing "a printer".' },
        { text: 'that', rationale: '"That" is also standard for things in defining clauses.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q7',
      kind: 'gap',
      prompt: 'Fill in the relative pronoun: "Anyone _____ wants to participate in the marathon must register before Friday."',
      options: [],
      acceptedAnswers: [
        { text: 'who', rationale: '"Who" connects indefinite pronoun "anyone" referring to people.' },
        { text: 'that', rationale: '"That" is also acceptable with indefinite pronouns.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q8',
      kind: 'gap',
      prompt: 'Fill in the pronoun: "Is that the bus _____ goes to Noi Bai International Airport?"',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: '"That" refers to vehicle "the bus".' },
        { text: 'which', rationale: '"Which" also correctly refers to "the bus".' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q9',
      kind: 'transform',
      prompt: 'Combine with a defining clause; begin "The woman" and keep "was very polite" as main predicate: "A woman helped me at the counter. She was very polite."',
      options: [],
      acceptedAnswers: [
        { text: 'The woman who helped me at the counter was very polite.', rationale: 'Combines using "who" defining the woman.' },
        { text: 'The woman that helped me at the counter was very polite.', rationale: 'Accepts "that" for people in defining clauses.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q10',
      kind: 'transform',
      prompt: 'Combine with a defining clause using "that" or "which"; begin "The laptop": "I bought a laptop yesterday. It has excellent battery life."',
      options: [],
      acceptedAnswers: [
        { text: 'The laptop that I bought yesterday has excellent battery life.', rationale: 'Combines using "that" and replaces pronoun it.' },
        { text: 'The laptop which I bought yesterday has excellent battery life.', rationale: 'Accepts "which" as equivalent relative pronoun.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q11',
      kind: 'correction',
      prompt: 'Correct the pronoun repetition error: "The documentary that we watched it yesterday was fascinating."',
      options: [],
      acceptedAnswers: [
        { text: 'The documentary that we watched yesterday was fascinating.', rationale: 'Removes redundant object pronoun "it".' },
        { text: 'The documentary which we watched yesterday was fascinating.', rationale: 'Accepts "which" without redundant "it".' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-q12',
      kind: 'correction',
      prompt: 'Correct the relative pronoun error: "The camera what my brother bought takes stunning photos."',
      options: [],
      acceptedAnswers: [
        { text: 'The camera that my brother bought takes stunning photos.', rationale: 'Replaces "what" with "that".' },
        { text: 'The camera which my brother bought takes stunning photos.', rationale: 'Replaces "what" with "which".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-defining-relatives-20-r1',
      kind: 'choice',
      prompt: 'Choose the best completion: "The customer service representative _____ answered my call was extremely helpful."',
      options: [
        { text: 'who', correct: true, rationale: '"Who" is the standard relative pronoun referring to a representative (person).' },
        { text: 'which', correct: false, rationale: '"Which" cannot refer to a person.' },
        { text: 'whom', correct: false, rationale: 'Subject pronoun is required before the verb answered.' },
      ],
      acceptedAnswers: [{ text: 'who', rationale: '"Who" functions as subject referring to a person.' }],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-r2',
      kind: 'gap',
      prompt: 'Complete with an appropriate relative pronoun: "This is the only recipe _____ produces perfectly crispy spring rolls."',
      options: [],
      acceptedAnswers: [
        { text: 'that', rationale: '"That" is especially preferred after "the only + noun".' },
        { text: 'which', rationale: '"Which" is also commonly used for recipes.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-r3',
      kind: 'transform',
      prompt: 'Combine with a defining clause using "who"; begin "Passers-by" or "The passers-by", keeping "called an ambulance immediately" as main predicate: "Passers-by witnessed the accident. They called an ambulance immediately."',
      options: [],
      acceptedAnswers: [
        { text: 'Passers-by who witnessed the accident called an ambulance immediately.', rationale: 'Combines two sentences using "who" without commas.' },
        { text: 'The passers-by who witnessed the accident called an ambulance immediately.', rationale: 'Accepts definite article.' },
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-r4',
      kind: 'correction',
      prompt: 'Correct the punctuation: "Cars, that produce zero emissions, are becoming more affordable."',
      options: [],
      acceptedAnswers: [
        { text: 'Cars that produce zero emissions are becoming more affordable.', rationale: 'Removes commas because the clause defines which cars are becoming affordable.' },
        { text: 'Cars which produce zero emissions are becoming more affordable.', rationale: 'Accepts which without commas.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-defining-relatives-20-o1',
      prompt: 'Viết 2 câu định nghĩa hoặc mô tả hai nghề nghiệp bạn ngưỡng mộ, sử dụng mệnh đề quan hệ xác định với "who" hoặc "that" (không dùng dấu phẩy).',
      modelAnswer: 'An architect is someone who designs aesthetically pleasing and environmentally sustainable buildings. A paramedic is a specialist that provides emergency medical care before a patient arrives at the hospital.',
      checks: [
        'Sử dụng chính xác "who" hoặc "that" để bổ nghĩa cho danh từ chỉ người.',
        'Mệnh đề quan hệ xác định không chứa dấu phẩy.',
        'Động từ trong mệnh đề quan hệ hòa hợp đúng với danh từ số ít/số nhiều.',
      ],
    },
    {
      id: 'grammar-v2-b1-defining-relatives-20-o2',
      prompt: 'Viết 2 câu mô tả những tiêu chí bạn tìm kiếm ở một chiếc điện thoại thông minh hoặc một khóa học trực tuyến, sử dụng "which" hoặc "that".',
      modelAnswer: 'I need a smartphone that has long battery life and a camera which performs well in low light. I prefer an online course that offers interactive feedback from instructors.',
      checks: [
        'Sử dụng đúng "which" hoặc "that" cho danh từ chỉ đồ vật hoặc khóa học.',
        'Cung cấp thông tin thiết yếu định hình rõ đối tượng.',
        'Không dùng thừa đại từ bổ ngữ (tránh lỗi lặp lại it/them).',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-defining-relative-clauses',
      title: 'British Council LearnEnglish: Relative clauses – defining relative clauses',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/relative-clauses-defining-relative-clauses',
      claims: [
        'Defining relative clauses tell us which person or thing the speaker means.',
        'No commas are used around defining relative clauses.',
        'Who and that are used for people; which and that are used for things.',
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

export default definingRelativesLesson;
