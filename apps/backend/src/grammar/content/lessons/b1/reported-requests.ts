/**
 * @file reported-requests.ts
 * @description B1 lesson on reported requests, commands, and advice using ask/tell/advise + object + (not) to-infinitive.
 */
import type { GrammarLesson } from '../../types.js';

const reportedRequestsLesson: GrammarLesson = {
  id: 'grammar-v2-b1-reported-requests-19',
  revisionId: 'grammar-v2-b1-reported-requests-19@1.0.0',
  revision: '1.0.0',
  title: 'Câu tường thuật: Lời yêu cầu, mệnh lệnh và lời khuyên (Reported Requests & Orders)',
  objective: 'Chuyển đổi câu mệnh lệnh, yêu cầu lịch sự và lời khuyên trực tiếp sang câu tường thuật dùng cấu trúc ask / tell / advise / remind + object + (not) to-infinitive.',
  prerequisiteIds: ['grammar-v2-b1-reported-questions-18'],
  coverage: ['reported-requests', 'reported-commands', 'reported-advice', 'ask-tell-advise-to-infinitive', 'negative-reporting-not-to'],
  context: {
    english: 'During the safety briefing, the flight attendant asked passengers to fasten their seatbelts and told everyone not to use mobile devices during takeoff.',
    vietnamese: 'Trong buổi hướng dẫn an toàn, tiếp viên hàng không yêu cầu hành khách thắt dây an toàn và bảo mọi người không dùng thiết bị di động trong lúc cất cánh.',
  },
  guide: {
    pattern: 'Subject + asked / told / ordered / advised / reminded + object + (not) to-infinitive',
    whenToUse: [
      'Thuật lại lời yêu cầu lịch sự (dùng ask + object + to-V).',
      'Thuật lại mệnh lệnh hoặc chỉ đạo trực tiếp (dùng tell / order + object + to-V).',
      'Thuật lại lời khuyên hoặc lời nhắc nhở (dùng advise / remind + object + to-V).',
      'Chuyển mệnh lệnh phủ định ("Don\'t do...") thành "not to + V" (chú ý: đặt not trước to).',
    ],
    signalWords: ['asked me to', 'told him not to', 'advised us to', 'reminded her to', 'warned them not to'],
    check: [
      'Có tân ngữ chỉ người nhận ngay sau động từ tường thuật không (asked me, told him)?',
      'Động từ được tường thuật có ở dạng to-infinitive hoặc not to-infinitive không?',
      'Đã dùng mẫu to-V thay cho cấu trúc mệnh lệnh trực tiếp và điều chỉnh đại từ theo người được nhắc đến chưa?',
    ],
  },
  explanation: 'Để thuật lại yêu cầu, mệnh lệnh hoặc lời khuyên, mẫu thường dùng là ask/tell/order/advise/remind/warn + người nhận + (not) to-infinitive. Ví dụ: She asked me to help her; They told us not to touch the wire. Please thường được bỏ vì ask đã thể hiện yêu cầu, nhưng to please sit down vẫn có thể đúng. Not to là vị trí phủ định trung tính được luyện ở đây; to not cũng có thể dùng để nhấn mạnh và không tự nó sai ngữ pháp. Không dùng told me don’t go như một mệnh đề gián tiếp. Đại từ, thời gian và nơi chốn vẫn đổi theo góc nhìn, không máy móc.',
  examples: [
    { english: 'Direct: "Please turn off your phone," the librarian said. -> Reported: The librarian asked me to turn off my phone.', vietnamese: 'Trực tiếp: "Xin vui lòng tắt điện thoại," thủ thư nói. -> Gián tiếp: Thủ thư yêu cầu tôi tắt điện thoại.' },
    { english: 'Direct: "Don\'t be late for tomorrow\'s meeting," Mr. Nam told us. -> Reported: Mr. Nam told us not to be late for the following day\'s meeting.', vietnamese: 'Trực tiếp: "Đừng đến muộn buổi họp ngày mai," thầy Nam bảo. -> Gián tiếp: Thầy Nam bảo chúng tôi không được đến muộn cuộc họp ngày hôm sau.' },
    { english: 'Direct: "You should drink more water," the doctor said to Linh. -> Reported: The doctor advised Linh to drink more water.', vietnamese: 'Trực tiếp: "Cháu nên uống nhiều nước hơn," bác sĩ nói với Linh. -> Gián tiếp: Bác sĩ khuyên Linh uống nhiều nước hơn.' },
    { english: 'Direct: "Remember to lock the gate," mother said. -> Reported: Mother reminded me to lock the gate.', vietnamese: 'Trực tiếp: "Nhớ khóa cổng nhé," mẹ nói. -> Gián tiếp: Mẹ nhắc tôi nhớ khóa cổng.' },
    { english: 'Direct: "Don\'t step on the grass," the guard shouted. -> Reported: The guard ordered the visitors not to step on the grass.', vietnamese: 'Trực tiếp: "Không giẫm lên cỏ," người bảo vệ hô lớn. -> Gián tiếp: Người bảo vệ ra lệnh cho khách không giẫm lên cỏ.' },
    { english: 'Direct: "Could you send me the invoice, please?" the client asked. -> Reported: The client asked the accountant to send the invoice.', vietnamese: 'Trực tiếp: "Bạn có thể gửi hóa đơn cho tôi được không?" khách hỏi. -> Gián tiếp: Khách hàng yêu cầu kế toán gửi hóa đơn.' },
  ],
  contrasts: [
    {
      form: 'She asked me to wait vs She told me that I should wait',
      whyFits: '"Asked me to wait" dùng to-infinitive ngắn gọn, tự nhiên và trực tiếp phản ánh câu yêu cầu "Please wait".',
      whyNot: '"Told me that I should wait" là câu tường thuật mệnh đề trần thuật, dài dòng hơn và không phản ánh trực tiếp cấu trúc mệnh lệnh/yêu cầu.',
    },
    {
      form: 'He told me not to go vs He told me don’t go',
      whyFits: 'Not to go là mẫu phủ định trung tính. To not go cũng có thể đúng, nhất là khi cần nhấn mạnh.',
      whyNot: 'Told me don’t go thiếu cấu trúc gián tiếp. Nếu trích nguyên văn cần dấu câu và dấu ngoặc trích dẫn, không coi đó là cùng mẫu.',
    },
  ],
  commonMistakes: [
    'Giữ mệnh lệnh trực tiếp sau told me mà không có to: She told me don’t touch. Sửa: She told me not to touch.',
    'Dùng don’t to go thay cho not to go trong mệnh đề nguyên mẫu.',
    'Thiếu người nhận trong mẫu tell + người + to-V: She told to leave -> She told us to leave.',
  ],
  summary: 'Mẫu thường gặp: asked/told/advised + người + (not) to-V. Please thường bỏ; not to là cách phủ định trung tính, không phải vị trí duy nhất có thể đúng.',
  exercises: [
    {
      id: 'grammar-v2-b1-reported-requests-19-q1',
      kind: 'choice',
      prompt: 'Choose the correct reported command: "Don\'t touch the wet paint," the painter told the children.',
      options: [
        { text: 'The painter told the children not to touch the wet paint.', correct: true, rationale: 'Negative imperative becomes "told + object + not to + verb".' },
        { text: 'The painter told the children not touch the wet paint.', correct: false, rationale: 'The infinitive marker to is missing after not.' },
        { text: 'The painter told the children don\'t touch the wet paint.', correct: false, rationale: 'Auxiliary "don\'t" cannot remain in indirect speech.' },
        { text: 'The painter said the children not to touch the wet paint.', correct: false, rationale: '"Said" cannot take a personal object directly.' },
      ],
      acceptedAnswers: [{ text: 'The painter told the children not to touch the wet paint.', rationale: 'Correct structure: told + object + not to + verb.' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q2',
      kind: 'choice',
      prompt: 'Select the best reported request: "Could you please open the window?" Lan asked Minh.',
      options: [
        { text: 'Lan asked Minh to open the window.', correct: true, rationale: '"Asked + object + to-infinitive", dropping "could you please".' },
        { text: 'Lan asked Minh opening the window.', correct: false, rationale: 'Asked + person requires a to-infinitive in this request pattern.' },
        { text: 'Lan told Minh that open the window.', correct: false, rationale: 'Missing infinitive "to" and incorrect conjunction.' },
        { text: 'Lan asked Minh could he open the window.', correct: false, rationale: 'Incomplete reported question structure; request form with to-infinitive is preferred.' },
      ],
      acceptedAnswers: [{ text: 'Lan asked Minh to open the window.', rationale: 'Standard reported request omitting please.' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q3',
      kind: 'choice',
      prompt: 'Which reporting verb best expresses advice: "You should get at least seven hours of sleep," Dr. Thao said to me.',
      options: [
        { text: 'Dr. Thao advised me to get at least seven hours of sleep.', correct: true, rationale: '"Advised + object + to-infinitive" accurately reflects the doctor\'s advice.' },
        { text: 'Dr. Thao demanded me to get at least seven hours of sleep.', correct: false, rationale: '"Demanded" expresses a forceful requirement, not medical advice.' },
        { text: 'Dr. Thao asked that I got at least seven hours of sleep.', correct: false, rationale: 'Unnatural phrasing for medical advice.' },
        { text: 'Dr. Thao ordered me getting at least seven hours of sleep.', correct: false, rationale: 'Requires to-infinitive, not gerund.' },
      ],
      acceptedAnswers: [{ text: 'Dr. Thao advised me to get at least seven hours of sleep.', rationale: '"Advised + object + to-infinitive" reports advice.' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q4',
      kind: 'choice',
      prompt: 'Report from a third-person viewpoint (the officer is male, Peter owns the passport): "Give me your passport, please," the officer told Peter.',
      options: [
        { text: 'The officer asked Peter to give him his passport.', correct: true, rationale: 'Shifts me -> him, your -> his, and uses to-infinitive.' },
        { text: 'The officer asked Peter to give me his passport.', correct: false, rationale: '"Me" fails to shift to the officer\'s perspective (him).' },
        { text: 'The officer told Peter give him his passport.', correct: false, rationale: 'Missing the infinitive particle "to".' },
        { text: 'The officer asked Peter to give him your passport.', correct: false, rationale: '"Your" fails to shift to Peter\'s perspective (his).' },
      ],
      acceptedAnswers: [{ text: 'The officer asked Peter to give him his passport.', rationale: 'Correct infinitive and pronoun shifts.' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q5',
      kind: 'gap',
      prompt: 'Fill in the correct infinitive form (affirmative or negative): "Don\'t forget your umbrella," Mum said. -> Mum reminded me _____ forget my umbrella.',
      options: [],
      acceptedAnswers: [{ text: 'not to', rationale: 'Negative command becomes "not to + verb".' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q6',
      kind: 'gap',
      prompt: 'Fill in the infinitive marker: "Please take off your shoes at the entrance," the host said. -> The host asked us _____ take off our shoes at the entrance.',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Polite request reports as "asked us to take off".' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q7',
      kind: 'gap',
      prompt: 'Complete with the reporting verb (advised / warned): The coach _____ the runner not to train through sharp knee pain.',
      options: [],
      acceptedAnswers: [
        { text: 'warned', rationale: '"Warned" reports a caution against a dangerous action.' },
        { text: 'advised', rationale: '"Advised" is also acceptable in context of guidance.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q8',
      kind: 'gap',
      prompt: 'Complete the reported sentence: "Be quiet during the performance," the usher told the crowd. -> The usher told the crowd _____ be quiet during the performance.',
      options: [],
      acceptedAnswers: [{ text: 'to', rationale: 'Affirmative imperative requires "to" + base verb.' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q9',
      kind: 'transform',
      prompt: 'Report using "asked"; begin "Mai asked Son" and use her for Mai, his for Son: "Can you lend me your dictionary, please?" Mai said to Son.',
      options: [],
      acceptedAnswers: [
        { text: 'Mai asked Son to lend her his dictionary.', rationale: 'Me refers to Mai; your dictionary refers to Son’s dictionary, not Mai’s.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q10',
      kind: 'transform',
      prompt: 'Report the negative imperative using "told": "Don\'t share your account password with anyone," the IT specialist said to us.',
      options: [],
      acceptedAnswers: [
        { text: 'The IT specialist told us not to share our account password with anyone.', rationale: 'Uses told us + not to share + our password.' },
        { text: 'The IT specialist told us not to share our passwords with anyone.', rationale: 'Accepts plural passwords.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q11',
      kind: 'correction',
      prompt: 'Correct the error in reporting command: "The manager told to the staff to submit the reports by 5 PM."',
      options: [],
      acceptedAnswers: [
        { text: 'The manager told the staff to submit the reports by 5 PM.', rationale: 'Removes unnecessary preposition "to" after told.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-q12',
      kind: 'correction',
      prompt: 'Correct the negative infinitive: "Our teacher told us don\'t talk while others are speaking."',
      options: [],
      acceptedAnswers: [
        { text: 'Our teacher told us not to talk while others are speaking.', rationale: 'Replaces "don\'t talk" with "not to talk".' },
        { text: 'Our teacher told us not to talk while others were speaking.', rationale: 'Accepts backshifted were speaking.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-reported-requests-19-r1',
      kind: 'choice',
      prompt: 'Select the correct indirect version: "Please keep your voice down in the hospital ward," the nurse said to the visitors.',
      options: [
        { text: 'The nurse asked the visitors to keep their voice down in the hospital ward.', correct: true, rationale: 'Polite request becomes asked + object + to-infinitive.' },
        { text: 'The nurse asked the visitors please keep their voice down in the hospital ward.', correct: false, rationale: 'The infinitive marker to is missing; please itself is not forbidden.' },
        { text: 'The nurse told the visitors that keep their voice down in the hospital ward.', correct: false, rationale: 'Incorrect that-clause structure.' },
      ],
      acceptedAnswers: [{ text: 'The nurse asked the visitors to keep their voice down in the hospital ward.', rationale: 'Correct request reporting structure.' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-r2',
      kind: 'gap',
      prompt: 'Fill in the negative infinitive: "Do not open this package before your birthday," Aunt Hoa told Huy. -> Aunt Hoa told Huy _____ open that package before his birthday.',
      options: [],
      acceptedAnswers: [{ text: 'not to', rationale: 'Negative command becomes "not to".' }],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-r3',
      kind: 'transform',
      prompt: 'Report the advice using "advised": "You should save a backup of your files regularly," my colleague said to me.',
      options: [],
      acceptedAnswers: [
        { text: 'My colleague advised me to save a backup of my files regularly.', rationale: 'Advised me to + base verb with pronoun change your -> my.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-r4',
      kind: 'correction',
      prompt: 'Use "ordered me to" or "told me to" and report on a later day, changing tonight accordingly: "My boss ordered me that I had to finish the presentation tonight."',
      options: [],
      acceptedAnswers: [
        { text: 'My boss ordered me to finish the presentation that night.', rationale: 'Uses ordered me to finish with tonight shifted to that night.' },
        { text: 'My boss told me to finish the presentation that night.', rationale: 'Accepts told me to finish.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-reported-requests-19-o1',
      prompt: 'Viết 2 câu thuật lại yêu cầu hoặc lời nhắc của thầy cô/quản lý; một câu dùng "asked me to", một câu dùng "told us not to".',
      modelAnswer: 'The instructor asked me to submit my draft essay before Thursday. She told us not to use translation tools in the writing test.',
      checks: [
        'Sử dụng đúng cấu trúc "asked + object + to-V" và "told + object + not to-V".',
        'Lược bỏ từ ngữ trực tiếp như "please", "don\'t".',
        'Văn phong tự nhiên, đúng ngữ cảnh trường lớp hoặc công sở.',
      ],
    },
    {
      id: 'grammar-v2-b1-reported-requests-19-o2',
      prompt: 'Viết 2 câu thuật lại lời khuyên hoặc cảnh báo của một bác sĩ hoặc huấn luyện viên đối với bạn khi tham gia thể thao.',
      modelAnswer: 'The fitness trainer advised me to warm up thoroughly before lifting heavy weights. He also warned me not to skip hydration breaks during intense sessions.',
      checks: [
        'Sử dụng các động từ tường thuật chỉ lời khuyên/cảnh báo như advise, warn, remind.',
        'Tuân thủ chuẩn ngữ pháp to-infinitive và not to-infinitive.',
        'Đúng ngữ cảnh thể thao, sức khỏe cấp độ B1.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-reported-requests',
      title: 'British Council LearnEnglish: Reported speech 3 – requests and commands',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-3-requests-commands',
      claims: [
        'Reported requests and orders use verbs like ask, tell, order, warn followed by an object and a to-infinitive.',
        'Negative commands use "not to + infinitive".',
        'The word "please" is omitted in reported requests.',
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

export default reportedRequestsLesson;
