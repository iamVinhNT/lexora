/**
 * @file contrast-concession-links.ts
 * @description B1 lesson on linking words for contrast and concession (although, even though, despite, in spite of, however, while, whereas).
 */
import type { GrammarLesson } from '../../types.js';

const contrastConcessionLinksLesson: GrammarLesson = {
  id: 'grammar-v2-b1-contrast-concession-links-29',
  revisionId: 'grammar-v2-b1-contrast-concession-links-29@1.0.0',
  revision: '1.0.0',
  title: 'Từ nối chỉ sự tương phản và nhượng bộ (Contrast & Concession Linkers)',
  objective: 'Phân biệt và sử dụng chính xác các liên từ nhượng bộ (although, even though), giới từ nhượng bộ (despite, in spite of) và từ nối tương phản (however, while, whereas) với cấu trúc ngữ pháp và dấu câu chuẩn.',
  prerequisiteIds: ['grammar-v2-b1-cause-result-links-28'],
  coverage: ['contrast-concession-links', 'although-even-though', 'despite-in-spite-of', 'however-while-whereas', 'concession-grammar'],
  context: {
    english: 'Although the startup faced intense competition and limited initial capital, it developed a loyal customer base. In spite of these early hardships, profits rose steadily; however, the founders still worked seventy hours a week.',
    vietnamese: 'Mặc dù công ty khởi nghiệp đối mặt với sự cạnh tranh gay gắt và số vốn ban đầu hạn hẹp, họ đã xây dựng được lượng khách hàng trung thành. Bất chấp những khó khăn ban đầu này, lợi nhuận vẫn tăng đều đặn; tuy nhiên, những người sáng lập vẫn làm việc bảy mươi giờ mỗi tuần.',
  },
  guide: {
    pattern: 'Concession: Although / Even though + Clause | Despite / In spite of + Noun phrase / V-ing | Contrast: . However, + Clause | While / Whereas + Clause, Clause',
    whenToUse: [
      '"Although / Even though + Clause (S + V)": diễn tả sự nhượng bộ đi với một mệnh đề đầy đủ. "Even though" mang sắc thái mạnh mẽ, bất ngờ hơn "although".',
      '"Despite / In spite of + Noun phrase / V-ing": giới từ nhượng bộ đi với cụm danh từ hoặc V-ing. Lưu ý quan trọng: "despite" không bao giờ đi với "of", còn "in spite" bắt buộc có "of".',
      '"However": trạng từ liên kết nối hai ý tưởng tương phản, thường đứng đầu câu mới và có dấu phẩy đi liền sau (. However, S + V).',
      '"While / Whereas + Clause": liên từ chỉ sự tương phản trực tiếp, đối chiếu hai sự việc, hai thói quen hoặc hai đặc điểm song song.',
      'KHÔNG BAO GIỜ dùng cả "although" và "but" trong cùng một câu.',
    ],
    signalWords: ['although it rained', 'even though he was tired', 'despite the difficulties', 'in spite of working hard', 'however, she succeeded', 'whereas in contrast'],
    check: [
      'Sau despite có nhầm lẫn thêm chữ "of" không (nhớ: despite KHÔNG có of)?',
      'Sau although / even though có phải là mệnh đề hoàn chỉnh (S + V) không?',
      'Có mắc lỗi kép "Although..., but..." trong cùng một câu không?',
    ],
  },
  explanation: 'Diễn đạt sự tương phản và nhượng bộ (contrast and concession) đòi hỏi người học phải phân định chính xác cấu trúc ngữ pháp theo hai nhóm: (1) Nhóm liên từ đi với mệnh đề (Clause): "Although" và "even though" đi cùng mệnh đề có chủ ngữ và động từ chia thì ("Although he was exhausted, he completed the marathon"). Khi hai sự thật trái ngược nhau được đối chiếu trực tiếp, ta dùng "while" hoặc "whereas" ("Some people prefer waking up early, whereas others work best at night"). (2) Nhóm giới từ đi với cụm danh từ hoặc V-ing: "Despite" và "in spite of" mang nghĩa "mặc dù / bất chấp", nhưng chỉ đi cùng cụm danh từ hoặc danh động từ V-ing ("Despite his exhaustion, he completed the marathon"). Nếu muốn dùng mệnh đề sau despite/in spite of, ta phải mượn cụm "the fact that" ("Despite the fact that he was exhausted..."). (3) Trạng từ "However": Dùng để ngắt nhịp và đưa ra thông tin tương phản bất ngờ giữa hai câu độc lập (". However, ..."). Lỗi phổ biến nhất của người Việt là kết hợp cả "Although" và "but" trong cùng một câu—trong tiếng Anh chỉ được giữ lại một trong hai.',
  examples: [
    { english: 'Although it was raining heavily, the students walked to school on time.', vietnamese: 'Mặc dù trời mưa rất to, các học sinh vẫn đi bộ đến trường đúng giờ.' },
    { english: 'Even though she had little professional experience, she aced the job interview.', vietnamese: 'Mặc dù cô ấy có ít kinh nghiệm chuyên môn, cô ấy đã hoàn thành xuất sắc buổi phỏng vấn việc làm.' },
    { english: 'Despite the high cost of living, many young people choose to settle in major cities.', vietnamese: 'Bất chấp chi phí sinh hoạt đắt đỏ, nhiều người trẻ vẫn chọn định cư tại các thành phố lớn.' },
    { english: 'In spite of feeling sick, Nam attended the final semester examination.', vietnamese: 'Mặc dù cảm thấy mệt trong người, Nam vẫn tham gia kỳ thi kết thúc học kỳ.' },
    { english: 'The hotel was situated near the beach. However, the service was quite disappointing.', vietnamese: 'Khách sạn nằm gần bãi biển. Tuy nhiên, dịch vụ khá gây thất vọng.' },
    { english: 'My sister enjoys energetic outdoor sports, while I prefer quiet indoor hobbies like painting.', vietnamese: 'Chị tôi thích các môn thể thao ngoài trời tràn đầy năng lượng, trong khi tôi thích những sở thích tĩnh lặng trong nhà như vẽ tranh.' },
  ],
  contrasts: [
    {
      form: 'Although he worked hard vs Despite working hard',
      whyFits: '"Although" đi liền với mệnh đề có chủ ngữ "he" và động từ "worked". "Despite" đi với danh động từ "working hard" hoặc cụm danh từ "his hard work".',
      whyNot: 'Không được viết "Despite he worked hard" (sai vì despite không đi trực tiếp với mệnh đề) hoặc "Although working hard" (trừ khi dùng cấu trúc rút gọn nâng cao).',
    },
    {
      form: 'Despite the rain vs Despite of the rain',
      whyFits: '"Despite" là một giới từ hoàn chỉnh, đi trực tiếp với danh từ "the rain".',
      whyNot: '"Despite of" là lỗi sai ngữ pháp rất phổ biến do lai tạp giữa "despite" và "in spite of".',
    },
  ],
  commonMistakes: [
    'Dùng cả "although" và "but" trong cùng một câu (ví dụ viết "Although he is rich, but he is unhappy").',
    'Dùng "despite of" (nhầm lẫn giữa despite và in spite of; đúng là "despite the rain" hoặc "in spite of the rain").',
    'Dùng mệnh đề trực tiếp sau despite/in spite of mà không có "the fact that" (ví dụ viết "despite he was sick" thay vì "despite being sick").',
  ],
  summary: '[although / even though + Clause] và [despite / in spite of + Noun phrase/V-ing] diễn tả sự nhượng bộ. Dùng [. However, + Clause] cho tương phản giữa các câu. Không dùng both although and but.',
  exercises: [
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q1',
      kind: 'choice',
      prompt: 'Select the correct conjunction followed by a clause: "_____ the traffic was chaotic, we arrived at the concert before the opening song."',
      options: [
        { text: 'Although', correct: true, rationale: '"Although" introduces a full concession clause (the traffic was chaotic).' },
        { text: 'Despite', correct: false, rationale: '"Despite" cannot be directly followed by a clause with a conjugated verb.' },
        { text: 'In spite of', correct: false, rationale: '"In spite of" requires a noun phrase or gerund.' },
        { text: 'Despite of', correct: false, rationale: '"Despite of" is non-existent in correct grammar.' },
      ],
      acceptedAnswers: [{ text: 'Although', rationale: '"Although" is followed by a clause.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q2',
      kind: 'choice',
      prompt: 'Choose the correct prepositional linker followed by a noun phrase:',
      options: [
        { text: 'Despite the freezing temperature, the morning runners completed five kilometers.', correct: true, rationale: '"Despite" correctly takes the noun phrase "the freezing temperature" without "of".' },
        { text: 'Despite of the freezing temperature, the morning runners completed five kilometers.', correct: false, rationale: '"Despite of" is an incorrect mixture.' },
        { text: 'In spite the freezing temperature, the morning runners completed five kilometers.', correct: false, rationale: 'Missing "of" after "in spite".' },
        { text: 'Although the freezing temperature, the morning runners completed five kilometers.', correct: false, rationale: '"Although" requires a clause with a verb.' },
      ],
      acceptedAnswers: [{ text: 'Despite the freezing temperature, the morning runners completed five kilometers.', rationale: '"Despite" correctly precedes a noun phrase.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q3',
      kind: 'choice',
      prompt: 'Which sentence correctly demonstrates direct factual comparison using "whereas"?',
      options: [
        { text: 'Lemons are very sour, whereas oranges are generally sweet and juicy.', correct: true, rationale: '"Whereas" links two directly contrasting facts.' },
        { text: 'Lemons are very sour, despite oranges are sweet and juicy.', correct: false, rationale: '"Despite" cannot link two independent clauses directly.' },
        { text: 'Lemons are very sour, however oranges are sweet and juicy.', correct: false, rationale: 'Comma splice; however requires a semicolon or new sentence.' },
        { text: 'Lemons are very sour whereas of oranges are sweet and juicy.', correct: false, rationale: 'Ungrammatical addition of "of".' },
      ],
      acceptedAnswers: [{ text: 'Lemons are very sour, whereas oranges are generally sweet and juicy.', rationale: '"Whereas" contrasts two facts.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q4',
      kind: 'choice',
      prompt: 'Identify the sentence that correctly avoids the "although... but" double-conjunction error:',
      options: [
        { text: 'Although she felt extremely nervous, she spoke clearly and persuasively.', correct: true, rationale: 'Correct: uses "although" without "but" in the main clause.' },
        { text: 'Although she felt extremely nervous, but she spoke clearly and persuasively.', correct: false, rationale: 'Incorrectly uses both "although" and "but".' },
        { text: 'Despite she felt extremely nervous, she spoke clearly and persuasively.', correct: false, rationale: '"Despite" cannot take a clause.' },
        { text: 'In spite of she felt extremely nervous, she spoke clearly.', correct: false, rationale: '"In spite of" cannot take a clause.' },
      ],
      acceptedAnswers: [{ text: 'Although she felt extremely nervous, she spoke clearly and persuasively.', rationale: 'Standard sentence with single concession conjunction.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q5',
      kind: 'gap',
      prompt: 'Fill in the prepositional concession linker without "of": "_____ his lack of formal training, Huy designed an outstanding mobile application."',
      options: [],
      acceptedAnswers: [{ text: 'Despite', rationale: '"Despite" takes a noun phrase without "of".' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q6',
      kind: 'gap',
      prompt: 'Fill in the first word of the phrase: "_____ spite of being tired, they stayed up to finish the project presentation."',
      options: [],
      acceptedAnswers: [{ text: 'In', rationale: 'The fixed text already supplies "spite of"; only the first word is missing.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q7',
      kind: 'gap',
      prompt: 'Fill in the missing word: "_____ though the flight was turbulent, all passengers remained calm."',
      options: [],
      acceptedAnswers: [{ text: 'Even', rationale: 'The fixed text already supplies "though"; only the missing word is requested.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q8',
      kind: 'gap',
      prompt: 'Complete with the transition adverb: "We had reserved a table in advance. _____, we still had to wait fifteen minutes to be seated."',
      options: [],
      acceptedAnswers: [{ text: 'However', rationale: '"However" begins the sentence indicating contrast.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q9',
      kind: 'transform',
      prompt: 'Rewrite using "Despite": "Although it was raining heavily, the football match continued."',
      options: [],
      acceptedAnswers: [
        { text: 'Despite the heavy rain, the football match continued.', rationale: 'Converts clause "it was raining heavily" into noun phrase "the heavy rain".' },
        { text: 'Despite heavy rain, the football match continued.', rationale: 'Accepts without definite article.' },
        { text: 'Despite it raining heavily, the football match continued.', rationale: 'Accepts a gerund clause with its subject; the noun-phrase versions are also valid.' },
      ],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q10',
      kind: 'transform',
      prompt: 'Rewrite using "Although": "In spite of his young age, Minh manages a team of ten engineers."',
      options: [],
      acceptedAnswers: [
        { text: 'Although Minh is young, he manages a team of ten engineers.', rationale: 'Converts prepositional phrase into clause with to be.' },
        { text: 'Although he is young, Minh manages a team of ten engineers.', rationale: 'Accepts pronoun order variation.' },
      ],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q11',
      kind: 'correction',
      prompt: 'Correct the error in this concession sentence: "Despite of having a bad headache, Lan attended the lecture."',
      options: [],
      acceptedAnswers: [
        { text: 'Despite having a bad headache, Lan attended the lecture.', rationale: 'Removes incorrect "of" after "Despite".' },
        { text: 'In spite of having a bad headache, Lan attended the lecture.', rationale: 'Replaces "Despite of" with "In spite of".' },
      ],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-q12',
      kind: 'correction',
      prompt: 'Correct the double-linker error: "Although he studied diligently for weeks, but he did not pass the driving test."',
      options: [],
      acceptedAnswers: [
        { text: 'Although he studied diligently for weeks, he did not pass the driving test.', rationale: 'Removes redundant "but" from the main clause.' },
        { text: "Although he studied diligently for weeks, he didn't pass the driving test.", rationale: 'Accepts contracted didn\'t.' },
        { text: 'He studied diligently for weeks, but he did not pass the driving test.', rationale: 'Alternative: removes "Although" and keeps "but".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-r1',
      kind: 'choice',
      prompt: 'Select the sentence with accurate syntax and punctuation:',
      options: [
        { text: 'In spite of the stormy forecast, the fishing boats set sail at dawn.', correct: true, rationale: '"In spite of" correctly introduces the noun phrase with a following comma.' },
        { text: 'In spite the stormy forecast, the fishing boats set sail at dawn.', correct: false, rationale: 'Missing preposition "of" after "in spite".' },
        { text: 'Despite of the stormy forecast, the fishing boats set sail at dawn.', correct: false, rationale: '"Despite of" is ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'In spite of the stormy forecast, the fishing boats set sail at dawn.', rationale: '"In spite of" precedes a noun phrase.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-r2',
      kind: 'gap',
      prompt: 'Fill in the single-word preposition: "_____ all our detailed preparations, unexpected technical issues delayed the launch."',
      options: [],
      acceptedAnswers: [{ text: 'Despite', rationale: '"Despite" takes the noun phrase directly.' }],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-r3',
      kind: 'transform',
      prompt: 'Rewrite using "However,": "Even though the smartphone is expensive, it offers exceptional camera quality."',
      options: [],
      acceptedAnswers: [
        { text: 'The smartphone is expensive. However, it offers exceptional camera quality.', rationale: 'Replaces "Even though" with ". However," separating into two sentences.' },
      ],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-r4',
      kind: 'correction',
      prompt: 'Correct the error: "Despite he was exhausted, Nam stayed up to watch the football final."',
      options: [],
      acceptedAnswers: [
        { text: 'Although he was exhausted, Nam stayed up to watch the football final.', rationale: 'Replaces "Despite" with "Although" before a full clause.' },
        { text: 'Despite being exhausted, Nam stayed up to watch the football final.', rationale: 'Changes clause to gerund "being exhausted".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-o1',
      prompt: 'Viết 2 câu mô tả một trải nghiệm bạn nỗ lực vượt qua thử thách để đạt được mục tiêu, sử dụng "Although + Mệnh đề" và "Despite + Cụm danh từ".',
      modelAnswer: 'Although I felt intimidated when speaking in front of a large audience, I delivered my presentation confidently. Despite my initial anxiety, the audience warmly applauded my ideas at the end.',
      checks: [
        'Sử dụng đúng "Although + Clause" cho câu thứ nhất.',
        'Sử dụng đúng "Despite + Noun phrase" cho câu thứ hai mà không có "of".',
        'Cấu trúc và ý nghĩa tương phản rõ ràng, văn phong tự nhiên.',
      ],
    },
    {
      id: 'grammar-v2-b1-contrast-concession-links-29-o2',
      prompt: 'Viết 2 câu so sánh sở thích hoặc thói quen của hai người khác nhau trong gia đình hoặc công ty, sử dụng "whereas" hoặc "while" và ". However,".',
      modelAnswer: 'My father enjoys rising early to tend to his garden, whereas my mother prefers sleeping in and reading novels late at night. However, they both love having a leisurely family breakfast together on Sundays.',
      checks: [
        'Sử dụng đúng "whereas" hoặc "while" để đối chiếu hai sở thích trái ngược.',
        'Sử dụng đúng ". However," với dấu câu chuẩn xác để đưa ra điểm tương đồng bất ngờ.',
        'Ngữ pháp chính xác, phong phú ở trình độ B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-clauses-of-contrast',
      title: 'British Council LearnEnglish: Clauses of contrast and concession',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/clauses-contrast',
      claims: [
        'Although and even though are conjunctions followed by a clause.',
        'Despite and in spite of are prepositions followed by a noun phrase or gerund.',
        'However is a conjunctive adverb used to transition between contrasting sentences.',
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

export default contrastConcessionLinksLesson;
