/**
 * @file passive-infinitives-gerunds.ts
 * @description B2 lesson 17: Passive infinitives (to be done / to have been done) and passive gerunds (being done / having been done).
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-passive-infinitives-gerunds-17',
  revisionId: 'grammar-v2-b2-passive-infinitives-gerunds-17@1.0.0',
  revision: '1.0.0',
  title: 'Dạng bị động của to-infinitive và gerund (Passive Infinitives and Gerunds)',
  objective: 'Nhận biết và sử dụng chuẩn xác các dạng bị động to be done, to have been done, being done và having been done sau các động từ, tính từ và giới từ phù hợp.',
  prerequisiteIds: ['grammar-v2-b2-passive-reporting-16'],
  coverage: ['passive-infinitives-gerunds', 'passive-infinitive', 'passive-gerund', 'perfect-passive-infinitive', 'verb-patterns'],
  context: {
    english: 'In formal discussions and professional feedback, speakers focus on what happens to someone or something by selecting passive infinitives or passive gerunds following specific verbs and prepositions.',
    vietnamese: 'Trong trao đổi chuyên môn và đánh giá công việc, người nói tập trung vào tác động lên đối tượng bằng cách lựa chọn dạng bị động của to-infinitive hoặc gerund theo sau các động từ và giới từ tương ứng.',
  },
  guide: {
    pattern: 'Verb/Adj + to be V3 / to have been V3 | Verb/Prep + being V3 / having been V3',
    whenToUse: [
      'Sau các động từ nhận to-infinitive (want, expect, hope, deserve) khi chủ ngữ chịu tác động của hành động.',
      'Sau các động từ nhận gerund (enjoy, avoid, resent, mind) hoặc sau giới từ khi chủ ngữ bị tác động.',
      'Dùng dạng hoàn thành (to have been V3 / having been V3) để nhấn mạnh việc bị tác động đã hoàn tất trong quá khứ trước mốc thời gian chính.',
    ],
    signalWords: ['deserve to be', 'expect to be', 'avoid being', 'look forward to being', 'resent having been'],
    check: [
      'Động từ chính đi với to-infinitive hay V-ing?',
      'Chủ ngữ thực hiện hay chịu hành động (chủ động hay bị động)?',
      'Hành động bị động có xảy ra trước hành động chính để cần dạng perfect passive (having been / to have been) không?',
    ],
  },
  explanation: 'Động từ nguyên mẫu (infinitive) và danh động từ (gerund) đều có dạng bị động tương ứng. Passive to-infinitive có dạng hiện tại "to be + V3" (He hopes to be promoted) và dạng hoàn thành "to have been + V3" (She claims to have been misunderstood). Passive gerund có dạng hiện tại "being + V3" (Nobody likes being criticized) và dạng hoàn thành "having been + V3" (He remembered having been warned). Sau giới từ, luôn luôn dùng dạng passive gerund (being V3 hoặc having been V3).',
  examples: [
    {
      english: 'Every citizen deserves to be treated with equal dignity.',
      vietnamese: 'Mọi công dân đều xứng đáng được đối xử với phẩm giá bình đẳng.',
    },
    {
      english: 'The candidate was thrilled to be selected for the final interview round.',
      vietnamese: 'Ứng viên rất vui mừng khi được chọn vào vòng phỏng vấn cuối cùng.',
    },
    {
      english: 'He managed to avoid being recognized by wearing a disguise.',
      vietnamese: 'Anh ấy đã né tránh được việc bị nhận diện bằng cách cải trang.',
    },
    {
      english: 'She resents being asked personal questions during client meetings.',
      vietnamese: 'Cô ấy khó chịu khi bị hỏi những câu riêng tư trong các cuộc họp với khách hàng.',
    },
    {
      english: 'The museum director claims to have been misled by the art dealer.',
      vietnamese: 'Giám đốc bảo tàng khẳng định đã bị người môi giới nghệ thuật lừa dối.',
    },
    {
      english: 'After having been inspected thoroughly, the aircraft was cleared for takeoff.',
      vietnamese: 'Sau khi đã được kiểm tra kỹ lưỡng, chiếc máy bay đã được phép cất cánh.',
    },
  ],
  contrasts: [
    {
      form: 'He wants to be notified immediately if any emergency arises.',
      whyFits: 'Muốn người khác thông báo cho mình nên dùng passive infinitive "to be notified".',
      whyNot: '"He wants to notify immediately" nghĩa là anh ấy muốn tự mình đi thông báo cho ai đó, trái ngược với ý muốn nhận thông tin.',
    },
    {
      form: 'She insisted on being informed of every single change.',
      whyFits: 'Sau giới từ "on" bắt buộc dùng gerund; nghĩa bị động yêu cầu "being informed".',
      whyNot: '"She insisted on to be informed" sai ngữ pháp vì sau giới từ không được dùng to-infinitive.',
    },
  ],
  commonMistakes: [
    'Dùng to-infinitive sau giới từ thay vì passive gerund (viết "instead of to be told" thay vì "instead of being told").',
    'Dùng dạng chủ động khi ý nghĩa rõ ràng là bị động (viết "He hates criticizing" trong khi muốn nói "He hates being criticized").',
    'Nhầm lẫn giữa being V3 và having been V3 khi thứ tự thời gian yêu cầu nhấn mạnh hành động hoàn tất trong quá khứ.',
  ],
  summary: 'Passive infinitive: to be V3 / to have been V3. Passive gerund: being V3 / having been V3. Sau giới từ dùng gerund; chọn chủ động hay bị động dựa trên chủ thể chịu hay gây tác động.',
  exercises: [
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q1',
      kind: 'choice',
      prompt: 'Select the correct form to complete the sentence: "The young designer was thrilled ___ by the prestigious fashion house."',
      options: [
        { text: 'to be recruited', correct: true, rationale: 'Thrilled is followed by to-infinitive; passive voice to be recruited fits being hired.' },
        { text: 'being recruited', correct: false, rationale: 'Adjectives like thrilled take to-infinitive, not bare gerund.' },
        { text: 'to recruit', correct: false, rationale: 'Active to recruit implies the designer recruited the fashion house.' },
        { text: 'to have recruited', correct: false, rationale: 'Active perfect infinitive fails to convey passive receipt of hiring.' },
      ],
      acceptedAnswers: [{ text: 'to be recruited', rationale: 'Thrilled takes to be recruited in the passive.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q2',
      kind: 'choice',
      prompt: 'Choose the correct form after the preposition: "She complained about ___ left out of the planning committee."',
      options: [
        { text: 'being', correct: true, rationale: 'Preposition about requires gerund; being left out is passive.' },
        { text: 'to be', correct: false, rationale: 'Prepositions cannot be followed directly by to-infinitive.' },
        { text: 'be', correct: false, rationale: 'Bare infinitive be cannot follow a preposition.' },
        { text: 'been', correct: false, rationale: 'Past participle been cannot stand alone as prepositional complement.' },
      ],
      acceptedAnswers: [{ text: 'being', rationale: 'Preposition about takes being left out.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q3',
      kind: 'choice',
      prompt: 'Select the sentence with the correct perfect passive infinitive: "The athlete claims ___ given misleading advice by the coach years ago."',
      options: [
        { text: 'to have been', correct: true, rationale: 'Claim takes to-infinitive; to have been given indicates prior past action.' },
        { text: 'to being', correct: false, rationale: 'To being is ungrammatical as an infinitive phrase.' },
        { text: 'having been', correct: false, rationale: 'Claim typically governs to-infinitive rather than standalone gerund complement here.' },
        { text: 'to had been', correct: false, rationale: 'Cannot follow infinitive marker to with past auxiliary had.' },
      ],
      acceptedAnswers: [{ text: 'to have been', rationale: 'Claims to have been given indicates prior passive experience.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q4',
      kind: 'choice',
      prompt: 'Which verb pattern correctly completes: "The suspect denied ___ near the crime scene on Tuesday evening."',
      options: [
        { text: 'having been seen', correct: true, rationale: 'Deny takes gerund; having been seen is the perfect passive gerund.' },
        { text: 'to be seen', correct: false, rationale: 'Deny does not take to-infinitive.' },
        { text: 'to have seen', correct: false, rationale: 'Active infinitive doesn’t fit verb complementation or passive sense.' },
        { text: 'being saw', correct: false, rationale: 'Saw is past tense, whereas passive requires past participle seen.' },
      ],
      acceptedAnswers: [{ text: 'having been seen', rationale: 'Deny takes perfect passive gerund having been seen.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q5',
      kind: 'gap',
      prompt: 'Fill in the gap with the passive form of "tell": "I hate _____ (tell) what to do by people who do not understand the problem."',
      options: [],
      acceptedAnswers: [{ text: 'being told', rationale: 'Hate + being told expresses irritation at being instructed.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q6',
      kind: 'gap',
      prompt: 'Fill in the missing word: "The package was expected to _____ delivered before noon."',
      options: [],
      acceptedAnswers: [{ text: 'be', rationale: 'Passive infinitive formula is to be + past participle delivered.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q7',
      kind: 'gap',
      prompt: 'Fill in the gap: "The historic manuscript deserves to be _____ (preserve) in temperature-controlled archives."',
      options: [],
      acceptedAnswers: [{ text: 'preserved', rationale: 'Past participle preserved completes passive infinitive.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q8',
      kind: 'gap',
      prompt: 'Supply the auxiliary for the perfect passive gerund: "She was grateful for _____ been invited to give the keynote address."',
      options: [],
      acceptedAnswers: [{ text: 'having', rationale: 'Having been invited forms perfect passive gerund after for.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q9',
      kind: 'transform',
      prompt: 'Rewrite using a passive infinitive with "hope": "The researcher hopes that the committee will award her a grant."',
      options: [],
      acceptedAnswers: [
        { text: 'The researcher hopes to be awarded a grant by the committee.', rationale: 'Converts finite hope clause to passive infinitive to be awarded.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q10',
      kind: 'transform',
      prompt: 'Rewrite using "avoid being": "The politician tried not to let the press photograph him leaving the club."',
      options: [],
      acceptedAnswers: [
        { text: 'The politician tried to avoid being photographed leaving the club.', rationale: 'Uses avoid + being photographed to express passive avoidance.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q11',
      kind: 'correction',
      prompt: 'Correct the error: "He walked out of the meeting without to be noticed by the chairman."',
      options: [],
      acceptedAnswers: [
        { text: 'He walked out of the meeting without being noticed by the chairman.', rationale: 'Changes to be noticed to being noticed after preposition without.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-q12',
      kind: 'correction',
      prompt: 'Correct the error: "The antique clock seems to been damaged during shipping."',
      options: [],
      acceptedAnswers: [
        { text: 'The antique clock seems to have been damaged during shipping.', rationale: 'Adds auxiliary have: to have been damaged.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-r1',
      kind: 'choice',
      prompt: 'Choose the correct passive form: "No employee appreciates ___ reprimanded in front of colleagues."',
      options: [
        { text: 'being', correct: true, rationale: 'Appreciate takes gerund; being reprimanded is passive.' },
        { text: 'to be', correct: false, rationale: 'Appreciate takes gerund, not infinitive.' },
        { text: 'having', correct: false, rationale: 'Having reprimanded would be active voice.' },
      ],
      acceptedAnswers: [{ text: 'being', rationale: 'Appreciates being reprimanded.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-r2',
      kind: 'gap',
      prompt: 'Fill in the gap: "The building appears _____ have been constructed in the early eighteenth century."',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Appears to have been constructed.' }],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-r3',
      kind: 'transform',
      prompt: 'Rewrite using "resent being": "The artist resents it when critics call his work derivative."',
      options: [],
      acceptedAnswers: [
        { text: 'The artist resents being called derivative by critics.', rationale: 'Uses resent + being called derivative.' },
      ],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "The document needs to being signed by two legal witnesses."',
      options: [],
      acceptedAnswers: [
        { text: 'The document needs to be signed by two legal witnesses.', rationale: 'Changes to being to to be signed.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-o1',
      prompt: 'Viết 1-2 câu trong môi trường làm việc chia sẻ về kỳ vọng của bạn khi gia nhập một dự án mới, sử dụng cụm "expect to be informed" hoặc "look forward to being involved".',
      modelAnswer: 'When joining the multidisciplinary research project, I expect to be kept informed of key timeline adjustments. I genuinely look forward to being involved in cross-departmental strategy reviews.',
      checks: [
        'Sử dụng ít nhất một cấu trúc passive infinitive (expect to be...) hoặc passive gerund (look forward to being...).',
        'Đúng ngữ pháp chia động từ sau giới từ hoặc sau động từ chính.',
        'Ý nghĩa tự nhiên, mạch lạc trong bối cảnh công việc.',
      ],
    },
    {
      id: 'grammar-v2-b2-passive-infinitives-gerunds-17-o2',
      prompt: 'Viết 1-2 câu nhận xét về một sự cố sản phẩm hoặc sai sót trong dịch vụ, sử dụng cấu trúc "claims to have been misled" hoặc "avoid being criticized".',
      modelAnswer: 'The procurement manager claims to have been misled by ambiguous component specifications. To avoid being criticized by auditors, the firm has initiated an immediate independent verification of all supplier contracts.',
      checks: [
        'Sử dụng perfect passive infinitive (claims to have been V3) hoặc passive gerund (avoid being V3).',
        'Áp dụng đúng vị trí ngữ pháp và nghĩa bị động.',
        'Văn phong mạch lạc, đúng chuẩn B2.',
      ],
    },
  ],
  sources: [
    {
      id: 'bc-passive-infinitives-gerunds',
      title: 'British Council: Passive forms with infinitives and -ing',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/passives',
      claims: [
        'Passive infinitives use to be + past participle, or to have been + past participle for earlier actions.',
        'Passive gerunds use being + past participle, or having been + past participle.',
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
