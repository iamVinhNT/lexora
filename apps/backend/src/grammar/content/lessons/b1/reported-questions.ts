/**
 * @file reported-questions.ts
 * @description B1 lesson on reported Yes/No and Wh- questions, statement word order, and auxiliary removal.
 */
import type { GrammarLesson } from '../../types.js';

const reportedQuestionsLesson: GrammarLesson = {
  id: 'grammar-v2-b1-reported-questions-18',
  revisionId: 'grammar-v2-b1-reported-questions-18@1.0.0',
  revision: '1.0.0',
  title: 'Câu tường thuật: Câu hỏi Yes/No và Wh- (Reported Questions)',
  objective: 'Tường thuật câu hỏi Yes/No với if/whether và câu hỏi Wh- với từ để hỏi, chuyển sang trật tự khẳng định (S + V) và bỏ trợ động từ do/does/did.',
  prerequisiteIds: ['grammar-v2-b1-reported-tense-shifts-17'],
  coverage: ['reported-questions', 'if-whether', 'wh-questions', 'word-order-shift', 'indirect-questions'],
  context: {
    english: 'During a job interview, the manager asked Linh: "Do you have experience in customer service?" Linh later told her friend: "She asked me if I had experience in customer service."',
    vietnamese: 'Trong buổi phỏng vấn xin việc, người quản lý hỏi Linh: "Bạn có kinh nghiệm chăm sóc khách hàng không?" Sau đó Linh kể với bạn: "Chị ấy hỏi tôi có kinh nghiệm chăm sóc khách hàng hay không."',
  },
  guide: {
    pattern: 'Subject + asked / wondered + if / whether / wh-word + Subject + Verb',
    whenToUse: [
      'Tường thuật câu hỏi Yes/No bằng cách dùng "if" hoặc "whether".',
      'Tường thuật câu hỏi Wh- bằng cách giữ lại từ để hỏi (what, where, when, why, who, how).',
      'Dùng trật tự trần thuật trong mệnh đề gián tiếp; câu tường thuật chính là trần thuật thì dùng dấu chấm.',
    ],
    signalWords: ['asked if', 'wondered whether', 'wanted to know where', 'inquired how'],
    check: [
      'Trật tự từ trong mệnh đề tường thuật đã đổi thành S + V chưa (không đảo trợ động từ lên trước S)?',
      'Đã bỏ trợ động từ do/does/did trong câu khẳng định gián tiếp chưa?',
      'Đã bỏ dấu hỏi chấm (?) ở cuối câu tường thuật chưa?',
    ],
  },
  explanation: 'Mệnh đề câu hỏi tường thuật dùng trật tự trần thuật, không đảo trợ động từ lên trước chủ ngữ. Do/does/did dùng để tạo câu hỏi khẳng định trực tiếp bị bỏ; do trong câu phủ định vẫn có thể còn (She asked why I did not go). Câu Yes/No dùng if/whether; câu Wh- giữ từ để hỏi. Nếu who/what chính là chủ ngữ thì không thêm một chủ ngữ nữa: Who called? -> She asked who had called. Backshift và đổi thời gian/nơi chốn tùy ngữ cảnh. Câu tường thuật trần thuật kết thúc bằng dấu chấm; câu hỏi chính như Did she ask where I lived? vẫn có dấu hỏi.',
  examples: [
    { english: 'Direct: "Do you like living in Hanoi?" Lan asked. -> Reported: Lan asked me if I liked living in Hanoi.', vietnamese: 'Trực tiếp: "Bạn có thích sống ở Hà Nội không?" Lan hỏi. -> Gián tiếp: Lan hỏi tôi có thích sống ở Hà Nội hay không.' },
    { english: 'Direct: "Are you working today?" Minh asked. -> Reported: Minh asked whether I was working that day.', vietnamese: 'Trực tiếp: "Hôm nay bạn có làm việc không?" Minh hỏi. -> Gián tiếp: Minh hỏi liệu tôi có làm việc vào ngày hôm đó hay không.' },
    { english: 'Direct: "Where do you buy your coffee?" Thu asked. -> Reported: Thu asked where I bought my coffee.', vietnamese: 'Trực tiếp: "Bạn mua cà phê ở đâu?" Thu hỏi. -> Gián tiếp: Thu hỏi tôi mua cà phê ở đâu.' },
    { english: 'Direct: "Why did you arrive late?" the manager asked. -> Reported: The manager asked why I had arrived late.', vietnamese: 'Trực tiếp: "Tại sao bạn đến muộn?" quản lý hỏi. -> Gián tiếp: Quản lý hỏi tại sao tôi lại đến muộn.' },
    { english: 'Direct: "What time will the bus arrive?" Peter wondered. -> Reported: Peter wondered what time the bus would arrive.', vietnamese: 'Trực tiếp: "Mấy giờ xe buýt sẽ đến?" Peter tự hỏi. -> Gián tiếp: Peter tự hỏi mấy giờ xe buýt sẽ đến.' },
    { english: 'Direct: "Have you seen my keys?" Dad asked. -> Reported: Dad asked if I had seen his keys.', vietnamese: 'Trực tiếp: "Con có thấy chìa khóa của bố không?" Bố hỏi. -> Gián tiếp: Bố hỏi tôi có thấy chìa khóa của bố hay không.' },
  ],
  contrasts: [
    {
      form: 'She asked where I lived vs She asked where did I live',
      whyFits: '"Where I lived" tuân thủ trật tự trần thuật (S + V) và bỏ trợ động từ did.',
      whyNot: 'Không giữ nguyên đảo ngữ "where did I live" vì câu tường thuật không phải câu hỏi trực tiếp.',
    },
    {
      form: 'He asked if I was ready vs He asked was I ready',
      whyFits: 'Câu hỏi Yes/No gián tiếp bắt buộc cần từ nối if/whether và trật tự S + V (I was ready).',
      whyNot: 'Không đặt động từ was lên trước I như trong câu hỏi trực tiếp và không thiếu từ nối if/whether.',
    },
  ],
  commonMistakes: [
    'Giữ nguyên trợ động từ do/does/did trong câu tường thuật (ví dụ: He asked me where did I go).',
    'Đảo to be hoặc trợ động từ lên trước chủ ngữ (ví dụ: She asked what was my name thay vì what my name was).',
    'Đặt dấu hỏi cuối câu tường thuật trần thuật (He asked if I was tired?). Nếu mệnh đề chính là câu hỏi, dấu hỏi vẫn đúng: Did he ask if I was tired?',
  ],
  summary: 'Câu Yes/No gián tiếp dùng if/whether; câu Wh- giữ từ để hỏi. Không đảo trợ động từ trong mệnh đề gián tiếp; bỏ do/does/did tạo câu hỏi khẳng định. Điều chỉnh thì và góc nhìn theo ngữ cảnh; dấu câu phụ thuộc mệnh đề chính.',
  exercises: [
    {
      id: 'grammar-v2-b1-reported-questions-18-q1',
      kind: 'choice',
      prompt: 'Select the correct reported question: "Do you have a driver\'s license?" the officer asked.',
      options: [
        { text: 'The officer asked if I had a driver\'s license.', correct: true, rationale: 'Yes/No question uses if, removes do, and backshifts have to had.' },
        { text: 'The officer asked did I have a driver\'s license.', correct: false, rationale: 'Retains question auxiliary did.' },
        { text: 'The officer asked if did I have a driver\'s license.', correct: false, rationale: 'Incorrectly includes auxiliary did with if.' },
        { text: 'The officer asked that I had a driver\'s license.', correct: false, rationale: 'That is for statements, not Yes/No questions.' },
      ],
      acceptedAnswers: [{ text: 'The officer asked if I had a driver\'s license.', rationale: 'Correct Yes/No reported question form.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q2',
      kind: 'choice',
      prompt: 'Choose the correct word order: "Where does Nam work?" Mai asked.',
      options: [
        { text: 'Mai asked where Nam worked.', correct: true, rationale: 'Wh-word followed by Subject (Nam) + backshifted Verb (worked), dropping does.' },
        { text: 'Mai asked where did Nam work.', correct: false, rationale: 'Incorrectly retains auxiliary did in reported speech.' },
        { text: 'Mai asked where worked Nam.', correct: false, rationale: 'Inverted verb-subject order is ungrammatical.' },
        { text: 'Mai asked if where Nam worked.', correct: false, rationale: 'Cannot combine if with a wh-word.' },
      ],
      acceptedAnswers: [{ text: 'Mai asked where Nam worked.', rationale: 'Wh- word order S + V without auxiliary do/does/did.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q3',
      kind: 'choice',
      prompt: 'Identify the grammatically correct sentence with "whether":',
      options: [
        { text: 'They wanted to know whether we were attending the seminar.', correct: true, rationale: 'Whether introduces the indirect question with S + V word order.' },
        { text: 'They wanted to know whether were we attending the seminar.', correct: false, rationale: 'Inverts were before we.' },
        { text: 'They wanted to know that whether we were attending the seminar.', correct: false, rationale: 'Cannot combine that and whether.' },
        { text: 'They asked whether did we attend the seminar.', correct: false, rationale: 'Auxiliary did is incorrectly retained.' },
      ],
      acceptedAnswers: [{ text: 'They wanted to know whether we were attending the seminar.', rationale: 'Correct indirect clause with whether.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q4',
      kind: 'choice',
      prompt: 'Report the question: "Why are you laughing?" Hoa asked Tuan.',
      options: [
        { text: 'Hoa asked Tuan why he was laughing.', correct: true, rationale: 'Why + Subject (he) + backshifted Verb (was laughing).' },
        { text: 'Hoa asked Tuan why was he laughing.', correct: false, rationale: 'Inverted was he is incorrect in indirect questions.' },
        { text: 'Hoa asked Tuan if why he was laughing.', correct: false, rationale: 'Cannot combine if with why.' },
        { text: 'Hoa asked Tuan why is he laughing.', correct: false, rationale: 'Fails to backshift is to was.' },
      ],
      acceptedAnswers: [{ text: 'Hoa asked Tuan why he was laughing.', rationale: 'Correct subject-verb order after why.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q5',
      kind: 'gap',
      prompt: 'Fill in the subordinator for this Yes/No question: "Can you speak French?" she asked. -> She asked _____ I could speak French.',
      options: [],
      acceptedAnswers: [
        { text: 'if', rationale: '"If" introduces reported Yes/No questions.' },
        { text: 'whether', rationale: '"Whether" is also fully correct.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q6',
      kind: 'gap',
      prompt: 'Fill in the correct question word: "Where is the post office?" the tourist asked. -> The tourist asked _____ the post office was.',
      options: [],
      acceptedAnswers: [{ text: 'where', rationale: '"Where" introduces the reported location clause.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q7',
      kind: 'gap',
      prompt: 'Supply the backshifted verb in statement order: "Are you tired?" Mom asked. -> Mom asked if I _____ tired.',
      options: [],
      acceptedAnswers: [{ text: 'was', rationale: 'To be backshifts to "was" matching subject "I".' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q8',
      kind: 'gap',
      prompt: 'Supply the question word: "Why did you choose this university?" he asked. -> He asked _____ I had chosen that university.',
      options: [],
      acceptedAnswers: [{ text: 'why', rationale: '"Why" retains the reason question word.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q9',
      kind: 'transform',
      prompt: 'Report using backshift; begin "The teacher asked" (me may be retained): "Are you ready for the presentation?" the teacher asked me.',
      options: [],
      acceptedAnswers: [
        { text: 'The teacher asked me if I was ready for the presentation.', rationale: 'Uses if + S + V, backshifts are -> was.' },
        { text: 'The teacher asked me whether I was ready for the presentation.', rationale: 'Uses whether + S + V.' },
        { text: 'The teacher asked if I was ready for the presentation.', rationale: 'Accepts omission of personal object me.' },
        { text: 'The teacher asked whether I was ready for the presentation.', rationale: 'Accepts whether without me.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q10',
      kind: 'transform',
      prompt: 'Report with past perfect; begin "Nam asked Minh where he" or "Nam asked where Minh": "Where did you buy that camera?" Nam asked Minh.',
      options: [],
      acceptedAnswers: [
        { text: 'Nam asked Minh where he had bought that camera.', rationale: 'Where + he + had bought (past simple -> past perfect), drops did.' },
        { text: 'Nam asked where Minh had bought that camera.', rationale: 'Accepts Minh as subject of reported clause.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q11',
      kind: 'correction',
      prompt: 'Correct the error in word order: "She asked me what was my telephone number."',
      options: [],
      acceptedAnswers: [
        { text: 'She asked me what my telephone number was.', rationale: 'Restores statement order S (my telephone number) + V (was).' },
        { text: 'She asked what my telephone number was.', rationale: 'Also accepts without object me.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-q12',
      kind: 'correction',
      prompt: 'Correct the question structure: "He asked if did I know the answer?"',
      options: [],
      acceptedAnswers: [
        { text: 'He asked if I knew the answer.', rationale: 'Removes auxiliary did, backshifts know to knew, and removes question mark.' },
        { text: 'He asked whether I knew the answer.', rationale: 'Accepts whether in place of if.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b1-reported-questions-18-r1',
      kind: 'choice',
      prompt: 'Choose the correct indirect question: "How long have you lived here?" she asked.',
      options: [
        { text: 'She asked how long I had lived there.', correct: true, rationale: 'How long + S (I) + had lived + there (here -> there).' },
        { text: 'She asked how long had I lived there.', correct: false, rationale: 'Incorrectly inverts auxiliary had before subject I.' },
        { text: 'She asked if how long I lived here.', correct: false, rationale: 'Cannot combine if with how long.' },
      ],
      acceptedAnswers: [{ text: 'She asked how long I had lived there.', rationale: 'Correct word order, tense, and place shift.' }],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-r2',
      kind: 'gap',
      prompt: 'Complete the reported Yes/No question: "Will you come to the party?" Hung asked. -> Hung asked _____ I would come to the party.',
      options: [],
      acceptedAnswers: [
        { text: 'if', rationale: '"If" connects the reported Yes/No question.' },
        { text: 'whether', rationale: '"Whether" is also fully correct.' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-r3',
      kind: 'transform',
      prompt: 'Report later using backshift; begin "My sister asked what I": "What are you doing now?" my sister asked me.',
      options: [],
      acceptedAnswers: [
        { text: 'My sister asked what I was doing then.', rationale: 'What + I + was doing + then (now -> then).' },
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-r4',
      kind: 'correction',
      prompt: 'Correct the sentence: "The tourist asked where was the nearest pharmacy?"',
      options: [],
      acceptedAnswers: [
        { text: 'The tourist asked where the nearest pharmacy was.', rationale: 'Corrects word order to S + V and removes question mark.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b1-reported-questions-18-o1',
      prompt: 'Viết 2 câu tường thuật câu hỏi: một câu hỏi Yes/No với "if" hoặc "whether", và một câu hỏi Wh- với từ để hỏi (chú ý trật tự từ S + V).',
      modelAnswer: 'The interviewer asked whether I could work under pressure. She also asked how many programming languages I had learned at university.',
      checks: [
        'Sử dụng đúng cấu trúc if/whether cho câu hỏi Yes/No và từ để hỏi cho câu Wh-.',
        'Áp dụng trật tự từ khẳng định (S + V) và không dùng trợ động từ do/does/did.',
        'Lùi thì và đổi đại từ phù hợp, không dùng dấu hỏi chấm ở cuối câu.',
      ],
    },
    {
      id: 'grammar-v2-b1-reported-questions-18-o2',
      prompt: 'Viết 2 câu thuật lại những thắc mắc của một người bạn khi lần đầu đến thăm thành phố của bạn.',
      modelAnswer: 'My foreign friend asked where he could find the best street food in Hanoi. He also asked if public buses ran late into the night.',
      checks: [
        'Sử dụng động từ tường thuật thích hợp (asked, wanted to know).',
        'Trật tự từ chính xác sau từ để hỏi và từ nối if.',
        'Diễn đạt tự nhiên, giàu ngữ cảnh giao tiếp.',
      ],
    },
  ],
  sources: [
    {
      id: 'british-council-reported-questions',
      title: 'British Council LearnEnglish: Reported speech 2 – questions',
      url: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-2-questions',
      claims: [
        'Reported questions change from question word order to statement word order (Subject + Verb).',
        'Auxiliary verbs do, does, and did are omitted in affirmative reported clauses.',
        'Yes/No questions use if or whether; wh-questions retain the question word.',
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

export default reportedQuestionsLesson;
