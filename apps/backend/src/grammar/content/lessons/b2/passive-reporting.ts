/**
 * @file passive-reporting.ts
 * @description B2 lesson 16: Passive reporting structures (It is said that... / Subject is said to...).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-passive-reporting-16',
  revisionId: 'grammar-v2-b2-passive-reporting-16@1.0.0',
  revision: '1.0.0',
  title: 'Cấu trúc bị động tường thuật (Passive Reporting)',
  objective: 'Truyền đạt thông tin, tin đồn, nhận định khách quan trong báo chí và văn phong học thuật bằng cấu trúc bị động tường thuật với "It is said that..." và "Subject is said to be / have been".',
  prerequisiteIds: ['grammar-v2-b2-should-have-criticism-15'],
  coverage: ['passive-reporting', 'impersonal-passive', 'reporting-verbs', 'distance-distancing', 'formal-register'],
  context: {
    english: 'Journalists, formal spokespersons, and academic researchers use passive reporting structures when circulating claims without naming specific informants or when maintaining neutral distance.',
    vietnamese: 'Nhà báo, người phát ngôn chính thức và nhà nghiên cứu sử dụng cấu trúc bị động tường thuật khi truyền tải thông tin mà không nêu tên nguồn tin cụ thể hoặc muốn giữ khoảng cách trung lập, khách quan.',
  },
  guide: {
    pattern: '1) It + be + V3(reporting) + that + S + V | 2) S + be + V3(reporting) + to-infinitive / to have V3',
    whenToUse: [
      'Báo cáo quan điểm cộng đồng, tin đồn hoặc phát hiện nghiên cứu mà không muốn quy trách nhiệm cho một cá nhân cụ thể.',
      'Tạo khoảng cách khách quan (distancing) trong bài viết báo chí hoặc luận văn khoa học.',
      'Chuyển trọng tâm thông điệp sang đối tượng được đồn đoán thay vì người đưa tin.',
    ],
    signalWords: ['it is reported that', 'is believed to', 'is said to have', 'widely considered to', 'alleged to'],
    check: [
      'Nếu hành động được tường thuật xảy ra cùng thời với động từ tường thuật, đã dùng to-V (hoặc to be V-ing) chưa?',
      'Nếu hành động được tường thuật xảy ra trước thời điểm tường thuật, đã dùng to have V3 chưa?',
      'Chủ ngữ giả "It" chỉ đi với mệnh đề "that...", không đi với "to-infinitive"?',
    ],
  },
  explanation: 'Cấu trúc bị động tường thuật (Passive Reporting Structures) có hai mẫu chính. Mẫu 1 dùng chủ ngữ giả: "It + be + V3(reporting) + that + clause" (ví dụ: It is believed that the market will stabilize). Mẫu 2 đưa chủ ngữ của mệnh đề sau lên làm chủ ngữ chính: "Subject + be + V3(reporting) + to-infinitive" (nếu cùng thì) hoặc "to have + V3" (nếu hành động đó xảy ra trước thời điểm tường thuật). Các động từ tường thuật thông dụng gồm: say, report, believe, consider, expect, allege, claim, think, understand.',
  examples: [
    {
      english: 'It is reported that the two companies are negotiating a merger.',
      vietnamese: 'Có tin báo cáo rằng hai công ty đang đàm phán sáp nhập.',
    },
    {
      english: 'The suspect is believed to have fled the country yesterday.',
      vietnamese: 'Nghi phạm được cho là đã trốn ra nước ngoài từ hôm qua.',
    },
    {
      english: 'It was thought that the manuscript had been destroyed during the war.',
      vietnamese: 'Người ta từng nghĩ rằng bản thảo đã bị phá hủy trong chiến tranh.',
    },
    {
      english: 'The new railway line is expected to open by late December.',
      vietnamese: 'Tuyến đường sắt mới dự kiến sẽ khánh thành vào cuối tháng Mười Hai.',
    },
    {
      english: 'She is considered to be one of the foremost experts in organic chemistry.',
      vietnamese: 'Cô ấy được xem là một trong những chuyên gia hàng đầu về hóa hữu cơ.',
    },
    {
      english: 'The ancient temple is said to have stood here for over eight centuries.',
      vietnamese: 'Ngôi đền cổ này được tương truyền là đã đứng vững ở đây hơn tám thế kỷ.',
    },
  ],
  contrasts: [
    {
      form: 'He is said to have embezzled public funds.',
      whyFits: 'Dùng to have embezzled vì hành vi biển thủ xảy ra trước thời điểm người ta đồn đoán (hiện tại is said).',
      whyNot: '"He is said to embezzle" sai nghĩa thời gian vì to embezzle ám chỉ thói quen hiện tại hoặc hành động đang tiếp diễn, không phải việc đã diễn ra trong quá khứ.',
    },
    {
      form: 'It is reported that three factories closed down.',
      whyFits: 'Mẫu "It is reported that" giữ nguyên cấu trúc mệnh đề quá khứ (three factories closed down) phía sau một cách tự nhiên.',
      whyNot: '"It is reported three factories to close down" sai ngữ pháp vì chủ ngữ giả It không đi kèm cụm tân ngữ + to-infinitive của reporting verb trong mẫu này.',
    },
  ],
  commonMistakes: [
    'Quên lùi thời gian với to have V3 khi hành động được tường thuật xảy ra trước thì của động từ tường thuật.',
    'Nhầm lẫn kết hợp: dùng "It is said to be..." thay vì "It is said that..." hoặc "He is said to be...".',
    'Dùng sai dạng động từ sau to: dùng to + V-past (to went/to took) thay vì to have + V3.',
  ],
  summary: 'Passive reporting giúp diễn đạt ý kiến/tin tức khách quan: "It is said that + clause" hoặc "Subject is said + to V / to have V3". Dùng to have V3 khi hành động được tường thuật xảy ra trước thời điểm tường thuật.',
  exercises: [
    {
      id: 'grammar-v2-b2-passive-reporting-16-q1',
      kind: 'choice',
      prompt: 'Select the correct passive reporting structure: "The missing explorer ___ in a remote mountain valley yesterday."',
      options: [
        { text: 'is believed to have been spotted', correct: true, rationale: 'Explorer is subject; spotting occurred in the past (yesterday) before the present belief, requiring perfect passive infinitive to have been spotted.' },
        { text: 'is believed to be spotted', correct: false, rationale: 'To be spotted expresses a present or future continuous state, not an event completed yesterday.' },
        { text: 'it is believed to be spotted', correct: false, rationale: 'Cannot combine dummy It with a personal subject complement in this pattern.' },
        { text: 'is believed having spotted', correct: false, rationale: 'Passive reporting verbs take an infinitive clause, not a gerund participle.' },
      ],
      acceptedAnswers: [{ text: 'is believed to have been spotted', rationale: 'Uses correct perfect passive infinitive to refer to a prior sighting.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q2',
      kind: 'choice',
      prompt: 'Complete the sentence with impersonal passive: "___ that the economic outlook will improve next quarter."',
      options: [
        { text: 'It is widely anticipated', correct: true, rationale: 'Impersonal passive with dummy It followed by that-clause is grammatically standard.' },
        { text: 'There is widely anticipated', correct: false, rationale: 'There is not used as dummy subject with reporting verbs like anticipate.' },
        { text: 'That is widely anticipated', correct: false, rationale: 'Demonstrative That cannot introduce an impersonal reporting passive clause.' },
        { text: 'He is widely anticipated', correct: false, rationale: 'Personal pronoun He does not fit an impersonal that-clause context.' },
      ],
      acceptedAnswers: [{ text: 'It is widely anticipated', rationale: 'Standard impersonal passive reporting formula.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q3',
      kind: 'choice',
      prompt: 'Choose the sentence that correctly conveys that an architect lived in this villa in the 19th century:',
      options: [
        { text: 'The famous architect is said to have designed this villa.', correct: true, rationale: 'Subject + is said + to have designed reflects present reputation about past deed.' },
        { text: 'The famous architect is said designing this villa.', correct: false, rationale: 'Reporting verbs take to-infinitive, never bare -ing.' },
        { text: 'It is said the famous architect to have designed this villa.', correct: false, rationale: 'Impersonal It takes a that-clause, not an accusative plus infinitive.' },
        { text: 'The famous architect says to design this villa.', correct: false, rationale: 'Active voice says distorts meaning into personal declaration.' },
      ],
      acceptedAnswers: [{ text: 'The famous architect is said to have designed this villa.', rationale: 'Correct personal passive reporting structure with perfect infinitive.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q4',
      kind: 'choice',
      prompt: 'Which reporting structure correctly describes a current ongoing trial?',
      options: [
        { text: 'The former minister is understood to be cooperating with investigators.', correct: true, rationale: 'To be cooperating conveys an action currently in progress.' },
        { text: 'The former minister is understood to cooperated with investigators.', correct: false, rationale: 'Cannot follow to with past tense verb cooperated.' },
        { text: 'It is understood the former minister to be cooperating with investigators.', correct: false, rationale: 'It takes a that-clause with finite verb, not an infinitive phrase.' },
        { text: 'The former minister understands to be cooperating with investigators.', correct: false, rationale: 'Active voice does not express passive public knowledge.' },
      ],
      acceptedAnswers: [{ text: 'The former minister is understood to be cooperating with investigators.', rationale: 'Continuous infinitive correctly conveys ongoing cooperation.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q5',
      kind: 'gap',
      prompt: 'Fill in the gap with the correct form of "have": "The rare manuscript is thought to _____ been stolen two weeks ago."',
      options: [],
      acceptedAnswers: [{ text: 'have', rationale: 'Perfect passive infinitive requires auxiliary have.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q6',
      kind: 'gap',
      prompt: 'Fill in the gap to complete the impersonal structure: "_____ is estimated that over ten thousand species remain undiscovered."',
      options: [],
      acceptedAnswers: [{ text: 'It', rationale: 'Dummy pronoun It introduces impersonal passive reporting clause.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q7',
      kind: 'gap',
      prompt: 'Supply the prepositional connector to complete the infinitive: "The company is expected _____ announce record quarterly profits tomorrow."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Reporting verbs in personal passive pattern are followed by to-infinitive.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q8',
      kind: 'gap',
      prompt: 'Supply the missing reporting participle: "It is generally _____ (believe) that clean energy will dominate future power grids."',
      options: [],
      acceptedAnswers: [{ text: 'believed', rationale: 'Past participle believed forms passive with is.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q9',
      kind: 'transform',
      prompt: 'Rewrite using "is reported to": "People report that the tech billionaire is building a deep-sea research vessel."',
      options: [],
      acceptedAnswers: [
        { text: 'The tech billionaire is reported to be building a deep-sea research vessel.', rationale: 'Subject fronted with is reported to be building expressing ongoing action.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q10',
      kind: 'transform',
      prompt: 'Rewrite starting with "It is said that": "The team captain is said to have retired from international competition."',
      options: [],
      acceptedAnswers: [
        { text: 'It is said that the team captain retired from international competition.', rationale: 'Transforms personal passive into impersonal It is said that + past clause.' },
        { text: 'It is said that the team captain has retired from international competition.', rationale: 'Present perfect accepted for prior retirement event.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q11',
      kind: 'correction',
      prompt: 'Correct the error in this passive reporting sentence: "He is alleged to embezzled millions of dollars before leaving the country."',
      options: [],
      acceptedAnswers: [
        { text: 'He is alleged to have embezzled millions of dollars before leaving the country.', rationale: 'Changes to embezzled to perfect infinitive to have embezzled.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "It is believed the ancient wall to be more than two thousand years old."',
      options: [],
      acceptedAnswers: [
        { text: 'The ancient wall is believed to be more than two thousand years old.', rationale: 'Converts ungrammatical It-construction into correct personal passive structure.' },
        { text: 'It is believed that the ancient wall is more than two thousand years old.', rationale: 'Converts into correct impersonal It is believed that clause.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-passive-reporting-16-r1',
      kind: 'choice',
      prompt: 'Choose the most natural passive reporting clause: "The painting ___ painted by a student of Leonardo da Vinci."',
      options: [
        { text: 'is now thought to have been', correct: true, rationale: 'Subject + is thought + to have been painted conveys present evaluation of past creation.' },
        { text: 'is now thought to be', correct: false, rationale: 'To be painted would indicate present creation, which is historically false.' },
        { text: 'it is now thought to have', correct: false, rationale: 'Incorrect fusion of dummy pronoun It and personal subject.' },
      ],
      acceptedAnswers: [{ text: 'is now thought to have been', rationale: 'Uses correct past passive infinitive to have been.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-r2',
      kind: 'gap',
      prompt: 'Fill in the missing word: "It _____ understood that the diplomatic talks concluded amicably yesterday."',
      options: [],
      acceptedAnswers: [{ text: 'is', rationale: 'Present passive is understood expresses current public knowledge.' }],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-r3',
      kind: 'transform',
      prompt: 'Rewrite using "is considered to have": "Experts consider that the author wrote the final chapters during his exile."',
      options: [],
      acceptedAnswers: [
        { text: 'The author is considered to have written the final chapters during his exile.', rationale: 'Fronts author with is considered to have written.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "The suspect is believed that he crossed the border last night."',
      options: [],
      acceptedAnswers: [
        { text: 'The suspect is believed to have crossed the border last night.', rationale: 'Replaces improper that-clause after personal subject with to have crossed.' },
        { text: 'It is believed that the suspect crossed the border last night.', rationale: 'Replaces personal subject with impersonal It is believed that.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-passive-reporting-16-o1',
      prompt: 'Viết 1-2 câu theo phong cách báo chí truyền đạt tin tức về một vụ sáp nhập doanh nghiệp công nghệ lớn, sử dụng cấu trúc "It is reported that..." hoặc "The company is said to...".',
      modelAnswer: 'It is reported that the artificial intelligence start-up is preparing for a multi-billion dollar acquisition. The founder is said to have met international investors in Singapore earlier this week.',
      checks: [
        'Sử dụng cấu trúc It is reported that... hoặc Subject + be + said/believed to...',
        'Sử dụng đúng thì và dạng nguyên mẫu (to V hoặc to have V3).',
        'Văn phong báo chí khách quan, chuẩn xác.',
      ],
    },
    {
      id: 'grammar-v2-b2-passive-reporting-16-o2',
      prompt: 'Viết 1-2 câu học thuật thảo luận về một di tích lịch sử hoặc một phát minh cổ đại bằng cách dùng "is widely believed to have been..." hoặc "is considered to be...".',
      modelAnswer: 'The subterranean irrigation system is widely believed to have been engineered during the early Bronze Age. It is considered to be one of the most sophisticated hydrological achievements of the ancient world.',
      checks: [
        'Sử dụng cấu trúc personal passive reporting (Subject + is believed/considered to...).',
        'Dùng to have been V3 nếu hành động thuộc về quá khứ lịch sử.',
        'Diễn đạt trôi chảy và phù hợp với ngữ cảnh học thuật.',
      ],
    },
  ],
  sources: [
    {
      id: 'bc-passive-reporting',
      title: 'British Council: Passive reporting structures',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/passives',
      claims: [
        'Passive reporting verbs (say, believe, think, report) can be used with dummy it (It is said that...) or with personal subject plus to-infinitive.',
        'Use to have + past participle when the reported event took place before the reporting event.',
      ],
      checkedAt: '2026-10-05',
      provenance: 'reference-only',
    },
  ],
  review: {
    status: 'approved',
    mode: 'ai-internal',
    reviewer: 'OpenAI Codex (AI-internal editorial review)',
    reviewedAt: '2026-10-06T00:00:00.000Z',
    summary: 'AI-internal review of teaching content, controlled and transfer exercises, output prompts, and reference claims; corrected ambiguity and overgeneralized rules.',
    checks: { originalProse: true, factualExplanation: true, clearContrasts: true, singleCorrectChoice: true, validTransferExercises: true, soundOutputPrompts: true, referenceOnlySources: true },
  },
};
export default lesson;
