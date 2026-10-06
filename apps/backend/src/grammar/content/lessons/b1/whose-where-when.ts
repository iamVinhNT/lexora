/**
 * @file whose-where-when.ts
 * @description B1 lesson on relative whose (possession), where (place), and when (time) in defining and non-defining contexts.
 */
import type { GrammarLesson } from '../../types.js';

const whoseWhereWhenLesson: GrammarLesson = {
  id: 'grammar-v2-b1-whose-where-when-23',
  revisionId: 'grammar-v2-b1-whose-where-when-23@1.0.0',
  revision: '1.0.0',
  title: 'Đại từ và trạng từ quan hệ: Whose, Where, When (Whose, Where, When)',
  objective: 'Sử dụng chính xác whose để chỉ quan hệ sở hữu, where để chỉ nơi chốn và when để chỉ thời gian trong các mệnh đề quan hệ.',
  prerequisiteIds: ['grammar-v2-b1-relative-pronoun-omission-22'],
  coverage: ['whose-where-when', 'whose-possession', 'where-place', 'when-time', 'relative-adverbs'],
  context: {
    english: 'I spoke with an artisan whose handmade ceramic pots are sold across Asia. She works in a tranquil village where ceramic arts began centuries ago, during an era when emperors commissioned royal tableware.',
    vietnamese: 'Tôi đã trò chuyện với một nghệ nhân có các sản phẩm gốm thủ công được bán khắp châu Á. Cô làm việc tại một ngôi làng yên bình nơi nghề gốm bắt đầu từ nhiều thế kỷ trước, vào thời kỳ khi các hoàng đế đặt làm đồ dùng hoàng gia.',
  },
  guide: {
    pattern: 'Noun + whose + Noun (possession) | Place + where + clause (place) | Time + when + clause (time)',
    whenToUse: [
      'Whose biểu thị sở hữu cho người, động vật, tổ chức hoặc vật. Dùng whose + cụm danh từ (whose very old car), không đặt a/the vào cùng vị trí xác định đó.',
      'Where thay cho thành phần nơi chốn như in/at which. Không thêm giới từ lặp cùng quan hệ nơi chốn; giới từ cho ý khác vẫn có thể có.',
      'Dùng "when" để bổ nghĩa cho danh từ chỉ thời gian (ngày, năm, khoảnh khắc, mùa...).',
      'Phân biệt rõ "whose" (sở hữu) và "who\'s" (viết tắt của who is hoặc who has).',
    ],
    signalWords: ['whose car', 'the house where', 'the year when', 'whose father is', 'the place where'],
    check: [
      'Sau whose là cụm danh từ sở hữu (có thể có tính từ/trạng từ), không nhầm với who is/has.',
      'Có nhầm lẫn chính tả giữa whose và who’s không?',
      'Giới từ có lặp quan hệ nơi chốn đã được where biểu thị không? Where we studied for exams vẫn đúng vì for không lặp nơi chốn.',
    ],
  },
  explanation: 'Whose biểu thị sở hữu và đứng trước cụm danh từ: a friend whose car broke down; a house whose old roof leaked. Whose không phải who’s (who is/has). Where biểu thị nơi diễn ra hành động, thường tương đương in/at which; when biểu thị thời gian, thường tương đương on/in which. Không chỉ nhìn danh từ nơi chốn: the city which I visited dùng which/that hoặc bỏ đại từ vì city là tân ngữ của visited. The city where I lived biểu thị nơi sống; the city which I lived in cũng đúng. Tránh lặp nơi chốn bằng where ... in/at khi giới từ biểu thị chính cùng quan hệ đó. Giới từ khác như where we studied for exams vẫn đúng.',
  examples: [
    { english: 'She is the violinist whose debut concert received a standing ovation.', vietnamese: 'Cô ấy là nghệ sĩ vĩ cầm có buổi hòa nhạc ra mắt nhận được tràng pháo tay nhiệt liệt.' },
    { english: 'We visited the ancient town of Hoi An, where hundreds of colorful lanterns illuminate the river.', vietnamese: 'Chúng tôi đã đến thăm phố cổ Hội An, nơi hàng trăm chiếc đèn lồng rực rỡ thắp sáng dòng sông.' },
    { english: 'I still remember the summer when we all graduated from university.', vietnamese: 'Tôi vẫn nhớ mùa hè năm ấy khi tất cả chúng tôi tốt nghiệp đại học.' },
    { english: 'This is a multinational company whose products are available in over ninety countries.', vietnamese: 'Đây là một công ty đa quốc gia có sản phẩm được phân phối tại hơn chín mươi quốc gia.' },
    { english: 'Is there a quiet café near here where we can sit and discuss the contract?', vietnamese: 'Gần đây có quán cà phê yên tĩnh nào nơi chúng ta có thể ngồi thảo luận hợp đồng không?' },
    { english: 'Sunday is the only day when the doctor does not accept patient appointments.', vietnamese: 'Chủ nhật là ngày duy nhất khi bác sĩ không nhận lịch hẹn bệnh nhân.' },
  ],
  contrasts: [
    {
      form: 'The girl whose brother won the contest vs The girl who\'s my best friend',
      whyFits: '"Whose brother" biểu thị quan hệ sở hữu (brother thuộc về cô gái).',
      whyNot: '"Who\'s my best friend" là dạng viết tắt của "who is" (đại từ chủ ngữ + động từ to be), hoàn toàn không mang nghĩa sở hữu.',
    },
    {
      form: 'The city where I was born vs The city which I visited last summer',
      whyFits: '"Where I was born" chỉ vị trí diễn ra hành động (born IN the city).',
      whyNot: 'City là tân ngữ trực tiếp của visited nên dùng which/that hoặc bỏ đại từ, không dùng where cho cùng nghĩa.',
    },
  ],
  commonMistakes: [
    'Nhầm lẫn giữa "whose" và "who\'s" (ví dụ viết "the man who\'s dog barked" thay vì "whose dog barked").',
    'Thêm giới từ thừa sau "where" (ví dụ viết "the hotel where we stayed at" thay vì "where we stayed" hoặc "which we stayed at").',
    'Thêm mạo từ "the" ngay sau whose (ví dụ viết "the woman whose the car was stolen" thay vì "whose car was stolen").',
  ],
  summary: 'Dùng "whose + Noun" cho sở hữu (tránh nhầm với who\'s). Dùng "where" cho nơi chốn (không để lại giới từ in/at). Dùng "when" cho thời gian.',
  exercises: [
    {
      id: 'grammar-v2-b1-whose-where-when-23-q1',
      kind: 'choice',
      prompt: 'Select the correct possessive relative pronoun: "The writer _____ latest novel became a bestseller gave an interview on television."',
      options: [
        { text: 'whose', correct: true, rationale: '"Whose" indicates possession of "latest novel".' },
        { text: "who's", correct: false, rationale: '"Who\'s" is a contraction of "who is" or "who has", not possessive.' },
        { text: 'whom', correct: false, rationale: '"Whom" is an object pronoun, not possessive.' },
        { text: 'which', correct: false, rationale: '"Which" cannot indicate personal possession preceding a noun.' },
      ],
      acceptedAnswers: [{ text: 'whose', rationale: '"Whose" indicates possession.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q2',
      kind: 'choice',
      prompt: 'Choose the correct relative adverb of place: "This is the library _____ I spent countless hours revising for my exams."',
      options: [
        { text: 'where', correct: true, rationale: '"Where" refers to the location where the revising took place.' },
        { text: 'which', correct: false, rationale: '"Which" would require a preposition (in which) because revising happened at the location.' },
        { text: 'when', correct: false, rationale: '"When" refers to time, not a building.' },
        { text: 'whose', correct: false, rationale: '"Whose" indicates possession.' },
      ],
      acceptedAnswers: [{ text: 'where', rationale: '"Where" indicates the location of the action.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q3',
      kind: 'choice',
      prompt: 'Choose the correct word for time: "1969 was the historic year _____ human astronauts first walked on the Moon."',
      options: [
        { text: 'when', correct: true, rationale: '"When" correctly refers to a time antecedent (year).' },
        { text: 'where', correct: false, rationale: '"Where" refers to spatial location.' },
        { text: 'which', correct: false, rationale: '"Which" alone without a preposition (in which) cannot denote the time of an event.' },
        { text: 'whose', correct: false, rationale: '"Whose" shows possession.' },
      ],
      acceptedAnswers: [{ text: 'when', rationale: '"When" refers to time.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with correct preposition usage and relative clause:',
      options: [
        { text: 'The hostel where we stayed was clean and comfortable.', correct: true, rationale: '"Where" replaces "at which"; no trailing preposition is needed.' },
        { text: 'The hostel where we stayed at was clean and comfortable.', correct: false, rationale: 'Redundant preposition "at" with "where".' },
        { text: 'The hostel which we stayed was clean and comfortable.', correct: false, rationale: '"Stayed" is intransitive and requires a preposition if "which" is used.' },
        { text: 'The hostel whose we stayed was clean and comfortable.', correct: false, rationale: '"Whose" is possessive, not locative.' },
      ],
      acceptedAnswers: [{ text: 'The hostel where we stayed was clean and comfortable.', rationale: '"Where" correctly omits trailing preposition.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q5',
      kind: 'gap',
      prompt: 'Fill in the correct relative word: "A widow is a woman _____ husband has passed away."',
      options: [],
      acceptedAnswers: [{ text: 'whose', rationale: '"Whose" denotes possession (her husband).' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q6',
      kind: 'gap',
      prompt: 'Fill with one relative adverb of place (not a preposition + which): "Do you remember the seaside restaurant _____ we ate grilled seafood last summer?"',
      options: [],
      acceptedAnswers: [{ text: 'where', rationale: '"Where" indicates the restaurant location.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q7',
      kind: 'gap',
      prompt: 'Fill in the relative adverb of time: "Midnight was the moment _____ the new year fireworks lit up the sky."',
      options: [],
      acceptedAnswers: [{ text: 'when', rationale: '"When" connects the time antecedent "the moment".' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q8',
      kind: 'gap',
      prompt: 'Fill in the possessive pronoun: "We visited a startup company _____ founder graduated from our university."',
      options: [],
      acceptedAnswers: [{ text: 'whose', rationale: '"Whose" indicates the company\'s founder.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q9',
      kind: 'transform',
      prompt: 'Combine into one sentence using "whose": "I helped a tourist. His wallet had been stolen on the bus."',
      options: [],
      acceptedAnswers: [
        { text: 'I helped a tourist whose wallet had been stolen on the bus.', rationale: 'Replaces "His" with "whose".' },
      ],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q10',
      kind: 'transform',
      prompt: 'Combine into one sentence using "where": "They moved to a coastal village. They could grow their own organic vegetables there."',
      options: [],
      acceptedAnswers: [
        { text: 'They moved to a coastal village where they could grow their own organic vegetables.', rationale: 'Combines with "where" and removes "there".' },
      ],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q11',
      kind: 'correction',
      prompt: 'Correct the contraction spelling error: "The athlete who\'s record was broken congratulated the winner."',
      options: [],
      acceptedAnswers: [
        { text: 'The athlete whose record was broken congratulated the winner.', rationale: 'Replaces contracted "who\'s" with possessive "whose".' },
      ],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-q12',
      kind: 'correction',
      prompt: 'Correct the preposition error: "This is the park where we used to play football in after school."',
      options: [],
      acceptedAnswers: [
        { text: 'This is the park where we used to play football after school.', rationale: 'Removes redundant preposition "in" after "where".' },
        { text: 'This is the park which we used to play football in after school.', rationale: 'Replaces "where" with "which" to keep the preposition "in".' },
        { text: 'This is the park that we used to play football in after school.', rationale: 'Replaces "where" with "that" to keep preposition "in".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-whose-where-when-23-r1',
      kind: 'choice',
      prompt: 'Choose the correct relative item: "I met a botanist _____ research focuses on rare orchids."',
      options: [
        { text: 'whose', correct: true, rationale: '"Whose" expresses possession before the noun research.' },
        { text: "who's", correct: false, rationale: '"Who\'s" means who is/has, which does not fit.' },
        { text: 'which', correct: false, rationale: '"Which" cannot express a person\'s possession.' },
      ],
      acceptedAnswers: [{ text: 'whose', rationale: '"Whose" indicates possession.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-r2',
      kind: 'gap',
      prompt: 'Fill with one relative adverb of place: "Is there an office _____ employees can take a quiet power nap?"',
      options: [],
      acceptedAnswers: [{ text: 'where', rationale: '"Where" refers to the office as a location.' }],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-r3',
      kind: 'transform',
      prompt: 'Combine using "when": "I will never forget that evening. We watched the lunar eclipse together."',
      options: [],
      acceptedAnswers: [
        { text: 'I will never forget that evening when we watched the lunar eclipse together.', rationale: 'Connects the time antecedent with "when".' },
      ],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-r4',
      kind: 'correction',
      prompt: 'Correct the error: "The house whose the roof collapsed has now been repaired."',
      options: [],
      acceptedAnswers: [
        { text: 'The house whose roof collapsed has now been repaired.', rationale: 'Removes the definite article "the" after "whose".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-whose-where-when-23-o1',
      prompt: 'Viết 2 câu giới thiệu về một người bạn có tài năng đặc biệt (dùng "whose") và một địa điểm yêu thích của bạn (dùng "where").',
      modelAnswer: 'I have a close friend whose acoustic guitar compositions have gained thousands of online followers. We often hang out at a quiet tea house where traditional acoustic music is played every evening.',
      checks: [
        'Sử dụng đúng "whose + Noun" cho quan hệ sở hữu.',
        'Sử dụng đúng "where" cho địa điểm mà không bị thừa giới từ.',
        'Câu văn mạch lạc, đúng thì và ngữ pháp B1.',
      ],
    },
    {
      id: 'grammar-v2-b1-whose-where-when-23-o2',
      prompt: 'Viết 2 câu kể về một mốc thời gian đáng nhớ trong cuộc sống của bạn, sử dụng "when" để bổ nghĩa cho danh từ chỉ thời gian.',
      modelAnswer: 'I will always cherish the month when I first traveled independently across Central Vietnam. That was also the summer when I decided to pursue a career in software development.',
      checks: [
        'Sử dụng chính xác "when" sau danh từ chỉ thời gian (the month, the summer).',
        'Cấu trúc câu hoàn chỉnh và chia thì quá khứ nhất quán.',
        'Diễn đạt trôi chảy, tự nhiên.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-relative-pronouns-whose-where-when',
      title: 'British Council LearnEnglish: Relative pronouns and relative adverbs',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/relative-pronouns-whose-where-when',
      claims: [
        'Whose is used to show possession and can refer to people, animals, and things.',
        'Where is a relative adverb of place equivalent to in/at which.',
        'When is a relative adverb of time equivalent to at/on/in which.',
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

export default whoseWhereWhenLesson;
