/**
 * @file cause-result-links.ts
 * @description B1 lesson on linking words for cause (because, as, since, because of, due to) and result (so, therefore, as a result).
 */
import type { GrammarLesson } from '../../types.js';

const causeResultLinksLesson: GrammarLesson = {
  id: 'grammar-v2-b1-cause-result-links-28',
  revisionId: 'grammar-v2-b1-cause-result-links-28@1.0.0',
  revision: '1.0.0',
  title: 'Từ nối chỉ nguyên nhân và kết quả (Cause and Result Linkers)',
  objective: 'Phân biệt và sử dụng chuẩn xác các liên từ và giới từ chỉ nguyên nhân (because, as, since vs because of, due to) và từ nối chỉ kết quả (so, therefore, as a result) với dấu câu đúng.',
  prerequisiteIds: ['grammar-v2-b1-prefer-would-rather-27'],
  coverage: ['cause-result-links', 'because-as-since', 'because-of-due-to', 'so-therefore-as-a-result', 'clause-vs-noun-phrase'],
  context: {
    english: 'Because of torrential rainfall overnight, several streets in the city center were submerged. Since it was unsafe for buses to run, the school decided to move classes online; as a result, students studied from home.',
    vietnamese: 'Do mưa như trút nước suốt đêm, nhiều tuyến phố trung tâm bị ngập sâu. Vì xe buýt không an toàn để hoạt động, nhà trường quyết định chuyển các lớp sang học trực tuyến; kết quả là học sinh đã học tại nhà.',
  },
  guide: {
    pattern: 'Cause: Because / As / Since + Clause | Because of / Due to + Noun phrase | Result: , so + Clause | . Therefore, / As a result, + Clause',
    whenToUse: [
      '"Because / As / Since + Clause (S + V)": dùng khi nêu nguyên nhân bằng một mệnh đề đầy đủ. "As" và "since" thường dùng khi người nghe đã biết trước nguyên nhân.',
      '"Because of / Due to + Noun phrase / V-ing": dùng khi nguyên nhân là một cụm danh từ hoặc danh động từ (không có động từ chia thì).',
      '", so + Clause": liên từ nối trong câu ghép để chỉ kết quả trực tiếp của hành động đứng trước (đứng sau dấu phẩy).',
      '"Therefore / As a result": trạng từ liên kết diễn đạt kết quả trang trọng trong văn viết, đứng đầu câu mới (theo sau bởi dấu phẩy) hoặc sau dấu chấm phẩy (; therefore,).',
    ],
    signalWords: ['because of the weather', 'due to a technical fault', 'since you are here', 'therefore, we must', 'as a result, profits rose'],
    check: [
      'Sau because of / due to là cụm danh từ hay là một mệnh đề? (Nếu có S + V chia thì -> phải dùng because).',
      'Sau because / as / since có phải là một mệnh đề hoàn chỉnh (S + V) không?',
      'Dấu câu của therefore / as a result đã chuẩn chưa (viết hoa đầu câu và có dấu phẩy đi kèm phía sau)?',
    ],
  },
  explanation: 'Việc kết nối các ý tưởng chỉ nguyên nhân và kết quả là kỹ năng trọng tâm ở trình độ B1. Để tránh nhầm lẫn, cần phân loại theo cấu trúc ngữ pháp: (1) Nhóm đi với mệnh đề (Clause): "Because", "as", và "since" đi liền với một mệnh đề chứa chủ ngữ và động từ chia thì đầy đủ ("Because the flight was delayed, we waited at the terminal"). (2) Nhóm đi với cụm danh từ (Noun phrase): "Because of" và "due to" là các giới từ/cụm giới từ, do đó chỉ đi cùng với cụm danh từ hoặc V-ing, tuyệt đối không đi với mệnh đề có động từ chia thì ("Because of the flight delay, we waited..."). (3) Từ chỉ kết quả: "So" là liên từ đẳng lập, thường đứng sau dấu phẩy trong câu ("The weather was rainy, so we stayed home"). Trong khi đó, "therefore" và "as a result" là trạng từ liên kết dùng trong ngữ cảnh trang trọng hoặc văn viết học thuật, thường đứng đầu câu mới với dấu phẩy ngăn cách theo sau (". Therefore, ...", ". As a result, ...").',
  examples: [
    { english: 'Because she practiced diligently every day, Mai achieved an IELTS score of 7.5.', vietnamese: 'Bởi vì luyện tập chăm chỉ mỗi ngày, Mai đã đạt điểm IELTS 7.5.' },
    { english: 'The football match was canceled because of thick fog over the stadium.', vietnamese: 'Trận bóng đá đã bị hủy do sương mù dày đặc bao phủ sân vận động.' },
    { english: 'Due to severe traffic congestion on the highway, we arrived thirty minutes late.', vietnamese: 'Do tắc đường nghiêm trọng trên đường cao tốc, chúng tôi đã đến muộn ba mươi phút.' },
    { english: 'Since everyone has submitted their assignments, we can begin the presentation.', vietnamese: 'Vì tất cả mọi người đều đã nộp bài, chúng ta có thể bắt đầu phần thuyết trình.' },
    { english: 'The company invested heavily in modern automation; therefore, productivity doubled within a year.', vietnamese: 'Công ty đã đầu tư mạnh mẽ vào tự động hóa hiện đại; do đó, năng suất đã tăng gấp đôi trong vòng một năm.' },
    { english: 'He forgot to set his alarm clock, so he woke up an hour late this morning.', vietnamese: 'Anh ấy quên cài đồng hồ báo thức, vì vậy sáng nay anh đã dậy muộn một tiếng.' },
  ],
  contrasts: [
    {
      form: 'Because it rained heavily vs Because of the heavy rain',
      whyFits: '"Because" đi với mệnh đề có chủ ngữ "it" và động từ "rained". "Because of" đi với cụm danh từ "the heavy rain".',
      whyNot: 'Không được viết "Because of it rained" (sai vì because of không đi với mệnh đề) hoặc "Because the heavy rain" (sai vì thiếu vị ngữ sau because).',
    },
    {
      form: 'It was late, so we left vs It was late. Therefore, we left',
      whyFits: '"So" là liên từ kết hợp nối hai vế sau dấu phẩy trong một câu ghép tự nhiên.',
      whyNot: '"Therefore" là trạng từ liên kết tạo câu văn trang trọng hơn, yêu cầu đứng đầu câu mới với dấu phẩy hoặc sau dấu chấm phẩy (; therefore,).',
    },
  ],
  commonMistakes: [
    'Dùng "because of" đi liền với một mệnh đề (ví dụ viết "because of he was tired" thay vì "because he was tired" hoặc "because of his tiredness").',
    'Dùng "because" mà chỉ có cụm danh từ không có động từ (ví dụ viết "because the bad weather" thay vì "because of the bad weather").',
    'Dùng cả "because" và "so" trong cùng một câu (ví dụ viết "Because I was sick, so I stayed home" - trong tiếng Anh chỉ được dùng một trong hai liên từ).',
  ],
  summary: '[because / as / since + Clause] và [because of / due to + Noun phrase] chỉ nguyên nhân. [, so + Clause] và [. Therefore, / As a result, + Clause] chỉ kết quả.',
  exercises: [
    {
      id: 'grammar-v2-b1-cause-result-links-28-q1',
      kind: 'choice',
      prompt: 'Choose the correct linker for a clause: "We decided to have an indoor picnic _____ the weather was stormy."',
      options: [
        { text: 'because', correct: true, rationale: '"Because" is followed by a full clause (the weather was stormy).' },
        { text: 'because of', correct: false, rationale: '"Because of" must be followed by a noun phrase, not a clause.' },
        { text: 'due to', correct: false, rationale: '"Due to" must be followed by a noun phrase, not a clause.' },
        { text: 'so', correct: false, rationale: '"So" introduces result, but stormy weather is the cause.' },
      ],
      acceptedAnswers: [{ text: 'because', rationale: '"Because" is followed by a full clause.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q2',
      kind: 'choice',
      prompt: 'Select the correct prepositional linker followed by a noun phrase:',
      options: [
        { text: 'The flight was delayed due to mechanical problems.', correct: true, rationale: '"Due to" is correctly followed by the noun phrase "mechanical problems".' },
        { text: 'The flight was delayed because mechanical problems.', correct: false, rationale: '"Because" requires a clause with a verb.' },
        { text: 'The flight was delayed as mechanical problems.', correct: false, rationale: '"As" requires a full clause.' },
        { text: 'The flight was delayed so mechanical problems.', correct: false, rationale: '"So" cannot introduce a noun phrase cause.' },
      ],
      acceptedAnswers: [{ text: 'The flight was delayed due to mechanical problems.', rationale: '"Due to" precedes a noun phrase.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q3',
      kind: 'choice',
      prompt: 'Which sentence correctly avoids combining "because" and "so"?',
      options: [
        { text: 'Because Minh worked late last night, he feels tired this morning.', correct: true, rationale: 'Correct: uses "because" without "so" in the main clause.' },
        { text: 'Because Minh worked late last night, so he feels tired this morning.', correct: false, rationale: 'Incorrectly pairs "because" with "so" in the same sentence.' },
        { text: 'Because of Minh worked late, he feels tired this morning.', correct: false, rationale: '"Because of" cannot take a clause.' },
        { text: 'Minh worked late, because he feels tired.', correct: false, rationale: 'Inverts cause and result logically.' },
      ],
      acceptedAnswers: [{ text: 'Because Minh worked late last night, he feels tired this morning.', rationale: 'Standard sentence with single cause linker.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q4',
      kind: 'choice',
      prompt: 'Identify the sentence with correct punctuation for "therefore":',
      options: [
        { text: 'The experiment produced inconsistent data. Therefore, the team repeated it.', correct: true, rationale: '"Therefore" begins a new sentence followed by a comma.' },
        { text: 'The experiment produced inconsistent data therefore the team repeated it.', correct: false, rationale: 'Missing full stop and comma around therefore.' },
        { text: 'The experiment produced inconsistent data, therefore the team repeated it.', correct: false, rationale: 'Comma splice; therefore is a conjunctive adverb, not a coordinating conjunction.' },
        { text: 'Therefore the experiment produced inconsistent data, the team repeated it.', correct: false, rationale: 'Misplaces therefore logically and syntactically.' },
      ],
      acceptedAnswers: [{ text: 'The experiment produced inconsistent data. Therefore, the team repeated it.', rationale: '"Therefore" capitalized with a following comma.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q5',
      kind: 'gap',
      prompt: 'Fill in the correct cause linker (because / because of): "The concert was postponed _____ the singer fell ill suddenly."',
      options: [],
      acceptedAnswers: [{ text: 'because', rationale: '"Because" is followed by clause "the singer fell ill".' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q6',
      kind: 'gap',
      prompt: 'Fill in (because / because of): "Many flights were canceled _____ thick fog across northern airports."',
      options: [],
      acceptedAnswers: [{ text: 'because of', rationale: '"Because of" precedes noun phrase "thick fog".' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q7',
      kind: 'gap',
      prompt: 'Fill in the result conjunction: "The laptop battery was completely flat, _____ I plugged it into the wall socket."',
      options: [],
      acceptedAnswers: [{ text: 'so', rationale: '"So" links the result clause after a comma.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q8',
      kind: 'gap',
      prompt: 'Fill in the formal result adverb: "The company failed to innovate in time. As a _____, its market share dropped significantly."',
      options: [],
      acceptedAnswers: [{ text: 'result', rationale: '"As a result" is the complete transition phrase.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q9',
      kind: 'transform',
      prompt: 'Rewrite using "because of": "The match was abandoned because it was raining heavily."',
      options: [],
      acceptedAnswers: [
        { text: 'The match was abandoned because of the heavy rain.', rationale: 'Converts clause "it was raining heavily" into noun phrase "the heavy rain".' },
        { text: 'The match was abandoned because of heavy rain.', rationale: 'Accepts noun phrase without article.' },
      ],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q10',
      kind: 'transform',
      prompt: 'Rewrite using "Therefore,": "She saved money for two years, so she could afford to study in Australia."',
      options: [],
      acceptedAnswers: [
        { text: 'She saved money for two years. Therefore, she could afford to study in Australia.', rationale: 'Replaces ", so" with ". Therefore,".' },
      ],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q11',
      kind: 'correction',
      prompt: 'Correct the double-conjunction error: "Because I was very tired after work, so I went to bed early."',
      options: [],
      acceptedAnswers: [
        { text: 'Because I was very tired after work, I went to bed early.', rationale: 'Removes redundant "so" from the main clause.' },
        { text: 'I was very tired after work, so I went to bed early.', rationale: 'Alternative: removes "Because" and keeps "so".' },
      ],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-q12',
      kind: 'correction',
      prompt: 'Correct the clause error after because of: "The bus arrived late because of the traffic was terrible."',
      options: [],
      acceptedAnswers: [
        { text: 'The bus arrived late because the traffic was terrible.', rationale: 'Removes "of" before the clause "the traffic was terrible".' },
        { text: 'The bus arrived late because of the terrible traffic.', rationale: 'Changes the clause into noun phrase "the terrible traffic".' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-cause-result-links-28-r1',
      kind: 'choice',
      prompt: 'Select the sentence with accurate syntax and punctuation:',
      options: [
        { text: 'Since we had already booked our tickets, we did not have to wait in line.', correct: true, rationale: '"Since" correctly introduces the cause clause with a comma after it.' },
        { text: 'Due to we had already booked our tickets, we did not have to wait in line.', correct: false, rationale: '"Due to" cannot introduce a clause.' },
        { text: 'Because of we had already booked our tickets, we did not have to wait.', correct: false, rationale: '"Because of" cannot introduce a clause.' },
      ],
      acceptedAnswers: [{ text: 'Since we had already booked our tickets, we did not have to wait in line.', rationale: '"Since" correctly introduces a cause clause.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-r2',
      kind: 'gap',
      prompt: 'Complete with the prepositional cause linker: "The outdoor festival was postponed _____ to adverse weather conditions."',
      options: [],
      acceptedAnswers: [{ text: 'due', rationale: '"Due to" completes the phrase.' }],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-r3',
      kind: 'transform',
      prompt: 'Rewrite using "Because": "Due to his strong communication skills, Son was promoted to team leader."',
      options: [],
      acceptedAnswers: [
        { text: 'Because Son had strong communication skills, he was promoted to team leader.', rationale: 'Converts noun phrase into a clause with past tense verb.' },
        { text: 'Because he had strong communication skills, Son was promoted to team leader.', rationale: 'Accepts pronoun order.' },
      ],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-r4',
      kind: 'correction',
      prompt: 'Correct the error: "The road was closed because an accident."',
      options: [],
      acceptedAnswers: [
        { text: 'The road was closed because of an accident.', rationale: 'Adds "of" to form prepositional phrase "because of an accident".' },
        { text: 'The road was closed due to an accident.', rationale: 'Replaces "because" with "due to".' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-cause-result-links-28-o1',
      prompt: 'Viết 2 câu giải thích nguyên nhân và kết quả của một quyết định cá nhân trong công việc hoặc học tập, sử dụng "Because of + Cụm danh từ" và "Therefore,".',
      modelAnswer: 'Because of the rapid growth of international trade in Vietnam, I decided to improve my business English proficiency. Therefore, I enrolled in an intensive communication course every weekend.',
      checks: [
        'Sử dụng đúng "Because of + Noun phrase" cho vế nguyên nhân.',
        'Sử dụng đúng ". Therefore, + Clause" cho vế kết quả với dấu câu chuẩn.',
        'Ý nghĩa liên kết tự nhiên, giàu ngữ cảnh.',
      ],
    },
    {
      id: 'grammar-v2-b1-cause-result-links-28-o2',
      prompt: 'Viết 2 câu mô tả một sự cố kỹ thuật hoặc thời tiết bất ngờ và hệ quả của nó, sử dụng "due to" và "As a result,".',
      modelAnswer: 'The central railway station suspended all morning departures due to an unexpected electrical power failure. As a result, hundreds of commuters had to arrange alternative taxi transport to reach their offices.',
      checks: [
        'Sử dụng chính xác "due to + Noun phrase" chỉ nguyên nhân.',
        'Sử dụng chính xác "As a result," chỉ kết quả.',
        'Văn phong mạch lạc, đúng cấp độ B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-clauses-of-cause-and-result',
      title: 'British Council LearnEnglish: Clauses of reason and result',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/clauses-reason-result',
      claims: [
        'Because, as, and since are conjunctions followed by a clause.',
        'Because of and due to are prepositions followed by a noun phrase.',
        'So, therefore, and as a result indicate consequences, with therefore and as a result used in formal writing with appropriate punctuation.',
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

export default causeResultLinksLesson;
