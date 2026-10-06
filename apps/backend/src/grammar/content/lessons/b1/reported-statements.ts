/**
 * @file reported-statements.ts
 * @description B1 lesson on reported statements using say and tell, pronoun shifts, and basic backshift.
 */
import type { GrammarLesson } from '../../types.js';

const reportedStatementsLesson: GrammarLesson = {
  id: 'grammar-v2-b1-reported-statements-16',
  revisionId: 'grammar-v2-b1-reported-statements-16@1.0.0',
  revision: '1.0.0',
  title: 'Câu tường thuật: Câu trần thuật (Reported Statements)',
  objective: 'Chuyển câu trần thuật trực tiếp sang câu gián tiếp với động từ say và tell, thay đổi đại từ và trạng từ không gian thời gian phù hợp.',
  prerequisiteIds: ['grammar-v2-b1-causative-have-get-15'],
  coverage: ['reported-statements', 'say-vs-tell', 'pronoun-shift', 'time-place-shift', 'indirect-speech'],
  context: {
    english: 'At the office, Minh spoke with his manager. Later, he told his colleagues: "The director said that we had to finalize the project this week."',
    vietnamese: 'Tại văn phòng, Minh trao đổi với quản lý. Sau đó anh kể lại với đồng nghiệp: "Giám đốc nói rằng chúng ta phải hoàn thành dự án trong tuần này."',
  },
  guide: {
    pattern: 'Subject + said (that) + clause / Subject + told + object + (that) + clause',
    whenToUse: [
      'Thuật lại lời nói hoặc ý kiến của người khác mà không trích dẫn nguyên văn.',
      'Dùng "say" khi không nhắc trực tiếp người nghe, hoặc "say to someone".',
      'Dùng "tell" khi có tân ngữ chỉ người nhận thông tin ngay phía sau (tell someone).',
    ],
    signalWords: ['said that', 'told me that', 'the day before', 'the following day', 'there'],
    check: [
      'Sau "tell" có tân ngữ người không (told me, không dùng told that)?',
      'Đại từ và tính từ sở hữu đã chuyển phù hợp với người nói và người nghe chưa?',
      'Thời gian hoặc nơi chốn đã thay đổi chưa? Chỉ đổi here/now/tomorrow khi góc nhìn mới đòi hỏi.',
    ],
  },
  explanation: 'Trong câu tường thuật trần thuật, dùng said (that) + mệnh đề hoặc told + người nhận + (that) + mệnh đề. Với say, người nghe đi sau to (said to me), không đứng trực tiếp sau said. Quy tắc tân ngữ này áp dụng cho mẫu tường thuật đang học, không phải mọi cách dùng tell (tell a story vẫn đúng). Đại từ và từ sở hữu theo người được nhắc đến: I có thể thành he/she hoặc vẫn là I nếu chính người nói thuật lại. Thời gian và nơi chốn chỉ đổi khi góc nhìn thay đổi: tomorrow có thể thành the following day, here có thể thành there. Nếu thuật lại cùng ngày hoặc cùng nơi, các từ gốc có thể giữ nguyên. Các bài yêu cầu backshift luyện một cách tường thuật hợp lệ, không phủ nhận các cách giữ thì phù hợp ngữ cảnh.',
  examples: [
    { english: 'Direct: "I work in Da Nang," Lan said. -> Reported: Lan said that she worked in Da Nang.', vietnamese: 'Trực tiếp: "Tôi làm việc ở Đà Nẵng," Lan nói. -> Gián tiếp: Lan nói rằng cô ấy làm việc ở Đà Nẵng.' },
    { english: 'Direct: "I will call you tomorrow," Huy told me. -> Reported: Huy told me that he would call me the next day.', vietnamese: 'Trực tiếp: "Tôi sẽ gọi cho bạn ngày mai," Huy bảo tôi. -> Gián tiếp: Huy bảo tôi rằng anh ấy sẽ gọi cho tôi vào ngày hôm sau.' },
    { english: 'Direct: "We are preparing the report now," they said. -> Reported: They said that they were preparing the report then.', vietnamese: 'Trực tiếp: "Chúng tôi đang chuẩn bị báo cáo bây giờ," họ nói. -> Gián tiếp: Họ nói rằng lúc đó họ đang chuẩn bị báo cáo.' },
    { english: 'Direct: "I cannot meet you here," Nam said to me. -> Reported: Nam told me that he could not meet me there.', vietnamese: 'Trực tiếp: "Tôi không thể gặp bạn ở đây," Nam nói với tôi. -> Gián tiếp: Nam bảo tôi rằng anh ấy không thể gặp tôi ở đó.' },
    { english: 'Direct: "My sister bought a new laptop," Hoa said. -> Reported: Hoa said that her sister had bought a new laptop.', vietnamese: 'Trực tiếp: "Chị tôi đã mua laptop mới," Hoa nói. -> Gián tiếp: Hoa nói rằng chị cô ấy đã mua một chiếc laptop mới.' },
    { english: 'Direct: "You have done a great job," the manager told us. -> Reported: The manager told us that we had done a great job.', vietnamese: 'Trực tiếp: "Các bạn đã làm rất tốt," quản lý nói với chúng tôi. -> Gián tiếp: Quản lý bảo chúng tôi rằng chúng tôi đã làm rất tốt.' },
  ],
  contrasts: [
    {
      form: 'Lan said that she was tired vs Lan told me that she was tired',
      whyFits: 'Cả hai đều đúng: said không cần tân ngữ người, trong khi told bắt buộc đi kèm tân ngữ me.',
      whyNot: 'Không nói "Lan told that she was tired" (thiếu tân ngữ sau told) hoặc "Lan said me that she was tired" (thừa me sau said).',
    },
    {
      form: 'Tom said that he loved his job vs Tom said: "I love my job."',
      whyFits: 'Câu gián tiếp dùng đại từ he và tính từ sở hữu his để phù hợp với góc nhìn của người thuật lại.',
      whyNot: 'Không giữ nguyên đại từ ngôi thứ nhất "I" trong câu tường thuật nếu người thuật lại là người thứ ba.',
    },
  ],
  commonMistakes: [
    'Dùng "told that" không có tân ngữ (ví dụ: He told that he was busy). Sửa: He told me that he was busy hoặc He said that he was busy.',
    'Dùng said me để chỉ người nghe. Sửa: She told me the news hoặc She said to me that the meeting was canceled.',
    'Đổi tomorrow/here máy móc dù vẫn thuật lại cùng ngày/cùng nơi; hoặc giữ nguyên dù góc nhìn đã đổi.',
  ],
  summary: 'Khi tường thuật câu trần thuật: dùng "said (that)" hoặc "told + tân ngữ + (that)". Đổi đại từ và trạng từ thời gian/nơi chốn theo góc nhìn người thuật lại.',
  exercises: [
    {
      id: 'grammar-v2-b1-reported-statements-16-q1',
      kind: 'choice',
      prompt: 'Choose the correct reporting verb: "Mai _____ us that she would arrive late because of traffic."',
      options: [
        { text: 'told', correct: true, rationale: '"Told" is followed directly by an object pronoun (us).' },
        { text: 'said', correct: false, rationale: '"Said" cannot take a direct person object without the preposition "to".' },
        { text: 'spoke', correct: false, rationale: '"Spoke" is not used to report statements with a that-clause.' },
        { text: 'talked', correct: false, rationale: '"Talked" does not take a direct object pronoun and that-clause.' },
      ],
      acceptedAnswers: [{ text: 'told', rationale: '"Told" takes a direct personal object.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q2',
      kind: 'choice',
      prompt: 'Select the correct sentence with "said":',
      options: [
        { text: 'The teacher said that the exam would start at eight.', correct: true, rationale: '"Said that" is the standard form without a direct personal object.' },
        { text: 'The teacher said me that the exam would start at eight.', correct: false, rationale: '"Said" cannot take a direct object without "to".' },
        { text: 'The teacher told that the exam would start at eight.', correct: false, rationale: '"Told" requires a personal object before "that".' },
        { text: 'The teacher said us that the exam would start at eight.', correct: false, rationale: '"Said us" is ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'The teacher said that the exam would start at eight.', rationale: 'Correct reporting structure.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q3',
      kind: 'choice',
      prompt: 'Report from a later date using backshift: "I will sign the contract tomorrow," Mr. An said.',
      options: [
        { text: 'Mr. An said that he would sign the contract the following day.', correct: true, rationale: '"Tomorrow" shifts to "the following day" or "the next day".' },
        { text: 'Mr. An said that he would sign the contract yesterday.', correct: false, rationale: '"Yesterday" refers to the past, not tomorrow.' },
        { text: 'Mr. An said that he will sign the contract tomorrow.', correct: false, rationale: 'Fails to shift the modal and time expression.' },
        { text: 'Mr. An told that he would sign the contract the following day.', correct: false, rationale: '"Told" lacks a required object.' },
      ],
      acceptedAnswers: [{ text: 'Mr. An said that he would sign the contract the following day.', rationale: '"Tomorrow" becomes "the following day".' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q4',
      kind: 'choice',
      prompt: 'Which sentence correctly shifts pronouns: Huy said: "My brother lives in Can Tho with me."',
      options: [
        { text: 'Huy said that his brother lived in Can Tho with him.', correct: true, rationale: '"My" becomes "his" and "me" becomes "him".' },
        { text: 'Huy said that my brother lived in Can Tho with me.', correct: false, rationale: 'Pronouns must shift to reflect Huy\'s perspective.' },
        { text: 'Huy told that his brother lived in Can Tho with him.', correct: false, rationale: '"Told" requires an object.' },
        { text: 'Huy said that his brother lived in Can Tho with me.', correct: false, rationale: '"Me" should shift to "him".' },
      ],
      acceptedAnswers: [{ text: 'Huy said that his brother lived in Can Tho with him.', rationale: 'Correct pronoun adjustment.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q5',
      kind: 'gap',
      prompt: 'Complete the reported sentence with the correct verb (said / told): "Linh _____ her parents that she had passed the driving test."',
      options: [],
      acceptedAnswers: [{ text: 'told', rationale: '"Her parents" is the personal object directly after the verb.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q6',
      kind: 'gap',
      prompt: 'Report after the departure; fill only the changed time word: "I am leaving now," Ba said. -> Ba said that he was leaving _____.',
      options: [],
      acceptedAnswers: [{ text: 'then', rationale: '"Now" shifts to "then" in reported speech.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q7',
      kind: 'gap',
      prompt: 'Report from a different location; fill only the place word: "We cannot park here," they said. -> They said that they could not park _____.',
      options: [],
      acceptedAnswers: [{ text: 'there', rationale: '"Here" shifts to "there" in reported speech.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q8',
      kind: 'gap',
      prompt: 'Complete with the appropriate reporting verb (said / told): "The doctor _____ that I needed more sleep."',
      options: [],
      acceptedAnswers: [{ text: 'said', rationale: '"Said" is used before a that-clause when no person object is present.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q9',
      kind: 'transform',
      prompt: 'Rewrite using "told" and backshift; begin "Dung told me": "I will send you the invoice," Dung said to me.',
      options: [],
      acceptedAnswers: [
        { text: 'Dung told me that he would send me the invoice.', rationale: 'Shifts said to me -> told me, will -> would, you -> me.' },
        { text: 'Dung told me that she would send me the invoice.', rationale: 'Accepts female pronoun for Dung.' },
        { text: 'Dung told me he would send me the invoice.', rationale: 'Accepts omission of that.' },
        { text: 'Dung told me she would send me the invoice.', rationale: 'Accepts omission of that with female pronoun.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q10',
      kind: 'transform',
      prompt: 'Report on a later day with backshift; begin "The children said": "We are visiting our grandparents today," the children said.',
      options: [],
      acceptedAnswers: [
        { text: 'The children said that they were visiting their grandparents that day.', rationale: 'Shifts we -> they, are -> were, our -> their, today -> that day.' },
        { text: 'The children said they were visiting their grandparents that day.', rationale: 'Accepts omission of that.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q11',
      kind: 'correction',
      prompt: 'Correct only the reporting verb or add me/us after told; keep all other words: "Quang told that he had lost his keys on the bus."',
      options: [],
      acceptedAnswers: [
        { text: 'Quang said that he had lost his keys on the bus.', rationale: 'Replaces told with said when there is no direct personal object.' },
        { text: 'Quang told me that he had lost his keys on the bus.', rationale: 'Adds a personal object to told.' },
        { text: 'Quang told us that he had lost his keys on the bus.', rationale: 'Adds a personal object to told.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-q12',
      kind: 'correction',
      prompt: 'Correct the reporting error: "My colleague said me that the meeting was postponed."',
      options: [],
      acceptedAnswers: [
        { text: 'My colleague told me that the meeting was postponed.', rationale: 'Changes said me to told me.' },
        { text: 'My colleague said to me that the meeting was postponed.', rationale: 'Adds preposition to after said.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-reported-statements-16-r1',
      kind: 'choice',
      prompt: 'Choose the correct reported sentence: "I visited Nha Trang yesterday," Tam said.',
      options: [
        { text: 'Tam said that he had visited Nha Trang the day before.', correct: true, rationale: 'Past simple shifts to past perfect and yesterday shifts to the day before.' },
        { text: 'Tam told that he visited Nha Trang yesterday.', correct: false, rationale: '"Told" lacks object and time adverb is unchanged.' },
        { text: 'Tam said me that he visited Nha Trang the day before.', correct: false, rationale: '"Said me" is ungrammatical.' },
      ],
      acceptedAnswers: [{ text: 'Tam said that he had visited Nha Trang the day before.', rationale: 'Correct tense, pronoun, and time expression shift.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-r2',
      kind: 'gap',
      prompt: 'Fill in the reporting verb (said / told): "The tour guide _____ all tourists that the bus would leave at 7 a.m."',
      options: [],
      acceptedAnswers: [{ text: 'told', rationale: '"All tourists" is the direct personal object.' }],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-r3',
      kind: 'transform',
      prompt: 'Report later from another place using backshift; begin "Thao said" and use she/her: "I cannot find my passport here," Thao said.',
      options: [],
      acceptedAnswers: [
        { text: 'Thao said that she could not find her passport there.', rationale: 'Shifts cannot -> could not, my -> her, here -> there.' },
        { text: 'Thao said she could not find her passport there.', rationale: 'Accepts omission of that.' },
        { text: "Thao said that she couldn't find her passport there.", rationale: 'Accepts contracted couldn\'t.' },
        { text: "Thao said she couldn't find her passport there.", rationale: 'Accepts contracted couldn\'t without that.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-r4',
      kind: 'correction',
      prompt: 'Report from a later date using backshift; keep "that" and all other words, but replace will and tomorrow: "He said that he will finish the report tomorrow."',
      options: [],
      acceptedAnswers: [
        { text: 'He said that he would finish the report the following day.', rationale: 'Backshifts will -> would and tomorrow -> the following day.' },
        { text: 'He said that he would finish the report the next day.', rationale: 'Accepts the next day.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-reported-statements-16-o1',
      prompt: 'Viết 2 câu thuật lại lời một người bạn hoặc đồng nghiệp vừa chia sẻ về kế hoạch công việc hoặc học tập, sử dụng "said that" và "told me that".',
      modelAnswer: 'Lan told me that she was preparing for an English certification exam. She said that she would take the test the following month.',
      checks: [
        'Sử dụng đúng cấu trúc "told me that" (có tân ngữ) và "said that" (không có tân ngữ trực tiếp).',
        'Chuyển đổi đại từ và lùi thì phù hợp với ngữ cảnh gián tiếp.',
        'Sử dụng trạng từ chỉ thời gian gián tiếp chính xác (ví dụ: the following month).',
      ],
    },
    {
      id: 'grammar-v2-b1-reported-statements-16-o2',
      prompt: 'Viết 2 câu tường thuật một thông báo từ nhà trường hoặc công ty về một thay đổi lịch trình, chú ý đổi thời gian và nơi chốn.',
      modelAnswer: 'The school said that the workshop would take place there the following day. The teacher told us that we had to arrive at nine that morning.',
      checks: [
        'Sử dụng động từ tường thuật phù hợp trong ngữ cảnh công việc/học tập.',
        'Đổi đại từ và trạng ngữ chỉ nơi chốn/thời gian chính xác.',
        'Câu văn mạch lạc, tự nhiên và đúng ngữ pháp B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-reported-statements',
      title: 'British Council LearnEnglish: Reported speech 1 – statements',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-1-statements',
      claims: [
        'Reported statements use reporting verbs such as say and tell.',
        'Tell requires a personal direct object, whereas say does not.',
        'Pronouns, possessives, and adverbs of time and place shift according to the reporting perspective.',
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

export default reportedStatementsLesson;
