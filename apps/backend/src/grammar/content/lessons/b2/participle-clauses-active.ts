/**
 * @file participle-clauses-active.ts
 * @description B2 lesson 20: Active participle clauses (-ing and having + past participle) for time, reason, and result.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-participle-clauses-active-20',
  revisionId: 'grammar-v2-b2-participle-clauses-active-20@1.0.0',
  revision: '1.0.0',
  title: 'Mệnh đề phân từ chủ động (Active Participle Clauses)',
  objective: 'Rút gọn mệnh đề trạng ngữ chỉ thời gian, nguyên nhân và kết quả bằng hiện tại phân từ (V-ing) và phân từ hoàn thành (Having + V3) một cách mạch lạc, tránh lỗi phân từ treo (dangling participle).',
  prerequisiteIds: ['grammar-v2-b2-causative-passive-context-19'],
  coverage: ['participle-clauses-active', 'present-participle-clauses', 'perfect-participle-clauses', 'dangling-participles', 'clausal-reduction'],
  context: {
    english: 'In sophisticated journalism, academic storytelling, and concise technical reports, writers compress sentences by substituting subordinate clauses of time and reason with active participle clauses.',
    vietnamese: 'Trong báo chí phân tích, truyện kể học thuật và báo cáo kỹ thuật súc tích, người viết cô đọng câu văn bằng cách rút gọn các mệnh đề phụ chỉ thời gian và nguyên nhân thành mệnh đề phân từ chủ động.',
  },
  guide: {
    pattern: 'V-ing + ..., Subject + Verb | Having + V3 + ..., Subject + Verb',
    whenToUse: [
      'Rút gọn mệnh đề chỉ hành động đồng thời hoặc diễn ra ngay trước hành động chính (Walking down the street, I met...).',
      'Rút gọn mệnh đề chỉ lý do hoặc nguyên nhân (Knowing how busy she was, I didn’t call).',
      'Dùng Having + V3 khi cần nhấn mạnh hành động thứ nhất đã hoàn tất trước khi hành động thứ hai bắt đầu (Having finished the report, he went home).',
    ],
    signalWords: ['Having completed', 'Realizing that', 'Hearing the alarm', 'Arriving at the station', 'Not wanting to'],
    check: [
      'Chủ ngữ của mệnh đề phân từ có trùng với chủ ngữ của mệnh đề chính không (tránh dangling participle)?',
      'Hành động phân từ mang nghĩa chủ động (V-ing / Having V3) chứ không phải bị động?',
      'Khi phủ định, từ "Not" đã đứng ngay trước phân từ (Not knowing / Not having seen) chưa?',
    ],
  },
  explanation: 'Mệnh đề phân từ chủ động (Active Participle Clauses) cho phép người viết liên kết thông tin súc tích hơn. Có hai dạng chính: 1) Present participle (V-ing): dùng khi hành động diễn ra cùng lúc hoặc là lý do dẫn đến hành động chính (Seeing the smoke, they evacuated the building). Khi phủ định, đặt Not lên trước (Not understanding the instructions, he asked for help). 2) Perfect participle (Having + V3): dùng khi cần làm rõ một hành động chủ động đã kết thúc trọn vẹn trước khi hành động tiếp theo xảy ra (Having saved enough money, they bought a flat). Nguyên tắc quan trọng nhất: Chủ ngữ ngầm định của mệnh đề phân từ bắt buộc phải trùng khớp với chủ ngữ của mệnh đề chính; nếu không sẽ tạo thành lỗi phân từ treo (dangling/misrelated participle).',
  examples: [
    {
      english: 'Realizing that the deadline was approaching, the team worked through the weekend.',
      vietnamese: 'Nhận thấy hạn chót đang đến gần, cả nhóm đã làm việc xuyên suốt dịp cuối tuần.',
    },
    {
      english: 'Having submitted all required documentation, the applicant waited for the visa confirmation.',
      vietnamese: 'Sau khi đã nộp đầy đủ hồ sơ theo yêu cầu, người nộp đơn kiên nhẫn chờ xác nhận thị thực.',
    },
    {
      english: 'Hearing the loud alarm, residents immediately evacuated the apartment complex.',
      vietnamese: 'Khi nghe thấy tiếng chuông báo động lớn, cư dân đã lập tức sơ tán khỏi khu chung cư.',
    },
    {
      english: 'Not having slept for twenty-four hours, the pilot requested an emergency relief crew.',
      vietnamese: 'Vì đã không ngủ suốt hai mươi tư giờ, viên phi công đã yêu cầu kíp trực cứu trợ khẩn cấp.',
    },
    {
      english: 'Looking through the archival records, the historian discovered an unpublished diary.',
      vietnamese: 'Khi xem qua các hồ sơ lưu trữ, nhà sử học đã phát hiện một cuốn nhật ký chưa từng xuất bản.',
    },
    {
      english: 'Having analyzed the experimental data, the scientists drafted their initial findings.',
      vietnamese: 'Sau khi đã phân tích dữ liệu thực nghiệm, các nhà khoa học đã soạn thảo những phát hiện bước đầu.',
    },
  ],
  contrasts: [
    {
      form: 'Having locked the front door, she left for the airport.',
      whyFits: 'Dùng Having locked vì việc khóa cửa bắt buộc hoàn tất hoàn toàn trước khi rời đi ra sân bay.',
      whyNot: '"Locking the front door, she left..." ngụ ý hai hành động diễn ra song song cùng lúc, điều không tự nhiên về mặt vật lý khi khóa cửa và đi tới sân bay.',
    },
    {
      form: 'Walking through the park, I noticed colorful autumn leaves.',
      whyFits: 'Chủ ngữ "I" vừa đi dạo trong công viên vừa nhìn thấy lá cây (hai hành động cùng chủ ngữ, diễn ra đồng thời).',
      whyNot: '"Walking through the park, the leaves were beautiful" là lỗi phân từ treo (dangling participle) vì lá cây (leaves) không thể tự đi bộ (walking).',
    },
  ],
  commonMistakes: [
    'Mắc lỗi phân từ treo (dangling participle): chủ ngữ của mệnh đề chính không phải là người thực hiện hành động phân từ.',
    'Dùng V-ing thay vì Having + V3 khi cần nhấn mạnh khoảng cách thời gian hoặc tính hoàn tất của hành động đi trước.',
    'Đặt sai vị trí từ phủ định (viết "Having not seen" hoặc "Knowing not" thay vì "Not having seen", "Not knowing").',
  ],
  summary: 'Active participle clauses rút gọn mệnh đề phụ: V-ing (đồng thời / nguyên nhân) và Having + V3 (hoàn tất trước). Đảm bảo chủ ngữ mệnh đề chính là chủ thể thực hiện hành động phân từ.',
  exercises: [
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q1',
      kind: 'choice',
      prompt: 'Select the sentence that avoids a dangling participle:',
      options: [
        { text: 'Walking along the riverbank, the botanist discovered a rare species of orchid.', correct: true, rationale: 'The botanist is the logical subject performing the action of walking along the riverbank.' },
        { text: 'Walking along the riverbank, a rare orchid caught the botanist’s eye.', correct: false, rationale: 'Dangling participle: the orchid cannot walk along the riverbank.' },
        { text: 'Walking along the riverbank, the river looked exceptionally clean.', correct: false, rationale: 'Dangling participle: the river cannot be walking.' },
        { text: 'Walking along the riverbank, discoveries were made by botanists.', correct: false, rationale: 'Dangling participle: discoveries cannot perform the walking action.' },
      ],
      acceptedAnswers: [{ text: 'Walking along the riverbank, the botanist discovered a rare species of orchid.', rationale: 'Correct subject alignment prevents dangling participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q2',
      kind: 'choice',
      prompt: 'Choose the correct perfect participle to show one action completed before another: "___ all his savings, he had to borrow money from relatives."',
      options: [
        { text: 'Having spent', correct: true, rationale: 'Having spent shows that the expenditure was completed prior to having to borrow money.' },
        { text: 'Spending', correct: false, rationale: 'Simple spending suggests simultaneous action rather than prior completion.' },
        { text: 'Spent', correct: false, rationale: 'Past participle spent is passive in this initial clause context.' },
        { text: 'Have spent', correct: false, rationale: 'Finite verb have spent cannot head a non-finite participle clause without subject.' },
      ],
      acceptedAnswers: [{ text: 'Having spent', rationale: 'Having spent expresses completed prior action.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q3',
      kind: 'choice',
      prompt: 'Select the correct negative active participle clause: "___ where the meeting was held, she called the reception desk."',
      options: [
        { text: 'Not knowing', correct: true, rationale: 'Not knowing correctly places negative particle not before the present participle.' },
        { text: 'Knowing not', correct: false, rationale: 'Archaic and ungrammatical word order in modern English.' },
        { text: 'No knowing', correct: false, rationale: 'No cannot negate a participle clause here.' },
        { text: 'Without to know', correct: false, rationale: 'Preposition without cannot take to-infinitive.' },
      ],
      acceptedAnswers: [{ text: 'Not knowing', rationale: 'Not knowing is the standard negative participle clause.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q4',
      kind: 'choice',
      prompt: 'Which sentence correctly links cause and consequence with an active participle?',
      options: [
        { text: 'Feeling unwell after lunch, the manager decided to go home early.', correct: true, rationale: 'Feeling unwell expresses the reason why the manager decided to leave early.' },
        { text: 'Felt unwell after lunch, the manager decided to go home early.', correct: false, rationale: 'Felt is past tense and cannot introduce a non-finite participle clause.' },
        { text: 'To feel unwell after lunch, the manager decided to go home early.', correct: false, rationale: 'Infinitive of purpose implies an intention to feel sick, which makes no sense.' },
        { text: 'Having felt unwell after lunch, home was where the manager went.', correct: false, rationale: 'Dangling participle: home cannot feel unwell.' },
      ],
      acceptedAnswers: [{ text: 'Feeling unwell after lunch, the manager decided to go home early.', rationale: 'Correct causal participle clause.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q5',
      kind: 'gap',
      prompt: 'Fill in the gap with the participle form of "open": "_____ the envelope with trembling hands, he read the acceptance letter."',
      options: [],
      acceptedAnswers: [{ text: 'Opening', rationale: 'Present participle Opening introduces simultaneous/immediate action.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q6',
      kind: 'gap',
      prompt: 'Fill in the gap to complete the perfect participle: "_____ lived in Tokyo for six years, she spoke Japanese fluently."',
      options: [],
      acceptedAnswers: [{ text: 'Having', rationale: 'Having lived forms the perfect participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q7',
      kind: 'gap',
      prompt: 'Complete the negative perfect participle: "_____ having received any formal confirmation, we decided to postpone the launch."',
      options: [],
      acceptedAnswers: [{ text: 'Not', rationale: 'Not precedes having received to form negative participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q8',
      kind: 'gap',
      prompt: 'Fill in the gap with the participle of "realize": "_____ (realize) that the flight was overbooked, the gate agent offered travel vouchers."',
      options: [],
      acceptedAnswers: [{ text: 'Realizing', rationale: 'Present participle Realizing expresses cause.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q9',
      kind: 'transform',
      prompt: 'Rewrite using a participle clause starting with "Having": "Because he had lost his entry badge, the engineer waited outside the security gate."',
      options: [],
      acceptedAnswers: [
        { text: 'Having lost his entry badge, the engineer waited outside the security gate.', rationale: 'Reduces causal clause to perfect participle Having lost.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q10',
      kind: 'transform',
      prompt: 'Rewrite using an active participle starting with "Hoping": "She checked her inbox every five minutes because she hoped to receive good news."',
      options: [],
      acceptedAnswers: [
        { text: 'Hoping to receive good news, she checked her inbox every five minutes.', rationale: 'Fronts participle clause Hoping to receive good news.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q11',
      kind: 'correction',
      prompt: 'Correct the dangling participle: "Looking out of the airplane window, the clouds looked like mountains of snow."',
      options: [],
      acceptedAnswers: [
        { text: 'Looking out of the airplane window, I thought the clouds looked like mountains of snow.', rationale: 'Supplies a human subject (I/we/the passenger) who looked out the window.' },
        { text: 'Looking out of the airplane window, we noticed that the clouds looked like mountains of snow.', rationale: 'Supplies appropriate subject we.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-q12',
      kind: 'correction',
      prompt: 'Correct the negation error: "Knowing not what to say, she remained completely silent during the debate."',
      options: [],
      acceptedAnswers: [
        { text: 'Not knowing what to say, she remained completely silent during the debate.', rationale: 'Places Not before knowing.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-r1',
      kind: 'choice',
      prompt: 'Choose the sentence with correct participle clause usage:',
      options: [
        { text: 'Having completed the questionnaire, respondents were entered into a prize draw.', correct: true, rationale: 'Respondents is the shared subject who completed the questionnaire.' },
        { text: 'Having completed the questionnaire, a prize draw was held for respondents.', correct: false, rationale: 'Dangling participle: the prize draw did not complete the questionnaire.' },
        { text: 'Completing the questionnaire, entries into the draw increased.', correct: false, rationale: 'Dangling participle: entries did not complete questionnaires.' },
      ],
      acceptedAnswers: [{ text: 'Having completed the questionnaire, respondents were entered into a prize draw.', rationale: 'Proper subject agreement without dangling participle.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-r2',
      kind: 'gap',
      prompt: 'Fill in the gap: "_____ (hear) a strange noise downstairs, he picked up a flashlight."',
      options: [],
      acceptedAnswers: [{ text: 'Hearing', rationale: 'Present participle Hearing expresses immediate sequence.' }],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-r3',
      kind: 'transform',
      prompt: 'Rewrite using "Not wanting to disturb": "Because he didn’t want to disturb his sleeping roommate, he walked on tiptoe."',
      options: [],
      acceptedAnswers: [
        { text: 'Not wanting to disturb his sleeping roommate, he walked on tiptoe.', rationale: 'Reduces causal clause to negative participle clause.' },
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-r4',
      kind: 'correction',
      prompt: 'Correct the dangling participle: "Walking into the kitchen, a pleasant smell greeted him."',
      options: [],
      acceptedAnswers: [
        { text: 'Walking into the kitchen, he was greeted by a pleasant smell.', rationale: 'Makes he the subject of the main clause to match walking.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-o1',
      prompt: 'Viết 1-2 câu kể về một phát hiện bất ngờ hoặc quyết định kịp thời của bạn trong một chuyến đi, sử dụng mệnh đề phân từ "Having + V3" hoặc "Realizing that...".',
      modelAnswer: 'Realizing that our original mountain trail was blocked by fallen rocks, we consulted a local ranger. Having reviewed the topographic map carefully, our hiking group chose a safer alternative descent.',
      checks: [
        'Sử dụng mệnh đề phân từ chủ động (Realizing that... hoặc Having reviewed...).',
        'Chủ ngữ của mệnh đề chính phải trùng với người thực hiện hành động phân từ (không có dangling participle).',
        'Văn phong tự nhiên và đúng thì ngữ pháp.',
      ],
    },
    {
      id: 'grammar-v2-b2-participle-clauses-active-20-o2',
      prompt: 'Viết 1-2 câu phân tích nguyên nhân - kết quả trong một báo cáo sự cố công nghệ, sử dụng cấu trúc "Not having..." hoặc "Analyzing the server logs...".',
      modelAnswer: 'Analyzing the server logs after the outage, our infrastructure engineers identified an unchecked memory leak. Not having updated the database caching layer last week, our infrastructure engineers had failed to prepare the system for the sudden traffic spike.',
      checks: [
        'Sử dụng phân từ chủ động chỉ nguyên nhân (Analyzing... / Not having updated...).',
        'Đảm bảo trật tự từ và logic phủ định chuẩn xác.',
      ],
    },
  ],
  sources: [
    {
      id: 'bc-participle-clauses',
      title: 'British Council: Participle clauses',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/participle-clauses',
      claims: [
        'Participle clauses can express condition, reason, result, or time sequence.',
        'In reduced participle clauses with no expressed subject, the understood subject normally matches the main-clause subject; explicit-subject absolute constructions also occur.',
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
