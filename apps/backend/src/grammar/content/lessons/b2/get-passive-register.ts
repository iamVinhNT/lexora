/**
 * @file get-passive-register.ts
 * @description B2 lesson 18: The 'get' passive and register nuance vs 'be' passive.
 */
import type { GrammarLesson } from '../../types.js';

const lesson: GrammarLesson = {
  id: 'grammar-v2-b2-get-passive-register-18',
  revisionId: 'grammar-v2-b2-get-passive-register-18@1.0.0',
  revision: '1.0.0',
  title: 'Bị động với "get" và sắc thái văn phong (The "Get" Passive)',
  objective: 'Phân biệt cấu trúc bị động với "get" (get + past participle) và "be", nắm vững sắc thái không trang trọng, tính bất ngờ, tai nạn hoặc hành động có phần trách nhiệm của chủ thể.',
  prerequisiteIds: ['grammar-v2-b2-passive-infinitives-gerunds-17'],
  coverage: ['get-passive-register', 'get-passive', 'register-nuance', 'informal-passive', 'adverse-events'],
  context: {
    english: 'In informal conversation and everyday storytelling, native speakers often use "get + past participle" instead of "be" to describe unexpected, fortunate, or adverse events affecting the subject.',
    vietnamese: 'Trong giao tiếp thường ngày và kể chuyện thân mật, người bản xứ thường dùng "get + quá khứ phân từ" thay vì "be" để diễn tả những biến cố bất ngờ, may mắn hoặc tai nạn tác động lên chủ thể.',
  },
  guide: {
    pattern: 'Subject + get / got / gets + Past Participle (V3)',
    whenToUse: [
      'Miêu tả sự việc bất ngờ, tai nạn hoặc sự cố tiêu cực (get hurt, get fired, get caught, get damaged).',
      'Miêu tả thành quả hoặc chuyển đổi tích cực trong ngữ cảnh thân mật (get promoted, get married, get invited).',
      'Thường gặp trong văn nói hoặc ngữ cảnh thân mật; mức độ phù hợp với văn viết trang trọng tùy cụm từ và quy ước thể loại.',
    ],
    signalWords: ['got injured', 'gets fired', 'get caught', 'got invited', 'got damaged'],
    check: [
      'Ngữ cảnh có mang tính thân mật, giao tiếp hoặc miêu tả sự cố/biến cố không?',
      'Đã chia trợ động từ "do/does/did" khi đặt câu hỏi hoặc câu phủ định với get passive chưa (Did you get hurt?)?',
      'Check whether the participle naturally forms a get-passive in this meaning and context; many stative meanings favor be-passive.',
    ],
  },
  explanation: 'Cấu trúc "get + past participle" thường gặp trong văn nói và có thể nhấn mạnh biến cố hoặc chuyển biến trạng thái (get stuck, get promoted). Đôi khi ngữ cảnh gợi ý sự tham gia hoặc trách nhiệm của chủ thể, nhưng đây không phải nghĩa bắt buộc. So với be-passive, get-passive thường thân mật hơn; mức độ phù hợp phụ thuộc cụm từ và thể loại. Không phải mọi phân từ đều kết hợp tự nhiên với get; các kết hợp thường gặp tập trung vào sự kiện hoặc thay đổi trạng thái.',
  examples: [
    {
      english: 'Several passengers got injured when the regional train derailed.',
      vietnamese: 'Nhiều hành khách đã bị thương khi đoàn tàu địa phương bị trật bánh.',
    },
    {
      english: 'Be careful with that glassware, or it will get broken.',
      vietnamese: 'Hãy cẩn thận với đồ thủy tinh đó, kẻo nó bị vỡ đấy.',
    },
    {
      english: 'She worked exceptionally hard and eventually got promoted to senior designer.',
      vietnamese: 'Cô ấy đã làm việc cực kỳ chăm chỉ và cuối cùng đã được thăng chức lên nhà thiết kế chính.',
    },
    {
      english: 'Did your luggage get lost on the connecting flight to Frankfurt?',
      vietnamese: 'Hành lý của bạn có bị thất lạc trên chuyến bay nối chuyến tới Frankfurt không?',
    },
    {
      english: 'He didn’t get invited to the wedding, which upset him greatly.',
      vietnamese: 'Anh ấy không được mời tới dự đám cưới, điều đó khiến anh ấy rất buồn.',
    },
    {
      english: 'The driver got fined for parking across a pedestrian crosswalk.',
      vietnamese: 'Người tài xế đã bị phạt vì đỗ xe đè lên vạch qua đường dành cho người đi bộ.',
    },
  ],
  contrasts: [
    {
      form: 'My phone got stolen while I was waiting for the subway.',
      whyFits: '"Got stolen" diễn tả một tai nạn bất ngờ, mất mát trong văn cảnh kể chuyện thân mật tự nhiên.',
      whyNot: '"My phone was stolen" cũng đúng nhưng mang giọng điệu trang trọng hoặc khách quan hơn; trong văn nói đời thường get stolen biểu cảm hơn.',
    },
    {
      form: 'The historic treaty was signed by all representatives in Geneva.',
      whyFits: 'Be-passive (was signed) phù hợp với văn phong ngoại giao trang trọng và trung tính.',
      whyNot: '\"The treaty got signed\" là cách nói thiên về văn phong thân mật; mức độ phù hợp tùy quy ước của văn bản.',
    },
  ],
  commonMistakes: [
    'Dùng get-passive khi cần văn phong trung tính, trang trọng; be-passive thường phù hợp hơn trong văn bản học thuật chính thức.',
    'Cho rằng mọi get-passive đều mang nghĩa tai nạn hoặc trách nhiệm của chủ thể; sắc thái này phụ thuộc ngữ cảnh.',
    'Quên trợ động từ do/did khi phủ định hoặc nghi vấn (viết "Got you hurt?" thay vì "Did you get hurt?").',
  ],
  summary: 'Get-passive (get + V3) is common in conversation for events or changes of state; do-support is used in questions and negatives. Compare register and collocation rather than treating the construction as categorically impossible with all stative meanings.',
  exercises: [
    {
      id: 'grammar-v2-b2-get-passive-register-18-q1',
      kind: 'choice',
      prompt: 'Select the most natural conversational sentence using the get-passive:',
      options: [
        { text: 'My laptop got damaged during the sudden rainstorm.', correct: true, rationale: 'Got damaged is a natural informal passive describing accidental damage.' },
        { text: 'My laptop got was damaged during the rainstorm.', correct: false, rationale: 'Double auxiliary got was is ungrammatical.' },
        { text: 'My laptop was getting damage during the rainstorm.', correct: false, rationale: 'Requires past participle damaged, not bare noun damage.' },
        { text: 'My laptop got damage during the rainstorm.', correct: false, rationale: 'Damage must be the past participle damaged in get-passive.' },
      ],
      acceptedAnswers: [{ text: 'My laptop got damaged during the sudden rainstorm.', rationale: 'Correct conversational get-passive structure.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q2',
      kind: 'choice',
      prompt: 'Which sentence is least natural with get-passive in its ordinary stative meaning?',
      options: [
        { text: 'He was respected by all his colleagues throughout his career.', correct: true, rationale: 'Respect describes an established attitude here; be-respected is more idiomatic than get-respected in this context.' },
        { text: 'He got fired after repeatedly missing team deadlines.', correct: false, rationale: 'Get fired is standard dynamic get-passive.' },
        { text: 'He got caught sneaking into the concert hall.', correct: false, rationale: 'Get caught is standard dynamic get-passive.' },
        { text: 'He got penalized for late project submission.', correct: false, rationale: 'Get penalized is standard dynamic get-passive.' },
      ],
      acceptedAnswers: [{ text: 'He was respected by all his colleagues throughout his career.', rationale: 'Stative verbs like respect take be-passive, not get-passive.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q3',
      kind: 'choice',
      prompt: 'Select the correct negative question with get-passive in conversational past tense:',
      options: [
        { text: 'Did anyone get hurt when the scaffolding collapsed?', correct: true, rationale: 'Did + subject + get + V3 (hurt) forms standard past question.' },
        { text: 'Got anyone hurt when the scaffolding collapsed?', correct: false, rationale: 'Get requires auxiliary did for past questions.' },
        { text: 'Was anyone got hurt when the scaffolding collapsed?', correct: false, rationale: 'Cannot combine auxiliary was with got.' },
        { text: 'Did anyone got hurt when the scaffolding collapsed?', correct: false, rationale: 'Did must be followed by base form get, not past got.' },
      ],
      acceptedAnswers: [{ text: 'Did anyone get hurt when the scaffolding collapsed?', rationale: 'Did anyone get hurt is the correct interrogative.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q4',
      kind: 'choice',
      prompt: 'Choose the appropriate register for a formal academic paper on economics:',
      options: [
        { text: 'The monetary policy was heavily criticized by leading economists.', correct: true, rationale: 'Was criticized matches formal academic written register.' },
        { text: 'The monetary policy got slammed by economists.', correct: false, rationale: 'Got slammed is informal conversational slang, unsuitable for academic writing.' },
        { text: 'The policy got heavily criticized by leading economists.', correct: false, rationale: 'Get-passive is informal and generally avoided in academic research prose.' },
        { text: 'Economists got the policy criticized.', correct: false, rationale: 'Distorts meaning into a causative construction.' },
      ],
      acceptedAnswers: [{ text: 'The monetary policy was heavily criticized by leading economists.', rationale: 'Formal written register demands standard be-passive.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q5',
      kind: 'gap',
      prompt: 'Complete the conversational passive: "I couldn’t answer your call because my car _____ (get) stuck in heavy snow."',
      options: [],
      acceptedAnswers: [{ text: 'got', rationale: 'Past tense got stuck expresses the sudden predicament.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q6',
      kind: 'gap',
      prompt: 'Fill in the past participle of "steal": "Unfortunately, his bicycle got _____ from outside the library yesterday."',
      options: [],
      acceptedAnswers: [{ text: 'stolen', rationale: 'Past participle stolen follows got.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q7',
      kind: 'gap',
      prompt: 'Supply the auxiliary for the negative past get-passive: "Luckily, we didn’t _____ (get) delayed by the airport strike."',
      options: [],
      acceptedAnswers: [{ text: 'get', rationale: 'Base form get follows didn’t.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q8',
      kind: 'gap',
      prompt: 'Complete the sentence with the past participle of "promote": "After months of exceptional sales performance, she finally got _____ to regional director."',
      options: [],
      acceptedAnswers: [{ text: 'promoted', rationale: 'Got promoted expresses positive advancement.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q9',
      kind: 'transform',
      prompt: 'Rewrite informally using the get-passive: "His car was broken into during the night."',
      options: [],
      acceptedAnswers: [
        { text: 'His car got broken into during the night.', rationale: 'Replaces was with got for informal conversational register.' },
      ],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q10',
      kind: 'transform',
      prompt: 'Rewrite in formal academic register using be-passive: "The research proposal got rejected by the grant committee."',
      options: [],
      acceptedAnswers: [
        { text: 'The research proposal was rejected by the grant committee.', rationale: 'Changes informal got rejected to formal was rejected.' },
      ],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q11',
      kind: 'correction',
      prompt: 'Correct the error in this question: "Got your brother accepted into the law academy?"',
      options: [],
      acceptedAnswers: [
        { text: 'Did your brother get accepted into the law academy?', rationale: 'Adds auxiliary did and base verb get for standard question.' },
      ],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-q12',
      kind: 'correction',
      prompt: 'Correct the error in this sentence: "The mathematical theorem got known throughout Europe within months."',
      options: [],
      acceptedAnswers: [
        { text: 'The mathematical theorem was known throughout Europe within months.', rationale: 'Be-known is the natural stative form in this context; get-known is not the usual collocation.' },
        { text: 'The mathematical theorem became known throughout Europe within months.', rationale: 'Became known expresses a change into a state of being known.' },
      ],
    },
  ],
  reviewExercises: [
    {
      id: 'grammar-v2-b2-get-passive-register-18-r1',
      kind: 'choice',
      prompt: 'Choose the most natural colloquial passive: "Watch out, or your new jacket ___ on those sharp nails!"',
      options: [
        { text: 'will get torn', correct: true, rationale: 'Will get torn naturally conveys impending accidental damage.' },
        { text: 'will get tear', correct: false, rationale: 'Requires past participle torn, not base verb tear.' },
        { text: 'will be got torn', correct: false, rationale: 'Awkward and ungrammatical combination of be and get.' },
      ],
      acceptedAnswers: [{ text: 'will get torn', rationale: 'Will get torn fits colloquial future warning.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-r2',
      kind: 'gap',
      prompt: 'Fill in the gap: "Did the delivery van get _____ (damage) during the hailstorm?"',
      options: [],
      acceptedAnswers: [{ text: 'damaged', rationale: 'Past participle damaged follows get.' }],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-r3',
      kind: 'transform',
      prompt: 'Rewrite using "got involved": "He was drawn into an unexpected dispute between two neighbors."',
      options: [],
      acceptedAnswers: [
        { text: 'He got involved in an unexpected dispute between two neighbors.', rationale: 'Uses conversational get-passive idiom got involved.' },
      ],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-r4',
      kind: 'correction',
      prompt: 'Correct the error: "Our flights didn’t got cancelled despite the severe blizzard."',
      options: [],
      acceptedAnswers: [
        { text: 'Our flights didn’t get cancelled despite the severe blizzard.', rationale: 'Changes got to base form get after didn’t.' },
        { text: 'Our flights didn’t get canceled despite the severe blizzard.', rationale: 'American spelling variant accepted.' },
      ],
    },
  ],
  outputPrompts: [
    {
      id: 'grammar-v2-b2-get-passive-register-18-o1',
      prompt: 'Kể lại một sự cố nhỏ hoặc tình huống may mắn trong một chuyến du lịch gia đình bằng cách dùng 1-2 câu có cấu trúc get-passive (got delayed, got lost, got caught in the rain).',
      modelAnswer: 'On our road trip along the coastal highway, our rental car got stuck in thick roadside mud. Fortunately, we got rescued by a friendly local mechanic before the storm hit.',
      checks: [
        'Sử dụng cấu trúc get-passive (got stuck, got helped, got delayed).',
        'Văn phong thân mật, tự nhiên như lời kể chuyện đời thường.',
        'Động từ phân từ ba được chia chính xác.',
      ],
    },
    {
      id: 'grammar-v2-b2-get-passive-register-18-o2',
      prompt: 'So sánh sắc thái của hai câu: một câu trang trọng trong báo cáo công vụ (be-passive) và một câu thân mật khi trò chuyện với bạn bè (get-passive) về việc mất tài liệu.',
      modelAnswer: 'Formal report: "Several sensitive financial dossiers were stolen during the interdepartmental office relocation." Informal conversation: "I panicked when my passport and boarding pass got stolen at the train station."',
      checks: [
        'Thể hiện rõ sự đối chiếu giữa be-passive (trang trọng) và get-passive (thân mật).',
        'Cả hai câu đều đúng cấu trúc ngữ pháp và phù hợp bối cảnh văn phong.',
      ],
    },
  ],
  sources: [
    {
      id: 'cambridge-get-passive',
      title: 'Cambridge Dictionary: The get-passive',
      url: 'https://dictionary.cambridge.org/grammar/british-grammar/get-passive',
      claims: [
        'The get-passive is common in informal spoken English.',
        'It often refers to events that are unexpected, accidental, or have an adverse effect on the subject.',
        'It is not typically used with stative verbs.',
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
