/**
 * @file non-defining-relatives.ts
 * @description B1 lesson on non-defining relative clauses using who and which with commas to add non-essential extra information.
 */
import type { GrammarLesson } from '../../types.js';

const nonDefiningRelativesLesson: GrammarLesson = {
  id: 'grammar-v2-b1-non-defining-relatives-21',
  revisionId: 'grammar-v2-b1-non-defining-relatives-21@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề quan hệ không xác định (Non-defining Relative Clauses)',
  objective: 'Sử dụng thành thạo mệnh đề quan hệ không xác định để bổ sung thông tin phụ cho danh từ đã được xác định rõ, sử dụng dấu phẩy đúng cách và không dùng that.',
  prerequisiteIds: ['grammar-v2-b1-defining-relatives-20'],
  coverage: ['non-defining-relatives', 'commas-in-relatives', 'no-that-rule', 'extra-information', 'relative-clauses'],
  context: {
    english: 'Ha Long Bay, which attracts millions of international tourists every year, is celebrated worldwide for its towering limestone islands.',
    vietnamese: 'Vịnh Hạ Long, nơi thu hút hàng triệu du khách quốc tế mỗi năm, nổi tiếng khắp thế giới với những đảo đá vôi sừng sững.',
  },
  guide: {
    pattern: 'Noun (identified) + , who / which + extra clause , + main predicate (COMMAS REQUIRED; NEVER USE THAT)',
    whenToUse: [
      'Bổ sung thông tin phụ (extra information) về người hoặc vật đã được xác định cụ thể (tên riêng, danh từ có tính từ sở hữu hoặc từ chỉ định).',
      'Nếu lược bỏ mệnh đề này, câu chính vẫn giữ nguyên nghĩa đầy đủ và rõ ràng.',
      'Bắt buộc dùng dấu phẩy trước và sau mệnh đề quan hệ (hoặc dấu chấm ở cuối câu).',
      'Bài này luyện who cho người và which cho vật; whose, whom, where và when cũng có thể dùng theo chức năng. Không dùng that.',
    ],
    signalWords: [', who', ', which', 'proper nouns', 'my/his/her + noun', 'this/that + noun'],
    check: [
      'Danh từ đứng trước đã rõ ràng là ai/cái gì chưa (ví dụ: tên riêng như Hanoi, Mr. Minh)?',
      'Đã đặt đầy đủ dấu phẩy bao quanh mệnh đề quan hệ chưa?',
      'Có nhầm lẫn dùng "that" thay cho who hoặc which không (nhớ quy tắc: sau dấu phẩy không dùng that)?',
    ],
  },
  explanation: 'Mệnh đề quan hệ không xác định (non-defining relative clause) cung cấp thêm thông tin bổ sung, không có vai trò quyết định trong việc nhận diện danh từ vì đối tượng đã được xác định rõ ràng từ trước (thường là tên riêng, người duy nhất, hoặc danh từ đi cùng tính từ sở hữu như "my mother"). Nếu ta bỏ mệnh đề này đi, người nghe vẫn biết chính xác đối tượng được nhắc đến. Về mặt ngữ pháp, mệnh đề này luôn được ngăn cách bởi dấu phẩy. Hai điều cấm kỵ quan trọng nhất: (1) KHÔNG BAO GIỜ dùng "that" để thay thế who hoặc which; (2) KHÔNG BAO GIỜ được lược bỏ đại từ quan hệ ngay cả khi nó đóng vai trò tân ngữ.',
  examples: [
    { english: 'Da Nang, which is located in Central Vietnam, is famous for its clean beaches and the Golden Bridge.', vietnamese: 'Đà Nẵng, thành phố nằm ở miền Trung Việt Nam, nổi tiếng với những bãi biển sạch và Cầu Vàng.' },
    { english: 'My older brother, who works as a civil engineer in Can Tho, has just bought a new apartment.', vietnamese: 'Anh trai tôi, người làm kỹ sư xây dựng ở Cần Thơ, vừa mới mua một căn hộ mới.' },
    { english: 'William Shakespeare, who wrote Romeo and Juliet, was born in Stratford-upon-Avon.', vietnamese: 'William Shakespeare, người đã viết Romeo và Juliet, sinh ra tại Stratford-upon-Avon.' },
    { english: 'Our company headquarters, which opened three years ago, has modern solar panels on the roof.', vietnamese: 'Trụ sở công ty của chúng tôi, mở cửa cách đây ba năm, có các tấm pin mặt trời hiện đại trên mái nhà.' },
    { english: 'Dr. Dung, who studied at Cambridge University, gave a fascinating lecture on immunology.', vietnamese: 'Tiến sĩ Dũng, người từng theo học tại Đại học Cambridge, đã có bài giảng hấp dẫn về miễn dịch học.' },
    { english: 'The Titanic, which sank in 1912, remains one of history\'s most famous ships.', vietnamese: 'Tàu Titanic, bị chìm năm 1912, vẫn là một trong những con tàu nổi tiếng nhất trong lịch sử.' },
  ],
  contrasts: [
    {
      form: 'My brother, who lives in Hanoi, is a doctor vs My brother who lives in Hanoi is a doctor',
      whyFits: 'Câu có dấu phẩy trình bày người anh đã được nhận diện trong ngữ cảnh; có thể là người anh duy nhất, nhưng không bắt buộc.',
      whyNot: 'Câu không có dấu phẩy dùng nơi ở để nhận diện người anh. Thường gợi có nhiều anh em, nhưng không tự chứng minh số lượng.',
    },
    {
      form: 'Hanoi, which has a rich history, is the capital vs Hanoi, that has a rich history, is the capital',
      whyFits: 'Dùng "which" sau dấu phẩy trong mệnh đề không xác định bổ nghĩa cho danh từ riêng Hanoi.',
      whyNot: 'Tuyệt đối không dùng "that" sau dấu phẩy trong mệnh đề quan hệ không xác định; đây là lỗi sai ngữ pháp nghiêm trọng trong tiếng Anh.',
    },
  ],
  commonMistakes: [
    'Dùng "that" sau dấu phẩy trong mệnh đề không xác định (ví dụ viết "Tokyo, that is very crowded, is clean").',
    'Quên dấu phẩy ngăn cách mệnh đề bổ sung quanh tên riêng hoặc danh từ đã rõ nghĩa (ví dụ: "Mr. Brown who is our neighbor arrived").',
    'Lược bỏ đại từ quan hệ trong mệnh đề không xác định khi nó là tân ngữ (đại từ trong mệnh đề không xác định không bao giờ được lược bỏ).',
  ],
  summary: 'Mệnh đề quan hệ không xác định cung cấp thông tin phụ cho danh từ đã xác định rõ. Luôn bao quanh bởi dấu phẩy, dùng who cho người, which cho vật, và tuyệt đối KHÔNG dùng that.',
  exercises: [
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q1',
      kind: 'choice',
      prompt: 'Select the correct relative pronoun following a comma: "Professor Minh, _____ has conducted research for over twenty years, published a new paper today."',
      options: [
        { text: 'who', correct: true, rationale: '"Who" is used for people in non-defining clauses separated by commas.' },
        { text: 'that', correct: false, rationale: '"That" cannot be used in non-defining relative clauses.' },
        { text: 'which', correct: false, rationale: '"Which" refers to inanimate objects, not a professor.' },
        { text: 'whom', correct: false, rationale: '"Whom" cannot function as the subject of the relative verb has conducted.' },
      ],
      acceptedAnswers: [{ text: 'who', rationale: '"Who" refers to person antecedent after a comma.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q2',
      kind: 'choice',
      prompt: 'Choose the correct sentence referring to a specific proper noun:',
      options: [
        { text: 'Mount Everest, which is the highest peak on Earth, attracts hundreds of climbers every spring.', correct: true, rationale: 'Proper noun requires commas and uses "which".' },
        { text: 'Mount Everest, that is the highest peak on Earth, attracts hundreds of climbers every spring.', correct: false, rationale: '"That" cannot follow a comma in a non-defining clause.' },
        { text: 'Mount Everest which is the highest peak on Earth attracts hundreds of climbers every spring.', correct: false, rationale: 'Fails to enclose non-defining clause in commas.' },
        { text: 'Mount Everest, which is the highest peak on Earth attracts hundreds of climbers every spring.', correct: false, rationale: 'Missing the closing comma after Earth.' },
      ],
      acceptedAnswers: [{ text: 'Mount Everest, which is the highest peak on Earth, attracts hundreds of climbers every spring.', rationale: 'Correct commas and "which" for non-defining clause.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q3',
      kind: 'choice',
      prompt: 'Why is "that" incorrect in this non-defining clause: "My mother, that loves gardening, planted fifty roses"?',
      options: [
        { text: 'Because "that" is never used in non-defining relative clauses set off by commas.', correct: true, rationale: 'Standard grammar prohibits "that" in non-defining relative clauses.' },
        { text: 'Because "that" can only refer to plural nouns.', correct: false, rationale: '"That" can be singular or plural.' },
        { text: 'Because "that" cannot refer to women.', correct: false, rationale: '"That" can refer to people in defining clauses.' },
        { text: 'Because "that" requires a past tense verb.', correct: false, rationale: 'Tense has no bearing on relative pronoun selection.' },
      ],
      acceptedAnswers: [{ text: 'Because "that" is never used in non-defining relative clauses set off by commas.', rationale: '"That" is barred in non-defining clauses.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q4',
      kind: 'choice',
      prompt: 'Which sentence presents the location as extra information about an already identified sister?',
      options: [
        { text: 'My sister, who lives in Melbourne, is visiting us next week.', correct: true, rationale: 'Commas mark extra information, not a guaranteed count of sisters.' },
        { text: 'My sister who lives in Melbourne is visiting us next week.', correct: false, rationale: 'The clause identifies which sister.' },
        { text: 'My sister that lives in Melbourne is visiting us next week.', correct: false, rationale: 'That introduces a defining clause here.' },
        { text: 'A sister of mine who lives in Melbourne is visiting us next week.', correct: false, rationale: 'The clause is defining, not set off as extra information.' },
      ],
      acceptedAnswers: [{ text: 'My sister, who lives in Melbourne, is visiting us next week.', rationale: 'The location is extra information about an identified sister.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q5',
      kind: 'gap',
      prompt: 'Fill in the pronoun: "Ho Chi Minh City, _____ is the largest economic hub in Vietnam, has a vibrant street food scene."',
      options: [],
      acceptedAnswers: [{ text: 'which', rationale: '"Which" is the only standard pronoun for things/cities after a comma.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q6',
      kind: 'gap',
      prompt: 'Fill in the pronoun: "Uncle Tuan, _____ spent fifteen years in Germany, speaks fluent German."',
      options: [],
      acceptedAnswers: [{ text: 'who', rationale: '"Who" refers to a person after a comma.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q7',
      kind: 'gap',
      prompt: 'Complete with the relative pronoun: "The Eiffel Tower, _____ was completed in 1889, is located in Paris."',
      options: [],
      acceptedAnswers: [{ text: 'which', rationale: '"Which" refers to the inanimate monument after a comma.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q8',
      kind: 'gap',
      prompt: 'Fill in the pronoun: "My best friend, _____ plays the violin beautifully, won first prize at the music competition."',
      options: [],
      acceptedAnswers: [{ text: 'who', rationale: '"Who" refers to a person in non-defining clause.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q9',
      kind: 'transform',
      prompt: 'Combine into one sentence with a non-defining relative clause: "Sapa is located in northwestern Vietnam. It is famous for its terraced rice fields."',
      options: [],
      acceptedAnswers: [
        { text: 'Sapa, which is located in northwestern Vietnam, is famous for its terraced rice fields.', rationale: 'Combines with commas and "which".' },
        { text: 'Sapa, which is famous for its terraced rice fields, is located in northwestern Vietnam.', rationale: 'Accepts inverted clause order with commas.' },
      ],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q10',
      kind: 'transform',
      prompt: 'Combine into one sentence using "who" and commas: "Alexander Fleming discovered penicillin in 1928. He was a Scottish scientist."',
      options: [],
      acceptedAnswers: [
        { text: 'Alexander Fleming, who was a Scottish scientist, discovered penicillin in 1928.', rationale: 'Combines with non-defining clause about Alexander Fleming.' },
        { text: 'Alexander Fleming, who discovered penicillin in 1928, was a Scottish scientist.', rationale: 'Accepts alternative order of extra information.' },
      ],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q11',
      kind: 'correction',
      prompt: 'Correct the pronoun error: "Phu Quoc Island, that has beautiful sandy beaches, is popular with travelers."',
      options: [],
      acceptedAnswers: [
        { text: 'Phu Quoc Island, which has beautiful sandy beaches, is popular with travelers.', rationale: 'Replaces "that" with "which" in non-defining clause.' },
      ],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-q12',
      kind: 'correction',
      prompt: 'Treat the age as extra information about an already identified father; change only punctuation: "My father who is sixty-two years old loves gardening in the mornings."',
      options: [],
      acceptedAnswers: [
        { text: 'My father, who is sixty-two years old, loves gardening in the mornings.', rationale: 'Adds enclosing commas around the non-defining clause.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-r1',
      kind: 'choice',
      prompt: 'Select the correctly punctuated non-defining sentence:',
      options: [
        { text: 'The Mekong River, which flows through six countries, is vital for regional agriculture.', correct: true, rationale: 'Correctly enclosed in commas and uses "which".' },
        { text: 'The Mekong River, that flows through six countries, is vital for regional agriculture.', correct: false, rationale: '"That" cannot be used in non-defining clauses.' },
        { text: 'The Mekong River which flows through six countries, is vital for regional agriculture.', correct: false, rationale: 'Missing opening comma after subject.' },
      ],
      acceptedAnswers: [{ text: 'The Mekong River, which flows through six countries, is vital for regional agriculture.', rationale: 'Correct punctuation and pronoun.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-r2',
      kind: 'gap',
      prompt: 'Fill in the pronoun: "Nguyen Du, _____ wrote the epic poem The Tale of Kieu, is a celebrated Vietnamese author."',
      options: [],
      acceptedAnswers: [{ text: 'who', rationale: '"Who" refers to historical person Nguyen Du.' }],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-r3',
      kind: 'transform',
      prompt: 'Combine into a non-defining relative clause: "London is the capital of the United Kingdom. It hosted the Olympic Games in 2012."',
      options: [],
      acceptedAnswers: [
        { text: 'London, which hosted the Olympic Games in 2012, is the capital of the United Kingdom.', rationale: 'Combines using "which" with commas.' },
        { text: 'London, which is the capital of the United Kingdom, hosted the Olympic Games in 2012.', rationale: 'Accepts alternative clause order.' },
      ],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-r4',
      kind: 'correction',
      prompt: 'Correct the relative pronoun: "Albert Einstein, that formulated the theory of relativity, won the Nobel Prize in 1921."',
      options: [],
      acceptedAnswers: [
        { text: 'Albert Einstein, who formulated the theory of relativity, won the Nobel Prize in 1921.', rationale: 'Replaces "that" with "who" after a comma.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-o1',
      prompt: 'Viết 2 câu giới thiệu về quê hương hoặc một địa danh nổi tiếng ở Việt Nam, sử dụng mệnh đề quan hệ không xác định với ", which ...," để bổ sung thông tin địa lý hoặc văn hóa.',
      modelAnswer: 'Hue, which was the imperial capital of Vietnam under the Nguyen Dynasty, is renowned for its historic citadel and royal tombs. The Perfume River, which flows gently through the heart of Hue, adds romantic charm to the ancient city.',
      checks: [
        'Sử dụng đúng dấu phẩy bao quanh mệnh đề quan hệ không xác định.',
        'Sử dụng ", which ...," và tuyệt đối không dùng "that".',
        'Thông tin trong mệnh đề là thông tin bổ sung phụ cho địa danh đã xác định.',
      ],
    },
    {
      id: 'grammar-v2-b1-non-defining-relatives-21-o2',
      prompt: 'Viết 2 câu giới thiệu về một người thân trong gia đình hoặc một nhân vật lịch sử, sử dụng mệnh đề quan hệ không xác định với ", who ...,".',
      modelAnswer: 'My grandmother, who will turn eighty next month, still walks two kilometers every morning. General Vo Nguyen Giap, who led the Dien Bien Phu campaign, is revered as one of history\'s greatest military strategists.',
      checks: [
        'Sử dụng ", who ...," với cặp dấu phẩy ngăn cách rõ ràng.',
        'Động từ trong mệnh đề hòa hợp với chủ ngữ.',
        'Không dùng "that" và không lược bỏ đại từ quan hệ.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-non-defining-relative-clauses',
      title: 'British Council LearnEnglish: Relative clauses – non-defining relative clauses',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/relative-clauses-non-defining-relative-clauses',
      claims: [
        'Non-defining relative clauses give extra, non-essential information about a person or thing.',
        'Commas are used to separate non-defining relative clauses from the main clause.',
        'The relative pronoun "that" cannot be used; pronouns cannot be omitted.',
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

export default nonDefiningRelativesLesson;
